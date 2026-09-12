<script setup lang="ts">
import { work } from '~/data/site'

const props = defineProps<{
  /** how many rows to show — the home page shows a cut, /work shows all */
  limit?: number
  /** /work is its own page and titles its own heading */
  eyebrow?: string
}>()

const items = computed(() => (props.limit ? work.slice(0, props.limit) : work))

// an external row is the one shape that leaves the site, and the row's
// accessible name should say so
const isExternal = (item: (typeof work)[number]) => !item.caseStudy && item.href !== '#'

// Three row shapes, in priority order: an internal case study wins over an
// external site, and a project with neither is not a link at all (the Santévet
// funnel has no public URL).
const rowFor = (item: (typeof work)[number]) => {
  if (item.caseStudy) {
    return { is: resolveComponent('NuxtLink'), attrs: { to: item.caseStudy } }
  }
  if (item.href !== '#') {
    return {
      is: 'a',
      attrs: { href: item.href, target: '_blank', rel: 'noopener noreferrer' },
    }
  }
  return { is: 'div', attrs: {} }
}
</script>

<template>
  <SectionBand id="work" :eyebrow="eyebrow ?? '02 — Selected work'">
    <ul class="work">
      <li v-for="item in items" :key="item.title">
        <component
          :is="rowFor(item).is"
          class="work__row"
          :class="{ 'work__row--link': rowFor(item).is !== 'div' }"
          v-bind="rowFor(item).attrs"
        >
          <div class="work__detail">
            <span class="work__title">{{ item.title }}</span>
            <span class="work__description">{{ item.description }}</span>
            <span v-if="item.caseStudy" class="work__cue">Read the case study</span>
          </div>
          <span class="meta work__stack">{{ item.stack }}</span>
          <span v-if="isExternal(item)" class="visually-hidden"> (opens in a new tab)</span>
        </component>
      </li>
    </ul>

    <slot />
  </SectionBand>
</template>

<style lang="scss" scoped>
.work {
  margin: 0;
  padding: 0;
  list-style: none;

  &__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-6);
    padding: var(--space-6) 0;
    border-bottom: 1px solid var(--color-neutral-900);
    color: inherit;

    // On a phone the stack label is not worth a column: holding it in one
    // squeezed every description to ~65% width and wrapped it raggedly against
    // a floating "Nuxt". It drops under the row instead.
    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-3);
    }

    // hover is the whole motion budget here: the rule takes the accent and the
    // row slides 8px right. No transform, no shadow.
    &--link {
      transition:
        border-color 0.18s ease,
        padding-left 0.18s ease;

      &:hover {
        border-color: var(--color-accent-700);
        padding-left: 8px;
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }

  &__detail {
    min-width: 0;
  }

  &__title {
    display: block;
    font-family: var(--font-heading);
    font-size: 18px;
    color: var(--color-text);
  }

  &__description {
    display: block;
    font-size: 15px;
    color: var(--color-neutral-500);
    margin-top: var(--space-2);
  }

  // the one row that leads somewhere on this site rather than off it, so it
  // gets the accent the external rows do not
  &__cue {
    display: block;
    font-size: 14px;
    color: var(--color-accent-300);
    margin-top: var(--space-3);
  }

  &__stack {
    align-self: center;

    @media (max-width: 560px) {
      align-self: start;
    }
  }
}
</style>
