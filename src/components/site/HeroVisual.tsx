/**
 * Premium hero motion graphic — pure SVG + CSS.
 * Layered grid, scan line, pulse nodes, conversion funnel pulse.
 * No external deps.
 */
export function HeroVisual() {
  return (
    <div className="relative aspect-square w-full max-w-[560px]">
      {/* outer glow ring */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 rounded-[28px]"
        style={{
          background:
            "radial-gradient(50% 40% at 25% 80%, color-mix(in oklab, var(--accent-blue) 18%, transparent), transparent 70%)",
        }}
      />

      {/* Frame */}
      <div
        className="relative h-full w-full overflow-hidden rounded-[24px] border bg-elevated"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        {/* Grid */}
        <div className="absolute inset-0 grid-bg radial-fade opacity-70" />

        {/* Scan line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] animate-scan"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 80%, transparent), transparent)",
            boxShadow: "0 0 24px color-mix(in oklab, var(--primary) 60%, transparent)",
          }}
        />

        {/* SVG funnel + nodes */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="tealLine" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#10D6C5" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#10D6C5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10D6C5" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="blueLine" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#4DA3FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* funnel shape */}
          <path
            d="M 60 80 L 340 80 L 250 200 L 250 320 L 150 320 L 150 200 Z"
            fill="none"
            stroke="url(#tealLine)"
            strokeWidth="1.2"
          />
          <path
            d="M 60 80 L 340 80 L 250 200 L 250 320 L 150 320 L 150 200 Z"
            fill="none"
            stroke="#10D6C5"
            strokeOpacity="0.18"
            strokeWidth="0.6"
          />

          {/* internal trend line */}
          <path
            d="M 70 300 Q 140 260 180 220 T 320 100"
            fill="none"
            stroke="url(#blueLine)"
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />

          {/* axis ticks */}
          {[100, 160, 220, 280].map((y) => (
            <line
              key={y}
              x1="56"
              x2="62"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
            />
          ))}

          {/* pulse nodes */}
          {[
            { x: 90, y: 100, d: "0s" },
            { x: 200, y: 80, d: "0.4s" },
            { x: 310, y: 100, d: "0.8s" },
            { x: 200, y: 200, d: "1.2s" },
            { x: 200, y: 320, d: "1.6s" },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="3" fill="#10D6C5" />
              <circle
                cx={n.x}
                cy={n.y}
                r="3"
                fill="#10D6C5"
                className="animate-pulse-dot"
                style={{ animationDelay: n.d, transformOrigin: `${n.x}px ${n.y}px` }}
              />
            </g>
          ))}
        </svg>

        {/* Floating data chips */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-md border bg-background/40 px-2.5 py-1.5 backdrop-blur-md"
             style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--success)] animate-pulse-dot" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">live · cvr</span>
          <span className="font-display text-xs font-bold text-foreground">+182%</span>
        </div>

        <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-md border bg-background/40 px-2.5 py-1.5 backdrop-blur-md"
             style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">booked</span>
          <span className="font-display text-xs font-bold text-[color:var(--primary)]">+47</span>
        </div>

        <div className="absolute right-5 top-5 rounded-md border bg-background/40 px-2.5 py-1.5 backdrop-blur-md"
             style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">funnel · v3</span>
        </div>
      </div>
    </div>
  );
}