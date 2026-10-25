import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ExternalLink,
  List,
  Clock,
  Sparkles,
  X,
  Users,
  HelpCircle,
  Lightbulb,
  Youtube,
  Lock,
} from "lucide-react";
import { projects } from "@/data/projects";
import type { Project, ProjectVideo } from "@/types";
import { cn } from "@/lib/utils";

interface DashboardWalkthroughsProps {
  initialSlug?: string;
  className?: string;
}

export function DashboardWalkthroughs({
  initialSlug,
  className,
}: DashboardWalkthroughsProps) {
  const financeProject = projects.find((p) => p.slug === "finance-dashboard");
  const zomatoProject = projects.find((p) => p.slug === "zomato-bangalore-dashboard");
  const hrProject = projects.find((p) => p.slug === "hr-analytics-dashboard");

  const [activeModalVideo, setActiveModalVideo] = useState<{
    project: Project;
    video: ProjectVideo;
  } | null>(null);

  return (
    <div className={cn("mt-14", className)}>
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Executive Video Walkthroughs
          </div>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-foreground">
            Dashboard Walkthrough Series
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Recorded business walkthroughs explaining portfolio dashboards page-by-page — from underlying DAX and star schemas to actionable executive takeaways.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Finance Series Live · 2 Planned</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ==============================================================
            CARD 1: FINANCE DASHBOARD (LIVE WALKTHROUGH - EXACT USER DESIGN)
            ============================================================== */}
        {financeProject ? (
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-hover hover:border-primary/40">
            <div>
              {/* Header with Title and Link Icon */}
              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: financeProject.slug }}
                  className="group inline-flex items-center gap-1.5"
                >
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Finance Dashboard
                  </h3>
                </Link>
                <Link
                  to="/projects/$slug"
                  params={{ slug: financeProject.slug }}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  title="View project case study"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              {/* Creator Metadata Row */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#182236] text-[11px] font-bold text-white shadow-xs">
                  SV
                </div>
                <span className="font-medium text-foreground/80">
                  Suryamitra Velugula
                </span>
                <span>·</span>
                <span>2 videos</span>
                <span>·</span>
                <span>10 min</span>
              </div>

              {/* Video Items List */}
              <div className="mt-5 space-y-3">
                {financeProject.videos?.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() =>
                      setActiveModalVideo({ project: financeProject, video: vid })
                    }
                    className="group flex cursor-pointer items-center gap-3.5 rounded-xl border border-border/80 bg-background/50 p-2 transition-all hover:bg-accent/40 hover:border-primary/40"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-900 border border-border/60">
                      <img
                        src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                        alt={vid.pageTitle}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md">
                          <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.2 font-mono text-[9px] font-medium text-white">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 text-xs sm:text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {vid.pageTitle}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#182236] text-[8px] font-bold text-white">
                          SV
                        </div>
                        <span className="truncate">Suryamitra Velugula</span>
                        <span>·</span>
                        <span className="shrink-0">{vid.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Details & Play now */}
            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
              <Link
                to="/projects/$slug"
                params={{ slug: financeProject.slug }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors"
              >
                <List className="h-4 w-4 text-muted-foreground" />
                Details
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (financeProject.videos && financeProject.videos[0]) {
                    setActiveModalVideo({
                      project: financeProject,
                      video: financeProject.videos[0],
                    });
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1D4ED8] transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                Play now
              </button>
            </div>
          </div>
        ) : null}

        {/* ==============================================================
            CARD 2: RESTAURANT DASHBOARD (WALKTHROUGH IN PRODUCTION)
            ============================================================== */}
        {zomatoProject ? (
          <div className="flex flex-col justify-between rounded-2xl border border-dashed border-border bg-card/60 p-5 shadow-card transition-all hover:border-primary/40">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: zomatoProject.slug }}
                  className="group inline-flex items-center gap-1.5"
                >
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    Restaurant Dashboard
                  </h3>
                </Link>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Coming Soon
                </span>
              </div>

              {/* Creator Metadata */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#182236] text-[11px] font-bold text-white shadow-xs">
                  SV
                </div>
                <span className="font-medium text-foreground/80">
                  Suryamitra Velugula
                </span>
                <span>·</span>
                <span>3 videos planned</span>
              </div>

              {/* Planned Episodes Preview */}
              <div className="mt-5 space-y-3 opacity-80">
                <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-background/30 p-2">
                  <div className="flex aspect-[16/10] w-32 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                      Executive Overview & Locality Price Ceilings
                    </h4>
                    <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground">
                      Planned · ~4 min
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-background/30 p-2">
                  <div className="flex aspect-[16/10] w-32 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                      Star Schema & Vote-Weighted DAX Modeling
                    </h4>
                    <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground">
                      Planned · ~5 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
              <Link
                to="/projects/$slug"
                params={{ slug: zomatoProject.slug }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors"
              >
                <List className="h-4 w-4 text-muted-foreground" />
                Details
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3.5 py-2 text-xs font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                In Production
              </span>
            </div>
          </div>
        ) : null}

        {/* ==============================================================
            CARD 3: HR DASHBOARD (WALKTHROUGH IN PRODUCTION)
            ============================================================== */}
        {hrProject ? (
          <div className="flex flex-col justify-between rounded-2xl border border-dashed border-border bg-card/60 p-5 shadow-card transition-all hover:border-primary/40">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: hrProject.slug }}
                  className="group inline-flex items-center gap-1.5"
                >
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    HR Dashboard
                  </h3>
                </Link>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Coming Soon
                </span>
              </div>

              {/* Creator Metadata */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#182236] text-[11px] font-bold text-white shadow-xs">
                  SV
                </div>
                <span className="font-medium text-foreground/80">
                  Suryamitra Velugula
                </span>
                <span>·</span>
                <span>2 videos planned</span>
              </div>

              {/* Planned Episodes Preview */}
              <div className="mt-5 space-y-3 opacity-80">
                <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-background/30 p-2">
                  <div className="flex aspect-[16/10] w-32 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                      Headcount & First-Year Attrition Diagnosis
                    </h4>
                    <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground">
                      Planned · ~4 min
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-background/30 p-2">
                  <div className="flex aspect-[16/10] w-32 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/60 text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-2 text-xs sm:text-[13px] font-medium text-foreground leading-snug">
                      Overtime & Tenure Cohort Risk Modeling
                    </h4>
                    <span className="mt-1 inline-block font-mono text-[10.5px] text-muted-foreground">
                      Planned · ~5 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
              <Link
                to="/projects/$slug"
                params={{ slug: hrProject.slug }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-xs hover:bg-muted transition-colors"
              >
                <List className="h-4 w-4 text-muted-foreground" />
                Details
              </Link>

              <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3.5 py-2 text-xs font-medium text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                In Production
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* ==============================================================
          VIDEO PLAYER MODAL
          ============================================================== */}
      <AnimatePresence>
        {activeModalVideo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setActiveModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {activeModalVideo.project.title}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground">
                    {activeModalVideo.video.pageTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalVideo(null)}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* YouTube Video Embed Frame */}
              <div className="relative aspect-video w-full bg-black">
                {activeModalVideo.video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={activeModalVideo.video.pageTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : null}
              </div>

              {/* Modal Details & Action Bar */}
              <div className="p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
                      <Users className="h-3 w-3" />
                      Target: {activeModalVideo.video.audience}
                    </span>
                    {activeModalVideo.video.duration ? (
                      <span className="inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activeModalVideo.video.duration}
                      </span>
                    ) : null}
                  </div>

                  {activeModalVideo.video.youtubeUrl ? (
                    <a
                      href={activeModalVideo.video.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      <Youtube className="h-3.5 w-3.5 text-red-600" />
                      Open on YouTube
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </a>
                  ) : null}
                </div>

                {/* Business Question & Takeaway */}
                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <HelpCircle className="h-3.5 w-3.5 text-primary" />
                      Business Question Answered
                    </div>
                    <p className="mt-1.5 leading-relaxed text-foreground/90">
                      {activeModalVideo.video.businessQuestion}
                    </p>
                  </div>

                  {activeModalVideo.video.takeaway ? (
                    <div className="rounded-xl border border-border bg-muted/30 p-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                        Analyst Takeaway
                      </div>
                      <p className="mt-1.5 leading-relaxed text-foreground/90">
                        {activeModalVideo.video.takeaway}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
