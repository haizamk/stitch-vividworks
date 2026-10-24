import { benefits } from "../data/content.ts";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/common/SectionHeading.tsx";

export function BenefitsSection() {
  return (
    <section id="manfaat" aria-labelledby="manfaat-tajuk" className="bg-surface">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Manfaat utama"
          title="Satu aliran kerja, daripada idea hingga pratonton"
          description="Dirancang untuk perniagaan yang mahukan website profesional tanpa menulis kod."
          titleId="manfaat-tajuk"
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-white p-5 shadow-[0_16px_40px_-32px_rgba(10,23,48,0.7)]">
              <span className="grid size-11 place-items-center rounded-xl bg-[#e8efff] text-brand">
                <item.icon size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
