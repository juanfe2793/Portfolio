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
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500&display=swap',
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
          label: "The Principal's Playbook",
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
            { label: "The Principal's Playbook", to: '/docs/guides' },
            { label: 'Blog', to: '/blog' },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'GitHub', href: 'https://github.com/juanfe2793' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/juangomez27' },
            { label: 'Email', href: 'mailto:hello@felipegomez.me' },
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
