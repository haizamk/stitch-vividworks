import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { templates } from "../data/templates.ts";
import { cx } from "../lib/cx.ts";
import { Seo } from "../components/seo/Seo.tsx";
import { DemoBanner } from "../stitch/DemoBanner.tsx";
import { demoUser } from "../stitch/demo.ts";

const steps = ["Maklumat asas", "Templat & palet", "Struktur seksyen", "WhatsApp"] as const;

const palettes = [
  { id: "indigo", name: "Modern Indigo", swatch: "bg-fp-indigo" },
  { id: "amber", name: "Warm Amber", swatch: "bg-[#d97706]" },
  { id: "emerald", name: "Emerald Green", swatch: "bg-[#059669]" },
] as const;

const sectionOptions = [
  { id: "hero", label: "Hero dan pengenalan" },
  { id: "menu", label: "Menu atau katalog" },
  { id: "story", label: "Kisah perniagaan" },
  { id: "booking", label: "Borang tempahan" },
  { id: "hours", label: "Waktu operasi dan peta" },
] as const;

export default function WizardPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const requested = templates.some((item) => item.id === params.get("templat")) ? params.get("templat")! : "food-restaurant";
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<string>(demoUser.business);
  const [tagline, setTagline] = useState<string>(demoUser.tagline);
  const [location, setLocation] = useState<string>(demoUser.location);
  const [templateId, setTemplateId] = useState(requested);
  const [palette, setPalette] = useState<(typeof palettes)[number]["id"]>("indigo");
  const [sections, setSections] = useState<Record<string, boolean>>({
    hero: true,
    menu: true,
    story: true,
    booking: false,
    hours: true,
  });
  const [phone, setPhone] = useState<string>(demoUser.phone);
  const [buttonText, setButtonText] = useState("Tanya / tempah meja");
  const [draftNote, setDraftNote] = useState("");
  const [generating, setGenerating] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);
  const progress = Math.round(((step + 1) / steps.length) * 100);
  const chosen = useMemo(() => templates.find((item) => item.id === templateId) ?? templates[0], [templateId]);

  function saveDraft() {
    setDraftNote("Draf kekal pada pelayar ini sehingga anda tutup tab. Tiada simpanan pelayan.");
  }

  function onGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((value) => value + 1);
      return;
    }
    setGenerating(true);
    timer.current = window.setTimeout(() => {
      navigate("/studio/editor", {
        state: { insert: `${business}: ${tagline}` },
      });
    }, 900);
  }

  return (
    <div className="fp-shell min-h-screen bg-fp-surface text-fp-ink">
      <Seo
        title="Wizard konfigurasi"
        description="Empat langkah demo untuk templat, palet, seksyen dan WhatsApp. Tiada laman dijana pada pelayan."
        path="/wizard"
        noIndex
      />
      <header className="border-b border-fp-line bg-white">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="font-bold">VividWorks</Link>
          <p className="hidden text-sm text-fp-muted sm:block">Langkah {step + 1} daripada {steps.length}</p>
          <button type="button" className="text-sm font-semibold text-fp-indigo" onClick={saveDraft}>Simpan draf</button>
        </div>
      </header>
      <form className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_22rem]" onSubmit={onGenerate}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Konfigurasi templat dan bisnes</h1>
          <p className="mt-2 text-sm text-fp-muted">Langkah demo. AI pada skrin ini tidak memanggil model.</p>
          <div className="mt-4">
            <DemoBanner />
          </div>
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full bg-fp-indigo" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-fp-muted">{progress}% paparan langkah</p>
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-4">
            {steps.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  aria-current={index === step ? "step" : undefined}
                  onClick={() => setStep(index)}
                  className={cx("w-full rounded-xl px-3 py-2 text-left text-sm font-semibold", index === step ? "bg-fp-indigo text-white" : "bg-white")}
                >
                  {index + 1}. {label}
                </button>
              </li>
            ))}
          </ol>

          {step === 0 ? (
            <fieldset className="mt-4 grid gap-4 rounded-3xl border border-fp-line bg-white p-5">
              <legend className="px-1 font-semibold">Maklumat asas</legend>
              <label className="text-sm font-semibold" htmlFor="wizard-bisnes">Nama perniagaan
                <input id="wizard-bisnes" value={business} onChange={(event) => setBusiness(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
              </label>
              <label className="text-sm font-semibold" htmlFor="wizard-tagline">Tagline
                <input id="wizard-tagline" value={tagline} onChange={(event) => setTagline(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
              </label>
              <label className="text-sm font-semibold" htmlFor="wizard-lokasi">Lokasi
                <input id="wizard-lokasi" value={location} onChange={(event) => setLocation(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
              </label>
            </fieldset>
          ) : null}

          {step === 1 ? (
            <fieldset className="mt-4 rounded-3xl border border-fp-line bg-white p-5">
              <legend className="px-1 font-semibold">Templat dan palet</legend>
              <div className="mt-3 grid gap-2">
                {templates.map((item) => (
                  <label key={item.id} className={cx("flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2", templateId === item.id ? "border-fp-indigo bg-fp-indigo-soft" : "border-fp-line")}>
                    <input type="radio" name="templat" checked={templateId === item.id} onChange={() => setTemplateId(item.id)} />
                    <span className="text-sm font-medium">{item.name} · {item.sampleName}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {palettes.map((item) => (
                  <button key={item.id} type="button" aria-pressed={palette === item.id} onClick={() => setPalette(item.id)} className={cx("rounded-2xl border p-3 text-left text-sm font-semibold", palette === item.id ? "border-fp-indigo" : "border-fp-line")}>
                    <span className={cx("mb-2 block size-6 rounded-full", item.swatch)} />
                    {item.name}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 2 ? (
            <fieldset className="mt-4 rounded-3xl border border-fp-line bg-white p-5">
              <legend className="px-1 font-semibold">Struktur seksyen</legend>
              <div className="mt-3 grid gap-2">
                {sectionOptions.map((item) => (
                  <label key={item.id} className="flex items-center gap-3 rounded-xl border border-fp-line px-3 py-3 text-sm">
                    <input
                      type="checkbox"
                      checked={sections[item.id]}
                      onChange={(event) => setSections((current) => ({ ...current, [item.id]: event.target.checked }))}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          {step === 3 ? (
            <fieldset className="mt-4 rounded-3xl border border-fp-line bg-white p-5">
              <legend className="px-1 font-semibold">WhatsApp</legend>
              <label className="mt-3 block text-sm font-semibold" htmlFor="wizard-telefon">Nombor paparan
                <input id="wizard-telefon" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
              </label>
              <label className="mt-4 block text-sm font-semibold" htmlFor="wizard-butang">Teks butang
                <input id="wizard-butang" value={buttonText} onChange={(event) => setButtonText(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
              </label>
              <p className="mt-4 rounded-2xl bg-fp-indigo-soft px-4 py-3 text-sm leading-6">
                Kuota Starter yang dirancang: 1 AI Generate dan 2 AI Edit. Kredit tidak digunakan pada demo ini.
              </p>
            </fieldset>
          ) : null}

          {draftNote ? <p role="status" className="mt-3 text-sm text-fp-muted">{draftNote}</p> : null}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" className="h-12 rounded-xl border border-fp-line bg-white px-4 text-sm font-semibold disabled:opacity-40" disabled={step === 0} onClick={() => setStep((value) => value - 1)}>
              Kembali
            </button>
            <button type="button" className="h-12 rounded-xl border border-fp-line bg-white px-4 text-sm font-semibold" onClick={saveDraft}>
              Simpan draf
            </button>
            <button type="submit" className="h-12 rounded-xl bg-fp-indigo px-4 text-sm font-semibold text-white">
              {step === steps.length - 1 ? "Jana laman demo" : "Seterusnya"}
            </button>
          </div>
        </div>
        <aside className="rounded-3xl border border-fp-line bg-white p-4">
          <p className="text-xs font-semibold text-fp-muted">Pratonton tempatan</p>
          <p className="mt-1 font-bold">{business}</p>
          <p className="text-sm text-fp-muted">{tagline}</p>
          <img src={chosen?.image} alt={chosen?.alt ?? ""} className="mt-3 aspect-[16/10] w-full rounded-2xl border border-fp-line object-cover object-top" />
          <p className="mt-3 text-sm text-fp-muted">{location}</p>
          <p className="mt-1 text-sm">Palet: {palettes.find((item) => item.id === palette)?.name}</p>
          <p className="mt-3 inline-flex rounded-full bg-[#16a34a] px-3 py-2 text-xs font-semibold text-white">{buttonText}</p>
          <p className="mt-2 text-xs text-fp-muted">{phone} · tidak dihantar</p>
        </aside>
      </form>
      {generating ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-fp-ink/45 px-4" role="status">
          <p className="max-w-sm rounded-3xl bg-white px-6 py-5 text-center text-sm font-semibold">AI sedang menjana… pada skrin ini sahaja. Tiada model dipanggil.</p>
        </div>
      ) : null}
    </div>
  );
}
