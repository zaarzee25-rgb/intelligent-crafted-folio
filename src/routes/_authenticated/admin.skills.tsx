import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import type { SkillCategoryRow, SkillItemRow } from "@/lib/cms";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/skills")({
  component: SkillsAdmin,
});

function SkillsAdmin() {
  const [cats, setCats] = useState<SkillCategoryRow[]>([]);
  const [items, setItems] = useState<SkillItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [c, i] = await Promise.all([
      (supabase as any).from("skill_categories").select("*").order("sort_order"),
      (supabase as any).from("skill_items").select("*").order("sort_order"),
    ]);
    setCats(c.data ?? []);
    setItems(i.data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function addCategory() {
    const name = prompt("Category name?")?.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { error } = await (supabase as any).from("skill_categories").insert({ name, slug, sort_order: cats.length + 1 });
    if (error) return toast.error(error.message);
    load();
  }
  async function deleteCategory(id: string) {
    if (!confirm("Delete category and all its skills?")) return;
    const { error } = await (supabase as any).from("skill_categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function updateCategory(id: string, patch: Partial<SkillCategoryRow>) {
    const { error } = await (supabase as any).from("skill_categories").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  }
  async function addItem(category_id: string) {
    const name = prompt("Skill name?")?.trim();
    if (!name) return;
    const { error } = await (supabase as any).from("skill_items").insert({ category_id, name, level: 80, sort_order: items.filter(i => i.category_id === category_id).length + 1 });
    if (error) return toast.error(error.message);
    load();
  }
  async function deleteItem(id: string) {
    const { error } = await (supabase as any).from("skill_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function updateItem(id: string, patch: Partial<SkillItemRow>) {
    const { error } = await (supabase as any).from("skill_items").update(patch).eq("id", id);
    if (error) toast.error(error.message);
  }

  return (
    <AdminShell title="Skills" description="Skill categories and proficiency levels." actions={
      <button onClick={addCategory} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background hover:opacity-90">
        <Plus className="h-4 w-4" /> Category
      </button>
    }>
      {loading ? (
        <div className="grid place-items-center py-20 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : (
        <div className="grid gap-5">
          {cats.map((cat) => {
            const catItems = items.filter((i) => i.category_id === cat.id);
            return (
              <div key={cat.id} className="surface-card p-5">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <input defaultValue={cat.name} onBlur={(e) => updateCategory(cat.id, { name: e.target.value })}
                    className="flex-1 min-w-[160px] rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm font-medium" />
                  <input defaultValue={cat.description ?? ""} placeholder="Description"
                    onBlur={(e) => updateCategory(cat.id, { description: e.target.value })}
                    className="flex-[2] min-w-[200px] rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm" />
                  <input type="number" defaultValue={cat.sort_order} onBlur={(e) => updateCategory(cat.id, { sort_order: Number(e.target.value) })}
                    className="w-20 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm" title="Sort" />
                  <button onClick={() => addItem(cat.id)} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-xs hover:bg-surface">
                    <Plus className="h-3 w-3" /> Skill
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="rounded-md border border-border bg-surface-2 p-1.5 text-destructive hover:bg-surface" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {catItems.length === 0 && <p className="text-xs text-muted-foreground">No skills yet.</p>}
                  {catItems.map((it) => (
                    <div key={it.id} className="flex flex-wrap items-center gap-2">
                      <input defaultValue={it.name} onBlur={(e) => updateItem(it.id, { name: e.target.value })}
                        className="flex-1 min-w-[160px] rounded-md border border-border bg-surface-2 px-3 py-1.5 text-sm" />
                      <input type="range" min={0} max={100} defaultValue={it.level}
                        onChange={(e) => updateItem(it.id, { level: Number(e.target.value) })}
                        className="w-40" />
                      <input type="number" min={0} max={100} defaultValue={it.level}
                        onBlur={(e) => updateItem(it.id, { level: Number(e.target.value) })}
                        className="w-16 rounded-md border border-border bg-surface-2 px-2 py-1.5 text-sm" />
                      <span className="text-xs text-muted-foreground">%</span>
                      <button onClick={() => deleteItem(it.id)} className="rounded-md border border-border bg-surface-2 p-1.5 text-destructive hover:bg-surface">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
