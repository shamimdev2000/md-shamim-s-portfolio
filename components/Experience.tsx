import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, RESUME_DATA } from '../constants';
import { Briefcase, Award, GraduationCap, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="py-16 sm:py-24 bg-slate-100/60 dark:bg-slate-900/50 transition-colors duration-300 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 sm:mb-4 tracking-tight">
            {t('exp.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {t('exp.subtitle')}
          </p>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-2.5 sm:ml-4 md:ml-6 space-y-8 sm:space-y-12 mb-12 sm:mb-16">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.12, ease: "easeOut" }}
              className="relative pl-6 sm:pl-9 md:pl-12"
            >
              {/* Timeline Pin Indicator */}
              <div className="absolute -left-[13px] sm:-left-[15px] md:-left-4 top-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-indigo-600 border-3 sm:border-4 border-slate-100 dark:border-slate-950 rounded-full flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              
              <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:border-indigo-400 dark:hover:border-slate-700 transition-all shadow-sm hover:bg-slate-50 dark:hover:bg-slate-900/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs sm:text-sm">{exp.company}</p>
                  </div>
                  <span className="self-start sm:self-auto inline-block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-transparent rounded-lg text-slate-700 dark:text-slate-400 text-[11px] sm:text-xs font-mono font-medium">
                    {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-2 sm:space-y-2.5">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2 sm:gap-2.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                      <span className="text-indigo-600 dark:text-indigo-500 font-bold shrink-0">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications, Courses & Education Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
          {/* Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-4 sm:p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl flex flex-col justify-between hover:border-indigo-400 dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 sm:mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-[11px] sm:text-xs uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider mb-1">
                {language === 'bn' ? 'সার্টিফিকেশন' : 'Certifications'}
              </h4>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-2 leading-snug">
                {RESUME_DATA.certification.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">
                {RESUME_DATA.certification.authority}
              </p>
            </div>
            <a 
              href={RESUME_DATA.certification.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-2"
            >
              <span>{language === 'bn' ? 'সার্টিফিকেট যাচাই করুন' : 'View Certificate'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Courses */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="p-4 sm:p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl flex flex-col justify-between hover:border-indigo-400 dark:hover:border-slate-700 transition-all"
          >
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 sm:mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-[11px] sm:text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider mb-2">
                {language === 'bn' ? 'চলমান কোর্সসমূহ' : 'Professional Courses'}
              </h4>
              <div className="space-y-2.5">
                {RESUME_DATA.courses.map((course, i) => (
                  <div key={i} className="border-b border-slate-100 dark:border-slate-800/80 pb-2 last:border-0 last:pb-0">
                    <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">{course.name}</p>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {course.institute} <span className="text-indigo-600 dark:text-indigo-400 font-medium font-mono">({course.status})</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-4 pt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{language === 'bn' ? 'নিয়মিত স্কিল ডেভেলপমেন্ট' : 'Active Training'}</span>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="p-4 sm:p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl flex flex-col justify-between hover:border-indigo-400 dark:hover:border-slate-700 transition-all sm:col-span-2 md:col-span-1"
          >
            <div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3 sm:mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-[11px] sm:text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider mb-1">
                {language === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Education'}
              </h4>
              <h5 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1 leading-snug">
                {RESUME_DATA.education.degree}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {RESUME_DATA.education.institution}
              </p>
            </div>
            <div className="inline-block px-2.5 py-1 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/40 rounded-lg text-cyan-700 dark:text-cyan-300 text-xs font-medium w-fit mt-2">
              {RESUME_DATA.education.status}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
