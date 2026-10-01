import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, CheckCircle, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { educationData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const EducationSection: React.FC = () => {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('btech');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">{t('education.heading_tag')}</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t('education.heading_title')}</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {educationData.map((edu) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className={`card card-hover overflow-hidden ${
                  isExpanded ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''
                }`}
              >
                <button
                  onClick={() => toggleExpand(edu.id)}
                  className="w-full flex items-center justify-between p-5 cursor-pointer text-left focus:outline-none bg-transparent border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/50">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">{edu.duration}</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-right">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block">{edu.scoreLabel}</span>
                      <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400">{edu.score}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        {edu.courses && edu.courses.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center">
                              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mr-1.5" />
                              {t('education.coursework')}
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.courses.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-300 px-2.5 py-0.5 rounded"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center">
                            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1.5" />
                            {t('education.honors')}
                          </h4>
                          <ul className="space-y-1.5 pl-0">
                            {edu.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 list-none">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 card card-elevated p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('education.gpa_title')}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t('education.gpa_sub')}</p>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            {educationData[0].semesterPerformance?.map((sem, sIdx) => {
              const percentage = (sem.gpa / 10) * 100;
              return (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{sem.sem}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{sem.gpa} / 10.0</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: sIdx * 0.05 }}
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full"
                    ></motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
