import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, User, X, FileText } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import LiveBackground from './components/LiveBackground';
import VisitorCounter from './components/VisitorCounter';
import BackToTop from './components/BackToTop';
import shamim1 from './components/Assets/shamim1.jpg';
import { useLanguage } from './context/LanguageContext';
import { RESUME_DATA } from './constants';

const App: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeView, setActiveView] = useState<'photo' | 'certificate'>('photo');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <LiveBackground />
      <Navbar />
      
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        
        {/* About Section with Responsive Reveal */}
        <section id="about" className="py-16 sm:py-24 bg-slate-200/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800/40 backdrop-blur-[2px] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* Left Column: Photo / Certificate Preview */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="relative max-w-md mx-auto lg:max-w-none w-full"
              >
                {/* View Switcher Controls on top of image */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
                  <div className="inline-flex p-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setActiveView('photo')}
                      className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeView === 'photo'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t('about.viewPhoto')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveView('certificate')}
                      className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeView === 'certificate'
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{t('about.viewCert')}</span>
                    </button>
                  </div>

                  <a
                    href={RESUME_DATA.certification.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>NSDA Level-3</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Photo / Certificate Card Container */}
                <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 group shadow-2xl bg-slate-200 dark:bg-slate-900 relative">
                  {/* Photo Display */}
                  <img 
                    src={shamim1}
                    alt="MD SHAMIM" 
                    className={`w-full h-full bg-cover bg-center bg-no-repeat object-cover transition-transform duration-700 ${
                      activeView === 'photo' ? 'block group-hover:scale-105' : 'hidden'
                    }`}
                  />
                  {activeView === 'photo' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  )}

                  {/* On-image Photo Overlay with Verified Certificate CTA */}
                  {activeView === 'photo' && (
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto z-10">
                      <button
                        type="button"
                        onClick={() => setIsCertModalOpen(true)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-amber-300 border border-amber-500/40 backdrop-blur-md text-xs font-semibold shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate">{language === 'bn' ? 'জাতীয় দক্ষতা সার্টিফিকেট দেখুন' : 'View Verified NSDA Certificate'}</span>
                      </button>
                    </div>
                  )}

                  {/* Certificate View Card */}
                  {activeView === 'certificate' && (
                    <div className="w-full h-full p-4 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-amber-50 via-slate-50 to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950/30 text-slate-800 dark:text-slate-100 border-4 border-amber-500/40 dark:border-amber-500/30 relative overflow-hidden">
                      {/* Decorative Background Seal */}
                      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                        <Award className="w-56 h-56 sm:w-64 sm:h-64 text-amber-600 dark:text-amber-400" />
                      </div>

                      {/* Header of Certificate */}
                      <div className="text-center border-b-2 border-amber-600/30 pb-2 sm:pb-3 relative z-10">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Government of Bangladesh</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
                          National Skills Development Authority
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Prime Minister's Office</p>
                      </div>

                      {/* Certificate Body */}
                      <div className="text-center py-1 sm:py-2 relative z-10">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-1.5 shadow-inner">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold">
                          National Skills Certificate
                        </p>
                        <h5 className="text-base sm:text-lg font-black text-slate-950 dark:text-white mt-0.5">
                          MD SHAMIM
                        </h5>
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-1 leading-snug">
                          Web Design and Development for Freelancing
                        </p>
                        <div className="inline-block mt-1 px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-md text-[10px] sm:text-[11px] font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                          NQF Qualification Level-3
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 relative z-10">
                        <button
                          type="button"
                          onClick={() => setIsCertModalOpen(true)}
                          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'বিস্তারিত তথ্য' : 'Full Details'}</span>
                        </button>
                        <a
                          href={RESUME_DATA.certification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>{language === 'bn' ? 'অনলাইন যাচাই' : 'Verify Online'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Certificate Verified Badge (Top Left) */}
                <motion.button 
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="absolute -top-2.5 -left-2 sm:-top-4 sm:-left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-3 border-white dark:border-slate-900 flex items-center gap-1.5 sm:gap-2 hover:scale-105 transition-transform z-20 cursor-pointer"
                  title={language === 'bn' ? 'সার্টিফিকেট যাচাই করুন' : 'Verify Certificate'}
                >
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
                    {t('about.certBadge')}
                  </span>
                </motion.button>

                {/* Experience Badge (Bottom Right) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="absolute -bottom-3 -right-2 sm:-bottom-5 sm:-right-5 bg-indigo-600 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl border-3 sm:border-4 border-slate-100 dark:border-slate-950 transform transition-transform hover:scale-105 z-20"
                >
                  <span className="block text-2xl sm:text-3xl font-black text-white leading-none">1+</span>
                  <span className="text-indigo-100 text-[10px] sm:text-xs uppercase font-bold tracking-wider leading-tight block mt-0.5">
                    {t('about.years')} <br /> {t('about.experience')}
                  </span>
                </motion.div>
              </motion.div>

              {/* Certificate Details Modal */}
              <AnimatePresence>
                {isCertModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative"
                    >
                      <button
                        type="button"
                        onClick={() => setIsCertModalOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-3 mb-5 pr-8">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t('about.certGov')}</span>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                            {language === 'bn' ? 'অফিসিয়াল জাতীয় দক্ষতা সার্টিফিকেট' : 'Official National Skills Certificate'}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-3.5 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm">
                        <div>
                          <span className="text-xs uppercase font-semibold text-slate-400 block mb-0.5">
                            {language === 'bn' ? 'সার্টিফিকেট পদবি' : 'Qualification Title'}
                          </span>
                          <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                            {RESUME_DATA.certification.title}
                          </p>
                        </div>

                        <div>
                          <span className="text-xs uppercase font-semibold text-slate-400 block mb-0.5">
                            {language === 'bn' ? 'সনদ প্রদানকারী কর্তৃপক্ষ' : 'Issuing Authority'}
                          </span>
                          <p className="font-medium text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                            {RESUME_DATA.certification.authority}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                          <div>
                            <span className="text-xs uppercase font-semibold text-slate-400 block mb-0.5">
                              {language === 'bn' ? 'সনদধারী' : 'Candidate'}
                            </span>
                            <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">MD SHAMIM</p>
                          </div>
                          <div>
                            <span className="text-xs uppercase font-semibold text-slate-400 block mb-0.5">
                              {language === 'bn' ? 'যোগ্যতা লেভেল' : 'NQF Level'}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                              Level-3 Verified
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                        <a
                          href={RESUME_DATA.certification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'bn' ? 'গুগল ড্রাইভে দেখুন' : 'View PDF on Drive'}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsCertModalOpen(false)}
                          className="py-2.5 sm:py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                        >
                          {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
              
              {/* Right Column: About Description & Competency Cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] }}
              >
                <h2 className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1.5">
                  {t('about.eyebrow')}
                </h2>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 sm:mb-6 leading-tight">
                  {t('about.heading')}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-4 sm:mb-6 italic border-l-3 sm:border-l-4 border-indigo-600 pl-3 sm:pl-4">
                  {t('about.quote')}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  {t('about.description')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: t('about.arch'), subtitle: t('about.archSub') },
                    { title: t('about.perf'), subtitle: t('about.perfSub') },
                    { title: t('about.uiux'), subtitle: t('about.uiuxSub') },
                    { title: t('about.ai'), subtitle: t('about.aiSub') }
                  ].map((card, idx) => (
                    <motion.div 
                      key={card.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.15 + idx * 0.08 }}
                      className="p-3.5 sm:p-4 bg-white dark:bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:border-indigo-500/50 transition-colors"
                    >
                      <h4 className="text-slate-900 dark:text-white font-bold text-sm sm:text-base mb-1">{card.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">{card.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="relative z-10 py-8 sm:py-10 border-t border-slate-200 dark:border-slate-900 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-slate-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} {t('footer.text')}
          </p>
          <div className="flex items-center justify-center">
            <VisitorCounter />
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default App;
