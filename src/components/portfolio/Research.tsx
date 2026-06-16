import { SectionShell, FadeUp } from "./Section";
import { research } from "@/lib/portfolio-data";
import { FileText, ExternalLink } from "lucide-react";

const typeAccent: Record<string, string> = {
  Journal: "bg-emerald-400",
  Conference: "bg-sky-400",
  Thesis: "bg-amber-400",
  Preprint: "bg-violet-400",
};

export function ResearchSection() {
  return (
    <SectionShell
      id="research"
      eyebrow="Research & Publications"
      title="Published work, conference talks, and applied studies."
      description="Selected outputs from the IoT, embedded ML, and human-centered systems research I've contributed to."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {research.map((r, i) => (
          <FadeUp key={r.id} delay={i * 0.04}>
            <article className="surface-card group h-full p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 rounded-full ${typeAccent[r.type] ?? "bg-accent"}`} />
                <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  {r.type} · {r.year}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-foreground">
                {r.title}
              </h3>
              <div className="mt-1 text-sm italic text-muted-foreground">{r.venue}</div>
              <p className="mt-4 text-sm text-muted-foreground">{r.abstract}</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <a
                  href={r.link ?? "#"}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground hover:bg-surface-2"
                >
                  <FileText className="h-3.5 w-3.5" /> Read paper
                </a>
                <a
                  href={r.link ?? "#"}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  Open venue <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
