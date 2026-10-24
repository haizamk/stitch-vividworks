import { useState } from "react";
import type { KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "../../lib/cx.ts";

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  function moveFocus(index: number) {
    const item = items[index];
    if (!item) return;
    document.getElementById(`soalan-${item.id}`)?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus((index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus((index - 1 + items.length) % items.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(items.length - 1);
    }
  }

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, index) => {
        const open = openId === item.id;
        const panelId = `jawapan-${item.id}`;
        const buttonId = `soalan-${item.id}`;
        return (
          <div key={item.id}>
            <h3 className="m-0 text-base font-semibold">
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-navy hover:bg-surface/80"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={cx("shrink-0 text-brand transition-transform duration-200", open && "rotate-180")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cx("grid transition-[grid-template-rows] duration-200", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden" aria-hidden={open ? undefined : true}>
                <p className="px-5 pb-5 text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
