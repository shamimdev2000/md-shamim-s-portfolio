import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowRight, Download, Check, Mail, Copy } from 'lucide-react';
import shamim from './Assets/shamim.jpg';
import { generateAndDownloadResume } from '../utils/generateResumePDF';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t, language } = useLanguage();

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('mdshamim.en@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

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
    <section id="home" className="min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-20 relative overflow-hidden">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-16 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-600/10 dark:bg-indigo-600/15 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-60 sm:w-96 h-60 sm:h-96 bg-cyan-600/10 dark:bg-cyan-600/15 rounded-full blur-[90px] sm:blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content & Actions (Order 2 on mobile, 1 on desktop for natural flow or profile first) */}
          <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
                MD SHAMIM
              </h1>

              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400">
                  {language === 'bn' ? 'ফুল স্ট্যাক MERN ডেভেলপার' : 'Full Stack MERN Developer'}
                </span>
              </h2>

              <p className="text-xs sm:text-base md:text-lg font-medium text-slate-500 dark:text-slate-400">
                {language === 'bn' ? 'শিক্ষার্থী, ক্রিয়েটিভ আইটি ইনস্টিটিউট' : "Student of Creative IT Institute"}
              </p>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.bio')}
            </p>

            {/* Action Buttons & Social Links */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a 
                href="#projects" 
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center text-sm sm:text-base transition-all shadow-lg shadow-indigo-500/25 active:scale-95 cursor-pointer"
              >
                <span>{t('hero.viewWork')}</span>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <button 
                id="download-cv-btn"
                type="button"
                onClick={handleDownloadResume}
                disabled={downloading}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-white rounded-xl font-bold flex items-center justify-center text-sm sm:text-base transition-all border border-slate-300 dark:border-slate-700 hover:border-indigo-500 shadow-sm dark:shadow-md disabled:opacity-75 cursor-pointer group"
                title="Download MD SHAMIM's CV (PDF)"
              >
                {downloaded ? (
                  <>
                    <Check className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-300">{t('hero.downloaded')}</span>
                  </>
                ) : downloading ? (
                  <>
                    <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-indigo-600 dark:text-indigo-400" />
                    <span>{t('hero.downloading')}</span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 group-hover:translate-y-0.5 transition-transform" />
                    <span>{t('hero.downloadResume')}</span>
                  </>
                )}
              </button>

              {/* Social Icon Pills */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-1 sm:mt-0 w-full sm:w-auto">
                {SOCIAL_LINKS.map((link) => {
                  const isMail = link.href.startsWith('mailto:');
                  return (
                    <a
                      key={link.name}
                      href={isMail ? 'mailto:mdshamim.en@gmail.com' : link.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="p-2.5 sm:p-3 bg-white dark:bg-slate-900/70 hover:bg-indigo-50 dark:hover:bg-indigo-600/20 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-xl transition-all border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 shadow-sm active:scale-95 relative group/icon"
                      title={isMail ? 'mdshamim.en@gmail.com' : link.name}
                      aria-label={isMail ? 'Email mdshamim.en@gmail.com' : link.name}
                    >
                      {link.icon}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct Email Chip with 1-click Copy */}
            <div className="mt-4 sm:mt-5 flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs text-xs sm:text-sm">
                <a 
                  href="mailto:mdshamim.en@gmail.com" 
                  className="inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  title="Send email to mdshamim.en@gmail.com"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm font-semibold select-all">mdshamim.en@gmail.com</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">{language === 'bn' ? 'কপি হয়েছে!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'কপি' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Neon Arc Profile Image Avatar */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center py-4 sm:py-6 lg:py-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] xl:w-[420px] xl:h-[420px] group transition-all duration-300">
              
              {/* Outer Rotating Arc 1 (Red & Pink) */}
              <div className="absolute inset-[-6px] sm:inset-[-10px] md:inset-[-12px] border-[2.5px] sm:border-[4px] border-transparent border-t-red-500 border-l-red-500 rounded-full animate-[spin_8s_linear_infinite] opacity-80 blur-[0.5px]"></div>
              <div className="absolute inset-[-6px] sm:inset-[-10px] md:inset-[-12px] border-[2.5px] sm:border-[4px] border-transparent border-t-red-400 border-l-red-400 rounded-full animate-[spin_8s_linear_infinite] shadow-[0_0_15px_rgba(239,68,68,0.4)]"></div>
              
              {/* Outer Rotating Arc 2 (Pink & Violet) */}
              <div className="absolute inset-[-6px] sm:inset-[-10px] md:inset-[-12px] border-[2.5px] sm:border-[4px] border-transparent border-b-red-500 border-r-red-500 rounded-full animate-[spin_12s_linear_infinite_reverse] opacity-80 blur-[0.5px]"></div>
              <div className="absolute inset-[-6px] sm:inset-[-10px] md:inset-[-12px] border-[2.5px] sm:border-[4px] border-transparent border-b-violet-700 border-r-pink-400 rounded-full animate-[spin_12s_linear_infinite_reverse] shadow-[0_0_15px_rgba(236,72,153,0.4)]"></div>

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
            <div className="absolute w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-indigo-500/10 dark:bg-red-500/10 rounded-full blur-[70px] sm:blur-[100px] -z-10 animate-pulse pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
