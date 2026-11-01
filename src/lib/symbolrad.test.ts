import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { latexTilSvartekst, svartekstTilLatex } from "./matte-felt.ts";
import { forhandsvis, lesRelasjoner, sjekkSluttsvar, svartype, type Sluttsvar } from "./svar-sjekk.ts";
import { SPESIALTEGN, STANDARD_GRUPPER, symbolerFor } from "./symbolrad.ts";
import { SLUTTSVAR } from "../data/eksamen-svar.ts";

const tegn = (l: ReturnType<typeof symbolerFor>) => l.map((s) => s.tegn).join("");

describe("SPESIALTEGN", () => {
  it("har alle tretten tegnene med norsk navn og riktig LaTeX", () => {
    assert.equal(tegn(SPESIALTEGN), "∈∉ℕℤℚℝ√π≤≥≠±°");
    const fasit: Record<string, [string, string]> = {
      "∈": ["\\in", "er element i"],
      "∉": ["\\notin", "ikke element i"],
      ℕ: ["\\mathbb{N}", "naturlige tall"],
      ℤ: ["\\mathbb{Z}", "hele tall"],
      ℚ: ["\\mathbb{Q}", "rasjonale tall"],
      ℝ: ["\\mathbb{R}", "reelle tall"],
      "√": ["\\sqrt{#?}", "kvadratrot"],
      π: ["\\pi", "pi"],
      "≤": ["\\le", "mindre enn eller lik"],
      "≥": ["\\ge", "større enn eller lik"],
      "≠": ["\\ne", "ikke lik"],
      "±": ["\\pm", "pluss eller minus"],
      "°": ["^\\circ", "grader"],
    };
    for (const s of SPESIALTEGN) assert.deepEqual([s.latex, s.navn], fasit[s.tegn], s.tegn);
  });
  it("hver LaTeX-innsetting ender som lesbar lagret tekst (rundtur)", () => {
    for (const s of SPESIALTEGN) {
      const lagret = latexTilSvartekst(s.latex.replace("#?", "2"));
      assert.ok(lagret.length > 0, s.tegn);
      assert.doesNotMatch(lagret, /\\/, `${s.tegn} → ${lagret}`);
    }
  });
});

describe("symbolerFor", () => {
  it("uten signaler: standardsettet", () => {
    assert.equal(tegn(symbolerFor(undefined, "Regn ut 3 + 4.")), "√π±°");
    assert.equal(STANDARD_GRUPPER.length, 4);
  });
  it("tilhører-fasit gir mengdetegn", () => {
    const f = { svar: { type: "relasjon", tegn: ["∈"] } };
    assert.equal(tegn(symbolerFor(f)), "∈∉ℕℤℚℝ");
  });
  it("oppgavetekst med mengder gir mengdetegn, med kvadratrot gir √", () => {
    assert.equal(tegn(symbolerFor(undefined, "Er $-3 \\in \\mathbb{N}$?")), "∈∉ℕℤℚℝ");
    assert.equal(tegn(symbolerFor(undefined, "Hvilke av tallene tilhører ℚ?")), "∈∉ℕℤℚℝ");
    assert.equal(tegn(symbolerFor(undefined, "Forenkle $\\sqrt{18}$")), "√");
  });
  it("ulikheter og kombinasjoner", () => {
    assert.equal(tegn(symbolerFor(undefined, "Løs ulikheten $x \\le 3$")), "≤≥≠");
    assert.equal(tegn(symbolerFor({ svar: { type: "ulikhet", fra: 1, til: 2 } })), "≤≥≠");
    assert.equal(tegn(symbolerFor(undefined, "Tallmengder og $\\sqrt{2}$")), "∈∉ℕℤℚℝ√");
  });
  it("eksplisitt liste vinner over utledning", () => {
    assert.equal(tegn(symbolerFor({ symboler: ["pi"] }, "tallmengder ℕ")), "π");
    assert.equal(tegn(symbolerFor({ symboler: [] }, "tallmengder ℕ")), "");
  });
  it("1.OP1a har mengdetegn og kvadratrot", () => {
    assert.equal(tegn(symbolerFor(SLUTTSVAR["1.OP1a"])), "∈∉ℕℤℚℝ√");
  });
});

describe("tilhører / tilhører ikke", () => {
  const fasit: Sluttsvar = { svar: { type: "relasjon", tegn: ["∉", "∈", "∈"] } };
  const riktige = [
    "∉, ∈, ∈",
    "∉ ∈ ∈",
    "\\notin, \\in, \\in",
    "ikke element i, element i, element i",
    "ikke element i; er element i; er element i",
    "ikke i, i, i",
    "er ikke element i, er element i, er element i",
    "tilhører ikke, tilhører, tilhører",
    "ikke ∈, ∈, ∈",
    "∉,∈,∈",
  ];
  for (const svar of riktige) it(`godtar «${svar}»`, () => assert.equal(sjekkSluttsvar(svar, fasit), true));
  for (const svar of ["∈, ∈, ∈", "∈, ∈, ∉", "ikke i, ikke i, i", "∉, ∈", "", "ℤ"])
    it(`avviser «${svar}»`, () => assert.equal(sjekkSluttsvar(svar, fasit), false));
  it("lesRelasjoner leser rekkefølgen", () => {
    assert.deepEqual(lesRelasjoner("ikke element i, element i"), ["∉", "∈"]);
    assert.deepEqual(lesRelasjoner("x ∈ ℤ"), ["∈"]);
  });
  it("forhåndsvisning og svartype", () => {
    assert.deepEqual(forhandsvis("∉, ∈", fasit.svar), { ok: true, latex: "\\notin,\\quad \\in" });
    assert.deepEqual(forhandsvis("hei", fasit.svar), { ok: false });
    assert.equal(svartype(fasit), "tilhører");
  });
  it("MathLive-LaTeX → lagret tekst → sjekk", () => {
    const latex = "\\notin,\\;\\in,\\;\\in";
    assert.equal(sjekkSluttsvar(latexTilSvartekst(latex), fasit), true);
  });
});

describe("tallmengder i LaTeX-rundturen", () => {
  const par: Array<[latex: string, tekst: string]> = [
    ["\\mathbb{N}", "ℕ"],
    ["\\mathbb{Z}", "ℤ"],
    ["\\mathbb{Q}", "ℚ"],
    ["\\mathbb{R}", "ℝ"],
    ["x\\in\\mathbb{Z}", "x ∈ ℤ"],
    ["x\\notin\\mathbb{N}", "x ∉ ℕ"],
    ["\\le", "<="],
    ["\\ge", ">="],
    ["\\ne", "!="],
  ];
  for (const [latex, tekst] of par) it(`${latex} ↔ ${tekst}`, () => {
    assert.equal(latexTilSvartekst(latex), tekst);
    assert.equal(latexTilSvartekst(svartekstTilLatex(tekst)), tekst);
  });
  it("∈ ∉ ℕ ℤ ℚ ℝ blir LaTeX i feltet", () => {
    const l = svartekstTilLatex("x ∈ ℤ, y ∉ ℕ, ℚ, ℝ");
    for (const k of ["\\in", "\\notin", "\\mathbb{Z}", "\\mathbb{N}", "\\mathbb{Q}", "\\mathbb{R}"]) assert.ok(l.includes(k), k);
  });
});

describe("ulikhetstegn er likeverdige", () => {
  const lukket = SLUTTSVAR["v26-d1-1"];
  const aapen = SLUTTSVAR["v25-d1-2"];
  it("≤ ≥ og <= >= og \\le \\ge gir samme resultat", () => {
    for (const s of ["-6<=x<=-1", "-6 ≤ x ≤ -1", "−6 ≤ x ≤ −1", latexTilSvartekst("-6\\le x\\le-1"), "x ≥ -6 og x ≤ -1", "x>=-6 og x<=-1"])
      assert.equal(sjekkSluttsvar(s, lukket), true, s);
    assert.equal(sjekkSluttsvar("-6<x<-1", lukket), false);
  });
  it("åpent intervall tar ikke ≤", () => {
    assert.equal(sjekkSluttsvar("-2<x<6", aapen), true);
    assert.equal(sjekkSluttsvar("-2 ≤ x ≤ 6", aapen), false);
  });
  it("≠ og != behandles likt", () => {
    for (const f of [lukket, aapen]) assert.equal(sjekkSluttsvar("x ≠ 3", f), sjekkSluttsvar("x != 3", f));
  });
});
