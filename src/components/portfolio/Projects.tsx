import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { SectionShell, FadeUp } from "./Section";
import { projects, projectFilters } from "@/lib/portfolio-data";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <SectionShell
      id="projects"
      eyebrow="Featured Projects"
      title="A selection of work, across hardware, web, and research."
      description="Twelve representative projects from the last few years. Each shipped to real users or peer review."
    >
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {projectFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              filter === f
                ? "border-border-strong bg-foreground text-background"
                : "border-border bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <FadeUp key={p.id} delay={i * 0.04}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="surface-card group flex h-full flex-col overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `
                      radial-gradient(80% 60% at ${20 + (i * 13) % 60}% ${30 + (i * 7) % 40}%, oklch(0.4 0.012 260) 0%, oklch(0.22 0.008 260) 70%),
                      linear-gradient(135deg, oklch(0.3 0.01 260), oklch(0.2 0.008 260))
                    `,
                  }}
                />
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase backdrop-blur">
                  {p.category}
                </div>
                <div className="absolute right-4 top-4 text-[11px] font-medium tracking-wider text-muted-foreground">
                  {p.year}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="font-display text-xl font-semibold leading-tight text-foreground">
                    {p.title}
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm text-muted-foreground">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[11px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 border-t border-border pt-4">
                  {p.github && (
                    <a href={p.github} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground hover:bg-surface-2">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground hover:bg-surface-2">
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                  <a href="#" className="ml-auto text-xs text-muted-foreground hover:text-foreground">
                    Details →
                  </a>
                </div>
              </div>
            </motion.article>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
