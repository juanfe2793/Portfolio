import React from 'react';
import Link from '@docusaurus/Link';
import SkillBadge from '@site/src/components/SkillBadge';
import type { Project } from '@site/src/data/projects';
import styles from './styles.module.css';

function SystemDiagram({ nodes }: { nodes: string[] }) {
  return (
    <div className={styles.diagram}>
      {nodes.map((node, i) => (
        <React.Fragment key={node}>
          <span className={styles.diagNode}>{node}</span>
          {i < nodes.length - 1 && <span className={styles.diagArrow} aria-hidden="true">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={styles.card}>
      <SystemDiagram nodes={project.diagram.nodes} />

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{project.title}</h3>

        <dl className={styles.psi}>
          <div className={styles.psiRow}>
            <dt className={styles.psiLabel}>Problem</dt>
            <dd className={styles.psiText}>{project.problem}</dd>
          </div>
          <div className={styles.psiRow}>
            <dt className={styles.psiLabel}>Decision</dt>
            <dd className={styles.psiText}>{project.decision}</dd>
          </div>
          <div className={styles.psiRow}>
            <dt className={styles.psiLabel}>Impact</dt>
            <dd className={styles.psiText}>{project.impact}</dd>
          </div>
        </dl>

        <div className={styles.metrics}>
          {project.metrics.map((metric) => (
            <span key={metric} className={styles.metricItem}>{metric}</span>
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
