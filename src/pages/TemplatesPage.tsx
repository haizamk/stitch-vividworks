import { breadcrumbNode, graph, organizationNodes } from "../lib/schema.ts";
import { Container } from "../components/layout/Container.tsx";
import { PageHeader } from "../components/layout/PageHeader.tsx";
import { Seo } from "../components/seo/Seo.tsx";
import { TemplateGallery } from "../components/templates/TemplateGallery.tsx";

const description =
  "Galeri pratonton reka bentuk vividworks.my untuk enam kategori. Pratonton ini ialah konsep, bukan pustaka template yang telah dilancarkan.";

export default function TemplatesPage() {
  return (
    <>
      <Seo
        title="Template"
        description={description}
        path="/templates"
        jsonLd={graph([
          ...organizationNodes("/templates"),
          breadcrumbNode([
            { name: "Utama", path: "/" },
            { name: "Template", path: "/templates" },
          ]),
        ])}
      />
      <PageHeader eyebrow="Template" title="Template" description={description} />
      <Container className="py-14 sm:py-16">
        <TemplateGallery />
      </Container>
    </>
  );
}
