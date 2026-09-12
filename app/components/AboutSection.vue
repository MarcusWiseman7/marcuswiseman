<script setup lang="ts">
// PORTRAIT: none supplied yet. The design frames a 220x264 photograph in
// Nocturne's .lighten wrapper (mix-blend-mode: lighten), which expects a
// subject shot on a dark or black background — a light-background portrait
// will read as a bright rectangle.
//
// To wire it up: drop the file in public/, set `portrait` to its path, and it
// renders in place of the empty frame below. If the only portrait available
// has a light background, remove the `lighten` class from the figure instead.
const portrait: string | null = null

// See the note in StackSection: the numbered eyebrow was the home page's.
withDefaults(defineProps<{ eyebrow?: string }>(), { eyebrow: '05 — About' })
</script>

<template>
  <SectionBand id="about" :eyebrow="eyebrow">
    <div class="about">
      <figure class="about__portrait lighten">
        <img
          v-if="portrait"
          :src="portrait"
          alt="Marcus Wiseman"
          width="220"
          height="264"
          class="about__image"
        >
        <div v-else class="about__placeholder">
          <span class="meta">Portrait</span>
        </div>
      </figure>

      <div class="about__text">
        <p class="about__lead">
          American, based in Asturias and working remotely across EU time zones. I like
          codebases that have to survive real constraints: several brands, several
          languages, a framework that moved under them, and a revenue funnel that cannot go
          down while it's being rebuilt.
        </p>
        <p class="about__copy">
          Native English speaker. Ten years of client work means the scoping conversation is
          part of the job, not a preamble to it.
        </p>
      </div>
    </div>
  </SectionBand>
</template>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  align-items: start;

  &__portrait {
    flex: 0 0 auto;
    width: 220px;
    height: 264px;
    margin: 0;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
  }

  // temporary, until a portrait is supplied — an empty frame rather than a
  // broken image
  &__placeholder {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    border: 1px dashed var(--color-neutral-800);
    border-radius: var(--radius-md);
  }

  &__text {
    flex: 1 1 300px;
    min-width: 0;
  }

  &__lead {
    font-size: 16px;
    line-height: 1.65;
    color: var(--color-neutral-300);
    margin: 0;
    text-wrap: pretty;
  }

  &__copy {
    font-size: 16px;
    line-height: 1.65;
    color: var(--color-neutral-400);
    margin: var(--space-6) 0 0;
    text-wrap: pretty;
  }
}
</style>
