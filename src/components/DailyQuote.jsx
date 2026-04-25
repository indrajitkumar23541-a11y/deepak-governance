import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import styles from './DailyQuote.module.css';

export default function DailyQuote() {
  return (
    <section className={styles.section}>
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />

      <motion.div
        className={`container ${styles.inner}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FaQuoteLeft className={styles.quoteIconLeft} />

        <h2 className={styles.quote}>
          ज्ञान ही सबसे बड़ी शक्ति है
        </h2>

        <p className={styles.translation}>
          "Knowledge is the greatest power"
        </p>

        <FaQuoteRight className={styles.quoteIconRight} />

        <div className={styles.divider}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>

        <p className={styles.attribution}>— Daily Motivation for UPSC Aspirants</p>
      </motion.div>
    </section>
  );
}
