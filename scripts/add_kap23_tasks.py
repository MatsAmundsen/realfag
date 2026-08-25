#!/usr/bin/env python3
# Genererer ekstra 1T-oppgaver for kapittel 2 og 3 + øveprøve kap. 3.
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write_task(rel, oid, tekst, hint, fasit, tittel=None):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    title = tittel or f"Oppgave {oid}"
    path.write_text(
        f"---\nid: \"{oid}\"\ntittel: \"{title}\"\n---\n\n{tekst.strip()}\n\n"
        f"## Hint\n\n{hint.strip()}\n\n## Fasit\n\n{fasit.strip()}\n",
        encoding="utf-8",
    )
    print("  wrote", path.relative_to(ROOT))


def main():
    tasks = []

    # ── 2A Like ledd og parenteser ────────────────────────────
    tasks += [
        (
            "oppgaver/kap2-algebra-og-monstre/2A/2.17.md",
            "2.17",
            r"""Trekk sammen like ledd:

**a)** $7x - 2 + 3x + 8$

**b)** $5a - 3b + a + 7b$

**c)** $-2(3x - 4)$""",
            "Samle $x$-ledd, $a$-ledd og $b$-ledd for seg. Husk å gange inn tallet foran parentesen med begge leddene inni.",
            r"""**a)**
$7x - 2 + 3x + 8 = 7x + 3x - 2 + 8 = 10x + 6$

**Svar:** $10x + 6$

[STEG]

**b)**
$5a - 3b + a + 7b = 5a + a - 3b + 7b = 6a + 4b$

**Svar:** $6a + 4b$

[STEG]

**c)**
$-2(3x - 4) = -2 \cdot 3x - 2 \cdot (-4) = -6x + 8$

**Svar:** $-6x + 8$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2A/2.18.md",
            "2.18",
            r"""Løs opp parentesene og trekk sammen:

**a)** $2(x + 1) + 3(x - 4)$

**b)** $4 - (2x + 1)$

**c)** En rektangulær platting har sider $x + 3$ og $x$. Skriv et forenklet uttrykk for omkretsen.""",
            "Minus foran en parentes bytter fortegn på alle ledd inni. Omkretsen av et rektangel er $2l + 2b$.",
            r"""**a)**
$2(x + 1) + 3(x - 4) = 2x + 2 + 3x - 12 = 5x - 10$

**Svar:** $5x - 10$

[STEG]

**b)**
$4 - (2x + 1) = 4 - 2x - 1 = 3 - 2x$

**Svar:** $3 - 2x$

[STEG]

**c)**
$O = 2(x + 3) + 2x = 2x + 6 + 2x = 4x + 6$

**Svar:** $4x + 6$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2A/2.19.md",
            "2.19",
            r"""Regn ut og trekk sammen:

**a)** $(x + 2)(x + 3)$

**b)** $(2x - 1)(x + 4)$

**c)** $x(x - 5) - 3(x - 5)$""",
            "Bruk den distributive loven: hvert ledd i den første parentesen ganges med hvert ledd i den andre.",
            r"""**a)**
$(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$

**Svar:** $x^2 + 5x + 6$

[STEG]

**b)**
$(2x - 1)(x + 4) = 2x^2 + 8x - x - 4 = 2x^2 + 7x - 4$

**Svar:** $2x^2 + 7x - 4$

[STEG]

**c)**
$x(x - 5) - 3(x - 5) = x^2 - 5x - 3x + 15 = x^2 - 8x + 15$

**Svar:** $x^2 - 8x + 15$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2A/2.20.md",
            "2.20",
            r"""En elev skriver $3(x - 2) + x = 3x - 2 + x = 4x - 2$.

**a)** Hvor er feilen?

**b)** Hva blir det riktige svaret?

**c)** Sett $x = 4$ inn i både det opprinnelige uttrykket og elevens svar. Bekreft at de ikke er like.""",
            "Tallet utenfor parentesen skal ganges med *alle* leddene inni, også tallet $-2$.",
            r"""**a)**
Eleven ganger $3$ bare med $x$, og glemmer $3 \cdot (-2) = -6$. Feilen er at $-2$ ikke blir multiplisert med $3$.

**Svar:** $3$ er ikke ganget inn med $-2$.

[STEG]

**b)**
$3(x - 2) + x = 3x - 6 + x = 4x - 6$

**Svar:** $4x - 6$

[STEG]

**c)**
Opprinnelig: $3(4 - 2) + 4 = 3 \cdot 2 + 4 = 10$.
Elevens uttrykk: $4 \cdot 4 - 2 = 14$.
Riktig forenkling: $4 \cdot 4 - 6 = 10$. Elevens svar stemmer ikke.

**Svar:** Opprinnelig gir $10$, elevens $14$.""",
        ),
        # ── 2B Kvadratsetninger ──
        (
            "oppgaver/kap2-algebra-og-monstre/2B/2.21.md",
            "2.21",
            r"""Bruk kvadratsetningene:

**a)** $(x + 7)^2$

**b)** $(y - 3)^2$

**c)** $(5 + a)(5 - a)$""",
            "$(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, $(a+b)(a-b) = a^2 - b^2$.",
            r"""**a)**
$(x + 7)^2 = x^2 + 2 \cdot x \cdot 7 + 7^2 = x^2 + 14x + 49$

**Svar:** $x^2 + 14x + 49$

[STEG]

**b)**
$(y - 3)^2 = y^2 - 2 \cdot y \cdot 3 + 9 = y^2 - 6y + 9$

**Svar:** $y^2 - 6y + 9$

[STEG]

**c)**
$(5 + a)(5 - a) = 5^2 - a^2 = 25 - a^2$

**Svar:** $25 - a^2$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2B/2.22.md",
            "2.22",
            r"""Regn ut uten kalkulator ved hjelp av kvadratsetninger:

**a)** $103^2$

**b)** $98 \cdot 102$

**c)** $49^2$""",
            "Skriv tallene som $100 + 3$, $100 - 2$ og $100 + 2$, eller $50 - 1$.",
            r"""**a)**
$103^2 = (100 + 3)^2 = 100^2 + 2 \cdot 100 \cdot 3 + 3^2 = 10000 + 600 + 9 = 10609$

**Svar:** $10609$

[STEG]

**b)**
$98 \cdot 102 = (100 - 2)(100 + 2) = 100^2 - 2^2 = 10000 - 4 = 9996$

**Svar:** $9996$

[STEG]

**c)**
$49^2 = (50 - 1)^2 = 2500 - 100 + 1 = 2401$

**Svar:** $2401$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2B/2.23.md",
            "2.23",
            r"""Forenkle:

**a)** $(2x - 1)^2$

**b)** $(2x - 1)^2 - (2x + 1)(2x - 1)$

**c)** $(x + y)^2 - (x - y)^2$""",
            "Regn ut hver kvadratsetning for seg, og trekk deretter sammen like ledd.",
            r"""**a)**
$(2x - 1)^2 = 4x^2 - 4x + 1$

**Svar:** $4x^2 - 4x + 1$

[STEG]

**b)**
$(2x - 1)^2 - (2x + 1)(2x - 1) = (4x^2 - 4x + 1) - (4x^2 - 1) = 4x^2 - 4x + 1 - 4x^2 + 1 = -4x + 2$

**Svar:** $-4x + 2$

[STEG]

**c)**
$(x + y)^2 - (x - y)^2 = (x^2 + 2xy + y^2) - (x^2 - 2xy + y^2) = x^2 + 2xy + y^2 - x^2 + 2xy - y^2 = 4xy$

**Svar:** $4xy$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2B/2.24.md",
            "2.24",
            r"""Regn ut eksakt:

**a)** $(\sqrt{7} - 1)(\sqrt{7} + 1)$

**b)** $(\sqrt{5} + 2)^2$

**c)** $(3 - \sqrt{2})^2$""",
            "Tredje kvadratsetning fjerner kvadratrot når du ganger konjugatet. Husk $2ab$ i de to første.",
            r"""**a)**
$(\sqrt{7} - 1)(\sqrt{7} + 1) = 7 - 1 = 6$

**Svar:** $6$

[STEG]

**b)**
$(\sqrt{5} + 2)^2 = 5 + 4\sqrt{5} + 4 = 9 + 4\sqrt{5}$

**Svar:** $9 + 4\sqrt{5}$

[STEG]

**c)**
$(3 - \sqrt{2})^2 = 9 - 6\sqrt{2} + 2 = 11 - 6\sqrt{2}$

**Svar:** $11 - 6\sqrt{2}$""",
        ),
        # ── 2C Felles faktor ──
        (
            "oppgaver/kap2-algebra-og-monstre/2C/2.25.md",
            "2.25",
            r"""Sett felles faktor utenfor parentes:

**a)** $6x + 9$

**b)** $4x^2 - 10x$

**c)** $12ab - 18a$""",
            "Finn det største tallet (og de bokstavene) som går opp i *alle* ledd.",
            r"""**a)**
$6x + 9 = 3(2x + 3)$

**Svar:** $3(2x + 3)$

[STEG]

**b)**
$4x^2 - 10x = 2x(2x - 5)$

**Svar:** $2x(2x - 5)$

[STEG]

**c)**
$12ab - 18a = 6a(2b - 3)$

**Svar:** $6a(2b - 3)$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2C/2.26.md",
            "2.26",
            r"""Faktoriser ved å løfte ut felles binomial:

**a)** $x(x + 5) + 2(x + 5)$

**b)** $3(y - 1) - x(y - 1)$

**c)** $a(a - 4) - 3(a - 4)$""",
            "Parentesen som står i begge ledd, kan løftes ut som felles faktor.",
            r"""**a)**
$x(x + 5) + 2(x + 5) = (x + 5)(x + 2)$

**Svar:** $(x + 5)(x + 2)$

[STEG]

**b)**
$3(y - 1) - x(y - 1) = (y - 1)(3 - x)$

**Svar:** $(y - 1)(3 - x)$

[STEG]

**c)**
$a(a - 4) - 3(a - 4) = (a - 4)(a - 3)$

**Svar:** $(a - 4)(a - 3)$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2C/2.27.md",
            "2.27",
            r"""**a)** Faktoriser $2\pi r + 2\pi h$.

**b)** Omkretsen av en sirkel er $O = 2\pi r$. Skriv $2\pi r + 2\pi h$ som $O$ ganger et uttrykk.

**c)** Når $r = 3$ og $h = 5$, regn ut verdien av det faktoriserte uttrykket (la $\pi$ stå).""",
            "Både $2$ og $\pi$ går opp i begge ledd.",
            r"""**a)**
$2\pi r + 2\pi h = 2\pi(r + h)$

**Svar:** $2\pi(r + h)$

[STEG]

**b)**
$2\pi r + 2\pi h = 2\pi r\left(1 + \frac{h}{r}\right) = O\left(1 + \frac{h}{r}\right)$, eller enklere: $O \cdot \frac{r+h}{r}$.
Vanligst: $2\pi(r + h) = \frac{O}{r}(r + h)$.

En ryddig formulering: $2\pi(r + h) = O \cdot \frac{r + h}{r}$.

**Svar:** $O \cdot \dfrac{r + h}{r}$

[STEG]

**c)**
$2\pi(3 + 5) = 2\pi \cdot 8 = 16\pi$

**Svar:** $16\pi$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2C/2.28.md",
            "2.28",
            r"""Vis ved faktorisering at:

**a)** $\sqrt{18} - \sqrt{8} = \sqrt{2}$

**b)** $\sqrt{50} + \sqrt{8} = 7\sqrt{2}$

**c)** $4\sqrt{12} - 2\sqrt{27} = 2\sqrt{3}$""",
            "Trekk ut kvadrattall under roten: $\sqrt{18} = \sqrt{9 \cdot 2} = 3\sqrt{2}$.",
            r"""**a)**
$\sqrt{18} - \sqrt{8} = \sqrt{9 \cdot 2} - \sqrt{4 \cdot 2} = 3\sqrt{2} - 2\sqrt{2} = \sqrt{2}$

**Svar:** Vist, likheten stemmer.

[STEG]

**b)**
$\sqrt{50} + \sqrt{8} = 5\sqrt{2} + 2\sqrt{2} = 7\sqrt{2}$

**Svar:** Vist.

[STEG]

**c)**
$4\sqrt{12} - 2\sqrt{27} = 4 \cdot 2\sqrt{3} - 2 \cdot 3\sqrt{3} = 8\sqrt{3} - 6\sqrt{3} = 2\sqrt{3}$

**Svar:** Vist.""",
        ),
        # ── 2D Faktorisering kvadrat ──
        (
            "oppgaver/kap2-algebra-og-monstre/2D/2.29.md",
            "2.29",
            r"""Faktoriser:

**a)** $x^2 - 49$

**b)** $x^2 + 6x + 9$

**c)** $4x^2 - 12x + 9$""",
            "Differanse av to kvadrat: $a^2 - b^2 = (a-b)(a+b)$. Fullstendig kvadrat: $a^2 \pm 2ab + b^2 = (a \pm b)^2$.",
            r"""**a)**
$x^2 - 49 = (x - 7)(x + 7)$

**Svar:** $(x - 7)(x + 7)$

[STEG]

**b)**
$x^2 + 6x + 9 = (x + 3)^2$

**Svar:** $(x + 3)^2$

[STEG]

**c)**
$4x^2 - 12x + 9 = (2x - 3)^2$

**Svar:** $(2x - 3)^2$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2D/2.30.md",
            "2.30",
            r"""Faktoriser:

**a)** $x^2 - 5x + 6$

**b)** $x^2 + x - 12$

**c)** $2x^2 + 5x - 3$""",
            "Finn to tall med produkt lik konstantleddet og sum lik $x$-koeffisienten. I **c)** kan du prøve $(2x + a)(x + b)$.",
            r"""**a)**
To tall med produkt $6$ og sum $-5$: $-2$ og $-3$.
$x^2 - 5x + 6 = (x - 2)(x - 3)$

**Svar:** $(x - 2)(x - 3)$

[STEG]

**b)**
Produkt $-12$, sum $1$: $4$ og $-3$.
$x^2 + x - 12 = (x + 4)(x - 3)$

**Svar:** $(x + 4)(x - 3)$

[STEG]

**c)**
$(2x - 1)(x + 3) = 2x^2 + 6x - x - 3 = 2x^2 + 5x - 3$

**Svar:** $(2x - 1)(x + 3)$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2D/2.31.md",
            "2.31",
            r"""**a)** Hvilket tall må stå i $\square$ for at $x^2 - 12x + \square$ skal bli et fullstendig kvadrat?

**b)** Faktoriser deretter uttrykket.

**c)** Er $x^2 - 12x + 20$ et fullstendig kvadrat? Begrunn.""",
            "I $(x - a)^2 = x^2 - 2ax + a^2$ er konstantleddet $a^2$ der $2a$ er koeffisienten foran $x$.",
            r"""**a)**
$2a = 12$, så $a = 6$ og $a^2 = 36$.

**Svar:** $36$

[STEG]

**b)**
$x^2 - 12x + 36 = (x - 6)^2$

**Svar:** $(x - 6)^2$

[STEG]

**c)**
Nei. $6^2 = 36 \neq 20$. (Uttrykket kan likevel faktoriseres som $(x-2)(x-10)$, men det er *ikke* et kvadrat.)

**Svar:** Nei, konstantleddet skulle vært $36$.""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2D/2.32.md",
            "2.32",
            r"""**a)** Faktoriser $25 - x^2$.

**b)** Faktoriser $9x^2 - 1$.

**c)** Faktoriser $x^4 - 16$ (hint: se $x^4$ som $(x^2)^2$).""",
            "Alle tre er differanse av to kvadrat.",
            r"""**a)**
$25 - x^2 = (5 - x)(5 + x)$

**Svar:** $(5 - x)(5 + x)$

[STEG]

**b)**
$9x^2 - 1 = (3x - 1)(3x + 1)$

**Svar:** $(3x - 1)(3x + 1)$

[STEG]

**c)**
$x^4 - 16 = (x^2 - 4)(x^2 + 4) = (x - 2)(x + 2)(x^2 + 4)$

**Svar:** $(x - 2)(x + 2)(x^2 + 4)$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2D/2.33.md",
            "2.33",
            r"""En kvadratisk ramme har ytre side $x + 2$ og indre side $x$.

**a)** Skriv et uttrykk for arealet av selve rammen (det som er igjen når det indre kvadratet er fjernet).

**b)** Faktoriser uttrykket.

**c)** Hvor stort er rammearealet når $x = 6$?""",
            "Arealet av rammen er ytre kvadrat minus indre kvadrat. Bruk $a^2 - b^2$.",
            r"""**a)**
$A = (x + 2)^2 - x^2$

**Svar:** $(x + 2)^2 - x^2$

[STEG]

**b)**
$(x + 2)^2 - x^2 = x^2 + 4x + 4 - x^2 = 4x + 4 = 4(x + 1)$
(eller direkte: $((x+2) - x)((x+2)+x) = 2(2x + 2) = 4(x + 1)$)

**Svar:** $4(x + 1)$

[STEG]

**c)**
$4(6 + 1) = 28$

**Svar:** $28$""",
        ),
        # ── 2E Rasjonale uttrykk ──
        (
            "oppgaver/kap2-algebra-og-monstre/2E/2.34.md",
            "2.34",
            r"""Forkort så langt det går:

**a)** $\dfrac{6x - 9}{3}$

**b)** $\dfrac{x^2 - 9}{x - 3}$

**c)** $\dfrac{2x}{4x}$""",
            "Faktoriser teller og nevner først. Du kan forkorte felles faktorer, men ikke ledd som bare er addert.",
            r"""**a)**
$\dfrac{6x - 9}{3} = \dfrac{3(2x - 3)}{3} = 2x - 3$

**Svar:** $2x - 3$

[STEG]

**b)**
$\dfrac{x^2 - 9}{x - 3} = \dfrac{(x - 3)(x + 3)}{x - 3} = x + 3$ (for $x \neq 3$)

**Svar:** $x + 3$

[STEG]

**c)**
$\dfrac{2x}{4x} = \dfrac{2}{4} = \dfrac{1}{2}$ (for $x \neq 0$)

**Svar:** $\dfrac{1}{2}$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2E/2.35.md",
            "2.35",
            r"""Trekk sammen:

**a)** $\dfrac{1}{x} + \dfrac{2}{x}$

**b)** $\dfrac{3}{2x} + \dfrac{1}{x}$

**c)** $\dfrac{2}{x} - \dfrac{1}{2x}$""",
            "Fellesnevner i **b)** og **c)** er $2x$.",
            r"""**a)**
$\dfrac{1}{x} + \dfrac{2}{x} = \dfrac{3}{x}$

**Svar:** $\dfrac{3}{x}$

[STEG]

**b)**
$\dfrac{3}{2x} + \dfrac{1}{x} = \dfrac{3}{2x} + \dfrac{2}{2x} = \dfrac{5}{2x}$

**Svar:** $\dfrac{5}{2x}$

[STEG]

**c)**
$\dfrac{2}{x} - \dfrac{1}{2x} = \dfrac{4}{2x} - \dfrac{1}{2x} = \dfrac{3}{2x}$

**Svar:** $\dfrac{3}{2x}$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2E/2.36.md",
            "2.36",
            r"""En elev skriver $\dfrac{x + 2}{2} = x + 1$.

**a)** Vis at det er feil ved å sette inn $x = 4$.

**b)** Forkort uttrykket riktig.

**c)** For hvilken $x$ *ville* elevens regel ha gitt samme verdi som det opprinnelige uttrykket?""",
            "Du kan bare forkorte faktorer, ikke enkeltledd i en sum. Prøv med et tall.",
            r"""**a)**
Venstre: $\dfrac{4 + 2}{2} = 3$. Høyre: $4 + 1 = 5$. $3 \neq 5$, så påstanden er feil.

**Svar:** Med $x = 4$ får vi $3 \neq 5$.

[STEG]

**b)**
$\dfrac{x + 2}{2} = \dfrac{x}{2} + 1$

**Svar:** $\dfrac{x}{2} + 1$

[STEG]

**c)**
$\dfrac{x + 2}{2} = x + 1 \Rightarrow x + 2 = 2x + 2 \Rightarrow 0 = x$. Bare for $x = 0$.

**Svar:** Bare når $x = 0$.""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2E/2.37.md",
            "2.37",
            r"""Trekk sammen og forkort:

**a)** $\dfrac{x}{4} + \dfrac{x}{6}$

**b)** $\dfrac{2}{x + 1} + \dfrac{3}{x + 1}$

**c)** $\dfrac{1}{x} + \dfrac{1}{x + 1}$""",
            "Fellesnevner i **a)** er $12$. I **c)** er fellesnevneren $x(x + 1)$.",
            r"""**a)**
$\dfrac{x}{4} + \dfrac{x}{6} = \dfrac{3x}{12} + \dfrac{2x}{12} = \dfrac{5x}{12}$

**Svar:** $\dfrac{5x}{12}$

[STEG]

**b)**
$\dfrac{2}{x + 1} + \dfrac{3}{x + 1} = \dfrac{5}{x + 1}$

**Svar:** $\dfrac{5}{x + 1}$

[STEG]

**c)**
$\dfrac{1}{x} + \dfrac{1}{x + 1} = \dfrac{x + 1 + x}{x(x + 1)} = \dfrac{2x + 1}{x(x + 1)}$

**Svar:** $\dfrac{2x + 1}{x(x + 1)}$""",
        ),
        # ── 2F Formler og figurtall ──
        (
            "oppgaver/kap2-algebra-og-monstre/2F/2.38.md",
            "2.38",
            r"""Omkretsen av en sirkel er $O = 2\pi r$.

**a)** Isoler $r$.

**b)** Finn $r$ når $O = 10\pi$.

**c)** Isoler $\pi$ i formelen.""",
            "Del på det som står sammen med den ukjente.",
            r"""**a)**
$O = 2\pi r \Rightarrow r = \dfrac{O}{2\pi}$

**Svar:** $r = \dfrac{O}{2\pi}$

[STEG]

**b)**
$r = \dfrac{10\pi}{2\pi} = 5$

**Svar:** $5$

[STEG]

**c)**
$\pi = \dfrac{O}{2r}$

**Svar:** $\pi = \dfrac{O}{2r}$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2F/2.39.md",
            "2.39",
            r"""Omkretsen av et rektangel er $P = 2\ell + 2b$.

**a)** Isoler $\ell$.

**b)** Når $P = 40$ og $b = 7$, finn $\ell$.

**c)** Isoler $b$ i $A = \ell \cdot b$.""",
            "Trekk fra $2b$ først, og del deretter på $2$.",
            r"""**a)**
$P = 2\ell + 2b \Rightarrow P - 2b = 2\ell \Rightarrow \ell = \dfrac{P - 2b}{2}$

**Svar:** $\ell = \dfrac{P - 2b}{2}$

[STEG]

**b)**
$\ell = \dfrac{40 - 14}{2} = 13$

**Svar:** $13$

[STEG]

**c)**
$b = \dfrac{A}{\ell}$

**Svar:** $b = \dfrac{A}{\ell}$""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2F/2.40.md",
            "2.40",
            r"""Trekanttallene er $1,\ 3,\ 6,\ 10,\ 15,\ \dots$

**a)** Finn de to neste leddene.

**b)** Beskriv mønsteret med ord.

**c)** En formel er $T_n = \dfrac{n(n+1)}{2}$. Sjekk at den stemmer for $n = 4$ og $n = 5$.""",
            "Differansen øker med $1$ hver gang: $+2$, $+3$, $+4$, $+5$, $\dots$",
            r"""**a)**
Neste differanser er $+6$ og $+7$: $15 + 6 = 21$ og $21 + 7 = 28$.

**Svar:** $21$ og $28$

[STEG]

**b)**
Det $n$-te trekanttallet er summen av de $n$ første naturlige tallene. Differansen mellom leddene øker med $1$ for hvert steg.

**Svar:** Summen $1 + 2 + \cdots + n$.

[STEG]

**c)**
$T_4 = \dfrac{4 \cdot 5}{2} = 10$, $T_5 = \dfrac{5 \cdot 6}{2} = 15$. Begge matcher listen.

**Svar:** Formelen stemmer for $n = 4$ og $n = 5$.""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2F/2.41.md",
            "2.41",
            r"""Følgen av partall er $2,\ 4,\ 6,\ 8,\ \dots$

**a)** Skriv en formel for det $n$-te partallet.

**b)** Hva er det $20$. partallet?

**c)** Vis at summen av det $n$-te og det $(n+1)$-te partallet er $4n + 2$.""",
            "Det $n$-te partallet er $2n$.",
            r"""**a)**
$a_n = 2n$

**Svar:** $2n$

[STEG]

**b)**
$a_{20} = 40$

**Svar:** $40$

[STEG]

**c)**
$2n + 2(n + 1) = 2n + 2n + 2 = 4n + 2$

**Svar:** Vist.""",
        ),
        (
            "oppgaver/kap2-algebra-og-monstre/2F/2.42.md",
            "2.42",
            r"""Farten er $v = \dfrac{s}{t}$, der $s$ er strekning og $t$ er tid.

**a)** Isoler $s$.

**b)** Isoler $t$.

**c)** En sykkel holder $v = 8$ m/s i $t = 15$ s. Finn $s$.""",
            "Gang med $t$ for å isolere $s$. Del $s$ på $v$ for å isolere $t$.",
            r"""**a)**
$s = v \cdot t$

**Svar:** $s = vt$

[STEG]

**b)**
$t = \dfrac{s}{v}$

**Svar:** $t = \dfrac{s}{v}$

[STEG]

**c)**
$s = 8 \cdot 15 = 120$ m

**Svar:** $120$ m""",
        ),
    ]

    # ── Kapittel 3 ──────────────────────────────────────────
    tasks += [
        (
            "oppgaver/kap3-likninger-og-ulikheter/3A/3.23.md",
            "3.23",
            r"""Løs likningene og sett prøve:

**a)** $3x + 5 = 20$

**b)** $2(x - 4) = 10$

**c)** $5 - x = 2x + 8$""",
            "Samle $x$ på én side og tall på den andre. Bytt fortegn når du flytter over likhetstegnet.",
            r"""**a)**
$3x = 15 \Rightarrow x = 5$. Prøve: $3 \cdot 5 + 5 = 20$.

**Svar:** $x = 5$

[STEG]

**b)**
$2x - 8 = 10 \Rightarrow 2x = 18 \Rightarrow x = 9$. Prøve: $2(9 - 4) = 10$.

**Svar:** $x = 9$

[STEG]

**c)**
$5 - 8 = 2x + x \Rightarrow -3 = 3x \Rightarrow x = -1$.
Prøve: VS $5 - (-1) = 6$, HS $2(-1) + 8 = 6$.

**Svar:** $x = -1$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3A/3.24.md",
            "3.24",
            r"""Løs:

**a)** $\dfrac{x}{4} + \dfrac{x}{6} = 5$

**b)** $\dfrac{2x - 1}{3} = 3$

**c)** $4 - \dfrac{x}{2} = x$""",
            "Gang gjennom med fellesnevneren for å kvitte deg med brøkene.",
            r"""**a)**
Fellesnevner $12$: $3x + 2x = 60 \Rightarrow 5x = 60 \Rightarrow x = 12$.

**Svar:** $x = 12$

[STEG]

**b)**
$2x - 1 = 9 \Rightarrow 2x = 10 \Rightarrow x = 5$.

**Svar:** $x = 5$

[STEG]

**c)**
Gang med $2$: $8 - x = 2x \Rightarrow 8 = 3x \Rightarrow x = \dfrac{8}{3}$.

**Svar:** $x = \dfrac{8}{3}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3A/3.25.md",
            "3.25",
            r"""En kino selger barnebilletter til $80$ kr og voksenbilletter til $140$ kr. Det ble solgt $12$ billetter totalt, og inntekten ble $1320$ kr.

**a)** Sett $b$ som antall barnebilletter. Skriv en likning.

**b)** Hvor mange barnebilletter og voksenbilletter ble solgt?""",
            "Antall voksenbilletter er $12 - b$. Sett opp uttrykk for totalpris.",
            r"""**a)**
$80b + 140(12 - b) = 1320$

**Svar:** $80b + 140(12 - b) = 1320$

[STEG]

**b)**
$80b + 1680 - 140b = 1320$
$-60b = 1320 - 1680 = -360$
$b = 6$. Da er voksenbilletter $6$.

Prøve: $80 \cdot 6 + 140 \cdot 6 = 480 + 840 = 1320$.

**Svar:** $6$ barne- og $6$ voksenbilletter.""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3A/3.26.md",
            "3.26",
            r"""Løs og sett prøve: $3(2x - 1) - x = 4(x + 2)$""",
            "Løs opp parentesene først, samle $x$-ledd, så tall.",
            r"""$6x - 3 - x = 4x + 8$

$5x - 3 = 4x + 8$

$5x - 4x = 8 + 3$

$x = 11$

[STEG]

**Prøve:** VS $3(22 - 1) - 11 = 63 - 11 = 52$. HS $4(11 + 2) = 52$.

**Svar:** $x = 11$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3B/3.27.md",
            "3.27",
            r"""Arealet av en sirkel er $A = \pi r^2$.

**a)** Isoler $r$ (husk at radius er positiv).

**b)** Finn $r$ når $A = 36\pi$.

**c)** Isoler $\pi$.""",
            "Del på $\pi$, og ta kvadratrot. Velg den positive roten.",
            r"""**a)**
$r = \sqrt{\dfrac{A}{\pi}}$

**Svar:** $r = \sqrt{\dfrac{A}{\pi}}$

[STEG]

**b)**
$r = \sqrt{\dfrac{36\pi}{\pi}} = \sqrt{36} = 6$

**Svar:** $6$

[STEG]

**c)**
$\pi = \dfrac{A}{r^2}$

**Svar:** $\pi = \dfrac{A}{r^2}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3B/3.28.md",
            "3.28",
            r"""Newtons andre lov: $F = ma$.

**a)** Isoler $m$.

**b)** Isoler $a$.

**c)** Finn $a$ når $F = 24$ og $m = 6$.""",
            "Del begge sider på den størrelsen du ikke skal isolere.",
            r"""**a)**
$m = \dfrac{F}{a}$

**Svar:** $m = \dfrac{F}{a}$

[STEG]

**b)**
$a = \dfrac{F}{m}$

**Svar:** $a = \dfrac{F}{m}$

[STEG]

**c)**
$a = \dfrac{24}{6} = 4$

**Svar:** $4$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3B/3.29.md",
            "3.29",
            r"""For to motstander i parallell gjelder $\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2}$.

**a)** Trekk sammen høyre side.

**b)** Isoler $R$.

**c)** Regn ut $R$ når $R_1 = 6$ og $R_2 = 3$.""",
            "Fellesnevner på høyre side er $R_1 R_2$. Deretter snur du brøken.",
            r"""**a)**
$\dfrac{1}{R_1} + \dfrac{1}{R_2} = \dfrac{R_2 + R_1}{R_1 R_2}$

**Svar:** $\dfrac{R_1 + R_2}{R_1 R_2}$

[STEG]

**b)**
$\dfrac{1}{R} = \dfrac{R_1 + R_2}{R_1 R_2} \Rightarrow R = \dfrac{R_1 R_2}{R_1 + R_2}$

**Svar:** $R = \dfrac{R_1 R_2}{R_1 + R_2}$

[STEG]

**c)**
$R = \dfrac{6 \cdot 3}{6 + 3} = \dfrac{18}{9} = 2$

**Svar:** $2$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3B/3.30.md",
            "3.30",
            r"""Temperaturomregning: $C = \dfrac{5}{9}(F - 32)$.

**a)** Isoler $F$.

**b)** Finn $F$ når $C = 20$.

**c)** Finn $C$ når $F = 32$.""",
            "Gang med $\dfrac{9}{5}$ først, og legg deretter til $32$.",
            r"""**a)**
$\dfrac{9}{5}C = F - 32 \Rightarrow F = \dfrac{9}{5}C + 32$

**Svar:** $F = \dfrac{9}{5}C + 32$

[STEG]

**b)**
$F = \dfrac{9}{5} \cdot 20 + 32 = 36 + 32 = 68$

**Svar:** $68$

[STEG]

**c)**
$C = \dfrac{5}{9}(32 - 32) = 0$

**Svar:** $0$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3C/3.31.md",
            "3.31",
            r"""Løs:

**a)** $(x - 2)(x + 5) = 0$

**b)** $x^2 - 9 = 0$

**c)** $3x^2 = 12$""",
            "Produktregelen: $A \cdot B = 0$ gir $A = 0$ eller $B = 0$. Husk begge røttene når du tar kvadratrot.",
            r"""**a)**
$x - 2 = 0$ eller $x + 5 = 0 \Rightarrow x = 2$ eller $x = -5$.

**Svar:** $x = 2 \vee x = -5$

[STEG]

**b)**
$x^2 = 9 \Rightarrow x = 3$ eller $x = -3$.

**Svar:** $x = \pm 3$

[STEG]

**c)**
$x^2 = 4 \Rightarrow x = \pm 2$.

**Svar:** $x = \pm 2$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3C/3.32.md",
            "3.32",
            r"""Løs ved produktregelen:

**a)** $x^2 + 5x = 0$

**b)** $2x(x - 3) = 0$

**c)** $x^2 = 7$ (eksakt svar)""",
            "Løft $x$ utenfor parentes i **a)**. I **c)** lar du kvadratroten stå.",
            r"""**a)**
$x(x + 5) = 0 \Rightarrow x = 0$ eller $x = -5$.

**Svar:** $x = 0 \vee x = -5$

[STEG]

**b)**
$2x = 0$ eller $x - 3 = 0 \Rightarrow x = 0$ eller $x = 3$.

**Svar:** $x = 0 \vee x = 3$

[STEG]

**c)**
$x = \pm \sqrt{7}$

**Svar:** $x = \pm \sqrt{7}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3C/3.33.md",
            "3.33",
            r"""**a)** Løs $x^2 = -4$ i de reelle tallene. Begrunn.

**b)** Løs $5x^2 = 0$.

**c)** Løs $(x + 1)^2 = 16$.""",
            "Et kvadrat er aldri negativt i $\mathbb{R}$. $(x+1)^2 = 16$ gir to muligheter.",
            r"""**a)**
Ingen reelle $x$ oppfyller $x^2 = -4$, fordi $x^2 \geq 0$ for alle reelle $x$.
$L = \emptyset$

**Svar:** Ingen reell løsning

[STEG]

**b)**
$x^2 = 0 \Rightarrow x = 0$ (dobbelt rot, men én verdi).

**Svar:** $x = 0$

[STEG]

**c)**
$x + 1 = 4$ eller $x + 1 = -4 \Rightarrow x = 3$ eller $x = -5$.

**Svar:** $x = 3 \vee x = -5$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3D/3.34.md",
            "3.34",
            r"""Løs $x^2 - 5x + 6 = 0$ på to måter:

**a)** Ved faktorisering.

**b)** Ved abc-formelen.

**c)** Sett prøve på begge røttene.""",
            "Her er $a = 1$, $b = -5$, $c = 6$. Diskriminanten $D = b^2 - 4ac$.",
            r"""**a)**
$(x - 2)(x - 3) = 0 \Rightarrow x = 2$ eller $x = 3$.

**Svar:** $x = 2 \vee x = 3$

[STEG]

**b)**
$D = 25 - 24 = 1$, $x = \dfrac{5 \pm 1}{2}$, så $x = 3$ og $x = 2$. Samme svar.

**Svar:** $x = 2 \vee x = 3$

[STEG]

**c)**
$2^2 - 5 \cdot 2 + 6 = 4 - 10 + 6 = 0$. $3^2 - 15 + 6 = 0$. Begge passer.

**Svar:** Prøven stemmer.""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3D/3.35.md",
            "3.35",
            r"""Løs eksakt med abc-formelen: $x^2 + 4x + 1 = 0$""",
            "$a = 1$, $b = 4$, $c = 1$. Forenkle $\sqrt{12}$ hvis du får det — her blir $D = 12$? Sjekk: $16 - 4 = 12$. $\sqrt{12} = 2\sqrt{3}$.",
            r"""$D = 16 - 4 = 12 = 4 \cdot 3$

$x = \dfrac{-4 \pm \sqrt{12}}{2} = \dfrac{-4 \pm 2\sqrt{3}}{2} = -2 \pm \sqrt{3}$

[STEG]

**Svar:** $x = -2 + \sqrt{3}$ eller $x = -2 - \sqrt{3}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3D/3.36.md",
            "3.36",
            r"""Løs $2x^2 + x - 1 = 0$ med abc-formelen.""",
            "$a = 2$, $b = 1$, $c = -1$. $D = 1 + 8 = 9$.",
            r"""$D = 1 - 4 \cdot 2 \cdot (-1) = 1 + 8 = 9$

$x = \dfrac{-1 \pm 3}{4}$

$x = \dfrac{2}{4} = \dfrac{1}{2}$ eller $x = \dfrac{-4}{4} = -1$

[STEG]

**Svar:** $x = \dfrac{1}{2} \vee x = -1$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3D/3.37.md",
            "3.37",
            r"""**a)** Regn ut diskriminanten til $x^2 + 2x + 5 = 0$. Hvor mange reelle løsninger har likningen?

**b)** Hva må $k$ være for at $x^2 + kx + 9 = 0$ skal ha nøyaktig én løsning?

**c)** Løs $x^2 - 6x + 9 = 0$.""",
            "Antall reelle løsninger: $D > 0$ to, $D = 0$ én, $D < 0$ ingen. Én løsning krever $D = 0$.",
            r"""**a)**
$D = 4 - 20 = -16 < 0$. Ingen reelle løsninger.

**Svar:** $D = -16$, ingen reelle løsninger

[STEG]

**b)**
$D = k^2 - 36 = 0 \Rightarrow k = \pm 6$.

**Svar:** $k = 6$ eller $k = -6$

[STEG]

**c)**
$D = 36 - 36 = 0$, $x = \dfrac{6}{2} = 3$ (dobbelt rot).
Eller $(x - 3)^2 = 0$.

**Svar:** $x = 3$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3E/3.38.md",
            "3.38",
            r"""Løs. Oppgi verdier som *ikke* er tillatt.

**a)** $\dfrac{3}{x} = \dfrac{1}{2}$

**b)** $\dfrac{5}{x - 1} = 2$

**c)** $\dfrac{2}{x} + \dfrac{1}{x} = 6$""",
            "Nevneren kan ikke være $0$. Gang med nevneren for å fjerne brøken, og sjekk svaret etterpå.",
            r"""**a)**
$x \neq 0$. $3 \cdot 2 = x \Rightarrow x = 6$. Tillatt.

**Svar:** $x = 6$

[STEG]

**b)**
$x \neq 1$. $5 = 2(x - 1) \Rightarrow 5 = 2x - 2 \Rightarrow x = \dfrac{7}{2}$. Tillatt.

**Svar:** $x = \dfrac{7}{2}$

[STEG]

**c)**
$x \neq 0$. $\dfrac{3}{x} = 6 \Rightarrow x = \dfrac{1}{2}$. Tillatt.

**Svar:** $x = \dfrac{1}{2}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3E/3.39.md",
            "3.39",
            r"""Løs $\dfrac{x + 1}{x} = 3$. Husk å sjekke $x = 0$.""",
            "Gang med $x$ (som krever $x \neq 0$), og kontroller svaret i den opprinnelige likningen.",
            r"""$x \neq 0$.

$x + 1 = 3x \Rightarrow 1 = 2x \Rightarrow x = \dfrac{1}{2}$.

[STEG]

Prøve: $\dfrac{\frac{1}{2} + 1}{\frac{1}{2}} = \dfrac{\frac{3}{2}}{\frac{1}{2}} = 3$. Gyldig.

**Svar:** $x = \dfrac{1}{2}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3E/3.40.md",
            "3.40",
            r"""Løs $\dfrac{1}{x} + \dfrac{1}{x + 2} = \dfrac{3}{4}$.

Oppgi først hvilke $x$ som *ikke* er tillatt.""",
            "Fellesnevner $4x(x + 2)$. Gang gjennom og få en andregradslikning.",
            r"""Ikke tillatt: $x = 0$ og $x = -2$.

Gang med $4x(x + 2)$:
$4(x + 2) + 4x = 3x(x + 2)$
$4x + 8 + 4x = 3x^2 + 6x$
$0 = 3x^2 - 2x - 8$

[STEG]

$D = 4 + 96 = 100$, $x = \dfrac{2 \pm 10}{6}$
$x = 2$ eller $x = \dfrac{-8}{6} = -\dfrac{4}{3}$.
Begge er tillatt.

**Svar:** $x = 2 \vee x = -\dfrac{4}{3}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3E/3.41.md",
            "3.41",
            r"""En elev løser $\dfrac{1}{x - 2} = \dfrac{x}{x - 2}$ og får $x = 1$ og $x = 2$.

**a)** Hvilken av verdiene er en falsk løsning, og hvorfor?

**b)** Løs likningen riktig.""",
            "Du kan aldri ha $0$ i nevner. Gang med $x - 2$ bare hvis $x \neq 2$.",
            r"""**a)**
$x = 2$ gjør begge nevnere $0$. Uttrykket er ikke definert, så $x = 2$ er falsk.

**Svar:** $x = 2$ er falsk.

[STEG]

**b)**
For $x \neq 2$: $1 = x \Rightarrow x = 1$.
Prøve: $\dfrac{1}{1 - 2} = -1$ og $\dfrac{1}{1 - 2} = -1$. Gyldig.

**Svar:** $x = 1$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3E/3.42.md",
            "3.42",
            r"""Løs $\dfrac{2}{x + 3} + \dfrac{1}{x} = 1$.""",
            "Fellesnevner $x(x + 3)$. Sjekk $x \neq 0$ og $x \neq -3$ til slutt.",
            r"""Ikke tillatt: $x = 0$, $x = -3$.

$2x + (x + 3) = x(x + 3)$
$3x + 3 = x^2 + 3x$
$0 = x^2 - 3$
$x = \pm \sqrt{3}$

[STEG]

Begge er ulike $0$ og $-3$, så begge er gyldige.

**Svar:** $x = \sqrt{3} \vee x = -\sqrt{3}$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3F/3.43.md",
            "3.43",
            r"""**a)** Er $x = 2$ et nullpunkt for $f(x) = x^2 - 3x + 2$? Vis utregning.

**b)** Er $x = -1$ et nullpunkt for $g(x) = x^2 + x$?

**c)** Finn alle nullpunktene til $h(x) = x^2 - 4$.""",
            "Nullpunkt betyr $f(a) = 0$. Sett inn, eller faktoriser.",
            r"""**a)**
$f(2) = 4 - 6 + 2 = 0$. Ja.

**Svar:** Ja

[STEG]

**b)**
$g(-1) = 1 - 1 = 0$. Ja.

**Svar:** Ja

[STEG]

**c)**
$x^2 - 4 = (x - 2)(x + 2) = 0 \Rightarrow x = 2$ eller $x = -2$.

**Svar:** $x = \pm 2$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3F/3.44.md",
            "3.44",
            r"""Nullpunktfaktoriser:

**a)** $x^2 - x - 6$

**b)** $x^2 - 4x$

**c)** $2x^2 - 8$""",
            "Finn røttene, og skriv $a(x - r_1)(x - r_2)$. Husk $a$ foran hvis ledende koeffisient ikke er $1$.",
            r"""**a)**
Røtter $3$ og $-2$: $x^2 - x - 6 = (x - 3)(x + 2)$

**Svar:** $(x - 3)(x + 2)$

[STEG]

**b)**
$x(x - 4)$

**Svar:** $x(x - 4)$

[STEG]

**c)**
$2(x^2 - 4) = 2(x - 2)(x + 2)$

**Svar:** $2(x - 2)(x + 2)$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3G/3.45.md",
            "3.45",
            r"""Utfør polynomdivisjonen og skriv svaret som et produkt hvis det går opp:

**a)** $(x^2 - 5x + 6) : (x - 2)$

**b)** $(x^2 + 2x - 8) : (x + 4)$""",
            "Del ledd for ledd, eller bruk at hvis $x = a$ er rot, så går $x - a$ opp.",
            r"""**a)**
$x^2 - 5x + 6 = (x - 2)(x - 3)$, så kvotienten er $x - 3$.

**Svar:** $x - 3$, og $(x - 2)(x - 3)$

[STEG]

**b)**
$x^2 + 2x - 8 = (x + 4)(x - 2)$, kvotient $x - 2$.

**Svar:** $x - 2$""",
        ),
        (
            "oppgaver/kap3-likninger-og-ulikheter/3G/3.46.md",
            "3.46",
            r"""**a)** Utfør $(x^3 - 1) : (x - 1)$.

**b)** Kontroller ved å gange kvotienten med $x - 1$.

**c)** Hvorfor går divisjonen opp? (Hint: $1^3 - 1 = 0$.)""",
            "Polynomdivisjon, eller formelen $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ med $b = 1$.",
            r"""**a)**
$x^3 - 1 = (x - 1)(x^2 + x + 1)$, så kvotienten er $x^2 + x + 1$.

**Svar:** $x^2 + x + 1$

[STEG]

**b)**
$(x - 1)(x^2 + x + 1) = x^3 + x^2 + x - x^2 - x - 1 = x^3 - 1$. Stemmer.

**Svar:** Kontroll OK

[STEG]

**c)**
$x = 1$ er rot i $x^3 - 1$ fordi $1 - 1 = 0$. Da går $x - 1$ opp i polynomet (restsetningen).

**Svar:** Fordi $x = 1$ er et nullpunkt.""",
        ),
    ]

    for item in tasks:
        write_task(*item)

    # ── 3OP Øveprøve ──
    yml = ROOT / "oppgaver/kap3-likninger-og-ulikheter/3OP/_delkapittel.yml"
    yml.parent.mkdir(parents=True, exist_ok=True)
    yml.write_text('id: "3OP"\ntittel: "Øveprøve"\n', encoding="utf-8")
    print("  wrote", yml.relative_to(ROOT))

    write_task(
        "oppgaver/kap3-likninger-og-ulikheter/3OP/3.OP0.md",
        "3.OP0",
        """**Tid:** ca. 60–75 min  
**Hjelpemidler:** ingen (eller kun kladdeark)

**Instruks:** Vis mellomregning. Sett prøve der det er naturlig. Oppgaver med flere bokstaver teller hver for seg.

Prøven består av 10 oppgaver som dekker hovedtemaene i kapittel 3.""",
        "Les hele prøven først. Start med likningene du kjenner igjen, og ta abc-formelen og polynomdivisjon til slutt hvis du trenger tid.",
        "Dette er oversiktssiden. Gå videre til oppgave 1–10 for spørsmål og steg-for-steg-løsninger.",
        "Øveprøve · Kapittel 3 (oversikt)",
    )

    op = [
        (
            "3.OP1",
            "Oppgave 1 — Førstegradslikninger",
            r"""Løs og sett prøve:

**a)** $4x - 7 = 2x + 5$

**b)** $3(x + 2) = 2x + 11$

**c)** $\dfrac{x}{3} + \dfrac{x}{6} = 4$""",
            "Samle $x$ mot venstre og tall mot høyre. I **c)** er fellesnevner $6$.",
            r"""**a)**
$4x - 2x = 5 + 7 \Rightarrow 2x = 12 \Rightarrow x = 6$. Prøve: $24 - 7 = 12 + 5$.

**Svar:** $x = 6$

[STEG]

**b)**
$3x + 6 = 2x + 11 \Rightarrow x = 5$. Prøve: $3 \cdot 7 = 10 + 11$.

**Svar:** $x = 5$

[STEG]

**c)**
$2x + x = 24 \Rightarrow 3x = 24 \Rightarrow x = 8$.

**Svar:** $x = 8$""",
        ),
        (
            "3.OP2",
            "Oppgave 2 — Tekstlikning",
            r"""To søsken er til sammen $27$ år. Den eldste er $5$ år eldre enn den yngste.

**a)** Sett opp en likning.

**b)** Finn alderen til hver av dem.""",
            "La $y$ være den yngstes alder. Da er den eldste $y + 5$.",
            r"""**a)**
$y + (y + 5) = 27$

**Svar:** $2y + 5 = 27$

[STEG]

**b)**
$2y = 22 \Rightarrow y = 11$. Eldste: $16$.

**Svar:** $11$ og $16$ år""",
        ),
        (
            "3.OP3",
            "Oppgave 3 — Formelregning",
            r"""$v = \dfrac{s}{t}$ og $A = \dfrac{1}{2} g h$.

**a)** Isoler $t$ i den første formelen.

**b)** Isoler $h$ i den andre.

**c)** Finn $h$ når $A = 24$ og $g = 6$.""",
            "Gang vekk nevneren, og del deretter på det som står sammen med den ukjente.",
            r"""**a)**
$t = \dfrac{s}{v}$

**Svar:** $t = \dfrac{s}{v}$

[STEG]

**b)**
$2A = g h \Rightarrow h = \dfrac{2A}{g}$

**Svar:** $h = \dfrac{2A}{g}$

[STEG]

**c)**
$h = \dfrac{48}{6} = 8$

**Svar:** $8$""",
        ),
        (
            "3.OP4",
            "Oppgave 4 — Andregrad, produktregelen",
            r"""Løs:

**a)** $x(x - 6) = 0$

**b)** $x^2 - 16 = 0$

**c)** $x^2 + 3x = 0$""",
            "Produktregelen og differanse av to kvadrat.",
            r"""**a)** $x = 0$ eller $x = 6$.

**Svar:** $x = 0 \vee x = 6$

[STEG]

**b)** $x = \pm 4$.

**Svar:** $x = \pm 4$

[STEG]

**c)** $x(x + 3) = 0 \Rightarrow x = 0$ eller $x = -3$.

**Svar:** $x = 0 \vee x = -3$""",
        ),
        (
            "3.OP5",
            "Oppgave 5 — abc-formelen",
            r"""**a)** Løs $x^2 - 4x - 5 = 0$ med abc-formelen.

**b)** Hvor mange reelle løsninger har $x^2 + x + 1 = 0$? Begrunn med diskriminanten.""",
            "$D = b^2 - 4ac$. I **a)** er $a = 1$, $b = -4$, $c = -5$.",
            r"""**a)**
$D = 16 + 20 = 36$, $x = \dfrac{4 \pm 6}{2}$, så $x = 5$ eller $x = -1$.

**Svar:** $x = 5 \vee x = -1$

[STEG]

**b)**
$D = 1 - 4 = -3 < 0$. Ingen reelle løsninger.

**Svar:** Ingen reelle løsninger""",
        ),
        (
            "3.OP6",
            "Oppgave 6 — Rasjonal likning",
            r"""Løs $\dfrac{4}{x} = \dfrac{2}{x - 3}$. Oppgi verdier som ikke er tillatt, og sett prøve.""",
            "Kryssmultiplikasjon. $x \neq 0$ og $x \neq 3$.",
            r"""Ikke tillatt: $x = 0$ og $x = 3$.

$4(x - 3) = 2x \Rightarrow 4x - 12 = 2x \Rightarrow 2x = 12 \Rightarrow x = 6$.

[STEG]

Prøve: $\dfrac{4}{6} = \dfrac{2}{3}$ og $\dfrac{2}{6 - 3} = \dfrac{2}{3}$. Gyldig.

**Svar:** $x = 6$""",
        ),
        (
            "3.OP7",
            "Oppgave 7 — Falsk løsning",
            r"""Likningen $\dfrac{x}{x - 1} = \dfrac{1}{x - 1}$ «gir» $x = 1$ hvis man ganger med nevneren uten å tenke.

**a)** Hvorfor er $x = 1$ ikke en løsning?

**b)** Har likningen andre løsninger?""",
            "Nevneren $x - 1$ kan ikke være $0$. Etter å ha krevd $x \neq 1$, gjenstår en vanlig likning.",
            r"""**a)**
For $x = 1$ er nevneren $0$. Uttrykket er udefinert.

**Svar:** Nevneren blir $0$.

[STEG]

**b)**
For $x \neq 1$: $x = 1$, som er utelukket. Ingen løsning.
$L = \emptyset$

**Svar:** Nei, $L = \emptyset$""",
        ),
        (
            "3.OP8",
            "Oppgave 8 — Nullpunkt",
            r"""**a)** Vis at $x = -2$ er nullpunkt for $f(x) = x^2 - x - 6$.

**b)** Finn det andre nullpunktet.

**c)** Skriv $f(x)$ på faktorform.""",
            "Sett inn. Sum av røtter i $x^2 - x - 6$ er $1$.",
            r"""**a)**
$f(-2) = 4 + 2 - 6 = 0$.

**Svar:** Vist

[STEG]

**b)**
$(x + 2)(x - 3) = x^2 - x - 6$, så det andre nullpunktet er $3$.

**Svar:** $x = 3$

[STEG]

**c)**
$f(x) = (x + 2)(x - 3)$

**Svar:** $(x + 2)(x - 3)$""",
        ),
        (
            "3.OP9",
            "Oppgave 9 — Polynomdivisjon",
            r"""Utfør $(x^2 - 7x + 10) : (x - 2)$ og skriv polynomet som et produkt.""",
            "Sjekk om $x = 2$ er rot: $4 - 14 + 10 = 0$. Da går det opp.",
            r"""$x^2 - 7x + 10 = (x - 2)(x - 5)$

Kvotient $x - 5$.

[STEG]

**Svar:** $x - 5$, og $(x - 2)(x - 5)$""",
        ),
        (
            "3.OP10",
            "Oppgave 10 — Tekst med andregrad",
            r"""Et rektangel har areal $48$. Lengden er $2$ mer enn bredden $b$.

**a)** Sett opp en andregradslikning for $b$.

**b)** Finn sidene (begge positive).""",
            "$b(b + 2) = 48$. Løs $b^2 + 2b - 48 = 0$.",
            r"""**a)**
$b(b + 2) = 48 \Rightarrow b^2 + 2b - 48 = 0$

**Svar:** $b^2 + 2b - 48 = 0$

[STEG]

**b)**
$D = 4 + 192 = 196$, $b = \dfrac{-2 \pm 14}{2}$
$b = 6$ eller $b = -8$. Bredde må være positiv: $b = 6$, lengde $8$.

**Svar:** $6$ og $8$""",
        ),
    ]
    for oid, title, tekst, hint, fasit in op:
        write_task(
            f"oppgaver/kap3-likninger-og-ulikheter/3OP/{oid}.md",
            oid,
            tekst,
            hint,
            fasit,
            title,
        )

    print("done", len(tasks) + 1 + len(op), "content files plus yml")


if __name__ == "__main__":
    main()
