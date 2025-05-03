import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project, variants, custom }) => {
  return (
    <motion.div 
      className="card overflow-hidden group h-full flex flex-col"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={custom}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-end space-x-3">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors"
              aria-label="View Github Repository"
            >
              <FiGithub size={18} />
            </a>
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary-600/90 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
              aria-label="View Live Demo"
            >
              <FiExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-dark-600">
          {project.tech.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs font-medium px-2 py-1 rounded-md bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;