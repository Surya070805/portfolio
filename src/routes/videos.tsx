import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading, NextLink } from "@/components/ds";
import { Youtube, ArrowRight } from "lucide-react";
import { videos } from "@/data/projects";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Surya Mitra" },
      {
        name: "description",
        content:
          "Walkthroughs, explainers and dashboard demos — covering SQL, Power BI and applied AI.",
      },
      { property: "og:title", content: "Videos — Surya Mitra" },
      {
        property: "og:description",
        content: "Walkthroughs and dashboard demos.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const hasVideos = videos.length > 0;

  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Videos"
        title="Walkthroughs and dashboard demos."
        description="Short video explainers of the analyses, dashboards and tools I work with."
      />

      {hasVideos ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <a
              key={v.id}
              href={v.href ?? `https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-md border border-border bg-card transition-colors hover:bg-accent/40"
            >
              <div className="relative aspect-video bg-muted">
                {v.youtubeId ? (
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Youtube className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-primary">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{v.publishedAt ?? ""}</span>
                  <span>{v.duration ?? ""}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-border bg-card p-10 text-center">
          <div className="text-eyebrow">Coming soon</div>
          <h2 className="text-h2 mx-auto mt-4 max-w-2xl">
            Video walkthroughs are in the pipeline.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            I'm currently recording short demos of the case studies on this site —
            Power BI builds, SQL deep-dives, and a few AI experiments. Until then,
            the projects page has the full written write-ups.
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read the case studies
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <NextLink
        to="/research"
        eyebrow="Continue reading"
        title="Research notes and experiments."
        description="Kaggle competitions, methodology write-ups, and short exploratory analyses."
        cta="Read the research"
      />
    </Section>
  );
}
