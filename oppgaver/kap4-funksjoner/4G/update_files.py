import os

files = {
    "4.44.md": """---
id: "4.44"
tittel: "Oppgave 4.44"
---

Forklar begrepene: Gjennomsnittlig vekstfart, momentan vekstfart og hvordan de regnes ut.

## Hint

Gjennomsnittlig vekstfart gjelder over et tidsintervall. Momentan vekstfart er i ett nøyaktig øyeblikk.

## Fasit

Gjennomsnittlig vekstfart beskriver endringen over et helt intervall fra $x_1$ til $x_2$. Dette tilsvarer stigningstallet til en sekant som går gjennom disse to punktene på grafen.

Det regnes ut med formelen:
$\\frac{f(x_2) - f(x_1)}{x_2 - x_1}$

Momentan vekstfart beskriver endringen i akkurat ett bestemt punkt. Dette tilsvarer stigningstallet til tangenten i dette punktet. 

Vi finner den momentane vekstfarten ved å derivere funksjonen, $f'(x)$, og sette inn $x$-verdien til punktet.

**Svar:** Gjennomsnittlig vekstfart regnes med $\\frac{f(x_2) - f(x_1)}{x_2 - x_1}$, og momentan vekstfart med $f'(x)$.
""",
    
    "4.45.md": """---
id: "4.45"
tittel: "Oppgave 4.45"
---

Gitt funksjonen $f(x) = -x^2 + 4x + 2$.

**a)** Finn gjennomsnittsfarten i intervallene $[0, 2]$ og $[2, 4]$.
**b)** Finn tangenten i punktet $(2, f(2))$. Hva er den momentane vekstfarten når $x=2$?
**c)** Finn den momentane vekstfarten når $x=3$.
**d)** Finn den momentane vekstfarten når $x=0$.

## Hint

Finn den deriverte $f'(x)$ for å løse oppgave b, c og d.

## Fasit

**a)**
Vi finner først funksjonsverdiene i endepunktene av intervallene:
$f(0) = -0^2 + 4 \\cdot 0 + 2 = 2$
$f(2) = -2^2 + 4 \\cdot 2 + 2 = -4 + 8 + 2 = 6$
$f(4) = -4^2 + 4 \\cdot 4 + 2 = -16 + 16 + 2 = 2$

Gjennomsnittlig vekstfart for $[0, 2]$:
$\\frac{f(2) - f(0)}{2 - 0} = \\frac{6 - 2}{2} = \\frac{4}{2} = 2$

Gjennomsnittlig vekstfart for $[2, 4]$:
$\\frac{f(4) - f(2)}{4 - 2} = \\frac{2 - 6}{2} = \\frac{-4}{2} = -2$

**Svar:** Gjennomsnittsfarten er $2$ i intervallet $[0, 2]$ og $-2$ i intervallet $[2, 4]$.

**b)**
Momentan vekstfart for $x=2$ er det samme som stigningstallet til tangenten i dette punktet. Dette finner vi ved å bruke den deriverte, $f'(x)$.

Vi deriverer funksjonen:
$f'(x) = -2x + 4$

Vi setter inn $x = 2$:
$f'(2) = -2 \\cdot 2 + 4 = -4 + 4 = 0$

Siden stigningstallet er $0$, har tangenten null stigning, som betyr at grafen har et toppunkt her.

**Svar:** Den momentane vekstfarten når $x=2$ er $0$.

**c)**
Vi bruker den deriverte $f'(x) = -2x + 4$ fra oppgave b.

Setter inn $x = 3$:
$f'(3) = -2 \\cdot 3 + 4 = -6 + 4 = -2$

**Svar:** Den momentane vekstfarten når $x=3$ er $-2$.

**d)**
Vi bruker igjen den deriverte $f'(x) = -2x + 4$.

Setter inn $x = 0$:
$f'(0) = -2 \\cdot 0 + 4 = 0 + 4 = 4$

**Svar:** Den momentane vekstfarten når $x=0$ er $4$.
""",

    "4.46.md": """---
id: "4.46"
tittel: "Oppgave 4.46"
---

En graf har en tangent i punktet $(20, 300)$ som har stigningstall $15$. Vi får i tillegg oppgitt at $f(40) = 500$.

**a)** Hva er stigningstallet til tangenten?
**b)** Hva er den momentane vekstfarten når $x=20$?
**c)** Finn gjennomsnittsfarten i intervallet $[20, 40]$.

## Hint

Tangentens stigningstall er nøyaktig det samme som den momentane vekstfarten i tangeringspunktet.

## Fasit

**a)**
Stigningstallet til tangenten er gitt i oppgaveteksten.
Grafen stiger med $15$ $y$-enheter per $x$-enhet akkurat i dette punktet.

**Svar:** Stigningstallet til tangenten er $15$.

**b)**
Momentan vekstfart i et punkt er definert som stigningstallet til tangenten i det samme punktet.
Siden punktet har $x=20$ og vi vet fra oppgave a at stigningstallet her er $15$, er også den momentane vekstfarten $15$.

**Svar:** Den momentane vekstfarten i $x=20$ er $15$.

**c)**
Vi vet at punktene for $x=20$ og $x=40$ er $(20, 300)$ og $(40, 500)$.
Gjennomsnittsfart over et intervall er stigningstallet til sekanten som går gjennom punktene:

$\\frac{f(x_2) - f(x_1)}{x_2 - x_1}$

Vi setter inn punktene vi har:
$\\frac{500 - 300}{40 - 20} = \\frac{200}{20} = 10$

**Svar:** Gjennomsnittsfarten i intervallet $[20, 40]$ er $10$.
""",

    "4.47.md": """---
id: "4.47"
tittel: "Oppgave 4.47"
---

Temperaturen i en industriovn er gitt ved $T(t) = 200 - 180 \\cdot 0.92^t$.

**a)** Finn gjennomsnittsfarten i intervallet $[0, 10]$.
**b)** Finn momentan vekstfart når $t=5$, $t=10$ og $t=15$. Hva forteller svarene deg?

## Hint

For å finne momentan vekstfart i b) må vi finne $T'(t)$.
Siden uttrykket inneholder en eksponentialfunksjon med grunntall $0.92$, bruker vi den naturlige logaritmen ($\\ln$) for å derivere:
$T'(t) = -180 \\cdot \\ln(0.92) \\cdot 0.92^t$

## Fasit

**a)**
For å finne gjennomsnittsfarten over intervallet $[0, 10]$, regner vi ut gjennomsnittlig endring pr tidsenhet.

Finner først funksjonsverdiene:
$T(0) = 200 - 180 \\cdot 0.92^0 = 200 - 180 \\cdot 1 = 20$
$T(10) = 200 - 180 \\cdot 0.92^{10} \\approx 200 - 180 \\cdot 0.4344 \\approx 121.8$

Gjennomsnittlig vekstfart:
$\\frac{T(10) - T(0)}{10 - 0} \\approx \\frac{121.8 - 20}{10} = \\frac{101.8}{10} \\approx 10.2$

**Svar:** Gjennomsnittlig vekstfart i intervallet $[0, 10]$ er omtrent $10.2$ grader/min.

**b)**
Vi finner momentan vekstfart ved å derivere $T(t)$:
$T'(t) = -180 \\cdot \\ln(0.92) \\cdot 0.92^t$
$T'(t) \\approx -180 \\cdot (-0.08338) \\cdot 0.92^t \\approx 15.01 \\cdot 0.92^t$

Nå kan vi regne ut vekstfarten på de ulike tidspunktene ved å sette dem inn i $T'(t)$.

For $t=5$:
$T'(5) = 15.01 \\cdot 0.92^5 \\approx 15.01 \\cdot 0.659 \\approx 9.9$

For $t=10$:
$T'(10) = 15.01 \\cdot 0.92^{10} \\approx 15.01 \\cdot 0.434 \\approx 6.5$

For $t=15$:
$T'(15) = 15.01 \\cdot 0.92^{15} \\approx 15.01 \\cdot 0.286 \\approx 4.3$

Jo lenger tid som har gått, jo lavere blir oppvarmingshastigheten. Grafen flater ut og temperaturen nærmer seg $200$ grader.

**Svar:** Momentan vekstfart er $9.9$ for $t=5$, $6.5$ for $t=10$, og $4.3$ for $t=15$. Dette betyr at oppvarmingen går langsommere jo lenger ovnen står på.
""",

    "4.48.md": """---
id: "4.48"
tittel: "Oppgave 4.48"
---

Gitt funksjonen $f(x) = 0.25x^3 - 2x$.

**a)** Skisser grafen i intervallet $[-4, 4]$.
**b)** Tegn inn tangenter for $x=-2$ og $x=2$ og finn stigningstallene grafisk.
**c)** Finn momentan vekstfart i $x=-2$ og $x=2$ ved regning.
**d)** Når er momentan vekstfart lik $0$?
**e)** Når er momentan vekstfart lik $1$?

## Hint

For oppgave c, finn den deriverte $f'(x)$. Husk at momentan vekstfart er akkurat det samme som verdien til den deriverte $f'(x)$. 

## Fasit

**a)**
*Skisse av graf mangler, men du kan lage en tabell med verdier fra $-4$ til $4$ og tegne grafen.*

**Svar:** (Se din egen skisse)

**b)**
*Du kan finne stigningstallene ved å tegne tangentene i disse punktene og lese av hvor mange $y$-enheter grafen stiger per $x$-enhet.*

**Svar:** Begge tangentene skal ha stigningstall $1$.

**c)**
Vi finner momentan vekstfart ved å derivere funksjonen:
$f'(x) = 3 \\cdot 0.25x^{3-1} - 2 = 0.75x^2 - 2$

Setter inn $x = -2$:
$f'(-2) = 0.75 \\cdot (-2)^2 - 2 = 0.75 \\cdot 4 - 2 = 3 - 2 = 1$

Setter inn $x = 2$:
$f'(2) = 0.75 \\cdot 2^2 - 2 = 0.75 \\cdot 4 - 2 = 3 - 2 = 1$

**Svar:** Momentan vekstfart er $1$ for både $x=-2$ og $x=2$.

**d)**
Vi setter momentan vekstfart, $f'(x)$, lik $0$ og løser for $x$:
$0.75x^2 - 2 = 0$

Flytter over tallet:
$0.75x^2 = 2$

Deler på $0.75$:
$x^2 = \\frac{2}{0.75} = \\frac{2}{\\frac{3}{4}} = \\frac{8}{3}$
$x^2 \\approx 2.67$

Tar kvadratroten av begge sider:
$x = \\pm \\sqrt{2.67} \\approx \\pm 1.63$

Dette er $x$-verdiene der funksjonen har et topp- eller bunnpunkt (tangenten er vannrett).

**Svar:** Momentan vekstfart er $0$ for $x \\approx 1.63$ og $x \\approx -1.63$.

**e)**
Vi setter momentan vekstfart lik $1$ og løser for $x$:
$0.75x^2 - 2 = 1$

Flytter over tallet:
$0.75x^2 = 3$

Deler på $0.75$:
$x^2 = \\frac{3}{0.75} = 4$

Tar kvadratroten av begge sider:
$x = \\pm \\sqrt{4}$
$x = \\pm 2$

**Svar:** Momentan vekstfart er $1$ når $x = -2$ og når $x = 2$.
""",

    "4.49.md": """---
id: "4.49"
tittel: "Oppgave 4.49"
---

Skisser en andregradsfunksjon der momentan vekstfart er $-4$ i $x=1$, og der gjennomsnittsfarten i intervallet $[1, 5]$ er $0$.

## Hint

Hvis gjennomsnittsfarten over intervallet er $0$, betyr det at grafen verken har steget eller sunket totalt mellom de to punktene. Det vil si at y-verdiene må være like (for eksempel $f(1) = f(5)$). 

I en parabel (andregradsfunksjon) vil symmetrilinjen ligge midt imellom to punkter med samme $y$-verdi.

## Fasit

Gjennomsnittsfart lik $0$ i intervallet $[1, 5]$ betyr at funksjonen har samme $y$-verdi i $x=1$ og $x=5$. Siden grafen til en andregradsfunksjon (parabel) er symmetrisk, må symmetrilinjen ligge nøyaktig midt mellom disse punktene:

$\\frac{1 + 5}{2} = \\frac{6}{2} = 3$

Symmetrilinjen er dermed $x=3$. Parabelen har topp- eller bunnpunktet sitt her.

Vi vet også at den momentane vekstfarten, $f'(x)$, i $x=1$ er $-4$. Altså:
$f'(1) = -4$

Siden funksjonen er en andregradsfunksjon kan vi skrive den på formen $f(x) = ax^2 + bx + c$.
Da er den deriverte $f'(x) = 2ax + b$.

Ettersom symmetrilinjen, $x=3$, er der den deriverte er null ($f'(3) = 0$), får vi:
$2a \\cdot 3 + b = 0 \\Rightarrow 6a + b = 0 \\Rightarrow b = -6a$

Nå kan vi bruke at $f'(1) = -4$:
$2a \\cdot 1 + b = -4$
$2a - 6a = -4$
$-4a = -4$
$a = 1$

Vi finner $b$:
$b = -6 \\cdot 1 = -6$

Vi kan velge $c = 0$ for enkelhets skyld. Da får vi funksjonen:
$f(x) = x^2 - 6x$

Vi kan kontrollere svaret:
$f'(x) = 2x - 6$
$f'(1) = 2 \\cdot 1 - 6 = -4$ (Stemmer)

Gjennomsnittsfart i $[1, 5]$:
$f(1) = 1^2 - 6 \\cdot 1 = -5$
$f(5) = 5^2 - 6 \\cdot 5 = 25 - 30 = -5$
$\\frac{f(5) - f(1)}{5 - 1} = \\frac{-5 - (-5)}{4} = 0$ (Stemmer)

**Svar:** En mulig funksjon som oppfyller kravene er $f(x) = x^2 - 6x$. Funksjonen snur i $x=3$.
"""
}

for fname, content in files.items():
    path = os.path.join("/Users/m.g.a/kodeprosjekter/realfag/oppgaver/kap4-funksjoner/4G", fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
