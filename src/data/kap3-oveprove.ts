import type { Delkapittel, Oppgave } from "./types";

function o(id: string, tittel: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

export const KAP3_OVEPROVE: Delkapittel = {
  id: "3OP",
  tittel: "Øveprøve",
  oppgaver: [
    o(
      "3.OP0",
      "Øveprøve · Kapittel 3 (oversikt)",
      "<strong>Tid:</strong> ca. 60–75 min<br><strong>Hjelpemidler:</strong> ingen (kun kladdeark)<br><br><strong>Instruks:</strong> Vis mellomregning. Sett prøve der det er naturlig. Oppgaver med flere bokstaver teller hver for seg.<br><br>Prøven dekker førstegradslikninger, formler, andregradslikninger, ABC-formelen, rasjonale likninger, ulikheter, proporsjoner og polynomdivisjon.",
      "Les hele prøven først. Begynn med det du mestrer, og kom tilbake til de tyngre oppgavene.",
      ["Dette er oversiktssiden. Gå videre til oppgave 1–10."],
    ),
    o(
      "3.OP1",
      "Oppgave 1 — Førstegradslikninger",
      "Løs likningene og sett prøve.<br><br><strong>a)</strong> $4x-7=2x+9$<br><br><strong>b)</strong> $3(x-4)=2(x+1)-5$<br><br><strong>c)</strong> $\\dfrac{x}{3}-\\dfrac{x}{5}=2$",
      "Samle $x$ på én side. I c) gang med fellesnevner $15$.",
      [
        "<strong>a)</strong> $4x-2x=9+7$, $2x=16$, $x=8$. Prøve: $32-7=16+9=25$.<br><strong>Svar:</strong> $x=8$",
        "<strong>b)</strong> $3x-12=2x+2-5$, $3x-12=2x-3$, $x=9$.<br><strong>Svar:</strong> $x=9$",
        "<strong>c)</strong> Gang med $15$: $5x-3x=30$, $2x=30$, $x=15$.<br><strong>Svar:</strong> $x=15$",
      ],
    ),
    o(
      "3.OP2",
      "Oppgave 2 — Fra tekst til likning",
      "Omkretsen av et rektangel er $64$ cm. Lengden er $4$ cm lenger enn tre ganger bredden.<br><br><strong>a)</strong> Sett opp en likning med $b$ som bredde.<br><br><strong>b)</strong> Finn sidene.",
      "Omkrets $2(l+b)=64$. Lengde $l=3b+4$.",
      [
        "<strong>a)</strong> $2((3b+4)+b)=64$, altså $2(4b+4)=64$.<br><strong>Svar:</strong> $2(4b+4)=64$ (eller $4b+4=32$)",
        "<strong>b)</strong> $4b+4=32$, $4b=28$, $b=7$. Lengde $3\\cdot 7+4=25$.<br><strong>Svar:</strong> bredde $7$ cm, lengde $25$ cm.",
      ],
    ),
    o(
      "3.OP3",
      "Oppgave 3 — Formler",
      "Omkretsen av en sirkel er $C=2\\pi r$.<br><br><strong>a)</strong> Isoler $r$.<br><br><strong>b)</strong> Finn $r$ når $C=10\\pi$. Oppgi eksakt svar.",
      "Del på $2\\pi$.",
      [
        "<strong>a)</strong> $r=\\dfrac{C}{2\\pi}$.<br><strong>Svar:</strong> $r=\\dfrac{C}{2\\pi}$",
        "<strong>b)</strong> $r=\\dfrac{10\\pi}{2\\pi}=5$.<br><strong>Svar:</strong> $r=5$",
      ],
    ),
    o(
      "3.OP4",
      "Oppgave 4 — Andregrad ved faktorisering",
      "Løs.<br><br><strong>a)</strong> $x^2-9=0$<br><br><strong>b)</strong> $x^2-7x+10=0$<br><br><strong>c)</strong> $2x^2-8x=0$",
      "Produktregelen, eller ta ut felles faktor først.",
      [
        "<strong>a)</strong> $(x-3)(x+3)=0$, $x=\\pm 3$.<br><strong>Svar:</strong> $x=-3$ eller $x=3$",
        "<strong>b)</strong> $(x-2)(x-5)=0$.<br><strong>Svar:</strong> $x=2$ eller $x=5$",
        "<strong>c)</strong> $2x(x-4)=0$.<br><strong>Svar:</strong> $x=0$ eller $x=4$",
      ],
    ),
    o(
      "3.OP5",
      "Oppgave 5 — ABC-formelen",
      "Løs med abc-formelen. Oppgi eksakt svar.<br><br><strong>a)</strong> $x^2-6x+4=0$<br><br><strong>b)</strong> $2x^2+x-6=0$",
      "$x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. Forenkle rota.",
      [
        "<strong>a)</strong> $a=1,b=-6,c=4$. $D=36-16=20=4\\cdot 5$.<br>$x=\\dfrac{6\\pm 2\\sqrt{5}}{2}=3\\pm\\sqrt{5}$.<br><strong>Svar:</strong> $x=3+\\sqrt{5}$ eller $x=3-\\sqrt{5}$",
        "<strong>b)</strong> $a=2,b=1,c=-6$. $D=1+48=49$.<br>$x=\\dfrac{-1\\pm 7}{4}$. $x=\\dfrac{6}{4}=\\dfrac{3}{2}$ eller $x=-2$.<br><strong>Svar:</strong> $x=\\dfrac{3}{2}$ eller $x=-2$",
      ],
    ),
    o(
      "3.OP6",
      "Oppgave 6 — Diskriminant",
      "Likningen $x^2-4x+k=0$ har nøyaktig én løsning.<br><br><strong>a)</strong> Finn $k$.<br><br><strong>b)</strong> Finn løsningen.",
      "Én løsning $\\Leftrightarrow$ $D=0$.",
      [
        "<strong>a)</strong> $D=16-4k=0$, $k=4$.<br><strong>Svar:</strong> $k=4$",
        "<strong>b)</strong> $x=\\dfrac{4}{2}=2$.<br><strong>Svar:</strong> $x=2$",
      ],
    ),
    o(
      "3.OP7",
      "Oppgave 7 — Rasjonale likninger",
      "Løs og sjekk for falske løsninger.<br><br><strong>a)</strong> $\\dfrac{x+2}{x-1}=3$<br><br><strong>b)</strong> $\\dfrac{2}{x}=\\dfrac{x}{8}$",
      "Gang med nevneren. $x$ kan ikke gjøre en nevner lik $0$.",
      [
        "<strong>a)</strong> $x+2=3(x-1)$, $x+2=3x-3$, $5=2x$, $x=\\dfrac{5}{2}$. Nevner OK.<br><strong>Svar:</strong> $x=\\dfrac{5}{2}$",
        "<strong>b)</strong> $16=x^2$, $x=\\pm 4$. Ingen gir nevner $0$.<br><strong>Svar:</strong> $x=4$ eller $x=-4$",
      ],
    ),
    o(
      "3.OP8",
      "Oppgave 8 — Ulikheter",
      "Løs og skriv svaret både med ulikhetstegn og som intervall.<br><br><strong>a)</strong> $3x-4 < 8$<br><br><strong>b)</strong> $5-2x \\geq 11$",
      "Når du deler på et negativt tall, snur ulikheten.",
      [
        "<strong>a)</strong> $3x<12$, $x<4$. Intervall $\\langle\\leftarrow,4\\rangle$.<br><strong>Svar:</strong> $x<4$",
        "<strong>b)</strong> $-2x\\geq 6$. Del på $-2$ og snu: $x\\leq -3$.<br><strong>Svar:</strong> $x\\leq -3$, $x\\in\\langle\\leftarrow,-3]$",
      ],
    ),
    o(
      "3.OP9",
      "Oppgave 9 — Proporsjoner",
      "En oppskrift til $5$ personer bruker $200$ g ost. Du skal lage mat til $8$ personer.<br><br><strong>a)</strong> Sett opp en proporsjon og finn hvor mye ost du trenger.<br><br><strong>b)</strong> Hvor mange personer kan du lage mat til med $360$ g ost?",
      "$\\dfrac{200}{5}=\\dfrac{x}{8}$.",
      [
        "<strong>a)</strong> $x=\\dfrac{200\\cdot 8}{5}=320$.<br><strong>Svar:</strong> $320$ g",
        "<strong>b)</strong> $\\dfrac{200}{5}=\\dfrac{360}{n}$, $200n=1800$, $n=9$.<br><strong>Svar:</strong> $9$ personer.",
      ],
    ),
    o(
      "3.OP10",
      "Oppgave 10 — Polynomdivisjon",
      "Polynomet $P(x)=x^3-4x^2+x+6$ har et nullpunkt $x=2$.<br><br><strong>a)</strong> Vis at $P(2)=0$.<br><br><strong>b)</strong> Del $P(x)$ på $(x-2)$.<br><br><strong>c)</strong> Faktoriser $P(x)$ fullstendig.",
      "Restteoremet: $P(2)=0$ betyr at $(x-2)$ går opp. Faktoriser andregraden etterpå.",
      [
        "<strong>a)</strong> $P(2)=8-16+2+6=0$.<br><strong>Svar:</strong> vist, $P(2)=0$.",
        "<strong>b)</strong> $(x^3-4x^2+x+6):(x-2)=x^2-2x-3$.<br><strong>Svar:</strong> $x^2-2x-3$",
        "<strong>c)</strong> $x^2-2x-3=(x-3)(x+1)$.<br>Dermed $P(x)=(x-2)(x-3)(x+1)$.<br><strong>Svar:</strong> $(x-2)(x-3)(x+1)$",
      ],
    ),
  ],
  quiz: [
    {
      sporsmal: "Løs $5x-3=2x+9$.",
      alternativer: ["$x=2$", "$x=4$", "$x=6$", "$x=12$"],
      riktigSvar: 1,
      forklaring: "$5x-2x=9+3$, $3x=12$, $x=4$.",
    },
    {
      sporsmal: "Hva skjer med ulikheten når du deler på et negativt tall?",
      alternativer: ["Ingenting", "Ulikheten snur", "Løsningen blir 0", "Ulikheten blir en likning"],
      riktigSvar: 1,
      forklaring: "Når du ganger eller deler med et negativt tall, må ulikhetstegnet snus.",
    },
    {
      sporsmal: "Hvor mange løsninger har $x^2-6x+9=0$?",
      alternativer: ["Ingen", "Én", "To ulike", "Uendelig mange"],
      riktigSvar: 1,
      forklaring: "$D=36-36=0$, så nøyaktig én løsning ($x=3$).",
    },
    {
      sporsmal: "ABC-formelen er $x=\\dfrac{-b\\pm\\sqrt{b^2-4ac}}{2a}$. Hva kalles $b^2-4ac$?",
      alternativer: ["Koeffisienten", "Diskriminanten", "Konstantleddet", "Nullpunktet"],
      riktigSvar: 1,
      forklaring: "Diskriminanten $D=b^2-4ac$ avgjør antall reelle løsninger.",
    },
    {
      sporsmal: "Når du løser $\\dfrac{x+1}{x-2}=4$, hvilken verdi er forbudt?",
      alternativer: ["$x=0$", "$x=1$", "$x=2$", "$x=4$"],
      riktigSvar: 2,
      forklaring: "Nevneren $x-2$ kan ikke være $0$, så $x\\neq 2$.",
    },
    {
      sporsmal: "Faktoriser $x^2-5x+6$.",
      alternativer: ["$(x-1)(x-6)$", "$(x-2)(x-3)$", "$(x+2)(x+3)$", "$(x-6)(x+1)$"],
      riktigSvar: 1,
      forklaring: "To tall med produkt $6$ og sum $-5$ er $-2$ og $-3$.",
    },
    {
      sporsmal: "Hvis $P(3)=0$, hva vet du om polynomet $P$?",
      alternativer: [
        "$(x+3)$ er en faktor",
        "$(x-3)$ er en faktor",
        "Polynomet har grad 3",
        "Polynomet har ingen reelle røtter",
      ],
      riktigSvar: 1,
      forklaring: "Restteoremet: $P(a)=0$ $\\Leftrightarrow$ $(x-a)$ er en faktor. Her $a=3$.",
    },
    {
      sporsmal: "$\\dfrac{3}{4}=\\dfrac{x}{12}$. Hva er $x$?",
      alternativer: ["$6$", "$8$", "$9$", "$16$"],
      riktigSvar: 2,
      forklaring: "Kryssprodukt: $3\\cdot 12=4x$, $x=9$.",
    },
  ],
};
