# Jiahui Zhang Resume

A personal resume website with an interactive CSV analysis tool, built with Next.js, TypeScript, Tailwind CSS, and Python.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

All editable resume content lives in `data/site.ts`.

## Run CSV analysis locally

With Python 3.12 installed, create and activate a virtual environment, then start the analysis API in a separate terminal:

```bash
python -m venv .venv
# macOS/Linux: source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m api.analyze
```

Open `http://localhost:3000/#csv-analysis` with `npm run dev` running. Next.js proxies `/api/analyze` to the local Python server on port 5328. On Vercel the same route is served by the Python Function at `api/analyze.py`.

The web tool adapts the profiling, correlation, and regression steps from [Simple Data Analysis Agent](https://github.com/zjiahui318-maker/simple-data-analysis-agent). It uses local statistical interpretation and returns chart data and Markdown in the analysis response. CSV uploads are processed in memory for each request. No API key is required.
