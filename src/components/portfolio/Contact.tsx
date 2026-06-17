import { SectionShell, FadeUp } from "./Section";
import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Instagram, Mail, MessageCircle, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const messageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5).max(4000),
});

export function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title="Let's build something that matters."
      description="Selectively taking new engagements for 2026. The fastest way to start is a short note describing your problem."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <FadeUp>
          <div className="surface-card flex h-full flex-col p-8 sm:p-10">
            <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Direct
            </div>
            <a href={profile.socials.email} className="mt-3 font-display text-2xl font-semibold hover:text-accent">
              {profile.email}
            </a>
            <div className="mt-1 text-sm text-muted-foreground">{profile.location} · UTC+7</div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { href: profile.socials.github, icon: Github, label: "GitHub" },
                { href: profile.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
                { href: profile.socials.instagram, icon: Instagram, label: "Instagram" },
                { href: profile.socials.whatsapp, icon: MessageCircle, label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <div className="flex items-center gap-3">
                    <s.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground">→</span>
                </a>
              ))}
            </div>

            <div className="mt-auto rounded-xl border border-border bg-surface p-5 text-sm text-muted-foreground">
              Typical response within 24 hours on weekdays. For urgent inquiries please mention
              <span className="text-foreground"> "urgent"</span> in your subject line.
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <form
            className="surface-card p-8 sm:p-10"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const fd = new FormData(form);
              const parsed = messageSchema.safeParse({
                name: fd.get("name"),
                email: fd.get("email"),
                subject: fd.get("subject") || undefined,
                message: fd.get("message"),
              });
              if (!parsed.success) {
                toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
                return;
              }
              setBusy(true);
              const { error } = await (supabase as any).from("contact_messages").insert(parsed.data);
              setBusy(false);
              if (error) {
                toast.error("Failed to send. Please try again.");
                return;
              }
              toast.success("Message sent. I'll reply soon.");
              setSent(true);
              form.reset();
              setTimeout(() => setSent(false), 4000);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <Field className="mt-4" label="Subject" name="subject" placeholder="Project, role, or topic" required={false} />
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Message
              </label>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="A few sentences about your context, timeline, and what success looks like."
                className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-border-strong focus:outline-none"
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">
                I'll reply from <span className="text-foreground">{profile.email}</span>
              </div>
              <button
                type="submit"
                disabled={busy}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : sent ? "Sent — thank you" : "Send message"}
                {!busy && <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </form>
        </FadeUp>
      </div>
    </SectionShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  className = "",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-border-strong focus:outline-none"
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-px mx-auto grid max-w-7xl gap-10 py-14 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 text-[11px] font-bold tracking-wider text-accent">
              AP
            </span>
            <div className="font-display text-lg font-semibold">Arif Pratama</div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            IoT engineer, fullstack developer, and researcher. Building intelligent systems that
            survive contact with reality.
          </p>
        </div>

        <div>
          <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Quick Links
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {["About","Projects","Research","Services","Blog","Contact"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-foreground/80 hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Elsewhere
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { l: "GitHub", h: profile.socials.github },
              { l: "LinkedIn", h: profile.socials.linkedin },
              { l: "Instagram", h: profile.socials.instagram },
              { l: "Email", h: profile.socials.email },
            ].map((l) => (
              <li key={l.l}>
                <a href={l.h} className="text-foreground/80 hover:text-foreground">
                  {l.l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-px mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Arif Pratama. Crafted with care.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>

      {/* spacer for mobile bottom nav */}
      <div className="h-20 md:hidden" />
    </footer>
  );
}
