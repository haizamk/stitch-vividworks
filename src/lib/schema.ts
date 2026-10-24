import { faqs } from "../data/faqs.ts";
import { absoluteUrl, site } from "../data/site.ts";

export function organizationNodes(path: string) {
  return [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description: site.description,
    },
    {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      inLanguage: site.locale,
      description: site.description,
    },
    {
      "@type": "WebPage",
      name: site.name,
      url: absoluteUrl(path),
      inLanguage: site.locale,
      isPartOf: site.url,
    },
  ];
}

export function faqNodes(path: string) {
  return [
    {
      "@type": "FAQPage",
      url: absoluteUrl(path),
      inLanguage: site.locale,
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function breadcrumbNode(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function graph(nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
