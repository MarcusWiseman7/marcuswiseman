<script setup lang="ts">
import { contact } from '~/data/site'
</script>

<template>
  <section class="hero">
    <div class="hero__inner content-column">
      <p class="hero__availability">
        <span class="hero__availability-bar" aria-hidden="true" />Available for project work
      </p>

      <h1 class="hero__name">Marcus Wiseman</h1>

      <p class="hero__deck">
        Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there.
      </p>

      <p class="hero__body">
        Ten years shipping production web applications, the last several on Vue and Nuxt at
        scale. At Santévet I own the frontend of the main sales funnel: a brand- and
        country-agnostic codebase of roughly 30,000 lines serving five European markets and
        three French brands, taken through two framework migrations without disrupting a live
        revenue funnel.
      </p>

      <!-- the PDF stays the primary action, but /cv is the version a crawler
           (and anyone on a phone) can actually read, so it is offered beside it -->
      <div class="hero__actions">
        <a class="btn btn-primary" :href="contact.cv" download>Download CV (PDF)</a>
        <NuxtLink class="btn btn-ghost" to="/cv">Read the full CV</NuxtLink>
        <a class="btn btn-ghost" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </div>

      <p class="meta hero__location">{{ contact.location }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  // full-bleed padding; the inner column carries the width, so the hero's left
  // edge matches every band's below the centring breakpoint and its centred
  // column matches them above it
  padding: clamp(48px, 9vw, 104px) var(--page-gutter) 0;

  &__inner {
    // width and centring come from .content-column. The design capped the
    // section at 900px including gutters, but every child already carries its
    // own measure (32ch deck, 68ch body), so nothing widens.
    min-width: 0;
  }

  &__availability {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: 0;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    // accent-on-ground is ~3:1 — fine at this size and weight for chrome, not
    // for paragraph text
    color: var(--color-accent-300);
  }

  &__availability-bar {
    width: 18px;
    height: 1px;
    flex: none;
    background: var(--color-accent);
  }

  &__name {
    font-family: var(--font-heading);
    font-weight: 500; // never bolder — hierarchy is size and space
    font-size: clamp(38px, 6vw, 64px);
    line-height: 1.04;
    letter-spacing: -0.025em;
    margin: var(--space-8) 0 0;
  }

  &__deck {
    font-size: clamp(18px, 2.4vw, 22px);
    line-height: 1.45;
    color: var(--color-neutral-300);
    margin: var(--space-6) 0 0;
    max-width: 32ch;
  }

  &__body {
    font-size: 17px;
    line-height: 1.65;
    color: var(--color-neutral-400);
    margin: var(--space-8) 0 0;
    max-width: 68ch;
    text-wrap: pretty;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-top: calc(var(--space-8) * 1.5);
  }

  &__location {
    margin: var(--space-8) 0 0;
  }
}
</style>
