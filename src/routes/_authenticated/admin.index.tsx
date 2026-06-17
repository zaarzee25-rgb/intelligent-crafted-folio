import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { FolderKanban, FileText, BookOpen, Wrench, Users, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

const CARDS = [
  { table: "projects", label: "Projects", icon: FolderKanban, to: "/admin/projects" },
  { table: "articles", label: "Articles", icon: FileText, to: "/admin/articles" },
  { table: "research", label: "Research", icon: BookOpen, to: "/admin/research" },
  { table: "services", label: "Services", icon: Wrench, to: "/admin/services" },
  { table: "skill_items", label: "Skills", icon: Sparkles, to: "/admin/skills" },
  { table: "testimonials", label: "Testimonials", icon: Users, to: "/admin/testimonials" },
] as const;

function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    (async () => {
      const next: Record<string, number> = {};
      for (const c of CARDS) {
        const { count } = await (supabase as any).from(c.table).select("*", { count: "exact", head: true });
        next[c.table] = count ?? 0;
      }
      setCounts(next);
      const { count } = await (supabase as any).from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false);
      setUnread(count ?? 0);
    })();
  }, []);

  return (
    <AdminShell title="Dashboard" description="An overview of your portfolio content.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c) => (
          <Link key={c.table} to={c.to} className="surface-card group flex items-center gap-4 p-5 transition hover:border-border-strong">
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
              <c.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <div className="font-display text-2xl font-semibold">{counts[c.table] ?? "–"}</div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        ))}
        <Link to="/admin/messages" className="surface-card group flex items-center gap-4 p-5 transition hover:border-border-strong">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
            <MessageSquare className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Unread Messages</div>
            <div className="font-display text-2xl font-semibold">{unread}</div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
        </Link>
      </div>

      <div className="mt-8 surface-card p-6">
        <h2 className="font-display text-base font-semibold">Getting started</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Edit your profile, hero copy & socials in <Link to="/admin/settings" className="text-foreground underline-offset-4 hover:underline">Site Settings</Link>.</li>
          <li>• Add or edit portfolio entries in <Link to="/admin/projects" className="text-foreground underline-offset-4 hover:underline">Projects</Link>.</li>
          <li>• Write a blog post in <Link to="/admin/articles" className="text-foreground underline-offset-4 hover:underline">Blog Articles</Link>.</li>
          <li>• Check inbound enquiries in <Link to="/admin/messages" className="text-foreground underline-offset-4 hover:underline">Messages</Link>.</li>
        </ul>
      </div>
    </AdminShell>
  );
}
