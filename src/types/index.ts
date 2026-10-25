export type ProjectCategory =
  | "ai-ml"
  | "data"
  | "backend"
  | "frontend"
  | "research";

export type ProjectLink = { label: string; href: string };

export type ProjectImage = { src: string; alt: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  year: number;
  status?: "shipped" | "in-progress" | "research";
  category: ProjectCategory;
  featured?: boolean;
  links?: ProjectLink[];
  metrics?: { label: string; value: string }[];

  /* Case-study fields */
  client?: string;             // stakeholder / context
  role?: string;               // your role
  timeframe?: string;
  businessProblem?: string;
  dataset?: string;
  analysis?: string;
  keyInsights?: string[];
  dashboard?: string;
  recommendations?: string[];
  technologies?: string[];

  githubUrl?: string;
  liveDemoUrl?: string;
  cover?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type SocialIcon =
  | "github"
  | "linkedin"
  | "mail"
  | "kaggle"
  | "twitter"
  | "youtube";

export type Social = {
  label: string;
  href: string;
  handle?: string;
  icon?: SocialIcon;
};

export type Profile = {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  bio: string;
  focus: string[];
  socials: Social[];
};

export type Feedback = {
  name: string;
  email: string;
  message: string;
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  skills?: string[];
};

export type PhilosophyPoint = { title: string; statement: string };

export type AboutData = {
  introduction: string[];
  technicalInterests: string[];
  technicalPhilosophy: {
    headline: string;
    points: PhilosophyPoint[];
  };
  education: Education[];
};

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  youtubeId?: string;
  publishedAt?: string;
  duration?: string;
};

export type ResearchNote = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  href?: string;
};
