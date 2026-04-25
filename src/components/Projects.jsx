import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Card from './ui/Card';
import Button from './ui/Button';
import SectionHeading from './ui/SectionHeading';
import ProjectViewer from './ProjectViewer';
import Reveal from './ui/Reveal';
import { projectsData } from '../data/projects';
import styles from './Projects.module.css';

// Import images
import constitutionImg from '../assets/constitution-project.png';
import climateImg from '../assets/climate-project.png';
import ancientImg from '../assets/ancient-india-project.png';

const imageMap = {
  'constitution-project.png': constitutionImg,
  'climate-project.png': climateImg,
  'ancient-india-project.png': ancientImg,
};

export default function Projects() {
  const [viewingProject, setViewingProject] = useState(null);

  return (
    <section className={`section section-alt`} id="projects">
      <div className="container">
        <SectionHeading
          title="Academic Projects"
          subtitle="Hands-on research and presentations that deepen my understanding of core subjects"
        />

        <Reveal width="100%">
          <div className={styles.grid}>
            {projectsData.map((project, i) => (
              <Card key={project.id} delay={i * 0.15} variant="elevated" className={styles.projectCard}>
                <div className={styles.imageWrapper}>
                  <motion.img
                    src={imageMap[project.image]}
                    alt={project.title}
                    className={styles.projectImage}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.yearBadge}>{project.year}</span>
                  </div>
                </div>
                <div className={styles.projectContent}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    icon={FaExternalLinkAlt}
                    onClick={() => setViewingProject(project.id)}
                  >
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>

      {viewingProject && (
        <ProjectViewer 
          projectId={viewingProject} 
          onClose={() => setViewingProject(null)} 
        />
      )}
    </section>
  );
}
