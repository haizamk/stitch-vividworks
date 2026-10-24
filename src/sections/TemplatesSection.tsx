import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/common/SectionHeading.tsx";
import { TemplateGallery } from "../components/templates/TemplateGallery.tsx";
import { Button } from "../components/ui/Button.tsx";

export function TemplatesSection() {
  return (
    <section id="template" aria-labelledby="template-tajuk" className="bg-surface">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Template"
          title="Enam arah reka bentuk untuk dipilih"
          description="Kad di bawah ialah pratonton konsep, bukan katalog template yang telah dilancarkan."
          titleId="template-tajuk"
        />
        <div className="mt-12">
          <TemplateGallery />
        </div>
        <div className="mt-8 text-center">
          <Button href="/templates" variant="secondary">
            Buka galeri template
          </Button>
        </div>
      </Container>
    </section>
  );
}
