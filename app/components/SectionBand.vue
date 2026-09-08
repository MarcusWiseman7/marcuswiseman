<script setup lang="ts">
// The shared band below the hero: a fading rule, then a two-column grid of
// eyebrow heading against content. Every numbered section uses it, which is
// what keeps their content edges aligned down the page.
defineProps<{
  /** e.g. "01 — What I do" */
  eyebrow: string
}>()
</script>

<template>
  <section class="band">
    <hr class="rule band__rule content-column">
    <div class="band__grid content-column">
      <h2 class="meta meta--eyebrow band__eyebrow">{{ eyebrow }}</h2>
      <div class="band__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.band {
  padding: calc(var(--space-8) * 2.5) var(--page-gutter) 0;

  &__rule {
    // margin-block only — the `margin` shorthand would reset margin-inline to 0
    // and out-specify .content-column's auto centring
    margin-block: 0 calc(var(--space-8) * 1.5);
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 180px) minmax(0, 3fr);
    gap: var(--space-8);
    // width and centring come from .content-column

    // the 180px eyebrow column collapses awkwardly below ~560px, so the
    // eyebrow stacks above its content there (the handoff's one sanctioned
    // media query — the rest of the page is fluid)
    @media (max-width: 560px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-6);
    }
  }

  &__eyebrow {
    // .meta--eyebrow carries the type; this is optical alignment with the
    // first line of content beside it
    margin: 6px 0 0;
    font-weight: 400;
  }

  &__content {
    max-width: var(--measure);
    min-width: 0;
  }
}
</style>
