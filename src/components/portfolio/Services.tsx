import { SectionShell, FadeUp } from "./Section";
import { services } from "@/lib/portfolio-data";
import { Check, ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="Engagement models for serious teams."
      description="Whether you need to ship a system, validate an architecture, or strengthen a research output — engagements are scoped tightly and delivered with senior judgment."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => (
          <FadeUp key={s.id} delay={i * 0.05}>
            <div className="surface-card group flex h-full flex-col p-7">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 font-display text-sm font-semibold text-accent">
                  0{i + 1}
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>

              <div className="mt-6 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                Includes
              </div>
              <ul className="mt-3 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-xl border border-border bg-surface p-4">
                <div className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  Outcomes
                </div>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {s.benefits.map((b) => (
                    <li key={b}>— {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </SectionShell>
  );
}
