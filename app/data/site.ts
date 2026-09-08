// Site content, lifted verbatim from the design handoff (docs/design-handoff.md)
// and the CV it was written from.
//
// All factual copy — roles, dates, numbers, stack, client descriptions — is
// VERBATIM. Do not reword any of it without asking Marcus first.

export interface WorkItem {
  title: string
  description: string
  stack: string
  href: string
}

export interface ExperienceItem {
  years: string
  role: string
  description: string
}

export interface StackGroup {
  label: string
  items: string[]
}

export interface Service {
  title: string
  description: string
}

export interface Migration {
  project: string
  path: string
}

export const contact = {
  email: 'md.wiseman@hotmail.com',
  github: 'https://github.com/MarcusWiseman7',
  githubLabel: 'github.com/MarcusWiseman7',
  linkedin: 'https://linkedin.com/in/marcus-wiseman',
  linkedinLabel: 'linkedin.com/in/marcus-wiseman',
  cv: '/Marcus-Wiseman-CV.pdf',
  location: 'Asturias, Spain · remote across EU time zones',
} as const

export const services: Service[] = [
  {
    title: 'Legacy Vue and Nuxt migrations',
    description:
      'Nuxt 2 to Nuxt 3, JavaScript to TypeScript, Nuxt to standalone Vue. Four production migrations across insurance, media and social platforms — incremental, with the applications shipping the whole way.',
  },
  {
    title: 'White-label and multi-locale architecture',
    description:
      'Brand identity and locale as configuration rather than forked codebases. One funnel, five markets, three brands, 331 files.',
  },
  {
    title: 'Frontend delivery, end to end',
    description:
      'Scoping, architecture, build, deploy. Vue/Nuxt or Svelte/SvelteKit on the front, Node and Express on REST APIs, MongoDB behind them.',
  },
  {
    title: 'The unglamorous half',
    description:
      'Datadog monitoring, SonarQube quality gates, GitLab CI/CD. The work that lets a team move fast without shipping regressions.',
  },
]

export const migrations: Migration[] = [
  { project: 'Santévet funnel and main website', path: 'Nuxt 2 → Nuxt 3 · JS → TS' },
  { project: 'Santévet funnel, after the Nuxt 4 release', path: 'Nuxt → standalone Vue' },
  { project: 'Two media and social platforms, SimplyDigital', path: 'Nuxt 2 → Nuxt 3' },
]

export const work: WorkItem[] = [
  {
    title: 'Santévet sales funnel',
    description: 'White-label insurance funnel — 5 markets, 3 brands, ~30k LOC',
    stack: 'Vue · TS',
    href: '#', // no public URL
  },
  {
    title: 'glopcom.com',
    description:
      'Swiss consultancy taking optical component manufacturers to market across Europe, Asia and the USA',
    stack: 'Nuxt',
    href: 'https://glopcom.com/',
  },
  {
    title: 'abadiart.org',
    description:
      'Cultural organisation promoting art for social change — exhibitions, community projects, international collaborations',
    stack: 'Nuxt',
    href: 'https://abadiart.org/',
  },
  {
    title: 'kosmetikapetralipa.cz',
    description:
      'Beauty studio near Havlíčkův Brod — treatments, bridal makeup, lash and brow work, workshops',
    stack: 'Nuxt',
    href: 'https://kosmetikapetralipa.cz/',
  },
  {
    title: 'sokollipa.cz',
    description: 'Club site for Sokol Lípa, a village football team in Czechia',
    stack: 'Nuxt',
    href: 'https://sokollipa.cz/',
  },
]

export const experience: ExperienceItem[] = [
  {
    years: '2023 — now',
    role: 'Senior Frontend Vue Developer · Santévet',
    description:
      "Owns the group's primary sales funnel. Two framework migrations, the white-label architecture, an AWS Amplify auth application, Datadog instrumentation, and contributions to the internal monorepo design system.",
  },
  {
    years: '2015 — now',
    role: 'Freelance Web Developer · Self-employed',
    description:
      'Full-stack JavaScript for individuals, startups and corporate clients across Europe, often two engagements in parallel. Owned end to end, client communication in English.',
  },
  {
    years: '2020 — 2024',
    role: 'Frontend Developer · SimplyDigital',
    description:
      'Client-facing interfaces in Vue, Nuxt and SCSS. Migrated two media and social platforms from Nuxt 2 to Nuxt 3, and took projects from concept to launch alongside designers, backend developers and project managers.',
  },
  {
    years: '2018 — 2021',
    role: 'Co-Founder & Full-Stack Developer · Wiseman & Jech s.r.o.',
    description:
      'Ran delivery, client relationships and new business. Led AgileTeams.io from concept to launch and hired specialists around each project.',
  },
  {
    years: '2019 — 2020',
    role: 'Frontend Developer · Stibo Media s.r.o.',
    description:
      'Led frontend of a social-network PWA in Vue and SCSS: live chat, video chat, e-commerce and dynamic post interactions.',
  },
]

export const stackGroups: StackGroup[] = [
  {
    label: 'Frontend',
    items: [
      'Vue 3 · Composition API',
      'Vue 2',
      'Nuxt 4 / 3 / 2',
      'TypeScript',
      'JavaScript ES6+',
      'Svelte & SvelteKit',
      'SCSS',
      'Vuetify',
      'Design systems',
    ],
  },
  {
    label: 'Backend & cloud',
    items: ['Node.js', 'Express', 'MongoDB', 'REST API design', 'AWS Amplify Auth'],
  },
  {
    label: 'Quality, monitoring, delivery',
    items: ['Datadog', 'SonarQube', 'Botify', 'GitLab CI/CD', 'Git Flow'],
  },
]

// The same competences as stackGroups, but as machine-readable entity names for
// schema.org `knowsAbout` and llms.txt. Kept separate on purpose: stackGroups
// holds display copy ('Nuxt 4 / 3 / 2', 'Svelte & SvelteKit') that would split
// into nonsense entities. Add to both when the stack changes.
export const knowsAbout: string[] = [
  'Vue.js',
  'Nuxt',
  'TypeScript',
  'JavaScript',
  'Svelte',
  'SvelteKit',
  'SCSS',
  'Vuetify',
  'Design systems',
  'Frontend architecture',
  'Legacy framework migration',
  'White-label architecture',
  'Internationalization',
  'Node.js',
  'Express',
  'MongoDB',
  'REST API design',
  'AWS Amplify',
  'Datadog',
  'SonarQube',
  'GitLab CI/CD',
]

// One-line professional identity, reused by schema.org and llms.txt.
export const identity = {
  name: 'Marcus Wiseman',
  jobTitle: 'Senior Frontend Engineer',
  description:
    'Senior frontend engineer specialising in Vue, Nuxt and TypeScript, and the legacy migrations that get teams there. Based in Asturias, Spain, working remotely across EU time zones.',
  // Lives in Spain, American national — both stated, because "where is he" and
  // "can he work here" are different questions and models conflate them.
  locality: 'Asturias',
  country: 'ES',
  nationality: 'United States',
} as const
