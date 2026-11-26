import { usedCarHoldoutScores, usedCarPriceBands } from "@/data/selected-project-charts";

const copy = "max-w-3xl text-sm leading-7 text-white/75";
const integer = new Intl.NumberFormat("en-AU");
const chartMaximum = 50_000;

export default function UsedCarAnalysis() {
  return (
    <>
      <h4 className="text-base font-semibold">Estimating listed prices from vehicle features</h4>
      <p className={copy}>
        Can vehicle age, mileage and other listing details help estimate the asking price? The analysis used five-fold cross-validation to choose a model, then scored all approaches on the same 2,970 held-out listings. Listings matching on make, model, year, mileage and location were kept together when splitting the data.
      </p>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full table-fixed text-left text-xs leading-5 text-white/80 sm:text-sm">
          <caption className="px-3 py-2 text-left font-semibold text-white sm:px-4">Model scores on 2,970 held-out listings</caption>
          <thead className="bg-white/[0.06] text-white">
            <tr>
              <th scope="col" className="w-1/2 px-3 py-2 sm:px-4">Model</th>
              <th scope="col" className="px-2 py-2 text-right sm:px-4">RMSE (A$)</th>
              <th scope="col" className="px-2 py-2 text-right sm:px-4">Within 20%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {usedCarHoldoutScores.map(({ model, rmse, within20, selected }) => (
              <tr key={model} className={selected ? "bg-cyan-100/10 text-cyan-50" : undefined}>
                <th scope="row" className="px-3 py-2 font-medium sm:px-4">{model}</th>
                <td className="px-2 py-2 text-right tabular-nums sm:px-4">{integer.format(rmse)}</td>
                <td className="px-2 py-2 text-right tabular-nums sm:px-4">{within20.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs leading-6 text-white/70">
        RMSE penalises large errors more heavily; lower is better. Within 20% is the share of estimates no more than 20% above or below the listed price.
      </p>

      <figure aria-labelledby="used-car-error-chart-title">
        <figcaption id="used-car-error-chart-title" className="text-base font-semibold text-white">Average price error was largest for expensive cars</figcaption>
        <p className="mt-1 text-sm text-white/70">Random forest mean absolute error by observed asking price</p>
        <ul className="mt-3 space-y-3">
          {usedCarPriceBands.map(({ label, listings, mae, premium }) => (
            <li key={label}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 text-xs sm:text-sm">
                <span className="text-white/85">{label} <span className="text-white/65">({integer.format(listings)} listings)</span></span>
                <span className="font-medium tabular-nums text-white">A${integer.format(mae)}</span>
              </div>
              <div aria-hidden="true" className="mt-1 h-2 overflow-hidden rounded-sm bg-white/10">
                <div className={`h-full ${premium ? "bg-amber-200" : "bg-cyan-200"}`} style={{ width: `${mae / chartMaximum * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div aria-hidden="true" className="mt-2 flex justify-between text-xs text-white/65"><span>A$0</span><span>A$50,000</span></div>
      </figure>

      <p className={copy}>
        These are historical advertised prices, not completed sales or current valuations. The high-price group makes up just 4.1% of the holdout but accounts for 73.1% of the random forest's squared error. Use the results for rough comparisons rather than relying on a single estimate for an expensive car.
      </p>
    </>
  );
}
