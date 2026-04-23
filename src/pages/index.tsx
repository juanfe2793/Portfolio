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
          <div className={styles.heroSubtitle}>Principal Platform Engineer · Cloud & AI Infrastructure</div>
          <p className={styles.heroTagline}>
            I build platform infrastructure at organizational scale — reliability engineering, toil elimination, and AI-native systems. 10+ years. 3M+ RPS.
          </p>
          <div className={styles.heroActions}>
            <Link className={clsx('button button--primary button--lg')} to="/docs/case-studies">
              View Case Studies →
            </Link>
            <Link className={clsx('button button--outline button--lg', styles.ctaSecondary)} to="/docs/portfolio/cv">
              Read CV
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
            I design platform infrastructure that makes reliability a product feature, not an afterthought.
            At Twilio, that meant scaling an API gateway to 3M RPS, eliminating entire on-call rotations through automation,
            and building the DNS backbone for 100+ enterprise customers.
            Now I'm applying that same systems thinking to AI-native infrastructure.
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
      description="Personal portfolio and technical blog of Juan Felipe Gómez Manzanares — Principal Platform Engineer designing resilient systems at organizational scale.">
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
