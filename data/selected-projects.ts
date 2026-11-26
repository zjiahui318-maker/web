type ProjectId = "used-cars" | "mortgage" | "credit" | "rent";

type ProjectLink = { label: string; href: string };

type SelectedProject = {
  id: ProjectId;
  title: string;
  summary: string;
  finding: string;
  brief: string;
  sources: ProjectLink[];
};

const portfolioGitHub = "https://github.com/zjiahui318-maker/data-analytics-portfolio";
const usedCarGitHub = "https://github.com/zjiahui318-maker/australian-used-car-prices-r";

export const projectGitHub: Record<ProjectId, { code: string; notebook?: string }> = {
  "used-cars": {
    code: usedCarGitHub,
  },
  mortgage: {
    code: `${portfolioGitHub}/tree/main/projects/mortgage-refinancing`,
  },
  credit: {
    code: `${portfolioGitHub}/tree/main/projects/credit-card-default`,
    notebook: `${portfolioGitHub}/blob/main/projects/credit-card-default/credit_card_default.ipynb`,
  },
  rent: {
    code: `${portfolioGitHub}/tree/main/projects/canberra-rent-inflation`,
    notebook: `${portfolioGitHub}/blob/main/projects/canberra-rent-inflation/canberra_rent_inflation.ipynb`,
  },
};

export const selectedProjects: SelectedProject[] = [
  {
    id: "used-cars",
    title: "Australian Used-Car Asking Price Analysis (R)",
    summary: "Used R to compare five models with a baseline on 14,857 Australian used-car listings from 2023.",
    finding: "Random forest ranked first. On 2,970 held-out listings, 62.3% of its estimates were within 20% of the asking price, falling to 22.1% for cars advertised at A$80,000 or above.",
    brief: "/projects/Australian_Used_Car_Asking_Prices_R_Report.pdf",
    sources: [
      { label: "Kaggle: Australian Vehicle Prices, version 1", href: "https://www.kaggle.com/datasets/nelgiriyewithana/australian-vehicle-prices" },
      { label: "GitHub: R model scores and charts", href: `${usedCarGitHub}/tree/main/results` },
    ],
  },
  {
    id: "mortgage",
    title: "Australian Mortgage Market and Bank Comparison",
    summary: "Compared Australian mortgage refinancing at the national level and benchmarked housing loan growth at CBA, NAB and Westpac.",
    finding: "CBA accounted for 60.5% of the three banks’ net housing balance increase in the year to September 2026.",
    brief: "/projects/Australian_Bank_Mortgage_Cases.pdf",
    sources: [
      { label: "APRA Monthly ADI Statistics", href: "https://www.apra.gov.au/news-and-publications/monthly-authorised-deposit-taking-institution-statistics" },
      { label: "RBA Housing Lending Rates, Table F6", href: "https://www.rba.gov.au/statistics/tables/#interest-rates" },
      { label: "ABS Lending Indicators, September quarter 2026", href: "https://www.abs.gov.au/statistics/economy/finance/lending-indicators/sep-quarter-2026" },
    ],
  },
  {
    id: "credit",
    title: "Credit Card Default Early Warning",
    summary: "Tested whether logistic regression identifies more defaults than a delinquency rule when a risk team can review only 10% of clients.",
    finding: "At 600 reviews, logistic regression captured 412 defaults and the delinquency rule captured 414.",
    brief: "/projects/Credit_Card_Default_Model_Validation.pdf",
    sources: [
      { label: "UCI Default of Credit Card Clients dataset and DOI", href: "https://doi.org/10.24432/C55S3H" },
    ],
  },
  {
    id: "rent",
    title: "Rent and Inflation Across Three Australian Cities",
    summary: "Compared rent growth and headline inflation in Canberra, Melbourne and Sydney, showing how the comparison changes with the starting month.",
    finding: "Rents grew more slowly than local CPI in all three cities in the latest year. From April 2024, rents grew faster than CPI in Melbourne and Sydney.",
    brief: "/projects/Canberra_Melbourne_Sydney_Rent_Cases.pdf",
    sources: [
      { label: "ABS September 2026 CPI, Tables 1 and 10", href: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/sep-2026#data-downloads" },
      { label: "ABS September quarter 2025 CPI, Table 9", href: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/sep-quarter-2025#data-downloads" },
    ],
  },
];
