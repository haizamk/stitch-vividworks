import { FlaskConical } from "lucide-react";
import { demoNotice } from "./demo.ts";

export function DemoBanner({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={
        compact
          ? "inline-flex items-center gap-1.5 rounded-full bg-fp-indigo-soft px-2.5 py-1 text-[11px] font-semibold text-fp-indigo"
          : "flex items-start gap-2 rounded-2xl border border-fp-indigo/20 bg-fp-indigo-soft px-4 py-3 text-sm leading-6 text-fp-ink"
      }
    >
      <FlaskConical size={compact ? 12 : 16} className="mt-0.5 shrink-0 text-fp-indigo" aria-hidden="true" />
      <span>
        <span className="font-semibold">Demo.</span> {compact ? "Bukan fungsi sebenar." : demoNotice}
      </span>
    </p>
  );
}
