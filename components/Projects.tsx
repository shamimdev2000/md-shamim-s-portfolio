
import React from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import projectBakery from './Assets/bakery_erp_system.jpg';
import projectCreativeIT from './Assets/creative_it_landing.jpg';
import project1 from './Assets/project1.png';
import project2 from './Assets/project2.png';
import project3 from './Assets/project3.png';
import { useLanguage } from '../context/LanguageContext';

const projectImages: Record<string, string> = {
  'bakery-erp': projectBakery,
  '1': projectCreativeIT,
  '2': project1,
  '3': project2,
};

const Projects: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{t('projects.title')}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              {t('projects.subtitle')}
            </p>
          </div>
          <a href="https://github.com/shamimdev2000" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold inline-flex items-center gap-2">
            {t('projects.viewAll')} <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden group hover:border-indigo-400 dark:hover:border-slate-600 transition-all shadow-md dark:shadow-none hover:shadow-xl hover:shadow-indigo-950/10 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                <img 
                  src={projectImages[project.id] || project1} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-all shadow-lg" title="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all shadow-lg" title="GitHub Code">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-[11px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                {project.highlights && project.highlights.length > 0 && (
                  <ul className="mb-5 space-y-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {project.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 transition-colors">
                    <span>{t('projects.learnMore')}</span> <ArrowIcon />
                  </a>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1">
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default Projects;
