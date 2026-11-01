// Tester den generelle svar-parseren (src/lib/svar-sjekk.ts): skrivemåter, kommaregelen og svartyper.
// Fila transpileres med typescript (parameter-egenskaper i klassen støttes ikke av --experimental-strip-types).
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ts = createRequire(join(root, "package.json"))("typescript");
const js = ts.transpileModule(readFileSync(join(root, "src/lib/svar-sjekk.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const dir = mkdtempSync(join(tmpdir(), "svar-sjekk-"));
writeFileSync(join(dir, "svar-sjekk.mjs"), js);
const { sjekkSluttsvar: ok, svartype } = await import(pathToFileURL(join(dir, "svar-sjekk.mjs")).href);

const likning = { svar: { type: "likning", losninger: { x: [-2, 1, 6] } } };
const tall1 = { svar: { type: "tall", verdier: [1.5], tol: { abs: 1e-9 } } };
const tall3 = { svar: { type: "tall", verdier: [1, 6, -2] } };

test("h25-d1-2: alle vanlige skrivemåter av x=1, x=6, x=-2", () => {
  for (const s of [
    "x=1, x=6, x=-2", "x=1 og x=6 og x=-2", "x = -2 eller x = 1 eller x = 6", "6, 1, -2", "1; 6; -2", "1, 6 og -2",
    "x=1,x=6,x=-2", "x=1, x=6, x=\u22122", "x=1 \u2228 x=6 \u2228 x=-2", "1,6,-2", "1 6 -2", "x=-2 og x=1 og x=6.",
    "Nullpunktene er x=1, x=6 og x=-2", "x ∈ {-2, 1, 6}", "x1=1, x2=6, x3=-2", "x=1\nx=6\nx=-2", "x=1.0, x=6, x=-2",
  ]) assert.equal(ok(s, likning), true, s);
  for (const s of ["x=1, x=6", "x=1, x=6, x=-2, x=3", "1, 6, 2", "1 og 6", "x=-1, x=-6, x=2", ""]) assert.equal(ok(s, likning), false, s);
});

test("kommaregel: desimalkomma mellom sifre, ellers listeskille", () => {
  assert.equal(ok("1,5", tall1), true);
  assert.equal(ok("1.5", tall1), true);
  assert.equal(ok("1, 5", tall1), false); // liste med to tall, ikke 1,5
  assert.equal(ok("1,5,5", tall1), false);
  assert.equal(ok("1, 6, -2", tall3), true);
  assert.equal(ok("1,6,-2", tall3), true); // ingen tall i nøkkelen har desimaler: les som liste
  assert.equal(ok("1,6", tall3), false); // fortsatt for få tall
});

test("ledende ord, f(x)=, trailing punktum, minus og nbsp", () => {
  assert.equal(ok("Svaret er 1,5.", tall1), true);
  assert.equal(ok("x = 1,5", tall1), true);
  const f = { svar: { type: "uttrykk", uttrykk: "-2x^2+3x" } };
  for (const s of ["f(x)=-2x^2+3x", "y = \u22122x**2 + 3x", "3x-2x²", "Funksjonen er f(x)=-2x^{2}+3x"]) assert.equal(ok(s, f), true, s);
  assert.equal(ok("-2x^2+3x+1", f), false);
  const kr = { svar: { type: "tall", verdier: [12000] }, enhet: ["kr", "kroner"] };
  for (const s of ["12 000 kr", "12\u00a0000", "12000", "12 000,00 kroner"]) assert.equal(ok(s, kr), true, s);
  assert.equal(ok("12 000 kg", kr), false);
});

test("punkt og intervall", () => {
  const p = { svar: { type: "punkt", punkter: [[-3, -5], [2, 0]] } };
  for (const s of ["(-3,-5) og (2,0)", "(2, 0), (-3, -5)", "x=-3, y=-5 og x=2, y=0", "(\u22123; \u22125) og (2; 0)"]) assert.equal(ok(s, p), true, s);
  assert.equal(ok("(-5,-3) og (0,2)", p), false);
  const iv = { svar: { type: "ulikhet", fra: -2, til: 6 } };
  for (const s of ["-2<x<6", "x∈(-2, 6)", "x>-2 og x<6", "(-2,6)"]) assert.equal(ok(s, iv), true, s);
  assert.equal(ok("-2≤x≤6", iv), false);
});

test("svartype", () => {
  assert.equal(svartype(tall1), "tall");
  assert.equal(svartype(tall3), "flere tall");
  assert.equal(svartype(likning), "løsningsmengde");
  assert.equal(svartype(undefined), "selvvurdering");
  assert.equal(svartype({ ...tall1, selvvurder: true }), "selvvurdering");
});

test("fase 2: ±, k≠4, rotuttrykk i lister, x\\sqrt{3}", () => {
  const pm = { svar: { type: "likning", losninger: { x: [-3, 3] } } };
  for (const s of ["x=±3", "x = \\pm 3", "x=3 eller x=-3"]) assert.equal(ok(s, pm), true, s);
  assert.equal(ok("x=3", pm), false);
  const k = { svar: { type: "tall", verdier: [4] } };
  assert.equal(ok("k≠4", k), false);
  assert.equal(ok("k != 4", k), false);
  assert.equal(ok("k=4", k), true);
  const rot = { svar: { type: "serie", deler: [{ type: "tall", verdier: [47] }, { type: "uttrykk", uttrykk: "14+6*sqrt(5)" }, { type: "uttrykk", uttrykk: "6-2*x*sqrt(3)" }] } };
  assert.equal(ok("47; 14+6√5; 6-2x\\sqrt{3}", rot), true);
  assert.equal(ok("47; 14+6√5; 6-2x√3", rot), true);
  assert.equal(ok("47; 14+6√5; 6-2x√2", rot), false);
});

test("fase 2: punkter med p=/q= og semikolon", () => {
  const p = { svar: { type: "punkt", punkter: [[4, 3], [3, 1], [-2, 6]] } };
  for (const s of ["(4,3); (3,1) og (-2,6)", "(p,q)=(4,3); (3,1) og (-2,6)", "(4;3); (3;1) og (-2;6)"]) assert.equal(ok(s, p), true, s);
  assert.equal(ok("(3,4); (1,3) og (6,-2)", p), false);
});

test("fase 2: millioner, milliarder, billioner og prosent nedgang", () => {
  const mrd = { svar: { type: "tall", verdier: [9e9], ord: true } };
  for (const s of ["9 milliarder", "9 000 000 000", "9·10^9", "9 mrd", "9000 millioner", "9E9"]) assert.equal(ok(s, mrd), true, s);
  for (const s of ["9 millioner", "90 milliarder", "9"]) assert.equal(ok(s, mrd), false, s);
  const bill = { svar: { type: "tall", verdier: [2e12] } };
  assert.equal(ok("2 billioner", bill), true);
  const ned = { svar: { type: "tall", verdier: [-15], nedgang: true } };
  for (const s of ["-15 %", "15 % nedgang", "nedgang på 15 %", "minus 15 %"]) assert.equal(ok(s, ned), true, s);
  assert.equal(ok("15 % økning", ned), false);
});

test("fase 2: intervallet (−2,6) mot desimaltallet −2,6 etter type i nøkkelen", () => {
  const iv = { svar: { type: "ulikhet", fra: -2, til: 6 } };
  const tall = { svar: { type: "tall", verdier: [-2.6] } };
  assert.equal(ok("(−2,6)", iv), true);
  assert.equal(ok("−2,6", iv), false);
  assert.equal(ok("−2,6", tall), true);
  assert.equal(ok("(−2,6)", tall), true); // type fra nøkkelen: tall-nøkkel leser komma mellom sifre som desimal
});

test("fase 2: enheter omregnes, 1,4 kg godtas ikke feil", () => {
  const g = { svar: { type: "tall", verdier: [5100] }, enhet: ["g"] };
  assert.equal(ok("5,1 kg", g), true);
  assert.equal(ok("5100 g", g), true);
  assert.equal(ok("5,1 g", g), false);
  const kg = { svar: { type: "tall", verdier: [1.4], tol: { abs: 0.05 } }, enhet: ["g"] };
  assert.equal(ok("1,4 kg", kg), false);
});

test("fase 2: grader, retning, heltall og ulikhet som svar", () => {
  const s = { svar: { type: "tall", verdier: [48 * Math.sqrt(10) * Math.sin(Math.PI / 12)], tol: { rel: 0.002 } } };
  assert.equal(ok("48√10·sin(15°)", s), true);
  const minus = { svar: { type: "tall", verdier: [-12] }, alternativer: [{ type: "tall", verdier: [12], ikkeOkning: true }] };
  for (const t of ["-12 %", "12 % mindre", "12 %", "reduksjon på 12 %"]) assert.equal(ok(t, minus), true, t);
  assert.equal(ok("12 % økning", minus), false);
  const antall = { svar: { type: "tall", verdier: [284, 4459.34], rekkefolge: "fast", tol: { abs: 1 }, heltall: [0] }, enhet: ["bagetter", "kr"] };
  assert.equal(ok("284 bagetter og 4459 kr", antall), true);
  assert.equal(ok("283,56 bagetter og 4459,36 kr", antall), false);
  const min = { svar: { type: "tall", verdier: [56], ulikhet: "≥" } };
  assert.equal(ok("x ≥ 56", min), true);
  assert.equal(ok("x ≤ 56", min), false);
  assert.equal(ok("56", min), true);
});

test("fase 2: likninger med prosa, mellomrom og polynomkoeffisienter", () => {
  const as = { svar: { type: "likning", losninger: { x: [-0.5], y: [6] } } };
  assert.equal(ok("Vertikal asymptote: x = -1/2. Horisontal asymptote: y = 6.", as), true);
  const tre = { svar: { type: "likning", losninger: { x: [-2, 1, 8] } } };
  assert.equal(ok("x=-2 x=1 x=8", tre), true);
  const abcd = { svar: { type: "likning", losninger: { a: [0.15], b: [0.175], c: [-1.1], d: [6.3] } } };
  assert.equal(ok("f(x)=0,15x^3+0,175x^2-1,1x+6,3", abcd), true);
  assert.equal(ok("f(x)=0,15x^3+0,175x^2-1,1x+6,4", abcd), false);
});
