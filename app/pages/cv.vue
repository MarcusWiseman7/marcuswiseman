<script setup lang="ts">
import {
  certifications,
  contact,
  cvSkills,
  experience,
  headline,
  identity,
  languages,
  profile,
} from '~/data/site';

const site = useSiteConfig();
const url = `${site.url}/cv`;

const currentRole = experience[0]!;

useSeoMeta({
  title: 'CV — Marcus Wiseman, Senior Frontend Engineer',
  description:
    'Full CV: ten years of production frontend work in Vue, Nuxt and TypeScript — Santévet, SimplyDigital, Wiseman & Jech, Stibo Media — plus skills, certifications and languages.',
  ogTitle: 'CV — Marcus Wiseman, Senior Frontend Engineer',
  ogDescription: 'Ten years of production frontend work in Vue, Nuxt and TypeScript.',
  ogType: 'profile',
  ogUrl: url,
  twitterCard: 'summary_large_image',
});

useHead({
  link: [{ rel: 'canonical', href: url }],
});

// Same shape as the home page: the document is *about* a person, so it is a
// ProfilePage pointing at the identity node app.vue defines.
useSchemaOrg([
  defineWebPage({
    '@type': 'ProfilePage',
    mainEntity: { '@id': '#identity' },
  }),

  // Extends the same #identity node app.vue defines, rather than declaring a
  // second person — the explicit @id is what keeps it one entity instead of
  // two near-duplicate ones, which is the whole point of the graph.
  //
  // The @id MUST be absolute. A relative '#identity' is namespaced by
  // nuxt-schema-org into '#/schema/person/#identity', which silently forks the
  // person in two and leaves mainEntity pointing at nothing.
  //
  // These properties are added HERE and not in app.vue because of the rule
  // stated there: never mark up a claim the page does not make. The landing
  // page lists none of this; the CV prints all of it, so only the CV asserts it.
  definePerson({
    '@id': `${site.url}/#identity`,
    hasCredential: certifications.map((name) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certificate',
      name,
    })),
    knowsLanguage: [{ '@type': 'Language', name: 'English' }],
    hasOccupation: {
      '@type': 'Occupation',
      name: identity.jobTitle,
    },
    worksFor: {
      '@type': 'Organization',
      name: currentRole.company,
    },
  }),
]);

// The employer asserted above is whichever role the CV lists first, so the
// markup follows the CV instead of hard-coding a company name that would go
// stale the day the top entry changes.


// The PDF's own section order, kept as-is so the two read the same way. The
// eyebrows are unnumbered, unlike the home page's "01 — …": there the numbers
// mark a narrative the visitor is being walked through, while these are the
// CV's own printed headings.
</script>

<template>
  <article class="cv">
    <header class="cv__header">
      <div class="cv__header-inner content-column">
        <p class="meta meta--eyebrow cv__eyebrow">Curriculum Vitae</p>

        <h1 class="cv__name">Marcus Wiseman</h1>
        <p class="cv__headline">{{ headline }}</p>

        <!-- one <span> per entry: the separators are drawn in CSS on the span,
             so a dot can never wrap onto a line by itself, and never becomes
             part of the link it follows -->
        <p class="meta cv__contact">
          <span><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></span>
          <span><a :href="contact.linkedin" rel="me">{{ contact.linkedinLabel }}</a></span>
          <span><a :href="contact.github" rel="me">{{ contact.githubLabel }}</a></span>
          <span>{{ contact.location }}</span>
        </p>

        <p class="cv__actions">
          <a class="btn btn-primary" :href="contact.cv" download>Download CV (PDF)</a>
        </p>
      </div>
    </header>

    <SectionBand eyebrow="Profile">
      <p v-for="paragraph in profile" :key="paragraph" class="cv__prose">{{ paragraph }}</p>
    </SectionBand>

    <SectionBand eyebrow="Technical skills">
      <dl class="skills">
        <div v-for="group in cvSkills" :key="group.label" class="skills__row">
          <dt class="skills__label">{{ group.label }}</dt>
          <dd class="skills__value">{{ group.value }}</dd>
        </div>
      </dl>
    </SectionBand>

    <SectionBand eyebrow="Experience">
      <ol class="roles">
        <li v-for="item in experience" :key="`${item.company}-${item.period}`" class="roles__entry">
          <h3 class="roles__title">
            {{ item.role }}
            <span class="roles__company">{{ item.company }}</span>
          </h3>

          <p class="meta roles__period">
            {{ item.period }} · {{ item.location }}<template v-if="item.note"> · {{ item.note }}</template>
          </p>

          <ul class="roles__bullets">
            <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
          </ul>

          <p v-if="item.products" class="meta roles__products">
            Products:
            <template v-for="(product, i) in item.products" :key="product.href">
              <span v-if="i > 0" aria-hidden="true"> · </span>
              <a :href="product.href" rel="noopener">{{ product.label }}</a>
            </template>
          </p>
        </li>
      </ol>
    </SectionBand>

    <SectionBand eyebrow="Certifications">
      <ul class="plain-list">
        <li v-for="item in certifications" :key="item">{{ item }}</li>
      </ul>
    </SectionBand>

    <SectionBand eyebrow="Languages">
      <ul class="plain-list">
        <li v-for="item in languages" :key="item">{{ item }}</li>
      </ul>
    </SectionBand>
  </article>
</template>

<style lang="scss" scoped>
// The header mirrors the home page's hero geometry so the two pages sit on the
// same grid: full-bleed padding, the shared column inside it.
.cv {
  &__header {
    padding: clamp(48px, 9vw, 104px) var(--page-gutter) 0;
  }

  &__header-inner {
    min-width: 0;
  }

  &__eyebrow {
    margin: 0;
    // accent, like the hero's availability line — this is chrome, not prose,
    // so ~3:1 on the ground is fine at this size
    color: var(--color-accent-300);
  }

  &__name {
    font-family: var(--font-heading);
    font-weight: 500; // never bolder — hierarchy is size and space
    font-size: clamp(34px, 5vw, 52px);
    line-height: 1.04;
    letter-spacing: -0.025em;
    margin: var(--space-6) 0 0;
  }

  &__headline {
    font-size: clamp(17px, 2.2vw, 20px);
    line-height: 1.45;
    color: var(--color-neutral-300);
    margin: var(--space-4) 0 0;
  }

  &__contact {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
    margin: var(--space-8) 0 0;

    span:not(:last-child)::after {
      content: '·';
      margin-left: var(--space-3); // the flex gap supplies the matching space after
      color: var(--color-neutral-500); // generated content is still text: 6.1:1, not 4.1:1
    }
  }

  &__actions {
    margin: calc(var(--space-8) * 1.2) 0 0;
  }

  &__prose {
    font-size: 16px;
    line-height: 1.7;
    color: var(--color-neutral-300);
    margin: 0 0 var(--space-6);
    text-wrap: pretty;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.skills {
  display: grid;
  gap: var(--space-6);
  margin: 0;

  &__row {
    display: grid;
    grid-template-columns: minmax(0, 170px) minmax(0, 1fr);
    gap: var(--space-6);

    // phone: the label drops above its value. Not the same number as
    // SectionBand's rail (760) — that one frees the width this one then uses.
    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-2);
    }
  }

  &__label {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-neutral-500);
    padding-top: 3px; // optical alignment with the value beside it
  }

  &__value {
    margin: 0;
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-neutral-300);
  }
}

.roles {
  display: grid;
  gap: calc(var(--space-8) * 1.4);
  margin: 0;
  padding: 0;
  list-style: none; // the ordered list is for reading order, not numbering

  &__entry {
    break-inside: avoid; // keep a role whole when the page is printed
  }

  &__title {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 18px;
    line-height: 1.35;
    margin: 0;
  }

  // set on its own line beneath the role, separated by colour rather than a
  // divider character, so long role titles wrap cleanly
  &__company {
    display: block;
    color: var(--color-neutral-400);
  }

  &__period {
    margin: var(--space-3) 0 0;
  }

  &__bullets {
    margin: var(--space-4) 0 0;
    padding: 0;
    list-style: none; // replaced below by the PDF's en-dash marker

    li {
      position: relative;
      padding-left: var(--space-6);
      font-size: 15px;
      line-height: 1.6;
      color: var(--color-neutral-400);
      text-wrap: pretty;

      + li {
        margin-top: var(--space-3);
      }

      &::before {
        content: '–';
        position: absolute;
        left: 0;
        color: var(--color-accent-700);
      }
    }
  }

  &__products {
    margin: var(--space-4) 0 0;
  }
}

.plain-list {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-neutral-300);

    + li {
      margin-top: var(--space-3);
    }
  }
}
</style>
