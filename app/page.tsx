import Image from "next/image";
import { ArrowUp, ArrowUpRight, GitBranch, GraduationCap, LineChart, MapPin, Sparkles } from "lucide-react";
import CsvAnalysis from "@/app/components/csv-analysis";
import SelectedProjects from "@/app/components/selected-projects";
import { dataAnalysisProject, site } from "@/data/site";

const card =
  "rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-xl";

const sectionLinks = [
  { id: "csv-analysis", label: "CSV Analysis" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "interests", label: "Interests" },
  { id: "future-agent", label: "Future Agent" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07080c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-14rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute right-[-10rem] top-[8rem] h-[30rem] w-[30rem] rounded-full bg-emerald-300/12 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[32%] h-[32rem] w-[32rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[length:100%_92px] opacity-30" />
      </div>

      <header id="top" tabIndex={-1} className="relative mx-auto w-full max-w-7xl px-5 pt-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4 text-sm text-white/60">
          <a href={site.github} className="inline-flex items-center gap-2 font-medium text-white/75 hover:text-white">
            <GitBranch className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-200/80" aria-hidden="true" />
            <span>{site.location}</span>
          </div>
        </div>

        <nav aria-label="Page sections" className="mt-4 max-w-3xl">
          <ul className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {sectionLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex h-full min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] px-0.5 py-1 text-center text-xs font-medium leading-tight text-white/80 transition hover:border-cyan-100/30 hover:bg-cyan-100/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:px-1.5 sm:text-sm"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid items-center gap-8 pt-6 pb-10 sm:py-14 md:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <h1 className="text-[clamp(2.5rem,6.1vw,5.5rem)] font-semibold leading-none tracking-tight">
              {site.name}
            </h1>

            <p className="mt-3 text-xl font-medium text-white/88 sm:mt-4 sm:text-2xl">
              {site.role}
            </p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-white/72 sm:mt-4 sm:text-lg">
              {site.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <a
                href="#csv-analysis"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#07080c] transition hover:bg-cyan-100 sm:min-h-12"
              >
                Try CSV Analysis
              </a>
              <a
                href={dataAnalysisProject.link}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/[0.09] sm:min-h-12"
              >
                View Data Analysis Project
                <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] px-5 text-sm font-semibold text-white/76 transition hover:bg-white/[0.09]"
              >
                Email Me
              </a>
            </div>
          </div>

          <PersonalCard />
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-12">
          <section id="csv-analysis" aria-labelledby="csv-analysis-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-6 lg:col-span-12 lg:p-8`}>
            <h2 id="csv-analysis-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">CSV Analysis</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/72">
              Upload a CSV to profile your data, explore correlations and run a linear regression.
            </p>
            <div className="mt-6">
              <CsvAnalysis />
            </div>
          </section>

          <section id="projects" aria-labelledby="projects-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-4 sm:p-6 lg:col-span-12 lg:p-8`}>
            <SelectedProjects />
          </section>

          <section id="skills" aria-labelledby="skills-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-6 lg:col-span-5 lg:p-8`}>
            <SectionLabel icon={<LineChart className="h-4 w-4" />} label="Capabilities" />
            <h2 id="skills-heading" className="mt-5 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Analysis, automation, and clear business communication.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/54">{site.capabilityStatement}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.skills.map((skill) => (
                <div key={skill.title} className="rounded-2xl border border-white/10 bg-black/18 p-5">
                  <h3 className="text-sm font-semibold text-white/90">{skill.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/55">
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className={`${card} p-6 lg:col-span-7 lg:p-8`}>
            <SectionLabel icon={<Sparkles className="h-4 w-4" />} label="Proof" />
            <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-4">
              {site.highlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                  <p className="text-4xl font-semibold tabular-nums text-white">{item.value}</p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-100/70">
                    {item.label}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/50">{item.detail}</p>
                </div>
              ))}
            </div>

            <section aria-labelledby="awards-heading" className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-6">
              <h2 id="awards-heading" className="text-sm font-medium uppercase tracking-[0.2em] text-white/75">Awards</h2>
              <div className="mt-6 space-y-5">
                {site.awards.map((award) => (
                  <p key={award} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/62">
                    {award}
                  </p>
                ))}
              </div>
            </section>

            <section id="experience" aria-labelledby="experience-heading" tabIndex={-1} className="mt-4 scroll-mt-6 rounded-3xl border border-white/10 bg-black/20 p-6">
              <h2 id="experience-heading" className="text-sm font-medium uppercase tracking-[0.2em] text-white/75">Experience</h2>
              {site.experience.map((job) => (
                <article key={`${job.company}-${job.role}`} className="mt-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                      <p className="mt-1 text-white/55">
                        {job.company} - {job.location}
                      </p>
                    </div>
                    <p className="text-sm text-white/42">{job.period}</p>
                  </div>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-white/58">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-200/80" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>
          </div>

          <section id="education" aria-labelledby="education-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel headingId="education-heading" icon={<GraduationCap className="h-4 w-4" />} label="Education" />
            <div className="mt-6 space-y-5">
              {site.education.map((item) => (
                <div key={item.degree} className="flex flex-col gap-2 border-b border-white/10 pb-5 last:border-0 last:pb-0 sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.degree}</h3>
                    <p className="mt-1 text-sm text-white/52">
                      {item.school} - {item.location}
                    </p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/50">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-100/70" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-white/42">{item.date}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="interests" aria-labelledby="interests-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel headingId="interests-heading" icon={<Sparkles className="h-4 w-4" />} label="Interests" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
              {site.interests.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section id="future-agent" aria-labelledby="future-agent-heading" tabIndex={-1} className={`${card} scroll-mt-6 p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel headingId="future-agent-heading" icon={<Sparkles className="h-4 w-4" />} label="Future Agent" />
            <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">Concept</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{site.futureAgent.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/56">{site.futureAgent.description}</p>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35">Roadmap</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/58">
                    {site.futureAgent.roadmap.map((item) => (
                      <li key={item}>{item}</li>
                  ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35">Core Capabilities</p>
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-white/56">
                    {site.futureAgent.capabilities.map((capability) => (
                      <li key={capability} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-100/70" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/35">Process</p>
                  <ol className="mt-5 space-y-3 text-sm leading-7 text-white/56">
                    {site.futureAgent.process.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-xs font-semibold text-white/70">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-white/80 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </section>
    </main>
  );
}

function PersonalCard() {
  return (
    <div className={`${card} mx-auto w-full max-w-[25rem] p-3 sm:p-4`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04]">
        <Image
          src={site.portrait}
          alt={`${site.name} portrait`}
          fill
          preload
          sizes="(max-width: 439px) calc(100vw - 66px), 366px"
          className="object-cover object-[50%_28%]"
        />
      </div>
    </div>
  );
}

function SectionLabel({ headingId, icon, label }: { headingId?: string; icon: React.ReactNode; label: string }) {
  const Label = headingId ? "h2" : "div";

  return (
    <Label id={headingId} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
      <span aria-hidden="true" className="text-cyan-100/70">{icon}</span>
      {label}
    </Label>
  );
}
