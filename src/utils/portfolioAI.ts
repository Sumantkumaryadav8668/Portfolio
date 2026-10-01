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
    backend: ["Node.js", "Express.js", "REST APIs", "WebSockets (Socket.io)", "JWT Authentication"],
    languages: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C++", "C"],
    databases: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "SQLite"],
    tools: ["Git", "GitHub", "Docker", "AWS", "Vite", "Postman"]
  },
  projects: [
    { title: "E-Commerce Platform", subtitle: "Full-Stack MERN E-Commerce Application (IN DEVELOPMENT)", tech: "React, Node.js, Express.js, MongoDB, Mongoose, JWT, Axios, Bcrypt" },
    { title: "SaveLife / SDEC", subtitle: "Smart Disaster & Emergency Connector System", tech: "React, Node.js, Express, MongoDB, SOS Alerts" },
    { title: "Atmos Weather App", subtitle: "Real-time Weather & Climate Analytics Dashboard", tech: "React 19, Node.js, WebSockets, Leaflet, Redis, Docker, AWS" },
    { title: "MiniShop", subtitle: "Compact Full-Stack E-Commerce & Inventory Showcase", tech: "React, Node.js, Express, REST APIs" },
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
  const rawQuery = userPrompt.trim();
  const query = rawQuery.toLowerCase();

  if (!query) {
    return "I can answer questions related to Sumant Kumar Yadav's portfolio, projects, education, skills, and experience.";
  }

  // --------------------------------------------------------------------------
  // RULE 1: Detect queries about another specific person
  // --------------------------------------------------------------------------
  const otherPeopleNames = [
    'nitish', 'rahul', 'alex', 'john', 'steve', 'david', 'priya', 'rohit',
    'amit', 'deepak', 'modi', 'trump', 'biden', 'musk', 'gates', 'zuckerberg'
  ];

  const mentionsOtherPerson = otherPeopleNames.some(name => {
    const regex = new RegExp(`\\b${name}\\b|\\b${name}'s\\b`, 'i');
    return regex.test(query);
  });

  if (mentionsOtherPerson) {
    // Extract name if matched
    const matchedName = otherPeopleNames.find(n => query.includes(n));
    const formattedName = matchedName ? matchedName.charAt(0).toUpperCase() + matchedName.slice(1) : "another person";
    return `I can only provide information related to Sumant Kumar Yadav and this portfolio. I don't have information about ${formattedName}'s academic marks or details.`;
  }

  // Check for general "what were <X>'s 10th marks" style queries where X is not Sumant
  if (/what (were|are|was) [a-z0-9_]+'s (10th|12th|marks|cgpa|salary)/i.test(query) && !query.includes('sumant') && !query.includes('yadav')) {
    return "I can only provide information related to Sumant Kumar Yadav and this portfolio.";
  }

  // --------------------------------------------------------------------------
  // RULE 2: Detect completely off-topic & general knowledge questions
  // --------------------------------------------------------------------------
  const offTopicTriggers = [
    'capital of', 'prime minister', 'president of', 'population of', 'currency of',
    'weather in', 'meaning of life', 'who won', 'recipe for', 'how to make',
    'write a python', 'write a java', 'write me a', 'write python', 'write java',
    'write C++', 'write c#', 'write code', 'write a program', 'write a script',
    'generate code', 'solve this math', 'tell me a joke', 'tell a joke',
    'what is 2+', 'what is 5+', 'who discovered', 'who invented'
  ];

  if (offTopicTriggers.some(trigger => query.includes(trigger))) {
    return "I can only answer questions related to Sumant Kumar Yadav and this portfolio.";
  }

  // --------------------------------------------------------------------------
  // RULE 3: Portfolio relevance check
  // --------------------------------------------------------------------------
  const portfolioKeywords = [
    'sumant', 'yadav', 'who is', 'about', 'bio', 'who are you', 'you', 'your',
    'education', 'school', 'college', 'btech', 'b.tech', '10th', '12th', 'class 10', 'class 12',
    'marks', 'percentage', 'cgpa', 'gpa', 'score', 'grade', 'sem', 'semester', 'ies',
    'skill', 'skills', 'react', 'next', 'node', 'express', 'mongodb', 'javascript', 'js',
    'typescript', 'ts', 'java', 'python', 'c++', 'c', 'tailwind', 'daisyui', 'framer',
    'aws', 'docker', 'git', 'database', 'frontend', 'backend', 'rest', 'api', 'socket',
    'project', 'projects', 'built', 'ecommerce', 'e-commerce', 'commerce', 'save life', 'sdec',
    'atmos', 'weather', 'minishop', 'mini shop', 'analytics', 'disaster',
    'certification', 'certifications', 'certificate', 'nptel', 'iot', 'oop',
    'achievement', 'achievements', 'award', 'hackathon', 'sih', 'scholarship', 'grant', 'rank',
    'leetcode', 'github', 'linkedin', 'contact', 'email', 'mail', 'location', 'address',
    'hire', 'intern', 'internship', 'job', 'available', 'availability', 'resume'
  ];

  const isPortfolioRelated = portfolioKeywords.some(keyword => query.includes(keyword));

  // If question is completely unrelated to portfolio domain
  if (!isPortfolioRelated) {
    return "I can only answer questions related to Sumant Kumar Yadav and this portfolio.";
  }

  // --------------------------------------------------------------------------
  // RULE 4: Check for missing personal/private details about Sumant
  // --------------------------------------------------------------------------
  const missingDetailKeys = [
    'salary', 'phone', 'mobile', 'cell', 'father', 'mother', 'parent', 'address',
    'home address', 'age', 'birthday', 'dob', 'date of birth', 'favorite', 'hobby',
    'marital', 'marry', 'wife', 'girlfriend', 'company offer', 'job offer', 'salary offer'
  ];

  if (missingDetailKeys.some(key => query.includes(key))) {
    return "I don't have that information in Sumant's portfolio.";
  }

  // --------------------------------------------------------------------------
  // RULE 5: Specific Portfolio Intent Handler
  // --------------------------------------------------------------------------

  // Who is Sumant / About
  if (query.includes('who is sumant') || query.includes('who is sumant kumar') || (query.includes('who') && query.includes('you')) || query.includes('about sumant') || query.includes('tell me about sumant')) {
    return `Sumant Kumar Yadav is a dedicated MERN Stack Developer & Systems Architect who specializes in building modern, scalable web applications with React, Next.js, Node.js, Express, and MongoDB. He is currently pursuing B.Tech in Computer Science at IES College of Technology Bhopal (CGPA 7.67) and has won 1st Place in the Smart India Hackathon.`;
  }

  // E-Commerce / MiniShop Project
  if (query.includes('ecommerce') || query.includes('e-commerce') || query.includes('commerce') || query.includes('minishop') || query.includes('mini shop')) {
    return `Sumant built the E-Commerce Platform (marked IN DEVELOPMENT) and MiniShop. The E-Commerce Platform is a full-stack MERN application featuring JWT user authentication, password hashing with bcrypt, Express REST API endpoints, Mongoose models, and React state-managed shopping cart logic with Axios.`;
  }

  // Save Life / SDEC Project
  if (query.includes('save life') || query.includes('savelife') || query.includes('sdec')) {
    return `SaveLife / SDEC (Smart Disaster & Emergency Connector System) is a smart disaster and emergency coordination application built with React, Node.js, Express, and MongoDB. It features real-time SOS alerts, user notification handlers, and offline-first emergency coordination capability.`;
  }

  // Atmos Weather App
  if (query.includes('atmos') || query.includes('weather app') || query.includes('meteorology')) {
    return `Atmos Weather App is a real-time meteorology and climate analytics dashboard built with React 19, Node.js, WebSockets, Leaflet maps, Redis caching, Docker containers, and AWS hosting.`;
  }

  // General Projects Query
  if (query.includes('project') || query.includes('projects') || query.includes('built')) {
    return `Sumant has built several major full-stack projects:\n1. E-Commerce Platform (MERN, JWT, REST API, Mongoose, Cart context)\n2. SaveLife / SDEC (Smart Disaster & Emergency Connector, SOS Alerts)\n3. Atmos Weather App (React 19, WebSockets, Leaflet, Redis, Docker, AWS)\n4. MiniShop (Full-Stack REST E-Commerce Showcase)\n5. Developer Analytics Engine (Git & GraphQL Analytics Dashboard)`;
  }

  // React Experience / Specific Tech Experience
  if (query.includes('react') || query.includes('experience with react')) {
    return `Sumant has 2+ years of experience with React (including React 19) and Next.js. He uses React to build modular component architectures, Axios stateful integrations with backend REST APIs, Framer Motion UI animations, and responsive layouts using Tailwind CSS & DaisyUI.`;
  }

  if (query.includes('node') || query.includes('express') || query.includes('backend')) {
    return `Sumant has 1+ years of backend development experience with Node.js and Express.js, designing RESTful APIs, JWT authentication middleware, password hashing with bcrypt, and MongoDB/Mongoose database models.`;
  }

  // 10th Marks
  if (query.includes('10th') || query.includes('class 10') || query.includes('10 percentage') || query.includes('10th grade') || query.includes('class x')) {
    return `Sumant scored 88.4% in Class 10 at High School Dangwar (Jharkhand) during the 2019-2020 academic session.`;
  }

  // 12th Marks
  if (query.includes('12th') || query.includes('class 12') || query.includes('12 percentage') || query.includes('12th grade') || query.includes('class xii') || query.includes('inter college')) {
    return `Sumant scored 80.2% in Class 12 Science (Physics, Chemistry, Mathematics) at Shahid Bhagat Singh Inter College Japla (Jharkhand) in 2020-2022.`;
  }

  // CGPA / B.Tech Marks
  if (query.includes('cgpa') || query.includes('gpa') || query.includes('college marks') || query.includes('btech marks') || query.includes('b.tech marks') || query.includes('sem gpa')) {
    return `Sumant's cumulative B.Tech CGPA is 7.67 / 10.0 in Computer Science at IES College of Technology Bhopal. Semester GPAs: Sem 1 (6.71), Sem 2 (7.5), Sem 3 (7.4), Sem 4 (7.5), Sem 5 (8.6).`;
  }

  // Education Overview
  if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('btech') || query.includes('b.tech') || query.includes('degree') || query.includes('study')) {
    return `Sumant's educational qualifications:\n- B.Tech in Computer Science: IES College of Technology Bhopal (2023-2027), CGPA: 7.67 / 10.0\n- Class 12 (Science): Shahid Bhagat Singh Inter College Japla (2020-2022), Score: 80.2%\n- Class 10: High School Dangwar (2019-2020), Score: 88.4%`;
  }

  // Skills
  if (query.includes('skill') || query.includes('skills') || query.includes('tech stack') || query.includes('languages') || query.includes('frameworks') || query.includes('technology') || query.includes('technologies')) {
    const s = staticPortfolioContext.skills;
    return `Sumant's core skills include:\n- Frontend: ${s.frontend.join(', ')}\n- Backend: ${s.backend.join(', ')}\n- Programming Languages: ${s.languages.join(', ')}\n- Databases: ${s.databases.join(', ')}\n- Tools & Cloud: ${s.tools.join(', ')}`;
  }

  // Certifications
  if (query.includes('certification') || query.includes('certifications') || query.includes('certificate') || query.includes('nptel') || query.includes('credential')) {
    const cList = staticPortfolioContext.certifications.map((c, i) => `${i + 1}. ${c.title} — ${c.issuer} (${c.date}${c.id ? `, ID: ${c.id}` : ''})`).join('\n');
    return `Sumant holds the following verified certificates:\n${cList}`;
  }

  // Achievements
  if (query.includes('achievement') || query.includes('achievements') || query.includes('award') || query.includes('hackathon') || query.includes('sih') || query.includes('scholarship') || query.includes('grant')) {
    const aList = staticPortfolioContext.achievements.map((a, i) => `${i + 1}. ${a.title} (${a.issuer}${a.metric ? ` - ${a.metric}` : ''})`).join('\n');
    return `Sumant's key achievements include:\n${aList}`;
  }

  // LeetCode Stats
  if (query.includes('leetcode') || query.includes('leet code') || query.includes('coding profile') || query.includes('knight')) {
    const ls = staticPortfolioContext.leetcodeStats;
    return `Sumant's LeetCode profile data (@Suman_tkumaryadav):\n- Total Solved: ${ls.totalSolved} (Easy: ${ls.easySolved}, Medium: ${ls.mediumSolved}, Hard: ${ls.hardSolved})\n- Rating Tier: Knight (Top 3.5% globally)\n- Global Rank: #${ls.ranking.toLocaleString()}\n- Total Submissions: ${ls.totalSubmissions}\n- Active Days: ${ls.activeDays} days\n- Max Streak: ${ls.streak} days`;
  }

  // GitHub Stats
  if (query.includes('github') || query.includes('git stats') || query.includes('contributions') || query.includes('commit')) {
    const gs = staticPortfolioContext.githubStats;
    return `Sumant's GitHub data (@${gs.username}):\n- Total Contributions: ${gs.totalContributions} in the past 12 months\n- Public Repositories: ${gs.publicRepositories}\n- Top Languages: ${gs.topLanguages.join(', ')}\nProfile Link: https://github.com/Sumantkumaryadav8668`;
  }

  // Contact / Email / Location / Internship Availability
  if (query.includes('contact') || query.includes('email') || query.includes('mail') || query.includes('hire') || query.includes('reach') || query.includes('location') || query.includes('intern') || query.includes('internship') || query.includes('available') || query.includes('job')) {
    return `Sumant is actively AVAILABLE FOR FULL-TIME ROLES & INTERNSHIPS. You can contact him via email at sumantkumaryadav526@gmail.com. Location: India (Open to Remote). LinkedIn: https://www.linkedin.com/in/yadavsumant/ | GitHub: https://github.com/Sumantkumaryadav8668`;
  }

  // Fallback if related to portfolio but specific detail not found
  return "I don't have that information in Sumant's portfolio.";
}

