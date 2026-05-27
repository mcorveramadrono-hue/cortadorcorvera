import { useEffect } from "react";

const SITE = "https://corveraibericos.com";

export interface PageSeo {
  title: string;
  description: string;
  path: string; // e.g. "/politica-privacidad"
  ogType?: string;
}

function setMeta(selector: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const propMatch = selector.match(/\[property="([^"]+)"\]/);
    const nameMatch = selector.match(/\[name="([^"]+)"\]/);
    if (propMatch) el.setAttribute("property", propMatch[1]);
    else if (nameMatch) el.setAttribute("name", nameMatch[1]);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function usePageSeo({ title, description, path, ogType = "website" }: PageSeo) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const desc = description.slice(0, 160);
    document.title = title.slice(0, 60);
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, ogType]);
}
