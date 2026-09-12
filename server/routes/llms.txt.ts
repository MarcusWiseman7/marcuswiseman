import { defineEventHandler, setHeader } from 'h3';
import { PAGES, SITE_URL } from '../utils/pages';
import {
  certifications,
  contact,
  experience,
  identity,
  languages,
  migrations,
  profile,
  services,
  stackGroups,
  work,
} from '../../app/data/site';

/**
 * /llms.txt — the site's content as clean markdown, per llmstxt.org.
 *
 * Generated from app/data/site.ts rather than hand-written, so it cannot drift
 * from what the page actually says. A stale llms.txt is worse than none: it
 * puts contradicting claims about one person into a retrieval index.
 *
 * It mirrors both pages: the landing page's condensed copy and /cv's full role
 * detail come from the same `experience` entries, so the two can never state
 * his history differently. Where the CV is deeper, the deeper version wins —
 * this file is read by machines, which have no reason to prefer the summary.
 *
 * Honest expectation: adoption is still thin and most crawlers ignore it today.
 * It costs one file to be ready when that changes.
 */

const md = (): string => {
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(
    `# ${identity.name}`,
    '',
    `> ${identity.description}`,
    '',
    `${identity.name} is a ${identity.jobTitle.toLowerCase()} based in ${identity.locality}, Spain (${identity.nationality} national), working remotely across EU time zones. This file is a plain-text mirror of ${SITE_URL} for machine readers.`,
    '',
    `The full CV is at ${SITE_URL}/cv (HTML) and ${SITE_URL}${contact.cv} (PDF).`,
    '',
  );

  // The link index llmstxt.org is actually built around. It was pointless while
  // the site was one URL; now that each page answers a different question, this
  // is the part of the file with any chance of being used — it tells a reader
  // which document to fetch rather than making it infer from a wall of prose.
  push('## Pages', '', ...PAGES.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.summary}`), '');

  push('## Profile', '');
  for (const p of profile) push(p, '');

  push('## What he does', '');
  for (const s of services) push(`- **${s.title}** — ${s.description}`);
  push('');

  push(
    '## Framework migrations',
    '',
    'Production migrations delivered incrementally, with the applications shipping throughout:',
    '',
  );
  for (const m of migrations) push(`- ${m.project} — ${m.path}`);
  push('');

  push('## Selected work', '');
  for (const w of work) {
    const url = w.href === '#' ? 'no public URL' : w.href;
    push(`- **${w.title}** (${w.stack}, ${url}) — ${w.description}`);
  }
  push('');

  push('## Experience', '');
  for (const e of experience) {
    const dates = [e.period, e.location, e.note].filter(Boolean).join(' · ');
    // '·' not '—': several role titles contain an em dash of their own
    // ("Frontend Developer — Social Network PWA"), and doubling it up makes the
    // heading ambiguous to parse.
    push(`### ${e.role} · ${e.company}`, '', dates, '');
    for (const b of e.bullets) push(`- ${b}`);
    if (e.products) {
      push('', `Products: ${e.products.map((pr) => `${pr.label} (${pr.href})`).join(', ')}`);
    }
    push('');
  }

  // stackGroups only — `cvSkills` covers the same ground in the CV's own
  // grouping, and emitting both would put two near-identical skill lists into a
  // retrieval index, which is the drift this file exists to prevent.
  push('## Stack', '');
  for (const g of stackGroups) push(`- **${g.label}**: ${g.items.join(', ')}`);
  push('');

  push('## Certifications', '');
  for (const c of certifications) push(`- ${c}`);
  push('');

  push('## Languages', '');
  for (const l of languages) push(`- ${l}`);
  push('');

  push(
    '## Contact',
    '',
    `- Email: ${contact.email}`,
    `- GitHub: ${contact.github}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- CV (HTML): ${SITE_URL}/cv`,
    `- CV (PDF): ${SITE_URL}${contact.cv}`,
    `- Location: ${contact.location}`,
    '',
  );

  return lines.join('\n');
};

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8');
  setHeader(event, 'cache-control', 'public, max-age=3600');
  return md();
});
