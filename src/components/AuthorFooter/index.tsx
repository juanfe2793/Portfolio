import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface Author {
  name?: string;
  title?: string;
  url?: string;
  imageURL?: string;
}

interface AuthorFooterProps {
  authors?: Author[];
}

export default function AuthorFooter({ authors }: AuthorFooterProps) {
  if (!authors || authors.length === 0) return null;

  return (
    <div className={styles.authorFooterContainer}>
      <div className={styles.authorFooterHeader}>About the Author{authors.length > 1 ? 's' : ''}</div>
      <div className={styles.authorList}>
        {authors.map((author, index) => (
          <div key={index} className={styles.authorCard}>
            {author.imageURL && (
              <img src={author.imageURL} alt={author.name || 'Author'} className={styles.authorImage} />
            )}
            <div className={styles.authorInfo}>
              {author.url ? (
                <Link to={author.url} className={styles.authorNameLink}>
                  <h4 className={styles.authorName}>{author.name || 'Anonymous'}</h4>
                </Link>
              ) : (
                <h4 className={styles.authorName}>{author.name || 'Anonymous'}</h4>
              )}
              {author.title && <div className={styles.authorTitle}>{author.title}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
