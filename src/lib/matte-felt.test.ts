import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
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
  ["(x+1)/(x-1), x=2 (komma blir stående i nevneren)", "x=\\frac{\\left(x+1\\right)}{\\left(x-1\\right),}\\;x=2", "x=(x+1)/(x-1), x=2"],
  ["1/2, x=3", "\\frac{1}{2{,}}\\;x=3", "1/2, x=3"],
  ["1/2,5", "\\frac{1}{2{,}5}", "1/2,5"],
  ["sqrt(2)+1 (med parentes)", "\\sqrt{\\left(2\\right)}+1", "sqrt(2)+1"],
  ["x^(1/2)+1", "x^{\\left(\\frac12\\right)}+1", "x^(1/2)+1"],
  ["1/2+3", "\\frac12+3", "1/2+3"],
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

/** LaTeX-kommandoer skrevet som tekst skal beholde backslash og kommandonavn gjennom feltet. */
describe("rundtur beholder LaTeX-kommandoer i lagret tekst", () => {
  const LATEX_TEKST = [
    "\\frac{9+6\\sqrt{3}}{4}",
    "\\frac{5}{6}, \\frac{2}{3}, \\frac{3}{10}",
    "2\\cdot10^16",
    "3,63 \\cdot 10^8",
    "r=\\frac{C}{2\\pi}",
    "-\\frac{\\sqrt{2}}{2}",
    "y=\\frac{1}{2}x-1",
    "5 \\times 3",
    "x \\le 3",
  ];
  for (const t of LATEX_TEKST) {
    it(`bevarer ${t}`, () => {
      assert.equal(latexTilSvartekst(svartekstTilLatex(t)).replace(/\s+/g, ""), t.replace(/\s+/g, ""));
    });
  }
  it("eksponent i {…} og enkelt backslash", () => {
    assert.equal(latexTilSvartekst(svartekstTilLatex("10^{12}")), "10^12");
    assert.equal(latexTilSvartekst(svartekstTilLatex("a\\b")), "a\\b");
  });
});

/**
 * Sjekker: samme svar godtas/avvises av den eksisterende parseren før og etter
 * rundturen svartekst → felt → svartekst. Testbanken er elevvarianter.json fra
 * 1p-bibliotek. Rekkefølge: $ELEVVARIANTER, så kopien i repoet (src/lib/testdata).
 * Finnes ingen av dem, logges en tydelig skip-melding (ingen stille hopp over).
 */
const REPO_KOPI = fileURLToPath(new URL("./testdata/elevvarianter.json", import.meta.url));
const BANK = [process.env.ELEVVARIANTER, REPO_KOPI].find((p) => p && existsSync(p));
if (BANK) console.log(`[matte-felt.test] elevvarianter-bank: ${BANK}`);
else
  console.warn(
    `[matte-felt.test] SKIP: fant ikke elevvarianter.json (prøvde $ELEVVARIANTER=${process.env.ELEVVARIANTER ?? "(ikke satt)"} og ${REPO_KOPI}). Rundturstesten mot testbanken kjøres ikke.`,
  );

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

  it("elevvarianter.json: alle riktige/feil svar får samme dom etter rundtur", { skip: BANK ? false : "elevvarianter.json mangler (se advarsel over)" }, () => {
    const bank = JSON.parse(readFileSync(BANK as string, "utf8")) as Record<string, { riktige: string[]; feil: string[] }>;
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

describe("tomme plassholdere er ikke et svar", () => {
  const tomme = [
    "\\sqrt{\\placeholder{}}",
    "\\sqrt{#?}",
    "\\sqrt{}",
    "\\sqrt[3]{\\placeholder{}}",
    "\\frac{\\placeholder{}}{\\placeholder{}}",
    "\\frac{#?}{#?}",
    "\\frac{}{}",
    "\\placeholder{}^{\\placeholder{}}",
    "\\left\\langle\\placeholder{}\\right\\rangle",
    "\\langle\\rangle",
    "\\left\\{\\placeholder{}\\right\\}",
    "\\lbrace\\placeholder{}\\rbrace",
    "\\{\\}",
    "\\sqrt{\\frac{\\placeholder{}}{\\placeholder{}}}",
    "\\placeholder{}",
    "#?",
  ];
  for (const l of tomme) {
    it(`${l} → tomt svar`, () => assert.equal(latexTilSvartekst(l), ""));
  }
  it("tom potens fjernes, resten blir stående", () => {
    assert.equal(latexTilSvartekst("x^{\\placeholder{}}"), "x");
    assert.equal(latexTilSvartekst("2+\\sqrt{\\placeholder{}}"), "2+");
  });
  it("utfylte strukturer røres ikke", () => {
    assert.equal(latexTilSvartekst("\\sqrt{x}"), "sqrt(x)");
    assert.notEqual(latexTilSvartekst("\\frac{1}{2}"), "");
    assert.equal(latexTilSvartekst("x^{2}"), "x^2");
    assert.equal(latexTilSvartekst("\\{1,2\\}"), "{1,2}");
    assert.equal(latexTilSvartekst("\\langle 1,2\\rangle"), "⟨1,2⟩");
  });
});
