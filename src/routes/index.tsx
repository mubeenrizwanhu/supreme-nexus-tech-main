import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Minus, Menu, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Counter } from "@/components/site/Counter";
import { MagneticButton } from "@/components/site/MagneticButton";
import { FadeUpSection, FadeUpItem } from "@/components/site/FadeUpSection";
import { ROICalculator } from "@/components/site/ROICalculator";
import { LoadingScreen } from "@/components/site/LoadingScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Supreme Nexus — Turn More Traffic Into Qualified Leads" },
      {
        name: "description",
        content:
          "Conversion systems that turn traffic into qualified leads and booked strategy calls. Funnel optimization, lead generation, appointment-focused growth.",
      },
      { property: "og:title", content: "Supreme Nexus — Turn More Traffic Into Qualified Leads" },
      {
        property: "og:description",
        content:
          "Conversion systems that turn traffic into qualified leads and booked strategy calls.",
      },
    ],
  }),
  component: Index,
});

const BOOKING_URL = "https://cal.com/supreme-nexus/strategy-call";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "FAQ", href: "#faq" },
];

function CTAButton({
  className = "",
  size = "md",
  children = "Book a Strategy Call",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}) {
  const sizing =
    size === "lg"
      ? "h-12 px-6 text-[15px]"
      : size === "sm"
        ? "h-9 px-4 text-sm"
        : "h-11 px-5 text-sm";
  const isFullWidth = className.includes("w-full");
  return (
    <MagneticButton className={isFullWidth ? "w-full" : ""}>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${sizing} ${className}`}
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </a>
    </MagneticButton>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <div className="relative h-7 w-7">
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background:
              "conic-gradient(from 140deg, var(--primary), color-mix(in oklab, var(--primary) 30%, transparent), var(--primary))",
          }}
        />
        <div className="absolute inset-[3px] rounded-[5px] bg-background" />
        <div
          className="absolute inset-[6px] rounded-[3px]"
          style={{ background: "var(--primary)" }}
        />
      </div>
      <span className="font-display text-[17px] font-bold tracking-tight text-foreground">
        Supreme<span className="text-[color:var(--primary)]">.</span>Nexus
      </span>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[color:var(--border)] bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <CTAButton size="sm" />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[color:var(--border)] text-foreground md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[86%] border-[color:var(--border)] bg-background p-0 sm:max-w-sm"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-10">
                <Logo />
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-elevated"
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto pt-6">
                <CTAButton className="w-full" size="lg" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-40" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 18%, transparent), transparent)",
        }}
      />

      <FadeUpSection className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <FadeUpItem className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-elevated/40 px-4 py-2 backdrop-blur-md shadow-[0_0_20px_-5px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--primary)] animate-pulse-dot" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Conversion systems · built to book
            </span>
          </FadeUpItem>
          <FadeUpItem>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-tight text-foreground">
              Turn more traffic into{" "}
              <span className="relative whitespace-nowrap">
                <span className="text-[color:var(--primary)]">qualified leads.</span>
                <span
                  className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
                  }}
                />
              </span>
            </h1>
          </FadeUpItem>
          <FadeUpItem>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Supreme Nexus engineers conversion-focused systems that turn your traffic into
              qualified leads and booked opportunities — through funnel optimization, lead capture,
              and appointment flow.
            </p>
          </FadeUpItem>

          <FadeUpItem className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <CTAButton size="lg" />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Conversion strategy · Lead systems · Booked calls
            </span>
          </FadeUpItem>
        </div>

        <FadeUpItem className="flex justify-center md:col-span-5 md:justify-end">
          <HeroVisual />
        </FadeUpItem>
      </FadeUpSection>
    </section>
  );
}

const SIGNALS = [
  "Conversion-focused strategy",
  "Lead generation systems",
  "Funnel optimization",
  "Appointment-focused growth",
  "Fast implementation",
];

function CredibilityStrip() {
  return (
    <section className="border-y border-[color:var(--border)] bg-surface/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 divide-y divide-[color:var(--border)] sm:grid-cols-3 sm:divide-y-0 sm:divide-x lg:grid-cols-5">
          {SIGNALS.map((s, i) => (
            <div
              key={s}
              className={`flex items-center gap-3 px-4 py-5 ${i >= 2 ? "border-t border-[color:var(--border)] sm:border-t-0" : ""}`}
            >
              <span className="font-mono text-[10px] text-[color:var(--primary)]">0{i + 1}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {s}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LEAKS = [
  "Traffic comes in but never converts",
  "Weak funnels with high drop-off",
  "Low inquiry rate from landing pages",
  "Slow, leaky follow-up after opt-in",
  "Unqualified leads clogging the pipeline",
];

const FIXES = [
  "Stronger capture at every entry point",
  "Cleaner journey from click to booking",
  "Pages built around conversion intent",
  "Follow-up flows that close the loop",
  "More booked calls with the right buyers",
];

function ProblemOutcome() {
  return (
    <FadeUpSection className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <FadeUpItem className="mb-14 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
            The gap
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Most businesses don't have a traffic problem.
            <span className="text-muted"> They have a conversion problem.</span>
          </h2>
        </FadeUpItem>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeUpItem className="rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-7 md:p-9">
            <div className="mb-5 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                What's leaking
              </span>
            </div>
            <ul className="space-y-4">
              {LEAKS.map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <Minus className="mt-1 h-4 w-4 shrink-0 text-muted" />
                  <span className="text-sm text-foreground/85 md:text-[15px]">{l}</span>
                </li>
              ))}
            </ul>
          </FadeUpItem>

          <FadeUpItem
            className="rounded-2xl border p-7 md:p-9 backdrop-blur-md"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 30%, transparent)",
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--primary) 6%, var(--surface)), var(--surface))",
            }}
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
                What we fix
              </span>
            </div>
            <ul className="space-y-4">
              {FIXES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--primary)]" />
                  <span className="text-sm text-foreground/95 md:text-[15px]">{f}</span>
                </li>
              ))}
            </ul>
          </FadeUpItem>
        </div>
      </div>
    </FadeUpSection>
  );
}

const SERVICES = [
  {
    name: "Conversion Rate Optimization",
    outcome: "Turn more of your existing traffic into booked calls.",
    label: "CRO",
  },
  {
    name: "Lead Generation Systems",
    outcome: "Predictable inbound flow built around your offer.",
    label: "Acquisition",
  },
  {
    name: "Funnel & Landing Page Optimization",
    outcome: "Pages engineered for one outcome — book the call.",
    label: "Funnels",
  },
  {
    name: "CRM & Follow-Up Flow",
    outcome: "Stop losing leads in the gap between click and call.",
    label: "Lifecycle",
  },
  {
    name: "Offer Positioning",
    outcome: "Sharper messaging that converts ready-to-act buyers.",
    label: "Positioning",
  },
  {
    name: "Appointment Flow Optimization",
    outcome: "Frictionless booking path from interest to calendar.",
    label: "Booking",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <FadeUpSection className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <FadeUpItem className="max-w-xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
              Services
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Systems that compound into booked calls.
            </h2>
          </FadeUpItem>
          <FadeUpItem className="max-w-sm">
            <p className="text-sm text-muted md:text-base">
              Six interlocking levers. Pulled together, they turn marketing spend into qualified
              pipeline.
            </p>
          </FadeUpItem>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <FadeUpItem
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--primary)]/60 hover:shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(80% 60% at 0% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    /{String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--primary)" }}
                  />
                </div>
                <h3 className="font-display text-xl font-bold leading-tight text-foreground">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.outcome}</p>
              </div>
            </FadeUpItem>
          ))}
        </div>
      </FadeUpSection>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Audit", d: "Map your funnel and find every drop-off point." },
  { n: "02", t: "Identify leaks", d: "Pinpoint where qualified intent is leaving." },
  { n: "03", t: "Implement", d: "Ship the fixes — pages, capture, follow-up." },
  { n: "04", t: "Drive bookings", d: "Compound improvements into booked calls." },
];

function Process() {
  return (
    <section
      id="process"
      className="border-y border-[color:var(--border)] bg-surface/10 backdrop-blur-sm py-24 md:py-32"
    >
      <FadeUpSection className="mx-auto max-w-7xl px-5 md:px-8">
        <FadeUpItem className="mb-16 max-w-xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
            Process
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Four steps. No guesswork.
          </h2>
        </FadeUpItem>

        <div className="relative">
          {/* connecting line desktop */}
          <div
            className="absolute left-0 right-0 top-[34px] hidden h-px md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 50%, transparent), transparent)",
            }}
          />
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s) => (
              <FadeUpItem key={s.n} className="relative">
                <div className="relative z-10 mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-[color:var(--border)] bg-elevated/40 backdrop-blur-md shadow-[0_0_20px_-5px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
                  <span className="font-display text-2xl font-bold text-[color:var(--primary)]">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </FadeUpItem>
            ))}
          </div>
        </div>
      </FadeUpSection>
    </section>
  );
}

const METRICS = [
  { label: "Inquiry rate", value: 3.2, suffix: "×", note: "avg. lift", decimals: 1 },
  { label: "Landing page CVR", value: 184, suffix: "%", note: "improvement" },
  { label: "Booked calls / mo", value: 47, suffix: "+", note: "added pipeline" },
  { label: "Lead response time", value: 92, suffix: "%", note: "faster handling" },
];

const QUOTES = [
  {
    quote:
      "We finally stopped wasting traffic. Within weeks our calendar was filling with the right kind of buyers.",
    name: "Founder",
    role: "B2B services",
  },
  {
    quote:
      "The funnel rebuild paid for itself in the first month. The booking flow alone changed our entire sales motion.",
    name: "Director of Growth",
    role: "Coaching company",
  },
];

function Results() {
  return (
    <section id="results" className="py-24 md:py-32">
      <FadeUpSection className="mx-auto max-w-7xl px-5 md:px-8">
        <FadeUpItem className="mb-14 max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
            Results
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Performance you can measure.
          </h2>
          <p className="mt-4 text-sm text-muted md:text-base">
            Representative ranges from conversion engagements. Numbers vary by offer, traffic
            quality, and current funnel maturity.
          </p>
        </FadeUpItem>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <FadeUpItem
              key={m.label}
              className="rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {m.label}
              </span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-foreground md:text-5xl">
                  <Counter to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} />
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-2 text-xs text-[color:var(--success)]">
                <span className="h-1 w-1 rounded-full bg-[color:var(--success)]" />
                {m.note}
              </span>
            </FadeUpItem>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {QUOTES.map((q) => (
            <FadeUpItem
              key={q.name + q.role}
              className="rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-7 md:p-9"
            >
              <blockquote className="font-display text-lg leading-snug text-foreground md:text-xl">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[color:var(--primary)]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  {q.name} · {q.role}
                </span>
              </figcaption>
            </FadeUpItem>
          ))}
        </div>
      </FadeUpSection>
    </section>
  );
}

const FAQS = [
  {
    q: "Who is this for?",
    a: "Service businesses and growth-focused companies that already have traffic and an offer, but aren't converting enough of it into booked calls.",
  },
  {
    q: "How fast can we start?",
    a: "Engagements typically begin within a week of the strategy call. The initial audit lands in the first 7–10 days.",
  },
  {
    q: "Do you work with existing funnels and websites?",
    a: "Yes. Most of our work is rebuilding and optimizing what you already have, not starting from scratch.",
  },
  {
    q: "What kind of businesses benefit most?",
    a: "Service businesses with an established offer, paid or organic traffic, and a clear booking-driven sales motion.",
  },
  {
    q: "What happens on the strategy call?",
    a: "We diagnose where your funnel is leaking, identify the highest-leverage fixes, and outline what an engagement would look like. No pitch deck, no fluff.",
  },
];

function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-[color:var(--border)] bg-surface/10 backdrop-blur-sm py-24 md:py-32"
    >
      <FadeUpSection className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
        <FadeUpItem className="md:col-span-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
            FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Answers before the call.
          </h2>
        </FadeUpItem>
        <FadeUpItem className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-[color:var(--border)]"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted md:text-[15px]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUpItem>
      </FadeUpSection>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-30" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 22%, transparent), transparent)",
        }}
      />
      <FadeUpSection className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <FadeUpItem>
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Fix the leaks. <span className="text-[color:var(--primary)]">Fill the calendar.</span>
          </h2>
        </FadeUpItem>
        <FadeUpItem>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted md:text-lg">
            Get a clear read on where your funnel is leaking and exactly what it would take to
            convert more of your traffic into booked opportunities.
          </p>
        </FadeUpItem>
        <FadeUpItem className="mt-9 flex flex-col items-center gap-3">
          <CTAButton size="lg" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            For businesses ready to improve lead flow and conversion performance
          </span>
        </FadeUpItem>
      </FadeUpSection>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-background/40 backdrop-blur-md py-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Conversion systems for businesses that want more qualified leads and more booked
              calls.
            </p>
          </div>
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Navigate
            </span>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-foreground/85 hover:text-[color:var(--primary)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Ready?
            </span>
            <div className="mt-4">
              <CTAButton size="sm" />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--border)] pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            © {new Date().getFullYear()} Supreme Nexus · All rights reserved
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Built for booked calls
          </span>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-background/85 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <CTAButton className="w-full" size="lg" />
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <LoadingScreen />
      <Header />
      <main>
        <Hero />
        <CredibilityStrip />
        <ProblemOutcome />
        <Services />
        <section id="roi" className="border-t border-[color:var(--border)] bg-surface/5">
          <ROICalculator />
        </section>
        <Process />
        <Results />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
