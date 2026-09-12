<script setup lang="ts">
import { experience, work } from '~/data/site';

const site = useSiteConfig();
const url = `${site.url}/work/santevet-funnel`;

// Found by company rather than by index: this page is about one engagement, and
// it should break loudly if that engagement is ever renamed, not silently
// render a different job.
const role = experience.find((item) => item.company === 'Santévet');
const project = work.find((item) => item.caseStudy === '/work/santevet-funnel');

if (!role || !project) {
  throw createError({
    statusCode: 500,
    message: 'The Santévet entry is missing from data/site.ts.',
  });
}

useSeoMeta({
  title: 'Santévet sales funnel — white-label Vue architecture across five markets',
  description:
    'A white-label insurance funnel serving five European markets and three brands from one codebase — roughly 331 files and 30,000 lines, taken through two framework migrations without disrupting a live revenue funnel.',
  ogTitle: 'Santévet sales funnel — white-label Vue architecture',
  ogDescription: 'Five markets, three brands, one codebase, two framework migrations.',
  ogType: 'article',
  ogUrl: url,
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
});

// CreativeWork with an explicit breadcrumb: the breadcrumb is what tells a
// search engine this page sits under /work rather than floating at the root,
// and it is what gets rendered under the result.
useSchemaOrg([
  defineWebPage(),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Work', item: '/work' },
      { name: 'Santévet sales funnel', item: '/work/santevet-funnel' },
    ],
  }),
  {
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: 'Santévet sales funnel',
    description: project.description,
    creator: { '@id': `${site.url}/#identity` },
    keywords: [
      'white-label architecture',
      'Vue 3',
      'TypeScript',
      'Nuxt migration',
      'internationalization',
    ],
  },
]);
</script>

<template>
  <article>
    <header class="page-head">
      <div class="page-head__inner content-column">
        <!-- a real <nav>, not decoration: it is the page's route back up, and
             the schema breadcrumb above mirrors exactly these two steps -->
        <nav class="meta crumbs" aria-label="Breadcrumb">
          <NuxtLink to="/work">Work</NuxtLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Santévet sales funnel</span>
        </nav>

        <h1 class="page-head__title">Santévet sales funnel</h1>
        <p class="page-head__lede">{{ project.description }}</p>

        <dl class="facts">
          <div class="facts__item">
            <dt class="meta meta--eyebrow">Role</dt>
            <dd>{{ role.role }}</dd>
          </div>
          <div class="facts__item">
            <dt class="meta meta--eyebrow">Period</dt>
            <dd>{{ role.period }}</dd>
          </div>
          <div class="facts__item">
            <dt class="meta meta--eyebrow">Stack</dt>
            <dd>{{ project.stack }}</dd>
          </div>
          <div class="facts__item">
            <dt class="meta meta--eyebrow">Location</dt>
            <dd>{{ role.location }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <SectionBand eyebrow="01 — What I built">
      <ul class="built">
        <li v-for="point in role.bullets" :key="point">{{ point }}</li>
      </ul>

      <p v-if="role.products" class="meta products">
        Live:
        <template v-for="(item, i) in role.products" :key="item.href">
          <span v-if="i > 0" aria-hidden="true"> · </span>
          <a :href="item.href" target="_blank" rel="noopener noreferrer">
            {{ item.label }}<span class="visually-hidden"> (opens in a new tab)</span>
          </a>
        </template>
      </p>
    </SectionBand>

    <!-- TWO SECTIONS ARE MISSING HERE, DELIBERATELY.
         Everything above is verbatim from the CV, which is why it reads as a
         list of what was done rather than as a case study. The two parts that
         would make it one are not mine to invent:

         02 — The brief
           What state the funnel was in when he took it on, and what the
           constraint was. Two or three paragraphs. The facts are all on record
           above; this is the framing that makes a reader see why it was hard.

         03 — Outcome
           Conversion, build time, bundle size, incident count, time-to-launch
           for a new market — whatever moved and whatever he is permitted to
           say. If none of it can be disclosed, say THAT: a stated constraint
           reads as credible, an empty section reads as nothing happened.

         Add them as <SectionBand> blocks after the one above. -->
  </article>
</template>

<style lang="scss" scoped>
// Same geometry as the other page heads — see the note in migrations.vue.
.page-head {
  padding: clamp(48px, 9vw, 104px) var(--page-gutter) 0;

  &__inner {
    min-width: 0;
  }

  &__title {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: clamp(32px, 5vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
    margin: var(--space-6) 0 0;
  }

  &__lede {
    font-size: clamp(18px, 2.4vw, 22px);
    line-height: 1.45;
    color: var(--color-neutral-300);
    max-width: 40ch;
    margin: var(--space-6) 0 0;
    text-wrap: pretty;
  }
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin: 0;

  span[aria-hidden] {
    color: var(--color-neutral-700); // a separator glyph, not text
  }
}

.facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-8);
  margin: calc(var(--space-8) * 1.6) 0 0;
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-neutral-900);

  &__item {
    min-width: 0;
  }

  dt {
    margin: 0;
  }

  dd {
    margin: var(--space-3) 0 0;
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-neutral-300);
    text-wrap: pretty;
  }
}

// The CV's en-dash marker, same as /cv's role bullets — the two pages print the
// same sentences and should print them the same way.
.built {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    position: relative;
    padding-left: var(--space-6);
    font-size: 16px;
    line-height: 1.65;
    color: var(--color-neutral-400);
    text-wrap: pretty;

    + li {
      margin-top: var(--space-6);
    }

    &::before {
      content: '–';
      position: absolute;
      left: 0;
      color: var(--color-accent-700);
    }
  }
}

.products {
  margin: calc(var(--space-8) * 1.4) 0 0;
}
</style>
