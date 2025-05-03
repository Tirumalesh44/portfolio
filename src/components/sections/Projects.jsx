import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import projectsData from '../../data/projects';

const Projects = () => {
  const [activeStack, setActiveStack] = useState('all');
  
  const stackOptions = [
    { id: 'all', label: 'All Projects' },
    ...projectsData.map(stack => ({ id: stack.stack, label: stack.stack }))
  ];
  
  const filteredProjects = activeStack === 'all' 
    ? projectsData.flatMap(stack => stack.projects)
    : projectsData.find(stack => stack.stack === activeStack)?.projects || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section id="projects" className="section bg-white dark:bg-dark-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="section-title"
          >
            Projects
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {stackOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setActiveStack(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeStack === option.id
                    ? 'bg-primary-600 text-white dark:bg-primary-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-dark-700 dark:text-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  variants={itemVariants}
                  custom={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;