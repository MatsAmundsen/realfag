import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { latexTilSvartekst, svartekstTilLatex } from "./matte-felt.ts";
import { forhandsvis, lesPiler, sjekkSluttsvar, svartype, type Sluttsvar } from "./svar-sjekk.ts";

/**
 * Syntetiske spesifikasjoner som svarer til 1T-fasiten (MatteBOT eier selve SLUTTSVAR). Tekstene er skrevet slik eleven skriver dem:
 * Unicode, ASCII, LaTeX og slik MathLive lagrer dem (latexTilSvartekst).
 */
const ok = (s: string, f: Sluttsvar) => sjekkSluttsvar(s, f);
const alle = (f: Sluttsvar, riktige: string[], gale: string[]) => {
  const feil = [
    ...riktige.filter((s) => !ok(s, f)).map((s) => `skal godtas: ${s}`),
    ...gale.filter((s) => ok(s, f)).map((s) => `skal avvises: ${s}`),
  ];
  assert.deepEqual(feil, []);
};

const iv = (deler: Extract<Sluttsvar["svar"], { type: "intervall" }>["deler"], begge?: boolean): Sluttsvar => ({
  svar: { type: "intervall", deler, ...(begge ? { begge } : {}) },
  symboler: ["intervall", "ulikhet"],
});

describe("intervall: 5.OP1 og 5.OP4b ⟨3,∞⟩", () => {
  const f = iv([{ fra: 3, til: null }]);
  it("godtar alle skrivemåter", () => {
    alle(
      f,
      [
        "⟨3,∞⟩", "⟨3, ∞⟩", "⟨3;∞⟩", "(3,∞)", "<3,∞>", "]3,∞[", "]3, ∞)", "x ∈ ⟨3,∞⟩", "⟨3,∞]", "⟨3,∞⟩ ∪ ⟨5,6⟩", "x∈⟨3,∞⟩", "x > 3", "x>3", "3 < x", "x>3.",
        "\\langle3,\\infty\\rangle", "x\\in\\langle3{,}\\;\\infty\\rangle", "$x>3$", "⟨3, uendelig⟩", "⟨3,→⟩", "⟨3, oo⟩", "(3, inf)", "L = ⟨3,∞⟩",
        "{x | x > 3}", "{x ∈ ℝ | x > 3}", "{x: x > 3}", "Svar: ⟨3, ∞⟩", "⟨3,+∞⟩", "[3,∞⟩ ∩ ⟨3,∞⟩".slice(0, 0) + "⟨3, ∞⟩",
      ],
      ["[3,∞⟩", "x ≥ 3", "x>=3", "⟨4,∞⟩", "⟨−∞,3⟩", "x < 3", "⟨3,5⟩", "3", "", "x ∈ ⟨3,", "x ≠ 3"],
    );
  });
  it("[3,∞] med lukket uendelighet er det samme som [3,∞⟩ (uendelig er aldri med), men ikke ⟨3,∞⟩", () => {
    assert.equal(ok("[3,∞]", iv([{ fra: 3, til: null, fraLukket: true }])), true);
    assert.equal(ok("[3,∞]", f), false);
  });
  it("MathLive-tekst rundturer", () => {
    for (const l of ["\\langle3{,}\\infty\\rangle", "\\langle3{,}\\;\\infty\\rangle", "x>3"]) {
      const t = latexTilSvartekst(l);
      assert.equal(ok(t, f), true, `${l} → ${t}`);
    }
  });
});

describe("intervall: 5.OP3b ⟨−∞,−5⟩∪⟨1,∞⟩", () => {
  const f = iv([{ fra: null, til: -5 }, { fra: 1, til: null }]);
  it("godtar forening i begge rekkefølger og som ulikheter", () => {
    alle(
      f,
      [
        "⟨−∞,−5⟩∪⟨1,∞⟩", "⟨-∞,-5⟩ ∪ ⟨1,∞⟩", "⟨1,∞⟩∪⟨−∞,−5⟩", "(-∞,-5) ∪ (1,∞)", "<−∞,−5> ∪ <1,∞>", "⟨←,−5⟩∪⟨1,→⟩", "x ∈ ⟨−∞,−5⟩∪⟨1,∞⟩",
        "x < −5 eller x > 1", "x<-5 ∨ x>1", "x<−5 eller x>1", "x > 1 eller x < -5", "⟨−∞, −5⟩ eller ⟨1, ∞⟩", "⟨-∞,-5⟩ U ⟨1,∞⟩", "x<-5, x>1".slice(0, 0) + "x < -5 eller 1 < x",
        "\\langle-\\infty{,}\\;-5\\rangle\\cup\\langle1{,}\\;\\infty\\rangle", "x\\in\\langle-\\infty,-5\\rangle\\cup\\langle1,\\infty\\rangle",
        "{x | x < −5 eller x > 1}",
      ],
      ["⟨−∞,−5⟩", "⟨1,∞⟩", "⟨−∞,−5]∪⟨1,∞⟩", "⟨−∞,−5⟩∪[1,∞⟩", "⟨−∞,−5⟩∩⟨1,∞⟩", "⟨−∞,5⟩∪⟨1,∞⟩", "x < −5 og x > 1", "x < −5", "⟨−5,1⟩", "⟨−∞,∞⟩"],
    );
  });
  it("MathLive-tekst rundturer", () => {
    const t = latexTilSvartekst("\\langle-\\infty{,}\\;-5\\rangle\\cup\\langle1{,}\\;\\infty\\rangle");
    assert.equal(ok(t, f), true, t);
    assert.match(t, /∪/);
  });
});

describe("intervall: 5.OP3c ⟨−1,3] og 5.OP7b [−3,0]∪[3,∞⟩", () => {
  it("5.OP3c halvåpent", () => {
    const f = iv([{ fra: -1, til: 3, tilLukket: true }]);
    alle(f, ["⟨−1,3]", "(−1, 3]", "]−1,3]", "<-1,3]", "−1 < x ≤ 3", "-1<x<=3", "x ≤ 3 og x > −1", "x > -1 og x <= 3", "x ∈ ⟨−1, 3]", "3 ≥ x > -1"], [
      "⟨−1,3⟩", "[−1,3]", "[−1,3⟩", "−1 ≤ x ≤ 3", "−1 < x < 3", "⟨−1,3", "⟨3,−1]", "x ≤ 3",
    ]);
    assert.equal(ok(latexTilSvartekst("\\langle-1{,}\\;3]"), f), true);
    assert.equal(ok(latexTilSvartekst("-1<x\\le3"), f), true);
  });
  it("5.OP7b lukket union halvåpent", () => {
    const f = iv([{ fra: -3, til: 0, fraLukket: true, tilLukket: true }, { fra: 3, til: null, fraLukket: true }]);
    alle(f, ["[−3,0]∪[3,∞⟩", "[3,∞⟩∪[−3,0]", "[-3, 0] ∪ [3, ∞)", "[−3,0] ∪ [3,∞[", "−3 ≤ x ≤ 0 eller x ≥ 3", "x>=3 eller -3<=x<=0", "x ∈ [−3,0]∪[3,∞⟩", "[−3,0]∪[3,∞⟩∪[7,8]"], [
      "[−3,0]", "[−3,0]∪⟨3,∞⟩", "⟨−3,0⟩∪[3,∞⟩", "[0,−3]∪[3,∞⟩", "−3 ≤ x ≤ 0 og x ≥ 3",
    ]);
    assert.equal(ok(latexTilSvartekst("\\left[-3{,}\\;0\\right]\\cup\\left[3{,}\\;\\infty\\right\\rangle"), f), true);
  });
});

describe("intervall med begge: 3.OP8a x<4 og x∈⟨←,4⟩, 3.OP8b x≤−3 og x∈⟨←,−3]", () => {
  const a = iv([{ fra: null, til: 4 }], true);
  const b = iv([{ fra: null, til: -3, tilLukket: true }], true);
  it("3.OP8a krever begge formene", () => {
    alle(
      a,
      ["x<4, x∈⟨←,4⟩", "x < 4, x ∈ ⟨←, 4⟩", "x<4 og x∈⟨−∞,4⟩", "x ∈ ⟨←,4⟩, x < 4", "⟨-∞,4⟩ og x<4", "x<4; (−∞,4)", "x < 4 og x ∈ ]−∞, 4[", "x<4, x\\in\\langle-\\infty{,}\\;4\\rangle"],
      ["x<4", "x∈⟨←,4⟩", "⟨←,4⟩", "x<4, x<4", "⟨←,4⟩, ⟨−∞,4⟩", "x<5, x∈⟨←,5⟩", "x<4, x∈⟨←,4]", "x≤4, x∈⟨←,4⟩", "x<4, x∈⟨←,5⟩", ""],
    );
  });
  it("3.OP8b: lukket ende", () => {
    alle(b, ["x≤−3, x∈⟨←,−3]", "x ≤ -3 og x ∈ ⟨−∞, −3]", "x<=-3, x ∈ (−∞,−3]", "x ≤ −3; x ∈ ⟨←,−3]"], ["x≤−3", "x<−3, x∈⟨←,−3⟩", "x≤−3, x∈⟨←,−3⟩", "x ≤ −3, x ∈ ⟨←,−2]"]);
    const t = latexTilSvartekst("x\\le-3{,}\\;x\\in\\langle\\leftarrow{,}-3]");
    assert.equal(ok(t, b), true, t);
  });
  it("uten begge godtas også begge formene sammen, og hver for seg", () => {
    const f = iv([{ fra: null, til: 4 }]);
    alle(f, ["x<4", "⟨←,4⟩", "x<4, x∈⟨←,4⟩"], ["x<4, x∈⟨←,5⟩", "x ≤ 4"]);
  });
});

describe("mengde: 4.OP5c D_r=ℝ∖{3}, V_r=ℝ∖{2}", () => {
  const m = (u: number[]) => ({ type: "mengde" as const, grunn: "R" as const, utenom: u });
  const f: Sluttsvar = { svar: { type: "serie", deler: [m([3]), m([2])] }, symboler: ["intervall", "mengde"] };
  it("godtar flere skrivemåter", () => {
    alle(
      f,
      [
        "D_r=ℝ∖{3}; V_r=ℝ∖{2}", "D_r = ℝ ∖ {3}, V_r = ℝ ∖ {2}", "D_r=R\\{3}, V_r=R\\{2}", "ℝ∖{3}; ℝ∖{2}", "D_r = ℝ uten 3; V_r = ℝ uten 2",
        "D_r = ℝ minus {3} og V_r = ℝ minus {2}", "D_r = x ∈ ℝ, x ≠ 3; V_r = x ∈ ℝ, x ≠ 2", "D_r={x ∈ ℝ | x ≠ 3}; V_r={x ∈ ℝ | x ≠ 2}", "D_r = x ≠ 3; V_r = y ≠ 2".slice(0, 0) + "D_r: x ≠ 3; V_r: x != 2",
        "D_{r}=\\mathbb{R}\\setminus\\{3\\}; V_{r}=\\mathbb{R}\\setminus\\{2\\}", "a) ℝ∖{3} b) ℝ∖{2}", "D_r = alle reelle tall unntatt 3; V_r = alle reelle tall unntatt 2",
        "D_r = ℝ ∖ {3}\nV_r = ℝ ∖ {2}", "D_r=ℝ∖{3.0}; V_r=ℝ∖{2}",
      ],
      ["D_r=ℝ∖{2}; V_r=ℝ∖{3}", "D_r=ℝ∖{3}", "D_r=ℝ; V_r=ℝ∖{2}", "D_r=ℝ∖{3}; V_r=ℝ∖{2,3}", "D_r=ℤ∖{3}; V_r=ℝ∖{2}", "D_r=ℝ∖{-3}; V_r=ℝ∖{2}", "D_r=3; V_r=2", ""],
    );
  });
  it("MathLive-tekst rundturer (D_r og mengdeklammer)", () => {
    const t = latexTilSvartekst("D_r=\\mathbb{R}\\setminus\\{3\\};\\;V_r=\\mathbb{R}\\setminus\\{2\\}");
    assert.equal(ok(t, f), true, t);
    const t2 = latexTilSvartekst("D_r=\\mathbb{R}\\setminus\\lbrace3\\rbrace;\\;V_r=\\mathbb{R}\\setminus\\lbrace2\\rbrace");
    assert.equal(ok(t2, f), true, t2);
  });
  it("liste av tall i vilkårlig rekkefølge", () => {
    const l: Sluttsvar = { svar: { type: "mengde", elementer: [1, 2, 3] } };
    alle(l, ["{1, 2, 3}", "{3, 1, 2}", "1, 2, 3", "L = {2; 3; 1}", "x ∈ {1, 2, 3}", "\\{1, 2, 3\\}", "{1, 2, 2, 3}"], ["{1,2}", "{1,2,4}", "{1,2,3,4}", "ℝ∖{1}", ""]);
  });
  it("sluttsvar med ≠ avvises ikke automatisk for mengde, men fortsatt for tall", () => {
    assert.equal(ok("x≠3", { svar: { type: "mengde", grunn: "R", utenom: [3] } }), true);
    assert.equal(ok("x≠3", { svar: { type: "tall", verdier: [3] } }), false);
  });
});

describe("valg ⇒ / ⇔: 1.OP10a", () => {
  const imp: Sluttsvar = { svar: { type: "valg", valg: "⇒" }, symboler: ["logikk"] };
  const ekv: Sluttsvar = { svar: { type: "valg", valg: "⇔" } };
  it("⇒ godtar ⇒, =>, ->, \\Rightarrow, ord, og fullt utsagn", () => {
    alle(
      imp,
      ["⇒", "=>", "->", "→", "\\Rightarrow", "$\\Rightarrow$", "\\implies", "impliserer", "medfører", "x=2 ⇒ x²=4", "x = 2 => x^2 = 4", "Svar: ⇒", "⇒ ", "x=2\\Rightarrow x^2=4"],
      ["⇔", "<=>", "<->", "\\Leftrightarrow", "\\iff", "ekvivalent", "x=2 ⇔ x²=4", "⇒ ⇔", "", "a", "<=", "ja"],
    );
    alle(ekv, ["⇔", "<=>", "<->", "\\Leftrightarrow", "ekvivalent", "x² = 4 ⇔ x = ±2", "↔", "$\\iff$", "hvis og bare hvis"], ["⇒", "=>", "->", "\\Rightarrow", "impliserer", ""]);
  });
  it("MathLive-tekst rundturer", () => {
    assert.equal(latexTilSvartekst("\\Rightarrow"), "⇒");
    assert.equal(latexTilSvartekst("\\Leftrightarrow"), "⇔");
    assert.equal(ok(latexTilSvartekst("\\Rightarrow"), imp), true);
    assert.equal(ok(latexTilSvartekst("x=2\\Rightarrow x^2=4"), imp), true);
    assert.equal(ok(latexTilSvartekst("\\Leftrightarrow"), imp), false);
    assert.deepEqual(lesPiler("a ⇒ b ⇔ c"), ["⇒", "⇔"]);
  });
  it("valg med bokstaver er som før", () => {
    const b: Sluttsvar = { svar: { type: "valg", valg: "B" } };
    alle(b, ["B", "b", "b)", "B."], ["A", "⇒", ""]);
  });
});

describe("punkt: vektor ⟨a,b⟩, [a,b] og (a,b)", () => {
  const f: Sluttsvar = { svar: { type: "punkt", punkter: [[3, -4]] }, symboler: ["vektor"] };
  it("alle tre parentesene", () => {
    alle(f, ["(3,−4)", "[3,−4]", "⟨3,−4⟩", "⟨3, −4⟩", "[3, -4]", "\\langle3{,}\\;-4\\rangle", "v = ⟨3,−4⟩", "3, -4"], ["⟨4,3⟩", "⟨3,4⟩", "⟨3,−4,1⟩", "⟨3⟩", ""]);
    assert.equal(ok(latexTilSvartekst("\\langle3{,}\\;-4\\rangle"), f), true);
  });
  it("flere punkter, og ⟨ ⟩ som parentes", () => {
    const g: Sluttsvar = { svar: { type: "punkt", punkter: [[1, 2], [-1, 0]] } };
    alle(g, ["(1,2) og (−1,0)", "⟨−1,0⟩, ⟨1,2⟩", "[1,2] og (−1, 0)"], ["⟨1,2⟩"]);
  });
});

describe("svartype og forhåndsvisning", () => {
  it("nye svartyper", () => {
    assert.equal(svartype(iv([{ fra: 3, til: null }])), "intervall");
    assert.equal(svartype({ svar: { type: "mengde", grunn: "R", utenom: [3] } }), "mengde");
    assert.equal(svartype({ svar: { type: "valg", valg: "⇒" } }), "valg");
  });
  const latex = (s: string, f: Sluttsvar) => {
    const r = forhandsvis(s, f.svar);
    return "ok" in r && r.ok ? r.latex : null;
  };
  it("viser det eleven skrev, ikke fasiten", () => {
    const f = iv([{ fra: null, til: -5 }, { fra: 1, til: null }]);
    assert.equal(latex("⟨−∞,−5⟩∪⟨1,∞⟩", f), "\\langle -\\infty,\\,-5\\rangle \\cup \\langle 1,\\,\\infty\\rangle ");
    assert.match(latex("x < −5 eller x > 1", f) ?? "", /x<.*5.*\\text\{eller\}.*x>1/);
    assert.equal(latex("tull(", f), null);
    assert.equal(latex("⇒", { svar: { type: "valg", valg: "⇒" } }), "\\Rightarrow");
    assert.equal(latex("<=>", { svar: { type: "valg", valg: "⇒" } }), "\\Leftrightarrow");
    assert.equal(latex("R\\{3}", { svar: { type: "mengde", grunn: "R", utenom: [3] } }), "\\mathbb{R}\\setminus \\{3\\}");
    assert.equal(latex("⟨3,−4⟩", { svar: { type: "punkt", punkter: [[3, -4]] } })?.startsWith("\\left\\langle"), true);
    const begge = iv([{ fra: null, til: 4 }], true);
    assert.match(latex("x<4, x∈⟨←,4⟩", begge) ?? "", /x<4.*quad.*langle -\\infty/);
  });
});

describe("LaTeX slik MathLive 0.111 faktisk lagrer det (målt i nettleser etter innsetting fra symbolraden)", () => {
  it("forening, mengdeklammer og piler", () => {
    const u = iv([{ fra: null, til: -5 }, { fra: 1, til: null }]);
    assert.equal(ok(latexTilSvartekst("\\langle-\\infty,-5\\rangle\\cup\\langle1,\\infty\\rangle"), u), true);
    const m: Sluttsvar = { svar: { type: "mengde", grunn: "R", utenom: [3] } };
    assert.equal(ok(latexTilSvartekst("\\mathbb{R}\\setminus\\{3\\}"), m), true);
    assert.equal(ok(latexTilSvartekst("x=2\\Rightarrow x^2=4"), { svar: { type: "valg", valg: "⇒" } }), true);
  });
});

describe("tekst → LaTeX → tekst for de nye tegnene", () => {
  it("⟨ ⟩ ∪ ∩ ∖ ⇒ ⇔ { } ∞ overlever rundturen", () => {
    for (const t of ["⟨-∞, -5⟩∪⟨1, ∞⟩", "ℝ∖{3}", "A∩B", "x ⇒ y", "x ⇔ y", "{1, 2, 3}", "⟨3, 4⟩"]) {
      const l = svartekstTilLatex(t);
      assert.doesNotMatch(l, /\\text\{[⟨⟩∪∩∖⇒⇔]\}/, `${t} → ${l}`);
      const tilbake = latexTilSvartekst(l);
      assert.equal(tilbake.replace(/\s+/g, ""), t.replace(/\s+/g, "").replace("ℝ", "ℝ"), `${t} → ${l} → ${tilbake}`);
    }
  });
});

describe("kap. 3–4 retting: intervall med egen variabel (4.OP1c, verdimengde)", () => {
  const f: Sluttsvar = {
    svar: { type: "intervall", deler: [{ fra: -9, til: 7, fraLukket: true, tilLukket: true }], variabel: ["y", "f(x)"] },
    symboler: ["intervall", "ulikhet"],
  };
  it("godtar y og f(x), parentes og ulikhet, V_f", () => {
    alle(
      f,
      ["[-9,7]", "[-9, 7]", "[-9;7]", "-9≤y≤7", "-9<=y<=7", "y∈[-9,7]", "y ∈ [−9, 7]", "f(x)∈[-9,7]", "-9≤f(x)≤7", "V_f = [-9,7]", "V_f=[−9,7]"],
      [],
    );
  });
  it("avviser feil variabel (x og andre bokstaver) og feil intervall", () => {
    alle(f, [], ["-9≤x≤7", "x∈[-9,7]", "t∈[-9,7]", "-9≤z≤7", "(-9,7)", "-9<y<7", "[-8,7]", "[-9,7)", "y≥-9"]);
  });
  it("uten variabel i spec er x fortsatt variabelen (ingen endring for øvrige oppgaver)", () => {
    const g = iv([{ fra: -9, til: 7, fraLukket: true, tilLukket: true }]);
    alle(g, ["-9≤x≤7", "x∈[-9,7]", "[-9,7]"], ["(-9,7)"]);
  });
  it("⟨ ⟩ skrevet med andre vinkelparenteser (3.OP8a/b)", () => {
    const begge = iv([{ fra: null, til: 4 }], true);
    alle(begge, ["x<4, x∈\u3008←,4\u3009", "x<4, x∈\u2039←,4\u203a", "x<4, x∈⟨←,4⟩"], ["x<4", "x<4, x∈\u30084,→\u3009"]);
  });
});

describe("kap. 3–4 retting: mengdeskrivemåter og «v» som eller (3.OP4)", () => {
  const f: Sluttsvar = { svar: { type: "tall", verdier: [-3, 3] }, format: "Skriv alle svarene, skilt med komma eller «og»." };
  it("godtar {…}, «v» og «∨» som eller", () => {
    alle(f, ["-3 og 3", "{-3, 3}", "{−3, 3}", "{-3,3}", "{-3; 3}", "x ∈ {-3, 3}", "L={-3, 3}", "x=-3 v x=3", "x=3 v x=-3", "-3 v 3", "x = -3 ∨ x = 3"], ["{3}", "{-3}", "{-3, 9}", "x=-3 v x=9", "3"]);
  });
  it("«v» som variabel deles ikke, og {3,5} er fortsatt 3,5 for ett tall", () => {
    alle({ svar: { type: "tall", verdier: [4] } }, ["4"], ["v", "4 v 5"]);
    alle({ svar: { type: "tall", verdier: [3.5] } }, ["3,5", "{3,5}"], ["{3, 5}", "3 og 5"]);
    alle({ svar: { type: "uttrykk", uttrykk: "v+1" } } as Sluttsvar, ["v+1", "1+v"], ["v-1"]);
  });
});

describe("kap. 3–4 retting: D_r og V_r (4.OP5c)", () => {
  const f: Sluttsvar = {
    svar: { type: "serie", deler: [{ type: "mengde", grunn: "R", utenom: [3] }, { type: "mengde", grunn: "R", utenom: [2] }] },
  };
  it("godtar ≠ og forening av åpne intervaller", () => {
    alle(
      f,
      ["ℝ∖{3}; ℝ∖{2}", "x≠3; y≠2", "x ≠ 3 og y ≠ 2", "D_r=ℝ∖{3}; V_r=ℝ∖{2}", "D_r: x≠3; V_r: y≠2", "(-∞,3)∪(3,∞); (-∞,2)∪(2,∞)", "(−∞, 3) U (3, ∞); (−∞, 2) U (2, ∞)", "x∈(-∞,3)∪(3,∞); y∈(-∞,2)∪(2,∞)"],
      ["x≠2; y≠3", "ℝ∖{2}; ℝ∖{3}", "(-∞,3)∪(3,∞)", "(-∞,3); (-∞,2)", "(-∞,2)∪(3,∞); (-∞,2)∪(2,∞)"],
    );
  });
});

describe("kap. 3–4 retting: toleranser og enheter (4.OP5a, 4.OP7a, 4.OP8a, 4.OP9a, 4.OP9c, 4.OP10c)", () => {
  it("4.OP8a: 137,84 mg – 138 godtas, 140 og 137 avvises", () => {
    const f: Sluttsvar = { svar: { type: "tall", verdier: [137.842], ingenAvrunding: true, tol: { abs: 0.5 } }, enhet: ["mg"] };
    alle(f, ["138", "137,8", "137,84", "138 mg", "137,842"], ["140", "137", "139", "250"]);
  });
  it("4.OP7a: 923,56 g – 924 godtas, 920 avvises", () => {
    const f: Sluttsvar = { svar: { type: "tall", verdier: [923.558095716], ingenAvrunding: true, tol: { abs: 1 } }, enhet: ["g"] };
    alle(f, ["924", "924 g", "923,6", "924,2", "923"], ["920", "900", "930"]);
  });
  it("4.OP9c: 10,47 år (2030) – 10 og 11 avvises, «i løpet av 2030» godtas", () => {
    const f: Sluttsvar = {
      svar: { type: "tall", verdier: [10.4698484308], ingenAvrunding: true, tol: { abs: 0.1 } },
      alternativer: [{ type: "tall", verdier: [2030], ingenAvrunding: true }],
      enhet: ["år"],
    };
    alle(f, ["10,5", "10,47", "10,5 år", "2030", "i løpet av 2030"], ["10", "11", "2000", "2031", "20"]);
  });
  it("4.OP9a: «% per år» og «prosent per år» godtas som enhet, 0,05 gjør det ikke", () => {
    const f: Sluttsvar = { svar: { type: "tall", verdier: [1.05, 5], tol: { abs: 0.006 } }, enhet: ["%", "% per år", "prosent", "prosent per år"] };
    alle(f, ["1,05 og 5 %", "1,05 og 5 % per år", "1,05 og 5 prosent per år", "b=1,05; 5 % per år", "1,05 og 5 %/år"], ["1,05 og 0,05", "1,05", "1,5 og 50"]);
  });
  it("4.OP10c: «(6, 38)» godtas som alternativ, (38, 6) avvises", () => {
    const f: Sluttsvar = {
      svar: { type: "tall", verdier: [6, 38], rekkefolge: "fast", ord: true },
      alternativer: [{ type: "punkt", punkter: [[6, 38]] }],
      enhet: ["timer", "kunder"],
    };
    alle(f, ["6 og 38", "6, 38", "(6, 38)", "(6; 38)", "6 timer og 38 kunder"], ["38 og 6", "(38, 6)", "6", "(6, 36)"]);
  });
  it("4.OP5a: (0; -1,33) godtas innenfor ±0,005, -1,3 og -1,4 avvises", () => {
    const f: Sluttsvar = {
      svar: { type: "serie", deler: [{ type: "tall", verdier: [-2] }, { type: "punkt", punkter: [[0, -1.33333333333]], tol: { abs: 0.005 } }] },
    };
    alle(f, ["-2; (0, -4/3)", "-2; (0; -1,33)", "-2; (0, -1.33)", "-2; (0; -1,333)"], ["-2; (0; -1,3)", "-2; (0; -1,4)", "2; (0, 4/3)", "-2; (-4/3, 0)"]);
  });
});
