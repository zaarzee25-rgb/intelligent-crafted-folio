import { useMemo, useState } from "react";
import { SectionShell, FadeUp } from "./Section";
import { articles, articleCategories } from "@/lib/portfolio-data";
import { formatDate } from "@/lib/cms";
import { ArrowUpRight, Clock } from "lucide-react";

export function Blog() {
  const [cat, setCat] = useState<(typeof articleCategories)[number]>("All");
  const list = useMemo(
    () => (cat === "All" ? articles : articles.filter((a) => a.category === cat)),
    [cat],
  );
  const [featured, ...rest] = list;

  return (
    <SectionShell
      id="blog"
      eyebrow="Blog & Insights"
      title="Notes on engineering, research, and the work in between."
      description="Long-form writing on what I'm learning — published when there's something worth saying."
    >
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {articleCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
              cat === c
                ? "border-border-strong bg-foreground text-background"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <FadeUp>
          <a
            href="#"
            className="surface-card group mb-6 grid overflow-hidden lg:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(70% 60% at 30% 40%, oklch(0.42 0.012 260), oklch(0.22 0.008 260) 75%)",
                }}
              />
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="absolute left-5 top-5 rounded-md border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase backdrop-blur">
                Featured · {featured.category}
              </div>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {formatDate(featured.date)}
                <span className="h-1 w-1 rounded-full bg-border-strong" />
                <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} min read
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </a>
        </FadeUp>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((a, i) => (
          <FadeUp key={a.id} delay={i * 0.03}>
            <a href="#" className="surface-card group flex h-full flex-col p-6">
              <div className="flex items-center justify-between text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                <span>{a.category}</span>
                <span className="inline-flex items-center gap-1 normal-case">
                  <Clock className="h-3 w-3" /> {a.readMinutes} min
                </span>
              </div>
              <h4 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
                {a.title}
              </h4>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted-foreground">
                <span>{formatDate(a.date)}</span>
                <ArrowUpRight className="h-4 w-4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </a>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
