import { ArrowUpRight, Github, Linkedin, Mail, Trophy, Twitter, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedCard } from "./animated-card";
import type { Social } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  kaggle: Trophy,
  twitter: Twitter,
  youtube: Youtube,
};

type Props = { social: Social };

export function SocialCard({ social: s }: Props) {
  const Icon = s.icon ? iconMap[s.icon] : undefined;
  return (
    <AnimatedCard padding="md">
      <a
        href={s.href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          {Icon ? (
            <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}
          <div>
            <div className="text-sm font-medium">{s.label}</div>
            {s.handle ? (
              <div className="font-mono text-xs text-muted-foreground">{s.handle}</div>
            ) : null}
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </a>
    </AnimatedCard>
  );
}
