import type { Delkapittel, Oppgave } from "./types";

function o(id: string, tittel: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

export const KAP4_OVEPROVE: Delkapittel = {
  id: "4OP",
  tittel: "Øveprøve",
  oppgaver: [
    o(
      "4.OP0",
      "Øveprøve · Kapittel 4 (oversikt)",
      "<strong>Tid:</strong> ca. 90 min<br><strong>Del 1 (oppgave 1–6):</strong> uten hjelpemidler<br><strong>Del 2 (oppgave 7–10):</strong> digitale hjelpemidler (GeoGebra, kalkulator) er tillatt<br><br><strong>Instruks:</strong> Vis mellomregning. Oppgaver med flere bokstaver teller hver for seg.<br><br>Prøven dekker funksjonsbegrepet, lineære funksjoner, andregrads- og polynomfunksjoner, rasjonale funksjoner, potens- og eksponentialfunksjoner, vekstfart og den deriverte.",
      "Les hele prøven først. Begynn med det du mestrer.",
      [
        "Dette er oversiktssiden. Gå videre til oppgave 1–10.",
      ],
    ),
    o(
      "4.OP1",
      "Oppgave 1 — Verditabell, nullpunkter og verdimengde (uten hjelpemidler)",
      "Gitt $f(x)=x^2-2x-8$ med $D_f=[-3,5]$.<br><br><strong>a)</strong> Regn ut $f(-3)$, $f(0)$, $f(1)$ og $f(5)$.<br><br><strong>b)</strong> Finn nullpunktene.<br><br><strong>c)</strong> Finn verdimengden $V_f$.",
      "Sett $x$-verdiene inn i $f(x)$ og regn ut, én om gangen.",
      [
        "<strong>a)</strong> $f(-3)=9+6-8=7$, $f(0)=-8$, $f(1)=1-2-8=-9$, $f(5)=25-10-8=7$.<br><strong>Svar:</strong> $7$, $-8$, $-9$ og $7$",
        "<strong>b)</strong> $x^2-2x-8=(x+2)(x-4)=0$.<br><strong>Svar:</strong> $x=-2$ og $x=4$",
        "<strong>c)</strong> Minste verdi er bunnpunktet $f(1)=-9$. Største verdi er i endepunktene: $f(-3)=f(5)=7$.<br><strong>Svar:</strong> $V_f=[-9,7]$",
      ],
    ),
    o(
      "4.OP2",
      "Oppgave 2 — Lineære funksjoner (uten hjelpemidler)",
      "En rett linje går gjennom $(-2,7)$ og $(4,-5)$.<br><br><strong>a)</strong> Finn likningen for linja.<br><br><strong>b)</strong> Finn likningen for linja som står vinkelrett på denne og går gjennom $(4,1)$.<br><br><strong>c)</strong> Finn skjæringspunktet mellom linjene.",
      "$a=\\dfrac{y_2-y_1}{x_2-x_1}$.",
      [
        "<strong>a)</strong> $a=\\dfrac{-5-7}{4-(-2)}=\\dfrac{-12}{6}=-2$. $y-7=-2(x+2)$ gir $y=-2x+3$.<br><strong>Svar:</strong> $y=-2x+3$",
        "<strong>b)</strong> Stigningstall $\\dfrac{1}{2}$. $y-1=\\dfrac{1}{2}(x-4)$ gir $y=0{,}5x-1$.<br><strong>Svar:</strong> $y=0{,}5x-1$",
        "<strong>c)</strong> $-2x+3=0{,}5x-1$ gir $2{,}5x=4$, $x=\\dfrac{8}{5}$. $y=-2\\cdot\\dfrac{8}{5}+3=-\\dfrac{1}{5}$.<br><strong>Svar:</strong> $\\left(\\dfrac{8}{5},-\\dfrac{1}{5}\\right)$",
      ],
    ),
    o(
      "4.OP3",
      "Oppgave 3 — Andregradsfunksjon fra bunnpunkt (uten hjelpemidler)",
      "En andregradsfunksjon har bunnpunkt i $(2,-3)$, og grafen går gjennom $(0,5)$.<br><br><strong>a)</strong> Finn $f(x)$ på formen $ax^2+bx+c$.<br><br><strong>b)</strong> Finn nullpunktene eksakt.",
      "Skriv $f(x)=a(x-2)^2-3$ og bruk punktet $(0,5)$.",
      [
        "<strong>a)</strong> $f(0)=4a-3=5$ gir $a=2$. $f(x)=2(x-2)^2-3=2x^2-8x+5$.<br><strong>Svar:</strong> $f(x)=2x^2-8x+5$",
        "<strong>b)</strong> $2(x-2)^2=3$, $(x-2)^2=\\dfrac{3}{2}$, $x-2=\\pm\\sqrt{\\dfrac{3}{2}}=\\pm\\dfrac{\\sqrt{6}}{2}$.<br><strong>Svar:</strong> $x=2-\\dfrac{\\sqrt{6}}{2}$ og $x=2+\\dfrac{\\sqrt{6}}{2}$",
      ],
    ),
    o(
      "4.OP4",
      "Oppgave 4 — Polynomfunksjon (uten hjelpemidler)",
      "Gitt $P(x)=x^3-5x^2+2x+8$.<br><br><strong>a)</strong> Vis at $P(2)=0$.<br><br><strong>b)</strong> Utfør polynomdivisjonen $P(x):(x-2)$.<br><br><strong>c)</strong> Finn alle nullpunktene til $P$.",
      "Sett $x=2$ inn i $P(x)$ og regn ut.",
      [
        "<strong>a)</strong> $P(2)=8-20+4+8=0$.<br><strong>Svar:</strong> $P(2)=0$",
        "<strong>b)</strong> $(x^3-5x^2+2x+8):(x-2)=x^2-3x-4$, rest $0$.<br><strong>Svar:</strong> $x^2-3x-4$",
        "<strong>c)</strong> $x^2-3x-4=(x+1)(x-4)$, så $P(x)=(x-2)(x+1)(x-4)$.<br><strong>Svar:</strong> $x=-1$, $x=2$ og $x=4$",
      ],
    ),
    o(
      "4.OP5",
      "Oppgave 5 — Rasjonal funksjon (uten hjelpemidler)",
      "Gitt $r(x)=\\dfrac{2x+4}{x-3}$.<br><br><strong>a)</strong> Finn nullpunktet og skjæringspunktet med $y$-aksen.<br><br><strong>b)</strong> Finn den loddrette og den vannrette asymptoten.<br><br><strong>c)</strong> Skriv opp $D_r$ og $V_r$.",
      "Nullpunkt: telleren er $0$. Skjæring med $y$-aksen: sett $x=0$.",
      [
        "<strong>a)</strong> $2x+4=0$ gir $x=-2$. $r(0)=\\dfrac{4}{-3}=-\\dfrac{4}{3}$.<br><strong>Svar:</strong> nullpunkt $x=-2$, skjæring med $y$-aksen i $\\left(0,-\\dfrac{4}{3}\\right)$",
        "<strong>b)</strong> Nevneren er $0$ for $x=3$ (telleren er $10\\neq 0$ der). For store $|x|$ nærmer $r(x)$ seg $\\dfrac{2x}{x}=2$.<br><strong>Svar:</strong> $x=3$ og $y=2$",
        "<strong>c)</strong> $x=3$ er ikke tillatt, og grafen når aldri asymptoten $y=2$.<br><strong>Svar:</strong> $D_r=\\mathbb{R}\\setminus\\{3\\}$, $V_r=\\mathbb{R}\\setminus\\{2\\}$",
      ],
    ),
    o(
      "4.OP6",
      "Oppgave 6 — Den deriverte (uten hjelpemidler)",
      "Gitt $f(x)=x^3-3x^2-9x+5$.<br><br><strong>a)</strong> Finn $f'(x)$ og faktoriser.<br><br><strong>b)</strong> Lag fortegnslinje for $f'$ og finn topp- og bunnpunktet.<br><br><strong>c)</strong> Finn likningen for tangenten i punktet der $x=0$.",
      "$f'(x)=3x^2-6x-9=3(x^2-2x-3)$.",
      [
        "<strong>a)</strong> $f'(x)=3x^2-6x-9=3(x-3)(x+1)$.<br><strong>Svar:</strong> $f'(x)=3(x-3)(x+1)$",
        "<strong>b)</strong> $f'$ er positiv for $x<-1$, negativ mellom $-1$ og $3$ og positiv for $x>3$. $f(-1)=-1-3+9+5=10$, $f(3)=27-27-27+5=-22$.<br><strong>Svar:</strong> toppunkt $(-1,10)$, bunnpunkt $(3,-22)$",
        "<strong>c)</strong> $f(0)=5$ og $f'(0)=-9$.<br><strong>Svar:</strong> $y=-9x+5$",
      ],
    ),
    o(
      "4.OP7",
      "Oppgave 7 — Potensfunksjon (digitale hjelpemidler)",
      "Vekten $W$ (gram) til en fisk med lengde $L$ (cm) er omtrent $W(L)=0{,}012\\cdot L^{3{,}05}$.<br><br><strong>a)</strong> Regn ut $W(40)$.<br><br><strong>b)</strong> Hvor lang er en fisk som veier $1000$ g?<br><br><strong>c)</strong> Hvor mange prosent øker vekten når lengden øker med $10\\,\\%$?",
      "Sett $L=40$ inn i $W(L)$.",
      [
        "<strong>a)</strong> $W(40)=0{,}012\\cdot 40^{3{,}05}\\approx 924$.<br><strong>Svar:</strong> ca. $924$ g",
        "<strong>b)</strong> Løs $0{,}012\\cdot L^{3{,}05}=1000$ i CAS, eller $L=\\left(\\dfrac{1000}{0{,}012}\\right)^{1/3{,}05}\\approx 41{,}1$.<br><strong>Svar:</strong> ca. $41$ cm",
        "<strong>c)</strong> $1{,}1^{3{,}05}\\approx 1{,}337$.<br><strong>Svar:</strong> ca. $34\\,\\%$",
      ],
    ),
    o(
      "4.OP8",
      "Oppgave 8 — Eksponentiell nedgang (digitale hjelpemidler)",
      "Mengden virkestoff i blodet $t$ timer etter en dose er $M(t)=250\\cdot 0{,}82^t$ (mg).<br><br><strong>a)</strong> Regn ut $M(3)$.<br><br><strong>b)</strong> Finn halveringstiden.<br><br><strong>c)</strong> Når er det mindre enn $20$ mg igjen?",
      "Sett $t=3$ inn i $M(t)$.",
      [
        "<strong>a)</strong> $M(3)=250\\cdot 0{,}82^3\\approx 137{,}8$.<br><strong>Svar:</strong> ca. $138$ mg",
        "<strong>b)</strong> Halvparten av $250$ mg er $125$ mg. Tegn $M(t)$ og linja $y=125$ i GeoGebra og bruk «Skjæring mellom to objekt». Skjæringspunktet er omtrent $(3{,}49;\\ 125)$.<br><br><em>Alternativ (med logaritmer):</em> $0{,}82^t=0{,}5$ gir $t=\\dfrac{\\lg 0{,}5}{\\lg 0{,}82}\\approx 3{,}49$.<br><strong>Svar:</strong> ca. $3{,}5$ timer",
        "<strong>c)</strong> Tegn linja $y=20$ og finn skjæringen med $M(t)$ i GeoGebra. Skjæringspunktet er omtrent $(12{,}7;\\ 20)$. Siden $M$ synker, er det mindre enn $20$ mg igjen etter dette.<br><br><em>Alternativ (med logaritmer):</em> $250\\cdot 0{,}82^t=20$ gir $0{,}82^t=0{,}08$ og $t=\\dfrac{\\lg 0{,}08}{\\lg 0{,}82}\\approx 12{,}7$.<br><strong>Svar:</strong> etter ca. $12{,}7$ timer",
      ],
    ),
    o(
      "4.OP9",
      "Oppgave 9 — Finne vekstfaktor (digitale hjelpemidler)",
      "En by hadde $12\\,000$ innbyggere i 2020 og $15\\,315$ innbyggere fem år senere. Anta eksponentiell vekst.<br><br><strong>a)</strong> Finn vekstfaktoren per år og den årlige prosentvise økningen.<br><br><strong>b)</strong> Skriv opp en modell $N(t)$, der $t$ er år etter 2020.<br><br><strong>c)</strong> Når passerer innbyggertallet $20\\,000$?",
      "$12\\,000\\cdot b^5=15\\,315$.",
      [
        "<strong>a)</strong> $b=\\left(\\dfrac{15\\,315}{12\\,000}\\right)^{1/5}\\approx 1{,}05$.<br><strong>Svar:</strong> $b\\approx 1{,}05$, altså $5\\,\\%$ per år",
        "<strong>b)</strong> <strong>Svar:</strong> $N(t)=12\\,000\\cdot 1{,}05^t$",
        "<strong>c)</strong> Tegn $N(t)=12\\,000\\cdot 1{,}05^t$ og linja $y=20\\,000$ i GeoGebra og bruk «Skjæring mellom to objekt». Skjæringspunktet er omtrent $(10{,}5;\\ 20\\,000)$.<br><br><em>Alternativ (med logaritmer):</em> $1{,}05^t=\\dfrac{20\\,000}{12\\,000}$ gir $t=\\dfrac{\\lg(5/3)}{\\lg 1{,}05}\\approx 10{,}5$.<br><strong>Svar:</strong> i løpet av 2030 (etter ca. $10{,}5$ år)",
      ],
    ),
    o(
      "4.OP10",
      "Oppgave 10 — Vekstfart i praksis (digitale hjelpemidler)",
      "Antall kunder i en butikk $t$ timer etter åpning er $K(t)=-0{,}5t^2+6t+20$, $0\\le t\\le 10$.<br><br><strong>a)</strong> Finn gjennomsnittlig vekstfart fra $t=0$ til $t=4$.<br><br><strong>b)</strong> Finn $K'(2)$ og forklar hva tallet betyr.<br><br><strong>c)</strong> Når er det flest kunder, og hvor mange er det da?",
      "Gjennomsnittlig vekstfart fra $t=0$ til $t=4$ er $\\dfrac{K(4)-K(0)}{4-0}$.",
      [
        "<strong>a)</strong> $K(0)=20$, $K(4)=-8+24+20=36$. $\\dfrac{36-20}{4}=4$.<br><strong>Svar:</strong> $4$ kunder per time",
        "<strong>b)</strong> $K'(t)=-t+6$, $K'(2)=4$. To timer etter åpning øker kundetallet med omtrent $4$ kunder per time.<br><strong>Svar:</strong> $K'(2)=4$",
        "<strong>c)</strong> $K'(t)=0$ gir $t=6$. $K(6)=-18+36+20=38$.<br><strong>Svar:</strong> etter $6$ timer, med $38$ kunder",
      ],
    ),
  ],
  quiz: [
    {
      sporsmal: "Hva er stigningstallet til linja gjennom $(1,2)$ og $(3,8)$?",
      alternativer: ["$2$", "$3$", "$6$", "$\\dfrac{1}{3}$"],
      riktigSvar: 1,
      forklaring: "$\\dfrac{8-2}{3-1}=3$.",
    },
    {
      sporsmal: "Hvilken asymptote har $r(x)=\\dfrac{3x-1}{x+2}$ når $|x|$ blir stor?",
      alternativer: ["$y=3$", "$x=-2$", "$y=-\\dfrac{1}{2}$", "$y=0$"],
      riktigSvar: 0,
      forklaring: "Forholdet mellom ledd med høyest grad: $\\dfrac{3x}{x}=3$.",
    },
    {
      sporsmal: "En størrelse avtar med $18\\,\\%$ per time. Vekstfaktoren er",
      alternativer: ["$0{,}18$", "$1{,}18$", "$0{,}82$", "$-0{,}18$"],
      riktigSvar: 2,
      forklaring: "$1-0{,}18=0{,}82$.",
    },
    {
      sporsmal: "Gitt $f(x)=x^2-4x$. Hva er $f'(1)$?",
      alternativer: ["$-3$", "$2$", "$0$", "$-2$"],
      riktigSvar: 3,
      forklaring: "$f'(x)=2x-4$, $f'(1)=-2$.",
    },
    {
      sporsmal: "Hvis $P(5)=0$, er en faktor i $P(x)$",
      alternativer: ["$(x-5)$", "$(x+5)$", "$5x$", "$(x^2-5)$"],
      riktigSvar: 0,
      forklaring: "Restteoremet: $P(a)=0$ betyr at $(x-a)$ er en faktor.",
    },
    {
      sporsmal: "Gjennomsnittlig vekstfart til $f(x)=x^2$ på $[1,3]$ er",
      alternativer: ["$2$", "$8$", "$4$", "$9$"],
      riktigSvar: 2,
      forklaring: "$\\dfrac{9-1}{3-1}=4$.",
    },
  ],
};
