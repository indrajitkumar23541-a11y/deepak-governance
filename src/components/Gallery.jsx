import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaUpload, FaTrash, FaEye, FaTimes, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Card from './ui/Card';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { initialGalleryData } from '../data/gallery';
import styles from './Gallery.module.css';

const categories = ['All', 'Academic', 'Study', 'Personal', 'Events'];

export default function Gallery() {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('deepak_portfolio_gallery');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const userUploaded = parsed.filter(item => item.isUserUploaded);
        return [...initialGalleryData, ...userUploaded];
      } catch {
        return initialGalleryData;
      }
    }
    return initialGalleryData;
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('deepak_portfolio_isAdmin') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form State
  const [newPhotoFile, setNewPhotoFile] = useState(null);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Personal');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Deepak@15_06_2005') {
      setIsAdmin(true);
      sessionStorage.setItem('deepak_portfolio_isAdmin', 'true');
      setShowLoginModal(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid admin password!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('deepak_portfolio_isAdmin');
  };

  // Save user uploaded photos to localStorage
  useEffect(() => {
    const userPhotos = photos.filter(p => p.isUserUploaded);
    localStorage.setItem('deepak_portfolio_gallery', JSON.stringify(userPhotos));
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return photos;
    return photos.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [photos, activeCategory]);

  // Hidden key shortcut to trigger login (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const el = document.getElementById('gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setShowLoginModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setNewPhotoFile(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setNewPhotoFile(file);
      }
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhotoFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newPhoto = {
        id: Date.now().toString(),
        title: newPhotoTitle || 'My Photo',
        category: newPhotoCategory,
        description: newPhotoDesc || 'No description provided.',
        image: event.target.result,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isUserUploaded: true
      };

      setPhotos(prev => [...prev, newPhoto]);
      // Reset Form State
      setNewPhotoFile(null);
      setNewPhotoTitle('');
      setNewPhotoDesc('');
      setNewPhotoCategory('Personal');
      setShowUploadForm(false);
    };
    reader.readAsDataURL(newPhotoFile);
  };

  const handleDeletePhoto = (id, e) => {
    e.stopPropagation(); // Prevent opening lightbox
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="section" id="gallery">
      <div className="container">
        {/* Double-clicking this header acts as a secret trigger to open Admin Login */}
        <div 
          onDoubleClick={() => setShowLoginModal(true)} 
          style={{ cursor: 'default', userSelect: 'none' }}
          title="Gallery Section"
        >
          <SectionHeading
            title="Photo Gallery"
            subtitle="Capturing key milestones, activities, and study memories"
          />
        </div>

        {/* Gallery Header Toolbar */}
        <Reveal width="100%">
          <div className={styles.toolbar}>
            {/* Category Filter */}
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

            {/* Admin Upload Actions - Only visible when Admin Mode is active */}
            {isAdmin && (
              <div className={styles.adminActions}>
                <span className={styles.adminBadge}>Admin Mode</span>
                <Button
                  variant="primary"
                  size="md"
                  icon={FaPlus}
                  onClick={() => setShowUploadForm(true)}
                >
                  Upload Photo
                </Button>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* Info Banner on Local Storage - Only visible to authenticated Admin */}
        {isAdmin && (
          <Reveal width="100%">
            <div className={styles.infoBanner}>
              <FaInfoCircle className={styles.infoIcon} />
              <p className={styles.infoText}>
                Note: Photos uploaded here are stored in your browser's local storage. To permanently add photos to the deployment build, place them in the project's assets folder and add them to <code>gallery.js</code>.
              </p>
            </div>
          </Reveal>
        )}

        {/* Gallery Photos Grid */}
        <div className={styles.grid}>
          {filteredPhotos.map((photo, i) => (
            <Card key={photo.id} delay={i * 0.06}>
              <div className={styles.photoCard} onClick={() => setViewingPhoto(photo)}>
                <div className={styles.imageWrapper}>
                  <img src={photo.image} alt={photo.title} className={styles.image} loading="lazy" />
                  <div className={styles.overlay}>
                    <FaEye className={styles.viewIcon} />
                  </div>
                  <span className={styles.categoryBadge}>{photo.category}</span>
                </div>
                <div className={styles.cardInfo}>
                  <h3 className={styles.cardTitle}>{photo.title}</h3>
                  <p className={styles.cardDesc}>{photo.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                      <FaCalendarAlt /> {photo.date}
                    </span>
                    {isAdmin && photo.isUserUploaded && (
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        title="Delete Photo"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No photos found in this category. Upload one to get started!
          </motion.div>
        )}
      </div>

      {/* Upload Form Modal */}
      <AnimatePresence>
        {showUploadForm && (
          <div className={styles.formOverlay} onClick={() => setShowUploadForm(false)}>
            <motion.div
              className={styles.formContainer}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.formHeader}>
                <h3>Upload New Photo</h3>
                <button className={styles.closeBtn} onClick={() => setShowUploadForm(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className={styles.formBody}>
                {/* Drag & Drop File Input */}
                <div
                  className={`${styles.dropZone} ${dragActive ? styles.dropActive : ''} ${newPhotoFile ? styles.hasFile : ''}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    required
                  />
                  <label htmlFor="file-upload" className={styles.dropZoneLabel}>
                    <FaUpload className={styles.uploadIcon} />
                    {newPhotoFile ? (
                      <div className={styles.fileDetails}>
                        <span className={styles.fileName}>{newPhotoFile.name}</span>
                        <span className={styles.fileSize}>{(newPhotoFile.size / 1024).toFixed(1)} KB</span>
                      </div>
                    ) : (
                      <>
                        <span className={styles.dropText}>Drag & Drop your photo here or <strong>Browse</strong></span>
                        <span className={styles.dropSubtext}>Supports JPG, PNG, WEBP</span>
                      </>
                    )}
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="photo-title">Photo Title</label>
                  <input
                    type="text"
                    id="photo-title"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="Enter a descriptive title..."
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="photo-category">Category</label>
                    <select
                      id="photo-category"
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value)}
                    >
                      <option value="Academic">Academic</option>
                      <option value="Study">Study</option>
                      <option value="Personal">Personal</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="photo-desc">Description</label>
                  <textarea
                    id="photo-desc"
                    value={newPhotoDesc}
                    onChange={(e) => setNewPhotoDesc(e.target.value)}
                    placeholder="Provide context or a description..."
                    rows={3}
                  />
                </div>

                <div className={styles.formFooter}>
                  <Button variant="ghost" size="md" onClick={() => setShowUploadForm(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" type="submit" disabled={!newPhotoFile}>
                    Add to Gallery
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {viewingPhoto && (
          <div className={styles.lightboxOverlay} onClick={() => setViewingPhoto(null)}>
            <motion.div
              className={styles.lightboxContainer}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.lightboxClose} onClick={() => setViewingPhoto(null)}>
                <FaTimes />
              </button>
              <img src={viewingPhoto.image} alt={viewingPhoto.title} className={styles.lightboxImage} />
              <div className={styles.lightboxInfo}>
                <span className={styles.lightboxBadge}>{viewingPhoto.category}</span>
                <h2 className={styles.lightboxTitle}>{viewingPhoto.title}</h2>
                <p className={styles.lightboxDesc}>{viewingPhoto.description}</p>
                <div className={styles.lightboxMeta}>
                  <FaCalendarAlt /> {viewingPhoto.date}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <div className={styles.formOverlay} onClick={() => { setShowLoginModal(false); setError(''); setPassword(''); }}>
            <motion.div
              className={styles.loginContainer}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.formHeader}>
                <h3>Admin Verification</h3>
                <button className={styles.closeBtn} onClick={() => { setShowLoginModal(false); setError(''); setPassword(''); }}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleLogin} className={styles.formBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="admin-password">Enter Admin Password</label>
                  <input
                    type="password"
                    id="admin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    required
                    autoFocus
                  />
                  {error && <span className={styles.errorText}>{error}</span>}
                </div>

                <div className={styles.formFooter}>
                  <Button variant="ghost" size="md" onClick={() => { setShowLoginModal(false); setError(''); setPassword(''); }}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" type="submit">
                    Verify
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
