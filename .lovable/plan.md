# Supreme Nexus — High-Conversion Lead Gen Site

A premium, futuristic single-offer marketing site engineered to do one thing: get qualified business owners to book a strategy call. One CTA, one persona, one goal.

## Design system

- **Mood**: Futuristic minimalism, premium performance-agency. Disciplined grid, intentional whitespace, sharp hierarchy.
- **Palette** (dark, OKLCH-mapped):
  - Background `#0B0F14`, surface `#121826`, elevated `#151B2C`
  - Text `#F5F7FA`, muted `#9AA4B2`, border `rgba(255,255,255,0.08)`
  - **Primary accent (CTA only)**: electric teal `#10D6C5`
  - Restrained secondary `#4DA3FF` for chart/motion accents only
  - Success `#22C55E` for metric/trust signals
- **Typography**: Cabinet Grotesk (display) + Inter (body) via Google Fonts/Fontshare. Tight tracking on headings, single disciplined type scale.
- **Radii**: 14–20px cards. Subtle dark shadows, low-contrast borders, light glassmorphism only on hero overlays.
- **Single CTA lock**: every CTA across the site = `Book a Strategy Call` in teal. No competing buttons anywhere.

## Routes (TanStack file-based)

Single-page marketing site is intentional here — the entire UX is engineered as one persuasive scroll funnel toward the CTA. Splitting into multiple routes would dilute conversion intent. Nav links (Services, Process, Results, FAQ) scroll to in-page sections — this is the appropriate use of hash anchors.

- `/` — full landing experience
- Strong `head()` meta: title, description, OG tags, Twitter card

## Page structure (in order)

1. **Sticky header** — Logo (Supreme Nexus wordmark + mark), nav (Services / Process / Results / FAQ), single teal CTA. Transparent at top → blurred dark surface on scroll. Smooth mobile sheet menu.
2. **Hero** — Left-aligned headline ("Turn More Traffic Into Qualified Leads."), tight subheadline, single CTA, proof microline. Right side: animated futuristic visual — layered grid, scanning line, conversion funnel pulse, subtle data particles (CSS + lightweight SVG/canvas, no heavy libs).
3. **Credibility strip** — 5 signal markers (Conversion-focused strategy · Lead generation systems · Funnel optimization · Appointment-focused growth · Fast implementation). Monospace-style labels, thin dividers, no icon-circles.
4. **Problem / Outcome** — Two-column split. Left = leaks (wasted traffic, weak funnels, low inquiry rate, poor follow-up). Right = fixes (stronger capture, cleaner journey, more booked calls). Elegant dark panels, no cartoon icons.
5. **Services** — 6 cards in a refined grid: CRO, Lead Gen Systems, Funnel & Landing Page Optimization, CRM/Follow-Up Flow, Offer Positioning, Appointment Flow Optimization. Each: name + outcome line + small signal label. Subtle hover lift + border glow.
6. **Process** — 4-step horizontal timeline (desktop) → stacked vertical (mobile): Audit → Identify leaks → Implement → Drive bookings. Numbered, connected by a thin animated line.
7. **Results / Proof** — Metric cards with animated counters (inquiry rate ↑, landing page CVR ↑, booked calls ↑, lead handling speed ↑) + 2 short testimonial-style quote cards. Credible placeholder ranges, no inflated claims.
8. **FAQ** — Sleek accordion: Who is this for? · How fast can we start? · Existing funnels? · Best-fit businesses? · What happens on the call? Smooth expand/collapse.
9. **Final CTA** — High-contrast closing block. Confident headline, one supporting line, the single CTA, microtext: "For businesses ready to improve lead flow and conversion performance."
10. **Footer** — Wordmark, positioning line, repeated nav, CTA repeat. Minimal.
11. **Mobile sticky bottom CTA bar** — appears after hero scrolls out.

## Motion & interactions

- Smooth scroll, sticky header transition on scroll.
- Hero: subtle animated grid + scan line + data pulses (CSS keyframes + SVG).
- Section reveals: opacity + clip mask on enter (IntersectionObserver, no heavy library).
- Buttons: small lift + teal glow on hover.
- Cards: micro elevation + border glow on hover.
- Animated number counters in Results section.
- No blobs, no parallax, no bounce.

## Copy direction

Direct-response, zero-fluff. Short sentences, specific outcomes, confident voice. No "revolutionize / unlock / synergy" language. Focus: more qualified leads, better conversion, more booked calls, less wasted traffic.

## Technical / SEO

- Strong H1, semantic H2 structure, meta + OG + Twitter tags in `head()`.
- Mobile-first responsive, accessible focus rings (teal), high contrast.
- Lightweight: no heavy animation libs — Tailwind v4 + CSS keyframes + small IntersectionObserver hook.
- Booking CTA: links to a placeholder calendar URL (`https://cal.com/...`) — easily swappable. Can wire Cal.com / Calendly embed later if desired.

## Suggested improvements over your brief

1. **Mobile sticky CTA bar** — captures intent from scroll-deep mobile readers. Same CTA, no competing action.
2. **Animated counters in Results** — adds momentum/credibility without faking numbers (use ranges like "2–4× inquiry rate").
3. **Single-route SPA scroll** instead of multi-page — preserves conversion funnel intent (your nav sections aren't standalone destinations, they're persuasion beats).
4. **Restraint on the secondary blue accent** — limit `#4DA3FF` strictly to the hero motion graphic so teal owns 100% of the conversion signal.
5. **Honest proof framing** — placeholder metrics shown as ranges + signal labels rather than fake hard numbers, preserving trust until real case data lands.
6. **Future hook**: add a `/case-studies/$slug` route later when real wins land — keeps the home page laser-focused now while leaving room to scale credibility.

Ready to build on approval.
