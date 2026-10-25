
# AI/Data Portfolio — Build Plan

A modern, minimal portfolio for a student / aspiring AI & Data professional. Built on **TanStack Start + React + TypeScript + Tailwind + shadcn/ui + Framer Motion** (Next.js isn't supported in this environment; TanStack Start is the closest equivalent — SSR, file-based routing, API routes).

## Visual direction
- Professional, minimal, technical aesthetic — think research-lab / engineering-notebook vibe.
- Neutral base (near-black / off-white) + one restrained accent (cool cyan-blue) for AI/data feel.
- Generous whitespace, mono accents for code/numbers, subtle grid and dot motifs.
- Animations: tasteful fade/slide on scroll, no parallax circus. Reduced-motion respected.
- Full dark/light theme with system preference detection.

## Sections (per your selection)
1. **Hero** — name, role line ("AI & Data Science student"), short intent, primary CTA + GitHub/LinkedIn.
2. **About** — bio, focus areas (AI systems, ML, data analytics, data science), current learning.
3. **Projects** — card grid driven by `data/projects.ts`; tags (Python, PyTorch, SQL, etc.), links.
4. **Skills** — grouped (Languages / ML & AI / Data / Tools) as chip clusters.
5. **Certifications & Achievements** — timeline list (issuer, date, link).
6. **Writing / Blog** — list of educational technical posts from `data/posts.ts` (static for now; ready to swap to MDX or CMS later).
7. **Contact + Feedback form** — name / email / message, zod-validated client + server, posts to an API route.

## Folder structure (TanStack Start equivalent of your spec)

```text
src/
  routes/              # file-based routes (acts as /app)
    __root.tsx         # global layout (Navbar, Footer, ThemeProvider, SEO defaults)
    index.tsx          # home (assembles all sections)
    blog.tsx
    api/
      feedback.ts      # POST endpoint for feedback form
  components/
    ui/                # shadcn primitives
    sections/          # Hero, About, Projects, Skills, Certs, Writing, Contact
    layout/            # Navbar, Footer, Container, ThemeToggle
  lib/                 # utils, seo helpers, cn()
  hooks/               # useTheme, useMediaQuery, useInView wrappers
  types/               # Project, Post, Certification, Feedback
  data/                # projects.ts, skills.ts, certifications.ts, posts.ts, profile.ts
  services/            # feedbackService.ts (client-side fetch wrapper)
  styles/              # globals.css, tokens
public/                # favicon, og image, resume.pdf placeholder
```

Note: TanStack Start uses `src/routes/` rather than a top-level `/app` folder, but the separation (routes / components / lib / data / services / api) maps 1:1 to what you asked for.

## Core infrastructure
- **ThemeProvider** — class-based dark mode, persisted to localStorage, no-flash inline script.
- **Container** — responsive max-width wrapper (`max-w-6xl`, fluid padding).
- **Navbar** — sticky, blurred background, anchor links, theme toggle, mobile sheet menu.
- **Footer** — minimal: socials, copyright, built-with line.
- **SEO** — per-route `head()` with title/description/canonical/OG, JSON-LD `Person` schema on home, `sitemap.xml` + `robots.txt`.

## Feedback form (the one piece needing backend)
- Client: react-hook-form + zod schema (name ≤100, email valid ≤255, message ≤1000, trimmed).
- Server: `src/routes/api/feedback.ts` re-validates with the same zod schema, rate-limits by IP (in-memory), returns JSON.
- For now stores to console + returns success. **Optional:** enable Lovable Cloud later to persist into a `feedback` table with RLS — I'll flag this but not enable it unless you ask.

## Content strategy
All content lives in `src/data/*.ts` as typed arrays — you swap in real values after scaffolding. Each file ships with 1–2 illustrative placeholder entries so sections render immediately.

## Out of scope (for this pass)
- MDX blog rendering (posts are summary cards linking out; easy to upgrade).
- Auth, CMS, analytics.
- Lovable Cloud persistence for feedback (can add on request).

## Deliverable
A running portfolio at the preview URL with all sections, responsive layout, working theme toggle, animated section reveals, and a functional feedback endpoint — ready for you to drop in real content.
