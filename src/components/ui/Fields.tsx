import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/cx.ts";

const controlClass =
  "mt-2 w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-ink outline-none placeholder:text-[#8b98aa]";

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  const errorId = `${id}-ralat`;
  const hintId = `${id}-petunjuk`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-[#9f1239]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint: string | undefined, error: string | undefined): string | undefined {
  if (error) return `${id}-ralat`;
  if (hint) return `${id}-petunjuk`;
  return undefined;
}

type TextFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ id, label, hint, error, className, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        className={cx(controlClass, error ? "border-[#9f1239]" : "border-line", className)}
        {...props}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </FieldShell>
  );
}

type AreaFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function AreaField({ id, label, hint, error, className, ...props }: AreaFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        className={cx(controlClass, "min-h-32 resize-y", error ? "border-[#9f1239]" : "border-line", className)}
        {...props}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ id, label, hint, error, className, children, ...props }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <select
        id={id}
        className={cx(controlClass, error ? "border-[#9f1239]" : "border-line", className)}
        {...props}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      >
        {children}
      </select>
    </FieldShell>
  );
}
