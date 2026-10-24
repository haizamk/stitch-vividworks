/**
 * Pricing source of truth for the marketing site.
 *
 * FREE reflects the scope approved for this website. Starter, Professional and
 * Business are proposed marketing labels. Replace only the unconfirmed fields
 * when the official package specification is approved.
 *
 * Do not add prices, page limits, storage, bandwidth, support periods,
 * payment terms or premium inclusions that have not been confirmed.
 */

export type FeatureId = "pages" | "stack" | "database" | "templates" | "responsive" | "editor";

export type PlanFeature = {
  id: FeatureId;
  value: string;
  confirmed: boolean;
};

export type PlanCtaIntent = "start-free" | "view-info" | "contact";

export type PricingPlan = {
  id: "free" | "starter" | "professional" | "business";
  name: string;
  nameStatus: "confirmed" | "proposed";
  badge: string;
  price: {
    display: string;
    confirmed: boolean;
    note: string;
  };
  summary: string;
  features: PlanFeature[];
  cta: {
    label: string;
    intent: PlanCtaIntent;
  };
};

export const comparisonRows: { id: FeatureId | "nameStatus" | "price"; label: string }[] = [
  { id: "nameStatus", label: "Status nama" },
  { id: "price", label: "Harga" },
  { id: "pages", label: "Halaman" },
  { id: "stack", label: "Format halaman" },
  { id: "database", label: "Pangkalan data website pelanggan" },
  { id: "templates", label: "Template" },
  { id: "responsive", label: "Mesra telefon bimbit" },
  { id: "editor", label: "Penyuntingan visual" },
];

const pendingFeatureNote = "Akan disahkan";

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "FREE",
    nameStatus: "confirmed",
    badge: "Skop semasa",
    price: {
      display: "RM0",
      confirmed: true,
      note: "Tempoh dan syarat lanjut belum disahkan. Tidak dinyatakan sebagai percuma seumur hidup.",
    },
    summary: "Skop permulaan yang dinyatakan untuk laman pemasaran ini.",
    features: [
      { id: "pages", value: "1–3 halaman statik", confirmed: true },
      { id: "stack", value: "HTML, CSS dan JavaScript", confirmed: true },
      {
        id: "database",
        value: "Tiada database atau backend khusus untuk website pelanggan",
        confirmed: true,
      },
      { id: "templates", value: "Template asas", confirmed: true },
      { id: "responsive", value: "Mesra telefon bimbit", confirmed: true },
      { id: "editor", value: "Penyuntingan visual melalui platform", confirmed: true },
    ],
    cta: { label: "Mula Percuma", intent: "start-free" },
  },
  {
    id: "starter",
    name: "Starter",
    nameStatus: "proposed",
    badge: "Label cadangan",
    price: { display: pendingFeatureNote, confirmed: false, note: "" },
    summary: "Nama pemasaran cadangan. Butiran rasmi belum dimasukkan.",
    features: [],
    cta: { label: "Lihat Maklumat", intent: "view-info" },
  },
  {
    id: "professional",
    name: "Professional",
    nameStatus: "proposed",
    badge: "Label cadangan",
    price: { display: pendingFeatureNote, confirmed: false, note: "" },
    summary: "Nama pemasaran cadangan. Butiran rasmi belum dimasukkan.",
    features: [],
    cta: { label: "Lihat Maklumat", intent: "view-info" },
  },
  {
    id: "business",
    name: "Business",
    nameStatus: "proposed",
    badge: "Label cadangan",
    price: { display: pendingFeatureNote, confirmed: false, note: "" },
    summary: "Nama pemasaran cadangan. Butiran rasmi belum dimasukkan.",
    features: [],
    cta: { label: "Hubungi Kami", intent: "contact" },
  },
];

export const pricingDisclaimer =
  "Starter, Professional dan Business ialah label pemasaran yang menunggu pengesahan. Harga, had dan ciri bagi label tersebut tidak dicipta di laman ini. Apabila spesifikasi rasmi diluluskan, kemas kini fail konfigurasi pakej sahaja.";

export function planById(id: string | null | undefined): PricingPlan | undefined {
  return pricingPlans.find((plan) => plan.id === id);
}

export function comparisonValue(
  plan: PricingPlan,
  rowId: (typeof comparisonRows)[number]["id"],
): { value: string; confirmed: boolean } {
  if (rowId === "nameStatus") {
    return plan.nameStatus === "confirmed"
      ? { value: "Digunakan pada laman ini", confirmed: true }
      : { value: "Label pemasaran cadangan", confirmed: true };
  }
  if (rowId === "price") {
    return { value: plan.price.display, confirmed: plan.price.confirmed };
  }
  const feature = plan.features.find((item) => item.id === rowId);
  if (!feature) return { value: pendingFeatureNote, confirmed: false };
  return { value: feature.value, confirmed: feature.confirmed };
}
