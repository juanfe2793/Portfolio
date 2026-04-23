import { type ReactNode, useEffect } from 'react';
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

const principles = [
  { title: 'Design for Toil Elimination', body: 'If an engineer is doing it twice, automate it. Toil is the enemy of scale.' },
  { title: 'Every Metric is a Business Outcome', body: 'Reliability, latency, and throughput are not SRE metrics — they are revenue metrics.' },
  { title: 'Reliability is a Product Feature', body: 'Uptime is not an infrastructure concern. It is a product promise to every customer.' },
  { title: 'Systems Eat Heroics', body: 'The goal is an on-call rotation where nobody gets paged, not one where heroes save the day.' },
  { title: 'Platform Teams Ship Products', body: 'Internal developer platforms deserve the same product rigor as customer-facing ones.' },
];

function PrinciplesSection() {
  return (
    <section className={clsx(styles.principles, 'container')}>
      <div className="section-header">
        <span className="section-label">Engineering Principles</span>
      </div>
      <div className={styles.principlesGrid}>
        {principles.map((p) => (
          <div key={p.title} className={styles.principleCard}>
            <h3 className={styles.principleTitle}>{p.title}</h3>
            <p className={styles.principleBody}>{p.body}</p>
          </div>
        ))}
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
    const elements = document.querySelectorAll<HTMLElement>('[data-animate="fadeUp"]');
    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', String(scrolled));
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <Layout
      title="Home"
      description="Personal portfolio and technical blog of Juan Felipe Gómez Manzanares — Principal Platform Engineer designing resilient systems at organizational scale.">
      <HeroSection />
      <main>
        <div className="container" data-animate="fadeUp"><ImpactMatrix /></div>
        <div data-animate="fadeUp"><AboutSection /></div>
        <div data-animate="fadeUp"><PrinciplesSection /></div>
        <AIVision />
        <div data-animate="fadeUp"><FeaturedProjects /></div>
        <HomepageFeatures />
        <CtaSection />
      </main>
    </Layout>
  );
}
