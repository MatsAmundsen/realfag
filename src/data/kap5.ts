import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "./types";

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

function q(sporsmal: string, alternativer: string[], riktigSvar: number, forklaring: string): QuizQuestion {
  return { sporsmal, alternativer, riktigSvar, forklaring };
}

function signSvg(
  ticks: { label: string; kind: "zero" | "pole" }[],
  left: string,
  mids: string[],
  right: string,
): string {
  const w = 520;
  const y = 36;
  const pad = 48;
  const n = ticks.length;
  const xs = ticks.map((_, i) => pad + ((w - 2 * pad) * i) / Math.max(n - 1, 1));
  const axis = `<line x1="16" y1="${y}" x2="${w - 16}" y2="${y}" stroke="currentColor" stroke-width="2"/>
    <polygon points="${w - 16},${y} ${w - 28},${y - 5} ${w - 28},${y + 5}" fill="currentColor"/>`;
  const marks = ticks
    .map((t, i) => {
      const x = xs[i]!;
      const dot =
        t.kind === "pole"
          ? `<text x="${x}" y="${y + 5}" text-anchor="middle" font-size="16" fill="currentColor">×</text>`
          : `<circle cx="${x}" cy="${y}" r="5" fill="currentColor"/>`;
      return `${dot}<text x="${x}" y="${y + 22}" text-anchor="middle" font-size="13" fill="currentColor">${t.label}</text>`;
    })
    .join("");
  const segs: { x1: number; x2: number; s: string }[] = [
    { x1: 20, x2: xs[0]! - 10, s: left },
    ...mids.map((s, i) => ({ x1: xs[i]! + 10, x2: xs[i + 1]! - 10, s })),
    { x1: xs[n - 1]! + 10, x2: w - 30, s: right },
  ];
  const signs = segs
    .map(
      (g) =>
        `<text x="${(g.x1 + g.x2) / 2}" y="${y - 12}" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">${g.s}</text>
         <line x1="${g.x1}" y1="${y}" x2="${g.x2}" y2="${y}" stroke="currentColor" stroke-width="4" stroke-dasharray="${g.s === "−" || g.s === "-" ? "6 5" : "0"}" opacity="${g.s === "−" || g.s === "-" ? "0.55" : "1"}"/>`,
    )
    .join("");
  return `<svg viewBox="0 0 ${w} 70" width="100%" role="img" aria-label="Fortegnslinje" style="max-width:34rem;margin:0.6rem 0">${axis}${signs}${marks}</svg>`;
}

const dk5A: Delkapittel = {
  id: "5A",
  tittel: "5A To ukjente",
  quiz: [
    q("Hva er en løsning på et likningssett med to ukjente?", ["Et tall $x$", "Et par $(x,y)$ som passer i begge likningene", "Skjæringspunktet med $y$-aksen", "Summen $x+y$"], 1, "Begge likningene må være sanne samtidig."),
    q("Grafisk er løsningen på to lineære likninger", ["skjæringspunktet mellom de to linjene", "arealet mellom linjene", "stigningstallet", "origo"], 0, "Hvert punkt på en linje oppfyller én likning. Begge samtidig: skjæringen."),
    q("To linjer med samme stigningstall og ulike konstantledd gir", ["én løsning", "to løsninger", "ingen løsning", "uendelig mange"], 2, "Parallelle linjer møtes aldri."),
    q("Addisjonsmetoden går ut på å", ["legge sammen $x$ og $y$", "gange og legge sammen likninger slik at én ukjent faller bort", "tegne grafene", "gjette"], 1, "Målet er at koeffisientene foran én ukjent blir motsatte."),
  ],
  oppgaver: [
    o(
      "5.1",
      "Et par $(x,y)$ er løsning på et likningssett bare hvis det passer i <em>begge</em> likningene.<br><br>Grafene til $f(x) = -\\dfrac{1}{2}x + 4$ og $g(x) = 2x - 1$ er to rette linjer.<br><br><strong>a)</strong> Les av (eller regn ut) skjæringspunktet.<br><br><strong>b)</strong> Skriv de to linjene som et likningssett med $x$ og $y$.<br><br><strong>c)</strong> Kontroller at paret fra <strong>a)</strong> passer i begge likningene.",
      "Sett $f(x)=g(x)$ for å finne $x$. Deretter $y=f(x)$.",
      [
        "<strong>a)</strong> $-\\dfrac{1}{2}x+4=2x-1$<br>$5=\\dfrac{5}{2}x$<br>$x=2$, $y=2\\cdot 2-1=3$. Skjæringspunkt $(2,3)$.",
        "<strong>b)</strong> $y=-\\dfrac{1}{2}x+4$ og $y=2x-1$, eller $x+2y=8$ og $-2x+y=-1$.",
        "<strong>c)</strong> $3=-1+4$ og $3=4-1$. Begge stemmer.<br><strong>Svar:</strong> $(2,3)$",
      ],
    ),
    o(
      "5.2",
      "Løs med innsettingsmetoden.<br>$$\\begin{cases}4x-y=10\\\\ x+3y=9\\end{cases}$$<br>Grafene til $f(x)=4x-10$ og $g(x)=\\dfrac{9-x}{3}$ vises under — les av skjæringspunktet og kontroller ved regning.",
      "Løs den første for $y$ og sett inn i den andre.",
      [
        "$y=4x-10$.<br>$x+3(4x-10)=9$<br>$13x-30=9$<br>$13x=39$, $x=3$, $y=2$.<br><strong>Svar:</strong> $(3,2)$",
      ],
    ),
    o(
      "5.3",
      "Løs med addisjonsmetoden.<br>$$\\begin{cases}3x+2y=7\\\\ x-2y=1\\end{cases}$$<br>Samme sett som linjene $f(x)=\\dfrac{7-3x}{2}$ og $g(x)=\\dfrac{x-1}{2}$.",
      "Koeffisientene foran $y$ er allerede motsatte. Legg sammen.",
      [
        "Sum: $4x=8$, $x=2$.<br>$2-2y=1$, $y=\\dfrac{1}{2}$.<br><strong>Svar:</strong> $\\left(2,\\dfrac{1}{2}\\right)$",
      ],
    ),
    o(
      "5.4",
      "Løs settet. Gang med fellesnevner først.<br>$$\\begin{cases}\\dfrac{1}{2}x+y=4\\\\ x-\\dfrac{1}{3}y=1\\end{cases}$$<br>Grafene til $f(x)=4-\\dfrac{1}{2}x$ og $g(x)=3x-3$ vises under.",
      "Gang den første med $2$ og den andre med $3$.",
      [
        "Fra den første: $y=4-\\dfrac{x}{2}$.<br>$x-\\dfrac{1}{3}\\left(4-\\dfrac{x}{2}\\right)=1$<br>$\\dfrac{7x}{6}=\\dfrac{7}{3}$<br>$x=2$, $y=3$.<br><strong>Svar:</strong> $(2,3)$",
      ],
    ),
    o(
      "5.5",
      "Rydd likningene, og løs deretter.<br><br><strong>a)</strong> $2x=6-y$ og $x+y=5$<br><br><strong>b)</strong> $y-x=3$ og $2y+x=12$",
      "Få alle ledd over på venstre side før du velger metode.",
      [
        "<strong>a)</strong> $2x+y=6$ og $x+y=5$. Trekk: $x=1$, $y=4$.<br><strong>Svar:</strong> $(1,4)$",
        "<strong>b)</strong> Legg sammen: $3y=15$, $y=5$, $x=2$.<br><strong>Svar:</strong> $(2,5)$",
      ],
    ),
    o(
      "5.6",
      "Grafene til $f(x)=2x+1$ og $g(x)=2x-4$ er tegnet under.<br><br><strong>a)</strong> Hvor mange skjæringspunkt har linjene?<br><br><strong>b)</strong> Hva sier det om likningssettet $y=2x+1$, $y=2x-4$?<br><br><strong>c)</strong> Endre konstantleddet i $g$ slik at settene får uendelig mange løsninger.",
      "Samme stigningstall betyr parallelle linjer — med mindre de er samme linje.",
      [
        "<strong>a)</strong> Ingen. Linjene er parallelle.",
        "<strong>b)</strong> Settet har ingen løsning.",
        "<strong>c)</strong> $g(x)=2x+1$ (samme som $f$). Da er det samme linje.<br><strong>Svar:</strong> ingen løsning; uendelig mange når $g(x)=2x+1$",
      ],
    ),
    o(
      "5.7",
      "Vi har settet<br>$$\\begin{cases}mx+y=4\\\\ 2x+y=6\\end{cases}$$<br>der $m$ er et reelt tall.<br>Når $m=1$: $f(x)=4-x$ og $g(x)=6-2x$ (én løsning). Når $m=2$: $p(x)=4-2x$ sammen med $g$ (parallelle).<br><br><strong>a)</strong> Trekk likningene fra hverandre. Hva får du for $x$?<br><br><strong>b)</strong> For hvilke $m$ har settet nøyaktig én løsning?<br><br><strong>c)</strong> For hvilke $m$ har settet ingen løsning?<br><br><strong>d)</strong> Kan $m$ gi uendelig mange løsninger? Begrunn.",
      "Når $m=2$ forsvinner $x$. Da sitter du igjen med et utsagn som enten er sant eller usant.",
      [
        "<strong>a)</strong> $(m-2)x=-2$, så $x=\\dfrac{-2}{m-2}$ når $m\\neq 2$.",
        "<strong>b)</strong> $m\\neq 2$. Da finnes nøyaktig ett par $(x,y)$.",
        "<strong>c)</strong> $m=2$ gir $0=-2$, som er usant. Ingen løsning.",
        "<strong>d)</strong> Nei. Når $m=2$ blir den første $2x+y=4$ og den andre $2x+y=6$. To ulike parallelle linjer.<br><strong>Svar:</strong> én løsning for $m\\neq 2$, ingen for $m=2$, aldri uendelig mange",
      ],
    ),
    o(
      "5.8",
      "Løs settet på to måter, og kontroller.<br>$$\\begin{cases}x-2y=-1\\\\ 3x+y=11\\end{cases}$$<br>Grafene til $f(x)=\\dfrac{x+1}{2}$ og $g(x)=11-3x$ vises under.<br><br><strong>a)</strong> Innsetting.<br><br><strong>b)</strong> Addisjon.<br><br><strong>c)</strong> Sett paret inn i begge likningene.",
      "Fra den andre: $y=11-3x$.",
      [
        "<strong>a)</strong> $x-2(11-3x)=-1$<br>$7x=21$, $x=3$, $y=2$.",
        "<strong>b)</strong> Gang den andre med $2$: $6x+2y=22$. Legg til den første: $7x=21$. Samme par.",
        "<strong>c)</strong> $3-4=-1$ og $9+2=11$.<br><strong>Svar:</strong> $(3,2)$",
      ],
    ),
  ],
};

const dk5B: Delkapittel = {
  id: "5B",
  tittel: "5B Modellering med likningssett",
  quiz: [
    q("I en modell $P=ar+b$ med to gitte punkt er $a$ og $b$", ["frie", "bestemt entydig av de to punktene", "alltid 1 og 0", "umulige å finne"], 1, "To punkt på en linje gir to likninger og to ukjente."),
    q("«$25\\,\\%$ av guttene» i et sett skrives", ["$0{,}25g$", "$25g$", "$g+25$", "$g/25$"], 0, "Prosent er desimaltall i likningen."),
    q("Hvorfor trenger vi to likninger for å finne to priser?", ["Fordi vi liker ekstra arbeid", "To ukjente krever to uavhengige opplysninger", "Priser er alltid hele tall", "Grafen må være en parabel"], 1, "Ett krav per ukjent, og kravene må være ulike."),
    q("Hvis du bare kjenner totalsummen $e+v=210$, kan du finne $e$ og $v$?", ["Ja, entydig", "Nei, uendelig mange par passer", "Bare hvis $e=v$", "Bare grafisk"], 1, "Én likning med to ukjente har uendelig mange løsninger."),
  ],
  oppgaver: [
    o(
      "5.9",
      "I en quiz-app gis poeng etter $P=ar+b$, der $r$ er antall riktige.<br>Åtte riktige ga $35$ poeng. Fjorten riktige ga $53$ poeng.<br><br><strong>a)</strong> Sett opp et likningssett for $a$ og $b$.<br><br><strong>b)</strong> Finn modellen.<br><br><strong>c)</strong> Hvor mange poeng gir $20$ riktige?",
      "To punkt på en rett linje. Trekk likningene fra hverandre.",
      [
        "<strong>a)</strong> $8a+b=35$ og $14a+b=53$.",
        "<strong>b)</strong> $6a=18$, $a=3$, $b=11$. $P=3r+11$.",
        "<strong>c)</strong> $P(20)=71$.<br><strong>Svar:</strong> $P=3r+11$, $71$ poeng",
      ],
    ),
    o(
      "5.10",
      "På en skole er det $800$ elever. $25\\,\\%$ av guttene og $40\\,\\%$ av jentene sykler. Til sammen sykler $248$ elever.<br><br><strong>a)</strong> La $g$ og $j$ være antall gutter og jenter. Sett opp et sett.<br><br><strong>b)</strong> Finn $g$ og $j$.<br><br><strong>c)</strong> Hvor mange av syklistene er jenter?",
      "Én likning teller elever, én teller syklister.",
      [
        "<strong>a)</strong> $g+j=800$ og $0{,}25g+0{,}40j=248$.",
        "<strong>b)</strong> $g=800-j$. $200+0{,}15j=248$, $j=320$, $g=480$.",
        "<strong>c)</strong> $0{,}40\\cdot 320=128$.<br><strong>Svar:</strong> $480$ gutter, $320$ jenter, $128$ jenter sykler",
      ],
    ),
    o(
      "5.11",
      "Et juicebar selger eplemost og appelsinmost. $3$ L eple og $2$ L appelsin kostet $86$ kr. $1$ L eple og $4$ L appelsin kostet $92$ kr.<br><br><strong>a)</strong> Sett opp settet for literprisene $e$ og $a$.<br><br><strong>b)</strong> Finn prisene.<br><br><strong>c)</strong> Hva koster $2$ L eple og $3$ L appelsin?",
      "Hver kunde gir én likning.",
      [
        "<strong>a)</strong> $3e+2a=86$ og $e+4a=92$.",
        "<strong>b)</strong> $e=92-4a$. $276-10a=86$, $a=19$, $e=16$.",
        "<strong>c)</strong> $32+57=89$ kr.<br><strong>Svar:</strong> eple $16$ kr/L, appelsin $19$ kr/L",
      ],
    ),
    o(
      "5.12",
      "To abonnement, $x$ GB per måned. A koster $199$ kr pluss $2$ kr per GB: $f(x)=2x+199$. B koster $99$ kr pluss $6$ kr per GB: $g(x)=6x+99$. Grafene vises under.<br><br><strong>a)</strong> Hva betyr stigningstallene og konstantleddene?<br><br><strong>b)</strong> For hvilken $x$ koster de like mye?<br><br><strong>c)</strong> Når er A billigst?",
      "Sett $f(x)=g(x)$.",
      [
        "<strong>a)</strong> $2$ og $6$ er kroner per GB. $199$ og $99$ er fast månedspris.",
        "<strong>b)</strong> $2x+199=6x+99$, $100=4x$, $x=25$.",
        "<strong>c)</strong> $f<g$ når $x>25$ (A har lavere GB-pris).<br><strong>Svar:</strong> like ved $25$ GB, A billigst etter det",
      ],
    ),
    o(
      "5.13",
      "Et laboratorium blander $12\\,\\%$ og $3\\,\\%$ saltløsning til $9$ liter med $7\\,\\%$ salt.<br><br><strong>a)</strong> La $x$ være liter $12\\,\\%$-løsning og $y$ liter $3\\,\\%$. Sett opp settet.<br><br><strong>b)</strong> Finn $x$ og $y$.",
      "Én likning for volum, én for saltmengde.",
      [
        "<strong>a)</strong> $x+y=9$ og $0{,}12x+0{,}03y=0{,}07\\cdot 9=0{,}63$.",
        "<strong>b)</strong> $0{,}12x+0{,}03(9-x)=0{,}63$<br>$0{,}09x+0{,}27=0{,}63$<br>$x=4$, $y=5$.<br><strong>Svar:</strong> $4$ L av $12\\,\\%$ og $5$ L av $3\\,\\%$",
      ],
    ),
    o(
      "5.14",
      "En kafé solgte $150$ kaker. Noen til $32$ kr og resten til $48$ kr. Kassen viste $5880$ kr.<br><br><strong>a)</strong> Sett opp et sett.<br><br><strong>b)</strong> Finn antall av hver type.<br><br><strong>c)</strong> En kollega sier: «Hvis alle hadde kostet $48$ kr, ville inntekten vært $7200$ kr. Differansen forteller hvor mange som var billige.» Stemmer det?",
      "Differansen $48-32=16$ kr er «rabatten» per billig kake.",
      [
        "<strong>a)</strong> $b+d=150$ og $32b+48d=5880$.",
        "<strong>b)</strong> $d=150-b$. $32b+48(150-b)=5880$<br>$-16b+7200=5880$, $b=82$, $d=68$.",
        "<strong>c)</strong> Ja: $7200-5880=1320$, og $1320/16=82$.<br><strong>Svar:</strong> $82$ til $32$ kr og $68$ til $48$ kr",
      ],
    ),
    o(
      "5.15",
      "En linje gjennom $(0,80)$ og $(10,130)$ beskriver inntekt $I$ i kroner som funksjon av antall solgte $x$. En annen linje gjennom $(0,40)$ og $(10,90)$ beskriver kostnad $K$.<br>Kontrollgraf: $I(x)=5x+80$ og $K(x)=5x+40$ — er linjene parallelle?<br><br><strong>a)</strong> Finn $I(x)$ og $K(x)$ fra punktene (uten å lese av kontrollgrafen først).<br><br><strong>b)</strong> Når er inntekten lik kostnaden?<br><br><strong>c)</strong> Hva betyr det for butikken?",
      "Stigningstall: $\\Delta y/\\Delta x$.",
      [
        "<strong>a)</strong> $I(x)=5x+80$, $K(x)=5x+40$.",
        "<strong>b)</strong> $5x+80=5x+40$ har ingen løsning. Linjene er parallelle.",
        "<strong>c)</strong> Inntekten ligger alltid $40$ kr over kostnaden. De blir aldri like — overskuddet er konstant $40$ kr.<br><strong>Svar:</strong> aldri like; overskudd $40$ kr uansett $x$",
      ],
    ),
  ],
};

const dk5C: Delkapittel = {
  id: "5C",
  tittel: "5C Tre ukjente",
  quiz: [
    q("Hvor mange uavhengige likninger trenger du vanligvis for tre ukjente?", ["1", "2", "3", "6"], 2, "Én uavhengig likning per ukjent."),
    q("Hvis du kan isolere $z$ fra én likning, er neste steg å", ["gjette $z$", "sette uttrykket inn i de andre likningene", "tegne i 3D", "gange med $z$"], 1, "Innsetting reduserer antallet ukjente."),
    q("Summen av tre likninger $2k+a+e=73$, $k+2a+e=71$, $k+a+2e=68$ gir", ["$k+a+e=53$", "$k+a+e=212$", "$k=0$", "ingenting nytt"], 0, "Venstre side blir $4(k+a+e)=212$."),
    q("Et sett med tre like likninger har", ["alltid én løsning", "enten ingen, én linje av løsninger, eller alt rom", "alltid ingen løsning", "alltid tre løsninger"], 1, "Avhengige likninger gir færre krav."),
  ],
  oppgaver: [
    o(
      "5.16",
      "Løs<br>$$\\begin{cases}x+y+z=9\\\\ x=2y\\\\ z=y+1\\end{cases}$$<br><br><strong>a)</strong> Bytt ut $x$ og $z$ slik at du får én likning i $y$.<br><br><strong>b)</strong> Finn alle tre verdiene.<br><br><strong>c)</strong> Kontroller summen.",
      "De to siste likningene er allerede løst for $x$ og $z$.",
      [
        "<strong>a)</strong> $2y+y+(y+1)=9$, $4y+1=9$.",
        "<strong>b)</strong> $y=2$, $x=4$, $z=3$.",
        "<strong>c)</strong> $4+2+3=9$.<br><strong>Svar:</strong> $(4,2,3)$",
      ],
    ),
    o(
      "5.17",
      "Tre venner handler i samme bod. La $k$, $a$ og $e$ være prisen per kg for kiwi, ananas og eple.<br><br>Liv: $2$ kg kiwi, $1$ kg ananas, $1$ kg eple — $73$ kr<br>Noor: $1$ kg kiwi, $2$ kg ananas, $1$ kg eple — $71$ kr<br>Per: $1$ kg kiwi, $1$ kg ananas, $2$ kg eple — $68$ kr<br><br><strong>a)</strong> Skriv settet.<br><br><strong>b)</strong> Legg sammen alle tre. Hva blir $k+a+e$?<br><br><strong>c)</strong> Finn hver pris.",
      "Hvis du kjenner $k+a+e$, kan du trekke den fra hver likning.",
      [
        "<strong>a)</strong> $2k+a+e=73$, $k+2a+e=71$, $k+a+2e=68$.",
        "<strong>b)</strong> $4(k+a+e)=212$, så $k+a+e=53$.",
        "<strong>c)</strong> $k=20$, $a=18$, $e=15$.<br><strong>Svar:</strong> kiwi $20$, ananas $18$, eple $15$ kr/kg",
      ],
    ),
    o(
      "5.18",
      "Løs<br>$$\\begin{cases}\\dfrac{x}{2}+y+z=6\\\\ x+\\dfrac{y}{2}=5\\\\ y+z=4\\end{cases}$$",
      "Den siste gir $z=4-y$. Den midterste gir $x$ uttrykt med $y$.",
      [
        "$z=4-y$, $x=5-\\dfrac{y}{2}$.<br>$\\dfrac{1}{2}\\left(5-\\dfrac{y}{2}\\right)+y+(4-y)=6$<br>$\\dfrac{5}{2}+4-\\dfrac{y}{4}=6$<br>$y=2$, $x=4$, $z=2$.<br><strong>Svar:</strong> $(4,2,2)$",
      ],
    ),
    o(
      "5.19",
      "Tre lag har til sammen $39$ poeng. Lag A har dobbelt så mange som B. Lag C har $6$ færre enn A.<br><br><strong>a)</strong> Sett opp et sett med tre ukjente.<br><br><strong>b)</strong> Finn poengene.",
      "Bytt alt til $B$.",
      [
        "<strong>a)</strong> $A+B+C=39$, $A=2B$, $C=A-6$.",
        "<strong>b)</strong> $2B+B+(2B-6)=39$, $5B=45$, $B=9$, $A=18$, $C=12$.<br><strong>Svar:</strong> A $18$, B $9$, C $12$",
      ],
    ),
    o(
      "5.20",
      "Finn tre tall $x$, $y$ og $z$ slik at<br>$$\\begin{cases}x+y=10\\\\ y+z=13\\\\ x+z=11\\end{cases}$$<br><br><strong>a)</strong> Legg sammen alle tre likningene. Hva får du?<br><br><strong>b)</strong> Finn hvert tall.",
      "Summen av venstre sider er $2(x+y+z)$.",
      [
        "<strong>a)</strong> $2(x+y+z)=34$, så $x+y+z=17$.",
        "<strong>b)</strong> $z=17-10=7$, $x=17-13=4$, $y=17-11=6$.<br><strong>Svar:</strong> $(4,6,7)$",
      ],
    ),
    o(
      "5.21",
      "Løs<br>$$\\begin{cases}x+y+z=6\\\\ x+2y-z=2\\\\ 2x-y+z=3\\end{cases}$$",
      "Legg (1) og (2) sammen, og (2) og (3) sammen, slik at $z$ faller bort.",
      [
        "(1)+(2): $2x+3y=8$.<br>(2)+(3): $3x+y=5$, så $y=5-3x$.<br>$2x+3(5-3x)=8$<br>$2x+15-9x=8$<br>$-7x=-7$, $x=1$, $y=2$.<br>Fra (1): $1+2+z=6$, $z=3$.<br><strong>Svar:</strong> $(1,2,3)$",
      ],
    ),
    o(
      "5.22",
      "Hvorfor trenger vi tre uavhengige likninger for tre ukjente?<br><br><strong>a)</strong> Gi et eksempel med bare to likninger og tre ukjente som har uendelig mange løsninger.<br><br><strong>b)</strong> Hva skjer hvis den tredje likningen strider mot de to første?",
      "Tenk geometrisk: tre plan i rommet.",
      [
        "<strong>a)</strong> $x+y+z=1$ og $x=0$. Da er $y+z=1$, uendelig mange par $(y,z)$.",
        "<strong>b)</strong> Da har settet ingen løsning (parallelle, motstridende plan).<br><strong>Svar:</strong> tre uavhengige krav, ellers for få eller motstrid",
      ],
    ),
  ],
};

const dk5D: Delkapittel = {
  id: "5D",
  tittel: "5D Andregradsmodeller",
  quiz: [
    q("Hvor mange punkt trenger du vanligvis for å bestemme $ax^2+bx+c$?", ["1", "2", "3", "4"], 2, "Tre ukjente $a,b,c$ krever tre punkt."),
    q("Hvis $x^2+px+q=0$ har røttene $4$ og $-1$, er $q$", ["$4$", "$-4$", "$3$", "$-3$"], 1, "Produktet av røttene er $q$: $4\\cdot(-1)=-4$."),
    q("Grafen til $h(x)=x^2+2x+3$ skjærer $y$-aksen i", ["$(0,3)$", "$(0,2)$", "$(0,1)$", "$(3,0)$"], 0, "$h(0)=c=3$."),
    q("En tredjegradsfunksjon med tre kjente nullpunkt er bestemt opp til", ["et konstantledd $c$", "en skaleringsfaktor $a$", "ingenting, den er unik", "to parametre"], 1, "$f(x)=a(x-r)(x-s)(x-t)$. Ett ekstra punkt låser $a$."),
  ],
  oppgaver: [
    o(
      "5.23",
      "Totalkostnaden $K$ (kroner) ved $n$ enheter modelleres med $an^2+bn+c$.<br>Vi vet $K(10)=400$, $K(20)=900$ og $K(30)=1600$.<br><br><strong>a)</strong> Sett opp settet for $a$, $b$ og $c$.<br><br><strong>b)</strong> Finn $K(n)$.<br><br><strong>c)</strong> Hva betyr $K(0)$?<br><br>Kontrollgraf: treffer $f(x)=x^2+20x+100$ de tre punktene ved $x=10$, $x=20$ og $x=30$?",
      "Trekk likningene parvis slik at $c$ faller bort.",
      [
        "<strong>a)</strong> $100a+10b+c=400$, $400a+20b+c=900$, $900a+30b+c=1600$.",
        "<strong>b)</strong> $(2)-(1)$: $30a+b=50$. $(3)-(2)$: $50a+b=70$. Trekk: $20a=20$, $a=1$, $b=20$, $c=100$. $K(n)=n^2+20n+100$.",
        "<strong>c)</strong> $K(0)=100$: fast kostnad før produksjon.<br><strong>Svar:</strong> $K(n)=n^2+20n+100$",
      ],
    ),
    o(
      "5.24",
      "Likningen $x^2+px+q=0$ har løsningene $x=4$ og $x=-1$.<br><br><strong>a)</strong> Skriv venstresiden som produkt av to faktorer.<br><br><strong>b)</strong> Les av $p$ og $q$.<br><br><strong>c)</strong> Hvorfor er produktet av røttene lik $q$?",
      "Hvis $r$ er rot, er $(x-r)$ faktor.",
      [
        "<strong>a)</strong> $(x-4)(x+1)$",
        "<strong>b)</strong> $x^2-3x-4$, så $p=-3$ og $q=-4$.",
        "<strong>c)</strong> Konstantleddet i $(x-r)(x-s)$ er $rs$.<br><strong>Svar:</strong> $p=-3$, $q=-4$",
      ],
    ),
    o(
      "5.25",
      "Funksjonen $f$ er av typen $ax^2+bx+c$ og oppfyller $f(1)=6$, $f(2)=11$ og $f(3)=18$.<br>Kontrollgraf: treffer $h(x)=x^2+2x+3$ punktene $(1, 6)$, $(2, 11)$ og $(3, 18)$?<br><br><strong>a)</strong> Sett opp settet.<br><br><strong>b)</strong> Finn $f(x)$.<br><br><strong>c)</strong> Les av $f(0)$ fra uttrykket — og fra grafen.",
      "Trekk likningene fra hverandre for å fjerne $c$.",
      [
        "<strong>a)</strong> $a+b+c=6$, $4a+2b+c=11$, $9a+3b+c=18$.",
        "<strong>b)</strong> $(2)-(1)$: $3a+b=5$. $(3)-(2)$: $5a+b=7$. Trekk: $2a=2$, $a=1$, $b=2$, $c=3$. $f(x)=x^2+2x+3$.",
        "<strong>c)</strong> $f(0)=3$. Grafen skjærer $y$-aksen i $(0,3)$.<br><strong>Svar:</strong> $f(x)=x^2+2x+3$",
      ],
    ),
    o(
      "5.26",
      "En tredjegradsfunksjon $p$ har nullpunktene $x=-1$, $x=2$ og $x=4$, og $p(0)=-16$.<br>Kontrollgraf: treffer $q(x)=-2(x+1)(x-2)(x-4)$ nullpunktene og $(0,-16)$?<br><br><strong>a)</strong> Hvorfor kan vi skrive $p$ som $a(x+1)(x-2)(x-4)$?<br><br><strong>b)</strong> Bestem $a$.<br><br><strong>c)</strong> Regn ut $p(1)$. Ligger grafen over eller under $x$-aksen der?",
      "Sett $x=0$ inn i faktorformen.",
      [
        "<strong>a)</strong> Nullpunktene gir faktorene. $a$ skalerer (og eventuelt speiler).",
        "<strong>b)</strong> $p(0)=a(1)(-2)(-4)=8a=-16$, $a=-2$. $p(x)=-2(x+1)(x-2)(x-4)$.",
        "<strong>c)</strong> $p(1)=-2(2)(-1)(-3)=-12$. Under $x$-aksen.<br><strong>Svar:</strong> $p(x)=-2(x+1)(x-2)(x-4)$",
      ],
    ),
    o(
      "5.27",
      "Grafen til $h(x)=-x^2+4x+1$ er en parabel.<br><br><strong>a)</strong> Finn toppunktet.<br><br><strong>b)</strong> Finn nullpunktene (eksakt).<br><br><strong>c)</strong> For hvilke $x$ er $h(x)>0$?",
      "Toppunktet ligger på $x=-b/(2a)$. ABC-formelen gir nullpunktene.",
      [
        "<strong>a)</strong> $a=-1$, $b=4$, $x=-4/(-2)=2$. $h(2)=-4+8+1=5$. Toppunkt $(2,5)$.",
        "<strong>b)</strong> $x=\\dfrac{-4\\pm\\sqrt{16+4}}{-2}=\\dfrac{-4\\pm\\sqrt{20}}{-2}=2\\pm\\sqrt{5}$.",
        "<strong>c)</strong> Parabel ned, positiv mellom nullpunktene: $x\\in\\langle 2-\\sqrt{5},\\, 2+\\sqrt{5}\\rangle$.<br><strong>Svar:</strong> toppunkt $(2,5)$, nullpunkt $2\\pm\\sqrt{5}$",
      ],
    ),
    o(
      "5.28",
      "En parabel $f$ av typen $ax^2+bx+c$ går gjennom $(0,-6)$, $(-2,0)$ og $(3,0)$.<br>Kontrollgraf: $h(x)=(x+2)(x-3)$ — går den gjennom de tre punktene?<br><br><strong>a)</strong> Hvorfor er $c=-6$?<br><br><strong>b)</strong> Skriv $f$ på faktorform og finn $a$.<br><br><strong>c)</strong> Finn $f(1)$.",
      "Nullpunktene gir faktorene. $f(0)=c$.",
      [
        "<strong>a)</strong> $f(0)=c=-6$.",
        "<strong>b)</strong> $f(x)=a(x+2)(x-3)$. $f(0)=a(2)(-3)=-6a=-6$, $a=1$. $f(x)=(x+2)(x-3)=x^2-x-6$.",
        "<strong>c)</strong> $f(1)=-6$.<br><strong>Svar:</strong> $f(x)=x^2-x-6$",
      ],
    ),
    o(
      "5.29",
      "Hvorfor er tre punkt «akkurat nok» til å låse $ax^2+bx+c$?<br><br><strong>a)</strong> Hva skjer hvis du bare har to punkt?<br><br><strong>b)</strong> Hva skjer hvis et fjerde punkt ikke ligger på den parabelen de tre første bestemte?",
      "Tre ukjente, tre uavhengige krav.",
      [
        "<strong>a)</strong> Uendelig mange parabler gjennom to punkt (familien har én fri parameter).",
        "<strong>b)</strong> Da finnes det ingen annengradsfunksjon som treffer alle fire. Du må bytte modell (f.eks. tredjegrad).<br><strong>Svar:</strong> tre punkt låser $a,b,c$; et avvikende fjerde punkt knuser modellen",
      ],
    ),
  ],
};

const dk5E: Delkapittel = {
  id: "5E",
  tittel: "5E Ikkelineære likningssett",
  quiz: [
    q("Settet $x+y=11$, $xy=24$ gir en likning som er", ["lineær", "av andre grad", "eksponential", "uten løsning"], 1, "$x(11-x)=24$ blir $x^2-11x+24=0$."),
    q("En linje og en sirkel kan skjære hverandre i", ["alltid to punkt", "0, 1 eller 2 punkt", "alltid ett punkt", "tre punkt"], 1, "Diskriminanten styrer antallet."),
    q("$(x,y)=(3,8)$ og $(8,3)$ som løsninger på et rektangel-sett beskriver", ["to ulike rektangler", "samme rektangel med sidene byttet", "en sirkel", "ingen figur"], 1, "Lengde og bredde bytter plass."),
    q("Settet $y=x+2$ og $y=x^2+a$ har én løsning når diskriminanten er", ["negativ", "null", "positiv", "udefinert"], 1, "Tangering: $D=0$."),
  ],
  oppgaver: [
    o(
      "5.30",
      "Et rektangel har omkrets $22$ cm og areal $24$ cm$^2$.<br><br><strong>a)</strong> La $x$ og $y$ være sidene. Skriv et sett.<br><br><strong>b)</strong> Eliminer $y$ og løs.<br><br><strong>c)</strong> Hvorfor beskriver de to tallene ett rektangel, ikke to?",
      "Omkrets $2(x+y)=22$ gir $x+y=11$.",
      [
        "<strong>a)</strong> $x+y=11$ og $xy=24$.",
        "<strong>b)</strong> $x(11-x)=24$, $x^2-11x+24=0$, $(x-3)(x-8)=0$.",
        "<strong>c)</strong> $(3,8)$ og $(8,3)$ er samme rektangel.<br><strong>Svar:</strong> sider $3$ cm og $8$ cm",
      ],
    ),
    o(
      "5.31",
      "Løs settene. Oppgi alle par.<br><br><strong>a)</strong> $x=y+3$ og $xy=18$<br><br><strong>b)</strong> $x^2+y^2=25$ og $y=x-1$<br><br>I b) er sirkelen $u(x)=\\sqrt{25-x^2}$, $v(x)=-\\sqrt{25-x^2}$ og linja $f(x)=x-1$ tegnet under.",
      "I b) er den første en sirkel med radius $5$ om origo.",
      [
        "<strong>a)</strong> $y(y+3)=18$, $y^2+3y-18=0$, $(y+6)(y-3)=0$. Par $(6,3)$ og $(-3,-6)$.",
        "<strong>b)</strong> $x^2+(x-1)^2=25$, $x^2-x-12=0$, $(x-4)(x+3)=0$. Par $(4,3)$ og $(-3,-4)$.<br><strong>Svar:</strong> a) $(6,3),(-3,-6)$ b) $(4,3),(-3,-4)$",
      ],
    ),
    o(
      "5.32",
      "Grafene til $f(x)=x^2-2$ og $g(x)=x+1$ er tegnet under.<br><br><strong>a)</strong> Les av skjæringspunktene fra grafen, og kontroller ved regning.<br><br><strong>b)</strong> Hvor mange løsninger har settet $y=x^2-2$, $y=x+1$?",
      "Sett $x^2-2=x+1$.",
      [
        "<strong>a)</strong> $x^2-x-3=0$, $x=\\dfrac{1\\pm\\sqrt{13}}{2}$. To punkt.",
        "<strong>b)</strong> To løsninger.<br><strong>Svar:</strong> to skjæringspunkt, $x=\\dfrac{1\\pm\\sqrt{13}}{2}$",
      ],
    ),
    o(
      "5.33",
      "I en rettvinklet trekant er den korteste siden $12$. Differansen mellom de to andre sidene er $4$.<br><br><strong>a)</strong> La $b$ være den midterste siden og $c$ hypotenusen. Skriv to likninger.<br><br><strong>b)</strong> Finn $b$ og $c$.<br><br><strong>c)</strong> Kontroller med Pytagoras.",
      "$c=b+4$ og $12^2+b^2=c^2$.",
      [
        "<strong>a)</strong> $c=b+4$ og $144+b^2=c^2$.",
        "<strong>b)</strong> $144+b^2=(b+4)^2=b^2+8b+16$, $128=8b$, $b=16$, $c=20$.",
        "<strong>c)</strong> $12^2+16^2=144+256=400=20^2$.<br><strong>Svar:</strong> $12$, $16$ og $20$",
      ],
    ),
    o(
      "5.34",
      "Vi har settet $y=x+2$ og $y=x^2+a$. Grafen til $f(x)=x+2$ er linjen. Når $a=-4$ er parabelen $h(x)=x^2-4$.<br><br><strong>a)</strong> Vis at du får $x^2-x+(a-2)=0$.<br><br><strong>b)</strong> For hvilke $a$ har settet to, én og ingen løsning?<br><br><strong>c)</strong> Når $a=-4$: finn punktene (les også av grafen).",
      "Diskriminanten $D=1-4(a-2)=9-4a$.",
      [
        "<strong>a)</strong> $x+2=x^2+a$ $\\Rightarrow$ $x^2-x+(a-2)=0$.",
        "<strong>b)</strong> $D=9-4a$. To når $a<\\dfrac{9}{4}$, én når $a=\\dfrac{9}{4}$, ingen når $a>\\dfrac{9}{4}$.",
        "<strong>c)</strong> $x^2-x-6=0$, $(x-3)(x+2)=0$. Punktene $(3,5)$ og $(-2,0)$.<br><strong>Svar:</strong> $D=9-4a$; når $a=-4$: $(3,5)$ og $(-2,0)$",
      ],
    ),
    o(
      "5.35",
      "Løs $x^2+y=5$ og $3x+y=7$.<br><br><strong>a)</strong> Eliminer $y$.<br><br><strong>b)</strong> Finn begge parene.<br><br><strong>c)</strong> Hvilken av likningene er en parabel, og hvilken er en linje? (Tegn $f(x)=5-x^2$ og $g(x)=7-3x$.)",
      "Trekk: $x^2-3x=5-7$.",
      [
        "<strong>a)</strong> $y=7-3x$ inn i den første: $x^2+(7-3x)=5$, $x^2-3x+2=0$.",
        "<strong>b)</strong> $(x-1)(x-2)=0$. Par $(1,4)$ og $(2,1)$.",
        "<strong>c)</strong> $y=5-x^2$ er parabel (ned), $y=7-3x$ er linje.<br><strong>Svar:</strong> $(1,4)$ og $(2,1)$",
      ],
    ),
    o(
      "5.36",
      "Et rektangel har areal $60$ m$^2$. Diagonalen er $13$ m.<br><br><strong>a)</strong> Sett opp et sett med sidene $x$ og $y$.<br><br><strong>b)</strong> Finn sidene.<br><br><strong>c)</strong> Finn omkretsen uten å bruke sidene hver for seg: vis at $(x+y)^2=x^2+y^2+2xy$.",
      "Pytagoras: $x^2+y^2=169$. Produkt $xy=60$.",
      [
        "<strong>a)</strong> $xy=60$ og $x^2+y^2=13^2=169$.",
        "<strong>b)</strong> $(x+y)^2=169+120=289$, $x+y=17$ (positivt). $x$ og $y$ er røttene i $t^2-17t+60=0$, $(t-5)(t-12)=0$. Sider $5$ m og $12$ m.",
        "<strong>c)</strong> Omkrets $2\\cdot 17=34$ m, funnet fra $x+y$ uten å splitte.<br><strong>Svar:</strong> $5$ m og $12$ m, omkrets $34$ m",
      ],
    ),
  ],
};

const dk5F: Delkapittel = {
  id: "5F",
  tittel: "5F Førstegradsulikheter",
  quiz: [
    q("Når du ganger en ulikhet med et negativt tall, må du", ["gjøre ingenting", "snue ulikhetstegnet", "legge til 1", "kvadrere"], 1, "$-2<3$ blir $2>-3$ etter ganging med $-1$."),
    q("$x>4$ som intervall er", ["$[4,\\infty\\rangle$", "$\\langle 4,\\infty\\rangle$", "$\\langle-\\infty,4]$", "$\\{4\\}$"], 1, "Åpen i $4$, åpen mot uendelig."),
    q("Månedskort $480$ kr mot $60$ kr per økt lønner seg når", ["$480<60x$", "$480>60x$", "$x=480$", "$x<1$"], 0, "Kortet er billigere når drop-in-summen har passert $480$."),
    q("Grafisk er $f(x)>g(x)$ der", ["grafene er parallelle", "$f$ ligger over $g$", "$f$ ligger under $g$", "de skjærer $y$-aksen"], 1, "Høyere $y$-verdi betyr større funksjonsverdi."),
  ],
  oppgaver: [
    o(
      "5.37",
      "Løs ulikhetene. Oppgi svaret som intervall.<br><br><strong>a)</strong> $3(x-2)<2x+5$<br><br><strong>b)</strong> $7-4x\\ge 2x-5$<br><br><strong>c)</strong> $\\dfrac{x+1}{2}>\\dfrac{2x-3}{5}$",
      "Når du deler på et negativt tall, snur tegnet.",
      [
        "<strong>a)</strong> $3x-6<2x+5$, $x<11$. $\\langle-\\infty,11\\rangle$",
        "<strong>b)</strong> $12\\ge 6x$, $x\\le 2$. $\\langle-\\infty,2]$",
        "<strong>c)</strong> $5(x+1)>2(2x-3)$, $x>-11$. $\\langle-11,\\infty\\rangle$<br><strong>Svar:</strong> a) $\\langle-\\infty,11\\rangle$ b) $\\langle-\\infty,2]$ c) $\\langle-11,\\infty\\rangle$",
      ],
    ),
    o(
      "5.38",
      "Løs og skriv som intervall.<br><br><strong>a)</strong> $\\dfrac{2}{3}(x-1)+2\\ge 2x-\\dfrac{4}{3}$<br><br><strong>b)</strong> $4-2x\\ge 5(x+5)$",
      "Gang med $3$ i a) for å fjerne nevnerne.",
      [
        "<strong>a)</strong> Gang med $3$: $2(x-1)+6\\ge 6x-4$<br>$2x-2+6\\ge 6x-4$<br>$8\\ge 4x$, $x\\le 2$. $\\langle-\\infty,2]$",
        "<strong>b)</strong> $4-2x\\ge 5x+25$, $-21\\ge 7x$, $x\\le -3$. $\\langle-\\infty,-3]$<br><strong>Svar:</strong> a) $\\langle-\\infty,2]$ b) $\\langle-\\infty,-3]$",
      ],
    ),
    o(
      "5.39",
      "I klatrehallen koster månedskort $480$ kr (klatre så ofte du vil). Uten kort koster hver økt $60$ kr. La $x$ være antall økter.<br>Grafene til $f(x)=60x$ (drop-in) og $g(x)=480$ (kort) er tegnet under.<br><br><strong>a)</strong> Skriv ulikheten som sier når kortet er billigst.<br><br><strong>b)</strong> Løs, og tolk i hele økter.<br><br><strong>c)</strong> Hva skjer nøyaktig når grafene skjærer?",
      "Kortet vinner når den vannrette linjen ligger under den skrå.",
      [
        "<strong>a)</strong> $480<60x$",
        "<strong>b)</strong> $x>8$. Fra og med $9$ økter lønner kortet seg.",
        "<strong>c)</strong> $x=8$: samme pris $480$ kr. Likegyldig.<br><strong>Svar:</strong> kortet lønner seg fra $9$ økter",
      ],
    ),
    o(
      "5.40",
      "Suppe har temperatur $T(x)=92-2x$ grader etter $x$ minutter. De stiplede nivåene $u(x)=70$ og $v(x)=60$ er tegnet sammen med $T$.<br><br><strong>a)</strong> Hvor lenge er suppa over $70$ °C?<br><br><strong>b)</strong> Når er den under $60$ °C?<br><br><strong>c)</strong> Les av de to tidspunktene også fra grafen.",
      "Ulikhetstegnet snur når du deler på $-2$.",
      [
        "<strong>a)</strong> $92-2x>70$, $x<11$. De første $11$ minuttene (ikke $x=11$).",
        "<strong>b)</strong> $92-2x<60$, $x>16$.",
        "<strong>c)</strong> Grafen krysser $y=70$ ved $x=11$ og $y=60$ ved $x=16$.<br><strong>Svar:</strong> over $70$ når $x\\in\\langle 0,11\\rangle$, under $60$ når $x>16$",
      ],
    ),
    o(
      "5.41",
      "Sesongkort koster $280$ kr, og hver tur koster da $15$ kr. Uten kort koster hver tur $40$ kr. La $x$ være antall turer.<br>Se grafene til $f(x)=15x+280$ og $g(x)=40x$.<br><br><strong>a)</strong> Hva forteller $15x+280<40x$?<br><br><strong>b)</strong> Løs ulikheten.<br><br><strong>c)</strong> Tolk med hele turer.",
      "Flytt $x$-ledd til samme side.",
      [
        "<strong>a)</strong> Når sesongkortet gir lavere totalpris.",
        "<strong>b)</strong> $280<25x$, $x>11{,}2$.",
        "<strong>c)</strong> Fra og med $12$ turer.<br><strong>Svar:</strong> $x>11{,}2$, altså fra $12$ turer",
      ],
    ),
    o(
      "5.42",
      "Grafene til $f(x)=\\dfrac{1}{2}x+2$ og $g(x)=-\\dfrac{1}{4}x+6$ skjærer hverandre.<br><br><strong>a)</strong> Finn skjæringspunktet.<br><br><strong>b)</strong> For hvilke $x$ er $f(x)\\ge g(x)$?<br><br><strong>c)</strong> Skriv svaret som intervall.",
      "Sett $f=g$ for skjæringen. Deretter se hvilken graf som ligger øverst til høyre.",
      [
        "<strong>a)</strong> $\\dfrac{1}{2}x+2=-\\dfrac{1}{4}x+6$, $\\dfrac{3}{4}x=4$, $x=\\dfrac{16}{3}$, $y=\\dfrac{14}{3}$.",
        "<strong>b)</strong> $f$ har positivt stigningstall, $g$ negativt. $f$ ligger over $g$ til høyre for skjæringen: $x\\ge \\dfrac{16}{3}$.",
        "<strong>c)</strong> $\\left[\\dfrac{16}{3},\\infty\\right\\rangle$<br><strong>Svar:</strong> skjæring $\\left(\\dfrac{16}{3},\\dfrac{14}{3}\\right)$, $f\\ge g$ når $x\\ge\\dfrac{16}{3}$",
      ],
    ),
    o(
      "5.43",
      "Løs $2x+3>-\\dfrac{1}{2}x+8$ både ved regning og ved å se på $f(x)=2x+3$ og $g(x)=-\\dfrac{1}{2}x+8$.",
      "Samle $x$ på venstre side.",
      [
        "$2x+\\dfrac{1}{2}x>5$, $\\dfrac{5}{2}x>5$, $x>2$.<br>Grafisk: $f$ starter under $g$ og har brattere positiv stigning, så $f>g$ til høyre for $x=2$.<br><strong>Svar:</strong> $x\\in\\langle 2,\\infty\\rangle$",
      ],
    ),
    o(
      "5.44",
      "Skriv om mellom intervall og ulikhet.<br><br><strong>a)</strong> $x\\in\\langle-3,5]$ som ulikhet.<br><br><strong>b)</strong> $-1\\le x<4$ som intervall.<br><br><strong>c)</strong> Løs $3-x\\le 2x+9$ og skriv som intervall.",
      "$[$ inkluderer, $\\langle$ inkluderer ikke.",
      [
        "<strong>a)</strong> $-3<x\\le 5$.",
        "<strong>b)</strong> $[-1,4\\rangle$.",
        "<strong>c)</strong> $3-9\\le 3x$, $-6\\le 3x$, $x\\ge -2$. $[-2,\\infty\\rangle$.<br><strong>Svar:</strong> a) $-3<x\\le 5$ b) $[-1,4\\rangle$ c) $[-2,\\infty\\rangle$",
      ],
    ),
  ],
};

const dk5G: Delkapittel = {
  id: "5G",
  tittel: "5G Fortegnslinje og andregradsulikheter",
  quiz: [
    q("$(x-2)(x-5)\\le 0$ er sann", ["utenfor $[2,5]$", "på $[2,5]$", "bare i $x=0$", "aldri"], 1, "Produktet av to faktorer er $\\le 0$ mellom nullpunktene."),
    q("Hvis $a<0$ i $a(x+3)(1-x)$, speiles fortegnet til $(x+3)(1-x)$", ["ja", "nei", "bare for $x>0$", "bare i origo"], 0, "Negativ konstant snur alle tegn."),
    q("Nullproduktregelen sier at $x(x-1)=0$ når", ["$x=0$ eller $x=1$", "bare $x=0$", "bare $x=1$", "$x=\\tfrac{1}{2}$"], 0, "Minst én faktor er null."),
    q("Parabel som vender ned er positiv", ["utenfor nullpunktene", "mellom nullpunktene", "overalt", "ingen steder"], 1, "Positiv der grafen ligger over $x$-aksen: mellom røttene."),
  ],
  oppgaver: [
    o(
      "5.45",
      `Et andregradsuttrykk $p$ har nullpunkt i $x=-3$ og $x=2$. $p$ er positiv mellom nullpunktene og negativ utenfor. $p(1)=8$.<br><br>${signSvg([{ label: "−3", kind: "zero" }, { label: "2", kind: "zero" }], "−", ["+"], "−")}<br><strong>a)</strong> Hvorfor må $p(x)=a(x+3)(x-2)$ ha $a<0$?<br><br><strong>b)</strong> Bestem $a$. Grafen til $f(x)=-2(x+3)(x-2)$ vises under.<br><br><strong>c)</strong> Løs $p(x)\\ge 0$.`,
      "$(x+3)(x-2)$ er minus i midten. $a<0$ snur dette.",
      [
        "<strong>a)</strong> Faktorene kommer fra nullpunktene. Produktet er negativt mellom. $a<0$ gir pluss i midten.",
        "<strong>b)</strong> $p(1)=a(4)(-1)=-4a=8$, $a=-2$. $p(x)=-2(x+3)(x-2)$.",
        "<strong>c)</strong> $x\\in[-3,2]$.<br><strong>Svar:</strong> $p(x)=-2(x+3)(x-2)$, $p\\ge 0$ på $[-3,2]$",
      ],
    ),
    o(
      "5.46",
      "Løs. Kontroller med fortegnslinje.<br><br><strong>a)</strong> $x^2-5x+6\\le 0$<br><br><strong>b)</strong> $x(x+4)>0$<br><br><strong>c)</strong> $-x^2+4x\\ge 0$<br><br>I c) er $f(x)=4x-x^2$ tegnet under.",
      "Faktoriser. Test et punkt i hvert intervall.",
      [
        "<strong>a)</strong> $(x-2)(x-3)\\le 0$ $\\Rightarrow$ $[2,3]$",
        "<strong>b)</strong> Nullpunkt $0$ og $-4$. Positiv utenfor: $\\langle-\\infty,-4\\rangle\\cup\\langle 0,\\infty\\rangle$",
        "<strong>c)</strong> $x(4-x)\\ge 0$ $\\Rightarrow$ $[0,4]$ (parabel ned).<br><strong>Svar:</strong> a) $[2,3]$ b) $\\langle-\\infty,-4\\rangle\\cup\\langle 0,\\infty\\rangle$ c) $[0,4]$",
      ],
    ),
    o(
      "5.47",
      "Grafen til $f(x)=-(x+2)(x-5)$ er en parabel som skjærer $x$-aksen i $-2$ og $5$. Linja $g(x)=4$ skjærer $f$ i $x=0$ og $x=3$.<br><br><strong>a)</strong> Løs $f(x)>0$.<br><br><strong>b)</strong> Løs $f(x)>4$.<br><br><strong>c)</strong> Løs $f(x)<g(x)$.",
      "$f>4$ er der parabelen ligger over den vannrette linja.",
      [
        "<strong>a)</strong> Parabel ned, positiv mellom nullpunktene: $\\langle-2,5\\rangle$",
        "<strong>b)</strong> Over $y=4$ mellom skjæringene: $\\langle 0,3\\rangle$",
        "<strong>c)</strong> $f<4$ utenfor $[0,3]$: $\\langle-\\infty,0\\rangle\\cup\\langle 3,\\infty\\rangle$<br><strong>Svar:</strong> a) $\\langle-2,5\\rangle$ b) $\\langle 0,3\\rangle$ c) $\\langle-\\infty,0\\rangle\\cup\\langle 3,\\infty\\rangle$",
      ],
    ),
    o(
      "5.48",
      "Løs uten å dele bort en faktor som kan være $0$.<br><br><strong>a)</strong> $x^2+4x>-3$<br><br><strong>b)</strong> $(x-1)(x+3)<(x-1)$<br><br><strong>c)</strong> $2(x+2)(x-3)<x+2$",
      "Flytt alt til venstre og faktoriser.",
      [
        "<strong>a)</strong> $x^2+4x+3>0$, $(x+1)(x+3)>0$ $\\Rightarrow$ $\\langle-\\infty,-3\\rangle\\cup\\langle-1,\\infty\\rangle$",
        "<strong>b)</strong> $(x-1)((x+3)-1)<0$, $(x-1)(x+2)<0$ $\\Rightarrow$ $\\langle-2,1\\rangle$",
        "<strong>c)</strong> $(x+2)(2(x-3)-1)<0$, $(x+2)(2x-7)<0$ $\\Rightarrow$ $\\langle-2,\\dfrac{7}{2}\\rangle$<br><strong>Svar:</strong> a) $\\langle-\\infty,-3\\rangle\\cup\\langle-1,\\infty\\rangle$ b) $\\langle-2,1\\rangle$ c) $\\langle-2,\\frac{7}{2}\\rangle$",
      ],
    ),
    o(
      "5.49",
      `Tegn fortegnslinja for $a(x+3)(1-x)$ når $a<0$. Marker nullpunktene.<br><br>${signSvg([{ label: "−3", kind: "zero" }, { label: "1", kind: "zero" }], "−", ["+"], "−")}<br>Er skissen over riktig for $a<0$? Begrunn, og rett hvis den er feil.`,
      "Først fortegn uten $a$, deretter speil fordi $a<0$.",
      [
        "$(x+3)(1-x)$ har nullpunkt $-3$ og $1$. Uten $a$: pluss mellom (testen $x=0$ gir $3\\cdot 1>0$), minus utenfor.<br>$a<0$ snur: minus mellom, pluss utenfor.<br>Skissen viser minus–pluss–minus, som er fortegnet <em>uten</em> $a<0$. Den er altså feil for $a<0$.<br>Riktig: $+$ på $\\langle-\\infty,-3\\rangle$, $-$ på $\\langle-3,1\\rangle$, $+$ på $\\langle 1,\\infty\\rangle$.<br><strong>Svar:</strong> nei — $a<0$ gir pluss utenfor og minus mellom",
      ],
    ),
    o(
      "5.50",
      "Løs $x^2-x-6\\le 0$ og vis fortegnslinja. Grafen til $f(x)=x^2-x-6$ vises under — hvor ligger den under $x$-aksen?",
      "Faktoriser: to tall med produkt $-6$ og sum $-1$.",
      [
        "$(x-3)(x+2)\\le 0$. Nullpunkt $-2$ og $3$. Minus mellom.<br>$x\\in[-2,3]$.<br><strong>Svar:</strong> $[-2,3]$",
      ],
    ),
    o(
      "5.51",
      "Funksjonen $f(x)=x^3+x^2-2x$ krysser $x$-aksen tre steder (faktorform $x(x-1)(x+2)$).<br><br><strong>a)</strong> Les av nullpunktene.<br><br><strong>b)</strong> Løs $f(x)\\ge 0$ med fortegnslinje.<br><br><strong>c)</strong> Kontroller med et testpunkt i hvert intervall.",
      "Tre nullpunkt deler linja i fire deler.",
      [
        "<strong>a)</strong> $x=0$, $x=1$, $x=-2$.",
        "<strong>b)</strong> Fortegn (ledende koeffisient $+$): $+$ på $[-2,0]$ og $[1,\\infty\\rangle$. Altså $x\\in[-2,0]\\cup[1,\\infty\\rangle$.",
        "<strong>c)</strong> $x=-3$: $(-3)(-4)(-1)<0$. $x=-1$: $(-1)(-2)(1)>0$. $x=\\tfrac{1}{2}$: plus minus plus = minus. $x=2$: alle pluss.<br><strong>Svar:</strong> $[-2,0]\\cup[1,\\infty\\rangle$",
      ],
    ),
    o(
      "5.52",
      "Løs $(x-1)(x+4)<(x-1)$ ved å flytte alt til venstre — ikke del på $(x-1)$.",
      "Hvis du deler, må du splitte i tilfeller $x>1$ og $x<1$, og huske $x\\neq 1$.",
      [
        "$(x-1)(x+4)-(x-1)<0$<br>$(x-1)(x+4-1)<0$<br>$(x-1)(x+3)<0$<br>$x\\in\\langle-3,1\\rangle$.<br><strong>Svar:</strong> $\\langle-3,1\\rangle$",
      ],
    ),
  ],
};

const dk5H: Delkapittel = {
  id: "5H",
  tittel: "5H Rasjonale ulikheter",
  quiz: [
    q("I $\\dfrac{x-2}{x+3}>0$ er $x=-3$", ["en løsning", "et nullpunkt", "en pol (ikke tillatt)", "alltid positiv"], 2, "Nevneren er $0$. Uttrykket er udefinert."),
    q("En pol inngår i løsningsmengden", ["alltid", "når ulikheten er $\\ge$", "aldri", "når telleren også er $0$"], 2, "Du kan ikke dele på null, uansett ulikhetstegn."),
    q("For $\\dfrac{x-6}{x-1}\\le 0$ er $x=6$", ["med", "uten", "en pol", "umulig"], 0, "Nullpunktet i telleren er med når tegnet er $\\le$."),
    q("Å flytte $1$ over i $\\dfrac{3}{x-1}\\ge 1$ gir", ["$\\dfrac{3-(x-1)}{x-1}\\ge 0$", "$3\\ge x-1$", "$x\\ge 4$", "ingenting"], 0, "Felles nevner: $\\dfrac{3}{x-1}-1=\\dfrac{4-x}{x-1}$."),
  ],
  oppgaver: [
    o(
      "5.53",
      `Løs $\\dfrac{x+1}{x-5}>0$. Grafen til $Q(x)=\\dfrac{x+1}{x-5}$ vises under — merk den loddrette asymptoten.<br><br>${signSvg([{ label: "−1", kind: "zero" }, { label: "5", kind: "pole" }], "+", ["−"], "+")}<br><strong>a)</strong> Hvor er nullpunkt og pol?<br><br><strong>b)</strong> Løs ulikheten.`,
      "Positiv der teller og nevner har samme fortegn.",
      [
        "<strong>a)</strong> Nullpunkt $x=-1$, pol $x=5$.",
        "<strong>b)</strong> $x\\in\\langle-\\infty,-1\\rangle\\cup\\langle 5,\\infty\\rangle$.<br><strong>Svar:</strong> $\\langle-\\infty,-1\\rangle\\cup\\langle 5,\\infty\\rangle$",
      ],
    ),
    o(
      "5.54",
      "Løs. Husk at nevneren ikke får være $0$.<br><br><strong>a)</strong> $\\dfrac{x-4}{x+2}\\le 0$<br><br><strong>b)</strong> $\\dfrac{3}{x-1}\\ge 1$<br><br><strong>c)</strong> $\\dfrac{2}{4-x}<1$",
      "Flytt alt til venstre slik at høyre side blir $0$.",
      [
        "<strong>a)</strong> Nullpunkt $4$, pol $-2$. $\\le 0$ mellom: $\\langle-2,4]$",
        "<strong>b)</strong> $\\dfrac{4-x}{x-1}\\ge 0$. Nullpunkt $4$, pol $1$. $x\\in\\langle 1,4]$",
        "<strong>c)</strong> $\\dfrac{2-(4-x)}{4-x}<0$, $\\dfrac{x-2}{4-x}<0$. Nullpunkt $2$, pol $4$. $x\\in\\langle 2,4\\rangle$<br><strong>Svar:</strong> a) $\\langle-2,4]$ b) $\\langle 1,4]$ c) $\\langle 2,4\\rangle$",
      ],
    ),
    o(
      "5.55",
      `Et rasjonalt uttrykk $Q$ har pol i $x=1$ og nullpunkt i $x=3$. Fortegnet er pluss når $x<1$, minus på $\\langle 1,3\\rangle$ og pluss når $x>3$. $Q(0)=6$.<br><br>${signSvg([{ label: "1", kind: "pole" }, { label: "3", kind: "zero" }], "+", ["−"], "+")}<br><strong>a)</strong> Hvorfor passer $a\\dfrac{x-3}{x-1}$ med $a>0$?<br><br><strong>b)</strong> Bestem $a$. Grafen til $R(x)=2\\dfrac{x-3}{x-1}$ vises under.<br><br><strong>c)</strong> Løs $Q(x)\\ge 0$.`,
      "Sett $x=0$ inn i faktorformen.",
      [
        "<strong>a)</strong> Polen og nullpunktet gir nevner og teller. For $a>0$ har $Q$ samme fortegn som brøken.",
        "<strong>b)</strong> $Q(0)=a\\dfrac{-3}{-1}=3a=6$, $a=2$.",
        "<strong>c)</strong> $x\\in\\langle-\\infty,1\\rangle\\cup[3,\\infty\\rangle$.<br><strong>Svar:</strong> $Q(x)=2\\dfrac{x-3}{x-1}$",
      ],
    ),
    o(
      "5.56",
      "Bestem $k$ slik at $\\dfrac{x+k}{x-2}\\le 0$ har løsningsmengde $L=[-1,2\\rangle$.",
      "Løsningen ligger mellom nullpunkt og pol. Nullpunktet skal være venstre endepunkt.",
      [
        "Polen $x=2$ er åpen, som i $L$. Nullpunkt $x=-k$ skal være $-1$. $k=1$.<br>Kontroll: $\\dfrac{x+1}{x-2}\\le 0$ gir $[-1,2\\rangle$.<br><strong>Svar:</strong> $k=1$",
      ],
    ),
    o(
      "5.57",
      "Polynomet $P(x)=x^3+x^2-4x-4$. Grafen vises under.<br><br><strong>a)</strong> Vis at $x+2$ er en faktor.<br><br><strong>b)</strong> Faktoriser $P$ fullstendig.<br><br><strong>c)</strong> Løs $P(x)\\ge(x-2)(x+2)$.",
      "Sett $x=-2$ inn i $P$. Del deretter på $(x+2)$.",
      [
        "<strong>a)</strong> $P(-2)=-8+4+8-4=0$.",
        "<strong>b)</strong> $P(x)=(x+2)(x^2-x-2)=(x+2)(x-2)(x+1)$.",
        "<strong>c)</strong> $P-(x^2-4)\\ge 0$ $\\Rightarrow$ $(x+2)(x-2)x\\ge 0$ $\\Rightarrow$ $[-2,0]\\cup[2,\\infty\\rangle$.<br><strong>Svar:</strong> $P(x)=(x+2)(x-2)(x+1)$, $L=[-2,0]\\cup[2,\\infty\\rangle$",
      ],
    ),
    o(
      "5.58",
      "Løs $\\dfrac{2-x}{x^2-36}<0$.",
      "Faktoriser nevneren: $(x-6)(x+6)$. Nullpunkt i telleren $x=2$.",
      [
        "Nullpunkt $x=2$, poler $x=\\pm 6$.<br>Fortegnslinje med tre merker. Brøken er negativ på $\\langle-6,2\\rangle\\cup\\langle 6,\\infty\\rangle$.<br>(Test: $x=0$ gir $2/(-36)<0$; $x=10$ gir negativ over positiv = negativ; $x=4$ gir negativ over negativ = positiv.)<br><strong>Svar:</strong> $\\langle-6,2\\rangle\\cup\\langle 6,\\infty\\rangle$",
      ],
    ),
    o(
      "5.59",
      "Løs $\\dfrac{x-1}{x^2+1}\\ge 0$. Grafen til $Q(x)=\\dfrac{x-1}{x^2+1}$ vises under.",
      "$x^2+1>0$ for alle reelle $x$. Polen finnes ikke.",
      [
        "Nevneren er alltid positiv. Fortegnet styres av $x-1$.<br>$x-1\\ge 0$ og nevner $\\neq 0$ (alltid): $x\\ge 1$.<br><strong>Svar:</strong> $[1,\\infty\\rangle$",
      ],
    ),
    o(
      "5.60",
      "Løs $\\dfrac{x^2-9}{x^2-7x+6}\\ge 0$.",
      "Faktoriser: teller $(x-3)(x+3)$, nevner $(x-6)(x-1)$.",
      [
        "Nullpunkt $\\pm 3$ (med). Poler $1$ og $6$ (uten).<br>Fortegn $+$ utenfor ytterkantene og mellom $1$ og $3$ osv.<br>Løsning: $x\\in\\langle-\\infty,-3]\\cup\\langle 1,3]\\cup\\langle 6,\\infty\\rangle$.<br><strong>Svar:</strong> $\\langle-\\infty,-3]\\cup\\langle 1,3]\\cup\\langle 6,\\infty\\rangle$",
      ],
    ),
  ],
};

const dk5OP: Delkapittel = {
  id: "5OP",
  tittel: "Øveprøve",
  quiz: null,
  oppgaver: [
    o(
      "5.OP0",
      "<strong>Tid:</strong> ca. 60–75 min<br><strong>Hjelpemidler:</strong> Del 1 uten, del 2 med<br><br>Prøven dekker lineære sett, modellering, tre ukjente, andregradsmodeller, ikkelineære sett, førstegradsulikheter, fortegnslinje og rasjonale ulikheter.<br>Vis mellomregning. Merk ferdig etter hvert som du er fornøyd.",
      "Les hele prøven først. Begynn med det du mestrer.",
      ["Dette er oversiktssiden. Gå videre til oppgave 1."],
    ),
    o(
      "5.OP1",
      "Løs settene.<br><br><strong>a)</strong> $2x+y=7$, $x-y=2$<br><br><strong>b)</strong> $\\dfrac{1}{2}x+y=3$, $x-y=0$",
      "I a) faller $y$ ut hvis du legger sammen.",
      [
        "<strong>a)</strong> Sum: $3x=9$, $x=3$, $y=1$.<br><strong>Svar:</strong> $(3,1)$",
        "<strong>b)</strong> $x=y$ inn: $\\dfrac{1}{2}x+x=3$, $\\dfrac{3}{2}x=3$, $x=2$, $y=2$.<br><strong>Svar:</strong> $(2,2)$",
      ],
    ),
    o(
      "5.OP2",
      "Et museum tar $80$ kr for ungdom og $140$ kr for voksne. Det ble solgt $90$ billetter for $10\\,200$ kr.<br><br><strong>a)</strong> Sett opp et sett.<br><br><strong>b)</strong> Finn antall av hver.",
      "Én likning teller billetter, én teller kroner.",
      [
        "<strong>a)</strong> $u+v=90$, $80u+140v=10200$.",
        "<strong>b)</strong> $v=90-u$. $80u+140(90-u)=10200$<br>$-60u+12600=10200$, $u=40$, $v=50$.<br><strong>Svar:</strong> $40$ ungdom, $50$ voksne",
      ],
    ),
    o(
      "5.OP3",
      "Løs $x+y+z=6$, $x=2y$, $z=y$.",
      "Bytt inn i den første.",
      ["$2y+y+y=6$, $4y=6$, $y=\\dfrac{3}{2}$, $x=3$, $z=\\dfrac{3}{2}$.<br><strong>Svar:</strong> $\\left(3,\\dfrac{3}{2},\\dfrac{3}{2}\\right)$"],
    ),
    o(
      "5.OP4",
      "$f$ er av typen $ax^2+bx+c$ med $f(0)=3$, $f(1)=6$, $f(2)=11$. Finn $a$, $b$ og $c$. Kontrollgraf: treffer $h(x)=x^2+2x+3$ punktene $(0, 3)$, $(1, 6)$ og $(2, 11)$?",
      "$f(0)=c$. Trekk de andre likningene.",
      [
        "$c=3$. $a+b+3=6$ $\\Rightarrow$ $a+b=3$. $4a+2b+3=11$ $\\Rightarrow$ $2a+b=4$. Trekk: $a=1$, $b=2$.<br><strong>Svar:</strong> $f(x)=x^2+2x+3$",
      ],
    ),
    o(
      "5.OP5",
      "Et rektangel har omkrets $26$ cm og areal $36$ cm$^2$. Finn sidene.",
      "$x+y=13$, $xy=36$.",
      ["$x(13-x)=36$, $x^2-13x+36=0$, $(x-4)(x-9)=0$.<br><strong>Svar:</strong> $4$ cm og $9$ cm"],
    ),
    o(
      "5.OP6",
      "Biblioteket tar $35$ kr per besøk, eller $420$ kr for årskort. La $x$ være antall besøk. Når lønner årskortet seg? Se $f(x)=35x$ og $g(x)=420$.",
      "$420<35x$.",
      ["$x>12$. Fra og med $13$ besøk.<br><strong>Svar:</strong> fra $13$ besøk"],
    ),
    o(
      "5.OP7",
      "Løs $x^2-5x+6\\le 0$ og $(x+2)(x-4)>0$. Grafene til $f(x)=x^2-5x+6$ og $g(x)=(x+2)(x-4)$ vises under.",
      "Faktoriser og les fortegnslinja.",
      [
        "$(x-2)(x-3)\\le 0$ $\\Rightarrow$ $[2,3]$.<br>$(x+2)(x-4)>0$ $\\Rightarrow$ $\\langle-\\infty,-2\\rangle\\cup\\langle 4,\\infty\\rangle$.<br><strong>Svar:</strong> $[2,3]$ og $\\langle-\\infty,-2\\rangle\\cup\\langle 4,\\infty\\rangle$",
      ],
    ),
    o(
      "5.OP8",
      "Løs $\\dfrac{x-3}{x+1}\\le 0$. Grafen til $Q(x)=\\dfrac{x-3}{x+1}$ har pol i $x=-1$.",
      "Nullpunkt $3$ (med), pol $-1$ (uten).",
      ["$x\\in\\langle-1,3]$.<br><strong>Svar:</strong> $\\langle-1,3]$"],
    ),
  ],
};

export const KAP5: Kapittel = {
  id: "kap5",
  tittel: "Kapittel 5: Likningssett og ulikheter",
  delkapitler: [dk5A, dk5B, dk5C, dk5D, dk5E, dk5F, dk5G, dk5H, dk5OP],
};

