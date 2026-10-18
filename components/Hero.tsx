
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowRight, FileText, Download, Check } from 'lucide-react';
import shamim from './Assets/shamim.jpg';
import { generateAndDownloadResume } from '../utils/generateResumePDF';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { t, language } = useLanguage();

  const handleDownloadResume = () => {
    try {
      setDownloading(true);
      generateAndDownloadResume();
      setDownloaded(true);
      setTimeout(() => {
        setDownloading(false);
        setTimeout(() => setDownloaded(false), 3000);
      }, 600);
    } catch (err) {
      console.error('Failed to generate resume:', err);
      setDownloading(false);
    }
  };
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-2 mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300">
                {language === 'bn' ? 'হ্যালো, আমি' : "Hello, It's Me"}
              </h3>
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                MD SHAMIM
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-400">
                {language === 'bn' ? 'এবং আমি একজন ' : "And I'm a "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                  {language === 'bn' ? 'ফুল স্ট্যাক MERN ডেভেলপার' : 'Full Stack MERN Developer'}
                </span>
              </h2>
              <h2 className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400">
                {language === 'bn' ? 'শিক্ষার্থী, ক্রিয়েটিভ আইটি ইনস্টিটিউট' : "I'm a Student Of Creative IT Institute."}
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              {t('hero.bio')}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a 
                href="#projects" 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                {t('hero.viewWork')} <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <button 
                id="download-cv-btn"
                onClick={handleDownloadResume}
                disabled={downloading}
                className="px-6 py-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-white rounded-xl font-bold flex items-center transition-all border border-slate-300 dark:border-slate-700 hover:border-indigo-500 shadow-md dark:shadow-lg disabled:opacity-75 cursor-pointer group"
                title="Download MD SHAMIM's CV (PDF)"
              >
                {downloaded ? (
                  <>
                    <Check className="mr-2 w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-300">{t('hero.downloaded')}</span>
                  </>
                ) : downloading ? (
                  <>
                    <Download className="mr-2 w-5 h-5 animate-bounce text-indigo-600 dark:text-indigo-400" />
                    <span>{t('hero.downloading')}</span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
                    <span>{t('hero.downloadResume')}</span>
                  </>
                )}
              </button>
              <div className="flex gap-3 mt-4 sm:mt-0">
                {SOCIAL_LINKS.map((link) => {
                  const isMail = link.href.startsWith('mailto:');
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="p-3 bg-white dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-600/20 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm dark:shadow-none active:scale-95"
                      title={isMail ? 'mdshamim.en@gmail.com' : link.name}
                    >
                      {link.icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Profile Image with Neon Arcs */}
          <div className="relative flex justify-center items-center py-6 sm:py-8 lg:py-0">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] xl:w-[450px] xl:h-[450px] group transition-all duration-300">
              
              {/* Outer Rotating Arc 1 */}
              <div className="absolute inset-[-10px] sm:inset-[-12px] md:inset-[-15px] border-[3px] sm:border-[4px] border-transparent border-t-red-500 border-l-red-500 rounded-full animate-[spin_8s_linear_infinite] opacity-80 blur-[1px]"></div>
              <div className="absolute inset-[-10px] sm:inset-[-12px] md:inset-[-15px] border-[3px] sm:border-[4px] border-transparent border-t-red-400 border-l-red-400 rounded-full animate-[spin_8s_linear_infinite] shadow-[0_0_20px_rgba(239,68,68,0.4)]"></div>
              
              {/* Outer Rotating Arc 2 (Opposite direction) */}
              <div className="absolute inset-[-10px] sm:inset-[-12px] md:inset-[-15px] border-[3px] sm:border-[4px] border-transparent border-b-red-500 border-r-red-500 rounded-full animate-[spin_12s_linear_infinite_reverse] opacity-80 blur-[1px]"></div>
              <div className="absolute inset-[-10px] sm:inset-[-12px] md:inset-[-15px] border-[3px] sm:border-[4px] border-transparent border-b-violet-700 border-r-pink-400 rounded-full animate-[spin_12s_linear_infinite_reverse] shadow-[0_0_20px_rgba(236,72,153,0.4)]"></div>

              {/* Inner Profile Circle */}
              <div className="w-full h-full rounded-full overflow-hidden border-4 sm:border-6 md:border-8 border-slate-100 dark:border-slate-900 shadow-2xl relative z-10 bg-slate-200 dark:bg-slate-900">
                <img 
                  src={shamim}
                  alt="MD SHAMIM" 
                  className="w-full h-full object-cover object-[52%_42%] transition-transform duration-700 group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Background Glow behind profile */}
            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-indigo-500/10 dark:bg-red-500/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] -z-10 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
