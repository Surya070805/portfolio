import { useReducedMotion } from "framer-motion";

export function useReveal() {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  };
}
