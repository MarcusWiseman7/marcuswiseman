<script setup lang="ts">
import { contact, identity, knowsAbout } from '~/data/site';

// The identity graph. This is the half of "AI search" that is actually
// mechanical: a model answering "who is Marcus Wiseman" needs to resolve the
// name to one entity, and `sameAs` is what ties this page to the GitHub and
// LinkedIn profiles it already knows about. Everything here is also visible in
// the rendered page — never mark up a claim the page does not make.
useSchemaOrg([
  definePerson({
    name: identity.name,
    jobTitle: identity.jobTitle,
    description: identity.description,
    url: '/',
    sameAs: [contact.github, contact.linkedin],
    knowsAbout,
    nationality: { '@type': 'Country', name: identity.nationality },
    address: {
      '@type': 'PostalAddress',
      addressLocality: identity.locality,
      addressCountry: identity.country,
    },
    email: `mailto:${contact.email}`,
  }),
  defineWebSite({
    name: identity.name,
    description: identity.description,
    inLanguage: 'en',
  }),
]);
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
