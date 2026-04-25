import { motion } from 'framer-motion';
import styles from './SectionHeading.module.css';

export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <motion.div
      className={`${styles.heading} ${styles[align]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.accentLine} />
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}
