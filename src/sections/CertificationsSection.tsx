import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink, Calendar, Key } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Certifications</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Verified Credentials</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsData.map((cert) => {
          const isElite = cert.badgeText === 'Elite';
          return (
            <motion.div
              key={cert.id}
              whileHover={{ y: -6 }}
              className="bg-brand-card/20 border border-brand-border/60 hover:border-brand-accent/40 rounded-2xl p-6 flex flex-col justify-between shadow-md relative overflow-hidden group animate-none h-full"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl group-hover:bg-brand-primary/10"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-accent border border-brand-primary/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-lg font-bold flex items-center ${
                      isElite
                        ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30'
                        : 'text-brand-accent bg-brand-primary/10 border border-brand-primary/20'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    {cert.badgeText || 'CERTIFICATE'}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">{cert.issuer}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-brand-border/20 text-xs text-brand-muted">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-muted/70" />
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="flex items-center space-x-2">
                      <Key className="w-3.5 h-3.5 text-brand-muted/70" />
                      <span className="font-mono text-[10px]">ID: {cert.credentialId}</span>
                    </div>
                  )}
                </div>

                {cert.description && (
                  <p className="text-xs text-brand-muted/90 leading-relaxed pt-1">
                    {cert.description}
                  </p>
                )}

                {cert.skillsLearned && cert.skillsLearned.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider mb-2 block">Skills Authenticated:</span>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsLearned.map((skill) => (
                        <span key={skill} className="text-[9px] bg-brand-bgSec/60 border border-brand-border/55 px-2 py-0.5 rounded text-brand-muted">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/30">
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-ghost hover:bg-brand-primary/10 w-full rounded-xl text-xs text-brand-accent hover:text-brand-text flex items-center justify-center space-x-1.5 normal-case border border-brand-border/60 hover:border-brand-accent/50 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
