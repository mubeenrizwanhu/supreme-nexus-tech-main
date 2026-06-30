import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, CheckCircle2, AlertTriangle, PlayCircle } from "lucide-react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useEffect } from "react";

export const Route = createFileRoute("/articles/leaky-bucket-funnels")({
  head: () => ({
    meta: [
      { title: "The Leaky Bucket: How B2B Funnels Lose 60%+ of Leads — Supreme Nexus" },
      {
        name: "description",
        content: "Analyze the structural bottlenecks, cognitive drop-offs, and message misalignment that bleed B2B marketing funnels of ready-to-buy pipeline.",
      },
      { property: "og:title", content: "The Leaky Bucket: How B2B Funnels Lose 60%+ of Leads — Supreme Nexus" },
      {
        property: "og:description",
        content: "Analyze the structural bottlenecks, cognitive drop-offs, and message misalignment that bleed B2B marketing funnels of ready-to-buy pipeline.",
      },
      { property: "og:image", content: "https://supremenexus.tech/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://supremenexus.tech/articles/leaky-bucket-funnels" },
    ],
  }),
  component: LeakyBucketArticle,
});

function LeakyBucketArticle() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[color:var(--primary)]/30 overflow-x-hidden relative pb-28">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[color:var(--primary)] z-[60] origin-[0%]"
        style={{ scaleX }}
      />

      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-15%] w-[40%] h-[40%] bg-[color:var(--primary)]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] h-[40%] bg-[color:var(--accent-blue)]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating navigation header */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--border)] bg-background/40 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/articles" className="flex items-center gap-2 group text-sm font-semibold tracking-wide text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Insights
          </Link>
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-brand text-[15px] tracking-wide text-foreground uppercase">
              SUPREME <span className="text-[color:var(--primary)]">NEXUS</span>
            </span>
          </Link>
          <MagneticButton>
            <Link
              to="/"
              hash="book"
              className="font-brand group inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-normal text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5"
            >
              Book Strategy Call
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>
        </div>
      </nav>

      {/* Article Header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-4xl mx-auto px-5 md:px-8 text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1 rounded-full mb-6">
            <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-primary uppercase">FUNNEL AUDITING</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 italic">
            The Leaky Bucket: How B2B Funnels Lose 60%+ of Qualified Leads
          </h1>

          <div className="flex flex-wrap items-center gap-6 border-y border-[color:var(--border)] py-4 text-sm text-muted font-mono">
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Published:</span> Q2 2026
            </div>
            <div className="h-3 w-px bg-[color:var(--border)] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-foreground/70">Author:</span> Supreme Nexus Editorial
            </div>
            <div className="h-3 w-px bg-[color:var(--border)] hidden sm:block" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>6 min read</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-5 md:px-8 relative z-10">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="prose prose-invert max-w-none prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:text-[15px] prose-p:md:text-[16px] prose-p:font-light prose-h2:font-display prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-foreground prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-6 prose-li:text-foreground/80 prose-li:mb-2 prose-li:text-[15px] prose-li:md:text-[16px]"
        >
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light italic mb-10 border-l-2 border-primary/40 pl-6">
            Many enterprise marketing directors assume conversion issues result from poor traffic quality. In reality, our empirical research shows that over 60% of high-intent B2B leads drop off due to hidden structural friction in the conversion funnel. Here is how to find and fix them.
          </p>

          <h2 id="the-anatomy-of-funnel-leakage">The Anatomy of Funnel Leakage</h2>
          <p>
            When a qualified visitor lands on your site, they arrive with a specific level of <strong>conversion intent</strong>. This intent is a fragile asset. It is eroded by every additional click, complex field, and visual distraction they encounter. In B2B funnels, this erosion manifests in three primary drop-off bottlenecks:
          </p>
          <ul>
            <li><strong>Cognitive Form Friction:</strong> Requesting sensitive, unnecessary corporate metadata too early (e.g., direct corporate phone lines, company size, exact budget) triggers security filters and friction.</li>
            <li><strong>Message-to-Offer Misalignment:</strong> A gap between the ad copy promise and the landing page hero copy immediately breaks expectations, raising bounce rates by up to 45%.</li>
            <li><strong>Response Latency Failure:</strong> A lead submits their information, only to wait 12 to 24 hours for a follow-up call. By the time they are contacted, active intent is depleted.</li>
          </ul>

          {/* High-fidelity Glass Card Callout */}
          <div className="my-10 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-md p-8 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h4 className="text-base font-bold text-white mb-2">The Quiet Conversion Drain</h4>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Traditional analytics platforms (like standard Google Analytics) often miss these drops. Visitors do not trigger error states; they simply close the tab or navigate back to the search engine. This represents a massive silent cost to your Customer Acquisition Cost (CAC).
              </p>
            </div>
          </div>

          <h2 id="funnel-architectures-compared">Funnel Architectures Compared</h2>
          <p>
            To clarify, let us compare the performance mechanics of traditional, high-friction marketing architectures against modern, conversion-engineered layouts:
          </p>

          {/* Beautiful Glassmorphic Table */}
          <div className="my-10 overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-surface/20 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[color:var(--border)] bg-white/5">
                  <th className="p-4 font-mono font-bold text-foreground/80">Funnel Metric</th>
                  <th className="p-4 font-mono font-bold text-red-400">High-Friction Funnels</th>
                  <th className="p-4 font-mono font-bold text-primary">Conversion-Engineered Systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[color:var(--border)]">
                <tr>
                  <td className="p-4 font-semibold text-foreground/90">Landing Page CVR</td>
                  <td className="p-4 text-muted">1.2% – 2.5%</td>
                  <td className="p-4 text-foreground font-bold">5.8% – 12.0%</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground/90">Form Fields Required</td>
                  <td className="p-4 text-muted">9 – 12 static fields</td>
                  <td className="p-4 text-foreground">4 – 5 dynamic fields</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground/90">Initial Response Speed</td>
                  <td className="p-4 text-muted">Average 8 – 24 hours</td>
                  <td className="p-4 text-foreground font-bold text-primary">&lt; 5 minutes (automated)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-foreground/90">SQL Conversion Lift</td>
                  <td className="p-4 text-muted">Baseline</td>
                  <td className="p-4 text-foreground font-bold">+184% average lift</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="the-three-pillars-of-alignment">The 3 Pillars of Message-to-Offer Alignment</h2>
          <p>
            Plugging leaks is not simply about removing fields; it requires aligning the customer’s mental model with your conversion flow. We execute this via three strict engineering principles:
          </p>

          <div className="grid gap-6 my-10 md:grid-cols-3">
            <div className="border border-[color:var(--border)] bg-surface/10 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-primary font-mono font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> PILLAR 01
              </div>
              <h4 className="text-foreground font-bold mb-2">Intent Mapping</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Tailor landing page content based on specific referral sources to match expectations instantly.
              </p>
            </div>
            <div className="border border-[color:var(--border)] bg-surface/10 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-primary font-mono font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> PILLAR 02
              </div>
              <h4 className="text-foreground font-bold mb-2">Progressive Profiling</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Break complex intake questions into multi-step interactive workflows to reduce upfront cognitive fatigue.
              </p>
            </div>
            <div className="border border-[color:var(--border)] bg-surface/10 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-3 text-primary font-mono font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> PILLAR 03
              </div>
              <h4 className="text-foreground font-bold mb-2">Frictionless Routing</h4>
              <p className="text-xs text-muted leading-relaxed font-light">
                Automatically pre-qualify and direct high-value accounts directly to available calendar slots.
              </p>
            </div>
          </div>

          <h2 id="how-to-conduct-an-empirical-audit">How to Conduct an Empirical Conversion Audit</h2>
          <p>
            To begin plugging your leaks immediately, start with a <strong>quantitative funnel audit</strong>. Utilize screen recording software, track absolute scroll-depth indexes, and isolate precise drop-off points within multi-step forms.
          </p>
          <p>
            If your conversion rate is hovering below 3%, you are spending money driving traffic directly into a broken bucket. Focus on repairing the conversion system before deploying additional ad spend.
          </p>
        </motion.article>

        {/* Dynamic CTA Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 border border-[color:var(--border)] bg-gradient-to-br from-primary/10 via-accent-blue/5 to-transparent rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden group shadow-2xl"
        >
          {/* Subtle background ring decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_60%)] opacity-30 pointer-events-none" />

          <h3 className="font-display text-2xl md:text-4xl font-extrabold mb-4 text-white">
            Find the Silent Leaks in Your Funnel
          </h3>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Stop guessing why traffic isn't converting. We will perform an empirical conversion audit of your active funnels and deliver a step-by-step repair roadmap.
          </p>

          <div className="flex flex-col items-center gap-3">
            <MagneticButton>
              <Link
                to="/"
                hash="book"
                className="font-brand group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-normal text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5"
              >
                Start Your Strategic Review
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </MagneticButton>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">
              No pressure. Just pure engineering analytics.
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
