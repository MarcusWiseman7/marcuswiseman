<script setup lang="ts">
const site = useSiteConfig();

useSeoMeta({
  title: 'Marcus Wiseman — Senior Frontend Engineer',
  description:
    'Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there. Based in Asturias, Spain, working remotely across EU time zones.',
  ogTitle: 'Marcus Wiseman — Senior Frontend Engineer',
  ogDescription: 'Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there.',
  ogType: 'profile',
  ogUrl: site.url,
  twitterCard: 'summary_large_image',
});

// One page, one canonical — but state it, so a crawler arriving on a URL with
// tracking params or a trailing-slash variant folds them into the same document
// instead of treating each as a separate near-duplicate.
useHead({
  link: [{ rel: 'canonical', href: site.url }],
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
// verify the claim — so the sections run identity, offer, proof, history,
// stack, person, contact.
</script>

<template>
  <HeroSection />
  <ServicesSection />
  <WorkSection />
  <ExperienceSection />
  <StackSection />
  <AboutSection />
  <ContactSection />
</template>
