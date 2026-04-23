import type { ReactNode } from 'react';
import { useEffect } from 'react';
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
            Building Platform Infrastructure<br />at Organizational Scale
          </Heading>
          <div className={styles.heroSubtitle}>Juan Felipe Gómez · Staff Platform Engineer at Twilio</div>
          <p className={styles.heroTagline}>
            Principal platform engineer focused on reliability, toil elimination, and AI-native infrastructure — designing systems that run at 3M+ RPS with five-nines availability.
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
    <section className={clsx(styles.about, styles.fadeUp, 'container')}>
      <div className="section-header">
        <span className="section-label">About</span>
      </div>
      <div className={styles.aboutContent}>
        <div className={styles.proseSection}>
          <p>
            I design platform infrastructure that makes <strong>reliability a product feature</strong>, not an afterthought.
            At Twilio, that meant scaling an API gateway to 3M+ RPS, eliminating entire on-call rotations through automation,
            and building the DNS backbone that underpins 100+ enterprise customer environments across multiple regions.
            Now I'm applying that same systems thinking to <strong>AI-native infrastructure</strong> — turning operational
            runbooks into autonomous agents and making cognitive overhead the next frontier of toil elimination.
          </p>
        </div>
        <div className={styles.aboutQuote}>
          "The highest-leverage platform work makes every team faster without them knowing you exist."
        </div>
      </div>
    </section>
  );
}

const principles = [
  {
    number: '01',
    title: 'Reliability is a feature',
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
          Currently at Twilio · Open to senior platform advisory roles
        </p>
        <a href="mailto:juanfe.2793@gmail.com" className={styles.ctaEmail}>
          juanfe.2793@gmail.com
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
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.08 }
    );
    document.querySelectorAll(`.${styles.fadeUp}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout
      title="Home"
      description="Personal portfolio and technical blog of Juan Felipe Gómez Manzanares — Staff Software Engineer at Twilio">
      <HeroSection />
      <main>
        <div className={clsx('container', styles.fadeUp)}><ImpactMatrix /></div>
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
