import { ArrowRight, Sparkles, Database, BarChart3, Brain, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowStep {
  phase: string;
  role: string;
  status: "present" | "future";
  statusLabel: string;
  icon: typeof BarChart3;
  description: string;
  tools: string[];
}

const FLOW_STEPS: FlowStep[] = [
  {
    phase: "Stage 01",
    role: "Data Analyst",
    status: "present",
    statusLabel: "Present Application Role",
    icon: BarChart3,
    description:
      "Transforming business questions into honest metrics, star-schema modeling, and interactive Power BI dashboards that guide operational decisions.",
    tools: ["Power BI", "SQL / MySQL", "DAX", "Power Query", "Excel"],
  },
  {
    phase: "Stage 02",
    role: "Data Engineering",
    status: "present",
    statusLabel: "Present Application Role",
    icon: Database,
    description:
      "Handling real-world messy data, normalization, relational integrity, and automated ETL pipelines with Python and SQL.",
    tools: ["Python", "pandas", "ETL Pipelines", "Data Modeling", "MySQL"],
  },
  {
    phase: "Stage 03",
    role: "ML & Forecasting",
    status: "future",
    statusLabel: "Growth Path",
    icon: Brain,
    description:
      "Time-series audience forecasting, feature engineering, and tabular classification models benchmarked rigorously against naive baselines.",
    tools: ["Scikit-learn", "LightGBM", "XGBoost", "Time Series", "NLP"],
  },
  {
    phase: "Stage 04",
    role: "AI / RAG & LLMs",
    status: "future",
    statusLabel: "Future Interest & Frontier",
    icon: Bot,
    description:
      "Retrieval-Augmented Generation (RAG), vector embeddings, and LLM orchestration to augment analytical workflows with domain intelligence.",
    tools: ["RAG Systems", "Vector Search", "LLM Workflows", "Prompt Engineering"],
  },
];

export function GrowthFlow({ className }: { className?: string }) {
  return (
    <div className={cn("mt-12", className)}>
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-border pb-4">
        <div>
          <div className="text-eyebrow text-primary">Capabilities & Trajectory</div>
          <h2 className="mt-2 font-serif text-2xl tracking-tight sm:text-3xl">
            Growth Path: From Groundwork to the AI Layer
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
          My present application focus is in <strong>Data Analysis & Data Engineering</strong>, with an active trajectory expanding into <strong>Machine Learning, RAG, and LLM systems</strong>.
        </p>
      </div>

      {/* Trajectory Tracker Pipeline */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FLOW_STEPS.map((step, idx) => {
          const isPresent = step.status === "present";
          const Icon = step.icon;

          return (
            <div
              key={step.role}
              className={cn(
                "relative flex flex-col justify-between rounded-lg border p-5 transition-all",
                isPresent
                  ? "border-primary/40 bg-card shadow-sm ring-1 ring-primary/10"
                  : "border-border bg-card/60 hover:border-border/80"
              )}
            >
              <div>
                {/* Top status indicator */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {step.phase}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium font-mono",
                      isPresent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground border border-border"
                    )}
                  >
                    {!isPresent && <Sparkles className="h-2.5 w-2.5 text-primary" />}
                    {step.statusLabel}
                  </span>
                </div>

                {/* Role title & icon */}
                <div className="mt-4 flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                      isPresent
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
                    {step.role}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Tools chips */}
              <div className="mt-5 border-t border-border/60 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded bg-muted/70 px-1.5 py-0.5 font-mono text-[10.5px] text-foreground/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flow arrow on desktop */}
              {idx < FLOW_STEPS.length - 1 ? (
                <div
                  aria-hidden
                  className="hidden lg:absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background shadow-xs text-muted-foreground"
                >
                  <ArrowRight className="h-3 w-3" />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
