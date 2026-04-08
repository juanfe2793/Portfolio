import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import SkillBadge from '@site/src/components/SkillBadge';

export interface TimelineEntry {
  date: string;
  title: string;
  org: string;
  description?: string;
  tags?: string[];
}

export interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps): React.JSX.Element {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry, idx) => (
        <li key={idx} className={styles.entry}>
          <span className={clsx(styles.dot, idx === 0 && styles.current)} aria-hidden="true">
            {idx === 0 ? '▸' : '•'}
          </span>
          <div className={styles.content}>
            <div className={styles.date}>{entry.date}</div>
            <h3 className={styles.title}>{entry.title}</h3>
            <div className={styles.org}>{entry.org}</div>
            {entry.description && <p className={styles.description}>{entry.description}</p>}
            {entry.tags && entry.tags.length > 0 && (
              <div className={styles.tags}>
                {entry.tags.map((tag) => (
                  <SkillBadge key={tag} name={tag} variant="tag" />
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
