import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

type Props = {
  to: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: string;
};

/**
 * Narrative "Next →" footer used at the end of each page to guide the
 * reader through the site in order: Home → Projects → Videos → Research
 * → About → Résumé → Contact.
 */
export function NextLink({
  to,
  eyebrow = "Next",
  title,
  description,
  cta = "Continue",
}: Props) {
  return (
    <div className="mt-20 border-t-2 border-foreground pt-8">
      <Link
        to={to}
        className="group grid items-end gap-6 sm:grid-cols-[1fr_auto]"
      >
        <div>
          <div className="text-eyebrow">{eyebrow}</div>
          <h3 className="mt-2 font-serif text-2xl leading-tight transition-colors group-hover:text-primary sm:text-3xl">
            {title}
          </h3>
          {description ? (
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <span className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}
