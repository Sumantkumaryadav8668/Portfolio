import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, Compass, Calendar } from 'lucide-react';
import { journeyData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'journey'>('profile');

  const coreValues = [
    { icon: <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />, title: 'Mission', desc: 'Building scalable MERN applications with clean code and modern technologies.' },
    { icon: <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, title: 'Vision', desc: "Building innovative, scalable, and impactful web applications that solve real-world problems." },
    { icon: <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, title: 'Career Goal', desc: 'To grow as a Full Stack Developer by creating scalable, secure, and user-focused web applications that solve real-world problems.' },
  ];

  return (
    <section id="about" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">About Sumant Kumar Yadav</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">MERN Stack Developer</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-xl flex space-x-1 shadow-sm">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer border-0 ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'
            }`}
          >
            Professional Profile
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer border-0 ${
              activeTab === 'journey'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
          >
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative group w-full max-w-[220px] aspect-[4/5]">
                <img
                  src="/developer_profile.jpg"
                  alt="Sumant Kumar Yadav portrait"
                  className="w-full h-full object-cover object-[center_20%] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md group-hover:shadow-lg transition-all"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Sumant Kumar Yadav</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">B.Tech CSE Student (2023–2027)</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">About Me</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  B.Tech CSE student at IES College of Technology (2027), skilled in Java, C++, HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB. Interested in full-stack development, building projects, and learning new technologies.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {coreValues.map((value, idx) => (
                  <div
                    key={idx}
                    className="card card-hover p-4 flex flex-col space-y-2"
                  >
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{value.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{value.desc}</p>
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
            className="max-w-3xl mx-auto"
          >
            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8">
              {journeyData.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full bg-slate-50 dark:bg-[#090d16] border-2 border-blue-600 transition-colors z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    </div>

                    <div className="card card-hover p-5 sm:p-6">
                      <span className="inline-flex items-center space-x-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {item.year}
                      </span>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.subtitle}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {item.description}
                      </p>

                      {item.skills && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
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
