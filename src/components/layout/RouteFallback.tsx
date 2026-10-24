export function RouteFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8" role="status" aria-live="polite">
      <p className="text-sm font-semibold text-muted">Sedang memuatkan…</p>
      <div className="mt-6 h-10 w-2/3 max-w-md rounded-lg bg-surface" />
      <div className="mt-4 h-4 w-full max-w-2xl rounded bg-surface" />
      <div className="mt-2 h-4 max-w-xl rounded bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 rounded-2xl bg-surface" />
        <div className="h-40 rounded-2xl bg-surface" />
        <div className="hidden h-40 rounded-2xl bg-surface lg:block" />
      </div>
    </div>
  );
}
