import { defineEventHandler, setHeader } from 'h3';
import { contact, experience, identity, migrations, services, stackGroups, work } from '../../app/data/site';

/**
 * /llms.txt — the site's content as clean markdown, per llmstxt.org.
 *
 * Generated from app/data/site.ts rather than hand-written, so it cannot drift
 * from what the page actually says. A stale llms.txt is worse than none: it
 * puts contradicting claims about one person into a retrieval index.
 *
 * Honest expectation: adoption is still thin and most crawlers ignore it today.
 * It costs one file to be ready when that changes.
 */

// Mirrors the `site.url` default in nuxt.config.ts. Read from env directly
// rather than via the request, because this route is prerendered — at build
// time the request host is localhost, which would bake dead URLs into the file.
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://marcuswiseman.com';

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
  );

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
  for (const e of experience) push(`- **${e.role}**, ${e.years} — ${e.description}`);
  push('');

  push('## Stack', '');
  for (const g of stackGroups) push(`- **${g.label}**: ${g.items.join(', ')}`);
  push('');

  push(
    '## Contact',
    '',
    `- Email: ${contact.email}`,
    `- GitHub: ${contact.github}`,
    `- LinkedIn: ${contact.linkedin}`,
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
