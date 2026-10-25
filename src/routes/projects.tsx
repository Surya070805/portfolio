import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/ds";
import { ProjectsWorkspace } from "@/components/workspace/projects-workspace";
import { DashboardWalkthroughs } from "@/components/dashboard-walkthroughs";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Model View — Surya Mitra" },
      {
        name: "description",
        content:
          "An interactive Model View of case studies — dashboards, SQL, ML forecasting and research, linked by shared domains and technologies.",
      },
      { property: "og:title", content: "Projects & Model View — Surya Mitra" },
      {
        property: "og:description",
        content:
          "An interactive Model View of case studies — dashboards, SQL, ML forecasting and research, linked by shared domains and technologies.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="Model view"
        title="A workspace of case studies, not a gallery."
        description="Each project is a table in an analytics model. Relationships show shared business domains and technologies. Drag tables, pan and zoom, or filter by discipline — then open any table to read the full case study."
      />

      <ProjectsWorkspace />

      {/* Walkthrough Videos directly below project canvas */}
      <DashboardWalkthroughs />
    </Section>
  );
}
