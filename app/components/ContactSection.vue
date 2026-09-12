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

// Focus is what actually guarantees a screen reader hears the outcome: a live
// region inserted into the DOM together with its text is not reliably
// announced, because there was nothing there to diff against. role="status"
// and role="alert" stay on as belt and braces, but the focus move is the part
// that works everywhere.
const sentEl = ref<HTMLElement | null>(null)
const errorEl = ref<HTMLElement | null>(null)

// In DOM order — a failed submit sends focus to the first field that failed.
// An error rendered under a field says nothing while focus is still parked on
// the Send button, and aria-describedby only pays off once the field is
// reached again.
const FIELD_IDS: Record<keyof typeof errors, string> = {
  name: 'c-name',
  email: 'c-email',
  message: 'c-msg',
}

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
  if (!validate()) {
    const first = (Object.keys(FIELD_IDS) as (keyof typeof errors)[]).find((f) => errors[f])
    if (first) document.getElementById(FIELD_IDS[first])?.focus()
    return
  }

  status.value = 'submitting'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, website: website.value },
    })
    status.value = 'sent'
    await nextTick()
    sentEl.value?.focus()
  } catch (e: unknown) {
    status.value = 'error'
    submitError.value =
      (e as { data?: { message?: string } })?.data?.message
      ?? 'Something went wrong sending that. Email me directly and it will get through.'
    await nextTick()
    errorEl.value?.focus()
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
              {{ contact.githubLabel }}<span class="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a :href="contact.linkedin" target="_blank" rel="noopener noreferrer">
              {{ contact.linkedinLabel }}<span class="visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- The success message replaces the form outright, which also destroys
           the Send button focus was sitting on — so it takes focus itself
           (tabindex="-1": a target for focus, never a tab stop). -->
      <p v-if="status === 'sent'" ref="sentEl" class="contact__sent" role="status" tabindex="-1">
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
            required
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
            required
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
            required
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

        <p v-if="submitError" ref="errorEl" class="contact__error" role="alert" tabindex="-1">
          {{ submitError }}
        </p>
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

    // Nocturne draws .input's boundary in --color-divider (text at 16%), which
    // over this section's ground composites to 1.04:1 — the control has no
    // visible edge here at all, and its surface fill is only 1.51:1 against
    // the band. On a mid-luminance ground the fill cannot carry the
    // distinction (darkening it gains nothing), so the border does: neutral-300
    // is 6.75:1 against the band and 11.8:1 against the fill.
    .input {
      border-color: var(--color-neutral-300);

      &:hover {
        border-color: var(--color-neutral-100);
      }

      // The fields are `required` so AT announces them as mandatory, but
      // validation is ours, not the browser's (hence `novalidate`) — and
      // Nocturne has no danger role. Firefox paints its own glow on a
      // required field the reader has passed through and left empty, which
      // would put a second error language on the form.
      &:user-invalid {
        box-shadow: none;
      }

      // The scoped attribute out-specifies nocturne's `.input:focus-visible`,
      // so the focused border has to be restated here — and the accent ring is
      // only 3.1:1 on this ground, a hair over the 3:1 floor, where the ramp's
      // light step is 8:1.
      &:focus-visible {
        border-color: var(--color-accent-200);
        outline-color: var(--color-accent-200);
      }
    }
  }

  // .btn-primary paints accent ink and an accent border: 3.1:1 at the glow end
  // of this gradient, at 14px. The accent ramp's light steps carry the same
  // treatment at 8.2:1 (ink) and 6.7:1 (border).
  &__send {
    justify-self: start;
    color: var(--color-accent-200);
    border-color: var(--color-accent-300);
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
    outline: none; // takes focus programmatically; it is prose, not a control
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
