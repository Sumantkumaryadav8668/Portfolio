export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.about': { en: 'About', hi: 'मेरे बारे में' },
  'nav.education': { en: 'Education', hi: 'शिक्षा' },
  'nav.skills': { en: 'Skills', hi: 'कौशल' },
  'nav.projects': { en: 'Projects', hi: 'परियोजनाएं' },
  'nav.certifications': { en: 'Certifications', hi: 'प्रमाणपत्र' },
  'nav.achievements': { en: 'Achievements', hi: 'उपलब्धियां' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.resume': { en: 'Resume', hi: 'रेज्यूमे' },
  'nav.find_me': { en: 'Find me on:', hi: 'सोशल मीडिया:' },

  // Hero Section
  'hero.availability': { en: 'Open for new roles', hi: 'नए अवसरों के लिए उपलब्ध' },
  'hero.greeting': { en: "Hi, I'm", hi: 'नमस्ते, मैं हूँ' },
  'hero.name': { en: 'Sumant Kumar Yadav', hi: 'सुमंत कुमार यादव' },
  'hero.dedicated': { en: 'A dedicated ', hi: 'एक समर्पित ' },
  'hero.bio': {
    en: 'I build modern full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Focused on clean architecture, responsive interfaces, and reliable REST APIs that deliver real impact.',
    hi: 'मैं MongoDB, Express.js, React.js और Node.js का उपयोग करके आधुनिक फुल-स्टैक वेब एप्लिकेशन बनाता हूँ। मेरा ध्यान स्वच्छ आर्किटेक्चर, उत्तरदायी इंटरफेस और विश्वसनीय REST APIs पर केंद्रित है।'
  },
  'hero.view_projects': { en: 'View Projects', hi: 'परियोजनाएं देखें' },
  'hero.contact_me': { en: 'Contact Me', hi: 'संपर्क करें' },
  'hero.connect': { en: 'Connect:', hi: 'जुड़ें:' },
  'hero.featured_projects': { en: 'Featured Projects', hi: 'प्रमुख परियोजनाएं' },
  'hero.projects_count': { en: '4 Completed & Major', hi: '4 पूर्ण एवं मुख्य' },
  'hero.verified_certs': { en: '3 Verified', hi: '3 सत्यापित' },
  'hero.coding_commits': { en: 'Coding Commits', hi: 'कोडिंग कमिट्स' },
  'hero.commits_count': { en: '300+ GitHub Commits', hi: '300+ गिटहब कमिट्स' },
  'hero.status_online': { en: 'STATUS: ONLINE', hi: 'स्थिति: ऑनलाइन' },

  // About Section
  'about.heading_tag': { en: 'About Sumant Kumar Yadav', hi: 'सुमंत कुमार यादव के बारे में' },
  'about.heading_title': { en: 'MERN Stack Developer', hi: 'MERN स्टैक डेवलपर' },
  'about.tab_profile': { en: 'Professional Profile', hi: 'प्रोफेशनल प्रोफाइल' },
  'about.tab_journey': { en: 'My Journey', hi: 'मेरी यात्रा' },
  'about.role_sub': { en: 'B.Tech CSE Student (2023–2027)', hi: 'बी.टेक सीएसई छात्र (2023–2027)' },
  'about.section_title': { en: 'About Me', hi: 'मेरे बारे में' },
  'about.exact_bio': {
    en: 'B.Tech CSE student at IES College of Technology (2027), skilled in Java, C++, HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Interested in full-stack development, building projects, and learning new technologies.',
    hi: 'आईईएस कॉलेज ऑफ टेक्नोलॉजी (2027) में बी.टेक सीएसई छात्र, जावा, सी++, एचटीएमएल, सीएसएस, जावास्क्रिप्ट, रिएक्ट.जीएस, नोड.जीएस, एक्सप्रेस.जीएस और मोंगोडीबी में कुशल। फुल-स्टैक डेवलपमेंट, प्रोजेक्ट्स बनाने और नई तकनीकों को सीखने में रुचि रखते हैं।'
  },
  'about.mission_title': { en: 'Mission', hi: 'मिशन' },
  'about.mission_desc': { en: 'Building scalable MERN applications with clean code and modern technologies.', hi: 'स्वच्छ कोड और आधुनिक तकनीकों के साथ स्केलेबल MERN एप्लिकेशन बनाना।' },
  'about.vision_title': { en: 'Vision', hi: 'विज़न' },
  'about.vision_desc': { en: 'Building innovative, scalable, and impactful web applications that solve real-world problems.', hi: 'वास्तविक दुनिया की समस्याओं को हल करने वाले अभिनव, स्केलेबल और प्रभावशाली वेब एप्लिकेशन बनाना।' },
  'about.career_title': { en: 'Career Goal', hi: 'करियर लक्ष्य' },
  'about.career_desc': { en: 'To grow as a Full Stack Developer by creating scalable, secure, and user-focused web applications.', hi: 'स्केलेबल, सुरक्षित और उपयोगकर्ता-केंद्रित वेब एप्लिकेशन बनाकर एक फुल स्टैक डेवलपर के रूप में विकसित होना।' },

  // Skills Section
  'skills.heading_tag': { en: 'Skills', hi: 'कौशल' },
  'skills.heading_title': { en: 'Core Competence Grid', hi: 'मुख्य योग्यता ग्रिड' },
  'skills.search_placeholder': { en: 'Search skills (e.g. React, Java)...', hi: 'कौशल खोजें (जैसे React, Java)...' },
  'skills.all_category': { en: 'All', hi: 'सभी' },
  'skills.proficiency': { en: 'Proficiency', hi: 'दक्षता' },
  'skills.more_projects': { en: 'more', hi: 'और' },
  'skills.no_skills_title': { en: 'No Skills Found', hi: 'कोई कौशल नहीं मिला' },
  'skills.reset_button': { en: 'Reset Search & Filters', hi: 'खोज रिसेट करें' },

  // Projects Section
  'projects.heading_tag': { en: 'Pioneering Product Showcases', hi: 'प्रमुख उत्पाद प्रदर्शन' },
  'projects.heading_title': { en: 'Projects & Engineering Builds', hi: 'परियोजनाएं एवं इंजीनियरिंग निर्माण' },
  'projects.sub_desc': { en: 'Explore featured product case studies and compact technical builds.', hi: 'प्रमुख उत्पाद केस स्टडी और कॉम्पैक्ट तकनीकी निर्माणों का अन्वेषण करें।' },
  'projects.major_tab': { en: 'MAJOR PROJECTS', hi: 'मुख्य परियोजनाएं' },
  'projects.minor_tab': { en: 'MINOR PROJECTS', hi: 'लघु परियोजनाएं' },
  'projects.flagship': { en: 'Flagship Project', hi: 'फ्लैगशिप प्रोजेक्ट' },
  'projects.github_code': { en: 'GitHub Code', hi: 'गिटहब कोड' },
  'projects.live_demo': { en: 'Live Demo', hi: 'लाइव डेमो' },
  'projects.coming_soon': { en: '(Coming Soon)', hi: '(शीघ्र उपलब्ध)' },
  'projects.tab_overview': { en: 'Overview', hi: 'अवलोकन' },
  'projects.tab_architecture': { en: 'Architecture', hi: 'आर्किटेक्चर' },
  'projects.tab_solutions': { en: 'Challenges & Solutions', hi: 'चुनौतियां और समाधान' },
  'projects.tab_casestudy': { en: 'Full Case Study', hi: 'पूर्ण केस स्टडी' },

  // Certifications Section
  'certifications.heading_tag': { en: 'Certifications', hi: 'प्रमाणपत्र' },
  'certifications.heading_title': { en: 'Verified Credentials', hi: 'सत्यापित साख' },
  'certifications.view_cert': { en: 'View Certificate', hi: 'प्रमाणपत्र देखें' },
  'certifications.issued': { en: 'Issued:', hi: 'जारी:' },
  'certifications.skills_authenticated': { en: 'Skills Authenticated:', hi: 'सत्यापित कौशल:' },

  // Education Section
  'education.heading_tag': { en: 'Education', hi: 'शिक्षा' },
  'education.heading_title': { en: 'Academic Foundation', hi: 'शैक्षणिक नींव' },
  'education.coursework': { en: 'Relevant Coursework', hi: 'प्रासंगिक पाठ्यक्रम' },
  'education.honors': { en: 'Honors & Achievements', hi: 'सम्मान और उपलब्धियां' },
  'education.gpa_title': { en: 'GPA Trajectory', hi: 'सीजीपीए प्रगति' },
  'education.gpa_sub': { en: 'Semester-wise academic performance progression', hi: 'सेमेस्टर-वार शैक्षणिक प्रदर्शन प्रगति' },

  // Achievements Section
  'achievements.heading_tag': { en: 'Achievements', hi: 'उपलब्धियां' },
  'achievements.heading_title': { en: 'Milestones & Competitive Coding', hi: 'माइलस्टोन्स और प्रतिस्पर्धी कोडिंग' },
  'achievements.coding_title': { en: 'Coding Profiles Breakdown', hi: 'कोडिंग प्रोफाइल विवरण' },

  // Dashboard Section
  'dashboard.heading_tag': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'dashboard.heading_title': { en: 'Developer Activity Engine', hi: 'डेवलपर गतिविधि इंजन' },
  'dashboard.github_heatmap': { en: 'GitHub Contribution Heatmap', hi: 'गिटहब योगदान हीटमैप' },

  // Contact Section
  'contact.heading_tag': { en: 'Contact', hi: 'संपर्क' },
  'contact.heading_title': { en: 'Get in Touch', hi: 'संपर्क में रहें' },
  'contact.connect_title': { en: "Let's Connect", hi: 'आइए जुड़ें' },
  'contact.connect_desc': {
    en: 'I am open to new opportunities, software development projects, and technical collaborations. Send me a message using the form below or connect via email.',
    hi: 'मैं नए अवसरों, सॉफ्टवेयर विकास परियोजनाओं और तकनीकी सहयोग के लिए तत्पर हूँ। नीचे दिए गए फॉर्म का उपयोग करके मुझे संदेश भेजें या ईमेल के माध्यम से जुड़ें।'
  },
  'contact.email_me': { en: 'Email Me', hi: 'ईमेल करें' },
  'contact.location': { en: 'Location', hi: 'स्थान' },
  'contact.location_val': { en: 'Bhopal, MP, India', hi: 'भोपाल, म.प्र., भारत' },
  'contact.form_title': { en: 'Send a Direct Message', hi: 'प्रत्यक्ष संदेश भेजें' },
  'contact.name_label': { en: 'Your Name *', hi: 'आपका नाम *' },
  'contact.email_label': { en: 'Your Email *', hi: 'आपका ईमेल *' },
  'contact.subject_label': { en: 'Subject *', hi: 'विषय *' },
  'contact.message_label': { en: 'Message *', hi: 'संदेश *' },
  'contact.send_btn': { en: 'Send Message', hi: 'संदेश भेजें' },
  'contact.sending_btn': { en: 'Sending Message...', hi: 'संदेश भेजा जा रहा है...' },
  'contact.schedule_title': { en: 'Schedule 1-on-1 Intro Call', hi: '1-ऑन-1 परिचयात्मक कॉल शेड्यूल करें' },
  'contact.schedule_sub': { en: '30-Minute Discussion & Technical Review', hi: '30-मिनट की चर्चा एवं तकनीकी समीक्षा' },

  // Chatbot Widget
  'chatbot.title': { en: "Sumant's Portfolio Assistant", hi: 'सुमंत का पोर्टफोलियो सहायक' },
  'chatbot.scope': { en: 'Portfolio Scope Only', hi: 'केवल पोर्टफोलियो दायरा' },
  'chatbot.placeholder': { en: 'Ask about marks, CGPA, projects...', hi: 'अंक, सीजीपीए, प्रोजेक्ट्स के बारे में पूछें...' },

  // Footer
  'footer.rights': { en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' }
};
