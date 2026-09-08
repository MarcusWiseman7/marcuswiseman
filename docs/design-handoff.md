# Handoff: Personal site — Marcus Wiseman

## Overview
A single-page personal site serving two audiences: independent stakeholders hiring for one-off
project work, and recruiters / hiring managers assessing the same person for a permanent
senior frontend role. It is a visual CV plus a light services pitch: identity, what he does,
migration track record, selected work, experience timeline, stack, about, and a contact form
with a CV download.

Primary audience if the two conflict: recruiters / hiring. Copy tone: dry and confident.
Motion budget: subtle polish only (hover states, sticky header) — no scroll choreography.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the
intended look, content and behavior. They are not production code to lift directly.

The task is to **recreate these designs in the target codebase's own environment**, using its
established patterns and libraries. If no codebase exists yet, pick the appropriate framework
and implement there. Nuxt 4 / Vue 3 + TypeScript is the natural choice here: it is the subject's
own stack, the site is static, and the sections map cleanly onto components.

The design consumes the **Nocturne** design system as a plain stylesheet
(`styles.css`, included in this bundle). Every color, font, space, radius and shadow in the
design comes from its CSS custom properties. Keep that contract: port the token sheet, then
style against `var(--*)` — do not hard-code the hex values listed further down, they are
documentation only.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy and interaction states. Recreate the
UI faithfully. Two known placeholders:
- the CV download button has `href="#"` — wire to the real PDF;
- the About portrait is a drag-and-drop placeholder component (`image-slot.js`) — replace with a
  real `<img>`. Nocturne wraps content photos in `.lighten` (`mix-blend-mode: lighten`), which
  expects a photo shot on a dark or black background; a light-background portrait will read as a
  bright rectangle. Either supply a dark-background portrait or drop the `.lighten` wrapper for
  this one image.
- the first work item ("Santévet sales funnel") also points at `#` — it has no public URL.

## Screens / Views

### 1. Home (the only view)
**Purpose:** a visitor decides within one screen whether to email him, and can then verify the
claim by reading down the page.

**Layout:** one column, flush left, asymmetric — content hugs the left edge with whitespace on
the right (a Nocturne direction rule). Page background `--color-bg`.

Horizontal padding is fluid on every band: `clamp(20px, 6vw, 120px)`.

Section bands below the hero share one grid:
`display: grid; grid-template-columns: minmax(0, 180px) minmax(0, 3fr); gap: var(--space-8); max-width: 1000px`
— left column is the eyebrow heading, right column the content (capped at `66ch`).
Each band opens with a `.rule` divider (see Interactions → Rules) and is separated by
`calc(var(--space-8) * 2.5)` of top padding.

**Components, in document order:**

1. **Sticky header** — `position: sticky; top: 0; z-index: 5`, flex row, space-between,
   `padding: var(--space-4) clamp(20px, 6vw, 120px)`.
   Background `color-mix(in srgb, var(--color-bg) 88%, transparent)` + `backdrop-filter: blur(8px)`,
   bottom border `1px solid var(--color-neutral-900)`.
   Left: "Marcus Wiseman", `--font-heading` 15px. Right: `.btn .btn-primary` at 13px,
   label "Get in touch", anchors to `#contact`.

2. **Hero** — `padding: clamp(48px, 9vw, 104px) … 0`, `max-width: 900px`.
   - Availability eyebrow: flex row, `gap: var(--space-3)`; an 18×1px `--color-accent` bar, then
     "Available for project work" in monospace 12px, `letter-spacing: .14em`, uppercase,
     `--color-accent-300`.
   - H1 "Marcus Wiseman": `--font-heading`, weight 500, `font-size: clamp(38px, 6vw, 64px)`,
     `line-height: 1.04`, `letter-spacing: -.025em`, `margin-top: var(--space-8)`.
   - Deck: `clamp(18px, 2.4vw, 22px)`, `line-height: 1.45`, `--color-neutral-300`, `max-width: 32ch` —
     "Senior frontend engineer. Vue, Nuxt, TypeScript — and the migrations that get you there."
   - Body paragraph: 17px, `line-height: 1.65`, `--color-neutral-400`, `max-width: 68ch`,
     `text-wrap: pretty`.
   - Actions: flex row, `gap: var(--space-4)`, wraps. `.btn .btn-primary` "Download CV (PDF)" and
     `.btn .btn-ghost` "md.wiseman@hotmail.com" (`mailto:`).
   - Location line: monospace 13px, `--color-neutral-500` — "Asturias, Spain · remote across EU time zones".

3. **01 — What I do** (`#services`) — four items, `gap: calc(var(--space-8) * 1.2)`.
   Each: h3 `--font-heading` weight 500 / 20px, then a 16px `--color-neutral-400` paragraph at
   `line-height: 1.6`, `margin-top: var(--space-3)`.
   Headings: "Legacy Vue and Nuxt migrations", "White-label and multi-locale architecture",
   "Frontend delivery, end to end", "The unglamorous half".

   Then the **migrations ledger**, the one accent-marked block on the page:
   `border-left: 1px solid var(--color-accent-700); padding-left: var(--space-8)`.
   Label "Migrations shipped" in monospace 12px uppercase `--color-accent-300`.
   Three rows, `gap: var(--space-4)`, each a `minmax(0,1fr) auto` grid with `align-items: baseline`:
   project name (15px, `--color-neutral-300`) against a monospace 13px `--color-neutral-500` label —
   "Nuxt 2 → Nuxt 3 · JS → TS", "Nuxt → standalone Vue", "Nuxt 2 → Nuxt 3".
   Closing line, 15px `--color-neutral-500`: "Four production migrations, none of them a rewrite from scratch."

4. **02 — Selected work** (`#work`) — five `<a class="worklink">` rows, each
   `display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: var(--space-6);
   padding: var(--space-6) 0; border-bottom: 1px solid var(--color-neutral-900)`.
   Left: title `--font-heading` 18px `--color-text`, then a 15px `--color-neutral-500` description.
   Right (`align-self: center`): monospace 13px `--color-neutral-500` stack label — "Vue · TS" for
   Santévet, "Nuxt" for the other four.
   Rows: Santévet sales funnel (`#`), glopcom.com, abadiart.org, kosmetikapetralipa.cz, sokollipa.cz.

5. **03 — Experience** (`#experience`) — five entries, `gap: calc(var(--space-8) * 1.3)`.
   Each is `grid-template-columns: minmax(0, 130px) minmax(0, 1fr); gap: var(--space-8)`:
   a monospace 13px `--color-neutral-500` year range (`padding-top: 4px`) beside a
   `--font-heading` 18px role line and a 15px `--color-neutral-400` paragraph.

6. **04 — Stack** (`#stack`) — three groups, `gap: var(--space-8)`. Group label: monospace 12px,
   `letter-spacing: .1em`, uppercase, `--color-neutral-500`, `margin-bottom: var(--space-4)`.
   Items are `.tag .tag-outline` in a `flex-wrap` row with `gap: var(--space-3)`.

7. **05 — About** (`#about`) — flex row, wraps, `gap: var(--space-8)`, `align-items: start`.
   Portrait: 220×264, `.lighten` wrapper, `border-radius: var(--radius-md)` (8px).
   Text column `flex: 1 1 300px; min-width: 0`: a 16px `--color-neutral-300` paragraph and a
   16px `--color-neutral-400` paragraph, `line-height: 1.65`, `text-wrap: pretty`.

8. **Contact band** (`#contact`) — the page's one saturated field:
   `background: linear-gradient(160deg, var(--color-section) 0%, var(--color-section-glow) 100%)`,
   `padding: calc(var(--space-8) * 2.2) clamp(20px, 6vw, 120px)`, full-bleed.
   Inside: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: calc(var(--space-8) * 2); max-width: 940px`.
   - Left: h2 `--font-heading` 500, `clamp(26px, 3.6vw, 34px)`, `letter-spacing: -.02em` —
     "Have a project or a role in mind?"; a 16px `--color-neutral-200` paragraph; then three links
     in `--color-neutral-100` (email, github.com/MarcusWiseman7, linkedin.com/in/marcus-wiseman).
   - Right: form, `display: grid; gap: var(--space-4)` — `.field` + `label` + `.input` for Name (text),
     Email (email), and "What do you need built?" (`<textarea rows="4">`), then
     `.btn .btn-primary` "Send", `justify-self: start`.

9. **Footer** — flex row, wraps, space-between, monospace 12px `--color-neutral-500`:
   "Marcus Wiseman · Senior Frontend Engineer" / "Asturias, Spain · Remote (EU)".

## Interactions & Behavior
- **Header:** sticky, translucent + blurred over the scrolling page. "Get in touch" jumps to `#contact`.
- **Work rows (`.worklink`):** `transition: border-color .18s ease, padding-left .18s ease`;
  on hover the bottom border becomes `--color-accent-700` and the row slides right by 8px
  (`padding-left: 8px`). No other transform, no shadow.
- **Rules (`.rule`):** `height: 1px` with
  `background: linear-gradient(to right, transparent, var(--color-neutral-800) 48px, var(--color-neutral-800) calc(100% - 48px), transparent)`
  — Nocturne rules fade out over 48px at each end rather than stopping cleanly. Keep this.
- **Buttons, inputs, tags:** all states come from the design system — hover tints and pressed
  states from the accent ramp, `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`,
  `::selection` an accent tint, disabled at 45% opacity. Do not restyle them per component.
- **Links:** `a { color: var(--color-accent-300) }`, `a:hover { color: var(--color-accent-200) }`.
- **Contact form:** presentational in the prototype (`type="button"`, no handler). Implement for real:
  required name / email / message, email format validation, inline field errors, a pending state on
  Send, and a success message that replaces the form. Pick a transport (form service, serverless
  function, or mailto fallback) — none is assumed. Add a honeypot or equivalent spam guard.
- **Responsive:** fluid, no media queries. Horizontal padding and hero type scale with `clamp()`;
  every grid track is `minmax(0, …)` so nothing overflows; the About row and contact band reflow to
  one column via wrap / `auto-fit`. Verify around 380px, 768px and 1440px. The eyebrow column
  (180px) collapses awkwardly under ~560px — if you support very narrow viewports, stack the
  eyebrow above its content there.
- **Motion budget:** hover states and the sticky header only. No scroll-triggered animation was
  designed; respect `prefers-reduced-motion` if you add any.

## State Management
Effectively none — the page is static content. The only real state is the contact form:
`{ name, email, message, status: 'idle' | 'submitting' | 'sent' | 'error', errors: {} }`.
Transitions: field edit → clears that field's error; Send → validate → `submitting` → `sent` or
`error`. No data fetching; the CV is a static asset.

## Design Tokens
From Nocturne's `styles.css` (bundled). Documentation only — consume the variables, not these literals.

**Colors**
- Ground / surface / ink: `--color-bg` #161826, `--color-surface` #232532, `--color-text` #e9e9ed
- Accent: `--color-accent` #9184d9. Ramp: 100 #f5f4ff, 200 #e7e5fe, 300 #d2cefd, 400 #b5abfc,
  500 #968ae0, 600 #796cbf, 700 #5d5294, 800 #423a6a, 900 #2b2741
- Neutral ramp: 100 #f3f5fe, 200 #e4e7f5, 300 #cfd3e5, 400 #b2b6ca, 500 #9397ab, 600 #75798c,
  700 #595d6c, 800 #3f424d, 900 #292b31
- Contact band: `--color-section` #262a60, `--color-section-glow` #353b80
- `--color-divider`: `color-mix(in srgb, #e9e9ed 16%, transparent)`
- `--color-accent-2-*` exists but is a stand-in — this is a mono palette, treat it as one accent role.

**Contrast note:** small body-size text must not drop below `--color-neutral-500` (6.1:1 on the
ground). `--color-neutral-600` measures 4.08:1 and was deliberately removed from this design.
Accent-on-ground is ~3:1 — fine for the 12px uppercase eyebrows and interface chrome, not for
paragraphs; paragraph-size accent text uses `--color-accent-300`.

**Type** — Inter over Inter: `--font-heading` / `--font-body` = `"Inter", system-ui, sans-serif`,
`--font-heading-weight: 500` (never bolder — hierarchy is size and space).
Sizes in use: 64/38 fluid h1, 34/26 fluid h2, 22/18 fluid deck, 20 h3, 18 item title, 17 and 16 body,
15 secondary, 13 and 12 monospace meta. Monospace meta is `ui-monospace, monospace`
(system stack — Nocturne defines no mono token; substitute the codebase's mono if it has one).

**Spacing** (density 0.70×): `--space-1` 2.8px, `-2` 5.6px, `-3` 8.4px, `-4` 11.2px, `-6` 16.8px,
`-8` 22.4px. Section rhythm is multiples: `calc(var(--space-8) * 1.2 | 1.3 | 1.5 | 2.2 | 2.5)`.

**Radius:** `--radius-sm` 4px, `--radius-md` 8px, `--radius-lg` 14px.

**Shadow:** `--shadow-sm` `0 0 0 1px #3f424d`; `--shadow-md` `0 0 0 1px #595d6c, 0 6px 18px rgba(0,0,0,.55)`;
`--shadow-lg` `0 0 0 1px #9397ab, 0 16px 40px rgba(0,0,0,.65)`. On this dark ground elevation is an
edge plus ambient darkness — do not stack heavy shadows.

**Design system rules worth carrying over:** left-aligned asymmetric layout; primary buttons are a
1px accent outline on transparent, never a fill; no large saturated fills except the contact band;
no pure black or pure white; icons, if added, are Phosphor.

## Assets
- **Fonts:** Inter, weights 400/500/600, from Google Fonts.
- **Portrait:** none supplied yet. The prototype uses `image-slot.js`, a drag-and-drop placeholder —
  it is a prototyping convenience, not part of the design. Replace with a real image.
- **CV PDF:** the source CV is `Marcus-Wiseman-CV.pdf` (in this bundle) — the page's content was
  written from it. Host it and point the two "Download CV" links at it.
- **Icons:** none used.
- **Client site screenshots:** none — the work section is deliberately text-only.

## Files
- `Marcus Wiseman - Site.dc.html` — the design. The chosen direction; implement this.
- `Personal Site.dc.html` — the two explored directions side by side (1a "Dossier", which became the
  design above, and 1b "Rail", a fixed identity panel variant). Reference only.
- `styles.css` — the Nocturne token sheet and component layer. The source of every value above.
- `image-slot.js` — the portrait placeholder component used by the prototypes.
- `support.js` — prototype runtime. **Not part of the design; do not port.**
- `Marcus-Wiseman-CV.pdf` — the CV all copy was derived from.

## Content note
All factual copy (roles, dates, numbers, stack, client descriptions) came from the CV and from the
site owner directly. Treat it as verbatim: reword nothing without asking him.
