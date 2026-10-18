import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, ResponsiveContainer 
} from 'recharts';
import { 
  Code2, 
  Layout, 
  Server, 
  Database, 
  ArrowUpDown, 
  GitBranch, 
  Terminal, 
  Palette,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { SKILLS, TECHNICAL_SKILLS_CATEGORIES, TechnicalSkillCategory } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'metrics'>('all');

  const chartData = SKILLS.map(s => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));

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

          {/* Quick Filter / Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{language === 'bn' ? 'সকল প্রযুক্তিগত ক্যাটাগরি' : `Skill Categories (${TECHNICAL_SKILLS_CATEGORIES.length})`}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-600'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{language === 'bn' ? 'দক্ষতার মাত্রা ও রাডার' : 'Proficiency & Radar'}</span>
            </button>
          </div>
        </motion.div>

        {/* 1. Categorized Technical Skills Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'all' ? (
            <motion.div
              key="categories-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
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
            </motion.div>
          ) : (
            /* 2. Proficiency & Radar View */
            <motion.div
              key="metrics-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className="h-[300px] sm:h-[380px] md:h-[420px] w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {language === 'bn' ? 'প্রযুক্তিগত দক্ষতার ওভারভিউ' : 'Technical Proficiency Radar'}
                </h4>
                <div className="w-full h-full max-h-[340px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="68%" data={chartData}>
                      <PolarGrid stroke={theme === 'dark' ? '#334155' : '#cbd5e1'} />
                      <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: theme === 'dark' ? '#94a3b8' : '#475569', fontSize: 10, fontWeight: 600 }} 
                      />
                      <Radar
                        name="Proficiency"
                        dataKey="A"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={theme === 'dark' ? 0.6 : 0.45}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {SKILLS.map((skill, idx) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="p-3 sm:p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 shadow-sm transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">{skill.name}</span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${skill.level}%` }}
                        className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full group-hover:bg-indigo-500 transition-all duration-700"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-500 font-bold">{skill.category}</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Verified</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Skills;
