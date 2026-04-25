import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import profileImg from '../assets/profile-avatar.png';
import styles from './About.module.css';

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="Discover my academic journey and aspirations"
        />

        <Reveal width="100%">
          <div className={styles.grid}>
            {/* Profile Image */}
            <motion.div
              className={styles.imageCol}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.imageRing}>
                <img src={profileImg} alt="Deepak Kumar — BA Student" className={styles.profileImage} />
              </div>
              <div className={styles.imageDecor} />
            </motion.div>

            {/* Bio */}
            <div className={styles.bioCol}>
              <h3 className={styles.name}>Deepak Kumar</h3>
              <p className={styles.role}>Bachelor of Arts — History, Political Science & Geography</p>

              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Degree</span>
                  <span className={styles.infoValue}>Bachelor of Arts (BA)</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Year</span>
                  <span className={styles.infoValue}>3rd Year</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Aspiration</span>
                  <span className={styles.infoValue}>UPSC Civil Services</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Interests</span>
                  <span className={styles.infoValue}>Indian History, Geopolitics</span>
                </div>
              </div>

              <p className={styles.bio}>
                I am a dedicated BA student with a strong academic foundation in History, Political Science, and Geography. 
                My passion for understanding India's rich heritage and complex political landscape drives my academic pursuits.
              </p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={styles.bio}>
                      I aspire to serve the nation through the Indian Civil Services (UPSC). Currently preparing for competitive examinations 
                      while maintaining academic excellence. I actively participate in seminars, research projects, and essay competitions 
                      to sharpen my analytical and writing skills. My goal is to become an IAS officer and contribute to grassroots-level 
                      governance and policy making.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="outline"
                size="md"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Show Less' : 'Read More'}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
