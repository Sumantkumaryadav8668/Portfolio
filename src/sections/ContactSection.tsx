import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Briefcase, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { InteractiveCalendar } from '../components/InteractiveCalendar';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Contact</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Get in Touch</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-brand-success font-bold text-xs uppercase">
              <Briefcase className="w-3.5 h-3.5 mr-1" />
              AVAILABLE FOR FULL-TIME ROLES
            </div>
            <h3 className="text-2xl font-bold text-brand-text">Let's Connect</h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              I'm open to full-time opportunities, internships, freelance projects, and collaborations. Feel free to reach out or schedule a call.
            </p>
            <p className="text-xs text-brand-muted/80">
              Have an opportunity, project idea, or simply want to connect? I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-card/15 border border-brand-border/40 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-accent">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-brand-muted uppercase font-bold block">Email</span>
                <a href="mailto:sumantkumaryadav526@gmail.com" className="text-xs font-bold text-brand-text hover:text-brand-accent transition-colors">
                  sumantkumaryadav526@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-brand-card/15 border border-brand-border/40 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-success/10 flex items-center justify-center text-brand-success">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-brand-muted uppercase font-bold block">Location</span>
                <span className="text-xs font-bold text-brand-text">India · Open to Remote</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[10px] text-brand-muted uppercase font-bold tracking-wider block">Find me online</span>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/Sumantkumaryadav8668"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-brand-card/25 border border-brand-border/40 hover:border-brand-accent/40 rounded-xl px-3.5 py-2 text-xs text-brand-muted hover:text-brand-text transition-colors"
              >
                <FaGithub className="w-4 h-4 text-brand-text" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yadavsumant/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-brand-card/25 border border-brand-border/40 hover:border-brand-accent/40 rounded-xl px-3.5 py-2 text-xs text-brand-muted hover:text-brand-text transition-colors"
              >
                <FaLinkedin className="w-4 h-4 text-brand-accent" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/u/Suman_tkumaryadav/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-brand-card/25 border border-brand-border/40 hover:border-brand-accent/40 rounded-xl px-3.5 py-2 text-xs text-brand-muted hover:text-brand-text transition-colors"
              >
                <SiLeetcode className="w-4 h-4 text-amber-500" />
                <span>LeetCode</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-brand-border/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-muted">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-brand-card/30 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-brand-muted">Email</label>
                <input
                  type="email"
                  required
                  placeholder="sumantkumaryadav526@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-card/30 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-brand-muted">Subject</label>
              <input
                type="text"
                required
                placeholder="Job / Internship Opportunity"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-brand-card/30 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-brand-muted">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Hi Sumant, I came across your portfolio and would like to discuss an opportunity with you."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-brand-card/30 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none focus:border-brand-primary resize-none"
              ></textarea>
            </div>

            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-brand-success/10 border border-brand-success/20 text-brand-success p-3 rounded-xl flex items-center space-x-2 text-xs"
                >
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Message dispatched successfully! Sumant will review it within 24 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full py-3 h-auto rounded-xl text-white font-semibold flex items-center justify-center space-x-2 border-0 shadow-lg shadow-brand-primary/10 normal-case cursor-pointer"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-6">
          <InteractiveCalendar />
        </div>
      </div>
    </section>
  );
};
