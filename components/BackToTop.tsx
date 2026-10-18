import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = 450;
      const currentScrollY = window.scrollY;
      
      // Check if user has scrolled past hero section
      if (currentScrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate total page scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        >
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            aria-label={t('common.backToTop')}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
          >
            {/* Circular Progress Ring */}
            <svg className="absolute w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-indigo-600 dark:stroke-indigo-500 transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Icon */}
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />

            {/* Tooltip */}
            <span className="absolute -top-9 right-0 px-2.5 py-1 text-[11px] font-medium text-white bg-slate-900 dark:bg-slate-800 border border-slate-700/50 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {t('common.backToTop')}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
