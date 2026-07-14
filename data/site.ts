export const site = {
  name: "Jiahui Zhang",
  headline: "Jiahui Zhang's Web",
  role: "Data Analyst / Applied Economist",
  location: "Canberra, ACT",
  github: "https://github.com/zjiahui318-maker",
  portrait: "/portrait.jpg",
  summary:
    "Data Analyst with academic qualifications in Applied Data Analytics and Applied Economics, combining strong technical capability with economic and statistical modelling expertise. Proficient in R, SQL, Python, Stata, Tableau, MATLAB and advanced Excel, with experience in data cleaning, wrangling, visualization, econometric analysis, forecasting and predictive modeling.",
  quickFacts: [
    { label: "Focus", value: "Modeling + insights" },
    { label: "Tools", value: "R, SQL, Python, Tableau" },
    { label: "Outcome", value: "+20% followers, +10% engagement" },
  ],
  highlights: [
    {
      value: "20%",
      label: "follower growth",
      detail: "Produced social media content that improved channel visibility.",
    },
    {
      value: "10%",
      label: "engagement lift",
      detail: "Refined formatting and image selection for clearer articles.",
    },
    {
      value: "AWS",
      label: "cloud + devops",
      detail: "Familiar with Git, GitHub, AWS, and CI/CD workflows.",
    },
  ],
  skills: [
    {
      title: "Analytics Programming",
      items: ["R / RStudio", "SQL / MySQL", "Python", "Stata", "MATLAB", "Java"],
    },
    {
      title: "Modeling + Economics",
      items: ["Data cleaning", "Data wrangling", "Visualization", "Econometric analysis", "Forecasting", "Predictive modeling"],
    },
    {
      title: "Reporting + Platforms",
      items: ["Tableau", "Gephi", "Advanced Excel", "AWS", "Git", "GitHub", "CI/CD workflows"],
    },
    {
      title: "AI + Development",
      items: ["OpenAI API", "Claude Code", "Codex", "AI-assisted coding workflows", "Haskell", "SAP"],
    },
  ],
  experience: [
    {
      role: "Assistant Trainee",
      company: "Build",
      location: "Shanghai, China",
      period: "12/2020 - 01/2021",
      points: [
        "Created and refined visual content for a WeChat official account, including article covers and promotional posters.",
        "Improved WeChat articles with formatting and image selection to enhance readability and audience engagement.",
        "Produced social media content that increased followers by 20% and improved online engagement by 10%.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Applied Economics",
      school: "Australian National University",
      location: "Canberra, ACT",
      date: "07/2026",
    },
    {
      degree: "Bachelor of Applied Data Analytics",
      school: "Australian National University",
      location: "Canberra, ACT",
      date: "11/2023",
    },
  ],
  awards: [
    "ANU Chancellor's International Scholarship, 2021.1, Australian National University.",
  ],
  projects: [
    {
      name: "Personal CV Web",
      description: "A clean personal resume website for Jiahui Zhang.",
      link: "https://web-af8ovy3o9-jiahui1.vercel.app/",
    },
  ],
} as const;
