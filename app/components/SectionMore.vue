<script setup lang="ts">
// The link that closes a home-page band and hands off to the page carrying the
// depth. Its own component because the hand-off is the structural idea behind
// the multi-page split, and it should look identical everywhere it appears.
defineProps<{
  to: string
}>()
</script>

<template>
  <p class="more">
    <NuxtLink class="more__link" :to="to">
      <slot />
      <!-- decorative: the arrow is a visual affordance, and a screen reader
           reading "right arrow" after every link adds nothing -->
      <span class="more__arrow" aria-hidden="true">→</span>
    </NuxtLink>
  </p>
</template>

<style lang="scss" scoped>
.more {
  margin: calc(var(--space-8) * 1.4) 0 0;

  &__link {
    font-size: 15px;

    &:hover .more__arrow {
      transform: translateX(3px);
    }
  }

  &__arrow {
    display: inline-block;
    margin-left: var(--space-2);
    transition: transform 0.18s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
