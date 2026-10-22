import type { Oppgave } from "./types";

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

/** Nye oppgaver i kapittel 2 (2.30–2.37): identiteter, bevis, fullstendig kvadrat, CAS og Python. */
export const KAP2_NYE: Record<string, Oppgave[]> = {
  "2B": [
    o(
      "2.32",
      "Uttrykk, likning eller identitet?<br><br>Avgjør hva hver linje er. En <em>likning</em> er sann bare for noen verdier av $x$. En <em>identitet</em> er sann for alle $x$ der begge sider er definert.<br><br><strong>a)</strong> $3x+2$<br><br><strong>b)</strong> $3x+2=11$<br><br><strong>c)</strong> $(x+1)^2=x^2+2x+1$<br><br><strong>d)</strong> $(x+1)^2=x^2+1$<br><br><strong>e)</strong> $2(x-4)=2x-8$",
      "Et uttrykk har ikke likhetstegn. Sett inn to–tre verdier for $x$. Blir det feil for én verdi, er det ikke en identitet.",
      [
        "<strong>a)</strong> Ingen likhetstegn.<br><strong>Svar:</strong> uttrykk",
        "<strong>b)</strong> $3x=9$, så $x=3$. Bare én verdi passer.<br><strong>Svar:</strong> likning, $x=3$",
        "<strong>c)</strong> Første kvadratsetning: sann for alle $x$.<br><strong>Svar:</strong> identitet",
        "<strong>d)</strong> $x^2+2x+1=x^2+1$ gir $2x=0$, så bare $x=0$ passer. For eksempel gir $x=1$: $4\\neq 2$.<br><strong>Svar:</strong> likning (ikke identitet), $x=0$",
        "<strong>e)</strong> Gang inn: $2x-8$ på begge sider.<br><strong>Svar:</strong> identitet",
      ],
    ),
    o(
      "2.33",
      "Test først med $x=0$, $x=1$ og $x=2$. Avgjør så om påstanden er en identitet. Bevis den eller gi et moteksempel.<br><br><strong>a)</strong> $(x-3)(x+3)=x^2-9$<br><br><strong>b)</strong> $(x+2)^2=x^2+4$<br><br><strong>c)</strong> $x(x+4)+4=(x+2)^2$<br><br><strong>d)</strong> $\\dfrac{x^2-1}{x-1}=x+1$<br><br><strong>e)</strong> Forklar hvorfor det ikke er nok å teste mange tall for å vise at noe er en identitet.",
      "Et moteksempel er ett tall som gjør påstanden gal. Et bevis er en omforming som gjelder for alle $x$. Pass på verdier der en nevner blir $0$.",
      [
        "<strong>a)</strong> Konjugatsetningen: $(x-3)(x+3)=x^2-9$.<br><strong>Svar:</strong> identitet",
        "<strong>b)</strong> $x=1$: venstre side $9$, høyre side $5$. Riktig er $(x+2)^2=x^2+4x+4$.<br><strong>Svar:</strong> ikke identitet, moteksempel $x=1$",
        "<strong>c)</strong> $x(x+4)+4=x^2+4x+4=(x+2)^2$.<br><strong>Svar:</strong> identitet",
        "<strong>d)</strong> $\\dfrac{(x-1)(x+1)}{x-1}=x+1$, men bare når $x\\neq 1$. For $x=1$ er venstre side ikke definert.<br><strong>Svar:</strong> identitet for $x\\neq 1$",
        "<strong>e)</strong> Det finnes uendelig mange tall, og vi kan ikke teste alle. En påstand kan stemme for mange tall og likevel være gal for ett. Derfor trenger vi et algebraisk bevis.<br><strong>Svar:</strong> testing kan bare gi moteksempel, ikke bevis",
      ],
    ),
    o(
      "2.35",
      "<strong>Python.</strong> Programmet tester påstanden $(x+2)^2=x^2+4x+4$ for heltall fra $-5$ til $5$:<br><br><code>teller = 0</code><br><code>for x in range(-5, 6):</code><br><code>    if (x + 2)**2 == x**2 + 4*x + 4:</code><br><code>        teller = teller + 1</code><br><code>print(teller, \"av 11 stemte\")</code><br><br><strong>a)</strong> Hva skriver programmet ut? Hvorfor?<br><br><strong>b)</strong> Bytt høyre side til <code>x**2 + 4</code>. Hva skriver programmet ut nå? For hvilken $x$ stemmer det?<br><br><strong>c)</strong> Programmet i a) skriver «11 av 11 stemte». Er det et bevis for identiteten? Forklar.",
      "<code>range(-5, 6)</code> gir tallene $-5, -4, \\dots, 5$, altså 11 tall. Sammenlign med oppgave 2.33.",
      [
        "<strong>a)</strong> Første kvadratsetning gjør begge sidene like for alle $x$.<br><strong>Svar:</strong> «11 av 11 stemte»",
        "<strong>b)</strong> $(x+2)^2=x^2+4$ gir $4x=0$, så bare $x=0$ stemmer.<br><strong>Svar:</strong> «1 av 11 stemte» (for $x=0$)",
        "<strong>c)</strong> Nei. Programmet tester bare 11 tall. Beviset er utregningen $(x+2)^2=x^2+4x+4$. Programmet kan derimot finne et moteksempel, som i b).<br><strong>Svar:</strong> nei, bare et hint",
      ],
    ),
  ],
  "2C": [
    o(
      "2.34",
      "Bevis eller moteksempel. La $n$, $k$ og $m$ være hele tall.<br><br><strong>a)</strong> Vis at summen av tre hele tall som følger etter hverandre, alltid er delelig med $3$.<br><br><strong>b)</strong> Vis at $(n+1)^2-n^2=2n+1$. Bruk resultatet til å regne ut $101^2-100^2$ uten kalkulator.<br><br><strong>c)</strong> Vis at produktet av to oddetall alltid er et oddetall. Skriv oddetallene som $2k+1$ og $2m+1$.<br><br><strong>d)</strong> Påstand: «$n^2+n+41$ er et primtall for alle naturlige tall $n$.» Vis at påstanden er gal.",
      "Skriv tallene som $n$, $n+1$, $n+2$ og sett felles faktor utenfor. I d): prøv $n=40$ og se etter en felles faktor.",
      [
        "<strong>a)</strong> $n+(n+1)+(n+2)=3n+3=3(n+1)$. Det er $3$ ganger et helt tall.<br><strong>Svar:</strong> alltid delelig med $3$",
        "<strong>b)</strong> $(n+1)^2-n^2=n^2+2n+1-n^2=2n+1$. Med $n=100$: $2\\cdot 100+1=201$.<br><strong>Svar:</strong> $101^2-100^2=201$",
        "<strong>c)</strong> $(2k+1)(2m+1)=4km+2k+2m+1=2(2km+k+m)+1$. Det er et partall pluss $1$.<br><strong>Svar:</strong> alltid oddetall",
        "<strong>d)</strong> $n=40$: $40^2+40+41=40\\cdot 41+41=41\\cdot 41=1681$. Det er ikke et primtall.<br><strong>Svar:</strong> moteksempel $n=40$, $1681=41^2$",
      ],
    ),
  ],
  "2D": [
    o(
      "2.30",
      "Fullstendige kvadraters metode og konjugatsetningen.<br><br>Eksempel: $x^2+4x-5=(x+2)^2-4-5=(x+2)^2-3^2=(x+2-3)(x+2+3)=(x-1)(x+5)$.<br><br>Faktoriser på samme måte.<br><br><strong>a)</strong> $x^2-6x+8$<br><br><strong>b)</strong> $x^2+2x-8$<br><br><strong>c)</strong> $x^2-8x+7$<br><br><strong>d)</strong> $x^2+6x+4$<br><br><strong>e)</strong> Kontroller svaret i a) ved å gange ut.",
      "Halvparten av tallet foran $x$ blir tallet i parentesen. Trekk fra kvadratet av det. Skriv resten som $(\\dots)^2-c^2$ og bruk konjugatsetningen.",
      [
        "<strong>a)</strong> $(x-3)^2-9+8=(x-3)^2-1^2=(x-4)(x-2)$.<br><strong>Svar:</strong> $(x-2)(x-4)$",
        "<strong>b)</strong> $(x+1)^2-1-8=(x+1)^2-3^2=(x-2)(x+4)$.<br><strong>Svar:</strong> $(x-2)(x+4)$",
        "<strong>c)</strong> $(x-4)^2-16+7=(x-4)^2-3^2=(x-7)(x-1)$.<br><strong>Svar:</strong> $(x-1)(x-7)$",
        "<strong>d)</strong> $(x+3)^2-9+4=(x+3)^2-5=(x+3)^2-(\\sqrt5)^2$.<br><strong>Svar:</strong> $(x+3-\\sqrt5)(x+3+\\sqrt5)$. Det går ikke med hele tall.",
        "<strong>e)</strong> $(x-2)(x-4)=x^2-4x-2x+8=x^2-6x+8$.<br><strong>Svar:</strong> stemmer",
      ],
    ),
    o(
      "2.31",
      "Skriv uttrykket på formen $a(x+p)^2+q$.<br><br><strong>a)</strong> $x^2+8x+10$<br><br><strong>b)</strong> $x^2-2x+5$<br><br><strong>c)</strong> $2x^2+12x+5$<br><br><strong>d)</strong> Bruk b) til å forklare hvorfor $x^2-2x+5$ aldri blir mindre enn $4$.",
      "I c): sett $2$ utenfor de to første leddene først, $2(x^2+6x)+5$.",
      [
        "<strong>a)</strong> $(x+4)^2-16+10$.<br><strong>Svar:</strong> $(x+4)^2-6$",
        "<strong>b)</strong> $(x-1)^2-1+5$.<br><strong>Svar:</strong> $(x-1)^2+4$",
        "<strong>c)</strong> $2(x^2+6x)+5=2\\big((x+3)^2-9\\big)+5=2(x+3)^2-18+5$.<br><strong>Svar:</strong> $2(x+3)^2-13$",
        "<strong>d)</strong> $(x-1)^2\\geq 0$ for alle $x$, så $(x-1)^2+4\\geq 4$. Minste verdi er $4$, når $x=1$.<br><strong>Svar:</strong> $x^2-2x+5\\geq 4$",
      ],
    ),
    o(
      "2.36",
      "<strong>CAS (GeoGebra).</strong> Bruk kommandoene <code>Utvid</code>, <code>Faktoriser</code> og <code>Forenkle</code>.<br><br><strong>a)</strong> <code>Utvid((2x-3)^2)</code>. Hvilken kvadratsetning bekrefter CAS?<br><br><strong>b)</strong> <code>Faktoriser(x^2-x-12)</code>. Kontroller ved å gange ut for hånd.<br><br><strong>c)</strong> <code>Faktoriser(x^2-6x-12)</code> gir uttrykket uendret tilbake. Forklar hvorfor. Bruk fullstendige kvadraters metode og faktoriser for hånd.<br><br><strong>d)</strong> <code>Forenkle((x^2-9)/(x-3))</code> gir $x+3$. Hvilken opplysning mangler i CAS-svaret?",
      "<code>Faktoriser</code> faktoriserer med hele tall og brøker. I c) må du bruke kvadratrøtter.",
      [
        "<strong>a)</strong> $4x^2-12x+9$, andre kvadratsetning.<br><strong>Svar:</strong> $4x^2-12x+9$",
        "<strong>b)</strong> $(x-4)(x+3)=x^2+3x-4x-12=x^2-x-12$.<br><strong>Svar:</strong> $(x-4)(x+3)$",
        "<strong>c)</strong> Det finnes ingen faktorisering med hele tall. $(x-3)^2-9-12=(x-3)^2-21$.<br><strong>Svar:</strong> $(x-3-\\sqrt{21})(x-3+\\sqrt{21})$",
        "<strong>d)</strong> Den opprinnelige brøken er ikke definert for $x=3$.<br><strong>Svar:</strong> $x+3$, $x\\neq 3$",
      ],
    ),
  ],
  "2F": [
    o(
      "2.37",
      "<strong>Python og figurtall.</strong> I L-mønsteret i oppgave 2.57 har figur $n$ i alt $n^2+2n$ prikker.<br><br><code>n = 1</code><br><code>while n**2 + 2*n &lt;= 200:</code><br><code>    n = n + 1</code><br><code>print(n, n**2 + 2*n)</code><br><br><strong>a)</strong> Lag en tabell for hånd over antall prikker for $n=1, 2, 3, 4, 5$.<br><br><strong>b)</strong> Hva er det programmet leter etter?<br><br><strong>c)</strong> Hva skriver programmet ut? Kontroller med regning.<br><br><strong>d)</strong> Vis at $n^2+2n=(n+1)^2-1$. Bruk dette til å forklare svaret i c) uten å prøve deg fram.",
      "Løkka fortsetter så lenge antallet er $200$ eller mindre. I d): $(n+1)^2$ må bli større enn $201$.",
      [
        "<strong>a)</strong> $3, 8, 15, 24, 35$.<br><strong>Svar:</strong> $3, 8, 15, 24, 35$",
        "<strong>b)</strong> Det første figurnummeret med mer enn $200$ prikker.<br><strong>Svar:</strong> første $n$ med over $200$ prikker",
        "<strong>c)</strong> $13^2+2\\cdot 13=195\\leq 200$ og $14^2+2\\cdot 14=224>200$.<br><strong>Svar:</strong> <code>14 224</code>",
        "<strong>d)</strong> $(n+1)^2-1=n^2+2n+1-1=n^2+2n$. Vi trenger $(n+1)^2>201$. $14^2=196$ er for lite og $15^2=225$ holder, så $n+1=15$.<br><strong>Svar:</strong> $n=14$",
      ],
    ),
  ],
};
