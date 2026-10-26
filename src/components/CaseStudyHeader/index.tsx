import type { ReactNode } from 'react';
import styles from './styles.module.css';

type CaseStudyHeaderProps = {
  number: string;
  role: string;
  duration: string;
  stack: string[];
  impact?: string;
};

export default function CaseStudyHeader({ number, role, duration, stack, impact }: CaseStudyHeaderProps): ReactNode {
  return (
    <div className={styles.header}>
      <dl className={styles.meta}>
        <div>
          <dt>Role</dt>
          <dd>{role}</dd>
        </div>
        <div>
          <dt>Timeline</dt>
          <dd>{duration}</dd>
        </div>
        <div>
          <dt>Case study</dt>
          <dd>{number}</dd>
        </div>
        <div className={styles.stackItem}>
          <dt>Stack</dt>
          <dd>
            <ul className={styles.stack}>
              {stack.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      {impact && (
        <p className={styles.impact}>
          <span className={styles.impactLabel}>Outcome</span>
          {impact}
        </p>
      )}
    </div>
  );
}
