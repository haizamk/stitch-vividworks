import { cx } from "../../lib/cx.ts";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  titleId?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl")}>
      {eyebrow ? <p className="text-sm font-semibold text-brand">{eyebrow}</p> : null}
      <h2
        id={titleId}
        className="mt-2 text-3xl font-semibold tracking-tight text-navy sm:text-4xl"
      >
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
