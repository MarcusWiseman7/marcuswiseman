<script setup lang="ts">
import { work } from '~/data/site';

const site = useSiteConfig();
const url = `${site.url}/work`;

useSeoMeta({
  title: 'Selected work — Marcus Wiseman',
  description:
    'Client and product work in Vue, Nuxt and TypeScript: a white-label insurance funnel across five markets, and four live client sites built on Nuxt.',
  ogTitle: 'Selected work — Marcus Wiseman',
  ogDescription: 'Client and product work in Vue, Nuxt and TypeScript.',
  ogType: 'website',
  ogUrl: url,
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
});

// A CollectionPage carrying an explicit ItemList: the list is the page's
// substance, and naming each project as its own entity is what lets one of them
// be retrieved and cited without the other four coming along.
useSchemaOrg([
  defineWebPage({ '@type': 'CollectionPage' }),
  {
    '@type': 'ItemList',
    '@id': `${url}#projects`,
    // no itemListOrder: the positions carry a curated order, not a sort by any
    // property, and claiming ascending/descending would assert one that is not there
    numberOfItems: work.length,
    itemListElement: work.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.title,
        description: item.description,
        // the case study where there is one, the live site otherwise, and
        // neither for the project with no public URL
        ...(item.caseStudy
          ? { url: `${site.url}${item.caseStudy}` }
          : item.href !== '#'
            ? { url: item.href }
            : {}),
      },
    })),
  },
]);
</script>

<template>
  <article>
    <header class="page-head">
      <div class="page-head__inner content-column">
        <p class="meta meta--eyebrow page-head__eyebrow">Work</p>
        <h1 class="page-head__title">Selected work</h1>
        <p class="page-head__body">
          Client and product work in Vue, Nuxt and TypeScript. One of these carries a full
          write-up; the rest are live sites you can open.
        </p>
      </div>
    </header>

    <WorkSection eyebrow="Projects" />
  </article>
</template>

<style lang="scss" scoped>
// Same geometry as /migrations and the CV header — see the note there.
.page-head {
  padding: clamp(48px, 9vw, 104px) var(--page-gutter) 0;

  &__inner {
    min-width: 0;
  }

  &__eyebrow {
    margin: 0;
    color: var(--color-accent-300);
  }

  &__title {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: clamp(32px, 5vw, 50px);
    line-height: 1.06;
    letter-spacing: -0.025em;
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
</style>
