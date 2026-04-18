import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as ClientRedirects from '@docusaurus/plugin-client-redirects';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Juan Felipe Gomez',
  tagline: 'Staff Software Engineer',
  favicon: 'img/favicon.svg',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500&display=swap',
      type: 'text/css',
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://juanfe2793.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Portfolio/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'juanfe2793', // Usually your GitHub org/user name.
  projectName: 'Portfolio', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/guides/kubectl_commands/', to: '/docs/guides/kubectl_commands/' },
          { from: '/guides/helm_commands/', to: '/docs/guides/helm_commands/' },
          { from: '/guides/', to: '/docs/guides/' },
          { from: '/guides/bash_profile/', to: '/docs/guides/bash_profile/' },
          { from: '/guides/aws_cli_commands/', to: '/docs/guides/aws_cli_commands/' },
          { from: '/guides/linux_commands/', to: '/docs/guides/linux_commands/' },
          { from: '/guides/docker_containerd_commands/', to: '/docs/guides/docker_containerd_commands/' },
          { from: '/guides/git_commands/', to: '/docs/guides/git_commands/' },
          { from: '/guides/carvel_commands/', to: '/docs/guides/carvel_commands/' },
          { from: '/guides/saltstack_commands/', to: '/docs/guides/saltstack_commands/' },
          { from: '/portfolio/cv/', to: '/docs/portfolio/cv/' },
        ],
      } satisfies ClientRedirects.Options,
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/juanfe2793/Portfolio/tree/main/',
        },
        blog: {
          path: 'blog',
          showReadingTime: true,
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/juanfe2793/Portfolio/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'Juan Felipe Gomez',
      logo: {
        alt: 'Juan Felipe Gomez Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/portfolio/cv',
          position: 'left',
          label: 'CV / Resume',
        },
        {
          to: '/docs/case-studies',
          position: 'left',
          label: 'Architecture Hub',
        },
        {
          to: '/docs/guides',
          position: 'left',
          label: "The Staff's Playbook",
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/juanfe2793/Portfolio',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Navigation',
          items: [
            { label: 'CV / Resume', to: '/docs/portfolio/cv' },
            { label: 'Architecture Hub', to: '/docs/case-studies' },
            { label: "The Staff's Playbook", to: '/docs/guides' },
            { label: 'Blog', to: '/blog' },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              html: `<a href="https://github.com/juanfe2793" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-social-link" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg><span>GitHub</span></a>`,
            },
            {
              html: `<a href="https://linkedin.com/in/juangomez27" target="_blank" rel="noopener noreferrer" class="footer__link-item footer-social-link" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span>LinkedIn</span></a>`,
            },
            {
              html: `<a href="mailto:hello@felipegomez.me" class="footer__link-item footer-social-link" aria-label="Email"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Email</span></a>`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Juan Felipe Gómez Manzanares.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'yaml', 'hcl'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
