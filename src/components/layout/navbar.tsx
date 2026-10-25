import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Videos", to: "/videos" },
  { label: "Research", to: "/research" },
  { label: "About", to: "/about" },
  { label: "Résumé", to: "/resume" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/85 backdrop-blur"
          : "border-border/60 bg-background",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-serif text-lg leading-none tracking-tight">
            {profile.name}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:inline">
            {profile.role}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    activeProps={{ className: "bg-accent text-foreground" }}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
