import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { pricingPlans } from "../data/pricing.ts";
import { validateContact } from "../lib/contact.ts";
import type { ContactDraft, ContactErrors } from "../lib/contact.ts";
import { Button } from "../components/ui/Button.tsx";
import { Modal } from "../components/ui/Modal.tsx";

const emptyDraft: ContactDraft = { name: "", email: "", business: "", plan: "", message: "" };

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [draft, setDraft] = useState<ContactDraft>(emptyDraft);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  function update<K extends keyof ContactDraft>(key: K, value: ContactDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setStatus("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(draft),
      });
      const body = (await response.json().catch(() => null)) as { message?: string; errors?: ContactErrors } | null;
      if (!response.ok) {
        setErrors(body?.errors ?? {});
        setStatus(body?.message ?? "Pertanyaan tidak dapat disimpan.");
        return;
      }
      setDraft(emptyDraft);
      setErrors({});
      setStatus(body?.message ?? "Pertanyaan disimpan. E-mel automatik belum dihantar.");
    } catch {
      setStatus("Pelayan tempatan tidak menjawab. Cuba halaman Hubungi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      title="Hubungi kami"
      description="Borang ini menggunakan API pertanyaan sedia ada. Ia tidak membuka akaun."
      onClose={onClose}
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <Field id="modal-nama" label="Nama" error={errors.name} value={draft.name} onChange={(value) => update("name", value)} />
        <Field
          id="modal-emel"
          label="E-mel"
          type="email"
          error={errors.email}
          value={draft.email}
          onChange={(value) => update("email", value)}
        />
        <Field
          id="modal-perniagaan"
          label="Perniagaan"
          error={errors.business}
          value={draft.business}
          onChange={(value) => update("business", value)}
        />
        <div>
          <label htmlFor="modal-pakej" className="text-sm font-semibold text-fp-ink">
            Pakej
          </label>
          <select
            id="modal-pakej"
            value={draft.plan}
            onChange={(event) => update("plan", event.target.value)}
            className="mt-2 h-12 w-full rounded-xl border border-fp-line bg-white px-3 text-sm"
          >
            <option value="">Belum pasti</option>
            {pricingPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          {errors.plan ? <p className="mt-1.5 text-sm text-[#9f1239]">{errors.plan}</p> : null}
        </div>
        <div>
          <label htmlFor="modal-mesej" className="text-sm font-semibold text-fp-ink">
            Mesej
          </label>
          <textarea
            id="modal-mesej"
            value={draft.message}
            onChange={(event) => update("message", event.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-fp-line px-3 py-3 text-sm"
          />
          {errors.message ? <p className="mt-1.5 text-sm text-[#9f1239]">{errors.message}</p> : null}
        </div>
        {status ? (
          <p role="status" className="text-sm leading-6 text-fp-muted">
            {status}
          </p>
        ) : null}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/contact" className="text-sm font-semibold text-fp-indigo" onClick={onClose}>
            Buka halaman hubungi
          </Link>
          <Button type="submit" variant="indigo" disabled={saving}>
            {saving ? "Menyimpan…" : "Hantar pertanyaan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-fp-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 text-sm"
      />
      {error ? <p className="mt-1.5 text-sm text-[#9f1239]">{error}</p> : null}
    </div>
  );
}
