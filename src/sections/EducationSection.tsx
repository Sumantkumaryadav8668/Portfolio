import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, CheckCircle, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('btech');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Education</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Academic Foundation</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {educationData.map((edu) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className={`bg-brand-card/20 border border-brand-border/60 rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'border-brand-primary/50 shadow-lg shadow-brand-primary/5' : ''
                }`}
              >
                <button
                  onClick={() => toggleExpand(edu.id)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left focus:outline-none bg-transparent border-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary border border-brand-primary/20">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">{edu.duration}</span>
                      <h3 className="text-lg font-bold text-brand-text">{edu.degree}</h3>
                      <p className="text-xs text-brand-muted">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-right">
                    <div>
                      <span className="text-[10px] text-brand-muted uppercase block">{edu.scoreLabel}</span>
                      <span className="text-sm font-extrabold text-brand-accent">{edu.score}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-muted" /> : <ChevronDown className="w-4 h-4 text-brand-muted" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-6 border-t border-brand-border/30 space-y-6">
                        {edu.courses && edu.courses.length > 0 && (
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3 flex items-center">
                              <BookOpen className="w-3.5 h-3.5 text-brand-accent mr-1.5" />
                              Relevant Coursework
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-[11px] bg-brand-bgSec/60 border border-brand-border/60 text-brand-muted px-2.5 py-1 rounded-lg"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text mb-3 flex items-center">
                            <Award className="w-3.5 h-3.5 text-brand-success mr-1.5" />
                            Honors & Achievements
                          </h4>
                          <ul className="space-y-2 pl-0">
                            {edu.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start space-x-2 text-xs text-brand-muted list-none">
                                <CheckCircle className="w-3.5 h-3.5 text-brand-success mt-0.5 flex-shrink-0" />
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

        <div className="lg:col-span-5 bg-brand-card/15 border border-brand-border/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none"></div>
          <h3 className="text-lg font-bold text-brand-text mb-2">GPA Trajectory</h3>
          <p className="text-xs text-brand-muted mb-6">Semester-wise progression performance across B.Tech cycles</p>

          <div className="flex flex-col space-y-4">
            {educationData[0].semesterPerformance?.map((sem, sIdx) => {
              const percentage = (sem.gpa / 10) * 100;
              return (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-brand-text">{sem.sem}</span>
                    <span className="text-brand-accent">{sem.gpa} / 10.0</span>
                  </div>
                  <div className="w-full bg-brand-bgSec/60 border border-brand-border/40 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                      className="bg-gradient-to-r from-brand-primary to-brand-accent h-full rounded-full"
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
