import { legalDraft } from "../data/content.ts";
import { breadcrumbNode, graph } from "../lib/schema.ts";
import { Container } from "../components/layout/Container.tsx";
import { PageHeader } from "../components/layout/PageHeader.tsx";
import { Seo } from "../components/seo/Seo.tsx";

type Section = {
  id: string;
  heading: string;
  body: string;
};

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  sections: readonly Section[];
};

export function LegalPage({ title, description, path, sections }: LegalPageProps) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        noIndex
        jsonLd={graph([
          breadcrumbNode([
            { name: "Utama", path: "/" },
            { name: title, path },
          ]),
        ])}
      />
      <PageHeader eyebrow={legalDraft.label} title={title} description={description} />
      <Container className="py-14 sm:py-16">
        <div className="rounded-2xl border border-[#e3d3ae] bg-[#fbf7ef] px-5 py-4">
          <p className="text-sm font-semibold text-navy">{legalDraft.label}</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-ink">{legalDraft.notice}</p>
          <p className="mt-2 text-sm text-muted">Tarikh draf: {legalDraft.draftedOn}. Bukan tarikh kuat kuasa.</p>
        </div>
        <div className="mt-10 max-w-3xl space-y-8">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="text-xl font-semibold text-navy">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
