<script setup lang="ts">
import { work } from '~/data/site'

// The Santévet funnel has no public URL; its row is not a link.
const isLive = (href: string) => href !== '#'
</script>

<template>
  <SectionBand id="work" eyebrow="02 — Selected work">
    <ul class="work">
      <li v-for="item in work" :key="item.title">
        <component
          :is="isLive(item.href) ? 'a' : 'div'"
          class="work__row"
          :class="{ 'work__row--link': isLive(item.href) }"
          v-bind="isLive(item.href)
            ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
            : {}"
        >
          <div class="work__detail">
            <span class="work__title">{{ item.title }}</span>
            <span class="work__description">{{ item.description }}</span>
          </div>
          <span class="meta work__stack">{{ item.stack }}</span>
        </component>
      </li>
    </ul>
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

  &__stack {
    align-self: center;
  }
}
</style>
