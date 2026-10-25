export type ContactDraft = {
  name: string;
  email: string;
  business: string;
  plan: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactDraft, string>>;

export const planIds: readonly string[];

export function validateContact(draft: Partial<ContactDraft> | null | undefined): ContactErrors;

export function normalizeContact(draft: Partial<ContactDraft> | null | undefined): ContactDraft;

export function contactSummary(draft: Partial<ContactDraft> | null | undefined): string;
