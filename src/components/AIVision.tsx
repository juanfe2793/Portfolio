import React from 'react';
import styles from './AIVision.module.css';
import Heading from '@theme/Heading';

export default function AIVision() {
  return (
    <section className={styles.container}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">AI-Native Infrastructure</span>
        </div>
        <div className={styles.layoutGrid}>
          <div className={styles.mainBlock}>
            <Heading as="h2" className={styles.title}>
              Turning Runbooks into Autonomous Agents
            </Heading>
            <p className={styles.text}>
              The next tier of platform engineering eliminates cognitive overhead the way the last tier eliminated manual ops.
              I build custom Claude skills and MCP integrations that automate cloud architecture decisions — diagnosing incidents,
              generating Terraform from intent, and running self-healing Kubernetes workflows without human escalation.
            </p>
            <p className={styles.text}>
              Cognitive load is toil in disguise. The goal is a platform where the on-call runbook has no steps left to execute.
            </p>
          </div>
          <div className={styles.sideBlocks}>
            <div className={styles.glassPanel}>
              <span className={styles.label}>Current Build</span>
              <div className={styles.content}>Agentic K8s Incident Response</div>
            </div>
            <div className={styles.glassPanel}>
              <span className={styles.label}>Tooling</span>
              <div className={styles.content}>Claude AI · MCP · Terraform</div>
            </div>
            <div className={styles.glassPanel}>
              <span className={styles.label}>North Star</span>
              <div className={styles.content}>Zero-Touch Self-Healing Infra</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
