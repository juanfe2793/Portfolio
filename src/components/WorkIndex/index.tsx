import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { projects } from '@site/src/data/projects';
import styles from './styles.module.css';

type WorkIndexProps = {
  headingLevel?: 'h2' | 'h3';
};

export default function WorkIndex({ headingLevel = 'h3' }: WorkIndexProps): ReactNode {
  const Heading = headingLevel;
  return (
    <ol className={styles.list}>
      {projects.map((project, idx) => (
        <li key={project.link} className={styles.item}>
          <Link to={project.link} className={styles.row}>
            <span className={styles.number}>{String(idx + 1).padStart(2, '0')}</span>
            <div className={styles.main}>
              <div className={styles.meta}>
                <span>{project.duration}</span>
                <span aria-hidden="true">·</span>
                <span>{project.scope}</span>
              </div>
              <Heading className={styles.title}>{project.title}</Heading>
              <p className={styles.impact}>{project.impact}</p>
              <dl className={styles.detail}>
                <div>
                  <dt>Problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt>Decision</dt>
                  <dd>{project.decision}</dd>
                </div>
              </dl>
              <ul className={styles.metrics} aria-label="Key metrics">
                {project.metrics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
