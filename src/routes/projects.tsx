import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, ProjectCard, NextLink } from "@/components/ds";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

type Filter = "all" | ProjectCategory;

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Surya Mitra" },
      {
        name: "description",
        content:
          "Case studies in data analytics, SQL, Power BI dashboards, ML forecasting and exploratory research.",
      },
      { property: "og:title", content: "Projects — Surya Mitra" },
      {
        property: "og:description",
        content:
          "Case studies in data analytics, SQL, Power BI dashboards, ML forecasting and exploratory research.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All work" },
    ...projectCategories,
  ];

  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="Case studies"
        title="Projects, framed as business problems."
        description="Each entry is structured like a short consulting report — problem, data, analysis, insights, dashboard, recommendations."
      />

      <div className="mb-6 flex flex-wrap gap-2 border-y border-border py-3">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] transition-colors",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto self-center font-mono text-xs text-muted-foreground">
          {list.length} {list.length === 1 ? "case" : "cases"}
        </span>
      </div>

      <div className="border-b border-border">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <NextLink
        to="/videos"
        eyebrow="Continue reading"
        title="Walkthroughs and dashboard demos."
        description="Video explainers of the analyses and dashboards behind the case studies."
        cta="Watch the videos"
      />
    </Section>
  );
}
