import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Minus,
  Menu,
  X,
  Clock,
  Calendar as CalendarIcon,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HeroVisual } from "@/components/site/HeroVisual";
import { Counter } from "@/components/site/Counter";
import { MagneticButton } from "@/components/site/MagneticButton";
import { FadeUpSection, FadeUpItem } from "@/components/site/FadeUpSection";
import { ROICalculator } from "@/components/site/ROICalculator";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, addMonths, startOfMonth, endOfMonth, isBefore, startOfToday, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth, addDays } from "date-fns";
import { cn } from "@/lib/utils";

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
        href="#book"
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
      <div className="h-8 w-8 rounded-full overflow-hidden">
        <img src="/logo-transparent.png" alt="Supreme Nexus Logo" className="h-full w-full object-cover" />
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
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
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <img src="/logo-transparent.png" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display text-sm font-bold text-foreground">
                    {q.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {q.role}
                  </span>
                </div>
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

function ProfessionalCalendar({
  selectedDate,
  onSelect,
  minDate,
  maxDate
}: {
  selectedDate?: Date,
  onSelect: (date: Date) => void,
  minDate: Date,
  maxDate: Date
}) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(selectedDate || new Date()));
  const monthStart = startOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);

  // Always generate exactly 42 days (6 full weeks) starting from the beginning of the first week
  const totalDays = Array.from({ length: 42 }).map((_, i) => addDays(calendarStart, i));

  const nextMonth = () => {
    const next = addMonths(currentMonth, 1);
    if (next <= maxDate) setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = addMonths(currentMonth, -1);
    if (prev >= startOfMonth(minDate)) setCurrentMonth(prev);
  };

  return (
    <div className="w-[300px] select-none">
      <div className="flex items-center justify-between mb-6 px-1">
        <h4 className="font-display text-sm font-bold text-white">
          {format(currentMonth, "MMMM yyyy")}
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prevMonth}
            disabled={currentMonth <= startOfToday()}
            className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-30 transition-all text-white/50 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            disabled={currentMonth >= startOfMonth(maxDate)}
            className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-30 transition-all text-white/50 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map(d => (
          <span key={d} className="text-[10px] font-mono font-bold text-white/30 py-2">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {totalDays.map((day, i) => {
          const isSelected = selectedDate && format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isDisabled = day < startOfToday() || day > maxDate;

          return (
            <motion.button
              key={day.toString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.005 }}
              onClick={() => !isDisabled && onSelect(day)}
              disabled={isDisabled}
              className={cn(
                "h-9 w-9 rounded-xl flex items-center justify-center text-xs transition-all relative group overflow-hidden",
                isSelected
                  ? "bg-[color:var(--primary)] text-primary-foreground font-bold shadow-[0_0_20px_-5px_#10D6C5]"
                  : cn(
                    "hover:bg-white/5 text-white hover:text-white hover:shadow-[0_0_20px_-5px_#10D6C5] border border-transparent hover:border-[color:var(--primary)]/30",
                    !isCurrentMonth && "text-muted-foreground/20 hover:text-muted-foreground/40"
                  ),
                isDisabled && "text-muted-foreground/30 cursor-not-allowed bg-transparent grayscale",
                isToday && !isSelected && "border border-[color:var(--primary)]/30 text-[color:var(--primary)]"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeDay"
                  className="absolute inset-0 rounded-xl border-2 border-[color:var(--primary)] ring-4 ring-[color:var(--primary)]/20"
                />
              )}
              <span className="relative z-10">{format(day, "d")}</span>
              {!isDisabled && !isSelected && (
                <div className="absolute inset-0 rounded-xl bg-[color:var(--primary)]/0 group-hover:bg-[color:var(--primary)]/5 transition-colors" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function BookingDateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange
}: {
  date?: Date,
  time?: string,
  onDateChange: (date: Date | undefined) => void,
  onTimeChange: (time: string) => void
}) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  const startMonth = startOfMonth(today);
  const endMonth = endOfMonth(addMonths(today, 3));

  const times = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  return (
    <div className="space-y-2.5">
      <Label className="text-sm font-medium text-muted ml-1">Preferred Date & Time</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border border-[color:var(--border)] bg-elevated/20 px-4 py-3.5 text-left transition-all hover:border-[color:var(--primary)]/50 focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)]/20 group",
              !date && "text-muted-foreground",
              date && "border-[color:var(--primary)]/30 bg-[color:var(--primary)]/5"
            )}
          >
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-[color:var(--border)] transition-colors group-hover:border-[color:var(--primary)]/30",
              date && "bg-[color:var(--primary)]/10 border-[color:var(--primary)]/20"
            )}>
              <CalendarIcon className={cn("h-4 w-4 text-muted transition-colors", date && "text-[color:var(--primary)]")} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-foreground">
                {date ? format(date, "PPP") : "Select Date"}
              </div>
              <div className="text-[11px] text-muted font-mono uppercase tracking-wider">
                {time ? `Preferred time: ${time}` : "Choose your slot"}
              </div>
            </div>
            <Clock className="h-4 w-4 text-muted/50" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-[color:var(--border)] bg-surface/95 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
          align="center"
          sideOffset={8}
        >
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[color:var(--border)] items-stretch">
            <div className="p-6 bg-surface/50">
              <ProfessionalCalendar
                selectedDate={date}
                onSelect={(d) => {
                  onDateChange(d);
                }}
                minDate={startOfToday()}
                maxDate={endMonth}
              />
            </div>
            <div className="flex flex-col w-full md:w-52 bg-surface/30">
              <div className="p-4 border-b border-[color:var(--border)] bg-elevated/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[color:var(--primary)]">Available Slots</span>
                  <Clock className="h-3 w-3 text-[color:var(--primary)]/50" />
                </div>
              </div>
              <div className="relative flex-1">
                <ScrollArea className="h-full max-h-[340px]">
                  <div className="p-3 grid grid-cols-2 md:grid-cols-1 gap-2">
                    {times.map((t, i) => (
                      <motion.button
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03, duration: 0.2 }}
                        type="button"
                        onClick={() => {
                          onTimeChange(t);
                          if (date) setOpen(false);
                        }}
                        className={cn(
                          "group relative rounded-xl px-4 py-3 text-left text-sm transition-all duration-300 overflow-hidden",
                          time === t
                            ? "bg-[color:var(--primary)] text-primary-foreground font-bold shadow-[0_8px_20px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
                            : "hover:bg-[color:var(--primary)]/10 text-muted hover:text-foreground border border-white/5 hover:border-[color:var(--primary)]/30 hover:shadow-[0_0_20px_-5px_#10D6C5]"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{t}</span>
                          {time === t && <Check className="h-3 w-3" />}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </ScrollArea>
                {/* Scroll indicators */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface/90 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-surface/40 to-transparent z-10" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function BookingForm() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    date: undefined as Date | undefined,
    time: "",
    revenue: "",
    message: ""
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) return;

    let formatted = input;
    if (input.length > 0) {
      if (input.length <= 3) {
        formatted = `(${input}`;
      } else if (input.length <= 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
      } else {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
      }
    }
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError(null);
  };

  const handleRevenueChange = (value: string) => {
    setFormData(prev => ({ ...prev, revenue: value }));
    if (error) setError(null);
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
    if (error) setError(null);
  };

  const handleTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Comprehensive validation
    const isPhoneValid = formData.phone.replace(/\D/g, "").length === 10;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    if (!formData.name || !formData.email || !formData.phone || !formData.company || !formData.website || !formData.revenue || !formData.message || !formData.date || !formData.time) {
      setError("Please fill out all fields to continue.");
      return;
    }

    if (!isEmailValid) {
      setError("Please enter a valid work email.");
      return;
    }

    if (!isPhoneValid) {
      setError("Please enter a complete 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate real live processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const getLabelGlow = (id: string) =>
    focusedField === id
      ? "text-[color:var(--primary)] drop-shadow-[0_0_10px_color-mix(in_oklab,var(--primary)_80%,transparent)] scale-[1.02]"
      : "text-muted opacity-80";

  return (
    <section id="book" className="py-24 md:py-32 relative overflow-hidden border-t border-[color:var(--border)]">
      <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-20" />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 15%, transparent), transparent)",
        }}
      />

      <FadeUpSection className="mx-auto max-w-4xl px-5 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeUpItem>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--primary)] font-bold">
              Secure your strategy call
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Ready to <span className="text-[color:var(--primary)]">Scale?</span>
            </h2>
            <p className="mt-6 text-base text-muted md:text-lg max-w-xl mx-auto leading-relaxed">
              Book your conversion audit and strategy call. No pitch, just performance and a clear roadmap to more booked calls.
            </p>
          </FadeUpItem>
        </div>

        <FadeUpItem className="rounded-[2.5rem] border border-[color:var(--border)] bg-surface/30 backdrop-blur-2xl p-8 md:p-14 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:border-[color:var(--primary)]/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[color:var(--primary)]/40 to-transparent" />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center flex flex-col items-center justify-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-full bg-[color:var(--primary)]/20 blur-xl animate-pulse" />
                  <Loader2 className="h-16 w-16 text-[color:var(--primary)] animate-spin relative z-10" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">Analyzing Your Request...</h3>
                <p className="mt-2 text-sm text-muted font-mono uppercase tracking-widest">Encrypting strategy profile · Live</p>
              </motion.div>
            ) : isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[color:var(--primary)]/10 ring-1 ring-[color:var(--primary)]/30">
                  <Check className="h-10 w-10 text-[color:var(--primary)]" />
                </div>
                <h3 className="font-display text-3xl font-bold text-foreground">Request Received!</h3>
                <p className="mt-4 text-lg text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. Your request has been submitted and we will contact you shortly to schedule your audit!
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      website: "",
                      date: undefined,
                      time: "",
                      revenue: "",
                      message: ""
                    });
                  }}
                  className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-[color:var(--primary)] transition-colors"
                >
                  ← Back to form
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-x-8 gap-y-7 md:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2.5">
                  <Label
                    htmlFor="name"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("name")}`}
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-white/5 h-13 rounded-xl px-5 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all border-none ring-1 ring-white/5"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label
                    htmlFor="email"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("email")}`}
                  >
                    Work Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-white/5 h-13 rounded-xl px-5 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all border-none ring-1 ring-white/5"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label
                    htmlFor="phone"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("phone")}`}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(111) 222-3333"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-white/5 h-13 rounded-xl px-5 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all border-none ring-1 ring-white/5 font-mono"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label
                    htmlFor="company"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("company")}`}
                  >
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-white/5 h-13 rounded-xl px-5 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all border-none ring-1 ring-white/5"
                  />
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <Label
                    htmlFor="website"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("website")}`}
                  >
                    Website URL
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("website")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-white/5 h-13 rounded-xl px-5 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all border-none ring-1 ring-white/5"
                  />
                </div>

                <div className="md:col-span-2">
                  <BookingDateTimePicker
                    date={formData.date}
                    time={formData.time}
                    onDateChange={handleDateChange}
                    onTimeChange={handleTimeChange}
                  />
                </div>

                <div className="space-y-2.5 md:col-span-2">
                  <Label
                    htmlFor="revenue"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("revenue")}`}
                  >
                    Current Monthly Revenue
                  </Label>
                  <Select
                    value={formData.revenue}
                    onValueChange={handleRevenueChange}
                    onOpenChange={(open) => setFocusedField(open ? "revenue" : null)}
                  >
                    <SelectTrigger className="bg-background/40 border-none ring-1 ring-white/5 h-13 rounded-xl px-5 focus:ring-[color:var(--primary)] focus:bg-background/60 transition-all">
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent className="bg-elevated/95 backdrop-blur-xl border-white/10 rounded-xl">
                      <SelectItem value="under-10k">Under $10k/mo</SelectItem>
                      <SelectItem value="10k-50k">$10k - $50k/mo</SelectItem>
                      <SelectItem value="50k-100k">$50k - $100k/mo</SelectItem>
                      <SelectItem value="100k-plus">$100k+/mo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <Label
                    htmlFor="message"
                    className={`text-[10px] font-mono uppercase tracking-[0.2em] ml-1 transition-all duration-300 block ${getLabelGlow("message")}`}
                  >
                    Biggest conversion bottleneck?
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your current challenges..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-background/40 border-none ring-1 ring-white/5 min-h-[120px] rounded-xl px-5 py-4 focus-visible:ring-[color:var(--primary)] focus-visible:bg-background/60 transition-all resize-none"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-center"
                  >
                    <p className="text-xs font-mono text-destructive uppercase tracking-widest">{error}</p>
                  </motion.div>
                )}

                <div className="md:col-span-2 pt-6">
                  <button
                    type="submit"
                    className="group relative w-full h-15 rounded-xl bg-primary font-display text-xl font-bold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_50px_-5px_color-mix(in_oklab,var(--primary)_60%,transparent)] hover:-translate-y-1 active:scale-[0.98] overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Claim Your Strategy Call
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  </button>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest">No Pitch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Pure Value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                      <span className="text-[10px] font-mono text-muted uppercase tracking-widest">1:1 Audit</span>
                    </div>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--border)] bg-background/85 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"
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
        <BookingForm />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
