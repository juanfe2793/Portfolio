import React from 'react';
import Link from '@docusaurus/Link';
import SkillBadge from '@site/src/components/SkillBadge';
import type { Project } from '@site/src/data/projects';
import styles from './styles.module.css';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <div className={styles.diagramWrapper} aria-label={project.diagram.label}>
        <div className={styles.diagramFlow}>
          {project.diagram.nodes.map((node, i) => (
            <React.Fragment key={node}>
              <span className={styles.diagNode}>{node}</span>
              {i < project.diagram.nodes.length - 1 && (
                <span className={styles.diagArrow} aria-hidden="true">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <span className={styles.diagramLabel}>{project.diagram.label}</span>
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
