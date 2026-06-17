import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage, type FieldDef, type Column } from "@/components/admin/CrudPage";
import type { ServiceRow } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: ServicesAdmin,
});

const FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true },
  { name: "icon", label: "Icon (lucide name)", placeholder: "Cpu" },
  { name: "description", label: "Description", type: "textarea", required: true, rows: 3, span: 2 },
  { name: "features", label: "Features (comma-separated)", type: "tags", span: 2 },
  { name: "benefits", label: "Benefits (comma-separated)", type: "tags", span: 2 },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const COLUMNS: Column<ServiceRow>[] = [
  { header: "Service", render: (r) => (
    <div>
      <div className="font-medium text-foreground">{r.title}</div>
      <div className="line-clamp-1 text-xs text-muted-foreground">{r.description}</div>
    </div>
  )},
  { header: "Features", w: "120px", render: (r) => <span className="text-xs text-muted-foreground">{r.features?.length ?? 0}</span> },
  { header: "Status", w: "100px", render: (r) => (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${r.published ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{r.published ? "Published" : "Draft"}</span>
  )},
];

function ServicesAdmin() {
  return (
    <AdminShell title="Services" description="Service offerings shown on the public site.">
      <CrudPage<ServiceRow>
        table="services"
        title="Service"
        fields={FIELDS}
        columns={COLUMNS}
        defaults={{ features: [], benefits: [], published: true, sort_order: 0 } as Partial<ServiceRow>}
        orderBy={{ column: "sort_order" }}
        search={(q, r) => r.title.toLowerCase().includes(q)}
      />
    </AdminShell>
  );
}
