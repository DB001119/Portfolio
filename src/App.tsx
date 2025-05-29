import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.tsx';
import MicroInteraction from './components/MicroInteraction.tsx';
import CursorGlow from './components/CursorGlow.tsx';
import ContactAdmin from './components/ContactAdmin.tsx';
import { motion } from 'framer-motion';
import { submitContactForm, type ContactFormData } from './services/contactService.ts';

export default function App() {
  const [activeSkill, setActiveSkill] = useState('01');
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
    about: false
  });

  // Contact form state
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Check if user is accessing admin page
  const isAdminPage = window.location.pathname === '/admin';

  // Handle initial page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Show loading for 1.2 seconds

    return () => clearTimeout(timer);
  }, []);

  // If accessing admin page, show admin component
  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="p-4">
          <div className="mb-4">
            <a 
              href="/" 
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              ← Back to Portfolio
            </a>
          </div>
          <ContactAdmin />
        </div>
      </div>
    );
  }

  // Handle image loading
  const handleImageLoad = (imageType: 'hero' | 'about') => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageType]: true
    }));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContactForm(formData);
      
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact me directly at dipanbash11@gmail.com');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = {
    '01': {
      title: 'Web Development',
      tags: ['Frontend', 'Backend', 'React', 'Node.js', 'TypeScript', 'RESTful APIs', 'Responsive Design', 'Next.js'],
      description: 'Specializing in modern web development practices with a focus on responsive design and optimal user experience. Building scalable applications with modern frameworks and tools. Experienced in both frontend and backend development, creating seamless full-stack solutions that deliver exceptional performance and user satisfaction.'
    },
    '02': {
      title: 'Cloud & DevOps',
      tags: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Infrastructure', 'Monitoring', 'Cloud Architecture', 'DevOps'],
      description: 'Experienced in cloud architecture and DevOps practices, focusing on scalable and maintainable infrastructure solutions. Proficient in containerization, orchestration, and implementing robust CI/CD pipelines. Skilled in cloud-native development and infrastructure automation to ensure optimal system performance and reliability.'
    },
    '03': {
      title: 'Networking',
      tags: ['CCNA', 'Network Security', 'Routing', 'Switching', 'VPNs', 'Firewalls', 'Network Design', 'Protocols'],
      description: 'Strong foundation in networking principles and security practices. Experienced in designing and implementing secure network architectures. Proficient in network troubleshooting, security implementation, and maintaining high-performance network infrastructure. Skilled in both traditional and software-defined networking approaches.'
    },
    '04': {
      title: 'Programming',
      tags: ['Java', 'Python', 'C++', 'JavaScript', 'SQL', 'Git', 'Data Structures', 'Algorithms'],
      description: 'Proficient in multiple programming languages and paradigms, with a strong focus on writing clean, efficient, and maintainable code. Experienced in developing robust software solutions using best practices and design patterns. Strong problem-solving skills and ability to optimize code for performance.'
    },
    '05': {
      title: 'Database Management',
      tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Database Design', 'Query Optimization', 'Data Modeling', 'Backup & Recovery'],
      description: 'Comprehensive experience in database management and optimization. Skilled in designing efficient database schemas, writing complex queries, and maintaining high-performance database systems. Proficient in both SQL and NoSQL databases, with expertise in data modeling and database security.'
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center font-body overflow-hidden">
        <div className="text-center relative">
          {/* Color-Shifting Gradient with Morphing Shapes */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            {/* Background gradient blob with morphing */}
            <div className="absolute inset-0 morph-shape bg-gradient-to-br from-primary-400 via-blue-500 to-purple-600 dark:from-primary-300 dark:via-blue-400 dark:to-purple-500 opacity-20"></div>
            
            {/* Main morphing shape with color shift */}
            <div className="absolute inset-2 morph-shape bg-gradient-to-br from-primary-500 via-blue-600 to-purple-700 dark:from-primary-400 dark:via-blue-500 dark:to-purple-600 opacity-80" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-spin"></div>
            </div>
            
            {/* Inner core with reverse morphing */}
            <div className="absolute inset-6 morph-shape bg-gradient-to-br from-purple-600 via-primary-500 to-blue-600 dark:from-purple-500 dark:via-primary-400 dark:to-blue-500" style={{ animationDelay: '2s', animationDirection: 'reverse' }}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-white/30 to-transparent animate-ping"></div>
            </div>
            
            {/* Floating particles with custom animation */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full floating-particle opacity-70"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 rounded-full floating-particle opacity-60" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -left-4 w-2 h-2 bg-purple-500 rounded-full floating-particle opacity-50" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 -right-3 w-2 h-2 bg-primary-300 rounded-full floating-particle opacity-40" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Expanding ripple effects */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-400/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" style={{ animationDelay: '0.75s' }}></div>
            <div className="absolute inset-0 rounded-full border border-purple-500/15 animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text font-heading mb-2">
              <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-purple-600 dark:from-primary-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
                Loading Portfolio...
              </span>
            </h2>
            <p className="text-sm text-light-muted dark:text-dark-muted font-body">
              Preparing something amazing for you ✨
            </p>
            
            {/* Enhanced loading progress indicators */}
            <div className="flex justify-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-primary-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-200 font-body">
      <CursorGlow />
      <Navbar />
      <main className="max-w-[1800px] mx-auto">
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
          <div className="w-full">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              {/* Text Content */}
              <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text font-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="block hover:scale-106 transition-transform duration-300 ease-in-out cursor-pointer transform origin-center">Hi, I'm Dipan Baniya</span>
                  <motion.span 
                    className="block text-primary-500 dark:text-primary-400 mt-1 sm:mt-2 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Full Stack Developer
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-light-muted dark:text-dark-muted leading-relaxed px-2 sm:px-0 font-body"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Aspiring Network & Cloud Professional | Full-Stack Explorer | Problem Solver
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <MicroInteraction>
                    <a
                      href="#projects"
                      className="magnetic-button primary w-full sm:w-auto"
                    >
                      View Projects
                    </a>
                  </MicroInteraction>
                  <MicroInteraction>
                    <a
                      href="#contact"
                      className="magnetic-button secondary w-full sm:w-auto"
                    >
                      Contact Me
                    </a>
                  </MicroInteraction>
                </motion.div>

                <motion.div 
                  className="flex gap-4 sm:gap-6 justify-center lg:justify-start pt-2 sm:pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <MicroInteraction>
                    <a 
                      href="https://github.com/DB001119" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="magnetic-button tertiary p-2 sm:p-3"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </MicroInteraction>
                  <MicroInteraction>
                    <a 
                      href="https://www.linkedin.com/in/dipan-baniya-030b782b3/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="magnetic-button tertiary p-2 sm:p-3"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </MicroInteraction>
                  <MicroInteraction>
                    <a 
                      href="mailto:dipanbash11@gmail.com"
                      className="magnetic-button tertiary p-2 sm:p-3"
                    >
                      <span className="sr-only">Email</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </MicroInteraction>
                </motion.div>
              </div>

              {/* Image/Illustration */}
              <motion.div 
                className="w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="illustration-container mx-auto">
                  <div className="illustration-glow"></div>
                  <div className="illustration-inner">
                    <div className="illustration-layer-1"></div>
                    <div className="illustration-layer-2"></div>
                    <div className="illustration-layer-3">
                      <div className="relative group w-full h-full mx-auto">
                        {/* Circular container with enhanced effects */}
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl group-hover:shadow-primary-400/30 transition-shadow duration-500">
                          {/* Image skeleton/placeholder */}
                          {!imagesLoaded.hero && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse rounded-full flex items-center justify-center">
                              <div className="text-gray-400 dark:text-gray-500">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                              </div>
                            </div>
                          )}
                          <img 
                            src="/images/profile-hero.jpg" 
                            alt="Dipan Baniya - Full Stack Developer"
                            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out ${
                              imagesLoaded.hero ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad('hero')}
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Animated border rings */}
                        <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary-400/20 group-hover:border-primary-400/40 transition-colors duration-500"></div>
                        <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-primary-300/10 group-hover:border-primary-300/20 transition-colors duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="px-4 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 bg-light-alt dark:bg-dark-card">
          <div className="w-full">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text font-heading">
                About Me
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left side - Image/Visual */}
              <motion.div 
                className="order-2 lg:order-1 lg:col-span-2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="illustration-container mx-auto">
                  <div className="illustration-glow"></div>
                  <div className="illustration-inner">
                    <div className="illustration-layer-1"></div>
                    <div className="illustration-layer-2"></div>
                    <div className="illustration-layer-3">
                      <div className="relative group w-full h-full mx-auto">
                        {/* Circular container with enhanced effects */}
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl group-hover:shadow-primary-400/30 transition-shadow duration-500">
                          {/* Image skeleton/placeholder */}
                          {!imagesLoaded.about && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse rounded-full flex items-center justify-center">
                              <div className="text-gray-400 dark:text-gray-500">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                            </div>
                          )}
                          <img 
                            src="/images/profile-about.jpg" 
                            alt="Dipan Baniya - About Me"
                            className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out ${
                              imagesLoaded.about ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad('about')}
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Animated border rings */}
                        <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-primary-400/20 group-hover:border-primary-400/40 transition-colors duration-500"></div>
                        <div className="absolute -inset-1 sm:-inset-2 rounded-full border border-primary-300/10 group-hover:border-primary-300/20 transition-colors duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right side - Content */}
              <motion.div 
                className="order-1 lg:order-2 lg:col-span-3 px-4 sm:px-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {/* Introduction */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-3 sm:mb-4 font-heading">
                    Hi, I'm Dipan
                  </h3>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted leading-relaxed font-body">
                    A Bachelor of IT student in Australia, balancing uni, part-time work, and semi-pro cricket. I'm passionate about building tech that solves real problems.
                  </p>
                </div>

                {/* What I Do Section */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">💻</span>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white font-heading">
                      What I Do
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 font-body">
                    I create practical, user-focused tools using:
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="mb-2 sm:mb-3">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {['React Native & Firebase', 'Node.js, n8n & OpenAI', 'AWS & Docker', 'Security Tools'].map((tech, index) => (
                        <MicroInteraction key={index}>
                          <span className="px-2 sm:px-3 py-1 text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full border border-primary-200 dark:border-primary-800 font-mono">
                            {tech}
                          </span>
                        </MicroInteraction>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 italic font-body">
                    "I learn by doing — building fast, refining faster."
                  </p>
                </div>

                {/* Beyond Code Section */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">⚡</span>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white font-heading">
                      Beyond Code
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 font-body">
                    Outside tech, I:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                    {[
                      { icon: '🏏', text: 'Compete in cricket' },
                      { icon: '🏋️‍♂️', text: 'Hit the gym' },
                      { icon: '📓', text: 'Journal and reflect' },
                      { icon: '🎯', text: 'Follow Stoic principles' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 font-body">
                        <span className="text-base sm:text-lg">{item.icon}</span>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-body">
                    I'm all about systems, growth, and staying grounded.
                  </p>
                </div>

                {/* Call to Action */}
                <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="text-lg sm:text-xl">🤝</span>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white font-heading">
                      Let's Connect
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 font-body">
                    I'm open to collabs in AI, apps, and automation.<br />
                    Let's build something that matters.
                  </p>
                  <MicroInteraction>
                    <a
                      href="#contact"
                      className="magnetic-button primary w-full sm:w-auto text-sm sm:text-base"
                    >
                      Let's Create Something That Matters
                    </a>
                  </MicroInteraction>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
          <div className="w-full">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text font-heading">
                Technical Skills
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>

            {/* Mobile Layout (Stack) */}
            <div className="block lg:hidden space-y-6">
              {Object.entries(skills).map(([id, skill], index) => (
                <motion.div
                  key={id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-4">
                    <span className="text-xs sm:text-sm font-mono text-primary-500 dark:text-primary-400">{id}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-heading">{skill.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {skill.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 sm:px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-body">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Desktop Layout (Side by Side) */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-24">
              {/* Left Column - Headers */}
              <div className="space-y-6 py-4">
                {Object.entries(skills).map(([id, skill]) => (
                  <MicroInteraction key={id}>
                    <button
                      onClick={() => setActiveSkill(id)}
                      className={`skill-header group relative w-full text-left transition-all duration-500 p-6 rounded-xl border-2 overflow-hidden transform hover:scale-105 hover:-translate-y-1 ${
                        activeSkill === id 
                          ? 'bg-primary-50 dark:bg-primary-900/20 shadow-xl border-primary-200 dark:border-primary-700 scale-105 -translate-y-1' 
                          : 'bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg'
                      }`}
                    >
                      {/* Background gradient effect on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 dark:from-primary-400/10 dark:to-primary-500/10 transition-opacity duration-500 ${
                        activeSkill === id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`} />
                      
                      {/* Left border accent */}
                      <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 transition-all duration-500 ${
                        activeSkill === id ? 'opacity-100 w-2' : 'opacity-0 group-hover:opacity-100 group-hover:w-1'
                      }`} />
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <span className={`text-sm font-mono transition-all duration-300 px-2 py-1 rounded-md ${
                          activeSkill === id 
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/40 scale-110' 
                            : 'text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-300 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:scale-105'
                        }`}>
                          {id}
                        </span>
                        <h2 className={`text-2xl xl:text-3xl font-bold transition-all duration-300 font-heading ${
                          activeSkill === id 
                            ? 'text-primary-700 dark:text-primary-300' 
                            : 'text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }`}>
                          {skill.title}
                        </h2>
                        
                        {/* Arrow indicator */}
                        <div className={`ml-auto transition-all duration-300 ${
                          activeSkill === id 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}>
                          <svg className="w-5 h-5 text-primary-500 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Bottom shine effect */}
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-all duration-500 ${
                        activeSkill === id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75'
                      }`} />
                    </button>
                  </MicroInteraction>
                ))}
              </div>

              {/* Right Column - Content */}
              <div className="relative min-h-[600px] flex items-center">
                {Object.entries(skills).map(([id, skill]) => (
                  <motion.div
                    key={id}
                    className={`skill-content absolute inset-0 flex flex-col justify-center transition-all duration-500 ${
                      activeSkill === id ? 'active' : 'inactive'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: activeSkill === id ? 1 : 0,
                      x: activeSkill === id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-wrap gap-4 mb-8">
                      {skill.tags.map((tag, index) => (
                        <MicroInteraction key={index}>
                          <span className="magnetic-button !py-2 !px-4 !text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono">
                            {tag}
                          </span>
                        </MicroInteraction>
                      ))}
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-body">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 bg-light-alt dark:bg-dark-card">
          <div className="w-full">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text font-heading">
                Projects
              </h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full"></div>
              <p className="text-base sm:text-lg text-light-muted dark:text-dark-muted mt-4 sm:mt-6 max-w-2xl mx-auto px-2 sm:px-0 font-body">
                Building solutions that solve real problems. Here's what I'm working on and planning to create.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* GK Quiz App */}
              <motion.div
                className="group relative bg-white dark:bg-dark-card rounded-xl p-4 sm:p-6 shadow-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-900/10 dark:to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">📱</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        GK Quiz App
                      </h3>
                    </div>
                    <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
                      In Progress
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-3 sm:mb-4 leading-relaxed font-body">
                    A multi-category general knowledge quiz app for Android with Firebase login, real-time score saving, and smooth UI flow.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {['Java', 'XML', 'Firebase Auth', 'Firestore', 'Android Studio'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <MicroInteraction>
                    <a href="#" className="magnetic-button tertiary text-xs sm:text-sm w-full sm:w-auto">
                      View Progress
                    </a>
                  </MicroInteraction>
                </div>
              </motion.div>

              {/* AI Café Assistant */}
              <motion.div
                className="group relative bg-white dark:bg-dark-card rounded-xl p-4 sm:p-6 shadow-lg border-2 border-transparent hover:border-yellow-200 dark:hover:border-yellow-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-amber-100/30 dark:from-yellow-900/10 dark:to-amber-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">🤖</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text font-heading group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                        AI-Powered Café Assistant
                      </h3>
                    </div>
                    <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/50 transition-colors duration-300">
                      Planned MVP
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-3 sm:mb-4 leading-relaxed font-body">
                    A chatbot assistant for small café businesses built with OpenAI + n8n that automates order intake, FAQs, and customer queries via WhatsApp.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {['Twilio', 'OpenAI API', 'n8n', 'Docker', 'Node.js'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:text-yellow-700 dark:hover:text-yellow-300 transition-all duration-200 hover:scale-105">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <MicroInteraction>
                    <a href="#" className="magnetic-button tertiary text-xs sm:text-sm w-full sm:w-auto">
                      View Concept
                    </a>
                  </MicroInteraction>
                </div>
              </motion.div>

              {/* Portfolio Website */}
              <motion.div
                className="group relative bg-white dark:bg-dark-card rounded-xl p-4 sm:p-6 shadow-lg border-2 border-transparent hover:border-green-200 dark:hover:border-green-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={ {once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-100/30 dark:from-green-900/10 dark:to-emerald-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">🌍</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text font-heading group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                        Portfolio Website
                      </h3>
                    </div>
                    <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors duration-300">
                      Live
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-3 sm:mb-4 leading-relaxed font-body">
                    Your personal dev space that you're using to track your progress, share projects, and evolve publicly as a builder.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {['React', 'Tailwind CSS', 'Framer Motion', 'GitHub Pages'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 transition-all duration-200 hover:scale-105">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <MicroInteraction>
                    <a href="https://github.com/DB001119" target="_blank" rel="noopener noreferrer" className="magnetic-button tertiary text-xs sm:text-sm w-full sm:w-auto">
                      View Source
                    </a>
                  </MicroInteraction>
                </div>
              </motion.div>

              {/* Fast-F1 Data App */}
              <motion.div
                className="group relative bg-white dark:bg-dark-card rounded-xl p-4 sm:p-6 shadow-lg border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 sm:col-span-2 lg:col-span-1 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-100/30 dark:from-orange-900/10 dark:to-red-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">📦</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text font-heading group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                        Fast-F1 Data App
                      </h3>
                    </div>
                    <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors duration-300">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-3 sm:mb-4 leading-relaxed font-body">
                    A Formula 1 data dashboard using the Fast-F1 API to display live race telemetry, lap analysis, and predictive performance insights.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {['Python', 'Fast-F1', 'Matplotlib', 'Streamlit'].map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded font-mono hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-200 hover:scale-105">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <MicroInteraction>
                    <a href="#" className="magnetic-button tertiary text-xs sm:text-sm w-full sm:w-auto">
                      Follow Updates
                    </a>
                  </MicroInteraction>
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted mb-4 sm:mb-6 px-2 sm:px-0 font-body">
                Interested in collaborating on any of these projects?
              </p>
              <MicroInteraction>
                <a href="#contact" className="magnetic-button primary text-sm sm:text-base">
                  Let's Build Together
                </a>
              </MicroInteraction>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-2 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
          <div className="w-full">
            {/* Grid container for side-by-side layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
              {/* Left side - Contact Info */}
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="text-sm sm:text-lg font-medium text-primary-600 dark:text-primary-400 tracking-wide uppercase font-heading">
                    Get in Touch
                  </h4>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text leading-tight font-heading">
                    Let's work together
                  </h2>
                  <p className="text-base sm:text-xl text-light-muted dark:text-dark-muted leading-relaxed mt-4 sm:mt-6 px-2 sm:px-0 font-body">
                    Looking for collaboration opportunities or have some questions? I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 sm:pt-6 justify-center lg:justify-start">
                  <a 
                    href="mailto:dipanbash11@gmail.com" 
                    className="group text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    title="Send me an email"
                  >
                    <span className="sr-only">Email</span>
                    <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                  <div className="flex gap-4 sm:gap-6">
                    <a 
                      href="https://github.com/DB001119" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/dipan-baniya-030b782b3/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side - Contact Form */}
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <form className="space-y-4 sm:space-y-6" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className="form-input w-full text-sm sm:text-base focus:scale-[1.04] transition-transform duration-200 font-body"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-input w-full text-sm sm:text-base focus:scale-[1.04] transition-transform duration-200 font-body"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="form-input w-full text-sm sm:text-base focus:scale-[1.04] transition-transform duration-200 font-body"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-body">
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="form-textarea w-full text-sm sm:text-base focus:scale-[1.04] transition-transform duration-200 font-body"
                      placeholder="Enter your message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div>
                    <MicroInteraction>
                      <button
                        type="submit"
                        className="magnetic-button primary full text-sm sm:text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                    </MicroInteraction>
                    
                    {/* Enhanced Status Message */}
                    {submitStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          duration: 0.4 
                        }}
                        className={`mt-6 p-4 rounded-xl text-sm font-body shadow-lg border-l-4 ${
                          submitStatus === 'success'
                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-green-500 dark:border-l-green-400 text-green-800 dark:text-green-200 shadow-green-100 dark:shadow-green-900/20'
                            : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-l-red-500 dark:border-l-red-400 text-red-800 dark:text-red-200 shadow-red-100 dark:shadow-red-900/20'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {submitStatus === 'success' ? (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                                className="w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full flex items-center justify-center"
                              >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                                className="w-6 h-6 bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center"
                              >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex-1">
                            <motion.p 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="font-medium leading-relaxed"
                            >
                              {submitMessage}
                            </motion.p>
                            {submitStatus === 'success' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-2 flex items-center space-x-2 text-xs opacity-75"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span>This message will disappear in 5 seconds</span>
                              </motion.div>
                            )}
                          </div>
                          {/* Dismiss button */}
                          <button
                            onClick={() => {
                              setSubmitStatus('idle');
                              setSubmitMessage('');
                            }}
                            className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200"
                            aria-label="Dismiss message"
                          >
                            <svg className="w-4 h-4 opacity-60 hover:opacity-100" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Progress bar for auto-dismiss */}
                        {submitStatus === 'success' && (
                          <motion.div
                            className="mt-3 h-1 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <motion.div
                              className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                              initial={{ width: "100%" }}
                              animate={{ width: "0%" }}
                              transition={{ duration: 5, ease: "linear" }}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="footer px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
          <div className="footer-content">
            {/* Mobile Footer Layout */}
            <div className="block sm:hidden space-y-4">
              {/* Main Links - Mobile */}
              <div className="text-center">
                <h3 className="footer-heading font-heading">Dipan Baniya</h3>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-body">
                  <a href="#home" className="footer-link">Home</a>
                  <a href="#about" className="footer-link">About</a>
                  <a href="#skills" className="footer-link">Skills</a>
                  <a href="#projects" className="footer-link">Projects</a>
                  <a href="#contact" className="footer-link">Contact</a>
                </div>
              </div>
              
              {/* Social Links - Mobile */}
              <div className="text-center">
                <h3 className="footer-heading text-base font-heading">Connect</h3>
                <div className="flex justify-center space-x-6">
                  <a href="https://github.com/DB001119" target="_blank" rel="noopener noreferrer" className="hover-effect">
                    <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/dipan-baniya-030b782b3/" target="_blank" rel="noopener noreferrer" className="hover-effect">
                    <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:dipanbash11@gmail.com" className="hover-effect">
                    <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Desktop Footer Layout */}
            <div className="hidden sm:block">
              <div className="footer-grid">
                <div className="footer-links">
                  <h3 className="footer-heading font-heading">Navigation</h3>
                  <a href="#home" className="footer-link font-body">Home</a>
                  <a href="#about" className="footer-link font-body">About</a>
                  <a href="#skills" className="footer-link font-body">Skills</a>
                  <a href="#projects" className="footer-link font-body">Projects</a>
                  <a href="#contact" className="footer-link font-body">Contact</a>
                </div>
                
                <div className="footer-links">
                  <h3 className="footer-heading font-heading">Connect</h3>
                  <a href="https://github.com/DB001119" target="_blank" rel="noopener noreferrer" className="footer-link font-body">GitHub</a>
                  <a href="https://www.linkedin.com/in/dipan-baniya-030b782b3/" target="_blank" rel="noopener noreferrer" className="footer-link font-body">LinkedIn</a>
                  <a href="mailto:dipanbash11@gmail.com" className="footer-link font-body">Email</a>
                </div>
                
                <div className="footer-links">
                  <h3 className="footer-heading font-heading">Skills</h3>
                  <span className="footer-link font-body">Web Development</span>
                  <span className="footer-link font-body">Cloud Computing</span>
                  <span className="footer-link font-body">Networking</span>
                </div>
                
                <div className="footer-links">
                  <h3 className="footer-heading font-heading">Let's Connect</h3>
                  <p className="text-gray-400 mb-3 text-sm font-body">Ready to work together? Get in touch!</p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/DB001119" target="_blank" rel="noopener noreferrer" className="hover-effect">
                      <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/dipan-baniya-030b782b3/" target="_blank" rel="noopener noreferrer" className="hover-effect">
                      <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href="mailto:dipanbash11@gmail.com" className="hover-effect">
                      <svg className="h-6 w-6 text-gray-400 hover:text-primary-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright - Both layouts */}
            <div className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm border-t border-gray-800 pt-4 sm:pt-6">
              <p className="font-body">© {new Date().getFullYear()} Dipan Baniya. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


