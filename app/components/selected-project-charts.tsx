import { cityRentInflation, mortgageBankChanges } from "@/data/selected-project-charts";

const chartPanel = "min-w-0 rounded-2xl border border-white/10 bg-black/25 p-4";
const cyan = "#a5f3fc";
const amber = "#fcd48a";
const valueFormat = new Intl.NumberFormat("en-AU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function MortgageBankChart() {
  const axisMaximum = 40;
  const ticks = [0, 10, 20, 30, 40];
  const grid = "grid grid-cols-[3rem_minmax(0,1fr)_2.5rem] items-center gap-x-2 sm:grid-cols-[4.5rem_minmax(0,1fr)_4rem] sm:gap-x-3";

  return (
    <figure aria-labelledby="housing-balance-chart-title" className={chartPanel}>
      <figcaption id="housing-balance-chart-title" className="text-base font-semibold text-white">
        Change in housing loan balances by purpose
      </figcaption>
      <p className="mt-1 text-sm text-white/70">September 2025 to September 2026 · AUD billions</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/80">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-sm" style={{ backgroundColor: cyan }} />
          Owner-occupied
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-sm" style={{ backgroundColor: amber }} />
          Investment
        </li>
      </ul>

      <ul className="mt-4 space-y-3">
        {mortgageBankChanges.map(({ bank, ownerOccupied, investment }) => {
          const total = ownerOccupied + investment;
          return (
            <li key={bank} className={grid}>
              <span className="text-xs font-semibold text-white/85 sm:text-sm">{bank}</span>
              <svg
                role="img"
                aria-label={`${valueFormat.format(ownerOccupied)} billion owner-occupied and ${valueFormat.format(investment)} billion investment, in Australian dollars`}
                viewBox={`0 0 ${axisMaximum} 1`}
                preserveAspectRatio="none"
                className="h-4 w-full overflow-visible"
              >
                <rect width={axisMaximum} height={1} fill="white" fillOpacity="0.06" />
                <rect width={ownerOccupied} height={1} fill={cyan} />
                <rect x={ownerOccupied} width={investment} height={1} fill={amber} />
                <line x1={ownerOccupied} x2={ownerOccupied} y1="0" y2="1" stroke="#0c1016" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="text-right text-xs font-medium tabular-nums text-white/85 sm:text-sm">
                {valueFormat.format(total)}
              </span>
            </li>
          );
        })}
      </ul>
      <div className={`${grid} mt-2`} aria-hidden="true">
        <div className="relative col-start-2 h-5 border-t border-white/20 text-xs tabular-nums text-white/65">
          {ticks.map((tick) => (
            <span
              key={tick}
              className={`absolute top-1 -translate-x-1/2 ${tick % 20 !== 0 ? "hidden sm:block" : ""}`}
              style={{ left: `${tick / axisMaximum * 100}%` }}
            >
              {tick}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/80">
        CBA’s outstanding balance rose by AUD 39.78 billion. Westpac’s rose by AUD 13.43 billion and NAB’s by AUD 12.58 billion.
      </p>
      <p className="mt-1 text-xs leading-5 text-white/65">
        Based on APRA MADIS, September 2026 back series (Table 1) and monthly issue (Table 2). © APRA 2024, CC BY 3.0 Australia.
      </p>
    </figure>
  );
}

const indexMinimum = 98;
const indexMaximum = 110;
const indexTicks = [98, 100, 102, 104, 106, 108, 110];
const monthTicks = [
  { month: "2024-04", label: "Apr ’24" },
  { month: "2025-07", label: "Jul ’25" },
  { month: "2026-09", label: "Sep ’26" },
];

function indexPosition(value: number) {
  return (indexMaximum - value) / (indexMaximum - indexMinimum) * 100;
}

export function RentInflationCharts() {
  return (
    <div>
      <p className="text-sm text-white/70">Monthly index, April 2024 = 100 · April 2024 to September 2026</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/80">
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="w-5 border-t-2" style={{ borderColor: cyan }} />
          Rents
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden="true" className="w-5 border-t-2 border-dashed" style={{ borderColor: amber }} />
          All-groups CPI
        </li>
      </ul>

      <div className="mt-3 grid gap-3 xl:grid-cols-3">
        {cityRentInflation.map(({ city, values }) => (
          <CityIndexChart key={city} city={city} values={values} />
        ))}
      </div>

      <p className="mt-3 text-xs leading-5 text-white/65">
        Based on Australian Bureau of Statistics data, September 2026 CPI, Tables 1 and 10.
      </p>
    </div>
  );
}

type CityIndexPoint = { month: string; rent: number; cpi: number };

function CityIndexChart({ city, values }: { city: string; values: readonly CityIndexPoint[] }) {
  const xPosition = (index: number) => index / (values.length - 1) * 100;
  const points = (measure: "rent" | "cpi") => values.map((value, index) =>
    `${xPosition(index)},${indexPosition(value[measure])}`,
  ).join(" ");
  const finalValue = values[values.length - 1];
  const cityId = `rent-index-${city.toLowerCase()}`;

  return (
    <figure aria-labelledby={cityId} className={chartPanel}>
      <figcaption id={cityId} className="text-base font-semibold text-white">{city}</figcaption>
      <div className="relative mt-4 mb-8 h-36 ml-9 mr-2" aria-hidden="true">
        {indexTicks.map((value) => (
          <span
            key={value}
            className="absolute right-full mr-2 -translate-y-1/2 text-xs tabular-nums text-white/70"
            style={{ top: `${indexPosition(value)}%` }}
          >
            {value}
          </span>
        ))}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          {indexTicks.map((value) => (
            <line
              key={value}
              x1="0"
              x2="100"
              y1={indexPosition(value)}
              y2={indexPosition(value)}
              stroke="white"
              strokeOpacity={value === 100 ? 0.28 : 0.12}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <polyline points={points("rent")} fill="none" stroke={cyan} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <polyline points={points("cpi")} fill="none" stroke={amber} strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </svg>
        {monthTicks.map(({ month, label }, index) => (
          <span
            key={month}
            className="absolute top-full mt-2 whitespace-nowrap text-xs text-white/70"
            style={{
              left: `${xPosition(values.findIndex((value) => value.month === month))}%`,
              transform: `translateX(-${index === 0 ? 0 : index === monthTicks.length - 1 ? 100 : 50}%)`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
      <p className="text-sm leading-6 text-white/80">
        September 2026 index values were {valueFormat.format(finalValue.rent)} for rents and {valueFormat.format(finalValue.cpi)} for all-groups CPI.
      </p>
    </figure>
  );
}
