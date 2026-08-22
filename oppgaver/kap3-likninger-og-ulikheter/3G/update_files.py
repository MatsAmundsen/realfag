import os

files = {
    "3.18.md": """---
id: "3.18"
tittel: "Oppgave 3.18"
---

**a)** Når benytter vi oss av polynomdivisjon?

**b)** Hvilke begrensninger har polynomdivisjon?

## Hint

Tenk på hvorfor vi ikke bare kan bruke abc-formelen på $x^3$.

## Fasit

**a)** 
For å faktorisere polynomer av grad tre eller høyere, slik at vi kan løse likninger. Dette gjør vi ved å redusere polynomet til en lavere grad som vi deretter kan løse videre med andre metoder.

**b)** 
Vi må kjenne til eller kunne gjette minst ett av polynomets nullpunkter på forhånd for å ha noe å dele på. (Uten et kjent nullpunkt kan vi ikke starte polynomdivisjonen.)
""",
    "3.19.md": """---
id: "3.19"
tittel: "Oppgave 3.19"
---

Utfør polynomdivisjon og skriv deretter alle svarene som et produkt av lineære faktorer:

**a)** $(x^2 - 7x + 12) : (x - 3)$

**b)** $(x^2 + 3x - 10) : (x + 5)$

**c)** $(2x^2 - 5x + 7) : (x - 2)$

**d)** $(x^3 - 2x^2 - 5x + 6) : (x - 1)$

**e)** $(x^3 + 4x^2 + x - 6) : (x + 2)$

## Hint

Husk algoritmen: Del, gang tilbake, trekk fra, og gjenta. Husk at hvis divisjonen har rest (som i c), er det ikke et nullpunkt.

## Fasit

**a)**
Vi utfører polynomdivisjonen $(x^2 - 7x + 12) : (x - 3)$:

$x^2 : x = x$

Multipliserer tilbake: $x \cdot (x - 3) = x^2 - 3x$

Trekker fra: $(x^2 - 7x) - (x^2 - 3x) = -4x$

Trekker ned $12$: $-4x + 12$

$-4x : x = -4$

Multipliserer tilbake: $-4 \cdot (x - 3) = -4x + 12$

Trekker fra: $(-4x + 12) - (-4x + 12) = 0$ (ingen rest)

**Svar:** Divisjonen gir $x - 4$. Polynomet faktorisert er $(x - 3)(x - 4)$.

**b)**
Vi utfører polynomdivisjonen $(x^2 + 3x - 10) : (x + 5)$:

$x^2 : x = x$

Multipliserer tilbake: $x \cdot (x + 5) = x^2 + 5x$

Trekker fra: $(x^2 + 3x) - (x^2 + 5x) = -2x$

Trekker ned $-10$: $-2x - 10$

$-2x : x = -2$

Multipliserer tilbake: $-2 \cdot (x + 5) = -2x - 10$

Trekker fra: $(-2x - 10) - (-2x - 10) = 0$ (ingen rest)

**Svar:** Divisjonen gir $x - 2$. Polynomet faktorisert er $(x + 5)(x - 2)$.

**c)**
Vi utfører polynomdivisjonen $(2x^2 - 5x + 7) : (x - 2)$:

$2x^2 : x = 2x$

Multipliserer tilbake: $2x \cdot (x - 2) = 2x^2 - 4x$

Trekker fra: $(2x^2 - 5x) - (2x^2 - 4x) = -x$

Trekker ned $7$: $-x + 7$

$-x : x = -1$

Multipliserer tilbake: $-1 \cdot (x - 2) = -x + 2$

Trekker fra: $(-x + 7) - (-x + 2) = 5$ (rest)

Siden divisjonen gir rest, er ikke $x = 2$ et nullpunkt.

**Svar:** Divisjonen gir $2x - 1 + \\frac{5}{x - 2}$. Polynomet lar seg ikke faktorisere rent med $(x - 2)$.

**d)**
Vi utfører polynomdivisjonen $(x^3 - 2x^2 - 5x + 6) : (x - 1)$:

$x^3 : x = x^2$

Multipliserer tilbake: $x^2 \cdot (x - 1) = x^3 - x^2$

Trekker fra: $(x^3 - 2x^2) - (x^3 - x^2) = -x^2$

Trekker ned $-5x$: $-x^2 - 5x$

$-x^2 : x = -x$

Multipliserer tilbake: $-x \cdot (x - 1) = -x^2 + x$

Trekker fra: $(-x^2 - 5x) - (-x^2 + x) = -6x$

Trekker ned $6$: $-6x + 6$

$-6x : x = -6$

Multipliserer tilbake: $-6 \cdot (x - 1) = -6x + 6$

Trekker fra: $(-6x + 6) - (-6x + 6) = 0$ (ingen rest)

Nå har vi $(x - 1)(x^2 - x - 6)$. Vi faktoriserer $x^2 - x - 6$ ved å finne to tall som ganget gir $-6$ og lagt sammen gir $-1$, det er $-3$ og $2$. Dermed er $x^2 - x - 6 = (x - 3)(x + 2)$.

**Svar:** Divisjonen gir $x^2 - x - 6$. Polynomet faktorisert er $(x - 1)(x - 3)(x + 2)$.

**e)**
Vi utfører polynomdivisjonen $(x^3 + 4x^2 + x - 6) : (x + 2)$:

$x^3 : x = x^2$

Multipliserer tilbake: $x^2 \cdot (x + 2) = x^3 + 2x^2$

Trekker fra: $(x^3 + 4x^2) - (x^3 + 2x^2) = 2x^2$

Trekker ned $x$: $2x^2 + x$

$2x^2 : x = 2x$

Multipliserer tilbake: $2x \cdot (x + 2) = 2x^2 + 4x$

Trekker fra: $(2x^2 + x) - (2x^2 + 4x) = -3x$

Trekker ned $-6$: $-3x - 6$

$-3x : x = -3$

Multipliserer tilbake: $-3 \cdot (x + 2) = -3x - 6$

Trekker fra: $(-3x - 6) - (-3x - 6) = 0$ (ingen rest)

Nå har vi $(x + 2)(x^2 + 2x - 3)$. Vi faktoriserer $x^2 + 2x - 3$ ved å finne to tall som ganget gir $-3$ og lagt sammen gir $2$, det er $3$ og $-1$. Dermed er $x^2 + 2x - 3 = (x - 1)(x + 3)$.

**Svar:** Divisjonen gir $x^2 + 2x - 3$. Polynomet faktorisert er $(x + 2)(x - 1)(x + 3)$.
""",
    "3.20.md": """---
id: "3.20"
tittel: "Oppgave 3.20"
---

Utfør polynomdivisjonen:

**a)** $(x^3 - 7x - 6) : (x - 3)$

**b)** $(x^3 - 8) : (x - 2)$

## Hint

Tips til b): Legg inn $0x^2$ og $0x$ underveis i divisjonen for å ikke miste plassen. (Det kan også gjøres for a): $x^3 + 0x^2 - 7x - 6$)

## Fasit

**a)**
Vi mangler annengradsleddet, så vi setter inn $0x^2$:
$(x^3 + 0x^2 - 7x - 6) : (x - 3)$

$x^3 : x = x^2$

Multipliserer tilbake: $x^2 \cdot (x - 3) = x^3 - 3x^2$

Trekker fra: $(x^3 + 0x^2) - (x^3 - 3x^2) = 3x^2$

Trekker ned $-7x$: $3x^2 - 7x$

$3x^2 : x = 3x$

Multipliserer tilbake: $3x \cdot (x - 3) = 3x^2 - 9x$

Trekker fra: $(3x^2 - 7x) - (3x^2 - 9x) = 2x$

Trekker ned $-6$: $2x - 6$

$2x : x = 2$

Multipliserer tilbake: $2 \cdot (x - 3) = 2x - 6$

Trekker fra: $(2x - 6) - (2x - 6) = 0$

**Svar:** $x^2 + 3x + 2$

**b)**
Vi setter inn $0x^2$ og $0x$ for å holde orden:
$(x^3 + 0x^2 + 0x - 8) : (x - 2)$

$x^3 : x = x^2$

Multipliserer tilbake: $x^2 \cdot (x - 2) = x^3 - 2x^2$

Trekker fra: $(x^3 + 0x^2) - (x^3 - 2x^2) = 2x^2$

Trekker ned $0x$: $2x^2 + 0x$

$2x^2 : x = 2x$

Multipliserer tilbake: $2x \cdot (x - 2) = 2x^2 - 4x$

Trekker fra: $(2x^2 + 0x) - (2x^2 - 4x) = 4x$

Trekker ned $-8$: $4x - 8$

$4x : x = 4$

Multipliserer tilbake: $4 \cdot (x - 2) = 4x - 8$

Trekker fra: $(4x - 8) - (4x - 8) = 0$

**Svar:** $x^2 + 2x + 4$
""",
    "3.21.md": """---
id: "3.21"
tittel: "Oppgave 3.21"
---

Utfør polynomdivisjonen:

**a)** $(2x^3 - 3x^2 - 3x + 2) : (x - 2)$

**b)** $(3x^3 - 10x^2 + 9x - 2) : (x - 1)$

**c)** $(4x^3 - 8x^2 - x + 2) : (2x - 1)$

## Hint

Pass ekstra godt på fortegn når du trekker fra.

## Fasit

**a)**
Vi deler $(2x^3 - 3x^2 - 3x + 2)$ på $(x - 2)$:

$2x^3 : x = 2x^2$

Multipliserer tilbake: $2x^2 \cdot (x - 2) = 2x^3 - 4x^2$

Trekker fra: $(2x^3 - 3x^2) - (2x^3 - 4x^2) = x^2$

Trekker ned $-3x$: $x^2 - 3x$

$x^2 : x = x$

Multipliserer tilbake: $x \cdot (x - 2) = x^2 - 2x$

Trekker fra: $(x^2 - 3x) - (x^2 - 2x) = -x$

Trekker ned $2$: $-x + 2$

$-x : x = -1$

Multipliserer tilbake: $-1 \cdot (x - 2) = -x + 2$

Trekker fra: $(-x + 2) - (-x + 2) = 0$

**Svar:** $2x^2 + x - 1$

**b)**
Vi deler $(3x^3 - 10x^2 + 9x - 2)$ på $(x - 1)$:

$3x^3 : x = 3x^2$

Multipliserer tilbake: $3x^2 \cdot (x - 1) = 3x^3 - 3x^2$

Trekker fra: $(3x^3 - 10x^2) - (3x^3 - 3x^2) = -7x^2$

Trekker ned $9x$: $-7x^2 + 9x$

$-7x^2 : x = -7x$

Multipliserer tilbake: $-7x \cdot (x - 1) = -7x^2 + 7x$

Trekker fra: $(-7x^2 + 9x) - (-7x^2 + 7x) = 2x$

Trekker ned $-2$: $2x - 2$

$2x : x = 2$

Multipliserer tilbake: $2 \cdot (x - 1) = 2x - 2$

Trekker fra: $(2x - 2) - (2x - 2) = 0$

**Svar:** $3x^2 - 7x + 2$

**c)**
Vi deler $(4x^3 - 8x^2 - x + 2)$ på $(2x - 1)$:

$4x^3 : 2x = 2x^2$

Multipliserer tilbake: $2x^2 \cdot (2x - 1) = 4x^3 - 2x^2$

Trekker fra: $(4x^3 - 8x^2) - (4x^3 - 2x^2) = -6x^2$

Trekker ned $-x$: $-6x^2 - x$

$-6x^2 : 2x = -3x$

Multipliserer tilbake: $-3x \cdot (2x - 1) = -6x^2 + 3x$

Trekker fra: $(-6x^2 - x) - (-6x^2 + 3x) = -4x$

Trekker ned $2$: $-4x + 2$

$-4x : 2x = -2$

Multipliserer tilbake: $-2 \cdot (2x - 1) = -4x + 2$

Trekker fra: $(-4x + 2) - (-4x + 2) = 0$

**Svar:** $2x^2 - 3x - 2$
""",
    "3.22.md": """---
id: "3.22"
tittel: "Oppgave 3.22"
---

Divisjonen $(x^3 - 4x^2 + cx - 12) : (x - 3)$ går opp uten rest. Bestem $c$.

## Hint

Bruk restteoremet: Siden det ikke blir noen rest, må uttrykket bli lik null når du setter inn $x = 3$. La $P(x) = x^3 - 4x^2 + cx - 12$. Løs likningen $P(3) = 0$.

## Fasit

Vi lar $P(x) = x^3 - 4x^2 + cx - 12$. 

Når divisjonen med $(x - 3)$ går opp uten rest, sier restteoremet at $P(3) = 0$.

Vi setter $x = 3$ inn i uttrykket for $P(x)$ og setter det lik $0$:

$3^3 - 4 \cdot 3^2 + c \cdot 3 - 12 = 0$ (setter inn $x=3$)

$27 - 4 \cdot 9 + 3c - 12 = 0$ (regner ut potensene)

$27 - 36 + 3c - 12 = 0$ (ganger ut)

$-9 - 12 + 3c = 0$ (trekker sammen tallene)

$-21 + 3c = 0$

$3c = 21$ (flytter $-21$ til høyre side)

$c = \\frac{21}{3}$ (deler på 3)

$c = 7$

**Svar:** $c = 7$
"""
}

for filename, content in files.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

print("All files updated successfully.")
