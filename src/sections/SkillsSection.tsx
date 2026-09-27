import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code, X } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { FaReact, FaNodeJs, FaJs, FaJava, FaPython, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiSocketdotio, SiMongodb, SiRedis, SiGithubactions, SiVite, SiLangchain, SiCplusplus, SiFramer } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';

const skillIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  FaNodeJs,
  GrGraphQl,
  SiSocketdotio,
  FaJs,
  FaJava,
  FaPython,
  SiCplusplus,
  SiMongodb,
  BiLogoPostgresql,
  SiRedis,
  FaAws,
  FaDocker,
  SiGithubactions,
  FaGitAlt,
  SiVite,
  SiLangchain,
};

const renderSkillIcon = (iconName: string) => {
  const IconComponent = skillIconMap[iconName];
  if (IconComponent) {
    return <IconComponent size={20} />;
  }
  return <Code size={20} />;
};

export const SkillsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Derive all skills dynamically from original skillCategories array
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryName: cat.category }))
  );

  const categories = ['All', ...skillCategories.map((cat) => cat.category)];

  // Pure derived filtering logic (never mutates original array)
  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.categoryName === selectedCategory;

    const matchesSearch =
      searchTerm.trim() === '' ||
      skill.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 px-6 border-t border-gray-200/80 dark:border-brand-border/40 relative max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-primary dark:text-brand-accent">Skills</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-brand-text">Core Competence Grid</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        {/* Controlled Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 dark:text-brand-muted" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Java)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-brand-card/30 border border-gray-200 dark:border-brand-border rounded-xl pl-10 pr-9 py-3 text-sm text-gray-900 dark:text-brand-text placeholder:text-gray-400 dark:placeholder:text-brand-muted focus:outline-none focus:border-brand-primary shadow-xs dark:shadow-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-gray-400 dark:text-brand-muted hover:text-gray-700 dark:hover:text-brand-text focus:outline-none text-xs font-bold bg-gray-100 dark:bg-brand-border/40 hover:bg-gray-200 dark:hover:bg-brand-border/80 w-4 h-4 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="Clear Search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/20'
                  : 'bg-white dark:bg-brand-card/25 border-gray-200 dark:border-brand-border text-gray-700 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-text hover:border-brand-primary/50 dark:hover:border-brand-accent/50 shadow-xs dark:shadow-none'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              whileHover={{ y: -6, transition: { duration: 0.15 } }}
              className="bg-white dark:bg-brand-card/20 border border-gray-200/90 dark:border-brand-border/60 hover:border-brand-primary/50 dark:hover:border-brand-accent/40 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md dark:shadow-md relative group overflow-hidden transition-all duration-200"
            >
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl group-hover:bg-brand-primary/10 dark:group-hover:bg-brand-accent/15 transition-all"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-brand-bg flex items-center justify-center border border-gray-200/80 dark:border-brand-border/30 text-brand-primary dark:text-brand-accent group-hover:text-brand-primary transition-colors shadow-2xs dark:shadow-none">
                    {renderSkillIcon(skill.iconName)}
                  </div>
                  <span className="text-[10px] text-gray-600 dark:text-brand-muted bg-gray-100/90 dark:bg-brand-bg border border-gray-200/80 dark:border-brand-border/60 px-2 py-0.5 rounded-md font-semibold dark:font-medium uppercase">
                    {skill.experience}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-brand-text text-sm sm:text-base group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-brand-muted uppercase tracking-wider font-medium">{skill.categoryName}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500 dark:text-brand-muted">Proficiency</span>
                    <span className="text-brand-primary dark:text-brand-accent font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-brand-bgSec/60 border border-gray-200/70 dark:border-brand-border/40 rounded-full h-1.5">
                    <div className="bg-brand-primary dark:bg-brand-primary group-hover:bg-brand-primary dark:group-hover:bg-brand-accent h-full rounded-full transition-colors" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>

                {skill.projectsUsed.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100 dark:border-brand-border/20">
                    {skill.projectsUsed.slice(0, 2).map((proj) => (
                      <span key={proj} className="text-[9px] text-brand-primary dark:text-brand-muted bg-blue-50/80 dark:bg-brand-bg border border-blue-100/80 dark:border-transparent px-1.5 py-0.5 rounded font-medium">
                        {proj}
                      </span>
                    ))}
                    {skill.projectsUsed.length > 2 && (
                      <span className="text-[9px] text-brand-primary dark:text-brand-accent font-bold px-1 py-0.5">
                        +{skill.projectsUsed.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State when no skills match */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-brand-card/20 border border-gray-200 dark:border-brand-border/60 rounded-2xl p-10 text-center space-y-4 max-w-md mx-auto my-8 shadow-md dark:shadow-lg"
        >
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-brand-primary/10 border border-blue-100 dark:border-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-accent mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-brand-text">No Skills Found</h3>
            <p className="text-xs text-gray-600 dark:text-brand-muted mt-1">
              No skills found matching <span className="text-brand-primary dark:text-brand-accent font-mono font-semibold">"{searchTerm}"</span>
              {selectedCategory !== 'All' && <span> in <span className="font-semibold text-gray-900 dark:text-brand-text">{selectedCategory}</span></span>}.
            </p>
          </div>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="px-4 py-2 bg-brand-primary text-white dark:bg-brand-primary/10 dark:hover:bg-brand-primary/20 dark:text-brand-accent border border-brand-primary dark:border-brand-primary/30 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm dark:shadow-none"
          >
            Reset Search & Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};
