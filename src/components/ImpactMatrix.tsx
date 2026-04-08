import React from 'react';
import styles from './ImpactMatrix.module.css';

type MetricItem = {
  label: string;
  value: string;
  description: string;
};

const metrics: MetricItem[] = [
  {
    label: 'Scale',
    value: '3M+ RPS',
    description: 'Architected Domain Gateway for massive scale traffic.',
  },
  {
    label: 'Efficiency',
    value: '80% ↓',
    description: 'Reduction in operational burnout via DNS modernization.',
  },
  {
    label: 'Availability',
    value: '99.999%',
    description: 'Maintaining five-nines for mission-critical cloud infra.',
  },
  {
    label: 'Leadership',
    value: 'Staff+',
    description: 'Defining organizational standards for IaC and SRE.',
  },
];

export default function ImpactMatrix() {
  return (
    <div className={styles.matrixContainer}>
      <div className={styles.bentoGrid}>
        {metrics.map((metric, idx) => (
          <div key={idx} className={styles.glassPanel}>
            <span className={styles.label}>{metric.label}</span>
            <div className={styles.value}>{metric.value}</div>
            <p className={styles.description}>{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
