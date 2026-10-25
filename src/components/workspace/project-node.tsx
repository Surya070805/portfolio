import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export type ProjectNodeData = {
  project: Project;
  dimmed?: boolean;
  highlighted?: boolean;
  onOpen: (slug: string) => void;
};

const domainLabel: Record<string, string> = {
  data: "Data Analytics & BI",
  backend: "SQL & Analytics",
  "ai-ml": "ML / DL / AI",
  research: "Exploration & Labs",
  frontend: "Frontend",
  web: "Web Applications",
  mcp: "Agentic MCP",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-t border-border/70 px-4 py-1.5 text-xs">
      <span className="font-mono uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-right text-foreground/90">{value}</span>
    </div>
  );
}

function ProjectNodeInner({ data, selected }: NodeProps) {
  const { project: p, dimmed, highlighted, onOpen } = data as ProjectNodeData;
  const insights = p.keyInsights?.length ?? 0;
  const recs = p.recommendations?.length ?? 0;
  const primaryTech = (p.technologies ?? p.tags).slice(0, 3);

  return (
    <div
      className={cn(
        "w-[320px] select-none rounded-sm border bg-card font-sans transition-all duration-200",
        "border-border shadow-[0_1px_0_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.05)]",
        selected && "ring-1 ring-primary",
        highlighted && "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]",
        dimmed && "opacity-30",
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2.5 !w-2.5 !border-border !bg-background"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2.5 !w-2.5 !border-border !bg-background"
      />

      {/* Title bar — like Power BI table header */}
      <div className="block w-full border-b border-border bg-muted/60 px-4 py-2.5 text-left">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {domainLabel[p.category] ?? p.category}
          </span>
          {p.tier && p.tier !== "main" ? (
            <span
              className={cn(
                "rounded px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider",
                p.tier === "practice" && "border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
                p.tier === "competition" && "border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400",
                p.tier === "hackathon" && "border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
              )}
            >
              {p.tier}
            </span>
          ) : p.walkthroughStatus === "available" ? (
            <span className="rounded border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-primary">
              ▶ Video
            </span>
          ) : null}
        </div>
        <div className="mt-1 truncate font-serif text-base leading-tight text-foreground">
          {p.title}
        </div>
      </div>

      <div className="bg-card">
        <Row label="Domain" value={domainLabel[p.category]} />
        <Row
          label="Question"
          value={
            <span className="line-clamp-1 max-w-[200px]">
              {p.businessProblem?.split(".")[0]?.slice(0, 50) ?? "—"}…
            </span>
          }
        />
        <Row
          label="Techniques"
          value={
            <span className="flex flex-wrap justify-end gap-1">
              {primaryTech.map((t) => (
                <span
                  key={t}
                  className="rounded-sm border border-border bg-background px-1 py-px font-mono text-[9px] uppercase tracking-wider text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </span>
          }
        />
        <Row label="Insights" value={insights || "—"} />
        <Row label="Recommendations" value={recs || "—"} />
        <Row
          label="Status"
          value={
            <span className="inline-flex items-center gap-1.5">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  p.status === "shipped"
                    ? "bg-emerald-600"
                    : p.status === "in-progress"
                      ? "bg-amber-500"
                      : "bg-slate-400",
                )}
              />
              {p.status === "shipped"
                ? "Completed"
                : p.status === "in-progress"
                  ? "In progress"
                  : (p.status ?? "—")}
            </span>
          }
        />
      </div>

      {selected ? (
        <div className="border-t border-border bg-muted/40 px-4 py-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(p.slug);
            }}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore project →
          </button>
        </div>
      ) : (
        <div className="border-t border-border bg-muted/20 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Click to select
        </div>
      )}
    </div>
  );
}

export const ProjectNode = memo(ProjectNodeInner);
