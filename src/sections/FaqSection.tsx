import { faqs } from "../data/faqs.ts";
import { Accordion } from "../components/ui/Accordion.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/common/SectionHeading.tsx";

export function FaqSection() {
  return (
    <section id="soalan" aria-labelledby="soalan-tajuk">
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start sm:py-20">
        <SectionHeading
          eyebrow="Soalan lazim"
          title="Jawapan terus, tanpa janji yang belum disahkan"
          description="Jika sesuatu masih menunggu kelulusan, kami katakan demikian."
          titleId="soalan-tajuk"
          align="left"
        />
        <div>
          <Accordion items={faqs} />
          <div className="mt-6">
            <Button href="/faq" variant="secondary">
              Lihat semua soalan
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
