/**
 * 1P Kapittel 1 – Tall, potenser og røtter
 * Kilde: /workspace/1p-bibliotek/kap1-analyse.md (struktur og kompetansemål).
 * MERK: Forklarings- og oppgavetekstene er IKKE godkjent (ingen godkjent tekstark for kap 1–3).
 * Alle kontekster og tall er egne. Fasit sjekkes av verify_p1kap1.py.
 */
import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "../types";
import { P1P_KAP1_3_FIGURES } from "./kap1-3-figurer";

const r = String.raw;

type Hjelpemidler = "uten" | "med" | "kalk";

function o(id: string, niva: 1 | 2 | 3, hm: Hjelpemidler, tekst: string, hint: string, steg: string[]): Oppgave {
  const merke =
    hm === "uten"
      ? "<strong>Uten hjelpemidler</strong><br><br>"
      : hm === "kalk"
        ? "<em>Med hjelpemidler: bruk kalkulator.</em><br><br>"
        : "<em>Med hjelpemidler: bruk GeoGebra (CAS eller regneark) eller kalkulator.</em><br><br>";
  return {
    id,
    tittel: `Oppgave ${id} · Nivå ${niva}`,
    tekst: merke + tekst,
    bilde: null,
    hint,
    fasit: null,
    fasitSteg: steg,
    starter: "",
  };
}

function s(id: string, tittel: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

function q(sporsmal: string, alternativer: string[], riktigSvar: number, forklaring: string, niva: 1 | 2 | 3): QuizQuestion {
  return { sporsmal, alternativer, riktigSvar, forklaring, niva: `Nivå ${niva}` };
}

/** Skjult figurbestilling + synlig plassholder til DesignBOT har levert figuren. */
function fig(id: string, beskrivelse: string): string {
  const svg = P1P_KAP1_3_FIGURES[id];
  if (svg) return `<!-- figur: ${id} — ${beskrivelse} -->${svg}`;
  return `<!-- figur: ${id} — ${beskrivelse} --><em>Figur til oppgave ${id} (kommer).</em><br><br>`;
}

const del = (b: string) => `<br><br><strong>${b})</strong> `;
const tenkt = "<em>Tallene er laget for oppgaven.</em><br><br>";

// ───────────────────────────── 1A Regning med tall og kvadratrøtter ─────────────────────────────

const dkP1A: Delkapittel = {
  id: "P1A",
  tittel: "1A Regning med tall og kvadratrøtter",
  quiz: [
    q("Hvilket tall er minst?", [r`$-0{,}805$`, r`$-0{,}85$`, r`$-0{,}8$`, r`$0{,}08$`], 1, r`Negative tall er mindre jo lenger de ligger fra 0. $-0{,}85 = -0{,}850$ ligger lengst til venstre på tallinja.`, 1),
    q(r`Hva er $(-3) \cdot (-4) \cdot (-2)$?`, [r`$24$`, r`$-9$`, r`$9$`, r`$-24$`], 3, r`Tre negative faktorer gir negativt svar: $3 \cdot 4 \cdot 2 = 24$, så svaret er $-24$.`, 1),
    q(r`Hva er $7 : 0{,}25$?`, [r`$28$`, r`$1{,}75$`, r`$0{,}28$`, r`$17{,}5$`], 0, r`Å dele med $0{,}25$ er det samme som å gange med 4: $7 \cdot 4 = 28$.`, 2),
    q(r`Hva er $-3^4$?`, [r`$81$`, r`$-12$`, r`$-81$`, r`$12$`], 2, r`Potensen regnes først: $3^4 = 81$. Minustegnet står utenfor, så svaret er $-81$.`, 2),
    q(r`Hvordan skriver du $\sqrt{48}$ enklest mulig?`, [r`$4\sqrt{3}$`, r`$3\sqrt{4}$`, r`$24\sqrt{2}$`, r`$16\sqrt{3}$`], 0, r`$\sqrt{48} = \sqrt{16 \cdot 3} = \sqrt{16} \cdot \sqrt{3} = 4\sqrt{3}$`, 2),
    q(r`Hva er $\sqrt{2} \cdot \sqrt{32}$?`, [r`$16$`, r`$\sqrt{34}$`, r`$64$`, r`$8$`], 3, r`$\sqrt{2} \cdot \sqrt{32} = \sqrt{64} = 8$`, 3),
  ],
  oppgaver: [
    o(
      "P1.1",
      1,
      "uten",
      r`Skriv tallene i stigende rekkefølge (fra minst til størst).<br><br>$-1{,}4 \qquad -1{,}04 \qquad 0{,}4 \qquad -1{,}44 \qquad 0{,}04$`,
      "Skriv alle tallene med like mange desimaler, for eksempel −1,40 og −1,04. Husk at et negativt tall er mindre jo lenger det er fra 0.",
      [
        r`De negative tallene er minst. Med to desimaler: $-1{,}44 < -1{,}40 < -1{,}04$.`,
        r`De positive: $0{,}04 < 0{,}40$.<br><strong>Svar:</strong> $-1{,}44 < -1{,}4 < -1{,}04 < 0{,}04 < 0{,}4$`,
      ],
    ),
    o(
      "P1.2",
      1,
      "uten",
      r`${tenkt}På en fjellstasjon var temperaturen $-7{,}5$ °C klokka 06 og $4{,}0$ °C klokka 14.${del("a")}Hvor mange grader steg temperaturen?${del("b")}Om kvelden sank temperaturen 9,5 grader fra 4,0 °C. Hva var temperaturen da?${del("c")}Laveste temperatur den natta var $-12{,}3$ °C. Hvor stor er forskjellen mellom $-12{,}3$ °C og $4{,}0$ °C?`,
      "Forskjell = høyeste temperatur − laveste temperatur.",
      [
        r`<strong>a)</strong> $4{,}0 - (-7{,}5) = 4{,}0 + 7{,}5 = 11{,}5$`,
        r`<strong>b)</strong> $4{,}0 - 9{,}5 = -5{,}5$`,
        r`<strong>c)</strong> $4{,}0 - (-12{,}3) = 16{,}3$<br><strong>Svar:</strong> a) 11,5 grader b) $-5{,}5$ °C c) 16,3 grader`,
      ],
    ),
    o(
      "P1.3",
      1,
      "uten",
      r`Regn ut.${del("a")}$-6 + 14$${del("b")}$5 - (-8)$${del("c")}$(-4) \cdot 3 \cdot (-5)$${del("d")}$(-2) \cdot (-3) \cdot (-1) \cdot 5$${del("e")}$-48 : (-6)$${del("f")}$36 : (-9)$`,
      "Tell de negative faktorene. Et partall antall gir positivt svar, et oddetall antall gir negativt svar.",
      [
        r`<strong>a)</strong> $8$ <strong>b)</strong> $5 + 8 = 13$`,
        r`<strong>c)</strong> To negative faktorer: $+60$ <strong>d)</strong> Tre negative faktorer: $-30$`,
        r`<strong>e)</strong> $8$ <strong>f)</strong> $-4$<br><strong>Svar:</strong> a) 8 b) 13 c) 60 d) $-30$ e) 8 f) $-4$`,
      ],
    ),
    o(
      "P1.4",
      1,
      "uten",
      r`Regn ut.${del("a")}$3{,}07 \cdot 100$${del("b")}$0{,}52 \cdot 1000$${del("c")}$46 : 1000$${del("d")}$7{,}9 : 100$${del("e")}$0{,}3 : 10$${del("f")}$12{,}5 \cdot 10$`,
      "Gange med 10, 100 eller 1000: flytt kommaet like mange plasser mot høyre som det er nuller. Dele: flytt mot venstre.",
      [
        r`<strong>a)</strong> $307$ <strong>b)</strong> $520$ <strong>c)</strong> $0{,}046$`,
        r`<strong>d)</strong> $0{,}079$ <strong>e)</strong> $0{,}03$ <strong>f)</strong> $125$<br><strong>Svar:</strong> a) 307 b) 520 c) 0,046 d) 0,079 e) 0,03 f) 125`,
      ],
    ),
    o(
      "P1.5",
      2,
      "uten",
      r`Regn ut.${del("a")}$6 : 0{,}5$${del("b")}$2{,}4 : 0{,}2$${del("c")}$9 : 0{,}25$${del("d")}$0{,}36 : 0{,}04$${del("e")}Du har 4,5 L saft og fyller den på små flasker som rommer 0,3 L hver. Hvor mange flasker kan du fylle?`,
      r`Gang både tallet du deler og tallet du deler med, med 10 eller 100, slik at du deler med et helt tall. For eksempel er $2{,}4 : 0{,}2 = 24 : 2$.`,
      [
        r`<strong>a)</strong> $6 : 0{,}5 = 6 \cdot 2 = 12$`,
        r`<strong>b)</strong> $24 : 2 = 12$ <strong>c)</strong> $9 \cdot 4 = 36$ <strong>d)</strong> $36 : 4 = 9$`,
        r`<strong>e)</strong> $4{,}5 : 0{,}3 = 45 : 3 = 15$<br><strong>Svar:</strong> a) 12 b) 12 c) 36 d) 9 e) 15 flasker`,
      ],
    ),
    o(
      "P1.6",
      2,
      "uten",
      r`Regn ut.${del("a")}$3^4$${del("b")}$(-2)^5$${del("c")}$-2^4$${del("d")}$(-5)^2$${del("e")}Forklar hvorfor $(-3)^2$ og $-3^2$ ikke er det samme.`,
      "Står minustegnet inne i parentesen, er det med i grunntallet. Står det utenfor, regner du potensen først.",
      [
        r`<strong>a)</strong> $3 \cdot 3 \cdot 3 \cdot 3 = 81$ <strong>b)</strong> Fem negative faktorer: $-32$`,
        r`<strong>c)</strong> $-(2^4) = -16$ <strong>d)</strong> $25$`,
        r`<strong>e)</strong> $(-3)^2 = (-3) \cdot (-3) = 9$, mens $-3^2 = -(3 \cdot 3) = -9$.<br><strong>Svar:</strong> a) 81 b) $-32$ c) $-16$ d) 25 e) $9$ og $-9$`,
      ],
    ),
    o(
      "P1.7",
      2,
      "uten",
      r`${del("a")}Regn ut $\sqrt{144}$, $\sqrt{0{,}49}$, $\sqrt{9 \cdot 25}$ og $\sqrt{\dfrac{36}{49}}$.${del("b")}Vis at $\sqrt{50} = 5\sqrt{2}$.${del("c")}Vis at $\sqrt{75} = 5\sqrt{3}$.`,
      r`Bruk $\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$. Se etter et kvadrattall (4, 9, 16, 25, …) som går opp i tallet under rottegnet.`,
      [
        r`<strong>a)</strong> $12$, $0{,}7$ (fordi $0{,}7^2 = 0{,}49$), $3 \cdot 5 = 15$ og $\dfrac{6}{7}$`,
        r`<strong>b)</strong> $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$`,
        r`<strong>c)</strong> $\sqrt{75} = \sqrt{25 \cdot 3} = 5\sqrt{3}$<br><strong>Svar:</strong> a) 12, 0,7, 15 og $\dfrac{6}{7}$`,
      ],
    ),
    o(
      "P1.8",
      3,
      "uten",
      r`Regn ut og skriv svaret enklest mulig.${del("a")}$\sqrt{12} + \sqrt{27}$${del("b")}$\sqrt{45} - \sqrt{20}$${del("c")}$\sqrt{2} \cdot (\sqrt{8} + \sqrt{18})$${del("d")}En kvadratisk kjøkkenhage har arealet 72 m². Hvor lang er hver side? Skriv svaret eksakt, så enkelt som mulig.`,
      r`I a) og b): skriv hver rot som et tall ganger $\sqrt{3}$ eller $\sqrt{5}$. I c): gang inn $\sqrt{2}$ først.`,
      [
        r`<strong>a)</strong> $2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$`,
        r`<strong>b)</strong> $3\sqrt{5} - 2\sqrt{5} = \sqrt{5}$`,
        r`<strong>c)</strong> $\sqrt{16} + \sqrt{36} = 4 + 6 = 10$`,
        r`<strong>d)</strong> Siden er $\sqrt{72} = \sqrt{36 \cdot 2} = 6\sqrt{2}$ m.<br><strong>Svar:</strong> a) $5\sqrt{3}$ b) $\sqrt{5}$ c) 10 d) $6\sqrt{2}$ m`,
      ],
    ),
  ],
};

// ───────────────────────────── 1B Potensregler ─────────────────────────────

const dkP1B: Delkapittel = {
  id: "P1B",
  tittel: "1B Potensregler",
  quiz: [
    q(r`Hva er $a^4 \cdot a^3$?`, [r`$a^{12}$`, r`$a^7$`, r`$2a^7$`, r`$a$`], 1, r`Samme grunntall: legg sammen eksponentene. $4 + 3 = 7$`, 1),
    q(r`Hva er $(x^3)^5$?`, [r`$x^8$`, r`$x^{35}$`, r`$3x^5$`, r`$x^{15}$`], 3, r`Potens av en potens: gang eksponentene. $3 \cdot 5 = 15$`, 1),
    q(r`Hva er $(3a)^2$?`, [r`$9a^2$`, r`$3a^2$`, r`$6a^2$`, r`$9a$`], 0, r`Begge faktorene opphøyes: $3^2 \cdot a^2 = 9a^2$.`, 2),
    q(r`Hva er $\dfrac{2^9}{2^6}$?`, [r`$1^3$`, r`$2^{15}$`, r`$8$`, r`$2^{54}$`], 2, r`$2^{9-6} = 2^3 = 8$`, 2),
    q(r`Hva er $\left(\dfrac{2}{3}\right)^3$?`, [r`$\dfrac{6}{9}$`, r`$\dfrac{2}{27}$`, r`$\dfrac{8}{27}$`, r`$\dfrac{8}{9}$`], 2, r`Både teller og nevner opphøyes: $\dfrac{2^3}{3^3} = \dfrac{8}{27}$.`, 2),
    q(r`Hvilket uttrykk er lik $4^n$?`, [r`$2^{n+2}$`, r`$2^{2n}$`, r`$2n^2$`, r`$4n$`], 1, r`$4^n = (2^2)^n = 2^{2n}$`, 3),
  ],
  oppgaver: [
    o(
      "P1.9",
      1,
      "uten",
      r`Skriv som én potens.${del("a")}$5^3 \cdot 5^4$${del("b")}$7^9 : 7^6$${del("c")}$(2^3)^4$${del("d")}$a^5 \cdot a$${del("e")}$\dfrac{b^{10}}{b^3}$`,
      r`Husk at $a = a^1$. Ganging: legg sammen eksponentene. Deling: trekk fra.`,
      [
        r`<strong>a)</strong> $5^{3+4} = 5^7$ <strong>b)</strong> $7^{9-6} = 7^3$ <strong>c)</strong> $2^{3 \cdot 4} = 2^{12}$`,
        r`<strong>d)</strong> $a^{5+1} = a^6$ <strong>e)</strong> $b^{10-3} = b^7$<br><strong>Svar:</strong> a) $5^7$ b) $7^3$ c) $2^{12}$ d) $a^6$ e) $b^7$`,
      ],
    ),
    o(
      "P1.10",
      1,
      "uten",
      r`Regn ut.${del("a")}$(2a)^3$${del("b")}$(3xy)^2$${del("c")}$\left(\dfrac{x}{4}\right)^2$${del("d")}$\left(\dfrac{2}{5}\right)^3$`,
      r`$(a \cdot b)^n = a^n \cdot b^n$ og $\left(\dfrac{a}{b}\right)^n = \dfrac{a^n}{b^n}$`,
      [
        r`<strong>a)</strong> $2^3 a^3 = 8a^3$ <strong>b)</strong> $9x^2y^2$`,
        r`<strong>c)</strong> $\dfrac{x^2}{16}$ <strong>d)</strong> $\dfrac{8}{125}$<br><strong>Svar:</strong> a) $8a^3$ b) $9x^2y^2$ c) $\dfrac{x^2}{16}$ d) $\dfrac{8}{125}$`,
      ],
    ),
    o(
      "P1.11",
      2,
      "uten",
      r`Regn ut ved å bruke potensreglene.${del("a")}$\dfrac{2^6 \cdot 2^3}{2^7}$${del("b")}$\dfrac{3^5 \cdot 3^2}{(3^3)^2}$${del("c")}$\dfrac{10^4 \cdot 10^5}{10^6}$${del("d")}$\dfrac{5^8}{5^2 \cdot 5^5}$`,
      "Skriv teller og nevner som én potens hver før du deler.",
      [
        r`<strong>a)</strong> $\dfrac{2^9}{2^7} = 2^2 = 4$`,
        r`<strong>b)</strong> $\dfrac{3^7}{3^6} = 3$`,
        r`<strong>c)</strong> $\dfrac{10^9}{10^6} = 10^3 = 1000$`,
        r`<strong>d)</strong> $\dfrac{5^8}{5^7} = 5$<br><strong>Svar:</strong> a) 4 b) 3 c) 1000 d) 5`,
      ],
    ),
    o(
      "P1.12",
      2,
      "uten",
      r`Skriv så enkelt som mulig.${del("a")}$a^3 \cdot b^2 \cdot a^4 \cdot b$${del("b")}$\dfrac{(x^2y)^3}{x^4y}$${del("c")}$(2a^2)^3 \cdot a$${del("d")}$\dfrac{6a^5b^3}{2a^2b}$`,
      "Samle potensene med samme grunntall. Tallene for seg, bokstavene for seg.",
      [
        r`<strong>a)</strong> $a^{3+4} \cdot b^{2+1} = a^7b^3$`,
        r`<strong>b)</strong> $\dfrac{x^6y^3}{x^4y} = x^2y^2$`,
        r`<strong>c)</strong> $8a^6 \cdot a = 8a^7$`,
        r`<strong>d)</strong> $\dfrac{6}{2} \cdot a^{5-2} \cdot b^{3-1} = 3a^3b^2$<br><strong>Svar:</strong> a) $a^7b^3$ b) $x^2y^2$ c) $8a^7$ d) $3a^3b^2$`,
      ],
    ),
    o(
      "P1.13",
      2,
      "uten",
      r`Skriv svaret som et produkt av to potenser.${del("a")}$2^4 \cdot 3^2 \cdot 2^3 \cdot 3$${del("b")}$6^3 \cdot 2^2$${del("c")}$12^2$${del("d")}$\dfrac{10^5}{2^2}$`,
      r`Del opp i primfaktorer: $6 = 2 \cdot 3$, $12 = 2^2 \cdot 3$ og $10 = 2 \cdot 5$.`,
      [
        r`<strong>a)</strong> $2^7 \cdot 3^3$`,
        r`<strong>b)</strong> $2^3 \cdot 3^3 \cdot 2^2 = 2^5 \cdot 3^3$`,
        r`<strong>c)</strong> $(2^2 \cdot 3)^2 = 2^4 \cdot 3^2$`,
        r`<strong>d)</strong> $\dfrac{2^5 \cdot 5^5}{2^2} = 2^3 \cdot 5^5$<br><strong>Svar:</strong> a) $2^7 \cdot 3^3$ b) $2^5 \cdot 3^3$ c) $2^4 \cdot 3^2$ d) $2^3 \cdot 5^5$`,
      ],
    ),
    o(
      "P1.14",
      2,
      "uten",
      r`Du bretter et ark på midten igjen og igjen. For hver bretting blir det dobbelt så mange lag papir.${del("a")}Forklar at det er $2^5$ lag etter 5 brettinger. Hvor mange lag er det?${del("b")}Hvor mange lag er det etter 10 brettinger? Skriv som potens og som tall.${del("c")}Hvor mange ganger så mange lag er det etter 10 brettinger som etter 5? Bruk potensreglene.`,
      r`Start med 1 lag. Hver bretting ganger antallet med 2. $2^{10} = 1024$`,
      [
        r`<strong>a)</strong> Vi ganger med 2 fem ganger: $2 \cdot 2 \cdot 2 \cdot 2 \cdot 2 = 2^5 = 32$`,
        r`<strong>b)</strong> $2^{10} = 1024$`,
        r`<strong>c)</strong> $\dfrac{2^{10}}{2^5} = 2^5 = 32$<br><strong>Svar:</strong> a) 32 lag b) $2^{10} = 1024$ lag c) 32 ganger så mange`,
      ],
    ),
    o(
      "P1.15",
      3,
      "uten",
      r`${del("a")}Vis at $4^3 = 2^6$.${del("b")}Vis at $9^n = 3^{2n}$.${del("c")}Vis at $8^{2n} = 4^{3n}$.${del("d")}Hvilket tall er størst, $2^{60}$ eller $5^{24}$? Begrunn uten å regne ut tallene.`,
      r`Skriv grunntallene som potenser av 2, 3 eller 5. I d) kan du skrive begge tallene som noe opphøyd i 12.`,
      [
        r`<strong>a)</strong> $4^3 = (2^2)^3 = 2^6$`,
        r`<strong>b)</strong> $9^n = (3^2)^n = 3^{2n}$`,
        r`<strong>c)</strong> $8^{2n} = (2^3)^{2n} = 2^{6n}$ og $4^{3n} = (2^2)^{3n} = 2^{6n}$`,
        r`<strong>d)</strong> $2^{60} = (2^5)^{12} = 32^{12}$ og $5^{24} = (5^2)^{12} = 25^{12}$. Siden $32 > 25$, er $2^{60}$ størst.<br><strong>Svar:</strong> d) $2^{60}$ er størst.`,
      ],
    ),
    o(
      "P1.16",
      3,
      "med",
      r`${del("a")}Skriv $\dfrac{(3a^2b)^2 \cdot a}{9a^3b^2}$ så enkelt som mulig for hånd.${del("b")}Skriv $\dfrac{(x^n)^2 \cdot x^2}{x^{2n}}$ så enkelt som mulig $(x \neq 0)$.${del("c")}Kontroller svarene med CAS.`,
      "Regn ut parentesen først. Så samler du tallene og hver bokstav for seg.",
      [
        r`<strong>a)</strong> $\dfrac{9a^4b^2 \cdot a}{9a^3b^2} = \dfrac{9a^5b^2}{9a^3b^2} = a^2$`,
        r`<strong>b)</strong> $\dfrac{x^{2n} \cdot x^2}{x^{2n}} = x^2$`,
        r`<strong>c)</strong> Skriv uttrykkene i CAS og trykk «Regn ut». Begge gir $a^2$ og $x^2$.<br><strong>Svar:</strong> a) $a^2$ b) $x^2$`,
      ],
    ),
  ],
};

// ───────────────────────────── 1C Null og negative eksponenter ─────────────────────────────

const dkP1C: Delkapittel = {
  id: "P1C",
  tittel: "1C Null og negative eksponenter",
  quiz: [
    q(r`Hva er $5^0$?`, [r`$0$`, r`$5$`, r`$-5$`, r`$1$`], 3, r`Alle tall unntatt 0 opphøyd i 0 er 1.`, 1),
    q(r`Hva er $2^{-3}$?`, [r`$\dfrac{1}{8}$`, r`$-8$`, r`$-6$`, r`$\dfrac{1}{6}$`], 0, r`$2^{-3} = \dfrac{1}{2^3} = \dfrac{1}{8}$. En negativ eksponent gir ikke et negativt tall.`, 1),
    q(r`Hvordan skriver du $10^{-4}$ som desimaltall?`, [r`$-10\,000$`, r`$0{,}001$`, r`$0{,}0001$`, r`$0{,}00001$`], 2, r`$10^{-4} = \dfrac{1}{10\,000} = 0{,}0001$`, 1),
    q(r`Hvordan skriver du $\dfrac{1}{49}$ som en potens med grunntall 7?`, [r`$7^2$`, r`$7^{-2}$`, r`$7^{-1}$`, r`$-7^2$`], 1, r`$\dfrac{1}{49} = \dfrac{1}{7^2} = 7^{-2}$`, 2),
    q(r`Hva er $a^5 \cdot a^{-7}$?`, [r`$\dfrac{1}{a^2}$`, r`$a^2$`, r`$a^{-35}$`, r`$-a^2$`], 0, r`$a^{5 + (-7)} = a^{-2} = \dfrac{1}{a^2}$`, 2),
    q(r`Hva er $3^{-2} \cdot 9$?`, [r`$-18$`, r`$-81$`, r`$\dfrac{1}{81}$`, r`$1$`], 3, r`$\dfrac{1}{9} \cdot 9 = 1$`, 3),
  ],
  oppgaver: [
    o(
      "P1.17",
      1,
      "uten",
      r`Skriv som brøk og som desimaltall.${del("a")}$2^{-1}$${del("b")}$10^{-3}$${del("c")}$4^{-2}$${del("d")}$8^{-1}$${del("e")}$7^0$`,
      r`$a^{-n} = \dfrac{1}{a^n}$ og $a^0 = 1$.`,
      [
        r`<strong>a)</strong> $\dfrac{1}{2} = 0{,}5$ <strong>b)</strong> $\dfrac{1}{1000} = 0{,}001$`,
        r`<strong>c)</strong> $\dfrac{1}{16} = 0{,}0625$ <strong>d)</strong> $\dfrac{1}{8} = 0{,}125$ <strong>e)</strong> $1$<br><strong>Svar:</strong> a) 0,5 b) 0,001 c) 0,0625 d) 0,125 e) 1`,
      ],
    ),
    o(
      "P1.18",
      1,
      "uten",
      r`Skriv som en potens med grunntallet i parentes.${del("a")}$\dfrac{1}{8}$ (2)${del("b")}$\dfrac{1}{100}$ (10)${del("c")}$\dfrac{1}{27}$ (3)${del("d")}$\dfrac{1}{36}$ (6)${del("e")}$1$ (9)`,
      r`Skriv nevneren som en potens først, for eksempel $8 = 2^3$.`,
      [
        r`<strong>a)</strong> $2^{-3}$ <strong>b)</strong> $10^{-2}$ <strong>c)</strong> $3^{-3}$`,
        r`<strong>d)</strong> $6^{-2}$ <strong>e)</strong> $9^0$<br><strong>Svar:</strong> a) $2^{-3}$ b) $10^{-2}$ c) $3^{-3}$ d) $6^{-2}$ e) $9^0$`,
      ],
    ),
    o(
      "P1.19",
      2,
      "uten",
      r`Regn ut.${del("a")}$3^5 \cdot 3^{-3}$${del("b")}$2^{-4} \cdot 2^6$${del("c")}$\dfrac{5^2}{5^4}$${del("d")}$10^{-2} \cdot 10^5$${del("e")}$6 \cdot 2^{-1}$${del("f")}$36 \cdot 6^{-2}$`,
      "Potensreglene gjelder også når eksponentene er negative.",
      [
        r`<strong>a)</strong> $3^2 = 9$ <strong>b)</strong> $2^2 = 4$ <strong>c)</strong> $5^{-2} = \dfrac{1}{25}$`,
        r`<strong>d)</strong> $10^3 = 1000$ <strong>e)</strong> $6 \cdot \dfrac{1}{2} = 3$ <strong>f)</strong> $36 \cdot \dfrac{1}{36} = 1$<br><strong>Svar:</strong> a) 9 b) 4 c) $\dfrac{1}{25}$ d) 1000 e) 3 f) 1`,
      ],
    ),
    o(
      "P1.20",
      2,
      "uten",
      r`Skriv tallene i stigende rekkefølge.<br><br>$3^{-1} \qquad 2^{-2} \qquad 5^0 \qquad (-2)^{-1} \qquad 10^{-1}$`,
      "Skriv hvert tall som brøk eller desimaltall først.",
      [
        r`$3^{-1} = \dfrac{1}{3}$, $2^{-2} = \dfrac{1}{4}$, $5^0 = 1$, $(-2)^{-1} = -\dfrac{1}{2}$ og $10^{-1} = \dfrac{1}{10}$.`,
        r`<strong>Svar:</strong> $(-2)^{-1} < 10^{-1} < 2^{-2} < 3^{-1} < 5^0$`,
      ],
    ),
    o(
      "P1.21",
      2,
      "uten",
      r`Skriv så enkelt som mulig. Svaret skal ikke ha negative eksponenter.${del("a")}$a^4 \cdot a^{-6}$${del("b")}$\dfrac{x^{-3}}{x^{-5}}$${del("c")}$(b^{-2})^3$${del("d")}$(2a^{-1})^3$`,
      r`Til slutt skriver du $a^{-n}$ som $\dfrac{1}{a^n}$.`,
      [
        r`<strong>a)</strong> $a^{-2} = \dfrac{1}{a^2}$ <strong>b)</strong> $x^{-3-(-5)} = x^2$`,
        r`<strong>c)</strong> $b^{-6} = \dfrac{1}{b^6}$ <strong>d)</strong> $8a^{-3} = \dfrac{8}{a^3}$<br><strong>Svar:</strong> a) $\dfrac{1}{a^2}$ b) $x^2$ c) $\dfrac{1}{b^6}$ d) $\dfrac{8}{a^3}$`,
      ],
    ),
    o(
      "P1.22",
      3,
      "uten",
      r`${del("a")}Vis at $0{,}2 \cdot 5^{n+1} = 5^n$.${del("b")}Vis at $2^{-3} + 2^{-3} = 2^{-2}$.${del("c")}Hvilket tall er størst, $3^{-2}$ eller $2^{-3}$? Begrunn svaret.`,
      r`Skriv $0{,}2$ som en potens med grunntall 5. I b) kan du skrive summen som $2 \cdot 2^{-3}$.`,
      [
        r`<strong>a)</strong> $0{,}2 = \dfrac{1}{5} = 5^{-1}$, så $5^{-1} \cdot 5^{n+1} = 5^{-1+n+1} = 5^n$.`,
        r`<strong>b)</strong> $2^{-3} + 2^{-3} = 2 \cdot 2^{-3} = 2^{1-3} = 2^{-2}$`,
        r`<strong>c)</strong> $3^{-2} = \dfrac{1}{9}$ og $2^{-3} = \dfrac{1}{8}$. Når telleren er lik, er brøken med minst nevner størst.<br><strong>Svar:</strong> c) $2^{-3}$ er størst.`,
      ],
    ),
    o(
      "P1.23",
      3,
      "med",
      r`${del("a")}Skriv $\dfrac{(a^{-2}b^3)^2}{a^{-5}b^4}$ så enkelt som mulig for hånd.${del("b")}Kontroller svaret med CAS.`,
      "Regn ut parentesen først. Pass på fortegnet når du trekker fra en negativ eksponent.",
      [
        r`<strong>a)</strong> $(a^{-2}b^3)^2 = a^{-4}b^6$. Da er $\dfrac{a^{-4}b^6}{a^{-5}b^4} = a^{-4-(-5)}b^{6-4} = ab^2$.`,
        r`<strong>b)</strong> CAS gir også $ab^2$.<br><strong>Svar:</strong> $ab^2$`,
      ],
    ),
  ],
};

// ───────────────────────────── 1D Standardform ─────────────────────────────

const dkP1D: Delkapittel = {
  id: "P1D",
  tittel: "1D Standardform og tierpotenser",
  quiz: [
    q(r`Hvilket tall er skrevet på standardform?`, [r`$12 \cdot 10^3$`, r`$0{,}9 \cdot 10^2$`, r`$10 \cdot 10^4$`, r`$7{,}05 \cdot 10^6$`], 3, r`På standardform står det et tall som er minst 1 og mindre enn 10, foran tierpotensen.`, 1),
    q(r`Hvordan skriver du $0{,}00052$ på standardform?`, [r`$52 \cdot 10^{-5}$`, r`$5{,}2 \cdot 10^{-4}$`, r`$5{,}2 \cdot 10^{-3}$`, r`$0{,}52 \cdot 10^{-3}$`], 1, r`Kommaet flyttes 4 plasser mot høyre for å få 5,2. Da blir eksponenten $-4$.`, 1),
    q(r`Hvordan skriver du $6{,}1 \cdot 10^5$ som vanlig tall?`, [r`$6\,100\,000$`, r`$61\,000$`, r`$610\,000$`, r`$0{,}000061$`], 2, "Flytt kommaet 5 plasser mot høyre.", 1),
    q(r`Hva er $(3 \cdot 10^4) \cdot (3 \cdot 10^{-6})$?`, [r`$9 \cdot 10^{-2}$`, r`$9 \cdot 10^{-24}$`, r`$6 \cdot 10^{-2}$`, r`$9 \cdot 10^{10}$`], 0, r`$3 \cdot 3 = 9$ og $10^{4 + (-6)} = 10^{-2}$.`, 2),
    q(r`Hva er $\dfrac{8 \cdot 10^9}{2 \cdot 10^3}$?`, [r`$4 \cdot 10^3$`, r`$4 \cdot 10^6$`, r`$6 \cdot 10^6$`, r`$4 \cdot 10^{12}$`], 1, r`$8 : 2 = 4$ og $10^{9-3} = 10^6$.`, 2),
    q(r`Hva er $2 \cdot 10^5 + 5 \cdot 10^4$?`, [r`$7 \cdot 10^9$`, r`$7 \cdot 10^5$`, r`$2{,}5 \cdot 10^5$`, r`$2{,}5 \cdot 10^4$`], 2, r`$200\,000 + 50\,000 = 250\,000 = 2{,}5 \cdot 10^5$. Ved addisjon kan du ikke legge sammen eksponentene.`, 3),
  ],
  oppgaver: [
    o(
      "P1.24",
      1,
      "uten",
      r`Skriv som en tierpotens.${del("a")}$100\,000$${del("b")}$0{,}001$${del("c")}Én milliard${del("d")}Én hundredel`,
      "Tell nullene. For tall mindre enn 1 blir eksponenten negativ.",
      [
        r`<strong>a)</strong> $10^5$ <strong>b)</strong> $10^{-3}$`,
        r`<strong>c)</strong> $1\,000\,000\,000 = 10^9$ <strong>d)</strong> $0{,}01 = 10^{-2}$<br><strong>Svar:</strong> a) $10^5$ b) $10^{-3}$ c) $10^9$ d) $10^{-2}$`,
      ],
    ),
    o(
      "P1.25",
      1,
      "uten",
      r`Hvilke av tallene er skrevet på standardform? Skriv de andre på standardform.<br><br>A: $3{,}8 \cdot 10^4$ &nbsp; B: $38 \cdot 10^3$ &nbsp; C: $0{,}38 \cdot 10^5$ &nbsp; D: $1{,}0 \cdot 10^{-6}$ &nbsp; E: $10 \cdot 10^2$`,
      r`Tallet foran tierpotensen må være minst 1 og mindre enn 10.`,
      [
        r`A og D er på standardform.`,
        r`B: $3{,}8 \cdot 10^4$. C: $3{,}8 \cdot 10^4$. E: $1 \cdot 10^3$.<br><strong>Svar:</strong> A og D er på standardform. B $=$ C $= 3{,}8 \cdot 10^4$ (samme tall som A), E $= 1 \cdot 10^3$.`,
      ],
    ),
    o(
      "P1.26",
      1,
      "uten",
      r`Skriv på standardform.${del("a")}$72\,000$${del("b")}$905\,000\,000$${del("c")}$0{,}0061$${del("d")}$0{,}000\,000\,48$<br><br>Skriv som vanlige tall.${del("e")}$2{,}7 \cdot 10^5$${del("f")}$3{,}04 \cdot 10^{-4}$`,
      "Flytter du kommaet mot venstre, blir eksponenten positiv. Flytter du det mot høyre, blir den negativ.",
      [
        r`<strong>a)</strong> $7{,}2 \cdot 10^4$ <strong>b)</strong> $9{,}05 \cdot 10^8$`,
        r`<strong>c)</strong> $6{,}1 \cdot 10^{-3}$ <strong>d)</strong> $4{,}8 \cdot 10^{-7}$`,
        r`<strong>e)</strong> $270\,000$ <strong>f)</strong> $0{,}000304$<br><strong>Svar:</strong> a) $7{,}2 \cdot 10^4$ b) $9{,}05 \cdot 10^8$ c) $6{,}1 \cdot 10^{-3}$ d) $4{,}8 \cdot 10^{-7}$ e) 270 000 f) 0,000304`,
      ],
    ),
    o(
      "P1.27",
      2,
      "uten",
      r`Regn ut og skriv svaret på standardform.${del("a")}$(2 \cdot 10^3) \cdot (4 \cdot 10^5)$${del("b")}$(5 \cdot 10^4) \cdot (6 \cdot 10^{-7})$${del("c")}$\dfrac{9 \cdot 10^8}{3 \cdot 10^2}$${del("d")}$\dfrac{1{,}2 \cdot 10^5}{4 \cdot 10^{-2}}$${del("e")}$3000 \cdot 0{,}0005$`,
      "Regn med tallene for seg og tierpotensene for seg. Til slutt justerer du så tallet foran blir mellom 1 og 10.",
      [
        r`<strong>a)</strong> $8 \cdot 10^8$`,
        r`<strong>b)</strong> $30 \cdot 10^{-3} = 3 \cdot 10^{-2}$`,
        r`<strong>c)</strong> $3 \cdot 10^6$`,
        r`<strong>d)</strong> $0{,}3 \cdot 10^7 = 3 \cdot 10^6$`,
        r`<strong>e)</strong> $(3 \cdot 10^3) \cdot (5 \cdot 10^{-4}) = 15 \cdot 10^{-1} = 1{,}5 \cdot 10^0 = 1{,}5$<br><strong>Svar:</strong> a) $8 \cdot 10^8$ b) $3 \cdot 10^{-2}$ c) $3 \cdot 10^6$ d) $3 \cdot 10^6$ e) $1{,}5 \cdot 10^0 = 1{,}5$`,
      ],
    ),
    o(
      "P1.28",
      2,
      "uten",
      r`Regn ut og skriv svaret på standardform.${del("a")}$4 \cdot 10^5 + 3 \cdot 10^4$${del("b")}$6 \cdot 10^{-3} - 5 \cdot 10^{-4}$`,
      r`Skriv tallene med samme tierpotens før du legger sammen, for eksempel $4 \cdot 10^5 = 40 \cdot 10^4$.`,
      [
        r`<strong>a)</strong> $40 \cdot 10^4 + 3 \cdot 10^4 = 43 \cdot 10^4 = 4{,}3 \cdot 10^5$`,
        r`<strong>b)</strong> $60 \cdot 10^{-4} - 5 \cdot 10^{-4} = 55 \cdot 10^{-4} = 5{,}5 \cdot 10^{-3}$<br><strong>Svar:</strong> a) $4{,}3 \cdot 10^5$ b) $5{,}5 \cdot 10^{-3}$`,
      ],
    ),
    o(
      "P1.29",
      2,
      "kalk",
      r`${tenkt}En podkast blir lastet ned 3500 ganger i timen, hele døgnet, i ett år (365 døgn).${del("a")}Hvor mange nedlastinger blir det? Skriv svaret på standardform med to desimaler.${del("b")}Hver nedlasting er 0,05 GB. Hvor mange GB blir lastet ned til sammen?`,
      "Gang antall per time med antall timer i et år.",
      [
        r`<strong>a)</strong> $3500 \cdot 24 \cdot 365 = 30\,660\,000 \approx 3{,}07 \cdot 10^7$`,
        r`<strong>b)</strong> $30\,660\,000 \cdot 0{,}05 = 1\,533\,000 \approx 1{,}53 \cdot 10^6$<br><strong>Svar:</strong> a) $3{,}07 \cdot 10^7$ nedlastinger b) $1{,}53 \cdot 10^6$ GB`,
      ],
    ),
    o(
      "P1.30",
      2,
      "uten",
      r`Vi antar at en person blunker 15 ganger i minuttet mens hen er våken, og at hen er våken 16 timer i døgnet.${del("a")}Hvor mange ganger blunker personen i løpet av ett døgn? Skriv svaret på standardform.${del("b")}Gjør et overslag: Omtrent hvor mange ganger blunker personen i løpet av ett år? Skriv svaret på standardform.`,
      r`$15 \cdot 60 = 900$ blunk i timen. I b) kan du runde av 365 døgn til 400 eller regne nøyaktig.`,
      [
        r`<strong>a)</strong> $15 \cdot 60 \cdot 16 = 900 \cdot 16 = 14\,400 = 1{,}44 \cdot 10^4$`,
        r`<strong>b)</strong> Overslag: $1{,}44 \cdot 10^4 \cdot 400 \approx 5{,}8 \cdot 10^6$. Nøyaktig: $14\,400 \cdot 365 = 5\,256\,000 \approx 5{,}3 \cdot 10^6$.<br><strong>Svar:</strong> a) $1{,}44 \cdot 10^4$ b) omtrent $5{,}3 \cdot 10^6$ ganger per år (overslaget med 400 døgn gir $5{,}8 \cdot 10^6$)`,
      ],
    ),
    o(
      "P1.31",
      3,
      "kalk",
      r`Lyset bruker omtrent 8,3 minutter fra sola til jorda. Lysfarten er omtrent $3{,}0 \cdot 10^8$ meter per sekund.${del("a")}Hvor mange sekunder er 8,3 minutter?${del("b")}Omtrent hvor langt er det fra sola til jorda? Skriv svaret på standardform, i meter og i kilometer.`,
      "Strekning = fart · tid. Tiden må være i sekunder.",
      [
        r`<strong>a)</strong> $8{,}3 \cdot 60 = 498$ s`,
        r`<strong>b)</strong> $498 \cdot 3{,}0 \cdot 10^8 = 1494 \cdot 10^8 \approx 1{,}5 \cdot 10^{11}$ m, som er $1{,}5 \cdot 10^8$ km.<br><strong>Svar:</strong> a) 498 s b) omtrent $1{,}5 \cdot 10^{11}$ m $= 1{,}5 \cdot 10^8$ km`,
      ],
    ),
  ],
};

// ───────────────────────────── 1E Røtter og brøkeksponenter ─────────────────────────────

const dkP1E: Delkapittel = {
  id: "P1E",
  tittel: "1E Røtter og brøkeksponenter",
  quiz: [
    q(r`Hva er $\sqrt[3]{-64}$?`, [r`$-4$`, r`$4$`, "Den finnes ikke", r`$-8$`], 0, r`$(-4)^3 = -64$. En tredjerot kan være negativ.`, 1),
    q(r`Hva er $81^{\frac{1}{4}}$?`, [r`$20{,}25$`, r`$9$`, r`$3$`, r`$-3$`], 2, r`$81^{\frac{1}{4}} = \sqrt[4]{81} = 3$, fordi $3^4 = 81$.`, 1),
    q(r`Hvordan skriver du $\sqrt[5]{x^2}$ som en potens?`, [r`$x^{\frac{5}{2}}$`, r`$x^{\frac{2}{5}}$`, r`$x^{10}$`, r`$x^{-3}$`], 1, r`$\sqrt[n]{x^t} = x^{\frac{t}{n}}$`, 2),
    q(r`Hva er $8^{\frac{2}{3}}$?`, [r`$\dfrac{16}{3}$`, r`$2$`, r`$64$`, r`$4$`], 3, r`$\left(\sqrt[3]{8}\right)^2 = 2^2 = 4$`, 2),
    q(r`Hva er $\sqrt{a} \cdot \sqrt[4]{a}$?`, [r`$a^{\frac{3}{4}}$`, r`$\sqrt[6]{a}$`, r`$a^{\frac{1}{8}}$`, r`$a^2$`], 0, r`$a^{\frac{1}{2}} \cdot a^{\frac{1}{4}} = a^{\frac{2}{4} + \frac{1}{4}} = a^{\frac{3}{4}}$`, 3),
    q("Hvilket tall ligger mellom 2 og 3?", [r`$\sqrt[3]{30}$`, r`$\sqrt{3}$`, r`$\sqrt{10}$`, r`$\sqrt[3]{20}$`], 3, r`$2^3 = 8$ og $3^3 = 27$. Siden $8 < 20 < 27$, ligger $\sqrt[3]{20}$ mellom 2 og 3.`, 3),
  ],
  oppgaver: [
    o(
      "P1.32",
      1,
      "uten",
      r`Regn ut.${del("a")}$\sqrt[3]{8}$${del("b")}$\sqrt[3]{-125}$${del("c")}$\sqrt[4]{81}$${del("d")}$\sqrt[6]{64}$${del("e")}$\sqrt[3]{0{,}001}$`,
      r`$\sqrt[n]{a}$ er tallet som gir $a$ når du opphøyer det i $n$.`,
      [
        r`<strong>a)</strong> $2$ <strong>b)</strong> $-5$, fordi $(-5)^3 = -125$ <strong>c)</strong> $3$`,
        r`<strong>d)</strong> $2$, fordi $2^6 = 64$ <strong>e)</strong> $0{,}1$, fordi $0{,}1^3 = 0{,}001$<br><strong>Svar:</strong> a) 2 b) $-5$ c) 3 d) 2 e) 0,1`,
      ],
    ),
    o(
      "P1.33",
      1,
      "uten",
      r`Skriv som potens.${del("a")}$\sqrt{7}$${del("b")}$\sqrt[3]{5}$${del("c")}$\sqrt[4]{x^3}$<br><br>Skriv som rotuttrykk.${del("d")}$2^{\frac{1}{5}}$${del("e")}$a^{\frac{2}{3}}$`,
      r`$\sqrt[n]{a^t} = a^{\frac{t}{n}}$`,
      [
        r`<strong>a)</strong> $7^{\frac{1}{2}}$ <strong>b)</strong> $5^{\frac{1}{3}}$ <strong>c)</strong> $x^{\frac{3}{4}}$`,
        r`<strong>d)</strong> $\sqrt[5]{2}$ <strong>e)</strong> $\sqrt[3]{a^2}$<br><strong>Svar:</strong> a) $7^{\frac{1}{2}}$ b) $5^{\frac{1}{3}}$ c) $x^{\frac{3}{4}}$ d) $\sqrt[5]{2}$ e) $\sqrt[3]{a^2}$`,
      ],
    ),
    o(
      "P1.34",
      2,
      "uten",
      r`Regn ut.${del("a")}$27^{\frac{1}{3}}$${del("b")}$16^{\frac{3}{4}}$${del("c")}$32^{\frac{2}{5}}$${del("d")}$1000^{\frac{2}{3}}$${del("e")}$125^{-\frac{1}{3}}$`,
      r`Ta roten først, og opphøy etterpå: $16^{\frac{3}{4}} = \left(\sqrt[4]{16}\right)^3$.`,
      [
        r`<strong>a)</strong> $3$ <strong>b)</strong> $2^3 = 8$ <strong>c)</strong> $2^2 = 4$`,
        r`<strong>d)</strong> $10^2 = 100$ <strong>e)</strong> $\dfrac{1}{\sqrt[3]{125}} = \dfrac{1}{5}$<br><strong>Svar:</strong> a) 3 b) 8 c) 4 d) 100 e) $\dfrac{1}{5}$`,
      ],
    ),
    o(
      "P1.35",
      2,
      "uten",
      r`${del("a")}Vis at $\sqrt[3]{24} = 2\sqrt[3]{3}$.${del("b")}Vis at $\sqrt[4]{48} = 2\sqrt[4]{3}$.${del("c")}Skriv $\sqrt[3]{8x^6}$ så enkelt som mulig.`,
      r`For tredjerøtter ser du etter et kubikktall (8, 27, 64, …). For fjerderøtter ser du etter 16, 81, …`,
      [
        r`<strong>a)</strong> $\sqrt[3]{8 \cdot 3} = \sqrt[3]{8} \cdot \sqrt[3]{3} = 2\sqrt[3]{3}$`,
        r`<strong>b)</strong> $\sqrt[4]{16 \cdot 3} = 2\sqrt[4]{3}$`,
        r`<strong>c)</strong> $\sqrt[3]{8} \cdot \sqrt[3]{x^6} = 2x^2$<br><strong>Svar:</strong> a) $\sqrt[3]{24} = 2\sqrt[3]{3}$ b) $\sqrt[4]{48} = 2\sqrt[4]{3}$ c) $2x^2$`,
      ],
    ),
    o(
      "P1.36",
      2,
      "kalk",
      r`En vanntank har form som en kube.${del("a")}Tanken rommer 64 L, og 1 L $= 1$ dm³. Hvor lang er hver side i tanken?${del("b")}En annen kubeformet tank rommer 2,5 m³. Hvor lang er hver side? Svar med to desimaler.`,
      r`Volumet av en kube er $s^3$. Da er siden $s = \sqrt[3]{V}$.`,
      [
        r`<strong>a)</strong> $s = \sqrt[3]{64} = 4$ dm`,
        r`<strong>b)</strong> $s = \sqrt[3]{2{,}5} \approx 1{,}357 \approx 1{,}36$ m<br><strong>Svar:</strong> a) 4 dm b) 1,36 m`,
      ],
    ),
    o(
      "P1.37",
      3,
      "uten",
      r`Skriv tallene i stigende rekkefølge. Begrunn uten kalkulator.<br><br>$3 \qquad \sqrt[3]{30} \qquad \sqrt{10} \qquad \sqrt[4]{16} \qquad 8^{\frac{2}{3}}$`,
      r`Regn ut de tallene du kan. For å sammenligne $\sqrt[3]{30}$ og $\sqrt{10}$ kan du opphøye begge i 6.`,
      [
        r`$\sqrt[4]{16} = 2$ og $8^{\frac{2}{3}} = 4$.`,
        r`$3^3 = 27 < 30$, så $\sqrt[3]{30} > 3$. $3^2 = 9 < 10$, så $\sqrt{10} > 3$. Begge er mindre enn 4.`,
        r`$\left(\sqrt[3]{30}\right)^6 = 30^2 = 900$ og $\left(\sqrt{10}\right)^6 = 10^3 = 1000$. Derfor er $\sqrt[3]{30} < \sqrt{10}$.<br><strong>Svar:</strong> $\sqrt[4]{16} < 3 < \sqrt[3]{30} < \sqrt{10} < 8^{\frac{2}{3}}$`,
      ],
    ),
    o(
      "P1.38",
      3,
      "uten",
      r`Skriv om til potenser og forenkle.${del("a")}$\sqrt{a} \cdot \sqrt[3]{a}$${del("b")}$\sqrt[3]{4} \cdot \sqrt[3]{2}$${del("c")}$\dfrac{\sqrt{x} \cdot \sqrt[4]{x}}{x^{\frac{1}{4}}}$${del("d")}$\sqrt[6]{a^3} \cdot \sqrt{a}$`,
      r`Finn felles nevner i eksponentene: $\dfrac{1}{2} + \dfrac{1}{3} = \dfrac{3}{6} + \dfrac{2}{6}$.`,
      [
        r`<strong>a)</strong> $a^{\frac{1}{2} + \frac{1}{3}} = a^{\frac{5}{6}}$`,
        r`<strong>b)</strong> $\sqrt[3]{4 \cdot 2} = \sqrt[3]{8} = 2$`,
        r`<strong>c)</strong> $x^{\frac{1}{2} + \frac{1}{4} - \frac{1}{4}} = x^{\frac{1}{2}} = \sqrt{x}$`,
        r`<strong>d)</strong> $a^{\frac{3}{6}} \cdot a^{\frac{1}{2}} = a^{\frac{1}{2} + \frac{1}{2}} = a$<br><strong>Svar:</strong> a) $a^{\frac{5}{6}}$ b) 2 c) $\sqrt{x}$ d) $a$`,
      ],
    ),
    o(
      "P1.39",
      3,
      "uten",
      r`${fig("P1.39", "Tallinje fra −3 til 5 med hele tall merket og en kort strek for hver halve. Seks tomme bokser over tallinja, merket A–F, uten plassering.")}Plasser tallene omtrent på en tallinje fra $-3$ til $5$. Begrunn plasseringen.<br><br>A: $\sqrt[3]{-8}$ &nbsp; B: $\sqrt{2}$ &nbsp; C: $9^{\frac{1}{2}}$ &nbsp; D: $2^{-1}$ &nbsp; E: $\sqrt[3]{20}$ &nbsp; F: $\sqrt{17}$`,
      "Finn to hele tall som hvert tall ligger mellom. Bruk kvadrattall og kubikktall.",
      [
        r`A: $-2$. C: $3$. D: $\dfrac{1}{2}$.`,
        r`B: $1 < 2 < 4$, så $1 < \sqrt{2} < 2$, litt under 1,5.`,
        r`E: $8 < 20 < 27$, så $2 < \sqrt[3]{20} < 3$, nærmere 3.`,
        r`F: $16 < 17 < 25$, så $\sqrt{17}$ er litt over 4.<br><strong>Svar:</strong> A $= -2$, D $= 0{,}5$, B $\approx 1{,}4$, E mellom 2 og 3, C $= 3$, F litt over 4`,
      ],
    ),
  ],
};

// ───────────────────────────── Sammendrag ─────────────────────────────

const dkP1SM: Delkapittel = {
  id: "P1SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P1.S1",
      "1A Regning med tall og kvadratrøtter",
      r`<ul><li>Et partall antall negative faktorer gir positivt svar. Et oddetall antall gir negativt svar.</li><li>Gange med 10, 100, 1000: flytt kommaet mot høyre. Dele: flytt mot venstre.</li><li>Å dele med $0{,}5$ er det samme som å gange med 2.</li><li>$(-3)^2 = 9$, men $-3^2 = -9$.</li><li>$\sqrt{a \cdot b} = \sqrt{a} \cdot \sqrt{b}$ og $\sqrt{\dfrac{a}{b}} = \dfrac{\sqrt{a}}{\sqrt{b}}$</li></ul>`,
      "Se etter kvadrattall når du skal forenkle en kvadratrot.",
      [r`Eksempel: $\sqrt{50} = \sqrt{25 \cdot 2} = 5\sqrt{2}$`],
    ),
    s(
      "P1.S2",
      "1B Potensregler",
      r`<ul><li>$a^p \cdot a^q = a^{p+q}$</li><li>$\dfrac{a^p}{a^q} = a^{p-q}$</li><li>$(a \cdot b)^p = a^p \cdot b^p$</li><li>$\left(\dfrac{a}{b}\right)^p = \dfrac{a^p}{b^p}$</li><li>$(a^p)^q = a^{p \cdot q}$</li></ul>Reglene gjelder bare når grunntallet er det samme. Ved addisjon kan du ikke legge sammen eksponentene.`,
      r`Husk at $a = a^1$.`,
      [r`Eksempel: $\dfrac{2^6 \cdot 2^3}{2^7} = 2^2 = 4$`],
    ),
    s(
      "P1.S3",
      "1C Null og negative eksponenter",
      r`<ul><li>$a^0 = 1$ når $a \ne 0$.</li><li>$a^{-n} = \dfrac{1}{a^n}$</li></ul>En negativ eksponent gir ikke et negativt tall: $2^{-3} = \dfrac{1}{8}$. Potensreglene gjelder også for negative eksponenter.`,
      "Skriv om til brøk når du skal sammenligne.",
      [r`Eksempel: $3^5 \cdot 3^{-3} = 3^2 = 9$`],
    ),
    s(
      "P1.S4",
      "1D Standardform og tierpotenser",
      r`Et tall er på <strong>standardform</strong> når det er skrevet som $a \cdot 10^n$, der $1 \le a < 10$ og $n$ er et helt tall.<ul><li>Store tall har positiv eksponent: $72\,000 = 7{,}2 \cdot 10^4$.</li><li>Små tall har negativ eksponent: $0{,}0061 = 6{,}1 \cdot 10^{-3}$.</li><li>Ganging og deling: regn med tallene for seg og tierpotensene for seg.</li></ul>`,
      "Sjekk til slutt at tallet foran er mellom 1 og 10.",
      [r`Eksempel: $(5 \cdot 10^4) \cdot (6 \cdot 10^{-7}) = 30 \cdot 10^{-3} = 3 \cdot 10^{-2}$`],
    ),
    s(
      "P1.S5",
      "1E Røtter og brøkeksponenter",
      r`$\sqrt[n]{a}$ er tallet som gir $a$ når det opphøyes i $n$. En tredjerot kan være negativ: $\sqrt[3]{-8} = -2$.<ul><li>$a^{\frac{1}{n}} = \sqrt[n]{a}$</li><li>$a^{\frac{t}{n}} = \sqrt[n]{a^t} = \left(\sqrt[n]{a}\right)^t$</li><li>$\sqrt[n]{a \cdot b} = \sqrt[n]{a} \cdot \sqrt[n]{b}$</li></ul>`,
      "Skriv røtter som potenser og bruk potensreglene.",
      [r`Eksempel: $16^{\frac{3}{4}} = \left(\sqrt[4]{16}\right)^3 = 2^3 = 8$`],
    ),
  ],
};

// ───────────────────────────── Øveprøve ─────────────────────────────

const dkP1OP: Delkapittel = {
  id: "P1OP",
  tittel: "Øveprøve",
  quiz: [
    q(r`Hva er $(-2)^4$?`, [r`$-16$`, r`$-8$`, r`$16$`, r`$8$`], 2, r`Fire negative faktorer gir positivt svar: $16$.`, 1),
    q(r`Hvordan skriver du $3{,}2 \cdot 10^{-3}$ som vanlig tall?`, [r`$0{,}0032$`, r`$0{,}032$`, r`$3200$`, r`$0{,}00032$`], 0, "Flytt kommaet 3 plasser mot venstre.", 1),
    q(r`Hva er $\sqrt{18} \cdot \sqrt{2}$?`, [r`$\sqrt{20}$`, r`$9$`, r`$36$`, r`$6$`], 3, r`$\sqrt{36} = 6$`, 2),
    q(r`Hva er $a^{-2} \cdot a^5$?`, [r`$a^{-10}$`, r`$a^3$`, r`$a^7$`, r`$a^{-3}$`], 1, r`$a^{-2+5} = a^3$`, 2),
  ],
  oppgaver: [
    s(
      "P1.OP0",
      "Om øveprøven",
      "<strong>Kapittel 1 · Tall, potenser og røtter</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–5), bruk kalkulator.<br>Hver del går fra lettere til vanskeligere oppgaver.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P1.OP1",
      1,
      "uten",
      r`<strong>Del 1</strong><br><br>Regn ut.${del("a")}$-7 + 3 \cdot (-2)$${del("b")}$(-2)^3$${del("c")}$4{,}2 : 0{,}6$${del("d")}$\sqrt{4 \cdot 49}$`,
      "Husk regnerekkefølgen: ganging før addisjon.",
      [
        r`<strong>a)</strong> $-7 - 6 = -13$ <strong>b)</strong> $-8$`,
        r`<strong>c)</strong> $42 : 6 = 7$ <strong>d)</strong> $2 \cdot 7 = 14$<br><strong>Svar:</strong> a) $-13$ b) $-8$ c) 7 d) 14`,
      ],
    ),
    o(
      "P1.OP2",
      2,
      "uten",
      r`Skriv så enkelt som mulig.${del("a")}$(2a^3)^2 \cdot a^{-4}$${del("b")}$\dfrac{3^7 \cdot 3^{-2}}{3^3}$${del("c")}$25^{\frac{3}{2}}$`,
      "Bruk potensreglene ett steg om gangen.",
      [
        r`<strong>a)</strong> $4a^6 \cdot a^{-4} = 4a^2$`,
        r`<strong>b)</strong> $\dfrac{3^5}{3^3} = 3^2 = 9$`,
        r`<strong>c)</strong> $\left(\sqrt{25}\right)^3 = 5^3 = 125$<br><strong>Svar:</strong> a) $4a^2$ b) 9 c) 125`,
      ],
    ),
    o(
      "P1.OP3",
      3,
      "uten",
      r`${del("a")}Regn ut $(4 \cdot 10^{-3}) \cdot (6 \cdot 10^7)$ og skriv svaret på standardform.${del("b")}Vis at $\sqrt{98} - \sqrt{18} = 4\sqrt{2}$.`,
      r`$98 = 49 \cdot 2$ og $18 = 9 \cdot 2$.`,
      [
        r`<strong>a)</strong> $24 \cdot 10^4 = 2{,}4 \cdot 10^5$`,
        r`<strong>b)</strong> $7\sqrt{2} - 3\sqrt{2} = 4\sqrt{2}$<br><strong>Svar:</strong> a) $2{,}4 \cdot 10^5$ b) $\sqrt{98} - \sqrt{18} = 7\sqrt{2} - 3\sqrt{2} = 4\sqrt{2}$`,
      ],
    ),
    o(
      "P1.OP4",
      2,
      "kalk",
      r`<strong>Del 2</strong><br><br>${tenkt}En elv fører $4{,}2 \cdot 10^3$ m³ vann ut i havet hvert sekund.${del("a")}Hvor mange sekunder er det i ett døgn?${del("b")}Hvor mye vann fører elva ut i havet på ett døgn? Skriv svaret på standardform med to desimaler.`,
      r`Ett døgn har $24 \cdot 60 \cdot 60$ sekunder.`,
      [
        r`<strong>a)</strong> $24 \cdot 60 \cdot 60 = 86\,400$`,
        r`<strong>b)</strong> $4{,}2 \cdot 10^3 \cdot 86\,400 = 362\,880\,000 \approx 3{,}63 \cdot 10^8$<br><strong>Svar:</strong> a) 86 400 s b) $3{,}63 \cdot 10^8$ m³`,
      ],
    ),
    o(
      "P1.OP5",
      3,
      "kalk",
      r`En betongkloss har form som en kube og et volum på 0,8 m³.${del("a")}Hvor lang er hver side? Svar med to desimaler.${del("b")}En ny kube har dobbelt så lange sider. Hvor stort er volumet nå? Forklar uten å regne ut siden.${del("c")}Hvor lang må siden være for at en kubeformet kloss skal ha volumet 1500 dm³? Husk at 1000 dm³ $= 1$ m³.`,
      r`$s = \sqrt[3]{V}$. Dobbelt så lang side gir $(2s)^3 = 2^3 \cdot s^3$.`,
      [
        r`<strong>a)</strong> $\sqrt[3]{0{,}8} \approx 0{,}928 \approx 0{,}93$ m`,
        r`<strong>b)</strong> $(2s)^3 = 8s^3 = 8 \cdot 0{,}8 = 6{,}4$ m³`,
        r`<strong>c)</strong> $1500$ dm³ $= 1{,}5$ m³. $\sqrt[3]{1{,}5} \approx 1{,}145 \approx 1{,}14$ m<br><strong>Svar:</strong> a) 0,93 m b) 6,4 m³ c) 1,14 m`,
      ],
    ),
  ],
};

export const KAP1_1P: Kapittel = {
  id: "p1kap1",
  tittel: "Kapittel 1 Tall, potenser og røtter",
  delkapitler: [dkP1A, dkP1B, dkP1C, dkP1D, dkP1E, dkP1SM, dkP1OP],
};
