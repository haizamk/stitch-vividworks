import { useState } from "react";
import { Link } from "react-router-dom";
import { pricingDisclaimer, pricingPlans } from "../../data/pricing.ts";
import { Button } from "../../components/ui/Button.tsx";
import { Modal } from "../../components/ui/Modal.tsx";
import { cx } from "../../lib/cx.ts";
import { StudioShell } from "./Shell.tsx";

export function BillingPage() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("Grow");

  return (
    <StudioShell title="Langganan dan bil">
      <section className="rounded-3xl border border-fp-line bg-white p-5">
        <p className="text-sm font-semibold text-fp-indigo">Pelan semasa pada paparan ini</p>
        <h2 className="mt-1 text-2xl font-bold">Starter</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-fp-muted">RM0, Free Forever, masih dirancang. Tiada invois, kad, atau naik taraf berbayar.</p>
      </section>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan) => (
          <article key={plan.id} className={cx("flex flex-col rounded-3xl border bg-white p-4", plan.id === "professional" ? "border-fp-indigo" : "border-fp-line")}>
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="mt-2 text-xl font-extrabold">{plan.price.display}</p>
            <p className="mt-2 flex-1 text-sm leading-6 text-fp-muted">{plan.price.note}</p>
            {plan.id === "free" ? (
              <p className="mt-4 text-sm font-semibold text-fp-indigo">Dipaparkan sebagai pelan semasa</p>
            ) : (
              <button
                type="button"
                className="mt-4 h-11 rounded-xl bg-fp-indigo text-sm font-semibold text-white"
                onClick={() => {
                  setPicked(plan.name);
                  setOpen(true);
                }}
              >
                Naik taraf demo
              </button>
            )}
          </article>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-fp-muted">{pricingDisclaimer}</p>
      <Link to="/pricing" className="mt-2 inline-flex text-sm font-semibold text-fp-indigo">Bandingkan di halaman harga</Link>
      <Modal open={open} title={`${picked}: pembayaran tidak tersedia`} description="Harga belum diumumkan. Tiada caj dibuat." onClose={() => setOpen(false)}>
        <Button variant="indigo" onClick={() => setOpen(false)}>Tutup</Button>
      </Modal>
    </StudioShell>
  );
}
