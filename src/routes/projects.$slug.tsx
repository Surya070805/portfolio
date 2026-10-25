import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, PlayCircle, Youtube } from "lucide-react";
import { Section, SkillBadge } from "@/components/ds";
import { DashboardWalkthroughs } from "@/components/dashboard-walkthroughs";
import { getProject, projects, projectCategories } from "@/data/projects";
import {
  getEpisodesForProject,
  getSeries,
  youtubeEmbed,
  youtubeThumb,
  type VideoEpisode,
} from "@/data/videos";
import { useReveal } from "@/hooks/use-reveal";
import { trackEvent } from "@/lib/analytics";
import type { Project } from "@/types";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }] };
    return {
      meta: [
        { title: `${p.title} — Case Study` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.title} — Case Study` },
        { property: "og:description", content: p.summary },
        ...(p.cover
          ? [
              { property: "og:image", content: p.cover },
              { name: "twitter:image", content: p.cover },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => (
    <Section>
      <p className="text-sm text-destructive">Failed to load project: {error.message}</p>
    </Section>
  ),
  component: ProjectDetail,
});

function NotFound() {
  return (
    <Section>
      <h1 className="text-h2">Project not found</h1>
      <p className="mt-2 text-muted-foreground">
        The case study you're looking for doesn't exist.
      </p>
      <Link to="/projects" className="mt-6 inline-block text-primary hover:underline">
        ← All projects
      </Link>
    </Section>
  );
}

function ProjectDetail() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const reveal = useReveal();
  const categoryLabel =
    projectCategories.find((c) => c.id === p.category)?.label ?? p.category;

  const related = projects
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, 2);

  const relatedVideos = getEpisodesForProject(p.slug);

  return (
    <article>
      {/* COVER ------------------------------------------------------- */}
      <Section spacing="md">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All case studies
        </Link>

        <motion.header {...reveal} className="mt-8 border-b-2 border-foreground pb-10">
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="text-primary">Case study</span>
            <span className="h-px w-8 bg-border" />
            <span>{categoryLabel}</span>
            <span>·</span>
            <span>{p.year}</span>
            {p.status ? (
              <>
                <span>·</span>
                <span>{p.status}</span>
              </>
            ) : null}
          </div>
          <h1 className="text-display mt-5 max-w-4xl">{p.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {p.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {p.githubUrl ? (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                <Github className="h-4 w-4" /> Repository
              </a>
            ) : null}
            {p.liveDemoUrl ? (
              <a
                href={p.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            ) : null}
          </div>
        </motion.header>

        {/* Briefing card — like the front of a consulting deck */}
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {p.client ? <BriefCell label="Client / Context" value={p.client} /> : null}
          {p.role ? <BriefCell label="Role" value={p.role} /> : null}
          {p.timeframe ? <BriefCell label="Timeframe" value={p.timeframe} /> : null}
        </div>

        {p.metrics?.length ? (
          <div className="mt-px grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-card p-5">
                <div className="text-eyebrow">{m.label}</div>
                <div className="mt-2 font-serif text-2xl tracking-tight">{m.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* BODY -------------------------------------------------------- */}
      <Section spacing="md">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-eyebrow">Contents</div>
            <nav className="mt-4 space-y-2 text-sm">
              <TocLink href="#problem">01 · Business problem</TocLink>
              {p.dataset ? <TocLink href="#dataset">02 · Dataset</TocLink> : null}
              {p.analysis ? <TocLink href="#analysis">03 · Analysis</TocLink> : null}
              {p.keyInsights?.length ? (
                <TocLink href="#insights">04 · Key insights</TocLink>
              ) : null}
              {p.dashboard ? <TocLink href="#dashboard">05 · Dashboard</TocLink> : null}
              {p.recommendations?.length ? (
                <TocLink href="#recommendations">06 · Recommendations</TocLink>
              ) : null}
              {p.technologies?.length ? (
                <TocLink href="#tech">07 · Technologies</TocLink>
              ) : null}
            </nav>
          </aside>

          <div className="space-y-14">
            {p.businessProblem ? (
              <CaseSection id="problem" title="Business problem">
                <p>{p.businessProblem}</p>
              </CaseSection>
            ) : null}

            {p.dataset ? (
              <CaseSection id="dataset" title="Dataset">
                <p>{p.dataset}</p>
              </CaseSection>
            ) : null}

            {p.analysis ? (
              <CaseSection id="analysis" title="Analysis">
                <p>{p.analysis}</p>
              </CaseSection>
            ) : null}

            {p.keyInsights?.length ? (
              <CaseSection id="insights" title="Key insights">
                <ol className="space-y-4">
                  {p.keyInsights.map((it, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-4 first:border-t-0 first:pt-0"
                    >
                      <span className="font-serif text-xl text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ol>
              </CaseSection>
            ) : null}

            {p.dashboard ? (
              <CaseSection id="dashboard" title="Dashboard">
                <p>{p.dashboard}</p>
              </CaseSection>
            ) : null}

            {p.recommendations?.length ? (
              <CaseSection id="recommendations" title="Recommendations">
                <ul className="space-y-3">
                  {p.recommendations.map((it, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            ) : null}

            {p.technologies?.length ? (
              <CaseSection id="tech" title="Technologies used">
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <SkillBadge key={t} label={t} size="md" />
                  ))}
                </div>
              </CaseSection>
            ) : null}
          </div>
        </div>
      </Section>

      {/* DASHBOARD WALKTHROUGH PLAYLIST */}
      {p.videos && p.videos.length > 0 ? (
        <Section spacing="md">
          <DashboardWalkthroughs initialSlug={p.slug} />
        </Section>
      ) : null}

      {/* RELATED VIDEO ---------------------------------------------- */}
      {relatedVideos.length > 0 ? (
        <Section spacing="md">
          <div className="border-t-2 border-foreground pt-6">
            <div className="text-eyebrow">Related video</div>
            <div className="mt-6 space-y-8">
              {relatedVideos.map((ep) => (
                <RelatedVideo key={ep.id} episode={ep} />
              ))}
            </div>
            <Link
              to="/videos"
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-primary transition-opacity hover:opacity-80"
            >
              Browse the Knowledge Hub →
            </Link>
          </div>
        </Section>
      ) : null}

      {/* RELATED ----------------------------------------------------- */}
      {related.length > 0 ? (
        <Section spacing="md">
          <div className="border-t-2 border-foreground pt-6">
            <div className="text-eyebrow">More in {categoryLabel}</div>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/projects/$slug"
                  params={{ slug: r.slug }}
                  className="group block bg-card p-6 transition-colors hover:bg-accent/40"
                >
                  <div className="text-eyebrow">{r.year} · {r.status ?? ""}</div>
                  <h3 className="mt-3 font-serif text-lg leading-snug transition-colors group-hover:text-primary">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{r.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </article>
  );
}

function BriefCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-5">
      <div className="text-eyebrow">{label}</div>
      <div className="mt-2 text-sm leading-relaxed">{value}</div>
    </div>
  );
}

function TocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline gap-4 border-b border-border pb-3">
        <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
      </div>
      <div className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/90 [&_p]:text-foreground/90">
        {children}
      </div>
    </section>
  );
}

function RelatedVideo({ episode }: { episode: VideoEpisode }) {
  const [loaded, setLoaded] = useState(false);
  const series = getSeries(episode.seriesId);

  const onPlay = () => {
    setLoaded(true);
    trackEvent("project_related_video_play", {
      slug: episode.relatedProjectSlug,
      id: episode.youtubeId,
    });
  };

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-black">
        {loaded ? (
          <iframe
            src={youtubeEmbed(episode.youtubeId) + "&autoplay=1"}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={onPlay}
            className="group absolute inset-0 block"
            aria-label={`Play ${episode.title}`}
          >
            <img
              src={episode.thumbnail ?? youtubeThumb(episode.youtubeId)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/95 shadow-lg transition-transform group-hover:scale-110">
                <PlayCircle className="h-8 w-8 text-primary" />
              </span>
            </div>
          </button>
        )}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="text-primary">
            Ep {String(episode.episodeNumber).padStart(2, "0")}
          </span>
          {episode.duration ? (
            <>
              <span className="h-px w-4 bg-border" />
              <span>{episode.duration}</span>
            </>
          ) : null}
          {series ? (
            <>
              <span className="h-px w-4 bg-border" />
              <span>{series.title}</span>
            </>
          ) : null}
        </div>
        <h3 className="mt-3 font-serif text-lg leading-snug tracking-tight">
          {episode.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {episode.description}
        </p>
        <a
          href={episode.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Youtube className="h-3.5 w-3.5" /> Watch on YouTube
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
