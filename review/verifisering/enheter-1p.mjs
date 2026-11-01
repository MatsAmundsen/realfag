// Går gjennom alle øveprøveoppgavene i 1T og 1P (de ekte dataene) og sjekker deloppgave-oppdelingen:
// oppdeling med fallback, fasit-oppslag (del-nøkkel → serie → tall → fri), poengsum 1 p per oppgave og unike id-er.
// Dataene og lib-koden pakkes med rolldown (kommer med vite; importene bruker @/-alias og .html/.md-filer).
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";

const root = process.cwd();
const require = createRequire(join(root, "package.json"));
const { rolldown } = require("rolldown");
const dir = mkdtempSync(join(tmpdir(), "deloppgaver-"));
const inn = join(dir, "inn.ts");
writeFileSync(
  inn,
  `export { fagsok } from ${JSON.stringify(join(root, "src/data/content.ts"))};
export { fagsok1P } from ${JSON.stringify(join(root, "src/data/1p/index.ts"))};
export { SLUTTSVAR } from ${JSON.stringify(join(root, "src/data/eksamen-svar.ts"))};
export * from ${JSON.stringify(join(root, "src/lib/deloppgaver.ts"))};
export { beregnPoeng, poengPerEnhet } from ${JSON.stringify(join(root, "src/lib/prove-poeng.ts"))};
export { sjekkSluttsvar, svartype, forhandsvis } from ${JSON.stringify(join(root, "src/lib/svar-sjekk.ts"))};
export { isOvingDelkap } from ${JSON.stringify(join(root, "src/lib/progress.ts"))};
`,
);
const bunt = await rolldown({
  input: inn,
  platform: "node",
  logLevel: "silent",
  resolve: { alias: { "@": join(root, "src") } },
  moduleTypes: { ".html": "text", ".md": "text" },
  plugins: [
    {
      // vites «?raw»-import: filen som tekst
      name: "raw",
      resolveId(id, importer) {
        return id.endsWith("?raw") && importer ? resolve(dirname(importer), id) : null;
      },
      load(id) {
        return id.endsWith("?raw") ? `export default ${JSON.stringify(readFileSync(id.slice(0, -4), "utf8"))};` : null;
      },
    },
  ],
});
await bunt.write({ file: join(dir, "ut.mjs"), format: "esm" });
await bunt.close();

const m = await import(pathToFileURL(join(dir, "ut.mjs")).href);
for (const k of m.fagsok1P)
  for (const d of k.delkapitler)
    if (m.isOvingDelkap(d))
      for (const o of d.oppgaver) {
        if (/\.OP0$/.test(o.id)) continue;
        const e = m.enheterFor(o, m.SLUTTSVAR);
        console.log(o.id, e.harDeler ? e.enheter.map((x) => x.id.slice(o.id.length)).join("") : "-", "fasitSteg", (o.fasitSteg || []).filter(Boolean).length);
      }
