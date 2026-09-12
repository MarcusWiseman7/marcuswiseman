/**
 * The site's own page list — the one place that knows what URLs exist.
 *
 * Shared by /llms.txt (which prints it as a link index) and /sitemap.xml (which
 * prints it as <loc> entries), so the two can never disagree about what the site
 * contains. Adding a page means adding it here and giving it a routeRule in
 * nuxt.config.ts; forgetting either is the usual way a sitemap starts lying.
 *
 * `summary` is written for a machine choosing which page to fetch — it is not
 * the page's meta description and is not shown to anyone.
 */
export interface SitePage {
  path: string;
  title: string;
  summary: string;
}

export const PAGES: SitePage[] = [
  {
    path: '/',
    title: 'Home',
    summary: 'Identity, what he does, selected work and a condensed history.',
  },
  {
    path: '/migrations',
    title: 'Vue and Nuxt migrations',
    summary: 'The migration practice: four production migrations, what each one moved, and how.',
  },
  {
    path: '/work',
    title: 'Selected work',
    summary: 'Five client and product projects, with stacks and live URLs.',
  },
  {
    path: '/work/santevet-funnel',
    title: 'Santévet sales funnel',
    summary:
      'Case study: white-label insurance funnel, five markets, three brands, ~331 files, two framework migrations.',
  },
  {
    path: '/about',
    title: 'About',
    summary: 'Bio, how he works, and the full stack.',
  },
  {
    path: '/cv',
    title: 'Curriculum Vitae',
    summary: 'The complete CV: every role, dates, bullets, certifications and languages.',
  },
];

/**
 * Mirrors the `site.url` default in nuxt.config.ts. Read from env directly
 * rather than from the request, because both routes that use it are prerendered
 * — at build time the request host is localhost, which would bake dead URLs into
 * the output.
 */
export const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://marcuswiseman.com';
