import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const cache = {};
const CACHE_TTL = 15 * 60 * 1000;

app.get('/api/leetcode', async (req, res) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();
  if (!forceRefresh && cache['leetcode'] && now - cache['leetcode'].timestamp < CACHE_TTL) {
    return res.json(cache['leetcode'].data);
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify({
        query: `
          query getUserFullProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                ranking
                reputation
                starRating
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                  submissions
                }
                totalSubmissionNum {
                  difficulty
                  count
                  submissions
                }
              }
              badges {
                id
                displayName
                icon
              }
              userCalendar {
                activeYears
                streak
                totalActiveDays
              }
            }
            allQuestionsCount {
              difficulty
              count
            }
          }
        `,
        variables: { username: 'Suman_tkumaryadav' }
      })
    });

    if (!response.ok) {
      throw new Error(`LeetCode API status: ${response.status}`);
    }

    const data = await response.json();
    const matchedUser = data?.data?.matchedUser;
    const allQuestionsCount = data?.data?.allQuestionsCount || [];

    if (!matchedUser) {
      return res.status(404).json({ error: 'LeetCode user not found' });
    }

    const submitStats = matchedUser.submitStats?.acSubmissionNum || [];
    const totalSubStats = matchedUser.submitStats?.totalSubmissionNum || [];
    const getCount = (diff) => submitStats.find((s) => s.difficulty === diff)?.count || 0;
    const getTotalCount = (diff) => allQuestionsCount.find((s) => s.difficulty === diff)?.count || 0;
    const getTotalSubmissions = () => totalSubStats.find((s) => s.difficulty === 'All')?.submissions || 0;

    const result = {
      totalSolved: getCount('All'),
      easySolved: getCount('Easy'),
      mediumSolved: getCount('Medium'),
      hardSolved: getCount('Hard'),
      ranking: matchedUser.profile?.ranking || 0,
      totalSubmissions: getTotalSubmissions(),
      activeDays: matchedUser.userCalendar?.totalActiveDays || 0,
      streak: matchedUser.userCalendar?.streak || 0,
      badgesCount: Array.isArray(matchedUser.badges) ? matchedUser.badges.length : 0,
      easyTotal: getTotalCount('Easy') || 967,
      mediumTotal: getTotalCount('Medium') || 2119,
      hardTotal: getTotalCount('Hard') || 978,
      totalQuestions: getTotalCount('All') || 4064
    };

    cache['leetcode'] = { data: result, timestamp: now };
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch LeetCode data', details: err.message });
  }
});

app.get('/api/github/stats', async (req, res) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();
  if (!forceRefresh && cache['github'] && now - cache['github'].timestamp < CACHE_TTL) {
    return res.json(cache['github'].data);
  }

  const username = 'Sumantkumaryadav8668';

  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      const errBody = await userRes.text();
      throw new Error(`GitHub user API status ${userRes.status}: ${errBody}`);
    }
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    if (!reposRes.ok) {
      const errBody = await reposRes.text();
      throw new Error(`GitHub repos API status ${reposRes.status}: ${errBody}`);
    }
    const reposData = Array.isArray(await reposRes.json()) ? await reposRes.json() : [];

    const langBytes = {};
    let totalBytes = 0;
    let starsReceived = 0;

    for (const repo of reposData) {
      starsReceived += repo.stargazers_count || 0;
      if (repo.fork || !repo.languages_url) continue;

      try {
        const langRes = await fetch(repo.languages_url, { headers });
        if (langRes.ok) {
          const langs = await langRes.json();
          for (const [lang, bytes] of Object.entries(langs)) {
            langBytes[lang] = (langBytes[lang] || 0) + bytes;
            totalBytes += bytes;
          }
        }
      } catch {
        // Ignore single repo failure
      }
    }

    const colorPalette = [
      'stroke-brand-primary',
      'stroke-brand-accent',
      'stroke-brand-success',
      'stroke-purple-500',
      'stroke-amber-500',
      'stroke-pink-500'
    ];

    const languages = Object.entries(langBytes)
      .map(([label, bytes]) => ({
        label,
        bytes,
        percentage: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0
      }))
      .filter((l) => l.percentage > 0)
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5)
      .map((l, index) => ({
        label: l.label,
        percentage: l.percentage,
        color: colorPalette[index % colorPalette.length]
      }));

    let totalContributions = 0;
    let rawDays = [];

    if (process.env.GITHUB_TOKEN) {
      try {
        const gqlRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          },
          body: JSON.stringify({
            query: `
              query getContributions($username: String!) {
                user(login: $username) {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          date
                          contributionLevel
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: { username }
          })
        });

        if (gqlRes.ok) {
          const gqlData = await gqlRes.json();
          const cal = gqlData?.data?.user?.contributionsCollection?.contributionCalendar;
          if (cal) {
            totalContributions = cal.totalContributions || 0;
            for (const week of cal.weeks || []) {
              for (const day of week.contributionDays || []) {
                let level = 0;
                if (day.contributionLevel === 'FIRST_QUARTILE') level = 1;
                else if (day.contributionLevel === 'SECOND_QUARTILE') level = 2;
                else if (day.contributionLevel === 'THIRD_QUARTILE') level = 3;
                else if (day.contributionLevel === 'FOURTH_QUARTILE') level = 4;
                else if (day.contributionCount > 0) level = 1;

                rawDays.push({
                  date: day.date,
                  count: day.contributionCount,
                  level
                });
              }
            }
          }
        }
      } catch (gqlErr) {
        console.error('GraphQL Error:', gqlErr);
      }
    }

    if (rawDays.length === 0) {
      const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      if (!contribRes.ok) {
        throw new Error(`GitHub contributions API status: ${contribRes.status}`);
      }
      const contribData = await contribRes.json();
      totalContributions = contribData.total?.lastYear ?? contribData.total ?? 0;
      if (Array.isArray(contribData.contributions)) {
        rawDays = contribData.contributions;
      }
    }

    const daysToUse = rawDays.slice(-196);
    const heatmap = [];
    for (let c = 0; c < 28; c++) {
      const col = [];
      for (let r = 0; r < 7; r++) {
        const index = c * 7 + r;
        if (index < daysToUse.length) {
          col.push(daysToUse[index].level || (daysToUse[index].count > 0 ? 1 : 0));
        } else {
          col.push(0);
        }
      }
      heatmap.push(col);
    }

    const result = {
      username,
      totalContributions,
      publicRepositories: userData.public_repos ?? reposData.length,
      languages,
      heatmap,
      starsReceived,
      followers: userData.followers || 0
    };

    cache['github'] = { data: result, timestamp: now };
    return res.json(result);
  } catch (err) {
    console.error('GitHub stats server error:', err);
    return res.status(500).json({ error: 'Failed to fetch GitHub data', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
