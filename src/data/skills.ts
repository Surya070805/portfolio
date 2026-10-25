import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Programming & Databases",
    items: ["Python", "SQL", "Microsoft SQL Server", "SQLite"],
  },
  {
    label: "Data Analytics & Statistics",
    items: ["Pandas", "NumPy", "EDA", "Data Cleaning", "Hypothesis Testing"],
  },
  {
    label: "Business Intelligence",
    items: ["Power BI", "Excel", "Power Query", "DAX", "Star Schema Modeling"],
  },
  {
    label: "Machine Learning",
    items: ["Scikit-learn", "Supervised Learning", "Feature Engineering", "Model Evaluation"],
  },
  {
    label: "Generative AI & LLMs",
    items: ["LLMs", "Prompt Engineering", "Embeddings", "RAG"],
  },
  {
    label: "Developer Tools & Platforms",
    items: ["Jupyter Notebook", "Google Colab", "Git", "GitHub", "Hugging Face"],
  },
];
