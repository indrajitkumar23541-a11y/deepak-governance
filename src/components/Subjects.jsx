import { motion } from 'framer-motion';
import { FaLandmark, FaBalanceScale, FaGlobeAmericas } from 'react-icons/fa';
import Card from './ui/Card';
import SectionHeading from './ui/SectionHeading';
import styles from './Subjects.module.css';

const subjects = [
  {
    id: 1,
    title: 'History',
    icon: FaLandmark,
    color: '#3B82F6',
    description: 'Exploring the rich tapestry of Indian and World History — from ancient civilizations to modern nation-building. Covers Indus Valley, Mughal Era, Freedom Struggle, and Post-Independence India.',
    topics: ['Ancient India', 'Medieval India', 'Modern India', 'World History'],
  },
  {
    id: 2,
    title: 'Political Science (Civics)',
    icon: FaBalanceScale,
    color: '#F59E0B',
    description: 'Understanding the Indian Constitution, governance systems, political theories, and the democratic framework that shapes our republic. Focus on UPSC-oriented study.',
    topics: ['Indian Constitution', 'Governance', 'Political Theory', 'International Relations'],
  },
  {
    id: 3,
    title: 'Geography',
    icon: FaGlobeAmericas,
    color: '#10B981',
    description: 'Studying physical and human geography of India and the world — landforms, climate, resources, population, urbanization, and environmental challenges.',
    topics: ['Physical Geography', 'Human Geography', 'Indian Geography', 'Environmental Studies'],
  },
];

export default function Subjects() {
  return (
    <section className={`section section-alt`} id="subjects">
      <div className="container">
        <SectionHeading
          title="My Subjects"
          subtitle="The three pillars of my BA programme — each contributing to a holistic understanding of society"
        />

        <div className={styles.grid}>
          {subjects.map((subject, i) => (
            <Card key={subject.id} delay={i * 0.15} variant="elevated">
              <div className={styles.subjectCard}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${subject.color}15`, color: subject.color }}
                >
                  <subject.icon />
                </div>
                <h3 className={styles.title}>{subject.title}</h3>
                <p className={styles.desc}>{subject.description}</p>
                <div className={styles.topics}>
                  {subject.topics.map((topic) => (
                    <span
                      key={topic}
                      className={styles.topicTag}
                      style={{ borderColor: `${subject.color}40`, color: subject.color }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
