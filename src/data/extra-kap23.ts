import type { Oppgave } from "./types";
import { figRect, figSquareIdentity, figTriangleNumbers } from "./task-figures";

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

/** Flere 1T-oppgaver til kapittel 2 og 3, med a–e og stigende vanske. */
export const MORE23: Record<string, Oppgave[]> = {
  "2A": [
    o(
      "2.38",
      "Forenkle trinn for trinn. Samle like ledd til slutt.<br><br><strong>a)</strong> $9x-4+3-5x$<br><br><strong>b)</strong> $4(2x-3)-(x+7)$<br><br><strong>c)</strong> $x(x+4)-x(x-1)$<br><br><strong>d)</strong> $3-2(x-5)+6x$<br><br><strong>e)</strong> $(x+3)(x-3)+(x+3)^2$ — gange ut før du trekker sammen.",
      "Minus foran parentes skifter fortegn på alt inni. $x\\cdot x$ og $-x\\cdot x$ kan ta hverandre.",
      [
        "<strong>a)</strong> $(9x-5x)+(-4+3)=4x-1$.<br><strong>Svar:</strong> $4x-1$",
        "<strong>b)</strong> $8x-12-x-7=7x-19$.<br><strong>Svar:</strong> $7x-19$",
        "<strong>c)</strong> $x^2+4x-(x^2-x)=4x+x=5x$.<br><strong>Svar:</strong> $5x$",
        "<strong>d)</strong> $3-2x+10+6x=13+4x$.<br><strong>Svar:</strong> $4x+13$",
        "<strong>e)</strong> $x^2-9+(x^2+6x+9)=2x^2+6x$.<br><strong>Svar:</strong> $2x^2+6x$",
      ],
    ),
    o(
      "2.39",
      "Et rektangel har sider $x+3$ og $2x-1$ (alle mål i cm, $x>\\tfrac12$).<br><br><strong>a)</strong> Skriv et forenklet uttrykk for omkretsen.<br><br><strong>b)</strong> Skriv et forenklet uttrykk for arealet.<br><br><strong>c)</strong> Regn ut omkrets og areal når $x=4$.<br><br><strong>d)</strong> En elev skriver at arealet er $2x^2+6x-3$. Stemmer det? Vis mellomregning.<br><br><strong>e)</strong> For hvilken $x$ er omkretsen $30$ cm?",
      "Omkrets $2(\\text{lengde}+\\text{bredde})$. Areal: gange ut $(x+3)(2x-1)$.",
      [
        "<strong>a)</strong> $2((x+3)+(2x-1))=2(3x+2)=6x+4$.<br><strong>Svar:</strong> $6x+4$",
        "<strong>b)</strong> $(x+3)(2x-1)=2x^2-x+6x-3=2x^2+5x-3$.<br><strong>Svar:</strong> $2x^2+5x-3$",
        "<strong>c)</strong> Omkrets $6\\cdot 4+4=28$. Areal $2\\cdot 16+20-3=49$.<br><strong>Svar:</strong> $28$ cm og $49\\,\\mathrm{cm}^2$",
        "<strong>d)</strong> Eleven har $-x+6x=5x$, ikke $6x$. Uttrykket er feil.<br><strong>Svar:</strong> nei, riktig er $2x^2+5x-3$",
        "<strong>e)</strong> $6x+4=30$, $6x=26$, $x=\\dfrac{13}{3}$.<br><strong>Svar:</strong> $x=\\dfrac{13}{3}$",
      ],
    ),
    o(
      "2.40",
      "Finn feilen — og rett den.<br><br><strong>a)</strong> En elev skriver $2(x-4)=2x-4$.<br><br><strong>b)</strong> En elev skriver $-(x-3)= -x-3$.<br><br><strong>c)</strong> En elev trekker sammen $3x+2+x$ til $6x$.<br><br><strong>d)</strong> En elev skriver $(x+2)(x+3)=x^2+6$.<br><br><strong>e)</strong> Forenkle riktig: $5(x-2)-3(2-x)$.",
      "Alt inni parentesen skal ganges. Like ledd er ledd med samme variabelpotens.",
      [
        "<strong>a)</strong> $2$ skal også gange $-4$: $2x-8$.<br><strong>Svar:</strong> $2x-8$",
        "<strong>b)</strong> Minus foran skifter fortegn på begge: $-x+3$.<br><strong>Svar:</strong> $-x+3$",
        "<strong>c)</strong> $3x+x=4x$, konstanten $2$ blir med: $4x+2$.<br><strong>Svar:</strong> $4x+2$",
        "<strong>d)</strong> FOIL: $x^2+3x+2x+6=x^2+5x+6$.<br><strong>Svar:</strong> $x^2+5x+6$",
        "<strong>e)</strong> $5x-10-6+3x=8x-16$.<br><strong>Svar:</strong> $8x-16$",
      ],
    ),
  ],
  "2B": [
    o(
      "2.41",
      "Bruk kvadratsetningene. Ikke gange ledd for ledd hvis du kjenner igjen mønsteret.<br><br><strong>a)</strong> $(x+9)^2$<br><br><strong>b)</strong> $(5-y)^2$<br><br><strong>c)</strong> $(3x+4)(3x-4)$<br><br><strong>d)</strong> $(2a-1)^2$<br><br><strong>e)</strong> $(\\sqrt{6}+\\sqrt{2})(\\sqrt{6}-\\sqrt{2})$",
      "$(a+b)^2=a^2+2ab+b^2$. Differanse: $(a+b)(a-b)=a^2-b^2$.",
      [
        "<strong>a)</strong> $x^2+18x+81$.<br><strong>Svar:</strong> $x^2+18x+81$",
        "<strong>b)</strong> $25-10y+y^2$.<br><strong>Svar:</strong> $y^2-10y+25$",
        "<strong>c)</strong> $9x^2-16$.<br><strong>Svar:</strong> $9x^2-16$",
        "<strong>d)</strong> $4a^2-4a+1$.<br><strong>Svar:</strong> $4a^2-4a+1$",
        "<strong>e)</strong> $6-2=4$.<br><strong>Svar:</strong> $4$",
      ],
    ),
    o(
      "2.42",
      figSquareIdentity("Et kvadrat med side $a+b$ deles i $a^2$, to rektangler $ab$ og et lite kvadrat $b^2$.") +
        "Figuren viser hvorfor $(a+b)^2=a^2+2ab+b^2$.<br><br><strong>a)</strong> Les av de fire delene og skriv identiteten.<br><br><strong>b)</strong> Hva blir $(a-b)^2$ geometrisk, og hvorfor dukker minus opp?<br><br><strong>c)</strong> Bruk figuren til å regne ut $23^2$ som $(20+3)^2$.<br><br><strong>d)</strong> Forenkle $(x+4)^2-(x+4)(x-4)$.<br><br><strong>e)</strong> Vis at $(2x+3)^2-4x(x+3)=9$.",
      "Tegn inn $a$ og $b$ på sidene. Minus i $(a-b)^2$ betyr at du fjerner to rektangler og legger til $b^2$ igjen.",
      [
        "<strong>a)</strong> Stor kvadrat = $a^2+ab+ab+b^2=a^2+2ab+b^2$.<br><strong>Svar:</strong> $(a+b)^2=a^2+2ab+b^2$",
        "<strong>b)</strong> $(a-b)^2=a^2-2ab+b^2$: du tar bort to rektangler $ab$, men hjørnet $b^2$ ble trukket to ganger og må legges tilbake.<br><strong>Svar:</strong> $a^2-2ab+b^2$",
        "<strong>c)</strong> $400+2\\cdot 20\\cdot 3+9=400+120+9=529$.<br><strong>Svar:</strong> $529$",
        "<strong>d)</strong> $x^2+8x+16-(x^2-16)=8x+32$.<br><strong>Svar:</strong> $8x+32$",
        "<strong>e)</strong> $4x^2+12x+9-4x^2-12x=9$.<br><strong>Svar:</strong> vist, lik $9$",
      ],
    ),
    o(
      "2.43",
      "Blandede kvadratsetninger — økende vanske.<br><br><strong>a)</strong> $(x+\\tfrac12)^2$<br><br><strong>b)</strong> $103\\cdot 97$ uten kalkulator<br><br><strong>c)</strong> $(2x-5)^2-(x-5)^2$<br><br><strong>d)</strong> $(\\sqrt{x}+3)^2$ når $x\\ge 0$<br><br><strong>e)</strong> Hvilket tall $k$ gjør $x^2+10x+k$ til et fullstendig kvadrat?",
      "Fullstendig kvadrat: $k=(\\tfrac{b}{2})^2$. $103\\cdot 97=(100+3)(100-3)$.",
      [
        "<strong>a)</strong> $x^2+x+\\dfrac14$.<br><strong>Svar:</strong> $x^2+x+\\dfrac{1}{4}$",
        "<strong>b)</strong> $100^2-3^2=10000-9=9991$.<br><strong>Svar:</strong> $9991$",
        "<strong>c)</strong> $(4x^2-20x+25)-(x^2-10x+25)=3x^2-10x$.<br><strong>Svar:</strong> $3x^2-10x$",
        "<strong>d)</strong> $x+6\\sqrt{x}+9$.<br><strong>Svar:</strong> $x+6\\sqrt{x}+9$",
        "<strong>e)</strong> $(\\tfrac{10}{2})^2=25$, så $(x+5)^2$.<br><strong>Svar:</strong> $k=25$",
      ],
    ),
  ],
  "2C": [
    o(
      "2.44",
      "Sett felles faktor utenfor parentes. Ta ut så mye som mulig.<br><br><strong>a)</strong> $14x-21$<br><br><strong>b)</strong> $9x^2-12x$<br><br><strong>c)</strong> $6a^3b-15a^2b^2$<br><br><strong>d)</strong> $x(x+4)+5(x+4)$<br><br><strong>e)</strong> $2y(y-3)-3(y-3)$",
      "Felles tallfaktor og felles bokstaver. I d) og e) er hele parentesen felles.",
      [
        "<strong>a)</strong> $7(2x-3)$. <strong>Svar:</strong> $7(2x-3)$",
        "<strong>b)</strong> $3x(3x-4)$. <strong>Svar:</strong> $3x(3x-4)$",
        "<strong>c)</strong> $3a^2b(2a-5b)$. <strong>Svar:</strong> $3a^2b(2a-5b)$",
        "<strong>d)</strong> $(x+4)(x+5)$. <strong>Svar:</strong> $(x+4)(x+5)$",
        "<strong>e)</strong> $(y-3)(2y-3)$. <strong>Svar:</strong> $(y-3)(2y-3)$",
      ],
    ),
    o(
      "2.45",
      "Felles faktor, også med to ledd i parentes.<br><br><strong>a)</strong> $4(x-1)+x(x-1)$<br><br><strong>b)</strong> $ab+3a+2b+6$ (grupper to og to)<br><br><strong>c)</strong> $x^3-x^2+x-1$<br><br><strong>d)</strong> Vis at $\\sqrt{45}-\\sqrt{20}=\\sqrt{5}$.<br><br><strong>e)</strong> Faktoriser $2x^2(x+1)-8(x+1)$.",
      "Gruppering: ta $a$ ut av de to første, $2$ ut av de to siste, deretter felles parentes.",
      [
        "<strong>a)</strong> $(x-1)(4+x)$. <strong>Svar:</strong> $(x-1)(x+4)$",
        "<strong>b)</strong> $a(b+3)+2(b+3)=(a+2)(b+3)$.<br><strong>Svar:</strong> $(a+2)(b+3)$",
        "<strong>c)</strong> $x^2(x-1)+1(x-1)=(x^2+1)(x-1)$.<br><strong>Svar:</strong> $(x-1)(x^2+1)$",
        "<strong>d)</strong> $\\sqrt{45}=3\\sqrt{5}$, $\\sqrt{20}=2\\sqrt{5}$, $3\\sqrt{5}-2\\sqrt{5}=\\sqrt{5}$.<br><strong>Svar:</strong> vist",
        "<strong>e)</strong> $(x+1)(2x^2-8)=2(x+1)(x^2-4)=2(x+1)(x-2)(x+2)$.<br><strong>Svar:</strong> $2(x+1)(x-2)(x+2)$",
      ],
    ),
    o(
      "2.46",
      "Hvor langt kan du faktorisere?<br><br><strong>a)</strong> $18xy+27x$<br><br><strong>b)</strong> $x^2-4x$<br><br><strong>c)</strong> $5(2x-1)^2+10(2x-1)$<br><br><strong>d)</strong> En elev skriver $6x-9=3x(2-3)$. Hva er feil?<br><br><strong>e)</strong> Faktoriser $4x^3-10x^2+6x$.",
      "Ta ut tall og laveste potens av $x$ først. Sjekk ved å gange tilbake.",
      [
        "<strong>a)</strong> $9x(2y+3)$. <strong>Svar:</strong> $9x(2y+3)$",
        "<strong>b)</strong> $x(x-4)$. <strong>Svar:</strong> $x(x-4)$",
        "<strong>c)</strong> $5(2x-1)\\bigl((2x-1)+2\\bigr)=5(2x-1)(2x+1)$.<br><strong>Svar:</strong> $5(2x-1)(2x+1)$",
        "<strong>d)</strong> $3$ går opp i begge, men ikke $x$ i $-9$. Riktig er $3(2x-3)$.<br><strong>Svar:</strong> $3(2x-3)$",
        "<strong>e)</strong> $2x(2x^2-5x+3)=2x(2x-3)(x-1)$.<br><strong>Svar:</strong> $2x(2x-3)(x-1)$",
      ],
    ),
  ],
  "2D": [
    o(
      "2.47",
      "Faktoriser andregradsuttrykkene. Start med å kjenne igjen typen.<br><br><strong>a)</strong> $x^2-25$<br><br><strong>b)</strong> $x^2+12x+36$<br><br><strong>c)</strong> $x^2-7x+12$<br><br><strong>d)</strong> $x^2+x-6$<br><br><strong>e)</strong> $2x^2-7x-15$",
      "Differanse av kvadrat / fullstendig kvadrat / to tall med produkt $c$ og sum $b$. I e) produkt $ac=-30$.",
      [
        "<strong>a)</strong> $(x-5)(x+5)$. <strong>Svar:</strong> $(x-5)(x+5)$",
        "<strong>b)</strong> $(x+6)^2$. <strong>Svar:</strong> $(x+6)^2$",
        "<strong>c)</strong> $(x-3)(x-4)$. <strong>Svar:</strong> $(x-3)(x-4)$",
        "<strong>d)</strong> $(x+3)(x-2)$. <strong>Svar:</strong> $(x+3)(x-2)$",
        "<strong>e)</strong> $(2x+3)(x-5)$. <strong>Svar:</strong> $(2x+3)(x-5)$",
      ],
    ),
    o(
      "2.48",
      "Ta ut felles faktor først, deretter faktoriser videre.<br><br><strong>a)</strong> $3x^2-27$<br><br><strong>b)</strong> $2x^2+16x+32$<br><br><strong>c)</strong> $x^3-9x$<br><br><strong>d)</strong> $4x^2-12x+9$<br><br><strong>e)</strong> Kan $x^2+9$ faktoriseres i reelle tall? Begrunn.",
      "Etter felles faktor: se etter $a^2-b^2$ eller $(ax-b)^2$. Sum av to kvadrat faktoriseres ikke i $\\mathbb{R}$.",
      [
        "<strong>a)</strong> $3(x^2-9)=3(x-3)(x+3)$.<br><strong>Svar:</strong> $3(x-3)(x+3)$",
        "<strong>b)</strong> $2(x^2+8x+16)=2(x+4)^2$.<br><strong>Svar:</strong> $2(x+4)^2$",
        "<strong>c)</strong> $x(x^2-9)=x(x-3)(x+3)$.<br><strong>Svar:</strong> $x(x-3)(x+3)$",
        "<strong>d)</strong> $(2x-3)^2$. <strong>Svar:</strong> $(2x-3)^2$",
        "<strong>e)</strong> $x^2+9=(x)^2+3^2$ er sum, ikke differanse. Ingen reelle faktorer videre.<br><strong>Svar:</strong> nei, ikke i $\\mathbb{R}$",
      ],
    ),
    o(
      "2.49",
      "Fullstendig kvadrat og «fyll inn tallet».<br><br><strong>a)</strong> Faktoriser $x^2-16x+64$.<br><br><strong>b)</strong> Hvilket tall skal stå i $\\square$ for at $x^2-6x+\\square$ skal bli et fullstendig kvadrat?<br><br><strong>c)</strong> Er $x^2+8x+12$ et fullstendig kvadrat? Hvis ikke, faktoriser likevel.<br><br><strong>d)</strong> Skriv $x^2+4x+7$ som $(x+2)^2+$ et tall.<br><br><strong>e)</strong> Faktoriser $9x^2-30x+25$.",
      "$(\\tfrac{b}{2})^2$ er tallet som fullfører kvadratet. I d) legger du til og trekker fra $4$.",
      [
        "<strong>a)</strong> $(x-8)^2$. <strong>Svar:</strong> $(x-8)^2$",
        "<strong>b)</strong> $(\\tfrac{-6}{2})^2=9$. <strong>Svar:</strong> $9$",
        "<strong>c)</strong> $16$ trengs til kvadrat, her er $12$. Faktor: $(x+6)(x+2)$.<br><strong>Svar:</strong> nei, $(x+6)(x+2)$",
        "<strong>d)</strong> $(x+2)^2+3$. <strong>Svar:</strong> $(x+2)^2+3$",
        "<strong>e)</strong> $(3x-5)^2$. <strong>Svar:</strong> $(3x-5)^2$",
      ],
    ),
    o(
      "2.50",
      "Blandet faktorisering — velg metode.<br><br><strong>a)</strong> $x^2-14x+49$<br><br><strong>b)</strong> $16-x^2$<br><br><strong>c)</strong> $x^2+5x-14$<br><br><strong>d)</strong> $3x^2-3$<br><br><strong>e)</strong> $x^4-16$ (hint: det er differanse mellom to kvadrat to ganger)",
      "$x^4-16=(x^2)^2-4^2$. Deretter $x^2-4$ en gang til.",
      [
        "<strong>a)</strong> $(x-7)^2$. <strong>Svar:</strong> $(x-7)^2$",
        "<strong>b)</strong> $(4-x)(4+x)$. <strong>Svar:</strong> $(4-x)(4+x)$",
        "<strong>c)</strong> $(x+7)(x-2)$. <strong>Svar:</strong> $(x+7)(x-2)$",
        "<strong>d)</strong> $3(x-1)(x+1)$. <strong>Svar:</strong> $3(x-1)(x+1)$",
        "<strong>e)</strong> $(x^2-4)(x^2+4)=(x-2)(x+2)(x^2+4)$.<br><strong>Svar:</strong> $(x-2)(x+2)(x^2+4)$",
      ],
    ),
  ],
  "2E": [
    o(
      "2.51",
      "Forkort. Oppgi også hvilke $x$ som er forbudt.<br><br><strong>a)</strong> $\\dfrac{6x-9}{3}$<br><br><strong>b)</strong> $\\dfrac{x^2-16}{x+4}$<br><br><strong>c)</strong> $\\dfrac{2x^2-6x}{4x}$<br><br><strong>d)</strong> $\\dfrac{x^2+5x+6}{x+2}$<br><br><strong>e)</strong> $\\dfrac{x^2-1}{x^2-2x-3}$",
      "Faktoriser teller og nevner. Stryk bare felles faktorer. Nevner $\\neq 0$.",
      [
        "<strong>a)</strong> $2x-3$. Ingen forbud (nevner konstant).<br><strong>Svar:</strong> $2x-3$",
        "<strong>b)</strong> $x-4$ for $x\\neq -4$.<br><strong>Svar:</strong> $x-4$, $x\\neq -4$",
        "<strong>c)</strong> $\\dfrac{2x(x-3)}{4x}=\\dfrac{x-3}{2}$, $x\\neq 0$.<br><strong>Svar:</strong> $\\dfrac{x-3}{2}$, $x\\neq 0$",
        "<strong>d)</strong> $\\dfrac{(x+2)(x+3)}{x+2}=x+3$, $x\\neq -2$.<br><strong>Svar:</strong> $x+3$, $x\\neq -2$",
        "<strong>e)</strong> $\\dfrac{(x-1)(x+1)}{(x-3)(x+1)}=\\dfrac{x-1}{x-3}$ for $x\\neq -1$ og $x\\neq 3$.<br><strong>Svar:</strong> $\\dfrac{x-1}{x-3}$, $x\\neq -1,\\,3$",
      ],
    ),
    o(
      "2.52",
      "Trekk sammen til én brøk og forkort hvis du kan.<br><br><strong>a)</strong> $\\dfrac{3}{x}+\\dfrac{1}{2x}$<br><br><strong>b)</strong> $\\dfrac{5}{x-1}-\\dfrac{2}{x-1}$<br><br><strong>c)</strong> $\\dfrac{x}{x+2}-\\dfrac{2}{x+2}$<br><br><strong>d)</strong> $\\dfrac{1}{x}+\\dfrac{1}{x+1}$<br><br><strong>e)</strong> $\\dfrac{x}{x-3}-\\dfrac{x+6}{x^2-9}$",
      "Fellesnevner. I e) er $x^2-9=(x-3)(x+3)$.",
      [
        "<strong>a)</strong> $\\dfrac{6+1}{2x}=\\dfrac{7}{2x}$.<br><strong>Svar:</strong> $\\dfrac{7}{2x}$",
        "<strong>b)</strong> $\\dfrac{3}{x-1}$.<br><strong>Svar:</strong> $\\dfrac{3}{x-1}$",
        "<strong>c)</strong> $\\dfrac{x-2}{x+2}$.<br><strong>Svar:</strong> $\\dfrac{x-2}{x+2}$",
        "<strong>d)</strong> $\\dfrac{x+1+x}{x(x+1)}=\\dfrac{2x+1}{x(x+1)}$.<br><strong>Svar:</strong> $\\dfrac{2x+1}{x(x+1)}$",
        "<strong>e)</strong> $\\dfrac{x(x+3)-(x+6)}{(x-3)(x+3)}=\\dfrac{x^2+3x-x-6}{(x-3)(x+3)}=\\dfrac{x^2+2x-6}{(x-3)(x+3)}$.<br><strong>Svar:</strong> $\\dfrac{x^2+2x-6}{(x-3)(x+3)}$ (kan ikke forkortes mer)",
      ],
    ),
    o(
      "2.53",
      "Gange, dele og en vanlig felle.<br><br><strong>a)</strong> $\\dfrac{3x}{4}\\cdot\\dfrac{8}{x}$ når $x\\neq 0$<br><br><strong>b)</strong> $\\dfrac{x^2-9}{x}\\cdot\\dfrac{2x}{x+3}$<br><br><strong>c)</strong> $\\dfrac{\\dfrac{2}{x}}{\\dfrac{4}{x^2}}$<br><br><strong>d)</strong> En elev skriver $\\dfrac{x+5}{5}=x$. Vis at det er feil, og forenkle riktig.<br><br><strong>e)</strong> $\\dfrac{x^2-4}{x^2+5x+6}\\cdot\\dfrac{x+3}{x-2}$",
      "Å dele på en brøk er å gange med den omvendte. Du kan aldri stryke et ledd som er plusset, bare faktorer.",
      [
        "<strong>a)</strong> $\\dfrac{3x\\cdot 8}{4x}=6$.<br><strong>Svar:</strong> $6$",
        "<strong>b)</strong> $\\dfrac{(x-3)(x+3)\\cdot 2x}{x(x+3)}=2(x-3)$ for $x\\neq 0,-3$.<br><strong>Svar:</strong> $2(x-3)$",
        "<strong>c)</strong> $\\dfrac{2}{x}\\cdot\\dfrac{x^2}{4}=\\dfrac{x}{2}$.<br><strong>Svar:</strong> $\\dfrac{x}{2}$",
        "<strong>d)</strong> Bare $5$ i nevneren, ikke hele telleren. $\\dfrac{x}{5}+1$.<br><strong>Svar:</strong> $\\dfrac{x}{5}+1$",
        "<strong>e)</strong> $\\dfrac{(x-2)(x+2)}{(x+2)(x+3)}\\cdot\\dfrac{x+3}{x-2}=1$ for tillatte $x$.<br><strong>Svar:</strong> $1$ ($x\\neq -2,-3,2$)",
      ],
    ),
  ],
  "2F": [
    o(
      "2.54",
      figTriangleNumbers("Trekanttall $T_n$: rad $n$ har $n$ prikker, og $T_n=1+2+\\ldots+n$.") +
        "Figuren viser $T_1$ til $T_4$.<br><br><strong>a)</strong> Tell opp og finn $T_5$ og $T_6$.<br><br><strong>b)</strong> Formelen er $T_n=\\dfrac{n(n+1)}{2}$. Vis at den stemmer for $n=4$.<br><br><strong>c)</strong> Finn $T_{10}$.<br><br><strong>d)</strong> Vis at $T_n+T_{n-1}=n^2$ for $n\\ge 2$ (to trekanter gir et kvadrat).<br><br><strong>e)</strong> Løs $T_n=66$ for $n$.",
      "Summen $1+2+\\ldots+n$ er $\\dfrac{n(n+1)}{2}$. I e) får du en andregradslikning.",
      [
        "<strong>a)</strong> $T_5=15$, $T_6=21$.<br><strong>Svar:</strong> $15$ og $21$",
        "<strong>b)</strong> $\\dfrac{4\\cdot 5}{2}=10$, og figuren har $10$ prikker.<br><strong>Svar:</strong> vist",
        "<strong>c)</strong> $\\dfrac{10\\cdot 11}{2}=55$.<br><strong>Svar:</strong> $55$",
        "<strong>d)</strong> $\\dfrac{n(n+1)}{2}+\\dfrac{(n-1)n}{2}=\\dfrac{n}{2}\\bigl(n+1+n-1\\bigr)=n^2$.<br><strong>Svar:</strong> vist",
        "<strong>e)</strong> $n(n+1)=132$, $n^2+n-132=0$, $(n-11)(n+12)=0$, $n=11$.<br><strong>Svar:</strong> $n=11$",
      ],
    ),
    o(
      "2.55",
      figRect("s + 3", "s", "Kvadrat med side $s$ og rektangel med sider $s$ og $s+3$.") +
        "Et kvadrat har side $s$. Ved siden av ligger et rektangel med samme høyde og $3$ lenger bredde.<br><br><strong>a)</strong> Uttrykk for kvadratets areal.<br><br><strong>b)</strong> Uttrykk for rektangelets areal.<br><br><strong>c)</strong> Hvor mye større er rektangelet, forenklet?<br><br><strong>d)</strong> For hvilken $s$ er rektangelets areal dobbelt så stort som kvadratets?<br><br><strong>e)</strong> Finn omkretsen av de to figurene til sammen, forenklet.",
      "Dobbel: $(s+3)s=2s^2$. Omkrets kvadrat $4s$, rektangel $2(s+s+3)$.",
      [
        "<strong>a)</strong> $s^2$. <strong>Svar:</strong> $s^2$",
        "<strong>b)</strong> $s(s+3)=s^2+3s$. <strong>Svar:</strong> $s^2+3s$",
        "<strong>c)</strong> $3s$. <strong>Svar:</strong> $3s$",
        "<strong>d)</strong> $s^2+3s=2s^2$, $3s=s^2$, $s=3$ (siden $s>0$).<br><strong>Svar:</strong> $s=3$",
        "<strong>e)</strong> $4s+2(2s+3)=4s+4s+6=8s+6$.<br><strong>Svar:</strong> $8s+6$",
      ],
    ),
    o(
      "2.56",
      "Et mønster av kvadrater: figur $n$ består av en rad med $n$ kvadrater, så $n-1$ oppå, og så videre ned til $1$ (altså trekant av kvadrater).<br><br><strong>a)</strong> Hvor mange kvadrater har figur $1$, $2$ og $3$?<br><br><strong>b)</strong> Finn en formel for antall kvadrater i figur $n$.<br><br><strong>c)</strong> Hvor mange kvadrater i figur $8$?<br><br><strong>d)</strong> Hvilken figur har $55$ kvadrater?<br><br><strong>e)</strong> Om hvert kvadrat har side $1$, hva er omkretsen av figur $n$? (Hint: tenk ytterkant, ikke $4$ ganger antall.)",
      "Antall er trekanttallet $T_n$. Omkretsen av den store trappen er $2n+2n=4n$ — sjekk for $n=1,2,3$.",
      [
        "<strong>a)</strong> $1$, $3$ og $6$.<br><strong>Svar:</strong> $1$, $3$, $6$",
        "<strong>b)</strong> $T_n=\\dfrac{n(n+1)}{2}$.<br><strong>Svar:</strong> $\\dfrac{n(n+1)}{2}$",
        "<strong>c)</strong> $\\dfrac{8\\cdot 9}{2}=36$.<br><strong>Svar:</strong> $36$",
        "<strong>d)</strong> Samme som $T_n=55$ $\\Rightarrow$ $n=10$.<br><strong>Svar:</strong> figur $10$",
        "<strong>e)</strong> For $n=1$ er omkrets $4$. For $n=2$ er den $8$. Mønster $4n$.<br><strong>Svar:</strong> $4n$",
      ],
    ),
    o(
      "2.57",
      "Et L-formet mønster: figur $n$ er et kvadrat med side $n+1$ der et lite hjørnekvadrat med side $1$ er kuttet vekk.<br><br><strong>a)</strong> Tegn (i hodet eller på kladdeark) figur $1$, $2$ og $3$. Hvor mange enhetskvadrater har de?<br><br><strong>b)</strong> Finn en formel for antall enhetskvadrater i figur $n$.<br><br><strong>c)</strong> Hvor mange i figur $10$?<br><br><strong>d)</strong> Hvilken figur har $80$ enhetskvadrater?<br><br><strong>e)</strong> Omkretsen av L-en (ytterkant) for figur $n$: argumenter for at den er $4n+4$.",
      "Areal: $(n+1)^2-1$. Løs $(n+1)^2-1=80$. Ytterkanten er den samme som det store kvadratets omkrets.",
      [
        "<strong>a)</strong> Figur $1$: $2^2-1=3$. Figur $2$: $9-1=8$. Figur $3$: $16-1=15$.<br><strong>Svar:</strong> $3$, $8$, $15$",
        "<strong>b)</strong> $(n+1)^2-1=n^2+2n$.<br><strong>Svar:</strong> $n^2+2n$",
        "<strong>c)</strong> $100+20=120$.<br><strong>Svar:</strong> $120$",
        "<strong>d)</strong> $n^2+2n-80=0$, $(n+10)(n-8)=0$, $n=8$.<br><strong>Svar:</strong> figur $8$",
        "<strong>e)</strong> Kuttingen fjerner to sider av lengde $1$ og legger til to nye av lengde $1$, så omkretsen er uendret: $4(n+1)=4n+4$.<br><strong>Svar:</strong> $4n+4$",
      ],
    ),
    o(
      "2.58",
      "Prikkmønster: figur $n$ har $n$ rader med $n+2$ prikker i hver rad, minus $2$ hjørneprikker som mangler.<br><br><strong>a)</strong> Skriv et uttrykk for antall prikker, og forenkle.<br><br><strong>b)</strong> Finn antall i figur $1$ og $2$ ved både telling og formel.<br><br><strong>c)</strong> For hvilken $n$ er det $62$ prikker?<br><br><strong>d)</strong> Vis at antall prikker alltid er partall.<br><br><strong>e)</strong> En annen elev skriver $n(n+2)$. Hva har eleven glemt?",
      "Start med rektangelet $n\\cdot(n+2)$, trekk fra $2$. Partall: faktoriser.",
      [
        "<strong>a)</strong> $n(n+2)-2=n^2+2n-2$.<br><strong>Svar:</strong> $n^2+2n-2$",
        "<strong>b)</strong> $n=1$: $1\\cdot 3-2=1$. $n=2$: $2\\cdot 4-2=6$.<br><strong>Svar:</strong> $1$ og $6$",
        "<strong>c)</strong> $n^2+2n-2=62$, $n^2+2n-64=0$. $n=\\dfrac{-2\\pm\\sqrt{4+256}}{2}=\\dfrac{-2\\pm 16}{2}$. Positiv: $n=7$.<br><strong>Svar:</strong> $n=7$",
        "<strong>d)</strong> $n(n+2)$ er produkt av to påfølgende partall eller to oddetall, altså partall; minus $2$ forblir partall.<br><strong>Svar:</strong> vist, alltid partall",
        "<strong>e)</strong> De to manglende hjørnene.<br><strong>Svar:</strong> eleven trakk ikke fra $2$",
      ],
    ),
  ],
  "3A": [
    o(
      "3.38",
      "Løs og sett prøve.<br><br><strong>a)</strong> $7x+5=3x-11$<br><br><strong>b)</strong> $2(3x-1)=5x+8$<br><br><strong>c)</strong> $\\dfrac{x+1}{2}=\\dfrac{x-3}{4}$<br><br><strong>d)</strong> $4-\\dfrac{x}{3}=x+1$<br><br><strong>e)</strong> $3(x-2)-2(1-x)=x+10$",
      "Gang vekk nevnerne. Sett inn svaret i originalen.",
      [
        "<strong>a)</strong> $4x=-16$, $x=-4$. Prøve: $-28+5=-12-11=-23$.<br><strong>Svar:</strong> $x=-4$",
        "<strong>b)</strong> $6x-2=5x+8$, $x=10$.<br><strong>Svar:</strong> $x=10$",
        "<strong>c)</strong> $2(x+1)=x-3$, $2x+2=x-3$, $x=-5$.<br><strong>Svar:</strong> $x=-5$",
        "<strong>d)</strong> Gang med $3$: $12-x=3x+3$, $9=4x$, $x=\\dfrac{9}{4}$.<br><strong>Svar:</strong> $x=\\dfrac{9}{4}$",
        "<strong>e)</strong> $3x-6-2+2x=x+10$, $5x-8=x+10$, $4x=18$, $x=\\dfrac{9}{2}$.<br><strong>Svar:</strong> $x=\\dfrac{9}{2}$",
      ],
    ),
    o(
      "3.39",
      "Løs ulikhetene. Skriv svaret både med ulikhetstegn og som intervall.<br><br><strong>a)</strong> $5x+2\\le 17$<br><br><strong>b)</strong> $1-4x>9$<br><br><strong>c)</strong> $3(x+2)\\ge x-4$<br><br><strong>d)</strong> $-2(x-3)<10$<br><br><strong>e)</strong> $\\dfrac{x}{2}-1\\le \\dfrac{x}{5}$",
      "Samme flytting som likninger. Deler du på et negativt tall, snur tegnet.",
      [
        "<strong>a)</strong> $5x\\le 15$, $x\\le 3$. Intervall $(-\\infty,3]$.<br><strong>Svar:</strong> $x\\le 3$",
        "<strong>b)</strong> $-4x>8$, $x<-2$. Intervall $\\langle\\leftarrow,-2\\rangle$.<br><strong>Svar:</strong> $x<-2$",
        "<strong>c)</strong> $3x+6\\ge x-4$, $2x\\ge -10$, $x\\ge -5$.<br><strong>Svar:</strong> $x\\ge -5$",
        "<strong>d)</strong> $-2x+6<10$, $-2x<4$, $x>-2$ (snudd).<br><strong>Svar:</strong> $x>-2$",
        "<strong>e)</strong> Gang med $10$: $5x-10\\le 2x$, $3x\\le 10$, $x\\le \\dfrac{10}{3}$.<br><strong>Svar:</strong> $x\\le \\dfrac{10}{3}$",
      ],
    ),
    o(
      "3.40",
      "Fra tekst til likning.<br><br><strong>a)</strong> Tre ganger et tall, minus $7$, er lik tallet pluss $11$. Finn tallet.<br><br><strong>b)</strong> Ida er $4$ år eldre enn Noah. Til sammen er de $30$ år. Hvor gamle er de?<br><br><strong>c)</strong> En rektangulær hage har omkrets $46$ m. Lengden er $3$ m mer enn bredden. Finn sidene.<br><br><strong>d)</strong> En billett koster $x$ kr for voksen og $x-40$ kr for barn. To voksne og tre barn koster $470$ kr. Finn $x$.<br><br><strong>e)</strong> Kontroller d) ved å sette inn.",
      "La den minste ukjente være $x$. Omkrets $2(l+b)$.",
      [
        "<strong>a)</strong> $3n-7=n+11$, $2n=18$, $n=9$.<br><strong>Svar:</strong> $9$",
        "<strong>b)</strong> Noah $n$, Ida $n+4$. $2n+4=30$, $n=13$. Ida $17$.<br><strong>Svar:</strong> Noah $13$, Ida $17$",
        "<strong>c)</strong> $2((b+3)+b)=46$, $2b+3=23$, $b=10$, $l=13$.<br><strong>Svar:</strong> $10$ m og $13$ m",
        "<strong>d)</strong> $2x+3(x-40)=470$, $5x-120=470$, $5x=590$, $x=118$.<br><strong>Svar:</strong> $118$ kr",
        "<strong>e)</strong> Barn $78$. $2\\cdot 118+3\\cdot 78=236+234=470$.<br><strong>Svar:</strong> stemmer",
      ],
    ),
  ],
  "3B": [
    o(
      "3.41",
      "Isoler den oppgitte bokstaven.<br><br><strong>a)</strong> $A=l\\cdot b$ for $l$<br><br><strong>b)</strong> $C=2\\pi r$ for $r$<br><br><strong>c)</strong> $v=v_0+at$ for $t$<br><br><strong>d)</strong> $y=mx+b$ for $x$<br><br><strong>e)</strong> $P=2(l+b)$ for $b$",
      "Gjør det motsatte, i motsatt rekkefølge. $l$ ganges — da deler du.",
      [
        "<strong>a)</strong> $l=\\dfrac{A}{b}$. <strong>Svar:</strong> $l=\\dfrac{A}{b}$",
        "<strong>b)</strong> $r=\\dfrac{C}{2\\pi}$. <strong>Svar:</strong> $r=\\dfrac{C}{2\\pi}$",
        "<strong>c)</strong> $t=\\dfrac{v-v_0}{a}$. <strong>Svar:</strong> $t=\\dfrac{v-v_0}{a}$",
        "<strong>d)</strong> $x=\\dfrac{y-b}{m}$. <strong>Svar:</strong> $x=\\dfrac{y-b}{m}$",
        "<strong>e)</strong> $\\dfrac{P}{2}=l+b$, $b=\\dfrac{P}{2}-l$. <strong>Svar:</strong> $b=\\dfrac{P}{2}-l$",
      ],
    ),
    o(
      "3.42",
      "Formler fra naturfag.<br><br><strong>a)</strong> $E=mc^2$. Isoler $m$.<br><br><strong>b)</strong> $F=\\dfrac{GMm}{r^2}$. Isoler $r^2$, deretter $r$ (positiv).<br><br><strong>c)</strong> $T=2\\pi\\sqrt{\\dfrac{l}{g}}$. Isoler $l$.<br><br><strong>d)</strong> $U=RI$. Isoler $R$, og finn $R$ når $U=12$ og $I=0{,}5$.<br><br><strong>e)</strong> $\\dfrac{1}{f}=\\dfrac{1}{u}+\\dfrac{1}{v}$. Isoler $f$.",
      "Kvadratrot fjernes ved å kvadrere. I e) fellesnevner $uv$, så inverter.",
      [
        "<strong>a)</strong> $m=\\dfrac{E}{c^2}$. <strong>Svar:</strong> $m=\\dfrac{E}{c^2}$",
        "<strong>b)</strong> $r^2=\\dfrac{GMm}{F}$, $r=\\sqrt{\\dfrac{GMm}{F}}$.<br><strong>Svar:</strong> $r=\\sqrt{\\dfrac{GMm}{F}}$",
        "<strong>c)</strong> $\\dfrac{T}{2\\pi}=\\sqrt{\\dfrac{l}{g}}$, $\\dfrac{T^2}{4\\pi^2}=\\dfrac{l}{g}$, $l=\\dfrac{gT^2}{4\\pi^2}$.<br><strong>Svar:</strong> $l=\\dfrac{gT^2}{4\\pi^2}$",
        "<strong>d)</strong> $R=\\dfrac{U}{I}=\\dfrac{12}{0{,}5}=24$.<br><strong>Svar:</strong> $R=24$",
        "<strong>e)</strong> $\\dfrac{1}{f}=\\dfrac{v+u}{uv}$, $f=\\dfrac{uv}{u+v}$.<br><strong>Svar:</strong> $f=\\dfrac{uv}{u+v}$",
      ],
    ),
    o(
      "3.43",
      "Temperatur: $C=\\dfrac{5}{9}(F-32)$.<br><br><strong>a)</strong> Isoler $F$.<br><br><strong>b)</strong> Finn $F$ når $C=20$.<br><br><strong>c)</strong> Finn $C$ når $F=32$.<br><br><strong>d)</strong> Ved hvilken temperatur er $C=F$? Sett opp likningen og løs.<br><br><strong>e)</strong> En værstasjon viser $77^\\circ$F. Hvor mange grader Celsius er det?",
      "Gang med $9/5$ og pluss $32$. I d) sett $C=F$ i formelen.",
      [
        "<strong>a)</strong> $\\dfrac{9}{5}C=F-32$, $F=\\dfrac{9}{5}C+32$.<br><strong>Svar:</strong> $F=\\dfrac{9}{5}C+32$",
        "<strong>b)</strong> $\\dfrac{9}{5}\\cdot 20+32=36+32=68$.<br><strong>Svar:</strong> $68^\\circ$F",
        "<strong>c)</strong> $C=0$. <strong>Svar:</strong> $0^\\circ$C",
        "<strong>d)</strong> $C=\\dfrac{5}{9}(C-32)$, $9C=5C-160$, $4C=-160$, $C=-40$.<br><strong>Svar:</strong> $-40$",
        "<strong>e)</strong> $C=\\dfrac{5}{9}(77-32)=\\dfrac{5}{9}\\cdot 45=25$.<br><strong>Svar:</strong> $25^\\circ$C",
      ],
    ),
  ],
  "3C": [
    o(
      "3.44",
      "Løs. Bruk produktregelen eller ta kvadratrot (husk $\\pm$).<br><br><strong>a)</strong> $x^2=49$<br><br><strong>b)</strong> $(x+2)(x-7)=0$<br><br><strong>c)</strong> $x^2+5x=0$<br><br><strong>d)</strong> $x^2-8x+16=0$<br><br><strong>e)</strong> $2x^2-18=0$",
      "Ta ut $x$ når det mangler konstantledd. Fullstendig kvadrat gir én (dobbel) rot.",
      [
        "<strong>a)</strong> $x=\\pm 7$. <strong>Svar:</strong> $x=-7$ eller $x=7$",
        "<strong>b)</strong> $x=-2$ eller $x=7$. <strong>Svar:</strong> $x=-2$ eller $x=7$",
        "<strong>c)</strong> $x(x+5)=0$. <strong>Svar:</strong> $x=0$ eller $x=-5$",
        "<strong>d)</strong> $(x-4)^2=0$, $x=4$. <strong>Svar:</strong> $x=4$",
        "<strong>e)</strong> $x^2=9$, $x=\\pm 3$. <strong>Svar:</strong> $x=-3$ eller $x=3$",
      ],
    ),
    o(
      "3.45",
      "Løs ved å faktorisere. Flytt alle ledd til venstre først.<br><br><strong>a)</strong> $x^2=5x+6$<br><br><strong>b)</strong> $x^2+4=5x$<br><br><strong>c)</strong> $2x^2+x=3$<br><br><strong>d)</strong> $(x-3)^2=16$<br><br><strong>e)</strong> $x(x+2)=15$",
      "I d) ta kvadratrot på begge sider: $x-3=\\pm 4$.",
      [
        "<strong>a)</strong> $x^2-5x-6=0$, $(x-6)(x+1)=0$.<br><strong>Svar:</strong> $x=6$ eller $x=-1$",
        "<strong>b)</strong> $x^2-5x+4=0$, $(x-1)(x-4)=0$.<br><strong>Svar:</strong> $x=1$ eller $x=4$",
        "<strong>c)</strong> $2x^2+x-3=0$, $(2x+3)(x-1)=0$.<br><strong>Svar:</strong> $x=-\\dfrac{3}{2}$ eller $x=1$",
        "<strong>d)</strong> $x-3=4$ eller $x-3=-4$, $x=7$ eller $x=-1$.<br><strong>Svar:</strong> $x=7$ eller $x=-1$",
        "<strong>e)</strong> $x^2+2x-15=0$, $(x+5)(x-3)=0$.<br><strong>Svar:</strong> $x=-5$ eller $x=3$",
      ],
    ),
    o(
      "3.46",
      "Tekstoppgaver som gir andregrad.<br><br><strong>a)</strong> Produktet av to påfølgende heltall er $72$. Finn tallene.<br><br><strong>b)</strong> Et kvadrat har $4$ mer side enn et annet. Differansen mellom arealene er $72$. Finn sidene.<br><br><strong>c)</strong> En rettvinklet trekant har kateter $x$ og $x+7$ og hypotenus $13$. Finn $x$ (Pythagoras).<br><br><strong>d)</strong> Hvorfor forkaster vi negative sider i a)–c)?<br><br><strong>e)</strong> Sett prøve på c).",
      "Påfølgende heltall: $n$ og $n+1$. Pythagoras: $x^2+(x+7)^2=13^2$.",
      [
        "<strong>a)</strong> $n(n+1)=72$, $n^2+n-72=0$, $(n+9)(n-8)=0$. $n=8$ (eller $-9$ og $-8$).<br><strong>Svar:</strong> $8$ og $9$ (eller $-9$ og $-8$)",
        "<strong>b)</strong> $(s+4)^2-s^2=72$, $8s+16=72$, $s=7$. Sider $7$ og $11$.<br><strong>Svar:</strong> $7$ og $11$",
        "<strong>c)</strong> $x^2+(x+7)^2=169$, $2x^2+14x+49=169$, $x^2+7x-60=0$, $(x+12)(x-5)=0$, $x=5$.<br><strong>Svar:</strong> $x=5$",
        "<strong>d)</strong> Lengde kan ikke være negativ.<br><strong>Svar:</strong> lengde $>0$",
        "<strong>e)</strong> $5^2+12^2=25+144=169=13^2$.<br><strong>Svar:</strong> stemmer",
      ],
    ),
  ],
  "3D": [
    o(
      "3.47",
      "Løs med abc-formelen. Oppgi eksakt svar og forenkle rota.<br><br><strong>a)</strong> $x^2-2x-4=0$<br><br><strong>b)</strong> $x^2+6x+1=0$<br><br><strong>c)</strong> $3x^2-5x-2=0$<br><br><strong>d)</strong> $2x^2-4x+1=0$<br><br><strong>e)</strong> $x^2+4x+8=0$ (hva skjer?)",
      "$D=b^2-4ac$. Er $D<0$, ingen reelle røtter. Forenkle $\\sqrt{4\\cdot k}=2\\sqrt{k}$.",
      [
        "<strong>a)</strong> $D=4+16=20$. $x=\\dfrac{2\\pm 2\\sqrt{5}}{2}=1\\pm\\sqrt{5}$.<br><strong>Svar:</strong> $x=1\\pm\\sqrt{5}$",
        "<strong>b)</strong> $D=36-4=32=16\\cdot 2$. $x=\\dfrac{-6\\pm 4\\sqrt{2}}{2}=-3\\pm 2\\sqrt{2}$.<br><strong>Svar:</strong> $x=-3\\pm 2\\sqrt{2}$",
        "<strong>c)</strong> $D=25+24=49$. $x=\\dfrac{5\\pm 7}{6}$. $x=2$ eller $x=-\\dfrac13$.<br><strong>Svar:</strong> $x=2$ eller $x=-\\dfrac{1}{3}$",
        "<strong>d)</strong> $D=16-8=8$. $x=\\dfrac{4\\pm 2\\sqrt{2}}{4}=\\dfrac{2\\pm\\sqrt{2}}{2}$.<br><strong>Svar:</strong> $x=\\dfrac{2\\pm\\sqrt{2}}{2}$",
        "<strong>e)</strong> $D=16-32=-16<0$. Ingen reelle løsninger.<br><strong>Svar:</strong> $L=\\emptyset$",
      ],
    ),
    o(
      "3.48",
      "Diskriminanten avgjør antall løsninger. $x^2-8x+k=0$.<br><br><strong>a)</strong> Finn $D$ uttrykt ved $k$.<br><br><strong>b)</strong> For hvilke $k$ er det to ulike reelle løsninger?<br><br><strong>c)</strong> For hvilken $k$ er det nøyaktig én løsning? Finn den.<br><br><strong>d)</strong> For hvilke $k$ er det ingen reelle løsninger?<br><br><strong>e)</strong> Løs likningen når $k=7$.",
      "$D>0$ to løsninger, $D=0$ én, $D<0$ ingen. Her $D=64-4k$.",
      [
        "<strong>a)</strong> $D=64-4k$. <strong>Svar:</strong> $64-4k$",
        "<strong>b)</strong> $64-4k>0$, $k<16$. <strong>Svar:</strong> $k<16$",
        "<strong>c)</strong> $k=16$, $x=4$. <strong>Svar:</strong> $k=16$, $x=4$",
        "<strong>d)</strong> $k>16$. <strong>Svar:</strong> $k>16$",
        "<strong>e)</strong> $D=64-28=36$, $x=\\dfrac{8\\pm 6}{2}$. $x=7$ eller $x=1$.<br><strong>Svar:</strong> $x=7$ eller $x=1$",
      ],
    ),
    o(
      "3.49",
      "Velg metode: faktorisering når det går, ellers abc.<br><br><strong>a)</strong> $x^2-9x+14=0$<br><br><strong>b)</strong> $x^2-5x-3=0$<br><br><strong>c)</strong> $4x^2-12x+9=0$<br><br><strong>d)</strong> $x^2=2x+1$<br><br><strong>e)</strong> En ball kastes og høyden er $h(t)=-5t^2+20t$. Når er $h=15$? (Tid i sekunder.)",
      "I e) $-5t^2+20t-15=0$, del på $-5$.",
      [
        "<strong>a)</strong> $(x-2)(x-7)=0$. <strong>Svar:</strong> $x=2$ eller $x=7$",
        "<strong>b)</strong> $D=25+12=37$, $x=\\dfrac{5\\pm\\sqrt{37}}{2}$.<br><strong>Svar:</strong> $x=\\dfrac{5\\pm\\sqrt{37}}{2}$",
        "<strong>c)</strong> $(2x-3)^2=0$, $x=\\dfrac{3}{2}$. <strong>Svar:</strong> $x=\\dfrac{3}{2}$",
        "<strong>d)</strong> $x^2-2x-1=0$, $x=1\\pm\\sqrt{2}$. <strong>Svar:</strong> $x=1\\pm\\sqrt{2}$",
        "<strong>e)</strong> $t^2-4t+3=0$, $(t-1)(t-3)=0$. $t=1$ eller $t=3$.<br><strong>Svar:</strong> etter $1$ s og $3$ s",
      ],
    ),
  ],
  "3E": [
    o(
      "3.50",
      "Løs. Sjekk at svaret ikke gjør en nevner lik $0$.<br><br><strong>a)</strong> $\\dfrac{5}{x}=\\dfrac{2}{x-3}$<br><br><strong>b)</strong> $\\dfrac{x}{x+2}=3$<br><br><strong>c)</strong> $\\dfrac{4}{x+1}+\\dfrac{2}{x+1}=3$<br><br><strong>d)</strong> $\\dfrac{x-1}{x}=\\dfrac{2}{3}$<br><br><strong>e)</strong> $\\dfrac{6}{x}=x$",
      "Gang med fellesnevner. I e) $x^2=6$, men $x\\neq 0$ er allerede oppfylt.",
      [
        "<strong>a)</strong> $5(x-3)=2x$, $5x-15=2x$, $x=5$. OK.<br><strong>Svar:</strong> $x=5$",
        "<strong>b)</strong> $x=3x+6$, $-2x=6$, $x=-3$. $x+2\\neq 0$. OK.<br><strong>Svar:</strong> $x=-3$",
        "<strong>c)</strong> $\\dfrac{6}{x+1}=3$, $6=3x+3$, $x=1$. OK.<br><strong>Svar:</strong> $x=1$",
        "<strong>d)</strong> $3(x-1)=2x$, $3x-3=2x$, $x=3$. OK.<br><strong>Svar:</strong> $x=3$",
        "<strong>e)</strong> $x^2=6$, $x=\\pm\\sqrt{6}$. <strong>Svar:</strong> $x=\\sqrt{6}$ eller $x=-\\sqrt{6}$",
      ],
    ),
    o(
      "3.51",
      "Falske løsninger. I hver oppgave: løs, og kryss av om løsningen er tillatt.<br><br><strong>a)</strong> $\\dfrac{x^2-1}{x-1}=4$<br><br><strong>b)</strong> $\\dfrac{2}{x-2}=\\dfrac{x}{x-2}$<br><br><strong>c)</strong> $\\dfrac{x}{x+3}-\\dfrac{1}{x}=1$<br><br><strong>d)</strong> Hvorfor er $x=1$ forbudt i a) selv om telleren også blir $0$?<br><br><strong>e)</strong> $\\dfrac{x+2}{x^2-4}=\\dfrac{1}{x-2}$",
      "Etter å ha ganget med nevneren kan du ha fått ekstra røtter. Sett inn i originalen.",
      [
        "<strong>a)</strong> For $x\\neq 1$: $x+1=4$, $x=3$. Tillatt.<br><strong>Svar:</strong> $x=3$",
        "<strong>b)</strong> $2=x$ men $x\\neq 2$. $x=2$ er forbudt, så ingen løsning.<br><strong>Svar:</strong> $L=\\emptyset$",
        "<strong>c)</strong> Fellesnevner $x(x+3)$: $x^2-(x+3)=x(x+3)$, $x^2-x-3=x^2+3x$, $-4x=3$, $x=-\\dfrac{3}{4}$. OK.<br><strong>Svar:</strong> $x=-\\dfrac{3}{4}$",
        "<strong>d)</strong> Originalen har $x-1$ i nevner. $\\tfrac{0}{0}$ er udefinert, ikke $4$.<br><strong>Svar:</strong> nevneren er $0$",
        "<strong>e)</strong> $x+2=(x+2)(x-2)\\cdot\\dfrac{1}{x-2}=x+2$ for $x\\neq\\pm 2$. Identitet, men $x\\neq\\pm 2$. Alle andre $x$.<br><strong>Svar:</strong> alle $x$ unntatt $\\pm 2$",
      ],
    ),
    o(
      "3.52",
      "Fellesnevner $(x-2)(x+2)$ eller tilsvarende.<br><br><strong>a)</strong> $\\dfrac{3}{x-1}-\\dfrac{2}{x}=1$<br><br><strong>b)</strong> $\\dfrac{x}{x-4}+\\dfrac{2}{x+4}=1$<br><br><strong>c)</strong> $\\dfrac{5}{x^2-1}=\\dfrac{1}{x-1}$<br><br><strong>d)</strong> Sett prøve på a).<br><br><strong>e)</strong> Hvilke $x$ er forbudt i b)?",
      "Skriv $x^2-1=(x-1)(x+1)$. Gang gjennom og samle $x$-ledd.",
      [
        "<strong>a)</strong> $3x-2(x-1)=x(x-1)$, $3x-2x+2=x^2-x$, $0=x^2-2x-2$, $x=1\\pm\\sqrt{3}$. Begge tillatt ($\\neq 0,1$).<br><strong>Svar:</strong> $x=1\\pm\\sqrt{3}$",
        "<strong>b)</strong> $x(x+4)+2(x-4)=(x-4)(x+4)$, $x^2+4x+2x-8=x^2-16$, $6x=-8$, $x=-\\dfrac{4}{3}$. OK.<br><strong>Svar:</strong> $x=-\\dfrac{4}{3}$",
        "<strong>c)</strong> $5=(x+1)$ for $x\\neq\\pm 1$, $x=4$. OK.<br><strong>Svar:</strong> $x=4$",
        "<strong>d)</strong> Sett inn $1+\\sqrt{3}$ og $1-\\sqrt{3}$ i originalen — begge passer (mellomregning på kladdeark).<br><strong>Svar:</strong> begge røttene stemmer",
        "<strong>e)</strong> $x\\neq 4$ og $x\\neq -4$. <strong>Svar:</strong> $x\\neq\\pm 4$",
      ],
    ),
  ],
  "3F": [
    o(
      "3.53",
      "Rett og omvendt proporsjonalitet.<br><br><strong>a)</strong> $y$ er proporsjonal med $x$, og $y=12$ når $x=4$. Finn $y$ når $x=10$.<br><br><strong>b)</strong> $y$ er omvendt proporsjonal med $x$, og $y=6$ når $x=2$. Finn $y$ når $x=8$.<br><br><strong>c)</strong> Et kart har målestokk $1:50000$. Hvor lang er en vei som er $4$ cm på kartet (i km)?<br><br><strong>d)</strong> $8$ malere bruker $6$ dager. Hvor mange dager trenger $12$ malere (samme tempo, omvendt proporsjonalt)?<br><br><strong>e)</strong> Sett opp proporsjonen i d) og løs.",
      "Rett: $\\dfrac{y}{x}=$ konstant. Omvendt: $xy=$ konstant. Flere folk $\\Rightarrow$ færre dager.",
      [
        "<strong>a)</strong> $\\dfrac{12}{4}=\\dfrac{y}{10}$, $y=30$. <strong>Svar:</strong> $30$",
        "<strong>b)</strong> $6\\cdot 2=y\\cdot 8$, $y=1{,}5$. <strong>Svar:</strong> $1{,}5$",
        "<strong>c)</strong> $4\\cdot 50000=200000$ cm $=2$ km. <strong>Svar:</strong> $2$ km",
        "<strong>d)</strong> $8\\cdot 6=12\\cdot t$, $t=4$. <strong>Svar:</strong> $4$ dager",
        "<strong>e)</strong> $\\dfrac{8}{12}=\\dfrac{t}{6}$ ville vært rett proporsjonal og feil. Riktig er $8\\cdot 6=12t$.<br><strong>Svar:</strong> $t=4$",
      ],
    ),
    o(
      "3.54",
      "Liknende figurer og proporsjoner.<br><br><strong>a)</strong> To like trekanter har sider $3$, $4$, $5$ og $6$, $x$, $10$. Finn $x$.<br><br><strong>b)</strong> En skygge av en $6$ m stang er $4$ m. Et tre kaster $10$ m skygge samtidig. Hvor høyt er treet?<br><br><strong>c)</strong> En oppskrift til $3$ dl saus bruker $2$ egg. Hvor mange egg til $7{,}5$ dl? (Du kan bruke halve egg i regningen.)<br><br><strong>d)</strong> Farten er konstant $90$ km/h. Hvor lang tid på $135$ km?<br><br><strong>e)</strong> $p$ er proporsjonal med $q^2$, og $p=12$ når $q=2$. Finn $p$ når $q=6$.",
      "Like trekanter: sidene i samme forhold. $p=k q^2$, finn $k$ først.",
      [
        "<strong>a)</strong> $\\dfrac{x}{4}=\\dfrac{6}{3}=2$, $x=8$. (Eller $5\\mapsto 10$ bekrefter faktor $2$.)<br><strong>Svar:</strong> $x=8$",
        "<strong>b)</strong> $\\dfrac{h}{6}=\\dfrac{10}{4}$, $h=15$. <strong>Svar:</strong> $15$ m",
        "<strong>c)</strong> $\\dfrac{2}{3}=\\dfrac{e}{7{,}5}$, $e=5$. <strong>Svar:</strong> $5$ egg",
        "<strong>d)</strong> $t=\\dfrac{135}{90}=1{,}5$ h. <strong>Svar:</strong> $1{,}5$ timer",
        "<strong>e)</strong> $12=k\\cdot 4$, $k=3$. $p=3\\cdot 36=108$. <strong>Svar:</strong> $108$",
      ],
    ),
  ],
  "3G": [
    o(
      "3.55",
      "Polynomdivisjon. Skriv svaret som polynom, og sett prøve ved å gange tilbake.<br><br><strong>a)</strong> $(x^2-5x+6):(x-2)$<br><br><strong>b)</strong> $(x^2+x-12):(x+4)$<br><br><strong>c)</strong> $(x^3-1):(x-1)$<br><br><strong>d)</strong> $(2x^2+3x-2):(x+2)$<br><br><strong>e)</strong> $(x^3-3x^2-4x+12):(x-3)$",
      "Hvor mange ganger går $x$ i høyeste ledd? Rest $0$ betyr at divisoren er en faktor.",
      [
        "<strong>a)</strong> $x-3$, fordi $(x-2)(x-3)=x^2-5x+6$.<br><strong>Svar:</strong> $x-3$",
        "<strong>b)</strong> $x-3$. <strong>Svar:</strong> $x-3$",
        "<strong>c)</strong> $x^2+x+1$. <strong>Svar:</strong> $x^2+x+1$",
        "<strong>d)</strong> $2x-1$. <strong>Svar:</strong> $2x-1$",
        "<strong>e)</strong> $x^2-4=(x-2)(x+2)$. <strong>Svar:</strong> $x^2-4$",
      ],
    ),
    o(
      "3.56",
      "Restteoremet: $P(a)=0$ $\\Leftrightarrow$ $(x-a)$ er en faktor.<br><br><strong>a)</strong> $P(x)=x^3-4x^2+x+6$. Regn ut $P(2)$ og $P(-1)$.<br><br><strong>b)</strong> Hvilken av $(x-2)$ og $(x+1)$ er faktor i $P$?<br><br><strong>c)</strong> Del $P$ på den faktoren du fant, og faktoriser fullstendig.<br><br><strong>d)</strong> $Q(x)=x^3+x^2-4x-4$. Vis at $x=-1$ er rot, og faktoriser $Q$.<br><br><strong>e)</strong> Et tredjegradspolynom har røttene $-2$, $1$ og $3$, og $P(0)=-6$. Finn $P(x)$.",
      "I e) $P(x)=ax(x+2)(x-1)(x-3)$ — nei, tre røtter: $P(x)=a(x+2)(x-1)(x-3)$. Bruk $P(0)=-6$.",
      [
        "<strong>a)</strong> $P(2)=8-16+2+6=0$. $P(-1)=-1-4-1+6=0$. Begge $0$.<br><strong>Svar:</strong> $P(2)=P(-1)=0$",
        "<strong>b)</strong> Begge, siden begge gir rest $0$. <strong>Svar:</strong> begge",
        "<strong>c)</strong> $P(x)=(x-2)(x+1)(x-3)$ (siste rot fra andregraden $x^2-3x-3$ vent — $P(x)=(x-2)(x^2-2x-3)=(x-2)(x-3)(x+1)$).<br><strong>Svar:</strong> $(x-2)(x-3)(x+1)$",
        "<strong>d)</strong> $Q(-1)=-1+1+4-4=0$. $Q(x)=(x+1)(x^2-4)=(x+1)(x-2)(x+2)$.<br><strong>Svar:</strong> $(x+1)(x-2)(x+2)$",
        "<strong>e)</strong> $P(0)=a(2)(-1)(-3)=6a=-6$, $a=-1$. $P(x)=-(x+2)(x-1)(x-3)$.<br><strong>Svar:</strong> $P(x)=-(x+2)(x-1)(x-3)$",
      ],
    ),
  ],
};
