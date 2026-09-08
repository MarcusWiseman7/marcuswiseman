# marcuswiseman

Personal site — a single-page visual CV and light services pitch. Nuxt 4 +
Vue 3 + TypeScript, styled with **Nocturne**, a dark design system authored in
Claude Design.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # then: node .output/server/index.mjs
```

## The design

`docs/design-handoff.md` is the authoritative spec — layout, tokens, interaction
states, responsive behaviour and content notes. Read it before changing
anything visual.

**All factual copy is verbatim** from Marcus's CV and from him directly: roles,
dates, numbers, stack, client descriptions. It lives in `app/data/site.ts`.
Do not reword any of it without asking him.

## Styling

Two global sheets (registered in `nuxt.config.ts`, order matters):

| File | What it is |
| --- | --- |
| `app/assets/css/nocturne.css` | The design system: tokens (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`) and component classes (`.btn`, `.tag`, `.input`, `.field`, `.card`, `.lighten`). **Byte-identical** to the Nocturne project's `styles.css` — don't edit it here; re-sync it. |
| `app/assets/css/base.scss` | Only what cannot be scoped: `--font-mono` / `--page-gutter` / `--band-max` / `--measure`, the page ground, the link ink, and the shared `.rule` and `.meta` treatments. |

Everything else is scoped SCSS in the component that owns it.

### Class naming

Two vocabularies sit side by side, deliberately:

- **Nocturne's component API** — `btn`, `btn-primary`, `btn-ghost`, `tag`,
  `tag-outline`, `input`, `field`, `lighten`. These come from the design
  system, are not BEM, and are **not ours to rename** — renaming breaks the
  sync. Use them as-is; don't restyle them locally. All their interaction
  states (hover tints, pressed states, the 2px accent `:focus-visible` ring,
  `::selection`, 45% disabled) are already built in.
- **This site's own layer** — strict BEM (`block__element--modifier`), written
  as `&__element` nesting. Blocks: `masthead`, `site-footer`, `hero`, `band`,
  `services`, `ledger`, `work`, `experience`, `stack`, `about`, `contact`.

An element carrying both — `class="btn btn-primary masthead__cta"` — takes
Nocturne's look and this site's layout. That's the intended pattern.

### The content column

Every band, the hero, the masthead, the footer **and the section dividers**
share one column (`.content-column`, `--content-max: 1000px`), which is what
keeps their edges aligned down the page. Anything full-width should carry that
class rather than relying on the page gutter alone — a divider left outside it
overhangs the content by 345px at 1920px.

Note `.band__rule` sets `margin-block`, not the `margin` shorthand: the
shorthand would reset `margin-inline` to 0 and out-specify the column's auto
centring.

Up to **1024px** (iPad landscape) it hugs the left edge, the design's original
flush-left direction. Above that it centres. The masthead and footer carry an
inner wrapper so their background, blur and border stay full-bleed while their
contents follow the column.

The transition is seamless rather than a jump: centring only has an effect once
the available width exceeds 1000px, which happens around 1136px, and eases in
from zero.

The contact band keeps its narrower 940px measure from the spec and centres
within the column — symmetric, so it reads as a narrower block rather than a
misalignment.

**This departs from the handoff**, which specifies flush-left asymmetric layout
as a Nocturne direction rule. Deliberate, at Marcus's request.

### System rules worth remembering

- Take every value from a token. Never hard-code a hex, font or spacing value.
- Primary buttons are a **1px accent outline on transparent**, never a fill.
- The contact band is the page's **only** saturated fill.
- Rules fade to transparent over 48px at each end (`.rule`).
- No pure black or white. Never bolder than the 500 heading weight.
- Small body text never drops below `--color-neutral-500` (6.1:1 on the ground);
  `--color-neutral-600` measures 4.08:1 and is deliberately unused.
- Motion budget is the sticky header and the work-row hover. Nothing else.

## Structure

```
app/
  data/site.ts            all copy and content, typed
  layouts/default.vue     sticky header + footer
  pages/index.vue         composes the sections
  components/
    SectionBand.vue       shared eyebrow/content band (rule + 180px grid)
    HeroSection.vue       01..05 sections follow in document order
    ServicesSection.vue   + the migrations ledger
    WorkSection.vue
    ExperienceSection.vue
    StackSection.vue
    AboutSection.vue
    ContactSection.vue
server/api/contact.post.ts
```

## Contact form

Client-side: required name / email / message, format validation, per-field
errors cleared on edit, a pending state, and a success message that replaces the
form. A honeypot field guards against bots.

Server-side (`server/api/contact.post.ts`): revalidates, silently accepts and
discards honeypot hits, then forwards to whatever `CONTACT_WEBHOOK_URL` points
at. **No transport is configured yet** — until that env var is set the endpoint
returns 501 and the form tells the visitor to email directly. Point it at a form
service (Formspree, Web3Forms, a Zapier hook) or replace the forward with an
SMTP/API call.

## Outstanding

- **Portrait** — none supplied. `AboutSection.vue` renders an empty framed
  placeholder; set its `portrait` constant to an image path in `public/`.
  Nocturne's `.lighten` wrapper expects a subject shot on a dark background; if
  the portrait has a light background, drop the `lighten` class from the figure.
- **Contact transport** — see above.
- **Santévet work row** — has no public URL, so it renders as a `<div>` rather
  than a dead link.

## Syncing the design system

Nocturne lives in Claude Design as project `Nocturne`
(`fbb47eae-12bb-463b-97ca-9327bfc8f322`). `nocturne.css` is a byte-identical
copy of its `styles.css`. To change the look, change it in the design project
first so the two don't drift.
