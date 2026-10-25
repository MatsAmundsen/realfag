/**
 * 1P Kapittel 3 – Prosent og vekst
 * Kilde: /workspace/1p-bibliotek/kap3-analyse.md (struktur og kompetansemål).
 * MERK: Forklarings- og oppgavetekstene er IKKE godkjent (ingen godkjent tekstark for kap 1–3).
 * Alle kontekster og tall er egne. Fasit sjekkes av verify_p1kap3.py.
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

// ───────────────────────────── 3A Andeler i prosent, promille og prosentpoeng ─────────────────────────────

const dkP3A: Delkapittel = {
  id: "P3A",
  tittel: "3A Andeler i prosent, promille og prosentpoeng",
  quiz: [
    q("Hvordan skriver du 6,5 % som desimaltall?", ["0,65", "0,065", "6,5", "0,0065"], 1, "Prosent betyr hundredeler: $6{,}5 : 100 = 0{,}065$.", 1),
    q(r`Hvor mange prosent er $\dfrac{3}{4}$?`, ["34 %", "0,75 %", "75 %", "43 %"], 2, r`$\dfrac{3}{4} = 0{,}75 = 75$ %`, 1),
    q("Hva er 30 % av 50?", ["15", "20", "1,5", "35"], 0, "$0{,}3 \\cdot 50 = 15$", 1),
    q("6 er 30 % av et tall. Hvilket tall?", ["1,8", "18", "180", "20"], 3, "$6 : 0{,}3 = 20$", 2),
    q("Hvordan skriver du 5 ‰ som desimaltall?", ["0,05", "0,5", "0,005", "5,0"], 2, "Promille betyr tusendeler: $5 : 1000 = 0{,}005$.", 2),
    q("Andelen steg fra 20 % til 30 %. Hvor mange prosent økte andelen med?", ["10 %", "50 %", "33 %", "150 %"], 1, "Endringen er 10 prosentpoeng. $\\dfrac{10}{20} = 0{,}5 = 50$ %.", 3),
  ],
  oppgaver: [
    o(
      "P3.1",
      1,
      "uten",
      r`Skriv som desimaltall.${del("a")}7 %${del("b")}42 %${del("c")}4,5 %${del("d")}160 %${del("e")}0,8 %<br><br>Skriv i prosent.${del("f")}0,09${del("g")}0,375${del("h")}2,1`,
      "Prosent betyr hundredeler. Fra prosent til desimaltall: del med 100. Motsatt vei: gang med 100.",
      [
        r`<strong>a)</strong> 0,07 <strong>b)</strong> 0,42 <strong>c)</strong> 0,045 <strong>d)</strong> 1,6 <strong>e)</strong> 0,008`,
        r`<strong>f)</strong> 9 % <strong>g)</strong> 37,5 % <strong>h)</strong> 210 %<br><strong>Svar:</strong> se over`,
      ],
    ),
    o(
      "P3.2",
      1,
      "uten",
      r`Skriv brøkene i prosent.${del("a")}$\dfrac{3}{5}$${del("b")}$\dfrac{7}{20}$${del("c")}$\dfrac{9}{25}$${del("d")}$\dfrac{3}{8}$${del("e")}$\dfrac{2}{3}$ (rund av til én desimal)`,
      "Utvid brøken så nevneren blir 100, eller del telleren på nevneren.",
      [
        r`<strong>a)</strong> $\dfrac{60}{100} = 60$ % <strong>b)</strong> $\dfrac{35}{100} = 35$ % <strong>c)</strong> $\dfrac{36}{100} = 36$ %`,
        r`<strong>d)</strong> $3 : 8 = 0{,}375 = 37{,}5$ % <strong>e)</strong> $2 : 3 \approx 0{,}667 \approx 66{,}7$ %<br><strong>Svar:</strong> a) 60 % b) 35 % c) 36 % d) 37,5 % e) 66,7 %`,
      ],
    ),
    o(
      "P3.3",
      1,
      "uten",
      r`${tenkt}Et kor har 40 medlemmer. 14 av dem synger bass.${del("a")}Hvor stor andel synger bass? Svar i prosent.${del("b")}Hvor mange prosent synger ikke bass?`,
      "Andel = del : hele.",
      [
        r`<strong>a)</strong> $\dfrac{14}{40} = 0{,}35 = 35$ %`,
        r`<strong>b)</strong> $100 \% - 35 \% = 65$ %<br><strong>Svar:</strong> a) 35 % b) 65 %`,
      ],
    ),
    o(
      "P3.4",
      2,
      "uten",
      r`Regn ut uten kalkulator.${del("a")}30 % av 130${del("b")}25 % av 80${del("c")}45 % av 120${del("d")}Forklar hvorfor 8 % av 50 er det samme som 50 % av 8.`,
      "10 % er en tidel. 25 % er en firedel. 5 % er halvparten av 10 %.",
      [
        r`<strong>a)</strong> 10 % er 13, så 30 % er 39. <strong>b)</strong> $80 : 4 = 20$`,
        r`<strong>c)</strong> 10 % er 12. $4 \cdot 12 + 6 = 54$`,
        r`<strong>d)</strong> $0{,}08 \cdot 50 = 4$ og $0{,}5 \cdot 8 = 4$. Begge er $\dfrac{8 \cdot 50}{100}$.<br><strong>Svar:</strong> a) 39 b) 20 c) 54 d) begge er 4`,
      ],
    ),
    o(
      "P3.5",
      2,
      "uten",
      r`${tenkt}På et trinn kom 18 elever med buss. Det er 15 % av alle elevene på trinnet. Hvor mange elever er det på trinnet?`,
      "Hvis 15 % er 18, hvor mye er da 5 %? Og 100 %?",
      [
        r`5 % er $18 : 3 = 6$. Da er 100 % lik $6 \cdot 20 = 120$.`,
        r`Med formel: $18 : 0{,}15 = 120$.<br><strong>Svar:</strong> 120 elever`,
      ],
    ),
    o(
      "P3.6",
      2,
      "uten",
      r`${fig("P3.6", "Stolpediagram med tre stolper: «Andel som sykler til skolen» i 2022 (32 %), 2023 (40 %) og 2024 (34 %). Andreaksen fra 0 til 50 %.")}${tenkt}Diagrammet viser hvor stor andel av elevene på en skole som syklet til skolen. Andelen var 32 % i 2022, 40 % i 2023 og 34 % i 2024.${del("a")}Hvor mange prosentpoeng økte andelen fra 2022 til 2023?${del("b")}Hvor mange prosent økte andelen fra 2022 til 2023?${del("c")}Hvor mange prosent endret andelen seg fra 2023 til 2024?`,
      "Prosentpoeng er differansen mellom to prosenttall. Prosentvis endring = endring : startverdi.",
      [
        r`<strong>a)</strong> $40 - 32 = 8$ prosentpoeng`,
        r`<strong>b)</strong> $\dfrac{8}{32} = 0{,}25 = 25$ %`,
        r`<strong>c)</strong> $\dfrac{34 - 40}{40} = \dfrac{-6}{40} = -0{,}15$, altså en nedgang på 15 %.<br><strong>Svar:</strong> a) 8 prosentpoeng b) 25 % c) $-15$ %`,
      ],
    ),
    o(
      "P3.7",
      2,
      "uten",
      r`Promille (‰) betyr tusendeler.${del("a")}Skriv 4 ‰ som desimaltall.${del("b")}Skriv 0,7 % i promille.${del("c")}Sjøvann kan inneholde 6 g salt per kilogram vann. Hvor mange promille er det?${del("d")}Gull merket 18 karat inneholder 750 ‰ gull. Hvor mange gram gull er det i en ring på 12 g?`,
      "1 % = 10 ‰. Promille av noe: gang med tallet og del med 1000.",
      [
        r`<strong>a)</strong> 0,004 <strong>b)</strong> 7 ‰`,
        r`<strong>c)</strong> $\dfrac{6}{1000} = 6$ ‰`,
        r`<strong>d)</strong> $12 \cdot 0{,}750 = 9$ g<br><strong>Svar:</strong> a) 0,004 b) 7 ‰ c) 6 ‰ d) 9 g`,
      ],
    ),
    o(
      "P3.8",
      3,
      "uten",
      r`${tenkt}I en idrettsklubb er det 45 medlemmer. 20 % spiller håndball. Det kommer 5 nye medlemmer, og alle spiller håndball. Hvor stor andel av medlemmene spiller håndball nå?`,
      "Finn antallet først. Husk at også det totale antallet medlemmer har endret seg.",
      [
        r`Håndballspillere før: $\dfrac{1}{5} \cdot 45 = 9$. Nå: $9 + 5 = 14$.`,
        r`Medlemmer nå: $45 + 5 = 50$. Andelen er $\dfrac{14}{50} = \dfrac{28}{100} = 28$ %.<br><strong>Svar:</strong> 28 %`,
      ],
    ),
  ],
};

// ───────────────────────────── 3B Vekstfaktor ─────────────────────────────

const dkP3B: Delkapittel = {
  id: "P3B",
  tittel: "3B Vekstfaktor",
  quiz: [
    q("Hva er vekstfaktoren når noe synker med 12 %?", ["0,12", "1,12", "0,88", "−0,12"], 2, "$1 - 0{,}12 = 0{,}88$", 1),
    q("Vekstfaktoren er 1,35. Hva betyr det?", ["Verdien øker med 35 %", "Verdien synker med 35 %", "Verdien øker med 135 %", "Verdien øker med 1,35 %"], 0, "$1{,}35 = 1 + 0{,}35$, altså en økning på 35 %.", 1),
    q("En vare koster 500 kr og øker med 6 %. Hva er ny pris?", ["506 kr", "530 kr", "560 kr", "470 kr"], 1, "$500 \\cdot 1{,}06 = 530$", 2),
    q("Etter en økning på 20 % er prisen 600 kr. Hva var prisen før?", ["480 kr", "720 kr", "580 kr", "500 kr"], 3, "$600 : 1{,}2 = 500$", 2),
    q("En verdi går fra 80 til 60. Hva er den prosentvise endringen?", ["−20 %", "−33 %", "−25 %", "+25 %"], 2, "$60 : 80 = 0{,}75$, altså en nedgang på 25 %.", 2),
    q("En pris settes ned 10 % og deretter opp 10 %. Hva skjer?", ["Prisen blir som før", "Prisen blir 1 % lavere enn før", "Prisen blir 1 % høyere enn før", "Prisen blir 10 % lavere"], 1, "$0{,}9 \\cdot 1{,}1 = 0{,}99$, altså 1 % lavere enn før.", 3),
  ],
  oppgaver: [
    o(
      "P3.9",
      1,
      "uten",
      r`Finn vekstfaktoren.${del("a")}Økning på 8 %${del("b")}Økning på 40 %${del("c")}Økning på 2,5 %${del("d")}Nedgang på 15 %${del("e")}Nedgang på 60 %${del("f")}Nedgang på 0,5 %${del("g")}Verdien blir doblet`,
      "Økning: 1 + p/100. Nedgang: 1 − p/100.",
      [
        r`<strong>a)</strong> 1,08 <strong>b)</strong> 1,4 <strong>c)</strong> 1,025 <strong>d)</strong> 0,85`,
        r`<strong>e)</strong> 0,4 <strong>f)</strong> 0,995 <strong>g)</strong> 2<br><strong>Svar:</strong> se over`,
      ],
    ),
    o(
      "P3.10",
      1,
      "kalk",
      r`Bruk vekstfaktor.${del("a")}Et sykkelstativ koster 700 kr. Prisen øker med 20 %. Hva blir ny pris?${del("b")}En jakke koster 270 kr og settes ned med 30 %. Hva blir ny pris?${del("c")}En plante er 40 cm høy og vokser 15 %. Hvor høy blir den?`,
      "Ny verdi = gammel verdi · vekstfaktor.",
      [
        r`<strong>a)</strong> $700 \cdot 1{,}2 = 840$ kr <strong>b)</strong> $270 \cdot 0{,}7 = 189$ kr`,
        r`<strong>c)</strong> $40 \cdot 1{,}15 = 46$ cm<br><strong>Svar:</strong> a) 840 kr b) 189 kr c) 46 cm`,
      ],
    ),
    o(
      "P3.11",
      2,
      "kalk",
      r`${del("a")}Etter en økning på 25 % er prisen 1000 kr. Hva var prisen før?${del("b")}Etter en rabatt på 40 % betaler du 72 kr. Hva var full pris?`,
      "Gammel verdi = ny verdi : vekstfaktor.",
      [
        r`<strong>a)</strong> $1000 : 1{,}25 = 800$ kr`,
        r`<strong>b)</strong> $72 : 0{,}6 = 120$ kr<br><strong>Svar:</strong> a) 800 kr b) 120 kr`,
      ],
    ),
    o(
      "P3.12",
      2,
      "kalk",
      r`Finn den prosentvise endringen.${del("a")}Antall besøkende øker fra 2400 til 2760.${del("b")}Prisen på en mobil synker fra 5000 kr til 4300 kr.`,
      "Vekstfaktor = ny verdi : gammel verdi.",
      [
        r`<strong>a)</strong> $2760 : 2400 = 1{,}15$, en økning på 15 %.`,
        r`<strong>b)</strong> $4300 : 5000 = 0{,}86$, en nedgang på 14 %.<br><strong>Svar:</strong> a) 15 % økning b) 14 % nedgang`,
      ],
    ),
    o(
      "P3.13",
      2,
      "kalk",
      r`${tenkt}En vare koster 260 kr. Prisen øker først med 30 %, og deretter settes den ned med 20 %. Hvilken pris er riktig til slutt?<br><br>A: 286 kr &nbsp; B: 260 kr &nbsp; C: 270,40 kr &nbsp; D: 312 kr`,
      "Gang med begge vekstfaktorene etter hverandre.",
      [
        r`$260 \cdot 1{,}3 \cdot 0{,}8 = 270{,}40$`,
        r`<strong>Svar:</strong> C: 270,40 kr`,
      ],
    ),
    o(
      "P3.14",
      2,
      "kalk",
      r`${tenkt}En regning for en sykkelservice er på 1500 kr. Da er 25 % merverdiavgift (mva.) lagt til. Hva var prisen uten mva.? Hvor mye utgjør mva.?`,
      "Pris med mva. = pris uten mva. · 1,25.",
      [
        r`$1500 : 1{,}25 = 1200$ kr. Mva. er $1500 - 1200 = 300$ kr.`,
        r`<strong>Svar:</strong> 1200 kr uten mva. og 300 kr i mva.`,
      ],
    ),
    o(
      "P3.15",
      3,
      "kalk",
      r`${tenkt}En brukt elsparkesykkel koster 8000 kr. Butikken setter ned prisen med 25 %. Senere setter de prisen opp igjen med 20 %.${del("a")}Hva er prisen til slutt?${del("b")}Hvor mange prosent har prisen endret seg i alt?${del("c")}Hvor mange prosent måtte prisen ha økt med etter rabatten for å komme tilbake til 8000 kr?`,
      "Samlet vekstfaktor = 0,75 · 1,2.",
      [
        r`<strong>a)</strong> $8000 \cdot 0{,}75 \cdot 1{,}2 = 7200$ kr`,
        r`<strong>b)</strong> $0{,}75 \cdot 1{,}2 = 0{,}9$, altså en nedgang på 10 %.`,
        r`<strong>c)</strong> Etter rabatten: 6000 kr. $8000 : 6000 \approx 1{,}333$, altså en økning på omtrent 33,3 %.<br><strong>Svar:</strong> a) 7200 kr b) 10 % nedgang c) omtrent 33,3 %`,
      ],
    ),
    o(
      "P3.16",
      3,
      "kalk",
      r`${tenkt}Når epler tørkes, forsvinner 80 % av vekten. Hvor mange kilogram ferske epler trenger du for å få 300 g tørkede epler?`,
      "Vekstfaktoren er 0,2. Du kjenner den nye verdien.",
      [
        r`$300 : 0{,}2 = 1500$ g`,
        r`<strong>Svar:</strong> 1,5 kg`,
      ],
    ),
  ],
};

// ───────────────────────────── 3C Prosentvis vekst over tid ─────────────────────────────

const dkP3C: Delkapittel = {
  id: "P3C",
  tittel: "3C Prosentvis endring over flere perioder",
  quiz: [
    q("Du setter inn 1000 kr til 5 % rente i 2 år. Hvor mye har du da?", ["1100,00 kr", "1102,50 kr", "1105,00 kr", "1010,00 kr"], 1, "$1000 \\cdot 1{,}05^2 = 1102{,}50$", 1),
    q("En verdi på 5000 synker med 8 % per år. Hvilket uttrykk gir verdien etter t år?", [r`$5000 \cdot 0{,}92^t$`, r`$5000 \cdot 1{,}08^t$`, r`$5000 - 0{,}08t$`, r`$5000 \cdot 0{,}08^t$`], 0, "Vekstfaktoren for 8 % nedgang er 0,92.", 1),
    q(r`Hvor stor andel er igjen etter to halveringer?`, ["0,0", "0,5", "0,75", "0,25"], 3, r`$0{,}5 \cdot 0{,}5 = 0{,}25$`, 2),
    q("En sum vokser med samme prosent hvert år. Hva er sant?", ["Den vokser like mye hvert år", "Den vokser mindre for hvert år", "Den vokser med flere kroner hvert år", "Den dobles hvert år"], 2, "Prosenten tas av et stadig større beløp, så økningen i kroner blir større hvert år.", 2),
    q("En verdi øker med 5 % to år på rad. Hvor mange prosent har den økt i alt?", ["10 %", "5,25 %", "25 %", "10,25 %"], 3, "$1{,}05^2 = 1{,}1025$, altså 10,25 %.", 2),
    q("Hva gir størst sluttverdi?", ["4 % økning i 6 perioder", "6 % økning i 4 perioder", "5 % økning i 4 perioder", "24 % økning én gang"], 0, r`$1{,}04^6 \approx 1{,}265$, $1{,}06^4 \approx 1{,}262$, $1{,}05^4 \approx 1{,}216$ og $1{,}24$.`, 3),
  ],
  oppgaver: [
    o(
      "P3.17",
      1,
      "kalk",
      r`${tenkt}Du setter inn 20 000 kr på en konto med 3 % rente per år.${del("a")}Hvor mye står på kontoen etter 1 år?${del("b")}Hvor mye står på kontoen etter 2 år?${del("c")}Hvorfor økte beløpet mer det andre året enn det første?`,
      "Rente på rente: ganger med 1,03 for hvert år.",
      [
        r`<strong>a)</strong> $20\,000 \cdot 1{,}03 = 20\,600$ kr`,
        r`<strong>b)</strong> $20\,000 \cdot 1{,}03^2 = 21\,218$ kr`,
        r`<strong>c)</strong> Første år: 600 kr. Andre år: 618 kr. Renten regnes av et større beløp.<br><strong>Svar:</strong> a) 20 600 kr b) 21 218 kr`,
      ],
    ),
    o(
      "P3.18",
      2,
      "kalk",
      r`${tenkt}En ny bil koster 280 000 kr. Verdien synker med 15 % hvert år. Hva er bilen verdt etter 4 år?`,
      "Vekstfaktoren er 0,85. Bruk eksponenten 4.",
      [
        r`$280\,000 \cdot 0{,}85^4 \approx 146\,162$`,
        r`<strong>Svar:</strong> omtrent 146 000 kr`,
      ],
    ),
    o(
      "P3.19",
      2,
      "kalk",
      r`${tenkt}En bygd har 3200 innbyggere. Folketallet øker med 1,5 % per år. Hvor mange innbyggere er det etter 10 år, hvis veksten holder seg?`,
      "Vekstfaktoren er 1,015.",
      [
        r`$3200 \cdot 1{,}015^{10} \approx 3713{,}7$`,
        r`<strong>Svar:</strong> omtrent 3714 innbyggere`,
      ],
    ),
    o(
      "P3.20",
      2,
      "uten",
      r`${tenkt}I et forsøk er det 50 bakterier. Antallet dobles hver time. Hvor mange bakterier er det etter 6 timer?`,
      "Dobling betyr vekstfaktor 2.",
      [
        r`$50 \cdot 2^6 = 50 \cdot 64 = 3200$`,
        r`<strong>Svar:</strong> 3200 bakterier`,
      ],
    ),
    o(
      "P3.21",
      3,
      "med",
      r`${tenkt}En pasient får 400 mg av et legemiddel. Mengden i kroppen synker med 20 % hver time.${del("a")}Hvor mye er igjen etter 3 timer?${del("b")}Lag et regneark eller bruk CAS. Etter hvor mange hele timer er det for første gang mindre enn 100 mg igjen?`,
      r`Mengden etter $t$ timer er $400 \cdot 0{,}8^t$.`,
      [
        r`<strong>a)</strong> $400 \cdot 0{,}8^3 = 204{,}8$ mg`,
        r`<strong>b)</strong> Etter 6 timer: $400 \cdot 0{,}8^6 \approx 104{,}9$ mg. Etter 7 timer: $400 \cdot 0{,}8^7 \approx 83{,}9$ mg. CAS: $400 \cdot 0{,}8^t = 100$ gir $t \approx 6{,}2$.<br><strong>Svar:</strong> a) 204,8 mg b) etter 7 hele timer`,
      ],
    ),
    o(
      "P3.22",
      3,
      "med",
      r`${tenkt}Ali setter inn 10 000 kr med 4 % rente per år. Bea setter inn 12 000 kr med 2 % rente per år.${del("a")}Skriv et uttrykk for beløpet til hver av dem etter $t$ år.${del("b")}Bruk regneark eller CAS. Etter hvor mange hele år har Ali for første gang mer enn Bea?`,
      "Løs likningen 10 000 · 1,04^t = 12 000 · 1,02^t i CAS, eller lag en tabell.",
      [
        r`<strong>a)</strong> Ali: $10\,000 \cdot 1{,}04^t$. Bea: $12\,000 \cdot 1{,}02^t$.`,
        r`<strong>b)</strong> CAS gir $t \approx 9{,}39$. Etter 9 år: Ali 14 233 kr og Bea 14 341 kr. Etter 10 år: Ali 14 802 kr og Bea 14 628 kr.<br><strong>Svar:</strong> etter 10 år`,
      ],
    ),
    o(
      "P3.23",
      3,
      "uten",
      r`${tenkt}En verdi øker med samme prosent to år på rad. Til sammen har den økt med 21 %. Hvor mange prosent økte den hvert år?`,
      r`Hvis vekstfaktoren hvert år er $V$, er $V^2 = 1{,}21$.`,
      [
        r`$V^2 = 1{,}21$ gir $V = 1{,}1$, fordi $1{,}1 \cdot 1{,}1 = 1{,}21$.`,
        r`<strong>Svar:</strong> 10 % hvert år`,
      ],
    ),
  ],
};

// ───────────────────────────── Sammendrag ─────────────────────────────

const dkP3SM: Delkapittel = {
  id: "P3SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P3.S1",
      "3A Andeler i prosent, promille og prosentpoeng",
      r`<ul><li>Prosent betyr hundredeler: $7 \% = 0{,}07$. Promille betyr tusendeler: $4 ‰ = 0{,}004$.</li><li>Andel $= \dfrac{\text{del}}{\text{hele}}$</li><li>Prosentvis endring $= \dfrac{\text{endring}}{\text{startverdi}}$</li><li>Prosentpoeng er differansen mellom to prosenttall.</li></ul>`,
      "Prosentpoeng og prosent er ikke det samme.",
      [r`Eksempel: fra 32 % til 40 % er 8 prosentpoeng, men en økning på 25 %.`],
    ),
    s(
      "P3.S2",
      "3B Vekstfaktor",
      r`<ul><li>Økning på $p$ %: $V = 1 + \dfrac{p}{100}$. Nedgang på $p$ %: $V = 1 - \dfrac{p}{100}$.</li><li>Ny verdi $=$ gammel verdi $\cdot V$</li><li>Gammel verdi $=$ ny verdi $: V$</li><li>$V =$ ny verdi $:$ gammel verdi</li><li>Flere endringer etter hverandre: gang vekstfaktorene.</li></ul>`,
      "−10 % og deretter +10 % gir ikke tilbake det du startet med.",
      [r`Eksempel: $0{,}9 \cdot 1{,}1 = 0{,}99$, altså 1 % lavere enn før.`],
    ),
    s(
      "P3.S3",
      "3C Prosentvis endring over flere perioder",
      r`Med samme prosentvise endring i hver periode er verdien etter $t$ perioder<br><br>$\text{startverdi} \cdot V^t$<br><br>Bruk regneark eller CAS når du skal finne hvor lang tid det tar.`,
      "Økningen i kroner blir større for hver periode når V > 1.",
      [r`Eksempel: $20\,000 \cdot 1{,}03^2 = 21\,218$`],
    ),
  ],
};

// ───────────────────────────── Øveprøve ─────────────────────────────

const dkP3OP: Delkapittel = {
  id: "P3OP",
  tittel: "Øveprøve",
  quiz: [
    q(r`Hvor mange prosent er $\dfrac{3}{20}$?`, ["15 %", "3,2 %", "6,7 %", "20 %"], 0, r`$\dfrac{3}{20} = \dfrac{15}{100}$`, 1),
    q("Hva er vekstfaktoren for en økning på 7 %?", ["0,07", "0,93", "1,07", "1,7"], 2, "$1 + 0{,}07 = 1{,}07$", 1),
    q("En andel går fra 40 % til 50 %. Hva er riktig?", ["10 % økning", "25 prosentpoeng", "10 prosentpoeng og 20 % økning", "10 prosentpoeng og 25 % økning"], 3, r`$50 - 40 = 10$ prosentpoeng og $\dfrac{10}{40} = 25$ %.`, 2),
    q("Hva er 2000 kr etter to år med 10 % nedgang per år?", ["1600 kr", "1620 kr", "1800 kr", "1458 kr"], 1, "$2000 \\cdot 0{,}9^2 = 1620$", 2),
  ],
  oppgaver: [
    s(
      "P3.OP0",
      "Om øveprøven",
      "<strong>Kapittel 3 · Prosent og vekst</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–5), bruk kalkulator, regneark eller CAS.<br>Hver del går fra lettere til vanskeligere oppgaver.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P3.OP1",
      1,
      "uten",
      r`<strong>Del 1</strong>${del("a")}Hva er 15 % av 180?${del("b")}Hvor mange prosent er 12 av 48?${del("c")}Skriv 65 % som desimaltall.`,
      "10 % av 180 er 18.",
      [
        r`<strong>a)</strong> $18 + 9 = 27$ <strong>b)</strong> $\dfrac{12}{48} = \dfrac{1}{4} = 25$ %`,
        r`<strong>c)</strong> 0,65<br><strong>Svar:</strong> a) 27 b) 25 % c) 0,65`,
      ],
    ),
    o(
      "P3.OP2",
      2,
      "uten",
      r`${del("a")}En lampe koster 450 kr. Den settes ned med 20 %. Hva blir ny pris?${del("b")}Etter en økning på 10 % koster en billett 440 kr. Hva kostet den før?`,
      "Bruk vekstfaktor.",
      [
        r`<strong>a)</strong> $450 \cdot 0{,}8 = 360$ kr`,
        r`<strong>b)</strong> $440 : 1{,}1 = 400$ kr<br><strong>Svar:</strong> a) 360 kr b) 400 kr`,
      ],
    ),
    o(
      "P3.OP3",
      3,
      "uten",
      r`${del("a")}Andelen elever som går til skolen, gikk fra 15 % til 18 %. Hvor mange prosentpoeng og hvor mange prosent økte andelen?${del("b")}Mia sier: «Når noe øker med 30 % to år på rad, øker det med 60 % i alt.» Har hun rett?`,
      "a) Prosentpoeng er differansen. b) Gang vekstfaktorene.",
      [
        r`<strong>a)</strong> 3 prosentpoeng. $\dfrac{3}{15} = 0{,}2 = 20$ %`,
        r`<strong>b)</strong> $1{,}3^2 = 1{,}69$, altså 69 %.<br><strong>Svar:</strong> a) 3 prosentpoeng og 20 % b) Nei, økningen blir 69 %.`,
      ],
    ),
    o(
      "P3.OP4",
      2,
      "kalk",
      r`<strong>Del 2</strong><br><br>${tenkt}En familie brukte 16 000 kWh strøm i fjor og 13 600 kWh i år.${del("a")}Finn vekstfaktoren og den prosentvise endringen.${del("b")}Hvor mye strøm bruker de neste år, hvis endringen blir den samme?`,
      "V = ny verdi : gammel verdi.",
      [
        r`<strong>a)</strong> $13\,600 : 16\,000 = 0{,}85$, en nedgang på 15 %.`,
        r`<strong>b)</strong> $13\,600 \cdot 0{,}85 = 11\,560$ kWh<br><strong>Svar:</strong> a) 0,85 og −15 % b) 11 560 kWh`,
      ],
    ),
    o(
      "P3.OP5",
      3,
      "med",
      r`${tenkt}En leilighet er verdt 1 800 000 kr. Verdien øker med 4,5 % per år.${del("a")}Skriv et uttrykk for verdien etter $t$ år.${del("b")}Hva er leiligheten verdt etter 8 år?${del("c")}Bruk regneark eller CAS. I hvilket år passerer verdien 3 000 000 kr?`,
      "Løs 1 800 000 · 1,045^t = 3 000 000 i CAS.",
      [
        r`<strong>a)</strong> $1\,800\,000 \cdot 1{,}045^t$`,
        r`<strong>b)</strong> $1\,800\,000 \cdot 1{,}045^8 \approx 2\,559\,800$ kr`,
        r`<strong>c)</strong> CAS gir $t \approx 11{,}6$. Etter 11 år: omtrent 2 921 000 kr. Etter 12 år: omtrent 3 050 000 kr.<br><strong>Svar:</strong> b) omtrent 2 560 000 kr c) i løpet av år 12`,
      ],
    ),
  ],
};

export const KAP3_1P: Kapittel = {
  id: "p1kap3",
  tittel: "Kapittel 3 Prosent og vekst",
  delkapitler: [dkP3A, dkP3B, dkP3C, dkP3SM, dkP3OP],
};
