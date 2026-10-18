import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  ArrowUpDown, 
  GitBranch, 
  Terminal, 
  Palette,
  Sparkles
} from 'lucide-react';
import { TECHNICAL_SKILLS_CATEGORIES, TechnicalSkillCategory } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const getCategoryIcon = (iconType: TechnicalSkillCategory['iconType']) => {
  switch (iconType) {
    case 'code':
      return <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
    case 'layout':
      return <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
    case 'server':
      return <Server className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />;
    case 'database':
      return <Database className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />;
    case 'fetch':
      return <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500" />;
    case 'git':
      return <GitBranch className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />;
    case 'tool':
      return <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />;
    case 'design':
      return <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />;
    default:
      return <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />;
  }
};

const Skills: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-50/80 dark:bg-slate-900/60 transition-colors duration-300 overflow-hidden relative">
      {/* Background subtle glow */}
      <div className="absolute top-1/4 -left-32 sm:-left-48 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 sm:-right-48 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'দক্ষতা ও স্ট্যাক' : 'Technical Proficiency'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            {language === 'bn' 
              ? 'প্রোগ্রামিং ল্যাঙ্গুয়েজ, আধুনিক ফ্রন্টএন্ড, MERN ব্যাকএন্ড ও ডাটাবেজ সমন্বিত প্রযুক্তিগত দক্ষতার বিস্তারিত চিত্র।'
              : 'Comprehensive technical skills across programming languages, modern frontend UI, MERN backend, database, and dev workflows.'}
          </p>
        </motion.div>

        {/* Categorized Technical Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {TECHNICAL_SKILLS_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="group relative bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon + Category Name */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 group-hover:scale-105 transition-transform shrink-0">
                      {getCategoryIcon(cat.iconType)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                        {language === 'bn' ? cat.titleBn : cat.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Learning Focus Badge if present */}
                {cat.badge && (
                  <div className="mb-2.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {language === 'bn' ? cat.badgeBn : cat.badge}
                    </span>
                  </div>
                )}

                {/* Skill items chips/tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-slate-100 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 group-hover:border-indigo-500/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span>{cat.skills.length} {language === 'bn' ? 'দক্ষতা' : 'skills'}</span>
                <span className="font-mono text-indigo-500 font-medium">#{cat.iconType}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
