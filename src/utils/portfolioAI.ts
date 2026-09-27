/**
 * Single Portfolio Assistant Engine for Sumant Kumar Yadav.
 * Strictly answers ONLY using information explicitly available in Sumant's portfolio data.
 */

export interface PortfolioData {
  name: string;
  email: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  education: {
    class10: { score: string; institution: string; year: string };
    class12: { score: string; institution: string; year: string; stream: string };
    btech: { degree: string; institution: string; duration: string; cgpa: string; semGPA: Record<string, number> };
  };
  skills: {
    frontend: string[];
    backend: string[];
    languages: string[];
    databases: string[];
    tools: string[];
  };
  projects: Array<{ title: string; subtitle: string; tech: string }>;
  certifications: Array<{ title: string; issuer: string; date: string; id?: string; badge?: string }>;
  achievements: Array<{ title: string; issuer: string; metric?: string }>;
  leetcodeStats: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
    totalSubmissions: number;
    activeDays: number;
    streak: number;
    badgesCount: number;
  };
  githubStats: {
    username: string;
    totalContributions: number;
    publicRepositories: number;
    topLanguages: string[];
  };
}

export const staticPortfolioContext: PortfolioData = {
  name: "Sumant Kumar Yadav",
  email: "sumantkumaryadav526@gmail.com",
  location: "India · Open to Remote",
  githubUrl: "https://github.com/Sumantkumaryadav8668",
  linkedinUrl: "https://www.linkedin.com/in/yadavsumant/",
  leetcodeUrl: "https://leetcode.com/u/Suman_tkumaryadav/",
  education: {
    class10: {
      score: "88.4%",
      institution: "High School Dangwar (Jharkhand)",
      year: "2019 - 2020"
    },
    class12: {
      score: "80.2%",
      institution: "Shahid Bhagat Singh Inter College Japla (Jharkhand)",
      year: "2020 - 2022",
      stream: "Science (Physics, Chemistry, Mathematics)"
    },
    btech: {
      degree: "Bachelor of Technology in Computer Science",
      institution: "IES College of Technology Bhopal",
      duration: "2023 - 2027",
      cgpa: "7.67 / 10.0",
      semGPA: { "Sem 1": 6.71, "Sem 2": 7.5, "Sem 3": 7.4, "Sem 4": 7.5, "Sem 5": 8.6 }
    }
  },
  skills: {
    frontend: ["React 19", "Next.js", "Tailwind CSS", "DaisyUI", "Framer Motion"],
    backend: ["Node.js", "Express", "REST APIs", "WebSockets (Socket.io)"],
    languages: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C++", "C"],
    databases: ["MongoDB", "PostgreSQL", "Redis", "SQLite", "IndexedDB"],
    tools: ["Git", "GitHub", "Docker", "AWS"]
  },
  projects: [
    { title: "Atmos Weather App", subtitle: "Real-time Weather & Climate Analytics Dashboard", tech: "React 19, Node.js, WebSockets, Leaflet, Redis, Docker, AWS" },
    { title: "SaveLife / SDEC", subtitle: "Smart Disaster & Emergency Connector System", tech: "React, Node.js, Express, MongoDB, SOS Alerts" },
    { title: "Developer Analytics Engine", subtitle: "Visual Git & Performance Analytics Dashboard", tech: "React 19, TypeScript, SVG Renderers, GitHub GraphQL" },
    { title: "Smart Disaster Emergency Controller", subtitle: "Offline-First Emergency Coordination Hub", tech: "React 19, PWA, SQLite/IndexedDB, LoRa Mesh API" }
  ],
  certifications: [
    { title: "Introduction to Internet of Things", issuer: "NPTEL", date: "Jan–Apr 2025", id: "NPTEL25CS44S342801517", badge: "Elite" },
    { title: "Fundamentals of Object Oriented Programming", issuer: "NPTEL", date: "Jan–Apr 2025", id: "NPTEL25CS34S542801041", badge: "CERTIFICATE" },
    { title: "Volunteer — Regional Mentoring Session on Innovation", issuer: "IES College of Technology, Bhopal", date: "April 2026", badge: "CERTIFICATE" }
  ],
  achievements: [
    { title: "Smart India Hackathon - First Place", issuer: "Ministry of Education, Govt. of India", metric: "National Winner" },
    { title: "LeetCode Coding Profile Rating", issuer: "LeetCode platform", metric: "Knight (Top 3.5%)" },
    { title: "GeeksforGeeks Institution Rank 5", issuer: "GeeksforGeeks portal", metric: "Rank #5 / 15,000+" },
    { title: "Academic Excellence Scholarship", issuer: "University Senate board", metric: "100% Tuition Waiver" },
    { title: "Climate Innovation Grant Award", issuer: "University Entrepreneurship Cell", metric: "$12,000 Grant" }
  ],
  leetcodeStats: {
    totalSolved: 114,
    easySolved: 64,
    mediumSolved: 48,
    hardSolved: 2,
    ranking: 1502408,
    totalSubmissions: 325,
    activeDays: 98,
    streak: 36,
    badgesCount: 1
  },
  githubStats: {
    username: "Sumantkumaryadav8668",
    totalContributions: 190,
    publicRepositories: 4,
    topLanguages: ["JavaScript (77%)", "HTML (12%)", "CSS (11%)"]
  }
};

export function queryPortfolioAI(userPrompt: string): string {
  const query = userPrompt.trim().toLowerCase();

  // 1. Prompt Injection & Jailbreak Defense
  const injectionPatterns = [
    'ignore', 'forget', 'override', 'bypass', 'act as', 'system prompt',
    'previous instruction', 'all rules', 'dan', 'jailbreak', 'chatgpt'
  ];
  if (injectionPatterns.some(pat => query.includes(pat))) {
    return "I can only answer questions about Sumant Kumar Yadav and the information available in his portfolio.";
  }

  // 2. Unrelated Off-Topic & General Knowledge Defense
  const offTopicPatterns = [
    'prime minister', 'president', 'capital of', 'who is', 'weather in',
    'write me a', 'write a python', 'write a java', 'write code', 'solve this',
    'tell me a joke', 'recipe', 'meaning of life', 'who won', 'population of'
  ];
  if (offTopicPatterns.some(pat => query.includes(pat))) {
    return "I can only answer questions about Sumant Kumar Yadav and the information available in his portfolio.";
  }

  // 3. Specific Portfolio Queries

  // Class 10 Percentage
  if (query.includes('10th') || query.includes('class 10') || query.includes('10 percentage') || query.includes('10th grade') || query.includes('class x')) {
    return `Sumant scored ${staticPortfolioContext.education.class10.score} in Class 10 (${staticPortfolioContext.education.class10.institution}, ${staticPortfolioContext.education.class10.year}).`;
  }

  // Class 12 Percentage
  if (query.includes('12th') || query.includes('class 12') || query.includes('12 percentage') || query.includes('12th grade') || query.includes('class xii') || query.includes('inter college')) {
    return `Sumant scored ${staticPortfolioContext.education.class12.score} in Class 12 (${staticPortfolioContext.education.class12.stream} at ${staticPortfolioContext.education.class12.institution}, ${staticPortfolioContext.education.class12.year}).`;
  }

  // CGPA / College Marks
  if (query.includes('cgpa') || query.includes('gpa') || query.includes('college marks') || query.includes('btech marks') || query.includes('b.tech marks') || query.includes('sem gpa')) {
    return `Sumant's cumulative B.Tech CGPA is ${staticPortfolioContext.education.btech.cgpa} at ${staticPortfolioContext.education.btech.institution}. Semester breakdowns: Sem 1 (6.71), Sem 2 (7.5), Sem 3 (7.4), Sem 4 (7.5), Sem 5 (8.6).`;
  }

  // Education / College / Degree
  if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('btech') || query.includes('b.tech') || query.includes('degree') || query.includes('study')) {
    return `Sumant is pursuing a ${staticPortfolioContext.education.btech.degree} at ${staticPortfolioContext.education.btech.institution} (${staticPortfolioContext.education.btech.duration}) with a CGPA of ${staticPortfolioContext.education.btech.cgpa}.\n\nSchooling history:\n- 12th Grade: ${staticPortfolioContext.education.class12.score} (${staticPortfolioContext.education.class12.institution})\n- 10th Grade: ${staticPortfolioContext.education.class10.score} (${staticPortfolioContext.education.class10.institution})`;
  }

  // LeetCode Data
  if (query.includes('leetcode') || query.includes('leet code') || query.includes('coding profile') || query.includes('problems solved')) {
    const ls = staticPortfolioContext.leetcodeStats;
    return `Sumant's LeetCode profile data:\n- Total Solved: ${ls.totalSolved} (Easy: ${ls.easySolved}, Medium: ${ls.mediumSolved}, Hard: ${ls.hardSolved})\n- Global Ranking: #${ls.ranking.toLocaleString()}\n- Total Submissions: ${ls.totalSubmissions}\n- Active Days: ${ls.activeDays} days\n- Max Streak: ${ls.streak} days\n- Badges: ${ls.badgesCount}`;
  }

  // GitHub Data
  if (query.includes('github') || query.includes('git stats') || query.includes('contributions') || query.includes('commit')) {
    const gs = staticPortfolioContext.githubStats;
    return `Sumant's GitHub data (@${gs.username}):\n- Total Contributions: ${gs.totalContributions} in the past 12 months\n- Public Repositories: ${gs.publicRepositories}\n- Top Languages: ${gs.topLanguages.join(', ')}`;
  }

  // Projects
  if (query.includes('project') || query.includes('built') || query.includes('atmos') || query.includes('sdec') || query.includes('save life') || query.includes('disaster')) {
    const pList = staticPortfolioContext.projects.map((p, i) => `${i + 1}. ${p.title}: ${p.subtitle} (${p.tech})`).join('\n');
    return `Sumant has built the following projects:\n${pList}`;
  }

  // Certifications
  if (query.includes('certification') || query.includes('certificate') || query.includes('credential') || query.includes('nptel')) {
    const cList = staticPortfolioContext.certifications.map((c, i) => `${i + 1}. ${c.title} — ${c.issuer} (${c.date}${c.id ? `, ID: ${c.id}` : ''})`).join('\n');
    return `Sumant holds the following verified certificates:\n${cList}`;
  }

  // Achievements / Awards
  if (query.includes('achievement') || query.includes('award') || query.includes('hackathon') || query.includes('sih') || query.includes('scholarship') || query.includes('grant')) {
    const aList = staticPortfolioContext.achievements.map((a, i) => `${i + 1}. ${a.title} (${a.issuer}${a.metric ? ` - ${a.metric}` : ''})`).join('\n');
    return `Sumant's top achievements include:\n${aList}`;
  }

  // Skills
  if (query.includes('skill') || query.includes('tech stack') || query.includes('languages') || query.includes('frameworks') || query.includes('frontend') || query.includes('backend') || query.includes('database')) {
    const s = staticPortfolioContext.skills;
    return `Sumant's skills include:\n- Frontend: ${s.frontend.join(', ')}\n- Backend: ${s.backend.join(', ')}\n- Programming Languages: ${s.languages.join(', ')}\n- Databases: ${s.databases.join(', ')}\n- Tools: ${s.tools.join(', ')}`;
  }

  // Contact / Email / Location
  if (query.includes('contact') || query.includes('email') || query.includes('mail') || query.includes('hire') || query.includes('reach') || query.includes('location') || query.includes('address')) {
    return `You can contact Sumant via email at ${staticPortfolioContext.email}. Location: ${staticPortfolioContext.location}. You can also connect on LinkedIn (${staticPortfolioContext.linkedinUrl}) or GitHub (${staticPortfolioContext.githubUrl}).`;
  }

  // 4. Check for Missing Personal Details (Father's name, age, salary, etc.)
  const missingPersonalKeys = ['father', 'mother', 'parent', 'phone', 'mobile', 'address', 'age', 'birthday', 'dob', 'salary', 'favorite', 'hobby'];
  if (missingPersonalKeys.some(k => query.includes(k))) {
    return "I don't have that information in Sumant's portfolio.";
  }

  // 5. Default Fallback
  return "I don't have that information in Sumant's portfolio.";
}
