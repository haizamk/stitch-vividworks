import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { faqs } from "../data/faqs.ts";
import { comparisonRows, comparisonValue, pricingDisclaimer, pricingPlans } from "../data/pricing.ts";
import { breadcrumbNode, graph, organizationNodes } from "../lib/schema.ts";
import { Accordion } from "../components/ui/Accordion.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Seo } from "../components/seo/Seo.tsx";
import { cx } from "../lib/cx.ts";
import { SignupModal } from "../stitch/SignupModal.tsx";

const description =
  "Bandingkan Starter RM0 yang dirancang dengan Grow, Pro dan Elite. Harga berbayar belum diumumkan dan tiada diskaun tahunan.";

export default function PricingPage() {
  const [cycle, setCycle] = useState<"bulan" | "tahun">("bulan");
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <Seo
        title="Pakej"
        description={description}
        path="/pricing"
        jsonLd={graph([
          ...organizationNodes("/pricing"),
          breadcrumbNode([
            { name: "Utama", path: "/" },
            { name: "Pakej", path: "/pricing" },
          ]),
        ])}
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold text-fp-indigo">Harga</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          Pilih pelan yang sesuai untuk skala perniagaan anda
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-fp-muted">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-fp-line" role="group" aria-label="Kitaran paparan">
            {(["bulan", "tahun"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={cycle === item}
                onClick={() => setCycle(item)}
                className={cx("h-10 rounded-full px-4 text-sm font-semibold", cycle === item ? "bg-fp-indigo text-white" : "text-fp-ink")}
              >
                {item === "bulan" ? "Bulanan" : "Tahunan"}
              </button>
            ))}
          </div>
          <p className="text-sm text-fp-muted">
            {cycle === "tahun"
              ? "Diskaun tahunan belum diumumkan. Harga paparan tidak berubah."
              : "Pakej berbayar belum mempunyai harga bulanan."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => {
            const featured = plan.id === "professional";
            return (
              <article key={plan.id} className={cx("flex flex-col rounded-3xl border bg-white p-5", featured ? "border-fp-indigo ring-2 ring-fp-indigo" : "border-fp-line")}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-bold">{plan.name}</h2>
                  {featured ? <span className="rounded-full bg-fp-indigo px-2 py-1 text-[11px] font-semibold text-white">Ditonjolkan</span> : null}
                </div>
                <p className="mt-4 text-2xl font-extrabold tracking-tight">{plan.id === "free" ? "RM0" : "Harga belum diumumkan"}</p>
                <p className="mt-1 text-xs font-semibold text-fp-muted">{plan.id === "free" ? "Free Forever · belum dibuka" : plan.badge}</p>
                <p className="mt-3 text-sm leading-6 text-fp-muted">{plan.summary}</p>
                {plan.features.length > 0 ? (
                  <ul className="mt-4 flex-1 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature.id} className="flex gap-2 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-fp-indigo" aria-hidden="true" />
                        {feature.value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 flex-1 rounded-2xl border border-dashed border-fp-line px-3 py-3 text-sm text-fp-muted">Tiada ciri berbayar diumumkan.</p>
                )}
                <div className="mt-5">
                  {plan.id === "free" ? (
                    <Button variant="indigo" className="w-full" onClick={() => setSignupOpen(true)}>Daftar percuma (demo)</Button>
                  ) : (
                    <Button href={`/contact?pakej=${plan.id}`} variant={featured ? "indigo" : "indigoSecondary"} className="w-full">Tanya butiran</Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <h2 className="mt-14 text-2xl font-bold">Perbandingan</h2>
        <p className="mt-2 text-sm text-fp-muted xl:hidden">Leret jadual untuk melihat semua pelan.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-fp-line bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">Perbandingan pelan. Sel kosong bermaksud belum diumumkan.</caption>
            <thead className="bg-fp-surface">
              <tr>
                <th className="px-4 py-3">Ciri</th>
                {pricingPlans.map((plan) => (
                  <th key={plan.id} className="px-4 py-3">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.id} className="border-t border-fp-line">
                  <th className="px-4 py-3 font-medium">{row.label}</th>
                  {pricingPlans.map((plan) => {
                    const cell = comparisonValue(plan, row.id);
                    return <td key={plan.id} className="px-4 py-3 align-top">{cell.value}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-6 text-fp-muted">{pricingDisclaimer}</p>

        <h2 className="mt-14 text-2xl font-bold">Soalan lazim</h2>
        <div className="mt-4">
          <Accordion items={faqs} />
        </div>

        <section className="mt-14 rounded-3xl bg-gradient-to-br from-fp-indigo to-fp-violet px-6 py-10 text-white sm:px-10">
          <h2 className="text-3xl font-bold">Masih merancang pelan anda?</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/90">
            Tiada percubaan 14 hari. Pendaftaran Starter pada skrin ini ialah demo, dan pertanyaan sebenar menggunakan borang hubungi.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="onIndigo" onClick={() => setSignupOpen(true)}>Buka demo daftar</Button>
            <Link to="/contact" className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white ring-1 ring-white/50">Hubungi kami</Link>
          </div>
        </section>
      </div>
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </>
  );
}
