import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Link from '@docusaurus/Link';
import styles from './ImpactMatrix.module.css';

type MetricItem = {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  description: string;
  href?: string;
};

const metrics: MetricItem[] = [
  {
    label: 'Scale',
    value: 3,
    suffix: 'M+',
    description: 'RPS on API Gateway',
    href: '/docs/case-studies/api-gateway',
  },
  {
    label: 'Availability',
    value: 99.999,
    decimals: 3,
    suffix: '%',
    description: 'Uptime SLA achieved',
    href: '/docs/case-studies/api-gateway',
  },
  {
    label: 'Hosted Zones',
    value: 100,
    suffix: '+',
    description: 'DNS Management',
    href: '/docs/case-studies/dns-modernization',
  },
  {
    label: 'Toil Reduction',
    value: 80,
    suffix: '%',
    description: 'Less manual overhead',
    href: '/docs/case-studies/dns-modernization',
  },
  {
    label: 'Experience',
    value: 10,
    suffix: '+',
    description: 'Years in Cloud Infra',
    href: '/docs/portfolio/cv',
  },
];

export default function ImpactMatrix() {
  const isBrowser = useIsBrowser();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.matrixContainer} ref={ref}>
      <div className={styles.bentoGrid}>
        {metrics.map((metric, idx) => {
          const inner = (
            <>
              <span className={styles.label}>{metric.label}</span>
              <div className={styles.value}>
                {isBrowser && inView ? (
                  <CountUp
                    start={0}
                    end={metric.value}
                    duration={2.5}
                    decimals={metric.decimals || 0}
                    prefix={metric.prefix || ''}
                    suffix={metric.suffix || ''}
                    separator=","
                  />
                ) : (
                  `${metric.prefix || ''}${metric.value}${metric.suffix || ''}`
                )}
              </div>
              <p className={styles.description}>{metric.description}</p>
            </>
          );
          return metric.href ? (
            <Link key={idx} to={metric.href} className={`${styles.glassPanel} ${styles.glassPanelLink}`}>
              {inner}
            </Link>
          ) : (
            <div key={idx} className={styles.glassPanel}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
