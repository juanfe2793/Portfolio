import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import SocialLinks from '@site/src/components/SocialLinks';
import styles from './styles.module.css';

const links = [
  { label: 'Work', to: '/docs/case-studies' },
  { label: 'Writing', to: '/blog' },
  { label: 'Playbook', to: '/docs/guides' },
  { label: 'CV', to: '/docs/portfolio/cv' },
];

export default function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.name}>Juan Felipe Gómez Manzanares</p>
            <p className={styles.role}>Staff Software Engineer · Platform &amp; Reliability</p>
          </div>
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks />
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Juan Felipe Gómez Manzanares</span>
          <span>Code MIT · Content CC BY 4.0</span>
        </div>
      </div>
    </footer>
  );
}
