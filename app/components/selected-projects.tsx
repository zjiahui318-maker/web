import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { MortgageBankChart, RentInflationCharts } from "@/app/components/selected-project-charts";
import { projectGitHub, selectedProjects } from "@/data/selected-projects";

const action = "inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-white/85 transition hover:border-cyan-100/40 hover:bg-cyan-100/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
const disclosure = `${action} cursor-pointer list-none [&::-webkit-details-marker]:hidden`;
const copy = "max-w-3xl text-sm leading-7 text-white/75";

const projectDetails = {
  mortgage: MortgageDetail,
  credit: CreditDetail,
  rent: RentDetail,
};

export default function SelectedProjects() {
  return (
    <>
      <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">Selected Projects</h2>
      <p className="mt-3 text-sm leading-7 text-white/72">Independent portfolio projects in banking analytics, model evaluation and applied economics.</p>
      <div className="mt-6 space-y-4">
        {selectedProjects.map((project) => {
          const Detail = projectDetails[project.id];
          const github = projectGitHub[project.id];

          return (
            <article key={project.id} aria-labelledby={`${project.id}-title`} className="min-w-0 rounded-3xl border border-white/10 bg-black/20 p-4 sm:p-6">
              <h3 id={`${project.id}-title`} className="text-xl font-semibold text-white">{project.title}</h3>
              <p className={`mt-2 ${copy}`}>{project.summary}</p>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-7 text-cyan-100">{project.finding}</p>

              <div className="mt-4 flex flex-wrap items-start gap-2">
                <a href={project.brief} target="_blank" rel="noreferrer" className={action}>
                  <FileText className="size-4" aria-hidden="true" />
                  Read Brief
                </a>
                <ExternalLink href={github.code} label="View Code & Data" />
                {github.notebook && <ExternalLink href={github.notebook} label="View Notebook" />}
                <details className="group/sources min-w-0 open:basis-full">
                  <summary className={disclosure}>
                    Data Sources
                    <ChevronDown className="size-4 group-open/sources:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="mt-3 space-y-2 border-l border-white/15 pl-4 text-sm leading-6">
                    {project.sources.map((source) => (
                      <li key={source.href}>
                        <a href={source.href} target="_blank" rel="noreferrer" className="break-words text-cyan-100 underline decoration-cyan-100/40 underline-offset-4 hover:decoration-cyan-100">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>

              <details className="group/analysis mt-4 border-t border-white/10 pt-4">
                <summary className={disclosure}>
                  View analysis
                  <ChevronDown className="size-4 group-open/analysis:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-5 space-y-4">
                  <Detail />
                </div>
              </details>
            </article>
          );
        })}
      </div>
    </>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={action}>
      {label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
}

function MortgageDetail() {
  return (
    <>
      <h4 className="text-base font-semibold">Three-bank comparison</h4>
      <p className={copy}>
        How did housing loan balances change at CBA, NAB and Westpac? The analysis matches the three legal entities by ABN in APRA’s September 2026 back series (Table 1) and checks the final month against the September issue (Table 2).
      </p>
      <p className={copy}>
        In the 12 months to September 2026, total housing loan balances grew 6.60% at CBA, 3.72% at NAB and 2.73% at Westpac. The combined balance grew 4.59%, and CBA accounted for 60.5% of the net increase. CBA’s investment balances grew faster than its owner-occupied balances. Owner-occupied lending led NAB’s growth. Westpac’s two segments grew at similar rates.
      </p>
      <MortgageBankChart />
      <p className={copy}>
        These outstanding balances cover the selected entities’ Australian books. They do not measure new lending, refinancing, market share or churn.
      </p>
      <h4 className="text-base font-semibold">National refinancing</h4>
      <p className={copy}>
        The national analysis matched quarterly averages of RBA F6 mortgage rates with seasonally adjusted ABS external refinancing commitment counts by loan purpose. Across 29 quarters from 2019 Q3 to 2026 Q3, changes in the all-loan pricing gap showed little same-quarter association with external refinancing growth. The Pearson correlations were −0.02 for owner-occupiers and +0.04 for investors.
      </p>
      <p className={copy}>
        This is a descriptive comparison of national rates and commitments. It does not establish causation or support bank-level conclusions.
      </p>
    </>
  );
}

function CreditDetail() {
  return (
    <>
      <h4 className="text-base font-semibold">Model validation at 10% review capacity</h4>
      <p className={copy}>
        Can a model find more next-month defaults than a delinquency rule with the same review budget? The study used 30,000 anonymised Taiwanese client records from 2005. Both methods ranked the same 6,000 held-out clients and were evaluated at a fixed budget of 600 reviews.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035]">
        <table className="w-full table-fixed text-left text-xs leading-5 text-white/80 sm:text-sm">
          <caption className="px-3 py-2 text-left font-semibold text-white sm:px-4">Held-out results per 600 reviews</caption>
          <thead className="bg-white/[0.06] text-white">
            <tr>
              <th scope="col" className="w-[48%] px-3 py-2 sm:px-4">Method</th>
              <th scope="col" className="px-2 py-2 text-right sm:px-4">Defaults found</th>
              <th scope="col" className="px-3 py-2 text-right sm:px-4">ROC AUC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            <tr>
              <th scope="row" className="px-3 py-2 font-medium sm:px-4">Delinquency rule</th>
              <td className="px-2 py-2 text-right tabular-nums sm:px-4">414</td>
              <td className="px-3 py-2 text-right tabular-nums sm:px-4">0.722</td>
            </tr>
            <tr>
              <th scope="row" className="px-3 py-2 font-medium sm:px-4">Logistic regression</th>
              <td className="px-2 py-2 text-right tabular-nums sm:px-4">412</td>
              <td className="px-3 py-2 text-right tabular-nums sm:px-4">0.766</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className={copy}>
        Logistic regression ranked clients better overall. At the operating cutoff, it captured two fewer defaults. The paired 95% bootstrap interval for the model minus rule was −17 to +10 defaults per 600 reviews, conditional on the fitted scores.
      </p>
      <p className={copy}>
        The study measures potential review coverage. Defaults prevented were outside its scope. The issuer is unnamed, and the result has not been validated for present-day Australian banks. UCI is the original provider. The CSV came from the pinned scikit-learn mirror.
      </p>
    </>
  );
}

const cityComparison = [
  { city: "Canberra", rent: "1.40%", cpi: "4.65%", gap: "−5.56 pp" },
  { city: "Melbourne", rent: "2.47%", cpi: "4.01%", gap: "+1.36 pp" },
  { city: "Sydney", rent: "3.48%", cpi: "4.31%", gap: "+1.76 pp" },
];

function RentDetail() {
  return (
    <>
      <h4 className="text-base font-semibold">Monthly rent and headline inflation</h4>
      <p className={copy}>
        How does the choice of starting month change the comparison? The charts use 30 common months of ABS rent and all-groups CPI data from April 2024 to September 2026. Each series starts at 100 in April 2024. The quarterly panel was analysed separately.
      </p>
      <RentInflationCharts />
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035]">
        <table className="w-full table-fixed text-left text-xs leading-5 text-white/80 sm:text-sm">
          <caption className="px-3 py-2 text-left font-semibold text-white sm:px-4">Cross-city comparison to September 2026</caption>
          <thead className="bg-white/[0.06] text-white">
            <tr>
              <th scope="col" className="w-[30%] px-2 py-2 sm:px-4">City</th>
              <th scope="col" className="px-1 py-2 text-right sm:px-4">Rent, YoY</th>
              <th scope="col" className="px-1 py-2 text-right sm:px-4">CPI, YoY</th>
              <th scope="col" className="w-[31%] px-2 py-2 text-right sm:px-4">Gap since Apr 2024</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {cityComparison.map(({ city, rent, cpi, gap }) => (
              <tr key={city}>
                <th scope="row" className="px-2 py-2 font-medium sm:px-4">{city}</th>
                <td className="px-1 py-2 text-right tabular-nums sm:px-4">{rent}</td>
                <td className="px-1 py-2 text-right tabular-nums sm:px-4">{cpi}</td>
                <td className="px-2 py-2 text-right tabular-nums sm:px-4">{gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-6 text-white/70">
        Based on Australian Bureau of Statistics data. YoY means year on year. The gap is cumulative rent growth minus CPI growth in percentage points.
      </p>
      <p className={copy}>
        Rents grew more slowly than local CPI in all three cities over the latest year. From April 2024, rents outpaced CPI in Melbourne and Sydney. The ABS rent index tracks changes in rents paid. Weekly dollar rents, advertised listings and rent-to-income affordability are outside its scope.
      </p>
    </>
  );
}
