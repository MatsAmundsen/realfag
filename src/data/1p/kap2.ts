/**
 * 1P Kapittel 2 – Enheter og omgjøring
 * Kilde: /workspace/1p-bibliotek/kap2-analyse.md (struktur og kompetansemål).
 * MERK: Forklarings- og oppgavetekstene er IKKE godkjent (ingen godkjent tekstark for kap 1–3).
 * Alle kontekster og tall er egne. Fasit sjekkes av verify_p1kap2.py.
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

/** Tabell: hver rad er [overskrift, verdier]. */
function tab(...rader: [string, (string | number)[]][]): string {
  return (
    "<table>" +
    rader.map(([h, v]) => `<tr><th>${h}</th>${v.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("") +
    "</table>"
  );
}

const del = (b: string) => `<br><br><strong>${b})</strong> `;
const tenkt = "<em>Tallene er laget for oppgaven.</em><br><br>";

// ───────────────────────────── 2A Enhetsprefikser fra nano til giga ─────────────────────────────

const dkP2A: Delkapittel = {
  id: "P2A",
  tittel: "2A Enhetsprefikser fra nano til giga",
  quiz: [
    q("Hva betyr prefikset mikro (μ)?", [r`$10^{-3}$`, r`$10^{-9}$`, r`$10^{-6}$`, r`$10^{6}$`], 2, r`Mikro betyr en milliondel, $10^{-6}$.`, 1),
    q("Hvor mange gram er 4,5 kg?", ["450 g", "0,0045 g", "45 000 g", "4500 g"], 3, "Kilo betyr 1000. $4{,}5 \\cdot 1000 = 4500$", 1),
    q("Hvor mange MW er 0,25 GW?", ["250 MW", "25 MW", "2500 MW", "250 000 MW"], 0, "1 GW = 1000 MW, så $0{,}25 \\cdot 1000 = 250$.", 2),
    q("Hvor mange μm er 8000 nm?", ["0,8 μm", "80 μm", "8 μm", "800 μm"], 2, "1 μm = 1000 nm, så $8000 : 1000 = 8$.", 2),
    q("En tablett inneholder 250 mg. Hvor mange tabletter trengs for 2 g?", ["80", "8", "4", "0,8"], 1, "2 g = 2000 mg, og $2000 : 250 = 8$.", 2),
    q("Hvilken energimengde er størst?", ["2 100 000 kJ", "1900 MJ", "2 GJ", r`$2 \cdot 10^8$ J`], 0, r`Skriv alt i joule: $2{,}1 \cdot 10^9$, $1{,}9 \cdot 10^9$, $2 \cdot 10^9$ og $2 \cdot 10^8$.`, 3),
  ],
  oppgaver: [
    o(
      "P2.1",
      1,
      "uten",
      r`Skriv hvert prefiks som en tierpotens.${del("a")}kilo (k)${del("b")}mega (M)${del("c")}giga (G)${del("d")}desi (d) og centi (c)${del("e")}milli (m)${del("f")}mikro (μ) og nano (n)`,
      "Prefiksene fra kilo og oppover øker med 1000 for hvert trinn. Det samme gjelder fra milli og nedover.",
      [
        r`<strong>a)</strong> $10^3$ <strong>b)</strong> $10^6$ <strong>c)</strong> $10^9$`,
        r`<strong>d)</strong> $10^{-1}$ og $10^{-2}$ <strong>e)</strong> $10^{-3}$ <strong>f)</strong> $10^{-6}$ og $10^{-9}$<br><strong>Svar:</strong> se over`,
      ],
    ),
    o(
      "P2.2",
      1,
      "uten",
      r`Gjør om.${del("a")}3,5 km til m${del("b")}750 mg til g${del("c")}0,4 MW til W${del("d")}2500 kJ til MJ${del("e")}0,06 L til mL`,
      "Bytt ut prefikset med tallet det står for. For eksempel er 3,5 km = 3,5 · 1000 m.",
      [
        r`<strong>a)</strong> $3{,}5 \cdot 1000 = 3500$ m <strong>b)</strong> $750 : 1000 = 0{,}75$ g`,
        r`<strong>c)</strong> $0{,}4 \cdot 1\,000\,000 = 400\,000$ W <strong>d)</strong> $2500 : 1000 = 2{,}5$ MJ <strong>e)</strong> $0{,}06 \cdot 1000 = 60$ mL<br><strong>Svar:</strong> a) 3500 m b) 0,75 g c) 400 000 W d) 2,5 MJ e) 60 mL`,
      ],
    ),
    o(
      "P2.3",
      1,
      "uten",
      r`En lydbok-app lagrer kapitlene på telefonen. Hvert kapittel tar 4 MB. I denne oppgaven bruker vi 1 GB $= 1000$ MB.${del("a")}Du har lastet ned 3500 kapitler. Hvor mange GB bruker de?${del("b")}Du har 50 GB ledig. Hvor mange kapitler er det plass til?`,
      "Del med 1000 for å gå fra MB til GB. Gang med 1000 for å gå fra GB til MB.",
      [
        r`<strong>a)</strong> $3500 \cdot 4 = 14\,000$ MB $= 14$ GB`,
        r`<strong>b)</strong> 50 GB $= 50\,000$ MB. $50\,000 : 4 = 12\,500$<br><strong>Svar:</strong> a) 14 GB b) 12 500 kapitler`,
      ],
    ),
    o(
      "P2.4",
      2,
      "uten",
      r`Skriv størrelsene med et passende prefiks, slik at tallet blir enkelt.${del("a")}7 200 000 W${del("b")}0,000 004 m${del("c")}35 000 000 000 J${del("d")}0,009 g`,
      "Velg prefikset slik at tallet foran blir mellom 1 og 1000.",
      [
        r`<strong>a)</strong> $7{,}2 \cdot 10^6$ W $= 7{,}2$ MW <strong>b)</strong> $4 \cdot 10^{-6}$ m $= 4$ μm`,
        r`<strong>c)</strong> $35 \cdot 10^9$ J $= 35$ GJ <strong>d)</strong> $9 \cdot 10^{-3}$ g $= 9$ mg<br><strong>Svar:</strong> a) 7,2 MW b) 4 μm c) 35 GJ d) 9 mg`,
      ],
    ),
    o(
      "P2.5",
      2,
      "uten",
      r`${tenkt}Fiskene i et akvarium skal ha 2,4 g fôr i uka. Fôret deles likt på 6 måltider. En fôrkule veier 80 mg.${del("a")}Hvor mange milligram fôr får fiskene per måltid?${del("b")}Hvor mange fôrkuler blir det per måltid?`,
      "Gjør om til milligram først: 1 g = 1000 mg.",
      [
        r`<strong>a)</strong> $2{,}4$ g $= 2400$ mg. $2400 : 6 = 400$ mg`,
        r`<strong>b)</strong> $400 : 80 = 5$<br><strong>Svar:</strong> a) 400 mg b) 5 fôrkuler`,
      ],
    ),
    o(
      "P2.6",
      2,
      "uten",
      r`Hår vokser omtrent 0,35 mm i døgnet.${del("a")}Hvor mange mikrometer (μm) er det?${del("b")}Hvor mange centimeter vokser håret på 30 døgn?`,
      "1 mm = 1000 μm og 1 cm = 10 mm.",
      [
        r`<strong>a)</strong> $0{,}35 \cdot 1000 = 350$ μm`,
        r`<strong>b)</strong> $0{,}35 \cdot 30 = 10{,}5$ mm $= 1{,}05$ cm<br><strong>Svar:</strong> a) 350 μm b) 1,05 cm`,
      ],
    ),
    o(
      "P2.7",
      3,
      "kalk",
      r`${tenkt}Å strømme film i høy kvalitet bruker omtrent 3 GB data i timen. Mobilabonnementet ditt har 20 GB.${del("a")}Hvor mange timer og minutter kan du strømme?${del("b")}En episode varer i 45 minutter. Hvor mange MB data bruker én episode? Bruk 1 GB $= 1000$ MB.${del("c")}Hvor mange hele episoder kan du se med 20 GB?`,
      "45 minutter er 0,75 timer.",
      [
        r`<strong>a)</strong> $20 : 3 \approx 6{,}67$ timer. $0{,}67 \cdot 60 \approx 40$ min, altså omtrent 6 timer og 40 minutter.`,
        r`<strong>b)</strong> $3 \cdot 0{,}75 = 2{,}25$ GB $= 2250$ MB`,
        r`<strong>c)</strong> $20 : 2{,}25 \approx 8{,}9$, altså 8 hele episoder.<br><strong>Svar:</strong> a) 6 h 40 min b) 2250 MB c) 8 episoder`,
      ],
    ),
  ],
};

// ───────────────────────────── 2B Omgjøring mellom enheter ─────────────────────────────

const dkP2B: Delkapittel = {
  id: "P2B",
  tittel: "2B Omgjøring mellom enheter",
  quiz: [
    q("Hvor mange dm² er 1 m²?", ["10 dm²", "100 dm²", "1000 dm²", "100 cm²"], 1, "1 m² er et kvadrat med sider 10 dm. $10 \\cdot 10 = 100$", 1),
    q("Hva er 1 liter lik?", ["1 cm³", "100 cm³", "1 m³", "1 dm³"], 3, "1 L = 1 dm³ = 1000 cm³.", 1),
    q("Hvor lenge er 2,75 timer?", ["2 h 75 min", "2 h 7,5 min", "2 h 45 min", "2 h 34 min"], 2, "$0{,}75 \\cdot 60 = 45$ minutter.", 2),
    q("Hvor mange liter er 0,5 m³?", ["50 L", "500 L", "5 L", "5000 L"], 1, "1 m³ = 1000 L, så $0{,}5 \\cdot 1000 = 500$.", 2),
    q("Hvor lang tid er det fra 09.35 til 13.10?", ["3 h 35 min", "4 h 25 min", "3 h 75 min", "4 h 35 min"], 0, "Fra 09.35 til 12.35 er 3 timer. Fra 12.35 til 13.10 er 35 minutter.", 2),
    q("Hvor mange cm³ er 0,045 m³?", ["450", "4500", "450 000", "45 000"], 3, "1 m³ = 1000 dm³ = 1 000 000 cm³, så $0{,}045 \\cdot 1\\,000\\,000 = 45\\,000$.", 3),
  ],
  oppgaver: [
    o(
      "P2.8",
      1,
      "uten",
      r`Gjør om.${del("a")}4,2 m til cm${del("b")}380 mm til m${del("c")}2,5 tonn til kg${del("d")}65 cL til L${del("e")}3 mil til km${del("f")}0,8 hg til g`,
      "Lengde, masse og volum i liter: hvert trinn i enhetstrappa er en faktor 10. Tonn og mil er unntak: 1 tonn = 1000 kg og 1 mil = 10 km.",
      [
        r`<strong>a)</strong> 420 cm <strong>b)</strong> 0,38 m <strong>c)</strong> 2500 kg`,
        r`<strong>d)</strong> 0,65 L <strong>e)</strong> 30 km <strong>f)</strong> 80 g<br><strong>Svar:</strong> a) 420 cm b) 0,38 m c) 2500 kg d) 0,65 L e) 30 km f) 80 g`,
      ],
    ),
    o(
      "P2.9",
      1,
      "uten",
      r`I en tursekk ligger en matboks på 1,2 kg, en vannflaske på 450 g, en jakke på 3 hg og en lommelykt på 0,05 kg. Hvor mye veier dette til sammen? Svar i gram og i kilogram.`,
      "Gjør om alt til gram før du legger sammen.",
      [
        r`$1200 + 450 + 300 + 50 = 2000$ g`,
        r`<strong>Svar:</strong> 2000 g = 2 kg`,
      ],
    ),
    o(
      "P2.10",
      2,
      "uten",
      r`Gjør om.${del("a")}3 m² til dm²${del("b")}4500 cm² til m²${del("c")}0,07 m² til cm²${del("d")}2,5 km² til m²${del("e")}1 dekar $= 1000$ m². Hvor mange dekar er 18 000 m²?`,
      "Areal: hvert trinn i trappa (m², dm², cm², mm²) er en faktor 100. Fra km² til m² er faktoren 1 000 000.",
      [
        r`<strong>a)</strong> $3 \cdot 100 = 300$ dm² <strong>b)</strong> $4500 : 10\,000 = 0{,}45$ m²`,
        r`<strong>c)</strong> $0{,}07 \cdot 10\,000 = 700$ cm² <strong>d)</strong> $2{,}5 \cdot 1\,000\,000 = 2\,500\,000$ m²`,
        r`<strong>e)</strong> $18\,000 : 1000 = 18$ dekar<br><strong>Svar:</strong> a) 300 dm² b) 0,45 m² c) 700 cm² d) 2 500 000 m² e) 18 dekar`,
      ],
    ),
    o(
      "P2.11",
      2,
      "uten",
      r`Gjør om.${del("a")}2 m³ til L${del("b")}350 cm³ til dL${del("c")}0,6 dm³ til mL${del("d")}45 000 cm³ til m³${del("e")}Forklar hvorfor 1 m³ $= 1000$ dm³.`,
      "1 L = 1 dm³ og 1 mL = 1 cm³. Volum: hvert trinn (m³, dm³, cm³) er en faktor 1000.",
      [
        r`<strong>a)</strong> $2000$ L <strong>b)</strong> $350$ mL $= 3{,}5$ dL <strong>c)</strong> $0{,}6$ L $= 600$ mL`,
        r`<strong>d)</strong> $45\,000 : 1\,000\,000 = 0{,}045$ m³`,
        r`<strong>e)</strong> En kube med sider 1 m har sider 10 dm. Volumet er $10 \cdot 10 \cdot 10 = 1000$ dm³.<br><strong>Svar:</strong> a) 2000 L b) 3,5 dL c) 600 mL d) 0,045 m³`,
      ],
    ),
    o(
      "P2.12",
      2,
      "uten",
      r`${del("a")}Skriv 2,4 h i timer og minutter.${del("b")}Skriv 135 min i timer, som desimaltall.${del("c")}Hvor mange minutter er 0,15 h?${del("d")}Hvor mange sekunder er 3 h 20 min?${del("e")}Et tog går fra Oslo klokka 07.48 og kommer fram klokka 15.13. Hvor lang tid tar turen?`,
      "1 time = 60 minutter. Desimalene i et timetall er ikke minutter: 0,4 h = 0,4 · 60 min.",
      [
        r`<strong>a)</strong> $0{,}4 \cdot 60 = 24$, altså 2 h 24 min. <strong>b)</strong> $135 : 60 = 2{,}25$ h`,
        r`<strong>c)</strong> $0{,}15 \cdot 60 = 9$ min <strong>d)</strong> $200$ min $\cdot 60 = 12\,000$ s`,
        r`<strong>e)</strong> Fra 07.48 til 14.48 er 7 timer. Fra 14.48 til 15.13 er 25 minutter.<br><strong>Svar:</strong> a) 2 h 24 min b) 2,25 h c) 9 min d) 12 000 s e) 7 h 25 min`,
      ],
    ),
    o(
      "P2.13",
      2,
      "uten",
      r`Skriv arealene i stigende rekkefølge.<br><br>0,3 m² &nbsp;&nbsp; 2500 cm² &nbsp;&nbsp; 31 dm² &nbsp;&nbsp; 280 000 mm²`,
      "Gjør om alle til dm².",
      [
        r`$0{,}3$ m² $= 30$ dm², $2500$ cm² $= 25$ dm², $280\,000$ mm² $= 28$ dm².`,
        r`<strong>Svar:</strong> 2500 cm² < 280 000 mm² < 0,3 m² < 31 dm²`,
      ],
    ),
    o(
      "P2.14",
      2,
      "kalk",
      r`1 tomme $= 2{,}54$ cm.${del("a")}Et sykkelhjul er 29 tommer. Hvor mange centimeter er det? Svar med én desimal.${del("b")}Diagonalen på en dataskjerm er 68,6 cm. Hvor mange tommer er det?`,
      "Fra tommer til cm: gang med 2,54. Fra cm til tommer: del med 2,54.",
      [
        r`<strong>a)</strong> $29 \cdot 2{,}54 = 73{,}66 \approx 73{,}7$ cm`,
        r`<strong>b)</strong> $68{,}6 : 2{,}54 \approx 27{,}0$ tommer<br><strong>Svar:</strong> a) 73,7 cm b) 27 tommer`,
      ],
    ),
    o(
      "P2.15",
      3,
      "uten",
      r`${fig("P2.15", "Akvarium formet som et rett prisme (boks), tegnet skrått ovenfra. Mål på kantene: lengde 60 cm, bredde 3,0 dm, høyde 0,35 m.")}Et akvarium har innvendige mål 60 cm, 3,0 dm og 0,35 m.${del("a")}Hvor mange liter rommer akvariet?${del("b")}Du fyller det med en kanne som rommer 1,5 L. Hvor mange kanner trenger du?${del("c")}1 L vann veier 1 kg. Hvor mye veier vannet i et fullt akvarium?`,
      "Gjør om alle målene til dm. Da får du volumet i dm³, som er det samme som liter.",
      [
        r`<strong>a)</strong> $6 \cdot 3 \cdot 3{,}5 = 63$ dm³ $= 63$ L`,
        r`<strong>b)</strong> $63 : 1{,}5 = 42$`,
        r`<strong>c)</strong> 63 kg<br><strong>Svar:</strong> a) 63 L b) 42 kanner c) 63 kg`,
      ],
    ),
  ],
};

// ───────────────────────────── 2C Fart, tetthet, pris per enhet og energi ─────────────────────────────

const dkP2C: Delkapittel = {
  id: "P2C",
  tittel: "2C Fart, tetthet, pris per enhet og energi",
  quiz: [
    q("Hva er 36 km/h i m/s?", ["10 m/s", "129,6 m/s", "3,6 m/s", "100 m/s"], 0, "Del med 3,6: $36 : 3{,}6 = 10$.", 1),
    q("Hvor lang tid tar 150 km med farten 60 km/h?", ["2 h 50 min", "9000 h", "2 h 30 min", "0,4 h"], 2, "$150 : 60 = 2{,}5$ h, altså 2 h 30 min.", 1),
    q("En kloss har massetetthet 0,9 kg/dm³ og volum 5 dm³. Hvor mye veier den?", ["5,9 kg", "4,5 kg", "5,6 kg", "0,18 kg"], 1, "Masse = tetthet · volum $= 0{,}9 \\cdot 5 = 4{,}5$ kg.", 2),
    q("En ovn på 2000 W står på i 3 timer. Hvor mye energi bruker den?", ["600 kWh", "0,67 kWh", "6000 kWh", "6 kWh"], 3, "2000 W = 2 kW, og $2 \\cdot 3 = 6$ kWh.", 2),
    q("Hvilket tilbud er billigst per kilogram?", ["400 g for 30 kr", "1 kg for 70 kr", "2,5 kg for 180 kr", "250 g for 20 kr"], 1, "Prisene per kg er 75 kr, 70 kr, 72 kr og 80 kr.", 2),
    q("Hva er 1 kWh lik?", ["3,6 kJ", "3600 MJ", "3,6 MJ", "360 J"], 2, "1 kWh = 1000 W · 3600 s = 3 600 000 J = 3,6 MJ.", 3),
  ],
  oppgaver: [
    o(
      "P2.16",
      1,
      "kalk",
      r`${del("a")}Gjør om 54 km/h til m/s.${del("b")}Gjør om 12 m/s til km/h.${del("c")}Iben sykler 27 km på 1 time og 30 minutter. Hva er gjennomsnittsfarten i km/h?`,
      "Fra km/h til m/s: del med 3,6. Fra m/s til km/h: gang med 3,6. Fart = strekning : tid.",
      [
        r`<strong>a)</strong> $54 : 3{,}6 = 15$ m/s <strong>b)</strong> $12 \cdot 3{,}6 = 43{,}2$ km/h`,
        r`<strong>c)</strong> 1 h 30 min $= 1{,}5$ h. $27 : 1{,}5 = 18$ km/h<br><strong>Svar:</strong> a) 15 m/s b) 43,2 km/h c) 18 km/h`,
      ],
    ),
    o(
      "P2.17",
      2,
      "kalk",
      r`${tenkt}En ferje skal gå 42 km. Gjennomsnittsfarten er 24 km/h.${del("a")}Hvor lang tid tar turen? Svar i timer og minutter.${del("b")}Ferja går klokka 10.50. Når kommer den fram?`,
      "Tid = strekning : fart.",
      [
        r`<strong>a)</strong> $42 : 24 = 1{,}75$ h. $0{,}75 \cdot 60 = 45$ min, altså 1 h 45 min.`,
        r`<strong>b)</strong> 10.50 + 1 h 45 min = 12.35<br><strong>Svar:</strong> a) 1 h 45 min b) klokka 12.35`,
      ],
    ),
    o(
      "P2.18",
      2,
      "kalk",
      r`Massetetthet $= \dfrac{\text{masse}}{\text{volum}}$${del("a")}En stein veier 4,2 kg og har volumet 1,5 dm³. Finn massetettheten i kg/dm³.${del("b")}Hva er massetettheten i g/cm³?${del("c")}En trekloss har massetetthet 0,6 kg/dm³ og volum 12 dm³. Hvor mye veier den? Vil den flyte i vann (1,0 kg/dm³)?`,
      "1 kg = 1000 g og 1 dm³ = 1000 cm³. Et stoff flyter hvis tettheten er mindre enn tettheten til vann.",
      [
        r`<strong>a)</strong> $4{,}2 : 1{,}5 = 2{,}8$ kg/dm³`,
        r`<strong>b)</strong> $\dfrac{2800 \text{ g}}{1000 \text{ cm³}} = 2{,}8$ g/cm³`,
        r`<strong>c)</strong> $0{,}6 \cdot 12 = 7{,}2$ kg. Ja, $0{,}6 < 1{,}0$, så klossen flyter.<br><strong>Svar:</strong> a) 2,8 kg/dm³ b) 2,8 g/cm³ c) 7,2 kg, den flyter`,
      ],
    ),
    o(
      "P2.19",
      2,
      "uten",
      r`${tenkt}En panelovn har effekten 800 W og står på 6 timer hver dag. Strømmen koster 1,25 kr per kWh.${del("a")}Hvor mange kWh bruker ovnen på én dag?${del("b")}Hvor mange kWh bruker den på 30 dager?${del("c")}Hva koster strømmen til ovnen på 30 dager?`,
      "Energi = effekt · tid. 800 W = 0,8 kW.",
      [
        r`<strong>a)</strong> $0{,}8 \cdot 6 = 4{,}8$ kWh`,
        r`<strong>b)</strong> $4{,}8 \cdot 30 = 144$ kWh`,
        r`<strong>c)</strong> $144 \cdot 1{,}25 = 180$ kr<br><strong>Svar:</strong> a) 4,8 kWh b) 144 kWh c) 180 kr`,
      ],
    ),
    o(
      "P2.20",
      2,
      "uten",
      r`${tenkt}Havregryn selges i to størrelser: 1,5 kg for 42 kr og 750 g for 24 kr. Hvilken pakke er billigst per kilogram?`,
      "Finn prisen for 1 kg av hver pakke («veien om 1»).",
      [
        r`Stor pakke: $42 : 1{,}5 = 28$ kr per kg.`,
        r`Liten pakke: 750 g er 0,75 kg. $24 : 0{,}75 = 32$ kr per kg.<br><strong>Svar:</strong> Den store pakken er billigst, 28 kr per kg mot 32 kr per kg.`,
      ],
    ),
    o(
      "P2.21",
      2,
      "kalk",
      r`${tenkt}Flytende plantenæring inneholder 30 mg nitrogen per mL.${del("a")}Hvor mange gram nitrogen er det i 1 L plantenæring?${del("b")}Du gir 7,5 mL ved hver vanning. Hvor mye nitrogen er det?${del("c")}Hvor mange mL må du bruke for å gi 1,2 g nitrogen?`,
      "1,2 g = 1200 mg.",
      [
        r`<strong>a)</strong> 1 L $= 1000$ mL. $30 \cdot 1000 = 30\,000$ mg $= 30$ g`,
        r`<strong>b)</strong> $30 \cdot 7{,}5 = 225$ mg`,
        r`<strong>c)</strong> $1200 : 30 = 40$ mL<br><strong>Svar:</strong> a) 30 g b) 225 mg c) 40 mL`,
      ],
    ),
    o(
      "P2.22",
      3,
      "kalk",
      r`${tenkt}En elbil bruker 1,8 kWh per mil.${del("a")}Hvor mye energi bruker bilen på 240 km?${del("b")}Batteriet rommer 60 kWh. Hvor langt kan bilen kjøre på fullt batteri? Svar i km.${del("c")}1 kWh $= 3{,}6$ MJ. Hvor mange MJ bruker bilen per kilometer?`,
      "1 mil = 10 km. Pass på at du bruker samme lengdeenhet hele veien.",
      [
        r`<strong>a)</strong> 240 km $= 24$ mil. $24 \cdot 1{,}8 = 43{,}2$ kWh`,
        r`<strong>b)</strong> $60 : 1{,}8 \approx 33{,}3$ mil $\approx 333$ km`,
        r`<strong>c)</strong> Per km: $1{,}8 : 10 = 0{,}18$ kWh. $0{,}18 \cdot 3{,}6 \approx 0{,}65$ MJ<br><strong>Svar:</strong> a) 43,2 kWh b) omtrent 333 km c) omtrent 0,65 MJ per km`,
      ],
    ),
    o(
      "P2.23",
      3,
      "kalk",
      r`Jonas vil løpe 10 km på 55 minutter og holde jevn fart hele veien.${del("a")}Hvilket tempo må han holde per kilometer? Svar i minutter og sekunder.${del("b")}Hva er farten i km/h? Svar med én desimal.${del("c")}Hva er farten i m/s? Svar med to desimaler.`,
      "Tempo er tid per kilometer. Fart i km/h er kilometer per time.",
      [
        r`<strong>a)</strong> $55 : 10 = 5{,}5$ min. $0{,}5 \cdot 60 = 30$ s, så tempoet er 5 min 30 s per km.`,
        r`<strong>b)</strong> 55 min $= \dfrac{55}{60}$ h. $10 : \dfrac{55}{60} = \dfrac{600}{55} \approx 10{,}9$ km/h`,
        r`<strong>c)</strong> 10 km $= 10\,000$ m og 55 min $= 3300$ s. $10\,000 : 3300 \approx 3{,}03$ m/s<br><strong>Svar:</strong> a) 5 min 30 s per km b) omtrent 10,9 km/h c) omtrent 3,03 m/s`,
      ],
    ),
  ],
};

// ───────────────────────────── Sammendrag ─────────────────────────────

const dkP2SM: Delkapittel = {
  id: "P2SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P2.S1",
      "2A Enhetsprefikser fra nano til giga",
      r`${tab(["Prefiks", ["T", "G", "M", "k", "h", "da", "d", "c", "m", "μ", "n"]], ["Navn", ["tera", "giga", "mega", "kilo", "hekto", "deka", "desi", "centi", "milli", "mikro", "nano"]], ["Faktor", [r`$10^{12}$`, r`$10^{9}$`, r`$10^{6}$`, r`$10^{3}$`, r`$10^{2}$`, r`$10^{1}$`, r`$10^{-1}$`, r`$10^{-2}$`, r`$10^{-3}$`, r`$10^{-6}$`, r`$10^{-9}$`]])}<br>Bytt ut prefikset med faktoren: 15 MJ $= 15 \cdot 10^6$ J.`,
      "Prefiks og standardform henger sammen.",
      [r`Eksempel: $0{,}000\,004$ m $= 4 \cdot 10^{-6}$ m $= 4$ μm`],
    ),
    s(
      "P2.S2",
      "2B Omgjøring mellom enheter",
      r`${fig("P2.S2", "Tre enhetstrapper ved siden av hverandre. Lengde: km, hm, dam, m, dm, cm, mm med «· 10» ned og «: 10» opp på hvert trinn. Areal: km², hm², dam², m², dm², cm², mm² med «· 100» og «: 100». Volum: m³, dm³ (= L), cm³ (= mL), mm³ med «· 1000» og «: 1000».")}<ul><li>Lengde, masse og liter: faktor 10 for hvert trinn.</li><li>Areal: faktor 100 for hvert trinn. 1 dekar $= 1000$ m².</li><li>Volum: faktor 1000 for hvert trinn. 1 dm³ $= 1$ L og 1 cm³ $= 1$ mL.</li><li>Tid: 1 h $= 60$ min $= 3600$ s. 0,4 h er 24 min, ikke 40 min.</li></ul>`,
      "Går du ned i trappa, ganger du. Går du opp, deler du.",
      [r`Eksempel: $0{,}07$ m² $= 0{,}07 \cdot 10\,000$ cm² $= 700$ cm²`],
    ),
    s(
      "P2.S3",
      "2C Fart, tetthet, pris per enhet og energi",
      r`<ul><li>Fart $= \dfrac{\text{strekning}}{\text{tid}}$. Fra km/h til m/s: del med 3,6.</li><li>Massetetthet $= \dfrac{\text{masse}}{\text{volum}}$, for eksempel kg/dm³.</li><li>Energi $=$ effekt $\cdot$ tid. 1 kWh $= 3{,}6$ MJ.</li><li>Enhetspris («veien om 1»): del prisen på mengden.</li></ul>`,
      "Enheten forteller hvordan du skal regne: km/h betyr km delt på h.",
      [r`Eksempel: 42 km med 24 km/h tar $42 : 24 = 1{,}75$ h $= 1$ h 45 min.`],
    ),
  ],
};

// ───────────────────────────── Øveprøve ─────────────────────────────

const dkP2OP: Delkapittel = {
  id: "P2OP",
  tittel: "Øveprøve",
  quiz: [
    q("Hva er 1 dm³ lik?", ["1 mL", "100 mL", "10 L", "1 L"], 3, "1 dm³ = 1 L.", 1),
    q("Hva er 72 km/h i m/s?", ["72 m/s", "259,2 m/s", "20 m/s", "7,2 m/s"], 2, "$72 : 3{,}6 = 20$", 1),
    q("Hvor mange dm² er 250 cm²?", ["2,5 dm²", "0,25 dm²", "2500 dm²", "25 dm²"], 0, "1 dm² = 100 cm², så $250 : 100 = 2{,}5$.", 2),
    q("En mikstur har 6 mg/mL. Hvor mange mg er det i 2,5 mL?", ["2,4 mg", "15 mg", "8,5 mg", "150 mg"], 1, "6 mg i hver milliliter: $6 \\cdot 2{,}5 = 15$ mg.", 2),
  ],
  oppgaver: [
    s(
      "P2.OP0",
      "Om øveprøven",
      "<strong>Kapittel 2 · Enheter og omgjøring</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–5), bruk kalkulator.<br>Hver del går fra lettere til vanskeligere oppgaver.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P2.OP1",
      1,
      "uten",
      r`<strong>Del 1</strong><br><br>Gjør om.${del("a")}2,3 km til m${del("b")}450 g til kg${del("c")}1,5 L til dL${del("d")}0,8 h til minutter${del("e")}5 m² til dm²`,
      "Husk at arealenheter har faktor 100 for hvert trinn.",
      [
        r`<strong>a)</strong> 2300 m <strong>b)</strong> 0,45 kg <strong>c)</strong> 15 dL`,
        r`<strong>d)</strong> $0{,}8 \cdot 60 = 48$ min <strong>e)</strong> 500 dm²<br><strong>Svar:</strong> a) 2300 m b) 0,45 kg c) 15 dL d) 48 min e) 500 dm²`,
      ],
    ),
    o(
      "P2.OP2",
      2,
      "uten",
      r`En kanne rommer 1,8 L. Du skal servere 9 glass med 2,5 dL i hvert.${del("a")}Holder det med én full kanne?${del("b")}Hvor mange cL mangler eller blir til overs?`,
      "Gjør om til dL eller mL først.",
      [
        r`<strong>a)</strong> 1,8 L $= 18$ dL. $9 \cdot 2{,}5 = 22{,}5$ dL. Siden $22{,}5 > 18$, holder ikke én kanne.`,
        r`<strong>b)</strong> $22{,}5 - 18 = 4{,}5$ dL $= 45$ cL<br><strong>Svar:</strong> a) Nei b) Det mangler 45 cL.`,
      ],
    ),
    o(
      "P2.OP3",
      2,
      "uten",
      r`Skriv volumene i stigende rekkefølge.<br><br>0,04 m³ &nbsp;&nbsp; 35 L &nbsp;&nbsp; 380 dL &nbsp;&nbsp; 42 000 cm³`,
      "Gjør om alle til liter.",
      [
        r`$0{,}04$ m³ $= 40$ L, $380$ dL $= 38$ L og $42\,000$ cm³ $= 42$ L.`,
        r`<strong>Svar:</strong> 35 L < 380 dL < 0,04 m³ < 42 000 cm³`,
      ],
    ),
    o(
      "P2.OP4",
      2,
      "kalk",
      r`<strong>Del 2</strong><br><br>En drone flyr med farten 15 m/s.${del("a")}Hva er farten i km/h?${del("b")}Hvor langt flyr dronen på 8 minutter? Svar i km.${del("c")}Hvor lang tid bruker den på 3 km? Svar i minutter og sekunder.`,
      "Gjør om tiden til sekunder når farten er i m/s.",
      [
        r`<strong>a)</strong> $15 \cdot 3{,}6 = 54$ km/h`,
        r`<strong>b)</strong> $15 \cdot 480 = 7200$ m $= 7{,}2$ km`,
        r`<strong>c)</strong> $3000 : 15 = 200$ s $= 3$ min 20 s<br><strong>Svar:</strong> a) 54 km/h b) 7,2 km c) 3 min 20 s`,
      ],
    ),
    o(
      "P2.OP5",
      3,
      "kalk",
      r`En isblokk er 0,5 m lang, 0,4 m bred og 0,3 m høy. Massetettheten til is er 0,92 kg/dm³.${del("a")}Finn volumet i m³ og i dm³.${del("b")}Hvor mye veier isblokka?${del("c")}Når isen smelter, blir massen den samme. Vann har massetetthet 1,0 kg/dm³. Hvor mange liter vann blir det?`,
      "Volum = lengde · bredde · høyde. Masse = tetthet · volum.",
      [
        r`<strong>a)</strong> $0{,}5 \cdot 0{,}4 \cdot 0{,}3 = 0{,}06$ m³ $= 60$ dm³`,
        r`<strong>b)</strong> $0{,}92 \cdot 60 = 55{,}2$ kg`,
        r`<strong>c)</strong> $55{,}2 : 1{,}0 = 55{,}2$ dm³ $= 55{,}2$ L<br><strong>Svar:</strong> a) 0,06 m³ = 60 dm³ b) 55,2 kg c) 55,2 L`,
      ],
    ),
  ],
};

export const KAP2_1P: Kapittel = {
  id: "p1kap2",
  tittel: "Kapittel 2 Enheter og omgjøring",
  delkapitler: [dkP2A, dkP2B, dkP2C, dkP2SM, dkP2OP],
};
