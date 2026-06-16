import { SectionShell, FadeUp } from "./Section";
import { education, timeline, values } from "@/lib/portfolio-data";
import { GraduationCap, Quote } from "lucide-react";

export function About() {
  return (
    <SectionShell
      id="about"
      eyebrow="About"
      title="An engineer who treats systems like long-form arguments."
      description="I've spent the last five years moving between embedded labs, production codebases, and research groups. The throughline: building things that survive contact with reality."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Bio + mission */}
        <FadeUp className="lg:col-span-7">
          <div className="surface-card relative p-8 sm:p-10">
            <Quote className="h-6 w-6 text-accent/60" />
            <p className="mt-4 text-pretty text-lg leading-relaxed text-foreground/90">
              I design IoT platforms, ship fullstack software, and publish applied research at the
              intersection of hardware, cloud, and humans. My goal is simple: build systems that an
              operator can trust at 3am, a researcher can cite in five years, and a founder can grow
              into.
            </p>
            <p className="mt-6 text-muted-foreground">
              I work best with teams that take engineering seriously and treat their users as
              collaborators. I read papers before writing code, write down decisions, and prefer
              boring technology unless the problem demands otherwise.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="rounded-xl border border-border bg-surface p-5">
                  <div className="font-display text-base font-semibold">{v.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{v.body}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Timeline + education */}
        <FadeUp delay={0.1} className="lg:col-span-5">
          <div className="surface-card p-8 sm:p-10">
            <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Career
            </div>
            <ol className="mt-6 space-y-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative pl-6">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-accent" />
                  <span className="absolute left-[3px] top-4 h-full w-px bg-border" />
                  <div className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                    {t.year}
                  </div>
                  <div className="mt-0.5 font-display text-base font-semibold">{t.title}</div>
                  <div className="text-sm text-muted-foreground">{t.org}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="surface-card mt-6 p-8">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <GraduationCap className="h-4 w-4" /> Education
            </div>
            <ul className="mt-5 space-y-4">
              {education.map((e) => (
                <li key={e.degree} className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-sm font-semibold">{e.degree}</div>
                    <div className="text-sm text-muted-foreground">{e.school}</div>
                  </div>
                  <div className="shrink-0 rounded-md border border-border bg-surface px-2 py-1 text-[11px] text-muted-foreground">
                    {e.year}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </SectionShell>
  );
}
