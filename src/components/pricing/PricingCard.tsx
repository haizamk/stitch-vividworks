import { useState } from "react";
import { Check } from "lucide-react";
import { pricingPlans } from "../../data/pricing.ts";
import type { PricingPlan } from "../../data/pricing.ts";
import { futureTarget } from "../../lib/actions.ts";
import { cx } from "../../lib/cx.ts";
import { Button } from "../ui/Button.tsx";
import { Modal } from "../ui/Modal.tsx";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  const [open, setOpen] = useState(false);
  const start = futureTarget("mula-percuma", { pakej: plan.id });
  const confirmed = plan.nameStatus === "confirmed";

  return (
    <article
      id={plan.id}
      className={cx(
        "flex h-full flex-col rounded-2xl border bg-white p-5 shadow-[0_16px_40px_-32px_rgba(10,23,48,0.7)]",
        confirmed ? "border-brand" : "border-line",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-navy">{plan.name}</h3>
        <p className={cx("rounded-full px-2.5 py-1 text-[11px] font-semibold", confirmed ? "bg-[#e8efff] text-brand-dark" : "bg-surface text-muted")}>
          {plan.badge}
        </p>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-navy">{plan.price.display}</p>
      {plan.price.note ? <p className="mt-2 text-xs leading-5 text-muted">{plan.price.note}</p> : null}
      <p className="mt-4 text-sm leading-6 text-muted">{plan.summary}</p>

      {plan.features.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature.id} className="flex gap-2.5 text-sm leading-6 text-ink">
              <Check size={16} className="mt-1 shrink-0 text-brand" />
              <span>{feature.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-line bg-surface px-4 py-4 text-sm leading-6 text-muted">
          Ciri termasuk: Akan disahkan. Tiada had, storan atau faedah tambahan dipaparkan.
        </p>
      )}

      <div className="mt-auto pt-6">
        {plan.cta.intent === "start-free" ? (
          <Button href={start.href} external={start.external} className="w-full">
            {plan.cta.label}
          </Button>
        ) : null}
        {plan.cta.intent === "contact" ? (
          <Button href={`/contact?pakej=${plan.id}`} variant="secondary" className="w-full">
            {plan.cta.label}
          </Button>
        ) : null}
        {plan.cta.intent === "view-info" ? (
          <Button variant="secondary" className="w-full" onClick={() => setOpen(true)}>
            {plan.cta.label}
          </Button>
        ) : null}
      </div>

      <Modal
        open={open}
        title={`Maklumat pakej ${plan.name}`}
        description="Label ini belum mempunyai spesifikasi rasmi."
        onClose={() => setOpen(false)}
      >
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-navy">Status nama</dt>
            <dd className="mt-1 text-muted">Label pemasaran cadangan, menunggu pengesahan.</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Harga</dt>
            <dd className="mt-1 text-muted">{plan.price.display}</dd>
          </div>
          <div>
            <dt className="font-semibold text-navy">Ciri</dt>
            <dd className="mt-1 text-muted">Akan disahkan. Tiada butiran premium dicipta untuk pakej ini.</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button href="/pricing#perbandingan" onClick={() => setOpen(false)}>
            Lihat perbandingan
          </Button>
          <Button href="/contact" variant="secondary" onClick={() => setOpen(false)}>
            Hubungi Kami
          </Button>
        </div>
      </Modal>
    </article>
  );
}

export function PricingGrid() {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
      {pricingPlans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
