# Pre-release checklist — marcuswiseman.com

Written against the working tree at `06b1e7f` + uncommitted multi-page split.
`npm run build` and `npm run typecheck` both pass; all six routes prerender,
`/llms.txt` and `/sitemap.xml` emit. What is below is what stands between that
and a URL you would put on a LinkedIn profile.

Ordered by stage. Stage 01 blocks everything else, because it is the only work
nobody but Marcus can do.

---

## 01 — Copy only Marcus can write

Four sections are stubbed with `<!-- DELIBERATELY MISSING -->` comments in the
source. They are the highest-intent content on the site — `/migrations` is the
page that answers *"nuxt 2 to nuxt 3 migration consultant"*, a query with a
budget behind it — and both pages are currently thin exactly where a reader
decides.

### 1.1 `/migrations` → `02 — How it runs`

**File:** [app/pages/migrations.vue](../app/pages/migrations.vue), after the
`01 — The record` band.
**Shape:** a `<SectionBand eyebrow="02 — How it runs">` holding four or five
steps, each an `<h3>` plus one paragraph.

Answer these in your own words — one paragraph each:

1. **How do you scope one before quoting it?** What do you read first, how long
   does that audit take, what tells you the job is two weeks versus two months?
2. **What moves first, and why?** Build config? The test suite? One leaf route?
   Name the actual first commit you make.
3. **How does the app keep shipping while it moves?** Branch strategy, feature
   flags, dual-running, incremental adoption — this is the claim the ledger
   already makes ("none of them a rewrite from scratch") and the page never
   substantiates.
4. **What do you refuse to do?** The refusal is more persuasive than the offer.
   If you will not do a big-bang rewrite, say so and say what you do instead.
5. **How do you know it's done?** You already list SonarQube, Datadog and GitLab
   CI on the CV — this is where they stop being a tag list and become a method.

### 1.2 `/migrations` → `03 — Questions`

**File:** same, after `02`.
**Shape:** three `<h3>` questions, each with its answer directly beneath. A
question heading with its answer under it is the most retrievable block shape
there is — it is what gets lifted verbatim into an AI answer.

- *"How long does a Nuxt 2 to Nuxt 3 migration take?"* — give a real range tied
  to codebase size. You have four data points; nobody writing this page from
  theory does.
- *"Can the application keep shipping during the migration?"* — you did it on a
  live revenue funnel. Say that, with the constraint that made it hard.
- *"Is it worth migrating, or should we rewrite?"* — your actual opinion,
  including when the answer is "rewrite".

**Also:** add `FAQPage` / `Question` / `Answer` schema to the page once the copy
exists. Google has narrowed FAQ rich results, but the markup still feeds answer
engines, and this page is built for them.

### 1.3 `/work/santevet-funnel` → `02 — The brief`

**File:** [app/pages/work/santevet-funnel.vue](../app/pages/work/santevet-funnel.vue).
**Shape:** `<SectionBand eyebrow="02 — The brief">`, two or three paragraphs.

Everything currently on that page is CV bullets, which is why it reads as a list
of what was done rather than a case study. The brief is the framing that makes a
reader see why it was hard:

- What state was the funnel in when you took it on? Nuxt 2 / Bridge, how many
  markets, were the brands forked codebases or already unified?
- What was the constraint? It is a live revenue funnel — put a number or a
  volume on that if you are allowed to.
- What was the alternative that got rejected, and why was one codebase across
  five markets and three brands the harder-but-right call?

### 1.4 `/work/santevet-funnel` → `03 — Outcome`

**Shape:** `<SectionBand eyebrow="03 — Outcome">`.

Whatever moved and whatever you are permitted to say. Candidates, easiest first:

- time-to-launch for a new market (the killer metric for white-label — before
  the architecture versus after)
- build time, bundle size, Core Web Vitals before/after either migration
- SonarQube coverage or quality-gate movement
- incidents or rollbacks during the migration window (zero is a number)
- conversion, if it is yours to publish

**If none of it can be disclosed, say that.** A stated constraint —
*"conversion and revenue figures are the client's to publish; what I can say
is…"* — reads as credible. An empty section reads as nothing happened.

### 1.5 Put the new copy in `site.ts`, not in the `.vue` files

**This is a trap, and it is the reason this item exists.**
[server/routes/llms.txt.ts](../server/routes/llms.txt.ts) generates `/llms.txt`
from `app/data/site.ts` so the two can never drift. Copy written straight into
`migrations.vue` or `santevet-funnel.vue` will render on the page and be
**silently absent from `/llms.txt`** — the four best sections on the site,
invisible to exactly the machine readers the file exists for.

So: add `migrationProcess`, `migrationFaq`, `caseStudyBrief` and
`caseStudyOutcome` to `site.ts`, render the bands from them, and extend the
`llms.txt` generator with a section for each. Then re-check
[server/utils/pages.ts](../server/utils/pages.ts) — the `/migrations` and
`/work/santevet-funnel` summaries there describe pages that are about to get
substantially deeper.

### 1.6 Confirm the availability claim

[app/components/HeroSection.vue](../app/components/HeroSection.vue) hardcodes
**"Available for project work"** above the fold on the home page. Confirm it is
true the day you launch. Consider moving it into `site.ts` as
`{ available: boolean, label: string }` so switching it off later is one edit
and not a hunt.

---

## 02 — Assets that do not exist yet

### 2.1 Open Graph image — the biggest single miss

Every page sets `twitterCard: 'summary_large_image'` and **no page sets an
`og:image`**, because there isn't one. Confirmed in the prerendered output:
`.output/public/index.html` has `og:title`, `og:description`, `og:type`,
`og:url`, `twitter:card` — and no image.

A job-hunting site is shared on LinkedIn. Right now every share renders as a
bare text link with a blank card. Fix:

- design a 1200×630 card in Nocturne's own palette (ground `#161826`, the name
  in Inter 500, the deck line, the accent hairline) → `public/og-default.png`
- add `ogImage`, `ogImageWidth: 1200`, `ogImageHeight: 630`, `ogImageAlt` and
  `twitterImage` — best as head defaults in
  [app/app.vue](../app/app.vue) so all six pages inherit rather than six
  copy-pasted blocks
- add `ogSiteName: 'Marcus Wiseman'` and `ogLocale: 'en_US'` while you are there
- optional, later: variants for `/cv` and `/migrations`

### 2.2 Portrait

[app/components/AboutSection.vue](../app/components/AboutSection.vue) ships an
empty dashed 220×264 frame — `const portrait: string | null = null`.

Nocturne wraps it in `.lighten` (`mix-blend-mode: lighten`), which **expects a
subject shot on a dark or black background**. A light-background portrait will
render as a bright rectangle. Either supply a dark-background photo, or drop the
`lighten` class from the `<figure>` for this one image.

Ship it at 440×528 for 2× displays, as WebP with a JPEG fallback, and write real
alt text (not just "Marcus Wiseman" — the current placeholder alt).

### 2.3 Favicon set

`public/` has `favicon.ico` and nothing else. Add:

- `icon.svg` (monochrome, works on light and dark tabs)
- `apple-touch-icon.png` at 180×180
- `site.webmanifest` with `theme_color: #161826` and `background_color: #161826`

Register them in the `app.head.link` array in
[nuxt.config.ts](../nuxt.config.ts), next to the existing `favicon.ico` entry.

---

## 03 — Make it actually work in production

### 3.1 Wire the contact form — it currently fails 100% of the time

[server/api/contact.post.ts](../server/api/contact.post.ts) throws **501** when
`CONTACT_WEBHOOK_URL` is unset, and it is unset. Every real submission today
gets *"The contact form is not connected yet — please email me directly."*

Pick a transport (Resend, Formspree, Web3Forms, a Zapier catch hook), set the
env var on the host, and **submit the form from the deployed site for real** —
then check the mail landed and did not go to spam.

### 3.2 Add `.env.example`

`.gitignore` already whitelists it (`!.env.example`) but the file does not
exist. One line: `CONTACT_WEBHOOK_URL=`, plus `NUXT_PUBLIC_SITE_URL=` with a
comment on when to override it.

### 3.3 Rate-limit `/api/contact`

The honeypot catches naive bots. Nothing stops a loop hitting the endpoint ten
thousand times and burning your webhook quota or flooding your inbox. Add a
per-IP throttle — an in-memory LRU in the handler is enough at this scale, or
use the host's own rate limiting.

### 3.4 Choose a host that runs Nitro

**This is not a static site.** The comment in `nuxt.config.ts` says it: the
routes prerender but the Nitro server has to stay, because `/api/contact` runs.
`npm run generate` would silently drop the API. Pick a host with Node or
serverless function support (Vercel, Netlify, Cloudflare Workers via the nitro
preset), and after deploying verify the six HTML routes serve as static files
*and* `/api/contact` responds.

### 3.5 Domain, DNS, TLS, and one canonical host

Register/point `marcuswiseman.com`, get TLS, and **redirect `www` → apex**. The
canonical tags, the schema `@id` graph, the sitemap and `robots.txt` all say
apex with no `www`; two reachable spellings is how one site starts looking like
two.

### 3.6 Set `NUXT_PUBLIC_SITE_URL` on preview deploys

It defaults to the production URL, which is right for prod and wrong everywhere
else — a preview deploy will currently bake `https://marcuswiseman.com/...` into
its canonicals, OG URLs and sitemap.

### 3.7 Keep preview deploys out of the index

`public/robots.txt` is static and hardcodes `Allow: /` plus the production
sitemap URL, so a leaked preview host invites crawling and competes with prod
for the same content. Add an `X-Robots-Tag: noindex` response header on
non-production environments (host config, or a `routeRules` header switched on
an env var).

### 3.8 Security headers

None are set. Add via `routeRules` in `nuxt.config.ts`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

A real CSP is achievable here — there is no third-party JS and the only external
origins are `fonts.googleapis.com` / `fonts.gstatic.com` (and those go away if
you do 4.7). Try it, then verify hydration still works in the browser console.

### 3.9 404 page

There is no `app/error.vue`. A mistyped URL currently renders Nuxt's default
error screen: no masthead, no footer, no route back into the site. Add one in
the site's own design, with links to `/`, `/work` and `/cv`.

---

## 04 — Correctness pass before you press deploy

### 4.1 Proofread the site against the CV PDF, line by line

All copy is declared verbatim from the CV, and **both documents are published
and cited** — `/cv` in HTML and `Marcus-Wiseman-CV.pdf`, which is listed in the
sitemap. If they disagree about a date or a number, an AI reader will surface
the contradiction rather than pick a winner.

Check: every `period` and `years` pair, the *331 files* / *30,000 lines* /
*five markets* / *three brands* figures, company names and spellings, and the
en-dash (CV) versus em-dash (home page) convention the data file deliberately
maintains. PDF is currently dated `2026-09-01` — regenerate if anything moved.

### 4.2 Verify the "four migrations" arithmetic reads

`migrations` in `site.ts` has **three rows**, and the closing line says *"Four
production migrations."* The sum is right — two Santévet plus *"Two media and
social platforms, SimplyDigital"* — but the reader has to notice the third row
is plural to get there. Either leave it (it is accurate) or split the
SimplyDigital row in two so the ledger counts to four on its face.

### 4.3 Check every outbound link resolves

A dead client site on a portfolio is worse than not listing it. Hit all of:
`glopcom.com`, `abadiart.org`, `kosmetikapetralipa.cz`, `sokollipa.cz`,
`santevet.com`, `assurance.santevet.com`, the GitHub profile, and the LinkedIn
profile — and confirm `linkedin.com/in/marcus-wiseman` is the real vanity URL
and not a near-miss.

### 4.4 Validate the structured data

Run all six URLs through Google's Rich Results Test and the schema.org
validator. The specific thing to confirm: **`#identity` resolves to exactly one
`Person` across `/`, `/cv` and `/about`.** The comment in
[app/pages/cv.vue](../app/pages/cv.vue) documents the trap — a relative
`'#identity'` gets namespaced by `nuxt-schema-org` into
`'#/schema/person/#identity'`, which forks the person in two and leaves
`mainEntity` pointing at nothing. Verify it in the rendered JSON-LD, not by
reading the source.

Also check `defineBreadcrumb` on the case study and the `ItemList` on `/work`.

### 4.5 Re-verify `/llms.txt` and `/sitemap.xml` after the copy lands

Both are generated, so they are correct *now*. After stage 01 they will be
correct only if you did 1.5. Fetch both from the deployed site and read them.

### 4.6 Responsive check at the real seams

Not "test mobile" — test the three widths where this layout actually changes:

| Width | What happens |
| --- | --- |
| **620px** | masthead stops being sticky and the nav wraps to a second row |
| **760px** | `SectionBand`'s 180px eyebrow rail collapses and eyebrows stack |
| **1025px** | `.content-column` switches from flush-left to centred |

Plus 380px (smallest real phone) and 1440px. Check the CV's skills table and the
migrations record rows specifically — those are the two-column blocks inside a
band, and the comment in `SectionBand.vue` records that they already forced the
rail breakpoint from 560px up to 760px once.

### 4.7 Fonts: self-host Inter, or at least stop importing it from CSS

`nocturne.css` line 2 is
`@import url('https://fonts.googleapis.com/css2?family=Inter…')`. Two problems:

- **Performance.** The `@import` is only discovered after the stylesheet parses,
  so it chains a second round-trip before the `<h1>` can paint in Inter. The
  `preconnect` hints in `nuxt.config.ts` help less than they look like they do,
  because the request is late regardless. This is your LCP.
- **GDPR.** Serving Google Fonts hands EU visitors' IP addresses to Google, and
  German courts have ruled against exactly that. You are based in Spain, serving
  the EU.

Self-hosting the three weights as woff2 in `public/fonts/` fixes both and
removes two external origins from the CSP in 3.8.

**Constraint:** the README declares `nocturne.css` **byte-identical** to the
design system's source and not ours to edit. So do this with an `@font-face`
block and a `<link rel="preload">` added in `base.scss` / `nuxt.config.ts` that
wins over the imported sheet — or re-sync Nocturne with the import removed
upstream. Do not just edit the file in place.

### 4.8 Accessibility pass

The components are already carefully built (skip link with a real focus move,
`aria-describedby` on field errors, focus sent to the first failed field,
`role="status"` on the sent message, `(opens in a new tab)` suffixes). Verify it
holds end to end:

- axe or Lighthouse a11y on all six pages
- keyboard-only: skip link → masthead → work rows → contact form → footer
- screen reader: submit the form empty, then submit it valid, and confirm both
  outcomes are announced
- contrast on the contact band — the component reasons about it in comments;
  confirm the reasoning against a real checker

### 4.9 Lighthouse on the deployed site

Target ≥95 on all four categories. Run it against production, not localhost —
the numbers that matter include the host's cache headers and TLS handshake.

### 4.10 Confirm hashed assets get long cache headers

`/_nuxt/*` filenames are content-hashed and should serve `immutable` with a long
`max-age`, while the HTML revalidates. Most hosts do this by default; confirm
rather than assume.

---

## 05 — After it is live

### 5.1 Search Console and Bing Webmaster Tools

Verify the domain, submit `sitemap.xml`, then come back in a week and confirm
all six pages are actually indexed — not just submitted.

### 5.2 Test the social cards for real

LinkedIn Post Inspector (it caches aggressively — inspect *before* you post),
the X card validator, and paste the URL into Slack and iMessage. This is the
check that catches a broken `og:image` path.

### 5.3 Analytics, or a deliberate decision not to

You will want to know whether `/migrations` gets traffic — that page is a bet.
Plausible, Fathom or Umami keep it privacy-friendly and avoid a cookie banner.
If the answer is "none", make that a decision rather than an omission.

### 5.4 Point the profiles at the site

LinkedIn website field and Featured section (link `/cv` and `/migrations`
specifically, not just the root), GitHub profile URL, and the GitHub profile
README if you have one. The schema graph already lists both as `sameAs` — this
makes the link bidirectional, which is what actually resolves the entity.

### 5.5 Uptime monitoring

A check on `/` and a POST check on `/api/contact`. A silently broken contact
form on a job-hunting site is the worst failure mode available to you.

### 5.6 CI

A GitHub Action running `npm run typecheck` and `npm run build` on push. Right
now nothing stops a broken build reaching the host.

### 5.7 Pin the Node version

Add `engines.node` to `package.json` and a `.nvmrc`, matching whatever the host
runs. Local is currently Node 22.

### 5.8 Update the README

It is stale in three ways:

- it calls the site *"a single-page personal site"* — it is six pages with a
  masthead, an `llms.txt` and a sitemap
- the styling table references `--band-max`; `base.scss` defines `--content-max`
- the BEM block list omits `page-head`, `crumbs`, `facts`, `record`, `skills`
  and `more`

### 5.9 Decide about the email address

`md.wiseman@hotmail.com` appears on the site, in the CV PDF, in the schema
graph and in `llms.txt`. Once the domain exists, `marcus@marcuswiseman.com` is
free and reads differently to a hiring manager. If you switch, it is one edit in
`site.ts` — **and a regenerated PDF**, or the two documents disagree.

---

## Not on this list, and why

- **`work[0].href === '#'`** — not a dead link. `WorkSection.vue` resolves it to
  a plain `<div>`, correctly.
- **No `<lastmod>` in the sitemap** — deliberate, and the reasoning in
  `sitemap.xml.ts` is sound.
- **Duplicate content between `/`, `/cv` and `/about`** — already handled; each
  block of copy has exactly one home and the pages link rather than repeat.
- **Hand-rolled sitemap instead of `@nuxtjs/sitemap`** — right call at six pages.
