import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "boolean" | "tags" | "date" | "select" | "url";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
  span?: 1 | 2;
};

export type Column<R> = { header: string; render: (row: R) => React.ReactNode; w?: string };

interface CrudPageProps<R extends { id: string }> {
  table: string;
  title: string;
  empty?: string;
  fields: FieldDef[];
  columns: Column<R>[];
  defaults: Partial<R>;
  orderBy?: { column: string; ascending?: boolean };
  search?: (q: string, row: R) => boolean;
}

export function CrudPage<R extends { id: string }>(props: CrudPageProps<R>) {
  const [rows, setRows] = useState<R[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<R> | null>(null);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    let qry = (supabase as any).from(props.table).select("*");
    if (props.orderBy) qry = qry.order(props.orderBy.column, { ascending: props.orderBy.ascending ?? true });
    const { data, error } = await qry;
    if (error) toast.error(error.message);
    setRows((data as R[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const visible = useMemo(() => {
    if (!q.trim() || !props.search) return rows;
    return rows.filter((r) => props.search!(q.toLowerCase(), r));
  }, [rows, q, props]);

  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    delete (payload as any).created_at;
    delete (payload as any).updated_at;
    const isNew = !payload.id;
    if (isNew) delete (payload as any).id;
    const { error } = isNew
      ? await (supabase as any).from(props.table).insert(payload)
      : await (supabase as any).from(props.table).update(payload).eq("id", payload.id);
    if (error) { toast.error(error.message); return; }
    toast.success(isNew ? "Created" : "Updated");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    const { error } = await (supabase as any).from(props.table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    load();
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {props.search && (
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…"
              className="w-full rounded-lg border border-border bg-surface-2 py-2 pl-9 pr-3 text-sm outline-none focus:border-border-strong" />
          </div>
        )}
        <button onClick={() => setEditing({ ...props.defaults } as Partial<R>)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background hover:opacity-90">
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="surface-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface-2/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                {props.columns.map((c) => <th key={c.header} className="px-4 py-3 font-medium" style={{ width: c.w }}>{c.header}</th>)}
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={props.columns.length + 1} className="p-10 text-center text-muted-foreground">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                </td></tr>
              )}
              {!loading && visible.length === 0 && (
                <tr><td colSpan={props.columns.length + 1} className="p-10 text-center text-sm text-muted-foreground">
                  {props.empty ?? "No records yet."}
                </td></tr>
              )}
              {!loading && visible.map((row) => (
                <tr key={row.id} className="border-b border-border/60 last:border-0 hover:bg-surface/50">
                  {props.columns.map((c) => <td key={c.header} className="px-4 py-3 align-top">{c.render(row)}</td>)}
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button onClick={() => setEditing(row)} className="rounded-md border border-border bg-surface-2 p-1.5 hover:bg-surface" title="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => remove(row.id)} className="rounded-md border border-border bg-surface-2 p-1.5 text-destructive hover:bg-surface" title="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <EditorModal
          fields={props.fields}
          value={editing}
          onChange={setEditing}
          onClose={() => setEditing(null)}
          onSave={save}
          title={editing.id ? `Edit ${props.title}` : `New ${props.title}`}
        />
      )}
    </div>
  );
}

function EditorModal({ fields, value, onChange, onClose, onSave, title }: {
  fields: FieldDef[]; value: any; onChange: (v: any) => void; onClose: () => void; onSave: () => void; title: string;
}) {
  const [saving, setSaving] = useState(false);
  async function handleSave() {
    setSaving(true);
    try { await onSave(); } finally { setSaving(false); }
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={onClose}>
      <div className="surface-card relative w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground hover:bg-surface"><X className="h-4 w-4" /></button>
        </div>
        <div className="grid max-h-[70vh] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.name} className={f.span === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                {f.label}{f.required && <span className="text-destructive"> *</span>}
              </label>
              <FieldInput field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <button onClick={onClose} className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm hover:bg-surface">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const base = "w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-border-strong";
  switch (field.type) {
    case "textarea":
      return <textarea rows={field.rows ?? 4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={base} />;
    case "number":
      return <input type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))} className={base} />;
    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
          {field.placeholder ?? (value ? "Enabled" : "Disabled")}
        </label>
      );
    case "tags": {
      const arr: string[] = Array.isArray(value) ? value : [];
      return (
        <input value={arr.join(", ")} onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          placeholder={field.placeholder ?? "tag1, tag2, tag3"} className={base} />
      );
    }
    case "date":
      return <input type="date" value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base} />;
    case "select":
      return (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={base}>
          <option value="">—</option>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    case "url":
      return <input type="url" value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} placeholder={field.placeholder} className={base} />;
    default:
      return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} className={base} />;
  }
}
