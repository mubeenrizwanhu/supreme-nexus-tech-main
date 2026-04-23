import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Target } from "lucide-react";
import { FadeUpSection, FadeUpItem } from "./FadeUpSection";

export function ROICalculator() {
  const [traffic, setTraffic] = useState(5000);
  const [cvr, setCVR] = useState(1.5);
  
  const currentLeads = Math.round(traffic * (cvr / 100));
  const projectedCVR = cvr * 2.2; // Assuming a 2.2x lift
  const projectedLeads = Math.round(traffic * (projectedCVR / 100));
  const leadLift = projectedLeads - currentLeads;

  return (
    <FadeUpSection className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <FadeUpItem>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--primary)]">
                ROI Calculator
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                See the impact of <span className="text-[color:var(--primary)]">precision optimization.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Input your current metrics to visualize the potential pipeline growth when we fix the leaks in your conversion funnel.
              </p>
            </FadeUpItem>

            <div className="mt-12 space-y-10">
              <FadeUpItem className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                    <Users className="h-4 w-4 text-[color:var(--primary)]" />
                    Monthly Traffic
                  </label>
                  <span className="font-mono text-sm font-bold text-[color:var(--primary)]">
                    {traffic.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={traffic}
                  onChange={(e) => setTraffic(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-surface rounded-full appearance-none cursor-pointer accent-[color:var(--primary)]"
                  style={{
                    background: `linear-gradient(90deg, var(--primary) ${(traffic - 1000) / 990}%, var(--surface) 0%)`
                  }}
                />
              </FadeUpItem>

              <FadeUpItem className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                    <Target className="h-4 w-4 text-[color:var(--primary)]" />
                    Current Conv. Rate
                  </label>
                  <span className="font-mono text-sm font-bold text-[color:var(--primary)]">
                    {cvr}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={cvr}
                  onChange={(e) => setCVR(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-surface rounded-full appearance-none cursor-pointer accent-[color:var(--primary)]"
                  style={{
                    background: `linear-gradient(90deg, var(--primary) ${((cvr - 0.1) / 9.9) * 100}%, var(--surface) 0%)`
                  }}
                />
              </FadeUpItem>
            </div>
          </div>

          <FadeUpItem>
            <div className="relative rounded-3xl border border-[color:var(--border)] bg-surface/30 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-[0_0_50px_-12px_color-mix(in_oklab,var(--primary)_20%,transparent)]">
              {/* background glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--primary)] opacity-[0.03] blur-3xl" />
              
              <div className="relative space-y-10">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Current Output</span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-foreground">{currentLeads}</span>
                    <span className="text-sm text-muted">Leads / mo</span>
                  </div>
                </div>

                <div className="h-px bg-[color:var(--border)] w-full" />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--primary)]">Optimized Projection</span>
                    <TrendingUp className="h-3 w-3 text-[color:var(--primary)]" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <motion.span 
                      key={projectedLeads}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-display text-6xl font-bold text-[color:var(--primary)] drop-shadow-[0_0_15px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
                    >
                      {projectedLeads}
                    </motion.span>
                    <span className="text-sm text-muted">Leads / mo</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-[color:var(--primary)]/10 border border-[color:var(--primary)]/20 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Monthly Lead Lift</span>
                    <span className="font-mono text-lg font-bold text-[color:var(--primary)]">+{leadLift}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted">
                    Based on projected conversion lift of 2.2x
                  </div>
                </div>
              </div>
            </div>
          </FadeUpItem>
        </div>
      </div>
    </FadeUpSection>
  );
}
