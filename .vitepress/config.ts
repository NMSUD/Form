import * as fs from 'fs';
import { defineConfig } from 'vitepress';
import { head } from './config.head';
import { nav } from './config.navbar';
import { sidebar } from './config.sidebar';

export default defineConfig({
  title: 'NMSUD Form',
  description: 'A custom solution for capturing data for the yearly Unification Days event',
  srcExclude: ['**/README.md', '**/TODO*.md'],
  lang: 'en-GB',
  head: head,
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: nav,
    sidebar: sidebar,
    search: { provider: 'local' },
    editLink: {
      pattern: 'https://github.com/NMSUD/Form/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/NMSUD',
        ariaLabel: 'Github Org',
      },
    ],
    footer: {
      message: 'Released under the GNU General Public License v3.0.',
      copyright: 'Copyright © 2024-present NMSUD',
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  sitemap: {
    hostname: 'https://' + fs.readFileSync('./public/CNAME', 'utf8'),
    lastmodDateOnly: true,
  },
  rewrites: {
    'docs/index.md': 'index.md',
  },
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
    // ignore all links include "/coverage/""
    /\/coverage\//,
    /nmsassistant.com/,
    /nmscd.com/,
    /nmsud.com/,
    /img.shields.io/,
  ],
});
