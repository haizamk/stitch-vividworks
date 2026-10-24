import { site } from "../data/site.ts";
import type { ComingSoonIntent } from "../data/content.ts";

const endpointFor: Record<ComingSoonIntent, string> = {
  "log-masuk": site.future.loginUrl,
  "bina-website": site.future.registerUrl,
  "mula-percuma": site.future.registerUrl,
  "pilih-template": site.future.editorUrl,
};

export type FutureTarget = {
  href: string;
  external: boolean;
};

function absoluteHttp(value: string): URL | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === "http:" || url.protocol === "https:") return url;
  } catch {
    return null;
  }
  return null;
}

export function futureTarget(
  intent: ComingSoonIntent,
  params: Record<string, string> = {},
): FutureTarget {
  const configured = absoluteHttp(endpointFor[intent]);
  if (configured) {
    for (const [key, value] of Object.entries(params)) {
      if (value) configured.searchParams.set(key, value);
    }
    return { href: configured.toString(), external: true };
  }

  const search = new URLSearchParams({ tindakan: intent });
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  return { href: `/akan-datang?${search.toString()}`, external: false };
}
