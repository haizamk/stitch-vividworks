import { futureTarget } from "../lib/actions.ts";
import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";

export function CtaSection() {
  const start = futureTarget("bina-website");

  return (
    <section id="mula" aria-labelledby="mula-tajuk" className="bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="rounded-3xl bg-brand px-6 py-12 text-center sm:px-12">
          <h2 id="mula-tajuk" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Bersedia Membina Website Perniagaan Anda?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#e7eeff]">
            Mulakan langkah digital perniagaan anda bersama vividworks.my.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={start.href} external={start.external} variant="light" size="lg">
              Bina Website Percuma
            </Button>
            <Button href="/contact" variant="outlineLight" size="lg">
              Hubungi Kami
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
