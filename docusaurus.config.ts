import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as ClientRedirects from '@docusaurus/plugin-client-redirects';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Juan Felipe Gómez',
  tagline: 'Staff Software Engineer · Platform & Reliability',
  favicon: 'img/favicon.svg',

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..500&display=swap',
      type: 'text/css',
    },
  ],

  scripts: [
    {
      src: 'https://plausible.io/js/script.js',
      defer: true,
      'data-domain': 'juanfe2793.github.io',
    },
  ],

  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
    { tagName: 'meta', attributes: { name: 'author', content: 'Juan Felipe Gómez Manzanares' } },
    { tagName: 'meta', attributes: { name: 'twitter:card', content: 'summary_large_image' } },
    { tagName: 'meta', attributes: { name: 'twitter:creator', content: '@juanfe2793' } },
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
          truncateMarker: /(<!--\s*(truncate)\s*-->|{\/\*\s*(truncate)\s*\*\/})/,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            description: 'Dispatches from the Platform Layer - Juan Felipe Gomez Blog',
            copyright: `Copyright © ${new Date().getFullYear()} Juan Felipe Gómez Manzanares.`,
            language: 'en',
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
    image: 'img/social-card.png',
    metadata: [
      { name: 'og:title', content: 'Juan Felipe Gómez — Staff Software Engineer' },
      { name: 'og:description', content: 'Platform infrastructure at organizational scale. Multi-million RPS, five-nines availability, AI-native systems.' },
      { name: 'og:image', content: 'https://juanfe2793.github.io/Portfolio/img/social-card.png' },
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Juan Felipe Gómez — Staff Software Engineer' },
      { name: 'twitter:description', content: 'Platform infrastructure at organizational scale. Multi-million RPS, five-nines availability, AI-native systems.' },
      { name: 'twitter:image', content: 'https://juanfe2793.github.io/Portfolio/img/social-card.png' },
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Juan Felipe Gómez',
      items: [
        { to: '/docs/case-studies', label: 'Work', position: 'right' },
        { to: '/blog', label: 'Writing', position: 'right' },
        { to: '/docs/guides', label: 'Playbook', position: 'right' },
        { to: '/docs/portfolio/cv', label: 'CV', position: 'right' },
      ],
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'yaml', 'hcl'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
