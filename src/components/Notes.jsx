import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaDownload, FaEye, FaFileAlt } from 'react-icons/fa';
import Card from './ui/Card';
import Button from './ui/Button';
import SectionHeading from './ui/SectionHeading';
import NoteViewer from './NoteViewer';
import Reveal from './ui/Reveal';
import { notesData } from '../data/notes';
import { notesContent } from '../data/notesContent';
import { generateNotePDF } from '../utils/pdfGenerator';
import styles from './Notes.module.css';

const categories = ['All', 'History', 'Civics', 'Geography'];

export default function Notes() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewingNote, setViewingNote] = useState(null);

  const filtered = useMemo(() => {
    return notesData.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || note.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleDownload = (note) => {
    const content = notesContent[note.id];
    if (content) {
      generateNotePDF(note, content);
    }
  };

  return (
    <section className="section" id="notes">
      <div className="container">
        <SectionHeading
          title="Study Notes"
          subtitle="Curated, comprehensive notes for BA examinations and UPSC preparation"
        />

        {/* Search & Filter */}
        <Reveal width="100%">
          <div className={styles.toolbar}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search notes by title or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
                id="notes-search"
              />
            </div>
            <div className={styles.filters}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Notes Grid */}
        <div className={styles.grid}>
          {filtered.map((note, i) => (
            <Card key={note.id} delay={i * 0.08}>
              <div className={styles.noteCard}>
                <div className={styles.noteHeader}>
                  <div
                    className={styles.noteIcon}
                    style={{ background: `${note.color}15`, color: note.color }}
                  >
                    <note.icon />
                  </div>
                  <span
                    className={styles.categoryBadge}
                    style={{ background: `${note.color}15`, color: note.color }}
                  >
                    {note.category}
                  </span>
                </div>
                <h3 className={styles.noteTitle}>{note.title}</h3>
                <p className={styles.noteDesc}>{note.description}</p>
                <div className={styles.noteMeta}>
                  <span><FaFileAlt /> {note.pages} pages</span>
                  <span>{note.format}</span>
                </div>
                <div className={styles.noteActions}>
                  <Button variant="primary" size="sm" icon={FaEye} onClick={() => setViewingNote(note.id)}>View</Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={FaDownload}
                    onClick={() => handleDownload(note)}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.p
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No notes found matching your search. Try a different keyword or category.
          </motion.p>
        )}
      </div>

      {/* Note Viewer Modal */}
      {viewingNote && (
        <NoteViewer noteId={viewingNote} onClose={() => setViewingNote(null)} />
      )}
    </section>
  );
}
