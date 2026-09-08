<script setup lang="ts">
import { contact } from '~/data/site'

type Status = 'idle' | 'submitting' | 'sent' | 'error'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive<Record<'name' | 'email' | 'message', string>>({
  name: '',
  email: '',
  message: '',
})
const status = ref<Status>('idle')
const submitError = ref('')

// Spam guard: a field no human sees. Bots fill it, and we silently accept.
const website = ref('')

// Deliberately loose — the server and the mail transport are the real
// authorities on deliverability; this only catches obvious typos.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Please add your name.'
  errors.email = !form.email.trim()
    ? 'Please add an email address.'
    : EMAIL.test(form.email.trim())
      ? ''
      : 'That email address does not look right.'
  errors.message = form.message.trim() ? '' : 'Please add a sentence or two.'
  return !errors.name && !errors.email && !errors.message
}

// editing a field clears its own error, not the others
function clear(field: keyof typeof errors) {
  errors[field] = ''
}

async function onSubmit() {
  if (status.value === 'submitting') return
  submitError.value = ''
  if (!validate()) return

  status.value = 'submitting'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, website: website.value },
    })
    status.value = 'sent'
  } catch (e: unknown) {
    status.value = 'error'
    submitError.value =
      (e as { data?: { message?: string } })?.data?.message
      ?? 'Something went wrong sending that. Email me directly and it will get through.'
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__inner content-column">
      <div class="contact__pitch">
        <h2 class="contact__title">Have a project or a role in mind?</h2>
        <p class="contact__copy">
          One-off builds, migrations and audits, or permanent frontend roles. Either way, a
          paragraph about the problem is enough to start.
        </p>
        <ul class="contact__links">
          <li><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
          <li>
            <a :href="contact.github" target="_blank" rel="noopener noreferrer">
              {{ contact.githubLabel }}
            </a>
          </li>
          <li>
            <a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">
              {{ contact.linkedinLabel }}
            </a>
          </li>
        </ul>
      </div>

      <!-- the success message replaces the form outright -->
      <p v-if="status === 'sent'" class="contact__sent" role="status">
        Thanks — that's with me. I'll reply from {{ contact.email }}.
      </p>

      <form v-else class="contact__form" novalidate @submit.prevent="onSubmit">
        <div class="field">
          <label for="c-name">Name</label>
          <input
            id="c-name"
            v-model="form.name"
            class="input"
            type="text"
            placeholder="Your name"
            autocomplete="name"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'c-name-error' : undefined"
            @input="clear('name')"
          >
          <p v-if="errors.name" id="c-name-error" class="contact__error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label for="c-email">Email</label>
          <input
            id="c-email"
            v-model="form.email"
            class="input"
            type="email"
            placeholder="you@company.com"
            autocomplete="email"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'c-email-error' : undefined"
            @input="clear('email')"
          >
          <p v-if="errors.email" id="c-email-error" class="contact__error">{{ errors.email }}</p>
        </div>

        <div class="field">
          <label for="c-msg">What do you need built?</label>
          <textarea
            id="c-msg"
            v-model="form.message"
            class="input"
            rows="4"
            placeholder="A sentence or two on the project, timeline and stack."
            :aria-invalid="!!errors.message"
            :aria-describedby="errors.message ? 'c-msg-error' : undefined"
            @input="clear('message')"
          />
          <p v-if="errors.message" id="c-msg-error" class="contact__error">{{ errors.message }}</p>
        </div>

        <!-- honeypot: off-screen, not announced, never focusable -->
        <div class="contact__honeypot" aria-hidden="true">
          <label for="c-website">Website</label>
          <input id="c-website" v-model="website" type="text" tabindex="-1" autocomplete="off">
        </div>

        <button class="btn btn-primary contact__send" type="submit" :disabled="status === 'submitting'">
          {{ status === 'submitting' ? 'Sending…' : 'Send' }}
        </button>

        <p v-if="submitError" class="contact__error" role="alert">{{ submitError }}</p>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// The page's one saturated field — full-bleed, per the design system's rule
// that nothing else floods.
.contact {
  margin-top: calc(var(--space-8) * 2.5);
  padding: calc(var(--space-8) * 2.2) var(--page-gutter);
  background: linear-gradient(160deg, var(--color-section) 0%, var(--color-section-glow) 100%);

  &__inner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: calc(var(--space-8) * 2);
    // narrower than the shared column by design; .content-column centres it
    max-width: 940px;
  }

  &__title {
    font-family: var(--font-heading);
    font-weight: 500;
    font-size: clamp(26px, 3.6vw, 34px);
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
  }

  &__copy {
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-neutral-200);
    margin: var(--space-6) 0 0;
  }

  &__links {
    display: grid;
    gap: var(--space-3);
    margin: calc(var(--space-8) * 1.2) 0 0;
    padding: 0;
    list-style: none;
    font-size: 15px;

    a {
      // on the section ground the accent link ink loses contrast, so these
      // take the neutral ramp's top step
      color: var(--color-neutral-100);
    }
  }

  &__form {
    display: grid;
    gap: var(--space-4);
    align-content: start;
  }

  &__send {
    justify-self: start;
  }

  // Nocturne is a mono palette with no error/danger role, so validation
  // messages take the accent ramp's light step — legible on the section ground
  // and consistent with the system.
  &__error {
    font-size: 13px;
    line-height: 1.4;
    color: var(--color-accent-200);
    margin: var(--space-2) 0 0;
  }

  &__sent {
    align-self: start;
    font-size: 16px;
    line-height: 1.6;
    color: var(--color-neutral-100);
    margin: 0;
  }

  &__honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
}
</style>
