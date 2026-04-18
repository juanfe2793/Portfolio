import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ExpertiseItem = {
  title: string;
  description: string;
};

const ExpertiseList: ExpertiseItem[] = [
  {
    title: 'Service Communication & API Management',
    description:
      'Architecting scalable domain gateway infrastructures using Kong and Service Mesh technologies (Istio, Envoy).',
  },
  {
    title: 'Public Ingress Gateway',
    description:
      'Implementing secure Kubernetes Services exposure using AWS LB Ingress Controller, external-dns, ACM certificates, and Route53 with Zero-Trust Connectivity.',
  },
  {
    title: 'Network Reliability & Modernization',
    description:
      'Driving global high-resilience DNS modernization, agnostic DNS boundary for multi-region support and enabling Domain Driven Design (DDD).',
  },
  {
    title: 'Observability & Performance',
    description:
      'Implementing robust telemetry (OpenTelemetry sidecars) and building automated performance testing ecosystems (k6).',
  },
  {
    title: 'Infrastructure as Code & Orchestration',
    description:
      'Managing complex, multi-cluster environments utilizing Kubernetes, Terraform, Helm, and Carvel.',
  },
];

function Expertise({title, description, index}: ExpertiseItem & { index: number }) {
  return (
    <div className={styles.expertiseRow}>
      <div className={styles.expertiseIndex}>0{index + 1}</div>
      <div className={styles.expertiseMain}>
        <strong className={styles.expertiseTitle}>{title}</strong>
        <span className={styles.expertiseDesc}>{description}</span>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={clsx(styles.expertiseSection, 'container')}>
      <div className="section-header">
        <span className="section-label">Domains</span>
      </div>
      <div className={styles.expertiseLedger}>
        {ExpertiseList.map((props, idx) => (
          <Expertise key={idx} {...props} index={idx} />
        ))}
      </div>
    </section>
  );
}

// Note: clsx import needed if using it, or just use string template
import clsx from 'clsx';
