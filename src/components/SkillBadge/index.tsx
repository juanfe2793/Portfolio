import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface SkillBadgeProps {
  name: string;
  level?: SkillLevel;
  icon?: string;
  variant?: 'skill' | 'tag';
}

const LEVEL_COUNT: Record<SkillLevel, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

export default function SkillBadge({
  name,
  level = 'advanced',
  icon,
  variant = 'skill'
}: SkillBadgeProps): React.JSX.Element {
  const filled = LEVEL_COUNT[level];
  return (
    <span className={clsx(styles.badge, variant === 'tag' && styles.tag)} aria-label={`${name} skill level ${level}`}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.name}>{name}</span>
      {variant === 'skill' && (
        <span className={styles.dots} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={clsx(styles.dot, i < filled && styles.dotFilled)}
            />
          ))}
        </span>
      )}
    </span>
  );
}
