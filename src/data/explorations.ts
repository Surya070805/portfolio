export type ExplorationItem = {
  title: string;
  summary?: string;
  meta?: string;
  tags?: string[];
  href?: string;
};

export type ExplorationSection = {
  id: string;
  label: string;
  blurb: string;
  items: ExplorationItem[];
};

const GH = "https://github.com/Surya070805";

export const explorations: ExplorationSection[] = [
  {
    id: "side-projects",
    label: "Side projects",
    blurb:
      "Small end-to-end builds outside the main case-study track — usually one-week sprints to test an idea.",
    items: [
      {
        title: "Placement portal",
        summary:
          "A lightweight portal to manage student placement drives — job postings, applicant tracking, and role-based access for placement cells and students.",
        meta: "Full-stack · In progress",
        tags: ["Auth", "CRUD", "Dashboards"],
      },
      {
        title: "YoY construction cost estimation portal",
        summary:
          "Estimates year-over-year construction costs from material and labour indices — inputs quantities, outputs a phased cost forecast with sensitivity to inflation.",
        meta: "Analytics tool · Prototype",
        tags: ["Forecasting", "Cost modeling", "Civil"],
      },
    ],
  },
  {
    id: "experiments",
    label: "Experiments",
    blurb:
      "Deployment and infrastructure notes — trying to make ML and web artifacts actually reachable, not just runnable locally.",
    items: [
      {
        title: "Model deployments on Hugging Face Spaces",
        summary:
          "Packaging small ML demos as Gradio / Streamlit Spaces — model weights, requirements pinning, cold-start behaviour and quota trade-offs.",
        meta: "Deployment note",
        tags: ["Hugging Face", "Gradio", "MLOps"],
      },
      {
        title: "Containerising apps with Docker",
        summary:
          "Multi-stage Dockerfiles for Python + FastAPI and Node apps — image-size discipline, .dockerignore hygiene, and reproducible local runs.",
        meta: "Infra note",
        tags: ["Docker", "FastAPI", "Reproducibility"],
      },
      {
        title: "Deploying to Vercel",
        summary:
          "Shipping front-ends and serverless endpoints on Vercel — build settings, environment variables, edge vs node runtimes, and where the free tier bites.",
        meta: "Deployment note",
        tags: ["Vercel", "Serverless", "CI/CD"],
      },
    ],
  },
  {
    id: "papers",
    label: "Suggested research papers",
    blurb:
      "Papers I keep returning to — foundational reads for anyone moving from analytics into ML and AI systems.",
    items: [
      {
        title: "Attention Is All You Need",
        summary:
          "Vaswani et al., 2017. The transformer paper — required reading before any modern NLP or LLM work.",
        href: "https://arxiv.org/abs/1706.03762",
        tags: ["Transformers", "NLP"],
      },
      {
        title: "BERT: Pre-training of Deep Bidirectional Transformers",
        summary:
          "Devlin et al., 2018. Set the template for pretrain-then-finetune that still dominates production NLP.",
        href: "https://arxiv.org/abs/1810.04805",
        tags: ["NLP", "Pretraining"],
      },
      {
        title: "XGBoost: A Scalable Tree Boosting System",
        summary:
          "Chen & Guestrin, 2016. Still the workhorse for tabular problems — worth reading beyond the API.",
        href: "https://arxiv.org/abs/1603.02754",
        tags: ["Gradient boosting", "Tabular"],
      },
      {
        title: "A Few Useful Things to Know About Machine Learning",
        summary:
          "Pedro Domingos. Short, opinionated, and correct about most of the traps beginners fall into.",
        href: "https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf",
        tags: ["Methodology"],
      },
    ],
  },
  {
    id: "channels",
    label: "Suggested YouTube channels",
    blurb:
      "Channels that shaped how I think about analytics, ML and building software — recommended in roughly this order.",
    items: [
      {
        title: "StatQuest with Josh Starmer",
        summary:
          "The clearest visual explanations of statistics and ML fundamentals on the internet.",
        href: "https://www.youtube.com/@statquest",
        tags: ["Statistics", "ML"],
      },
      {
        title: "3Blue1Brown",
        summary:
          "Grant Sanderson's math visualisations — linear algebra, calculus, and neural networks made intuitive.",
        href: "https://www.youtube.com/@3blue1brown",
        tags: ["Math", "Intuition"],
      },
      {
        title: "Codebasics",
        summary:
          "End-to-end analytics and data-science project walkthroughs in Python, SQL and Power BI.",
        href: "https://www.youtube.com/@codebasics",
        tags: ["Analytics", "Projects"],
      },
      {
        title: "Andrej Karpathy",
        summary:
          "Neural networks from scratch — the deepest hands-on intro to how modern models actually work.",
        href: "https://www.youtube.com/@AndrejKarpathy",
        tags: ["Deep learning", "LLMs"],
      },
    ],
  },
  {
    id: "notes",
    label: "Notes",
    blurb:
      "Short working notes and methodology write-ups — closer to a lab notebook than a blog.",
    items: [
      {
        title: "Hugging Face Hub — what's actually trending",
        summary:
          "EDA on 30k+ Hugging Face models. Log-scale popularity, tag co-occurrence, and why median downloads beat mean for any honest read.",
        meta: "Jul 2025",
        tags: ["EDA", "Open-source ML"],
        href: `${GH}/Hugging_Face_data_analysis`,
      },
      {
        title: "Gender bias in promotion & hiring — a disaggregated read",
        summary:
          "Why aggregate gender gaps can be misleading. Chi-square, two-proportion z-tests, and a Simpson's-paradox check on a real employee dataset.",
        meta: "Aug 2025",
        tags: ["Fairness", "Statistics"],
        href: `${GH}/Gender_Bias_In_Promo_Hire`,
      },
      {
        title: "Always beat the seasonal-naive baseline",
        summary:
          "Notes from the Cinema Audience Forecasting challenge — why most of the variance was already explained before gradient boosting entered the picture.",
        meta: "Nov 2025",
        tags: ["Forecasting", "Methodology"],
        href: GH,
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture sketches",
    blurb:
      "Diagrams and design notes for systems I'm thinking through — usually before any code exists.",
    items: [
      {
        title: "Analytics pipeline reference",
        summary:
          "Source → ingestion → warehouse → semantic layer → BI. Where dbt sits, where quality checks live, and where most teams skip a layer.",
        meta: "Sketch",
        tags: ["Data engineering", "dbt", "Warehouse"],
      },
      {
        title: "RAG service, minimal viable shape",
        summary:
          "Chunker, embedder, vector store, retriever, reranker, LLM — and the two places latency and cost actually go.",
        meta: "Sketch",
        tags: ["RAG", "LLM", "Retrieval"],
      },
      {
        title: "Feedback loop for a forecasting model",
        summary:
          "How predictions, actuals and overrides flow back into a training set without leaking future information.",
        meta: "Sketch",
        tags: ["Forecasting", "MLOps"],
      },
    ],
  },
];
