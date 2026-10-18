import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on click outside or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header 
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3 sm:py-4 shadow-sm dark:shadow-none' 
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-2">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              id="navbar-logo" 
              className="text-base sm:text-xl md:text-2xl font-black tracking-tight sm:tracking-wider text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center"
            >
              <span>SHAMIM</span>
              <span className="text-indigo-600 dark:text-indigo-500 animate-pulse">.</span>
            </a>
          </div>
          
          {/* Desktop Navigation Links & Controls */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-baseline space-x-5 lg:space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="h-5 w-[1px] bg-slate-300 dark:bg-slate-800" />

            {/* Desktop Language Switcher */}
            <div 
              id="language-switcher"
              className="flex items-center bg-slate-100 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 p-0.5 rounded-full text-xs font-semibold shadow-inner"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'bn'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="বাংলায় পরিবর্তন করুন"
              >
                বাং
              </button>
            </div>

            {/* Desktop Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer shadow-sm active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Language + Theme + Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden">
            {/* Mobile Language Switcher */}
            <div 
              id="mobile-language-switcher"
              className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 p-0.5 rounded-full text-[11px] font-semibold"
            >
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  language === 'bn' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                }`}
                title="বাংলা"
              >
                বাং
              </button>
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              id="mobile-theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer active:scale-95"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 focus:outline-none cursor-pointer active:scale-95"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[450px] opacity-100 border-b border-slate-200 dark:border-slate-800 shadow-xl' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-1 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 active:bg-indigo-50 dark:active:bg-slate-900 block px-3 py-2.5 rounded-xl text-base font-semibold transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Quick social links in mobile drawer */}
          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-2 text-xs text-slate-500">
            <span>MD SHAMIM &bull; MERN Developer</span>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/shamimdev2000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mdshamim2000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="mailto:mdshamim.en@gmail.com" 
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                aria-label="Email MD Shamim"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
