import React from 'react';
import clsx from 'clsx';
import ProjectCard from '@site/src/components/ProjectCard';
import { projects } from '@site/src/data/projects';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function FeaturedProjects() {
  return (
    <section className={clsx(styles.featuredProjects, 'container')}>
      <div className={styles.eyebrow}>FEATURED PROJECTS</div>
      <Heading as="h2" className={styles.sectionTitle}>
        Architecture & Infrastructure
      </Heading>
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <div key={idx} className={styles.gridItem}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
