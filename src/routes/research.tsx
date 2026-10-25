import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, SkillBadge, NextLink } from "@/components/ds";
import { researchNotes } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Surya Mitra" },
      {
        name: "description",
        content:
          "Working notes, exploratory data analyses and short research write-ups across analytics, fairness and forecasting.",
      },
      { property: "og:title", content: "Research — Surya Mitra" },
      {
        property: "og:description",
        content:
          "Exploratory data analyses, fairness studies and methodology notes.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Research notes"
        title="Working notes and exploratory analyses."
        description="Short, opinionated write-ups that sit between a blog post and a paper — methodology, findings, and the caveats behind both."
      />

      <ul className="divide-y divide-border border-y border-border">
        {researchNotes.map((n, i) => (
          <li key={n.slug}>
            <a
              href={n.href}
              target="_blank"
              rel="noreferrer"
              className="group grid items-baseline gap-4 px-1 py-7 transition-colors hover:bg-accent/40 sm:grid-cols-[80px_140px_1fr_auto] sm:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                N°{String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {n.date}
              </span>
              <div>
                <h2 className="font-serif text-xl leading-snug transition-colors group-hover:text-primary">
                  {n.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {n.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {n.tags.map((t) => (
                    <SkillBadge key={t} label={t} size="sm" />
                  ))}
                </div>
              </div>
              <span className="hidden self-center text-sm text-primary sm:inline-flex sm:items-center sm:gap-1">
                Read
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
        More notes are in progress. If you want to be pinged when a new one
        publishes, the easiest channel is GitHub or LinkedIn — links in the
        footer.
      </p>

      <NextLink
        to="/about"
        eyebrow="Continue reading"
        title="The path from mechanical engineering to data."
        description="Background, working principles, and the academic timeline behind the practice."
        cta="Read about me"
      />
    </Section>
  );
}
