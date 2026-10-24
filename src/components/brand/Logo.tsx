import { brandColors } from "../../data/brand.ts";
import { cx } from "../../lib/cx.ts";

type LogoProps = {
  tone?: "dark" | "light";
};

export function Logo({ tone = "dark" }: LogoProps) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? brandColors.white : brandColors.navy} />
        <path
          d="M9 8.2h3.7L16 18.7 19.3 8.2H23L17.2 23.8h-2.4L9 8.2z"
          fill={light ? brandColors.navy : brandColors.white}
        />
      </svg>
      <span className={cx("text-[1.05rem] font-semibold tracking-tight", light ? "text-white" : "text-navy")}>
        vividworks
        <span className={light ? "text-[#c5d4ff]" : "text-brand"}>.my</span>
      </span>
    </span>
  );
}
