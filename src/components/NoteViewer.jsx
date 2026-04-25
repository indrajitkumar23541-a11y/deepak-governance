import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaBookOpen } from 'react-icons/fa';
import { notesData } from '../data/notes';
import { notesContent } from '../data/notesContent';
import { generateNotePDF } from '../utils/pdfGenerator';
import styles from './NoteViewer.module.css';

export default function NoteViewer({ noteId, onClose }) {
  const content = notesContent[noteId];
  const noteSummary = notesData.find(n => n.id === noteId);
  
  if (!content || !noteSummary) return null;

  const handleDownload = () => {
    generateNotePDF(noteSummary, content);
  };

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
              <FaBookOpen className={styles.headerIcon} />
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
            <button className={styles.downloadBtn} onClick={handleDownload}>
              <FaDownload /> Download PDF
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
