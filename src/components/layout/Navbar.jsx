import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'; // Added FiDownload
import ThemeToggle from '../ui/ThemeToggle';
import personalInfo from '../../data/personalInfo'; // Uses centralized resume path

const navLinks = [
  { id: "home", label: "Home", offset: -100 },
  { id: "about", label: "About", offset: -50 },
  { id: "achievements", label: "Achievements", offset: -50 },
  { id: "projects", label: "Projects", offset: -50 },
  { id: "contact", label: "Contact", offset: -50 },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/95 dark:bg-dark-700/90 shadow-lg backdrop-blur-md'
          : 'py-5 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="text-2xl font-bold cursor-pointer font-heading text-blue-600 dark:text-blue-400"
        >
          {personalInfo.name.split(' ')[0]}
          <span className="text-blue-400">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              spy={true}
              smooth={true}
              duration={500}
              offset={link.offset}
              className={`relative font-medium cursor-pointer transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                activeSection === link.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 -mb-1"
                  layoutId="navbar-indicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          {/* Resume Button */}
          <a
            href={personalInfo.resume}
            download="Tirumalesh_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            <FiDownload className="text-white" />
            Resume
          </a>

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="ml-2 p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-800 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.id}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={link.offset}
                  onClick={closeMenu}
                  className={`py-2 font-medium ${
                    activeSection === link.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Resume Button in Mobile */}
              <a
                href={personalInfo.resume}
                download="Tirumalesh_Resume.pdf"
                className="flex items-center gap-2 py-2 font-medium text-blue-600 dark:text-blue-400"
                onClick={closeMenu}
              >
                <FiDownload />
                Download Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
