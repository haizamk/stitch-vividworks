import { privacySections } from "../data/content.ts";
import { LegalPage } from "./LegalPage.tsx";

const description =
  "Draf dasar privasi vividworks.my untuk semakan. Bukan dokumen undang-undang muktamad.";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Dasar Privasi (Draf)"
      description={description}
      path="/privacy"
      sections={privacySections}
    />
  );
}
