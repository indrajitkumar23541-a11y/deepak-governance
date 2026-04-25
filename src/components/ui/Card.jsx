import { motion } from 'framer-motion';
import styles from './Card.module.css';

export default function Card({ children, className = '', hoverable = true, variant = 'default', delay = 0, ...props }) {
  return (
    <motion.div
      className={`${styles.card} ${styles[variant]} ${hoverable ? styles.hoverable : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={hoverable ? { y: -10, transition: { duration: 0.3 } } : {}}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
