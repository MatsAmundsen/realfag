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

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
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

const oppgaver = [];
for (const [fag, fs] of [["1T", m.fagsok], ["1P", m.fagsok1P]])
  for (const k of fs)
    for (const d of k.delkapitler)
      if (m.isOvingDelkap(d)) for (const o of d.oppgaver) if (!/\.OP0$/.test(o.id)) oppgaver.push({ fag, o });

const alle = oppgaver.map(({ fag, o }) => ({ fag, o, e: m.enheterFor(o, m.SLUTTSVAR) }));

test("alle øveprøveoppgavene er med (1T og 1P)", () => {
  assert.ok(alle.filter((x) => x.fag === "1T").length >= 60);
  assert.ok(alle.filter((x) => x.fag === "1P").length >= 30);
  assert.equal(new Set(alle.map((x) => x.o.id)).size, alle.length, "oppgave-id-er er unike");
});

test("hver oppgave har minst én enhet, og enhets-id-ene er unike på tvers av alle øveprøver", () => {
  const ids = alle.flatMap((x) => x.e.enheter.map((en) => en.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const x of alle) {
    assert.ok(x.e.enheter.length >= 1, x.o.id);
    if (x.e.harDeler) {
      assert.ok(x.e.enheter.length >= 2, x.o.id);
      x.e.enheter.forEach((en, i) => {
        assert.equal(en.id, `${x.o.id}${String.fromCharCode(97 + i)}`);
        assert.ok(en.tekst.replace(/<[^>]+>/g, "").trim().length > 0, en.id);
      });
    } else {
      assert.deepEqual(x.e.enheter.map((en) => en.id), [x.o.id]);
    }
  }
});

test("oppgaver med deler: 1:1 mellom deler og fasitSteg. Alt annet er én enhet", () => {
  for (const x of alle) {
    if (x.e.harDeler) assert.equal(x.e.enheter.length, (x.o.fasitSteg || []).filter(Boolean).length, x.o.id);
  }
  const medDeler = alle.filter((x) => x.e.harDeler).length;
  const delerTotalt = alle.reduce((s, x) => s + (x.e.harDeler ? x.e.enheter.length : 0), 0);
  assert.ok(medDeler >= 70, `oppgaver med deler: ${medDeler}`);
  assert.ok(delerTotalt >= 200, `deler totalt: ${delerTotalt}`);
});

test("poeng: hver oppgave gir 1 p i alt, uansett antall deler", () => {
  for (const x of alle) {
    const n = x.e.enheter.length;
    const poengEnheter = x.e.enheter.map((en) => ({ id: en.id, maks: m.poengPerEnhet(undefined, n), fasit: en.fasit }));
    const sum = poengEnheter.reduce((s, p) => s + p.maks, 0);
    assert.ok(Math.abs(sum - 1) < 1e-5, `${x.o.id}: ${sum}`);
    const r = m.beregnPoeng(poengEnheter, {}, {});
    assert.ok(Math.abs(r.maks - 1) < 1e-5, `${x.o.id}: maks ${r.maks}`);
    assert.deepEqual(Object.keys(r.deler).sort(), poengEnheter.map((p) => p.id).sort());
  }
});

test("fasit per del: tall-oppdelte deler godtar sin egen verdi, og serie-deler er gyldige spec", () => {
  let tallDeler = 0;
  for (const x of alle) {
    if (!x.e.harDeler) continue;
    const task = m.SLUTTSVAR[x.o.id];
    if (!task || task.svar.type !== "tall" || task.svar.verdier.length !== x.e.enheter.length) continue;
    x.e.enheter.forEach((en, i) => {
      if (m.SLUTTSVAR[en.id]) return; // egen oppføring har prioritet
      assert.equal(en.fasit?.svar.type, "tall", en.id);
      assert.deepEqual(en.fasit.svar.verdier, [task.svar.verdier[i]], en.id);
      tallDeler++;
    });
  }
  assert.ok(tallDeler >= 1, `tall-delte deler: ${tallDeler}`);
  for (const x of alle) for (const en of x.e.enheter) if (en.fasit) assert.ok(typeof m.svartype(en.fasit) === "string", en.id);
});

test("oppføringer i SLUTTSVAR med del-nøkkel (<oppgave><bokstav>) peker på en ekte del (ingen foreldreløse)", () => {
  const delIder = new Set(alle.filter((x) => x.e.harDeler).flatMap((x) => x.e.enheter.map((en) => en.id)));
  const oppgaveIder = new Set(alle.map((x) => x.o.id));
  for (const nokkel of Object.keys(m.SLUTTSVAR)) {
    const mm = /^(P?\d+\.OP\d+)[a-z]$/.exec(nokkel);
    if (!mm) continue;
    assert.ok(oppgaveIder.has(mm[1]), `${nokkel}: oppgaven finnes ikke`);
    assert.ok(delIder.has(nokkel), `${nokkel}: oppgaven lar seg ikke dele (fallback til hel oppgave), bruk ${mm[1]} i stedet`);
  }
});

test("en oppgavefasit som ikke kan deles på delene går ikke tapt: oppgaven er da én enhet", () => {
  for (const x of alle) {
    if (x.e.harDeler && m.SLUTTSVAR[x.o.id]) assert.ok(x.e.enheter.some((en) => en.fasit), x.o.id);
  }
  const fri = alle.reduce((s, x) => s + x.e.enheter.filter((en) => !en.fasit).length, 0);
  const total = alle.reduce((s, x) => s + x.e.enheter.length, 0);
  console.log(`  info: ${total} enheter totalt, ${fri} med fritt felt, ${total - fri} med fasit`);
});

test("gamle innleveringer: oppgaven leses som én enhet med oppgavens id", () => {
  for (const x of alle) {
    const g = m.enheterFor(x.o, m.SLUTTSVAR, true);
    assert.deepEqual(g.enheter.map((en) => en.id), [x.o.id]);
    assert.equal(g.enheter[0].fasit, m.SLUTTSVAR[x.o.id]);
  }
});

test("gamle utkast flyttes uten tap for alle oppgaver", () => {
  const answers = {};
  const ferdig = {};
  for (const x of alle) {
    answers[x.o.id] = `utregning ${x.o.id}`;
    answers[`${x.o.id}::sluttsvar`] = "1; 2; 3; 4; 5; 6";
    ferdig[x.o.id] = true;
  }
  const r = m.migrerUtkast(alle.map((x) => x.o), m.SLUTTSVAR, { answers, ferdig });
  for (const x of alle) {
    const f = x.e.enheter[0].id;
    assert.ok(r.answers[f]?.includes(`utregning ${x.o.id}`), f);
    assert.ok(x.e.enheter.every((en) => r.ferdig[en.id]), x.o.id);
    if (x.e.harDeler) {
      assert.equal(x.o.id in r.answers, false);
      assert.equal(`${x.o.id}::sluttsvar` in r.answers, false);
    }
  }
  const igjen = m.migrerUtkast(alle.map((x) => x.o), m.SLUTTSVAR, { answers: r.answers, ferdig: r.ferdig });
  assert.equal(igjen.endret, false);
});
