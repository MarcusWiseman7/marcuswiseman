<script setup lang="ts">
import { experience } from '~/data/site'
</script>

<template>
  <SectionBand id="experience" eyebrow="03 — Experience">
    <ul class="experience">
      <li v-for="item in experience" :key="`${item.company}-${item.period}`" class="experience__entry">
        <p class="meta experience__years">{{ item.years }}</p>
        <div class="experience__detail">
          <h3 class="experience__role">{{ item.shortRole }} · {{ item.company }}</h3>
          <p class="experience__copy">{{ item.description }}</p>
        </div>
      </li>
    </ul>

    <slot />
  </SectionBand>
</template>

<style lang="scss" scoped>
.experience {
  display: grid;
  gap: calc(var(--space-8) * 1.3);
  margin: 0;
  padding: 0;
  list-style: none;

  &__entry {
    display: grid;
    grid-template-columns: minmax(0, 130px) minmax(0, 1fr);
    gap: var(--space-8);

    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-3);
    }
  }

  &__years {
    margin: 0;
    padding-top: 4px; // optical alignment with the role line beside it
  }

  &__role {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 18px;
    margin: 0;
  }

  &__copy {
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-neutral-400);
    margin: var(--space-2) 0 0;
  }
}
</style>
