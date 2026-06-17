import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, type ContactMessageRow } from "@/lib/cms";
import { toast } from "sonner";
import { Loader2, Mail, Trash2, MailOpen } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: MessagesAdmin,
});

function MessagesAdmin() {
  const [rows, setRows] = useState<ContactMessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await (supabase as any).from("contact_messages").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function toggleRead(id: string, is_read: boolean) {
    const { error } = await (supabase as any).from("contact_messages").update({ is_read }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await (supabase as any).from("contact_messages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  return (
    <AdminShell title="Messages" description="Inbound enquiries from the contact form.">
      {loading ? (
        <div className="grid place-items-center py-20 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="surface-card grid place-items-center p-12 text-center">
          <Mail className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => {
            const open = openId === m.id;
            return (
              <div key={m.id} className={`surface-card overflow-hidden ${!m.is_read ? "border-accent/30" : ""}`}>
                <button onClick={() => { setOpenId(open ? null : m.id); if (!m.is_read) toggleRead(m.id, true); }}
                  className="flex w-full items-center gap-4 p-4 text-left hover:bg-surface/40">
                  <span className={`grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface-2 ${!m.is_read ? "text-accent" : "text-muted-foreground"}`}>
                    {m.is_read ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{m.name}</span>
                      <span className="text-xs text-muted-foreground">· {m.email}</span>
                    </div>
                    <div className="line-clamp-1 text-xs text-muted-foreground">{m.subject ?? m.message.slice(0, 80)}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(m.created_at)}</span>
                </button>
                {open && (
                  <div className="border-t border-border p-5">
                    {m.subject && <h3 className="mb-2 font-display text-sm font-semibold">{m.subject}</h3>}
                    <p className="whitespace-pre-wrap text-sm text-foreground">{m.message}</p>
                    <div className="mt-4 flex gap-2">
                      <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject ?? "your message")}`}
                        className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs hover:bg-surface">Reply via email</a>
                      <button onClick={() => toggleRead(m.id, !m.is_read)}
                        className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs hover:bg-surface">
                        Mark as {m.is_read ? "unread" : "read"}
                      </button>
                      <button onClick={() => remove(m.id)} className="ml-auto inline-flex items-center gap-1 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs text-destructive hover:bg-surface">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
