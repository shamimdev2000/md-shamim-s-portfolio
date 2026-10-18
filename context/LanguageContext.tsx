import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Available for Opportunities',
    'hero.greeting': "Hi, I'm",
    'hero.role': 'Full Stack MERN Developer',
    'hero.bio': 'Full Stack MERN Developer with hands-on experience in MongoDB, Express.js, React.js, Node.js, Next.js, and responsive web design. Skilled in building clean, scalable user interfaces and robust full-stack applications.',
    'hero.viewWork': 'View My Work',
    'hero.downloadResume': 'Download CV',
    'hero.downloading': 'Downloading CV...',
    'hero.downloaded': 'CV Downloaded',

    // About
    'about.eyebrow': 'About Me',
    'about.heading': 'Passionate Full Stack MERN Developer',
    'about.quote': '"Hello, It\'s Me Shamim And I\'m a Full Stack MERN Developer"',
    'about.description': 'Frontend Developer with hands-on experience in JavaScript, React.js, Next.js, and responsive web design. Skilled in building clean, user-friendly interfaces and transforming Figma designs into fully functional web designs. Strong analytical, design, and problem-solving abilities with a track record of delivering projects in collaborative team environments. Passionate about continuous learning and improving JavaScript expertise while contributing to impactful products.',
    'about.years': 'Years of',
    'about.experience': 'Experience',
    'about.arch': 'Architecture',
    'about.archSub': 'Scalable & Modular',
    'about.perf': 'Performance',
    'about.perfSub': 'Fast & Optimized',
    'about.uiux': 'UI / UX',
    'about.uiuxSub': 'Clean & Intuitive',
    'about.ai': 'AI Integration',
    'about.aiSub': 'Smart & Responsive',
    'about.certBadge': 'NSDA Certified Level-3',
    'about.certSub': 'Web Design & Development',
    'about.viewCert': 'View Certificate',
    'about.viewPhoto': 'Profile Photo',
    'about.certGov': 'Govt. of Bangladesh Verified',

    // Skills
    'skills.title': 'Technical Mastery',
    'skills.subtitle': 'A diverse toolkit built on years of problem-solving and architectural design.',

    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A selection of production-ready applications, tools, and technical experiments.',
    'projects.viewAll': 'View All Projects',
    'projects.learnMore': 'Live Preview',

    // Experience
    'exp.title': 'Career Path',
    'exp.subtitle': 'My professional journey and key milestones in the Web industry.',

    // Contact
    'contact.title1': "Let's Build Something",
    'contact.title2': 'Amazing',
    'contact.title3': 'Together',
    'contact.subtitle': "Whether you have a specific project in mind or just want to chat about the latest tech, I'm always open to new conversations.",
    'contact.callMe': 'Contact Me',
    'contact.emailMe': 'Email Me',
    'contact.location': 'Location',
    'contact.locationVal': 'Mohammadpur, Dhaka, Bangladesh (Remote Friendly)',
    'contact.nameLabel': 'Your Name',
    'contact.namePlaceholder': 'John Doe',
    'contact.emailLabel': 'Your Email',
    'contact.emailPlaceholder': 'john@example.com',
    'contact.subjectLabel': 'Subject',
    'contact.subjectPlaceholder': 'How can I help?',
    'contact.messageLabel': 'Your Message',
    'contact.messagePlaceholder': 'Tell me about your project...',
    'contact.send': 'Send via WhatsApp',
    'contact.sent': 'Opening WhatsApp...',
    'contact.whatsappDirect': 'Direct WhatsApp Message',
    'contact.errorName': 'Name is required (at least 2 characters)',
    'contact.errorEmailRequired': 'Email address is required',
    'contact.errorEmailInvalid': 'Please enter a valid email address (e.g. name@example.com)',
    'contact.errorSubject': 'Subject is required',
    'contact.errorMessage': 'Message is required (at least 10 characters)',

    // Footer
    'footer.text': 'Designed & Built by MD SHAMIM || All Rights Reserved',
    'footer.visitors': 'Visitors',
    'footer.live': 'Live',
    'common.backToTop': 'Back to top',
  },
  bn: {
    // Nav
    'nav.about': 'সম্পর্কে',
    'nav.skills': 'দক্ষতা',
    'nav.projects': 'প্রজেক্টসমূহ',
    'nav.experience': 'অভিজ্ঞতা',
    'nav.contact': 'যোগাযোগ',

    // Hero
    'hero.badge': 'কাজের জন্য প্রস্তুত',
    'hero.greeting': 'হ্যালো, আমি',
    'hero.role': 'ফুল স্ট্যাক MERN ডেভেলপার',
    'hero.bio': 'MongoDB, Express.js, React.js, Node.js, Next.js এবং রেসপনসিভ ওয়েব ডিজাইনে বাস্তব অভিজ্ঞতাসম্পন্ন ফুল স্ট্যাক MERN ডেভেলপার। স্কেলযোগ্য ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন তৈরিতে পারদর্শী।',
    'hero.viewWork': 'প্রজেক্ট দেখুন',
    'hero.downloadResume': 'সিভি ডাউনলোড',
    'hero.downloading': 'সিভি ডাউনলোড হচ্ছে...',
    'hero.downloaded': 'সিভি ডাউনলোড সম্পন্ন',

    // About
    'about.eyebrow': 'আমার সম্পর্কে',
    'about.heading': 'আধুনিক ফুল স্ট্যাক MERN ডেভেলপমেন্ট',
    'about.quote': '"হ্যালো, আমি শামীম এবং আমি একজন ফুল স্ট্যাক MERN ডেভেলপার"',
    'about.description': 'JavaScript, React.js, Next.js এবং রেসপনসিভ ওয়েব ডিজাইনে দক্ষ ফ্রন্ট-এন্ড ডেভেলপার। আধুনিক ও ব্যবহারকারী-বান্ধব ইন্টারফেস তৈরি করা, টিমওয়ার্কে প্রজেক্ট সম্পন্ন করা এবং সমস্যা সমাধানের বাস্তব অভিজ্ঞতা রয়েছে। নতুন প্রযুক্তি শেখা ও কোডিং দক্ষতা বৃদ্ধিতে সদা আগ্রহী।',
    'about.years': 'বছরের',
    'about.experience': 'অভিজ্ঞতা',
    'about.arch': 'আর্কিটেকচার',
    'about.archSub': 'স্কেলেবল ও মডুলার',
    'about.perf': 'পারফরম্যান্স',
    'about.perfSub': 'দ্রুত ও অপ্টিমাইজড',
    'about.uiux': 'ইউআই / ইউএক্স',
    'about.uiuxSub': 'ক্লিন ও সহজবোধ্য',
    'about.ai': 'এআই ইন্টিগ্রেশন',
    'about.aiSub': 'স্মার্ট ও আধুনিক',
    'about.certBadge': 'এনএসডিএ সার্টিফাইড লেভেল-৩',
    'about.certSub': 'ওয়েব ডিজাইন ও ডেভেলপমেন্ট',
    'about.viewCert': 'সার্টিফিকেট দেখুন',
    'about.viewPhoto': 'প্রোফাইল ছবি',
    'about.certGov': 'বাংলাদেশ সরকার অনুমোদিত',

    // Skills
    'skills.title': 'প্রযুক্তিগত দক্ষতা',
    'skills.subtitle': 'সমস্যা সমাধান এবং আধুনিক ওয়েব প্রযুক্তির সমন্বয়ে তৈরি টুলকিট।',

    // Projects
    'projects.title': 'বাছাইকৃত প্রজেক্টসমূহ',
    'projects.subtitle': 'আমার তৈরি কিছু বাস্তবসম্মত ওয়েব অ্যাপ্লিকেশন ও প্রজেক্টের তালিকা।',
    'projects.viewAll': 'সব প্রজেক্ট দেখুন',
    'projects.learnMore': 'লাইভ দেখুন',

    // Experience
    'exp.title': 'কর্মজীবন ও অভিজ্ঞতা',
    'exp.subtitle': 'ওয়েব ডেভেলপমেন্ট ইন্ডাস্ট্রিতে আমার পেশাদার অভিজ্ঞতা ও জার্নি।',

    // Contact
    'contact.title1': 'একসাথে তৈরি করি',
    'contact.title2': 'অসাধারণ',
    'contact.title3': 'কিছু একটা',
    'contact.subtitle': 'আপনার কোনো প্রজেক্ট আইডিয়া থাকলে কিংবা প্রযুক্তি বিষয়ক আলোচনার জন্য সবসময় যোগাযোগ করতে পারেন।',
    'contact.callMe': 'ফোন করুন',
    'contact.emailMe': 'ইমেইল করুন',
    'contact.location': 'ঠিকানা',
    'contact.locationVal': 'মোহাম্মদপুর, ঢাকা, বাংলাদেশ (রিমোট ফ্রেন্ডলি)',
    'contact.nameLabel': 'আপনার নাম',
    'contact.namePlaceholder': 'আপনার পুরো নাম',
    'contact.emailLabel': 'আপনার ইমেইল',
    'contact.emailPlaceholder': 'example@gmail.com',
    'contact.subjectLabel': 'বিষয়',
    'contact.subjectPlaceholder': 'কিভাবে আপনাকে সাহায্য করতে পারি?',
    'contact.messageLabel': 'আপনার বার্তা',
    'contact.messagePlaceholder': 'আপনার প্রজেক্ট বা বার্তা লিখুন...',
    'contact.send': 'হোয়াটসঅ্যাপে পাঠান',
    'contact.sent': 'হোয়াটসঅ্যাপ ওপেন হচ্ছে...',
    'contact.whatsappDirect': 'সরাসরি হোয়াটসঅ্যাপ মেসেজ',
    'contact.errorName': 'নাম আবশ্যক (কমপক্ষে ২ অক্ষর)',
    'contact.errorEmailRequired': 'ইমেইল ঠিকানা আবশ্যক',
    'contact.errorEmailInvalid': 'একটি সঠিক ইমেইল ঠিকানা লিখুন (যেমন: name@example.com)',
    'contact.errorSubject': 'বিষয় আবশ্যক',
    'contact.errorMessage': 'বার্তা আবশ্যক (কমপক্ষে ১০ অক্ষর)',

    // Footer
    'footer.text': 'ডিজাইন ও ডেভেলপ করেছেন মোঃ শামীম || সর্বস্বত্ব সংরক্ষিত',
    'footer.visitors': 'ভিজিটর',
    'footer.live': 'লাইভ',
    'common.backToTop': 'উপরে যান',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
