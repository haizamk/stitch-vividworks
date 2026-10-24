export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    id: "coding",
    question: "Adakah saya perlu tahu coding?",
    answer:
      "Tidak. vividworks.my dirancang supaya anda menerangkan perniagaan, menyemak cadangan reka bentuk dan mengubah kandungan melalui editor visual, tanpa menulis kod. Aliran ini masih dalam pembangunan dan belum dibuka sebagai perkhidmatan langsung di laman ini.",
  },
  {
    id: "pakej-free",
    question: "Apakah yang termasuk dalam pakej FREE?",
    answer:
      "Skop yang dinyatakan buat masa ini ialah harga cadangan RM0, 1 hingga 3 halaman statik, fail HTML, CSS dan JavaScript, template asas, reka bentuk mesra telefon bimbit, serta penyuntingan visual melalui platform. Tiada pangkalan data atau backend khusus untuk website pelanggan. Pakej ini tidak dinyatakan sebagai percuma seumur hidup. Tempoh, syarat dan had lain belum disahkan.",
  },
  {
    id: "edit-selepas-terbit",
    question: "Bolehkah saya mengedit website selepas diterbitkan?",
    answer:
      "Penyuntingan visual ialah sebahagian aliran kerja yang dirancang. Sama ada suntingan masih boleh dibuat selepas website diterbitkan belum disahkan. Tiada janji dikunci pada masa ini.",
  },
  {
    id: "mesra-telefon",
    question: "Adakah website mesra telefon bimbit?",
    answer:
      "Ya, untuk skop yang telah dinyatakan. Pakej FREE merangkumi reka bentuk mesra telefon bimbit, dan pratonton template disediakan untuk desktop serta telefon. Anda boleh menukar paparan itu pada galeri template.",
  },
  {
    id: "domain",
    question: "Bolehkah saya menggunakan domain sendiri?",
    answer:
      "Sokongan domain sendiri belum disahkan. Sehingga spesifikasi pakej rasmi diterbitkan, laman ini tidak menjanjikan pendaftaran domain, pemindahan domain atau sambungan DNS.",
  },
  {
    id: "naik-taraf",
    question: "Bagaimana proses naik taraf pakej?",
    answer:
      "Proses naik taraf masih dalam perancangan. Nama Starter, Professional dan Business ialah label pemasaran cadangan. Harga, ciri, tempoh dan terma pembayaran belum disahkan, dan laman ini tidak memproses bayaran. Untuk pertanyaan, gunakan halaman Hubungi Kami.",
  },
  {
    id: "bila-boleh-diguna",
    question: "Bilakah AI Website Builder boleh digunakan?",
    answer:
      "Pembina website AI belum dibuka untuk kegunaan umum. Laman ini ialah laman pemasaran. Butang seperti “Bina Website Percuma” membawa ke halaman Akan Datang sehingga platform disepadukan. Tarikh pelancaran belum diumumkan.",
  },
];
