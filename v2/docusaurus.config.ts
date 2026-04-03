import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as ClientRedirects from '@docusaurus/plugin-client-redirects';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Juan Felipe Gomez',
  tagline: 'Staff Software Engineer',
  favicon: 'img/favicon.ico',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
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

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Redirects from MkDocs URL structure to Docusaurus paths.
        // Activate each entry after the corresponding content is migrated (Story 1.4+).
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
          editUrl: 'https://github.com/juanfe2793/Portfolio/tree/main/v2/',
        },
        blog: {
          path: 'blog',
          showReadingTime: true,
          truncateMarker: /<!--\s*(truncate)\s*-->/,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/juanfe2793/Portfolio/tree/main/v2/',
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
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'CV / Resume',
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
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: '/docs/portfolio/cv',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/juangomez27',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/juanfe2793',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
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
