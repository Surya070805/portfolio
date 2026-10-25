import { Link } from "@tanstack/react-router";
import { Container } from "./container";
import { profile } from "@/data/profile";

const NAV = [
  { label: "Projects", to: "/projects" as const },
  { label: "Videos", to: "/videos" as const },
  { label: "Research", to: "/research" as const },
  { label: "About", to: "/about" as const },
  { label: "Résumé", to: "/resume" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="font-serif text-xl">{profile.name}</div>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {profile.bio}
          </p>
        </div>

        <div>
          <div className="text-eyebrow">Sitemap</div>
          <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-muted-foreground hover:text-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-eyebrow">Connect</div>
          <ul className="mt-3 space-y-2 text-sm">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {s.label}
                  {s.handle ? (
                    <span className="ml-2 font-mono text-xs text-muted-foreground/70">
                      {s.handle}
                    </span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-start justify-between gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span className="font-mono">
            © {new Date().getFullYear()} {profile.name}. Built with data, in India.
          </span>
          <span className="font-mono uppercase tracking-[0.22em]">
            v1 · {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </span>
        </Container>
      </div>
    </footer>
  );
}
