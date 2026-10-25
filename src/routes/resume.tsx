import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, NextLink, SkillBadge } from "@/components/ds";
import { Download, ExternalLink, Printer, GraduationCap, Briefcase, Award, Wrench, FileText } from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { profile } from "@/data/profile";
import { about } from "@/data/about";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Surya Mitra | Data Analyst" },
      {
        name: "description",
        content:
          "Download or view Surya Mitra's résumé — data analyst with experience across SQL, Power BI, Python, dimensional modeling, and AI.",
      },
      { property: "og:title", content: "Résumé — Surya Mitra" },
      {
        property: "og:description",
        content: "Data analyst résumé — SQL, Power BI, Python, Data Engineering.",
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const url = "/Surya_Mitra_Resume.pdf";
  const [viewMode, setViewMode] = useState<"pdf" | "web">("web");

  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Résumé"
        title="Direct View & Official Download"
        description="Review credentials, technical competencies, and academic background below, or download the official single-page PDF."
      />

      {/* Action Header Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div>
          <div className="text-eyebrow text-primary">Official Document</div>
          <div className="mt-1 font-mono text-sm font-semibold text-foreground">
            Surya_Mitra_Resume.pdf
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Target Roles: Data Analyst · Data Engineering · BI Specialist
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="mr-2 inline-flex rounded-md border border-border bg-muted/50 p-1">
            <button
              onClick={() => setViewMode("web")}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition-colors",
                viewMode === "web"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Web Summary
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition-colors",
                viewMode === "pdf"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              PDF Document
            </button>
          </div>

          <a
            href={url}
            download="Surya_Mitra_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 shadow-xs"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3.5 py-2 text-sm transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Open
          </a>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.preventDefault();
              const w = window.open(url, "_blank");
              w?.addEventListener("load", () => w.print());
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Printer className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* WEB-NATIVE SCANNABLE VIEW (Always readable on mobile & corporate networks) */}
      {viewMode === "web" ? (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center border-b border-border pb-6">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                  {profile.name}
                </h2>
                <p className="mt-1 font-mono text-sm text-primary">
                  Data Analyst · Data Engineering · AI Practitioner
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Location: {profile.location} · Email:{" "}
                  <a href={`mailto:${profile.email}`} className="text-primary underline">
                    {profile.email}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded border border-border bg-muted/60 px-2.5 py-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Profile statement */}
            <div className="mt-6">
              <div className="text-eyebrow">Professional Summary</div>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/90">
                Analytical and detail-oriented data analyst with rigorous foundations in SQL modeling,
                Power BI dashboard design, and Python. Experienced in transforming messy datasets into
                normalized schemas and stakeholder-focused reports that uncover root drivers behind
                operational metrics. Active contributor in machine learning competitions (Kaggle Rank 282 / 2,744)
                with a dedicated growth path toward automated data pipelines and AI systems.
              </p>
            </div>
          </div>

          {/* Grid: Education & Technical Skills */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Education */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-eyebrow text-primary">
                <GraduationCap className="h-4 w-4" />
                Education & Diplomas
              </div>

              <div className="mt-5 space-y-6">
                {about.education.map((edu) => (
                  <div key={edu.institution} className="border-b border-border/70 pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-base font-semibold text-foreground">
                        {edu.institution}
                      </h4>
                      {edu.grade ? (
                        <span className="shrink-0 font-mono text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {edu.grade}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-1 text-xs font-medium text-foreground/80">
                      {edu.degree}
                    </div>

                    <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      {edu.period}
                    </div>

                    {edu.skills && edu.skills.length > 0 ? (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {edu.skills.map((sk) => (
                          <span
                            key={sk}
                            className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Toolkit */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-eyebrow text-primary">
                <Wrench className="h-4 w-4" />
                Technical Competencies
              </div>

              <div className="mt-5 space-y-5">
                {skillGroups.map((group) => (
                  <div key={group.label} className="border-b border-border/70 pb-4 last:border-b-0 last:pb-0">
                    <div className="font-mono text-xs font-medium text-foreground">
                      {group.label}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <SkillBadge key={item} label={item} size="sm" />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <div className="font-mono text-xs font-medium text-foreground">
                    Analytical Methodologies
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {[
                      "Star-schema modeling",
                      "DAX Measures",
                      "ETL & Data Cleaning",
                      "Cohort Analysis",
                      "Baseline Benchmarking",
                      "Feature Engineering",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded border border-border bg-muted/40 px-2.5 py-1 font-mono text-[11px] text-foreground/90"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Projects Highlight */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-eyebrow text-primary">
              <Briefcase className="h-4 w-4" />
              Selected Portfolio Projects
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {projects.slice(0, 3).map((p) => (
                <div key={p.slug} className="rounded-md border border-border bg-background p-4">
                  <div className="text-[11px] font-mono text-primary">{p.year} · {p.tags.join(" · ")}</div>
                  <h4 className="mt-2 font-serif text-base font-semibold text-foreground">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {p.summary}
                  </p>
                  <a
                    href={`/projects/${p.slug}`}
                    className="mt-3 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    Read case study →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* PDF OBJECT EMBED VIEW */
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <object
            data={`${url}#view=FitH`}
            type="application/pdf"
            className="h-[82vh] w-full"
            aria-label="Surya Mitra résumé PDF"
          >
            <div className="p-12 text-center text-sm text-muted-foreground">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/60 mb-3" />
              Your browser cannot display the PDF preview directly.
              <div className="mt-3">
                <a
                  href={url}
                  download="Surya_Mitra_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground font-medium"
                >
                  <Download className="h-4 w-4" />
                  Download Resume PDF
                </a>
              </div>
            </div>
          </object>
        </div>
      )}

      {/* Recruiter Contact CTA */}
      <div className="mt-10 rounded-lg border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-serif text-lg font-semibold">Interested in collaborating or scheduling an interview?</div>
          <p className="text-xs text-muted-foreground mt-1">
            Open to roles in Data Analysis, Business Intelligence, and Data Engineering.
          </p>
        </div>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Contact Surya
        </a>
      </div>
    </Section>
  );
}
