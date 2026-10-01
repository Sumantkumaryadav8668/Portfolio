import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles, Folder, Award, Code } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const HeroSection: React.FC = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const titles = [
    'Software Engineer',
    'MERN Stack Developer',
    'Full Stack Developer',
    'Backend Engineer',
    'Problem Solver',
  ];

  useEffect(() => {
    let timer: number;
    const currentTitle = titles[titleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && displayText === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 1500) as unknown as number;
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentTitle.substring(0, prev.length - 1)
            : currentTitle.substring(0, prev.length + 1)
        );
      }, typingSpeed) as unknown as number;
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-16 px-6 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-full px-3.5 py-1.5 w-fit"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wide uppercase">Open for new roles</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Sumant Kumar Yadav</span>
            </h1>
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-400">A dedicated </span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 border-r-2 border-blue-600 dark:border-blue-400 ml-2 pr-1 animate-pulse">
                {displayText}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
          >
            I build modern full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Focused on clean architecture, responsive interfaces, and reliable REST APIs that deliver real impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/resume.pdf"
              download="Sumant_Yadav_Resume.pdf"
              className="btn-secondary"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-ghost text-blue-600 dark:text-blue-400"
            >
              <span>Contact Me</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center space-x-4 pt-4 text-slate-500 dark:text-slate-400"
          >
            <span className="text-xs uppercase font-bold tracking-wider">Connect:</span>
            <div className="flex space-x-2">
              {[
                { icon: <FaGithub className="w-4 h-4" />, link: 'https://github.com/Sumantkumaryadav8668', label: 'GitHub' },
                { icon: <FaLinkedin className="w-4 h-4" />, link: 'https://www.linkedin.com/in/yadavsumant/', label: 'LinkedIn' },
                { icon: <SiLeetcode className="w-4 h-4" />, link: 'https://leetcode.com/u/Suman_tkumaryadav/', label: 'LeetCode' },
                { icon: <Mail className="w-4 h-4" />, link: 'https://mail.google.com/mail/?view=cm&fs=1&to=sumantkumaryadav526@gmail.com', label: 'Email' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Product UI Card Column */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-sm card card-elevated card-hover p-6 flex flex-col justify-between space-y-6"
          >
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>developer.profile</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Featured Projects</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">4 Completed & Major</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Certifications</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">3 Verified</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Coding Commits</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">300+ GitHub Commits</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400 dark:text-slate-500 font-mono flex justify-between items-center">
              <span>STATUS: ONLINE</span>
              <span>v2.0 PRO</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
