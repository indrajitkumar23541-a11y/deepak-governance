import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { achievementsData } from '../data/achievements';
import styles from './Achievements.module.css';

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <SectionHeading
          title="Achievements"
          subtitle="Milestones and recognitions along my academic journey"
        />

        <div className={styles.timeline}>
          <motion.div 
            className={styles.line} 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {achievementsData.map((item, i) => (
            <motion.div
              key={item.id}
              className={`${styles.entry} ${i % 2 === 0 ? styles.left : styles.right}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: i * 0.1 
              }}
            >
              <motion.div 
                className={styles.card}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.cardHeader}>
                  <div
                    className={styles.iconWrapper}
                    style={{ background: `${item.color}15`, color: item.color }}
                  >
                    <item.icon />
                  </div>
                  <span className={styles.year}>{item.year}</span>
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.description}</p>
              </motion.div>
              <motion.div 
                className={styles.dot} 
                style={{ background: item.color }} 
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
