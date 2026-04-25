import { type ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
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
            Building Platform Infrastructure<br />for Global-Scale, High-Throughput Systems
          </Heading>
          <div className={styles.heroSubtitle}>Staff Software & Platform Engineer · Cloud & AI Infrastructure</div>
          <p className={styles.heroTagline}>
            10+ years experience Engineer, I architect and build platform infrastructure at the intersection of <strong>reliability, security, scalability, AI</strong>.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.heroCta} to="/docs/case-studies">
              [ Explore Case Studies → ]
            </Link>
            <Link className={styles.heroCtaSecondary} to="/docs/portfolio/cv">
              [ View CV ]
            </Link>
          </div>
          <div className={styles.heroSocial}>
            <SocialLinks />
          </div>
        </div>
        <div className={styles.heroRight}>
          <figure className={styles.avatarFigure}>
            <img src={avatarSrc} alt="Juan Felipe Gómez Manzanares" />
            <figcaption>
              <span className={styles.avatarName}>Juan Felipe Gómez Manzanares</span>
              <span className={styles.avatarCaption}>Executive Profile — 2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={clsx(styles.about, styles.fadeUp, 'container')}>
      <div className="section-header">
        <span className="section-label">About</span>
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.proseSection}>
          <p>
            I architect and build platforms that make <strong>reliability a product feature</strong>, not an afterthought.
            At Twilio, that meant scaling an API gateway to 3M+ RPS, reducing on-call toil and burnout, and delivering 99.999% availability.
            Now I'm applying that same systems thinking to <strong>AI-native infrastructure</strong> — turning operational
            runbooks into autonomous agents and making cognitive overhead the next frontier of toil elimination.
          </p>
        </div>
        <div className={styles.aboutQuote}>
          "The highest-leverage platform work makes every team faster and more reliable without them ever knowing you exist."
        </div>
      </div>
    </section>
  );
}

const principles = [
  {
    number: '01',
    title: 'Reliability is a MUST',
    body: 'Five-nines SLAs are not aspirations — they are engineering deliverables. Every architectural decision is evaluated against its impact on availability and fault tolerance.',
  },
  {
    number: '02',
    title: 'Eliminate toil by design',
    body: 'If an operation requires a human to perform it repeatedly, it is a bug. Automated paved roads, Terraform modules, and runbook-to-agent pipelines are the answer.',
  },
  {
    number: '03',
    title: 'Platforms over projects',
    body: 'One team\'s solution should become every team\'s foundation. The highest-leverage work multiplies across the organization, not within a single service.',
  },
  {
    number: '04',
    title: 'AI as a force multiplier',
    body: 'Custom Claude skills and MCP integrations are not experiments — they are the next tier of platform engineering. Cognitive overhead is toil in disguise.',
  },
];

function PrinciplesSection() {
  return (
    <section className={clsx(styles.principles, styles.fadeUp)}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Engineering Principles</span>
        </div>
        <div className={styles.principlesGrid}>
          {principles.map((p) => (
            <div key={p.number} className={styles.principleCard}>
              <span className={styles.principleNumber}>{p.number}</span>
              <h3 className={styles.principleTitle}>{p.title}</h3>
              <p className={styles.principleBody}>{p.body}</p>
            </div>
          ))}
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
        <h2 className={styles.ctaHeading}>
          Let's build something resilient.
        </h2>
        <p className={styles.ctaContext}>
          Currently at Twilio
        </p>
        <a href="mailto:hello@felipegomez.me" className={styles.ctaEmail}>
          hello@felipegomez.me
        </a>
        <div className={styles.ctaSocial}>
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle(styles.visible, e.isIntersecting)),
      { threshold: 0.08 }
    );
    document.querySelectorAll(`.${styles.fadeUp}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout
      title="Home"
      description="Personal portfolio and technical blog of Juan Felipe Gómez Manzanares — Principal Platform Engineer designing resilient systems at organizational scale.">
      <HeroSection />
      <main>
        <div className="container"><ImpactMatrix /></div>
        <AboutSection />
        <AIVision />
        <FeaturedProjects />
        <HomepageFeatures />
        <PrinciplesSection />
        <CtaSection />
      </main>
    </Layout>
  );
}
