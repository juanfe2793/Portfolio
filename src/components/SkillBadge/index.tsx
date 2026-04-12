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

const LEVEL_LABEL: Record<SkillLevel, string> = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  expert: 'expert',
};

export default function SkillBadge({
  name,
  level,
  icon,
  variant = 'skill',
}: SkillBadgeProps): React.JSX.Element {
  const isTag = variant === 'tag';
  return (
    <span
      className={clsx(
        styles.badge,
        isTag ? styles.tag : level && styles[level],
      )}
      aria-label={level ? `${name} — ${LEVEL_LABEL[level]}` : name}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.name}>{name}</span>
    </span>
  );
}
