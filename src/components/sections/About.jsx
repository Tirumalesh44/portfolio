import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiTool, FiCloud } from 'react-icons/fi';
import personalInfo from '../../data/personalInfo';

const About = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    },
  };

  const skillCategories = [
    { name: 'Frontend', icon: <FiCode />, skills: personalInfo.skills.frontend },
    { name: 'Backend', icon: <FiServer />, skills: personalInfo.skills.backend },
    { name: 'Database', icon: <FiDatabase />, skills: personalInfo.skills.database },
    { name: 'DevOps', icon: <FiCloud />, skills: personalInfo.skills.devops },
    { name: 'Tools', icon: <FiTool />, skills: personalInfo.skills.tools },
  ];

  return (
    <section id="about" className="section relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-dark-800 dark:to-dark-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            variants={itemVariants}
            className="section-title"
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <motion.div 
              variants={itemVariants}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {personalInfo.about.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-600 dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Technical Skills
              </h3>
              
              <div className="space-y-8">
                {skillCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-primary-600 dark:text-primary-400 mr-3">
                        {category.icon}
                      </span>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;