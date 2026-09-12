<script setup lang="ts">
import { stackGroups } from '~/data/site'

// The numbered eyebrow belonged to the home page's run of sections; on /about
// the section is titled plainly. Defaulted rather than required so the caller
// only states it when it differs.
withDefaults(defineProps<{ eyebrow?: string }>(), { eyebrow: '04 — Stack' })
</script>

<template>
  <SectionBand id="stack" :eyebrow="eyebrow">
    <div class="stack">
      <div v-for="group in stackGroups" :key="group.label">
        <h3 class="stack__label">{{ group.label }}</h3>
        <ul class="stack__items">
          <li v-for="item in group.items" :key="item">
            <span class="tag tag-outline">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>

    <slot />
  </SectionBand>
</template>

<style lang="scss" scoped>
.stack {
  display: grid;
  gap: var(--space-8);

  &__label {
    font-family: var(--font-mono);
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-neutral-500);
    margin: 0 0 var(--space-4);
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
