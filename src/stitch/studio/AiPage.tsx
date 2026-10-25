import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button.tsx";
import { Modal } from "../../components/ui/Modal.tsx";
import { cx } from "../../lib/cx.ts";
import { StudioShell } from "./Shell.tsx";

const tones = ["Mesra", "Profesional", "Ringkas", "Ceria"] as const;

export function AiPage() {
  const navigate = useNavigate();
  const [tone, setTone] = useState<(typeof tones)[number]>("Mesra");
  const [copy, setCopy] = useState("");
  const [moving, setMoving] = useState(false);
  const [insertOpen, setInsertOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const business = String(form.get("bisnes") ?? "perniagaan").trim();
    const offer = String(form.get("tawaran") ?? "hidangan").trim();
    setCopy(
      `Nada ${tone.toLowerCase()}: ${business} menghidangkan ${offer}. Teks ini disusun di pelayar sebagai contoh. Tiada model AI dipanggil.`,
    );
    setMoving(false);
  }

  function playMove() {
    if (!copy) return;
    setMoving(true);
    window.setTimeout(() => setMoving(false), 700);
  }

  return (
    <StudioShell title="Penjana teks demo">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="rounded-3xl border border-fp-line bg-white p-5" onSubmit={onSubmit}>
          <label className="block text-sm font-semibold" htmlFor="bisnes">
            Perniagaan
            <input id="bisnes" name="bisnes" defaultValue="Kafe & Bistro Farhan" className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <label className="mt-4 block text-sm font-semibold" htmlFor="tawaran">
            Apa yang dijual
            <input id="tawaran" name="tawaran" defaultValue="kopi dan nasi lemak" className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <p id="nada-label" className="mt-4 text-sm font-semibold">Nada</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="nada-label">
            {tones.map((item) => (
              <button key={item} type="button" aria-pressed={tone === item} onClick={() => setTone(item)} className={cx("rounded-full px-3 py-2 text-sm font-semibold", tone === item ? "bg-fp-indigo text-white" : "bg-fp-surface")}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button type="submit" variant="indigo">Jana teks contoh</Button>
            <Button type="button" variant="indigoSecondary" onClick={() => setUpgradeOpen(true)}>Naik taraf</Button>
          </div>
        </form>
        <section className="rounded-3xl border border-fp-line bg-white p-5" aria-live="polite">
          <h2 className="font-semibold">Hasil</h2>
          <p className={cx("mt-3 min-h-28 rounded-2xl bg-fp-surface p-4 text-sm leading-6", moving && "ring-2 ring-fp-violet")}>
            {copy || "Tekan jana. Output kekal pada peranti ini."}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="indigo" disabled={!copy} onClick={() => setInsertOpen(true)}>Sisip ke editor demo</Button>
            <Button variant="indigoSecondary" disabled={!copy} onClick={playMove}>Mainkan pemindahan</Button>
          </div>
          <p className="mt-3 text-xs leading-5 text-fp-muted">
            Animasi pemindahan hanya cincin pada kad. Jika anda minta kurang gerakan, animasi dipendekkan oleh pelayar.
          </p>
        </section>
      </div>
      <Modal open={insertOpen} title="Sisip ke editor demo" description="Teks dibawa ke kanvas editor pada pelayar ini. GrapesJS tidak menerima apa-apa." onClose={() => setInsertOpen(false)}>
        <p className="text-sm leading-6 text-fp-muted">{copy}</p>
        <div className="mt-4">
          <Button variant="indigo" onClick={() => navigate("/studio/editor", { state: { insert: copy } })}>Bawa ke kanvas</Button>
        </div>
      </Modal>
      <Modal open={upgradeOpen} title="Harga belum diumumkan" description="Tiada caj RM79 dan tiada pembayaran pada skrin ini." onClose={() => setUpgradeOpen(false)}>
        <Button href="/studio/langganan" variant="indigo">Lihat pelan tanpa harga</Button>
      </Modal>
    </StudioShell>
  );
}
