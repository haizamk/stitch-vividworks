import { ArrowRight, Check } from "lucide-react";
import { heroPoints } from "../data/content.ts";
import { site } from "../data/site.ts";
import { futureTarget } from "../lib/actions.ts";
import { ProductConcept } from "../components/hero/ProductConcept.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";

export function HeroSection() {
  const start = futureTarget("bina-website");

  return (
    <section id="utama" aria-labelledby="utama-tajuk" className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-20">
        <div>
          <p className="text-sm font-semibold text-brand">Platform pembina website untuk perniagaan Malaysia</p>
          <h1 id="utama-tajuk" className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-navy sm:text-5xl lg:text-[3.15rem] lg:leading-[1.12]">
            Bina Website Profesional dengan AI dalam Minit
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">{site.description}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={start.href} external={start.external} size="lg">
              Bina Website Percuma
              <ArrowRight size={18} />
            </Button>
            <Button href="/#pakej" variant="secondary" size="lg">
              Lihat Pakej Kami
            </Button>
          </div>
          <ul className="mt-7 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {heroPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-2 text-sm font-medium text-ink">
                <Check size={16} className="text-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ProductConcept />
      </Container>
    </section>
  );
}
