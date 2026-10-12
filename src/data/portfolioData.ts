export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'education' | 'experience' | 'milestone';
  skills?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  score: string;
  scoreLabel: string;
  courses: string[];
  achievements: string[];
  semesterPerformance?: { sem: string; gpa: number }[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  experience: string; // e.g. "3+ Years"
  projectsUsed: string[];
  iconName: string; // Used to map to React Icons dynamically
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  featured: boolean;
  category: 'major' | 'minor';
  status?: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  architecture: string;
  responsibilities: string[];
  challenges: string;
  solutions: string;
  metrics: { label: string; value: string }[];
  gallery: string[];
  caseStudy: string; // Markdown supported
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  badgeText?: string;
  description?: string;
  skillsLearned?: string[];
  verificationUrl: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'award' | 'coding' | 'academic' | 'startup';
  issuer: string;
  date: string;
  description: string;
  metric?: string;
}

export interface Blog {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  summary: string;
  content: string; // Markdown article content
}

export const journeyData: JourneyItem[] = [
  {
    id: 'school',
    year: '2019 - 2020',
    title: 'Secondary School Education (10th)',
    subtitle: 'High School Dangwar (Jharkhand)',
    description: 'Achieved 88.4% in Class 10 while building a strong academic foundation. Alongside academics, secured 1st Place in the Kabaddi Competition, strengthening teamwork, discipline, leadership, and perseverance.',
    category: 'education',
    skills: ['Maths', 'Science', 'English', 'Hindi' , 'Social Science']
  },
  {
    id: 'high-school',
    year: '2020 - 2022',
    title: 'Senior Secondary Education (12th Grade)',
    subtitle: 'Shahid Bhagat Singh Inter College Japla (Jharkhand)',
    description: 'Completed Higher Secondary Education with 80.2% in the Science stream (Physics, Chemistry, and Mathematics), strengthening analytical thinking and problem-solving skills.',
    category: 'education',
    skills: ['Mathematics', 'Physics', 'Chemistry', 'Biology' , 'English']
  },
  {
    id: 'btech',
    year: '2023 - 2027',
    title: 'Bachelor of Technology in Computer Science',
    subtitle: 'IES College of Technology Bhopal',
    description: 'Specialized in Full Stack Web Development and Software Systems Design. Led university programming club, participated in multiple national hackathons, and pioneered the Atmos Weather App.',
    category: 'education',
    skills: ['Data Structures', 'DBMS', 'Operating System', 'OOPs' , 'Software Engineering']
  },
  {
    id: 'atmos-project',
    year: '2026 - Present',
    title: 'Smart Disaster & Emergency Coordination System',
    subtitle: 'Save Life',
    description: 'Engineered SaveLife – Smart Disaster & Emergency Connector (SDEC), a MERN Stack application providing secure authentication, SOS alerts, live location sharing, and seamless connectivity with emergency response services.',
    category: 'experience',
    skills: ['React' , 'Node.js', 'Expres.js', 'MongoDB', 'Rest API', 'SOS']
  }
];

export const educationData: EducationItem[] = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'IES College of Technology Bhopal',
    duration: '2023 - 2027',
    score: '7.67 / 10.0',
    scoreLabel: 'CGPA',
    courses: ['Data Structures & Algorithms', 'Object Oriented Systems', 'Database Management Systems', 'Software Engineering', 'Computer Networks', 'Operating Systems'],
    achievements: ['Technical Event Coordinator'],
    semesterPerformance: [
      { sem: 'Sem 1', gpa: 6.71 },
      { sem: 'Sem 2', gpa: 7.5 },
      { sem: 'Sem 3', gpa: 7.4 },
      { sem: 'Sem 4', gpa: 7.5 },
      { sem: 'Sem 5', gpa: 8.6 }
    ]
  },
  {
    id: '12th',
    degree: 'Higher Secondary School Certificate (12th Grade)',
    institution: 'Shahid Bhagat Singh Inter College Japla (Jharkhand)',
    duration: '2020 - 2022',
    score: '80.2%',
    scoreLabel: 'Percentage',
    courses: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    achievements: ['Secured 3rd Rank in Coaching Institute']
  },
  {
    id: '10th',
    degree: 'Secondary School Education (10th Grade)',
    institution: 'High School Dangwar (Jharkhand)',
    duration: '2019 - 2020',
    score: '88.4%',
    scoreLabel: 'Percentage',
    courses: ['Maths','Science','English','Hindi','Social Science'],
    achievements: ['Secured 2nd Rank in Coaching Institute']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', level: 85, experience: '2+ Years', projectsUsed: ['E-Commerce Platform', 'Save Life', 'Atmos Weather App'], iconName: 'FaReact' },
      { name: 'HTML', level: 90, experience: '4 Years', projectsUsed: ['All Projects', 'Tic Tac Toe'], iconName: 'FaHtml5' },
      { name: 'CSS', level: 85, experience: '4 Years', projectsUsed: ['All Projects', 'Portfolio'], iconName: 'FaCss3Alt' },
      { name: 'Tailwind CSS / DaisyUI', level: 80, experience: '2 Years', projectsUsed: ['Atmos Weather App', 'Portfolio'], iconName: 'SiTailwindcss' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 80, experience: '2 Years', projectsUsed: ['Save Life', 'E-Commerce Platform', 'MERN MiniShop'], iconName: 'FaNodeJs' },
      { name: 'Express.js', level: 80, experience: '2 Years', projectsUsed: ['Save Life', 'E-Commerce Platform', 'MERN MiniShop'], iconName: 'SiExpress' }
    ]
  },
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Java', level: 82, experience: '3 Years', projectsUsed: ['Data Structures', 'LeetCode Algorithms'], iconName: 'FaJava' },
      { name: 'C++', level: 85, experience: '2+ Years', projectsUsed: ['Competitive Coding', 'LeetCode Algorithms'], iconName: 'SiCplusplus' },
      { name: 'JavaScript', level: 88, experience: '4 Years', projectsUsed: ['All Web Projects', 'Node.js Backend'], iconName: 'FaJs' }
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', level: 78, experience: '2 Years', projectsUsed: ['E-Commerce Platform', 'Save Life', 'MERN MiniShop'], iconName: 'SiMongodb' }
    ]
  },
  {
    category: 'Tools & AI',
    skills: [
      { name: 'Git & Version Control', level: 85, experience: '3 Years', projectsUsed: ['All Repositories'], iconName: 'FaGitAlt' }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: 'store-management',
    title: 'Store Management',
    subtitle: 'Full-Stack Store Management Application',
    description: 'A full-stack Store Management application built with React, Node.js, Express.js, and MySQL. It includes role-based authentication for Admins, Store Owners, and Normal Users, store management, ratings, search, sorting, pagination, and protected dashboards.',
    longDescription: 'A full-stack Store Management application built with React, Node.js, Express.js, and MySQL. It includes role-based authentication for Admins, Store Owners, and Normal Users, store management, ratings, search, sorting, pagination, and protected dashboards.',
    featured: true,
    category: 'major',
    status: 'COMPLETED',
    image: '/store_management.jpg',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'RBAC', 'REST API', 'ES Modules'],
    githubUrl: 'https://github.com/Sumantkumaryadav8668/Roxiler_full-stack',
    liveUrl: 'https://roxiler-store.vercel.app/login',
    architecture: 'The backend follows a modular structure with separate config, controllers, middleware, models, routes, utilities, validators, scripts, and tests folders. It uses ES Modules with import and export, and separates Express app configuration from HTTP server startup.',
    responsibilities: [
      'Role-based authentication and authorization (Admin, Store Owner, Normal User).',
      'Admin dashboard with statistics and user/store management.',
      'Store ratings from 1 to 5 with rating modification and duplicate-rating prevention.',
      'Search, sorting, and pagination.',
      'Secure JWT authentication and protected routes.',
      'Password visibility toggle on relevant forms.',
      'Structured backend using ES Modules and separation of concerns.',
      'Database integrity and safe seeding practices.',
      'Automated API testing with 22/22 tests passing in the reported test run.'
    ],
    challenges: 'Handling multi-tier role authorization across Admins, Store Owners, and Normal Users while maintaining store rating integrity and duplicate-rating prevention.',
    solutions: 'Implemented structured ES Module middleware for token authentication and permission verification, combined with database constraints and transactional rating logic.',
    metrics: [
      { label: 'API Testing', value: '22/22 Passed' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Authentication', value: 'Role-Based JWT' },
      { label: 'Store Ratings', value: '1 to 5 Stars' }
    ],
    gallery: [],
    caseStudy: `### Store Management Overview

A full-stack Store Management application built with React, Node.js, Express.js, and MySQL. It includes role-based authentication for Admins, Store Owners, and Normal Users, store management, ratings, search, sorting, pagination, and protected dashboards.

#### Key Features
- **Role-based Authentication & Authorization**: Granular access control for Admins, Store Owners, and Normal Users with secure JWT authentication and protected routes.
- **Admin Dashboard**: Centralized management panel with system statistics and user/store administrative tools.
- **Store Ratings Engine**: 1 to 5 star rating system with rating modification support and duplicate-rating prevention.
- **Search, Sorting & Pagination**: Robust server-side and client-side handling for store listings and catalog discovery.
- **Form Security & Usability**: Password visibility toggles on relevant authentication and registration forms.
- **Modular Backend Architecture**: Backend structured with ES Modules (\`import\`/\`export\`) separating Express configuration from HTTP server startup across config, controllers, middleware, models, routes, utilities, validators, scripts, and tests folders.
- **Database Integrity & Testing**: Safe database seeding practices with automated API testing achieving 22/22 tests passing.`
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack E-Commerce Application',
    description: 'A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, featuring user authentication, product management, cart functionality, and a structured backend API.',
    longDescription: 'A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, featuring user authentication, product management, cart functionality, and a structured backend API.',
    featured: true,
    category: 'major',
    status: 'IN DEVELOPMENT',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Axios'],
    githubUrl: 'https://github.com/Sumantkumaryadav8668/Hackathons/tree/main/E_Commerse',
    liveUrl: 'https://ecommerce-minishop.vercel.app/',
    architecture: 'Full-stack MERN (MongoDB, Express, React, Node.js) architecture featuring JWT user authentication middleware, Express REST APIs, Mongoose database models, and React state-managed shopping cart logic.',
    responsibilities: [
      'Developed RESTful API endpoints in Express.js for user signup, user login, user logout, and user profile management.',
      'Structured Mongoose data models for User accounts and Product catalogs.',
      'Configured JWT authentication headers and password hashing using bcrypt for secure session control.',
      'Implemented frontend React components with Axios for stateful integration with backend REST endpoints.'
    ],
    challenges: 'Structuring secure user session authentication and managing synchronized shopping cart state cleanly across components.',
    solutions: 'Implemented JWT token verification headers in Axios request interceptors and created unified React Context handlers for cart lifecycle events.',
    metrics: [
      { label: 'Authentication', value: 'JWT & Bcrypt' },
      { label: 'Product Management', value: 'REST API' },
      { label: 'Cart System', value: 'React Context' },
      { label: 'Database', value: 'MongoDB & Mongoose' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80'
    ],
    caseStudy: `### Summary of the E-Commerce Platform Project

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB, featuring user authentication, product management, cart functionality, and a structured backend API.

#### Core Technical Implementation
1. **User Authentication**: Secure user signup, login, and logout endpoints powered by JSON Web Tokens (JWT) and encrypted password hashing.
2. **Product Management API**: Structured RESTful routes enabling querying, retrieving, and organizing product metadata.
3. **Cart System**: Client-side cart state integration communicating directly with backend session endpoints.
`
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    subtitle: 'Interactive Frontend Game',
    description: 'An interactive Tic Tac Toe game built as a frontend project with a simple and responsive game interface.',
    longDescription: 'An interactive Tic Tac Toe game built as a frontend project with a simple and responsive game interface.',
    featured: false,
    category: 'minor',
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Frontend'],
    githubUrl: 'https://github.com/Sumantkumaryadav8668/Thunder/tree/main/Lec_14-Project-API/Tik_Tak_Toe',
    liveUrl: 'https://sumant-tic-tac-toe.netlify.app/',
    architecture: 'Client-side frontend application built with vanilla JavaScript, HTML5, and CSS3.',
    responsibilities: [
      'Engineered interactive game grid mechanics, turn toggling logic, and win/draw condition evaluations.',
      'Designed responsive CSS styling for optimal gameplay experience across mobile and desktop devices.'
    ],
    challenges: 'Managing game turn state transitions and immediate board resets cleanly.',
    solutions: 'Encapsulated game logic inside pure state handler functions and clean DOM event listeners.',
    metrics: [
      { label: 'Category', value: 'Minor Project' },
      { label: 'Interface', value: 'Responsive Web' }
    ],
    gallery: [],
    caseStudy: `### Tic Tac Toe Project Overview

An interactive Tic Tac Toe game built as a frontend project with a simple and responsive game interface.
`
  },
  {
    id: 'atmos-weather-minor',
    title: 'Atmos Weather App',
    subtitle: 'Real-time Weather & Location Search Dashboard',
    description: 'A weather application that provides real-time weather information with location search and a clean interactive dashboard.',
    longDescription: 'A weather application that provides real-time weather information with location search and a clean interactive dashboard.',
    featured: false,
    category: 'minor',
    image: '/atmos_main.jpg',
    tags: ['React', 'JavaScript', 'Weather API', 'CSS3'],
    githubUrl: 'https://github.com/Sumantkumaryadav8668/Hackathons/tree/main/weather-app',
    liveUrl: 'https://weather-app-68.netlify.app/',
    architecture: 'React-based weather monitoring dashboard consuming real-time weather APIs for local and international location forecasts.',
    responsibilities: [
      'Developed real-time location search, weather parameter cards, and interactive dashboard views.',
      'Designed clean responsive layouts for mobile and desktop screens.'
    ],
    challenges: 'Providing immediate UI updates for location queries while handling asynchronous API responses.',
    solutions: 'Structured clean API fetching routines with error boundaries and fallback state indicators.',
    metrics: [
      { label: 'Category', value: 'Minor Project' },
      { label: 'Deployment', value: 'Netlify' }
    ],
    gallery: ['/atmos_gallery1.jpg', '/atmos_gallery2.jpg'],
    caseStudy: `### Atmos Weather App (Minor Project)

A weather application that provides real-time weather information with location search and a clean interactive dashboard.
`
  },
  {
    id: 'system-inspector-pro',
    title: 'System Inspector Pro',
    subtitle: 'System Inspection & Monitoring Dashboard',
    description: 'A system inspection dashboard that displays system information and provides an interactive interface for monitoring and managing system-related details.',
    longDescription: 'A system inspection dashboard that displays system information and provides an interactive interface for monitoring and managing system-related details.',
    featured: false,
    category: 'minor',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'System Analytics', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Sumantkumaryadav8668/Hackathons/tree/main/System-Inspector-Pro',
    liveUrl: 'https://system-inspector-pro.netlify.app/',
    architecture: 'React & TypeScript dashboard for visualizing system specs, performance metrics, and diagnostic info.',
    responsibilities: [
      'Engineered system info display cards, diagnostic monitoring panels, and interactive state triggers.',
      'Configured Tailwind CSS utility styling for a futuristic dark system monitor theme.'
    ],
    challenges: 'Presenting dense system inspection data clearly in a compact, readable interface.',
    solutions: 'Organized data into modular grid panels with visual status tags and dark glassmorphic cards.',
    metrics: [
      { label: 'Category', value: 'Minor Project' },
      { label: 'Deployment', value: 'Netlify' }
    ],
    gallery: [],
    caseStudy: `### System Inspector Pro

A system inspection dashboard that displays system information and provides an interactive interface for monitoring and managing system-related details.
`
  }
];

export const certificationsData: Certification[] = [
  {
    id: 'volunteer-mentoring',
    title: 'Regional Mentoring Session on Innovation',
    issuer: 'IES College of Technology, Bhopal',
    issueDate: 'April 2026',
    badgeText: 'Volunteer Certificate',
    description: 'Volunteer contribution in the Three-Day Regional Mentoring Session on Innovation for Teachers & Students of PM SHRI Schools.',
    verificationUrl: 'https://drive.google.com/file/d/18WiZb9tO4ysWXcRNTg1zU-JT6D6bQ2cq/view?usp=drivesdk'
  },
  {
    id: 'nptel-iot',
    title: 'Introduction to Internet of Things',
    issuer: 'NPTEL',
    issueDate: 'Jan–Apr 2025',
    credentialId: 'NPTEL25CS44S342801517',
    badgeText: 'Elite',
    verificationUrl: 'https://drive.google.com/file/d/1oPcX55X2E8evfnS9J1DsXUTS4-iXa8p9/view?usp=drivesdk'
  },
  {
    id: 'nptel-oop',
    title: 'Fundamentals of Object Oriented Programming',
    issuer: 'NPTEL',
    issueDate: 'Jan–Apr 2025',
    credentialId: 'NPTEL25CS34S542801041',
    badgeText: 'CERTIFICATE',
    verificationUrl: 'https://drive.google.com/file/d/1sxZvUCLkKP7sKO0kPZJ0rxrxSNkcLkWs/view?usp=drivesdk'
  }
];

export const achievementsData: Achievement[] = [
  {
    id: 'sih-winner',
    title: 'Smart India Hackathon - First Place',
    category: 'award',
    issuer: 'Ministry of Education, Govt. of India',
    date: 'Dec 2023',
    description: 'Led a 6-member team to design and pitch an offline-enabled emergency communication system for disaster zones, defeating 120+ teams.',
    metric: 'National Winner'
  },
  {
    id: 'leetcode-rating',
    title: 'LeetCode Coding Profile Rating',
    category: 'coding',
    issuer: 'LeetCode platform',
    date: 'Ongoing',
    description: 'Maintained a rating above 1920 (Knight badge tier). Solved over 600 questions with strong emphasis on DP, Graphs, and Segment trees.',
    metric: 'Knight (Top 3.5%)'
  },
  {
    id: 'gfg-rank',
    title: 'GeeksforGeeks Institution Rank 5',
    category: 'coding',
    issuer: 'GeeksforGeeks portal',
    date: 'Ongoing',
    description: 'Solved 400+ advanced algorithmic challenges. Contributed detailed solution articles for community learning.',
    metric: 'Rank #5 / 15,000+'
  },
  {
    id: 'academic-schol',
    title: 'Academic Excellence Scholarship',
    category: 'academic',
    issuer: 'University Senate board',
    date: '2021, 2022, 2023',
    description: 'Awarded annual full tuition waiver for holding a GPA above 9.0 consecutively across 6 academic semesters.',
    metric: '100% Tuition Waiver'
  },
  {
    id: 'atmos-funding',
    title: 'Climate Innovation Grant Award',
    category: 'startup',
    issuer: 'University Entrepreneurship Cell',
    date: 'March 2024',
    description: 'Received seed funding and research incubation space for the Atmos weather network project expansion plans.',
    metric: '$12,000 Grant'
  }
];

export const blogsData: Blog[] = [
  {
    id: 'react-19-compiler',
    title: 'React 19 & The Compiler: Eradicating useMemo and useCallback',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80',
    category: 'Frontend',
    tags: ['React 19', 'React Compiler', 'Web Development', 'Performance'],
    readTime: '5 min read',
    date: 'Jan 14, 2026',
    summary: 'An in-depth look at how the new React Compiler automate dependency arrays and render-memoization, reducing framework cognitive load.',
    content: `### React 19 Compiler Explained

React 19 introduces the **React Compiler** (formerly React Forget). Historically, React developers had to write repetitive code using \`useMemo\` and \`useCallback\` to prevent unnecessary component re-renders.

#### Why the Compiler is a Game Changer
The compiler intercepts code compilation, automatically analyzing control-flow paths to track variables that change. It injects memoization nodes under the hood.

\`\`\`typescript
// Before React 19:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// React 19 (Plain JS code):
const memoizedCallback = () => {
  doSomething(a, b);
}; // Automatically optimized!
\`\`\`

#### Impact on Performance
Our internal diagnostics show a **15-20% reduction** in overall garbage collection overhead and a much cleaner React component layout tree, boosting frame rates on low-end client CPUs.
`
  },
  {
    id: 'scalable-websockets',
    title: 'Scaling WebSockets to 50k Concurrent Users with Redis Pub/Sub',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
    category: 'Backend',
    tags: ['WebSockets', 'Redis', 'Node.js', 'System Design'],
    readTime: '8 min read',
    date: 'Dec 18, 2025',
    summary: 'A step-by-step architectural breakdown of scaling Socket.io servers horizontally using an Redis backplane for message syncing.',
    content: `### Horizontal WebSocket Scaling

When scaling Node.js servers, WebSockets pose a unique challenge. Because they maintain a stateful connection, a client connected to Server A cannot receive broadcasts generated by Server B.

#### Resolving Connection Isolation with Redis
To sync notifications across multiple server nodes, we use Redis Pub/Sub as a central message broker.

1. **Client Broadcast**: User connects to Server A and triggers a driver location update.
2. **Publish Event**: Server A publishes this update to the Redis channel \`driver-updates\`.
3. **Subscribe Event**: All other nodes (Server B, Server C) subscribe to \`driver-updates\` and receive the payload, forwarding it to their locally connected clients.

\`\`\`javascript
// Node server snippet
const redisAdapter = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

io.adapter(redisAdapter(pubClient, subClient));
\`\`\`

This pattern allows us to horizontal scale from a single server to hundreds of Docker containers, supporting up to 50k concurrent connection points seamlessly.
`
  }
]; 

// Chatbot Knowledgebase and Responses
export const chatbotKnowledge = {
  welcomeMessage: "Hi there! I'm Sumant's AI Assistant. How can I help you today? You can ask about my skills, projects (Atmos Weather App, SaveLife SDEC), education, achievements, certifications, resume, or contact details.",
  quickReplies: [
    "Tell me about Atmos App",
    "What are your core skills?",
    "Where did you study?",
    "What are your achievements?",
    "How can I contact you?"
  ],
  responses: [
    {
      keywords: ['atmos', 'weather', 'climate', 'forecast', 'app'],
      answer: "Atmos Weather App is my flagship project. It is a premium, real-time weather tracking and forecasting dashboard. Key technical specs: React 19, Node.js, Socket.io for real-time alerting, Redis for coordinate-based geofence caching, Leaflet Maps API, Docker, and AWS. It serves over 80,000+ daily active users with sub-120ms API response speed."
    },
    {
      keywords: ['disaster', 'emergency', 'sdec', 'savelife', 'save life', 'offline-first', 'lora', 'mesh'],
      answer: "I engineered 'SaveLife – Smart Disaster & Emergency Connector (SDEC)', a MERN Stack application that provides secure authentication, SOS alerts, live location sharing, and emergency response service integration. I also built the 'Smart Disaster Emergency Controller', an offline-first crisis coordination hub using PWA, SQLite/IndexedDB, RxDB, and LoRa mesh networking for communication without internet."
    },
    {
      keywords: ['analytics', 'dev-dashboard', 'developer analytics', 'git', 'dashboard', 'charts', 'svg'],
      answer: "The Developer Analytics Engine is a visual Git & productivity dashboard. It is an API-driven app built with React 19, TypeScript, and a Serverless Cloudflare Worker proxying GitHub & WakaTime APIs. To avoid heavy charting libraries, I designed custom React-to-SVG charts, keeping the bundle size to a tiny 18KB."
    },
    {
      keywords: ['projects', 'portfolio', 'work', 'build', 'made'],
      answer: "My major projects are: 1) Atmos Weather App (real-time weather analytics for 80,000+ users), 2) SaveLife / SDEC (a smart disaster & emergency coordination system), and 3) Developer Analytics Engine (a high-performance visual Git dashboard). You can find more details in the Projects section of this website!"
    },
    {
      keywords: ['skills', 'tech', 'languages', 'frontend', 'backend', 'databases', 'frameworks'],
      answer: "I specialize in the MERN Stack. Languages: JavaScript (ES6+), TypeScript, Java, Python, C++, and C. Frontend: React 19, Next.js, Tailwind CSS, DaisyUI, Framer Motion. Backend: Node.js, Express, Socket.io, REST APIs. Databases: MongoDB, PostgreSQL, Redis, SQLite, IndexedDB. Tools: Git, GitHub, Docker, AWS."
    },
    {
      keywords: ['education', 'college', 'degree', 'study', 'university', 'btech', 'cgpa', 'school', '10th', '12th'],
      answer: "I am pursuing a Bachelor of Technology (B.Tech) in Computer Science at IES College of Technology, Bhopal (2023 - 2027) with a current CGPA of 7.67/10.0. Previously, I completed my 12th Grade (Science) at Shahid Bhagat Singh Inter College, Japla (Jharkhand) with 80.2% and my 10th Grade at High School, Dangwar (Jharkhand) with 88.4%."
    },
    {
      keywords: ['achievements', 'awards', 'achievement', 'award', 'hackathon', 'sih', 'smart india hackathon', 'leetcode', 'geeksforgeeks', 'gfg', 'rank', 'scholarship', 'funding'],
      answer: "My top achievements include: 1) Winner of Smart India Hackathon (SIH) 2023 (First Place, Govt. of India) for designing an offline emergency communication system, 2) LeetCode Knight Badge (Rating 1920+, Top 3.5%, 600+ solved), 3) GeeksforGeeks Institution Rank #5/15,000+ (400+ solved), 4) 100% Tuition Waiver Academic Scholarship, and 5) $12,000 Climate Innovation Grant for Atmos Weather App."
    },
    {
      keywords: ['certifications', 'certification', 'certified', 'cert', 'aws', 'mern', 'dsa'],
      answer: "I hold several key certifications: 1) AWS Certified Cloud Practitioner (credential AWS-CCP-998822A), 2) Advanced Full-Stack Engineering (MERN) from MongoDB University & Udemy (credential MERN-ADV-556677B), and 3) Data Structures & Algorithms in C++ from Coding Ninjas (credential DSA-CPP-443322C)."
    },
    {
      keywords: ['contact', 'hire', 'email', 'socials', 'linkedin', 'github', 'reach', 'phone', 'mail', 'connect'],
      answer: "You can contact me via email at sumantkumaryadav526@gmail.com. You can also view my GitHub at github.com/sumant-yadav. For a 1-on-1 meeting, you can schedule a slot directly using the interactive calendar booking widget in the Contact section below!"
    },
    {
      keywords: ['resume', 'cv', 'download', 'pdf', 'preview', 'view'],
      answer: "You can view and preview my full engineering resume in a new browser tab by clicking the 'Resume' button in the navigation bar or in the Hero banner of this page."
    }
  ],
  fallback: "I'm not sure I got that. Could you try asking about 'Atmos Weather App', 'skills', 'education', 'achievements', 'certifications', or 'contact' details? Alternatively, you can use the quick-reply buttons below."
};
