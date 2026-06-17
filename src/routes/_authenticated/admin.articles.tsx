import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudPage, type FieldDef, type Column } from "@/components/admin/CrudPage";
import { formatDate, type ArticleRow } from "@/lib/cms";

export const Route = createFileRoute("/_authenticated/admin/articles")({
  component: ArticlesAdmin,
});

const FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true, span: 2 },
  { name: "slug", label: "Slug", required: true, placeholder: "my-article" },
  { name: "category", label: "Category", type: "select", required: true, options: ["IoT", "AI", "Programming", "Research", "Technology", "Tutorial"] },
  { name: "excerpt", label: "Excerpt", type: "textarea", required: true, rows: 2, span: 2 },
  { name: "content", label: "Content (Markdown)", type: "textarea", rows: 10, span: 2 },
  { name: "cover_url", label: "Cover Image URL", type: "url", span: 2 },
  { name: "read_minutes", label: "Read Minutes", type: "number" },
  { name: "published_at", label: "Publish Date", type: "date" },
  { name: "featured", label: "Featured", type: "boolean" },
  { name: "published", label: "Published", type: "boolean" },
];

const COLUMNS: Column<ArticleRow>[] = [
  { header: "Title", render: (r) => (
    <div>
      <div className="font-medium text-foreground">{r.title}</div>
      <div className="text-xs text-muted-foreground">/{r.slug}</div>
    </div>
  )},
  { header: "Category", w: "120px", render: (r) => <span className="text-xs uppercase tracking-wider text-muted-foreground">{r.category}</span> },
  { header: "Date", w: "140px", render: (r) => <span className="text-xs text-muted-foreground">{formatDate(r.published_at)}</span> },
  { header: "Status", w: "120px", render: (r) => (
    <div className="flex flex-col gap-1 text-[10px]">
      <span className={`inline-flex w-fit rounded-full px-2 py-0.5 font-medium ${r.published ? "bg-emerald-500/10 text-emerald-400" : "bg-muted text-muted-foreground"}`}>{r.published ? "Published" : "Draft"}</span>
      {r.featured && <span className="inline-flex w-fit rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">Featured</span>}
    </div>
  )},
];

function ArticlesAdmin() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <AdminShell title="Blog Articles" description="Long-form notes & essays.">
      <CrudPage<ArticleRow>
        table="articles"
        title="Article"
        fields={FIELDS}
        columns={COLUMNS}
        defaults={{ category: "Programming", read_minutes: 5, published_at: today, published: true, featured: false } as Partial<ArticleRow>}
        orderBy={{ column: "published_at", ascending: false }}
        search={(q, r) => r.title.toLowerCase().includes(q) || r.excerpt.toLowerCase().includes(q)}
      />
    </AdminShell>
  );
}
