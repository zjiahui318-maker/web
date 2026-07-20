import Image from "next/image";
import { ArrowUpRight, GitBranch, GraduationCap, LineChart, MapPin, Sparkles } from "lucide-react";
import { site } from "@/data/site";

const card =
  "rounded-[28px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/30 backdrop-blur-xl";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07080c] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute left-[-14rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-cyan-400/18 blur-3xl" />
        <div className="absolute right-[-10rem] top-[8rem] h-[30rem] w-[30rem] rounded-full bg-emerald-300/12 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-[32%] h-[32rem] w-[32rem] rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[length:100%_92px] opacity-30" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between text-sm text-white/60">
          <a href={site.github} className="font-medium tracking-wide text-white/75">
            {site.name}
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-200/80" aria-hidden="true" />
            <span>{site.location}</span>
          </div>
        </nav>

        <div className="grid flex-1 items-center gap-8 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-amber-200" aria-hidden="true" />
              Data analytics x economics x AI automation
            </div>

            <h1 className="max-w-3xl text-[clamp(3.65rem,9vw,8.8rem)] font-semibold leading-[0.9] tracking-normal text-white">
              {site.headline}
            </h1>

            <p className="mt-8 text-2xl font-medium tracking-normal text-white/88 sm:text-3xl">
              {site.role}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
              {site.summary}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#07080c" }}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-cyan-100"
              >
                <GitBranch className="h-4 w-4" aria-hidden="true" />
                View GitHub
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
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

        <div className="grid gap-4 pb-8 md:grid-cols-3">
          {site.quickFacts.map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/36">{fact.label}</p>
              <p className="mt-2 text-lg font-medium text-white/86">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className={`${card} p-6 lg:col-span-5 lg:p-8`}>
            <SectionLabel icon={<LineChart className="h-4 w-4" />} label="Capabilities" />
            <h2 className="mt-5 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
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
          </div>

          <div className={`${card} p-6 lg:col-span-7 lg:p-8`}>
            <SectionLabel icon={<Sparkles className="h-4 w-4" />} label="Proof" />
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {site.highlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6">
                  <p className="text-5xl font-semibold tracking-normal text-white">{item.value}</p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-cyan-100/70">
                    {item.label}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/50">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">Awards + Projects</p>
              <div className="mt-6 space-y-5">
                {site.awards.map((award) => (
                  <p key={award} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/62">
                    {award}
                  </p>
                ))}
                {site.projects.map((project) => (
                  <a
                    key={project.name}
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-cyan-100/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                      <ArrowUpRight className="h-4 w-4 text-white/45 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-100" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-white/52">{project.description}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-6 text-white/48">
                      {project.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-200/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/35">Experience</p>
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
            </div>
          </div>

          <div className={`${card} p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel icon={<GraduationCap className="h-4 w-4" />} label="Education" />
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
          </div>

          <div className={`${card} p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel icon={<Sparkles className="h-4 w-4" />} label="Interests" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/58 sm:text-base sm:leading-8">
              {site.interests.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className={`${card} p-6 lg:col-span-12 lg:p-8`}>
            <SectionLabel icon={<Sparkles className="h-4 w-4" />} label="Future Agent" />
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
          </div>
        </div>
      </section>
    </main>
  );
}

function PersonalCard() {
  return (
    <aside className={`${card} relative mx-auto w-full max-w-[31rem] overflow-hidden p-4 sm:p-5`}>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-200/16 to-transparent" />
      <div className="relative grid gap-4">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
          <Image
            src={site.portrait}
            alt={`${site.name} portrait`}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 460px"
            className="object-cover object-[50%_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-3xl font-semibold tracking-normal">{site.name}</p>
            <p className="mt-2 text-sm text-white/60">{site.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="rounded-3xl border border-white/10 bg-black/22 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/36">Signal</p>
            <p className="mt-3 text-2xl font-semibold text-white">Data to action</p>
          </div>
          <div className="grid h-full w-28 place-items-center rounded-3xl border border-white/10 bg-white/[0.045]">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-cyan-100/20 bg-[conic-gradient(from_160deg,rgba(165,243,252,0.95),rgba(187,247,208,0.92),rgba(253,230,138,0.9),rgba(255,255,255,0.12))] p-1">
              <div className="grid h-full w-full place-items-center rounded-full bg-[#090b10] text-sm font-semibold">
                ANU
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/48">
      <span className="text-cyan-100/70">{icon}</span>
      {label}
    </div>
  );
}
