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
    <section id="projects" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto space-y-12">
      {/* ================================================== */}
      {/* SECTION HEADER & CATEGORY SELECTOR */}
      {/* ================================================== */}
      <div className="flex flex-col space-y-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-1.5 w-fit mx-auto text-brand-accent font-bold text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          Pioneering Product Showcases
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text">Projects & Engineering Builds</h2>
        <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Explore featured product case studies or compact technical builds.
        </p>

        {/* Category Selector Tabs */}
        <div className="flex justify-center items-center gap-3 pt-2">
          <button
            onClick={() => setActiveCategory('major')}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
              activeCategory === 'major'
                ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 scale-105'
                : 'bg-brand-card/40 text-brand-muted border-brand-border/60 hover:text-brand-text hover:border-brand-primary/40'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>MAJOR PROJECTS</span>
          </button>

          <button
            onClick={() => setActiveCategory('minor')}
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center space-x-2 border ${
              activeCategory === 'minor'
                ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 scale-105'
                : 'bg-brand-card/40 text-brand-muted border-brand-border/60 hover:text-brand-text hover:border-brand-primary/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>MINOR PROJECTS</span>
          </button>
        </div>

        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full mt-2"></div>
      </div>

      {/* ================================================== */}
      {/* CATEGORY CONTENT SWITCHER */}
      {/* ================================================== */}
      <AnimatePresence mode="wait">
        {activeCategory === 'major' ? (
          <motion.div
            key="major-projects"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {majorProjects.map((heroProject) => (
              <div
                key={heroProject.id}
                className="bg-gradient-to-tr from-brand-card/30 to-brand-card/10 border border-brand-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center space-x-2 bg-brand-accent/15 border border-brand-accent/30 rounded-xl px-4 py-1.5 w-fit text-brand-accent font-bold text-xs uppercase">
                        <Award className="w-4 h-4 mr-1" />
                        Flagship Project
                      </div>
                      {heroProject.status && (
                        <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 rounded-xl px-4 py-1.5 w-fit text-amber-400 font-bold text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                          <span>{heroProject.status}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-text">{heroProject.title}</h3>
                      <p className="text-sm font-semibold text-brand-muted mt-1">{heroProject.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-brand-bg/50 border border-brand-border/50 rounded-2xl">
                      {heroProject.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <span className="text-[10px] text-brand-muted uppercase font-bold block">{metric.label}</span>
                          <span className="text-sm sm:text-base font-extrabold text-brand-accent">{metric.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex border-b border-brand-border overflow-x-auto pb-1 gap-4 no-scrollbar">
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
                            heroActiveTab === tab.id ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-text'
                          }`}
                        >
                          {tab.label}
                          {heroActiveTab === tab.id && (
                            <motion.div layoutId="heroTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[160px] text-sm text-brand-muted leading-relaxed">
                      <AnimatePresence mode="wait">
                        {heroActiveTab === 'overview' && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="space-y-4"
                          >
                            <p>{heroProject.longDescription}</p>
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-brand-text mb-2 block">Key Responsibilities:</span>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0">
                                {heroProject.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start space-x-1.5 text-xs list-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0"></span>
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
                            <div className="flex items-center space-x-2 text-brand-text font-bold text-xs uppercase">
                              <Code className="w-4 h-4 text-brand-accent" />
                              <span>System Architecture Details</span>
                            </div>
                            <p>{heroProject.architecture}</p>
                            <div className="bg-brand-bgSec/60 border border-brand-border/60 rounded-xl p-3 text-xs font-mono text-brand-muted">
                              Frontend (React / Axios) {"->"} REST API (Express.js / JWT) {"->"} Mongoose ODM {"->"} MongoDB Database
                            </div>
                          </motion.div>
                        )}

                        {heroActiveTab === 'solutions' && (
                          <motion.div
                            key="solutions"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="space-y-4"
                          >
                            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl space-y-1">
                              <div className="flex items-center space-x-1.5 text-red-400 font-bold text-xs">
                                <ShieldAlert className="w-4 h-4" />
                                <span>Core Engineering Challenge:</span>
                              </div>
                              <p className="text-xs">{heroProject.challenges}</p>
                            </div>

                            <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl space-y-1">
                              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs">
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
                            className="prose prose-sm prose-invert max-w-none text-xs text-brand-muted"
                          >
                            <div className="space-y-3 whitespace-pre-line leading-relaxed">
                              {heroProject.caseStudy}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-brand-border/40">
                      {heroProject.githubUrl ? (
                        <a
                          href={heroProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm bg-brand-card hover:bg-brand-bg text-brand-text border border-brand-border px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-pointer"
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>GitHub Code</span>
                        </a>
                      ) : (
                        <button
                          disabled
                          className="btn btn-sm bg-brand-card/30 text-brand-muted/60 border border-brand-border/40 px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-not-allowed opacity-60"
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
                          className="btn btn-sm btn-primary text-white border-0 px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <button
                          disabled
                          className="btn btn-sm bg-brand-primary/10 text-brand-muted/60 border border-brand-primary/20 px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-not-allowed opacity-60"
                          title="Live Demo coming soon - In Development"
                        >
                          <ExternalLink className="w-4 h-4 opacity-50" />
                          <span>Live Demo (Coming Soon)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <div className="relative group overflow-hidden rounded-2xl border border-brand-border/60 shadow-xl">
                      <img
                        src={featuredActiveImg || heroProject.image}
                        alt={`${heroProject.title} interface display`}
                        className="w-full object-cover aspect-video group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60"></div>
                    </div>

                    {heroProject.gallery && heroProject.gallery.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        <div
                          onClick={() => setFeaturedActiveImg(heroProject.image)}
                          className={`rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                            (featuredActiveImg === null || featuredActiveImg === heroProject.image)
                              ? 'border-brand-accent scale-95 shadow-md shadow-brand-accent/20'
                              : 'border-brand-border/60 opacity-70 hover:opacity-100 hover:scale-102'
                          }`}
                        >
                          <img src={heroProject.image} alt="Main" className="w-full h-full object-cover" />
                        </div>
                        {heroProject.gallery.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setFeaturedActiveImg(img)}
                            className={`rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                              featuredActiveImg === img
                                ? 'border-brand-accent scale-95 shadow-md shadow-brand-accent/20'
                                : 'border-brand-border/60 opacity-70 hover:opacity-100 hover:scale-102'
                            }`}
                          >
                            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover animate-none" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {heroProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-brand-bg border border-brand-border px-2.5 py-1 rounded-lg text-brand-muted font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  whileHover={{ y: -6 }}
                  className="bg-brand-card/20 border border-brand-border/60 hover:border-brand-accent/50 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all"
                >
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-xl border border-brand-border/50 aspect-video">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-brand-bgSec/60 border border-brand-border/50 text-brand-muted px-2 py-0.5 rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-4 mt-4 border-t border-brand-border/30">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-brand-bgSec/60 hover:bg-brand-card text-brand-text border border-brand-border/60 rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-accent border border-brand-primary/30 rounded-xl py-2 px-3 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className="p-2 rounded-xl bg-brand-bgSec/40 border border-brand-border/40 text-brand-muted hover:text-brand-text hover:bg-brand-bgSec transition-colors"
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
              className="absolute inset-0 bg-black"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-card border border-brand-border w-full max-w-4xl rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] relative z-10 shadow-2xl"
            >
              <button
                onClick={() => { setSelectedProjectId(null); setModalActiveImg(null); setModalActiveTab('overview'); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-bg/50 border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-text cursor-pointer bg-transparent border-0 text-xl font-bold"
              >
                &times;
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-text">{activeProjectForModal.title}</h3>
                    <p className="text-xs font-semibold text-brand-muted mt-1">{activeProjectForModal.subtitle}</p>
                  </div>

                  <div className="flex border-b border-brand-border overflow-x-auto pb-1 gap-4 no-scrollbar">
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
                          modalActiveTab === tab.id ? 'text-brand-accent' : 'text-brand-muted hover:text-brand-text'
                        }`}
                      >
                        {tab.label}
                        {modalActiveTab === tab.id && (
                          <motion.div layoutId="modalTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[160px] text-xs text-brand-muted leading-relaxed">
                    <AnimatePresence mode="wait">
                      {modalActiveTab === 'overview' && (
                        <motion.div
                          key="modal-overview"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-4"
                        >
                          <p>{activeProjectForModal.longDescription || activeProjectForModal.description}</p>
                          {activeProjectForModal.responsibilities && (
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-brand-text mb-2 block">Key Responsibilities:</span>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0">
                                {activeProjectForModal.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="flex items-start space-x-1.5 text-xs list-none">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0"></span>
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
                          <div className="flex items-center space-x-2 text-brand-text font-bold text-[10px] uppercase">
                            <Code className="w-4 h-4 text-brand-accent" />
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
                          className="space-y-4"
                        >
                          <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl space-y-1">
                            <div className="flex items-center space-x-1.5 text-red-400 font-bold text-[10px] uppercase">
                              <ShieldAlert className="w-4 h-4" />
                              <span>Core Engineering Challenge:</span>
                            </div>
                            <p className="text-xs">{activeProjectForModal.challenges}</p>
                          </div>

                          <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl space-y-1">
                            <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-[10px] uppercase">
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
                          className="prose prose-sm prose-invert max-w-none text-xs text-brand-muted"
                        >
                          <div className="whitespace-pre-line leading-relaxed">
                            {activeProjectForModal.caseStudy}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-brand-border/40">
                    {activeProjectForModal.githubUrl && (
                      <a
                        href={activeProjectForModal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-brand-bg hover:bg-brand-card text-brand-text border border-brand-border px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-pointer text-xs"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>GitHub Code</span>
                      </a>
                    )}
                    {activeProjectForModal.liveUrl && (
                      <a
                        href={activeProjectForModal.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary text-white border-0 px-4 py-2 h-auto rounded-xl flex items-center space-x-1.5 normal-case font-bold cursor-pointer text-xs"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <div className="relative group overflow-hidden rounded-2xl border border-brand-border/60 shadow-xl">
                    <img
                      src={modalActiveImg || activeProjectForModal.image}
                      alt={`${activeProjectForModal.title} display`}
                      className="w-full object-cover aspect-video group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-60"></div>
                  </div>

                  {activeProjectForModal.gallery && activeProjectForModal.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        onClick={() => setModalActiveImg(activeProjectForModal.image)}
                        className={`rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                          (modalActiveImg === null || modalActiveImg === activeProjectForModal.image)
                            ? 'border-brand-accent scale-95 shadow-md shadow-brand-accent/20'
                            : 'border-brand-border/60 opacity-70 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img src={activeProjectForModal.image} alt="Main" className="w-full h-full object-cover" />
                      </div>
                      {activeProjectForModal.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setModalActiveImg(img)}
                          className={`rounded-xl overflow-hidden border aspect-video cursor-pointer transition-all ${
                            modalActiveImg === img
                              ? 'border-brand-accent scale-95 shadow-md shadow-brand-accent/20'
                              : 'border-brand-border/60 opacity-70 hover:opacity-100 hover:scale-102'
                          }`}
                        >
                          <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeProjectForModal.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] bg-brand-bg border border-brand-border px-2.5 py-1 rounded-lg text-brand-muted font-mono"
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
