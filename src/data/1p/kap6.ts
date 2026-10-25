import { P1P_KAP6_FIGURES } from "./kap6-figurer";
import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "../types";

/*
 * Matematikk 1P · Kapittel 6 Formler og mønstre (P6A–P6E, P6SM, P6OP).
 * Kilde: 1p-bibliotek/kap6-analyse.md og bibliotek.md (mønstrene 6A-1 til 6E-1). Det finnes ingen godkjente tekstark for kap 6:
 * forklaringstekstene er IKKE godkjent ennå. Alle kontekster og tall er egne og laget for oppgavene.
 * Id-er har P-prefiks så de aldri kolliderer med 1T: kapittel «p1kap6», delkapittel «P6A», oppgave «P6.1».
 * All fasit er kontrollert med 1p-bibliotek/src/verify_p1kap6.py (sympy).
 * Figurer er bestilt hos DesignBOT. Inntil de finnes står en skjult kommentar «figur: …» med beskrivelsen.
 */

const r = String.raw;

type Hjelpemidler = "uten" | "med" | "kalk";

function o(id: string, niva: 1 | 2 | 3, hm: Hjelpemidler, tekst: string, hint: string, steg: string[]): Oppgave {
  const merke =
    hm === "uten"
      ? "<strong>Uten hjelpemidler</strong><br><br>"
      : hm === "kalk"
        ? "<em>Med hjelpemidler: bruk kalkulator.</em><br><br>"
        : "<em>Med hjelpemidler: bruk GeoGebra (CAS, regneark eller regresjonsanalyse).</em><br><br>";
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

/** Punkt skrevet som i 1P: (3 , −2). */
function pt(a: string | number, b: string | number): string {
  return `$(${a}\\,,\\,${b})$`;
}

/** Skjult figurbestilling + synlig plassholder til DesignBOT har levert figuren. */
function fig(id: string, beskrivelse: string): string {
  const svg = P1P_KAP6_FIGURES[id];
  if (svg) return `<!-- figur: ${id} — ${beskrivelse} -->${svg}`;
  return `<!-- figur: ${id} — ${beskrivelse} --><em>Figur til oppgave ${id} (kommer).</em><br><br>`;
}

/** Verditabell: hver rad er [overskrift, verdier]. Verdiene skrives som vanlig tekst med desimalkomma. */
function tab(...rader: [string, (string | number)[]][]): string {
  return (
    "<table>" +
    rader.map(([h, v]) => `<tr><th>${h}</th>${v.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("") +
    "</table>"
  );
}

const del = (b: string) => `<br><br><strong>${b})</strong> `;
const ikkeEkte = "<em>Tallene er laget for oppgaven. De er ikke ekte statistikk.</em><br><br>";

// ───────────────────────────── 6A Sette opp og bruke formler ─────────────────────────────

const dkP6A: Delkapittel = {
  id: "P6A",
  tittel: "6A Sette opp og bruke formler",
  quiz: [
    q("Hvilket uttrykk betyr «7 mindre enn $x$»?", [r`$7 - x$`, r`$x - 7$`, r`$7x$`, r`$\dfrac{x}{7}$`], 1, r`Du starter med $x$ og tar bort 7. Da får du $x - 7$. Uttrykket $7 - x$ betyr «$x$ mindre enn 7».`, 1),
    q("Hvilket uttrykk betyr «det tredobbelte av summen av $a$ og 2»?", [r`$3a + 2$`, r`$3 + a + 2$`, r`$a + 6$`, r`$3(a + 2)$`], 3, "Summen må regnes først. Derfor trenger du parentes rundt $a + 2$.", 1),
    q(r`Et stearinlys er 24 cm høyt og brenner ned 1,5 cm per time. Hvilken formel gir høyden $H$ etter $t$ timer?`, [r`$H = 24 - 1{,}5t$`, r`$H = 1{,}5t - 24$`, r`$H = 24 + 1{,}5t$`, r`$H = 24 \cdot 1{,}5t$`], 0, "Du starter på 24 cm og trekker fra 1,5 cm for hver time.", 1),
    q(r`$P = 8m + 50$. Hva er $m$ når $P = 250$?`, [r`$m = 37{,}5$`, r`$m = 2050$`, r`$m = 25$`, r`$m = 31{,}25$`], 2, r`$8m + 50 = 250$ gir $8m = 200$, altså $m = 25$.`, 2),
    q(r`En formel bruker $t$ i minutter. Du har tiden 2 timer. Hvilket tall setter du inn for $t$?`, ["120", "2", "60", "200"], 0, r`2 timer er $2 \cdot 60 = 120$ minutter.`, 2),
    q(r`En app har $N = 2000 \cdot 1{,}15^t$ brukere etter $t$ uker. Hva betyr tallet 1,15?`, ["Appen får 1,15 nye brukere per uke", "Antall brukere øker med 15 % per uke", "Appen har 115 brukere ved start", "Antall brukere øker med 115 % per uke"], 1, r`Vekstfaktoren 1,15 er $100\,\% + 15\,\%$.`, 3),
  ],
  oppgaver: [
    o(
      "P6.1",
      1,
      "uten",
      `Skriv som et algebraisk uttrykk.${del("a")}7 mindre enn $x$${del("b")}En tredjedel av $y$${del("c")}Produktet av $a$ og $b$${del("d")}Det tredobbelte av differansen mellom $x$ og 2${del("e")}Kvadratet av summen av $a$ og 1`,
      "Les teksten bakfra og fram: hva skal regnes først? Bruk parentes når en sum eller differanse skal regnes først.",
      [
        r`<strong>a)</strong> $x - 7$`,
        r`<strong>b)</strong> $\dfrac{y}{3}$`,
        r`<strong>c)</strong> $a \cdot b = ab$`,
        r`<strong>d)</strong> $3(x - 2)$`,
        r`<strong>e)</strong> $(a + 1)^2$<br><strong>Svar:</strong> a) $x - 7$ b) $\dfrac{y}{3}$ c) $ab$ d) $3(x - 2)$ e) $(a + 1)^2$`,
      ],
    ),
    o(
      "P6.2",
      1,
      "uten",
      `Mira lufter hunder for naboene. Hun får 120 kr per tur på hverdager og 150 kr per tur i helgene.${del("a")}Lag en formel for hvor mye hun tjener, $L$, når hun går $h$ turer på hverdager og $w$ turer i helgene.${del("b")}Hvor mye tjener hun en uke med 6 hverdagsturer og 2 helgeturer?`,
      "Hver type tur gir sitt eget ledd i formelen.",
      [
        r`<strong>a)</strong> Hverdagsturene gir $120h$ kroner og helgeturene $150w$ kroner. $L = 120h + 150w$.`,
        r`<strong>b)</strong> $L = 120 \cdot 6 + 150 \cdot 2 = 720 + 300 = 1020$<br><strong>Svar:</strong> a) $L = 120h + 150w$ b) 1020 kr`,
      ],
    ),
    o(
      "P6.3",
      1,
      "uten",
      `Et stearinlys er 24 cm høyt. Når det brenner, blir det 1,5 cm lavere hver time.${del("a")}Forklar at høyden $H$ i centimeter etter $t$ timer er $H = 24 - 1{,}5t$.${del("b")}Hvor høyt er lyset etter 6 timer?${del("c")}Når har lyset brent ned? Hva blir gyldighetsområdet til formelen?`,
      "Lyset er brent ned når $H = 0$.",
      [
        r`<strong>a)</strong> Lyset starter på 24 cm. For hver time trekker vi fra 1,5 cm, så etter $t$ timer har vi trukket fra $1{,}5t$ cm.`,
        r`<strong>b)</strong> $H = 24 - 1{,}5 \cdot 6 = 24 - 9 = 15$`,
        r`<strong>c)</strong> $24 - 1{,}5t = 0$ gir $1{,}5t = 24$, altså $t = 16$. Formelen gjelder for $0 \le t \le 16$.<br><strong>Svar:</strong> b) 15 cm c) Etter 16 timer. Gyldighetsområdet er $0 \le t \le 16$.`,
      ],
    ),
    o(
      "P6.4",
      2,
      "uten",
      `En gokartbane bruker formelen $P = 8m + 50$ for prisen $P$ i kroner når du kjører i $m$ minutter.${del("a")}Hva betyr tallene 8 og 50?${del("b")}Hva koster 15 minutter?${del("c")}Hva koster 2 timer?${del("d")}Ola betaler 250 kr. Hvor lenge kjørte han?`,
      "Pass på enheten: formelen bruker minutter.",
      [
        "<strong>a)</strong> 8 kr er prisen per minutt. 50 kr er en fast avgift du betaler uansett.",
        r`<strong>b)</strong> $P = 8 \cdot 15 + 50 = 170$`,
        r`<strong>c)</strong> 2 timer er 120 minutter. $P = 8 \cdot 120 + 50 = 1010$`,
        r`<strong>d)</strong> $8m + 50 = 250$ gir $8m = 200$, altså $m = 25$.<br><strong>Svar:</strong> b) 170 kr c) 1010 kr d) 25 minutter`,
      ],
    ),
    o(
      "P6.5",
      2,
      "kalk",
      `Stigningsprosenten $p$ til en bakke eller rampe er $p = \dfrac{h}{L} \cdot 100$, der $h$ er hvor mye den stiger, og $L$ er lengden målt vannrett. Begge måles i samme enhet.${del("a")}En rullestolrampe skal stige 0,45 m og ha stigningsprosent 5. Hvor lang må rampen være?${del("b")}En skitrekk-trase er 1,8 km lang (målt vannrett) og har stigningsprosent 12. Hvor mange meter stiger den?`,
      "Snu formelen: $h = \\dfrac{p \\cdot L}{100}$ og $L = \\dfrac{h \\cdot 100}{p}$. Gjør om km til m.",
      [
        r`<strong>a)</strong> $L = \dfrac{0{,}45 \cdot 100}{5} = 9$`,
        r`<strong>b)</strong> 1,8 km = 1800 m. $h = \dfrac{12 \cdot 1800}{100} = 216$<br><strong>Svar:</strong> a) 9 m b) 216 m`,
      ],
    ),
    o(
      "P6.6",
      2,
      "med",
      r`Arealet av en sirkel er $A = \pi r^2$, der $r$ er radien.${del("a")}En pizza har diameter 30 cm. Finn arealet.${del("b")}En pizzabaker vil lage en pizza med areal $0{,}1\ \text{m}^2$. Hvor stor må diameteren være?`,
      r`$1\ \text{m}^2 = 10\,000\ \text{cm}^2$. Løs $\pi r^2 = 1000$ i CAS.`,
      [
        r`<strong>a)</strong> $r = 15$ cm. $A = \pi \cdot 15^2 \approx 706{,}9$`,
        r`<strong>b)</strong> $0{,}1\ \text{m}^2 = 1000\ \text{cm}^2$. $\pi r^2 = 1000$ gir $r \approx 17{,}84$ eller $r \approx -17{,}84$. En radius kan ikke være negativ, så $r \approx 17{,}84$ cm og $d \approx 35{,}7$ cm.<br><strong>Svar:</strong> a) Omtrent $707\ \text{cm}^2$ b) Omtrent 35,7 cm`,
      ],
    ),
    o(
      "P6.7",
      3,
      "med",
      `En ny app har $N = 2000 \\cdot 1{,}15^t$ brukere etter $t$ uker.${del("a")}Hva betyr tallene 2000 og 1,15?${del("b")}Hvor mange brukere har appen etter 6 uker?${del("c")}Etter hvor mange hele uker har appen passert 10 000 brukere?`,
      "Tegn grafen og linjen $y = 10\\,000$ i GeoGebra, eller løs likningen i CAS.",
      [
        "<strong>a)</strong> 2000 er antall brukere ved start. Antall brukere øker med 15 % per uke.",
        r`<strong>b)</strong> $N = 2000 \cdot 1{,}15^6 \approx 4626$`,
        r`<strong>c)</strong> $2000 \cdot 1{,}15^t = 10\,000$ gir $t \approx 11{,}5$. Etter 11 uker er $N \approx 9305$, og etter 12 uker er $N \approx 10\,700$.<br><strong>Svar:</strong> b) Omtrent 4626 brukere c) Etter 12 uker`,
      ],
    ),
    o(
      "P6.8",
      3,
      "kalk",
      `Et kor hadde 34 medlemmer i 2015. Siden har det fått 3 nye medlemmer hvert år.${del("a")}Lag en formel for antall medlemmer $M$ når $x$ er antall år etter 2015.${del("b")}Lag en ny formel der $t$ er antall år etter 2022.${del("c")}Når passerer koret 80 medlemmer hvis utviklingen fortsetter?`,
      "Finn først antall medlemmer i 2022.",
      [
        r`<strong>a)</strong> $M = 34 + 3x$`,
        r`<strong>b)</strong> I 2022 er $x = 7$, så $M = 34 + 21 = 55$. $M = 55 + 3t$`,
        r`<strong>c)</strong> $34 + 3x = 80$ gir $x \approx 15{,}3$. I 2030 ($x = 15$) er det 79 medlemmer, og i 2031 ($x = 16$) er det 82.<br><strong>Svar:</strong> a) $M = 34 + 3x$ b) $M = 55 + 3t$ c) I 2031`,
      ],
    ),
  ],
};

// ───────────────────────────── 6B Fast forhold: y = kx ─────────────────────────────

const dkP6B: Delkapittel = {
  id: "P6B",
  tittel: "6B Fast forhold: y = kx",
  quiz: [
    q("Hva betyr det at $y$ er proporsjonal med $x$?", [r`$y = x + k$`, r`$x \cdot y$ er alltid den samme`, r`$\dfrac{y}{x}$ er alltid den samme`, "Grafen er en rett linje"], 2, r`Forholdet $\dfrac{y}{x} = k$ er konstant, så $y = kx$.`, 1),
    q("Hvilken formel viser at $y$ er proporsjonal med $x$?", [r`$y = 4x$`, r`$y = 4x + 10$`, r`$y = 4x^2$`, r`$y = \dfrac{4}{x}$`], 0, r`Bare $y = 4x$ har formen $y = kx$.`, 1),
    q("En kopi koster 0,60 kr per side. Hva koster 35 sider?", ["35,60 kr", "58,33 kr", "2,10 kr", "21 kr"], 3, r`$0{,}60 \cdot 35 = 21$`, 1),
    q("Grafen til to proporsjonale størrelser er alltid", ["en fallende rett linje", "en rett linje gjennom origo", "en kurve som nærmer seg aksene", "en rett linje som skjærer $y$-aksen over origo"], 1, "$y = kx$ gir $y = 0$ når $x = 0$, så linjen går gjennom origo.", 2),
    q("Et svømmekort med 4 klipp koster 360 kr, og et med 10 klipp koster 800 kr. Er prisen proporsjonal med antall klipp?", ["Ja, fordi prisen øker når antall klipp øker", "Ja, fordi begge er hele tall", "Det kan vi ikke vite", "Nei, fordi prisen per klipp ikke er den samme"], 3, r`$\dfrac{360}{4} = 90$ kr og $\dfrac{800}{10} = 80$ kr per klipp. Proporsjonalt ville gitt $10 \cdot 90 = 900$ kr.`, 2),
    q("5 personer leier en hytte i 3 døgn for 1950 kr. Hva betaler 4 personer i 6 døgn med samme pris per person per døgn?", ["2600 kr", "3900 kr", "3120 kr", "1560 kr"], 2, r`$\dfrac{1950}{5 \cdot 3} = 130$ kr per person per døgn. $130 \cdot 4 \cdot 6 = 3120$`, 3),
  ],
  oppgaver: [
    o(
      "P6.9",
      1,
      "uten",
      `På skolebiblioteket koster det 0,80 kr per side å skrive ut.${del("a")}Forklar at prisen $y$ er proporsjonal med antall sider $x$, og skriv formelen.${del("b")}Hva koster 25 sider?${del("c")}Hvor mange sider kan du skrive ut for 60 kr?`,
      "Prisen per side er proporsjonalitetskonstanten $k$.",
      [
        r`<strong>a)</strong> Hver side koster det samme, og 0 sider koster 0 kr. Da er $\dfrac{y}{x} = 0{,}80$ hele tiden, og $y = 0{,}8x$.`,
        r`<strong>b)</strong> $y = 0{,}8 \cdot 25 = 20$`,
        r`<strong>c)</strong> $0{,}8x = 60$ gir $x = \dfrac{60}{0{,}8} = 75$<br><strong>Svar:</strong> a) $y = 0{,}8x$ b) 20 kr c) 75 sider`,
      ],
    ),
    o(
      "P6.10",
      1,
      "uten",
      `En klatrehall selger klippekort. Et kort med 5 klipp koster 400 kr. Et kort med 10 klipp koster 700 kr. Er prisen proporsjonal med antall klipp? Begrunn svaret.`,
      "Hva ville 10 klipp kostet hvis prisen var proporsjonal?",
      [
        r`Hvis prisen var proporsjonal, ville dobbelt så mange klipp kostet dobbelt så mye: $2 \cdot 400 = 800$ kr. Men kortet koster 700 kr.`,
        r`Vi kan også se på pris per klipp: $\dfrac{400}{5} = 80$ og $\dfrac{700}{10} = 70$. Forholdet er ikke det samme.<br><strong>Svar:</strong> Nei, prisen er ikke proporsjonal med antall klipp.`,
      ],
    ),
    o(
      "P6.11",
      1,
      "uten",
      r`Hvilke av formlene viser at $y$ er proporsjonal med $x$? Finn proporsjonalitetskonstanten for dem som er det.${del("a")}$y = 2{,}5x$${del("b")}$y = 6 + x$${del("c")}$y = \dfrac{x}{4}$${del("d")}$y = \dfrac{5}{x}$${del("e")}$y = x^2 + 1$${del("f")}$y = 0{,}4 \cdot 3x$`,
      r`Formelen må kunne skrives som $y = kx$.`,
      [
        r`<strong>a)</strong> Ja, $k = 2{,}5$.`,
        r`<strong>b)</strong> Nei. Det faste leddet 6 gjør at $y \ne 0$ når $x = 0$.`,
        r`<strong>c)</strong> Ja. $\dfrac{x}{4} = \dfrac{1}{4}x$, så $k = \dfrac{1}{4} = 0{,}25$.`,
        r`<strong>d)</strong> Nei. Her er $y$ omvendt proporsjonal med $x$.`,
        r`<strong>e)</strong> Nei. $x$ er opphøyd i andre, og det er et fast ledd.`,
        r`<strong>f)</strong> Ja. $0{,}4 \cdot 3x = 1{,}2x$, så $k = 1{,}2$.<br><strong>Svar:</strong> a) med $k = 2{,}5$, c) med $k = 0{,}25$ og f) med $k = 1{,}2$`,
      ],
    ),
    o(
      "P6.12",
      2,
      "kalk",
      `Tabellene viser prisen på kaffebønner fra to brennerier.<br><br>Brenneri A<br>${tab(["Vekt (kg)", ["0,25", "0,5", "1,2"]], ["Pris (kr)", ["72", "144", "345,60"]])}<br>Brenneri B<br>${tab(["Vekt (kg)", ["0,25", "0,5", "1"]], ["Pris (kr)", ["80", "150", "280"]])}${del("a")}Undersøk om prisen er proporsjonal med vekten hos hvert brenneri.${del("b")}Skriv en formel for prisen hos det brenneriet der prisen er proporsjonal.`,
      "Regn ut pris delt på vekt for hver kolonne.",
      [
        r`<strong>a)</strong> A: $\dfrac{72}{0{,}25} = 288$, $\dfrac{144}{0{,}5} = 288$ og $\dfrac{345{,}6}{1{,}2} = 288$. Forholdet er konstant, så prisen er proporsjonal. B: $\dfrac{80}{0{,}25} = 320$, $\dfrac{150}{0{,}5} = 300$ og $\dfrac{280}{1} = 280$. Forholdet endrer seg, så prisen er ikke proporsjonal.`,
        r`<strong>b)</strong> $y = 288x$, der $x$ er vekten i kg og $y$ er prisen i kroner.<br><strong>Svar:</strong> a) Proporsjonal hos A, ikke hos B. b) $y = 288x$`,
      ],
    ),
    o(
      "P6.13",
      2,
      "kalk",
      `I tabellen er $y$ proporsjonal med $x$. Finn tallene som mangler.<br><br>${tab(["$x$", ["2,5", "?", "7,2"]], ["$y$", ["9,5", "20,9", "?"]])}`,
      "Finn først $k = \\dfrac{y}{x}$ fra kolonnen der du kjenner begge tallene.",
      [
        r`$k = \dfrac{9{,}5}{2{,}5} = 3{,}8$, så $y = 3{,}8x$.`,
        r`$3{,}8x = 20{,}9$ gir $x = 5{,}5$.`,
        r`$y = 3{,}8 \cdot 7{,}2 = 27{,}36$<br><strong>Svar:</strong> $x = 5{,}5$ og $y = 27{,}36$`,
      ],
    ),
    o(
      "P6.14",
      2,
      "uten",
      `${fig("P6.14", "Koordinatsystem med x-akse «Timer» 0–10 og y-akse «Lønn (kr)» 0–2000. To rette linjer: Ane går gjennom origo og (5 , 900). Bo starter i (0 , 300) og går gjennom (8 , 1500). Merk punktene.")}Grafene viser lønna til Ane og Bo i en sommerjobb.${del("a")}Hvem har lønn som er proporsjonal med antall timer? Begrunn svaret.${del("b")}Finn timelønna til Ane og skriv en formel for lønna hennes.${del("c")}Forklar hvorfor lønna til Bo ikke er proporsjonal, selv om grafen er en rett linje.`,
      "En proporsjonal sammenheng har en rett linje som går gjennom origo.",
      [
        "<strong>a)</strong> Ane. Linjen hennes er rett og går gjennom origo.",
        r`<strong>b)</strong> Ane får 900 kr for 5 timer. $\dfrac{900}{5} = 180$, så $y = 180x$.`,
        r`<strong>c)</strong> Bo får 300 kr selv om han jobber 0 timer. Formelen hans er $y = 150x + 300$, og den har et fast ledd. Da er ikke $\dfrac{y}{x}$ konstant.<br><strong>Svar:</strong> a) Ane b) 180 kr per time, $y = 180x$ c) Linjen til Bo går ikke gjennom origo.`,
      ],
    ),
    o(
      "P6.15",
      3,
      "uten",
      `En camping leier ut telt. Prisen er den samme per person per døgn. 6 personer i 4 døgn betaler 3360 kr til sammen.${del("a")}Hva koster det per person per døgn?${del("b")}Hva betaler 9 personer som blir i 5 døgn?${del("c")}En gruppe på 7 personer betaler 4900 kr. Hvor mange døgn ble de?`,
      "Prisen er proporsjonal med antall personer og med antall døgn.",
      [
        r`<strong>a)</strong> $\dfrac{3360}{6 \cdot 4} = \dfrac{3360}{24} = 140$`,
        r`<strong>b)</strong> $140 \cdot 9 \cdot 5 = 6300$`,
        r`<strong>c)</strong> $140 \cdot 7 = 980$ kr per døgn for gruppen. $\dfrac{4900}{980} = 5$<br><strong>Svar:</strong> a) 140 kr b) 6300 kr c) 5 døgn`,
      ],
    ),
    o(
      "P6.16",
      3,
      "kalk",
      `${ikkeEkte}Elevene i en klasse har målt massen av ulike lengder av en kobberledning.<br><br>${tab(["Lengde (m)", ["2,0", "5,0", "8,0", "12,0"]], ["Masse (kg)", ["0,36", "0,89", "1,45", "2,15"]])}${del("a")}Regn ut masse delt på lengde for hver måling.${del("b")}Er massen proporsjonal med lengden? Hvorfor er ikke forholdene helt like?${del("c")}Bruk en passende konstant til å anslå massen av 30 m ledning.`,
      "Målinger har alltid litt usikkerhet.",
      [
        r`<strong>a)</strong> $\dfrac{0{,}36}{2} = 0{,}18$, $\dfrac{0{,}89}{5} = 0{,}178$, $\dfrac{1{,}45}{8} \approx 0{,}181$ og $\dfrac{2{,}15}{12} \approx 0{,}179$.`,
        "<strong>b)</strong> Forholdene er nesten like, så massen er tilnærmet proporsjonal med lengden. De små forskjellene kommer av måleusikkerhet.",
        r`<strong>c)</strong> Med $k \approx 0{,}18$ kg/m: $0{,}18 \cdot 30 = 5{,}4$<br><strong>Svar:</strong> b) Ja, tilnærmet proporsjonal. c) Omtrent 5,4 kg`,
      ],
    ),
  ],
};

// ───────────────────────────── 6C Fast produkt: y = k/x ─────────────────────────────

const dkP6C: Delkapittel = {
  id: "P6C",
  tittel: "6C Fast produkt: y = k/x",
  quiz: [
    q("Hva betyr det at $y$ er omvendt proporsjonal med $x$?", [r`$x \cdot y$ er alltid den samme`, r`$\dfrac{y}{x}$ er alltid den samme`, r`$y$ blir mindre når $x$ blir større`, "Grafen er en fallende rett linje"], 0, r`Produktet $x \cdot y = k$ er konstant, så $y = \dfrac{k}{x}$. At $y$ blir mindre når $x$ blir større, stemmer, men det er ingen definisjon. Det gjelder også for $y = 30 - x$, som ikke er omvendt proporsjonal.`, 1),
    q("Et lag spleiser på en premie til 1800 kr. Hva betaler hver hvis 36 deler likt?", ["36 kr", "60 kr", "50 kr", "45 kr"], 2, r`$\dfrac{1800}{36} = 50$`, 1),
    q("Hvilken formel viser en omvendt proporsjonal sammenheng?", [r`$y = 30 - x$`, r`$y = \dfrac{30}{x}$`, r`$y = \dfrac{x}{30}$`, r`$y = 30x$`], 1, r`$y = \dfrac{30}{x}$ gir $x \cdot y = 30$ for alle $x$.`, 1),
    q(r`I en tabell er $x \cdot y = 72$ for alle verdiene. Hva er $y$ når $x = 8$?`, ["64", "576", "80", "9"], 3, r`$y = \dfrac{72}{8} = 9$`, 2),
    q(r`En strekning er 120 km. Hvilke størrelser i $s = v \cdot t$ er omvendt proporsjonale?`, ["Fart og tid", "Strekning og tid", "Strekning og fart", "Ingen av dem"], 0, "Når strekningen er fast, gir dobbel fart halv tid.", 2),
    q("En gruppe leier en hall for 2400 kr. Hvor mange må være med for at prisen per person skal bli høyst 90 kr?", ["26", "27", "24", "30"], 1, r`$\dfrac{2400}{x} \le 90$ gir $x \ge 26{,}7$. Antall personer må være et helt tall, så vi runder opp til 27.`, 3),
  ],
  oppgaver: [
    o(
      "P6.17",
      1,
      "uten",
      `En klasse spleiser på en gave til læreren. Gaven koster 1200 kr, og alle betaler like mye.${del("a")}Hvor mye betaler hver hvis 8, 15 eller 24 elever er med?${del("b")}Skriv en formel for hvor mye hver betaler, $y$, når $x$ elever er med.${del("c")}Hva skjer med beløpet per elev når antall elever dobles?`,
      "Del totalbeløpet på antall elever.",
      [
        r`<strong>a)</strong> $\dfrac{1200}{8} = 150$, $\dfrac{1200}{15} = 80$ og $\dfrac{1200}{24} = 50$`,
        r`<strong>b)</strong> $y = \dfrac{1200}{x}$`,
        r`<strong>c)</strong> Beløpet halveres.<br><strong>Svar:</strong> a) 150 kr, 80 kr og 50 kr b) $y = \dfrac{1200}{x}$ c) Det halveres.`,
      ],
    ),
    o(
      "P6.18",
      1,
      "uten",
      `Vis at $y$ er omvendt proporsjonal med $x$ i begge tabellene, og skriv en formel for $y$.${del("a")}${tab(["$x$", [2, 3, 6, 8]], ["$y$", [36, 24, 12, 9]])}${del("b")}${tab(["$x$", [1, 4, 5, 10]], ["$y$", [20, 5, 4, 2]])}`,
      "Regn ut $x \\cdot y$ for hver kolonne.",
      [
        r`<strong>a)</strong> $2 \cdot 36 = 3 \cdot 24 = 6 \cdot 12 = 8 \cdot 9 = 72$. Produktet er konstant, så $y = \dfrac{72}{x}$.`,
        r`<strong>b)</strong> $1 \cdot 20 = 4 \cdot 5 = 5 \cdot 4 = 10 \cdot 2 = 20$, så $y = \dfrac{20}{x}$.<br><strong>Svar:</strong> a) $y = \dfrac{72}{x}$ b) $y = \dfrac{20}{x}$`,
      ],
    ),
    o(
      "P6.19",
      1,
      "uten",
      r`Hvilke av sammenhengene er omvendt proporsjonale?${del("a")}$y = \dfrac{30}{x}$${del("b")}$y = 30 - x$${del("c")}$x \cdot y = 12$${del("d")}$y = \dfrac{x}{30}$`,
      r`Sjekk om produktet $x \cdot y$ er det samme for alle $x$.`,
      [
        r`<strong>a)</strong> Ja, $x \cdot y = 30$.`,
        r`<strong>b)</strong> Nei. $y$ blir mindre når $x$ blir større, men $x = 5$ gir $x \cdot y = 5 \cdot 25 = 125$ og $x = 10$ gir $x \cdot y = 10 \cdot 20 = 200$. Produktet er ikke konstant.`,
        r`<strong>c)</strong> Ja, $y = \dfrac{12}{x}$.`,
        r`<strong>d)</strong> Nei. Her er $y$ proporsjonal med $x$.<br><strong>Svar:</strong> a) og c)`,
      ],
    ),
    o(
      "P6.20",
      2,
      "uten",
      `Avgjør om $y$ er proporsjonal, omvendt proporsjonal eller ingen av delene med $x$ i hver tabell.<br><br>Tabell A<br>${tab(["$x$", [1, 2, 4, 6]], ["$y$", [12, 6, 3, 2]])}<br>Tabell B<br>${tab(["$x$", [2, 4, 6]], ["$y$", [5, 10, 15]])}<br>Tabell C<br>${tab(["$x$", [1, 2, 3]], ["$y$", [10, 6, 4]])}`,
      "Regn ut både $\\dfrac{y}{x}$ og $x \\cdot y$.",
      [
        r`<strong>A:</strong> $x \cdot y = 12$ i alle kolonnene. Omvendt proporsjonal.`,
        r`<strong>B:</strong> $\dfrac{y}{x} = 2{,}5$ i alle kolonnene. Proporsjonal.`,
        r`<strong>C:</strong> $x \cdot y$ blir 10, 12 og 12, og $\dfrac{y}{x}$ blir 10, 3 og omtrent 1,33. Ingen av delene, selv om $y$ minker når $x$ øker.<br><strong>Svar:</strong> A omvendt proporsjonal, B proporsjonal, C ingen av delene`,
      ],
    ),
    o(
      "P6.21",
      2,
      "uten",
      `Sammenhengen mellom strekning $s$, fart $v$ og tid $t$ er $s = v \\cdot t$.${del("a")}En sykkeltur er 120 km. Hvor lang tid tar turen med farten 20 km/h, 30 km/h og 40 km/h?${del("b")}Hvilke to størrelser er omvendt proporsjonale når strekningen er fast?${del("c")}Hvilke størrelser er proporsjonale når farten er fast?`,
      "Snu formelen: $t = \\dfrac{s}{v}$.",
      [
        r`<strong>a)</strong> $\dfrac{120}{20} = 6$, $\dfrac{120}{30} = 4$ og $\dfrac{120}{40} = 3$`,
        r`<strong>b)</strong> Fart og tid, fordi $v \cdot t = 120$ hele tiden.`,
        r`<strong>c)</strong> Strekning og tid, fordi $\dfrac{s}{t} = v$ er konstant.<br><strong>Svar:</strong> a) 6 h, 4 h og 3 h b) Fart og tid c) Strekning og tid`,
      ],
    ),
    o(
      "P6.22",
      2,
      "uten",
      `${fig("P6.22", "Koordinatsystem med x-akse «Antall besøk» 0–20 og y-akse «Pris per besøk (kr)» 0–500. Fallende kurve y = 1500/x for x fra 3 til 20. Merk punktene (4 , 375), (10 , 150) og (15 , 100).")}Et sesongkort til et badeland koster 1500 kr. Grafen viser hva hvert besøk koster når du deler prisen på antall besøk.${del("a")}Hva koster hvert besøk hvis du bader 12 ganger?${del("b")}Vis at prisen per besøk $y$ er omvendt proporsjonal med antall besøk $x$, og skriv formelen.${del("c")}Hvor mange ganger må du bade for at hvert besøk skal koste 75 kr?`,
      "Regn ut $x \\cdot y$ for de merkede punktene.",
      [
        r`<strong>a)</strong> $\dfrac{1500}{12} = 125$ kr`,
        r`<strong>b)</strong> $4 \cdot 375 = 10 \cdot 150 = 15 \cdot 100 = 1500$. Produktet er konstant, så $y = \dfrac{1500}{x}$.`,
        r`<strong>c)</strong> $\dfrac{1500}{x} = 75$ gir $x = 20$<br><strong>Svar:</strong> a) 125 kr b) $y = \dfrac{1500}{x}$ c) 20 ganger`,
      ],
    ),
    o(
      "P6.23",
      3,
      "kalk",
      `Et idrettslag leier en fotballhall for en turnering. Leien er 9600 kr, og den deles likt på alle spillerne. Det er plass til høyst 64 spillere.${del("a")}Skriv en formel for prisen per spiller $P$ når $x$ spillere er med. Hva er gyldighetsområdet?${del("b")}Hvor mange spillere må være med for at prisen skal bli høyst 200 kr?${del("c")}Kan prisen bli høyst 120 kr per spiller? Begrunn svaret.`,
      "Antall spillere er et helt tall. Tenk på om du skal runde opp eller ned.",
      [
        r`<strong>a)</strong> $P = \dfrac{9600}{x}$, der $x$ er et helt tall og $1 \le x \le 64$.`,
        r`<strong>b)</strong> $\dfrac{9600}{x} \le 200$ gir $x \ge 48$. Med 48 spillere blir prisen nøyaktig 200 kr.`,
        r`<strong>c)</strong> $\dfrac{9600}{x} \le 120$ gir $x \ge 80$. Det er bare plass til 64, og da blir prisen $\dfrac{9600}{64} = 150$ kr.<br><strong>Svar:</strong> a) $P = \dfrac{9600}{x}$, $1 \le x \le 64$ b) Minst 48 spillere c) Nei, den laveste prisen er 150 kr.`,
      ],
    ),
    o(
      "P6.24",
      3,
      "uten",
      `Et rektangulært blomsterbed skal ha arealet $24\\ \\text{m}^2$. Lengden er $l$ og bredden er $b$, begge i meter.${del("a")}Forklar at bredden er omvendt proporsjonal med lengden, og skriv en formel for $b$.${del("b")}Finn omkretsen når lengden er 3 m, 4 m, 6 m og 12 m.${del("c")}Er omkretsen proporsjonal, omvendt proporsjonal eller ingen av delene med lengden? Begrunn svaret.`,
      "Omkretsen er $2l + 2b$.",
      [
        r`<strong>a)</strong> $l \cdot b = 24$ er fast, så $b = \dfrac{24}{l}$.`,
        r`<strong>b)</strong> $l = 3$: $b = 8$, omkrets $6 + 16 = 22$. $l = 4$: $b = 6$, omkrets 20. $l = 6$: $b = 4$, omkrets 20. $l = 12$: $b = 2$, omkrets 28.`,
        r`<strong>c)</strong> Ingen av delene. Omkretsen går først ned og så opp, så verken $\dfrac{O}{l}$ eller $O \cdot l$ er konstant.<br><strong>Svar:</strong> a) $b = \dfrac{24}{l}$ b) 22 m, 20 m, 20 m og 28 m c) Ingen av delene`,
      ],
    ),
  ],
};

// ───────────────────────────── 6D Tallfølger og regler ─────────────────────────────

const dkP6D: Delkapittel = {
  id: "P6D",
  tittel: "6D Tallfølger og regler",
  quiz: [
    q("Hva er de to neste tallene i følgen 40, 35, 30, 25, …?", ["23 og 21", "22 og 18", "15 og 10", "20 og 15"], 3, "Du trekker fra 5 hver gang.", 1),
    q("Hva er neste tall i følgen 5, 10, 20, 40, …?", ["50", "80", "60", "45"], 1, "Du ganger med 2 hver gang.", 1),
    q(r`En følge har $y_n = 8n$. Hvilket tall er med i følgen?`, ["100", "84", "112", "90"], 2, r`$8n = 112$ gir $n = 14$, som er et helt tall.`, 2),
    q("Hvilken formel passer til følgen 5, 11, 17, 23, …?", [r`$y_n = 6n - 1$`, r`$y_n = 6n$`, r`$y_n = 5n + 6$`, r`$y_n = n + 6$`], 0, r`Tallene øker med 6, så formelen er $6n + b$. $6 \cdot 1 + b = 5$ gir $b = -1$.`, 2),
    q("Hvilken formel passer til følgen 1, 4, 16, 64, …?", [r`$y_n = 4^n$`, r`$y_n = 4n$`, r`$y_n = 4^{n-1}$`, r`$y_n = n^4$`], 2, r`$4^0 = 1$, $4^1 = 4$, $4^2 = 16$. Eksponenten er én mindre enn plassnummeret.`, 2),
    q("Hva er neste tall i følgen 3, 5, 9, 15, 23, …?", ["31", "29", "46", "33"], 3, "Differansene er 2, 4, 6, 8. Neste differanse er 10, og 23 + 10 = 33.", 3),
  ],
  oppgaver: [
    o(
      "P6.25",
      1,
      "uten",
      `Beskriv mønsteret og finn de to neste tallene.${del("a")}31, 27, 23, 19, …${del("b")}3, 6, 12, 24, …${del("c")}2, 3, 5, 8, 12, …${del("d")}81, 27, 9, …`,
      "Se på hvordan du kommer fra ett tall til det neste. Er det samme tall du legger til, eller samme tall du ganger med?",
      [
        "<strong>a)</strong> Trekk fra 4 hver gang: 15 og 11.",
        "<strong>b)</strong> Gang med 2 hver gang: 48 og 96.",
        "<strong>c)</strong> Differansene er 1, 2, 3, 4. Neste differanser er 5 og 6: 17 og 23.",
        "<strong>d)</strong> Del på 3 hver gang: 3 og 1.<br><strong>Svar:</strong> a) 15, 11 b) 48, 96 c) 17, 23 d) 3, 1",
      ],
    ),
    o(
      "P6.26",
      1,
      "uten",
      `En tallfølge har formelen $y_n = 6n$.${del("a")}Skriv de fire første tallene i følgen.${del("b")}Finn tall nummer 20.${del("c")}Er 96 med i følgen? Er 100 med?`,
      "Et tall er med i følgen hvis likningen $6n = \\text{tallet}$ gir et positivt heltall $n$.",
      [
        "<strong>a)</strong> 6, 12, 18, 24",
        r`<strong>b)</strong> $y_{20} = 6 \cdot 20 = 120$`,
        r`<strong>c)</strong> $6n = 96$ gir $n = 16$, så 96 er tall nummer 16. $6n = 100$ gir $n \approx 16{,}7$, som ikke er et helt tall.<br><strong>Svar:</strong> a) 6, 12, 18, 24 b) 120 c) 96 er med, 100 er ikke med.`,
      ],
    ),
    o(
      "P6.27",
      2,
      "uten",
      `Følgen 4, 11, 18, 25, … fortsetter på samme måte.${del("a")}Forklar at $y_n = 7n - 3$.${del("b")}Finn tall nummer 30.${del("c")}Er 150 med i følgen? Er 158 med?`,
      "Tallene øker med 7 hver gang. Sammenlign med 7-gangen: 7, 14, 21, 28.",
      [
        r`<strong>a)</strong> Tallene øker med 7, så formelen har leddet $7n$. 7-gangen er 7, 14, 21, 28, og følgen ligger 3 under, altså $y_n = 7n - 3$.`,
        r`<strong>b)</strong> $y_{30} = 7 \cdot 30 - 3 = 207$`,
        r`<strong>c)</strong> $7n - 3 = 150$ gir $7n = 153$, og 153 er ikke delelig med 7. $7n - 3 = 158$ gir $7n = 161$, altså $n = 23$.<br><strong>Svar:</strong> b) 207 c) 150 er ikke med. 158 er tall nummer 23.`,
      ],
    ),
    o(
      "P6.28",
      2,
      "uten",
      `Se på de to følgene<br>A: 3, 9, 27, 81, …<br>B: 1, 3, 9, 27, …${del("a")}Finn en formel for tall nummer $n$ i hver følge.${del("b")}Finn tall nummer 6 i følge A.${del("c")}Er 243 med i følge A? Hvilket plassnummer har det i så fall?`,
      "Skriv tallene som potenser av 3.",
      [
        r`<strong>a)</strong> A: $3 = 3^1$, $9 = 3^2$, $27 = 3^3$, så $y_n = 3^n$. B: $1 = 3^0$, $3 = 3^1$, $9 = 3^2$, så $y_n = 3^{n-1}$.`,
        r`<strong>b)</strong> $3^6 = 729$`,
        r`<strong>c)</strong> $243 = 3 \cdot 81 = 3^5$, så 243 er tall nummer 5.<br><strong>Svar:</strong> a) A: $y_n = 3^n$, B: $y_n = 3^{n-1}$ b) 729 c) Ja, nummer 5.`,
      ],
    ),
    o(
      "P6.29",
      2,
      "uten",
      `Er tallene i følgen proporsjonale med plassnummeret $n$? Begrunn svaret.${del("a")}5, 10, 15, 20, …${del("b")}6, 11, 16, 21, …${del("c")}2, 4, 8, 16, …`,
      "Tallene er proporsjonale med $n$ hvis $\\dfrac{y_n}{n}$ er det samme for alle $n$.",
      [
        r`<strong>a)</strong> Ja. $y_n = 5n$, og $\dfrac{y_n}{n} = 5$ hele tiden.`,
        r`<strong>b)</strong> Nei. $y_n = 5n + 1$ har et fast ledd. For eksempel er $\dfrac{6}{1} = 6$ og $\dfrac{11}{2} = 5{,}5$.`,
        r`<strong>c)</strong> Nei. $y_n = 2^n$. $\dfrac{2}{1} = 2$ og $\dfrac{4}{2} = 2$, men $\dfrac{8}{3} \approx 2{,}67$.<br><strong>Svar:</strong> Bare a).`,
      ],
    ),
    o(
      "P6.30",
      3,
      "med",
      `Følgen 4, 7, 12, 19, 28, … fortsetter på samme måte.${del("a")}Finn differansene mellom tallene. Hva blir de neste to tallene?${del("b")}Bruk regresjon i GeoGebra (polynom av grad 2) til å finne en formel for $y_n$.${del("c")}Er 403 med i følgen? Er 500 med?`,
      "Lag en tabell med $n$ og $y_n$ i regnearket.",
      [
        "<strong>a)</strong> Differansene er 3, 5, 7, 9. De neste er 11 og 13, så neste tall er 39 og 52.",
        r`<strong>b)</strong> Regresjonen gir $y_n = n^2 + 3$.`,
        r`<strong>c)</strong> $n^2 + 3 = 403$ gir $n^2 = 400$ og $n = 20$ (vi forkaster $-20$). $n^2 + 3 = 500$ gir $n \approx 22{,}3$, som ikke er et helt tall.<br><strong>Svar:</strong> a) 39 og 52 b) $y_n = n^2 + 3$ c) 403 er tall nummer 20. 500 er ikke med.`,
      ],
    ),
    o(
      "P6.31",
      3,
      "uten",
      `Følgen 2, 6, 14, 26, 42, … fortsetter på samme måte.${del("a")}Finn differansene og differansene mellom dem. Hva er de to neste tallene?${del("b")}Vis at formelen $y_n = 2n^2 - 2n + 2$ gir de fem første tallene.${del("c")}Lag differanser for følgen 1, 3, 9, 27, 81. Forklar hvorfor differansemetoden ikke gir en andregradsformel her.`,
      "Skriv differansene under følgen, og så differansene mellom dem på en ny linje.",
      [
        "<strong>a)</strong> Differansene er 4, 8, 12, 16, og de øker med 4. Neste differanser er 20 og 24, så neste tall er 62 og 86.",
        r`<strong>b)</strong> $n = 1$: $2 - 2 + 2 = 2$. $n = 2$: $8 - 4 + 2 = 6$. $n = 3$: $18 - 6 + 2 = 14$. $n = 4$: $32 - 8 + 2 = 26$. $n = 5$: $50 - 10 + 2 = 42$.`,
        "<strong>c)</strong> Differansene er 2, 6, 18, 54, og differansene mellom dem er 4, 12, 36. De blir aldri konstante, fordi følgen tredobles hver gang. Den er eksponentiell, $y_n = 3^{n-1}$.<br><strong>Svar:</strong> a) 62 og 86 c) Differansene blir aldri konstante.",
      ],
    ),
    o(
      "P6.32",
      3,
      "med",
      `${fig("P6.32", "Skisse av en tribune sett ovenfra: rad 1 nederst med 12 seter, rad 2 med 14 seter, rad 3 med 16 seter. Rad 4 antydet med prikker.")}En tribune har 12 seter på første rad. Hver ny rad har 2 seter mer enn raden foran.${del("a")}Skriv en formel for antall seter på rad nummer $n$.${del("b")}Bruk regneark til å finne hvor mange seter det er til sammen på 10 rader.${del("c")}Tribunen skal ha plass til minst 400 personer. Hvor mange rader trengs?`,
      "Lag én kolonne med seter på raden og én kolonne med summen så langt.",
      [
        r`<strong>a)</strong> $y_n = 2n + 10$`,
        "<strong>b)</strong> Radene har 12, 14, 16, 18, 20, 22, 24, 26, 28 og 30 seter. Summen er 210.",
        "<strong>c)</strong> Regnearket gir 390 seter med 15 rader og 432 seter med 16 rader.<br><strong>Svar:</strong> a) $y_n = 2n + 10$ b) 210 seter c) 16 rader",
      ],
    ),
  ],
};

// ───────────────────────────── 6E Mønstre i figurer ─────────────────────────────

const dkP6E: Delkapittel = {
  id: "P6E",
  tittel: "6E Mønstre i figurer",
  quiz: [
    q("Hva kalles tallene 1, 4, 9, 16, 25, …?", ["Trekanttall", "Kvadrattall", "Rektangeltall", "Oddetall"], 1, r`De er $1^2, 2^2, 3^2, 4^2, 5^2$.`, 1),
    q("Hva kalles tallene 1, 3, 6, 10, 15, …?", ["Trekanttall", "Kvadrattall", "Partall", "Rektangeltall"], 0, "Brikkene kan legges i trekanter med 1, 2, 3, … brikker i radene.", 1),
    q(r`Hva er trekanttall nummer 10 når $t_n = \dfrac{n(n + 1)}{2}$?`, ["100", "110", "45", "55"], 3, r`$\dfrac{10 \cdot 11}{2} = 55$`, 2),
    q("Figur 1 har 4 brikker, figur 2 har 7 og figur 3 har 10. Hvor mange brikker har figur $n$?", [r`$4n$`, r`$n + 3$`, r`$3n + 1$`, r`$n^2 + 3$`], 2, "Det kommer 3 nye brikker for hver figur, og figur 1 har 4. Da er formelen $3n + 1$.", 2),
    q("Hva er summen av de 30 første oddetallene?", ["900", "60", "450", "930"], 0, r`Summen av de $n$ første oddetallene er $n^2$, og $30^2 = 900$.`, 2),
    q(r`Er $n^2 + n + 17$ et primtall for alle positive heltall $n$?`, ["Ja, for det stemmer for $n = 1, 2$ og $3$", "Nei, $n = 16$ gir $289 = 17 \\cdot 17$", "Ja, fordi 17 er et primtall", "Nei, $n = 2$ gir et partall"], 1, r`Ett moteksempel er nok til å vise at påstanden er feil: $256 + 16 + 17 = 289 = 17^2$.`, 3),
  ],
  oppgaver: [
    o(
      "P6.33",
      1,
      "uten",
      `${fig("P6.33", "Tre figurer av like kvadratiske brikker formet som en L. Figur 1: 2 brikker loddrett + 1 til høyre for den nederste (3 brikker). Figur 2: 3 loddrett + 2 til høyre nederst (5 brikker). Figur 3: 4 loddrett + 3 til høyre nederst (7 brikker).")}Figurene er laget av like kvadratiske brikker.${del("a")}Hvor mange brikker har figur 4?${del("b")}Finn en formel for antall brikker $F_n$ i figur $n$.${del("c")}Hvor mange brikker har figur 10?${del("d")}Hvilken figur har 51 brikker?`,
      "Hvor mange nye brikker kommer det for hver ny figur?",
      [
        "<strong>a)</strong> Det kommer 2 nye brikker hver gang: 3, 5, 7, 9. Figur 4 har 9 brikker.",
        r`<strong>b)</strong> Figur $n$ har $n + 1$ brikker loddrett og $n$ brikker til høyre: $F_n = 2n + 1$.`,
        r`<strong>c)</strong> $F_{10} = 2 \cdot 10 + 1 = 21$`,
        r`<strong>d)</strong> $2n + 1 = 51$ gir $n = 25$<br><strong>Svar:</strong> a) 9 b) $F_n = 2n + 1$ c) 21 d) Figur 25`,
      ],
    ),
    o(
      "P6.34",
      1,
      "uten",
      `Hva kalles tallene i hver følge? Skriv også en formel for tall nummer $n$.${del("a")}2, 4, 6, 8, …${del("b")}1, 3, 5, 7, …${del("c")}1, 4, 9, 16, …${del("d")}2, 6, 12, 20, …${del("e")}1, 3, 6, 10, …`,
      "Tegn tallene som prikker i rader. Hvilken form får figurene?",
      [
        r`<strong>a)</strong> Partall, $p_n = 2n$`,
        r`<strong>b)</strong> Oddetall, $2n - 1$`,
        r`<strong>c)</strong> Kvadrattall, $k_n = n^2$`,
        r`<strong>d)</strong> Rektangeltall, $R_n = n(n + 1)$`,
        r`<strong>e)</strong> Trekanttall, $t_n = \dfrac{n(n + 1)}{2}$<br><strong>Svar:</strong> a) partall b) oddetall c) kvadrattall d) rektangeltall e) trekanttall`,
      ],
    ),
    o(
      "P6.35",
      2,
      "uten",
      r`Trekanttallene er gitt ved $t_n = \dfrac{n(n + 1)}{2}$.${del("a")}Finn $t_{10}$.${del("b")}Vis at 78 er et trekanttall. Hvilket nummer har det?${del("c")}Rektangeltallene er $R_n = n(n + 1)$. Forklar med en figur eller med formlene at et rektangeltall alltid er det dobbelte av et trekanttall.`,
      r`Prøv deg fram i b): Hvilket tall $n$ gir $n(n + 1) = 156$?`,
      [
        r`<strong>a)</strong> $t_{10} = \dfrac{10 \cdot 11}{2} = 55$`,
        r`<strong>b)</strong> $\dfrac{n(n + 1)}{2} = 78$ gir $n(n + 1) = 156 = 12 \cdot 13$, så $n = 12$.`,
        r`<strong>c)</strong> $R_n = n(n + 1) = 2 \cdot \dfrac{n(n + 1)}{2} = 2t_n$. To like trekanter av brikker kan settes sammen til et rektangel med $n$ rader og $n + 1$ brikker i hver rad.<br><strong>Svar:</strong> a) 55 b) Trekanttall nummer 12 c) $R_n = 2t_n$`,
      ],
    ),
    o(
      "P6.36",
      2,
      "uten",
      `${fig("P6.36", "Tre rektangler av like kvadratiske brikker. Figur 1: 1 rad med 4 brikker. Figur 2: 2 rader med 5 brikker. Figur 3: 3 rader med 6 brikker.")}Figur $n$ er et rektangel av brikker med $n$ rader og $n + 3$ brikker i hver rad.${del("a")}Hvor mange brikker har figur 1, 2, 3 og 6?${del("b")}Skriv en formel for antall brikker $B_n$.${del("c")}Hvilken figur har 130 brikker?`,
      r`I c) kan du prøve deg fram med $n(n + 3)$.`,
      [
        r`<strong>a)</strong> $1 \cdot 4 = 4$, $2 \cdot 5 = 10$, $3 \cdot 6 = 18$ og $6 \cdot 9 = 54$`,
        r`<strong>b)</strong> $B_n = n(n + 3)$`,
        r`<strong>c)</strong> $n(n + 3) = 130 = 10 \cdot 13$, så $n = 10$.<br><strong>Svar:</strong> a) 4, 10, 18 og 54 b) $B_n = n(n + 3)$ c) Figur 10`,
      ],
    ),
    o(
      "P6.37",
      2,
      "med",
      `${fig("P6.37", "Tre figurer av like kvadratiske brikker. Hver figur er et kvadrat på n · n brikker med én ekstra brikke som bare berører hvert av de fire hjørnene på skrå. Figur 1: 1 + 4 = 5, figur 2: 4 + 4 = 8, figur 3: 9 + 4 = 13 brikker.")}Figur $n$ består av et kvadrat med $n \\cdot n$ brikker og én ekstra brikke ved hvert hjørne.${del("a")}Lag en tabell over antall brikker i figur 1 til 5.${del("b")}Finn en formel for antall brikker $H_n$. Kontroller med regresjon i GeoGebra.${del("c")}Hvor mange brikker har figur 7? Hvilken figur har 229 brikker?`,
      "Tell brikkene i kvadratet og hjørnebrikkene hver for seg.",
      [
        "<strong>a)</strong> 5, 8, 13, 20, 29",
        r`<strong>b)</strong> $H_n = n^2 + 4$. Polynomregresjon av grad 2 gir det samme.`,
        r`<strong>c)</strong> $H_7 = 49 + 4 = 53$. $n^2 + 4 = 229$ gir $n^2 = 225$ og $n = 15$ (vi forkaster $-15$).<br><strong>Svar:</strong> a) 5, 8, 13, 20, 29 b) $H_n = n^2 + 4$ c) 53 brikker. Figur 15.`,
      ],
    ),
    o(
      "P6.38",
      3,
      "med",
      `${fig("P6.38", "Tre figurer av lys (prikker) formet som juletrær. Figur 1: 1 lys i trekanten + 1 lys i stammen. Figur 2: trekant med radene 1 og 2 + stamme på 2 lys under midten. Figur 3: trekant med radene 1, 2 og 3 + stamme på 3 lys.")}En lysdekorasjon er formet som et juletre. Figur $n$ har en trekant med $n$ rader (1, 2, …, $n$ lys i radene) og en stamme med $n$ lys.${del("a")}Hvor mange lys har figur 1, 2, 3 og 4?${del("b")}Vis at antall lys er $J_n = \\dfrac{n(n + 3)}{2}$.${del("c")}En figur har 135 lys. Hvilket figurnummer har den?`,
      r`Trekanten er et trekanttall $t_n$. Løs $J_n = 135$ i CAS eller med regneark.`,
      [
        "<strong>a)</strong> 1 + 1 = 2, 3 + 2 = 5, 6 + 3 = 9 og 10 + 4 = 14",
        r`<strong>b)</strong> $J_n = t_n + n = \dfrac{n(n + 1)}{2} + \dfrac{2n}{2} = \dfrac{n^2 + 3n}{2} = \dfrac{n(n + 3)}{2}$`,
        r`<strong>c)</strong> $\dfrac{n(n + 3)}{2} = 135$ gir $n^2 + 3n - 270 = 0$, altså $n = 15$ (vi forkaster $n = -18$). Kontroll: $\dfrac{15 \cdot 18}{2} = 135$.<br><strong>Svar:</strong> a) 2, 5, 9 og 14 c) Figur 15`,
      ],
    ),
    o(
      "P6.39",
      3,
      "uten",
      `${del("a")}Tenk på et positivt heltall. Gang det med 4, legg til 12, del på 4 og trekk fra tallet du tenkte på. Prøv med tre ulike tall. Hva legger du merke til?${del("b")}Bruk algebra til å vise at svaret alltid blir det samme. Kall tallet $n$.${del("c")}Jonas påstår at $n^2 + n + 11$ er et primtall for alle positive heltall $n$. Han har sjekket $n = 1$, 2 og 3. Vis at påstanden er feil.`,
      "Ett eksempel som ikke stemmer, er nok til å vise at en påstand er feil. I c) kan du prøve en verdi av $n$ som gjør at alle leddene har en felles faktor, for eksempel $n = 11$.",
      [
        r`<strong>a)</strong> For eksempel gir 5: $(20 + 12) : 4 - 5 = 3$. Svaret blir 3 hver gang.`,
        r`<strong>b)</strong> $\dfrac{4n + 12}{4} - n = n + 3 - n = 3$`,
        r`<strong>c)</strong> $n = 10$ gir $100 + 10 + 11 = 121 = 11 \cdot 11$, som ikke er et primtall.<br><strong>Svar:</strong> a) og b) Svaret blir alltid 3. c) $n = 10$ er et moteksempel.`,
      ],
    ),
    o(
      "P6.40",
      3,
      "med",
      `${fig("P6.40", "Kvadrat på 4 · 4 prikker delt i fire L-formede lag i to farger som veksler: 1 prikk i hjørnet, så 3, så 5, så 7 prikker.")}Figuren viser at $1 + 3 + 5 + 7 = 4^2$.${del("a")}Forklar med figuren at summen av de $n$ første oddetallene er $n^2$.${del("b")}Finn summen av de 25 første oddetallene.${del("c")}Summen av de $n$ første oddetallene er 1024. Hva er $n$, og hva er det største oddetallet i summen?`,
      r`Oddetall nummer $n$ er $2n - 1$.`,
      [
        r`<strong>a)</strong> Hvert nytt L-formet lag gjør kvadratet én prikk lengre på hver side. Etter $n$ lag har vi et kvadrat med $n \cdot n$ prikker.`,
        r`<strong>b)</strong> $25^2 = 625$`,
        r`<strong>c)</strong> $n^2 = 1024$ gir $n = 32$. Oddetall nummer 32 er $2 \cdot 32 - 1 = 63$.<br><strong>Svar:</strong> b) 625 c) $n = 32$, og det største oddetallet er 63.`,
      ],
    ),
  ],
};

// ───────────────────────────── Sammendrag ─────────────────────────────

const dkP6SM: Delkapittel = {
  id: "P6SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P6.S1",
      "6A Sette opp og bruke formler",
      r`En <strong>formel</strong> viser sammenhengen mellom størrelser med bokstaver og tall. Du kan sette inn verdier og regne ut, eller løse en likning for å finne en ukjent størrelse.<br><br>Eksempel: Et stearinlys er 24 cm og brenner ned 1,5 cm per time. $H = 24 - 1{,}5t$. Etter 6 timer er $H = 15$ cm.<br><br>Pass på enhetene, og tenk på gyldighetsområdet: Formelen gjelder bare til lyset har brent ned, $0 \le t \le 16$.`,
      "Sjekk enhetene før du setter inn.",
      [r`Sett inn: $H(6) = 24 - 9 = 15$. Løs: $24 - 1{,}5t = 0$ gir $t = 16$.`],
    ),
    s(
      "P6.S2",
      "6B Fast forhold: y = kx",
      r`$y$ er <strong>proporsjonal</strong> med $x$ når $\dfrac{y}{x} = k$ er konstant. Da er $y = kx$, og grafen er en rett linje gjennom origo.<br><br>En rett linje med et fast ledd, for eksempel $y = 150x + 300$, er <em>ikke</em> proporsjonal.<br><br>Test i en tabell: Regn ut $\dfrac{y}{x}$ for hver kolonne.`,
      "Dobbelt så mye av $x$ gir dobbelt så mye av $y$.",
      [r`Eksempel: 0,80 kr per side gir $y = 0{,}8x$.`],
    ),
    s(
      "P6.S3",
      "6C Fast produkt: y = k/x",
      r`$y$ er <strong>omvendt proporsjonal</strong> med $x$ når $x \cdot y = k$ er konstant. Da er $y = \dfrac{k}{x}$, og grafen er en kurve som nærmer seg aksene, men aldri treffer dem.<br><br>En fallende rett linje er <em>ikke</em> omvendt proporsjonal.<br><br>Når svaret må være et helt antall personer eller ting, må du tenke på om du skal runde opp eller ned.`,
      "Dobbelt så mye av $x$ gir halvparten av $y$.",
      [r`Eksempel: En gave til 1200 kr delt på $x$ elever gir $y = \dfrac{1200}{x}$.`],
    ),
    s(
      "P6.S4",
      "6D Tallfølger og regler",
      r`En <strong>tallfølge</strong> er tall i en bestemt rekkefølge. $y_n$ er tall nummer $n$.<ul><li>Legger du til samme tall hver gang, blir formelen $y_n = dn + b$, der $d$ er tallet du legger til hver gang, for eksempel $7n - 3$.</li><li>Ganger du med samme tall hver gang, blir formelen en potens, for eksempel $3^n$ eller $3^{n-1}$.</li><li>Øker differansene med samme tall hver gang, passer en andregradsformel. Den kan du finne med regresjon.</li></ul>Et tall er med i følgen hvis likningen $y_n = \text{tallet}$ gir et positivt heltall $n$.`,
      "Skriv differansene under følgen.",
      [r`Eksempel: 4, 11, 18, 25 gir $y_n = 7n - 3$. 158 er med, fordi $7n - 3 = 158$ gir $n = 23$.`],
    ),
    s(
      "P6.S5",
      "6E Mønstre i figurer",
      r`<strong>Figurtall</strong> er tall vi kan tegne som mønstre av prikker eller brikker.<br><br>${tab(["Navn", ["Partall", "Oddetall", "Kvadrattall", "Rektangeltall", "Trekanttall"]], ["Formel", [r`$2n$`, r`$2n - 1$`, r`$n^2$`, r`$n(n + 1)$`, r`$\dfrac{n(n + 1)}{2}$`]], ["Første tall", ["2, 4, 6", "1, 3, 5", "1, 4, 9", "2, 6, 12", "1, 3, 6"]])}<br>Tell hvor mange brikker som kommer til fra én figur til den neste. Et moteksempel er nok til å vise at en påstand er feil.`,
      "Lag en tabell med figurnummer og antall brikker.",
      [r`Eksempel: Summen av de $n$ første oddetallene er $n^2$.`],
    ),
  ],
};

// ───────────────────────────── Øveprøve ─────────────────────────────

const dkP6OP: Delkapittel = {
  id: "P6OP",
  tittel: "Øveprøve",
  quiz: [
    q(r`Hvilken formel gir en proporsjonal sammenheng?`, [r`$y = 2x + 1$`, r`$y = \dfrac{2}{x}$`, r`$y = x^2$`, r`$y = 2{,}5x$`], 3, r`Bare $y = 2{,}5x$ har formen $y = kx$.`, 1),
    q(r`I en tabell er $x \cdot y = 24$ for alle verdiene. Hva slags sammenheng er det?`, ["Proporsjonal", "Lineær med fast ledd", "Omvendt proporsjonal", "Eksponentiell"], 2, r`Konstant produkt betyr $y = \dfrac{24}{x}$.`, 1),
    q("Hva er tall nummer 50 i følgen 9, 13, 17, 21, …?", ["205", "200", "209", "201"], 0, r`$y_n = 4n + 5$, så $y_{50} = 205$.`, 2),
    q(r`Hvilken figur i mønsteret $n^2 + 2n$ har 168 brikker?`, ["Figur 13", "Figur 12", "Figur 14", "Figur 11"], 1, r`$12^2 + 2 \cdot 12 = 168$`, 3),
  ],
  oppgaver: [
    s(
      "P6.OP0",
      "Om øveprøven",
      "<strong>Kapittel 6 · Formler og mønstre</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–5), bruk kalkulator eller GeoGebra.<br>Hver del går fra lettere til vanskeligere oppgaver.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P6.OP1",
      1,
      "uten",
      `<strong>Del 1</strong><br><br>Det koster $K = 60t + 40$ kroner å leie en kajakk i $t$ timer.${del("a")}Hva betyr tallene 60 og 40?${del("b")}Hva koster det å leie kajakken i 3 timer?${del("c")}Emma betaler 400 kr. Hvor lenge leide hun kajakken?${del("d")}Er prisen proporsjonal med antall timer? Begrunn svaret.`,
      "Løs likningen $60t + 40 = 400$.",
      [
        "<strong>a)</strong> 60 kr er prisen per time. 40 kr er et fast beløp.",
        r`<strong>b)</strong> $K = 60 \cdot 3 + 40 = 220$`,
        r`<strong>c)</strong> $60t + 40 = 400$ gir $60t = 360$, altså $t = 6$.`,
        r`<strong>d)</strong> Nei. Det faste beløpet på 40 kr gjør at $\dfrac{K}{t}$ ikke er konstant.<br><strong>Svar:</strong> b) 220 kr c) 6 timer d) Nei`,
      ],
    ),
    o(
      "P6.OP2",
      2,
      "uten",
      `Avgjør om $y$ er proporsjonal eller omvendt proporsjonal med $x$, og skriv en formel for $y$.<br><br>Tabell A<br>${tab(["$x$", [3, 6, 9]], ["$y$", [4, 8, 12]])}<br>Tabell B<br>${tab(["$x$", [2, 3, 6]], ["$y$", [9, 6, 3]])}`,
      "Regn ut $\\dfrac{y}{x}$ og $x \\cdot y$.",
      [
        r`<strong>A:</strong> $\dfrac{y}{x} = \dfrac{4}{3}$ i alle kolonnene. Proporsjonal, $y = \dfrac{4}{3}x$.`,
        r`<strong>B:</strong> $x \cdot y = 18$ i alle kolonnene. Omvendt proporsjonal, $y = \dfrac{18}{x}$.<br><strong>Svar:</strong> A: $y = \dfrac{4}{3}x$ B: $y = \dfrac{18}{x}$`,
      ],
    ),
    o(
      "P6.OP3",
      3,
      "uten",
      `Følgen 7, 12, 17, 22, … fortsetter på samme måte.${del("a")}Finn en formel for $y_n$.${del("b")}Finn tall nummer 60.${del("c")}Er 302 med i følgen? Er 300 med?${del("d")}Er tallene i følgen proporsjonale med plassnummeret? Begrunn svaret.`,
      "Sammenlign med 5-gangen.",
      [
        r`<strong>a)</strong> Tallene øker med 5, og 5-gangen er 5, 10, 15. $y_n = 5n + 2$`,
        r`<strong>b)</strong> $y_{60} = 300 + 2 = 302$`,
        r`<strong>c)</strong> 302 er tall nummer 60. $5n + 2 = 300$ gir $5n = 298$, og 298 er ikke delelig med 5.`,
        r`<strong>d)</strong> Nei. Formelen har et fast ledd, 2.<br><strong>Svar:</strong> a) $y_n = 5n + 2$ b) 302 c) 302 er med, 300 er ikke med. d) Nei`,
      ],
    ),
    o(
      "P6.OP4",
      2,
      "kalk",
      `<strong>Del 2</strong><br><br>Elevrådet leier et lokale til skoleball for 8400 kr. Leien deles likt på alle som kommer.${del("a")}Skriv en formel for prisen per elev $P$ når $x$ elever kommer.${del("b")}Hva blir prisen hvis 120 elever kommer?${del("c")}Hvor mange elever må komme for at prisen skal bli høyst 150 kr?`,
      "Antall elever må være et helt tall.",
      [
        r`<strong>a)</strong> $P = \dfrac{8400}{x}$`,
        r`<strong>b)</strong> $\dfrac{8400}{120} = 70$`,
        r`<strong>c)</strong> $\dfrac{8400}{x} \le 150$ gir $x \ge 56$.<br><strong>Svar:</strong> a) $P = \dfrac{8400}{x}$ b) 70 kr c) Minst 56 elever`,
      ],
    ),
    o(
      "P6.OP5",
      3,
      "med",
      `${fig("P6.OP5", "Fire figurer av like kvadratiske brikker: et rektangel med n rader og n + 1 brikker i hver rad, pluss 2 løse brikker til høyre. Figur 1: 2 + 2 = 4, figur 2: 6 + 2 = 8, figur 3: 12 + 2 = 14, figur 4: 20 + 2 = 22 brikker.")}Antall brikker i figurene er 4, 8, 14, 22, 32, …${del("a")}Bruk regresjon i GeoGebra til å finne en formel for antall brikker $B_n$ i figur $n$.${del("b")}Hvilken figur har 422 brikker?${del("c")}Du har 750 brikker. Hva er den største figuren du kan lage?`,
      "Lag en tabell med $n$ og antall brikker, og bruk polynomregresjon av grad 2.",
      [
        r`<strong>a)</strong> $B_n = n^2 + n + 2$`,
        r`<strong>b)</strong> $n^2 + n + 2 = 422$ gir $n = 20$ (vi forkaster $n = -21$).`,
        r`<strong>c)</strong> $n^2 + n + 2 = 750$ gir $n \approx 26{,}9$. Figur 26 har $26^2 + 26 + 2 = 704$ brikker, og figur 27 trenger $27^2 + 27 + 2 = 758$ brikker. Det er for mange.<br><strong>Svar:</strong> a) $B_n = n^2 + n + 2$ b) Figur 20 c) Figur 26`,
      ],
    ),
  ],
};

export const KAP6_1P: Kapittel = {
  id: "p1kap6",
  tittel: "Kapittel 6 Formler og mønstre",
  delkapitler: [dkP6A, dkP6B, dkP6C, dkP6D, dkP6E, dkP6SM, dkP6OP],
};
