<script setup lang="ts">
import { services, migrations } from '~/data/site'
</script>

<template>
  <SectionBand id="services" eyebrow="01 — What I do">
    <div class="services">
      <div v-for="service in services" :key="service.title" class="services__item">
        <h3 class="services__title">{{ service.title }}</h3>
        <p class="services__copy">{{ service.description }}</p>
      </div>

      <!-- the ledger is the one accent-marked block on the page -->
      <div class="ledger">
        <p class="ledger__label">Migrations shipped</p>
        <ul class="ledger__list">
          <li v-for="item in migrations" :key="item.project" class="ledger__row">
            <span class="ledger__project">{{ item.project }}</span>
            <span class="meta ledger__path">{{ item.path }}</span>
          </li>
        </ul>
        <p class="ledger__close">
          Four production migrations, none of them a rewrite from scratch.
        </p>
      </div>

      <!-- the page that carries the practice in full supplies this -->
      <slot />
    </div>
  </SectionBand>
</template>

<style lang="scss" scoped>
.services {
  display: grid;
  gap: calc(var(--space-8) * 1.2);

  &__title {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: 20px;
    margin: 0;
  }

  &__copy {
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-neutral-400);
    margin: var(--space-3) 0 0;
  }
}

.ledger {
  border-left: 1px solid var(--color-accent-700);
  padding-left: var(--space-8);

  &__label {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-accent-300);
    margin: 0 0 var(--space-6);
  }

  &__list {
    display: grid;
    gap: var(--space-4);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: var(--space-6);
    align-items: baseline;
  }

  &__project {
    font-size: 15px;
    color: var(--color-neutral-300);
  }

  &__close {
    font-size: 15px;
    line-height: 1.6;
    color: var(--color-neutral-500);
    margin: var(--space-6) 0 0;
  }
}
</style>
