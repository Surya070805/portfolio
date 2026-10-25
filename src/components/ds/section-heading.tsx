import { motion } from "framer-motion";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  const reveal = useReveal();
  return (
    <motion.div
      {...reveal}
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 text-eyebrow",
          align === "center" && "justify-center",
        )}
      >
        {index ? <span className="text-primary">{index}</span> : null}
        <span className="h-px w-8 bg-border" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-h2 mt-4">{title}</h2>
      {description ? (
        <p className="mt-3 text-small text-muted-foreground sm:text-base">{description}</p>
      ) : null}
    </motion.div>
  );
}
