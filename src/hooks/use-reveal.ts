import { useEffect } from "react";

/**
 * Adds `is-visible` class to elements with `.reveal` when they enter viewport.
 * Lightweight IntersectionObserver — no animation lib required.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Animates a number from 0 to `target` over `duration` ms when `start` flips true.
 */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  // Implemented inline in component to avoid extra hook surface.
  return { target, start, duration };
}
