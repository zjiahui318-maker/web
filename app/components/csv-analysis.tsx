"use client";

import { Download, FileSpreadsheet, LoaderCircle, Play } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

type AnalysisResult = {
  profile: {
    rows: number;
    columns: number;
    missingValues: number;
    numericColumns: string[];
  };
  variables: { x: string; y: string } | null;
  correlation: number | null;
  regression: {
    trainR2: number | null;
    testR2: number | null;
    rmse: number;
    mae: number;
    intercept: number;
    coefficient: number;
    trainRows: number;
    testRows: number;
  } | null;
  charts: {
    scatter: Point[];
    fit: Point[];
    heatmap: { labels: string[]; values: (number | null)[][] };
  };
  warnings: string[];
  report: string;
};

const maxCsvBytes = 1024 * 1024;
const numberFormat = new Intl.NumberFormat("en-AU");
const decimalFormat = new Intl.NumberFormat("en-AU", { maximumSignificantDigits: 4 });
const control = "min-h-11 rounded-xl border border-white/20 bg-[#101822] text-sm text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200";
const panel = "min-w-0 rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-5";

function formatNumber(value: number | null) {
  if (value === null) return "N/A";
  const magnitude = Math.abs(value);
  return magnitude > 0 && (magnitude >= 1e6 || magnitude < 0.001)
    ? value.toExponential(2)
    : decimalFormat.format(value);
}

export default function CsvAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [predictor, setPredictor] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);
  const downloadUrl = useRef<string | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => () => {
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);
  }, []);

  useEffect(() => {
    if (result) resultHeading.current?.focus();
  }, [result]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.currentTarget.files?.[0] ?? null;
    setFile(null);
    setResult(null);
    setPredictor("");
    setResponse("");
    setError("");

    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith(".csv") || selected.size === 0 || selected.size > maxCsvBytes) {
      event.currentTarget.value = "";
      setError("Choose a non-empty .csv file up to 1 MiB.");
      return;
    }

    setFile(selected);
  }

  async function runAnalysis(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || running) return;

    if (predictor && response && predictor === response) {
      setError("Choose different predictor and response columns.");
      return;
    }

    setRunning(true);
    setError("");

    try {
      const query = predictor && response
        ? `?${new URLSearchParams({ x: predictor, y: response })}`
        : "";
      const request = await fetch(`/api/analyze${query}`, {
        method: "POST",
        headers: { "Content-Type": "text/csv" },
        body: file,
        signal: AbortSignal.timeout(30000),
      });
      const payload = await request.json().catch(() => null);

      if (!request.ok || !payload?.profile || !payload.charts || !Array.isArray(payload.warnings) || typeof payload.report !== "string") {
        setError(typeof payload?.error === "string" ? payload.error : "Analysis is temporarily unavailable. Please try again.");
        return;
      }

      const analysis: AnalysisResult = payload;
      setResult(analysis);
      setPredictor(analysis.variables?.x ?? "");
      setResponse(analysis.variables?.y ?? "");
    } catch {
      setError("Could not reach the analysis service. Please try again.");
    } finally {
      setRunning(false);
    }
  }

  function downloadReport() {
    if (!file || !result) return;
    if (downloadUrl.current) URL.revokeObjectURL(downloadUrl.current);

    downloadUrl.current = URL.createObjectURL(new Blob([result.report], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = downloadUrl.current;
    link.download = `${file.name.slice(0, -4)}-analysis.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const numericColumns = result?.profile.numericColumns ?? [];

  return (
    <div className="space-y-6">
      <form onSubmit={runAnalysis} className={panel} aria-busy={running}>
        <label htmlFor="analysis-file" className="flex items-center gap-2 text-sm font-semibold">
          <FileSpreadsheet className="size-4 text-cyan-200" aria-hidden="true" />
          CSV file
        </label>
        <p id="analysis-file-hint" className="mt-2 text-sm leading-relaxed text-white/65">
          UTF-8 with a header row. Up to 1 MiB, 10,000 rows and 50 columns.
          Your file is processed for this request and is never stored by this tool.
        </p>
        <input
          id="analysis-file"
          type="file"
          accept=".csv,text/csv"
          aria-describedby="analysis-file-hint"
          onChange={selectFile}
          disabled={running}
          required
          className={`${control} mt-3 w-full max-w-md px-2 py-1.5 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-100/15 file:px-3 file:py-1.5 file:font-semibold file:text-cyan-100 enabled:cursor-pointer disabled:opacity-60`}
        />

        {numericColumns.length >= 2 && (
          <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
            <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
              Predictor (X)
              <select
                className={`${control} w-full px-3`}
                disabled={running}
                value={predictor}
                onChange={event => setPredictor(event.currentTarget.value)}
              >
                <option value="">Choose a column</option>
                {numericColumns.map(column => <option key={column} value={column}>{column}</option>)}
              </select>
            </label>
            <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
              Response (Y)
              <select
                className={`${control} w-full px-3`}
                disabled={running}
                value={response}
                onChange={event => setResponse(event.currentTarget.value)}
              >
                <option value="">Choose a column</option>
                {numericColumns.map(column => <option key={column} value={column}>{column}</option>)}
              </select>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || running}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-cyan-100 px-5 text-sm font-semibold text-[#07080c] transition enabled:cursor-pointer enabled:hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 disabled:opacity-50"
        >
          {running
            ? <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />
            : <Play className="size-4" aria-hidden="true" />}
          {running ? "Running analysis…" : "Run analysis"}
        </button>
      </form>

      <div role="status" className="sr-only">
        {running ? "Running analysis." : result && !error ? "Analysis complete." : ""}
      </div>
      {error && (
        <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </p>
      )}
      {result && <AnalysisResults result={result} downloadReport={downloadReport} headingRef={resultHeading} />}
    </div>
  );
}

function AnalysisResults({ result, downloadReport, headingRef }: {
  result: AnalysisResult;
  downloadReport: () => void;
  headingRef: React.Ref<HTMLHeadingElement>;
}) {
  const { profile, variables, correlation, regression, charts, warnings } = result;

  return (
    <section aria-labelledby="analysis-results-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="analysis-results-heading" ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-white">Analysis results</h3>
        <button
          type="button"
          onClick={downloadReport}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-cyan-200/35 bg-cyan-200/10 px-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-200/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
        >
          <Download className="size-4" aria-hidden="true" />
          Download Markdown report
        </button>
      </div>

      <div className={panel}>
        <h4 className="text-base font-semibold">Data profile</h4>
        <MetricList metrics={[
          ["Rows", numberFormat.format(profile.rows)],
          ["Columns", numberFormat.format(profile.columns)],
          ["Missing cells", numberFormat.format(profile.missingValues)],
          ["Numeric columns", numberFormat.format(profile.numericColumns.length)],
        ]} />
      </div>

      {warnings.length > 0 && (
        <ul className="list-disc space-y-1 rounded-xl border border-amber-200/20 bg-amber-200/8 py-3 pl-8 pr-4 text-sm leading-relaxed text-amber-100">
          {warnings.map(warning => <li key={warning}>{warning}</li>)}
        </ul>
      )}

      {variables && (
        <div className={panel}>
          <h4 className="text-base font-semibold">{regression ? "Linear regression" : "Variable relationship"}</h4>
          <p className="mt-1 break-words text-sm text-white/65">
            Predictor: {variables.x} · Response: {variables.y}
          </p>
          <MetricList metrics={[
            ["Pearson r", formatNumber(correlation)],
            ...(regression ? [
              ["Test R²", formatNumber(regression.testR2)],
              ["Test RMSE", formatNumber(regression.rmse)],
              ["Test MAE", formatNumber(regression.mae)],
            ] as [string, string][] : []),
          ]} />
        </div>
      )}

      {variables && (charts.scatter.length > 0 || charts.fit.length > 0) && (
        <div className="grid gap-4 lg:grid-cols-2">
          {charts.scatter.length > 0 && (
            <PointChart title="Scatter plot" xLabel={variables.x} yLabel={variables.y} points={charts.scatter} />
          )}
          {charts.fit.length > 0 && (
            <PointChart
              title="Actual vs predicted"
              xLabel={`Actual ${variables.y}`}
              yLabel={`Predicted ${variables.y}`}
              points={charts.fit}
              equalityLine
            />
          )}
        </div>
      )}

      {charts.heatmap.labels.length > 0 && (
        <CorrelationHeatmap labels={charts.heatmap.labels} values={charts.heatmap.values} />
      )}
    </section>
  );
}

function MetricList({ metrics }: { metrics: [string, string][] }) {
  return (
    <dl className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map(([label, value]) => (
        <div key={label} className="min-w-0 rounded-xl bg-white/5 px-3 py-2">
          <dt className="text-xs text-white/65">{label}</dt>
          <dd className="mt-1 break-words text-lg font-semibold tabular-nums text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function PointChart({ title, xLabel, yLabel, points, equalityLine = false }: {
  title: string;
  xLabel: string;
  yLabel: string;
  points: Point[];
  equalityLine?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const render = () => drawPointChart(canvas, points, equalityLine);
    render();
    const resize = new ResizeObserver(render);
    resize.observe(canvas);
    return () => resize.disconnect();
  }, [points, equalityLine]);

  return (
    <figure className={panel}>
      <figcaption className="text-base font-semibold">{title}</figcaption>
      <p className="mt-1 break-words text-xs text-white/70">Y: {yLabel}</p>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${title}. X axis: ${xLabel}. Y axis: ${yLabel}. ${numberFormat.format(points.length)} points shown.`}
        className="mt-2 block h-48 w-full sm:h-56"
      />
      <p className="break-words text-center text-xs text-white/70">X: {xLabel}</p>
      {equalityLine && <p className="mt-2 text-xs text-white/65">Dashed line: predicted equals actual.</p>}
    </figure>
  );
}

function drawPointChart(canvas: HTMLCanvasElement, points: Point[], equalityLine: boolean) {
  const { width, height } = canvas.getBoundingClientRect();
  const context = canvas.getContext("2d");
  if (!context || width < 100 || height < 80) return;

  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  context.setTransform(scale, 0, 0, scale, 0, 0);

  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  for (const point of points) {
    xMin = Math.min(xMin, point.x);
    xMax = Math.max(xMax, point.x);
    yMin = Math.min(yMin, point.y);
    yMax = Math.max(yMax, point.y);
  }

  if (equalityLine) {
    xMin = yMin = Math.min(xMin, yMin);
    xMax = yMax = Math.max(xMax, yMax);
  }

  const left = 58;
  const right = width - 36;
  const top = 12;
  const bottom = height - 24;
  const position = (value: number, min: number, max: number) => {
    if (min === max) return 0.5;
    const range = max - min;
    return Number.isFinite(range)
      ? (value - min) / range
      : (value / 2 - min / 2) / (max / 2 - min / 2);
  };
  const plotX = (value: number) => left + position(value, xMin, xMax) * (right - left);
  const plotY = (value: number) => bottom - position(value, yMin, yMax) * (bottom - top);
  const ticks = width < 340 ? 2 : 4;

  context.font = "11px system-ui, sans-serif";
  context.fillStyle = "#bdcbd4";
  context.strokeStyle = "#ffffff24";
  for (let index = 0; index <= ticks; index += 1) {
    const fraction = index / ticks;
    const x = left + fraction * (right - left);
    const y = bottom - fraction * (bottom - top);

    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.moveTo(x, top);
    context.lineTo(x, bottom);
    context.stroke();

    context.textAlign = "center";
    if (xMin !== xMax || index === ticks / 2) {
      context.fillText(formatNumber((1 - fraction) * xMin + fraction * xMax), x, bottom + 16);
    }
    context.textAlign = "right";
    if (yMin !== yMax || index === ticks / 2) {
      context.fillText(formatNumber((1 - fraction) * yMin + fraction * yMax), left - 6, y + 4);
    }
  }

  if (equalityLine) {
    context.strokeStyle = "#c3cfd7";
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(left, bottom);
    context.lineTo(right, top);
    context.stroke();
    context.setLineDash([]);
  }

  context.fillStyle = "#88eaf7bb";
  for (const point of points) {
    context.beginPath();
    context.arc(plotX(point.x), plotY(point.y), 3, 0, Math.PI * 2);
    context.fill();
  }
}

function CorrelationHeatmap({ labels, values }: { labels: string[]; values: (number | null)[][] }) {
  return (
    <div className={panel}>
      <h4 id="analysis-heatmap-heading" className="mb-2 text-base font-semibold text-white">Correlation heatmap</h4>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users must be able to scroll a wide correlation table. */}
      <section aria-labelledby="analysis-heatmap-heading" tabIndex={0} className="overflow-x-auto rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">
        <table className="w-max min-w-full border-separate border-spacing-1 text-center text-xs">
          <thead>
            <tr>
              <td />
              {labels.map(label => <th key={label} scope="col" className="max-w-32 break-all px-2 py-1 font-medium text-white/75">{label}</th>)}
            </tr>
          </thead>
          <tbody>
            {labels.map((label, row) => (
              <tr key={label}>
                <th scope="row" className="max-w-32 break-all px-2 py-1 text-left font-medium text-white/75">{label}</th>
                {labels.map((column, index) => {
                  const value = values[row]?.[index] ?? null;
                  const color = value === null
                    ? "#ffffff09"
                    : `rgb(${value < 0 ? "251 113 133" : "34 211 238"} / ${Math.abs(value) * 0.32 + 0.06})`;
                  return (
                    <td key={column} className="min-w-14 rounded px-2 py-2 tabular-nums text-white" style={{ backgroundColor: color }}>
                      {value === null ? "N/A" : value.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <p className="mt-2 text-xs text-white/65">Pink indicates negative correlation. Cyan indicates positive correlation.</p>
    </div>
  );
}
