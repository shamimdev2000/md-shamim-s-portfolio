
import React from 'react';
import { Project, Skill, Experience } from './types';
import { 
  Code2, 
  Database, 
  Layout, 
  Terminal, 
  Cpu, 
  Globe, 
  Smartphone, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail,
  Facebook
} from 'lucide-react';

export const SOCIAL_LINKS = [
  { name: 'GitHub', icon: <Github className="w-5 h-5" />, href: 'https://github.com/shamimdev2000' },
  { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/md-shamim-46a495319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
  { name: 'Facebook', icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/md.shamim.899196' },
  { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
  { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:mdshamim.en@gmail.com' },
];

export const RESUME_DATA = {
  name: 'MD SHAMIM',
  title: 'Full Stack MERN Developer',
  phone: '+8801941648410',
  location: 'Mohammadpur, Dhaka-(1207)',
  email: 'mdshamim.en@gmail.com',
  github: 'https://github.com/shamimdev2000',
  portfolio: 'https://portfolio-eta-ten-3fke5p2t79.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/md-shamim-46a495319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
  summary: 'Full-Stack MERN Developer with hands-on experience in JavaScript and React-based web application development, alongside ongoing MERN Stack Development training. Skilled in building responsive frontend interfaces, reusable UI components, and interactive web experiences using React.js, JavaScript, and Tailwind CSS. Familiar with modern web application workflows and committed to developing end-to-end applications by strengthening backend capabilities with Node.js, Express.js, REST APIs, and MongoDB. Focused on maintainable code, usability, and continuous improvement.',
  certification: {
    title: 'National Skills Certificate – Web Design and Development for Freelancing, Level-3',
    authority: 'National Skills Development Authority (NSDA), Government of Bangladesh.',
    link: 'https://drive.google.com/file/d/1aWusIMODZasjoid5Yj8RW-lLsotpjynA/view?usp=sharing'
  },
  courses: [
    { name: 'MERN Stack Development', institute: 'Creative IT Institute, Dhaka', status: 'Ongoing' },
    { name: 'AI Automation', institute: 'Creative IT Institute, Dhaka', status: 'Ongoing' }
  ],
  education: {
    degree: 'Diploma In Agriculture',
    institution: 'United College, Charfassion Bhola.',
    status: 'Currently Studying – 2nd Semester'
  },
  softSkills: [
    'Ability to analyze problems, identify patterns, and make effective decisions.',
    'Skilled at identifying challenges and implementing practical solutions.',
    'Able to prioritize tasks, meet deadlines, and manage multiple responsibilities efficiently.',
    'Strong verbal and written communication for effective teamwork and collaboration.',
    'Works effectively within teams to achieve common goals and project success.',
    'Quick to learn new technologies and adapt to changing project requirements.'
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'bakery-erp',
    title: 'Bakery Management ERP System',
    description: 'Developed a full-stack bakery management ERP system using the MERN stack, integrating frontend and backend functionality to streamline inventory management, order processing, sales tracking, user authentication, and reporting.',
    image: '{projectBakery}',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'MERN Stack'],
    link: 'https://sweet-treats-supabase-mdshamim-en.vercel.app/',
    github: 'https://sweet-treats-supabase-mdshamim-en.vercel.app/',
    highlights: [
      'Bakery businesses need an efficient solution to manage inventory, process orders, track sales, and monitor daily operations.',
      'Developed a full-stack bakery management ERP system using the MERN stack, integrating frontend and backend functionality.',
      'Implemented inventory management, order processing, sales tracking, user authentication, and reporting features.',
      'Built a centralized management system to organize business data and streamline bakery operations.'
    ]
  },
  {
    id: '1',
    title: 'Creative IT Graphics Design Landing Page',
    description: 'Developed a responsive landing page with organized content sections, consistent styling, and straightforward navigation to ensure business information is easy to scan and browse across different screen sizes.',
    image: '{project1}',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    link: 'https://intern-gd.vercel.app/',
    github: 'https://intern-gd.vercel.app/',
    highlights: [
      'Business information can be difficult to scan when content structure and navigation are unclear.',
      'Developed a responsive landing page with organized content sections, consistent styling, and straightforward navigation.',
      'Published a live landing page designed to make business information easier to browse across different screen sizes.'
    ]
  },
  {
    id: '2',
    title: 'Petroil Management React App',
    description: 'Developed a React-based web application with dynamic and interactive UI components. Implemented modern frontend development practices using React, JavaScript, and Tailwind CSS to create a responsive and efficient user interface.',
    image: '{project2}',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vite'],
    link: 'https://petroil-wrq7-5oqrqd9qp-md-shamims-projects-59d3fe4e.vercel.app/',
    github: 'https://petroil-wrq7-5oqrqd9qp-md-shamims-projects-59d3fe4e.vercel.app/',
  },
  {
    id: '3',
    title: 'Personal Portfolio Website',
    description: 'Built a personal portfolio website to professionally showcase projects, technical skills, and development work. Designed a responsive layout with organized sections for projects, skills, and contact information.',
    image: '{project3}',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    link: 'https://portfolio-eta-ten-3fke5p2t79.vercel.app/',
    github: 'https://portfolio-eta-ten-3fke5p2t79.vercel.app/',
  },
];

export interface TechnicalSkillCategory {
  title: string;
  titleBn: string;
  badge?: string;
  badgeBn?: string;
  skills: string[];
  iconType: 'code' | 'layout' | 'server' | 'database' | 'fetch' | 'git' | 'tool' | 'design';
}

export const TECHNICAL_SKILLS_CATEGORIES: TechnicalSkillCategory[] = [
  {
    title: 'Frontend Development',
    titleBn: 'ফ্রন্টএন্ড ডেভেলপমেন্ট',
    skills: ['JavaScript (ES6)', 'HTML5 & CSS3', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'TanStack Query', 'Component-Based UI'],
    iconType: 'layout'
  },
  {
    title: 'Backend & Databases',
    titleBn: 'ব্যাকএন্ড ও ডাটাবেজ',
    badge: 'MERN learning focus',
    badgeBn: 'MERN শিক্ষণীয় ফোকাস',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Supabase', 'REST API concepts'],
    iconType: 'server'
  },
  {
    title: 'Version Control',
    titleBn: 'ভার্সন কন্ট্রোল',
    skills: ['Git', 'GitHub'],
    iconType: 'git'
  },
  {
    title: 'Tools & Deployment',
    titleBn: 'টুলস ও ডিপ্লয়মেন্ট',
    skills: ['Visual Studio Code', 'Postman', 'Figma', 'Vercel', 'Netlify', 'Render', 'Railway'],
    iconType: 'tool'
  }
];

export const SKILLS: Skill[] = [
  { name: 'React.js', level: 92, category: 'Frontend' },
  { name: 'JavaScript (ES6)', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 82, category: 'Backend' },
  { name: 'Express.js', level: 82, category: 'Backend' },
  { name: 'MongoDB', level: 80, category: 'Backend' },
  { name: 'MySQL', level: 80, category: 'Backend' },
  { name: 'Supabase', level: 85, category: 'Backend' },
  { name: 'HTML5 & CSS3', level: 95, category: 'Frontend' },
  { name: 'TanStack Query', level: 85, category: 'Frontend' },
  { name: 'Git & GitHub', level: 90, category: 'Tools' },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Creative IT Institute',
    role: 'Frontend Developer Intern',
    period: 'Jan 2026 - May 2026',
    description: [
      'Built clean, user-friendly interfaces and transformed Figma designs into fully functional web applications.',
      'Developed responsive and dynamic components using JavaScript, React.js, Tailwind CSS, and modern web tooling.',
      'Delivered projects in collaborative team environments with strong analytical and problem-solving execution.',
      'Maintained clean code standards, cross-browser compatibility, and seamless user experiences.'
    ]
  }
];
