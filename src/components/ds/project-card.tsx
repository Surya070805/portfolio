import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SkillBadge } from "./skill-badge";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  index?: number;
  featured?: boolean;
};

export function ProjectCard({ project: p, index, featured }: Props) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: p.slug }}
      className={cn(
        "group block border-t border-border bg-card transition-colors hover:bg-accent/40 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        featured && "bg-card",
      )}
    >
      <article className="grid gap-6 px-5 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
        <div className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {typeof index === "number"
            ? `Case ${String(index + 1).padStart(2, "0")}`
            : "Case study"}
        </div>

        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="text-primary">
              {p.category === "data"
                ? "Dashboards"
                : p.category === "backend"
                  ? "SQL & Analytics"
                  : p.category === "ai-ml"
                    ? "ML & Forecasting"
                    : "Research"}
            </span>
            <span>·</span>
            <span>{p.year}</span>
            {p.status ? (
              <>
                <span>·</span>
                <span>{p.status}</span>
              </>
            ) : null}
          </div>

          <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight transition-colors group-hover:text-primary">
            {p.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {p.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.slice(0, 5).map((t) => (
              <SkillBadge key={t} label={t} size="sm" />
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-1 self-center text-sm text-primary sm:flex">
          Read case
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </article>
    </Link>
  );
}
