import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "./Section";
import { skillCategories } from "@/lib/portfolio-data";

const techLogos = [
  "ESP32","Arduino","Raspberry Pi","React","Next.js","TypeScript","Node.js","Laravel","Python","Firebase","Supabase","TensorFlow","Docker","Git",
];

export function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === active)!;

  return (
    <SectionShell
      id="skills"
      eyebrow="Skills & Technology"
      title="A toolkit built across hardware, software, and research."
      description="Tools are means, not ends. These are the ones I reach for when the problem fits."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
          {skillCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`group relative shrink-0 rounded-xl border px-4 py-3 text-left text-sm transition-all lg:shrink ${
                active === c.id
                  ? "border-border-strong bg-surface-2 text-foreground"
                  : "border-border bg-surface/60 text-muted-foreground hover:bg-surface"
              }`}
            >
              <div className="font-display font-semibold">{c.name}</div>
              <div className="mt-0.5 hidden text-xs text-muted-foreground lg:block">
                {c.description}
              </div>
            </button>
          ))}
        </div>

        <div className="surface-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              {current.items.map((s) => (
                <div key={s.name} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-display text-sm font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.level}%</div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.85 0.015 260) 0%, oklch(0.55 0.012 260) 100%)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Tech marquee */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-surface/60">
        <div
          className="flex gap-12 py-6"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {[...techLogos, ...techLogos].map((t, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 rounded-lg border border-border bg-surface-2 px-5 py-2.5 text-sm font-medium text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t}
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </SectionShell>
  );
}
