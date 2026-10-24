export type ContactDraft = {
  name: string;
  email: string;
  business: string;
  plan: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactDraft, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(draft: ContactDraft): ContactErrors {
  const errors: ContactErrors = {};
  const name = draft.name.trim();
  const email = draft.email.trim();
  const business = draft.business.trim();
  const message = draft.message.trim();

  if (name.length < 2) errors.name = "Masukkan nama (sekurang-kurangnya 2 aksara).";
  else if (name.length > 80) errors.name = "Nama terlalu panjang.";

  if (!emailPattern.test(email) || email.length > 120) {
    errors.email = "Masukkan alamat e-mel yang sah.";
  }

  if (business.length > 120) errors.business = "Nama perniagaan terlalu panjang.";

  if (message.length < 20) {
    errors.message = "Mesej perlu sekurang-kurangnya 20 aksara supaya ia jelas.";
  } else if (message.length > 2000) {
    errors.message = "Mesej terlalu panjang. Pendekkan kepada 2,000 aksara.";
  }

  return errors;
}

export function contactSummary(draft: ContactDraft): string {
  return [
    `Nama: ${draft.name.trim()}`,
    `E-mel: ${draft.email.trim()}`,
    `Perniagaan: ${draft.business.trim() || "—"}`,
    `Pakej: ${draft.plan || "Belum pasti"}`,
    "",
    draft.message.trim(),
  ].join("\n");
}

export function mailtoHref(email: string, draft: ContactDraft): string {
  const subject = draft.plan
    ? `Pertanyaan vividworks.my — ${draft.plan}`
    : "Pertanyaan vividworks.my";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactSummary(draft))}`;
}
