import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — Arif Pratama" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created — signing you in");
        const { error: signErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signErr) throw signErr;
      }
      navigate({ to: "/admin" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/admin",
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      navigate({ to: "/admin" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(msg);
      setBusy(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center bg-background px-4 py-16 text-foreground">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
        <div className="surface-card p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </span>
            <div>
              <h1 className="font-display text-lg font-semibold">Admin Console</h1>
              <p className="text-xs text-muted-foreground">Restricted area · CMS access only</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-sm font-medium transition hover:border-border-strong hover:bg-surface disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3.4h4.7c-.2 1.4-1.6 4-4.7 4-2.8 0-5.1-2.4-5.1-5.4S9.2 7.6 12 7.6c1.6 0 2.7.7 3.3 1.3l2.3-2.2C16.2 5.3 14.3 4.5 12 4.5 7.6 4.5 4 8.1 4 12.5S7.6 20.5 12 20.5c6.9 0 7.7-6.4 7-9.5H12z"/></svg>
            Continue with Google
          </button>

          <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or email <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none transition focus:border-border-strong" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none transition focus:border-border-strong" />
            </div>
            <button type="submit" disabled={busy}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create admin account"}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {mode === "signin" ? "First time setup?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-foreground underline-offset-4 hover:underline">
              {mode === "signin" ? "Create the first admin" : "Sign in instead"}
            </button>
          </p>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            The first account created automatically becomes the site administrator.
          </p>
        </div>
      </div>
    </main>
  );
}
