import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../components/ui/Button.tsx";
import { Modal } from "../components/ui/Modal.tsx";
import { DemoBanner } from "./DemoBanner.tsx";
import { demoUser } from "./demo.ts";

type SignupModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SignupModal({ open, onClose }: SignupModalProps) {
  const [done, setDone] = useState(false);
  const [name, setName] = useState<string>(demoUser.name);
  const [error, setError] = useState("");

  function close() {
    setDone(false);
    setError("");
    onClose();
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextName = String(form.get("daftar-nama") ?? "").trim();
    const email = String(form.get("daftar-emel") ?? "").trim();
    if (nextName.length < 2 || !email.includes("@")) {
      setError("Nama dan e-mel contoh diperlukan. Tiada akaun dicipta.");
      return;
    }
    setName(nextName);
    setError("");
    setDone(true);
  }

  return (
    <Modal
      open={open}
      title={done ? `Tahniah, ${name}!` : "Daftar Starter (demo)"}
      description={
        done
          ? "Pendaftaran ini hanya paparan. Pautan, editor dan papan pemuka di bawah ialah demo."
          : "Pakej Starter RM0 masih dirancang. Borang ini tidak mencipta akaun dan tidak meminta kad."
      }
      onClose={close}
    >
      {done ? <SuccessBody name={name} onClose={close} /> : (
        <form className="grid gap-4" onSubmit={onSubmit}>
          <DemoBanner />
          <label className="text-sm font-semibold text-fp-ink" htmlFor="daftar-nama">
            Nama
            <input id="daftar-nama" name="daftar-nama" defaultValue={demoUser.name} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <label className="text-sm font-semibold text-fp-ink" htmlFor="daftar-emel">
            E-mel
            <input id="daftar-emel" name="daftar-emel" type="email" autoComplete="off" defaultValue={demoUser.email} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <label className="text-sm font-semibold text-fp-ink" htmlFor="daftar-bisnes">
            Nama perniagaan
            <input id="daftar-bisnes" name="daftar-bisnes" defaultValue={demoUser.business} className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          <label className="text-sm font-semibold text-fp-ink" htmlFor="daftar-kata">
            Kata laluan
            <input id="daftar-kata" name="daftar-kata" type="password" autoComplete="new-password" placeholder="Tidak dihantar" className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 font-normal" />
          </label>
          {error ? <p role="alert" className="text-sm text-[#9f1239]">{error}</p> : null}
          <Button type="submit" variant="indigo">
            Teruskan demo
          </Button>
        </form>
      )}
    </Modal>
  );
}

function SuccessBody({ name, onClose }: { name: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = "https://contoh.vividworks.my/demo";

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-4">
      <DemoBanner />
      <p className="text-sm leading-6 text-fp-muted">
        {name}, laman contoh belum wujud. Butang di bawah membuka alat demo pada pelayar ini.
      </p>
      <div className="flex flex-col gap-2 rounded-2xl border border-fp-line bg-fp-surface p-4 sm:flex-row sm:items-center sm:justify-between">
        <code className="text-sm text-fp-ink">{link}</code>
        <Button variant="indigoSecondary" onClick={copy}>
          {copied ? "Disalin" : "Salin pautan contoh"}
        </Button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button href="/wizard" variant="indigo" onClick={onClose}>Buka wizard demo</Button>
        <Button href="/studio" variant="indigoSecondary" onClick={onClose}>Papan pemuka demo</Button>
        <Button href="/templates" variant="indigoSecondary" onClick={onClose}>Lihat templat</Button>
        <Button href="/studio/whatsapp" variant="indigoSecondary" onClick={onClose}>Widget WhatsApp demo</Button>
      </div>
    </div>
  );
}
