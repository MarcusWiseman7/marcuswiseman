<template>
  <div class="site">
    <!-- background, blur and border stay full-bleed; only the contents follow
         the shared content column -->
    <header class="masthead">
      <div class="masthead__inner content-column">
        <a class="masthead__brand" href="#top">Marcus Wiseman</a>
        <a class="btn btn-primary masthead__cta" href="#contact">Get in touch</a>
      </div>
    </header>

    <main id="top">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner content-column">
        <span>Marcus Wiseman · Senior Frontend Engineer</span>
        <span>Asturias, Spain · Remote (EU)</span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.site {
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
}

// Translucent and blurred over the scrolling page — with the sticky position,
// the whole motion budget for this site alongside the work-row hovers.
.masthead {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: var(--space-4) var(--page-gutter);
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-neutral-900);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
  }

  &__brand {
    font-family: var(--font-heading);
    font-size: 15px;
    color: var(--color-text); // the brand is not an accent link
  }

  &__cta {
    font-size: 13px;
    white-space: nowrap;
  }
}

.site-footer {
  padding: var(--space-8) var(--page-gutter) calc(var(--space-8) * 1.6);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-neutral-500);

  &__inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--space-4);
  }
}
</style>
