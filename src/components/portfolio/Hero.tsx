import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { profile, stats } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-28 lg:pt-32">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="absolute inset-0 -z-10 noise-bg opacity-50" />

      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for select engagements · Q3 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[1.02]"
            >
              <span className="text-gradient">Building intelligent systems through </span>
              <span className="text-foreground">IoT</span>
              <span className="text-gradient">, </span>
              <span className="text-foreground">software</span>
              <span className="text-gradient">, and </span>
              <span className="text-foreground">research</span>
              <span className="text-gradient">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg"
            >
              {profile.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)]"
              >
                View Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.resumeUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-5 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-border-strong"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact me →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-12 flex items-center gap-2 text-xs text-muted-foreground"
            >
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
              <span className="mx-2 h-1 w-1 rounded-full bg-border-strong" />
              <Sparkles className="h-3.5 w-3.5" /> {profile.role}
            </motion.div>
          </div>

          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="surface-card relative aspect-[4/5] overflow-hidden rounded-3xl p-1">
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-surface-2">
                {/* Decorative portrait placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 35%, oklch(0.4 0.012 260) 0%, oklch(0.22 0.008 260) 70%)",
                  }}
                />
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="font-display text-[8rem] font-semibold text-foreground/10">{profile.initials}</div>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-background/70 p-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-foreground">{profile.name}</div>
                      <div className="text-muted-foreground">IoT Engineer · Researcher</div>
                    </div>
                    <div className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                      v.2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-background/60 p-6 text-center backdrop-blur sm:p-8 sm:text-left">
              <div className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
