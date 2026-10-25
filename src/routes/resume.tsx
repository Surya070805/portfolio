import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, NextLink } from "@/components/ds";
import { Download, ExternalLink, Printer } from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Surya Mitra" },
      {
        name: "description",
        content:
          "Download or view Surya Mitra's résumé — data analyst with experience across Excel, SQL, Power BI, Python and AI projects.",
      },
      { property: "og:title", content: "Résumé — Surya Mitra" },
      {
        property: "og:description",
        content: "Data analyst résumé — SQL, Power BI, Python, AI.",
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const url = resumeAsset.url;

  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Résumé"
        title="The one-page version."
        description="A condensed, printable version of the experience covered across this site."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-border bg-card p-4">
        <div>
          <div className="text-eyebrow">Document</div>
          <div className="mt-1 font-mono text-sm">Surya_Mitra_Resume.pdf</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={url}
            download="Surya_Mitra_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-4 w-4" />
            Open in new tab
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
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm transition-colors hover:bg-accent"
          >
            <Printer className="h-4 w-4" />
            Print
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-border bg-card shadow-card">
        <object
          data={`${url}#view=FitH`}
          type="application/pdf"
          className="h-[80vh] w-full"
          aria-label="Surya Mitra résumé PDF"
        >
          <div className="p-10 text-center text-sm text-muted-foreground">
            Your browser can't display the embedded PDF.{" "}
            <a href={url} className="text-primary underline">
              Download it here
            </a>
            .
          </div>
        </object>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        For any inquiries, email{" "}
        <a href={`mailto:${profile.email}`} className="text-primary underline">
          {profile.email}
        </a>
        .
      </p>

      <NextLink
        to="/contact"
        eyebrow="Continue reading"
        title="Get in touch."
        description="Analyst roles, collaborations, dataset questions and feedback — all welcome."
        cta="Contact me"
      />
    </Section>
  );
}
