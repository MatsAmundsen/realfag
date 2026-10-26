import { P1P_FIGURES } from "./figurer";
import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "../types";

/*
 * Matematikk 1P · Kapittel 5 Matematiske modeller (P5A–P5D, P5SM, P5OP).
 * Kilde: godkjente oppgaveark i 1p-bibliotek/ark/5A–5D-*-tekst-godkjent.md, med nye egne kontekster
 * der arket lignet for mye på læreboka. Alle tabeller er laget for oppgavene og er ikke ekte statistikk.
 * Id-er har P-prefiks så de aldri kolliderer med 1T: kapittel «p1kap5», delkapittel «P5A», oppgave «P5.1».
 * Regresjonsfasit er kontrollert med 1p-bibliotek/src/verify_p1kap5.py (samme metode som GeoGebra).
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
        : "<em>Med hjelpemidler: bruk GeoGebra (regneark og regresjonsanalyse).</em><br><br>";
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
  const svg = P1P_FIGURES[id];
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

/* ───────────────────────── P5A Variabler, modeller og overslag ───────────────────────── */

const dkP5A: Delkapittel = {
  id: "P5A",
  tittel: "5A Variabler, modeller og overslag",
  quiz: [
    q("Hva er en matematisk modell?", ["En forenklet beskrivelse av virkeligheten med matematikk", "En nøyaktig kopi av virkeligheten", "En tabell med målinger", "En graf uten tall"], 0, "En modell forenkler. Den tar med det viktigste og ser bort fra resten.", 1),
    q("Du velger hvor mange minutter du lader en mobil, og måler hvor mange prosent batteriet viser. Hva er den uavhengige variabelen?", ["Prosent på batteriet", "Prisen på strømmen", "Antall minutter du lader", "Begge er avhengige"], 2, "Det er tiden du velger. Batteriprosenten avhenger av tiden.", 1),
    q(r`En elsykkel koster 40 kr i startavgift og 25 kr per time. Hva betyr $t(k) = \dfrac{k - 40}{25}$?`, ["Prisen for $k$ timer", "Hvor mange timer du kan leie for $k$ kroner", "Prisen per time", "Startavgiften"], 1, r`Du trekker fra startavgiften og deler resten på prisen per time. Da får du antall timer.`, 2),
    q(r`Hva er arealet av et trapes med parallelle sider 4 m og 6 m og høyde 3 m?`, [r`$30\ \text{m}^2$`, r`$72\ \text{m}^2$`, r`$13\ \text{m}^2$`, r`$15\ \text{m}^2$`], 3, r`$\dfrac{(4 + 6) \cdot 3}{2} = 15$.`, 2),
    q("Lina måler temperaturen i deigen og hvor mye den hever seg. Hva slags metode er det?", ["Kvalitativ, fordi hun beskriver med ord", "Kvantitativ, fordi hun måler tall", "Ingen av dem", "Begge deler samtidig"], 1, "Kvantitativ metode bygger på tall og målinger.", 2),
    q("Antall timer en elev sover og karakteren på en prøve. Hva er riktig?", ["Det er vanskelig å si hva som er årsak og hva som er virkning", "Søvn er alltid årsaken", "Karakteren er alltid årsaken", "Det er ingen sammenheng"], 0, "Lite søvn kan gi dårligere karakter, men en vanskelig prøve kan også gi dårlig søvn.", 3),
  ],
  oppgaver: [
    o(
      "P5.1",
      1,
      "uten",
      "Hva er naturlig uavhengig variabel og avhengig variabel i hver sammenheng?" +
        del("a") + "Antall minutter en mobil lader og hvor mange prosent batteriet viser" +
        del("b") + "Temperaturen ute og antall is en kiosk selger" +
        del("c") + "Alderen til et grantre og høyden til treet",
      "Den uavhengige variabelen er den vi velger eller kjenner. Den avhengige variabelen avhenger av den.",
      [
        "<strong>a)</strong> Uavhengig: antall minutter. Avhengig: batteriprosenten.",
        "<strong>b)</strong> Uavhengig: temperaturen. Avhengig: antall is.",
        "<strong>c)</strong> Uavhengig: alderen. Avhengig: høyden.<br><strong>Svar:</strong> Se over.",
      ],
    ),
    o(
      "P5.2",
      1,
      "uten",
      ikkeEkte +
        r`Tabellen viser hva det koster å leie en elsykkel i $x$ timer.` +
        tab(["Timer, $x$", [1, 2, 3, 4]], ["Pris (kr)", [65, 90, 115, 140]]) +
        r`<strong>a)</strong> Hvor mye øker prisen per time? Hva er startavgiften (prisen for 0 timer)?` +
        del("b") + r`Lag en modell $p(x)$ for prisen når du leier i $x$ timer. Hva koster 2,5 timer?` +
        del("c") + r`Lag en modell $t(k)$ for hvor mange timer du kan leie for $k$ kroner.` +
        del("d") + "Hvor mange timer kan du leie for 190 kr?",
      "Se hvor mye prisen øker fra én time til den neste. Gå én time tilbake for å finne startavgiften.",
      [
        r`<strong>a)</strong> Prisen øker med $90 - 65 = 25$ kr per time. Startavgiften er $65 - 25 = 40$ kr.`,
        r`<strong>b)</strong> $p(x) = 25x + 40$ og $p(2{,}5) = 62{,}5 + 40 = 102{,}5$`,
        r`<strong>c)</strong> Trekk fra startavgiften og del på prisen per time: $t(k) = \dfrac{k - 40}{25}$`,
        r`<strong>d)</strong> $t(190) = \dfrac{150}{25} = 6$<br><strong>Svar:</strong> a) 25 kr per time, 40 kr i startavgift. b) 102,50 kr. d) 6 timer.`,
      ],
    ),
    o(
      "P5.3",
      1,
      "uten",
      "Ida lager en kopp te og måler temperaturen mens teen står og avkjøles." +
        tab(["Tid (minutter)", [0, 4, 8, 12]], ["Temperatur (°C)", [80, 66, 55, 46]]) +
        "<strong>a)</strong> Hva er uavhengig og avhengig variabel?" +
        del("b") + "Hvor mye endret temperaturen seg fra minutt 4 til minutt 12?" +
        del("c") + "Hvor mye endret temperaturen seg i gjennomsnitt per minutt i denne perioden?",
      "Endring = siste verdi − første verdi. Del på antall minutter.",
      [
        "<strong>a)</strong> Uavhengig: tiden. Avhengig: temperaturen.",
        r`<strong>b)</strong> $46 - 66 = -20$. Temperaturen sank med 20 °C.`,
        r`<strong>c)</strong> $\dfrac{-20}{12 - 4} = \dfrac{-20}{8} = -2{,}5$<br><strong>Svar:</strong> b) $-20$ °C. c) $-2{,}5$ °C per minutt, altså sank temperaturen med 2,5 °C per minutt.`,
      ],
    ),
    o(
      "P5.4",
      2,
      "uten",
      r`En drone flyr med farten 12 m/s hele tiden. Vi bruker $s = v \cdot t$.` +
        del("a") + r`Lag en modell $s(t)$ for hvor mange meter dronen flyr på $t$ sekunder.` +
        del("b") + r`Lag en modell $T(s)$ for hvor mange sekunder dronen bruker på $s$ meter.` +
        del("c") + "Bruk modellene til å finne hvor langt dronen flyr på 25 sekunder, og hvor lang tid den bruker på 180 meter.",
      r`I b) løser du $s = 12t$ med hensyn på $t$.`,
      [
        r`<strong>a)</strong> $s(t) = 12t$`,
        r`<strong>b)</strong> $T(s) = \dfrac{s}{12}$`,
        r`<strong>c)</strong> $s(25) = 12 \cdot 25 = 300$ og $T(180) = \dfrac{180}{12} = 15$<br><strong>Svar:</strong> 300 m og 15 sekunder`,
      ],
    ),
    o(
      "P5.5",
      2,
      "uten",
      "Et blomsterbed i en park består av et trapes og en trekant.<br><br>" +
        fig("P5.5", "Blomsterbed sett ovenfra, ingen akser. Et trapes med de parallelle sidene 4 m (øverst) og 6 m (nederst) og høyde 3 m (stiplet linje mellom de parallelle sidene). Under den nederste siden står en trekant med grunnlinje 6 m (felles med trapeset) og høyde 2 m, med spissen ned. Mål skrevet ved sidene.") +
        "<strong>a)</strong> Finn arealet av trapeset og av trekanten." +
        del("b") + "Finn arealet av hele bedet." +
        del("c") + "En sekk jord holder til 3 m² av bedet. Hvor mange sekker trengs?",
      r`Trapes: $\dfrac{(a + b) \cdot h}{2}$. Trekant: $\dfrac{g \cdot h}{2}$.`,
      [
        r`<strong>a)</strong> Trapes: $\dfrac{(4 + 6) \cdot 3}{2} = 15$ m². Trekant: $\dfrac{6 \cdot 2}{2} = 6$ m².`,
        r`<strong>b)</strong> $15 + 6 = 21$ m²`,
        r`<strong>c)</strong> $\dfrac{21}{3} = 7$<br><strong>Svar:</strong> a) 15 m² og 6 m². b) 21 m². c) 7 sekker`,
      ],
    ),
    o(
      "P5.6",
      2,
      "kalk",
      "Er det plass til alle elevene i grunnskolen i Norge på én fotballbane? Anta at det er omtrent 640 000 elever, og at banen er 105 m lang og 68 m bred." +
        del("a") + "Finn arealet av banen." +
        del("b") + "Hvor mange elever blir det per m²?" +
        del("c") + "Hvor mange personer tror du kan stå på 1 m²? Hva er svaret på spørsmålet?",
      "Del antall elever på arealet.",
      [
        r`<strong>a)</strong> $105 \cdot 68 = 7140$ m²`,
        r`<strong>b)</strong> $\dfrac{640\,000}{7140} \approx 89{,}6$, altså omtrent 90 elever per m².`,
        "<strong>c)</strong> For eksempel 4–5 personer per m². Da er det ikke plass.<br><strong>Svar:</strong> a) 7140 m². b) Omtrent 90 elever per m². c) Nei.",
      ],
    ),
    o(
      "P5.7",
      3,
      "kalk",
      "Hvor mange liter vann bruker elevene på en skole i dusjen i løpet av et år? Anta at skolen har 400 elever, at hver elev dusjer 2 ganger i uka i 6 minutter, og at dusjen bruker 9 liter per minutt." +
        del("a") + "Gjør et overslag for et helt år (52 uker)." +
        del("b") + "Elevene dusjer kanskje bare hjemme i skoleukene. Gjør overslaget på nytt med 38 uker." +
        del("c") + "Hvilke av antakelsene er mest usikre? Hvordan påvirker de svaret?",
      "Gang sammen: elever · ganger per uke · minutter · liter per minutt · uker.",
      [
        r`<strong>a)</strong> $400 \cdot 2 \cdot 6 \cdot 9 \cdot 52 = 2\,246\,400$, altså omtrent 2,2 millioner liter.`,
        r`<strong>b)</strong> $400 \cdot 2 \cdot 6 \cdot 9 \cdot 38 = 1\,641\,600$, altså omtrent 1,6 millioner liter.`,
        "<strong>c)</strong> For eksempel hvor ofte og hvor lenge elevene dusjer. Dobbelt så lang dusjtid gir dobbelt så mye vann.<br><strong>Svar:</strong> a) Omtrent 2,2 millioner liter. b) Omtrent 1,6 millioner liter.",
      ],
    ),
    o(
      "P5.8",
      3,
      "uten",
      "Lina vil finne ut hvordan temperaturen påvirker hvor mye en brøddeig hever seg." +
        del("a") + "Hva er uavhengig og avhengig variabel?" +
        del("b") + "Hvilke andre forhold må hun holde like for at forsøket skal være kontrollert?" +
        del("c") + "Er dette en kvantitativ eller en kvalitativ metode? Begrunn svaret.",
      "Bare én ting skal endres om gangen.",
      [
        "<strong>a)</strong> Uavhengig: temperaturen. Avhengig: hvor mye deigen hever seg (volumet).",
        "<strong>b)</strong> For eksempel samme mengde gjær, mel og vann, samme tid og samme bolle.",
        "<strong>c)</strong> Kvantitativ, fordi hun måler tall (temperatur og volum).<br><strong>Svar:</strong> Se over.",
      ],
    ),
    o(
      "P5.9",
      3,
      "uten",
      "Se på sammenhengene:<br>1. Antall minutter og antall sekunder<br>2. Alderen og høyden til et barn<br>3. Antall timer en elev sover og karakteren på en prøve<br>4. Lengden og vekten til et tau" +
        del("a") + "For hvilke sammenhenger kan vi velge fritt hva som er uavhengig variabel?" +
        del("b") + "For hvilke er valget opplagt?" +
        del("c") + "For hvilke er det vanskelig å si hva som er årsak og hva som er virkning? Begrunn svaret.",
      "Kan du regne begge veier? Kan den ene størrelsen påvirke den andre?",
      [
        "<strong>a)</strong> 1 og 4. Vi kan regne begge veier.",
        "<strong>b)</strong> 2. Alderen påvirker høyden, ikke omvendt.",
        "<strong>c)</strong> 3. Lite søvn kan gi dårligere karakter, men en vanskelig prøve kan også gi dårlig søvn. Andre forhold kan påvirke begge.<br><strong>Svar:</strong> a) 1 og 4. b) 2. c) 3.",
      ],
    ),
  ],
};

/* ───────────────────────── P5B Regresjon fra data ───────────────────────── */

const dkP5B: Delkapittel = {
  id: "P5B",
  tittel: "5B Regresjon fra data",
  quiz: [
    q("Hva betyr regresjon?", ["Å tegne punkter i et koordinatsystem", "Å regne ut gjennomsnittet", "Å finne den funksjonen som passer best til punktene", "Å fjerne punkter som ikke passer"], 2, "Regresjon kalles også kurvetilpasning.", 1),
    q("Punktene har et tydelig toppunkt. Hvilken modell passer best?", ["Andregrad", "Lineær", "Eksponentiell", "Potens"], 0, "En andregradsfunksjon har ett toppunkt eller ett bunnpunkt.", 1),
    q(r`En modell er $g(x) = 800 \cdot 1{,}06^x$. Hva forteller tallet $1{,}06$?`, ["En økning på 1,06 per gang $x$ øker med 1", "En økning på 106 %", "En økning på 0,06 %", "En økning på 6 % per gang $x$ øker med 1"], 3, r`Vekstfaktoren $1{,}06 = 100\,\% + 6\,\%$.`, 2),
    q("Punktene øker mer og mer og går gjennom origo. Hvilken modell kan passe?", ["Eksponentiell", "Lineær med konstantledd", "Potens", "Ingen modell"], 2, "En eksponentiell modell går aldri gjennom origo. En potensmodell kan gjøre det.", 2),
    q("Modellen gir 210, men du målte 200. Hvor stort er avviket i prosent av det målte tallet?", ["10 %", "5 %", "4,8 %", "2,1 %"], 1, r`$\dfrac{210 - 200}{200} \cdot 100\,\% = 5\,\%$.`, 2),
    q("To modeller passer like godt. Den ene har 2 parametre, den andre har 3. Hvilken velger du etter Ockhams barberkniv?", ["Den med 3 parametre", "Den som gir størst svar", "Begge er like gode valg", "Den med 2 parametre"], 3, "Ockhams barberkniv: Velg den enkleste modellen som passer godt.", 3),
  ],
  oppgaver: [
    o(
      "P5.10",
      1,
      "uten",
      "Tabellen viser hvor mange sider Aksel har lest i en bok." +
        tab(["Dager, $x$", [0, 1, 3, 4, 6]], ["Sider, $y$", [0, 22, 58, 84, 118]]) +
        fig("P5.10", "Tomt koordinatsystem. Førsteaksen fra 0 til 7 med merker og tall for hver 1. Andreaksen fra 0 til 140 med merker for hver 10 og tall for hver 20. Aksetitler «Dager» og «Sider».") +
        "<strong>a)</strong> Tegn punktene i koordinatsystemet." +
        del("b") + "Tegn en rett linje som passer godt til punktene." +
        del("c") + "Bruk linja til å anslå hvor mange sider Aksel har lest etter 5 dager.",
      "Linja skal ligge midt mellom punktene. Omtrent like mange punkter over som under.",
      [
        "<strong>a)</strong> Tegning med de fem punktene.",
        `<strong>b)</strong> For eksempel en linje gjennom ${pt(0, 0)} og ${pt(6, 120)}.`,
        "<strong>c)</strong> Les av ved 5 dager.<br><strong>Svar:</strong> c) Omtrent 100 sider. Svar mellom 95 og 105 er rimelige.",
      ],
    ),
    o(
      "P5.11",
      1,
      "med",
      ikkeEkte +
        r`Tabellen viser antall lånere i et bibliotek. $x$ er antall år etter 2015.` +
        tab(["$x$", [0, 1, 3, 4, 6, 8]], ["Lånere", [5200, 5290, 5450, 5560, 5700, 5890]]) +
        r`<strong>a)</strong> Bruk lineær regresjon til å finne en modell $f(x)$.` +
        del("b") + "Hva forteller stigningstallet om antall lånere?" +
        del("c") + "Bruk modellen til å anslå antall lånere i 2020 og i 2027.",
      r`2020 svarer til $x = 5$, og 2027 svarer til $x = 12$.`,
      [
        r`<strong>a)</strong> GeoGebra: $f(x) = 85{,}37x + 5201{,}99$`,
        "<strong>b)</strong> Antall lånere øker med omtrent 85 per år.",
        r`<strong>c)</strong> $f(5) \approx 5629$ og $f(12) \approx 6226$.<br><strong>Svar:</strong> 2020: omtrent 5629. 2027: omtrent 6226.`,
      ],
    ),
    o(
      "P5.12",
      1,
      "uten",
      "Figuren viser fire oversiktsdiagrammer A–D.<br><br>" +
        fig("P5.12", "Fire små koordinatsystemer A–D. Førsteaksen fra 0 til 6 med merker og tall for hver 1. Andreaksen fra 0 til 12 med merker og tall for hver 2. A: punktene (0 , 1), (1 , 2,6), (2 , 3,9), (3 , 5,6), (4 , 7), (5 , 8,4), (6 , 10). B: (0 , 10), (1 , 5,8), (2 , 3,2), (3 , 2), (4 , 3), (5 , 6), (6 , 10,2). C: (0 , 11,5), (1 , 7,8), (2 , 5,2), (3 , 3,5), (4 , 2,3), (5 , 1,5), (6 , 1). D: (0 , 0), (1 , 0,3), (2 , 1,2), (3 , 2,7), (4 , 4,8), (5 , 7,5), (6 , 10,8).") +
        "Hvilken modell passer best til hvert diagram: lineær, andregrad, eksponentiell eller potens? Begrunn kort.",
      "Ligger punktene på en linje? Har de topp- eller bunnpunkt? Går de gjennom origo?",
      [
        "A: lineær, fordi punktene ligger omtrent på en rett linje.",
        "B: andregrad, fordi punktene har et bunnpunkt.",
        "C: eksponentiell, fordi punktene avtar mindre og mindre og starter over origo.",
        r`D: potens eller andregrad, fordi punktene øker mer og mer og går gjennom origo. Punktene ligger på $y = 0{,}3x^2$, som er både en potensfunksjon og en andregradsfunksjon.<br><strong>Svar:</strong> A lineær, B andregrad, C eksponentiell, D potens (eller andregrad).`,
      ],
    ),
    o(
      "P5.13",
      1,
      "med",
      ikkeEkte +
        r`Tabellen viser antall følgere på kontoen til en bedrift. $x$ er antall måneder etter at kontoen ble opprettet.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5]], ["Følgere", [1200, 1390, 1610, 1850, 2150, 2490]]) +
        r`<strong>a)</strong> Bruk eksponentiell regresjon til å finne en modell $g(x) = a \cdot b^x$.` +
        del("b") + "Med hvor mange prosent øker antall følgere per måned ifølge modellen?" +
        del("c") + r`Når passerer kontoen 4000 følgere ifølge modellen?`,
      r`Velg «Eksponentiell» i regresjonsanalysen. I c) finner du skjæringen mellom grafen og linja $y = 4000$.`,
      [
        r`<strong>a)</strong> GeoGebra: $g(x) = 1200{,}47 \cdot 1{,}1568^x$`,
        r`<strong>b)</strong> $1{,}1568 = 100\,\% + 15{,}68\,\%$, altså omtrent $15{,}7\,\%$ per måned.`,
        r`<strong>c)</strong> Skjæring ved $x \approx 8{,}3$.<br><strong>Svar:</strong> b) Omtrent 15,7 %. c) Etter omtrent 8,3 måneder, altså i løpet av måned 9.`,
      ],
    ),
    o(
      "P5.14",
      2,
      "med",
      ikkeEkte +
        r`En minigolfbane har prøvd ulike billettpriser og funnet overskuddet per måned. $x$ er prisen i kroner.` +
        tab(["Pris, $x$", [20, 40, 60, 80, 100]], ["Overskudd (kr)", [2000, 6500, 8400, 7900, 4800]]) +
        "<strong>a)</strong> Forklar hvorfor en andregradsmodell passer." +
        del("b") + r`Bruk regresjon til å finne en andregradsmodell $O(x)$.` +
        del("c") + "Hvilken pris gir størst overskudd? Hvor stort er det?" +
        del("d") + "For hvilke priser er overskuddet minst 5000 kr?",
      r`Velg «Polynom» med grad 2. Bruk Ekstremalpunkt, og skjæring med $y = 5000$.`,
      [
        "<strong>a)</strong> Punktene stiger og synker igjen, og har et toppunkt.",
        r`<strong>b)</strong> GeoGebra: $O(x) = -3{,}14x^2 + 412{,}14x - 4980$`,
        r`<strong>c)</strong> Toppunkt omtrent $(65{,}6\,,\,8532)$.`,
        r`<strong>d)</strong> Skjæring med $y = 5000$ ved $x \approx 32{,}0$ og $x \approx 99{,}1$.<br><strong>Svar:</strong> c) Omtrent 66 kr gir størst overskudd, omtrent 8530 kr. d) Fra omtrent 32 kr til omtrent 99 kr.`,
      ],
    ),
    o(
      "P5.15",
      2,
      "med",
      ikkeEkte +
        r`Noen elever lager kuler av modelleire og måler diameteren og massen.` +
        tab(["Diameter (mm), $x$", [20, 30, 40, 50, 60]], ["Masse (g)", ["8,2", "26,5", "64,8", 124, 217]]) +
        "<strong>a)</strong> Hvorfor er det rimelig at grafen går gjennom origo?" +
        del("b") + r`Bruk potensregresjon til å finne en modell $m(x) = a \cdot x^b$.` +
        del("c") + "Hva er massen til en kule med diameter 45 mm?" +
        del("d") + "Hvor stor er diameteren til en kule som veier 100 g?",
      r`Velg «Potens». I d) finner du skjæringen med $y = 100$.`,
      [
        "<strong>a)</strong> En kule med diameter 0 har masse 0.",
        r`<strong>b)</strong> GeoGebra: $m(x) = 0{,}00106 \cdot x^{2{,}986}$ (avrundet)`,
        r`<strong>c)</strong> $m(45) \approx 91$`,
        r`<strong>d)</strong> Skjæring ved $x \approx 46{,}4$.<br><strong>Svar:</strong> c) Omtrent 91 g. d) Omtrent 46,4 mm.`,
      ],
    ),
    o(
      "P5.16",
      2,
      "med",
      ikkeEkte +
        r`Tabellen viser prisen på en konsertbillett. $x$ er antall år etter 2016.` +
        tab(["$x$", [0, 2, 4, 6, 8]], ["Pris (kr)", [400, 432, 470, 505, 548]]) +
        "<strong>a)</strong> Finn en lineær modell og en eksponentiell modell." +
        del("b") + "Tolk stigningstallet og vekstfaktoren i denne sammenhengen." +
        del("c") + "Hva blir prisen i 2028 ifølge hver av modellene?",
      r`2028 svarer til $x = 12$.`,
      [
        r`<strong>a)</strong> Lineær: $f(x) = 18{,}45x + 397{,}2$. Eksponentiell: $g(x) = 400{,}03 \cdot 1{,}0401^x$.`,
        "<strong>b)</strong> Prisen øker med omtrent 18 kr per år (lineær), eller med omtrent 4,0 % per år (eksponentiell).",
        r`<strong>c)</strong> $f(12) \approx 619$ og $g(12) \approx 641$.<br><strong>Svar:</strong> Lineær: omtrent 619 kr. Eksponentiell: omtrent 641 kr.`,
      ],
    ),
    o(
      "P5.17",
      2,
      "med",
      "Se på modellen i oppgave P5.13. Etter 10 måneder hadde kontoen 4900 følgere." +
        del("a") + r`Hva gir modellen for $x = 10$?` +
        del("b") + "Hvor stort er avviket i prosent av det målte tallet?",
      r`Avvik i prosent = $\dfrac{\text{modell} - \text{målt}}{\text{målt}} \cdot 100\,\%$.`,
      [
        r`<strong>a)</strong> $g(10) \approx 5150$`,
        r`<strong>b)</strong> $\dfrac{5150 - 4900}{4900} \cdot 100\,\% \approx 5{,}1\,\%$<br><strong>Svar:</strong> a) Omtrent 5150 følgere. b) Omtrent 5,1 %.`,
      ],
    ),
    o(
      "P5.18",
      3,
      "med",
      ikkeEkte +
        r`Tabellen viser antall medlemmer i en klatreklubb. $x$ er antall år etter 2016.` +
        tab(["$x$", [0, 2, 4, 6, 8]], ["Medlemmer", [50, 58, 68, 79, 92]]) +
        "<strong>a)</strong> Finn en eksponentiell modell og en andregradsmodell." +
        del("b") + "Sammenlign hvor godt modellene passer med tabellen." +
        del("c") + "Hvor mange parametre har hver modell? Hvilken modell vil du velge etter Ockhams barberkniv?" +
        del("d") + "Hva gir modellene for 2036? Hva sier det om å bruke modellene langt fram i tid?",
      r`2036 svarer til $x = 20$. Tell tallene du må velge i hvert uttrykk.`,
      [
        r`<strong>a)</strong> Eksponentiell: $f(x) = 49{,}95 \cdot 1{,}0794^x$. Andregrad: $g(x) = 0{,}196x^2 + 3{,}679x + 49{,}97$.`,
        "<strong>b)</strong> Begge passer svært godt. Avvikene er under 0,3 medlemmer.",
        "<strong>c)</strong> Eksponentiell: 2 parametre. Andregrad: 3 parametre. Ockhams barberkniv: Velg den eksponentielle.",
        r`<strong>d)</strong> $f(20) \approx 230$ og $g(20) \approx 202$. Modellene er nesten like innenfor tabellen, men gir ulike svar langt fram i tid. Prognoser langt fram er usikre.<br><strong>Svar:</strong> d) Omtrent 230 og 202 medlemmer.`,
      ],
    ),
    o(
      "P5.19",
      3,
      "med",
      ikkeEkte +
        r`Tabellen viser vannstanden i en havn, målt i forhold til et merke på kaia. $x$ er antall timer etter kl. 06.00.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5, 6, 7, 8]], ["Vannstand (m)", ["4,4", "4,6", "4,4", "4,0", "3,4", "2,7", "2,2", "2,0", "2,1"]]) +
        r`<strong>a)</strong> Bruk regresjon til å finne en tredjegradsmodell $v(x)$.` +
        del("b") + r`Finn toppunktet og bunnpunktet på grafen mellom $x = 0$ og $x = 8$. Hva forteller de?` +
        del("c") + "Hvorfor passer ikke en andregradsmodell her?",
      "Velg «Polynom» med grad 3. Bruk Ekstremalpunkt.",
      [
        r`<strong>a)</strong> GeoGebra: $v(x) = 0{,}0221x^3 - 0{,}2727x^2 + 0{,}4793x + 4{,}387$`,
        r`<strong>b)</strong> Toppunkt omtrent $(1{,}00\,,\,4{,}62)$: høyvann ca. kl. 07.00 på 4,6 m. Bunnpunkt omtrent $(7{,}21\,,\,1{,}96)$: lavvann ca. kl. 13.13 på 2,0 m.`,
        "<strong>c)</strong> Punktene har både et toppunkt og et bunnpunkt. En andregradsfunksjon har bare ett av dem.<br><strong>Svar:</strong> b) Høyvann ca. kl. 07.00, lavvann ca. kl. 13.13.",
      ],
    ),
    o(
      "P5.20",
      3,
      "med",
      "Elin har fått oppgitt denne tabellen:" +
        tab(["$x$", [1, 2, 4, 5, 10]], ["$y$", [30, 15, "7,5", 6, 3]]) +
        "<strong>a)</strong> Bruk potensregresjon til å finne en modell." +
        del("b") + "Modellen passer perfekt. Hva tyder det på om tallene? Er de målt?",
      r`Se på $x \cdot y$ for hvert tallpar.`,
      [
        r`<strong>a)</strong> GeoGebra: $y = 30 \cdot x^{-1} = \dfrac{30}{x}$`,
        r`<strong>b)</strong> Målinger passer aldri helt perfekt. $x \cdot y = 30$ for alle tallparene, så tallene er trolig laget med formelen $y = \dfrac{30}{x}$.<br><strong>Svar:</strong> a) $y = \dfrac{30}{x}$. b) Nei, trolig ikke målt.`,
      ],
    ),
  ],
};

/* ───────────────────────── P5C Gyldighet og prognoser ───────────────────────── */

const dkP5C: Delkapittel = {
  id: "P5C",
  tittel: "5C Gyldighet og prognoser",
  quiz: [
    q("En modell bygger på målinger fra 2010 til 2020. Du bruker den for 2015. Hva kalles det?", ["Ekstrapolasjon", "Regresjon", "Prognose langt fram", "Interpolasjon"], 3, "Inter betyr mellom. 2015 ligger mellom de målte årene.", 1),
    q("Hva er gyldighetsområdet til en modell?", ["Alle tall", r`De verdiene av $x$ der modellen gir rimelige svar`, r`Bare $x = 0$`, "De verdiene modellen ikke kan brukes for"], 1, "Utenfor gyldighetsområdet kan modellen gi urimelige svar.", 1),
    q(r`I modellen $h(t) = 40t + 30$ er $t$ alderen i år. Hva betyr tallet $30$?`, [r`Verdien når $t = 0$, altså startverdien`, "Veksten per år", "Den største verdien", "Antall år modellen gjelder"], 0, "Konstantleddet er verdien når den uavhengige variabelen er 0.", 2),
    q("Hvilken modell kan vi stole mest på når vi ekstrapolerer?", ["En modell for hva folk kjøper", "En modell for kinobesøk", "En modell som bygger på en naturlov", "Alle er like sikre"], 2, "En naturlov gjelder hver gang. Hva folk gjør, kan endre seg.", 2),
    q("Hva betyr det at en prognose bygger på «business as usual»?", ["At utviklingen fortsetter som før", "At alt endrer seg", "At modellen er laget av en bedrift", "At prognosen alltid slår til"], 0, "Prognosen antar at ingenting stort endrer seg.", 2),
    q(r`Hvordan skriver du en delt funksjon i GeoGebra som er $f$ for $x \le 5$ og $g$ ellers?`, [r`Dersom(f(x), g(x), x <= 5)`, r`Dersom(x <= 5, f(x), g(x))`, r`Delt(f, g, 5)`, r`f(x) + g(x)`], 1, "Først betingelsen, så funksjonen når betingelsen er oppfylt, så funksjonen ellers.", 3),
  ],
  oppgaver: [
    o(
      "P5.21",
      1,
      "uten",
      "En modell er laget av målinger fra årene 2010 til 2020. Er det interpolasjon eller ekstrapolasjon å bruke modellen for" +
        "<br><br><strong>a)</strong> 2014" +
        del("b") +
        "2030" +
        del("c") +
        "2005" +
        del("d") +
        "midt i 2019",
      "Ligger året mellom 2010 og 2020, eller utenfor?",
      [
        "<strong>a)</strong> 2014 ligger mellom 2010 og 2020: interpolasjon.",
        "<strong>b)</strong> 2030 ligger utenfor: ekstrapolasjon.",
        "<strong>c)</strong> 2005 ligger utenfor: ekstrapolasjon.",
        "<strong>d)</strong> Midt i 2019 ligger mellom 2010 og 2020: interpolasjon.<br><strong>Svar:</strong> a) Interpolasjon. b) Ekstrapolasjon. c) Ekstrapolasjon. d) Interpolasjon.",
      ],
    ),
    o(
      "P5.22",
      1,
      "med",
      ikkeEkte +
        r`Tabellen viser høyden til en solsikke. $x$ er antall uker etter at den ble plantet ut.` +
        tab(["$x$", [0, 2, 4, 6, 8]], ["Høyde (cm)", [5, 16, 29, 41, 52]]) +
        r`<strong>a)</strong> Bruk lineær regresjon til å finne en modell $f(x)$.` +
        del("b") + "Hvor høy er solsikken etter 5 uker ifølge modellen? Er det interpolasjon eller ekstrapolasjon?" +
        del("c") + "Hvor høy er solsikken etter 2 år (104 uker) ifølge modellen? Er svaret rimelig?" +
        del("d") + "Foreslå et gyldighetsområde for modellen.",
      r`Regn ut $f(5)$ og $f(104)$.`,
      [
        r`<strong>a)</strong> GeoGebra: $f(x) = 5{,}95x + 4{,}8$`,
        r`<strong>b)</strong> $f(5) \approx 34{,}6$. Interpolasjon.`,
        r`<strong>c)</strong> $f(104) \approx 624$ cm, altså over 6 m. Nei, en solsikke vokser ikke slik i to år. Den visner om høsten.`,
        r`<strong>d)</strong> For eksempel $0 \le x \le 10$.<br><strong>Svar:</strong> b) Omtrent 34,6 cm. c) Omtrent 624 cm, urimelig.`,
      ],
    ),
    o(
      "P5.23",
      1,
      "uten",
      r`Høyden til et bjørketre er gitt ved $h(t) = 40t + 30$, der $t$ er alderen i år og $h(t)$ er høyden i cm.` +
        del("a") + r`Regn ut $h(5)$.` +
        del("b") + r`Regn ut $h(150)$. Er svaret rimelig?` +
        del("c") + r`Hva er startverdien ifølge modellen? Et frø som nettopp har spirt, er bare noen få cm høyt. Passer modellen da?` + del("d") + "Modellen er laget av målinger av trær mellom 2 og 15 år. Bruk b) og c) til å foreslå et gyldighetsområde.",
      r`Startverdien er $h(0)$.`,
      [
        r`<strong>a)</strong> $h(5) = 40 \cdot 5 + 30 = 230$`,
        r`<strong>b)</strong> $h(150) = 6000 + 30 = 6030$ cm, altså omtrent 60 m. Nei, bjørketrær blir ikke så høye.`,
        r`<strong>c)</strong> $h(0) = 30$ cm. Det passer ikke med et frø som nettopp har spirt. Modellen passer ikke for $t = 0$.`,
        r`<strong>d)</strong> Modellen passer ikke for $t = 0$ (c) og gir urimelige svar langt fram i tid (b). Vi holder oss til de målte aldrene: for eksempel $2 \le t \le 15$.<br><strong>Svar:</strong> a) 230 cm. b) 6030 cm, urimelig. c) 30 cm, passer ikke. d) For eksempel $2 \le t \le 15$.`,
      ],
    ),
    o(
      "P5.24",
      2,
      "med",
      ikkeEkte +
        r`Tabellen viser antall medlemmer i et idrettslag, i hundre. $x$ er antall år etter 1970.` +
        tab(["$x$", [0, 10, 20, 30, 40, 50]], ["Medlemmer (hundre)", ["12,0", "14,5", "16,2", "17,0", "17,8", "19,5"]]) +
        "<strong>a)</strong> Bruk regresjon til å finne en tredjegradsmodell." +
        del("b") + "Bruk modellen til å anslå antall medlemmer i 1995. Er det interpolasjon eller ekstrapolasjon?" +
        del("c") + "Hva gir modellen for 2030 og for 2060? Vurder svarene." +
        del("d") + "Foreslå et gyldighetsområde for modellen.",
      r`1995 svarer til $x = 25$, 2030 til $x = 60$ og 2060 til $x = 90$.`,
      [
        r`<strong>a)</strong> GeoGebra: $f(x) \approx 0{,}000104x^3 - 0{,}00913x^2 + 0{,}348x + 11{,}96$. Bruk modellen uavrundet.`,
        r`<strong>b)</strong> $f(25) \approx 16{,}6$, altså omtrent 1660 medlemmer. Interpolasjon.`,
        r`<strong>c)</strong> $f(60) \approx 22{,}3$ og $f(90) \approx 44{,}9$, altså omtrent 2230 og 4490 medlemmer. Begge er ekstrapolasjon. Bruker du de avrundede tallene fra a), får du omtrent 22,4 og 45,1. Det er ikke feil, men forskjellen kommer av avrundingen. Tallet for 2060 er urimelig, fordi modellen vokser stadig raskere.`,
        r`<strong>d)</strong> For eksempel $0 \le x \le 50$.<br><strong>Svar:</strong> b) Omtrent 1660. c) Omtrent 2230 og 4490.`,
      ],
    ),
    o(
      "P5.25",
      2,
      "med",
      ikkeEkte +
        "En elev tester hvor lenge mobilen holder med ulik lysstyrke på skjermen. Hver lysstyrke er testet to ganger, med full lading hver gang." +
        tab(["Lysstyrke (%), $x$", [20, 20, 40, 40, 60, 60, 80, 80]], ["Batteritid (timer)", ["14,6", "14,2", "12,9", "13,3", "11,6", "11,9", "10,4", "10,0"]]) +
        r`<strong>a)</strong> Bruk lineær regresjon til å finne en modell $B(x)$.` +
        del("b") + "Hvor mye endrer batteritiden seg når lysstyrken øker med 10 prosentpoeng?" +
        del("c") + "Hva gir modellen for lysstyrke 50 %? Er det interpolasjon eller ekstrapolasjon?" +
        del("d") + "Eleven vil at mobilen bare skal holde i 5 timer, for å teste en lading på kort tid. Hvilken lysstyrke trengs ifølge modellen? Er det mulig?",
      r`I d) finner du skjæringen mellom grafen og linja $y = 5$.`,
      [
        r`<strong>a)</strong> GeoGebra: $B(x) = -0{,}06975x + 15{,}85$, altså omtrent $B(x) = -0{,}070x + 15{,}9$.`,
        r`<strong>b)</strong> $10 \cdot (-0{,}06975) \approx -0{,}70$. Batteritiden blir omtrent 0,7 timer (ca. 42 min) kortere.`,
        r`<strong>c)</strong> $B(50) \approx 12{,}4$. Interpolasjon, fordi 50 ligger mellom 20 og 80.`,
        r`<strong>d)</strong> Skjæring ved $x \approx 155{,}6$. Lysstyrken kan ikke være mer enn 100 %, så det er umulig. Det er ekstrapolasjon langt utenfor målingene.<br><strong>Svar:</strong> b) Omtrent 0,7 timer kortere. c) Omtrent 12,4 timer. d) Omtrent 156 %, umulig.`,
      ],
    ),
    o(
      "P5.26",
      2,
      "uten",
      "<strong>a)</strong> En modell for hvor langt en stein faller, bygger på en naturlov. En modell for antall kinobesøk bygger på hva folk har gjort før. Hvilken av modellene kan vi stole mest på når vi ekstrapolerer? Begrunn svaret." +
        del("b") + "Hva betyr det at en prognose bygger på «business as usual»?",
      "Kan en naturlov endre seg? Kan vanene til folk endre seg?",
      [
        "<strong>a)</strong> Modellen som bygger på naturloven, fordi naturloven gjelder hver gang. Hva folk gjør, kan endre seg.",
        "<strong>b)</strong> At utviklingen fortsetter som før, uten store endringer.<br><strong>Svar:</strong> Se over.",
      ],
    ),
    o(
      "P5.27",
      3,
      "med",
      ikkeEkte +
        r`Billettsalget til en ny festival har nettopp åpnet. Tabellen viser hvor mange billetter som er solgt (i tusen). $x$ er antall dager etter at salget åpnet.` +
        tab(["$x$", [1, 2, 3, 4, 5, 6, 7, 8]], ["Solgt (tusen)", [3, "6,5", 13, 27, 55, 81, 106, 131]]) +
        r`<strong>a)</strong> Finn en eksponentiell modell $f$ for dag 1–5 og en lineær modell $g$ for dag 5–8.` +
        del("b") + r`Lag en delt funksjon med Dersom, og tegn grafen for $1 \le x \le 8$.` +
        del("c") + r`Hva gir $f$ og $g$ for dag 10? Hvilken prognose er mest rimelig?`,
      r`Lag to regresjoner: én med de fem første tallparene og én med de fire siste. Dersom(x <= 5, f(x), g(x)).`,
      [
        r`<strong>a)</strong> GeoGebra: $f(x) = 1{,}48 \cdot 2{,}063^x$ og $g(x) = 25{,}3x - 71{,}2$.`,
        r`<strong>b)</strong> Dersom(x <= 5, f(x), g(x)). Ved $x = 5$ gir $f$ omtrent 55,5 og $g$ omtrent 55,3. Grafen gjør et lite hopp på omtrent 0,2 der, men hoppet er så lite at det ikke betyr noe for modellen.`,
        r`<strong>c)</strong> $f(10) \approx 2073$ og $g(10) \approx 182$. Prognosen fra $g$ er mest rimelig, fordi salget ikke lenger vokser eksponentielt etter dag 5.<br><strong>Svar:</strong> c) Omtrent 2 millioner og 182 000 billetter. $g$ er mest rimelig.`,
      ],
    ),
    o(
      "P5.28",
      3,
      "med",
      ikkeEkte +
        r`En kantine har prøvd ulike priser på en baguett. $x$ er prisen i kroner.` +
        tab(["Pris, $x$", [20, 30, 40, 60]], ["Antall solgt per måned", [610, 520, 410, 240]]) +
        r`<strong>a)</strong> Bruk lineær regresjon til å finne en modell $N(x)$ for antall solgte baguetter.` +
        del("b") + "Ved hvilken pris selger kantinen ingen baguetter ifølge modellen?" +
        del("c") + r`Inntekten er pris ganger antall solgt: $I(x) = x \cdot N(x)$. Tegn grafen til $I$ og finn prisen som gir størst inntekt. Hvor stor er inntekten da?` +
        del("d") + r`Hva er et rimelig gyldighetsområde for $I$?`,
      r`I b) finner du nullpunktet til $N$. I c) bruker du Ekstremalpunkt på $I$.`,
      [
        r`<strong>a)</strong> GeoGebra: $N(x) = -9{,}31x + 794{,}29$`,
        r`<strong>b)</strong> Nullpunkt ved $x \approx 85$.`,
        r`<strong>c)</strong> Toppunkt omtrent $(42{,}6\,,\,16\,933)$.`,
        r`<strong>d)</strong> $0 \le x \le 85$, men helst nær de prisene som er prøvd (20–60 kr).<br><strong>Svar:</strong> b) Omtrent 85 kr. c) Omtrent 42,60 kr gir størst inntekt, omtrent 16 900 kr per måned.`,
      ],
    ),
    o(
      "P5.29",
      3,
      "med",
      ikkeEkte +
        r`Tabellen viser antall hus med solcellepaneler på taket i en kommune. $x$ er antall år etter 2018.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5]], ["Hus", [800, 860, 930, 1000, 1080, 1170]]) +
        "<strong>a)</strong> Finn en lineær modell og en eksponentiell modell." +
        del("b") + "Lag prognoser for 2033 med begge modellene." +
        del("c") + "Begge modellene passer godt med tabellen. Hvorfor blir prognosene så ulike? Hva kan gjøre at ingen av prognosene slår til?",
      r`2033 svarer til $x = 15$.`,
      [
        r`<strong>a)</strong> Lineær: $f(x) = 73{,}71x + 789{,}05$. Eksponentiell: $g(x) = 798{,}36 \cdot 1{,}0789^x$.`,
        r`<strong>b)</strong> $f(15) \approx 1895$ og $g(15) \approx 2493$.`,
        "<strong>c)</strong> Det er ekstrapolasjon langt fram i tid, og små forskjeller vokser. Nye støtteordninger, strømpriser eller priser på paneler kan endre utviklingen.<br><strong>Svar:</strong> b) Omtrent 1895 og 2493 hus.",
      ],
    ),
  ],
};

/* ───────────────────────── P5D Modelleringsprosessen ───────────────────────── */

const dkP5D: Delkapittel = {
  id: "P5D",
  tittel: "5D Modelleringsprosessen",
  quiz: [
    q("Hva er det første trinnet i modelleringsprosessen?", ["Vurdere modellen", "Gjøre antagelser", "Justere modellen", "Lage prognoser"], 1, "Rekkefølgen er: antagelser – data – analyse og modell – vurdering – justering.", 1),
    q("Hva er et avvikende punkt?", ["Det første punktet i tabellen", "Et punkt på grafen til modellen", "Punktet med størst verdi", "Et punkt som ligger langt unna de andre"], 3, "Et avvikende punkt passer ikke med mønsteret til de andre punktene.", 1),
    q("Når bør du ta bort et avvikende punkt?", ["Alltid", "Aldri", "Når du er rimelig sikker på at det er en feil", "Når modellen blir penere uten punktet"], 2, "Et uventet punkt kan være en viktig oppdagelse. Ta det bare bort hvis det trolig er en feil.", 2),
    q("En andregradsmodell passer godt, men gir et negativt antall besøkende om 10 år. Hva gjør du?", ["Forkaster modellen for prognosen", "Bruker svaret likevel", "Runder av til 0 og bruker modellen", "Legger til flere parametre"], 0, "En modell som gir urimelige svar, bør du ikke bruke til prognoser.", 2),
    q("Du får nye målinger. Hva bør du gjøre med modellen?", ["Beholde den gamle modellen", "Bare bruke de nye dataene", "Slette de gamle dataene", "Lage den på nytt med alle dataene"], 3, "Med flere data blir modellen bedre.", 2),
    q("Det er en sammenheng mellom fotlengde og høyde. Hva kan vi si?", ["Lange føtter gjør at du blir høy", "Høyden bestemmer fotlengden nøyaktig", "Det er en sammenheng, men ikke årsak og virkning", "Det er ingen sammenheng"], 2, "Begge avhenger av hvor stor kroppen er.", 3),
  ],
  oppgaver: [
    o(
      "P5.30",
      1,
      "uten",
      "En elevgruppe vil lage en modell for hvor mange elever som sykler til skolen i ulike måneder." +
        del("a") + "Sett trinnene i riktig rekkefølge: Vurder modellen – Hent inn data – Gjør antagelser – Juster modellen – Analyser og lag modell." +
        del("b") + "Skriv ned to antagelser gruppa kan gjøre." +
        del("c") + "Hvordan kan gruppa hente inn data?",
      "Du må vite hva du skal se etter før du samler inn data.",
      [
        "<strong>a)</strong> Gjør antagelser – Hent inn data – Analyser og lag modell – Vurder modellen – Juster modellen.",
        "<strong>b)</strong> For eksempel: Været påvirker hvor mange som sykler. Antall elever på skolen er det samme hele året.",
        "<strong>c)</strong> For eksempel ved å telle sykler i sykkelstativet hver dag.<br><strong>Svar:</strong> Se over.",
      ],
    ),
    o(
      "P5.31",
      1,
      "med",
      ikkeEkte +
        r`Tabellen viser antall besøkende på en nettside. $x$ er antall uker etter at siden ble lansert.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5, 6, 7]], ["Besøkende", [140, 152, 163, 2450, 186, 197, 210, 221]]) +
        "<strong>a)</strong> Hvilket punkt er avvikende? Hva kan være forklaringen?" +
        del("b") + "Finn en lineær modell med alle punktene. Hva skjer med stigningstallet?" +
        del("c") + "Ta bort det avvikende punktet og finn en ny lineær modell." +
        del("d") + "Hvor mange besøkende var det trolig i uke 3 ifølge den nye modellen? Hvor mange blir det i uke 10?",
      "Se etter et tall som er mye større eller mindre enn de andre.",
      [
        `<strong>a)</strong> ${pt(3, 2450)}. Trolig en skrivefeil for 245, eller én helt spesiell uke.`,
        r`<strong>b)</strong> GeoGebra: $f(x) = -15{,}54x + 519{,}25$. Stigningstallet blir negativt, selv om besøket øker.`,
        r`<strong>c)</strong> GeoGebra: $g(x) = 11{,}55x + 140{,}03$`,
        r`<strong>d)</strong> $g(3) \approx 175$ og $g(10) \approx 256$.<br><strong>Svar:</strong> d) Omtrent 175 i uke 3 og omtrent 256 i uke 10.`,
      ],
    ),
    o(
      "P5.32",
      1,
      "uten",
      "Tenk deg en værstasjon som måler temperaturen hver time. Et dataprogram tar automatisk bort målinger som er mye høyere enn de andre. En dag tar programmet bort flere svært høye målinger. Senere viser det seg at det var en uvanlig hetebølge, og at målingene var riktige.<br><br>Hva kan vi lære av dette om avvikende punkter?",
      "Er et uventet punkt alltid en feil?",
      ["Vi må ikke ta bort punkter bare fordi de er uventede. Et avvikende punkt kan være en viktig oppdagelse. Sjekk først om det er en feil.<br><strong>Svar:</strong> Se over."],
    ),
    o(
      "P5.33",
      2,
      "med",
      ikkeEkte +
        r`Tabellen viser antall besøk i en svømmehall per år, i tusen. $x$ er antall år etter 2010.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]], ["Besøk (tusen)", [150, 158, 171, 166, 180, 185, 178, 192, 199, 190, 186, 181, 175]]) +
        "<strong>a)</strong> Finn en lineær modell og en andregradsmodell." +
        del("b") + "Lag en prognose for 2035 med begge modellene." +
        del("c") + "Hvilken modell vil du forkaste? Begrunn svaret.",
      r`2035 svarer til $x = 25$.`,
      [
        r`<strong>a)</strong> Lineær: $f(x) = 2{,}43x + 163{,}20$. Andregrad: $g(x) = -0{,}684x^2 + 10{,}64x + 148{,}14$.`,
        r`<strong>b)</strong> $f(25) \approx 224$ og $g(25) \approx -14$.`,
        "<strong>c)</strong> Andregradsmodellen, fordi et negativt antall besøk er urimelig. Legg merke til at heller ikke den lineære modellen fanger opp at tallene synker etter 2018. Det ser vi på i neste oppgave.<br><strong>Svar:</strong> b) Omtrent 224 000 og −14 000 besøk. c) Andregradsmodellen.",
      ],
    ),
    o(
      "P5.34",
      2,
      "med",
      "Svømmehallen i oppgave P5.33 får tall for fire nye år:" +
        tab(["$x$", [13, 14, 15, 16]], ["Besøk (tusen)", [172, 180, 169, 176]]) +
        "<strong>a)</strong> Finn en ny lineær modell med alle dataene fra begge tabellene." +
        del("b") + "Lag en ny prognose for 2035. Hvor mye endret prognosen seg?" +
        del("c") + "Kommunen planlegger å bygge ut garderobene. Hvorfor er det lurt å justere modellen når det kommer nye tall?",
      "Legg de nye tallene under de gamle i regnearket, og gjør regresjonen på nytt.",
      [
        r`<strong>a)</strong> GeoGebra: $f(x) = 0{,}86x + 170{,}06$`,
        r`<strong>b)</strong> $f(25) \approx 192$. Prognosen ble omtrent $224 - 192 = 32$ lavere.`,
        "<strong>c)</strong> Nye tall viser at utviklingen har endret seg. Med en gammel modell kan garderobene bli for store eller for små.<br><strong>Svar:</strong> b) Omtrent 192 000 besøk, omtrent 32 000 lavere.",
      ],
    ),
    o(
      "P5.35",
      2,
      "med",
      ikkeEkte +
        r`Tabellen viser prisen for et årskort på et treningssenter. $x$ er antall år etter 2019.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5]], ["Pris (kr)", [4820, 4890, 4960, 4980, 5070, 5110]]) +
        r`<strong>a)</strong> Finn en lineær modell $P(x)$.` +
        del("b") + "Lag en prognose for 2030." +
        del("c") + "Nevn to grunner til at prognosen kan slå feil.",
      r`2030 svarer til $x = 11$.`,
      [
        r`<strong>a)</strong> GeoGebra: $P(x) = 57{,}43x + 4828{,}10$`,
        r`<strong>b)</strong> $P(11) \approx 5460$`,
        "<strong>c)</strong> For eksempel at det kommer et nytt treningssenter som konkurrerer på pris, eller at prisene i samfunnet stiger raskere enn før.<br><strong>Svar:</strong> b) Omtrent 5460 kr.",
      ],
    ),
    o(
      "P5.36",
      3,
      "med",
      ikkeEkte +
        "En klasse målte fotlengden og kroppshøyden til åtte elever." +
        tab(["Fotlengde (cm), $x$", ["22,4", "23,4", "23,7", "25,0", "25,6", "26,6", "26,9", "28,2"]], ["Høyde (cm)", [158, 162, 165, 170, 174, 178, 181, 186]]) +
        r`<strong>a)</strong> Finn en lineær modell $h(x)$.` +
        del("b") + "Anslå høyden til en elev med fotlengde 24,3 cm." +
        del("c") + "Hva gir modellen for en fotlengde på 38 cm? Vurder svaret." +
        del("d") + "Hvorfor kan vi ikke si at lange føtter er årsaken til at en person er høy?" +
        "<br><br><em>Utforsk selv:</em> Mål klassen din og lag en egen modell. Passer den med modellen over?",
      r`Regn ut $h(24{,}3)$ og $h(38)$.`,
      [
        r`<strong>a)</strong> GeoGebra: $h(x) = 4{,}92x + 47{,}68$`,
        r`<strong>b)</strong> $h(24{,}3) \approx 167$`,
        r`<strong>c)</strong> $h(38) \approx 235$ cm. Det er urimelig, og 38 cm er langt utenfor målingene.`,
        "<strong>d)</strong> Både fotlengde og høyde avhenger av hvor stor kroppen er. Det er en sammenheng, ikke årsak og virkning.<br><strong>Svar:</strong> b) Omtrent 167 cm. c) Omtrent 235 cm, urimelig.",
      ],
    ),
    o(
      "P5.37",
      3,
      "med",
      ikkeEkte +
        r`Tabellen viser antall påmeldte til et årlig skirenn. $x$ er antall år etter 2015.` +
        tab(["$x$", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]], ["Påmeldte", [212, 205, 219, 226, 231, 224, 238, 243, 240, 251]]) +
        "<strong>a)</strong> Lag et oversiktsdiagram og velg en modell. Begrunn valget." +
        del("b") + "Bruk modellen til å lage en prognose for antall påmeldte i 2029." +
        del("c") + "Arrangøren vil vite antall påmeldte i god tid før rennet. Hvilke opplysninger kunne gitt en bedre prognose enn modellen?",
      r`2029 svarer til $x = 14$.`,
      [
        r`<strong>a)</strong> Punktene ligger omtrent på en stigende linje, så vi velger en lineær modell: $f(x) = 4{,}52x + 208{,}58$.`,
        r`<strong>b)</strong> $f(14) \approx 272$`,
        "<strong>c)</strong> For eksempel hvor mange som har meldt seg på så langt i år, snøforholdene og om det er andre renn samme helg.<br><strong>Svar:</strong> b) Omtrent 272 påmeldte.",
      ],
    ),
    o(
      "P5.38",
      3,
      "med",
      ikkeEkte +
        "Tabellen viser avstanden fra sentrum og antall butikker per km² i seks områder A–F i en by." +
        tab(["Avstand fra sentrum (km), $x$", ["1,2", "3,5", 8, 15, 30, 55]], ["Butikker per km²", [95, 52, 30, 18, 9, 5]]) +
        r`<strong>a)</strong> Bruk potensregresjon til å finne en modell $B(x) = a \cdot x^b$.` +
        del("b") + "Hva gir modellen for et område 20 km fra sentrum?" +
        del("c") + "Hvor langt fra sentrum er det 40 butikker per km² ifølge modellen?" +
        del("d") + "Betyr modellen at avstanden alene bestemmer hvor mange butikker det er? Nevn andre forhold som kan spille inn.",
      r`I c) finner du skjæringen med $y = 40$.`,
      [
        r`<strong>a)</strong> GeoGebra: $B(x) = 128{,}41 \cdot x^{-0{,}772}$`,
        r`<strong>b)</strong> $B(20) \approx 12{,}7$`,
        r`<strong>c)</strong> Skjæring ved $x \approx 4{,}5$.`,
        "<strong>d)</strong> Nei. For eksempel hvor mange som bor i området, veier og kollektivtilbud, og om det finnes et kjøpesenter der. Det er en sammenheng, men ikke nødvendigvis årsak og virkning.<br><strong>Svar:</strong> b) Omtrent 12,7 butikker per km². c) Omtrent 4,5 km.",
      ],
    ),
  ],
};

/* ───────────────────────── Sammendrag ───────────────────────── */

const dkP5SM: Delkapittel = {
  id: "P5SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P5.S1",
      "Modeller og variabler",
      r`<strong>Uten hjelpemidler</strong><br><br>En <strong>modell</strong> er en forenklet beskrivelse av virkeligheten. Den <strong>uavhengige variabelen</strong> ($x$) er den vi velger eller kjenner. Den <strong>avhengige variabelen</strong> ($y$ eller $f(x)$) avhenger av den.<br><br><strong>Prøv:</strong> Et basseng har 2000 liter vann. Det fylles med 1500 liter per time. Lag en modell $V(x)$ for antall liter etter $x$ timer og en modell $T(v)$ for hvor mange timer det tar før bassenget har $v$ liter. Hvor lang tid tar det før bassenget har 11 000 liter?`,
      "Vannmengde = startmengde + liter per time · antall timer.",
      [r`$V(x) = 1500x + 2000$ og $T(v) = \dfrac{v - 2000}{1500}$. $T(11\,000) = \dfrac{9000}{1500} = 6$.<br><strong>Svar:</strong> $V(x) = 1500x + 2000$, $T(v) = \dfrac{v - 2000}{1500}$, 6 timer.`],
    ),
    s(
      "P5.S2",
      "Regresjon og modelltyper",
      r`<strong>Med hjelpemidler</strong><br><br><strong>Regresjon</strong> betyr å finne den funksjonen som passer best til punktene. I GeoGebra: Regneark → merk tallene → Regresjonsanalyse.` +
        tab(["Modell", ["Lineær", "Andregrad", "Tredjegrad", "Eksponentiell", "Potens"]], ["Uttrykk", [r`$ax + b$`, r`$ax^2 + bx + c$`, r`$ax^3 + bx^2 + cx + d$`, r`$a \cdot b^x$`, r`$a \cdot x^b$`]], ["Parametre", [2, 3, 4, 2, 2]]) +
        r`Velg den enkleste modellen som passer godt (<strong>Ockhams barberkniv</strong>). GeoGebra kan vise tallene med andre avrundinger. Små forskjeller i siste desimal er ikke feil.<br>Avvik i prosent $= \dfrac{\text{modell} - \text{målt}}{\text{målt}} \cdot 100\,\%$.<br><br><strong>Prøv:</strong> En modell gir 460, men det målte tallet er 400. Finn avviket i prosent.`,
      r`$\dfrac{460 - 400}{400}$`,
      [r`$\dfrac{60}{400} \cdot 100\,\% = 15\,\%$.<br><strong>Svar:</strong> $15\,\%$`],
    ),
    s(
      "P5.S3",
      "Gyldighet og prognoser",
      r`<strong>Uten hjelpemidler</strong><br><br><strong>Interpolasjon:</strong> Vi bruker modellen mellom de målte verdiene. <strong>Ekstrapolasjon:</strong> Vi bruker modellen utenfor de målte verdiene. Det er mer usikkert. <strong>Gyldighetsområdet</strong> er de verdiene av $x$ der modellen gir rimelige svar.<br><br><strong>Prøv:</strong> En modell bygger på målinger fra 2012 til 2022. Er det interpolasjon eller ekstrapolasjon å bruke den for 2017 og for 2040?`,
      "Ligger året innenfor eller utenfor målingene?",
      ["2017 ligger mellom 2012 og 2022. 2040 ligger utenfor.<br><strong>Svar:</strong> 2017: interpolasjon. 2040: ekstrapolasjon."],
    ),
    s(
      "P5.S4",
      "Modelleringsprosessen",
      r`<strong>Uten hjelpemidler</strong><br><br><strong>Modelleringsprosessen:</strong> 1) Gjør antagelser. 2) Hent inn data. 3) Analyser og lag modell. 4) Vurder modellen. 5) Juster modellen ved behov.<br>Ta bare bort et <strong>avvikende punkt</strong> hvis det trolig er en feil. Forkast en modell som gir urimelige svar. Lag modellen på nytt når du får nye data.<br><br><strong>Prøv:</strong> En modell for antall elever på en skole gir $-30$ elever om 15 år. Hva gjør du?`,
      "Kan antall elever være negativt?",
      ["Et negativt antall er urimelig.<br><strong>Svar:</strong> Forkast modellen for denne prognosen, og prøv en annen modell."],
    ),
  ],
};

/* ───────────────────────── Øveprøve ───────────────────────── */

const dkP5OP: Delkapittel = {
  id: "P5OP",
  tittel: "Øveprøve",
  quiz: [
    q("Hvor mange parametre har en eksponentiell modell $a \\cdot b^x$?", ["1", "3", "2", "4"], 2, r`Parametrene er $a$ og $b$.`, 1),
    q("En modell bygger på målinger for $x$ fra 0 til 10. Hva er det å regne ut $f(25)$?", ["Ekstrapolasjon", "Interpolasjon", "Regresjon", "Avrunding"], 0, "25 ligger utenfor de målte verdiene.", 1),
    q(r`En modell er $g(x) = 40{,}11 \cdot 1{,}1346^x$. Hvor mange prosent øker $g$ per gang $x$ øker med 1?`, [r`Omtrent $1{,}1\,\%$`, r`Omtrent $113\,\%$`, r`Omtrent $40\,\%$`, r`Omtrent $13{,}5\,\%$`], 3, r`$1{,}1346 = 100\,\% + 13{,}46\,\%$.`, 2),
    q("Hvilken modell kan ikke gå gjennom origo?", ["Lineær", "Eksponentiell", "Potens", "Andregrad"], 1, r`$a \cdot b^0 = a$, og $a$ er ikke 0 i en eksponentiell modell.`, 3),
  ],
  oppgaver: [
    s(
      "P5.OP0",
      "Om øveprøven",
      "<strong>Kapittel 5 · Modellering</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–5), bruk GeoGebra.<br>Hver del går fra lettere til vanskeligere oppgaver.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P5.OP1",
      1,
      "uten",
      "Hvilken modell passer best i hver situasjon: lineær, andregrad, eksponentiell eller potens? Begrunn kort." +
        del("a") + "Antall bakterier i en prøve dobles hver time." +
        del("b") + "Et tog kjører med jevn fart. Vi ser på strekningen som funksjon av tiden." +
        del("c") + "Høyden til en ball som kastes rett opp, som funksjon av tiden." +
        del("d") + "Arealet av et kvadrat som funksjon av sidelengden.",
      "Lik endring → lineær. Lik prosentvis endring → eksponentiell. Toppunkt → andregrad. Gjennom origo og øker mer og mer → potens.",
      [
        "<strong>a)</strong> Eksponentiell, fordi antallet øker med samme prosent (100 %) hver time.",
        "<strong>b)</strong> Lineær, fordi strekningen øker like mye hver time.",
        "<strong>c)</strong> Andregrad, fordi høyden har et toppunkt.",
        r`<strong>d)</strong> Potens: $A = s^2$. Grafen går gjennom origo. Den er også en andregradsfunksjon.<br><strong>Svar:</strong> a) Eksponentiell. b) Lineær. c) Andregrad. d) Potens (andregrad godtas også).`,
      ],
    ),
    o(
      "P5.OP2",
      2,
      "uten",
      r`Et grasstrå i en plen er 12 cm høyt 2 uker etter at plenen ble sådd, og 30 cm høyt etter 8 uker. Vi antar at høyden øker like mye hver uke.` +
        del("a") + r`Finn en lineær modell $f(x)$ for høyden etter $x$ uker.` +
        del("b") + "Hvor høyt er grasstrået etter 5 uker ifølge modellen? Er det interpolasjon eller ekstrapolasjon?" +
        del("c") + "Hva gir modellen etter 52 uker? Vurder svaret, og foreslå et gyldighetsområde.",
      r`Stigningstallet er $\dfrac{30 - 12}{8 - 2}$.`,
      [
        r`<strong>a)</strong> $a = \dfrac{30 - 12}{8 - 2} = \dfrac{18}{6} = 3$. $f(2) = 3 \cdot 2 + b = 12$ gir $b = 6$. Så $f(x) = 3x + 6$.`,
        r`<strong>b)</strong> $f(5) = 15 + 6 = 21$ cm. Interpolasjon, fordi 5 ligger mellom 2 og 8.`,
        r`<strong>c)</strong> $f(52) = 156 + 6 = 162$ cm. Det er urimelig. Gresset slutter å vokse om høsten, og en plen blir klippet. Gyldighetsområde for eksempel $2 \le x \le 8$.<br><strong>Svar:</strong> a) $f(x) = 3x + 6$. b) 21 cm, interpolasjon. c) 162 cm, urimelig.`,
      ],
    ),
    o(
      "P5.OP3",
      3,
      "uten",
      r`<strong>a)</strong> Hvor mange parametre har en lineær modell, en andregradsmodell og en eksponentiell modell?` +
        del("b") + `Finn den lineære funksjonen som går gjennom ${pt(1, 2)} og ${pt(3, 8)}. Hvor mange slike lineære funksjoner finnes det?` +
        del("c") + "To modeller passer like godt med en tabell. Den ene har 2 parametre, den andre har 3. Hvilken bør du velge? Begrunn svaret.",
      "En lineær modell er bestemt av to punkter.",
      [
        "<strong>a)</strong> Lineær: 2. Andregrad: 3. Eksponentiell: 2.",
        r`<strong>b)</strong> $a = \dfrac{8 - 2}{3 - 1} = 3$. $3 \cdot 1 + b = 2$ gir $b = -1$. Så $f(x) = 3x - 1$. Det finnes bare én slik funksjon, fordi to punkter bestemmer en rett linje.`,
        "<strong>c)</strong> Modellen med 2 parametre. Etter Ockhams barberkniv velger vi den enkleste modellen som passer godt.<br><strong>Svar:</strong> a) 2, 3 og 2. b) $f(x) = 3x - 1$, bare én. c) Den med 2 parametre.",
      ],
    ),
    o(
      "P5.OP4",
      2,
      "med",
      ikkeEkte +
        r`Et lite møbelverksted har funnet de samlede kostnadene $K$ (i kroner) ved å lage $x$ stoler i en måned.` +
        tab(["Stoler, $x$", [20, 40, 60, 90, 120]], ["Kostnad (kr)", [9000, 13500, 19500, 31800, 48000]]) +
        r`<strong>a)</strong> Bruk regresjon til å finne en andregradsmodell $K(x)$.` +
        del("b") + "Hva koster det å lage 70 stoler ifølge modellen?" +
        del("c") + "Hva koster det å lage 200 stoler ifølge modellen?" +
        del("d") + "Hvilket av svarene i b) og c) stoler du mest på? Begrunn svaret.",
      r`Velg «Polynom» med grad 2. Regn ut $K(70)$ og $K(200)$.`,
      [
        r`<strong>a)</strong> GeoGebra: $K(x) = 2{,}12x^2 + 92{,}00x + 6347{,}73$`,
        r`<strong>b)</strong> $K(70) \approx 23\,200$`,
        r`<strong>c)</strong> $K(200) \approx 109\,700$`,
        "<strong>d)</strong> Svaret i b), fordi 70 ligger mellom de målte verdiene (interpolasjon). 200 ligger langt utenfor (ekstrapolasjon).<br><strong>Svar:</strong> b) Omtrent 23 200 kr. c) Omtrent 109 700 kr. d) b).",
      ],
    ),
    o(
      "P5.OP5",
      3,
      "med",
      ikkeEkte +
        r`Tabellen viser antall medlemmer i en sjakklubb. $x$ er antall år etter 2016.` +
        tab(["$x$", [0, 2, 4, 6, 8]], ["Medlemmer", [40, 52, 66, 86, 110]]) +
        "<strong>a)</strong> Finn en lineær modell og en eksponentiell modell." +
        del("b") + "Tolk stigningstallet og vekstfaktoren." +
        del("c") + "Hvilken modell passer best med tabellen? Begrunn svaret." +
        del("d") + "Lag prognoser for 2030 med begge modellene. Når passerer klubben 200 medlemmer ifølge den eksponentielle modellen?",
      r`2030 svarer til $x = 14$. Sammenlign modellverdiene med tabellen.`,
      [
        r`<strong>a)</strong> Lineær: $f(x) = 8{,}7x + 36$. Eksponentiell: $g(x) = 40{,}11 \cdot 1{,}1346^x$.`,
        "<strong>b)</strong> Lineær: Klubben får omtrent 8,7 nye medlemmer per år. Eksponentiell: Antall medlemmer øker med omtrent 13,5 % per år.",
        r`<strong>c)</strong> Den eksponentielle. Den gir 40,1, 51,6, 66,5, 85,6 og 110,2, som er svært nær tabellen. Den lineære gir 36, 53,4, 70,8, 88,2 og 105,6, med avvik på opptil 4,8.`,
        r`<strong>d)</strong> $f(14) \approx 158$ og $g(14) \approx 235$. $g(x) = 200$ gir $x \approx 12{,}7$, altså i løpet av 2028.<br><strong>Svar:</strong> d) Omtrent 158 og 235 medlemmer. 200 medlemmer i løpet av 2028.`,
      ],
    ),
  ],
};

export const KAP5_1P: Kapittel = {
  id: "p1kap5",
  tittel: "Kapittel 5 Matematiske modeller",
  delkapitler: [dkP5A, dkP5B, dkP5C, dkP5D, dkP5SM, dkP5OP],
};
