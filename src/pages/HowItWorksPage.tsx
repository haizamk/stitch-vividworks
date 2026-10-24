import { steps, workflowNote } from "../data/content.ts";
import { breadcrumbNode, graph, organizationNodes } from "../lib/schema.ts";
import { Container } from "../components/layout/Container.tsx";
import { PageHeader } from "../components/layout/PageHeader.tsx";
import { Seo } from "../components/seo/Seo.tsx";
import { CtaSection } from "../sections/CtaSection.tsx";

const description =
  "Empat langkah aliran kerja yang dirancang: ceritakan perniagaan, jana reka bentuk dengan AI, sesuaikan website dan pratonton sebelum terbit.";

const unavailable = [
  "Penjanaan reka bentuk AI secara langsung",
  "Editor visual",
  "Penerbitan website",
  "Pembayaran atau naik taraf pakej",
];

export default function HowItWorksPage() {
  return (
    <>
      <Seo
        title="Cara Kerja"
        description={description}
        path="/how-it-works"
        jsonLd={graph([
          ...organizationNodes("/how-it-works"),
          breadcrumbNode([
            { name: "Utama", path: "/" },
            { name: "Cara Kerja", path: "/how-it-works" },
          ]),
        ])}
      />
      <PageHeader eyebrow="Cara kerja" title="Cara Kerja" description={description} />
      <Container className="py-14 sm:py-16">
        <ol className="grid gap-5">
          {steps.map((step) => (
            <li key={step.id} className="grid gap-4 rounded-2xl border border-line bg-white p-5 sm:grid-cols-[auto_1fr] sm:p-6">
              <p className="text-sm font-semibold tracking-[0.16em] text-brand">{step.step}</p>
              <div>
                <h2 className="text-xl font-semibold text-navy">{step.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-navy">Status platform</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{workflowNote}</p>
          <p className="mt-4 text-sm font-semibold text-navy">Belum tersedia di laman ini</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {unavailable.map((item) => (
              <li key={item} className="rounded-xl bg-white px-3 py-3 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <CtaSection />
    </>
  );
}
