import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

interface LeetCodeSubmissionItem {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetCodeQuestionCount {
  difficulty: string;
  count: number;
}

interface LeetCodeGraphQLResponse {
  data?: {
    matchedUser?: {
      username?: string;
      profile?: {
        ranking?: number;
        reputation?: number;
        starRating?: number;
      };
      submitStats?: {
        acSubmissionNum?: LeetCodeSubmissionItem[];
        totalSubmissionNum?: LeetCodeSubmissionItem[];
      };
      badges?: { id: string; displayName: string; icon: string }[];
      userCalendar?: {
        activeYears?: number[];
        streak?: number;
        totalActiveDays?: number;
      };
    };
    allQuestionsCount?: LeetCodeQuestionCount[];
  };
}

interface GitHubUserResponse {
  public_repos?: number;
  followers?: number;
}

interface GitHubRepoItem {
  stargazers_count?: number;
  fork?: boolean;
  languages_url?: string;
}

interface GitHubGraphQLResponse {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: {
            contributionDays?: {
              contributionCount: number;
              date: string;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
  };
}

interface GitHubContributionsApiResponse {
  total?: number | { lastYear?: number };
  contributions?: { date: string; count: number; level: number }[];
}

// In-memory cache for API endpoints
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

function apiMiddlewarePlugin(): Plugin {
  return {
    name: 'api-middleware-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Endpoint: GET /api/leetcode
        if (url.startsWith('/api/leetcode')) {
          if (req.method !== 'GET') {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          const forceRefresh = url.includes('refresh=true');
          const now = Date.now();
          if (!forceRefresh && cache['leetcode'] && now - cache['leetcode'].timestamp < CACHE_TTL) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cache['leetcode'].data));
            return;
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

            const data = (await response.json()) as LeetCodeGraphQLResponse;
            const matchedUser = data?.data?.matchedUser;
            const allQuestionsCount = data?.data?.allQuestionsCount || [];

            if (!matchedUser) {
              res.statusCode = 404;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'LeetCode user not found' }));
              return;
            }

            const submitStats = matchedUser.submitStats?.acSubmissionNum || [];
            const totalSubStats = matchedUser.submitStats?.totalSubmissionNum || [];
            const getCount = (diff: string) => submitStats.find((s) => s.difficulty === diff)?.count || 0;
            const getTotalCount = (diff: string) => allQuestionsCount.find((s) => s.difficulty === diff)?.count || 0;
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
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch LeetCode data', details: errorMessage }));
          }
          return;
        }

        // Endpoint: GET /api/github/stats
        if (url.startsWith('/api/github/stats')) {
          if (req.method !== 'GET') {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
          }

          const forceRefresh = url.includes('refresh=true');
          const now = Date.now();
          if (!forceRefresh && cache['github'] && now - cache['github'].timestamp < CACHE_TTL) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cache['github'].data));
            return;
          }

          const username = 'Sumantkumaryadav8668';

          try {
            const headers: Record<string, string> = {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            };
            if (process.env.GITHUB_TOKEN) {
              headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
            }

            // 1. Fetch User Data
            const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
            if (!userRes.ok) {
              const errBody = await userRes.text();
              throw new Error(`GitHub user API returned status ${userRes.status}: ${errBody}`);
            }
            const userData = (await userRes.json()) as GitHubUserResponse;

            // 2. Fetch Repositories
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
            if (!reposRes.ok) {
              const errBody = await reposRes.text();
              throw new Error(`GitHub repos API returned status ${reposRes.status}: ${errBody}`);
            }
            const reposData = (await reposRes.json()) as GitHubRepoItem[];

            // 3. Compute Language Distribution & Stars
            const langBytes: Record<string, number> = {};
            let totalBytes = 0;
            let starsReceived = 0;

            for (const repo of reposData) {
              starsReceived += repo.stargazers_count || 0;
              if (repo.fork || !repo.languages_url) continue;

              try {
                const langRes = await fetch(repo.languages_url, { headers });
                if (langRes.ok) {
                  const langs = (await langRes.json()) as Record<string, number>;
                  for (const [lang, bytes] of Object.entries(langs)) {
                    langBytes[lang] = (langBytes[lang] || 0) + bytes;
                    totalBytes += bytes;
                  }
                }
              } catch {
                // Ignore individual repo language failures
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

            // 4. Fetch Contributions
            let totalContributions = 0;
            let rawDays: { date: string; count: number; level: number }[] = [];

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
                  const gqlData = (await gqlRes.json()) as GitHubGraphQLResponse;
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
                console.error('GitHub GraphQL Error:', gqlErr);
              }
            }

            // Fallback to public contribution endpoint if GraphQL not used or failed
            if (rawDays.length === 0) {
              const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
              if (!contribRes.ok) {
                throw new Error(`GitHub contributions API returned status ${contribRes.status}`);
              }
              const contribData = (await contribRes.json()) as GitHubContributionsApiResponse;
              const totalVal = contribData.total;
              totalContributions = typeof totalVal === 'number' ? totalVal : (totalVal?.lastYear ?? 0);
              if (Array.isArray(contribData.contributions)) {
                rawDays = contribData.contributions;
              }
            }

            // Transform rawDays into 28 columns x 7 rows matrix (recent 196 days)
            const daysToUse = rawDays.slice(-196);
            const heatmap: number[][] = [];
            for (let c = 0; c < 28; c++) {
              const col: number[] = [];
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
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.error('Error fetching GitHub stats:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to fetch GitHub data', details: errorMessage }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiMiddlewarePlugin()],
});
