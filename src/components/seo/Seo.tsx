import { useEffect } from "react";
import { absoluteUrl, site } from "../../data/site.ts";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  jsonLd?: unknown;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function Seo({ title, description, path, noIndex = false, jsonLd }: SeoProps) {
  const serialized = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} · ${site.name}`;
    const canonical = absoluteUrl(path);
    document.title = fullTitle;
    document.documentElement.lang = "ms";
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:locale", site.ogLocale);
    upsertMeta("property", "og:site_name", site.name);
    upsertMeta("property", "og:image", absoluteUrl("/og.svg"));
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", absoluteUrl("/og.svg"));
    upsertLink("canonical", canonical);

    const scriptId = "vividworks-jsonld";
    const existing = document.getElementById(scriptId);
    if (!serialized) {
      existing?.remove();
      return;
    }
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = serialized;
    if (!existing) document.head.appendChild(script);
  }, [title, description, path, noIndex, serialized]);

  return null;
}
