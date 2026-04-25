import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', size = 'md', icon: Icon, onClick, href, className = '', ...props }) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className={styles.icon} />}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
