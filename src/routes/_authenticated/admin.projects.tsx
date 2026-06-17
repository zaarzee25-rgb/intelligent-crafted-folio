import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage, type FieldDef, type Column } from "@/components/admin/CrudPage";
import type { ProjectRow } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: ProjectsAdmin,
});

const FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true },
  { name: "category", label: "Category", type: "select", options: ["IoT", "Research", "Web", "Mobile", "AI"], required: true },
  { name: "year", label: "Year", required: true, placeholder: "2024" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "summary", label: "Summary", type: "textarea", required: true, rows: 3 },
  { name: "tags", label: "Tags (comma-separated)", type: "tags", span: 2 },
  { name: "github_url", label: "GitHub URL", type: "url" },
  { name: "demo_url", label: "Demo URL", type: "url" },
  { name: "image_url", label: "Cover Image URL", type: "url", span: 2 },
  { name: "featured", label: "Featured", type: "boolean" },
  { name: "published", label: "Published", type: "boolean" },
];

const COLUMNS: Column<ProjectRow>[] = [
  { header: "Title", render: (r) => (
    <div>
      <div className="font-medium text-foreground">{r.title}</div>
      <div className="text-xs text-muted-foreground">{r.year} · {r.category}</div>
    </div>
  )},
  { header: "Tags", render: (r) => <span className="text-xs text-muted-foreground">{r.tags?.slice(0, 3).join(", ")}{r.tags?.length > 3 ? "…" : ""}</span> },
  { header: "Status", w: "120px", render: (r) => (
    <div className="flex flex-col gap-1 text-[10px]">
      <span className={`inline-flex w-fit rounded-full px-2 py-0.5 font-medium ${r.published ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{r.published ? "Published" : "Draft"}</span>
      {r.featured && <span className="inline-flex w-fit rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">Featured</span>}
    </div>
  )},
];

function ProjectsAdmin() {
  return (
    <AdminShell title="Projects" description="Manage portfolio entries.">
      <CrudPage<ProjectRow>
        table="projects"
        title="Project"
        fields={FIELDS}
        columns={COLUMNS}
        defaults={{ category: "Web", year: String(new Date().getFullYear()), tags: [], published: true, featured: false, sort_order: 0 } as Partial<ProjectRow>}
        orderBy={{ column: "sort_order" }}
        search={(q, r) => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q)}
      />
    </AdminShell>
  );
}
