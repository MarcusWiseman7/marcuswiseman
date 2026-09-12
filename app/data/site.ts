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
  /** internal route to a write-up, where one exists */
  caseStudy?: string
}

// One entry per job, carrying both fidelities of the same facts.
//
// The home page shows the condensed cut (`years`, `shortRole`, `description`);
// /cv shows the CV's own (`period`, `role`, `location`, `bullets`). Neither is
// derivable from the other — the condensed copy is hand-written, not a
// truncation — so both are stored. They live in one object so that editing a
// job means editing one place and seeing every version of it at once.
export interface ExperienceItem {
  /** home page, e.g. "2023 — now" (em dash, as designed) */
  years: string
  /** home page: the title without its trailing qualifier */
  shortRole: string
  /** CV: the full printed title, e.g. "Frontend Developer — Social Network PWA" */
  role: string
  company: string
  /** home page: the condensed paragraph */
  description: string
  /** CV, e.g. "March 2023 – Present" (en dash, as printed) */
  period: string
  location: string
  /** the CV's trailing qualifier on the location line, where there is one */
  note?: string
  bullets: string[]
  /** the "Products:" line under a role, as links */
  products?: { label: string; href: string }[]
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
  /**
   * The CV's own sentence about this migration, verbatim, where it has one.
   * /migrations prints it under the ledger row; the home page shows only the
   * row. Two of the three have one — the SimplyDigital pair is a single line
   * on the CV, and is left without rather than given invented detail.
   */
  detail?: string
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
  {
    project: 'Santévet funnel and main website',
    path: 'Nuxt 2 → Nuxt 3 · JS → TS',
    detail:
      'Led the migration of the funnel and main website from Nuxt 2 / Nuxt Bridge to Nuxt 3, and from JavaScript to TypeScript, improving both runtime performance and long-term maintainability.',
  },
  {
    project: 'Santévet funnel, after the Nuxt 4 release',
    path: 'Nuxt → standalone Vue',
    detail:
      'Managed the subsequent migration off Nuxt to a standalone Vue application following the Nuxt 4 release, taking the project through the transition end to end without disrupting a live revenue-generating funnel.',
  },
  { project: 'Two media and social platforms, SimplyDigital', path: 'Nuxt 2 → Nuxt 3' },
]

export const work: WorkItem[] = [
  {
    title: 'Santévet sales funnel',
    description: 'White-label insurance funnel — 5 markets, 3 brands, ~30k LOC',
    stack: 'Vue · TS',
    href: '#', // no public URL
    caseStudy: '/work/santevet-funnel',
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
    shortRole: 'Senior Frontend Vue Developer',
    role: 'Senior Frontend Vue Developer',
    company: 'Santévet',
    description:
      "Owns the group's primary sales funnel. Two framework migrations, the white-label architecture, an AWS Amplify auth application, Datadog instrumentation, and contributions to the internal monorepo design system.",
    period: 'March 2023 – Present',
    location: 'Lyon, France (remote)',
    bullets: [
      'Own the frontend of the group’s primary sales funnel: a brand- and country-agnostic application serving five European markets and all three of the group’s French brands from a single codebase — roughly 331 Vue, TypeScript, and test files and 30,000 lines of code.',
      'Designed and implemented the white-label architecture behind it, so brand identity and locale are configuration rather than forked codebases.',
      'Led the migration of the funnel and main website from Nuxt 2 / Nuxt Bridge to Nuxt 3, and from JavaScript to TypeScript, improving both runtime performance and long-term maintainability.',
      'Managed the subsequent migration off Nuxt to a standalone Vue application following the Nuxt 4 release, taking the project through the transition end to end without disrupting a live revenue-generating funnel.',
      'Contribute to the company’s internal design system — a monorepo component library consumed across the group’s frontends — and integrated it into the funnel.',
      'Built a secure user authentication application on AWS Amplify Auth to manage access across products.',
      'Instrumented the products with Datadog for behavioral monitoring and analytics, and held code quality through SonarQube and GitLab CI/CD.',
    ],
    products: [
      { label: 'santevet.com', href: 'https://www.santevet.com/' },
      { label: 'assurance.santevet.com', href: 'https://assurance.santevet.com/' },
    ],
  },
  {
    years: '2015 — now',
    shortRole: 'Freelance Web Developer',
    role: 'Freelance Web Developer',
    company: 'Self-employed',
    description:
      'Full-stack JavaScript for individuals, startups and corporate clients across Europe, often two engagements in parallel. Owned end to end, client communication in English.',
    period: 'June 2015 – Present',
    location: 'Remote (EU)',
    bullets: [
      'Deliver full-stack JavaScript projects for individuals, startups, and corporate clients across Europe, frequently running two or more engagements in parallel.',
      'Frontend in Vue / Nuxt and Svelte / SvelteKit; REST APIs in Node.js and Express; data in MongoDB.',
      'Own projects end to end — scoping, architecture, build, deployment, and direct client communication in English.',
    ],
  },
  {
    years: '2020 — 2024',
    shortRole: 'Frontend Developer',
    role: 'Frontend Developer — Vue / Nuxt / SCSS',
    company: 'SimplyDigital',
    description:
      'Client-facing interfaces in Vue, Nuxt and SCSS. Migrated two media and social platforms from Nuxt 2 to Nuxt 3, and took projects from concept to launch alongside designers, backend developers and project managers.',
    period: 'June 2020 – April 2024',
    location: 'Prague, Czechia',
    note: 'Concurrent with Santévet from 2023',
    bullets: [
      'Built and maintained client-facing interfaces in Vue.js, Nuxt, and SCSS, with a focus on responsive, accessible UI.',
      'Worked alongside designers, backend developers, and project managers to take digital projects from concept to launch on schedule.',
    ],
  },
  {
    years: '2018 — 2021',
    shortRole: 'Co-Founder & Full-Stack Developer',
    role: 'Co-Founder & Full-Stack JavaScript Developer',
    company: 'Wiseman & Jech s.r.o.',
    description:
      'Ran delivery, client relationships and new business. Led AgileTeams.io from concept to launch and hired specialists around each project.',
    period: 'March 2018 – March 2021',
    location: 'Prague, Czechia',
    bullets: [
      'Co-founded a software development firm and ran project delivery, client relationships, and new business.',
      'Led AgileTeams.io, the company’s flagship product, from concept through to launch.',
      'Built web applications, PWAs, and websites end to end using Vue.js, Nuxt.js, Node.js, Express, MongoDB, and Vuetify.',
      'Sourced and hired freelance specialists and assembled teams around each project’s needs.',
    ],
  },
  {
    years: '2019 — 2020',
    shortRole: 'Frontend Developer',
    role: 'Frontend Developer — Social Network PWA',
    company: 'Stibo Media s.r.o.',
    description:
      'Led frontend of a social-network PWA in Vue and SCSS: live chat, video chat, e-commerce and dynamic post interactions.',
    period: 'July 2019 – June 2020',
    location: 'Prague, Czechia',
    bullets: [
      'Led frontend development of a progressive web app for a social network platform, built in Vue.js and SCSS.',
      'Shipped live chat, video chat, e-commerce, and dynamic post interactions.',
      'Built a component-based UI with close attention to responsiveness, performance, and frontend best practice.',
    ],
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

// ---------------------------------------------------------------------------
// CV-only content: the parts of the printed CV that have no home-page
// equivalent. The roles themselves live in `experience` above, at both
// fidelities — only what the landing page never shows is down here.
// ---------------------------------------------------------------------------

export interface CvSkillGroup {
  label: string
  /** left as one printed string, not split into tags: entries like "Vue 3
   *  (Composition API) and Vue 2" do not survive being cut on the commas */
  value: string
}

export const headline = 'Senior Frontend Engineer · Vue.js · Nuxt · TypeScript'

export const profile: string[] = [
  'Senior frontend engineer with more than ten years shipping production web applications, the last several focused on Vue and Nuxt at scale. At Santévet, a multinational pet insurance group, I own the frontend of the main sales funnel — a brand- and country-agnostic codebase of roughly 30,000 lines serving five European markets and three French brands — and have led it through two major framework migrations: Nuxt 2 to Nuxt 3 with a JavaScript-to-TypeScript conversion, then off Nuxt to a standalone Vue application when Nuxt 4 changed the calculus.',
  'My strengths are modernizing legacy Vue codebases, frontend architecture that has to hold up across multiple brands and markets, and the unglamorous work — monitoring, code quality, CI/CD — that lets a team move quickly without shipping regressions. American, based in Spain, working remotely across EU time zones.',
]

// Deliberately NOT derived from `stackGroups`: the CV groups the same ground
// differently (six headings, not three) and prints entries the display tags
// reword — "Vue 3 (Composition API) and Vue 2" against "Vue 3 · Composition
// API" + "Vue 2". Joining the tags would reword the CV, so both are kept.
export const cvSkills: CvSkillGroup[] = [
  {
    label: 'Frontend',
    value:
      'Vue 3 (Composition API) and Vue 2, Nuxt 4 / 3 / 2, TypeScript, JavaScript (ES6+), Svelte & SvelteKit, SCSS, Vuetify, design systems & monorepo component libraries',
  },
  { label: 'Backend', value: 'Node.js, Express, MongoDB, REST API design' },
  { label: 'Cloud & Auth', value: 'AWS Amplify Auth' },
  { label: 'Quality & Monitoring', value: 'Datadog, SonarQube, Botify' },
  { label: 'Tooling & Delivery', value: 'Git, GitLab CI/CD, Git Flow' },
  {
    label: 'Focus areas',
    value:
      'Legacy migrations, white-label & multi-locale architecture, i18n, PWAs, performance, SEO',
  },
]

export const certifications: string[] = [
  'The Complete Node.js Developer Course',
  'Learn and Understand NodeJS',
  'JavaScript: Understanding the Weird Parts',
]

export const languages: string[] = ['English — Native speaker (American)']

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
