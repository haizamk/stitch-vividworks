import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { Seo } from "../components/seo/Seo.tsx";

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Halaman tidak dijumpai"
        description="Halaman yang anda cari tiada di laman pemasaran vividworks.my."
        path="/404"
        noIndex
      />
      <Container className="py-20 sm:py-28">
        <p className="text-sm font-semibold text-brand">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Halaman tidak dijumpai</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          Pautan ini tiada pada laman pemasaran vividworks.my. Anda boleh kembali ke halaman utama atau melihat pakej dan template.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Ke halaman utama</Button>
          <Button href="/contact" variant="secondary">
            Hubungi Kami
          </Button>
        </div>
      </Container>
    </>
  );
}
