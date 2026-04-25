import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaProjectDiagram } from 'react-icons/fa';
import { projectsContent } from '../data/projectsContent';
import styles from './ProjectViewer.module.css';

export default function ProjectViewer({ projectId, onClose }) {
  const content = projectsContent[projectId];
  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <FaProjectDiagram className={styles.headerIcon} />
              <h2 className={styles.title}>{content.title}</h2>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className={styles.body}>
            {content.sections.map((section, i) => (
              <div key={i} className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <span className={styles.sectionNum}>{String(i + 1).padStart(2, '0')}</span>
                  {section.heading}
                </h3>
                <ul className={styles.pointsList}>
                  {section.points.map((point, j) => (
                    <li key={j} className={styles.point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <a href="#" className={styles.projectLinkBtn}>
              <FaExternalLinkAlt /> Full Project Link
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
