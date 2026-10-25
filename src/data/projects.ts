import type { Project, ProjectCategory } from "@/types";
import type { ResearchNote, VideoItem } from "@/types";

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "data", label: "Data Analytics & BI" },
  { id: "ai-ml", label: "ML, DL & AI" },
  { id: "mcp", label: "Agentic MCP" },
  { id: "web", label: "Web Applications" },
  { id: "research", label: "Labs & Research" },
];

const GH = "https://github.com/Surya070805";

export const projects: Project[] = [
  /* =====================================================================
     11 MAIN RECRUITER-FACING PROJECTS
     ===================================================================== */
  {
    slug: "finance-dashboard",
    title: "Finance Risk Dashboard: LendingClub Portfolio",
    summary:
      "Enterprise Power BI credit risk dashboard analyzing 19+ years of LendingClub loans — default risk modeling, borrower grade migration, and capital protection strategies for sustainable loan growth.",
    tags: ["Power BI", "DAX", "Power Query", "Financial Modeling", "Risk Analytics"],
    year: 2026,
    status: "shipped",
    category: "data",
    featured: true,
    isMain: true,
    tier: "main",
    walkthroughStatus: "available",
    client: "LendingClub Loan Performance Portfolio (Executive Risk Committee)",
    role: "Lead Financial Data Analyst — Data Architecture, Risk Modeling & Executive BI",
    timeframe: "Jan – Mar 2026",
    metrics: [
      { label: "Loan Records", value: "1M+" },
      { label: "Total Exposure", value: "$15.97B" },
      { label: "Avg Interest", value: "12.8%" },
      { label: "Walkthrough", value: "2 Videos · 10 min" },
    ],
    businessProblem:
      "Credit risk committees and lending executives faced rising default volatility without a granular, interactive mechanism to isolate high-risk borrower clusters. Traditional monthly reports were static, obscuring how debt-to-income (DTI) thresholds, grade migrations (A through G), and verification status compounded write-off risk during macroeconomic shifts.",
    dataset:
      "Comprehensive LendingClub historical loan portfolio (~1M+ loan originations across 2007–2026) capturing funded amount, interest rate, borrower employment length, annual income, home ownership, FICO score bands, and current loan status (Fully Paid, Current, Charged Off, Default).",
    analysis:
      "Architected a dimensional star schema in Power BI with optimized relationship cardinalities. Authored robust DAX measures for Default Probability, Net Loss Given Default (LGD), Cumulative Loss Exposure, and Risk-Weighted Yield. Implemented dynamic sensitivity slicers enabling executives to stress-test interest rate movements and DTI tolerance limits.",
    keyInsights: [
      "Sub-prime grades (E, F, G) represented only 14% of origination volume but contributed over 48% of total charged-off principal.",
      "Borrowers with Debt-to-Income (DTI) exceeding 28% exhibited an exponential 2.4x surge in 36-month default rates when combined with unverified income.",
      "36-month tenor loans consistently outperformed 60-month notes by +210 bps on risk-adjusted net return after factoring in recovery costs.",
    ],
    dashboard:
      "Multi-tab Power BI executive dashboard: Page 1 provides a high-level Portfolio Health & Credit Quality Overview with interactive grade filters; Page 2 details Borrower Cohort Risk & Underwriting Diagnostics with drill-through to individual risk tiers.",
    recommendations: [
      "Tighten underwriting criteria on Grade D-G applicants by mandating third-party income verification above $50k loan requests.",
      "Cap maximum tenor at 36 months for borrowers with DTI > 25% to insulate against long-term macroeconomic debt service erosion.",
      "Establish early-warning trigger alerts when regional loan concentration in high-delinquency states exceeds 18% of portfolio capital.",
    ],
    technologies: ["Power BI", "DAX", "Power Query (M)", "Financial Modeling", "Excel", "Star Schema"],
    links: [
      { label: "Executive Walkthrough", href: "https://youtu.be/3vcUzCdIlxI" },
      { label: "Case Study Video", href: "https://youtu.be/LDOVYYg3dyE" },
      { label: "Repository", href: `${GH}/Finance-Dashboard` },
    ],
    githubUrl: `${GH}/Finance-Dashboard`,
    videos: [
      {
        id: "finance-v1",
        pageTitle: "Risk Dashboard for Sustainable Loan Growth",
        audience: "Risk Committees & Credit Underwriters",
        businessQuestion: "How do credit grades, debt-to-income, and default rates interact to threaten portfolio yield?",
        youtubeId: "LDOVYYg3dyE",
        youtubeUrl: "https://youtu.be/LDOVYYg3dyE?si=CUYrp58FI6eOPeYA",
        duration: "6 min",
        takeaway: "Demonstrates interactive risk clustering and identifies high-risk cohorts to protect net interest margin.",
      },
      {
        id: "finance-v2",
        pageTitle: "LendingClub Case Study (2007 to 2026)",
        audience: "Executive Leadership & Portfolio Strategy",
        businessQuestion: "What historical macroeconomic loan cycles reveal about sustainable credit expansion?",
        youtubeId: "3vcUzCdIlxI",
        youtubeUrl: "https://youtu.be/3vcUzCdIlxI?si=Pspa4YjCMjwg4WfK",
        duration: "4 min",
        takeaway: "Synthesizes 19 years of LendingClub loan data into actionable origination policies for sustainable growth.",
      },
    ],
  },
  {
    slug: "zomato-bangalore-dashboard",
    title: "Bangalore Restaurants: Cuisine, Cost & Ratings",
    summary:
      "Power BI study of 50,000+ Bangalore restaurants — what drives ratings, where premium and value markets sit, and which cuisines win by locality.",
    tags: ["Power BI", "Power Query", "DAX", "Data cleaning", "Star Schema"],
    year: 2025,
    status: "shipped",
    category: "data",
    featured: true,
    isMain: true,
    tier: "main",
    walkthroughStatus: "coming-soon",
    client: "Self-initiated · framed for a hypothetical food-tech analytics team",
    role: "Sole analyst — modeling, BI, narrative",
    timeframe: "Mar – Jun 2025",
    metrics: [
      { label: "Restaurants", value: "50,000+" },
      { label: "Localities", value: "90+" },
      { label: "Visuals", value: "12" },
      { label: "Walkthrough", value: "In Production" },
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
    slug: "hr-analytics-dashboard",
    title: "HR Analytics: Attrition, Tenure & Workforce Mix",
    summary:
      "People-analytics Power BI dashboard that surfaces who is leaving, from where, and at what tenure — built to make HR retention conversations data-grounded rather than anecdotal.",
    tags: ["Power BI", "DAX", "Python", "HR Analytics", "People Analytics"],
    year: 2025,
    status: "shipped",
    category: "data",
    featured: true,
    isMain: true,
    tier: "main",
    walkthroughStatus: "coming-soon",
    client: "Self-initiated · public HR dataset",
    role: "Analyst — cleaning, modeling, dashboard",
    timeframe: "May 2025",
    metrics: [
      { label: "KPIs", value: "10+" },
      { label: "Departments", value: "9" },
      { label: "Employees", value: "1,470" },
      { label: "Walkthrough", value: "In Production" },
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
    technologies: ["Power BI", "DAX", "Python", "pandas", "Power Query"],
    links: [{ label: "Repository", href: `${GH}/HR-Dashboard` }],
    githubUrl: `${GH}/HR-Dashboard`,
  },
  {
    slug: "cinema-audience-forecasting",
    title: "Cinema Audience Forecasting (Kaggle)",
    summary:
      "Daily theatre audience forecasts across multiple cinemas — feature-engineered gradient-boosted models with time-aware validation. Ranked 1,496 / 2,632 teams.",
    tags: ["Machine Learning", "Python", "LightGBM", "XGBoost", "Time Series"],
    year: 2025,
    status: "shipped",
    category: "ai-ml",
    featured: true,
    isMain: true,
    tier: "main",
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
      "Engineered a feature matrix in pandas — calendar features (day-of-week, month, is_holiday), lag values (1, 7, 14, 28), rolling means (7d, 28d) and per-location categorical encodings. Trained and compared a seasonal-naive baseline, scikit-learn linear models, LightGBM and XGBoost using an expanding time-series split.",
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
      "Text classification of user comments using TF-IDF and calibrated linear models. Ranked 282 / 2,744 teams on the Kaggle Comment Category Prediction Challenge.",
    tags: ["Machine Learning", "Python", "scikit-learn", "TF-IDF", "NLP"],
    year: 2026,
    status: "shipped",
    category: "ai-ml",
    featured: true,
    isMain: true,
    tier: "main",
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
      "Manually triaging large volumes of user comments doesn't scale. The Kaggle brief: predict the category assigned to each comment with a lightweight, explainable model rather than reaching straight for a heavy transformer.",
    dataset:
      "Competition-provided multi-class comment dataset — short user-generated text with imbalanced category distribution and some multilingual noise.",
    analysis:
      "Preprocessing pipeline: lowercase, strip noise, lemmatize. Vectorised with TF-IDF (uni- and bi-grams, sub-linear TF scaling). Compared logistic regression, linear SVM and a calibrated SGD classifier under a stratified 5-fold CV. Tuned class weights to handle imbalance and evaluated on macro F1.",
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
    slug: "smart-mcq-solver",
    title: "Smart MCQ Solver (Deep Learning)",
    summary:
      "Deep learning transformer pipeline that ingests STEM multiple-choice questions, computes contextual semantic representations across candidate distractors, and resolves answers with explainable confidence scores.",
    tags: ["Deep Learning", "PyTorch", "Hugging Face", "Transformers", "BERT/RoBERTa"],
    year: 2026,
    status: "shipped",
    category: "ai-ml",
    isMain: true,
    tier: "main",
    client: "AI / DL Exploration Project",
    role: "Deep Learning Engineer — Architecture, Fine-Tuning & Evaluation",
    timeframe: "Jan – Feb 2026",
    metrics: [
      { label: "Accuracy", value: "84.6%" },
      { label: "Architecture", value: "Cross-Encoder" },
      { label: "Inference", value: "<180ms" },
      { label: "Domain", value: "STEM Q&A" },
    ],
    businessProblem:
      "Automated educational evaluation engines often stumble on nuanced STEM questions where distractors share near-identical phrasing but differ on subtle factual or quantitative premises. A naive word-matching or zero-shot approach fails to detect fine-grained contradictions.",
    dataset:
      "Curated multi-subject dataset of competitive exam MCQs (ARC, OpenBookQA, and custom physics/math item banks) featuring question stems, four candidate choices, and ground-truth answer keys.",
    analysis:
      "Formulated question answering as a sequence classification ranking task. Concatenated question premises with each candidate option using pairwise token separation. Fine-tuned a RoBERTa-based cross-encoder with cross-entropy loss, applying layer-wise learning rate decay and dropout regularization.",
    keyInsights: [
      "Cross-encoder architectures outperformed bi-encoders by +11.2% accuracy due to cross-attention between question condition tokens and option predicates.",
      "Distractor negation detection was the primary differentiator between top-tier transformer representations and shallow TF-IDF baselines.",
      "Quantization to 8-bit ONNX runtime reduced inference latency by 3.2x with under 0.4% degradation in top-1 accuracy.",
    ],
    dashboard:
      "Interactive Streamlit demo highlighting token attribution, choice probability distribution, and step-by-step rationale generation.",
    recommendations: [
      "Deploy 8-bit quantized models for edge/browser deployment to ensure sub-200ms latency on client hardware.",
      "Augment with knowledge graph triples to further strengthen multi-hop scientific reasoning.",
    ],
    technologies: ["PyTorch", "Hugging Face Transformers", "Python", "ONNX", "Streamlit"],
    links: [{ label: "GitHub", href: `${GH}/Smart-MCQ-Solver` }],
    githubUrl: `${GH}/Smart-MCQ-Solver`,
  },
  {
    slug: "tds-virtual-ta",
    title: "TDS Virtual TA — RAG over Course Materials",
    summary:
      "Retrieval-grounded assistant for the Tools in Data Science course — answers complex student questions with strict inline citations back to lecture transcripts and forum discussions.",
    tags: ["RAG", "Python", "Vector DB", "LLM", "Embeddings"],
    year: 2026,
    status: "in-progress",
    category: "ai-ml",
    isMain: true,
    tier: "main",
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
  {
    slug: "maze-solver-ai",
    title: "Autonomous Maze Solver: Heuristic Search & Pathfinding",
    summary:
      "Comparative artificial intelligence search engine implementing A* Search, Dijkstra, Greedy Best-First, and BFS across procedurally generated 2D grids and mazes.",
    tags: ["Artificial Intelligence", "A* Algorithm", "Python", "Pathfinding", "Heuristics"],
    year: 2025,
    status: "shipped",
    category: "ai-ml",
    isMain: true,
    tier: "main",
    client: "AI Algorithms & Computational Graph Theory Study",
    role: "Algorithm Developer — Heuristic Design, Graph Traversal & Benchmarking",
    timeframe: "Oct – Dec 2025",
    metrics: [
      { label: "Algorithms", value: "4 Compared" },
      { label: "Optimality", value: "100% (A* & Dijkstra)" },
      { label: "Node Expansion", value: "-62% vs BFS" },
      { label: "Grid Size", value: "Up to 200x200" },
    ],
    businessProblem:
      "Efficient state-space navigation and robotic path planning require balancing time complexity, memory footprint, and path optimality. Comparing heuristic efficiency empirically provides concrete validation of theoretical algorithm bounds.",
    dataset:
      "Procedurally generated perfect mazes using recursive backtracking and random DFS, alongside weighted obstacle grids featuring variable terrain traversal costs.",
    analysis:
      "Implemented standard graph traversal algorithms with priority queue heap optimization. Formulated admissible and consistent heuristic functions (Manhattan, Euclidean, and Diagonal distance metrics). Profiled execution time, frontier queue memory peaks, and total visited nodes across increasing grid dimensions.",
    keyInsights: [
      "A* with Manhattan distance reduced total node expansions by 62% compared to standard BFS while guaranteeing optimal shortest path lengths.",
      "Greedy Best-First search achieved the lowest latency in open-area grids but routinely degraded to sub-optimal detours in dense mazes.",
      "Memory consumption in Dijkstra expanded quadratically with maze diameter, whereas A* bounded frontier growth along the goal vector.",
    ],
    dashboard:
      "Real-time visual simulation interface showing live wavefront expansion, visited node heatmaps, and path reconstruction comparisons.",
    recommendations: [
      "Utilize A* with tie-breaking Manhattan heuristics for deterministic grid navigation where shortest-path guarantees are mandatory.",
      "Adopt hierarchical pathfinding (HPA*) when scaling past 500x500 nodes to limit peak heap memory.",
    ],
    technologies: ["Python", "Pygame", "Data Structures", "Graph Theory", "Heuristic Optimization"],
    links: [{ label: "GitHub", href: `${GH}/Maze-Solver-AI` }],
    githubUrl: `${GH}/Maze-Solver-AI`,
  },
  {
    slug: "sewasetu-ai-handout",
    title: "SewaSetu AI Handout: MCP Tool Server",
    summary:
      "Model Context Protocol (MCP) server integration enabling LLM agents to autonomously query government citizen welfare schemes, validate eligibility schemas, and generate localized citizen handouts.",
    tags: ["MCP", "Model Context Protocol", "Agentic AI", "Python", "FastMCP", "JSON-RPC"],
    year: 2026,
    status: "shipped",
    category: "mcp",
    featured: true,
    isMain: true,
    tier: "main",
    client: "Civic Tech / Model Context Protocol Integration",
    role: "MCP System Architect & Tool Designer",
    timeframe: "Feb – Mar 2026",
    metrics: [
      { label: "Standard", value: "Anthropic MCP" },
      { label: "Tools Exposed", value: "6 RPC Tools" },
      { label: "Format", value: "JSON-RPC 2.0" },
      { label: "Domain", value: "Citizen Services" },
    ],
    businessProblem:
      "Government service delivery portals (SewaSetu) house extensive policy criteria that citizens struggle to parse. General LLMs hallucinate requirements or outdated subsidies. An MCP-compliant tool server grounds agent reasoning with authoritative, schema-validated public API queries.",
    dataset:
      "Structured civic schemes dataset covering criteria, required documentation checklists, income cutoffs, and departmental jurisdictional routing.",
    analysis:
      "Engineered an MCP server using Python and FastMCP following JSON-RPC 2.0 specifications. Defined strongly typed tool schemas for scheme lookup, eligibility computation, document verification checks, and multilingual handout synthesis. Enforced strict prompt boundaries to guarantee deterministic execution without tool hallucination.",
    keyInsights: [
      "Exposing atomic, deterministic tools (filter_by_criteria, get_scheme_docs) resulted in 99.2% tool invocation accuracy from agentic orchestrators.",
      "Implementing structured Pydantic schemas eliminated parameter type mismatch errors during multi-turn LLM reasoning.",
      "Decoupling tool definitions from the LLM runtime allows the MCP server to serve Claude, Gemini, and local Ollama agents identically.",
    ],
    dashboard:
      "MCP Inspector test suite and live CLI demonstrating agent discovery, resource reading, and dynamic tool execution with structured logging.",
    recommendations: [
      "Adopt Model Context Protocol for enterprise and public sector tool integrations to prevent proprietary lock-in.",
      "Always validate agent tool arguments against Pydantic schemas before executing external database queries.",
    ],
    technologies: ["Model Context Protocol (MCP)", "Python", "FastMCP", "Pydantic", "REST APIs", "JSON-RPC"],
    links: [{ label: "GitHub", href: `${GH}/Sewasetu-ai-handout` }],
    githubUrl: `${GH}/Sewasetu-ai-handout`,
  },
  {
    slug: "campus-placement-system",
    title: "Campus Placement System: Recruitment Portal",
    summary:
      "Full-stack placement automation web application for university recruiting drives — managing student verification, job drives, shortlisting filters, and application lifecycle.",
    tags: ["Web Dev", "React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    year: 2025,
    status: "shipped",
    category: "web",
    isMain: true,
    tier: "main",
    client: "University Placement Cell / Academic Administration",
    role: "Full-Stack Web Developer — Architecture, DB Schema, REST API & Frontend",
    timeframe: "Aug – Nov 2025",
    metrics: [
      { label: "Roles", value: "Student, Admin, Recruiter" },
      { label: "API Endpoints", value: "28+" },
      { label: "DB Tables", value: "12 Relational" },
      { label: "Status", value: "Production Ready" },
    ],
    businessProblem:
      "University placement operations relied on messy spreadsheets, manual email chains, and disconnected Google Forms to manage hundreds of student eligibility criteria across dozen recruitment drives, leading to compliance errors and missed deadlines.",
    dataset:
      "Relational database schema storing student academic records (CGPA, backlogs, department), company drive specifications, eligibility rules, and real-time application states.",
    analysis:
      "Designed role-based access control (RBAC) ensuring strict separation between student applicants, company recruiters, and faculty placement officers. Developed dynamic query filters that compute student eligibility on the fly based on company cutoffs, eliminating ineligible submissions automatically.",
    keyInsights: [
      "Dynamic database-level filtering reduced administrative shortlisting time from 3 business days to instantaneous 1-click roster exports.",
      "Secure JWT authentication and sanitized SQL parameters eliminated privilege escalation risks across user roles.",
      "Responsive React interface achieved 100% mobile accessibility for students receiving urgent drive notifications.",
    ],
    dashboard:
      "Admin command center featuring drive statistics, departmental placement ratios, student application trackers, and one-click CSV export engines.",
    recommendations: [
      "Integrate automated resume parsing to cross-match student skills directly with company job descriptions.",
      "Implement automated WhatsApp/SMS webhooks for time-sensitive interview schedule alerts.",
    ],
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "JWT Auth"],
    links: [{ label: "GitHub", href: `${GH}/Campus-Placement-System` }],
    githubUrl: `${GH}/Campus-Placement-System`,
  },
  {
    slug: "quiz-master-application",
    title: "Quiz Master: Real-Time Assessment Platform",
    summary:
      "Dynamic online testing and assessment engine featuring timed question suites, instant scoring, adaptive subject categories, and comprehensive performance analytics.",
    tags: ["Web Dev", "JavaScript", "HTML/CSS", "Python", "SQLite", "REST APIs"],
    year: 2025,
    status: "shipped",
    category: "web",
    isMain: true,
    tier: "main",
    client: "Educational Assessment Platform",
    role: "Full-Stack Developer — UI, Session Management & Scoring Engine",
    timeframe: "May – Jul 2025",
    metrics: [
      { label: "Question Bank", value: "500+ Items" },
      { label: "Categories", value: "8 Subjects" },
      { label: "Scoring Engine", value: "Instantaneous" },
      { label: "Design", value: "Responsive UI" },
    ],
    businessProblem:
      "Learners required an engaging, low-latency self-testing tool that simulates real test pressures with countdown timers, randomized answer choices, and instantaneous conceptual reviews upon quiz completion.",
    dataset:
      "Structured JSON & SQLite question repository categorized by domain, difficulty tier, and detailed answer explanations.",
    analysis:
      "Built a modular frontend application that manages timed quiz state client-side while preventing inspection tampering. Developed server-side scoring logic to validate timestamps, tally negative marking where applicable, and generate percentile rankings against community averages.",
    keyInsights: [
      "Randomizing question order and choice permutations reduced repetitive memorization patterns by 80%.",
      "Immediate explanatory feedback upon quiz completion increased participant retention and retake rates by 45%.",
      "Lightweight Vanilla JS architecture ensured flawless 60 FPS performance on low-bandwidth mobile connections.",
    ],
    dashboard:
      "Clean candidate assessment summary displaying score breakdown, topic mastery percentages, question review accordions, and historical improvement curves.",
    recommendations: [
      "Implement adaptive difficulty where subsequent question difficulty scales dynamically based on rolling accuracy.",
      "Add WebSocket integration for synchronous multiplayer trivia competitions.",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Python", "SQLite", "REST APIs"],
    links: [{ label: "GitHub", href: `${GH}/Quiz-Master-Application` }],
    githubUrl: `${GH}/Quiz-Master-Application`,
  },

  /* =====================================================================
     5 PRACTICE, COMPETITION & HACKATHON PROJECTS (ARCHIVE TOGGLE)
     ===================================================================== */
  {
    slug: "atliq-sales-insights",
    title: "AtliQ Hardware: Sales Insights (Practice Project)",
    summary:
      "End-to-end MySQL → Power BI pipeline for a hardware reseller operating across 8 Indian markets — revenue, top customers, and YoY market health on one dashboard.",
    tags: ["Power BI", "SQL", "MySQL", "ETL", "Practice Project"],
    year: 2025,
    status: "shipped",
    category: "data",
    isMain: false,
    tier: "practice",
    client: "AtliQ Technologies case study (Codebasics practice) — hardware reseller across Indian markets",
    role: "Analyst — SQL exploration, modeling, BI build",
    timeframe: "Apr 2025",
    metrics: [
      { label: "Markets", value: "8" },
      { label: "Years of data", value: "4" },
      { label: "Customers", value: "27" },
      { label: "Type", value: "Practice Project" },
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
      "Single-page executive dashboard with revenue trend, market-share treemap, top-customer leaderboard and a YoY-growth heatmap.",
    recommendations: [
      "Diversify the customer base — set a target of bringing top-5 concentration below 55% over the next four quarters.",
      "Invest sales resource in Kanpur and Bhubaneswar where growth rates justify it; defend share in Delhi NCR.",
    ],
    technologies: ["SQL", "MySQL", "Power BI", "DAX", "Power Query", "Excel"],
    links: [{ label: "Repository", href: `${GH}/AtliQ-DashBoard` }],
    githubUrl: `${GH}/AtliQ-DashBoard`,
  },
  {
    slug: "huggingface-data-analysis",
    title: "Hugging Face Hub Ecosystem Analysis (Practice Project)",
    summary:
      "EDA on Hugging Face model metadata using NumPy, pandas and Google Colab — profiling downloads, tags and task categories to understand the open-source ML ecosystem beyond hype cycles.",
    tags: ["NumPy", "pandas", "Google Colab", "EDA", "Practice Project"],
    year: 2025,
    status: "shipped",
    category: "research",
    isMain: false,
    tier: "practice",
    client: "Self-initiated EDA notebook on Google Colab",
    role: "Analyst — collection, cleaning, visualisation",
    timeframe: "Jul 2025",
    metrics: [
      { label: "Models analysed", value: "30k+" },
      { label: "Environment", value: "Google Colab" },
      { label: "Stack", value: "NumPy & pandas" },
      { label: "Type", value: "Practice Notebook" },
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
      "Jupyter / Google Colab notebook with annotated visuals — log-scale download histograms, top-N leaderboards by category, and a tag co-occurrence heatmap.",
    recommendations: [
      "When reporting on open-source ML adoption, lead with median (not mean) downloads to avoid foundation-model skew.",
      "Re-run quarterly to track category-level momentum over time.",
    ],
    technologies: ["Python", "NumPy", "pandas", "matplotlib", "seaborn", "Google Colab"],
    links: [{ label: "Repository", href: `${GH}/Hugging_Face_data_analysis` }],
    githubUrl: `${GH}/Hugging_Face_data_analysis`,
  },
  {
    slug: "gender-bias-promo-hire",
    title: "Gender Bias in Promotion & Hiring (Competition)",
    summary:
      "Statistical analysis and Power BI dashboard exploring gender disparities in promotion and hiring — quantifying disparity metrics, significance testing, and avoiding Simpson's paradox.",
    tags: ["Power BI", "DAX", "Statistics", "Fairness", "Competition"],
    year: 2025,
    status: "shipped",
    category: "data",
    isMain: false,
    tier: "competition",
    client: "Analytics Competition Entry · Workforce Equity Study",
    role: "Analyst — data prep, statistical testing, Power BI visualization",
    timeframe: "Aug 2025",
    metrics: [
      { label: "Method", value: "Chi-square + Z-test" },
      { label: "Dashboard", value: "Power BI" },
      { label: "Cuts", value: "Role · Tenure" },
      { label: "Type", value: "Competition Entry" },
    ],
    businessProblem:
      "Anecdotes about hiring and promotion bias are everywhere — but how big are the gaps in actual data, and are they statistically significant after controlling for role and tenure?",
    dataset:
      "Workforce demographics dataset with gender, department, role, tenure, hiring batch, and promotion flags.",
    analysis:
      "Computed promotion and hiring rates by gender, then disaggregated by role and tenure to test for Simpson's paradox. Applied chi-square tests on contingency tables and two-proportion z-tests, then visualized findings in an interactive Power BI report with statistical disparity callouts.",
    keyInsights: [
      "Aggregate promotion-rate gap was small and not significant — but disaggregating by role revealed a meaningful gap in two specific senior roles.",
      "Hiring rates by gender showed no statistically significant difference once tenure and role were controlled for.",
      "P-values alone are a poor lens for a fairness study — effect size and disaggregation tell a much sharper story.",
    ],
    dashboard:
      "Power BI report featuring paired bar charts, departmental equity slicers, and statistical significance summaries.",
    recommendations: [
      "Always disaggregate fairness analyses by role and tenure — aggregate views routinely mask the real signal.",
      "Treat statistical significance and policy significance as separate questions.",
    ],
    technologies: ["Power BI", "DAX", "Python", "pandas", "scipy.stats"],
    links: [{ label: "Repository", href: `${GH}/Gender_Bias_In_Promo_Hire` }],
    githubUrl: `${GH}/Gender_Bias_In_Promo_Hire`,
  },
  {
    slug: "hr-dashboard-tableau",
    title: "HR Workforce & Attrition Dashboard (Tableau Practice)",
    summary:
      "Interactive Tableau workbook benchmarking employee retention, departmental attrition trends, and compensation equity across enterprise business units.",
    tags: ["Tableau", "HR Analytics", "Calculated Fields", "LOD Expressions", "Practice Project"],
    year: 2025,
    status: "shipped",
    category: "data",
    isMain: false,
    tier: "practice",
    client: "Self-initiated Tableau Mastery & Visual Analytics Practice",
    role: "BI Developer — Data Modeling & Tableau Dashboard Design",
    timeframe: "Jun 2025",
    metrics: [
      { label: "Platform", value: "Tableau" },
      { label: "LOD Expressions", value: "Include / Exclude" },
      { label: "Sheets", value: "8 Interlinked" },
      { label: "Type", value: "Practice Project" },
    ],
    businessProblem:
      "Exploring Tableau visual design capabilities against classical HR workforce data — leveraging Level of Detail (LOD) expressions, parameters, and action filters to deliver seamless interactive drill-downs.",
    dataset:
      "Standardized enterprise HR workforce dataset capturing 1,200+ employee records, salary bands, performance ratings, and tenure milestones.",
    analysis:
      "Built custom calculated fields and Level of Detail (LOD) expressions to compute tenure-adjusted retention baselines independent of active dashboard filter selections. Created parameter actions for dynamic metric switching between headcount and turnover rate.",
    keyInsights: [
      "Tableau's parameter actions allowed seamless switching between absolute attrition headcount and percentage churn on the same visual.",
      "LOD calculations effectively computed department benchmark averages across changing manager slicers.",
    ],
    dashboard:
      "Tableau story and dashboard comprising executive KPI scorecards, attrition heatmaps, and salary distribution boxplots.",
    recommendations: [
      "Utilize fixed LOD calculations to preserve global enterprise benchmarks when users drill into specific branches.",
    ],
    technologies: ["Tableau", "Tableau Prep", "LOD Expressions", "Excel", "Data Visualization"],
    links: [{ label: "GitHub", href: `${GH}/HR-Dashboard-Tableau` }],
    githubUrl: `${GH}/HR-Dashboard-Tableau`,
  },
  {
    slug: "innocore-project",
    title: "InnoCore: Collaborative Innovation Platform (Hackathon)",
    summary:
      "Rapid-prototype hackathon web application delivering a centralized hub for developer teams to submit problem statements, pitch prototypes, and crowdsource community feedback.",
    tags: ["Web Dev", "React", "TypeScript", "Tailwind CSS", "Hackathon"],
    year: 2025,
    status: "shipped",
    category: "web",
    isMain: false,
    tier: "hackathon",
    client: "Hackathon Sprint Submission",
    role: "Frontend & Full-Stack Lead — Sprint Scaffolding & Component Architecture",
    timeframe: "Sep 2025",
    metrics: [
      { label: "Sprint Duration", value: "36 Hours" },
      { label: "Components", value: "24 UI Elements" },
      { label: "Platform", value: "Web App" },
      { label: "Type", value: "Hackathon Project" },
    ],
    businessProblem:
      "Hackathon teams needed a rapid, frictionless way to showcase project proposals, discover collaborators, and receive real-time peer reviews without bloated enterprise project management tools.",
    dataset:
      "Real-time JSON datastore managing project pitches, member rosters, tag classifications, and community upvotes.",
    analysis:
      "Architected a responsive React application using Tailwind CSS and TypeScript within a 36-hour sprint. Implemented optimistic UI updates for instant vote feedback, markdown rendering for project briefs, and modular filtering by technology domain.",
    keyInsights: [
      "Component-driven design enabled rapid parallel development under strict 36-hour hackathon deadlines.",
      "Optimistic UI state management made interactions feel instantaneous even over simulated flaky networks.",
    ],
    dashboard:
      "Project submission canvas, live pitch feed with upvoting, and team matchmaking dashboard.",
    recommendations: [
      "Add WebSocket integration for real-time collaboration chats between hackathon participants.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Vite"],
    links: [{ label: "GitHub", href: `${GH}/InnoCore-Project` }],
    githubUrl: `${GH}/InnoCore-Project`,
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
