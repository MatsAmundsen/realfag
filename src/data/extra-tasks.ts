import type { Oppgave } from "./types";

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

/** Extra 1T-oppgaver som manglet i 1C (brøk) og i kapittel 2–3. */
export const EXTRA: Record<string, Oppgave[]> = {
  "1C": [
    o(
      "1.46",
      "Start med det grunnleggende.<br><br><strong>a)</strong> Skriv som brøk: tre av åtte kakestykker.<br><br><strong>b)</strong> I brøken $\\dfrac{5}{6}$ — hva er telleren, og hva er nevneren?<br><br><strong>c)</strong> Er $\\dfrac{3}{7}$ en ekte eller uekte brøk? Begrunn med én setning.",
      "Telleren står oppe, nevneren nede. Ekte brøk: teller mindre enn nevner.",
      [
        "<strong>a)</strong> Tre av åtte skrives $\\dfrac{3}{8}$.<br><strong>Svar:</strong> $\\dfrac{3}{8}$",
        "<strong>b)</strong> Telleren er $5$, nevneren er $6$.<br><strong>Svar:</strong> teller $5$, nevner $6$",
        "<strong>c)</strong> $3<7$, så brøken er ekte.<br><strong>Svar:</strong> ekte brøk",
      ],
    ),
    o(
      "1.47",
      "Utvid og se at verdien er den samme.<br><br><strong>a)</strong> Utvid $\\dfrac{1}{2}$ slik at nevneren blir $8$.<br><br><strong>b)</strong> Utvid $\\dfrac{2}{3}$ slik at nevneren blir $12$.<br><br><strong>c)</strong> Er $\\dfrac{2}{4}$ og $\\dfrac{1}{2}$ like store? Vis ved å utvide eller forkorte.",
      "Gang teller og nevner med samme tall. Verdien endres ikke.",
      [
        "<strong>a)</strong> Gang med $4$: $\\dfrac{1\\cdot 4}{2\\cdot 4}=\\dfrac{4}{8}$.<br><strong>Svar:</strong> $\\dfrac{4}{8}$",
        "<strong>b)</strong> Gang med $4$: $\\dfrac{2\\cdot 4}{3\\cdot 4}=\\dfrac{8}{12}$.<br><strong>Svar:</strong> $\\dfrac{8}{12}$",
        "<strong>c)</strong> $\\dfrac{2}{4}=\\dfrac{2\\div 2}{4\\div 2}=\\dfrac{1}{2}$. Ja, de er like.<br><strong>Svar:</strong> ja, begge er $\\dfrac{1}{2}$",
      ],
    ),
    o(
      "1.48",
      "Forkort så langt det går.<br><br><strong>a)</strong> $\\dfrac{4}{8}$<br><br><strong>b)</strong> $\\dfrac{9}{12}$<br><br><strong>c)</strong> $\\dfrac{15}{25}$",
      "Del teller og nevner med største felles faktor (SFF).",
      [
        "<strong>a)</strong> SFF$(4,8)=4$, så $\\dfrac{4}{8}=\\dfrac{1}{2}$.<br><strong>Svar:</strong> $\\dfrac{1}{2}$",
        "<strong>b)</strong> SFF$(9,12)=3$, så $\\dfrac{9}{12}=\\dfrac{3}{4}$.<br><strong>Svar:</strong> $\\dfrac{3}{4}$",
        "<strong>c)</strong> SFF$(15,25)=5$, så $\\dfrac{15}{25}=\\dfrac{3}{5}$.<br><strong>Svar:</strong> $\\dfrac{3}{5}$",
      ],
    ),
    o(
      "1.49",
      "Samme nevner — da er det bare å plusse eller trekke tellerne.<br><br><strong>a)</strong> $\\dfrac{2}{7}+\\dfrac{3}{7}$<br><br><strong>b)</strong> $\\dfrac{5}{6}-\\dfrac{1}{6}$<br><br><strong>c)</strong> $\\dfrac{3}{10}+\\dfrac{4}{10}+\\dfrac{1}{10}$",
      "Behold nevneren. Forkort svaret hvis du kan.",
      [
        "<strong>a)</strong> $\\dfrac{2+3}{7}=\\dfrac{5}{7}$.<br><strong>Svar:</strong> $\\dfrac{5}{7}$",
        "<strong>b)</strong> $\\dfrac{5-1}{6}=\\dfrac{4}{6}=\\dfrac{2}{3}$.<br><strong>Svar:</strong> $\\dfrac{2}{3}$",
        "<strong>c)</strong> $\\dfrac{3+4+1}{10}=\\dfrac{8}{10}=\\dfrac{4}{5}$.<br><strong>Svar:</strong> $\\dfrac{4}{5}$",
      ],
    ),
    o(
      "1.50",
      "Ulik nevner. Finn fellesnevner først.<br><br><strong>a)</strong> $\\dfrac{1}{2}+\\dfrac{1}{4}$<br><br><strong>b)</strong> $\\dfrac{1}{3}+\\dfrac{1}{6}$<br><br><strong>c)</strong> $\\dfrac{3}{4}-\\dfrac{1}{2}$",
      "Den minste fellesnevneren er ofte det største av de to nevnerne når den ene går opp i den andre.",
      [
        "<strong>a)</strong> Fellesnevner $4$: $\\dfrac{2}{4}+\\dfrac{1}{4}=\\dfrac{3}{4}$.<br><strong>Svar:</strong> $\\dfrac{3}{4}$",
        "<strong>b)</strong> Fellesnevner $6$: $\\dfrac{2}{6}+\\dfrac{1}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}$.<br><strong>Svar:</strong> $\\dfrac{1}{2}$",
        "<strong>c)</strong> Fellesnevner $4$: $\\dfrac{3}{4}-\\dfrac{2}{4}=\\dfrac{1}{4}$.<br><strong>Svar:</strong> $\\dfrac{1}{4}$",
      ],
    ),
    o(
      "1.51",
      "Ganging av brøker: teller med teller, nevner med nevner.<br><br><strong>a)</strong> $\\dfrac{2}{3}\\cdot\\dfrac{3}{4}$<br><br><strong>b)</strong> $5\\cdot\\dfrac{2}{5}$<br><br><strong>c)</strong> $\\dfrac{1}{2}\\cdot\\dfrac{1}{3}$",
      "Du kan forkorte på kryss før du ganger, hvis du vil.",
      [
        "<strong>a)</strong> $\\dfrac{2\\cdot 3}{3\\cdot 4}=\\dfrac{6}{12}=\\dfrac{1}{2}$. (Eller stryk $3$: $\\dfrac{2}{4}=\\dfrac{1}{2}$.)<br><strong>Svar:</strong> $\\dfrac{1}{2}$",
        "<strong>b)</strong> $5=\\dfrac{5}{1}$, så $\\dfrac{5\\cdot 2}{1\\cdot 5}=\\dfrac{10}{5}=2$.<br><strong>Svar:</strong> $2$",
        "<strong>c)</strong> $\\dfrac{1\\cdot 1}{2\\cdot 3}=\\dfrac{1}{6}$.<br><strong>Svar:</strong> $\\dfrac{1}{6}$",
      ],
    ),
    o(
      "1.52",
      "Å dele på en brøk er det samme som å gange med den omvendte.<br><br><strong>a)</strong> $\\dfrac{3}{4}:\\dfrac{1}{2}$<br><br><strong>b)</strong> $\\dfrac{2}{5}:\\dfrac{4}{15}$<br><br><strong>c)</strong> $6:\\dfrac{2}{3}$",
      "Snu den bakerste brøken og gang. $6=\\dfrac{6}{1}$.",
      [
        "<strong>a)</strong> $\\dfrac{3}{4}\\cdot\\dfrac{2}{1}=\\dfrac{6}{4}=\\dfrac{3}{2}$.<br><strong>Svar:</strong> $\\dfrac{3}{2}$",
        "<strong>b)</strong> $\\dfrac{2}{5}\\cdot\\dfrac{15}{4}=\\dfrac{2\\cdot 15}{5\\cdot 4}=\\dfrac{30}{20}=\\dfrac{3}{2}$.<br><strong>Svar:</strong> $\\dfrac{3}{2}$",
        "<strong>c)</strong> $\\dfrac{6}{1}\\cdot\\dfrac{3}{2}=\\dfrac{18}{2}=9$.<br><strong>Svar:</strong> $9$",
      ],
    ),
    o(
      "1.53",
      "Blandede tall. Skriv om til uekte brøk først.<br><br><strong>a)</strong> Skriv $1\\dfrac{1}{2}$ som uekte brøk.<br><br><strong>b)</strong> $1\\dfrac{1}{2}+2\\dfrac{1}{4}$<br><br><strong>c)</strong> $2\\dfrac{1}{3}-\\dfrac{5}{6}$",
      "$1\\dfrac{1}{2}=\\dfrac{3}{2}$. Finn fellesnevner etterpå.",
      [
        "<strong>a)</strong> $1\\dfrac{1}{2}=\\dfrac{2}{2}+\\dfrac{1}{2}=\\dfrac{3}{2}$.<br><strong>Svar:</strong> $\\dfrac{3}{2}$",
        "<strong>b)</strong> $\\dfrac{3}{2}+\\dfrac{9}{4}$. Fellesnevner $4$: $\\dfrac{6}{4}+\\dfrac{9}{4}=\\dfrac{15}{4}=3\\dfrac{3}{4}$.<br><strong>Svar:</strong> $\\dfrac{15}{4}$",
        "<strong>c)</strong> $2\\dfrac{1}{3}=\\dfrac{7}{3}$. Fellesnevner $6$: $\\dfrac{14}{6}-\\dfrac{5}{6}=\\dfrac{9}{6}=\\dfrac{3}{2}$.<br><strong>Svar:</strong> $\\dfrac{3}{2}$",
      ],
    ),
    o(
      "1C-E1",
      "Hvilken brøk er størst? Utvide til fellesnevner og sammenlign tellerne.<br><br><strong>a)</strong> $\\dfrac{2}{3}$ eller $\\dfrac{3}{5}$<br><br><strong>b)</strong> $\\dfrac{5}{8}$ eller $\\dfrac{7}{12}$<br><br><strong>c)</strong> Sett i stigende rekkefølge: $\\dfrac{1}{2}$, $\\dfrac{2}{5}$, $\\dfrac{3}{4}$",
      "Fellesnevner. Størst teller vinner når nevneren er lik.",
      [
        "<strong>a)</strong> Fellesnevner $15$: $\\dfrac{10}{15}$ mot $\\dfrac{9}{15}$.<br><strong>Svar:</strong> $\\dfrac{2}{3}$ er størst",
        "<strong>b)</strong> Fellesnevner $24$: $\\dfrac{15}{24}$ mot $\\dfrac{14}{24}$.<br><strong>Svar:</strong> $\\dfrac{5}{8}$ er størst",
        "<strong>c)</strong> Fellesnevner $20$: $\\dfrac{10}{20}$, $\\dfrac{8}{20}$, $\\dfrac{15}{20}$.<br><strong>Svar:</strong> $\\dfrac{2}{5}<\\dfrac{1}{2}<\\dfrac{3}{4}$",
      ],
    ),
    o(
      "1C-E2",
      "Regnerekkefølge: ganging før pluss, med mindre parentes sier noe annet.<br><br><strong>a)</strong> $\\dfrac{1}{2}+\\dfrac{1}{3}\\cdot\\dfrac{3}{4}$<br><br><strong>b)</strong> $\\left(\\dfrac{1}{2}+\\dfrac{1}{3}\\right)\\cdot\\dfrac{3}{4}$<br><br><strong>c)</strong> $1-\\dfrac{1}{2}\\cdot\\dfrac{2}{5}$",
      "I a) ganger du først. I b) parentes først.",
      [
        "<strong>a)</strong> $\\dfrac{1}{3}\\cdot\\dfrac{3}{4}=\\dfrac{1}{4}$. Så $\\dfrac{1}{2}+\\dfrac{1}{4}=\\dfrac{3}{4}$.<br><strong>Svar:</strong> $\\dfrac{3}{4}$",
        "<strong>b)</strong> $\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{5}{6}$. Så $\\dfrac{5}{6}\\cdot\\dfrac{3}{4}=\\dfrac{15}{24}=\\dfrac{5}{8}$.<br><strong>Svar:</strong> $\\dfrac{5}{8}$",
        "<strong>c)</strong> $\\dfrac{1}{2}\\cdot\\dfrac{2}{5}=\\dfrac{1}{5}$. Så $1-\\dfrac{1}{5}=\\dfrac{4}{5}$.<br><strong>Svar:</strong> $\\dfrac{4}{5}$",
      ],
    ),
    o(
      "1C-E3",
      "En pizza er delt i $8$ like store stykker. Kari spiser $3$ stykker, og Ola spiser $2$.<br><br><strong>a)</strong> Hvilken brøkdel av pizzaen er spist?<br><br><strong>b)</strong> Hvilken brøkdel er igjen?<br><br><strong>c)</strong> Hvis pizzaen veier $640$ g, hvor mange gram er igjen?",
      "Spist = summen av stykkene. Igjen = $1$ minus spist.",
      [
        "<strong>a)</strong> $\\dfrac{3}{8}+\\dfrac{2}{8}=\\dfrac{5}{8}$.<br><strong>Svar:</strong> $\\dfrac{5}{8}$",
        "<strong>b)</strong> $1-\\dfrac{5}{8}=\\dfrac{3}{8}$.<br><strong>Svar:</strong> $\\dfrac{3}{8}$",
        "<strong>c)</strong> $\\dfrac{3}{8}\\cdot 640=3\\cdot 80=240$.<br><strong>Svar:</strong> $240$ g",
      ],
    ),
    o(
      "1C-E4",
      "Fellesnevner som ikke er en av nevnerne selv.<br><br><strong>a)</strong> $\\dfrac{5}{12}+\\dfrac{1}{18}$<br><br><strong>b)</strong> $\\dfrac{5}{8}-\\dfrac{1}{12}$<br><br><strong>c)</strong> $\\dfrac{2}{9}+\\dfrac{1}{6}$",
      "Finn MFM. For $12$ og $18$ er MFM $36$.",
      [
        "<strong>a)</strong> MFM$(12,18)=36$. $\\dfrac{15}{36}+\\dfrac{2}{36}=\\dfrac{17}{36}$.<br><strong>Svar:</strong> $\\dfrac{17}{36}$",
        "<strong>b)</strong> MFM$(8,12)=24$. $\\dfrac{15}{24}-\\dfrac{2}{24}=\\dfrac{13}{24}$.<br><strong>Svar:</strong> $\\dfrac{13}{24}$",
        "<strong>c)</strong> MFM$(9,6)=18$. $\\dfrac{4}{18}+\\dfrac{3}{18}=\\dfrac{7}{18}$.<br><strong>Svar:</strong> $\\dfrac{7}{18}$",
      ],
    ),
    o(
      "1C-E5",
      "Algebraiske brøker. Forkort så langt det går. Husk restriksjoner.<br><br><strong>a)</strong> $\\dfrac{12a}{18a}$ når $a\\neq 0$<br><br><strong>b)</strong> $\\dfrac{6x-9}{3}$<br><br><strong>c)</strong> $\\dfrac{x}{4}+\\dfrac{x}{6}$",
      "Ta ut felles faktor i teller og nevner. I c) er $x$ felles i telleren etter sammenlegging.",
      [
        "<strong>a)</strong> $\\dfrac{12a}{18a}=\\dfrac{12}{18}=\\dfrac{2}{3}$.<br><strong>Svar:</strong> $\\dfrac{2}{3}$",
        "<strong>b)</strong> $\\dfrac{3(2x-3)}{3}=2x-3$.<br><strong>Svar:</strong> $2x-3$",
        "<strong>c)</strong> Fellesnevner $12$: $\\dfrac{3x}{12}+\\dfrac{2x}{12}=\\dfrac{5x}{12}$.<br><strong>Svar:</strong> $\\dfrac{5x}{12}$",
      ],
    ),
  ],

  "2A": [
    o(
      "2.17",
      "Forenkle.<br><br><strong>a)</strong> $7x-3-2x+8$<br><br><strong>b)</strong> $3(2x-1)-4(x+5)$<br><br><strong>c)</strong> $x(x+2)-x^2+6$",
      "Samle like ledd. Husk å gange inn i parentesen, også med minus foran.",
      [
        "<strong>a)</strong> $(7x-2x)+(-3+8)=5x+5$.<br><strong>Svar:</strong> $5x+5$",
        "<strong>b)</strong> $6x-3-4x-20=2x-23$.<br><strong>Svar:</strong> $2x-23$",
        "<strong>c)</strong> $x^2+2x-x^2+6=2x+6$.<br><strong>Svar:</strong> $2x+6$",
      ],
    ),
    o(
      "2.18",
      "Løs opp parentesene og trekk sammen.<br><br><strong>a)</strong> $(x+3)(x-1)$<br><br><strong>b)</strong> $2(x-4)(x+1)$<br><br><strong>c)</strong> $(2a-3)^2 - (a+1)(a-1)$",
      "FOIL / kvadratsetning. Trekk sammen like ledd til slutt.",
      [
        "<strong>a)</strong> $x^2-x+3x-3=x^2+2x-3$.<br><strong>Svar:</strong> $x^2+2x-3$",
        "<strong>b)</strong> Først $(x-4)(x+1)=x^2-3x-4$, gange med $2$: $2x^2-6x-8$.<br><strong>Svar:</strong> $2x^2-6x-8$",
        "<strong>c)</strong> $(2a-3)^2=4a^2-12a+9$.<br>$(a+1)(a-1)=a^2-1$.<br>$4a^2-12a+9-(a^2-1)=3a^2-12a+10$.<br><strong>Svar:</strong> $3a^2-12a+10$",
      ],
    ),
    o(
      "2.19",
      "En rektangulær ramme har ytre sider $x+5$ og $x+2$. Den indre åpningen har sider $x+1$ og $x$.<br><br><strong>a)</strong> Finn et forenklet uttrykk for arealet av rammen (det som er igjen når åpningen er trukket fra).<br><br><strong>b)</strong> Regn ut arealet når $x=4$.",
      "Ytre areal minus indre areal. Gang ut før du trekker.",
      [
        "<strong>a)</strong> $(x+5)(x+2)-(x+1)x = x^2+7x+10 - (x^2+x) = 6x+10$.<br><strong>Svar:</strong> $6x+10$",
        "<strong>b)</strong> $6\\cdot 4+10=34$.<br><strong>Svar:</strong> $34$",
      ],
    ),
  ],
  "2B": [
    o(
      "2.20",
      "Bruk kvadratsetningene.<br><br><strong>a)</strong> $(x+7)^2$<br><br><strong>b)</strong> $(3y-4)^2$<br><br><strong>c)</strong> $(2t+5)(2t-5)$",
      "$(a+b)^2=a^2+2ab+b^2$, $(a-b)^2=a^2-2ab+b^2$, $(a+b)(a-b)=a^2-b^2$.",
      [
        "<strong>a)</strong> $x^2+14x+49$.<br><strong>Svar:</strong> $x^2+14x+49$",
        "<strong>b)</strong> $9y^2-24y+16$.<br><strong>Svar:</strong> $9y^2-24y+16$",
        "<strong>c)</strong> $4t^2-25$.<br><strong>Svar:</strong> $4t^2-25$",
      ],
    ),
    o(
      "2.21",
      "Regn ut uten kalkulator ved å bruke kvadratsetninger.<br><br><strong>a)</strong> $51^2$<br><br><strong>b)</strong> $49\\cdot 51$<br><br><strong>c)</strong> $103^2$",
      "Skriv $51=50+1$, $49=50-1$, $103=100+3$.",
      [
        "<strong>a)</strong> $(50+1)^2=2500+100+1=2601$.<br><strong>Svar:</strong> $2601$",
        "<strong>b)</strong> $(50-1)(50+1)=2500-1=2499$.<br><strong>Svar:</strong> $2499$",
        "<strong>c)</strong> $(100+3)^2=10000+600+9=10609$.<br><strong>Svar:</strong> $10609$",
      ],
    ),
    o(
      "2.22",
      "Forenkle.<br><br><strong>a)</strong> $(x+3)^2-(x-3)^2$<br><br><strong>b)</strong> $(\\sqrt{7}+2)(\\sqrt{7}-2)$",
      "Skriv ut kvadratsetningene, eller se at a) er differanse mellom to kvadrat.",
      [
        "<strong>a)</strong> $(x^2+6x+9)-(x^2-6x+9)=12x$.<br><strong>Svar:</strong> $12x$",
        "<strong>b)</strong> $7-4=3$.<br><strong>Svar:</strong> $3$",
      ],
    ),
  ],
  "2C": [
    o(
      "2.23",
      "Faktoriser (sett felles faktor utenfor parentes).<br><br><strong>a)</strong> $12x-18$<br><br><strong>b)</strong> $6x^2+9x$<br><br><strong>c)</strong> $4a^2b-10ab^2$",
      "Finn største felles tallfaktor og felles bokstaver med lavest potens.",
      [
        "<strong>a)</strong> $6(2x-3)$. <strong>Svar:</strong> $6(2x-3)$",
        "<strong>b)</strong> $3x(2x+3)$. <strong>Svar:</strong> $3x(2x+3)$",
        "<strong>c)</strong> $2ab(2a-5b)$. <strong>Svar:</strong> $2ab(2a-5b)$",
      ],
    ),
    o(
      "2.24",
      "<strong>a)</strong> Vis at $\\sqrt{48}-\\sqrt{12}=2\\sqrt{3}$.<br><br><strong>b)</strong> Faktoriser $x(x-5)+2(x-5)$.",
      "Trekk ut kvadrattall under rota. I b) er $(x-5)$ felles faktor.",
      [
        "<strong>a)</strong> $\\sqrt{48}=\\sqrt{16\\cdot 3}=4\\sqrt{3}$, $\\sqrt{12}=\\sqrt{4\\cdot 3}=2\\sqrt{3}$.<br>$4\\sqrt{3}-2\\sqrt{3}=2\\sqrt{3}$.<br><strong>Svar:</strong> vist.",
        "<strong>b)</strong> $(x-5)(x+2)$.<br><strong>Svar:</strong> $(x-5)(x+2)$",
      ],
    ),
  ],
  "2D": [
    o(
      "2.25",
      "Faktoriser.<br><br><strong>a)</strong> $x^2-9$<br><br><strong>b)</strong> $x^2+8x+16$<br><br><strong>c)</strong> $x^2-5x+6$",
      "Differanse mellom to kvadrat, fullstendig kvadrat, eller to tall med produkt $c$ og sum $b$.",
      [
        "<strong>a)</strong> $(x-3)(x+3)$. <strong>Svar:</strong> $(x-3)(x+3)$",
        "<strong>b)</strong> $(x+4)^2$. <strong>Svar:</strong> $(x+4)^2$",
        "<strong>c)</strong> $(x-2)(x-3)$. <strong>Svar:</strong> $(x-2)(x-3)$",
      ],
    ),
    o(
      "2.26",
      "Faktoriser hvis det er mulig. Hvis ikke, forklar hvorfor.<br><br><strong>a)</strong> $x^2+4$<br><br><strong>b)</strong> $2x^2-8$<br><br><strong>c)</strong> $x^2+x-12$",
      "$x^2+4$ er sum av kvadrat, ikke differanse. I b) ta ut $2$ først.",
      [
        "<strong>a)</strong> $x^2+4=(x)^2+2^2$ er ikke differanse mellom to kvadrat (over reelle tall).<br><strong>Svar:</strong> kan ikke faktoriseres videre i $\\mathbb{R}$.",
        "<strong>b)</strong> $2(x^2-4)=2(x-2)(x+2)$.<br><strong>Svar:</strong> $2(x-2)(x+2)$",
        "<strong>c)</strong> $(x+4)(x-3)$.<br><strong>Svar:</strong> $(x+4)(x-3)$",
      ],
    ),
  ],
  "2E": [
    o(
      "2.27",
      "Forkort.<br><br><strong>a)</strong> $\\dfrac{8x-12}{4}$<br><br><strong>b)</strong> $\\dfrac{x^2-9}{x-3}$ når $x\\neq 3$<br><br><strong>c)</strong> $\\dfrac{2x^2+6x}{2x}$ når $x\\neq 0$",
      "Faktoriser teller (og nevner) før du stryker felles faktorer.",
      [
        "<strong>a)</strong> $\\dfrac{4(2x-3)}{4}=2x-3$. <strong>Svar:</strong> $2x-3$",
        "<strong>b)</strong> $\\dfrac{(x-3)(x+3)}{x-3}=x+3$. <strong>Svar:</strong> $x+3$",
        "<strong>c)</strong> $\\dfrac{2x(x+3)}{2x}=x+3$. <strong>Svar:</strong> $x+3$",
      ],
    ),
    o(
      "2.28",
      "Trekk sammen til én brøk.<br><br><strong>a)</strong> $\\dfrac{2}{x}+\\dfrac{3}{2x}$<br><br><strong>b)</strong> $\\dfrac{x}{x+1}-\\dfrac{1}{x+1}$",
      "Fellesnevner. I b) er nevneren allerede lik.",
      [
        "<strong>a)</strong> Fellesnevner $2x$: $\\dfrac{4}{2x}+\\dfrac{3}{2x}=\\dfrac{7}{2x}$.<br><strong>Svar:</strong> $\\dfrac{7}{2x}$",
        "<strong>b)</strong> $\\dfrac{x-1}{x+1}$.<br><strong>Svar:</strong> $\\dfrac{x-1}{x+1}$",
      ],
    ),
  ],
  "2F": [
    o(
      "2.29",
      "Et kvadrat har side $s$. Et rektangel har sider $s+2$ og $s-1$.<br><br><strong>a)</strong> Finn et uttrykk for differansen mellom rektangelets og kvadratets areal.<br><br><strong>b)</strong> For hvilken $s$ er arealene like store?",
      "Areal kvadrat $s^2$, rektangel $(s+2)(s-1)$. Sett differansen lik $0$.",
      [
        "<strong>a)</strong> $(s+2)(s-1)-s^2 = s^2+s-2-s^2 = s-2$.<br><strong>Svar:</strong> $s-2$",
        "<strong>b)</strong> $s-2=0 \\Rightarrow s=2$.<br><strong>Svar:</strong> $s=2$",
      ],
    ),
  ],
  "3A": [
    o(
      "3.23",
      "Løs likningene og sett prøve.<br><br><strong>a)</strong> $5x-7=2x+8$<br><br><strong>b)</strong> $3(x-2)=2x+9$<br><br><strong>c)</strong> $\\dfrac{x}{4}-\\dfrac{x}{6}=1$",
      "Samle $x$ på én side. I c) gang med fellesnevner $12$.",
      [
        "<strong>a)</strong> $5x-2x=8+7$, $3x=15$, $x=5$. Prøve: $25-7=10+8=18$.<br><strong>Svar:</strong> $x=5$",
        "<strong>b)</strong> $3x-6=2x+9$, $x=15$.<br><strong>Svar:</strong> $x=15$",
        "<strong>c)</strong> Gang med $12$: $3x-2x=12$, $x=12$.<br><strong>Svar:</strong> $x=12$",
      ],
    ),
    o(
      "3.24",
      "Omkretsen av et rektangel er $54$ cm. Lengden er $3$ cm lenger enn dobbel bredde.<br>La $b$ være bredden. Sett opp en likning og finn sidene.",
      "Omkrets $2(l+b)=54$. $l=2b+3$.",
      [
        "$2((2b+3)+b)=54$, $2(3b+3)=54$, $3b+3=27$, $3b=24$, $b=8$.<br>Lengde $2\\cdot 8+3=19$.<br><strong>Svar:</strong> bredde $8$ cm, lengde $19$ cm.",
      ],
    ),
    o(
      "3.25",
      "Løs ulikheten og skriv svaret både med ulikhetstegn og som intervall.<br><br><strong>a)</strong> $2x-5 < 7$<br><br><strong>b)</strong> $4-3x \\geq 10$",
      "Samme flytteregler som for likninger. Når du ganger/deler med et negativt tall, snur ulikheten.",
      [
        "<strong>a)</strong> $2x<12$, $x<6$. Intervall: $\\langle\\leftarrow, 6\\rangle$.<br><strong>Svar:</strong> $x<6$, $x\\in\\langle\\leftarrow,6\\rangle$",
        "<strong>b)</strong> $-3x\\geq 6$. Del på $-3$ og snu: $x\\leq -2$.<br><strong>Svar:</strong> $x\\leq -2$, $x\\in\\langle\\leftarrow,-2]$",
      ],
    ),
  ],
  "3B": [
    o(
      "3.26",
      "Formelen $s=v_0 t + \\dfrac{1}{2}at^2$ gir strekning ved konstant akselerasjon.<br><br><strong>a)</strong> Isoler $a$.<br><br><strong>b)</strong> Finn $a$ når $s=40$, $v_0=2$ og $t=4$.",
      "Trekk fra $v_0 t$, gang med $2$ og del på $t^2$.",
      [
        "<strong>a)</strong> $s-v_0 t=\\dfrac{1}{2}at^2$, $2(s-v_0 t)=at^2$, $a=\\dfrac{2(s-v_0 t)}{t^2}$.<br><strong>Svar:</strong> $a=\\dfrac{2(s-v_0 t)}{t^2}$",
        "<strong>b)</strong> $a=\\dfrac{2(40-8)}{16}=\\dfrac{64}{16}=4$.<br><strong>Svar:</strong> $a=4$",
      ],
    ),
    o(
      "3.27",
      "$\\dfrac{1}{R}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}$. Isoler $R$.",
      "Fellesnevner $R_1 R_2$ på høyre side, deretter inverter begge sider.",
      [
        "$\\dfrac{1}{R}=\\dfrac{R_2+R_1}{R_1 R_2}$, så $R=\\dfrac{R_1 R_2}{R_1+R_2}$.<br><strong>Svar:</strong> $R=\\dfrac{R_1 R_2}{R_1+R_2}$",
      ],
    ),
  ],
  "3C": [
    o(
      "3.28",
      "Løs.<br><br><strong>a)</strong> $x^2=25$<br><br><strong>b)</strong> $(x-3)(x+1)=0$<br><br><strong>c)</strong> $x^2-6x=0$",
      "Husk $\\pm$ når du tar kvadratrot. Produktregelen: et av faktorene er $0$.",
      [
        "<strong>a)</strong> $x=\\pm 5$. <strong>Svar:</strong> $x=-5$ eller $x=5$",
        "<strong>b)</strong> $x=3$ eller $x=-1$. <strong>Svar:</strong> $x=3$ eller $x=-1$",
        "<strong>c)</strong> $x(x-6)=0$, så $x=0$ eller $x=6$. <strong>Svar:</strong> $x=0$ eller $x=6$",
      ],
    ),
    o(
      "3.29",
      "Et rektangel har areal $48$ og den ene siden er $2$ lenger enn den andre. Finn sidene.",
      "La bredden være $x$. Da er lengden $x+2$, og $x(x+2)=48$.",
      [
        "$x^2+2x-48=0$. Faktoriser: $(x+8)(x-6)=0$.<br>$x=-8$ (gir ikke lengde) eller $x=6$.<br>Sider $6$ og $8$.<br><strong>Svar:</strong> $6$ og $8$",
      ],
    ),
  ],
  "3D": [
    o(
      "3.30",
      "Løs med abc-formelen. Oppgi eksakt svar.<br><br><strong>a)</strong> $x^2-4x-1=0$<br><br><strong>b)</strong> $2x^2+x-6=0$",
      "$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. Forenkle rota hvis du kan.",
      [
        "<strong>a)</strong> $a=1,b=-4,c=-1$. $D=16+4=20=4\\cdot 5$.<br>$x=\\dfrac{4\\pm 2\\sqrt{5}}{2}=2\\pm\\sqrt{5}$.<br><strong>Svar:</strong> $x=2+\\sqrt{5}$ eller $x=2-\\sqrt{5}$",
        "<strong>b)</strong> $a=2,b=1,c=-6$. $D=1+48=49$.<br>$x=\\dfrac{-1\\pm 7}{4}$. $x=\\dfrac{6}{4}=\\dfrac{3}{2}$ eller $x=\\dfrac{-8}{4}=-2$.<br><strong>Svar:</strong> $x=\\dfrac{3}{2}$ eller $x=-2$",
      ],
    ),
    o(
      "3.31",
      "Likningen $x^2-6x+k=0$ har nøyaktig én løsning. Finn $k$ og løsningen.",
      "Én løsning $\\Leftrightarrow$ diskriminanten er $0$.",
      [
        "$D=36-4k=0$, $k=9$. Da $x=\\dfrac{6}{2}=3$.<br><strong>Svar:</strong> $k=9$ og $x=3$",
      ],
    ),
  ],
  "3E": [
    o(
      "3.32",
      "Løs og sjekk for falske løsninger.<br><br><strong>a)</strong> $\\dfrac{x+1}{x-2}=3$<br><br><strong>b)</strong> $\\dfrac{2}{x}=\\dfrac{x}{8}$",
      "Gang med nevneren. $x$ kan ikke gjøre en nevner lik $0$.",
      [
        "<strong>a)</strong> $x+1=3(x-2)$, $x+1=3x-6$, $7=2x$, $x=\\dfrac{7}{2}$. Nevner $x-2\\neq 0$. OK.<br><strong>Svar:</strong> $x=\\dfrac{7}{2}$",
        "<strong>b)</strong> $16=x^2$, $x=\\pm 4$. Ingen av dem gir nevner $0$.<br><strong>Svar:</strong> $x=4$ eller $x=-4$",
      ],
    ),
    o(
      "3.33",
      "$\\dfrac{x}{x-1}-\\dfrac{2}{x+1}=1$. Løs likningen.",
      "Fellesnevner $(x-1)(x+1)=x^2-1$. Husk $x\\neq\\pm 1$.",
      [
        "Gang med $(x-1)(x+1)$: $x(x+1)-2(x-1)=(x^2-1)$.<br>$x^2+x-2x+2=x^2-1$, $-x+2=-1$, $-x=-3$, $x=3$.<br>$x=3$ er tillatt.<br><strong>Svar:</strong> $x=3$",
      ],
    ),
  ],
  "3F": [
    o(
      "3.34",
      "En oppskrift til $4$ personer bruker $3$ dl fløte. Du skal lage mat til $6$ personer.<br><br><strong>a)</strong> Sett opp en proporsjon og finn hvor mye fløte du trenger.<br><br><strong>b)</strong> Hvor mange personer kan du lage mat til med $9$ dl fløte?",
      "Mengde og antall personer er proporsjonale. $\\dfrac{3}{4}=\\dfrac{x}{6}$.",
      [
        "<strong>a)</strong> $\\dfrac{3}{4}=\\dfrac{x}{6}$, $x=\\dfrac{3\\cdot 6}{4}=4.5$.<br><strong>Svar:</strong> $4.5$ dl.",
        "<strong>b)</strong> $\\dfrac{3}{4}=\\dfrac{9}{n}$, $3n=36$, $n=12$.<br><strong>Svar:</strong> $12$ personer.",
      ],
    ),
    o(
      "3.35",
      "En bil bruker $0.6$ liter bensin per mil. Bensintanken rommer $48$ liter.<br><br><strong>a)</strong> Hvor langt kan bilen kjøre på en full tank?<br><br><strong>b)</strong> Hvor mye bensin trengs til $250$ km? (Ett mil $=10$ km.)",
      "Forbruket er proporsjonalt med distansen.",
      [
        "<strong>a)</strong> $48/0.6=80$ mil $=800$ km.<br><strong>Svar:</strong> $800$ km.",
        "<strong>b)</strong> $250$ km $=25$ mil. $25\\cdot 0.6=15$.<br><strong>Svar:</strong> $15$ liter.",
      ],
    ),
  ],
  "3G": [
    o(
      "3.36",
      "Utfør polynomdivisjonen $(x^2+5x+6):(x+2)$ og sett prøve.",
      "Hvor mange ganger går $x$ i $x^2$? Gang tilbake og trekk fra.",
      [
        "$(x^2+5x+6):(x+2)=x+3$ fordi $(x+2)(x+3)=x^2+5x+6$.<br><strong>Svar:</strong> $x+3$",
      ],
    ),
    o(
      "3.37",
      "Polynomet $P(x)=x^3-2x^2-5x+6$ har et nullpunkt $x=1$.<br><br><strong>a)</strong> Del $P(x)$ på $(x-1)$.<br><br><strong>b)</strong> Faktoriser $P(x)$ fullstendig.",
      "Restteoremet: $P(1)=0$ betyr at $(x-1)$ går opp. Faktoriser andregraden etterpå.",
      [
        "<strong>a)</strong> $(x^3-2x^2-5x+6):(x-1)=x^2-x-6$.<br><strong>Svar:</strong> $x^2-x-6$",
        "<strong>b)</strong> $x^2-x-6=(x-3)(x+2)$.<br>Dermed $P(x)=(x-1)(x-3)(x+2)$.<br><strong>Svar:</strong> $(x-1)(x-3)(x+2)$",
      ],
    ),
  ],
};

export const SUB_TITLES: Record<string, string> = {
  "1A": "1A Tallmengder og regneregler",
  "1B": "1B Figurtall og mønstre",
  "1C": "1C Faktorer og brøk",
  "1D": "1D Potenser",
  "1E": "1E Standardform",
  "1F": "1F Logikk og bevis",
  "1OP": "Øveprøve",
  "2A": "2A Forenkle uttrykk",
  "2B": "2B Kvadratsetninger",
  "2C": "2C Felles faktor",
  "2D": "2D Faktorisering",
  "2E": "2E Algebraiske brøker",
  "2F": "2F Figurer og mønstre",
  "2OP": "Øveprøve",
  "3A": "3A Førstegradslikninger",
  "3B": "3B Formler",
  "3C": "3C Andregradslikninger",
  "3D": "3D ABC-formelen",
  "3E": "3E Rasjonale likninger",
  "3F": "3F Proporsjoner",
  "3G": "3G Polynomdivisjon",
  "3OP": "Øveprøve",
  "4A": "4A Funksjonsbegrepet",
  "4B": "4B Lineære funksjoner",
  "4C": "4C Polynomfunksjoner",
  "4D": "4D Rasjonale funksjoner",
  "4E": "4E Potensfunksjoner",
  "4F": "4F Eksponentialfunksjoner",
  "4G": "4G Drøfting",
  "4H": "4H Vekstfart og derivasjon",
};
