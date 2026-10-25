import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, FileText } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section, NextLink } from "@/components/ds";
import { GrowthFlow } from "@/components/growth-flow";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import portraitAsset from "@/assets/surya-portrait.jpeg.asset.json";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  sameAs: profile.socials.map((s) => s.href),
  knowsAbout: profile.focus,
};

const HOME_STATS = [
  { label: "Case studies", value: String(projects.length) },
  { label: "Kaggle best rank", value: "282 / 2,744" },
  { label: "Primary stack", value: "SQL · Power BI · Python" },
  { label: "Status", value: "Open to analyst roles" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role} & AI Practitioner` },
      {
        name: "description",
        content:
          "Portfolio of Surya Mitra — data analyst case studies in SQL, Power BI and Python, with an active interest in AI, RAG and LLMs.",
      },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.bio },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personJsonLd) },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* MASTHEAD ----------------------------------------------------- */}
      <section className="relative border-b border-border bg-background">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <Container className="relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-16">
            <div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-display mt-6"
              >
                Looking beyond dashboards to understand how{" "}
                <span className="italic text-primary">businesses</span>{" "}
                make decisions.
              </motion.h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Good analysis begins with a business question, not a dashboard.
                I spend the time in SQL and dimensional data modeling up front
                so that when insights reach leadership, they drive clear
                decisions instead of debates. This portfolio captures my work
                across analytics, data engineering, and machine learning.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Explore model view
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <FileText className="h-4 w-4" />
                  View résumé
                </Link>
                <a
                  href="/Surya_Mitra_Resume.pdf"
                  download="Surya_Mitra_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>

            {/* PORTRAIT — editorial frame */}
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end"
            >
              <div aria-hidden className="absolute -inset-3 -z-10 rounded-md border border-border" />
              <div aria-hidden className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-md bg-primary/10" />
              <div className="overflow-hidden rounded-md border border-border bg-card shadow-card">
                {!imgError ? (
                  <img
                    src="/surya-portrait.jpeg"
                    alt={`${profile.name} — ${profile.role}`}
                    loading="eager"
                    onError={() => setImgError(true)}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full flex-col items-center justify-center bg-card p-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-serif text-2xl font-bold text-primary ring-8 ring-primary/5">
                      SM
                    </div>
                    <div className="mt-4 font-serif text-lg font-semibold text-foreground">
                      {profile.name}
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {profile.role} · {profile.location}
                    </div>
                    <div className="mt-3 rounded border border-border/80 bg-muted/60 px-2.5 py-1 font-mono text-[10.5px] text-muted-foreground">
                      Open to Analyst Roles
                    </div>
                  </div>
                )}
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>{profile.shortName}</span>
                <span>{profile.location}</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Stat strip — dashboard tile look */}
          <div className="mt-14 grid grid-cols-2 overflow-hidden rounded-md border border-border bg-card sm:grid-cols-4">
            {HOME_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`p-5 ${i < HOME_STATS.length - 1 ? "border-b border-border sm:border-b-0 sm:border-r" : ""} ${i % 2 === 0 ? "border-r sm:border-r" : ""} `}
              >
                <div className="text-eyebrow">{s.label}</div>
                <div className="mt-2 font-serif text-xl tracking-tight">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* GROWTH PATH & APPLICATION FOCUS ------------------------------ */}
      <Section spacing="md">
        <GrowthFlow />
      </Section>

      {/* FEATURED CASE STUDIES ---------------------------------------- */}
      <Section spacing="lg">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-4">
            <div>
              <div className="text-eyebrow">Featured Case Studies</div>
              <h2 className="text-h2 mt-3">Selected work in analytics & ML.</h2>
            </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            All {projects.length} cases
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="group block bg-card p-6 transition-colors hover:bg-accent/40"
            >
              <div className="text-eyebrow">
                <span className="text-primary">★ Featured</span> · {p.year}
              </div>
              <h3 className="mt-3 font-serif text-xl leading-tight transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>
              {p.metrics ? (
                <dl className="mt-5 grid grid-cols-2 gap-px border border-border bg-border">
                  {p.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="bg-card p-3">
                      <dt className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                        {m.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="mt-5 inline-flex items-center gap-1 text-sm text-primary">
                Read case
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* NARRATIVE NEXT ---------------------------------------------- */}
      <Section spacing="md">
        <NextLink
          to="/projects"
          eyebrow="Continue reading"
          title="Case studies, framed as business problems."
          description="Each project starts with a stakeholder question, walks through the data and analysis, and ends in a dashboard and a recommendation."
          cta="See the projects"
        />
      </Section>
    </>
  );
}
