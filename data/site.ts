export const dataAnalysisProject = {
  name: "Simple Data Analysis Agent",
  description: "A modular Python data analysis agent using the OpenAI API and Plotly.",
  link: "https://github.com/zjiahui318-maker/simple-data-analysis-agent",
  points: [
    "Coordinates tools for CSV ingestion, data profiling, correlation analysis, linear regression, visualization, LLM interpretation and Markdown report generation.",
    "Keeps Python responsible for statistical calculations and model metrics while the LLM explains computed results.",
    "Generates interactive Plotly scatter plots, correlation heatmaps and regression-fit visualizations, with a local rule-based fallback.",
  ],
} as const;

export const site = {
  name: "Jiahui Zhang",
  role: "Data Analytics | Economics | AI & Automation",
  location: "Canberra, ACT 2602",
  email: "zjiahui318@gmail.com",
  phone: "0438 476 802",
  github: "https://github.com/zjiahui318-maker",
  portfolio: "https://web-navy-xi-670bq1ne58.vercel.app",
  portrait: "/portrait.jpg",
  summary:
    "I use Python, SQL and econometrics to analyse data and automate reporting. My Python agent turns CSV files into regression results, interactive charts and Markdown reports.",
  highlights: [
    {
      value: "AI",
      label: "analysis agent",
      detail: "Built a Python-based agent for profiling, regression, visualization, LLM interpretation and report generation.",
    },
    {
      value: "5.625",
      label: "GPA / 7.0",
      detail: "Master of Applied Economics, with focus areas in Computing, Statistics and Economics.",
    },
    {
      value: "20%",
      label: "growth outcome",
      detail: "Produced social media content that increased followers by 20% and improved engagement by 10%.",
    },
  ],
  skills: [
    {
      title: "Analytics Programming",
      items: ["Python", "R / RStudio", "SQL / MySQL", "Java", "Haskell", "Stata", "MATLAB"],
    },
    {
      title: "Data Analytics + Modelling",
      items: ["Data cleaning", "Data wrangling", "Exploratory data analysis", "Data mining", "Predictive modelling", "Classification", "Clustering", "Anomaly detection"],
    },
    {
      title: "Statistics + Economics",
      items: ["Regression analysis", "Econometric modelling", "Statistical analysis", "Cross-sectional analysis", "Time-series analysis", "Forecasting", "Survey analysis"],
    },
    {
      title: "Data Management + Quality",
      items: ["Data profiling", "Data quality assessment", "ETL", "Data integration", "Record linkage", "Entity resolution", "Web scraping"],
    },
    {
      title: "Text + Network Analytics",
      items: ["Text analytics", "Sentiment analysis", "Text preprocessing", "Social media analytics", "Social Network Analysis", "Graph analytics", "Community detection"],
    },
    {
      title: "Visualization + Reporting",
      items: ["Tableau", "Plotly", "Gephi", "Advanced Excel", "Dashboarding", "Analytical reporting"],
    },
    {
      title: "AI + Automation",
      items: ["OpenAI API", "AI agent workflows", "Prompt design", "Tool-based orchestration", "LLM-assisted interpretation", "ChatGPT", "Claude Code", "Codex"],
    },
    {
      title: "Development Tools + Cloud",
      items: ["Git", "GitHub", "AWS", "CI/CD workflows", "Automated deployment"],
    },
  ],
  capabilityStatement:
    "I structure ambiguous analytical problems, identify patterns in complex data and communicate findings clearly to technical and non-technical audiences.",
  experience: [
    {
      role: "Assistant Trainee",
      company: "BUILD",
      location: "Shanghai, China",
      period: "Dec 2020 - Jan 2021",
      points: [
        "Created and refined visual content for the WeChat official account, including article covers and promotional posters.",
        "Improved article presentation through formatting and image selection to enhance readability and audience engagement.",
        "Produced social media content that increased followers by 20% and improved online engagement by 10%.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Applied Economics",
      school: "Australian National University",
      location: "Canberra, ACT",
      date: "Jul 2026",
      details: [
        "GPA: 5.625/7.0",
        "Focus areas: Computing, Statistics and Economics.",
        "Developed advanced skills in quantitative analysis, econometrics, forecasting and evidence-based research.",
      ],
    },
    {
      degree: "Bachelor of Applied Data Analytics",
      school: "Australian National University",
      location: "Canberra, ACT",
      date: "Nov 2023",
      details: [
        "ANU Chancellor's International Scholarship recipient.",
        "Major areas: Computing, Statistics and Social Science.",
        "Relevant coursework: Statistics & Probability, Data Wrangling, Data Analysis, Data Mining, Programming, Online Research Methods and Network Analysis.",
      ],
    },
  ],
  awards: [
    "ANU Chancellor's International Scholarship recipient.",
  ],
  interests: {
    paragraphs: [
      "I am highly optimistic about the future of AI, especially the way large language models can help people organize knowledge, automate repetitive analytical work, and turn ideas into usable systems. I am currently self-learning how to use LLMs to structure what I have studied in economics, statistics, data analytics and programming, and I am experimenting with turning these workflows into agents.",
      "My view is that humans should remain responsible for direction, judgment and decision-making, while AI fills the operational gaps: collecting information, cleaning data, generating analysis, building visualizations and drafting reports. In the future, I hope to combine similar agents into practical applications that make data collection, analysis and visualization faster, more accessible and more reliable.",
      "Outside academic and technical work, I enjoy survival and sandbox games such as Don't Starve and Terraria. One of my long-term creative goals is to use AI to develop an independent open-world survival modular game, combining procedural systems, agent-driven design and interactive world-building.",
    ],
  },
  futureAgent: {
    title: "AI Data Analysis Application",
    description:
      "This is an AI data analysis app powered by a data analysis agent. The system could be defined as an Intelligent Data Analyst Agent System, or an Agent-Based Automated Data Analysis and Visualization Platform.",
    roadmap: [
      "v1: CSV analysis agent",
      "v2: Regression + model comparison",
      "v3: Forecasting and validation",
      "v4: Web text analysis",
      "v5: Multi-agent workflow",
      "v6: Full app with projects, saved reports, dashboards",
    ],
    capabilities: [
      "Analyze webpage text from a URL, extract keyword frequencies, identify themes, generate word clouds and produce Markdown reports.",
      "Support uploaded datasets such as .csv and .dta files, with user-selected variables, interaction terms, regression, classification, prediction and clustering.",
      "Generate interactive visualizations such as scatter plots, line charts, box plots, correlation heatmaps, residual plots, anomaly charts, predicted-versus-actual charts and word clouds.",
      "Run model validation and forecasting through train-test splits, cross-validation, time-series forecasting, residual analysis, overfitting checks, anomaly detection and model stability analysis.",
      "Automatically identify variable types, clean missing values, create descriptive statistics, recommend suitable models, compare results, explain outputs and export reports in Markdown, PDF or Word formats.",
    ],
    process: [
      "User enters a URL or uploads a dataset.",
      "The system reads the data and identifies the structure.",
      "The user selects an analysis goal, or lets the agent explore automatically.",
      "The agent cleans the data, performs feature engineering and runs models.",
      "The system generates interactive charts and checks anomalies, outliers and overfitting.",
      "The agent explains the results, recommends the top models and exports the final report.",
    ],
  },
} as const;
