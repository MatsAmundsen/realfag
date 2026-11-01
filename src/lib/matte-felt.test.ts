import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { latexTilSvartekst, svartekstTilLatex } from "./matte-felt.ts";
import { sjekkSluttsvar } from "./svar-sjekk.ts";
import { SLUTTSVAR } from "../data/eksamen-svar.ts";

/**
 * LaTeX slik <math-field> (MathLive 0.111, decimalSeparator=",", mathModeSpace="\;")
 * faktisk lager det når eleven skriver tegnene i første kolonne (målt i Chrome).
 */
const FRA_MATHLIVE: Array<[skrevet: string, latex: string, tekst: string]> = [
  ["x^2", "x^2", "x^2"],
  ["x^-2", "x^{-2}", "x^(-2)"],
  ["x^(1/2)", "x^{\\frac12}", "x^(1/2)"],
  ["x^12", "x^{12}", "x^12"],
  ["sqrt(2)", "\\sqrt2", "sqrt(2)"],
  ["sqrt(x+1)", "\\sqrt{\\left(x+1\\right)}", "sqrt(x+1)"],
  ["1/2", "\\frac12", "1/2"],
  ["x/2", "\\frac{x}{2}", "x/2"],
  ["(x+1)/(x-1)", "\\frac{\\left(x+1\\right)}{\\left(x-1\\right)}", "(x+1)/(x-1)"],
  ["(x+1)/(x-1) uten parentes", "\\frac{x+1}{x-1}", "(x+1)/(x-1)"],
  ["2,5", "2{,}5", "2,5"],
  ["-2,5", "-2{,}5", "-2,5"],
  ["−3 (Unicode-minus)", "−3", "-3"],
  ["pi", "\\pi", "pi"],
  ["2pi", "2\\pi", "2pi"],
  ["x=1, x=6", "x=1{,}\\;x=6", "x=1, x=6"],
  ["x=1,x=6", "x=1{,}x=6", "x=1, x=6"],
  ["x=1 og x=6", "x=1\\;og\\;x=6", "x=1 og x=6"],
  ["(2, 3)", "\\left(2{,}\\;3\\right)", "(2, 3)"],
  ["24 kr", "24\\;kr", "24 kr"],
  ["3*x", "3\\cdot x", "3*x"],
  ["x<=3", "x\\le3", "x<=3"],
  ["x>=3", "x\\ge3", "x>=3"],
  ["25%", "25\\%", "25%"],
  ["sin(x)", "\\sin\\left(x\\right)", "sin(x)"],
  ["ln(x)", "\\ln\\left(x\\right)", "ln(x)"],
  ["f(x)=2x+1", "f\\left(x\\right)=2x+1", "f(x)=2x+1"],
  ["√2", "\\surd2", "√2"],
  ["x_1", "x_1", "x_1"],
  ["56,8°", "56{,}8°", "56,8°"],
  ["1/2 + 3/4", "\\frac12+\\frac34", "1/2+3/4"],
  ["2x/3", "\\frac{2x}{3}", "(2x)/3"],
  ["1/(2x)", "\\frac{1}{\\left(2x\\right)}", "1/(2x)"],
  ["x^2/3", "\\frac{x^2}{3}", "x^2/3"],
  ["-1/2", "\\frac{-1}{2}", "(-1)/2"],
  ["kvadratrot av 2", "\\sqrt[3]{x}", "(x)^(1/3)"],
  ["|x|", "\\left|x\\right|", "abs(x)"],
];

describe("latexTilSvartekst (MathLive → lagret tekst)", () => {
  for (const [skrevet, latex, tekst] of FRA_MATHLIVE) {
    it(`${skrevet}  →  ${tekst}`, () => {
      assert.equal(latexTilSvartekst(latex), tekst);
    });
  }

  it("tomt felt gir tom tekst", () => {
    assert.equal(latexTilSvartekst(""), "");
  });

  it("desimalkomma blir aldri til skilletegn, og skilletegn får mellomrom", () => {
    assert.equal(latexTilSvartekst("1{,}5"), "1,5");
    assert.equal(latexTilSvartekst("a=1{,}5{,}b=2"), "a=1,5, b=2");
    assert.equal(latexTilSvartekst("1{,}\\;2{,}5"), "1, 2,5");
  });

  it("ukjente kommandoer og plassholdere gir ikke søppel", () => {
    assert.equal(latexTilSvartekst("x\\placeholder{}"), "x");
    assert.equal(latexTilSvartekst("\\unknowncmd 3"), "3");
  });

  it("funksjonsnavn får mellomrom når parentes ikke følger (sin x ≠ sinx)", () => {
    assert.equal(latexTilSvartekst("\\sin x"), "sin x");
  });
});

/** Gammel lagret ren tekst skal vises riktig i feltet og gi samme tekst tilbake. */
const GAMMEL_TEKST = [
  "x^2",
  "x^(1/2)",
  "sqrt(2)",
  "1/2",
  "(x+1)/(x-1)",
  "2,5",
  "-3",
  "-2,5",
  "pi",
  "2pi",
  "x=1, x=6",
  "x=1 og x=6",
  "(-2,0) og (4,0)",
  "(−3, 0), (−1, 0), (2, 0)",
  "5,04",
  "a = 5,04",
  "600 m²",
  "600 m^2",
  "f(x)=-2x^2+2x+24",
  "y = 2x + 1",
  "x<=3",
  "−2 < x < 3",
  "3*x",
  "3·x",
  "4π",
  "√2",
  "sin(x)+cos(x)",
  "ca. 96 døgn",
  "1/2x",
  "x/(2x+1)",
  "2^(x+1)",
  "e^(-x)",
];

describe("svartekstTilLatex (gammel tekst → felt) og tilbake", () => {
  it("brøk, potens, rot og pi blir ekte matematikk i feltet", () => {
    assert.equal(svartekstTilLatex("x^2"), "x^{2}");
    assert.equal(svartekstTilLatex("x^(1/2)"), "x^{\\frac{1}{2}}");
    assert.equal(svartekstTilLatex("sqrt(2)"), "\\sqrt{2}");
    assert.equal(svartekstTilLatex("1/2"), "\\frac{1}{2}");
    assert.equal(svartekstTilLatex("(x+1)/(x-1)"), "\\frac{x+1}{x-1}");
    assert.equal(svartekstTilLatex("2,5"), "2{,}5");
    assert.equal(svartekstTilLatex("pi"), "\\pi");
    assert.equal(svartekstTilLatex(""), "");
  });

  it("desimalkomma og liste skilles riktig", () => {
    assert.equal(svartekstTilLatex("x=1, x=6"), "x=1{,}\\;x=6");
    assert.equal(svartekstTilLatex("(-2,0) og (4,0)"), "\\left(-2{,}0\\right)\\;og\\;\\left(4{,}0\\right)");
  });

  it("linjeskift fra gamle svar blir semikolon", () => {
    assert.equal(latexTilSvartekst(svartekstTilLatex("a = 2\nb = 6")), "a = 2; b = 6");
  });

  for (const t of GAMMEL_TEKST) {
    it(`rundtur beholder verdien: ${t}`, () => {
      const igjen = latexTilSvartekst(svartekstTilLatex(t));
      // Samme tekst, bortsett fra mellomrom rundt operatorer og ekstra parenteser rundt teller/nevner.
      const strip = (s: string) => s.replace(/\s+/g, "").replace(/[−–]/g, "-").replace(/[·×]/g, "*");
      const lik =
        strip(igjen) === strip(t) ||
        // godkjente omskrivinger: brøker får parentes, √ og π normaliseres
        strip(igjen) === strip(t).replace(/√(\w+)/g, "sqrt($1)").replace(/π/g, "pi").replace(/²/g, "^2");
      assert.ok(lik, `${JSON.stringify(t)} → ${JSON.stringify(igjen)}`);
    });
  }
});

/**
 * Sjekker: samme svar godtas/avvises av den eksisterende parseren før og etter
 * rundturen svartekst → felt → svartekst. Testbanken er elevvarianter.json fra
 * 1p-bibliotek (hoppes over hvis filen ikke finnes på maskinen).
 */
const BANK = process.env.ELEVVARIANTER ?? "/workspace/1p-bibliotek/review/elevvarianter.json";

describe("sjekkSluttsvar er upåvirket av adapteren", () => {
  it("gjenkjenner de samme svarene (eksempler)", () => {
    const fasit = SLUTTSVAR["v23-d1-3"];
    for (const t of ["a=2, b=6", "a = 2 og b = 6", "b=6, a=2", "a=-2, b=6"]) {
      assert.equal(
        sjekkSluttsvar(latexTilSvartekst(svartekstTilLatex(t)), fasit),
        sjekkSluttsvar(t, fasit),
        t,
      );
    }
  });

  it("elevvarianter.json: alle riktige/feil svar får samme dom etter rundtur", { skip: !existsSync(BANK) }, () => {
    const bank = JSON.parse(readFileSync(BANK, "utf8")) as Record<string, { riktige: string[]; feil: string[] }>;
    let antall = 0;
    const avvik: string[] = [];
    for (const [id, v] of Object.entries(bank)) {
      const fasit = SLUTTSVAR[id];
      if (!fasit) continue;
      for (const s of [...(v.riktige ?? []), ...(v.feil ?? [])]) {
        // Banken har noen flerlinjers svar. Feltet er enlinjes, så linjeskift kan ikke oppstå der.
        if (s.includes("\n")) continue;
        antall++;
        const via = latexTilSvartekst(svartekstTilLatex(s));
        const a = sjekkSluttsvar(s, fasit);
        const b = sjekkSluttsvar(via, fasit);
        if (a !== b) avvik.push(`${id}: ${JSON.stringify(s)} → ${JSON.stringify(via)} (${a} → ${b})`);
      }
    }
    assert.ok(antall > 100, `bare ${antall} svar sjekket`);
    // Avvik som gjør et svar *feil* som før var riktig er ikke tillatt. Det motsatte
    // (x=1,x=6 uten mellomrom, som banken regner som riktig) er en forbedring.
    const regresjoner = avvik.filter((a) => a.endsWith("(true → false)"));
    assert.deepEqual(regresjoner, []);
    const nyeRiktige = avvik.filter((a) => a.endsWith("(false → true)"));
    for (const a of nyeRiktige) {
      const id = a.split(":")[0];
      const bankSvar = bank[id];
      const tekst = JSON.parse(a.slice(id.length + 2, a.indexOf(" → ")));
      assert.ok(bankSvar.riktige.includes(tekst), `ny feil-positiv: ${a}`);
    }
  });

  it("det MathLive lager av 'riktige' tegn godtas av sjekkeren (typiske svar)", () => {
    const cases: Array<[string, string, boolean]> = [
      ["v23-d1-3", "a=2{,}\\;b=6", true],
      ["v23-d2-1b", "5{,}04", true],
      ["v23-d2-1b", "20{,}16", false],
      ["v24-d1-5a", "-2x^2+2x+24", true],
      ["v24-d1-5a", "-2x^{2}+2x+24", true],
      ["h23-d1-3", "5-4x", true],
    ];
    for (const [id, latex, forventet] of cases) {
      assert.equal(sjekkSluttsvar(latexTilSvartekst(latex), SLUTTSVAR[id]), forventet, `${id} ${latex}`);
    }
  });
});
