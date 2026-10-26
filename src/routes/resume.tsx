import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, SkillBadge } from "@/components/ds";
import {
  Download,
  ExternalLink,
  Printer,
  GraduationCap,
  Briefcase,
  Wrench,
  FileText,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Languages,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { profile } from "@/data/profile";
import { about } from "@/data/about";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Suryamitra Velugula | Data Analyst" },
      {
        name: "description",
        content:
          "Official résumé of Suryamitra Velugula — Data Analyst with B.Tech at NIT Andhra Pradesh & Diploma in Data Science from IIT Madras. Hands-on experience across SQL, Power BI, Python, dimensional modeling, and AI.",
      },
      { property: "og:title", content: "Résumé — Suryamitra Velugula" },
      {
        property: "og:description",
        content:
          "Data Analyst résumé — SQL Server, Power BI, Python, star-schema modeling, and generative AI.",
      },
    ],
  }),
  component: ResumePage,
});

const RESUME_PROJECTS = [
  {
    title: "Loan Portfolio Risk Analytics | Credit Risk & Lending Intelligence",
    tools: ["SQL Server", "Python (Pandas)", "Power BI"],
    period: "Jun – Aug 2026",
    repoUrl: "https://github.com/Surya070805/Finance-Dashboard",
    hasWalkthrough: true,
    bullets: [
      "Designed and implemented a Loan Portfolio Risk Analytics solution on 1.04M+ lending records, performing data cleaning, profiling, and transformation using Python (Pandas) and SQL Server Management Studio (SSMS).",
      "Built a star schema data model with fact and dimension tables, and conducted advanced SQL analysis using aggregations, CTEs, window functions, ranking, and business views to identify key loan default risk drivers.",
      "Developed an executive Power BI dashboard to monitor portfolio performance, credit quality, borrower risk segments, and lending trends, generating data-driven recommendations based on FICO scores, DTI ratios, income levels, loan grades, and loan outcomes.",
    ],
  },
  {
    title: "HR Analytics Dashboard | Workforce Attrition Analysis",
    tools: ["Python", "Pandas", "Excel", "Google Colab"],
    period: "May 2026",
    repoUrl: "https://github.com/Surya070805/HR-Dashboard",
    hasWalkthrough: false,
    bullets: [
      "Conducted exploratory data analysis on 1,470 employee records using Python, Pandas, and NumPy to identify attrition patterns, workforce trends, and retention risks.",
      "Developed an analytics framework incorporating Driver Analysis, Contribution Analysis, Risk Matrix, and Employee Persona Segmentation to support workforce planning.",
      "Identified high-risk employee segments, including Low Income + OverTime + New Hire groups, with attrition rates reaching 81.25%.",
      "Generated data-driven retention recommendations by analyzing attrition across 17 workforce dimensions and multiple feature interactions.",
    ],
  },
  {
    title: "Restaurant Market Intelligence Platform | Business Analytics & Decision Support",
    tools: ["SQL", "Power BI", "Power Query"],
    period: "Mar – Jun 2025",
    repoUrl: "https://github.com/Surya070805/Zomato_Restaurent_Dashboard",
    hasWalkthrough: false,
    bullets: [
      "Built an end-to-end restaurant market intelligence platform by integrating data preparation, business analysis, KPI reporting, and predictive analytics on the Bengaluru restaurant ecosystem.",
      "Designed a dimensional data model and KPI framework to evaluate locality performance, cuisine demand, pricing strategy, ratings, and service availability.",
      "Performed multivariate analysis to identify relationships between pricing, customer engagement, and restaurant ratings, translating findings into business recommendations.",
    ],
  },
];

function ResumePage() {
  const pdfUrl = "/Surya_Mitra_Resume.pdf";
  const previewImgUrl = "/surya-resume-page.png";
  const [viewMode, setViewMode] = useState<"visual" | "pdf" | "web">("visual");
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Official Résumé"
        title="Direct View & Single-Page Download"
        description="Review verified technical credentials, academic background, and decision-support project highlights, or view/download the official single-page PDF."
      />

      {/* Top Action Header Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div>
          <div className="text-eyebrow text-primary font-mono text-[11px]">Official Resume</div>
          <div className="mt-1 font-mono text-sm font-semibold text-foreground">
            Surya_Mitra_Resume.pdf
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Suryamitra Velugula · NIT Andhra Pradesh & IIT Madras · Data Analyst
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex rounded-md border border-border bg-muted/50 p-1">
            <button
              onClick={() => setViewMode("visual")}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5",
                viewMode === "visual"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
              Visual Document
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5",
                viewMode === "pdf"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              Interactive PDF
            </button>
            <button
              onClick={() => setViewMode("web")}
              className={cn(
                "rounded px-3 py-1.5 text-xs font-medium transition-colors",
                viewMode === "web"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Web Summary
            </button>
          </div>

          <a
            href={pdfUrl}
            download="Surya_Mitra_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 shadow-xs"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Open
          </a>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.preventDefault();
              const w = window.open(pdfUrl, "_blank");
              w?.addEventListener("load", () => w.print());
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:bg-accent"
            title="Print PDF"
          >
            <Printer className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* 1. VISUAL DOCUMENT VIEW (High-Res 1:1 Page, 100% Reliable on all browsers and mobile) */}
      {viewMode === "visual" && (
        <div className="space-y-4">
          {/* Document Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-muted/40 px-4 py-2 text-xs font-mono">
            <span className="text-muted-foreground">
              Single-Page Document · 100% Verified Layout
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 hover:bg-accent transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-3 w-3" />
                <span>-</span>
              </button>
              <span className="px-1 text-muted-foreground">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 hover:bg-accent transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-3 w-3" />
                <span>+</span>
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-1 hover:bg-accent transition-colors text-[11px]"
              >
                Reset
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded border border-border bg-background px-2.5 py-1 text-primary hover:bg-accent transition-colors"
              >
                <Maximize2 className="h-3 w-3" />
                Fullscreen PDF
              </a>
            </div>
          </div>

          {/* Paper Container */}
          <div className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 sm:p-8 flex justify-center shadow-inner">
            <div
              style={{ width: `${zoomLevel}%`, maxWidth: "860px", minWidth: "320px" }}
              className="relative transition-all duration-200"
            >
              <div className="overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-black/10">
                <img
                  src={previewImgUrl}
                  alt="Suryamitra Velugula Official Resume"
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-2 text-xs text-muted-foreground font-mono">
            Want to use the browser native reader?{" "}
            <button
              onClick={() => setViewMode("pdf")}
              className="text-primary underline hover:text-foreground font-semibold"
            >
              Switch to Interactive PDF Reader
            </button>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE PDF VIEWER (Browser iframe/object embed) */}
      {viewMode === "pdf" && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              className="h-[85vh] w-full border-0"
              title="Suryamitra Velugula Official Résumé"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono px-1">
            <span>
              If your browser blocks inline PDF embedding, use{" "}
              <button
                onClick={() => setViewMode("visual")}
                className="text-primary underline hover:text-foreground font-semibold"
              >
                Visual Document mode
              </button>
            </span>
            <a
              href={pdfUrl}
              download="Surya_Mitra_Resume.pdf"
              className="text-primary underline hover:text-foreground"
            >
              Download direct PDF copy →
            </a>
          </div>
        </div>
      )}

      {/* 3. WEB-NATIVE SCANNABLE VIEW */}
      {viewMode === "web" && (
        <div className="space-y-8">
          {/* Resume Header Card with contact info */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start border-b border-border pb-6">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {profile.fullName || profile.name}
                </h1>
                <p className="mt-1.5 font-mono text-sm font-medium text-primary">
                  Data Analyst · Business Intelligence · Data Engineering
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted-foreground font-mono">
                  <a
                    href="tel:+916281113835"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    +91 6281113835
                  </a>
                  <span>•</span>
                  <a
                    href="mailto:suryamitrav@gmail.com"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    suryamitrav@gmail.com
                  </a>
                </div>
              </div>

              {/* Verified Links */}
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <a
                  href="https://www.linkedin.com/in/suryamitrav"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/60 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                  linkedin.com/in/suryamitrav
                </a>
                <a
                  href="https://github.com/Surya070805"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/60 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  github.com/Surya070805
                </a>
                <a
                  href="https://portfolio-ten-pi-pai4jcpgcr.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/60 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  portfolio.io
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-6">
              <div className="text-eyebrow text-primary">Professional Summary</div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90 sm:text-base">
                Mechanical Engineering undergraduate with a parallel Diploma in Data Science and Applications
                from IIT Madras, building a strong foundation in data analytics and machine learning. Hands-on
                experience applying Python, SQL, and BI tools to real-world datasets through analytical and
                decision-support projects. Exploring modern AI-based approaches for information retrieval.
              </p>
            </div>
          </div>

          {/* Education & Experience in 2 Columns */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Education */}
            <div className="rounded-lg border border-border bg-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-eyebrow text-primary">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </div>

                <div className="mt-5 space-y-6">
                  {about.education.map((edu) => (
                    <div
                      key={edu.institution}
                      className="border-b border-border/70 pb-5 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-base font-semibold text-foreground">
                          {edu.institution}
                        </h3>
                        {edu.grade && (
                          <span className="shrink-0 font-mono text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                            {edu.grade}
                          </span>
                        )}
                      </div>

                      <div className="mt-1 text-xs font-medium text-foreground/80">
                        {edu.degree}
                      </div>

                      <div className="mt-0.5 font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages Box */}
              {about.languages && (
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground">
                    <Languages className="h-3.5 w-3.5 text-primary" />
                    Languages
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {about.languages.map((l) => (
                      <span
                        key={l.language}
                        className="rounded border border-border bg-muted/40 px-2.5 py-1 text-xs font-mono text-foreground"
                      >
                        <span className="font-semibold">{l.language}</span>{" "}
                        <span className="text-muted-foreground">({l.level})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Work Experience */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-eyebrow text-primary">
                <Briefcase className="h-4 w-4" />
                Experience
              </div>

              <div className="mt-5 space-y-6">
                {about.experience?.map((exp) => (
                  <div key={exp.company} className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-base font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-semibold text-primary font-mono mt-0.5">
                          {exp.company}
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs leading-relaxed text-foreground/85">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.skills && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((sk) => (
                          <span
                            key={sk}
                            className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Resume Projects */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
              <div className="flex items-center gap-2 text-eyebrow text-primary">
                <Layers className="h-4 w-4" />
                Featured Decision-Support Projects
              </div>
              <a
                href="/projects"
                className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
              >
                View interactive Power BI model canvas →
              </a>
            </div>

            <div className="mt-6 space-y-8">
              {RESUME_PROJECTS.map((proj, pIdx) => (
                <div
                  key={proj.title}
                  className={cn(
                    "space-y-3",
                    pIdx > 0 && "pt-6 border-t border-border/70"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground">
                        {proj.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-mono text-muted-foreground">
                        <span className="font-semibold text-foreground">Tools:</span>
                        {proj.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded bg-muted/60 border border-border px-1.5 py-0.5 text-[11px] text-foreground/90"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        {proj.period}
                      </span>
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline border border-border rounded px-2 py-0.5 bg-background"
                        >
                          <Github className="h-3 w-3" />
                          Repository
                        </a>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-foreground/85">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="text-primary mt-1 text-xs font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {proj.hasWalkthrough && (
                    <div className="pt-1">
                      <a
                        href="/projects"
                        className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Watch 2-part Executive Dashboard Walkthrough on Projects Canvas →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Categorized */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-2 text-eyebrow text-primary border-b border-border pb-4">
              <Wrench className="h-4 w-4" />
              Technical Skills & Methodologies
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="rounded-md border border-border/80 bg-background/50 p-4"
                >
                  <div className="font-mono text-xs font-semibold text-primary">
                    {group.label}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <SkillBadge key={item} label={item} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recruiter Contact CTA */}
      <div className="mt-10 rounded-lg border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-serif text-lg font-semibold">
            Looking for a Data Analyst with solid modeling and BI foundations?
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Available for full-time Data Analyst, Business Intelligence, and Data Engineering roles.
          </p>
        </div>
        <a
          href="mailto:suryamitrav@gmail.com"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Mail className="h-4 w-4" />
          Get in touch
        </a>
      </div>
    </Section>
  );
}
