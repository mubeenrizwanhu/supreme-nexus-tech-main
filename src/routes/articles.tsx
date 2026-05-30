import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import { MagneticButton } from "@/components/site/MagneticButton";
import { useEffect } from "react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "B2B Conversion Insights — Supreme Nexus Articles" },
      {
        name: "description",
        content: "Deep-dive CRO, speed-to-lead, and funnel optimizations.",
      },
      { property: "og:title", content: "B2B Conversion Insights — Supreme Nexus Articles" },
      {
        property: "og:description",
        content: "Deep-dive CRO, speed-to-lead, and funnel optimizations.",
      },
      { property: "og:image", content: "https://supremenexus.tech/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://supremenexus.tech/articles" },
    ],
  }),
  component: ArticlesHub,
});

const ARTICLES = [
  {
    slug: "leaky-bucket-funnels",
    title: "The Leaky Bucket: How B2B Funnels Lose 60%+ of Qualified Leads",
    description: "An empirical, content-dense analysis of silent funnel leaks, friction thresholds, and message-to-offer gaps that bleed marketing budgets.",
    readTime: "6 min read",
    tag: "Funnel Auditing",
    icon: Sparkles,
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    hoverBorder: "hover:border-cyan-500/40",
    accentColor: "text-cyan-400"
  },
  {
    slug: "speed-to-lead-mathematics",
    title: "Speed to Lead: The Mathematics of the 5-Minute Response Window",
    description: "A quantitative statistical breakdown of pipeline velocity. Why contacting a lead within 5 minutes results in a 391% contact rate improvement.",
    readTime: "5 min read",
    tag: "Pipeline Speed",
    icon: TrendingUp,
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    hoverBorder: "hover:border-emerald-500/40",
    accentColor: "text-emerald-400"
  },
  {
    slug: "frictionless-form-design",
    title: "Frictionless Conversion: Redesigning Forms for Maximum Lead Quality",
    description: "Practical conversion rate optimization rules, cognitive load reduction, multi-step layout theory, and progressive profiling techniques.",
    readTime: "7 min read",
    tag: "CRO & UI/UX",
    icon: BookOpen,
    gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
    hoverBorder: "hover:border-purple-500/40",
    accentColor: "text-purple-400"
  }
];

function ArticlesHub() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-x-hidden relative pb-24">
      {/* Floating background blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating navigation header */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#020202]/40 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img src="/logo-transparent.png" alt="Supreme Nexus Logo" className="h-full w-full object-cover" />
            </div>
            <span className="font-brand text-[19px] tracking-wide text-white uppercase group-hover:drop-shadow-[0_0_15px_rgba(16,214,197,0.4)] transition-all duration-300">
              SUPREME <span className="text-[color:var(--primary)]">NEXUS</span>
            </span>
          </Link>
          <MagneticButton>
            <Link
              to="/"
              hash="book"
              className="group inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all duration-200 cta-glow hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book Strategy Call
              <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>
        </div>
      </nav>

      {/* Hero section */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cyan-400 uppercase">CONVERSION INTEL</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent italic">
            B2B CONVERSION <span className="text-cyan-400">INSIGHTS</span>
          </h1>
          <p className="text-base md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
            Empirical analyses, quantitative engineering breakdowns, and tactical guides to stop marketing leaks and accelerate sales pipeline.
          </p>
        </motion.div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-3"
        >
          {ARTICLES.map((article) => {
            const Icon = article.icon;
            return (
              <motion.div
                key={article.slug}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/5 bg-surface/30 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-1.5 ${article.hoverBorder} hover:shadow-[0_20px_50px_-20px_rgba(16,214,197,0.15)]`}
              >
                {/* Visual glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(100% 100% at 0% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 60%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-white/50">
                        {article.tag}
                      </span>
                      <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl md:text-2xl font-bold leading-snug mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/50 font-light mb-8 group-hover:text-white/60 transition-colors duration-300">
                      {article.description}
                    </p>
                  </div>

                  {/* CTA link */}
                  <Link
                    to={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 group-hover:text-white transition-colors mt-auto"
                  >
                    Read Detailed Case
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Back navigation helper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
