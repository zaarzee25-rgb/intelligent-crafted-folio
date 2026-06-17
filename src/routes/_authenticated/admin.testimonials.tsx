import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage, type FieldDef, type Column } from "@/components/admin/CrudPage";
import type { TestimonialRow } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: TestimonialsAdmin,
});

const FIELDS: FieldDef[] = [
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role / Company", required: true },
  { name: "quote", label: "Quote", type: "textarea", required: true, rows: 4, span: 2 },
  { name: "avatar_url", label: "Avatar URL", type: "url", span: 2 },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "published", label: "Published", type: "boolean" },
];

const COLUMNS: Column<TestimonialRow>[] = [
  { header: "Person", render: (r) => (
    <div>
      <div className="font-medium text-foreground">{r.name}</div>
      <div className="text-xs text-muted-foreground">{r.role}</div>
    </div>
  )},
  { header: "Quote", render: (r) => <span className="line-clamp-2 text-xs text-muted-foreground">"{r.quote}"</span> },
  { header: "Status", w: "100px", render: (r) => (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${r.published ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{r.published ? "Published" : "Draft"}</span>
  )},
];

function TestimonialsAdmin() {
  return (
    <AdminShell title="Testimonials" description="Client quotes for social proof.">
      <CrudPage<TestimonialRow>
        table="testimonials"
        title="Testimonial"
        fields={FIELDS}
        columns={COLUMNS}
        defaults={{ published: true, sort_order: 0 } as Partial<TestimonialRow>}
        orderBy={{ column: "sort_order" }}
      />
    </AdminShell>
  );
}
