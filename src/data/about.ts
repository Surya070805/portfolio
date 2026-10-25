import type { AboutData } from "@/types";

export const about: AboutData = {
  introduction: [
    "I'm Surya Mitra, a data science student focused on building a career as a data analyst. I enjoy the part of the job most people skip — wrestling messy data into something a stakeholder can actually act on.",
    "Day to day, I work in Excel, SQL, Python, and Power BI. I've built dashboards on restaurant, sales, and HR data, and I'm extending into forecasting and NLP through self-directed projects.",
    "Alongside analytics, I'm actively learning about AI, RAG, and LLMs. I treat them as the next layer on top of strong analytical foundations, not a replacement for them.",
  ],

  technicalInterests: [
    "Turning raw data into clear, decision-ready dashboards",
    "SQL modeling and writing queries that scale",
    "Storytelling with data — making the chart match the question",
    "Honest metrics: definitions, baselines, and avoiding misleading visuals",
    "Exploring how LLMs and RAG can augment analyst workflows",
  ],

  technicalPhilosophy: {
    headline:
      "Good analysis is built on three things: clean data, honest metrics, and a clear story.",
    points: [
      {
        title: "Clean before clever",
        statement:
          "Most dashboard problems are data problems in disguise. I spend the time in Power Query and SQL up front so the visuals can stay simple.",
      },
      {
        title: "Honest over impressive",
        statement:
          "I'd rather show a baseline-aware chart with a small effect than a flashy visual that overstates the signal. Definitions and baselines come first.",
      },
      {
        title: "One question per view",
        statement:
          "Every page of a dashboard should answer one clear question. If a stakeholder has to hunt, the design has failed.",
      },
    ],
  },

  education: [
    {
      institution: "National Institute of Technology, Andhra Pradesh",
      degree: "Bachelor of Technology (B.Tech), Mechanical Engineering",
      period: "Aug 2023 — May 2027",
      grade: "8.25 CGPA",
      skills: ["Research Skills", "Academic Writing"],
    },
    {
      institution: "Indian Institute of Technology, Madras",
      degree: "Diploma, Data Science and Programming",
      period: "Jun 2023 — Aug 2026",
      grade: "7.3 CGPA",
      skills: ["Python", "SQL", "Statistics"],
    },
    {
      institution: "FIITJEE",
      degree: "Class 11 – 12",
      period: "Apr 2021 — Jul 2023",
      grade: "8.9",
      skills: ["Mathematics", "Physics", "Chemistry"],
    },
    {
      institution: "Kakatiya Public School",
      degree: "Class 4 – 10",
      period: "Jun 2014 — Mar 2021",
    },
  ],
};
