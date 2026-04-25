import { useState } from 'react';
import { FaHeart, FaArrowUp, FaPaperPlane } from 'react-icons/fa';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Notes', href: '#notes' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const subjectLinks = [
  { label: 'History', href: '#subjects' },
  { label: 'Political Science', href: '#subjects' },
  { label: 'Geography', href: '#subjects' },
  { label: 'UPSC Preparation', href: '#notes' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>
              <span className={styles.logoAccent}>D</span>eepak
              <span className={styles.logoDot}>.</span>
            </h3>
            <p className={styles.tagline}>
              BA Student | History | Civics | Geography
              <br />Aspiring UPSC Candidate 🇮🇳
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleScroll(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Subjects</h4>
            <ul className={styles.linkList}>
              {subjectLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} onClick={(e) => handleScroll(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Stay Updated</h4>
            <p className={styles.newsletterText}>
              Subscribe to get latest study notes and updates.
            </p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.newsletterInput}
                id="newsletter-email"
              />
              <button type="submit" className={styles.newsletterBtn}>
                <FaPaperPlane />
              </button>
            </form>
            {subscribed && <p className={styles.subscribed}>✓ Subscribed!</p>}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Deepak. Made with{' '}
            <FaHeart className={styles.heartIcon} /> for learning.
          </p>
          <button className={styles.scrollTop} onClick={scrollToTop}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
