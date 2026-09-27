import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { blogsData } from '../data/portfolioData';

const renderMarkdown = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    if (line.startsWith('### ')) {
      return <h3 key={index} className="text-lg font-bold text-brand-text mt-6 mb-3">{line.substring(4)}</h3>;
    }
    if (line.startsWith('#### ')) {
      return <h4 key={index} className="text-base font-bold text-brand-accent mt-4 mb-2">{line.substring(5)}</h4>;
    }
    if (line.startsWith('- ')) {
      return <li key={index} className="text-xs text-brand-muted ml-4 list-disc mb-1">{line.substring(2)}</li>;
    }
    if (line.startsWith('1. ')) {
      return <li key={index} className="text-xs text-brand-muted ml-4 list-decimal mb-1">{line.substring(3)}</li>;
    }
    if (line.startsWith('```')) {
      if (line.trim() === '```' || line.trim().startsWith('```')) {
        return null;
      }
    }
    if (line.startsWith('const ') || line.startsWith('// ') || line.startsWith('const redis') || line.startsWith('io.adapter')) {
      return (
        <pre key={index} className="bg-brand-bg border border-brand-border/60 rounded-xl p-3 text-[11px] font-mono text-brand-accent overflow-x-auto my-2">
          <code>{line}</code>
        </pre>
      );
    }
    if (line.trim() === '') {
      return <div key={index} className="h-2"></div>;
    }
    return <p key={index} className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-3">{line}</p>;
  });
};

export const WritingsSection: React.FC = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const activeBlog = blogsData.find((b) => b.id === selectedBlogId);

  return (
    <section id="writings" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Writings</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Technical Insights</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsData.map((blog) => {
          return (
            <motion.div
              key={blog.id}
              whileHover={{ y: -6 }}
              className="bg-brand-card/20 border border-brand-border/65 hover:border-brand-accent/40 rounded-3xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group animate-none"
            >
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl border border-brand-border/60 aspect-video mb-4">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-brand-primary text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xl">
                    {blog.category}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-brand-muted">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">{blog.summary}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-[9px] bg-brand-bg border border-brand-border/60 text-brand-muted px-2 py-0.5 rounded-md font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border/30">
                <button
                  onClick={() => setSelectedBlogId(blog.id)}
                  className="inline-flex items-center text-xs font-bold text-brand-accent hover:text-brand-text transition-colors border-0 bg-transparent cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlogId(null)}
              className="absolute inset-0 bg-black"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-card border border-brand-border w-full max-w-2xl rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] relative z-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedBlogId(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-bg/50 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text cursor-pointer bg-transparent border-0"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-brand-accent bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-lg font-bold uppercase tracking-wider">
                    {activeBlog.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-text">{activeBlog.title}</h2>
                  <div className="flex items-center space-x-4 text-xs text-brand-muted pt-2">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" /> {activeBlog.date}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {activeBlog.readTime}</span>
                  </div>
                </div>

                <img src={activeBlog.thumbnail} alt={activeBlog.title} className="w-full object-cover rounded-2xl border border-brand-border max-h-[300px]" />

                <div className="pt-2 border-t border-brand-border/40">
                  {renderMarkdown(activeBlog.content)}
                </div>

                <div className="flex justify-end pt-4 border-t border-brand-border/40">
                  <button
                    onClick={() => setSelectedBlogId(null)}
                    className="btn btn-sm btn-ghost border border-brand-border/80 rounded-xl text-brand-muted hover:text-brand-text px-4 normal-case cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
