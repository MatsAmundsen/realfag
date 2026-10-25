import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "../types";

/*
 * Matematikk 1P · Kapittel 4 Funksjoner og grafer (P4A–P4E, P4SM, P4OP).
 * Kilde: godkjente oppgaveark i 1p-bibliotek/ark/4A–4E-*-tekst-godkjent.md (egne oppgaver, ikke bokoppgaver).
 * Id-er har P-prefiks så de aldri kolliderer med 1T: kapittel «p1kap4», delkapittel «P4A», oppgave «P4.1».
 * Figurer er bestilt hos DesignBOT. Inntil de finnes står en skjult kommentar «figur: …» med beskrivelsen.
 */

const r = String.raw;

type Hjelpemidler = "uten" | "med" | string; // string = «Uten hjelpemidler i a)–c)»

function o(id: string, niva: 1 | 2 | 3, hm: Hjelpemidler, tekst: string, hint: string, steg: string[]): Oppgave {
  const merke =
    hm === "uten"
      ? "<strong>Uten hjelpemidler</strong><br><br>"
      : hm === "med"
        ? "<em>Med hjelpemidler: bruk graftegner, for eksempel GeoGebra.</em><br><br>"
        : `<strong>Uten hjelpemidler i ${hm}.</strong> <em>Resten løser du med graftegner.</em><br><br>`;
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

/** Punkt skrevet som i 1P: (3 , −2). Tall med desimalkomma skrives som «7{,}5». */
function pt(a: string | number, b: string | number): string {
  return `$(${a}\\,,\\,${b})$`;
}

/** Skjult figurbestilling + synlig plassholder til DesignBOT har levert figuren. */
function fig(id: string, beskrivelse: string): string {
  return `<!-- figur: ${id} — ${beskrivelse} --><em>Figur til oppgave ${id} (kommer).</em><br><br>`;
}

const del = (b: string) => `<br><br><strong>${b})</strong> `;

/* ───────────────────────── P4A Punkter og akser ───────────────────────── */

const dkP4A: Delkapittel = {
  id: "P4A",
  tittel: "4A Punkter og akser",
  quiz: [
    q("Hva heter punktet der aksene skjærer hverandre?", ["Origo", "Toppunktet", "Nullpunktet", "Skalaen"], 0, r`Origo er punktet $(0\,,\,0)$.`, 1),
    q(r`Hvilken koordinat skrives først i $(x\,,\,y)$?`, ["Andrekoordinaten", "Førstekoordinaten", "Den største", "Det spiller ingen rolle"], 1, r`Førstekoordinaten hører til $x$-aksen og skrives først.`, 1),
    q(r`Punktet $(-2\,,\,5)$ ligger`, ["til høyre for andreaksen og over førsteaksen", "til venstre for andreaksen og under førsteaksen", "til venstre for andreaksen og over førsteaksen", "på førsteaksen"], 2, r`Negativ førstekoordinat: til venstre. Positiv andrekoordinat: over.`, 1),
    q(r`Hvilket punkt ligger på andreaksen ($y$-aksen)?`, [r`$(4\,,\,0)$`, r`$(3\,,\,3)$`, r`$(-1\,,\,2)$`, r`$(0\,,\,-6)$`], 3, "Punkter på andreaksen har førstekoordinat 0.", 2),
    q("Tallene på en akse er 0, 25, 50, 75 ved hver strek. Hva er skalaen?", ["25", "1", "5", "75"], 0, "Tallene øker med 25 for hver strek.", 2),
    q(r`Alle punkter med andrekoordinat $4$ ligger på`, ["en loddrett linje", "en vannrett linje", "førsteaksen", "en skrå linje gjennom origo"], 1, r`Punktene $(x\,,\,4)$ ligger like høyt, altså på en vannrett linje.`, 3),
  ],
  oppgaver: [
    o(
      "P4.1",
      1,
      "uten",
      "Bruk koordinatsystemet i figuren.<br><br>" +
        fig("P4.1", "Koordinatsystem x og y fra −5 til 5, skala 1, heltall på aksene, akser merket x og y med pilspiss. Punkter: A (4 , 2), B (−3 , 1), C (−2 , −4), D (0 , 3), E (3 , −2).") +
        r`<strong>a)</strong> Hva er koordinatene til origo?` +
        del("b") +
        r`Finn koordinatene til punktene $A$, $B$, $C$, $D$ og $E$. Tegn gjerne hjelpelinjer.`,
      r`Gå fra punktet rett opp eller ned til $x$-aksen, og rett til siden til $y$-aksen. Førstekoordinaten skrives først.`,
      [
        `<strong>a)</strong> Origo er der aksene skjærer hverandre: ${pt(0, 0)}.`,
        `<strong>b)</strong> $A$ = ${pt(4, 2)}, $B$ = ${pt(-3, 1)}, $C$ = ${pt(-2, -4)}, $D$ = ${pt(0, 3)}, $E$ = ${pt(3, -2)}.<br><strong>Svar:</strong> $A$ = ${pt(4, 2)}, $B$ = ${pt(-3, 1)}, $C$ = ${pt(-2, -4)}, $D$ = ${pt(0, 3)}, $E$ = ${pt(3, -2)}`,
      ],
    ),
    o(
      "P4.2",
      1,
      "uten",
      "Tegn et koordinatsystem der $x$ og $y$ går fra $-5$ til $5$. Merk av punktene, og skriv navnet ved hvert punkt.<br><br>" +
        `<strong>a)</strong> $P$ = ${pt(3, 4)}&nbsp;&nbsp;<strong>b)</strong> $R$ = ${pt(-4, 2)}&nbsp;&nbsp;<strong>c)</strong> $S$ = ${pt(1, -3)}&nbsp;&nbsp;<strong>d)</strong> $T$ = ${pt(-2, -1)}`,
      "Start i origo. Gå først til høyre (positiv) eller venstre (negativ), deretter opp (positiv) eller ned (negativ).",
      [
        "Kontroll av tegningen:<br>$P$ ligger 3 til høyre og 4 opp.<br>$R$ ligger 4 til venstre og 2 opp.<br>$S$ ligger 1 til høyre og 3 ned.<br>$T$ ligger 2 til venstre og 1 ned.<br><strong>Svar:</strong> Tegning med de fire punktene merket.",
      ],
    ),
    o(
      "P4.3",
      1,
      "uten",
      `<strong>a)</strong> Merk av punktene ${pt(2, 5)} og ${pt(5, 2)} i et koordinatsystem.` +
        del("b") +
        `Er ${pt(2, 5)} og ${pt(5, 2)} samme punkt? Forklar.` +
        del("c") +
        `Merk av punktene ${pt(4, 0)} og ${pt(0, -3)}. Hvor ligger punktene?`,
      "Rekkefølgen i et koordinatpar betyr noe. Hva skjer når en av koordinatene er 0?",
      [
        "<strong>a)</strong> Tegning.",
        `<strong>b)</strong> Nei. ${pt(2, 5)} ligger 2 til høyre og 5 opp, mens ${pt(5, 2)} ligger 5 til høyre og 2 opp. Førstekoordinaten hører alltid til $x$-aksen.`,
        `<strong>c)</strong> ${pt(4, 0)} ligger på $x$-aksen fordi andrekoordinaten er 0. ${pt(0, -3)} ligger på $y$-aksen fordi førstekoordinaten er 0.<br><strong>Svar:</strong> b) Nei. c) ${pt(4, 0)} på $x$-aksen, ${pt(0, -3)} på $y$-aksen.`,
      ],
    ),
    o(
      "P4.4",
      2,
      "uten",
      "Se nøye på tallene på aksene.<br><br>" +
        fig("P4.4", "x-akse fra −50 til 50 med én strek per 10, tall ved −40, −20, 20, 40. y-akse fra −10 til 10 med én strek per 2, tall ved −8, −4, 4, 8. Ingen 0 skrevet. Punkter: A (30 , 6), B (−20 , 4), C (−40 , −8), D (0 , −6), E (50 , 0).") +
        r`<strong>a)</strong> Hvilken skala har $x$-aksen og $y$-aksen? (Hvor mye øker tallene for hver strek?)` +
        del("b") +
        r`Finn koordinatene til punktene $A$, $B$, $C$, $D$ og $E$.`,
      "Tell hvor mange streker det er mellom to tall som står skrevet, og del forskjellen på antallet streker.",
      [
        r`<strong>a)</strong> På $x$-aksen er det to streker fra $20$ til $40$, så hver strek er $10$. På $y$-aksen er det to streker fra $4$ til $8$, så hver strek er $2$.`,
        `<strong>b)</strong> $A$ = ${pt(30, 6)}, $B$ = ${pt(-20, 4)}, $C$ = ${pt(-40, -8)}, $D$ = ${pt(0, -6)}, $E$ = ${pt(50, 0)}.<br><strong>Svar:</strong> a) $10$ og $2$. b) Se over.`,
      ],
    ),
    o(
      "P4.5",
      2,
      "uten",
      "Tegn et koordinatsystem og merk av punktene. Velg en skala som passer på hver akse.<br><br>" +
        `<strong>a)</strong> ${pt(0, 20)}&nbsp;&nbsp;<strong>b)</strong> ${pt(-150, -5)}&nbsp;&nbsp;<strong>c)</strong> ${pt(50, 15)}&nbsp;&nbsp;<strong>d)</strong> ${pt(200, -10)}` +
        del("e") +
        r`Hvilken skala valgte du på $x$-aksen og på $y$-aksen?`,
      r`Finn den minste og største $x$-verdien og den minste og største $y$-verdien. Velg en skala slik at alle punktene får plass, og hold inndelingen jevn.`,
      [
        r`$x$-verdiene går fra $-150$ til $200$, og $y$-verdiene går fra $-10$ til $20$.`,
        r`For eksempel kan du bruke skala $50$ på $x$-aksen og skala $5$ på $y$-aksen. Andre valg er også riktige hvis alle punktene får plass og inndelingen er jevn.<br><strong>Svar:</strong> Tegning, for eksempel skala $50$ og $5$.`,
      ],
    ),
    o(
      "P4.6",
      2,
      "uten",
      r`Tenk deg et koordinatsystem der $x$ og $y$ går fra $-5$ til $5$. Hvor ligger de punktene som har` +
        del("a") +
        r`$3$ som førstekoordinat?` +
        del("b") +
        r`$-1$ som andrekoordinat?` +
        del("c") +
        "Tegn begge linjene i samme koordinatsystem. Hvilket punkt ligger på begge linjene?",
      r`Skriv opp noen punkter, for eksempel $(3\,,\,0)$, $(3\,,\,1)$, $(3\,,\,2)$. Hva har de til felles?`,
      [
        r`<strong>a)</strong> På en loddrett linje gjennom $x = 3$.`,
        r`<strong>b)</strong> På en vannrett linje gjennom $y = -1$.`,
        `<strong>c)</strong> Linjene skjærer hverandre i ${pt(3, -1)}.<br><strong>Svar:</strong> ${pt(3, -1)}`,
      ],
    ),
    o(
      "P4.7",
      3,
      "uten",
      "Her er det ikke skrevet tall ved hver strek.<br><br>" +
        fig("P4.7", "x-akse fra −400 til 400 med én strek per 50, tall bare ved −400, −200, 200, 400. y-akse fra −10 til 10 med én strek per 2,5, tall bare ved −10, −5, 5, 10. Ingen 0 skrevet. Punkter: A (250 , 7,5), B (−150 , 5), C (0 , −7,5), D (350 , −2,5), E (−300 , 0).") +
        r`<strong>a)</strong> Hvilken skala har $x$-aksen og $y$-aksen?` +
        del("b") +
        r`Finn koordinatene til punktene $A$, $B$, $C$, $D$ og $E$.`,
      r`Fra $200$ til $400$ er det fire streker. Fra $5$ til $10$ er det to streker.`,
      [
        r`<strong>a)</strong> $x$-aksen: $\dfrac{400-200}{4} = 50$. $y$-aksen: $\dfrac{10-5}{2} = 2{,}5$.`,
        `<strong>b)</strong> $A$ = ${pt(250, "7{,}5")}, $B$ = ${pt(-150, 5)}, $C$ = ${pt(0, "-7{,}5")}, $D$ = ${pt(350, "-2{,}5")}, $E$ = ${pt(-300, 0)}.<br><strong>Svar:</strong> a) $50$ og $2{,}5$. b) Se over.`,
      ],
    ),
    o(
      "P4.8",
      3,
      "uten",
      `Se på punktene<br>${pt(0, -7)}&nbsp;&nbsp;${pt(4, 0)}&nbsp;&nbsp;${pt(-3, 2)}&nbsp;&nbsp;${pt(-3, -5)}&nbsp;&nbsp;${pt(0, 0)}&nbsp;&nbsp;${pt(6, 2)}<br><br>Svar uten å tegne:` +
        del("a") +
        r`Hvilke punkter ligger på $y$-aksen?` +
        del("b") +
        r`Hvilke punkter ligger på $x$-aksen?` +
        del("c") +
        "Hvilke to punkter ligger på samme loddrette linje (ikke på en akse)? Begrunn." +
        del("d") +
        "Hvilke to punkter ligger på samme vannrette linje (ikke på en akse)? Begrunn.",
      "Punkter på samme loddrette linje har samme førstekoordinat. Punkter på samme vannrette linje har samme andrekoordinat.",
      [
        `<strong>a)</strong> ${pt(0, -7)} og ${pt(0, 0)}, fordi førstekoordinaten er 0.`,
        `<strong>b)</strong> ${pt(4, 0)} og ${pt(0, 0)}, fordi andrekoordinaten er 0.`,
        `<strong>c)</strong> ${pt(-3, 2)} og ${pt(-3, -5)}, fordi begge har førstekoordinat $-3$.`,
        `<strong>d)</strong> ${pt(-3, 2)} og ${pt(6, 2)}, fordi begge har andrekoordinat $2$.<br><strong>Svar:</strong> Se over.`,
      ],
    ),
    o(
      "P4.9",
      3,
      "uten",
      r`Aksene kan ha andre navn enn $x$ og $y$. En plante måles i 60 dager. Førsteaksen viser tiden $t$ (dager), og andreaksen viser høyden $h$ (cm).` +
        del("a") +
        `Tegn et koordinatsystem med passende skala, og merk av punktene $(t\\,,\\,h)$:<br>${pt(0, 4)}&nbsp;&nbsp;${pt(20, 10)}&nbsp;&nbsp;${pt(40, 22)}&nbsp;&nbsp;${pt(60, 30)}` +
        del("b") +
        `Hva betyr punktet ${pt(40, 22)}?` +
        del("c") +
        "Hvilket av punktene ligger på andreaksen? Hva forteller det punktet?",
      r`Førstekoordinaten er tiden $t$, og andrekoordinaten er høyden $h$.`,
      [
        "<strong>a)</strong> Tegning, for eksempel skala 5 dager på førsteaksen og 5 cm på andreaksen.",
        "<strong>b)</strong> Etter 40 dager er planten 22 cm høy.",
        `<strong>c)</strong> ${pt(0, 4)}, fordi $t = 0$. Planten var 4 cm høy da målingen startet.<br><strong>Svar:</strong> b) 22 cm etter 40 dager. c) ${pt(0, 4)}: 4 cm ved start.`,
      ],
    ),
  ],
};

/* ───────────────────────── P4B Hva er en funksjon? ───────────────────────── */

const dkP4B: Delkapittel = {
  id: "P4B",
  tittel: "4B Hva er en funksjon?",
  quiz: [
    q(r`$f(x) = 3x + 1$. Hva er $f(2)$?`, ["$5$", "$6$", "$7$", "$9$"], 2, r`$f(2) = 3 \cdot 2 + 1 = 7$.`, 1),
    q("Når er $f$ en funksjon av $x$?", [r`Når grafen er en rett linje`, r`Når $f(0) = 0$`, r`Når $x$ kan være negativ`, r`Når hver $x$ gir én bestemt verdi for $f(x)$`], 3, "Hver verdi av $x$ skal gi nøyaktig én funksjonsverdi.", 1),
    q(r`Hva er definisjonsmengden $D_f$?`, [r`Verdiene $x$ kan ha`, r`Verdiene $f(x)$ kan få`, "Nullpunktene", "Skjæringspunktet med andreaksen"], 0, r`$D_f$ gjelder $x$. Verdimengden $V_f$ gjelder $f(x)$.`, 1),
    q(r`Grafen skjærer førsteaksen i $(4\,,\,0)$. Hva er nullpunktet?`, ["$0$", "$4$", r`$(4\,,\,0)$`, r`$(0\,,\,4)$`], 1, "Nullpunktet er bare førstekoordinaten, altså tallet 4.", 2),
    q(r`$g(x) = 10 - 2x$ med $D_g = [0\,,\,5]$. Hva er $V_g$?`, [r`$[0\,,\,5]$`, r`$[5\,,\,10]$`, r`$[0\,,\,10]$`, r`$[-10\,,\,10]$`], 2, r`$g(0) = 10$ og $g(5) = 0$.`, 2),
    q(r`Hvordan løser du $f(x) = 4$ grafisk?`, [r`Leser av $f(4)$`, "Finner nullpunktene", "Finner toppunktet", r`Tegner linja $y = 4$ og finner skjæringspunktene med grafen`], 3, r`Løsningene er $x$-verdiene der grafen og linja $y = 4$ møtes.`, 3),
  ],
  oppgaver: [
    o(
      "P4.10",
      1,
      "uten",
      r`Figuren viser grafen til en funksjon $f$.<br><br>` +
        fig("P4.10", "x-akse fra 0 til 10 (tall ved hvert heltall), f(x)-akse fra 0 til 90 (tall ved 0, 10, …, 90). Rett linje fra (0 , 30) til (10 , 80), merket f. Grafen er f(x) = 5x + 30, men uttrykket står ikke på figuren.") +
        r`<strong>a)</strong> Finn $f(0)$, $f(4)$ og $f(10)$.` +
        del("b") +
        r`For hvilken verdi av $x$ er $f(x) = 70$?` +
        del("c") +
        `Ligger punktet ${pt(6, 50)} på grafen til $f$? Begrunn svaret.`,
      r`$f(4)$ er andrekoordinaten til punktet på grafen der $x = 4$.`,
      [
        r`<strong>a)</strong> $f(0) = 30$, $f(4) = 50$, $f(10) = 80$.`,
        r`<strong>b)</strong> Gå vannrett fra $70$ på andreaksen til grafen og rett ned: $x = 8$.`,
        r`<strong>c)</strong> $f(6) = 60$, ikke $50$. Punktet ligger ikke på grafen.<br><strong>Svar:</strong> a) $30$, $50$, $80$. b) $x = 8$. c) Nei.`,
      ],
    ),
    o(
      "P4.11",
      1,
      "uten",
      r`Funksjonen $g$ er gitt ved $g(x) = 3x - 2$.` +
        del("a") +
        r`Fyll ut verditabellen.<table><tr><th>$x$</th><td>$-1$</td><td>$0$</td><td>$2$</td><td>$4$</td></tr><tr><th>$g(x)$</th><td></td><td></td><td></td><td></td></tr></table>` +
        r`<strong>b)</strong> Merk av punktene i et koordinatsystem, og tegn grafen til $g$.` +
        del("c") +
        r`Regn ut $g(5)$. Hvilket punkt på grafen har du da funnet?`,
      r`Sett inn tallet for $x$. For eksempel er $g(-1) = 3 \cdot (-1) - 2$.`,
      [
        r`<strong>a)</strong> $g(-1) = -5$, $g(0) = -2$, $g(2) = 4$, $g(4) = 10$.`,
        "<strong>b)</strong> Tegning: en rett linje gjennom punktene.",
        `<strong>c)</strong> $g(5) = 3 \\cdot 5 - 2 = 13$. Punktet er ${pt(5, 13)}.<br><strong>Svar:</strong> a) $-5$, $-2$, $4$, $10$. c) $13$, ${pt(5, 13)}`,
      ],
    ),
    o(
      "P4.12",
      1,
      "med",
      r`Funksjonen $Q$ er gitt ved $Q(x) = x^2 - 3$.` +
        del("a") +
        r`Tegn grafen til $Q$ med graftegner.` +
        del("b") +
        r`Bestem $Q(0)$, $Q(2)$ og $Q(-3)$.` +
        del("c") +
        r`Skriv opp koordinatene til tre punkter som ligger på grafen til $Q$.`,
      r`Husk at $(-3)^2 = 9$.`,
      [
        "<strong>a)</strong> Tegning.",
        r`<strong>b)</strong> $Q(0) = -3$, $Q(2) = 4 - 3 = 1$, $Q(-3) = 9 - 3 = 6$.`,
        `<strong>c)</strong> For eksempel ${pt(0, -3)}, ${pt(2, 1)} og ${pt(-3, 6)}.<br><strong>Svar:</strong> b) $-3$, $1$, $6$.`,
      ],
    ),
    o(
      "P4.13",
      2,
      "a)–c)",
      r`Temperaturen i en kopp te er $T(t) = 60 - 2t$ grader, der $t$ er antall minutter. Funksjonen gjelder for $D_T = [0\,,\,25]$.` +
        del("a") +
        "Skriv definisjonsmengden på to andre måter." +
        del("b") +
        r`Regn ut $T(0)$, $T(10)$ og $T(25)$.` +
        del("c") +
        r`Finn verdimengden $V_T$.` +
        del("d") +
        r`Tegn grafen med graftegner. Skriv <code>T(x) = Funksjon(60 - 2x, 0, 25)</code>. I GeoGebra bruker vi $x$ i stedet for $t$.`,
      r`Grafen er en rett linje som synker. Den største og minste verdien finner du derfor i endepunktene.`,
      [
        r`<strong>a)</strong> $t \in [0\,,\,25]$ og $0 \le t \le 25$.`,
        r`<strong>b)</strong> $T(0) = 60$, $T(10) = 40$, $T(25) = 10$.`,
        r`<strong>c)</strong> $V_T = [10\,,\,60]$.`,
        r`<strong>d)</strong> Tegning.<br><strong>Svar:</strong> b) $60$, $40$, $10$. c) $V_T = [10\,,\,60]$`,
      ],
    ),
    o(
      "P4.14",
      2,
      "uten",
      r`Figuren viser grafen til en funksjon $f$.<br><br>` +
        fig("P4.14", "x fra −1 til 9 og y fra −3 til 7, skala 1, tall ved hvert heltall. Parabel f(x) = 0,5(x − 2)(x − 6) tegnet bare for x fra 0 til 8, med fylte endepunkter i (0 , 6) og (8 , 6). Grafen går gjennom (2 , 0), (4 , −2) og (6 , 0). Uttrykket står ikke på figuren.") +
        r`<strong>a)</strong> Hva er definisjonsmengden $D_f$ og verdimengden $V_f$?` +
        del("b") +
        "Finn nullpunktene og bunnpunktet." +
        del("c") +
        "Hva er skjæringspunktet med andreaksen?" +
        del("d") +
        r`For hvilke verdier av $x$ er $f(x) = 6$?` +
        del("e") +
        "Hva er forskjellen på et nullpunkt og et skjæringspunkt med førsteaksen? Bruk svaret i b) som eksempel.",
      r`$D_f$: hvor langt grafen går til venstre og høyre. $V_f$: hvor langt den går ned og opp.`,
      [
        r`<strong>a)</strong> $D_f = [0\,,\,8]$ og $V_f = [-2\,,\,6]$.`,
        `<strong>b)</strong> Nullpunktene er $2$ og $6$. Bunnpunktet er ${pt(4, -2)}.`,
        `<strong>c)</strong> ${pt(0, 6)}.`,
        r`<strong>d)</strong> $x = 0$ og $x = 8$.`,
        `<strong>e)</strong> Nullpunktet er bare tallet ($2$ og $6$). Skjæringspunktet er hele punktet (${pt(2, 0)} og ${pt(6, 0)}).<br><strong>Svar:</strong> Se over.`,
      ],
    ),
    o(
      "P4.15",
      2,
      "med",
      r`Funksjonene $f$ og $g$ er gitt ved $f(x) = x + 3$ og $g(x) = 5 - x^2$.` +
        del("a") +
        "Finn eventuelle toppunkter og bunnpunkter på grafene." +
        del("b") +
        "Finn skjæringspunktene mellom grafene." +
        del("c") +
        "Finn nullpunktene til hver funksjon. Svar med to desimaler." +
        del("d") +
        r`Finn $x$ slik at $g(x) = 1$.` +
        del("e") +
        r`Finn $x$ slik at $f(x) = -1$.`,
      r`I GeoGebra: Ekstremalpunkt(g), Skjæring(f, g) og Nullpunkt(g). Tegn linja $y = 1$ for d).`,
      [
        `<strong>a)</strong> $f$ er en rett linje og har ingen. $g$ har toppunktet ${pt(0, 5)}.`,
        `<strong>b)</strong> ${pt(-2, 1)} og ${pt(1, 4)}.`,
        r`<strong>c)</strong> $f$: $x = -3$. $g$: $x \approx -2{,}24$ og $x \approx 2{,}24$.`,
        r`<strong>d)</strong> $x = -2$ og $x = 2$.`,
        r`<strong>e)</strong> $x = -4$.<br><strong>Svar:</strong> Se over.`,
      ],
    ),
    o(
      "P4.16",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = x^3 - 3x + 1$.` +
        del("a") +
        "Tegn grafen, og finn toppunktet og bunnpunktet." +
        del("b") +
        r`Finn $x$ slik at $f(x) = 3$.` +
        del("c") +
        r`Finn $x$ slik at $f(x) = 1$. Svar med to desimaler.` +
        del("d") +
        r`For hvilke verdier av $k$ har likningen $f(x) = k$ nøyaktig to løsninger? Bruk grafen.`,
      r`For d): Tenk deg en vannrett linje $y = k$ som flyttes opp og ned. Når treffer den grafen i nøyaktig to punkter?`,
      [
        `<strong>a)</strong> Toppunkt ${pt(-1, 3)}, bunnpunkt ${pt(1, -1)}.`,
        r`<strong>b)</strong> $x = -1$ og $x = 2$.`,
        r`<strong>c)</strong> $x \approx -1{,}73$, $x = 0$ og $x \approx 1{,}73$.`,
        r`<strong>d)</strong> $k = 3$ og $k = -1$. Da går linja $y = k$ gjennom toppunktet eller bunnpunktet.<br><strong>Svar:</strong> d) $k = 3$ og $k = -1$`,
      ],
    ),
    o(
      "P4.17",
      3,
      "uten",
      r`Arealet av et kvadrat med side $s$ cm er $A(s) = s^2$. Vi bruker funksjonen for $D_A = [2\,,\,6]$.` +
        del("a") +
        r`Finn $A(2)$ og $A(6)$.` +
        del("b") +
        r`Bestem verdimengden $V_A$.` +
        del("c") +
        "Har funksjonen nullpunkter i definisjonsmengden? Begrunn." +
        del("d") +
        r`Nå ser vi bort fra definisjonsmengden. Bestem $A(3s)$ uttrykt ved $A(s)$. Hva skjer med arealet når siden blir tre ganger så lang?`,
      r`$A(3s)$ betyr at du setter inn $3s$ der det står $s$: $(3s)^2$.`,
      [
        r`<strong>a)</strong> $A(2) = 4$ og $A(6) = 36$.`,
        r`<strong>b)</strong> $V_A = [4\,,\,36]$.`,
        r`<strong>c)</strong> Nei. $A(s) = 0$ bare når $s = 0$, og $0$ er ikke med i $[2\,,\,6]$.`,
        r`<strong>d)</strong> $A(3s) = (3s)^2 = 9s^2 = 9A(s)$. Arealet blir ni ganger så stort.<br><strong>Svar:</strong> d) $A(3s) = 9A(s)$`,
      ],
    ),
    o(
      "P4.18",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = 4x - 8$, og verdimengden er $V_f = [-8\,,\,12]$.` +
        del("a") +
        r`Finn definisjonsmengden $D_f$.` +
        del("b") +
        r`Funksjonen $g$ er gitt ved $g(x) = x \cdot f(x) + 2$, med samme definisjonsmengde. Regn ut $g(2)$ og $g(5)$.` +
        del("c") +
        r`Tegn grafen til $g$ med graftegner.`,
      r`Løs $4x - 8 = -8$ og $4x - 8 = 12$.`,
      [
        r`<strong>a)</strong> $4x - 8 = -8$ gir $x = 0$, og $4x - 8 = 12$ gir $x = 5$. $D_f = [0\,,\,5]$.`,
        r`<strong>b)</strong> $f(2) = 0$, så $g(2) = 2 \cdot 0 + 2 = 2$. $f(5) = 12$, så $g(5) = 5 \cdot 12 + 2 = 62$.`,
        r`<strong>c)</strong> Tegning.<br><strong>Svar:</strong> a) $D_f = [0\,,\,5]$. b) $g(2) = 2$, $g(5) = 62$`,
      ],
    ),
  ],
};

/* ───────────────────────── P4C Funksjonstyper og grafer ───────────────────────── */

const dkP4C: Delkapittel = {
  id: "P4C",
  tittel: "4C Funksjonstyper og grafer",
  quiz: [
    q(r`Hva er stigningstallet i $f(x) = -2x + 7$?`, ["$-2$", "$7$", "$2$", "$5$"], 0, r`I $ax + b$ er $a$ stigningstallet.`, 1),
    q(r`Hvilken type funksjon er $f(x) = 3 \cdot 1{,}4^x$?`, ["Lineær", "Eksponentialfunksjon", "Potensfunksjon", "Andregradsfunksjon"], 1, "Variabelen står i eksponenten.", 1),
    q(r`$f(x) = 50 \cdot 0{,}9^x$. Hvor mange prosent endrer $f(x)$ seg når $x$ øker med 1?`, ["Øker med 9 %", "Minker med 9 %", "Minker med 10 %", "Øker med 90 %"], 2, r`$0{,}9 = 100\,\% - 10\,\%$.`, 2),
    q(r`En parabel har nullpunktene $1$ og $7$. Hva er symmetrilinja?`, [r`$x = 3$`, r`$x = 6$`, r`$x = 8$`, r`$x = 4$`], 3, r`Symmetrilinja ligger midt mellom nullpunktene: $\dfrac{1 + 7}{2} = 4$.`, 2),
    q(r`Har $f(x) = -x^2 + 4x$ et toppunkt eller et bunnpunkt?`, ["Toppunkt", "Bunnpunkt", "Begge", "Ingen av dem"], 0, r`$a = -1 < 0$, så parabelen vender ned.`, 2),
    q(r`Hvorfor kan vi ikke regne ut $f(2)$ når $f(x) = \dfrac{x + 1}{x - 2}$?`, ["Telleren blir 0", "Nevneren blir 0", "Svaret blir negativt", "2 er ikke et heltall"], 1, "Vi kan ikke dele på 0. Grafen har en loddrett asymptote der.", 3),
  ],
  oppgaver: [
    o(
      "P4.19",
      1,
      "uten",
      r`Funksjonen $f$ er gitt ved $f(x) = 4x - 3$.` +
        del("a") + "Hva er stigningstallet og konstantleddet?" +
        del("b") + r`Hvor mye øker funksjonsverdien når $x$ øker med 1?` +
        del("c") + "Hvor skjærer grafen andreaksen?",
      r`Sammenlign med $f(x) = ax + b$.`,
      [
        r`<strong>a)</strong> Stigningstallet er $4$, og konstantleddet er $-3$.`,
        r`<strong>b)</strong> Med $4$, fordi stigningstallet er $4$.`,
        `<strong>c)</strong> I ${pt(0, -3)}.<br><strong>Svar:</strong> a) $4$ og $-3$. b) $4$. c) ${pt(0, -3)}`,
      ],
    ),
    o(
      "P4.20",
      1,
      "uten",
      r`Funksjonen $g$ er gitt ved $g(x) = -2x + 6$.` +
        del("a") +
        r`Fyll ut verditabellen.<table><tr><th>$x$</th><td>$-1$</td><td>$1$</td><td>$3$</td></tr><tr><th>$g(x)$</th><td></td><td></td><td></td></tr></table>` +
        "<strong>b)</strong> Merk av punktene og tegn grafen." +
        del("c") + "Bruk grafen til å finne nullpunktet." +
        del("d") + "Stiger eller synker grafen mot høyre? Hvordan ser du det i uttrykket?",
      r`Nullpunktet er der grafen krysser førsteaksen, altså der $g(x) = 0$.`,
      [
        r`<strong>a)</strong> $g(-1) = 8$, $g(1) = 4$, $g(3) = 0$.`,
        "<strong>b)</strong> Tegning.",
        r`<strong>c)</strong> Nullpunktet er $3$.`,
        r`<strong>d)</strong> Grafen synker, fordi stigningstallet er negativt ($-2$).<br><strong>Svar:</strong> a) $8$, $4$, $0$. c) $3$. d) Synker.`,
      ],
    ),
    o(
      "P4.21",
      1,
      "uten",
      r`Funksjonen $h$ er lineær med stigningstall $-3$ og konstantledd $5$. Skriv funksjonsuttrykket.`,
      r`En lineær funksjon har formen $h(x) = ax + b$.`,
      [r`$a = -3$ og $b = 5$.<br><strong>Svar:</strong> $h(x) = -3x + 5$`],
    ),
    o(
      "P4.22",
      1,
      "uten",
      "Hvilken type funksjon er dette? Velg mellom lineær, andregrad, tredjegrad, eksponential, potens og rasjonal." +
        del("a") + r`$p(x) = 3x - 1$` +
        del("b") + r`$q(x) = x^2 - 4x + 1$` +
        del("c") + r`$r(x) = 5 \cdot 1{,}2^x$` +
        del("d") + r`$s(x) = 2x^{1{,}5}$` +
        del("e") + r`$u(x) = 2x^3 + x$` +
        del("f") + r`$v(x) = \dfrac{x + 1}{x - 3}$`,
      "Se etter hvor variabelen står: i grunntallet, i eksponenten eller i nevneren? Hva er den høyeste potensen av $x$?",
      [
        "<strong>a)</strong> lineær <strong>b)</strong> andregrad <strong>c)</strong> eksponential",
        "<strong>d)</strong> potens <strong>e)</strong> tredjegrad <strong>f)</strong> rasjonal<br><strong>Svar:</strong> Se over.",
      ],
    ),
    o(
      "P4.23",
      1,
      "uten",
      r`Figuren viser grafene til $f(x) = 4 \cdot 1{,}05^x$ og $g(x) = 4 \cdot 0{,}95^x$.<br><br>` +
        fig("P4.23", "x fra −10 til 10 og y fra 0 til 8, tall ved hver 2. Grafen til f stiger mot høyre, grafen til g synker. Navnene f og g ved grafene. Begge går gjennom (0 , 4).") +
        r`<strong>a)</strong> Grafen til $f$ stiger, og grafen til $g$ synker. Hvordan ser du det i uttrykkene?` +
        del("b") + "Hvor skjærer grafene andreaksen?" +
        del("c") + r`Hvor mange prosent endrer $f(x)$ seg når $x$ øker med 1? Øker eller minker den?` +
        del("d") + r`Svar på det samme for $g(x)$.`,
      r`Se på vekstfaktoren $b$ i $a \cdot b^x$. Er den større eller mindre enn 1?`,
      [
        r`<strong>a)</strong> $f$ har vekstfaktor $1{,}05 > 1$, så grafen stiger. $g$ har vekstfaktor $0{,}95 < 1$, så grafen synker.`,
        `<strong>b)</strong> Begge i ${pt(0, 4)}, fordi $a = 4$.`,
        r`<strong>c)</strong> $1{,}05 = 100\,\% + 5\,\%$. Den øker med $5\,\%$.`,
        r`<strong>d)</strong> $0{,}95 = 100\,\% - 5\,\%$. Den minker med $5\,\%$.<br><strong>Svar:</strong> c) Øker med 5 %. d) Minker med 5 %.`,
      ],
    ),
    o(
      "P4.24",
      2,
      "uten",
      r`Funksjonen $g$ er gitt ved $g(x) = 3x + 2$.` +
        del("a") + r`Hvor mye øker funksjonsverdien når $x$ øker fra 2 til 6?` +
        del("b") + r`Hvilken av funksjonene $m(x) = 2x + 3$, $n(x) = 3x - 5$ og $s(x) = -3x + 2$ har en graf som er parallell med grafen til $g$?` +
        del("c") + r`Hvilken av funksjonene $p(x) = x + 2$, $q(x) = 2x - 3$ og $r(x) = 3 + 2x$ har en graf som skjærer andreaksen i samme punkt som grafen til $g$?`,
      "Parallelle linjer har samme stigningstall. Samme skjæring med andreaksen betyr samme konstantledd.",
      [
        r`<strong>a)</strong> $x$ øker med 4, så funksjonsverdien øker med $3 \cdot 4 = 12$.`,
        r`<strong>b)</strong> $n$, fordi den har samme stigningstall, $3$.`,
        r`<strong>c)</strong> $p$, fordi den har samme konstantledd, $2$.<br><strong>Svar:</strong> a) $12$. b) $n$. c) $p$`,
      ],
    ),
    o(
      "P4.25",
      2,
      "uten",
      "Figuren viser fire rette linjer, nummerert 1–4.<br><br>" +
        fig("P4.25", "x fra −2 til 5 og y fra −4 til 5, skala 1, tall ved hvert heltall. Linje 1 gjennom (0 , 3) og (3 , 0). Linje 2 gjennom (0 , −3) og (3 , 3). Linje 3 vannrett gjennom (0 , −1). Linje 4 gjennom (0 , 1) og (3 , 4). Tallene 1–4 i sirkel ved hver linje.") +
        r`Hvilken linje hører til hvilken funksjon?<br>$f(x) = x + 1$&nbsp;&nbsp;$g(x) = -x + 3$&nbsp;&nbsp;$h(x) = -1$&nbsp;&nbsp;$i(x) = 2x - 3$`,
      "Finn først hvor hver linje skjærer andreaksen. Det er konstantleddet.",
      [
        r`Konstantleddene er $1$, $3$, $-1$ og $-3$. Det passer med linjene 4, 1, 3 og 2.<br><strong>Svar:</strong> $f$: 4, $g$: 1, $h$: 3, $i$: 2`,
      ],
    ),
    o(
      "P4.26",
      2,
      "uten",
      r`Funksjonen $f$ er gitt ved $f(x) = x^2 - 6x + 5$.` +
        del("a") + "Har grafen et toppunkt eller et bunnpunkt? Begrunn." +
        del("b") + "Finn skjæringspunktet med andreaksen." +
        del("c") + "Vis at 1 og 5 er nullpunkter." +
        del("d") + "Finn symmetrilinja og koordinatene til toppunktet eller bunnpunktet.",
      r`Symmetrilinja er $x = -\dfrac{b}{2a}$. Sett $x$-verdien inn i $f$ for å finne andrekoordinaten.`,
      [
        r`<strong>a)</strong> Bunnpunkt, fordi $a = 1 > 0$.`,
        `<strong>b)</strong> ${pt(0, 5)}.`,
        r`<strong>c)</strong> $f(1) = 1 - 6 + 5 = 0$ og $f(5) = 25 - 30 + 5 = 0$.`,
        `<strong>d)</strong> $x = -\\dfrac{-6}{2 \\cdot 1} = 3$. $f(3) = 9 - 18 + 5 = -4$. Bunnpunkt ${pt(3, -4)}.<br><strong>Svar:</strong> d) $x = 3$, bunnpunkt ${pt(3, -4)}`,
      ],
    ),
    o(
      "P4.27",
      2,
      "uten",
      r`<strong>a)</strong> En andregradsfunksjon har nullpunktene $-4$ og $2$. Hva er likningen for symmetrilinja?` +
        del("b") + r`En annen andregradsfunksjon har symmetrilinja $x = 2$ og nullpunktet $-1$. Hva er det andre nullpunktet?`,
      "Symmetrilinja ligger midt mellom de to nullpunktene.",
      [
        r`<strong>a)</strong> $x = \dfrac{-4 + 2}{2} = -1$.`,
        r`<strong>b)</strong> $-1$ ligger $3$ til venstre for $x = 2$. Det andre ligger $3$ til høyre: $5$.<br><strong>Svar:</strong> a) $x = -1$. b) $5$`,
      ],
    ),
    o(
      "P4.28",
      2,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = \dfrac{2x + 2}{x - 3}$.` +
        del("a") + "Tegn grafen. Hvilken type funksjon er dette? Begrunn ut fra uttrykket." +
        del("b") + r`Hvorfor kan vi ikke regne ut $f(3)$?` +
        del("c") + r`Finn asymptotene med kommandoen <code>Asymptote(f)</code>.` +
        del("d") + "Finn nullpunktet og skjæringspunktet med andreaksen." +
        del("e") + r`Finn $x$ slik at $f(x) = 6$.`,
      r`Nullpunktet finner du der telleren er 0. For e) kan du tegne linja $y = 6$.`,
      [
        r`<strong>a)</strong> Rasjonal funksjon, fordi uttrykket er en brøk med $x$ i nevneren.`,
        r`<strong>b)</strong> Nevneren blir $3 - 3 = 0$, og vi kan ikke dele på 0.`,
        r`<strong>c)</strong> $x = 3$ og $y = 2$.`,
        `<strong>d)</strong> Nullpunkt $-1$. Skjæringspunkt med andreaksen ${pt("0", "-\\dfrac{2}{3}")} $\\approx$ ${pt("0", "-0{,}67")}.`,
        r`<strong>e)</strong> $x = 5$.<br><strong>Svar:</strong> c) $x = 3$, $y = 2$. d) $-1$. e) $x = 5$`,
      ],
    ),
    o(
      "P4.29",
      2,
      "med",
      r`Funksjonen $K$ er gitt ved $K(x) = 0{,}5x^2 + \dfrac{8}{x}$, $x \in [1\,,\,6]$. $K$ er en <strong>kombinasjon av funksjoner</strong>: $K(x) = f(x) + g(x)$.` +
        del("a") + r`Skriv opp $f(x)$ og $g(x)$. Hvilke typer funksjoner er $f$ og $g$?` +
        del("b") + r`Regn ut $K(1)$ og $K(4)$.` +
        del("c") + r`Tegn grafen til $K$, og finn bunnpunktet.` +
        del("d") + r`Har $K$ nullpunkter i definisjonsmengden? Begrunn.`,
      r`Del uttrykket i to ledd. For d): Hva er fortegnet til hvert ledd når $x > 0$?`,
      [
        r`<strong>a)</strong> $f(x) = 0{,}5x^2$ (andregrad) og $g(x) = \dfrac{8}{x}$ (rasjonal).`,
        r`<strong>b)</strong> $K(1) = 0{,}5 + 8 = 8{,}5$ og $K(4) = 8 + 2 = 10$.`,
        `<strong>c)</strong> Bunnpunkt ${pt(2, 6)}.`,
        r`<strong>d)</strong> Nei. For $x > 0$ er begge leddene positive, så $K(x) > 0$.<br><strong>Svar:</strong> b) $8{,}5$ og $10$. c) $(2\,,\,6)$. d) Nei.`,
      ],
    ),
    o(
      "P4.33",
      2,
      "med",
      r`Funksjonen $f$ er gitt ved et delt funksjonsuttrykk:<br>$f(x) = 2x + 1$ når $x \le 2$<br>$f(x) = -x^2 + 6x - 3$ når $x > 2$` +
        del("a") + r`Tegn grafen med <code>Dersom(x > 2, -x^2 + 6x - 3, 2x + 1)</code>.` +
        del("b") + r`Regn ut $f(1)$, $f(2)$ og $f(4)$.` +
        del("c") + "Finn toppunktet." +
        del("d") + r`Hvilke to typer funksjoner er $f$ satt sammen av?`,
      r`Sjekk hvilken del av uttrykket som gjelder for hver $x$. $x = 2$ hører til den første delen.`,
      [
        `<strong>a)</strong> Tegning: rett linje opp til ${pt(2, 5)}, deretter en parabel.`,
        r`<strong>b)</strong> $f(1) = 3$, $f(2) = 5$, $f(4) = -16 + 24 - 3 = 5$.`,
        `<strong>c)</strong> ${pt(3, 6)}.`,
        `<strong>d)</strong> En lineær funksjon og en andregradsfunksjon.<br><strong>Svar:</strong> b) $3$, $5$, $5$. c) ${pt(3, 6)}`,
      ],
    ),
    o(
      "P4.30",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = x^3 - 3x^2 + 2$.` +
        del("a") + "Tegn grafen, og finn toppunkt og bunnpunkt." +
        del("b") + "Finn nullpunktene. Svar med to desimaler." +
        del("c") + r`Tegn $g(x) = x^3 - 3x^2 + 2$, $1 < x < 3{,}5$. Finn toppunkt og bunnpunkt. Forklar forskjellen fra a).`,
      r`I GeoGebra kan du skrive <code>Funksjon(x^3 - 3x^2 + 2, 1, 3.5)</code>. Er endepunktene med når intervallet er åpent?`,
      [
        `<strong>a)</strong> Toppunkt ${pt(0, 2)}, bunnpunkt ${pt(2, -2)}.`,
        r`<strong>b)</strong> $x \approx -0{,}73$, $x = 1$ og $x \approx 2{,}73$.`,
        `<strong>c)</strong> Bunnpunkt ${pt(2, -2)}, men ingen toppunkt. Toppunktet ${pt(0, 2)} ligger utenfor definisjonsmengden. Intervallet er åpent, så $x = 1$ og $x = 3{,}5$ er ikke med, og $g$ har ingen største verdi.<br><strong>Svar:</strong> Se over.`,
      ],
    ),
    o(
      "P4.31",
      3,
      "med",
      r`Funksjonene $h$ og $k$ er gitt ved $h(x) = 600 \cdot 0{,}92^x$ og $k(x) = 300 \cdot 1{,}04^x$.` +
        del("a") + r`Hvilken funksjon øker, og hvilken minker? Med hvor mange prosent endrer hver funksjon seg når $x$ øker med 1?` +
        del("b") + "Tegn grafene, og finn skjæringspunktet." +
        del("c") + r`Har $h$ et nullpunkt? Begrunn.` +
        del("d") + r`Hvor mye må $x$ øke for at $k(x)$ skal bli dobbelt så stor?`,
      r`For d): Løs $1{,}04^x = 2$ grafisk, for eksempel med Skjæring mellom $y = 1{,}04^x$ og $y = 2$.`,
      [
        r`<strong>a)</strong> $h$ minker med $8\,\%$, og $k$ øker med $4\,\%$.`,
        `<strong>b)</strong> Omtrent ${pt("5{,}65", 374)}.`,
        r`<strong>c)</strong> Nei. $600 \cdot 0{,}92^x$ er alltid større enn 0.`,
        r`<strong>d)</strong> Omtrent $17{,}7$.<br><strong>Svar:</strong> b) $(5{,}65\,,\,374)$. d) ca. $17{,}7$`,
      ],
    ),
    o(
      "P4.32",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = \sqrt{x + 4}$.` +
        del("a") + r`Tegn grafen. Hvorfor er det ingen graf for $x < -4$?` +
        del("b") + "Hva er den største mulige definisjonsmengden?" +
        del("c") + r`Regn ut $f(5)$, og finn $x$ slik at $f(x) = 5$.` +
        del("d") + r`Funksjonen $g(x) = 2x^{0{,}5}$ er en potensfunksjon. Regn ut $g(16)$. Forklar hvorfor $f$ ikke kan skrives som en potensfunksjon.`,
      r`Hva er $\sqrt{\text{et negativt tall}}$? For c): Hvilket tall har kvadratrot 5?`,
      [
        "<strong>a)</strong> Vi kan ikke ta kvadratroten av et negativt tall.",
        r`<strong>b)</strong> $D_f = [-4\,,\,\rightarrow\rangle$.`,
        r`<strong>c)</strong> $f(5) = \sqrt{9} = 3$. $\sqrt{x + 4} = 5$ gir $x + 4 = 25$, altså $x = 21$.`,
        r`<strong>d)</strong> $g(16) = 2 \cdot 4 = 8$. I $f$ står variabelen inne i rota sammen med $+\,4$, så uttrykket kan ikke skrives som $a \cdot x^b$.<br><strong>Svar:</strong> c) $3$ og $x = 21$. d) $8$`,
      ],
    ),
    o(
      "P4.34",
      3,
      "uten",
      r`Funksjonen $f$ er gitt ved $f(x) = x^2 - 4x + c$. Ved å endre $c$ flytter vi grafen opp eller ned.` +
        del("a") + "Hvor skjærer grafen andreaksen?" +
        del("b") + r`For $c = 4$ er $f(x) = (x - 2)^2$. Hvor mange nullpunkter har $f$ da?` +
        del("c") + r`For hvilke verdier av $c$ har $f$ ingen nullpunkter, og for hvilke har den to?`,
      r`Når $c = 4$, berører bunnpunktet akkurat førsteaksen. Hva skjer når grafen flyttes opp eller ned fra der?`,
      [
        `<strong>a)</strong> I ${pt(0, "c")}.`,
        r`<strong>b)</strong> Ett nullpunkt, $2$.`,
        r`<strong>c)</strong> Ingen nullpunkter når $c > 4$. To nullpunkter når $c < 4$.<br><strong>Svar:</strong> b) Ett. c) Ingen når $c > 4$, to når $c < 4$.`,
      ],
    ),
    o(
      "P4.35",
      3,
      "med",
      r`Et <strong>terrassepunkt</strong> er et punkt der grafen er vannrett, men der grafen stiger (eller synker) på begge sider av punktet. Et terrassepunkt er verken et toppunkt eller et bunnpunkt.<br>Funksjonene $f$ og $g$ er gitt ved $f(x) = x^3$ og $g(x) = x^3 - 6x^2 + 12x - 5$.` +
        del("a") + r`Tegn grafen til $f$. Forklar at origo er et terrassepunkt.` +
        del("b") + `Regn ut $f(-1)$, $f(0)$ og $f(1)$. Hva viser tallene?` +
        del("c") + r`Tegn grafen til $g$. Finn terrassepunktet.` +
        del("d") + r`Hvor mange nullpunkter har $g$?`,
      r`Bruk Tangent i GeoGebra for å se hvor grafen er vannrett.`,
      [
        "<strong>a)</strong> Grafen stiger hele tiden, men er vannrett i origo.",
        r`<strong>b)</strong> $f(-1) = -1$, $f(0) = 0$, $f(1) = 1$. Grafen stiger gjennom origo, så punktet er verken et topp- eller bunnpunkt.`,
        `<strong>c)</strong> Terrassepunkt ${pt(2, 3)}.`,
        r`<strong>d)</strong> Ett nullpunkt, $x \approx 0{,}56$.<br><strong>Svar:</strong> c) $(2\,,\,3)$. d) Ett.`,
      ],
    ),
  ],
};

/* ───────────────────────── P4D Gjennomsnittlig og momentan vekstfart ───────────────────────── */

const dkP4D: Delkapittel = {
  id: "P4D",
  tittel: "4D Gjennomsnittlig og momentan vekstfart",
  quiz: [
    q(r`Hva er vekstfarten til $f(x) = 5x - 1$?`, ["$-1$", "$4$", "$5$", "Den endrer seg"], 2, "For en lineær funksjon er vekstfarten lik stigningstallet, og den er lik overalt.", 1),
    q(r`$f(1) = 4$ og $f(5) = 12$. Hva er den gjennomsnittlige vekstfarten fra $x = 1$ til $x = 5$?`, ["$3$", "$4$", "$8$", "$2$"], 3, r`$\dfrac{12 - 4}{5 - 1} = \dfrac{8}{4} = 2$.`, 1),
    q("Den momentane vekstfarten i et punkt er", ["stigningstallet for tangenten i punktet", "funksjonsverdien i punktet", "gjennomsnittet av alle funksjonsverdier", "avstanden til origo"], 0, "Tangenten berører grafen i punktet. Stigningstallet dens er den momentane vekstfarten.", 2),
    q("Hva er den momentane vekstfarten i et toppunkt?", ["Positiv", "0", "Negativ", "Den finnes ikke"], 1, "Tangenten i et toppunkt er vannrett.", 2),
    q("Den gjennomsnittlige vekstfarten mellom to punkter er negativ. Hva betyr det?", ["Grafen synker hele veien", "Begge punktene ligger under førsteaksen", "Det siste punktet ligger lavere enn det første", "Grafen har et bunnpunkt"], 2, "Endringen i funksjonsverdi er negativ. Grafen kan likevel stige på deler av intervallet.", 3),
  ],
  oppgaver: [
    o(
      "P4.36",
      1,
      "uten",
      r`Funksjonen $f$ er gitt ved $f(x) = 3x - 2$.` +
        del("a") + r`Hva er vekstfarten til $f$?` +
        del("b") + r`Regn ut $f(1)$ og $f(4)$, og finn den gjennomsnittlige vekstfarten fra $x = 1$ til $x = 4$. Kommenter svaret.`,
      r`Gjennomsnittlig vekstfart = $\dfrac{\text{endringen i } f(x)}{\text{endringen i } x}$.`,
      [
        r`<strong>a)</strong> $3$, som er stigningstallet.`,
        r`<strong>b)</strong> $f(1) = 1$ og $f(4) = 10$. $\dfrac{10 - 1}{4 - 1} = \dfrac{9}{3} = 3$. Det er lik stigningstallet, fordi grafen er en rett linje.<br><strong>Svar:</strong> a) $3$. b) $3$`,
      ],
    ),
    o(
      "P4.37",
      1,
      "uten",
      r`Figuren viser grafen til en funksjon $f$ og linja gjennom punktene $A$ og $B$.<br><br>` +
        fig("P4.37", "x fra 0 til 7 og y fra 0 til 16, tall ved hvert heltall på x og ved 0, 2, …, 16 på y. Grafen til f(x) = 0,5x² − 2x + 5 for x fra 0 til 7 (bunnpunkt (2 , 3)). Punktene A (2 , 3) og B (6 , 11). Grå rett linje gjennom A og B. Rød stiplet rettvinklet trekant: vannrett fra A til (6 , 3), loddrett opp til B. Uttrykket står ikke på figuren.") +
        r`<strong>a)</strong> Les av koordinatene til $A$ og $B$.` +
        del("b") + r`Hva er endringen i $x$ og endringen i $f(x)$ fra $A$ til $B$?` +
        del("c") + r`Finn den gjennomsnittlige vekstfarten fra $x = 2$ til $x = 6$.`,
      "Den vannrette kateten i trekanten er endringen i $x$. Den loddrette er endringen i $f(x)$.",
      [
        `<strong>a)</strong> $A$ = ${pt(2, 3)} og $B$ = ${pt(6, 11)}.`,
        r`<strong>b)</strong> Endringen i $x$ er $6 - 2 = 4$. Endringen i $f(x)$ er $11 - 3 = 8$.`,
        r`<strong>c)</strong> $\dfrac{8}{4} = 2$.<br><strong>Svar:</strong> c) $2$`,
      ],
    ),
    o(
      "P4.38",
      1,
      "uten",
      r`Tabellen viser noen verdier for en funksjon $f$.<table><tr><th>$x$</th><td>$0$</td><td>$2$</td><td>$4$</td><td>$6$</td></tr><tr><th>$f(x)$</th><td>$1$</td><td>$5$</td><td>$17$</td><td>$37$</td></tr></table>` +
        "<strong>a)</strong> Finn den gjennomsnittlige vekstfarten fra 0 til 2, fra 2 til 4 og fra 4 til 6." +
        del("b") + r`Kan $f$ være en lineær funksjon? Begrunn.`,
      r`Hver gang øker $x$ med 2. Hvor mye øker $f(x)$?`,
      [
        r`<strong>a)</strong> $\dfrac{5 - 1}{2} = 2$, $\dfrac{17 - 5}{2} = 6$ og $\dfrac{37 - 17}{2} = 10$.`,
        r`<strong>b)</strong> Nei. Vekstfarten er ikke den samme i alle intervallene.<br><strong>Svar:</strong> a) $2$, $6$ og $10$. b) Nei.`,
      ],
    ),
    o(
      "P4.39",
      1,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = 2 \cdot 3^x$. Finn den gjennomsnittlige vekstfarten fra $x = 1$ til $x = 3$. Bruk <code>Linje</code> og <code>Stigning</code> i GeoGebra, eller regn ut.`,
      r`Regn ut $f(1)$ og $f(3)$ først.`,
      [r`$f(1) = 6$ og $f(3) = 2 \cdot 27 = 54$.<br>$\dfrac{54 - 6}{3 - 1} = \dfrac{48}{2} = 24$.<br><strong>Svar:</strong> $24$`],
    ),
    o(
      "P4.40",
      2,
      "uten",
      r`Figuren viser grafen til en funksjon $f$ og tangenten i punktet $A$.<br><br>` +
        fig("P4.40", "x fra 0 til 6 og y fra 0 til 10, skala 1, tall ved hvert heltall. Grafen til f(x) = 0,25x² + 1 for x fra 0 til 6. Punktene A (2 , 2) og B (4 , 5). Grønn tangent gjennom A med likning y = x, tegnet fra (0 , 0) til (6 , 6). Rød stigningstrekant ved A: 1 bort og 1 opp, begge merket 1. Uttrykkene står ikke på figuren.") +
        r`<strong>a)</strong> Hva er den momentane vekstfarten i $A$?` +
        del("b") + r`Er den momentane vekstfarten i $B$ større eller mindre enn i $A$? Begrunn ut fra figuren.`,
      "Bruk stigningstrekanten: Hvor mye går tangenten opp når du går 1 bort?",
      [
        r`<strong>a)</strong> Tangenten går 1 opp for hver 1 bort. Den momentane vekstfarten i $A$ er $1$.`,
        r`<strong>b)</strong> Større. Grafen er brattere i $B$. (Den momentane vekstfarten i $B$ er $2$.)<br><strong>Svar:</strong> a) $1$. b) Større.`,
      ],
    ),
    o(
      "P4.41",
      2,
      "uten",
      r`Figuren viser grafen til en andregradsfunksjon $f$.<br><br>` +
        fig("P4.41", "x fra −1 til 7 og y fra −2 til 5, skala 1, tall ved hvert heltall. Parabel f(x) = −(x − 3)² + 4 med nullpunkter i (1 , 0) og (5 , 0) og toppunkt (3 , 4), tegnet for x fra 0 til 6. Uttrykket står ikke på figuren.") +
        r`<strong>a)</strong> Hva er den momentane vekstfarten når $x = 3$? Begrunn.` +
        del("b") + r`Finn den gjennomsnittlige vekstfarten fra $x = 1$ til $x = 5$. Kommenter.` +
        del("c") + r`Finn den gjennomsnittlige vekstfarten fra $x = 1$ til $x = 3$.`,
      r`Les av $f(1)$, $f(3)$ og $f(5)$ på grafen.`,
      [
        `<strong>a)</strong> $0$, fordi ${pt(3, 4)} er toppunktet og tangenten er vannrett.`,
        r`<strong>b)</strong> $\dfrac{0 - 0}{5 - 1} = 0$. Grafen er symmetrisk om $x = 3$, så punktene ligger like høyt.`,
        r`<strong>c)</strong> $\dfrac{4 - 0}{3 - 1} = 2$.<br><strong>Svar:</strong> a) $0$. b) $0$. c) $2$`,
      ],
    ),
    o(
      "P4.42",
      2,
      "med",
      r`Funksjonen $g$ er gitt ved $g(x) = x^2 - 9$.` +
        del("a") + r`Finn den gjennomsnittlige vekstfarten i intervallet $[-4\,,\,4]$. Kommenter svaret.` +
        del("b") + r`Finn den gjennomsnittlige vekstfarten i intervallet $[0\,,\,4]$.`,
      r`Regn ut $g(-4)$, $g(0)$ og $g(4)$.`,
      [
        r`<strong>a)</strong> $g(-4) = 7$ og $g(4) = 7$. $\dfrac{7 - 7}{8} = 0$. Grafen er symmetrisk om andreaksen, så $g(-4) = g(4)$.`,
        r`<strong>b)</strong> $g(0) = -9$. $\dfrac{7 - (-9)}{4} = 4$.<br><strong>Svar:</strong> a) $0$. b) $4$`,
      ],
    ),
    o(
      "P4.43",
      2,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = 200 \cdot 0{,}8^x$.` +
        del("a") + r`Finn den gjennomsnittlige vekstfarten fra $x = 0$ til $x = 4$.` +
        del("b") + r`Finn den momentane vekstfarten når $x = 2$. Bruk <code>Tangent(2, f)</code>.` +
        del("c") + "Hvorfor er begge svarene negative?",
      r`$0{,}8^4 = 0{,}4096$.`,
      [
        r`<strong>a)</strong> $f(0) = 200$ og $f(4) = 81{,}92$. $\dfrac{81{,}92 - 200}{4} = -29{,}52$.`,
        r`<strong>b)</strong> Stigningstallet til tangenten er omtrent $-28{,}56$.`,
        r`<strong>c)</strong> Vekstfaktoren $0{,}8$ er mindre enn 1, så funksjonen minker hele tiden.<br><strong>Svar:</strong> a) $-29{,}52$. b) ca. $-28{,}56$`,
      ],
    ),
    o(
      "P4.44",
      3,
      "uten",
      r`Figuren viser grafen til en funksjon $f$ med fem punkter $A$–$E$.<br><br>` +
        fig("P4.44", "x fra 0 til 5 og y fra −1 til 5, skala 1, tall ved hvert heltall. Grafen til f(x) = x³ − 6x² + 9x for x fra 0 til 4,3. Punkter: A (0,5 , 3,125), B (1 , 4) toppunkt, C (2 , 2), D (3 , 0) bunnpunkt, E (4 , 4). Bare bokstavene står ved punktene.") +
        "<strong>a)</strong> Er den momentane vekstfarten positiv, negativ eller null i hvert av punktene?" +
        del("b") + r`Er den gjennomsnittlige vekstfarten positiv, negativ eller null fra<br>1) $A$ til $C$&nbsp;&nbsp;2) $B$ til $E$&nbsp;&nbsp;3) $D$ til $E$`,
      "Momentan: Stiger grafen, synker den, eller er den vannrett akkurat i punktet? Gjennomsnittlig: Ligger det siste punktet høyere, lavere eller like høyt som det første?",
      [
        r`<strong>a)</strong> Positiv i $A$ og $E$, negativ i $C$, null i $B$ og $D$.`,
        r`<strong>b)</strong> 1) Negativ ($C$ ligger lavere enn $A$). 2) Null ($B$ og $E$ ligger like høyt, $y = 4$). 3) Positiv.<br><strong>Svar:</strong> Se over.`,
      ],
    ),
    o(
      "P4.45",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = 0{,}25x^3$, $x \in [-2\,,\,2]$.` +
        del("a") + "Tegn grafen." +
        del("b") + "Finn den gjennomsnittlige vekstfarten i hele definisjonsmengden." +
        del("c") + `Finn den momentane vekstfarten i punktene $(-2\\,,\\,f(-2))$ og $(2\\,,\\,f(2))$. Kommenter.`,
      r`$f(-2) = 0{,}25 \cdot (-8)$. Bruk Tangent i GeoGebra for c).`,
      [
        "<strong>a)</strong> Tegning.",
        r`<strong>b)</strong> $f(-2) = -2$ og $f(2) = 2$. $\dfrac{2 - (-2)}{4} = 1$.`,
        r`<strong>c)</strong> $3$ i begge punktene. Grafen er like bratt i de to punktene, og den stiger begge steder.<br><strong>Svar:</strong> b) $1$. c) $3$ og $3$`,
      ],
    ),
    o(
      "P4.46",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = \dfrac{1}{3}x^3 - x^2$. I hvilke punkter er den momentane vekstfarten lik 3?`,
      r`Lag tangenter i flere punkter, eller bruk en glider for $x$-verdien i <code>Tangent</code>. Les av stigningstallet.`,
      [
        r`Med en glider $a$ og <code>Tangent(a, f)</code> ser vi at stigningstallet er $3$ når $a = -1$ og $a = 3$.`,
        `$f(-1) = -\\dfrac{1}{3} - 1 \\approx -1{,}33$ og $f(3) = 9 - 9 = 0$.<br><strong>Svar:</strong> ${pt("-1", "-1{,}33")} og ${pt(3, 0)}`,
      ],
    ),
    o(
      "P4.47",
      3,
      "uten",
      r`Skisser en mulig graf for en andregradsfunksjon $f$ når du vet at<br>• den momentane vekstfarten er 0 når $x = 2$<br>• den gjennomsnittlige vekstfarten i intervallet $[0\,,\,4]$ er 0<br>• $f(2) = 5$, og grafen har et toppunkt<br><br>Forklar hvorfor de to første opplysningene passer sammen. Hva sier den første opplysningen om hvor toppunktet ligger?`,
      r`En parabel er symmetrisk om linja gjennom toppunktet. Hvor ligger $x = 2$ i intervallet $[0\,,\,4]$?`,
      [
        `Skisse: en parabel som vender nedover med toppunkt ${pt(2, 5)}.`,
        r`Tangenten i toppunktet er vannrett, så den momentane vekstfarten er 0 der. Toppunktet ligger altså der $x = 2$.`,
        r`Symmetrilinja $x = 2$ ligger midt i $[0\,,\,4]$, så $f(0) = f(4)$, og den gjennomsnittlige vekstfarten blir 0.<br><strong>Svar:</strong> Se over.`,
      ],
    ),
  ],
};

/* ───────────────────────── P4E Funksjoner i hverdagen ───────────────────────── */

const dkP4E: Delkapittel = {
  id: "P4E",
  tittel: "4E Funksjoner i hverdagen",
  quiz: [
    q("En størrelse øker med like mange prosent hvert år. Hvilken modell passer?", ["Lineær", "Andregrad", "Rasjonal", "Eksponentiell"], 3, r`Like mange prosent gir en eksponentiell modell, $N = G \cdot V^t$.`, 1),
    q(r`Taxiprisen er $P(x) = 15x + 60$ kroner, der $x$ er antall km. Hva betyr $60$?`, ["Fastpris ved start", "Pris per km", "Antall km", "Makspris"], 0, "Konstantleddet er prisen når $x = 0$.", 1),
    q(r`$V(x)$ er liter bensin og $x$ er antall mil. Hvilken enhet har vekstfarten?`, ["L", "L/mil", "mil", "mil/L"], 1, "Enheten for funksjonsverdien delt på enheten for variabelen.", 2),
    q(r`$K(x) = 5000 \cdot 1{,}03^x$. Hva er renten?`, ["$0{,}03\\,\\%$", "$1{,}03\\,\\%$", "$3\\,\\%$", "$30\\,\\%$"], 2, r`$1{,}03 = 100\,\% + 3\,\%$.`, 2),
    q("Hva er gyldighetsområdet til en modell?", ["Alle reelle tall", "De verdiene funksjonen kan få", "Nullpunktene", "De verdiene av variabelen der modellen gjelder"], 3, "Modellen gjelder bare der den gir mening i virkeligheten.", 3),
  ],
  oppgaver: [
    o(
      "P4.48",
      1,
      "uten",
      r`Å leie en bysykkel koster $P(t) = 2t + 15$ kroner, der $t$ er antall minutter.` +
        del("a") + "Hvilken type modell er dette?" +
        del("b") + "Hva koster det å låse opp sykkelen?" +
        del("c") + "Hva koster det per minutt?" +
        del("d") + "Hvor lenge kan du sykle for 75 kr?",
      r`For d): Løs $2t + 15 = 75$.`,
      [
        "<strong>a)</strong> Lineær. <strong>b)</strong> 15 kr. <strong>c)</strong> 2 kr.",
        r`<strong>d)</strong> $t = \dfrac{75 - 15}{2} = 30$.<br><strong>Svar:</strong> d) 30 minutter`,
      ],
    ),
    o(
      "P4.49",
      1,
      "uten",
      "Figuren viser vannhøyden i en tank mens den fylles.<br><br>" +
        fig("P4.49", "Førsteaksen «Tid (timer)» fra 0 til 12, skala 1. Andreaksen «Vannhøyde (cm)» fra 0 til 90, tall ved hver 10. Rett linje fra (0 , 20) til (12 , 80) med fylte endepunkter. Uttrykket h(x) = 5x + 20 står ikke på figuren.") +
        "<strong>a)</strong> Hvordan ser du at dette er en lineær modell?" +
        del("b") + "Hva var vannhøyden ved start, og hvor mye stiger vannet per time?" +
        del("c") + r`Skriv modellen som en lineær funksjon $h(x)$ med definisjonsmengde.`,
      "Les av hvor linja starter, og hvor mye den stiger på 12 timer.",
      [
        "<strong>a)</strong> Grafen er en rett linje. Vannet stiger like mye hver time.",
        r`<strong>b)</strong> 20 cm ved start. $\dfrac{80 - 20}{12} = 5$ cm per time.`,
        r`<strong>c)</strong> $h(x) = 5x + 20$, $D_h = [0\,,\,12]$.<br><strong>Svar:</strong> c) $h(x) = 5x + 20$, $D_h = [0\,,\,12]$`,
      ],
    ),
    o(
      "P4.50",
      1,
      "uten",
      r`Antallet elg i et område er $A(x) = 500 \cdot 0{,}9^x$, der $x$ er antall år etter 2024.` +
        del("a") + "Hvilken type funksjon er dette?" +
        del("b") + "Hvor mange elg var det i 2024?" +
        del("c") + "Hvor mange prosent minker bestanden med per år?",
      r`I 2024 er $x = 0$.`,
      [
        r`<strong>a)</strong> Eksponentialfunksjon. <strong>b)</strong> $A(0) = 500$.`,
        r`<strong>c)</strong> $0{,}9 = 100\,\% - 10\,\%$.<br><strong>Svar:</strong> b) 500. c) 10 %`,
      ],
    ),
    o(
      "P4.51",
      1,
      "med",
      r`Mia setter inn penger på en konto. Beløpet etter $x$ år er $K(x) = 8000 \cdot 1{,}04^x$ kroner.` +
        del("a") + "Hvor mye satte Mia inn, og hva er renten?" +
        del("b") + "Hvor mye står på kontoen etter 5 år? Regn ut, og kontroller med grafen." +
        del("c") + r`Etter hvor mange hele år har beløpet passert 10 000 kr? Bruk linja $y = 10\,000$ og Skjæring.`,
      r`Startverdien er $K(0)$. Vekstfaktoren $1{,}04$ gir renten.`,
      [
        r`<strong>a)</strong> 8000 kr og $4\,\%$.`,
        r`<strong>b)</strong> $8000 \cdot 1{,}04^5 \approx 9733$ kr.`,
        r`<strong>c)</strong> Skjæring ved $x \approx 5{,}69$, så etter 6 år.<br><strong>Svar:</strong> b) ca. 9733 kr. c) 6 år`,
      ],
    ),
    o(
      "P4.52",
      2,
      "med",
      r`En bedrift har overskuddet $O(x) = -0{,}2x^2 + 160x - 20\,000$ kroner når den produserer og selger $x$ enheter, $x > 0$.` +
        del("a") + "Finn det største overskuddet. Hvor mange enheter må bedriften selge da?" +
        del("b") + "Finn nullpunktene. Hva forteller de?" +
        del("c") + r`Finn den gjennomsnittlige vekstfarten fra $x = 100$ til $x = 300$. Hva forteller svaret?` +
        del("d") + "Hvor mange enheter må bedriften selge for å gå med overskudd?",
      "Bruk Ekstremalpunkt og Nullpunkt i GeoGebra. Husk enheten kr per enhet.",
      [
        "<strong>a)</strong> 12 000 kr ved 400 enheter.",
        "<strong>b)</strong> Omtrent 155 og 645. Da går bedriften verken med overskudd eller underskudd.",
        r`<strong>c)</strong> $O(100) = -6000$ og $O(300) = 10\,000$. $\dfrac{10\,000 - (-6000)}{200} = 80$. Overskuddet øker i gjennomsnitt med 80 kr per ekstra enhet fra 100 til 300 enheter.`,
        r`<strong>d)</strong> Grafen ligger over førsteaksen mellom nullpunktene: ca. $155 < x < 645$.<br><strong>Svar:</strong> a) 12 000 kr, 400 enheter. b) ca. 155 og 645. c) 80 kr per enhet. d) Mellom ca. 155 og 645 enheter`,
      ],
    ),
    o(
      "P4.53",
      2,
      "med",
      r`Et radioaktivt stoff brytes ned. Etter $x$ døgn er det $M(x) = 5{,}0 \cdot 0{,}97^x$ gram igjen av stoffet.` +
        del("a") + "Hvor mye stoff var det ved start?" +
        del("b") + "Hvor mange prosent av stoffet brytes ned per døgn?" +
        del("c") + "Finn den momentane vekstfarten etter 10 døgn. Tolk svaret med enhet." +
        del("d") + "<strong>Halveringstiden</strong> er tiden det tar før halvparten av stoffet er borte. Finn halveringstiden.",
      r`For c): <code>Tangent(10, M)</code>. For d): Halvparten av $5{,}0$ g er $2{,}5$ g. Bruk Skjæring med $y = 2{,}5$.`,
      [
        r`<strong>a)</strong> $5{,}0$ g. <strong>b)</strong> $3\,\%$.`,
        r`<strong>c)</strong> Omtrent $-0{,}11$ g/døgn. Etter 10 døgn minker mengden med omtrent $0{,}11$ g per døgn.`,
        r`<strong>d)</strong> Skjæring ved $x \approx 22{,}8$. Halveringstiden er omtrent $22{,}8$ døgn.<br><strong>Svar:</strong> c) ca. $-0{,}11$ g/døgn. d) ca. $22{,}8$ døgn`,
      ],
    ),
    o(
      "P4.54",
      2,
      "med",
      r`Å leie en tilhenger koster 100 kr for opptil 5 timer. Etter det betaler du mer. Prisen er<br>$P(x) = 100$ når $0 \le x \le 5$<br>$P(x) = 50 + 10x$ når $x > 5$<br>der $x$ er antall timer.` +
        del("a") + r`Tegn grafen for $x \in [0\,,\,24]$ med <code>Dersom</code>.` +
        del("b") + "Hva koster det å leie i 3 timer og i 12 timer?" +
        del("c") + "Hvor lenge kan du leie for 230 kr?",
      "Velg riktig del av uttrykket for hver verdi av $x$.",
      [
        r`<strong>a)</strong> Tegning: vannrett linje i 100 opp til $x = 5$, så en stigende linje.`,
        r`<strong>b)</strong> $P(3) = 100$ kr og $P(12) = 50 + 120 = 170$ kr.`,
        r`<strong>c)</strong> $50 + 10x = 230$ gir $x = 18$.<br><strong>Svar:</strong> b) 100 kr og 170 kr. c) 18 timer`,
      ],
    ),
    o(
      "P4.55",
      2,
      "uten",
      "To firmaer leier ut flyttebil.<br>Firma A: 500 kr + 2,00 kr per km. Firma B: 700 kr + 1,20 kr per km." +
        del("a") + r`Lag funksjonene $A(x)$ og $B(x)$ for prisen når du kjører $x$ km.` +
        del("b") + "Hvor mange km må du kjøre for at tilbudene skal være like gode? Hva koster det da?" +
        del("c") + "Hvilket firma bør du velge hvis du skal kjøre 400 km?",
      r`Løs $A(x) = B(x)$.`,
      [
        r`<strong>a)</strong> $A(x) = 500 + 2{,}00x$ og $B(x) = 700 + 1{,}20x$.`,
        r`<strong>b)</strong> $0{,}8x = 200$ gir $x = 250$. Begge koster 1000 kr.`,
        r`<strong>c)</strong> $A(400) = 1300$ og $B(400) = 1180$. Velg firma B.<br><strong>Svar:</strong> b) 250 km, 1000 kr. c) Firma B`,
      ],
    ),
    o(
      "P4.56",
      3,
      "med",
      r`Siri har 44 m gjerde og vil gjerde inn et rektangulært område langs en vegg. Langs veggen trengs det ikke gjerde. De to sidene som står vinkelrett på veggen, er $x$ m hver.<br><br>` +
        fig("P4.56", "Sett ovenfra: en tykk grå strek merket «Vegg» øverst. Et rektangel under veggen, der de tre andre sidene er gjerde (stiplet). De to sidene vinkelrett på veggen er merket x, og siden parallelt med veggen er merket 44 − 2x.") +
        r`<strong>a)</strong> Forklar at siden parallelt med veggen er $(44 - 2x)$ m, og at arealet er $A(x) = x(44 - 2x)$.` +
        del("b") + "Bestem gyldighetsområdet." +
        del("c") + "Finn det største arealet." +
        del("d") + "Hvor lang er siden langs veggen når arealet er størst?",
      r`Gjerdet går bare langs tre sider. Bruk Ekstremalpunkt i GeoGebra.`,
      [
        r`<strong>a)</strong> De to sidene vinkelrett på veggen bruker $2x$ m gjerde. Resten, $44 - 2x$, er siden parallelt med veggen. $A(x) = x(44 - 2x)$.`,
        r`<strong>b)</strong> Begge sidene må være positive: $x > 0$ og $44 - 2x > 0$. $x \in \langle 0\,,\,22\rangle$.`,
        r`<strong>c)</strong> 242 m² når $x = 11$.`,
        r`<strong>d)</strong> $44 - 2 \cdot 11 = 22$ m.<br><strong>Svar:</strong> c) 242 m². d) 22 m`,
      ],
    ),
    o(
      "P4.57",
      3,
      "med",
      r`Av en kvadratisk plate på 12 cm × 12 cm lager vi en eske uten lokk. Vi klipper bort et kvadrat med side $x$ cm i hvert hjørne og bretter opp kantene.<br><br>` +
        fig("P4.57", "Til venstre: kvadrat med side 12 cm, et lite skravert kvadrat med side x i hvert hjørne, midtfeltet merket 12 − 2x, stiplede brettelinjer. Til høyre: åpen eske i perspektiv med bunn (12 − 2x) · (12 − 2x) og høyde x.") +
        r`<strong>a)</strong> Forklar at volumet er $V(x) = x \cdot (12 - 2x)^2$.` +
        del("b") + "Bestem gyldighetsområdet." +
        del("c") + "Finn høyden som gir størst volum, og hvor stort volumet er da.",
      r`Begge sidene i bunnen må være positive. Bruk Ekstremalpunkt i GeoGebra.`,
      [
        r`<strong>a)</strong> Bunnen er $(12 - 2x) \cdot (12 - 2x)$, og høyden er $x$.`,
        r`<strong>b)</strong> $x \in \langle 0\,,\,6\rangle$.`,
        r`<strong>c)</strong> Høyde 2 cm gir $V(2) = 2 \cdot 8^2 = 128$ cm³.<br><strong>Svar:</strong> c) 2 cm, 128 cm³`,
      ],
    ),
    o(
      "P4.58",
      3,
      "med",
      r`Et nettsted hadde 2 000 brukere i januar og 3 200 brukere i juli, 6 måneder senere. La $x$ være antall måneder etter januar.<br>Ali mener brukertallet øker like mye hver måned. Bea mener det øker med like mange prosent hver måned.` +
        del("a") + r`Lag Alis modell $f(x)$.` +
        del("b") + r`Lag Beas modell $g(x)$. Finn vekstfaktoren med fire desimaler.` +
        del("c") + "Når passerer brukertallet 5 000 ifølge hver av modellene?" +
        del("d") + r`Hva gir modellene etter 18 måneder? Hvorfor bør vi være forsiktige med å bruke modellene så langt fram i tid?`,
      r`For b): Løs $2000 \cdot V^6 = 3200$, altså $V = 1{,}6^{1/6}$. For c): Skjæring med $y = 5000$.`,
      [
        r`<strong>a)</strong> $\dfrac{3200 - 2000}{6} = 200$ per måned. $f(x) = 2000 + 200x$.`,
        r`<strong>b)</strong> $V = 1{,}6^{1/6} \approx 1{,}0815$. $g(x) = 2000 \cdot 1{,}0815^x$.`,
        r`<strong>c)</strong> Ali: $2000 + 200x = 5000$ gir $x = 15$. Bea: Skjæring ved $x \approx 11{,}7$.`,
        r`<strong>d)</strong> $f(18) = 5600$ og $g(18) \approx 8190$. Modellene bygger bare på to målinger, og veksten kan endre seg mye.<br><strong>Svar:</strong> c) Ali: etter 15 måneder, Bea: etter ca. 11,7 måneder. d) 5600 og ca. 8190`,
      ],
    ),
    o(
      "P4.59",
      3,
      "med",
      r`En dam har en overflate på 60 m². Alger dekker 3 m² av overflaten, og algeområdet vokser med $20\,\%$ per døgn de neste to ukene.` +
        del("a") + r`Lag en eksponentiell modell $f(t)$ for arealet algene dekker etter $t$ døgn.` +
        del("b") + "Bestem gyldighetsområdet." +
        del("c") + "Når dekker algene halve dammen? Svar i døgn og timer." +
        del("d") + "Hvorfor kan ikke modellen gjelde lenge etter de to ukene?",
      r`Vekstfaktoren er $1 + 0{,}20$. To uker er 14 døgn. Halve dammen er 30 m².`,
      [
        r`<strong>a)</strong> $f(t) = 3 \cdot 1{,}2^t$. <strong>b)</strong> $D_f = [0\,,\,14]$.`,
        r`<strong>c)</strong> Skjæring med $y = 30$ ved $t \approx 12{,}63$. $0{,}63 \cdot 24 \approx 15$, altså 12 døgn og 15 timer.`,
        r`<strong>d)</strong> Algene kan ikke dekke mer enn 60 m². Modellen gir $f(t) = 60$ allerede når $t \approx 16{,}4$.<br><strong>Svar:</strong> c) 12 døgn og 15 timer`,
      ],
    ),
    o(
      "P4.60",
      3,
      "med",
      r`En tank fylles med vann. Etter $x$ minutter er det $V(x) = 0{,}05x^2 + 0{,}5x + 10$ liter i tanken. Tanken rommer 40 L. Bestem gyldighetsområdet til modellen.`,
      r`Når er tanken full? Løs $V(x) = 40$ grafisk.`,
      [r`$V(x) = 40$ gir $x = 20$.<br><strong>Svar:</strong> $x \in [0\,,\,20]$`],
    ),
  ],
};

/* ───────────────────────── Sammendrag ───────────────────────── */

const dkP4SM: Delkapittel = {
  id: "P4SM",
  tittel: "Sammendrag",
  quiz: null,
  oppgaver: [
    s(
      "P4.S1",
      "Koordinater og grafer",
      `<strong>Uten hjelpemidler</strong><br><br>Et punkt skrives $(x\\,,\\,y)$. Et punkt ligger på grafen til $f$ når $y = f(x)$.<br><br><strong>Prøv:</strong> Ligger ${pt(-2, 3)} på grafen til $f(x) = x^2 - 1$?`,
      r`Regn ut $f(-2)$.`,
      [`$f(-2) = 4 - 1 = 3$.<br><strong>Svar:</strong> Ja, ${pt(-2, 3)} ligger på grafen.`],
    ),
    s(
      "P4.S2",
      "Definisjonsmengde og verdimengde",
      r`<strong>Uten hjelpemidler</strong><br><br>Definisjonsmengden $D_f$ er de $x$-verdiene vi kan bruke. Verdimengden $V_f$ er de funksjonsverdiene vi får.<br><br><strong>Prøv:</strong> Finn $V_f$ når $f(x) = 2x + 1$, $D_f = [0\,,\,3]$.`,
      r`Grafen stiger, så den minste og største verdien ligger i endepunktene.`,
      [r`$f(0) = 1$ og $f(3) = 7$.<br><strong>Svar:</strong> $V_f = [1\,,\,7]$`],
    ),
    s(
      "P4.S3",
      "Andregradsfunksjoner",
      r`<strong>Uten hjelpemidler</strong><br><br>Grafen til $f(x) = ax^2 + bx + c$ er en parabel. Den har bunnpunkt når $a > 0$ og toppunkt når $a < 0$. Symmetrilinja er $x = -\dfrac{b}{2a}$.<br><br><strong>Prøv:</strong> Finn nullpunktene, symmetrilinja og bunnpunktet til $f(x) = x^2 - 4x$.`,
      r`$x^2 - 4x = x(x - 4)$.`,
      [`Nullpunkter $0$ og $4$. Symmetrilinja $x = 2$. $f(2) = -4$.<br><strong>Svar:</strong> Bunnpunkt ${pt(2, -4)}`],
    ),
    s(
      "P4.S4",
      "Gjennomsnittlig og momentan vekstfart",
      r`<strong>Uten hjelpemidler</strong><br><br>Gjennomsnittlig vekstfart fra $x_1$ til $x_2$ er $\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$. Momentan vekstfart er stigningstallet til tangenten.<br><br><strong>Prøv:</strong> Finn den gjennomsnittlige vekstfarten til $f(x) = x^2$ fra $x = 1$ til $x = 3$.`,
      r`$f(1) = 1$ og $f(3) = 9$.`,
      [r`$\dfrac{9 - 1}{3 - 1} = 4$.<br><strong>Svar:</strong> $4$`],
    ),
    s(
      "P4.S5",
      "Modeller",
      r`<strong>Uten hjelpemidler i a).</strong> <em>Med hjelpemidler i b).</em><br><br>Lik endring hver periode gir en lineær modell. Lik prosentvis endring gir en eksponentiell modell, $N = G \cdot V^t$.<br><br><strong>Prøv:</strong> Et beløp på 1200 kr øker med $3\,\%$ per år.<br><strong>a)</strong> Skriv en modell $K(x)$.<br><strong>b)</strong> Hva er beløpet etter 2 år?`,
      r`Vekstfaktoren er $1{,}03$.`,
      [r`<strong>a)</strong> $K(x) = 1200 \cdot 1{,}03^x$.<br><strong>b)</strong> $1200 \cdot 1{,}03^2 = 1273{,}08$.<br><strong>Svar:</strong> b) 1273,08 kr`],
    ),
  ],
};

/* ───────────────────────── Øveprøve ───────────────────────── */

const dkP4OP: Delkapittel = {
  id: "P4OP",
  tittel: "Øveprøve",
  quiz: [
    q(r`Hva er nullpunktet til $f(x) = -2x + 8$?`, ["$4$", "$-4$", "$8$", "$-2$"], 0, r`$-2x + 8 = 0$ gir $x = 4$.`, 1),
    q(r`Verdien til en båt er $420\,000 \cdot 0{,}88^x$. Hvor mange prosent taper den per år?`, ["$8{,}8\\,\\%$", "$12\\,\\%$", "$88\\,\\%$", "$0{,}12\\,\\%$"], 1, r`$0{,}88 = 100\,\% - 12\,\%$.`, 2),
    q(r`$f(1) = 2$ og $f(4) = 11$. Gjennomsnittlig vekstfart?`, ["$9$", "$2{,}75$", "$3$", "$4$"], 2, r`$\dfrac{11 - 2}{4 - 1} = 3$.`, 2),
  ],
  oppgaver: [
    s(
      "P4.OP0",
      "Om øveprøven",
      "<strong>Kapittel 4 · Funksjoner</strong><br><strong>Tid:</strong> ca. 60 min<br><br><strong>Del 1 – Uten hjelpemidler</strong> (oppgave 1–3)<br><strong>Del 2 – Med hjelpemidler</strong> (oppgave 4–6), bruk GeoGebra.<br><br>Vis hvordan du tenker. Hver bokstav teller for seg.",
      "Les gjennom hele prøven før du starter.",
      ["Lykke til!"],
    ),
    o(
      "P4.OP1",
      1,
      "uten",
      r`Funksjonen $f$ er gitt ved $f(x) = -2x + 8$.` +
        del("a") + r`Regn ut $f(3)$.` +
        del("b") + "Finn nullpunktet." +
        del("c") + r`Finn $x$ slik at $f(x) = 12$.`,
      r`Sett inn, eller løs en likning.`,
      [
        r`<strong>a)</strong> $f(3) = -6 + 8 = 2$.`,
        r`<strong>b)</strong> $-2x + 8 = 0$ gir $x = 4$.`,
        r`<strong>c)</strong> $-2x + 8 = 12$ gir $x = -2$.<br><strong>Svar:</strong> a) $2$. b) $4$. c) $-2$`,
      ],
    ),
    o(
      "P4.OP2",
      2,
      "uten",
      r`Tabellen viser noen verdier for en funksjon $g$.<table><tr><th>$x$</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td></tr><tr><th>$g(x)$</th><td>$5$</td><td>$8$</td><td>$11$</td><td>$14$</td></tr></table>` +
        "<strong>a)</strong> Forklar at $g$ kan være en lineær funksjon." +
        del("b") + r`Finn et uttrykk for $g(x)$.`,
      r`Hvor mye øker $g(x)$ hver gang $x$ øker med 1?`,
      [
        r`<strong>a)</strong> $g(x)$ øker med 3 hver gang $x$ øker med 1.`,
        r`<strong>b)</strong> $g(x) = 3x + 5$.<br><strong>Svar:</strong> b) $g(x) = 3x + 5$`,
      ],
    ),
    o(
      "P4.OP3",
      2,
      "uten",
      "Et treningssenter tar 300 kr i innmelding og 250 kr per måned." +
        del("a") + r`Skriv en modell $P(x)$ for hva det koster å trene i $x$ måneder.` +
        del("b") + "Hva koster ett år?" +
        del("c") + "Hvor mange måneder kan du trene for 2300 kr?",
      "Innmeldingen er konstantleddet. Prisen per måned er stigningstallet.",
      [
        r`<strong>a)</strong> $P(x) = 250x + 300$.`,
        r`<strong>b)</strong> $P(12) = 3000 + 300 = 3300$ kr.`,
        r`<strong>c)</strong> $250x + 300 = 2300$ gir $x = 8$.<br><strong>Svar:</strong> b) 3300 kr. c) 8 måneder`,
      ],
    ),
    o(
      "P4.OP4",
      2,
      "med",
      r`Verdien til en båt er $B(x) = 420\,000 \cdot 0{,}88^x$ kroner, der $x$ er antall år etter kjøpet.` +
        del("a") + "Hvor mange prosent taper båten i verdi per år?" +
        del("b") + "Hvor mange kroner taper båten i verdi det første året?" +
        del("c") + "Hva er båten verdt etter 4 år?" +
        del("d") + "Når er båten verdt mindre enn 200 000 kr?",
      r`For d): Skjæring med $y = 200\,000$.`,
      [
        r`<strong>a)</strong> $0{,}88 = 100\,\% - 12\,\%$, så $12\,\%$.`,
        r`<strong>b)</strong> $0{,}12 \cdot 420\,000 = 50\,400$ kr.`,
        r`<strong>c)</strong> $420\,000 \cdot 0{,}88^4 \approx 251\,872$ kr.`,
        r`<strong>d)</strong> Skjæring ved $x \approx 5{,}8$. Båten er verdt mindre enn 200 000 kr etter omtrent 5,8 år, altså i løpet av det 6. året.<br><strong>Svar:</strong> b) 50 400 kr. c) ca. 251 872 kr. d) etter ca. 5,8 år`,
      ],
    ),
    o(
      "P4.OP5",
      3,
      "med",
      r`En ball kastes opp. Høyden over bakken er $h(t) = -5t^2 + 20t + 1{,}5$ meter etter $t$ sekunder.` +
        del("a") + "Hvor høyt kommer ballen, og når?" +
        del("b") + "Når treffer ballen bakken? Bestem gyldighetsområdet." +
        del("c") + "Finn den gjennomsnittlige vekstfarten det første sekundet. Tolk svaret med enhet.",
      "Bruk Ekstremalpunkt og Nullpunkt i GeoGebra.",
      [
        r`<strong>a)</strong> Toppunkt $(2\,,\,21{,}5)$: 21,5 m etter 2 s.`,
        r`<strong>b)</strong> $t \approx 4{,}07$. Gyldighetsområdet er $[0\,,\,4{,}07]$.`,
        r`<strong>c)</strong> $h(0) = 1{,}5$ og $h(1) = 16{,}5$. $\dfrac{16{,}5 - 1{,}5}{1} = 15$ m/s. Ballen stiger i gjennomsnitt 15 m per sekund det første sekundet.<br><strong>Svar:</strong> a) 21,5 m etter 2 s. b) ca. 4,07 s. c) 15 m/s`,
      ],
    ),
    o(
      "P4.OP6",
      3,
      "med",
      r`Funksjonen $f$ er gitt ved $f(x) = x^3 - 6x^2 + 9x + 1$, $x \in [0\,,\,4]$.` +
        del("a") + "Tegn grafen, og finn toppunktet og bunnpunktet inne i intervallet." +
        del("b") + r`Finn den momentane vekstfarten når $x = 2$.` +
        del("c") + r`Finn den største verdien til $f$. For hvilke $x$ får vi den?`,
      "Husk å sjekke endepunktene i definisjonsmengden.",
      [
        `<strong>a)</strong> Toppunkt ${pt(1, 5)} og bunnpunkt ${pt(3, 1)}.`,
        r`<strong>b)</strong> Tangenten har stigningstall $-3$.`,
        r`<strong>c)</strong> $f(1) = 5$ og $f(4) = 64 - 96 + 36 + 1 = 5$. Største verdi er 5, for $x = 1$ og $x = 4$.<br><strong>Svar:</strong> b) $-3$. c) 5, når $x = 1$ og $x = 4$`,
      ],
    ),
  ],
};

export const KAP4_1P: Kapittel = {
  id: "p1kap4",
  tittel: "Kapittel 4 Funksjoner og grafer",
  delkapitler: [dkP4A, dkP4B, dkP4C, dkP4D, dkP4E, dkP4SM, dkP4OP],
};
