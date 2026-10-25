import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button.tsx";
import { Modal } from "../components/ui/Modal.tsx";
import { DemoBanner } from "./DemoBanner.tsx";

type DemoLoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DemoLoginModal({ open, onClose }: DemoLoginModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextEmail = String(form.get("emel-demo") ?? "").trim();
    if (!nextEmail.includes("@")) {
      setNotice("Masukkan e-mel contoh. Tiada semakan kata laluan dijalankan.");
      return;
    }
    setEmail(nextEmail);
    setNotice("Tiada sesi dicipta. Anda boleh membuka papan pemuka demo.");
  }

  return (
    <Modal
      open={open}
      title="Log masuk demo"
      description="Borang ini tidak mengesahkan akaun dan tidak menyimpan kata laluan."
      onClose={onClose}
    >
      <DemoBanner />
      <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="emel-demo" className="text-sm font-semibold text-fp-ink">
            E-mel
          </label>
          <input
            id="emel-demo"
            name="emel-demo"
            type="email"
            autoComplete="off"
            defaultValue={email}
            placeholder="nama@example.com"
            className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 text-sm"
          />
        </div>
        <div>
          <label htmlFor="kata-laluan-demo" className="text-sm font-semibold text-fp-ink">
            Kata laluan
          </label>
          <input
            id="kata-laluan-demo"
            name="kata-laluan-demo"
            type="password"
            autoComplete="off"
            placeholder="Tidak disimpan"
            className="mt-2 h-12 w-full rounded-xl border border-fp-line px-3 text-sm"
          />
        </div>
        {notice ? (
          <p role="status" className="text-sm leading-6 text-fp-muted">
            {notice}
          </p>
        ) : null}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="submit" variant="indigoSecondary">
            Semak borang demo
          </Button>
          <Button
            variant="indigo"
            onClick={() => {
              onClose();
              navigate("/studio");
            }}
          >
            Buka papan pemuka demo
          </Button>
        </div>
      </form>
    </Modal>
  );
}
