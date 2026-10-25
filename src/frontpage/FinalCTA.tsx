import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { ContactModal } from "../stitch/ContactModal.tsx";

export function FinalCTA() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section id="mula" aria-labelledby="mula-tajuk" className="scroll-mt-24">
      <Container className="py-16 sm:py-20">
        <div className="overflow-hidden rounded-[2rem] bg-fp-indigo-dark px-6 py-12 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-semibold text-[#c7d2fe]">Pendaftaran belum dibuka</p>
          <h2 id="mula-tajuk" className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sedia Membina Website Pertama Anda?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#e0e7ff] sm:text-base">
            Wizard dan studio di bawah ialah demo. Tiada akaun dicipta. Pertanyaan sebenar masih melalui borang hubungi.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/wizard" variant="onIndigo" shape="full" size="lg">
              Bina Website Percuma
              <ArrowRight size={18} />
            </Button>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
              onClick={() => setContactOpen(true)}
            >
              Hubungi Kami
            </button>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-[15px] font-semibold text-white underline-offset-4 hover:underline"
            >
              Halaman borang
            </Link>
          </div>
        </div>
      </Container>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
