<script setup lang="ts">
import { migrations, services } from '~/data/site';

const site = useSiteConfig();
const url = `${site.url}/migrations`;

// services[0] is the migration service; taken by index rather than retyped so
// the page and the home-page card can never state the offer differently.
const offer = services[0]!;

useSeoMeta({
  title: 'Vue and Nuxt migrations — Marcus Wiseman',
  description:
    'Nuxt 2 to Nuxt 3, JavaScript to TypeScript, Nuxt to standalone Vue. Four production migrations across insurance, media and social platforms — incremental, with the applications shipping the whole way.',
  ogTitle: 'Vue and Nuxt migrations — Marcus Wiseman',
  ogDescription: 'Four production migrations, none of them a rewrite from scratch.',
  ogType: 'website',
  ogUrl: url,
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
});

// A Service, not a ProfilePage: this document describes something on offer, and
// `provider` points at the identity node app.vue defines rather than naming him
// again. `serviceType` is the phrase someone would actually search for.
useSchemaOrg([
  defineWebPage(),
  {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Vue and Nuxt migration',
    serviceType: 'Legacy Vue and Nuxt framework migration',
    description: offer.description,
    provider: { '@id': `${site.url}/#identity` },
    areaServed: 'Europe',
  },
]);
</script>

<template>
  <article>
    <header class="page-head">
      <div class="page-head__inner content-column">
        <p class="meta meta--eyebrow page-head__eyebrow">Migration practice</p>
        <h1 class="page-head__title">Vue and Nuxt migrations</h1>
        <p class="page-head__lede">Four production migrations, none of them a rewrite from scratch.</p>
        <p class="page-head__body">{{ offer.description }}</p>
      </div>
    </header>

    <SectionBand eyebrow="01 — The record">
      <ol class="record">
        <li v-for="item in migrations" :key="item.project" class="record__entry">
          <div class="record__head">
            <h3 class="record__project">{{ item.project }}</h3>
            <span class="meta record__path">{{ item.path }}</span>
          </div>
          <p v-if="item.detail" class="record__detail">{{ item.detail }}</p>
        </li>
      </ol>
    </SectionBand>

    <!-- TWO SECTIONS ARE MISSING HERE, DELIBERATELY.
         This page is the highest-intent document on the site — "nuxt 2 to nuxt 3
         migration consultant" is a query with a budget behind it — and it is
         currently thin, because the two things that would make it the best
         answer to that query do not exist yet and are not mine to write:

         02 — How it runs
           Four or five steps in Marcus's own words: how a migration is scoped,
           how the app keeps shipping while it moves, what goes first, what he
           refuses to do.

         03 — Questions
           Three questions as headings with their answers beneath — "How long
           does a Nuxt 2 to Nuxt 3 migration take?", "Can the application keep
           shipping during the migration?", "Is it worth migrating, or should we
           rewrite?" A question heading with its answer directly under it is the
           most retrievable shape on the page, and he has done this four times.

         Add them as <SectionBand> blocks in that order. Everything above is
         verbatim from data/site.ts; keep it that way. -->
  </article>
</template>

<style lang="scss" scoped>
// Shared geometry with the hero and the CV header: full-bleed padding, the
// content column inside it, so every page's first line starts on the same rail.
.page-head {
  padding: clamp(48px, 9vw, 104px) var(--page-gutter) 0;

  &__inner {
    min-width: 0;
  }

  &__eyebrow {
    margin: 0;
    color: var(--color-accent-300); // chrome, not prose — ~3:1 is fine at 12px
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
    max-width: 34ch;
    margin: var(--space-6) 0 0;
  }

  &__body {
    font-size: 17px;
    line-height: 1.65;
    color: var(--color-neutral-400);
    max-width: var(--measure);
    text-wrap: pretty;
    margin: calc(var(--space-8) * 1.2) 0 0;
  }
}

.record {
  display: grid;
  gap: calc(var(--space-8) * 1.4);
  margin: 0;
  padding: 0;
  list-style: none; // ordered for reading order, not for numbering

  // the accent rail the home page's ledger carries, kept here so the block
  // reads as the same object on both pages
  &__entry {
    border-left: 1px solid var(--color-accent-700);
    padding-left: var(--space-8);
  }

  &__head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-6);
    align-items: baseline;

    // phone: the mono path label drops under the project name rather than
    // taking a max-content column out of it
    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-2);
    }
  }

  &__project {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 18px;
    line-height: 1.35;
    color: var(--color-neutral-200);
    margin: 0;
  }

  &__detail {
    font-size: 15px;
    line-height: 1.65;
    color: var(--color-neutral-400);
    max-width: var(--measure);
    text-wrap: pretty;
    margin: var(--space-4) 0 0;
  }
}
</style>
