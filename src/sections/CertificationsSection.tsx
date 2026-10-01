import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink, Calendar, Key } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const CertificationsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">{t('certifications.heading_tag')}</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t('certifications.heading_title')}</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => {
          const isElite = cert.badgeText === 'Elite';
          return (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4 }}
              className="card card-hover p-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/50">
                    <Award className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-lg font-bold flex items-center ${
                      isElite
                        ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50'
                        : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    {cert.badgeText || 'CERTIFICATE'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cert.issuer}</p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('certifications.issued')} {cert.issueDate}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="flex items-center space-x-2">
                      <Key className="w-3.5 h-3.5" />
                      <span className="font-mono text-[10px]">ID: {cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {cert.description && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider mb-1 block">{t('certifications.skills_authenticated')}</span>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsLearned.map((skill) => (
                        <span key={skill} className="text-[9px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full py-2 text-xs flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t('certifications.view_cert')}</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
