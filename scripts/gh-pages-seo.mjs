// Etterbehandling av GitHub Pages-bygget (build:pages):
//  - redirect-sider for /oppgaver/<kap>/ og /1p/oppgaver/<kap>/ (rutene
//    redirecter i klienten, så de blir ikke prerendret og ga 404 på GitHub Pages)
//  - sitemap.xml over alle prerendrede sider
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const SITE = "https://matteguiden.no";
const OUT = ".output/public";
const SKIP = new Set(["assets", "b", "fagstoff", "images", "videos", "realfag", "__grok"]);

if (!existsSync(join(OUT, "index.html"))) {
  console.error("[gh-pages-seo] fant ikke .output/public/index.html");
  process.exit(1);
}

// 1) /oppgaver/<kap>/ og /1p/oppgaver/<kap>/ -> første delkapittel
const REDIRECT_BASES = [
  { base: "oppgaver", title: "Matteguiden 1T" },
  { base: "1p/oppgaver", title: "Matteguiden 1P" },
];
let redirects = 0;
for (const { base, title } of REDIRECT_BASES) {
  const oppg = join(OUT, ...base.split("/"));
  if (!existsSync(oppg)) continue;
  for (const kap of readdirSync(oppg)) {
    const dir = join(oppg, kap);
    if (!statSync(dir).isDirectory() || existsSync(join(dir, "index.html"))) continue;
    const subs = readdirSync(dir)
      .filter((s) => existsSync(join(dir, s, "index.html")))
      .sort((a, b) => a.localeCompare(b, "nb", { numeric: true }));
    if (!subs.length) continue;
    const target = `/${base}/${kap}/${subs[0]}`;
    writeFileSync(
      join(dir, "index.html"),
      `<!DOCTYPE html><html lang="nb"><head><meta charset="utf-8"><title>${title}</title>` +
        `<meta name="robots" content="noindex"><link rel="canonical" href="${SITE}${target}/">` +
        `<meta http-equiv="refresh" content="0;url=${target}/"></head>` +
        `<body><script>location.replace(${JSON.stringify(target + "/")}+location.search+location.hash)</script>` +
        `<a href="${target}/">Gå videre</a></body></html>\n`,
    );
    redirects++;
  }
}

// 2) sitemap.xml
const urls = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (dir === OUT && SKIP.has(name)) continue;
      walk(p);
    } else if (name === "index.html") {
      const rel = relative(OUT, dir).split("\\").join("/");
      if (/^(1p\/)?oppgaver\/[^/]+$/.test(rel)) continue; // redirect-sider
      urls.push(rel ? `/${rel}/` : "/");
    }
  }
}
walk(OUT);
urls.sort();
const today = new Date().toISOString().slice(0, 10);
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "sitemap.xml"), xml);
console.log(`[gh-pages-seo] sitemap.xml: ${urls.length} URL-er, ${redirects} kapittel-redirects`);
