import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaEnvelope } from 'react-icons/fa';
import Button from './ui/Button';
import { useTheme } from '../context/ThemeContext';
import heroImgDark from '../assets/hero-premium-dark.png';
import heroImgLight from '../assets/hero-premium-light.png';
import styles from './Hero.module.css';

export default function Hero() {
  const { theme } = useTheme();
  const heroImg = theme === 'dark' ? heroImgDark : heroImgLight;
  return (
    <section id="hero" className={styles.hero}>
      {/* Decorative blobs */}
      <div className={styles.blobOne} />
      <div className={styles.blobTwo} />

      <div className={`container ${styles.inner}`}>
        {/* Left — Text */}
        <motion.div
          className={styles.content}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          <motion.span
            className={styles.badge}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            🎓 BA Student — Arts & Humanities
          </motion.span>

          <motion.h1 
            className={styles.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Hello, I'm <span className={styles.name}>Deepak Kumar</span>
          </motion.h1>

          <motion.p 
            className={styles.subtitle}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            BA Student &nbsp;|&nbsp; <span className="gold-accent">History</span> &nbsp;|&nbsp; <span className="gold-accent">Civics</span> &nbsp;|&nbsp; <span className="gold-accent">Geography</span>
          </motion.p>

          <motion.p 
            className={styles.description}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            A passionate Bachelor of Arts student with a deep interest in Indian History, Political Science, and Geography. 
            Aspiring UPSC candidate dedicated to understanding the socio-political fabric of India and contributing to nation-building.
          </motion.p>

          <motion.div 
            className={styles.cta}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <Button variant="primary" size="lg" icon={FaArrowRight} href="#notes">
              Explore My Notes
            </Button>
            <Button variant="outline" size="lg" icon={FaEnvelope} href="#contact">
              Contact Me
            </Button>
          </motion.div>

          <motion.blockquote
            className={styles.quote}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ delay: 1 }}
          >
            <span className={styles.quoteIcon}>"</span>
            ज्ञान वह सबसे शक्तिशाली हथियार है जिससे आप पूरी दुनिया बदल सकते हैं।
            <footer className={styles.quoteAuthor}>— डॉ. ए.पी.जे. अब्दुल कलाम</footer>
          </motion.blockquote>
        </motion.div>

        {/* Right — Image */}
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          whileHover={{ y: -15 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 
          }}
        >
          <div className={styles.imageGlow} />
          <motion.img 
            key={heroImg}
            src={heroImg} 
            alt="Academic books and globe illustration" 
            className={styles.heroImage} 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
