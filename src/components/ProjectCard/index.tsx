import React from 'react';
import Link from '@docusaurus/Link';
import SkillBadge from '@site/src/components/SkillBadge';
import type { Project } from '@site/src/data/projects';
import styles from './styles.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagePlaceholder}>
        <svg
          width="100%"
          height="160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
          aria-label="Architecture Placeholder"
        >
          <rect width="100%" height="100%" fill="var(--ifm-color-emphasis-200)" />
          <text
            x="50%"
            y="50%"
            fill="var(--ifm-color-emphasis-600)"
            dy=".3em"
            textAnchor="middle"
            fontFamily="monospace"
          >
            Architecture Diagram
          </text>
        </svg>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.metrics}>
          {project.metrics.map((metric, idx) => (
            <div key={idx} className={styles.metricItem}>
              <span className={styles.metricIcon}>⚡</span>
              <span className={styles.metricText}>{metric}</span>
            </div>
          ))}
        </div>

        <div className={styles.tags}>
          {project.tags.map(tag => (
            <SkillBadge key={tag} name={tag} variant="tag" />
          ))}
        </div>

        <div className={styles.footer}>
          <Link to={project.link} className={styles.readMore}>
            Read Case Study <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
