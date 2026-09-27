import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Compass, Calendar } from 'lucide-react';
import { journeyData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'journey'>('profile');

  const coreValues = [
    { icon: <Target className="w-5 h-5 text-brand-primary" />, title: 'Mission', desc: 'Building scalable MERN applications with clean code and modern technologies.' },
    { icon: <Eye className="w-5 h-5 text-brand-accent" />, title: 'Vision', desc: "Building innovative, scalable, and impactful web applications that solve real-world problems." },
    { icon: <Compass className="w-5 h-5 text-brand-success" />, title: 'Career Goal', desc: 'To grow as a Full Stack Developer by creating scalable, secure, and user-focused web applications that solve real-world problems.' },
    // { icon: <Shield className="w-5 h-5 text-purple-400" />, title: 'Core Values', desc: 'Clean modular codebases, extreme user accessibility, responsive design systems, and security-first engineering.' }
  ];

  return (
    <section id="about" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">About Sumant Kumar Yadav</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">MERN Stack Developer</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="flex justify-center mb-12">
        <div className="bg-white dark:bg-brand-card/40 border border-gray-200 dark:border-brand-border/60 p-1.5 rounded-xl flex space-x-1 shadow-sm dark:shadow-none">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer border-0 ${
              activeTab === 'profile'
                ? 'bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/20'
                : 'text-gray-700 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100/80 dark:hover:bg-brand-card/30'
            }`}
          >
            Professional Profile
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer border-0 ${
              activeTab === 'journey'
                ? 'bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/20'
                : 'text-gray-700 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:bg-gray-100/80 dark:hover:bg-brand-card/30'
            }`}
          >
            My Journey
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
              <div className="relative group w-full max-w-[200px] sm:max-w-[240px] aspect-[4/5]">
                <div className="absolute inset-0 bg-brand-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  src="/developer_profile.jpg"
                  alt="Sumant Kumar Yadav portrait"
                  className="w-full h-full object-cover object-[center_20%] rounded-3xl border-2 border-brand-border/60 shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-brand-text">Sumant Kumar Yadav</h3>
                <p className="text-sm text-brand-muted">Lead Developer & Systems Architect</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-brand-text">About Me</h3>
                <p className="text-brand-muted leading-relaxed">
                  I'm a passionate <span>MERN Stack Developer</span> who enjoys building modern, responsive, and scalable web applications. I specialize in <span>MongoDB</span>, <span>Express.js</span>, <span>React.js</span>, <span>Node.js</span>, <span>JavaScript</span>, <span>REST APIs</span>, and <span>JWT Authentication</span>. I have hands-on experience developing <span>Full-Stack Applications</span> with clean, maintainable code and user-friendly interfaces. I continuously enhance my problem-solving skills through <span>LeetCode</span> and <span>GeeksforGeeks</span>, and I'm always eager to learn new technologies and build impactful software that solves real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreValues.map((value, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-card/25 border border-brand-border/40 rounded-2xl p-5 hover:border-brand-accent/40 transition-colors flex flex-col space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center border border-brand-border/30">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-brand-text">{value.title}</h4>
                    <p className="text-xs text-brand-muted leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="journey"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative border-l border-brand-border pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
              {journeyData.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-4 h-4 rounded-full bg-brand-bg border-2 border-brand-primary group-hover:border-brand-accent transition-colors z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                    </div>

                    <div className="bg-brand-card/30 border border-brand-border/60 hover:border-brand-accent/30 rounded-2xl p-6 transition-all duration-300 relative">
                      <span className="inline-flex items-center space-x-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-accent px-3 py-1 rounded-lg text-xs font-semibold mb-3">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {item.year}
                      </span>

                      <h3 className="text-lg sm:text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-brand-muted mt-0.5">
                        {item.subtitle}
                      </h4>
                      <p className="text-sm text-brand-muted mt-3 leading-relaxed">
                        {item.description}
                      </p>

                      {item.skills && (
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-brand-border/40">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] bg-brand-bg border border-brand-border/60 text-brand-muted px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
