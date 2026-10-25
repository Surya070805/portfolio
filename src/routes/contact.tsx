import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, SocialCard, ContactForm } from "@/components/ds";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Surya Mitra" },
      {
        name: "description",
        content:
          "Get in touch with Surya Mitra — analyst roles, collaborations, dataset questions and feedback all welcome.",
      },
      { property: "og:title", content: "Contact — Surya Mitra" },
      {
        property: "og:description",
        content: "Open to analyst roles, collaborations and interesting data.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section spacing="md">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch."
        description="Best for analyst roles, collaboration ideas, feedback on a case study, or interesting datasets you'd like a second pair of eyes on."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="text-eyebrow">Channels</div>
          <div className="mt-4 space-y-3">
            {profile.socials.map((s) => (
              <SocialCard key={s.label} social={s} />
            ))}
          </div>

          <div className="mt-8 rounded-md border border-border bg-card p-5">
            <div className="text-eyebrow">Response time</div>
            <p className="mt-2 text-sm text-muted-foreground">
              I read every message and reply within a day or two. For role
              inquiries, email is the fastest path — please include a brief
              description of the team and the role.
            </p>
          </div>
        </div>

        <div>
          <div className="text-eyebrow">Or send a message</div>
          <ContactForm className="mt-4" />
        </div>
      </div>
    </Section>
  );
}
