export type VideoSeries = {
  id: string;
  title: string;
  description: string;
  /** Optional custom cover image URL. If omitted, the first episode's YouTube thumbnail is used. */
  cover?: string;
};

export type VideoEpisode = {
  id: string;
  seriesId: string;
  episodeNumber: number;
  title: string;
  description: string;
  /** YouTube video ID (the part after v= or youtu.be/) */
  youtubeId: string;
  /** Full YouTube URL — used for the "Watch on YouTube" button */
  youtubeUrl: string;
  /** e.g. "5:42" */
  duration?: string;
  tags: string[];
  /** e.g. "Mar 2026" */
  publishedAt?: string;
  /** Slug of the related project — used to link back to the case study */
  relatedProjectSlug?: string;
  /** Optional custom thumbnail override (otherwise YouTube's is used) */
  thumbnail?: string;
};

/**
 * Knowledge Hub series. Add new series here; episodes live in `videoEpisodes` below.
 */
export const videoSeries: VideoSeries[] = [
  {
    id: "data-flow",
    title: "Data Flow Inside Companies",
    description:
      "A video series explaining how data is generated, collected, transformed, stored, modeled, and used by different departments inside modern organizations.",
  },
  {
    id: "project-walkthroughs",
    title: "Project Walkthroughs",
    description:
      "Presentation videos explaining the business problem, analytical thinking, implementation, insights, and recommendations behind each portfolio project.",
  },
];

/**
 * Knowledge Hub episodes. Add episodes here — the UI updates automatically.
 * Leave this array empty until real YouTube links are ready.
 */
export const videoEpisodes: VideoEpisode[] = [
  {
    id: "finance-walkthrough-01",
    seriesId: "project-walkthroughs",
    episodeNumber: 1,
    title: "Risk Dashboard for Sustainable Loan Growth",
    description:
      "Deep-dive into the LendingClub credit risk dashboard — analyzing borrower grade migration, default probability clustering, and underwriting policies to protect net interest margin.",
    youtubeId: "LDOVYYg3dyE",
    youtubeUrl: "https://youtu.be/LDOVYYg3dyE?si=CUYrp58FI6eOPeYA",
    duration: "6 min",
    tags: ["Finance", "Power BI", "Risk Modeling", "Credit Analytics"],
    relatedProjectSlug: "finance-dashboard",
  },
  {
    id: "finance-walkthrough-02",
    seriesId: "project-walkthroughs",
    episodeNumber: 2,
    title: "LendingClub Case Study (2007 to 2026)",
    description:
      "19-year retrospective on macroeconomic loan cycles, debt-to-income thresholds, and capital allocation strategies for sustainable credit expansion.",
    youtubeId: "3vcUzCdIlxI",
    youtubeUrl: "https://youtu.be/3vcUzCdIlxI?si=Pspa4YjCMjwg4WfK",
    duration: "4 min",
    tags: ["LendingClub", "Case Study", "Executive BI", "Portfolio Strategy"],
    relatedProjectSlug: "finance-dashboard",
  },
  {
    id: "data-flow-01",
    seriesId: "data-flow",
    episodeNumber: 1,
    title: "Data Generation and Event Tracking",
    description:
      "How businesses generate data from user interactions, transactions, and system events — and why event tracking is the foundation of analytics.",
    youtubeId: "QrERq3QzIBs",
    youtubeUrl: "https://www.youtube.com/watch?v=QrERq3QzIBs",
    duration: "5:42",
    tags: ["Business Analytics", "Event Tracking"],
  },
  {
    id: "data-flow-02",
    seriesId: "data-flow",
    episodeNumber: 2,
    title: "Tracking SDKs and Event Collection",
    description:
      "A look at the tools and SDKs used to collect events — from web and mobile analytics to customer data platforms.",
    youtubeId: "4ajV6r4OEM4",
    youtubeUrl: "https://www.youtube.com/watch?v=4ajV6r4OEM4",
    duration: "6:18",
    tags: ["Firebase", "Segment", "Analytics"],
  },
];

/* ---------- helpers ---------- */

export function getSeries(id: string): VideoSeries | undefined {
  return videoSeries.find((s) => s.id === id);
}

export function getEpisodesForSeries(seriesId: string): VideoEpisode[] {
  return videoEpisodes
    .filter((e) => e.seriesId === seriesId)
    .sort((a, b) => a.episodeNumber - b.episodeNumber);
}

export function getEpisodesForProject(projectSlug: string): VideoEpisode[] {
  return videoEpisodes.filter((e) => e.relatedProjectSlug === projectSlug);
}

export function youtubeThumb(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeEmbed(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;
}

export function seriesCover(series: VideoSeries): string | undefined {
  if (series.cover) return series.cover;
  const first = getEpisodesForSeries(series.id)[0];
  return first ? first.thumbnail ?? youtubeThumb(first.youtubeId) : undefined;
}
