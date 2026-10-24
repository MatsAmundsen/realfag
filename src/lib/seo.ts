export const SITE_URL = "https://matteguiden.no";

/** Per-route <title>, description, canonical and Open Graph tags. */
export function seoHead(path: string, title: string, description: string) {
  let clean = path.startsWith("/") ? path : `/${path}`;
  if (!clean.endsWith("/")) clean += "/"; // GitHub Pages 301-er til skråstrek-varianten
  const url = SITE_URL + clean;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
