import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage, type FieldDef, type Column } from "@/components/admin/CrudPage";
import type { ResearchRow } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/research")({
  component: ResearchAdmin,
});

const FIELDS: FieldDef[] = [
  { name: "type", label: "Type", type: "select", required: true, options: ["Journal", "Conference", "Thesis", "Preprint"] },
  { name: "year", label: "Year", required: true },
  { name: "title", label: "Title", required: true, span: 2 },
  { name: "venue", label: "Venue", required: true, span: 2 },
  { name: "abstract", label: "Abstract", type: "textarea", required: true, rows: 5, span: 2 },
  { name: "link", label: "Link", type: "url", span: 2 },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const COLUMNS: Column<ResearchRow>[] = [
  { header: "Title", render: (r) => (
    <div>
      <div className="font-medium text-foreground">{r.title}</div>
      <div className="text-xs text-muted-foreground">{r.venue} · {r.year}</div>
    </div>
  )},
  { header: "Type", w: "120px", render: (r) => <span className="text-xs uppercase tracking-wider text-muted-foreground">{r.type}</span> },
  { header: "Status", w: "100px", render: (r) => (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${r.published ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{r.published ? "Published" : "Draft"}</span>
  )},
];

function ResearchAdmin() {
  return (
    <AdminShell title="Research" description="Publications, theses, and preprints.">
      <CrudPage<ResearchRow>
        table="research"
        title="Research"
        fields={FIELDS}
        columns={COLUMNS}
        defaults={{ type: "Journal", year: String(new Date().getFullYear()), published: true, sort_order: 0 } as Partial<ResearchRow>}
        orderBy={{ column: "sort_order" }}
        search={(q, r) => r.title.toLowerCase().includes(q) || r.venue.toLowerCase().includes(q)}
      />
    </AdminShell>
  );
}
