import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useActiveSection } from '../hooks/useActiveSection';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'contact', label: 'Contact' },
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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl glassmorphism rounded-2xl px-6 py-3 transition-all duration-300">
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleScroll('hero')}
          className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent cursor-pointer border-0 bg-transparent focus:outline-none"
        >
          Sumant<span className="text-brand-text">.dev</span>
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
                    ? 'text-brand-accent'
                    : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-accent"
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
            className="hidden sm:inline-flex w-8 h-8 rounded-lg items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-card/30 border border-transparent hover:border-brand-border transition-all"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/yadavsumant/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:inline-flex w-8 h-8 rounded-lg items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-card/30 border border-transparent hover:border-brand-border transition-all"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>

          <a
            href="/resume.pdf"
            download="Sumant_Yadav_Resume.pdf"
            aria-label="Download Resume"
            className="btn btn-primary btn-xs py-1 px-3 text-[10px] font-semibold text-white rounded-lg flex items-center space-x-1 border-0 h-8 normal-case"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Resume</span>
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-card/30 border border-transparent hover:border-brand-border transition-all cursor-pointer bg-transparent focus:outline-none"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden w-8 h-8 rounded-lg flex items-center justify-center text-brand-muted hover:text-brand-text hover:bg-brand-card/30 border border-transparent hover:border-brand-border transition-all bg-transparent focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden border-t border-brand-border mt-3 pt-3 space-y-1 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-1 pb-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScroll(item.id)}
                    className={`px-3 py-2 text-left text-sm rounded-lg transition-colors cursor-pointer border-0 focus:outline-none ${
                      isActive
                        ? 'bg-brand-primary/10 text-brand-accent font-semibold'
                        : 'text-brand-muted hover:text-brand-text hover:bg-brand-card/30 bg-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-brand-border text-xs text-brand-muted">
              <span>Find me on:</span>
              <div className="flex space-x-3">
                <a href="https://github.com/Sumantkumaryadav8668" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text">GitHub</a>
                <a href="https://www.linkedin.com/in/yadavsumant/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-text">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
