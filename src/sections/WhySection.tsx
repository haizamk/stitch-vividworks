import { reasons } from "../data/content.ts";
import { Container } from "../components/layout/Container.tsx";
import { SectionHeading } from "../components/common/SectionHeading.tsx";

export function WhySection() {
  return (
    <section id="mengapa" aria-labelledby="mengapa-tajuk" className="bg-surface">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Mengapa vividworks.my"
          title="Dibina untuk perniagaan Malaysia"
          description="Bahasa, aliran kerja dan pilihan pakej disusun untuk PKS yang mahukan kehadiran digital yang kemas."
          titleId="mengapa-tajuk"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reasons.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-white p-5">
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
