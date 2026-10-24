import { steps, workflowNote } from "../data/content.ts";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/common/SectionHeading.tsx";
import { Button } from "../components/ui/Button.tsx";

export function HowItWorksSection() {
  return (
    <section id="cara-kerja" aria-labelledby="cara-kerja-tajuk">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Cara kerja"
          title="Empat langkah yang dirancang"
          description="Aliran kerja platform, daripada penerangan perniagaan hingga pratonton sebelum penerbitan."
          titleId="cara-kerja-tajuk"
        />
        <ol className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id} className="rounded-2xl border border-line bg-white p-5">
              <p className="text-sm font-semibold tracking-[0.16em] text-brand">{step.step}</p>
              <h3 className="mt-3 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted">{workflowNote}</p>
        <div className="mt-6 text-center">
          <Button href="/how-it-works" variant="secondary">
            Baca aliran kerja
          </Button>
        </div>
      </Container>
    </section>
  );
}
