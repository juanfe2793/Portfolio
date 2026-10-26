import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Metric = {
  value: string;
  label: string;
  href: string;
};

const metrics: Metric[] = [
  { value: 'Millions', label: 'Requests / sec on the API gateway', href: '/docs/case-studies/api-gateway' },
  { value: '99.999%', label: 'Gateway availability target', href: '/docs/case-studies/api-gateway' },
  { value: '~80%', label: 'DNS operational toil removed', href: '/docs/case-studies/dns-modernization' },
  { value: '10+', label: 'Years building cloud infrastructure', href: '/docs/portfolio/cv' },
];

export default function ImpactLedger(): ReactNode {
  return (
    <ul className={styles.ledger} aria-label="Impact highlights">
      {metrics.map((m) => (
        <li key={m.label} className={styles.cell}>
          <Link to={m.href} className={styles.link}>
            <span className={styles.value}>{m.value}</span>
            <span className={styles.label}>{m.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
