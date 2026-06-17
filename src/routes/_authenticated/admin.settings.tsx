import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsAdmin,
});

const SECTIONS: { key: string; label: string; description: string; hint?: string }[] = [
  { key: "profile", label: "Profile & Hero", description: "Name, role, tagline, contact, socials, availability." },
  { key: "stats", label: "Hero Stats", description: "Array of { label, value } shown in the hero.", hint: '[{"label":"Projects Delivered","value":"50+"}]' },
  { key: "values", label: "Values", description: "Array of { title, body } shown in the About section.", hint: '[{"title":"Engineering Rigor","body":"…"}]' },
  { key: "timeline", label: "Career Timeline", description: "Array of { year, title, org, body }.", hint: '[{"year":"2024 — Present","title":"…","org":"…","body":"…"}]' },
  { key: "education", label: "Education", description: "Array of { degree, school, year }.", hint: '[{"degree":"…","school":"…","year":"2022"}]' },
  { key: "seo", label: "SEO Defaults", description: "Site title, description, OG image.", hint: '{"title":"…","description":"…","ogImage":"…"}' },
];

function SettingsAdmin() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).from("site_settings").select("*");
      const map: Record<string, string> = {};
      for (const s of SECTIONS) {
        const row = (data ?? []).find((r: any) => r.key === s.key);
        map[s.key] = JSON.stringify(row?.value ?? (s.key === "profile" || s.key === "seo" ? {} : []), null, 2);
      }
      setValues(map);
      setLoading(false);
    })();
  }, []);

  async function save(key: string) {
    setSavingKey(key);
    try {
      const parsed = JSON.parse(values[key]);
      const { error } = await (supabase as any).from("site_settings").upsert({ key, value: parsed, updated_at: new Date().toISOString() });
      if (error) throw error;
      toast.success(`${key} saved`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      toast.error(msg);
    } finally {
      setSavingKey(null);
    }
  }

  if (loading) {
    return <AdminShell title="Site Settings"><div className="grid place-items-center py-20 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div></AdminShell>;
  }

  return (
    <AdminShell title="Site Settings" description="Singleton JSON groups powering the public site.">
      <div className="grid gap-5">
        {SECTIONS.map((s) => (
          <div key={s.key} className="surface-card p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-semibold">{s.label}</h2>
                <p className="text-xs text-muted-foreground">{s.description}</p>
              </div>
              <button onClick={() => save(s.key)} disabled={savingKey === s.key}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50">
                {savingKey === s.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save
              </button>
            </div>
            <textarea
              spellCheck={false}
              value={values[s.key] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [s.key]: e.target.value }))}
              rows={Math.min(20, Math.max(6, (values[s.key]?.split("\n").length ?? 6) + 1))}
              className="w-full rounded-lg border border-border bg-surface-2 p-3 font-mono text-xs leading-relaxed outline-none focus:border-border-strong"
            />
            {s.hint && <p className="mt-2 text-[11px] text-muted-foreground">Example: <code>{s.hint}</code></p>}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
