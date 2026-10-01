import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { Menu, X, Sun, Moon, FileText, Globe } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'education', labelKey: 'nav.education' },
    { id: 'skills', labelKey: 'nav.skills' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'certifications', labelKey: 'nav.certifications' },
    { id: 'achievements', labelKey: 'nav.achievements' },
    { id: 'dashboard', labelKey: 'nav.dashboard' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-4 z-50 w-[95%] max-w-6xl mx-auto transition-all duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-2xl px-6 py-3 shadow-md transition-all">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleScroll('hero')}
            className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent cursor-pointer border-0 bg-transparent focus:outline-none"
          >
            Sumant<span className="text-slate-800 dark:text-slate-200">.dev</span>
          </button>

          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer border-0 bg-transparent focus:outline-none ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/Sumantkumaryadav8668"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="hidden sm:inline-flex w-8 h-8 rounded-xl items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/yadavsumant/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="hidden sm:inline-flex w-8 h-8 rounded-xl items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume"
              className="btn-primary py-1.5 px-3 text-xs font-semibold rounded-xl flex items-center gap-1.5 h-8"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('nav.resume')}</span>
            </a>

            {/* Language Toggle Button (🌐 EN | हिंदी) */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              title={language === 'en' ? 'Switch to Hindi (हिंदी में देखें)' : 'Switch to English'}
              className="h-8 px-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5 transition-all cursor-pointer focus:outline-none"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{language === 'en' ? 'EN | हिंदी' : 'हिंदी | EN'}</span>
            </button>

            {/* Light / Dark Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all cursor-pointer bg-transparent focus:outline-none"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              className="xl:hidden w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-all bg-transparent focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Drawer Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden border-t border-slate-200 dark:border-slate-800 mt-3 pt-3 space-y-3 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScroll(item.id)}
                      className={`px-3 py-2 text-left text-xs font-semibold rounded-lg transition-colors cursor-pointer border-0 focus:outline-none ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 bg-transparent'
                      }`}
                    >
                      {t(item.labelKey)}
                    </button>
                  );
                })}
              </div>

              {/* Mobile Language Selector Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Language / भाषा:</span>
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center space-x-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'English (EN)' : 'हिंदी (Hindi)'}</span>
                </button>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center space-x-1.5 border border-blue-200/80 dark:border-blue-900/50"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('nav.resume')}</span>
                </a>
                <div className="flex space-x-3 items-center">
                  <a href="https://github.com/Sumantkumaryadav8668" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">GitHub</a>
                  <a href="https://www.linkedin.com/in/yadavsumant/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
