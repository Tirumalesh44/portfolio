import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import personalInfo from '../../data/personalInfo';

// You'll need to replace these with your actual EmailJS values
const EMAILJS_SERVICE_ID = "service_dptvn0n";
const EMAILJS_TEMPLATE_ID = "template_g8mnx5a";
const EMAILJS_PUBLIC_KEY = "SBTRE29JllXCU_Pq-";

const Contact = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) 
      newErrors.email = "Email is invalid";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // EmailJS integration 
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  return (
    <section id="contact" className="section bg-gray-50 dark:bg-dark-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-100 dark:bg-accent-900/10 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-100 dark:bg-primary-900/10 rounded-full filter blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="section-title"
          >
            Get In Touch
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <motion.div 
              variants={itemVariants}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Me
              </h3>
              
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Have a project in mind or just want to say hello? Fill out the form and I'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FiMail className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                        Email
                      </h4>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <FiMapPin className="text-primary-600 dark:text-primary-400" size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                        Location
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {personalInfo.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="order-1 md:order-2"
            >
              <div className="bg-white dark:bg-dark-700 rounded-lg shadow-md p-6">
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        errors.name
                          ? 'border-error-500 focus:ring-error-200 dark:focus:ring-error-800'
                          : 'border-gray-300 dark:border-dark-500 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-400 dark:focus:border-primary-600'
                      } bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        errors.email
                          ? 'border-error-500 focus:ring-error-200 dark:focus:ring-error-800'
                          : 'border-gray-300 dark:border-dark-500 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-400 dark:focus:border-primary-600'
                      } bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100`}
                      placeholder="Your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        errors.message
                          ? 'border-error-500 focus:ring-error-200 dark:focus:ring-error-800'
                          : 'border-gray-300 dark:border-dark-500 focus:ring-primary-200 dark:focus:ring-primary-800 focus:border-primary-400 dark:focus:border-primary-600'
                      } bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100`}
                      placeholder="Your message"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full btn ${
                        submitStatus === 'success'
                          ? 'bg-success-600 hover:bg-success-700'
                          : 'btn-primary'
                      } relative`}
                    >
                      <span className="flex items-center justify-center">
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : submitStatus === 'success' ? (
                          <>
                            <FiCheckCircle className="mr-2" />
                            Message Sent!
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                    
                    {submitStatus === 'error' && (
                      <p className="mt-2 text-sm text-error-600 dark:text-error-400 text-center">
                        There was an error sending your message. Please try again later.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;