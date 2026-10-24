import { termsSections } from "../data/content.ts";
import { LegalPage } from "./LegalPage.tsx";

const description =
  "Draf terma perkhidmatan vividworks.my untuk semakan. Bukan dokumen undang-undang muktamad.";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terma Perkhidmatan (Draf)"
      description={description}
      path="/terms"
      sections={termsSections}
    />
  );
}
