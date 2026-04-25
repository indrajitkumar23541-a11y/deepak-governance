import { FaHome, FaUser, FaBook, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import styles from './MobileNav.module.css';

const tabs = [
  { icon: FaHome, label: 'Home', href: '#hero' },
  { icon: FaUser, label: 'About', href: '#about' },
  { icon: FaBook, label: 'Notes', href: '#notes' },
  { icon: FaProjectDiagram, label: 'Projects', href: '#projects' },
  { icon: FaEnvelope, label: 'Contact', href: '#contact' },
];

export default function MobileNav() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.mobileNav}>
      {tabs.map((tab) => (
        <a
          key={tab.label}
          href={tab.href}
          className={styles.tab}
          onClick={(e) => handleClick(e, tab.href)}
        >
          <tab.icon className={styles.tabIcon} />
          <span className={styles.tabLabel}>{tab.label}</span>
        </a>
      ))}
    </nav>
  );
}
