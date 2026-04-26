import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface SeriesNavigationProps {
  seriesName?: string;
  prevLink?: string;
  prevTitle?: string;
  nextLink?: string;
  nextTitle?: string;
}

export default function SeriesNavigation({ seriesName, prevLink, prevTitle, nextLink, nextTitle }: SeriesNavigationProps) {
  if (!seriesName) return null;

  return (
    <div className={styles.seriesNavContainer}>
      <h4 className={styles.seriesNavHeader}>Series: {seriesName}</h4>
      <div className={styles.seriesNavLinks}>
        {prevLink ? (
          <Link to={prevLink} className={styles.seriesNavLink}>
            <span className={styles.seriesNavLabel}>&larr; Previous</span>
            <span className={styles.seriesNavTitle}>{prevTitle || 'Previous Post'}</span>
          </Link>
        ) : (
          <div className={styles.seriesNavLinkPlaceholder} />
        )}

        {nextLink ? (
          <Link to={nextLink} className={styles.seriesNavLink} style={{textAlign: 'right'}}>
            <span className={styles.seriesNavLabel}>Next &rarr;</span>
            <span className={styles.seriesNavTitle}>{nextTitle || 'Next Post'}</span>
          </Link>
        ) : (
          <div className={styles.seriesNavLinkPlaceholder} />
        )}
      </div>
    </div>
  );
}
