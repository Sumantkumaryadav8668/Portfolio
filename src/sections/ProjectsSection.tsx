import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Award, FileText, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projectsData } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'major' | 'minor'>('major');
  const [heroActiveTab, setHeroActiveTab] = useState<'overview' | 'architecture' | 'solutions' | 'casestudy'>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'overview' | 'architecture' | 'solutions' | 'casestudy'>('overview');
  const [featuredActiveImg, setFeaturedActiveImg] = useState<string | null>(null);
  const [modalActiveImg, setModalActiveImg] = useState<string | null>(null);

  const majorProjects = projectsData.filter((p) => p.category === 'major' || p.featured);
  const minorProjects = projectsData.filter((p) => p.category === 'minor');

  const activeProjectForModal = projectsData.find((p) => p.id === selectedProjectId);

  return (
    <section id="projects" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto space-y-10">
      {/* SECTION HEADER & CATEGORY SELECTOR */}
      <div className="flex flex-col space-y-3 text-center">
        <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-full px-3.5 py-1.5 w-fit mx-auto text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Pioneering Product Showcases
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Projects & Engineering Builds</h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore featured product case studies and compact technical builds.
        </p>

        {/* Category Selector Tabs */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => setActiveCategory('major')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-2 border ${
              activeCategory === 'major'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>MAJOR PROJECTS</span>
          </button>

          <button
            onClick={() => setActiveCategory('minor')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center space-x-2 border ${
              activeCategory === 'minor'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-blue-500/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>MINOR PROJECTS</span>
          </button>
        </div>

        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mt-2"></div>
      </div>

      {/* CATEGORY CONTENT SWITCHER */}
      <AnimatePresence mode="wait">
        {activeCategory === 'major' ? (
          <motion.div
            key="major-projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {majorProjects.map((heroProject) => {
              return (
                <div
                  key={heroProject.id}
                  className="card card-elevated card-hover p-6 sm:p-8 relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                    <div className="lg:col-span-8 space-y-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div className="inline-flex items-center space-x-1.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-lg px-3 py-1 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase">
                          <Award className="w-3.5 h-3.5 mr-1" />
                          Flagship Project
                        </div>
                        {heroProject.status && (
                          <div className="inline-flex items-center space-x-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-lg px-3 py-1 text-amber-700 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            <span>{heroProject.status}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{heroProject.title}</h3>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{heroProject.subtitle}</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl">
                        {heroProject.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">{metric.label}</span>
                            <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400">{metric.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 gap-4 no-scrollbar">
                        {[
                          { id: 'overview', label: 'Overview' },
                          { id: 'architecture', label: 'Architecture' },
                          { id: 'solutions', label: 'Challenges & Solutions' },
                          { id: 'casestudy', label: 'Full Case Study' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setHeroActiveTab(tab.id as any)}
                            className={`text-xs font-bold pb-2 cursor-pointer transition-colors whitespace-nowrap focus:outline-none relative bg-transparent border-0 ${
                              heroActiveTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                          >
                            {tab.label}
                            {heroActiveTab === tab.id && (
                              <motion.div layoutId="heroTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="min-h-[140px] text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <AnimatePresence mode="wait">
                          {heroActiveTab === 'overview' && (
                            <motion.div
                              key="overview"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-3"
                            >
                              <p>{heroProject.longDescription}</p>
                              <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5 block">Key Responsibilities:</span>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-0">
                                  {heroProject.responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start space-x-1.5 text-xs list-none">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}

                          {heroActiveTab === 'architecture' && (
                            <motion.div
                              key="architecture"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-xs uppercase">
                                <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span>System Architecture Details</span>
                              </div>
                              <p>{heroProject.architecture}</p>
                            </motion.div>
                          )}

                          {heroActiveTab === 'solutions' && (
                            <motion.div
                              key="solutions"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="space-y-3"
                            >
                              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-xl space-y-1">
                                <div className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs">
                                  <ShieldAlert className="w-4 h-4" />
                                  <span>Core Engineering Challenge:</span>
                                </div>
                                <p className="text-xs">{heroProject.challenges}</p>
                              </div>

                              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl space-y-1">
                                <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                                  <Award className="w-4 h-4" />
                                  <span>Resolution Strategy:</span>
                                </div>
                                <p className="text-xs">{heroProject.solutions}</p>
                              </div>
                            </motion.div>
                          )}

                          {heroActiveTab === 'casestudy' && (
                            <motion.div
                              key="casestudy"
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="prose prose-sm max-w-none text-xs text-slate-600 dark:text-slate-300"
                            >
                              <div className="space-y-2 whitespace-pre-line leading-relaxed">
                                {heroProject.caseStudy}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                        {heroProject.githubUrl ? (
                          <a
                            href={heroProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary py-2 px-4 text-xs"
                          >
                            <FaGithub className="w-4 h-4" />
                            <span>GitHub Code</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="btn-secondary py-2 px-4 text-xs opacity-50 cursor-not-allowed"
                            title="Repository coming soon - In Development"
                          >
                            <FaGithub className="w-4 h-4 opacity-50" />
                            <span>GitHub Code (Coming Soon)</span>
                          </button>
                        )}

                        {heroProject.liveUrl ? (
                          <a
                            href={heroProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary py-2 px-4 text-xs"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="btn-primary py-2 px-4 text-xs opacity-50 cursor-not-allowed"
                            title="Live Demo coming soon - In Development"
                          >
                            <ExternalLink className="w-4 h-4 opacity-50" />
                            <span>Live Demo (Coming Soon)</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-3">
                      <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <img
                          src={featuredActiveImg || heroProject.image}
                          alt={`${heroProject.title} interface display`}
                          className="w-full object-cover aspect-video hover:scale-102 transition-transform duration-300"
                        />
                      </div>

                      {heroProject.gallery && heroProject.gallery.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          <div
                            onClick={() => setFeaturedActiveImg(heroProject.image)}
                            className={`rounded-lg overflow-hidden border aspect-video cursor-pointer transition-all ${
                              (featuredActiveImg === null || featuredActiveImg === heroProject.image)
                                ? 'border-blue-600 scale-95 shadow-sm'
                                : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={heroProject.image} alt="Main" className="w-full h-full object-cover" />
                          </div>
                          {heroProject.gallery.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => setFeaturedActiveImg(img)}
                              className={`rounded-lg overflow-hidden border aspect-video cursor-pointer transition-all ${
                                featuredActiveImg === img
                                  ? 'border-blue-600 scale-95 shadow-sm'
                                  : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                              }`}
                            >
                              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 pt-1">
                        {heroProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="minor-projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {minorProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -4 }}
                  className="card card-hover p-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary py-1.5 px-3 text-xs"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    ) : (
                      <button disabled className="flex-1 btn-secondary py-1.5 px-3 text-xs opacity-50 cursor-not-allowed">
                        <FaGithub className="w-3.5 h-3.5 opacity-50" />
                        <span>GitHub</span>
                      </button>
                    )}

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary py-1.5 px-3 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <button disabled className="flex-1 btn-primary py-1.5 px-3 text-xs opacity-50 cursor-not-allowed">
                        <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                        <span>Live Demo</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="View Details"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProjectForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedProjectId(null); setModalActiveImg(null); setModalActiveTab('overview'); }}
              className="absolute inset-0 bg-slate-950"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="card border border-slate-200 dark:border-slate-800 w-full max-w-4xl rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] relative z-10 shadow-xl"
            >
              <button
                onClick={() => { setSelectedProjectId(null); setModalActiveImg(null); setModalActiveTab('overview'); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer bg-transparent border-0 text-lg font-bold"
              >
                &times;
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeProjectForModal.title}</h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">{activeProjectForModal.subtitle}</p>
                  </div>

                  <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 gap-4 no-scrollbar">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'architecture', label: 'Architecture' },
                      { id: 'solutions', label: 'Challenges & Solutions' },
                      { id: 'casestudy', label: 'Full Case Study' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setModalActiveTab(tab.id as any)}
                        className={`text-xs font-bold pb-2 cursor-pointer transition-colors whitespace-nowrap focus:outline-none relative bg-transparent border-0 ${
                          modalActiveTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                        {modalActiveTab === tab.id && (
                          <motion.div layoutId="modalTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[140px] text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <AnimatePresence mode="wait">
                      {modalActiveTab === 'overview' && (
                        <motion.div
                          key="modal-overview"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-3"
                        >
                          <p>{activeProjectForModal.longDescription || activeProjectForModal.description}</p>
                          {activeProjectForModal.responsibilities && (
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-1.5 block">Key Responsibilities:</span>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-0">
                                {activeProjectForModal.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start space-x-1.5 text-xs list-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {modalActiveTab === 'architecture' && (
                        <motion.div
                          key="modal-architecture"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-xs uppercase">
                            <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span>System Architecture Details</span>
                          </div>
                          <p>{activeProjectForModal.architecture}</p>
                        </motion.div>
                      )}

                      {modalActiveTab === 'solutions' && (
                        <motion.div
                          key="modal-solutions"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-3"
                        >
                          <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-xl space-y-1">
                            <div className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase">
                              <ShieldAlert className="w-4 h-4" />
                              <span>Core Engineering Challenge:</span>
                            </div>
                            <p className="text-xs">{activeProjectForModal.challenges}</p>
                          </div>

                          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl space-y-1">
                            <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase">
                              <Award className="w-4 h-4" />
                              <span>Resolution Strategy:</span>
                            </div>
                            <p className="text-xs">{activeProjectForModal.solutions}</p>
                          </div>
                        </motion.div>
                      )}

                      {modalActiveTab === 'casestudy' && (
                        <motion.div
                          key="modal-casestudy"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="prose prose-sm max-w-none text-xs text-slate-600 dark:text-slate-300"
                        >
                          <div className="whitespace-pre-line leading-relaxed">
                            {activeProjectForModal.caseStudy}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    {activeProjectForModal.githubUrl ? (
                      <a
                        href={activeProjectForModal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary py-1.5 px-3 text-xs"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>GitHub Code</span>
                      </a>
                    ) : (
                      <button disabled className="btn-secondary py-1.5 px-3 text-xs opacity-50 cursor-not-allowed">
                        <FaGithub className="w-4 h-4 opacity-50" />
                        <span>GitHub</span>
                      </button>
                    )}
                    {activeProjectForModal.liveUrl ? (
                      <a
                        href={activeProjectForModal.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-1.5 px-3 text-xs"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <button disabled className="btn-primary py-1.5 px-3 text-xs opacity-50 cursor-not-allowed">
                        <ExternalLink className="w-4 h-4 opacity-50" />
                        <span>Live Demo</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-3">
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <img
                      src={modalActiveImg || activeProjectForModal.image}
                      alt={`${activeProjectForModal.title} display`}
                      className="w-full object-cover aspect-video"
                    />
                  </div>

                  {activeProjectForModal.gallery && activeProjectForModal.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        onClick={() => setModalActiveImg(activeProjectForModal.image)}
                        className={`rounded-lg overflow-hidden border aspect-video cursor-pointer transition-all ${
                          (modalActiveImg === null || modalActiveImg === activeProjectForModal.image)
                            ? 'border-blue-600 scale-95 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={activeProjectForModal.image} alt="Main" className="w-full h-full object-cover" />
                      </div>
                      {activeProjectForModal.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setModalActiveImg(img)}
                          className={`rounded-lg overflow-hidden border aspect-video cursor-pointer transition-all ${
                            modalActiveImg === img
                              ? 'border-blue-600 scale-95 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 pt-1">
                    {activeProjectForModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-750 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
