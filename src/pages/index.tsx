import type { ReactNode } from 'react';
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
import FeaturedProjects from '@site/src/components/FeaturedProjects';

import styles from './index.module.css';

function HeroSection() {
  const avatarSrc = useBaseUrl('/img/avatar.jpg');
  return (
    <section className={clsx(styles.hero, 'container')}>
      <div className={styles.heroGrid}>
        <div className={styles.heroLeft}>
          <Heading as="h1" className={styles.heroName}>
            Juan Felipe<br />Gómez Manzanares
          </Heading>
          <div className={styles.heroSubtitle}>Staff Software Engineer · Cloud Architecture</div>
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
      <div className="section-header">
        <span className="section-label">About</span>
      </div>
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
          <p>
            I am deeply passionate about maximizing product resilience and am actively exploring the{' '}
            <strong>integration of AI</strong> into cloud infrastructure processes
            — specifically by developing custom <strong>Claude skills and plugins</strong>
            — to drive the next generation of platform engineering.
          </p>
        </div>
        <div className={styles.aboutQuote}>
          "My work sits at the intersection of high availability, automated performance, and platform modernization."
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className={clsx(styles.cta, 'container')}>
      <div className={styles.ctaInner}>
        <span className={styles.ctaEyebrow}>Ready to connect?</span>
        <p className={styles.ctaHeading}>
          Let's build something resilient.
        </p>
        <Link className={styles.ctaButton} to="/docs/portfolio/cv">
          <span>View Full CV / Resume</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </Link>
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
        <FeaturedProjects />
        <HomepageFeatures />
        <CtaSection />
      </main>
    </Layout>
  );
}
