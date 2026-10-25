import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  X,
  Youtube,
} from "lucide-react";
import { Section, SectionHeading, NextLink, SkillBadge } from "@/components/ds";
import { Container } from "@/components/layout/container";
import {
  videoSeries,
  getEpisodesForSeries,
  youtubeEmbed,
  youtubeThumb,
  type VideoEpisode,
  type VideoSeries,
} from "@/data/videos";
import { getProject } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub — Surya Mitra" },
      {
        name: "description",
        content:
          "A structured video library on how data flows inside companies and walkthroughs of the portfolio's case studies.",
      },
      { property: "og:title", content: "Knowledge Hub — Surya Mitra" },
      {
        property: "og:description",
        content:
          "Structured video series on data flow inside companies and project walkthroughs.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [active, setActive] = useState<VideoEpisode | null>(null);
  const totalEpisodes = videoSeries.reduce(
    (n, s) => n + getEpisodesForSeries(s.id).length,
    0,
  );

  return (
    <>
      <Section spacing="md">
        <SectionHeading
          eyebrow="Knowledge Hub"
          title="A structured video library — organized by series."
          description="Video series exploring how data flows through modern organizations, and walkthroughs of the case studies on this site. Scroll each row to browse episodes."
        />

        <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>{videoSeries.length} series</span>
          <span className="h-px w-6 bg-border" />
          <span>{totalEpisodes} episodes</span>
        </div>
      </Section>

      <Section spacing="sm" bare>
        <Container>
          <div className="space-y-12">
            {videoSeries.map((series, i) => (
              <SeriesRow
                key={series.id}
                series={series}
                index={i + 1}
                onPlay={setActive}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <NextLink
          to="/research"
          eyebrow="Continue reading"
          title="Research notes and experiments."
          description="Kaggle competitions, methodology write-ups, and short exploratory analyses."
          cta="Read the research"
        />
      </Section>

      <PlayerModal episode={active} onClose={() => setActive(null)} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* SERIES ROW                                                          */
/* ------------------------------------------------------------------ */

function SeriesRow({
  series,
  index,
  onPlay,
}: {
  series: VideoSeries;
  index: number;
  onPlay: (ep: VideoEpisode) => void;
}) {
  const episodes = getEpisodesForSeries(series.id);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 text-eyebrow">
            <span className="text-primary">
              Series {String(index).padStart(2, "0")}
            </span>
            <span className="h-px w-6 bg-border" />
            <span>{episodes.length} episodes</span>
          </div>
          <h2 className="mt-2 font-serif text-xl leading-snug tracking-tight sm:text-2xl">
            {series.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {series.description}
          </p>
        </div>

        {episodes.length > 0 ? (
          <div className="hidden shrink-0 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>

      {episodes.length > 0 ? (
        <div className="relative -mx-4 sm:mx-0">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-0 [scrollbar-width:thin]"
          >
            {episodes.map((ep) => (
              <EpisodeTile key={ep.id} episode={ep} onPlay={onPlay} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-border bg-background/50 p-8 text-center">
          <div className="text-eyebrow">Coming soon</div>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Episodes for this series haven't been published yet.
          </p>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* EPISODE TILE                                                        */
/* ------------------------------------------------------------------ */

function EpisodeTile({
  episode,
  onPlay,
}: {
  episode: VideoEpisode;
  onPlay: (ep: VideoEpisode) => void;
}) {
  const handlePlay = () => {
    trackEvent("knowledge_episode_play", {
      series: episode.seriesId,
      episode: episode.episodeNumber,
      id: episode.youtubeId,
    });
    onPlay(episode);
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={cn(
        "group relative flex w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-md border border-border bg-card text-left transition-all",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-card sm:w-[300px]",
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={episode.thumbnail ?? youtubeThumb(episode.youtubeId)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/95 shadow-lg">
            <PlayCircle className="h-7 w-7 text-primary" />
          </span>
        </div>
        {episode.duration ? (
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
            {episode.duration}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="text-eyebrow text-primary">
          Ep {String(episode.episodeNumber).padStart(2, "0")}
        </div>
        <h3 className="mt-1.5 line-clamp-2 font-serif text-base leading-snug tracking-tight">
          {episode.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {episode.description}
        </p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* PLAYER MODAL                                                        */
/* ------------------------------------------------------------------ */

function PlayerModal({
  episode,
  onClose,
}: {
  episode: VideoEpisode | null;
  onClose: () => void;
}) {
  const related = episode?.relatedProjectSlug
    ? getProject(episode.relatedProjectSlug)
    : undefined;

  return (
    <AnimatePresence>
      {episode ? (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={episode.title}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-colors hover:bg-background"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={youtubeEmbed(episode.youtubeId) + "&autoplay=1"}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <div className="p-5 sm:p-6">
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
                {episode.publishedAt ? (
                  <>
                    <span className="h-px w-4 bg-border" />
                    <span>{episode.publishedAt}</span>
                  </>
                ) : null}
              </div>

              <h3 className="mt-3 font-serif text-lg leading-snug tracking-tight sm:text-xl">
                {episode.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {episode.description}
              </p>

              {episode.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {episode.tags.map((t) => (
                    <SkillBadge key={t} label={t} size="sm" />
                  ))}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Youtube className="h-3.5 w-3.5" /> Watch on YouTube
                  <ExternalLink className="h-3 w-3" />
                </a>

                {related ? (
                  <Link
                    to="/projects/$slug"
                    params={{ slug: related.slug }}
                    className="inline-flex items-center gap-1.5 text-xs text-primary transition-opacity hover:opacity-80"
                    onClick={onClose}
                  >
                    Related project: {related.title}
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
