import React, { useState } from 'react';
import { ArrowUp, Send, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="border-t border-brand-border/60 bg-brand-bgSec/30 relative">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent w-fit">
              Sumant<span className="text-brand-text">.dev</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-sm leading-relaxed">
              Pioneering technical web solution frameworks, geofenced supply routing tools, and scalable Node.js microservice engines.
            </p>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-text">Directory</h4>
            <ul className="space-y-2 text-xs text-brand-muted pl-0">
              {['About', 'Education', 'Skills', 'Projects', 'Dashboard'].map((item) => (
                <li key={item} className="list-none">
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.toLowerCase());
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-brand-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-text">Newsletter</h4>
            <p className="text-xs text-brand-muted">Get notify digests about my open source plugins and case studies.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-card/30 border border-brand-border rounded-xl pl-4 pr-10 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
                />
                <button
                  type="submit"
                  aria-label="Subscribe Newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-brand-primary hover:bg-brand-primary/80 flex items-center justify-center text-white transition-colors border-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-brand-success font-semibold"
                  >
                    Subscribed successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted">
            &copy; {new Date().getFullYear()} Sumant Kumar Yadav. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-brand-muted">
            <div className="flex space-x-3">
              <a href="https://github.com/Sumantkumaryadav8668" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text transition-colors" aria-label="GitHub Profile">
                <FaGithub className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/yadavsumant/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text transition-colors" aria-label="LinkedIn Profile">
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a href="mailto:sumantkumaryadav526@gmail.com" className="hover:text-brand-text transition-colors" aria-label="Email Profile">
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="Scroll Back To Top"
              className="w-8 h-8 rounded-xl bg-brand-card/30 border border-brand-border/60 hover:border-brand-accent/50 hover:text-brand-text flex items-center justify-center cursor-pointer transition-all bg-transparent focus:outline-none border-0"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
