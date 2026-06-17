import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/use-auth";
import {
  LayoutDashboard, FolderKanban, BookOpen, Wrench, FileText, MessageSquare,
  Sparkles, Users, Settings, LogOut, ExternalLink, ShieldCheck, Menu, X, Loader2,
} from "lucide-react";
import { toast } from "sonner";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/articles", label: "Blog Articles", icon: FileText },
  { to: "/admin/research", label: "Research", icon: BookOpen },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/skills", label: "Skills", icon: Sparkles },
  { to: "/admin/testimonials", label: "Testimonials", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminShell({ title, description, actions, children }: {
  title: string; description?: string; actions?: ReactNode; children: ReactNode;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isAdmin, loading, user } = useIsAdmin();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!loading && isAdmin === false) {
      toast.error("You don't have admin access.");
    }
  }, [loading, isAdmin]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div className="surface-card max-w-md p-8">
          <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-accent" />
          <h1 className="font-display text-xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user?.email}) is signed in but isn't an admin. Ask the site administrator to grant you a role.
          </p>
          <button onClick={signOut} className="mt-5 rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm hover:bg-surface">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-surface-2/70 backdrop-blur-xl transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <Link to="/admin" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface text-[11px] font-bold tracking-wider text-accent">AP</span>
              <span className="font-display text-sm font-semibold">Admin Console</span>
            </Link>
            <button onClick={() => setOpen(false)} className="rounded-md p-1 text-muted-foreground hover:bg-surface lg:hidden">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to as string}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <a href="/" target="_blank" className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-surface hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" /> View public site
            </a>
            <button onClick={signOut} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-surface hover:text-foreground">
              <LogOut className="h-3.5 w-3.5" /> Sign out · {user?.email?.split("@")[0]}
            </button>
          </div>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex w-full min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-surface lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-base font-semibold sm:text-lg">{title}</h1>
            {description && <p className="truncate text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </header>
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
