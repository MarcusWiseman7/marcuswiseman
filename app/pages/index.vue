<script setup lang="ts">
const site = useSiteConfig();

useSeoMeta({
  title: 'Marcus Wiseman — Senior Frontend Engineer',
  description:
    'Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there. Based in Asturias, Spain, working remotely across EU time zones.',
  ogTitle: 'Marcus Wiseman — Senior Frontend Engineer',
  ogDescription: 'Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there.',
  ogType: 'profile',
  // trailing slash on the root, deliberately: nuxt-schema-org emits
  // "<site>/" for the WebPage node and the sitemap lists the same, and three
  // spellings of one URL is how a root ends up looking like two documents
  ogUrl: `${site.url}/`,
  twitterCard: 'summary_large_image',
});

// One page, one canonical — but state it, so a crawler arriving on a URL with
// tracking params or a trailing-slash variant folds them into the same document
// instead of treating each as a separate near-duplicate.
useHead({
  link: [{ rel: 'canonical', href: `${site.url}/` }],
});

// ProfilePage rather than the default WebPage: this document is *about* a
// person, and mainEntity points at the identity node defined in app.vue.
useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    mainEntity: { '@id': '#identity' },
  }),
]);

// A visitor decides within one screen whether to email him, then reads down to
// verify the claim — so the sections run identity, offer, proof, history.
//
// Stack and the bio moved to /about, and the full role detail to /cv, when the
// site stopped being one page. That was not cosmetic: leaving them here as well
// would put the same paragraphs on two URLs, and two near-duplicate pages
// compete with each other rather than ranking as one. Each block of content now
// has exactly one home, and the pages link to it instead of repeating it.
</script>

<template>
  <HeroSection />

  <ServicesSection>
    <SectionMore to="/migrations">The migration practice in full</SectionMore>
  </ServicesSection>

  <!-- three of five: /work carries the whole list, so the home page shows the
       cut and hands off rather than duplicating it -->
  <WorkSection :limit="3">
    <SectionMore to="/work">All five projects</SectionMore>
  </WorkSection>

  <ExperienceSection>
    <SectionMore to="/cv">The full CV — roles, dates and detail</SectionMore>
  </ExperienceSection>
</template>
