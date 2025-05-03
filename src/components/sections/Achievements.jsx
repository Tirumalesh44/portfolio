import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import personalInfo from '../../data/personalInfo';

const Achievements = () => {
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
      transition: { duration: 0.5 },
    },
  };

  const certifications = personalInfo?.certifications || [];
  const leetcode = personalInfo?.codingProfiles?.leetcode?.stats || {};
  const codechef = personalInfo?.codingProfiles?.codechef?.stats || {};

  return (
    <section
      id="achievements"
      className="section bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-orange-500/10 dark:from-violet-600/20 dark:via-pink-600/20 dark:to-orange-600/20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants} className="section-title mb-16">
            Achievements & Certifications
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Professional Certifications
              </h3>
              <div className="space-y-6">
                {certifications.length > 0 ? (
                  certifications.map((cert) => (
                    <motion.div
                      key={cert.title}
                      className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {cert.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {cert.issuer} • {cert.date}
                        </p>
                        {cert.verificationLink && (
                          <a
                            href={cert.verificationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                          >
                            View Certificate
                            <FiExternalLink className="ml-1" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No certifications available.</p>
                )}
              </div>
            </motion.div>

            {/* Coding Profiles */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Coding Profiles
              </h3>
              <div className="space-y-6">
                {/* LeetCode */}
                <motion.div
                  className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    LeetCode
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <ProfileStat label="Problems" value={leetcode.problemsSolved} />
                    <ProfileStat label="Contest Rating" value={leetcode.contestRating} />
                  </div>
                  <ProfileLink href={personalInfo?.codingProfiles?.leetcode?.profile} />
                </motion.div>

                {/* CodeChef */}
                <motion.div
                  className="bg-white dark:bg-dark-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    CodeChef
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <ProfileStat label="Rating" value={codechef.rating} />
                    <ProfileStat label="Stars" value={`${codechef.stars}★`} />
                    <ProfileStat label="Problems" value={codechef.problemsSolved} />
                  </div>
                  <ProfileLink href={personalInfo?.codingProfiles?.codechef?.profile} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProfileStat = ({ label, value }) => (
  <div className="text-center">
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
  </div>
);

const ProfileLink = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
  >
    View Profile
    <FiExternalLink className="ml-1" />
  </a>
);

export default Achievements;
