import React from 'react';
import { motion } from 'motion/react';
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

const App: React.FC = () => {
  const { t } = useLanguage();

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
              
              {/* Left Column: Profile Photo */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.45, 0.27, 0.9] }}
                className="relative max-w-md mx-auto lg:max-w-none w-full"
              >
                {/* Photo Container */}
                <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 group shadow-2xl bg-slate-200 dark:bg-slate-900 relative">
                  <img 
                    src={shamim1}
                    alt="MD SHAMIM" 
                    className="w-full h-full bg-cover bg-center bg-no-repeat object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

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
