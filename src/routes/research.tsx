import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading, SkillBadge, NextLink } from "@/components/ds";
import { explorations } from "@/data/explorations";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Explorations — Surya Mitra" },
      {
        name: "description",
        content:
          "Explorations — side projects, deployment experiments, suggested papers and YouTube channels, working notes, and architecture sketches.",
      },
      { property: "og:title", content: "Explorations — Surya Mitra" },
      {
        property: "og:description",
        content:
          "Side projects, experiments, references and architecture sketches.",
      },
    ],
  }),
  component: ExplorationsPage,
});

function ExplorationsPage() {
  const [activeId, setActiveId] = useState(explorations[0].id);
  const active =
    explorations.find((s) => s.id === activeId) ?? explorations[0];

  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Explorations"
        title="Side quests, references, and half-formed diagrams."
        description="Everything that doesn't belong on the case-study track — smaller builds, deployment notes, reading and viewing recommendations, working notes and system sketches."
      />

      {/* Tabs */}
      <div className="border-y border-border">
        <div
          role="tablist"
          aria-label="Exploration sections"
          className="scrollbar-none -mx-1 flex gap-1 overflow-x-auto px-1 py-2"
        >
          {explorations.map((s, i) => {
            const selected = s.id === active.id;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "group flex shrink-0 items-baseline gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
                  selected
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.22em]",
                    selected ? "text-background/70" : "text-primary",
                  )}
                >
                  0{i + 1}
                </span>
                <span className="whitespace-nowrap">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section blurb */}
      <div className="mt-8 max-w-2xl">
        <div className="text-eyebrow">{active.label}</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {active.blurb}
        </p>
      </div>

      {/* Items */}
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {active.items.map((item, i) => {
          const isLink = Boolean(item.href);
          const Wrapper: React.ElementType = isLink ? "a" : "div";
          const wrapperProps = isLink
            ? { href: item.href, target: "_blank", rel: "noreferrer" }
            : {};
          return (
            <li key={`${active.id}-${i}`}>
              <Wrapper
                {...wrapperProps}
                className={cn(
                  "grid items-baseline gap-4 px-1 py-6 sm:grid-cols-[80px_1fr_auto] sm:gap-8",
                  isLink &&
                    "group cursor-pointer transition-colors hover:bg-accent/40",
                )}
              >
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                  N°{String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3
                      className={cn(
                        "font-serif text-xl leading-snug",
                        isLink && "transition-colors group-hover:text-primary",
                      )}
                    >
                      {item.title}
                    </h3>
                    {item.meta ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {item.meta}
                      </span>
                    ) : null}
                  </div>
                  {item.summary ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                  ) : null}
                  {item.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <SkillBadge key={t} label={t} size="sm" />
                      ))}
                    </div>
                  ) : null}
                </div>
                {isLink ? (
                  <span className="hidden self-center text-sm text-primary sm:inline-flex sm:items-center sm:gap-1">
                    Open
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                ) : (
                  <span className="hidden self-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
                    Note
                  </span>
                )}
              </Wrapper>
            </li>
          );
        })}
      </ul>

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
