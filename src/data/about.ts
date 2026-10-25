import type { AboutData } from "@/types";

export const about: AboutData = {
  introduction: [
    "I'm Suryamitra Velugula, a Mechanical Engineering undergraduate at NIT Andhra Pradesh pursuing a parallel Diploma in Data Science and Applications from IIT Madras.",
    "I have hands-on experience applying Python, SQL, and BI tools to real-world datasets through analytical and decision-support projects — translating complex data into structured schemas, DAX measures, and executive dashboards.",
    "Alongside core analytics, I actively explore modern AI-based approaches for information retrieval, retrieval-augmented generation (RAG), and agentic workflows.",
  ],

  technicalInterests: [
    "Star-schema dimensional data modeling with fact and dimension tables",
    "Advanced SQL analytics: CTEs, window functions, ranking, and business views",
    "Executive Power BI dashboards: KPI tracking, risk segmentation, and driver analysis",
    "Automating data preparation & exploratory analysis using Python (Pandas, NumPy)",
    "Exploring modern AI & RAG approaches to augment analytics and information retrieval",
  ],

  technicalPhilosophy: {
    headline:
      "Effective analytics connects dimensional data modeling with honest, decision-ready metrics.",
    points: [
      {
        title: "Clean & structured before clever",
        statement:
          "Most reporting failures trace back to data pipelines. I invest time in star-schema dimensional modeling and rigorous data validation so executive dashboards remain responsive and reliable.",
      },
      {
        title: "Actionable driver analysis",
        statement:
          "Rather than displaying raw metrics in isolation, dashboards should isolate key drivers — whether calculating loan default risk across credit tiers or uncovering attrition risk across employee segments.",
      },
      {
        title: "Decision-support focus",
        statement:
          "Every visual must serve a specific business question. If an executive or stakeholder cannot extract a clear decision within seconds, the visual must be refined.",
      },
    ],
  },

  experience: [
    {
      company: "CODTECH IT SOLUTIONS PVT. LTD",
      role: "Data Analytics Trainee",
      period: "Apr – Jun 2025",
      location: "Remote / India",
      bullets: [
        "Developed interactive business intelligence dashboards using Power BI to monitor KPIs and support decision-making.",
        "Automated Excel-based reporting workflows, reducing manual effort and improving operational efficiency.",
        "Conducted exploratory data analysis (EDA) and data validation to identify trends, anomalies, and actionable business insights.",
      ],
      skills: ["Power BI", "Excel", "EDA", "Data Validation", "Reporting Automation"],
    },
  ],

  education: [
    {
      institution: "National Institute of Technology Andhra Pradesh",
      degree: "B.Tech in Mechanical Engineering",
      period: "2023 – 2027",
      grade: "GPA: 8.25 / 10.00",
      skills: ["Engineering Analytics", "Modeling", "Analytical Problem Solving"],
    },
    {
      institution: "Indian Institute of Technology Madras",
      degree: "Diploma in Data Science and Applications",
      period: "2023 – 2027",
      grade: "GPA: 7.3 / 10.00",
      skills: ["Python", "SQL", "Machine Learning", "Data Structures", "Statistics"],
    },
  ],

  languages: [
    { language: "English", level: "Proficient" },
    { language: "Telugu", level: "Proficient" },
    { language: "Hindi", level: "Intermediate" },
  ],
};
