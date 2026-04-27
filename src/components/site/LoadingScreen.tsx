import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const loadingPhrases = [
  "Initializing conversion engine...",
  "Calibrating lead funnels...",
  "Optimizing performance matrix...",
  "Establishing secure connection...",
  "Systems online. Welcome."
];

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Increase timer slightly to allow for full sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 12;
      });
    }, 100);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
    }, 550);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient Backgrounds */}
          <motion.div 
            className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[color:var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-[color:var(--accent-blue)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="pointer-events-none absolute inset-0 grid-bg radial-fade opacity-20" />

          {/* Logo Section */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-16 relative z-10"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 ring-1 ring-white/5 bg-surface/50 backdrop-blur-md flex items-center justify-center">
                <img src="/logo-transparent.png" alt="Supreme Nexus" className="h-full w-full object-cover relative z-10" />
                
                {/* Scanning line effect on logo */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-[color:var(--primary)]/30 to-transparent h-1/2 z-20"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                Supreme<span className="text-[color:var(--primary)]">.</span>Nexus
              </span>
            </div>
          </motion.div>

          {/* Progress Section */}
          <div className="w-72 relative z-10">
            <div className="flex justify-between items-end mb-3 h-6">
              <div className="relative overflow-hidden h-4 w-full">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted whitespace-nowrap"
                  >
                    {loadingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              
              <span className="font-mono text-[11px] text-[color:var(--primary)] shrink-0 font-bold ml-4">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            
            <div className="relative h-[2px] w-full bg-surface rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[color:var(--primary)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  boxShadow: "0 0 15px var(--primary)"
                }}
              />
              {/* Sweep effect on progress bar */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white/50 w-20 blur-[2px]"
                animate={{ x: ["-100%", "400%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
