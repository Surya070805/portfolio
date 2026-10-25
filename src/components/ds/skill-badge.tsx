import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  variant?: "default" | "outline" | "solid";
  size?: "sm" | "md";
  className?: string;
};

const variants = {
  default: "border border-border bg-background text-foreground",
  outline: "border border-border bg-transparent text-muted-foreground",
  solid: "border border-transparent bg-primary/10 text-primary",
};

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs",
};

export function SkillBadge({ label, variant = "default", size = "md", className }: Props) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center rounded-md font-mono leading-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {label}
    </motion.span>
  );
}
