import React from 'react';
import styles from './styles.module.css';

type CaseStudyHeaderProps = {
  number: string;
  role: string;
  duration: string;
  stack: string[];
  impact?: string;
};

export default function CaseStudyHeader({ number, role, duration, stack, impact }: CaseStudyHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>{role}</span>
        </span>
        <span className={styles.metaDivider} aria-hidden="true">·</span>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Timeline</span>
          <span className={styles.metaValue}>{duration}</span>
        </span>
        <span className={styles.metaDivider} aria-hidden="true">·</span>
        <span className={styles.metaItem}>
          <span className={styles.metaLabel}>Case Study</span>
          <span className={styles.metaValue}>{number}</span>
        </span>
      </div>
      {impact && (
        <p className={styles.impact}>{impact}</p>
      )}
      <div className={styles.stack}>
        {stack.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
