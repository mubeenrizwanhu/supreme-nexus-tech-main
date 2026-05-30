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
    <a href="#top" className="flex items-center gap-3 group">
      <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img src="/logo-transparent.png" alt="Supreme Nexus Logo" className="h-full w-full object-cover" />
      </div>
      <span className="font-brand text-[19px] tracking-wide text-foreground uppercase group-hover:drop-shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_40%,transparent)] transition-all duration-300">
        SUPREME <span className="text-[color:var(--primary)]">NEXUS</span>
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
    <FadeUpSection className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-[color:var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[color:var(--accent-blue)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeUpItem className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)] mb-4 block"
            >
              The gap
            </motion.span>
            <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl leading-[1.1]">
              Most businesses don't have a <span className="text-white">traffic problem.</span>
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-foreground/80"
              >
                They have a <span className="text-[color:var(--primary)] relative">
                  conversion problem.
                  <motion.svg
                    viewBox="0 0 300 20"
                    className="absolute -bottom-2 left-0 w-full h-3 text-[color:var(--primary)] opacity-40"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                  >
                    <path d="M5 15 Q 150 5 295 15" fill="transparent" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </motion.svg>
                </span>
              </motion.span>
            </h2>
          </FadeUpItem>

          <FadeUpItem className="hidden lg:block">
            <div className="relative h-32 w-48 flex items-center justify-center">
              {/* Funnel Leak Animation */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-[color:var(--primary)]">
                <defs>
                  <linearGradient id="leakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M20 20 L80 20 L60 70 L40 70 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                <motion.path
                  d="M45 70 L45 95"
                  stroke="url(#leakGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                <motion.path
                  d="M55 70 L55 95"
                  stroke="url(#leakGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.7 }}
                />
                <motion.path
                  d="M50 70 L50 90"
                  stroke="url(#leakGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 1.4 }}
                />
              </svg>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-muted opacity-40">
                Incoming Traffic
              </div>
            </div>
          </FadeUpItem>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Leak Card */}
          <FadeUpItem className="group relative rounded-3xl border border-[color:var(--border)] bg-surface/20 backdrop-blur-md p-8 md:p-10 transition-all duration-500 hover:border-white/10 hover:bg-surface/30">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500/50 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  What's leaking
                </span>
              </div>
              <Minus className="h-4 w-4 text-muted/30" />
            </div>

            <ul className="space-y-6">
              {LEAKS.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1.5 h-1 w-1 rounded-full bg-muted/40 shrink-0" />
                  <span className="text-base text-foreground/70 group-hover:text-foreground/90 transition-colors">{l}</span>
                </motion.li>
              ))}
            </ul>
          </FadeUpItem>

          {/* Fix Card - The Premium Bucket */}
          <FadeUpItem
            className="group relative rounded-3xl border p-8 md:p-10 backdrop-blur-xl overflow-hidden shadow-2xl"
            style={{
              borderColor: "color-mix(in oklab, var(--primary) 20%, transparent)",
            }}
          >
            {/* Premium Animated Background */}
            <div className="absolute inset-0 bg-surface/40 pointer-events-none" />
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, var(--primary) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 50%)",
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute -inset-[100%] bg-[radial-gradient(40%_40%_at_50%_50%,color-mix(in_oklab,var(--primary)_15%,transparent)_0%,transparent_100%)] group-hover:animate-pulse-slow pointer-events-none" />

            {/* Scanning Line Utility */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-right from-transparent via-[color:var(--primary)] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan pointer-events-none" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--primary)] animate-pulse shadow-[0_0_8px_var(--primary)]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--primary)] font-bold">
                    What we fix
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="h-1 w-4 rounded-full bg-[color:var(--primary)]/20" />
                  <div className="h-1 w-1 rounded-full bg-[color:var(--primary)]/20" />
                </div>
              </div>

              <ul className="space-y-6">
                {FIXES.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (0.1 * i) }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--primary)]/10 border border-[color:var(--primary)]/20 shrink-0">
                      <Check className="h-3.5 w-3.5 text-[color:var(--primary)]" />
                    </div>
                    <span className="text-base font-medium text-foreground group-hover:text-[color:var(--primary)] transition-colors duration-300">
                      {f}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-10 pt-8 border-t border-white/5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Efficiency Matrix</span>
                  <div className="flex items-end gap-1 h-4">
                    {[0.4, 0.7, 0.5, 0.9, 0.6, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-[color:var(--primary)]/40 rounded-full"
                        animate={{ height: [`${h * 100}%`, `${(h * 0.5) * 100}%`, `${h * 100}%`] }}
                        transition={{ repeat: Infinity, duration: 1.5 + i * 0.2, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
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
      className="border-y border-[color:var(--border)] bg-surface/10 backdrop-blur-sm py-24 md:py-32 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[color:var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[color:var(--accent-blue)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <FadeUpSection className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        <FadeUpItem className="mb-16 max-w-xl">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]"
          >
            Process
          </motion.span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Four steps. <span className="text-white">No guesswork.</span>
          </h2>
        </FadeUpItem>

        <div className="relative mt-20">
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <FadeUpItem key={s.n} className="relative group">
                {/* Connecting Line to next step */}
                {i < STEPS.length - 1 && (
                  <div className="absolute left-[68px] top-[34px] w-[calc(100%+1.5rem-68px)] hidden h-[2px] md:block bg-surface/40 overflow-hidden">
                    <motion.div
                      className="h-full w-full bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent"
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "100%" }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: i * 0.4 }}
                    />
                  </div>
                )}

                <motion.div
                  className="relative z-10 mb-6 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md transition-all duration-500 group-hover:bg-surface/50 group-hover:border-[color:var(--primary)]/50 group-hover:shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--primary)_30%,transparent)] group-hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--primary)_20%,transparent),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="font-display text-2xl font-bold text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {s.n}
                  </span>
                  {/* Outer animated ring on hover */}
                  <div className="absolute -inset-2 rounded-3xl border border-[color:var(--primary)]/0 group-hover:border-[color:var(--primary)]/30 transition-all duration-500 group-hover:animate-[spin_10s_linear_infinite] pointer-events-none" style={{ borderStyle: 'dashed' }} />
                </motion.div>

                <div className="relative pt-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-[color:var(--primary)] transition-colors duration-300">{s.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted group-hover:text-foreground/80 transition-colors duration-300">{s.d}</p>
                  </motion.div>

                  {/* Subtle active state indicator */}
                  <div className="absolute -left-4 top-2 h-0 w-1 bg-[color:var(--primary)]/50 rounded-full transition-all duration-500 group-hover:h-full opacity-0 group-hover:opacity-100 hidden md:block" />
                </div>
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
    <section id="results" className="py-24 md:py-32 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[color:var(--success)] opacity-[0.02] blur-[120px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-white opacity-[0.01] blur-[100px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.01, 0.03, 0.01]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <FadeUpSection className="mx-auto max-w-7xl px-5 md:px-8 relative z-10">
        <FadeUpItem className="mb-14 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--success)] inline-flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] animate-pulse" />
            Results
          </motion.div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Performance you can <span className="relative inline-block">
              <span className="relative z-10 text-white">measure.</span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-2 bg-[color:var(--success)]/30 -z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted md:text-base">
            Representative ranges from conversion engagements. Numbers vary by offer, traffic
            quality, and current funnel maturity.
          </p>
        </FadeUpItem>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <FadeUpItem
              key={m.label}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-6 transition-all duration-500 hover:bg-surface/50 hover:border-[color:var(--success)]/30 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_color-mix(in_oklab,var(--success)_20%,transparent)]"
            >
              {/* Sweep effect */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[color:var(--success)]/[0.08] to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="relative z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted group-hover:text-[color:var(--success)] transition-colors duration-300">
                  {m.label}
                </span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground md:text-5xl group-hover:text-white transition-colors duration-300">
                    <Counter to={m.value} suffix={m.suffix} decimals={m.decimals ?? 0} />
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-[color:var(--success)] group-hover:text-[color:var(--success)] transition-colors duration-300">
                  <motion.span
                    className="h-1 w-1 rounded-full bg-current"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  {m.note}
                </div>
              </div>
            </FadeUpItem>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {QUOTES.map((q, i) => (
            <FadeUpItem
              key={q.name + q.role}
              className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-md p-7 md:p-9 transition-all duration-500 hover:bg-surface/40 hover:border-white/10"
            >
              {/* Large quote mark in background */}
              <div className="absolute -top-6 -left-2 text-9xl font-display text-white/[0.02] group-hover:text-[color:var(--success)]/[0.05] transition-colors duration-500 pointer-events-none select-none">
                "
              </div>

              {/* Background sweep */}
              <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="relative z-10">
                <blockquote className="font-display text-lg leading-snug text-foreground md:text-xl group-hover:text-white transition-colors duration-300">
                  "{q.quote}"
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between border-t border-white/5 pt-5 group-hover:border-white/10 transition-colors duration-300">
                  <div className="flex flex-col text-left">
                    <span className="font-display text-sm font-bold text-foreground group-hover:text-[color:var(--success)] transition-colors duration-300">
                      {q.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mt-0.5">
                      {q.role}
                    </span>
                  </div>

                  {/* Small animated indicator on hover */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="w-1 h-1 rounded-full bg-[color:var(--success)]"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.1 }}
                      />
                    ))}
                  </div>
                </figcaption>
              </div>
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
    a: "Supreme Nexus is designed specifically for high-growth B2B service providers, coaches, and appointment-centric businesses who already generate traffic but need to convert a higher percentage of it into qualified sales meetings and pipeline velocity.",
  },
  {
    q: "How fast can we start?",
    a: "We typically initiate engagements within one week of our strategy call. Our empirical conversion and funnel audits are completed and delivered within the first 7 to 10 days of the engagement.",
  },
  {
    q: "Do you work with existing funnels and websites?",
    a: "Yes. Most of our work involves auditing, optimizing, and rebuilding the conversion layers of your existing marketing stack and pages, avoiding the delays and costs of a complete ground-up website redesign.",
  },
  {
    q: "What kind of businesses benefit most?",
    a: "B2B service businesses, agencies, coaching companies, and any business model reliant on qualified sales calls to sell high-value packages or retainers benefit the most from our structured conversion systems.",
  },
  {
    q: "What happens on the strategy call?",
    a: "On the call, we conduct a diagnostic audit of your current conversion pathways. We will identify clear conversion leaks and map out a step-by-step optimization plan to accelerate your booked sales pipeline, without any pushy sales pitch.",
  },
  {
    q: "What is a conversion leak in a sales funnel, and how do you identify it?",
    a: "A conversion leak is any point in a marketing or sales funnel where qualified prospects drop off instead of taking the next action. Supreme Nexus identifies leaks through empirical conversion tracking audits, form analytics, user behavior analysis, and lifecycle messaging speed audits.",
  },
  {
    q: "How does Supreme Nexus increase landing page conversion rates without changing our traffic source?",
    a: "We increase conversion rates by reducing cognitive load, optimizing information hierarchy, streamlining form fields, and aligning messaging directly with user intent. By removing friction and engineering clear conversion pathways, we capture more value from your existing traffic.",
  },
  {
    q: "Why does lead response time matter for B2B pipeline velocity?",
    a: "Lead response time is critical for B2B pipeline velocity because contact rates decline by over 10x if the lead is not contacted within the first five minutes. Immediate follow-up capitalizes on peak buyer intent, drastically increasing the transition rate from marketing-qualified leads to sales-qualified meetings.",
  },
  {
    q: "What is the difference between traffic acquisition and funnel optimization?",
    a: "Traffic acquisition focuses on driving new visitors to your digital properties through paid ads, organic SEO, or outbound campaigns. Funnel optimization (or CRO) focuses on maximizing the value of those visitors by ensuring a friction-free transition from visitor to qualified booking.",
  },
  {
    q: "What key performance indicators (KPIs) do you track during an engagement?",
    a: "We track rigorous bottom-line metrics, including landing page conversion rate (LP CVR), average lead response latency, sales-qualified lead (SQL) transition rates, customer acquisition cost (CAC) reduction, and overall booked strategy call volume.",
  }
];

function FAQ() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="border-t border-[color:var(--border)] bg-surface/10 backdrop-blur-sm py-24 md:py-32 relative overflow-hidden"
    >
      {/* Ambient background glows */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-[color:var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <FadeUpSection className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8 relative z-10">
        <FadeUpItem className="md:col-span-4 relative">
          {/* Scanning Line Utility */}
          <div className="absolute -left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-[color:var(--primary)] to-transparent opacity-30 hidden md:block" />

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)] inline-flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--primary)] animate-pulse" />
            FAQ
          </motion.div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Answers before the <span className="text-[color:var(--primary)] relative inline-block">
              call.
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-1 bg-[color:var(--primary)]/30 -z-10"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Everything you need to know about how we work, who we work with, and what to expect from an engagement.
          </p>
        </FadeUpItem>
        <FadeUpItem className="md:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Subtle left indicator line on hover */}
                <motion.div
                  className="absolute -left-4 top-0 h-full w-0.5 bg-[color:var(--primary)] rounded-full origin-top hidden md:block"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{
                    scaleY: hoveredIndex === i ? 1 : 0,
                    opacity: hoveredIndex === i ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Background glow sweep */}
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[color:var(--primary)]/[0.03] to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-[color:var(--border)] transition-colors duration-300 group-hover:border-[color:var(--primary)]/30 relative bg-transparent"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-base font-semibold text-foreground hover:no-underline md:text-lg group-hover:text-[color:var(--primary)] transition-colors duration-300">
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-[10px] text-muted group-hover:text-[color:var(--primary)]/60 transition-colors">
                        /{i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </span>
                      {f.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-sm leading-relaxed text-muted md:text-[15px]">
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-8 border-l border-white/5 ml-2.5"
                    >
                      {f.a}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
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
    <footer className="border-t border-[color:var(--border)] bg-background/40 backdrop-blur-md py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            Conversion systems for businesses that want more qualified leads and more booked calls.
          </p>
        </div>
        
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[color:var(--border)] pt-8 md:flex-row">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            © {new Date().getFullYear()} Supreme Nexus · Content Verified & Updated for Q2 {new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">
              Built for booked calls
            </span>
          </div>
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

const SCHEMA_MARKUP = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://supremenexus.tech/#service",
      "name": "Supreme Nexus",
      "url": "https://supremenexus.tech",
      "logo": "https://supremenexus.tech/logo.png",
      "image": "https://supremenexus.tech/logo.png",
      "description": "Supreme Nexus builds conversion systems that turn traffic into qualified leads, pipeline velocity, and booked strategy calls.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "knowsAbout": [
        "Conversion Rate Optimization",
        "Lead Generation Systems",
        "Funnel Optimization",
        "B2B Growth Marketing",
        "Appointment Setting Automation"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://supremenexus.tech/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is this for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Supreme Nexus is designed specifically for high-growth B2B service providers, coaches, and appointment-centric businesses who already generate traffic but need to convert a higher percentage of it into qualified sales meetings and pipeline velocity."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can we start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We typically initiate engagements within one week of our strategy call. Our empirical conversion and funnel audits are completed and delivered within the first 7 to 10 days of the engagement."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with existing funnels and websites?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Most of our work involves auditing, optimizing, and rebuilding the conversion layers of your existing marketing stack and pages, avoiding the delays and costs of a complete ground-up website redesign."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of businesses benefit most?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "B2B service businesses, agencies, coaching companies, and any business model reliant on qualified sales calls to sell high-value packages or retainers benefit the most from our structured conversion systems."
          }
        },
        {
          "@type": "Question",
          "name": "What happens on the strategy call?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On the call, we conduct a diagnostic audit of your current conversion pathways. We will identify clear conversion leaks and map out a step-by-step optimization plan to accelerate your booked sales pipeline, without any pushy sales pitch."
          }
        },
        {
          "@type": "Question",
          "name": "What is a conversion leak in a sales funnel, and how do you identify it?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A conversion leak is any point in a marketing or sales funnel where qualified prospects drop off instead of taking the next action. Supreme Nexus identifies leaks through empirical conversion tracking audits, form analytics, user behavior analysis, and lifecycle messaging speed audits."
          }
        },
        {
          "@type": "Question",
          "name": "How does Supreme Nexus increase landing page conversion rates without changing our traffic source?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We increase conversion rates by reducing cognitive load, optimizing information hierarchy, streamlining form fields, and aligning messaging directly with user intent. By removing friction and engineering clear conversion pathways, we capture more value from your existing traffic."
          }
        },
        {
          "@type": "Question",
          "name": "Why does lead response time matter for B2B pipeline velocity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Lead response time is critical for B2B pipeline velocity because contact rates decline by over 10x if the lead is not contacted within the first five minutes. Immediate follow-up capitalizes on peak buyer intent, drastically increasing the transition rate from marketing-qualified leads to sales-qualified meetings."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between traffic acquisition and funnel optimization?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Traffic acquisition focuses on driving new visitors to your digital properties through paid ads, organic SEO, or outbound campaigns. Funnel optimization (or CRO) focuses on maximizing the value of those visitors by ensuring a friction-free transition from visitor to qualified booking."
          }
        },
        {
          "@type": "Question",
          "name": "What key performance indicators (KPIs) do you track during an engagement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We track rigorous bottom-line metrics, including landing page conversion rate (LP CVR), average lead response latency, sales-qualified lead (SQL) transition rates, customer acquisition cost (CAC) reduction, and overall booked strategy call volume."
          }
        }
      ]
    }
  ]
};

function Index() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <script type="application/ld+json">
        {JSON.stringify(SCHEMA_MARKUP)}
      </script>
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
