import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Logo pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 ring-1 ring-white/5">
                <img src="/favicon-96x96.png" alt="Supreme Nexus" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                Supreme<span className="text-[color:var(--primary)]">.</span>Nexus
              </span>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Initializing conversion engine...
              </span>
              <span className="font-mono text-[10px] text-[color:var(--primary)]">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[color:var(--primary)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  boxShadow: "0 0 10px var(--primary)"
                }}
              />
            </div>
          </div>

          {/* background grid pulse */}
          <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
