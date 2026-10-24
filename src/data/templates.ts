export type TemplateItem = {
  id: string;
  name: string;
  category: string;
  sampleName: string;
  description: string;
  image: string;
  mobileImage: string;
  alt: string;
  mobileAlt: string;
};

export const templates: TemplateItem[] = [
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    category: "Minimal Clean",
    sampleName: "Studio Senja",
    description:
      "Susun atur lapang dan tipografi yang jelas untuk perkhidmatan profesional serta studio kecil.",
    image: "/templates/minimal-clean-desktop.svg",
    mobileImage: "/templates/minimal-clean-mobile.svg",
    alt: "Pratonton reka bentuk Minimal Clean untuk contoh Studio Senja pada desktop.",
    mobileAlt: "Pratonton reka bentuk Minimal Clean untuk contoh Studio Senja pada telefon.",
  },
  {
    id: "premium-luxury",
    name: "Premium Luxury",
    category: "Premium Luxury",
    sampleName: "Maison Ara",
    description:
      "Ruang yang lebih luas dan kontras yang tenang untuk jenama yang mahukan rupa lebih eksklusif.",
    image: "/templates/premium-luxury-desktop.svg",
    mobileImage: "/templates/premium-luxury-mobile.svg",
    alt: "Pratonton reka bentuk Premium Luxury untuk contoh Maison Ara pada desktop.",
    mobileAlt: "Pratonton reka bentuk Premium Luxury untuk contoh Maison Ara pada telefon.",
  },
  {
    id: "modern-commerce",
    name: "Modern Commerce",
    category: "Modern Commerce",
    sampleName: "Kedai Raya",
    description:
      "Fokus pada produk dan seruan tindakan untuk perniagaan yang ingin mempamerkan tawaran.",
    image: "/templates/modern-commerce-desktop.svg",
    mobileImage: "/templates/modern-commerce-mobile.svg",
    alt: "Pratonton reka bentuk Modern Commerce untuk contoh Kedai Raya pada desktop.",
    mobileAlt: "Pratonton reka bentuk Modern Commerce untuk contoh Kedai Raya pada telefon.",
  },
  {
    id: "corporate-pro",
    name: "Corporate Pro",
    category: "Corporate Pro",
    sampleName: "Firma Atlas",
    description:
      "Struktur rasmi dengan bahagian perkhidmatan untuk syarikat dan firma.",
    image: "/templates/corporate-pro-desktop.svg",
    mobileImage: "/templates/corporate-pro-mobile.svg",
    alt: "Pratonton reka bentuk Corporate Pro untuk contoh Firma Atlas pada desktop.",
    mobileAlt: "Pratonton reka bentuk Corporate Pro untuk contoh Firma Atlas pada telefon.",
  },
  {
    id: "food-restaurant",
    name: "Food & Restaurant",
    category: "Food & Restaurant",
    sampleName: "Dapur Suria",
    description:
      "Menonjolkan menu, suasana dan maklumat lawatan untuk kafe, restoran dan katering.",
    image: "/templates/food-restaurant-desktop.svg",
    mobileImage: "/templates/food-restaurant-mobile.svg",
    alt: "Pratonton reka bentuk Food & Restaurant untuk contoh Dapur Suria pada desktop.",
    mobileAlt: "Pratonton reka bentuk Food & Restaurant untuk contoh Dapur Suria pada telefon.",
  },
  {
    id: "creative-tech",
    name: "Creative Tech",
    category: "Creative Tech",
    sampleName: "Nadi Digital",
    description:
      "Rupa yang lebih berani dengan blok ciri untuk agensi dan syarikat digital.",
    image: "/templates/creative-tech-desktop.svg",
    mobileImage: "/templates/creative-tech-mobile.svg",
    alt: "Pratonton reka bentuk Creative Tech untuk contoh Nadi Digital pada desktop.",
    mobileAlt: "Pratonton reka bentuk Creative Tech untuk contoh Nadi Digital pada telefon.",
  },
];

export const templateCategories = ["Semua", ...templates.map((item) => item.category)] as const;

export function templateById(id: string | null | undefined): TemplateItem | undefined {
  return templates.find((item) => item.id === id);
}
