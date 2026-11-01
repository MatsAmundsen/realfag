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
