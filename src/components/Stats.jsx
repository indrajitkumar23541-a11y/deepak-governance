import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import SectionHeading from './ui/SectionHeading';
import { statsData } from '../data/stats';
import styles from './Stats.module.css';

function AnimatedCounter({ value, suffix = '', isGoal }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          if (isGoal) {
            setCount(value);
            return;
          }
          let start = 0;
          const duration = 1500;
          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, isGoal]);

  if (isGoal) {
    return <span ref={ref} className={styles.counterGoal}>🎯 UPSC</span>;
  }

  return (
    <span ref={ref} className={styles.counter}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={`section section-alt`} id="stats">
      <div className="container">
        <SectionHeading
          title="Quick Overview"
          subtitle="A snapshot of my academic journey and accomplishments"
        />
        <div className={styles.grid}>
          {statsData.map((stat, i) => (
            <Card key={stat.id} delay={i * 0.1} variant="elevated">
              <div className={styles.statCard}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  <stat.icon />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isGoal={stat.isGoal} />
                <h3 className={styles.label}>{stat.label}</h3>
                <p className={styles.desc}>{stat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
