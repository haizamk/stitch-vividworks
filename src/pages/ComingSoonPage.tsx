import { Link, useSearchParams } from "react-router-dom";
import { comingSoonCopy } from "../data/content.ts";
import type { ComingSoonIntent } from "../data/content.ts";
import { planById } from "../data/pricing.ts";
import { templateById } from "../data/templates.ts";
import { futureTarget } from "../lib/actions.ts";
import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/layout/Container.tsx";
import { Seo } from "../components/seo/Seo.tsx";

function isIntent(value: string | null): value is ComingSoonIntent {
  return value !== null && value in comingSoonCopy;
}

export default function ComingSoonPage() {
  const [params] = useSearchParams();
  const rawIntent = params.get("tindakan");
  const intent = isIntent(rawIntent) ? rawIntent : null;
  const copy = intent
    ? comingSoonCopy[intent]
    : {
        title: "Akan Datang",
        body: "Tindakan ini belum tersedia. Tiada akaun, bayaran atau website dijana daripada halaman ini.",
      };
  const plan = planById(params.get("pakej"));
  const template = templateById(params.get("template"));
  const configured = intent ? futureTarget(intent, {
    ...(plan ? { pakej: plan.id } : {}),
    ...(template ? { template: template.id } : {}),
  }) : null;

  return (
    <>
      <Seo
        title="Akan Datang"
        description="Tindakan ini disediakan untuk integrasi platform pada masa hadapan. Tiada akaun, bayaran atau website dijana."
        path="/akan-datang"
        noIndex
      />
      <Container className="py-16 sm:py-24">
        <p className="text-sm font-semibold text-brand">Akan Datang</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-navy">{copy.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{copy.body}</p>
        {plan || template ? (
          <dl className="mt-6 max-w-xl rounded-2xl border border-line bg-surface p-5 text-sm">
            {plan ? (
              <div>
                <dt className="font-semibold text-navy">Pakej</dt>
                <dd className="mt-1 text-muted">{plan.name}</dd>
              </div>
            ) : null}
            {template ? (
              <div className={plan ? "mt-4" : undefined}>
                <dt className="font-semibold text-navy">Template</dt>
                <dd className="mt-1 text-muted">
                  {template.name} — contoh {template.sampleName}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
          {configured?.external
            ? "Pautan destinasi telah ditetapkan dalam konfigurasi. Membukanya meninggalkan laman pemasaran."
            : "URL platform belum ditetapkan dalam konfigurasi, jadi tindakan ini kekal di halaman Akan Datang."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {configured?.external ? (
            <Button href={configured.href} external>
              Teruskan ke pautan yang ditetapkan
            </Button>
          ) : null}
          <Button href="/" variant={configured?.external ? "secondary" : "primary"}>
            Kembali ke utama
          </Button>
          <Button href="/contact" variant="secondary">
            Hubungi Kami
          </Button>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
          <li>
            <Link to="/pricing" className="text-brand">
              Lihat pakej
            </Link>
          </li>
          <li>
            <Link to="/templates" className="text-brand">
              Lihat template
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="text-brand">
              Cara kerja
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
