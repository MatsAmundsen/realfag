import type { Exam, ExamTask } from "../types";
import { P1P_EXAM_FIGURES } from "./exams-figurer";

/**
 * 1P kap 7 Eksamensøving. Egne øvingsoppgaver for Matteguiden – ikke offisielle Udir-oppgaver.
 * Figurer er bestilt hos DesignBOT2. Inntil de finnes står en skjult kommentar «figur: …».
 */
function t(
  id: string,
  nr: string,
  points: number,
  text: string,
  hint: string,
  fasitSteg: string[],
  topics: string[],
): ExamTask {
  return { id, nr, points, text, hint, fasitSteg, topics };
}

function fig(id: string, nr: string, beskrivelse: string) {
  const svg = P1P_EXAM_FIGURES[id];
  if (svg) return `<!-- figur: ${id} — ${beskrivelse} -->${svg}`;
  return `<!-- figur: ${id} — ${beskrivelse} --><em>Figur til oppgave ${nr} (kommer).</em><br><br>`;
}

const U = "<strong>Uten hjelpemidler</strong>. ";

export const EXAMS_1P: Exam[] = [
  {
    id: "P7-sett1",
    title: "Øvingseksamen 1",
    date: "Øvingssett",
    del1Minutes: 60,
    totalMinutes: 300,
    del1Count: 6,
    del2Count: 12,
    hasOfficialSolutions: false,
    officialNote: "Egne øvingsoppgaver laget for Matteguiden, ikke en offisiell eksamen.",
    del1: [
      t("P7-d1-1", "1", 3,
        U + "<br>a) Skriv $0{,}00042$ og $3\\,500\\,000$ på standardform.<br>b) Regn ut $(6\\cdot 10^{5})\\cdot(4\\cdot 10^{-2})$. Svar på standardform.<br>c) Ordne tallene fra minst til størst: $3{,}1\\cdot 10^{4}$, $\\;0{,}5\\cdot 10^{5}$, $\\;29\\,000$, $\\;4\\cdot 10^{3}\\cdot 10$.",
        "Standardform er $a\\cdot 10^n$ med $1\\le a<10$. Gang sammen tallene for seg og tierpotensene for seg.",
        [
          "a) $0{,}00042 = 4{,}2\\cdot 10^{-4}$ og $3\\,500\\,000 = 3{,}5\\cdot 10^{6}$.",
          "b) $6\\cdot 4 = 24$ og $10^{5}\\cdot 10^{-2} = 10^{3}$, så produktet er $24\\cdot 10^{3} = 2{,}4\\cdot 10^{4}$.",
          "c) Tallene er $31\\,000$, $50\\,000$, $29\\,000$ og $40\\,000$.",
          "<strong>Svar:</strong> a) $4{,}2\\cdot 10^{-4}$ og $3{,}5\\cdot 10^{6}$ b) $2{,}4\\cdot 10^{4}$ c) $29\\,000 < 3{,}1\\cdot 10^{4} < 4\\cdot 10^{3}\\cdot 10 < 0{,}5\\cdot 10^{5}$",
        ],
        ["Nivå 1", "standardform"]),
      t("P7-d1-2", "2", 3,
        U + "<br>a) Gjør om $2{,}5\\ \\text{m}^3$ til liter.<br>b) Gjør om $3{,}6$ timer til timer og minutter.<br>c) Gjør om $450\\ \\text{cm}^2$ til $\\text{m}^2$.<br>d) Gjør om $72$ km/h til m/s.",
        "$1\\ \\text{m}^3 = 1000$ L, $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$ og $1$ m/s $= 3{,}6$ km/h.",
        [
          "a) $2{,}5\\cdot 1000 = 2500$ L.",
          "b) $0{,}6\\cdot 60 = 36$ minutter.",
          "c) $450 : 10\\,000 = 0{,}045\\ \\text{m}^2$.",
          "d) $72 : 3{,}6 = 20$ m/s.",
          "<strong>Svar:</strong> a) $2500$ L b) $3$ timer og $36$ minutter c) $0{,}045\\ \\text{m}^2$ d) $20$ m/s",
        ],
        ["Nivå 1", "måleenheter"]),
      t("P7-d1-4", "3", 3,
        U + "<br>a) Et parti gikk fra $8\\,\\%$ til $10\\,\\%$ oppslutning. Hvor mange prosentpoeng og hvor mange prosent økte oppslutningen?<br>b) Hva er $30\\,\\%$ av $240$?<br>c) $45$ er $15\\,\\%$ av et tall. Hvilket tall?",
        "Prosentpoeng er differansen. Prosent er endringen delt på startverdien.",
        [
          "a) $10 - 8 = 2$ prosentpoeng. $\\dfrac{2}{8} = 0{,}25 = 25\\,\\%$.",
          "b) $0{,}3\\cdot 240 = 72$.",
          "c) $45 : 0{,}15 = 300$.",
          "<strong>Svar:</strong> a) $2$ prosentpoeng, $25\\,\\%$ b) $72$ c) $300$",
        ],
        ["Nivå 1", "prosent", "prosentpoeng"]),
      t("P7-d1-3", "4", 3,
        U + "Til en klassefest blandes saft og vann i forholdet $1 : 6$.<br>a) Hvor mye saft trengs til $1{,}4$ L ferdig drikk?<br>b) Klassen har $0{,}5$ L saft. Hvor mye ferdig drikk kan de lage?<br>c) Hvor mange glass på $2{,}5$ dL blir det av drikken i b)?",
        "Forholdet $1:6$ betyr $1$ del saft av til sammen $7$ deler.",
        [
          "a) $1{,}4 : 7 = 0{,}2$ L saft.",
          "b) $0{,}5\\cdot 7 = 3{,}5$ L ferdig drikk.",
          "c) $3{,}5$ L $= 35$ dL og $35 : 2{,}5 = 14$.",
          "<strong>Svar:</strong> a) $0{,}2$ L b) $3{,}5$ L c) $14$ glass",
        ],
        ["Nivå 2", "forhold"]),
      t("P7-d1-5", "5", 4,
        U + "En sykkel kostet $8000$ kr. Prisen økte med $20\\,\\%$. Senere ble den nye prisen satt ned med $20\\,\\%$.<br>a) Hva kostet sykkelen etter økningen?<br>b) Hva kostet sykkelen etter at prisen ble satt ned?<br>c) Er prisen tilbake til $8000$ kr? Hvor mange prosent har prisen endret seg til sammen, og i hvilken retning?<br>d) Etter en økning på $10\\,\\%$ koster en hjelm $660$ kr. Hva kostet den før?",
        "Bruk vekstfaktorer: $1{,}20$, $0{,}80$ og $1{,}10$. Prosentene regnes av ulike beløp.",
        [
          "a) $8000\\cdot 1{,}2 = 9600$ kr.",
          "b) $9600\\cdot 0{,}8 = 7680$ kr.",
          "c) Nei. Samlet vekstfaktor er $1{,}2\\cdot 0{,}8 = 0{,}96$, altså en nedgang på $4\\,\\%$. Nedsettelsen regnes av et større beløp enn økningen.",
          "d) $660 : 1{,}1 = 600$ kr.",
          "<strong>Svar:</strong> a) $9600$ kr b) $7680$ kr c) Nei, $7680$ kr er $4\\,\\%$ lavere d) $600$ kr",
        ],
        ["Nivå 2", "vekstfaktor"]),
      t("P7-d1-6", "6", 4,
        fig("P7-d1-6", "6", "figur 1, 2 og 3 av kvadratiske brikkemønstre: et (n+1)·(n+1)-kvadrat der én hjørnebrikke mangler; 3, 8 og 15 brikker") +
          U + "Figurene er laget av kvadratiske brikker. Figur $1$ har $3$ brikker, figur $2$ har $8$ og figur $3$ har $15$.<br>a) Hvor mange brikker har figur $4$?<br>b) Figur $n$ er et kvadrat med $n+1$ brikker langs hver side der én hjørnebrikke mangler. Vis at figur $n$ har $n^2 + 2n$ brikker.<br>c) Hvor mange brikker har figur $10$?<br>d) Finnes det en figur med $99$ brikker? Med $100$?",
        "Kvadratet har $(n+1)^2$ brikker. Trekk fra én.",
        [
          "a) $5^2 - 1 = 24$.",
          "b) $(n+1)^2 - 1 = n^2 + 2n + 1 - 1 = n^2 + 2n$.",
          "c) $100 + 20 = 120$.",
          "d) $(n+1)^2 = 100$ gir $n = 9$, så figur $9$ har $99$ brikker. $(n+1)^2 = 101$ er ikke et kvadrattall, så ingen figur har $100$.",
          "<strong>Svar:</strong> a) $24$ c) $120$ d) Ja, figur $9$. Nei for $100$.",
        ],
        ["Nivå 3", "figurtall", "generalisering"]),
    ],
    del2: [
      t("P7-d2-1", "1", 4,
        "Husleien for en hybel er $9500$ kr per måned i dag. Den øker med $4\\,\\%$ per år.<br>a) Hva er husleien om $3$ år?<br>b) Hvor mange prosent har husleien økt til sammen etter $5$ år?<br>c) Når passerer husleien $12\\,000$ kr?",
        "Vekstfaktoren er $1{,}04$.",
        [
          "a) $9500\\cdot 1{,}04^{3} \\approx 10\\,686$ kr.",
          "b) $1{,}04^{5} \\approx 1{,}217$, altså en økning på ca. $21{,}7\\,\\%$ (ikke $5\\cdot 4 = 20\\,\\%$).",
          "c) Løs $9500\\cdot 1{,}04^{x} = 12\\,000$ i CAS eller med graf: $x \\approx 5{,}96$.",
          "<strong>Svar:</strong> a) ca. $10\\,686$ kr b) ca. $21{,}7\\,\\%$ c) i løpet av år $6$",
        ],
        ["Nivå 1", "vekstfaktor", "eksponentiell vekst"]),
      t("P7-d2-2", "2", 3,
        "Tabellen viser massen $m$ kg av olivenolje for volumet $V$ liter.<br><br>$$\\begin{array}{c|c|c|c|c} V & 0{,}5 & 1 & 1{,}5 & 2{,}5 \\\\ \\hline m & 0{,}46 & 0{,}92 & 1{,}38 & 2{,}30 \\end{array}$$<br>a) Vis at massen er proporsjonal med volumet, og finn proporsjonalitetskonstanten.<br>b) Hvor mange liter er $5$ kg olivenolje?",
        "Regn ut $m : V$ for hvert par.",
        [
          "a) $m : V = 0{,}92$ for alle par, så $m = 0{,}92V$.",
          "b) $5 : 0{,}92 \\approx 5{,}43$ L.",
          "<strong>Svar:</strong> a) $k = 0{,}92$ kg/L b) ca. $5{,}43$ L",
        ],
        ["Nivå 1", "proporsjonalitet"]),
      t("P7-d2-3", "3", 4,
        fig("P7-d2-3", "3", "søylediagram: strømforbruk i kWh for en husholdning per måned jan–des. Andreakse «Forbruk (kWh)» 0–2500 med linjer for hver 100 og tall for hver 500. Verdier: jan 2100, feb 1900, mar 1600, apr 1200, mai 800, jun 600, jul 500, aug 600, sep 900, okt 1300, nov 1700, des 2000. Ingen tall skrevet på søylene") +
          "Diagrammet viser strømforbruket til en husholdning hver måned i ett år.<br>a) I hvilken måned var forbruket størst, og i hvilken var det minst? Les av forbruket i disse to månedene.<br>b) Hvor mange prosent lavere var forbruket i juli enn i januar?<br>c) Finn det samlede forbruket i året og gjennomsnittet per måned.<br>d) Strømmen kostet $1{,}25$ kr per kWh i desember. Hva kostet strømmen i desember?",
        "Les av hver søyle mot linjene på andreaksen. Prosentvis endring regnes av verdien i januar.",
        [
          "a) Størst i januar med $2100$ kWh, minst i juli med $500$ kWh.",
          "b) $\\dfrac{2100 - 500}{2100} \\approx 0{,}762$, altså ca. $76\\,\\%$ lavere. Svaret er i prosent og ikke prosentpoeng, fordi vi sammenligner to mengder (kWh) og ikke to prosenttall.",
          "c) Summen er $15\\,200$ kWh, og $15\\,200 : 12 \\approx 1267$ kWh per måned.",
          "d) $2000\\cdot 1{,}25 = 2500$ kr.",
          "<strong>Svar:</strong> a) januar $2100$ kWh, juli $500$ kWh b) ca. $76\\,\\%$ c) $15\\,200$ kWh, ca. $1267$ kWh d) $2500$ kr",
        ],
        ["Nivå 1", "diagram", "prosent"]),
      t("P7-d2-4", "4", 3,
        "En terrasse på $18\\ \\text{m}^2$ skal ha to strøk olje. $1$ L olje dekker $8\\ \\text{m}^2$ per strøk. Oljen selges i bokser på $2{,}5$ L til $449$ kr.<br>a) Hvor mye olje trengs?<br>b) Hva koster oljen?<br>c) Hvor mange prosent av oljen som blir kjøpt, blir til overs?",
        "To strøk betyr $36\\ \\text{m}^2$ som skal dekkes.",
        [
          "a) $36 : 8 = 4{,}5$ L.",
          "b) Det trengs $2$ bokser, $2\\cdot 449 = 898$ kr.",
          "c) Kjøpt $5$ L, til overs $0{,}5$ L. $0{,}5 : 5 = 10\\,\\%$.",
          "<strong>Svar:</strong> a) $4{,}5$ L b) $898$ kr c) $10\\,\\%$",
        ],
        ["Nivå 2", "måleenheter", "prosent"]),
      t("P7-d2-5", "5", 4,
        "En kinoklubb tar $140$ kr per billett for de fem første billettene i en måned. Fra og med billett nummer seks får du $25\\,\\%$ rabatt.<br>a) Lag et regneark som viser prisen for $1$ til $15$ billetter.<br>b) Hva koster $8$ billetter?<br>c) Hvor mange billetter kan du kjøpe for $1500$ kr?",
        "Rabattert billett koster $0{,}75\\cdot 140 = 105$ kr. Bruk HVIS i regnearket.",
        [
          "a) I B2: <code>=HVIS(A2&lt;=5; 140*A2; 700+105*(A2-5))</code>, fylles ned.",
          "b) $700 + 105\\cdot 3 = 1015$ kr.",
          "c) $700 + 105(n-5) \\le 1500$ gir $n - 5 \\le 7{,}6$, altså $n = 12$ billetter ($1435$ kr).",
          "<strong>Svar:</strong> b) $1015$ kr c) $12$ billetter",
        ],
        ["Nivå 2", "regneark", "prosent"]),
      t("P7-d2-6", "6", 5,
        "Tabellen viser antall følgere $F$ på en skolekanal $x$ måneder etter oppstart.<br><br>$$\\begin{array}{c|c|c|c|c|c} x & 0 & 2 & 4 & 6 & 8 \\\\ \\hline F & 1200 & 1700 & 2400 & 3400 & 4850 \\end{array}$$<br>a) Bruk eksponentiell regresjon og finn en modell for $F(x)$.<br>b) Hvor mange prosent øker antallet per måned ifølge modellen?<br>c) Når passerer antallet $10\\,000$ ifølge modellen?<br>d) Kommenter hvor lenge modellen kan gjelde.",
        "Bruk regresjonsverktøyet i GeoGebra. Vekstfaktoren minus $1$ gir prosentvis vekst.",
        [
          "a) $F(x) \\approx 1198\\cdot 1{,}190^{x}$.",
          "b) Vekstfaktor $1{,}190$, altså ca. $19\\,\\%$ per måned.",
          "c) $1198\\cdot 1{,}190^{x} = 10\\,000$ gir $x \\approx 12{,}2$.",
          "d) En slik vekst kan ikke fortsette lenge, for antall mulige følgere er begrenset.",
          "<strong>Svar:</strong> a) $F(x)\\approx 1198\\cdot 1{,}190^{x}$ b) ca. $19\\,\\%$ c) i løpet av måned $13$",
        ],
        ["Nivå 2", "regresjon", "modellering"]),
      t("P7-d2-7", "7", 4,
        "Et utleiefirma leier ut hoppeslott. Tabellen viser prisen $P$ kroner for $x$ timer.<br><br>$$\\begin{array}{c|c|c|c} x & 2 & 5 & 8 \\\\ \\hline P & 900 & 1500 & 2100 \\end{array}$$<br>a) Vis at sammenhengen er lineær, og finn en formel for $P(x)$.<br>b) Hva betyr tallene i formelen?<br>c) Er prisen proporsjonal med antall timer? Begrunn.<br>d) Hvor mange timer kan du leie for $3300$ kr?",
        "Regn ut endringen i pris per time mellom punktene.",
        [
          "a) Per time: $\\dfrac{1500-900}{3} = 200$ og $\\dfrac{2100-1500}{3} = 200$. Lik endring, altså lineær. $900 = 200\\cdot 2 + b$ gir $b = 500$, så $P(x) = 200x + 500$.",
          "b) $200$ kr per time og et fast beløp på $500$ kr.",
          "c) Nei. Grafen går ikke gjennom origo, for det faste beløpet er $500$ kr.",
          "d) $200x + 500 = 3300$ gir $x = 14$.",
          "<strong>Svar:</strong> a) $P(x)=200x+500$ b) $200$ kr/time, fast $500$ kr c) Nei d) $14$ timer",
        ],
        ["Nivå 2", "lineær funksjon", "proporsjonalitet"]),
      t("P7-d2-8", "8", 4,
        "En moped er verdt $20\\,000$ kr. Modell L: verdien synker med $2000$ kr per år. Modell E: verdien synker med $10\\,\\%$ per år.<br>a) Skriv en formel for hver modell, der $x$ er antall år.<br>b) Hva er verdien etter $2$ år i hver modell?<br>c) Når blir verdien $0$ kr i hver modell?<br>d) Når blir verdien i modell E lavere enn $5000$ kr?",
        "Lineær: fast beløp per år. Eksponentiell: fast vekstfaktor per år.",
        [
          "a) $L(x) = 20\\,000 - 2000x$ og $E(x) = 20\\,000\\cdot 0{,}9^{x}$.",
          "b) $L(2) = 16\\,000$ kr. $E(2) = 20\\,000\\cdot 0{,}81 = 16\\,200$ kr.",
          "c) $L(x)=0$ gir $x = 10$. I modell E blir verdien aldri $0$, for vi ganger alltid med $0{,}9$.",
          "d) $20\\,000\\cdot 0{,}9^{x} = 5000$ gir $0{,}9^{x} = 0{,}25$ og $x \\approx 13{,}2$. Verdien er under $5000$ kr i løpet av år $14$.",
          "<strong>Svar:</strong> b) $16\\,000$ kr og $16\\,200$ kr c) L: etter $10$ år, E: aldri d) i løpet av år $14$",
        ],
        ["Nivå 2", "lineær og eksponentiell"]),
      t("P7-d2-9", "9", 5,
        "Funksjonen $f$ er gitt ved $f(x) = x^2 - 4x + 3$.<br>a) Lag en verditabell for $x = 0, 1, 2, 3, 4$ og tegn grafen.<br>b) Finn nullpunktene og bunnpunktet.<br>c) Finn den gjennomsnittlige vekstfarten fra $x = 3$ til $x = 4$.<br>d) For hvilke $x$ er $f(x) < 0$? Forklar ut fra grafen.",
        "Sett inn hver $x$-verdi. Grafen er symmetrisk om bunnpunktet.",
        [
          "a) $f(0)=3$, $f(1)=0$, $f(2)=-1$, $f(3)=0$, $f(4)=3$.",
          "b) Nullpunkter $x=1$ og $x=3$. Bunnpunkt $(2\\,,\\,-1)$.",
          "c) $\\dfrac{f(4)-f(3)}{4-3} = \\dfrac{3-0}{1} = 3$.",
          "d) Grafen ligger under $x$-aksen mellom nullpunktene, så $f(x) < 0$ når $1 < x < 3$.",
          "<strong>Svar:</strong> b) $x=1$ og $x=3$, bunnpunkt $(2\\,,\\,-1)$ c) $3$ d) $1 < x < 3$",
        ],
        ["Nivå 2", "andregradsfunksjon", "vekstfart"]),
      t("P7-d2-10", "10", 4,
        "Høyden til en kule i et kulestøt er gitt ved $h(x) = -0{,}05x^2 + 0{,}9x + 2$, der $h$ er høyden i meter og $x$ er avstanden i meter langs bakken.<br>a) Tegn grafen og finn den største høyden.<br>b) Hvor langt går kulestøtet?<br>c) Finn den gjennomsnittlige vekstfarten fra $x = 0$ til $x = 5$, og forklar hva den betyr.<br>d) Hva betyr tallet $2$ i formelen?",
        "Bruk Ekstremalpunkt og Nullpunkt i GeoGebra.",
        [
          "a) Toppunkt $(9\\,,\\,6{,}05)$, største høyde $6{,}05$ m.",
          "b) $h(x)=0$ gir $x = 20$ (den negative løsningen forkastes).",
          "c) $h(5) = 5{,}25$, så $\\dfrac{5{,}25 - 2}{5} = 0{,}65$. Kula stiger i snitt $0{,}65$ m per meter bortover de første $5$ m.",
          "d) Kula slippes $2$ m over bakken.",
          "<strong>Svar:</strong> a) $6{,}05$ m b) $20$ m c) $0{,}65$ d) starthøyde $2$ m",
        ],
        ["Nivå 3", "andregradsfunksjon", "vekstfart"]),
      t("P7-d2-11", "11", 4,
        "Tallfølgen $5, 9, 15, 23, 33, \\ldots$ fortsetter etter samme mønster.<br>a) Bruk polynomregresjon av grad $2$ og finn en formel for tall nummer $n$.<br>b) Finn tall nummer $30$.<br>c) Hva er det største $n$ som gir et tall på høyst $2000$?<br>d) Er $1000$ med i følgen?",
        "Sett inn punktene $(1\\,,\\,5)$, $(2\\,,\\,9)$, $\\ldots$ i GeoGebra.",
        [
          "a) $a_n = n^2 + n + 3$.",
          "b) $900 + 30 + 3 = 933$.",
          "c) $44^2 + 44 + 3 = 1983$ og $45^2 + 45 + 3 = 2073$, så $n = 44$.",
          "d) $n^2 + n = 997$ har ingen heltallsløsning ($31\\cdot 32 = 992$), så nei.",
          "<strong>Svar:</strong> a) $n^2+n+3$ b) $933$ c) $n=44$ d) Nei",
        ],
        ["Nivå 3", "tallmønster", "regresjon"]),
      t("P7-d2-12", "12", 3,
        "Det tar $8$ timer for $6$ frivillige å rydde en strand. Vi antar at alle jobber like fort.<br>a) Hvor lang tid bruker $16$ frivillige?<br>b) Skriv en formel for tiden $T$ timer når $x$ frivillige rydder.<br>c) Hvor mange frivillige trengs for å bli ferdig på høyst $2{,}5$ timer?",
        "Antall personer og tid er omvendt proporsjonale: $x\\cdot T$ er konstant.",
        [
          "a) $6\\cdot 8 = 48$ timeverk, og $48 : 16 = 3$ timer.",
          "b) $T = \\dfrac{48}{x}$.",
          "c) $\\dfrac{48}{x} \\le 2{,}5$ gir $x \\ge 19{,}2$, altså minst $20$ frivillige.",
          "<strong>Svar:</strong> a) $3$ timer b) $T = \\dfrac{48}{x}$ c) $20$ frivillige",
        ],
        ["Nivå 3", "omvendt proporsjonalitet"]),
    ],
  },
];

export function findExam1P(id: string) {
  return EXAMS_1P.find((e) => e.id === id);
}
