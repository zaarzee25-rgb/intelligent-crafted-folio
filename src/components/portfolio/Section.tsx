import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32 lg:py-40">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{title}</span>
          </h2>
          {description && (
            <p className="mt-6 text-pretty text-base text-muted-foreground sm:text-lg">{description}</p>
          )}
        </motion.div>
        <div className="mt-16 sm:mt-20">{children}</div>
      </div>
    </section>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
