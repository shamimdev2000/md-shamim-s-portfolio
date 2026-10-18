import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import projectBakery from './Assets/bakery_erp_system.jpg';
import projectCreativeIT from './Assets/creative_it_landing.jpg';
import project1 from './Assets/project1.png';
import project2 from './Assets/project2.png';
import { useLanguage } from '../context/LanguageContext';

const projectImages: Record<string, string> = {
  'bakery-erp': projectBakery,
  '1': projectCreativeIT,
  '2': project1,
  '3': project2,
};

const Projects: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
              {t('projects.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl">
              {t('projects.subtitle')}
            </p>
          </div>
          <a 
            href="https://github.com/shamimdev2000" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
          >
            <span>{t('projects.viewAll')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden group hover:border-indigo-400 dark:hover:border-slate-600 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-950/10 flex flex-col h-full"
            >
              {/* Project Image Banner */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img 
                  src={projectImages[project.id] || project1} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Mobile direct badges on top corners */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 md:hidden z-10">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1 border border-white/20 shadow-md"
                    title="Live Preview"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Desktop Hover Overlay with Action Buttons */}
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-transform hover:scale-110 shadow-lg" 
                    title="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-3 bg-slate-900 text-white border border-slate-700 rounded-full hover:bg-slate-800 transition-transform hover:scale-110 shadow-lg" 
                      title="GitHub Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlight Bullets */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="mb-4 sm:mb-5 space-y-1.5 sm:space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                          <span className="leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Footer with Mobile-Friendly Direct Links */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{t('projects.learnMore')}</span> 
                    <ArrowIcon />
                  </a>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                        title="GitHub Code"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">Code</span>
                      </a>
                    )}
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-sm"
                      title="Live Website"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default Projects;
