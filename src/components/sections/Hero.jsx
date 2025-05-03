import { useRef } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import personalInfo from '../../data/personalInfo';

const Hero = () => {
  const ref = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    },
  };

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-orange-500/20 dark:from-violet-600/30 dark:via-pink-600/30 dark:to-orange-600/30"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-violet-600 dark:text-violet-400 mb-4 inline-block font-medium text-xl">
              Hello, I'm
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-600 to-orange-600 dark:from-violet-400 dark:via-pink-400 dark:to-orange-400">
              {personalInfo.name}
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600 dark:from-pink-400 dark:to-orange-400">
              {personalInfo.title}
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto lg:mx-0 mb-8">
              {personalInfo.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                to="projects"
                smooth={true}
                duration={800}
                offset={-50}
                className="btn btn-primary"
              >
                View Projects
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={800}
                offset={-50}
                className="btn btn-outline"
              >
                Contact Me
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 flex gap-6 justify-center lg:justify-start">
              <a 
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                <FiGithub size={24} />
              </a>
              <a 
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-600 dark:text-violet-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                <FiLinkedin size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="lg:flex-1 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="relative rounded-full w-full aspect-square object-cover border-4 border-white dark:border-dark-700 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;