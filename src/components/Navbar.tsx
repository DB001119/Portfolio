import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      const offset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ item, isMobile = false }: { item: string; isMobile?: boolean }) => {
    const isActive = activeSection === item.toLowerCase();
    
    return (
      <button
        onClick={() => scrollToSection(item)}
        className={`${
          isMobile
            ? 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 block w-full px-3 py-3 sm:py-4 text-base sm:text-lg font-medium border-b border-gray-200 dark:border-gray-700 min-h-[48px] font-body'
            : `relative text-gray-700 dark:text-gray-300 ${isScrolled ? 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm' : 'px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base'} font-medium group overflow-hidden transition-all duration-800 ease-in-out rounded-lg min-h-[40px] sm:min-h-[44px] font-body ${
                isActive ? 'text-primary-600 dark:text-primary-400' : ''
              }`
        }`}
      >
        <span className="relative z-10 flex items-center justify-center h-full">{item}</span>
        {!isMobile && (
          <>
            {/* Hover background effect */}
            <span className={`absolute inset-0 bg-gray-50 dark:bg-gray-800 transform origin-left 
              transition-all duration-800 ease-in-out -z-10 rounded-lg
              ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
            />
            {/* Bottom line effect */}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400 
              transform transition-all duration-800 ease-in-out
              ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
            />
          </>
        )}
      </button>
    );
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'top-2 sm:top-4' 
          : 'top-0'
      }`}>
        <div className={`transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'max-w-4xl mx-auto px-3 sm:px-6' 
            : 'w-full px-0'
        }`}>
          <div className={`flex items-center justify-between transition-all duration-700 ease-in-out ${
            isScrolled 
              ? 'h-11 sm:h-12 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 rounded-full border border-gray-200/10 dark:border-gray-800/30' 
              : 'h-14 sm:h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm w-full px-3 sm:px-4 md:px-6 lg:px-8'
          } ${!isScrolled && (isMobileMenuOpen ? 'shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50' : '')}`}>
            
            {/* Logo/Name */}
            <div className={`flex-shrink-0 transition-all duration-700 ease-in-out ${isScrolled ? 'ml-4 sm:ml-6' : ''}`}>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 hover:scale-105 transition-all duration-300 font-heading"
              >
                {isScrolled ? 'Dipan' : 'Dipan'}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className={`flex items-center transition-all duration-700 ease-in-out ${
                isScrolled ? 'space-x-0.5 sm:space-x-1' : 'space-x-1 sm:space-x-2'
              }`}>
                {navItems.map((item) => (
                  <NavLink key={item} item={item} />
                ))}
              </div>
            </div>

            <div className={`flex items-center space-x-1 sm:space-x-2 transition-all duration-700 ease-in-out ${isScrolled ? 'mr-4 sm:mr-6' : ''}`}>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105
                  hover:rotate-12 w-10 h-10 sm:w-11 sm:h-11"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center p-1.5 sm:p-2 rounded-md text-gray-700 dark:text-gray-300 
                  hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-all duration-300 w-10 h-10 sm:w-11 sm:h-11"
                aria-label="Main menu"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  <span 
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
                    }`}
                  />
                  <span 
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span 
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out transform ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          } ${isScrolled ? 'mt-1 sm:mt-2' : ''}`}
        >
          <div className={`px-1 sm:px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 ${
            isScrolled ? 'max-w-4xl mx-auto rounded-2xl border border-gray-200/10 dark:border-gray-800/30 mx-3 sm:mx-6' : ''
          }`}>
            {navItems.map((item) => (
              <NavLink key={item} item={item} isMobile />
            ))}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-40 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar; 