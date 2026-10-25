import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LINES = [
  "Loading datasets............. ✓",
  "Loading dashboards........... ✓",
  "Loading notebooks............ ✓",
  "Loading research............. ✓",
  "Loading case studies......... ✓",
  "Loading portfolio............ ✓",
];

const SESSION_KEY = "surya-intro-played";

export function IntroLoader() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // ignore
    }
    setShow(true);
    // lock scroll while intro is visible
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (!show) return;
    if (step >= LINES.length) {
      const t = setTimeout(() => setReady(true), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 380);
    return () => clearTimeout(t);
  }, [show, step]);

  const dismiss = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    document.body.style.overflow = "";
    setShow(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-4"
          aria-label="Loading workspace"
          role="status"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-md border border-border bg-card shadow-card"
          >
            {/* window chrome */}
            <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                workspace · zsh
              </div>
              <div className="w-10" />
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="text-eyebrow">Surya Analytics Workspace</div>
              <div className="mt-1 font-serif text-lg tracking-tight">
                Initializing<span className="text-muted-foreground">…</span>
              </div>

              <div className="mt-5 font-mono text-[12.5px] leading-6 text-foreground/85 sm:text-sm">
                {LINES.slice(0, step).map((line, i) => (
                  <motion.div
                    key={line}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-primary/70">$</span>
                    <span
                      className={
                        i === step - 1 && step < LINES.length
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {line}
                    </span>
                  </motion.div>
                ))}
                {step < LINES.length ? (
                  <span
                    aria-hidden
                    className="mt-1 inline-block h-3 w-2 animate-pulse bg-foreground/60 align-middle"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mt-3 font-serif text-base not-italic text-foreground"
                  >
                    Workspace Ready.
                  </motion.div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  onClick={dismiss}
                  className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Skip
                </button>
                <AnimatePresence>
                  {ready ? (
                    <motion.button
                      key="enter"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      onClick={dismiss}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                      autoFocus
                    >
                      Enter Workspace
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
