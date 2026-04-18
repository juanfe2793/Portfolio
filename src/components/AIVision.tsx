import React from 'react';
import styles from './AIVision.module.css';
import Heading from '@theme/Heading';

export default function AIVision() {
  return (
    <section className={styles.container}>
      <div className="section-header">
        <span className="section-label">AI Vision</span>
      </div>
      <div className={styles.layoutGrid}>
        <div className={styles.mainBlock}>
          <Heading as="h2" className={styles.title}>
            The Next Generation of Platform Engineering
          </Heading>
          <p className={styles.text}>
            I am defining the intersection of LLMs and Infrastructure. By developing custom Claude skills
            and plugins, I am automating the cognitive load of cloud architecture, transforming
            operational runbooks into autonomous agents.
          </p>
        </div>
        <div className={styles.sideBlocks}>
          <div className={styles.glassPanel}>
            <span className={styles.label}>Current Focus</span>
            <div className={styles.content}>Agentic Workflows for K8s</div>
          </div>
          <div className={styles.glassPanel}>
            <span className={styles.label}>Tooling</span>
            <div className={styles.content}>Claude AI / MCP / Terraform</div>
          </div>
          <div className={styles.glassPanel}>
            <span className={styles.label}>Goal</span>
            <div className={styles.content}>Self-Healing Infrastructure</div>
          </div>
        </div>
      </div>
    </section>
  );
}
