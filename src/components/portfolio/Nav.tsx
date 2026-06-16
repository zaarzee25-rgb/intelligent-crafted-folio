import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, User, Briefcase, FileText, Mail } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
  { href: "#services", label: "Services" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-px mx-auto max-w-7xl">
          <div
            className={`flex items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3 backdrop-blur-xl transition-all ${
              scrolled ? "bg-background/80 shadow-[var(--shadow-card)]" : "bg-background/40"
            }`}
          >
            <a href="#top" className="group flex items-center gap-2.5 font-display font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface-2 text-[11px] font-bold tracking-wider text-accent">
                AP
              </span>
              <span className="hidden text-sm sm:inline">Arif Pratama</span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-border-strong hover:bg-surface sm:inline-flex"
              >
                Let's talk
              </a>
              <button
                aria-label="Menu"
                onClick={() => setOpen((s) => !s)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-2 text-foreground transition-colors hover:bg-surface lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-px mx-auto mt-2 max-w-7xl lg:hidden"
          >
            <div className="surface-card rounded-2xl p-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-foreground/90 hover:bg-surface"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-4 z-40 mx-auto flex max-w-sm justify-center px-4 md:hidden">
        <div className="flex w-full items-center justify-between rounded-2xl border border-border bg-background/80 px-2 py-2 backdrop-blur-xl shadow-[var(--shadow-card)]">
          {[
            { href: "#top", icon: Home, label: "Home" },
            { href: "#about", icon: User, label: "About" },
            { href: "#projects", icon: Briefcase, label: "Work" },
            { href: "#blog", icon: FileText, label: "Blog" },
            { href: "#contact", icon: Mail, label: "Contact" },
          ].map((i) => (
            <a
              key={i.href}
              href={i.href}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
