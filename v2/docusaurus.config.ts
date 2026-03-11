import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Juan Felipe Gomez',
  tagline: 'Staff Software Engineer',
  favicon: 'img/favicon.ico',

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
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
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
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Juan Felipe Gomez',
      logo: {
        alt: 'Juan Felipe Gomez Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
        },
        {
          to: '/projects',
          label: 'Architecture Hub (Projects)',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Engineering Blog',
          position: 'left',
        },
        {
          to: '/guides',
          label: 'Digital Garden (Guides)',
          position: 'left',
        },
        {
          to: '/resume',
          label: 'Resume',
          position: 'left',
        },
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
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/juanfe2793/Portfolio',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Juan Felipe Gomez. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
