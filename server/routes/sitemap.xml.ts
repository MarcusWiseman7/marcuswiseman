import { defineEventHandler, setHeader } from 'h3';
import { PAGES, SITE_URL } from '../utils/pages';
import { contact } from '../../app/data/site';

/**
 * /sitemap.xml — generated from the shared page list in server/utils/pages.ts.
 *
 * Hand-written rather than @nuxtjs/sitemap: at six pages the module would be a
 * dependency to maintain in exchange for a file this size. Revisit that if the
 * site ever grows a blog, where per-post discovery and lastmod start earning
 * their keep.
 *
 * Deliberately minimal — <loc> and nothing else:
 *
 *   - No <lastmod>. There is no real modification date to report; stamping
 *     build time would tell crawlers every page changed on every deploy, which
 *     is worse than saying nothing, and an unreliable lastmod gets the whole
 *     signal discounted.
 *   - No <priority> or <changefreq>. Google has stated it ignores both.
 */

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// The HTML pages, plus the CV PDF — a real indexable document that search
// engines parse, and the only non-HTML URL on the site worth discovering.
const locations = (): string[] => [...PAGES.map((page) => `${SITE_URL}${page.path}`), `${SITE_URL}${contact.cv}`];

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8');
  setHeader(event, 'cache-control', 'public, max-age=3600');

  const urls = locations()
    .map((loc) => `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
