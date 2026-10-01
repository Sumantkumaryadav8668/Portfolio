import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const cache = {};
const CACHE_TTL = 15 * 60 * 1000;

async function getEmailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host: host || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass }
    });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'sumantkumaryadav526@gmail.com';

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER || process.env.EMAIL_USER || 'portfolio@sumant.dev'}>`,
    to: recipient,
    replyTo: email,
    subject: `[Portfolio Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #2563EB;">New Contact Message from Portfolio</h2>
        <p><strong>Name:</strong> ${String(name).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <p><strong>Email:</strong> ${String(email).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <p><strong>Subject:</strong> ${String(subject).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    `
  };

  try {
    const transporter = await getEmailTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', info.messageId);

    return res.status(200).json({
      success: true,
      message: 'Email delivered successfully.',
      recipient: recipient,
      messageId: info.messageId
    });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return res.status(500).json({
      error: 'Failed to deliver contact email',
      details: err.message
    });
  }
});

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
