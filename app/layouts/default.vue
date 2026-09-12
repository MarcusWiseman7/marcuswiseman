<script setup lang="ts">
// The masthead nav exists because the site is no longer one document. Three
// destinations only: the two pages that answer a question someone arrives with
// (/migrations, /work) and the one that answers "who is this" (/about). /cv is
// reachable from the hero and the footer — it is the deepest page, not a
// top-level one, and a four-item nav starts reading as a menu.
const route = useRoute();

const NAV = [
  { to: '/migrations', label: 'Migrations' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
];

// Section match, not route match. `router-link-active` would not do: pages/work/
// index.vue and pages/work/santevet-funnel.vue are SIBLING route records rather
// than parent and child, so vue-router does not consider /work active while the
// case study is open, and the nav would go blank on that page. A path-prefix
// test is what "which section am I in" actually means here.
//
// RouterLink still contributes aria-current="page" on the exact page; this only
// drives the styling.
const inSection = (to: string) => route.path === to || route.path.startsWith(`${to}/`);
</script>

<template>
  <div class="site">
    <!-- first tab stop on every page, ahead of the masthead's four -->
    <a class="skip-link" href="#top">Skip to content</a>

    <!-- background, blur and border stay full-bleed; only the contents follow
         the shared content column -->
    <header class="masthead">
      <div class="masthead__inner content-column">
        <NuxtLink class="masthead__brand" to="/">Marcus Wiseman</NuxtLink>

        <nav class="masthead__nav" aria-label="Primary">
          <NuxtLink v-for="item in NAV" :key="item.to" :to="item.to" :class="{ 'is-section': inSection(item.to) }">
            {{ item.label }}
          </NuxtLink>
          <a class="btn btn-primary masthead__cta" href="#contact">Get in touch</a>
        </nav>
      </div>
    </header>

    <!-- tabindex="-1" so the skip link moves FOCUS and not just the viewport:
         a bare fragment link to a non-focusable element scrolls in every
         browser but only some of them follow it with focus. -->
    <main id="top" tabindex="-1">
      <slot />

      <!-- every page ends on the same conversion point. It is also why the
           masthead's #contact anchor resolves everywhere, and it means a page
           retrieved in isolation still carries a way to reach him.
           Inside <main>, because it is the site's primary call to action: left
           outside, the heading and the whole form belonged to no landmark and
           anyone jumping straight to main skipped past them. -->
      <ContactSection />
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner content-column">
        <span>Marcus Wiseman · Senior Frontend Engineer</span>
        <span class="site-footer__links">
          <NuxtLink to="/cv">CV</NuxtLink>
          <span aria-hidden="true">·</span>
          <span>Asturias, Spain · Remote (EU)</span>
        </span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
// Off-screen until focused. Fixed rather than absolute so it is visible where
// the reader actually is, not parked at the top of the document.
.skip-link {
  position: fixed;
  top: var(--space-3);
  left: var(--page-gutter);
  z-index: 10;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-heading);
  font-size: 14px;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  transform: translateY(-200%);

  &:focus-visible {
    transform: none;
  }
}

.site {
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
}

main:focus-visible {
  outline: none; // a focus target for the skip link, not a control
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
    white-space: nowrap;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-8);
    min-width: 0;

    // Nav items are chrome, not prose: a step down from the body ramp, with
    // the current section in full ink. Not accent — the accent in this
    // masthead belongs to the one button.
    a:not(.btn) {
      font-size: 14px;
      color: var(--color-neutral-500);
      white-space: nowrap;

      &:hover {
        color: var(--color-neutral-300);
      }

      &.is-section {
        color: var(--color-text);
      }
    }
  }

  &__cta {
    font-size: 13px;
    white-space: nowrap;
  }

  // Below the width where the brand and four items fit on one line, the nav
  // moves to a second row rather than disappearing. An earlier version hid the
  // links here, which left a phone with no route from one page to another at
  // all — the exact thing the multi-page split was for.
  //
  // No disclosure menu: a hamburger is a JS widget and a focus trap to get
  // right, and this is three links. The header also stops being sticky at this
  // width, because a permanently parked two-row bar costs too much of a phone
  // screen — everything in it is still one scroll-to-top away.
  @media (max-width: 620px) {
    position: static;

    .masthead__inner {
      flex-wrap: wrap;
      row-gap: var(--space-4);
    }

    .masthead__brand {
      flex-basis: 100%;
    }

    .masthead__nav {
      width: 100%;
      flex-wrap: wrap;
      gap: var(--space-3);
    }

    // holds the button against the right edge of the second row, under the
    // space the brand leaves
    .masthead__cta {
      margin-inline-start: auto;
    }
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

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }
}
</style>
