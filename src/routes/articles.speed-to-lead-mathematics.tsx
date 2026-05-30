import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, Zap, Calculator, Calendar } from "lucide-react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useEffect } from "react";

export const Route = createFileRoute("/articles/speed-to-lead-mathematics")({
  head: () => ({
    meta: [
      { title: "Speed to Lead: The Math of 5-Minute Response Windows — Supreme Nexus" },
      {
        name: "description",
        content: "Explore the mathematical decay curve of lead conversion intent and how reducing latency to under 5 minutes increases contact rates by 391%.",
      },
      { property: "og:title", content: "Speed to Lead: The Math of 5-Minute Response Windows — Supreme Nexus" },
      {
        property: "og:description",
        content: "Explore the mathematical decay curve of lead conversion intent and how reducing latency to under 5 minutes increases contact rates by 391%.",
      },
      { property: "og:image", content: "https://supremenexus.tech/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://supremenexus.tech/articles/speed-to-lead-mathematics" },
    ],
  }),
  component: SpeedToLeadArticle,
});

function SpeedToLeadArticle() {
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
              className="group inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5"
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
            <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-primary uppercase">PIPELINE VELOCITY</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 italic">
            Speed to Lead: The Mathematics of the 5-Minute Response Window
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
              <span>5 min read</span>
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
            In modern pipeline engineering, minutes represent money. Waiting even an hour to respond to an inbound business inquiry decreases contact likelihood by 10x. Here, we outline the exact statistical decay curve of active lead intent and show how you can secure a 391% conversion boost using automation.
          </p>

          <h2 id="the-physics-of-lead-decay">The Physics of Lead Decay</h2>
          <p>
            When a prospect fills out a booking or contact form, they are in a state of <strong>peak problem awareness</strong>. They have isolated a bottleneck in their operations and are actively seeking a resolution.
          </p>
          <p>
            However, this psychological state decays exponentially. As time elapses, their focus drifts back to daily operational emergencies, or worse—they click on a competitor's link and submit another inquiry.
          </p>

          {/* Mathematical Callout Box */}
          <div className="my-10 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-5 h-5 text-primary" />
              <h4 className="text-base font-bold text-foreground font-mono uppercase tracking-wider">The Intent Decay Formula</h4>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed font-light mb-4">
              We model this phenomenon using a standard half-life decay function where psychological intent (I) as a function of time (t in minutes) decays exponentially:
            </p>
            <div className="w-full bg-surface/30 py-4 rounded-xl border border-[color:var(--border)] font-mono text-center text-lg md:text-xl text-primary mb-2">
              I(t) = I₀ · e^-λt
            </div>
            <p className="text-xs text-muted leading-relaxed font-light">
              Where I₀ represents initial peak intent, and λ (lambda) represents the decay coefficient. Empirically, the half-life of qualified sales intent in B2B service sectors is approximately **15 minutes**.
            </p>
          </div>

          <h2 id="the-5-minute-window">The Critical 5-Minute Window</h2>
          <p>
            An landmark study of speed-to-lead mechanics across thousands of B2B transactions revealed a startiling asymmetry in response times:
          </p>
          <ul>
            <li><strong>Under 5 Minutes:</strong> Leads contacted within five minutes of submission show a **391% improvement** in contact-to-qualification rates compared to subsequent time frames.</li>
            <li><strong>30 Minutes:</strong> Contact success rates decline by over 100%. The prospect has frequently exited their screen or has been distracted by offline workflows.</li>
            <li><strong>Over 24 Hours:</strong> Leads contacted after 24 hours have a conversion likelihood approaching baseline random cold outreach. The connection to the original problem has cold-started.</li>
          </ul>

          {/* Frosted Grid Layout for Speed statistics */}
          <div className="grid gap-6 my-10 md:grid-cols-2">
            <div className="border border-[color:var(--border)] bg-surface/10 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap className="w-24 h-24 text-primary" />
              </div>
              <span className="font-mono text-primary text-sm font-bold block mb-2">/ THE WINNING LEVER</span>
              <h3 className="text-foreground text-3xl font-black mb-2">391% Lift</h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                The empirical improvement in lead-to-booking rates achieved by transitioning average response latency from 30 minutes down to less than 5 minutes.
              </p>
            </div>
            <div className="border border-[color:var(--border)] bg-surface/10 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/40 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Clock className="w-24 h-24 text-primary" />
              </div>
              <span className="font-mono text-primary text-sm font-bold block mb-2">/ THE COST OF DELAY</span>
              <h3 className="text-foreground text-3xl font-black mb-2">10x Decay</h3>
              <p className="text-xs text-muted leading-relaxed font-light">
                The absolute drop in successful contact rates experienced between a 5-minute response window and a standard 30-minute delay.
              </p>
            </div>
          </div>

          <h2 id="implementing-automated-pipelines">Implementing Automated Pipelines</h2>
          <p>
            Solving speed-to-lead issues manually is impossible for small marketing teams. It requires engineering an automated **pre-qualification and scheduling ecosystem**:
          </p>
          <ol>
            <li><strong>Dynamic Calendar Injections:</strong> Rather than sending form responses to a CRM inbox for manual review, immediately redirect qualified submissions to an interactive calendar booking system on the confirmation screen.</li>
            <li><strong>Instant SMS Notification Bridges:</strong> Trigger real-time, two-way SMS communication immediately upon form submission to capture active mobile numbers.</li>
            <li><strong>Empirical Queue Routing:</strong> Establish webhook-based routing mechanisms to parse account value and assign qualified enterprise accounts directly to available sales calendars in under 60 seconds.</li>
          </ol>

          <p>
            By implementing these automated pathways, Supreme Nexus eliminates response latency entirely, transforming passive clicks into highly structured calendar events.
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_60%)] opacity-30 pointer-events-none" />

          <h3 className="font-display text-2xl md:text-4xl font-extrabold mb-4 text-white">
            Accelerate Your Pipeline Velocity
          </h3>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Stop losing leads in the gap between form fill and follow-up. Let us build a frictionless, instant scheduling system tailored to your B2B sales motion.
          </p>

          <div className="flex flex-col items-center gap-3">
            <MagneticButton>
              <Link
                to="/"
                hash="book"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-semibold text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5"
              >
                Schedule Your Integration Call
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </MagneticButton>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mt-1">
              Connect in under 5 minutes.
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
