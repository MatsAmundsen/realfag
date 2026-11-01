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

test("fase 3: avrundingsregelen (≥ 2 gjeldende siffer, riktig avrundet i elevens siste siffer)", () => {
  const t = (verdi, ekstra = {}) => ({ svar: { type: "tall", verdier: [verdi], ...ekstra } });
  // Ingen eksplisitt toleranse
  const a = t(176.5);
  for (const s of ["177", "176,5", "176.5", "180"]) assert.equal(ok(s, a), true, s);
  for (const s of ["176", "178", "200", "170", "2·10^2"]) assert.equal(ok(s, a), false, s); // 176 avrundes feil (176,5 runder opp); 200 har ett siffer
  const k = t(142.6, {}), kcal = { svar: { type: "tall", verdier: [142.6] }, enhet: ["kcal"] };
  assert.equal(ok("143", k), true);
  assert.equal(ok("143 kcal", kcal), true);
  assert.equal(ok("142", k), false);
  // Smal toleranse
  const b = t(15.8654395893, { tol: { abs: 0.002 } });
  for (const s of ["15,87", "15,9", "16", "15,865", "15,8654"]) assert.equal(ok(s, b), true, s);
  for (const s of ["15,8", "15,86", "17", "15,88"]) assert.equal(ok(s, b), false, s);
  const c = t(1.93185165258, { tol: { abs: 0.02 } });
  for (const s of ["1,9", "1,93", "1,932", "1,94"]) assert.equal(ok(s, c), true, s); // 1,94 og 1,932: ligger i toleransen (bredere beholdes)
  for (const s of ["2", "1,8", "1,96"]) assert.equal(ok(s, c), false, s);
  // Negative tall, store heltall og standardform
  assert.equal(ok("-177", t(-176.5)), true);
  assert.equal(ok("177", t(-176.5)), false);
  const stor = t(104106277470);
  for (const s of ["104 106 277 470", "104 000 000 000", "1,04·10^11", "1,0\\cdot10^{11}", "1,04 * 10^11"]) assert.equal(ok(s, stor), true, s);
  for (const s of ["105 000 000 000", "1·10^11", "1,05·10^11"]) assert.equal(ok(s, stor), false, s);
  assert.equal(ok("104 milliarder", stor), true); // 3 siffer, riktig avrundet
  assert.equal(ok("105 milliarder", stor), false);
});

test("fase 3: små heltall er eksakte, og ingenAvrunding slår regelen av", () => {
  const h = { svar: { type: "tall", verdier: [48] } };
  assert.equal(ok("50", h), false);
  assert.equal(ok("48", h), true);
  assert.equal(ok("125", { svar: { type: "tall", verdier: [125] } }), true);
  assert.equal(ok("130", { svar: { type: "tall", verdier: [125] } }), false);
  const eks = { svar: { type: "tall", verdier: [176.5], ingenAvrunding: true } };
  assert.equal(ok("177", eks), false);
  assert.equal(ok("176,5", eks), true);
  const bredt = { svar: { type: "tall", verdier: [176.5], tol: { abs: 2 }, ingenAvrunding: true } };
  assert.equal(ok("178", bredt), true); // eksplisitt toleranse gjelder uansett
});

test("fase 3: avrunding i lister, fast og fri rekkefølge, og med enhet", () => {
  const fri = { svar: { type: "tall", verdier: [176.5, 15.8654395893], tol: { abs: 0.002 } } };
  assert.equal(ok("15,9 og 177", fri), true);
  assert.equal(ok("177; 15,87", fri), true);
  assert.equal(ok("176 og 15,9", fri), false);
  const fast = { svar: { type: "tall", verdier: [176.5, 15.8654395893], rekkefolge: "fast" } };
  assert.equal(ok("177; 15,9", fast), true);
  assert.equal(ok("15,9; 177", fast), false);
  const e = { svar: { type: "tall", verdier: [5123.4] }, enhet: ["g"] };
  assert.equal(ok("5,1 kg", e), true);
  assert.equal(ok("5,2 kg", e), false);
  assert.equal(ok("5123 g", e), true);
  assert.equal(ok("5 kg", e), false);
});

test("fase 3b: heltall-posisjoner krever eksakt likhet (1p-v24-d2-1b)", () => {
  const b = { svar: { type: "tall", verdier: [284, 4459.34], heltall: [0], rekkefolge: "fast", tol: { abs: 1 } }, enhet: ["bagetter", "kr", "kroner"] };
  for (const s of ["284 og 4459", "284 og 4459,34", "284 bagetter og 4459 kr", "(284, 4459)", "284, 4459"]) assert.equal(ok(s, b), true, s);
  for (const s of ["283 og 4459", "285 og 4459", "283 og 4459,33", "283,56 og 4459", "284,4 og 4459"]) assert.equal(ok(s, b), false, s);
});

test("fase 3b: etterfølgende nuller gir ikke grovere avrunding enn eleven skrev (B-1)", () => {
  const tt = (verdi, ekstra = {}) => ({ svar: { type: "tall", verdier: [verdi], ...ekstra } });
  const dager = { svar: { type: "tall", verdier: [96.164077971], tol: { abs: 3 } }, enhet: ["døgn", "dager"] };
  assert.equal(ok("100", dager), false); // 3,84 fra nøkkelen: utenfor toleransen, og «100» er ikke 96,16 avrundet
  assert.equal(ok("96", dager), true);
  assert.equal(ok("99", dager), true); // toleransen
  const smal = tt(96.164077971);
  assert.equal(ok("100", smal), false);
  assert.equal(ok("96", smal), true);
  assert.equal(ok("96,2", smal), true);
  assert.equal(ok("100", tt(99.7)), true); // helt tall, avvik under en halv enhet
  assert.equal(ok("100", tt(100.4)), true);
  assert.equal(ok("100", tt(100.6)), false);
  assert.equal(ok("200", tt(176.5)), false);
  assert.equal(ok("180", tt(176.5)), true);
  assert.equal(ok("140", tt(142.6)), true);
  assert.equal(ok("143", tt(142.6)), true);
  assert.equal(ok("250 000", tt(247865.961046)), true);
  assert.equal(ok("250000", tt(247865.961046)), true);
  assert.equal(ok("200 000", tt(247865.961046)), false); // ett ledende siffer: ikke en avrunding
  assert.equal(ok("1 600 000", tt(1632000)), true);
});

test("fase 3b: økningsord og + avvises for en nedgang (B-3)", () => {
  const n = { svar: { type: "tall", verdier: [-12] }, alternativer: [{ type: "tall", verdier: [12], ikkeOkning: true }], enhet: ["%", "% mindre", "prosent"] };
  for (const s of ["-12 %", "12 % mindre", "12 % nedgang", "12 %", "12 % reduksjon", "ikke en økning, 12 % reduksjon"]) assert.equal(ok(s, n), true, s);
  for (const s of ["+12 %", "12 % økning", "12 % større", "12 % mer", "12 % høyere", "12 % over", "økning på 12 %", "pluss 12 %"]) assert.equal(ok(s, n), false, s);
});

test("fase 3b: ulikhetsord og tegn tolkes konsekvent (B-4, P6.OP4)", () => {
  const p = { svar: { type: "serie", deler: [{ type: "uttrykk", uttrykk: "8400/x" }, { type: "tall", verdier: [70] }, { type: "tall", verdier: [56], ulikhet: "≥" }] }, enhet: ["kr", "kroner", "elever"] };
  const med = (d) => `8400/x; 70; ${d}`;
  for (const d of ["56", "x ≥ 56", "x>=56", "minst 56", "minst 56 elever", "mer enn eller lik 56", "flere enn 55", "mer enn 55", "x > 55", "x > 55,5", "x er minst 56"]) assert.equal(ok(med(d), p), true, d);
  for (const d of ["høyst 56", "maks 56", "maksimalt 56", "x ≤ 56", "mer enn 56", "flere enn 56", "x > 56", "x < 57", "færre enn 57", "mindre enn 56", "x > 54"]) assert.equal(ok(med(d), p), false, d);
});

test("fase 3b: «2,6» er alltid desimaltallet, aldri en liste (B-5)", () => {
  const to = { svar: { type: "tall", verdier: [2, 6] } };
  for (const s of ["2 og 6", "2, 6", "6, 2", "2; 6", "2,6,6"]) assert.equal(ok(s, to), true, s); // «2,6,6» har to komma: liste
  for (const s of ["2,6", "x=2,6", "2,6 og 6", "(2,6)"]) assert.equal(ok(s, to), false, s);
  assert.equal(ok("1,6,-2", tall3), true); // minst to komma: reservelesningen gjelder fortsatt
  assert.equal(ok("1,5", { svar: { type: "tall", verdier: [1.5] } }), true);
  const likn = { svar: { type: "likning", losninger: { x: [-2, 1, 8] } } };
  assert.equal(ok("-2,1,8", likn), true);
  assert.equal(ok("1,8", likn), false);
});

test("fase 3b: kJ/MJ, \\lor, «ganger 10^», liste i parentes og «a til b» (B-6)", () => {
  const j = { svar: { type: "tall", verdier: [18828000], tol: { rel: 0.005 } }, enhet: ["J"] };
  for (const s of ["18 828 000 J", "18828 kJ", "18,828 MJ", "18,8 MJ", "19 MJ"]) assert.equal(ok(s, j), true, s);
  for (const s of ["18828 J", "18,8 kJ", "188 MJ"]) assert.equal(ok(s, j), false, s);
  const m = { svar: { type: "tall", verdier: [4000000000] } };
  for (const s of ["4 ganger 10^9", "4 ganger 10^{9}", "4·10^9", "4 milliarder"]) assert.equal(ok(s, m), true, s);
  assert.equal(ok("4 ganger 10^8", m), false);
  const l = { svar: { type: "likning", losninger: { x: [-2, 1, 8] } } };
  assert.equal(ok("x = -2 \\lor x = 1 \\lor x = 8", l), true);
  const u = { svar: { type: "ulikhet", fra: -2, til: 6 } };
  for (const s of ["-2 til 6", "−2 til 6", "fra -2 til 6", "mellom -2 og 6", "-2 < x < 6"]) assert.equal(ok(s, u), true, s);
  for (const s of ["-2 til 5", "-3 til 6", "2 til 6"]) assert.equal(ok(s, u), false, s);
  assert.equal(ok("-6 til -1", { svar: { type: "ulikhet", fra: -6, til: -1, lukket: true } }), true);
});

test("fase 4b: svake økningsord teller bare rett ved prosenttallet (B-7)", () => {
  const n = { svar: { type: "tall", verdier: [-12] }, alternativer: [{ type: "tall", verdier: [12], ikkeOkning: true }], enhet: ["%", "% mindre", "prosent"] };
  for (const s of [
    "12 % nedgang over tid", "12 % reduksjon over perioden", "12 % nedgang, mer enn jeg trodde", "12 % nedgang, flere elever enn før",
    "ingen økning, men 12 % nedgang", "12 % reduksjon (ikke økning)", "ikke en økning, 12 % reduksjon", "12 % mindre, høyere pris", "12 % nedgang", "-12 %",
  ]) assert.equal(ok(s, n), true, s);
  for (const s of [
    "12 % mer", "mer enn 12 %", "12 % høyere", "høyere enn 12 %", "12 % større", "over 12 %", "12 prosent mer", "12 % mer enn før", "pluss 12 %",
    "flere enn 12 %", "12 % flere", "12 % økning", "økning på 12 %", "+12 %", "12 % nedgang over tid, men økning etterpå",
  ]) assert.equal(ok(s, n), false, s);
});
