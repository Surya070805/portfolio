import type { Project, ProjectCategory } from "@/types";
import type { ResearchNote, VideoItem } from "@/types";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "data", label: "Dashboards" },
  { id: "backend", label: "SQL & Analytics" },
  { id: "ai-ml", label: "ML / Forecasting" },
  { id: "research", label: "Exploration" },
];

const GH = "https://github.com/Surya070805";

export const projects: Project[] = [
  {
    slug: "zomato-bangalore-dashboard",
    title: "Bangalore Restaurants: Cuisine, Cost & Ratings",
    summary:
      "Power BI study of 50,000+ Bangalore restaurants — what drives ratings, where premium and value markets sit, and which cuisines win by locality.",
    tags: ["Power BI", "Power Query", "DAX", "Data cleaning"],
    year: 2025,
    status: "shipped",
    category: "data",
    featured: true,
    client: "Self-initiated · framed for a hypothetical food-tech analytics team",
    role: "Sole analyst — modeling, BI, narrative",
    timeframe: "Mar – Jun 2025",
    metrics: [
      { label: "Restaurants", value: "50,000+" },
      { label: "Localities", value: "90+" },
      { label: "Visuals", value: "12" },
      { label: "Stack", value: "Power BI" },
    ],
    businessProblem:
      "Diners and small operators in Bangalore lacked a single view of how cuisine, price and locality relate to ratings and order volume. The raw Zomato dataset was messy — inconsistent cost values, duplicates, and free-text cuisine lists that resisted aggregation. The brief: turn it into a dashboard a non-analyst can actually act on.",
    dataset:
      "Public Zomato Bangalore dataset (~51k rows) covering name, locality, cuisine, average cost for two, online ordering, votes and aggregate rating. Cleaned in Power Query: trimmed currency symbols, normalised cost types, dropped duplicate URLs, and unpivoted the comma-separated cuisine column so each restaurant–cuisine pair becomes one row.",
    analysis:
      "Built a small star schema (Restaurant fact + Locality, Cuisine, Cost-tier dimensions). DAX measures cover average rating, vote-weighted rating, cost-tier mix, and locality-level cuisine share. Used a vote threshold (≥50) for any ranking visual to avoid noisy long-tail restaurants distorting the story.",
    keyInsights: [
      "North Indian dominates supply, but South Indian and Cafés over-index on rating once vote count is controlled for.",
      "Premium-cost (₹1,500+) restaurants cluster in Indiranagar, Koramangala and Lavelle Road — but ratings flatten above ₹2,000, suggesting diminishing returns on price.",
      "Online-ordering availability correlates with +0.3 average rating across mid-tier restaurants, holding cuisine constant.",
    ],
    dashboard:
      "Three pages: an Executive Overview (KPIs, rating distribution, top localities), a Cuisine Explorer (slicer-driven comparison across cost tiers), and a Locality Deep-Dive (map-style matrix with drill-through to individual restaurants).",
    recommendations: [
      "For operators in saturated localities (Koramangala 5th Block, BTM), differentiate on cuisine niche rather than price — rating ceiling at the top tier is already low.",
      "For new entrants, target mid-cost (₹500–1,000) South Indian / Café formats in growing localities like Whitefield and Bellandur, where rating headroom is highest.",
      "Make online ordering table-stakes — its uplift on perceived quality is consistent across cuisines.",
    ],
    technologies: ["Power BI", "Power Query (M)", "DAX", "Star-schema modeling", "Excel"],
    links: [{ label: "Repository", href: `${GH}/Zomato_Restaurent_Dashboard` }],
    githubUrl: `${GH}/Zomato_Restaurent_Dashboard`,
  },
  {
    slug: "atliq-sales-insights",
    title: "AtliQ Hardware: Sales Insights for a Multi-Market Reseller",
    summary:
      "End-to-end MySQL → Power BI pipeline for a hardware reseller operating across 8 Indian markets — revenue, top customers, and YoY market health on one dashboard.",
    tags: ["SQL", "MySQL", "Power BI", "ETL"],
    year: 2025,
    status: "shipped",
    category: "backend",
    featured: true,
    client: "AtliQ Technologies case study (Codebasics) — hardware reseller across Indian markets",
    role: "Analyst — SQL exploration, modeling, BI build",
    timeframe: "Apr 2025",
    metrics: [
      { label: "Markets", value: "8" },
      { label: "Years of data", value: "4" },
      { label: "Customers", value: "27" },
      { label: "Tables joined", value: "5" },
    ],
    businessProblem:
      "Sales leadership at a multi-market hardware reseller needed visibility into revenue trends, top-performing customers and market-level health — but data lived across MySQL tables with no unified reporting layer. Test transactions and dual-currency reporting (INR / USD) were silently distorting early reports.",
    dataset:
      "Five MySQL tables: sales_transactions (~150k rows), customers, products, markets and date dim. Four years of monthly data across 8 markets. Mixed currencies; some negative quantities representing returns.",
    analysis:
      "Wrote validation SQL first — row counts per market and year, currency distribution, top-N customers — before opening Power BI. Excluded a small set of test transactions (customer code = '+91') and normalised USD revenue to INR using a constant rate. Built a dimensional model in Power BI with a calendar dim, then DAX measures for net revenue, sales quantity, YoY growth and customer concentration.",
    keyInsights: [
      "Top 5 customers contribute ~70% of revenue — a concentration risk leadership had under-estimated.",
      "Delhi NCR and Mumbai together account for nearly half of net sales, while Kanpur and Bhubaneswar are growing fastest YoY off a small base.",
      "FY2020 revenue showed a steep dip explained almost entirely by COVID-period order volume, not lost customers — retention stayed flat.",
    ],
    dashboard:
      "Single-page executive dashboard with revenue trend, market-share treemap, top-customer leaderboard and a YoY-growth heatmap. Slicers for market, year and customer let leadership self-serve drill-downs.",
    recommendations: [
      "Diversify the customer base — set a target of bringing top-5 concentration below 55% over the next four quarters.",
      "Invest sales resource in Kanpur and Bhubaneswar where growth rates justify it; defend share in Delhi NCR.",
      "Add a profit and margin layer once cost data is available — revenue rankings can mask unprofitable accounts.",
    ],
    technologies: ["SQL", "MySQL", "Power BI", "DAX", "Power Query", "Excel"],
    links: [{ label: "Repository", href: `${GH}/AtliQ-DashBoard` }],
    githubUrl: `${GH}/AtliQ-DashBoard`,
  },
  {
    slug: "hr-analytics-dashboard",
    title: "HR Analytics: Attrition, Tenure & Workforce Mix",
    summary:
      "People-analytics dashboard that surfaces who is leaving, from where, and at what tenure — built to make HR conversations data-grounded rather than anecdotal.",
    tags: ["Python", "Power BI", "HR Analytics"],
    year: 2025,
    status: "shipped",
    category: "data",
    client: "Self-initiated · public HR dataset",
    role: "Analyst — cleaning, modeling, dashboard",
    timeframe: "May 2025",
    metrics: [
      { label: "KPIs", value: "10+" },
      { label: "Departments", value: "9" },
      { label: "Employees", value: "1,470" },
      { label: "Cohorts", value: "Tenure-based" },
    ],
    businessProblem:
      "HR teams often rely on gut-feel narratives around attrition. The brief: a clean dashboard that surfaces who is leaving, from where, and at what tenure — without overstating causation from correlated signals.",
    dataset:
      "Public IBM HR Analytics dataset — 1,470 employees, 35 fields covering demographics, role, department, tenure, satisfaction scores and attrition flag.",
    analysis:
      "Cleaned in Python (pandas): cast types, handled coded categoricals, and built tenure cohorts (0–1y, 1–3y, 3–5y, 5y+). Loaded into Power BI as a small employee fact with department/role dims. DAX measures for headcount, attrition rate (with consistent denominators across slicers), and cohort-level attrition.",
    keyInsights: [
      "Attrition is concentrated in the 0–1 year cohort at 35% — more than 3× the average for tenured employees.",
      "Sales department shows the highest attrition rate (21%), driven primarily by Sales Representatives with low job satisfaction scores.",
      "Overtime is the single strongest correlate of leaving — employees flagged as 'OverTime = Yes' leave at 30%+ vs 10% otherwise, holding role constant.",
    ],
    dashboard:
      "Two pages: an HR Overview (headcount, attrition by department and role, satisfaction distribution) and a Cohort View (attrition by tenure band, with drill-through to filtered employee list).",
    recommendations: [
      "Prioritise onboarding and 90-day check-ins — most attrition risk is concentrated in year one.",
      "Audit overtime allocation in Sales and R&D before launching broader retention programs.",
      "Add a simple attrition-risk classifier on top of this model as a v2.",
    ],
    technologies: ["Python", "pandas", "Power BI", "DAX", "Power Query"],
    links: [{ label: "Repository", href: `${GH}/HR-Dashboard` }],
    githubUrl: `${GH}/HR-Dashboard`,
  },
  {
    slug: "cinema-audience-forecasting",
    title: "Cinema Audience Forecasting (Kaggle)",
    summary:
      "Daily theatre audience forecasts across multiple cinemas — feature-engineered gradient-boosted models with time-aware validation. Ranked 1,496 / 2,632 teams.",
    tags: ["Python", "LightGBM", "XGBoost", "Time series"],
    year: 2025,
    status: "shipped",
    category: "ai-ml",
    featured: true,
    client: "Kaggle community competition",
    role: "Solo participant — pipeline, modeling, evaluation",
    timeframe: "Sep – Nov 2025",
    metrics: [
      { label: "Kaggle rank", value: "1,496 / 2,632" },
      { label: "Models compared", value: "4" },
      { label: "Horizon", value: "Daily" },
      { label: "CV", value: "Time-aware" },
    ],
    businessProblem:
      "Cinema operators need realistic audience forecasts to plan staffing, screenings and promotions. The Kaggle brief: predict daily audience counts across multiple locations from a noisy daily series with strong weekly seasonality and holiday spikes.",
    dataset:
      "Multi-location daily audience series provided by the competition, with calendar metadata. Strong weekday seasonality (weekend lift of ~40%) and event-driven spikes around holidays and releases.",
    analysis:
      "Engineered a feature matrix in pandas — calendar features (day-of-week, month, is_holiday), lag values (1, 7, 14, 28), rolling means (7d, 28d) and per-location categorical encodings. Trained and compared a seasonal-naive baseline, scikit-learn linear models, LightGBM and XGBoost using an expanding time-series split that respected the forecast horizon. Tuned LightGBM on validation RMSE.",
    keyInsights: [
      "A vanilla seasonal-naive baseline already explained most of the variance — fancy models added <8% RMSE improvement on top.",
      "Calendar and lag features dominated importance plots; per-location ID alone added little signal.",
      "Holiday spikes were the largest source of residual error — without an external event feed, gradient boosting could only smooth them, not predict them.",
    ],
    dashboard:
      "Evaluation notebook with per-location forecast plots, residual diagnostics by day-of-week, and a feature-importance summary for the final LightGBM model.",
    recommendations: [
      "Add external signals (weather, local event calendars, school holidays) — most remaining error is event-driven.",
      "Wrap the final model in a small Streamlit app so non-technical operators can interact with forecasts.",
      "Always benchmark forecasting work against a seasonal-naive baseline before investing in tuning.",
    ],
    technologies: ["Python", "pandas", "NumPy", "scikit-learn", "LightGBM", "XGBoost"],
    links: [{ label: "GitHub", href: GH }],
    githubUrl: GH,
  },
  {
    slug: "comment-category-prediction",
    title: "Comment Category Prediction (Kaggle)",
    summary:
      "Text classification of user comments using TF-IDF and linear models. Ranked 282 / 2,744 teams on the Kaggle Comment Category Prediction Challenge.",
    tags: ["Python", "scikit-learn", "TF-IDF", "NLP"],
    year: 2026,
    status: "shipped",
    category: "ai-ml",
    featured: true,
    client: "Kaggle community competition",
    role: "Solo participant — preprocessing, modeling, evaluation",
    timeframe: "Feb – Apr 2026",
    metrics: [
      { label: "Kaggle rank", value: "282 / 2,744" },
      { label: "Approach", value: "TF-IDF + linear" },
      { label: "Classes", value: "Multi-class" },
      { label: "Metric", value: "Macro F1" },
    ],
    businessProblem:
      "Manually triaging large volumes of user comments doesn't scale. The Kaggle brief: predict the category assigned to each comment with a lightweight, explainable model rather than reaching straight for a transformer.",
    dataset:
      "Competition-provided multi-class comment dataset — short user-generated text with imbalanced category distribution and some multilingual noise.",
    analysis:
      "Preprocessing pipeline: lowercase, strip noise, lemmatize. Vectorised with TF-IDF (uni- and bi-grams, sub-linear TF scaling). Compared logistic regression, linear SVM and a calibrated SGD classifier under a stratified 5-fold CV. Tuned class weights to handle imbalance and evaluated on macro F1, not raw accuracy.",
    keyInsights: [
      "TF-IDF + linear SVM landed within ~2 macro-F1 points of much heavier transformer baselines posted publicly.",
      "Per-class metrics exposed a small set of rare categories where overall accuracy was hiding very weak recall.",
      "Class weighting helped tail classes more than oversampling did, with no measurable hit to head classes.",
    ],
    dashboard:
      "Evaluation notebook with confusion matrix, per-class precision/recall/F1, and an inspection view that surfaces the top-weight n-grams driving each prediction.",
    recommendations: [
      "Benchmark a sentence-embedding + linear head before jumping to a fine-tuned transformer — the marginal gain may not justify the cost.",
      "For rare categories, layer a retrieval / RAG component over the classifier rather than trying to learn them end-to-end.",
      "Always report per-class metrics on imbalanced classification — overall accuracy is misleading.",
    ],
    technologies: ["Python", "pandas", "scikit-learn", "TF-IDF", "NLTK"],
    links: [{ label: "GitHub", href: GH }],
    githubUrl: GH,
  },
  {
    slug: "huggingface-data-analysis",
    title: "Hugging Face Hub: What's Actually Trending?",
    summary:
      "EDA on Hugging Face model metadata — profiling downloads, tags and task categories to understand the open-source ML ecosystem beyond hype cycles.",
    tags: ["Python", "pandas", "EDA"],
    year: 2025,
    status: "shipped",
    category: "research",
    client: "Self-initiated EDA notebook",
    role: "Analyst — collection, cleaning, visualisation",
    timeframe: "Jul 2025",
    metrics: [
      { label: "Models analysed", value: "30k+" },
      { label: "Format", value: "Jupyter notebook" },
      { label: "Focus", value: "Tags, downloads" },
      { label: "Scope", value: "Snapshot" },
    ],
    businessProblem:
      "The Hugging Face Hub has tens of thousands of models — but which categories actually grow, and which tag clusters tend to appear together? The goal was a clean EDA, not a vibes-based take.",
    dataset:
      "Hugging Face Hub model metadata snapshot: model ID, downloads, likes, pipeline tag, library and free-text tags. Long-tailed distributions on every numeric field.",
    analysis:
      "Normalised tagging conventions in pandas, grouped models by pipeline tag and library, and switched popularity charts to log scale to keep tail-heavy distributions readable. Built a tag co-occurrence matrix to surface clusters (e.g. text-generation + chat + transformers).",
    keyInsights: [
      "Text-generation models dominate the long tail of low-download uploads, but vision and audio categories have higher median downloads per model.",
      "A small number of foundation models account for the vast majority of total downloads — the distribution is closer to power-law than normal.",
      "Tag clusters reveal coherent communities (NLP, vision, audio) with very limited cross-pollination at the tag level.",
    ],
    dashboard:
      "Jupyter notebook with annotated visuals — log-scale download histograms, top-N leaderboards by category, and a tag co-occurrence heatmap.",
    recommendations: [
      "When reporting on open-source ML adoption, lead with median (not mean) downloads to avoid foundation-model skew.",
      "Re-run quarterly to track category-level momentum over time.",
    ],
    technologies: ["Python", "pandas", "NumPy", "matplotlib", "seaborn", "Jupyter"],
    links: [{ label: "Repository", href: `${GH}/Hugging_Face_data_analysis` }],
    githubUrl: `${GH}/Hugging_Face_data_analysis`,
  },
  {
    slug: "gender-bias-promo-hire",
    title: "Gender Bias in Promotion & Hiring",
    summary:
      "Statistical analysis of gender disparities in promotion and hiring — quantifying gaps, testing significance, and avoiding Simpson's-paradox traps.",
    tags: ["Python", "Statistics", "Fairness"],
    year: 2025,
    status: "shipped",
    category: "research",
    client: "Self-initiated research notebook",
    role: "Analyst — data prep, statistical testing, write-up",
    timeframe: "Aug 2025",
    metrics: [
      { label: "Method", value: "Chi-square + proportion" },
      { label: "Format", value: "Jupyter notebook" },
      { label: "Cuts", value: "Role · Tenure" },
      { label: "Sample", value: "Employee dataset" },
    ],
    businessProblem:
      "Anecdotes about hiring and promotion bias are everywhere — but how big are the gaps in actual data, and are they statistically significant after controlling for role and tenure?",
    dataset:
      "Public employee dataset with gender, role, tenure, hire and promotion flags. Cleaned in pandas; rows with missing tenure or role excluded.",
    analysis:
      "Computed promotion and hiring rates by gender, then disaggregated by role and tenure to test for Simpson's paradox. Applied chi-square tests on contingency tables and two-proportion z-tests on rate differences, reporting effect sizes alongside p-values.",
    keyInsights: [
      "Aggregate promotion-rate gap was small and not significant — but disaggregating by role revealed a meaningful gap in two specific senior roles.",
      "Hiring rates by gender showed no statistically significant difference once tenure and role were controlled for.",
      "P-values alone are a poor lens for a fairness study — effect size and disaggregation tell a much sharper story.",
    ],
    dashboard:
      "Notebook with paired bar charts (gender × role), contingency tables, and a small narrative tying statistical results back to limitations of the data.",
    recommendations: [
      "Always disaggregate fairness analyses by role and tenure — aggregate views routinely mask the real signal.",
      "Extend with a logistic regression controlling for tenure and role for a more defensible v2.",
      "Treat statistical significance and policy significance as separate questions.",
    ],
    technologies: ["Python", "pandas", "scipy.stats", "Jupyter"],
    links: [{ label: "Repository", href: `${GH}/Gender_Bias_In_Promo_Hire` }],
    githubUrl: `${GH}/Gender_Bias_In_Promo_Hire`,
  },
  {
    slug: "data-analyst-agent",
    title: "Data Analyst Agent (Prototype)",
    summary:
      "LLM-powered agent that answers natural-language questions over datasets — early experiment combining classical analysis with tool use.",
    tags: ["LLM", "Agents", "Python"],
    year: 2026,
    status: "in-progress",
    category: "ai-ml",
    client: "Self-directed — bridging analytics and LLM tooling",
    role: "Builder — agent design, tool surface, prompt engineering",
    timeframe: "Ongoing 2026",
    metrics: [
      { label: "Type", value: "LLM agent" },
      { label: "Stage", value: "Prototype" },
      { label: "Frontend", value: "HTML" },
      { label: "Tools", value: "Analysis primitives" },
    ],
    businessProblem:
      "Most analysts spend a chunk of every day answering ad-hoc 'what's X by Y?' questions. The prototype explores how far an agent can take that workload without hallucinating.",
    dataset:
      "Test bench of small CSV datasets covering sales, HR and product metrics — chosen to exercise common ad-hoc question patterns.",
    analysis:
      "An HTML frontend sends natural-language questions to an LLM. The agent plans, calls a tightly-scoped set of analysis tools (filter, group-by, summarise, plot) over the dataset, and returns a structured answer plus the underlying computation.",
    keyInsights: [
      "A small, well-typed tool surface beats clever prompting — most failure modes disappear when the agent only has 'safe' primitives to call.",
      "Forcing the agent to ask clarifying questions before answering removes the majority of hallucinated columns and metrics.",
      "Single-shot benchmarks under-state agent quality; scenario tests are far more useful.",
    ],
    dashboard:
      "Lightweight HTML chat surface with trace view — every answer renders the tool calls and intermediate tables the agent used.",
    recommendations: [
      "Add a RAG layer over dataset schema and past Q&A to make recall better than recall-from-context.",
      "Wire in evaluation traces for regression testing — agent quality regressions are otherwise invisible.",
    ],
    technologies: ["Python", "HTML", "LLM API", "Tool use"],
    links: [{ label: "Repository", href: `${GH}/Data-analyst-agent` }],
    githubUrl: `${GH}/Data-analyst-agent`,
  },
  {
    slug: "tds-virtual-ta",
    title: "TDS Virtual TA — RAG over Course Materials",
    summary:
      "Retrieval-grounded TA for the Tools in Data Science course — answers student questions with citations back to the source material.",
    tags: ["Python", "RAG", "LLM", "Education"],
    year: 2026,
    status: "in-progress",
    category: "ai-ml",
    client: "Self-directed · Tools in Data Science (IIT-M Online BS)",
    role: "Builder — indexing pipeline, retrieval tuning",
    timeframe: "Ongoing 2026",
    metrics: [
      { label: "Type", value: "RAG assistant" },
      { label: "Domain", value: "Course Q&A" },
      { label: "Index", value: "Lectures + Q&A" },
      { label: "Citations", value: "Required" },
    ],
    businessProblem:
      "Course forums get flooded with repeat questions every week. A retrieval-grounded TA can answer most of them instantly, with citations back to the source so students can verify.",
    dataset:
      "Course materials — lecture notes, slides, and historical forum Q&A — chunked into retrievable passages with metadata for week, topic and source type.",
    analysis:
      "Built an indexing pipeline that chunks materials without breaking code blocks or equations, embeds them, and stores them in a vector index. Incoming questions are embedded, top-k chunks are retrieved, and an LLM composes a grounded answer with inline citations. Tuned chunk size and overlap on a held-out question set.",
    keyInsights: [
      "Retrieval quality dominates generation quality — most early errors traced back to how content was chunked, not which LLM was used.",
      "Citations are non-negotiable in an educational setting; an unsupported answer is worse than no answer.",
      "Per-week routing materially improved answer relevance for students mid-course.",
    ],
    dashboard:
      "Simple Q&A interface with retrieved-context preview and per-answer feedback widget for future retrieval-threshold tuning.",
    recommendations: [
      "Add per-week routing so answers stay aligned with course progress.",
      "Collect user feedback to tune retrieval thresholds rather than guessing.",
      "Treat retrieval and generation as separate optimisation problems with separate metrics.",
    ],
    technologies: ["Python", "Embeddings", "Vector store", "LLM API"],
    links: [{ label: "Repository", href: `${GH}/TDS-Virtual-TA` }],
    githubUrl: `${GH}/TDS-Virtual-TA`,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/* ----- Research & Videos (lean stubs sourced from real artifacts) ----- */

export const researchNotes: ResearchNote[] = [
  {
    slug: "huggingface-data-analysis",
    title: "Hugging Face Hub — what's actually trending",
    summary:
      "EDA on 30k+ Hugging Face models. Log-scale popularity, tag co-occurrence, and why median downloads beat mean for any honest read.",
    date: "Jul 2025",
    tags: ["EDA", "Open-source ML"],
    href: `${GH}/Hugging_Face_data_analysis`,
  },
  {
    slug: "gender-bias-promo-hire",
    title: "Gender bias in promotion & hiring — a disaggregated read",
    summary:
      "Why aggregate gender gaps can be misleading. Chi-square, two-proportion z-tests, and a Simpson's-paradox check on a real employee dataset.",
    date: "Aug 2025",
    tags: ["Fairness", "Statistics"],
    href: `${GH}/Gender_Bias_In_Promo_Hire`,
  },
  {
    slug: "forecasting-baselines-note",
    title: "Always beat the seasonal-naive baseline",
    summary:
      "Notes from the Cinema Audience Forecasting challenge — why most of the variance was already explained before gradient boosting entered the picture.",
    date: "Nov 2025",
    tags: ["Forecasting", "Methodology"],
    href: GH,
  },
];

export const videos: VideoItem[] = [];
