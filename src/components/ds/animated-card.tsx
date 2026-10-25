import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & {
  variant?: "solid" | "muted" | "glass" | "outline";
  elevation?: "none" | "soft" | "card" | "raised";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
};

const variants = {
  solid: "bg-card border border-border",
  muted: "bg-card/40 border border-border",
  glass: "glass",
  outline: "bg-transparent border border-border",
};

const elevations = {
  none: "",
  soft: "shadow-soft",
  card: "shadow-card",
  raised: "shadow-raised",
};

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const AnimatedCard = forwardRef<HTMLDivElement, Props>(function AnimatedCard(
  {
    className,
    variant = "muted",
    elevation = "none",
    interactive = true,
    padding = "lg",
    children,
    ...rest
  },
  ref,
) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      whileHover={interactive && !reduce ? { y: -2 } : undefined}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-lg transition-colors",
        variants[variant],
        elevations[elevation],
        paddings[padding],
        interactive && "hover:bg-card hover:shadow-card",
        className,
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
});
