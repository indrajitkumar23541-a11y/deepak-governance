import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaBookOpen, FaMap } from 'react-icons/fa';
import { notesData } from '../data/notes';
import { notesContent } from '../data/notesContent';
import { generateNotePDF } from '../utils/pdfGenerator';
import worldMapImg from '../assets/world-map.png';
import indiaMapImg from '../assets/india-map.png';
import biharMapImg from '../assets/bihar-map.png';
import nawadaMapImg from '../assets/nawada-map.png';
import styles from './NoteViewer.module.css';

const mapImages = {
  'world-map.png': worldMapImg,
  'india-map.png': indiaMapImg,
  'bihar-map.png': biharMapImg,
  'nawada-map.png': nawadaMapImg,
};

export default function NoteViewer({ noteId, onClose }) {
  const content = notesContent[noteId];
  const noteSummary = notesData.find(n => n.id === noteId);
  const [activeMap, setActiveMap] = useState(null);
  
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
                  <span>{section.heading}</span>
                  {section.hasMap && (
                    <button
                      className={styles.viewMapBtn}
                      onClick={() => setActiveMap(section.mapImage)}
                      title="View Map"
                    >
                      <FaMap className={styles.mapBtnIcon} /> View Map
                    </button>
                  )}
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

        {/* Map Lightbox Overlay */}
        <AnimatePresence>
          {activeMap && (
            <motion.div
              className={styles.mapOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMap(null)}
            >
              <motion.div
                className={styles.mapContainer}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className={styles.closeMapBtn}
                  onClick={() => setActiveMap(null)}
                  aria-label="Close Map"
                >
                  <FaTimes />
                </button>
                <img
                  src={mapImages[activeMap]}
                  alt="Map Reference"
                  className={styles.mapImage}
                />
                <div className={styles.mapTitle}>
                  {content.title} — {
                    activeMap === 'world-map.png' ? 'World Map Reference' :
                    activeMap === 'india-map.png' ? 'Country Map (India)' :
                    activeMap === 'bihar-map.png' ? 'State Map (Bihar)' :
                    activeMap === 'nawada-map.png' ? 'District Map (Nawada)' : 'Map Reference'
                  }
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
