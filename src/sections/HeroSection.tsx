import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dX = useSpring(mouseX, springConfig);
  const dY = useSpring(mouseY, springConfig);

  const cardRotateX = useTransform(dY, [-300, 300], [10, -10]);
  const cardRotateY = useTransform(dX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 max-w-7xl mx-auto"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-1.5 w-fit"
          >
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span className="text-xs font-semibold text-brand-accent tracking-wide uppercase">Open for new roles</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-brand-text">
              Hi, I'm <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-success bg-clip-text text-transparent">Sumant Kumar Yadav</span>
            </h1>
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-xl sm:text-3xl font-bold text-brand-muted">A dedicated </span>
              <span className="text-xl sm:text-3xl font-bold text-brand-accent border-r-2 border-brand-accent ml-2 pr-1 animate-pulse">
                {displayText}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed"
          >
            I create modern full-stack web applications using MongoDB, Express.js, React.js, and Node.js. My focus is on building responsive interfaces, secure backend systems, and efficient REST APIs that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="btn btn-primary px-6 py-3 h-auto rounded-xl text-white font-semibold flex items-center space-x-2 border-0 shadow-lg shadow-brand-primary/20 normal-case hover:scale-105 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/resume.pdf"
              download="Sumant_Yadav_Resume.pdf"
              className="btn bg-brand-card/50 hover:bg-brand-card text-brand-text border border-brand-border px-6 py-3 h-auto rounded-xl font-semibold flex items-center space-x-2 normal-case hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn btn-ghost text-brand-accent hover:bg-brand-primary/10 px-6 py-3 h-auto rounded-xl font-semibold normal-case cursor-pointer"
            >
              <span>Contact Me</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center space-x-4 pt-4 text-brand-muted"
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
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-brand-border/40 hover:border-brand-accent hover:text-brand-text hover:bg-brand-card/20 transition-all"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: 'preserve-3d' }}
            className="w-full max-w-sm aspect-square bg-gradient-to-tr from-brand-card/60 to-brand-card/25 rounded-3xl border border-brand-border/50 p-6 flex flex-col justify-between relative shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-3xl border border-brand-accent/20 pointer-events-none"></div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              </div>
              <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
            </div>

            <div className="space-y-4 my-auto">
              <div className="flex items-center space-x-3 bg-brand-bg/50 border border-brand-border/40 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/15 flex items-center justify-center text-brand-primary">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted uppercase font-bold block">Featured Projects</span>
                  <span className="text-base font-bold text-brand-text">4 Completed</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-brand-bg/50 border border-brand-border/40 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-brand-success/15 flex items-center justify-center text-brand-success">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted uppercase font-bold block">Certifications</span>
                  <span className="text-base font-bold text-brand-text">3 Verified</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-brand-bg/50 border border-brand-border/40 rounded-xl p-3">
                <div className="w-10 h-10 rounded-lg bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brand-muted uppercase font-bold block">GitHub Contributions</span>
                  <span className="text-base font-bold text-brand-text">300+ Commits</span>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-brand-muted font-mono flex justify-between items-center">
              <span>SYSTEM: ONLINE</span>
              <span>v1.0.0</span>
            </div>
          </motion.div>

          <div className="absolute -z-10 w-24 h-24 bg-brand-primary/20 rounded-full top-0 right-10 blur-xl animate-bounce"></div>
          <div className="absolute -z-10 w-32 h-32 bg-brand-accent/20 rounded-full -bottom-5 -left-5 blur-xl"></div>
        </div>
      </div>
    </section>
  );
};
