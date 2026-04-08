import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import SkillBadge from '@site/src/components/SkillBadge';
import ImpactMatrix from '@site/src/components/ImpactMatrix';
import AIVision from '@site/src/components/AIVision';
import SocialLinks from '@site/src/components/SocialLinks';

import styles from './index.module.css';

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  link: string;
};

const ProjectList: ProjectItem[] = [
  {
    title: 'Cloud Native API Gateway',
    description:
      'Architected and implemented a Domain Gateway Infrastructure using Kong. Developed Terraform modules for standardized deployment, configuration management and internal custom plugins testing and delivery. Enabled cross-domain connectivity with TLS/gRPC support.',
    tags: ['3M+ RPS', '99.999% Availability', 'Kong', 'Terraform'],
    link: '/docs/case-studies/api-gateway',
  },
  {
    title: 'Twilio-wide DNS Modernization',
    description:
      'Architected and implemented a centralized DNS boundary for the One Twilio Kubernetes platform. This agnostic architecture supports multi-cluster/multi-region deployments and simplifies service discovery.',
    tags: ['100+ Hosted Zones', '80% Less Ops Burnout', 'Multi-Region'],
    link: '/docs/case-studies/dns-modernization',
  },
  {
    title: 'Automated Observability & Load Testing',
    description:
      'Standardized platform observability with OpenTelemetry and k6, enabling data-driven performance optimizations across all Twilio Kubernetes platform services.',
    tags: ['OpenTelemetry', 'k6', 'Helm'],
    link: '/docs/case-studies/observability-load-testing',
  },
];

function HeroSection() {
  const avatarSrc = useBaseUrl('/img/avatar.jpg');
  return (
    <section className={clsx(styles.hero, 'container')}>
      <div className={styles.heroGrid}>
        <div className={styles.heroLeft}>
          <div className={styles.eyebrow}>EXECUTIVE COMMAND</div>
          <Heading as="h1" className={styles.heroName}>
            Juan Felipe<br />Gómez Manzanares
          </Heading>
          <div className={styles.heroSubtitle}>Principal Software Engineer · Cloud Architecture</div>
          <p className={styles.heroTagline}>
            Driving organizational impact through high-scale, resilient cloud infrastructure and AI-driven platform engineering.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.heroCta} to="/docs/portfolio/cv">
              [ View Strategic CV → ]
            </Link>
            <SocialLinks />
          </div>
        </div>
        <div className={styles.heroRight}>
          <figure className={styles.avatarFigure}>
            <img src={avatarSrc} alt="Juan Felipe Gómez" />
            <figcaption>Executive Profile — 2026</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={clsx(styles.about, 'container')}>
      <div className={styles.aboutGrid}>
        <div className={styles.eyebrow}>ABOUT</div>
        <div className={styles.aboutContent}>
          <div className={styles.proseSection}>
            <p>
              Hello! I am a <strong>Software Infrastructure Engineer</strong> with over{' '}
              <strong>10 years of experience</strong> driving the lifecycle of Compute and
              Network infrastructure, from on-premise data centers to massive-scale cloud
              environments.
            </p>
            <p>
              Currently operating as a Staff Software Engineer at Twilio, I lead the design,
              implementation, and scaling of mission-critical cloud architectures. I focus on
              designing resilient, high-traffic architectures with an emphasis on{' '}
              <strong>reliability engineering</strong>, <strong>operational excellence</strong>,
              and <strong>strategic infrastructure leadership</strong>. My expertise lies in{' '}
              <strong>API Gateways</strong> (Kong), <strong>Service Mesh</strong> (Istio,
              Envoy), <strong>Kubernetes</strong> (EKS), and <strong>AWS</strong>.
            </p>
          </div>
          <div className={styles.aboutQuote}>
            "My work sits at the intersection of high availability, automated performance, and platform modernization."
          </div>
          <div className={styles.proseSection}>
            <p>
              I am deeply passionate about maximizing product resilience and am actively exploring the{' '}
              <strong>integration of AI</strong> into cloud infrastructure processes
              — specifically by developing custom <strong>Claude skills and plugins</strong>
              — to drive the next generation of platform engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className={clsx(styles.projects, 'container')}>
      <div className={styles.projectsList}>
        <div className={styles.eyebrow}>SELECTED WORK</div>
        {ProjectList.map((project, idx) => (
          <div key={idx} className={styles.projectRow}>
            <div className={styles.projectIndex}>0{idx + 1}</div>
            <div className={styles.projectMain}>
              <Heading as="h3" className={styles.projectTitle}>{project.title}</Heading>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <SkillBadge key={tag} name={tag} variant="tag" />
                  ))}
                </div>
                <Link className={styles.projectLink} to={project.link}>
                  Deep Dive →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={clsx(styles.cta, 'container')}>
      <div className={styles.ctaGrid}>
        <div className={styles.eyebrow}>COLOPHON</div>
        <div className={styles.colophon}>
          <p>
            Set in Inter and JetBrains Mono. Built with Docusaurus on a quiet Sunday.
          </p>
          <Link className={styles.ctaLink} to="/docs/portfolio/cv">
            View My Full CV / Resume →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="Personal portfolio and technical blog of Juan Felipe Gómez Manzanares — Staff Software Engineer at Twilio">
      <HeroSection />
      <main>
        <div className="container"><ImpactMatrix /></div>
        <AboutSection />
        <div className="container"><AIVision /></div>
        <HomepageFeatures />
        <ProjectsSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
