import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, SkillBadge, NextLink } from "@/components/ds";
import { about } from "@/data/about";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Surya Mitra" },
      {
        name: "description",
        content:
          "Surya Mitra — aspiring data analyst with a B.Tech background, IIT-M Data Science diploma, and active practice across SQL, Power BI, Python and AI.",
      },
      { property: "og:title", content: "About — Surya Mitra" },
      {
        property: "og:description",
        content:
          "Aspiring data analyst — background, philosophy, education and toolkit.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section spacing="md">
        <SectionHeading
          eyebrow="About"
          title="Aspiring data analyst, building toward the AI layer."
          description="A short biography, the principles I work by, and the academic path behind the practice."
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 font-serif text-lg leading-relaxed text-foreground/90">
            {about.introduction.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-md border border-border bg-card p-5">
              <div className="text-eyebrow">Quick facts</div>
              <dl className="mt-3 divide-y divide-border text-sm">
                <FactRow label="Name" value={profile.name} />
                <FactRow label="Role" value={profile.role} />
                <FactRow label="Location" value={profile.location} />
                <FactRow label="Email" value={profile.email} />
              </dl>
            </div>

            <div className="rounded-md border border-border bg-card p-5">
              <div className="text-eyebrow">Currently focused on</div>
              <ul className="mt-3 space-y-2 text-sm">
                {about.technicalInterests.map((t) => (
                  <li key={t} className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-primary">→</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      {/* Philosophy */}
      <Section spacing="md">
        <div className="border-b-2 border-foreground pb-4">
          <div className="text-eyebrow">Working principles</div>
          <h2 className="text-h2 mt-3 max-w-3xl">
            {about.technicalPhilosophy.headline}
          </h2>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {about.technicalPhilosophy.points.map((point, i) => (
            <div key={point.title} className="bg-card p-6">
              <div className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
                P{String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-serif text-lg leading-snug">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {point.statement}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section spacing="md">
        <div className="border-b-2 border-foreground pb-4">
          <div className="text-eyebrow">Education</div>
          <h2 className="text-h2 mt-3">Academic timeline.</h2>
        </div>

        <ol className="mt-8 divide-y divide-border border-y border-border">
          {about.education.map((edu) => (
            <li
              key={edu.institution}
              className="grid gap-4 px-1 py-6 sm:grid-cols-[160px_1fr_auto] sm:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {edu.period}
              </span>
              <div>
                <h3 className="font-serif text-lg leading-snug">{edu.institution}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{edu.degree}</p>
                {edu.skills?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {edu.skills.map((s) => (
                      <SkillBadge key={s} label={s} size="sm" />
                    ))}
                  </div>
                ) : null}
              </div>
              {edu.grade ? (
                <span className="self-start rounded-sm border border-border bg-card px-2 py-1 font-mono text-xs text-muted-foreground">
                  {edu.grade}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Section>

      {/* Toolkit */}
      <Section spacing="md">
        <div className="border-b-2 border-foreground pb-4">
          <div className="text-eyebrow">Toolkit</div>
          <h2 className="text-h2 mt-3">Tools I reach for daily.</h2>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div key={g.label} className="bg-card p-5">
              <div className="text-eyebrow">{g.label}</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </Section>

      <Section spacing="md">
        <NextLink
          to="/resume"
          eyebrow="Continue reading"
          title="The one-page version."
          description="A condensed, printable résumé — SQL, Power BI, Python and AI experience."
          cta="View résumé"
        />
      </Section>
    </>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 first:pt-0 last:pb-0">
      <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </dt>
      <dd className="text-right text-sm">{value}</dd>
    </div>
  );
}
