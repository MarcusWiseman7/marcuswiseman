<script setup lang="ts">
import { identity } from '~/data/site';

const site = useSiteConfig();
const url = `${site.url}/about`;

useSeoMeta({
  title: 'About — Marcus Wiseman, Senior Frontend Engineer',
  description:
    'American, based in Asturias, working remotely across EU time zones. Ten years of production frontend work, and the stack behind it: Vue, Nuxt, TypeScript, Node and the delivery tooling around them.',
  ogTitle: 'About — Marcus Wiseman',
  ogDescription: 'Who he is, how he works, and the stack behind it.',
  ogType: 'profile',
  ogUrl: url,
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
});

// AboutPage pointing at the same identity node, like / and /cv — three
// documents about one person, not three people.
useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    mainEntity: { '@id': '#identity' },
  }),
]);

// This page carries the bio and the stack, and deliberately NOT the employment
// history: /cv owns that at full fidelity and the home page carries the
// condensed cut. Printing the roles a third time here would put three
// near-identical documents on one site, which is the opposite of the reason the
// site was split up. It links to /cv instead.
</script>

<template>
  <article>
    <header class="page-head">
      <div class="page-head__inner content-column">
        <p class="meta meta--eyebrow page-head__eyebrow">About</p>
        <h1 class="page-head__title">{{ identity.name }}</h1>
        <p class="page-head__lede">{{ identity.jobTitle }}</p>
      </div>
    </header>

    <AboutSection eyebrow="Who" />

    <StackSection eyebrow="Stack">
      <SectionMore to="/cv">The full CV — roles, dates and detail</SectionMore>
    </StackSection>
  </article>
</template>

<style lang="scss" scoped>
// Same geometry as the other page heads — see the note in migrations.vue.
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

  &__lede {
    font-size: clamp(18px, 2.4vw, 22px);
    line-height: 1.45;
    color: var(--color-neutral-300);
    margin: var(--space-6) 0 0;
  }
}
</style>
