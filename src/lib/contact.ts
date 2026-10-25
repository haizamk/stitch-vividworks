import { contactSummary as summarize, validateContact as validate } from "../../shared/contact.mjs";
import type { ContactDraft, ContactErrors } from "../../shared/contact.mjs";

export type { ContactDraft, ContactErrors };

export function validateContact(draft: ContactDraft): ContactErrors {
  return validate(draft);
}

export function contactSummary(draft: ContactDraft): string {
  return summarize(draft);
}

export function mailtoHref(email: string, draft: ContactDraft): string {
  const subject = draft.plan
    ? `Pertanyaan vividworks.my — ${draft.plan}`
    : "Pertanyaan vividworks.my";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactSummary(draft))}`;
}
