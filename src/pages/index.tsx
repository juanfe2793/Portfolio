import { type ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ImpactLedger from '@site/src/components/ImpactLedger';
import WorkIndex from '@site/src/components/WorkIndex';
import SocialLinks from '@site/src/components/SocialLinks';

import styles from './index.module.css';

const EMAIL = 'hello@felipegomez.me';

function SectionHeader({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <header className={styles.sectionHeader}>
      <span className="section-label">{label}</span>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
    </header>
  );
}

function Hero() {
  const avatarSrc = useBaseUrl('/img/avatar.jpg');
  return (
    <section className={clsx(styles.hero, 'container')} aria-labelledby="hero-title">
      <span className="eyebrow">Staff Software Engineer · Platform &amp; Reliability · Twilio</span>
      <Heading as="h1" id="hero-title" className={styles.heroTitle}>
        I design the platforms <em>other engineers</em> build on.
      </Heading>
      <p className={styles.heroLede}>
        For more than a decade I have built cloud infrastructure where reliability is a product
        feature. At Twilio I lead platform work that turns one team's solution into every
        team's foundation, from a multi-million RPS gateway to AI-native operations.
      </p>
      <div className={styles.heroActions}>
        <Link className={styles.primaryCta} to="/docs/case-studies">
          Read the case studies
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
        <Link className={styles.textCta} to="/docs/portfolio/cv">
          View CV
        </Link>
      </div>
      <div className={styles.byline}>
        <img src={avatarSrc} alt="" width={48} height={48} className={styles.avatar} />
        <div className={styles.bylineText}>
          <span className={styles.bylineName}>Juan Felipe Gómez Manzanares</span>
          <span className={styles.bylineRole}>Staff Software Engineer, Twilio</span>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}

const principles = [
  {
    title: 'Reliability is a deliverable',
    body: 'Five-nines is an engineering commitment, not an aspiration. Every architectural decision is weighed against availability and fault tolerance.',
  },
  {
    title: 'Eliminate toil by design',
    body: 'If a human performs an operation repeatedly, it is a bug. Paved roads, Terraform modules and runbook-to-agent pipelines are the fix.',
  },
  {
    title: 'Platforms over projects',
    body: 'The highest-leverage work multiplies across the organization, not within a single service.',
  },
  {
    title: 'AI as a force multiplier',
    body: 'Claude skills and MCP integrations are the next tier of platform engineering. Cognitive overhead is toil in disguise.',
  },
];

const domains = [
  'API gateways & service mesh',
  'Public ingress & zero-trust',
  'DNS & network reliability',
  'Observability & performance',
  'IaC & multi-cluster orchestration',
];

function Leadership() {
  return (
    <section className={clsx(styles.section, 'container')} aria-labelledby="leadership-title" data-reveal>
      <SectionHeader label="Leadership & Influence" title="Measured by what other teams no longer have to do." id="leadership-title" />
      <div className={styles.leadershipGrid}>
        <div className={styles.narrative}>
          <ul className={styles.evidence} aria-label="Leadership highlights">
            <li>
              <span className={styles.evidenceValue}>Millions</span>
              <span className={styles.evidenceLabel}>RPS across the gateway platform I built</span>
            </li>
            <li>
              <span className={styles.evidenceValue}>Team lead</span>
              <span className={styles.evidenceLabel}>Leading the Kubernetes platform team</span>
            </li>
            <li>
              <span className={styles.evidenceValue}>Promotions</span>
              <span className={styles.evidenceLabel}>Engineers mentored to the next level</span>
            </li>
          </ul>
          <p>
            I built the <strong>high-throughput gateway infrastructure</strong> that carries
            cross-service communication at multi-million requests per second. The
            Kong-based gateway on top of it became the <strong>organizational standard</strong> for
            cross-domain connectivity.
          </p>
          <p>
            I lead the Kubernetes platform team. Mentoring is part of the job, not a
            side project: through hands-on mentoring,{' '}
            <strong>engineers on the team have been promoted to the next level</strong>.
          </p>
          <p>
            I treat the platform as a product. Mission-critical services get{' '}
            <strong>plug-and-play tooling and infrastructure</strong>, from self-service Terraform
            modules to a DNS boundary that removed roughly 80% of operational toil, so teams ship on a
            paved road instead of a ticket queue.
          </p>
          <blockquote className={styles.pullQuote}>
            The highest-leverage platform work makes every team faster and more reliable
            without them ever knowing you exist.
          </blockquote>
        </div>
        <div className={styles.operate}>
          <h3 className={styles.operateTitle}>How I operate</h3>
          <ol className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.title}>
                <span className={styles.principleNumber}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <h3 className={styles.operateTitle}>Domains</h3>
          <ul className={styles.domains}>
            {domains.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Now() {
  return (
    <section className={clsx(styles.section, 'container')} aria-labelledby="now-title" data-reveal>
      <div className={styles.nowCard}>
        <div>
          <span className={styles.nowEyebrow}>
            <span className={styles.signalDot} aria-hidden="true" />
            Now
          </span>
          <h2 id="now-title" className={styles.nowTitle}>
            Turning runbooks into autonomous agents.
          </h2>
          <p className={styles.nowBody}>
            The next tier of platform engineering removes cognitive overhead the way the last
            tier removed manual ops. I build Claude skills and MCP integrations that diagnose
            incidents, generate Terraform from intent and run self-healing Kubernetes workflows.
          </p>
        </div>
        <dl className={styles.nowFacts}>
          <div>
            <dt>Current build</dt>
            <dd>Agentic Kubernetes incident response</dd>
          </div>
          <div>
            <dt>Tooling</dt>
            <dd>Claude · MCP · Terraform</dd>
          </div>
          <div>
            <dt>North star</dt>
            <dd>Zero-touch, self-healing infrastructure</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function WritingAndContact() {
  return (
    <section className={clsx(styles.section, 'container')} aria-labelledby="writing-title" data-reveal>
      <SectionHeader label="Writing" title="Notes from the platform layer." id="writing-title" />
      <div className={styles.writingGrid}>
        <Link to="/blog" className={styles.writingCard}>
          <span className={styles.writingKind}>Blog</span>
          <span className={styles.writingTitle}>Dispatches from the Platform Layer</span>
          <span className={styles.writingBody}>
            Essays on SRE, platform strategy and the negotiation between feature teams and the
            people who keep the lights on.
          </span>
        </Link>
        <Link to="/docs/guides" className={styles.writingCard}>
          <span className={styles.writingKind}>Playbook</span>
          <span className={styles.writingTitle}>The Staff's Playbook</span>
          <span className={styles.writingBody}>
            Operational standards and command references for Kubernetes, AWS, Helm and the rest
            of the paved road.
          </span>
        </Link>
      </div>
      <div className={styles.contact}>
        <h2 className={styles.contactTitle}>
          Let's talk about platforms that scale organizations.
        </h2>
        <a href={`mailto:${EMAIL}`} className={styles.contactEmail}>
          {EMAIL}
        </a>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Only hide sections that start below the fold, so above-the-fold content never flashes.
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight
    );
    targets.forEach((el) => el.setAttribute('data-reveal', 'pending'));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-reveal', 'shown');
            observer.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -10% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout
      title="Staff Software Engineer"
      description="Juan Felipe Gómez Manzanares, Staff Software Engineer at Twilio. Platform infrastructure, reliability and AI-native operations at organizational scale.">
      <main className={styles.page}>
        <Hero />
        <div className="container">
          <ImpactLedger />
        </div>
        <section className={clsx(styles.section, 'container')} aria-labelledby="work-title">
          <SectionHeader label="Selected Work" title="Platforms that became the standard." id="work-title" />
          <WorkIndex />
          <Link to="/docs/case-studies" className={styles.sectionLink}>
            All case studies
          </Link>
        </section>
        <Leadership />
        <Now />
        <WritingAndContact />
      </main>
    </Layout>
  );
}
