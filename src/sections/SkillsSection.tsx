import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code, X } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { FaReact, FaNodeJs, FaJs, FaJava, FaPython, FaAws, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiSocketdotio, SiMongodb, SiRedis, SiGithubactions, SiVite, SiLangchain, SiCplusplus, SiFramer, SiExpress } from 'react-icons/si';
import { BiLogoPostgresql } from 'react-icons/bi';
import { GrGraphQl } from 'react-icons/gr';

const skillIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  SiExpress,
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

  // Pure derived filtering logic
  const filteredSkills = allSkills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.categoryName === selectedCategory;

    const matchesSearch =
      searchTerm.trim() === '' ||
      skill.name.toLowerCase().includes(searchTerm.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      {/* Section Heading */}
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">Skills</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Core Competence Grid</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
        {/* Controlled Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Java)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 pr-9 py-2.5 text-xs sm:text-sm"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700 dark:hover:text-white focus:outline-none text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center transition-colors cursor-pointer"
              title="Clear Search"
            >
              <X className="w-3.5 h-3.5" />
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
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/40 shadow-sm'
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-3 px-1"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="h-full"
            >
              <div className="skill-card h-full">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80 text-blue-600 dark:text-blue-400">
                      {renderSkillIcon(skill.iconName)}
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 px-2 py-0.5 rounded font-semibold uppercase">
                      {skill.experience}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                      {skill.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{skill.categoryName}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 dark:text-slate-400">Proficiency</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>

                  {skill.projectsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {skill.projectsUsed.slice(0, 2).map((proj) => (
                        <span key={proj} className="text-[9px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 px-1.5 py-0.5 rounded font-medium">
                          {proj}
                        </span>
                      ))}
                      {skill.projectsUsed.length > 2 && (
                        <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold px-1 py-0.5">
                          +{skill.projectsUsed.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
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
          className="card p-8 text-center space-y-3 max-w-md mx-auto my-8"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Skills Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              No skills match <span className="font-semibold text-blue-600 dark:text-blue-400">"{searchTerm}"</span>
              {selectedCategory !== 'All' && <span> in <span className="font-semibold text-slate-900 dark:text-white">{selectedCategory}</span></span>}.
            </p>
          </div>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="btn-primary py-1.5 px-3 text-xs"
          >
            Reset Search & Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};
