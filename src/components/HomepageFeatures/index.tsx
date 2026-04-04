import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type ExpertiseItem = {
  icon: string;
  title: string;
  description: string;
};

const ExpertiseList: ExpertiseItem[] = [
  {
    icon: '🌐',
    title: 'Service Communication & API Management',
    description:
      'Architecting scalable domain gateway infrastructures using Kong and Service Mesh technologies (Istio, Envoy).',
  },
  {
    icon: '🔒',
    title: 'Public Ingress Gateway',
    description:
      'Implementing secure Kubernetes Services exposure using AWS LB Ingress Controller, external-dns, ACM certificates, and Route53 with Zero-Trust Connectivity.',
  },
  {
    icon: '📡',
    title: 'Network Reliability & Modernization',
    description:
      'Driving global high-resilience DNS modernization, agnostic DNS boundary for multi-region support and enabling Domain Driven Design (DDD).',
  },
  {
    icon: '📊',
    title: 'Observability & Performance',
    description:
      'Implementing robust telemetry (OpenTelemetry sidecars) and building automated performance testing ecosystems (k6).',
  },
  {
    icon: '⚙️',
    title: 'Infrastructure as Code & Orchestration',
    description:
      'Managing complex, multi-cluster environments utilizing Kubernetes, Terraform, Helm, and Carvel.',
  },
];

function Expertise({icon, title, description}: ExpertiseItem) {
  return (
    <div className={styles.expertiseItem}>
      <div className={styles.expertiseIcon}>{icon}</div>
      <div className={styles.expertiseText}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.expertiseSection}>
      <Heading as="h2" className={styles.sectionTitle}>
        🚀 Core Expertise
      </Heading>
      <div className="container">
        <div className={styles.expertiseGrid}>
          {ExpertiseList.map((props, idx) => (
            <Expertise key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
