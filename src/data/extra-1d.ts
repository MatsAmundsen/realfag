import type { Oppgave, QuizQuestion } from "./types";

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

/** Flere 1T-oppgaver til 1D Potenser. Nummerert 1.62–1.73 (gapet før 1E). */
export const EXTRA_1D: Record<string, Oppgave[]> = {
  "1D": [
    o(
      "1.62",
      "Hva er en potens? Start med definisjonen, og øk tempoet.<br><br><strong>a)</strong> Skriv $5\\cdot 5\\cdot 5\\cdot 5$ som en potens. Hva er grunntallet, og hva er eksponenten?<br><br><strong>b)</strong> Skriv $x^3$ som et produkt.<br><br><strong>c)</strong> Regn ut $2^5$ og $3^4$.<br><br><strong>d)</strong> Forklar med én setning forskjellen på $2^5$ og $5^2$.<br><br><strong>e)</strong> En elev skriver $2^3\\cdot 3^3=5^3$. Stemmer det? Regn ut begge sider, og skriv det riktige produktet som én potens.",
      "Potensen $a^n$ betyr $n$ faktorer lik $a$. Grunntallet står nede, eksponenten oppe. Produktregelen $(ab)^n=a^n b^n$ krever samme eksponent, ikke at du plusser grunntallene.",
      [
        "<strong>a)</strong> Fire femmere: $5^4$. Grunntall $5$, eksponent $4$.<br><strong>Svar:</strong> $5^4$",
        "<strong>b)</strong> $x^3=x\\cdot x\\cdot x$.<br><strong>Svar:</strong> $x\\cdot x\\cdot x$",
        "<strong>c)</strong> $2^5=32$ og $3^4=81$.<br><strong>Svar:</strong> $32$ og $81$",
        "<strong>d)</strong> I $2^5$ er toeren grunntall og ganges fem ganger ($32$). I $5^2$ er femmeren grunntall og ganges to ganger ($25$).<br><strong>Svar:</strong> grunntall og eksponent er byttet om, så verdiene er ulike",
        "<strong>e)</strong> Venstre: $8\\cdot 27=216$. Høyre: $125$. De er ikke like. Samme eksponent gir $(2\\cdot 3)^3=6^3=216$.<br><strong>Svar:</strong> nei; $2^3\\cdot 3^3=(2\\cdot 3)^3=6^3$",
      ],
    ),
    o(
      "1.63",
      "Samme grunntall: ved ganging plusser vi eksponentene, ved deling trekker vi dem fra hverandre.<br><br><strong>a)</strong> $a^4\\cdot a^7$<br><br><strong>b)</strong> $\\dfrac{x^9}{x^3}$<br><br><strong>c)</strong> $b^5\\cdot b\\cdot b^2$<br><br><strong>d)</strong> $\\dfrac{m^{10}}{m^{10}}$<br><br><strong>e)</strong> $\\dfrac{y^3\\cdot y^{-1}}{y^4}$ — skriv svaret med positiv eksponent.",
      "$a=a^1$. Når teller og nevner blir like, får du $a^0=1$. Negativ eksponent i svaret skrives som brøk.",
      [
        "<strong>a)</strong> $a^{4+7}=a^{11}$.<br><strong>Svar:</strong> $a^{11}$",
        "<strong>b)</strong> $x^{9-3}=x^6$.<br><strong>Svar:</strong> $x^6$",
        "<strong>c)</strong> $b^{5+1+2}=b^8$.<br><strong>Svar:</strong> $b^8$",
        "<strong>d)</strong> $m^{10-10}=m^0=1$ (når $m\\neq 0$).<br><strong>Svar:</strong> $1$",
        "<strong>e)</strong> Teller: $y^{3+(-1)}=y^2$. Deretter $y^{2-4}=y^{-2}=\\dfrac{1}{y^2}$.<br><strong>Svar:</strong> $\\dfrac{1}{y^2}$",
      ],
    ),
    o(
      "1.64",
      "Potens av potens, og potens av et produkt. Eksponenten utenfor parentesen treffer <em>alle</em> faktorene inni.<br><br><strong>a)</strong> $(x^4)^3$<br><br><strong>b)</strong> $(xy)^4$<br><br><strong>c)</strong> $(2a^2)^3$<br><br><strong>d)</strong> $(3x^2 y)^2$<br><br><strong>e)</strong> $\\bigl((a^2)^3\\bigr)^2$",
      "$(a^m)^n=a^{mn}$. $(ab)^n=a^n b^n$. Tallet $2$ i $(2a^2)^3$ skal også opphøyes: $2^3$.",
      [
        "<strong>a)</strong> $x^{4\\cdot 3}=x^{12}$. (Ikke $x^{7}$ — vi ganger eksponentene, vi plusser dem ikke.)<br><strong>Svar:</strong> $x^{12}$",
        "<strong>b)</strong> $x^4 y^4$.<br><strong>Svar:</strong> $x^4 y^4$",
        "<strong>c)</strong> $2^3\\cdot (a^2)^3=8a^6$.<br><strong>Svar:</strong> $8a^6$",
        "<strong>d)</strong> $3^2\\cdot (x^2)^2\\cdot y^2=9x^4 y^2$.<br><strong>Svar:</strong> $9x^4 y^2$",
        "<strong>e)</strong> Innerst: $(a^2)^3=a^6$. Deretter $(a^6)^2=a^{12}$.<br><strong>Svar:</strong> $a^{12}$",
      ],
    ),
    o(
      "1.65",
      "Null og negative eksponenter.<br><br><strong>a)</strong> Regn ut $8^0$, $(-5)^0$ og $1^0$.<br><br><strong>b)</strong> Regn ut $10^{-2}$ og $2^{-3}$.<br><br><strong>c)</strong> Skriv $x^{-4}$ uten negativ eksponent ($x\\neq 0$).<br><br><strong>d)</strong> $\\left(\\dfrac{2}{5}\\right)^{-1}$<br><br><strong>e)</strong> Hvorfor sier vi at $0^0$ og $0^{-2}$ ikke er definert i reelle tall?",
      "$a^0=1$ når $a\\neq 0$. $a^{-n}=\\dfrac{1}{a^n}$. Negativ eksponent på en brøk snur brøken. Null i nevneren er forbudt.",
      [
        "<strong>a)</strong> Ethvert tall ulikt $0$ opphøyd i $0$ er $1$.<br><strong>Svar:</strong> $1$, $1$ og $1$",
        "<strong>b)</strong> $10^{-2}=\\dfrac{1}{10^2}=\\dfrac{1}{100}$ og $2^{-3}=\\dfrac{1}{8}$.<br><strong>Svar:</strong> $\\dfrac{1}{100}$ og $\\dfrac{1}{8}$",
        "<strong>c)</strong> $x^{-4}=\\dfrac{1}{x^4}$.<br><strong>Svar:</strong> $\\dfrac{1}{x^4}$",
        "<strong>d)</strong> Snu brøken: $\\left(\\dfrac{5}{2}\\right)^{1}=\\dfrac{5}{2}$.<br><strong>Svar:</strong> $\\dfrac{5}{2}$",
        "<strong>e)</strong> $0^{-2}=\\dfrac{1}{0^2}$ deler på null. $0^0$ kan ikke gis én verdi som passer alle potensreglene samtidig, og regnes derfor som udefinert.<br><strong>Svar:</strong> begge er udefinert",
      ],
    ),
    o(
      "1.66",
      "Forenkle. Samle like grunntall, og skriv med positive eksponenter.<br><br><strong>a)</strong> $\\dfrac{a^5\\cdot a^2}{a^4}$<br><br><strong>b)</strong> $\\dfrac{(x^2)^3}{x^3}$<br><br><strong>c)</strong> $\\dfrac{12x^5 y^2}{4x^2 y}$<br><br><strong>d)</strong> $(2x^{-3})^2\\cdot x^8$<br><br><strong>e)</strong> $\\dfrac{(3a^2 b^{-1})^2}{9ab}$",
      "Løs opp parenteser først. Koeffisienter (12 og 4) forkortes for seg, bokstavene for seg.",
      [
        "<strong>a)</strong> $a^{5+2-4}=a^3$.<br><strong>Svar:</strong> $a^3$",
        "<strong>b)</strong> $\\dfrac{x^6}{x^3}=x^3$.<br><strong>Svar:</strong> $x^3$",
        "<strong>c)</strong> $\\dfrac{12}{4}\\cdot x^{5-2}\\cdot y^{2-1}=3x^3 y$.<br><strong>Svar:</strong> $3x^3 y$",
        "<strong>d)</strong> $2^2\\cdot x^{-6}\\cdot x^8=4x^{2}$.<br><strong>Svar:</strong> $4x^2$",
        "<strong>e)</strong> Teller: $9a^4 b^{-2}$. Brøken: $\\dfrac{9a^4 b^{-2}}{9ab}=a^{3} b^{-3}=\\dfrac{a^3}{b^3}$.<br><strong>Svar:</strong> $\\dfrac{a^3}{b^3}$",
      ],
    ),
    o(
      "1.67",
      "Brøk som grunntall. $\\left(\\dfrac{a}{b}\\right)^n=\\dfrac{a^n}{b^n}$, og negativ eksponent snur brøken.<br><br><strong>a)</strong> $\\left(\\dfrac{2}{3}\\right)^3$<br><br><strong>b)</strong> $\\left(\\dfrac{3}{4}\\right)^{-2}$<br><br><strong>c)</strong> $\\left(\\dfrac{5}{5}\\right)^{7}$<br><br><strong>d)</strong> $\\left(\\dfrac{a}{b}\\right)^3\\cdot \\dfrac{b}{a}$ når $a,b\\neq 0$<br><br><strong>e)</strong> $\\left(\\dfrac{2x}{y}\\right)^{-2}$",
      "Negativ eksponent: snu brøken først, deretter opphøy. I d) kan du forkorte én $a$ og én $b$.",
      [
        "<strong>a)</strong> $\\dfrac{2^3}{3^3}=\\dfrac{8}{27}$.<br><strong>Svar:</strong> $\\dfrac{8}{27}$",
        "<strong>b)</strong> $\\left(\\dfrac{4}{3}\\right)^{2}=\\dfrac{16}{9}$.<br><strong>Svar:</strong> $\\dfrac{16}{9}$",
        "<strong>c)</strong> $\\left(1\\right)^{7}=1$.<br><strong>Svar:</strong> $1$",
        "<strong>d)</strong> $\\dfrac{a^3}{b^3}\\cdot\\dfrac{b}{a}=\\dfrac{a^2}{b^2}=\\left(\\dfrac{a}{b}\\right)^2$.<br><strong>Svar:</strong> $\\left(\\dfrac{a}{b}\\right)^2$",
        "<strong>e)</strong> $\\left(\\dfrac{y}{2x}\\right)^{2}=\\dfrac{y^2}{4x^2}$.<br><strong>Svar:</strong> $\\dfrac{y^2}{4x^2}$",
      ],
    ),
    o(
      "1.68",
      "Finn feilen — og rett den. Dette er de klassiske potensfellene.<br><br><strong>a)</strong> En elev skriver $x^2\\cdot x^3=x^6$.<br><br><strong>b)</strong> En elev skriver $(x+y)^2=x^2+y^2$. Sett inn $x=1$, $y=1$ som moteksempel, og skriv det riktige uttrykket.<br><br><strong>c)</strong> En elev skriver $-2^4=16$.<br><br><strong>d)</strong> En elev skriver $2^3\\cdot 5^3=10^6$.<br><br><strong>e)</strong> Forenkle riktig: $\\dfrac{(2x^2)^3}{4x}$.",
      "Ganging av potenser med samme grunntall: pluss eksponentene. Potens av potens: gang dem. Minustegn uten parentes er ikke med i potensen. $(ab)^n=a^n b^n$, ikke $a^n b^{\\text{noe annet}}$.",
      [
        "<strong>a)</strong> Eleven har ganget eksponentene. Riktig er $x^{2+3}=x^5$.<br><strong>Svar:</strong> $x^5$",
        "<strong>b)</strong> Venstre: $(1+1)^2=4$. Høyre: $1+1=2$. Potens fordeler seg ikke over pluss. Riktig: $x^2+2xy+y^2$.<br><strong>Svar:</strong> nei; $(x+y)^2=x^2+2xy+y^2$",
        "<strong>c)</strong> Potens før fortegn: $-2^4=-(2^4)=-16$. (Med parentes: $(-2)^4=16$.)<br><strong>Svar:</strong> $-16$",
        "<strong>d)</strong> Samme eksponent: $2^3\\cdot 5^3=(2\\cdot 5)^3=10^3=1000$, ikke $10^6$.<br><strong>Svar:</strong> $10^3$",
        "<strong>e)</strong> $(2x^2)^3=8x^6$, så $\\dfrac{8x^6}{4x}=2x^5$.<br><strong>Svar:</strong> $2x^5$",
      ],
    ),
    o(
      "1.69",
      "Skriv med samme grunntall før du forenkler. $4=2^2$, $8=2^3$, $9=3^2$, $16=2^4$, $27=3^3$.<br><br><strong>a)</strong> Skriv $8^2$ som en potens med grunntall $2$.<br><br><strong>b)</strong> $4^3\\cdot 2^5$<br><br><strong>c)</strong> $\\dfrac{9^2}{3^3}$<br><br><strong>d)</strong> $27\\cdot 3^{-2}$<br><br><strong>e)</strong> Forenkle $\\dfrac{4^n\\cdot 8^n}{2^n}$.",
      "Bytt ut hvert tall med en potens av $2$ eller $3$, og bruk $(a^m)^n=a^{mn}$.",
      [
        "<strong>a)</strong> $8=2^3$, så $8^2=(2^3)^2=2^6$.<br><strong>Svar:</strong> $2^6$",
        "<strong>b)</strong> $4^3=(2^2)^3=2^6$, så $2^6\\cdot 2^5=2^{11}$.<br><strong>Svar:</strong> $2^{11}$",
        "<strong>c)</strong> $9^2=(3^2)^2=3^4$, så $\\dfrac{3^4}{3^3}=3$.<br><strong>Svar:</strong> $3$",
        "<strong>d)</strong> $27=3^3$, så $3^3\\cdot 3^{-2}=3^{1}=3$.<br><strong>Svar:</strong> $3$",
        "<strong>e)</strong> $4^n=(2^2)^n=2^{2n}$ og $8^n=(2^3)^n=2^{3n}$. Teller $2^{5n}$, delt på $2^n$ gir $2^{4n}$.<br><strong>Svar:</strong> $2^{4n}$",
      ],
    ),
    o(
      "1.70",
      "Brøkekponenter og røtter. $a^{1/n}=\\sqrt[n]{a}$ og $a^{m/n}=\\bigl(\\sqrt[n]{a}\\bigr)^m$ (når uttrykket er definert).<br><br><strong>a)</strong> $9^{1/2}$<br><br><strong>b)</strong> $8^{1/3}$<br><br><strong>c)</strong> $16^{3/4}$<br><br><strong>d)</strong> $27^{2/3}$<br><br><strong>e)</strong> $4^{-1/2}$",
      "Ta rota først (nevneren i eksponenten), deretter opphøy (telleren). Negativ brøkekponent: ta den inverse til slutt.",
      [
        "<strong>a)</strong> $9^{1/2}=\\sqrt{9}=3$.<br><strong>Svar:</strong> $3$",
        "<strong>b)</strong> $8^{1/3}=\\sqrt[3]{8}=2$.<br><strong>Svar:</strong> $2$",
        "<strong>c)</strong> $16^{1/4}=2$, så $2^3=8$. (Eller $16^3=4096$ og fjerderot — mye tyngre.)<br><strong>Svar:</strong> $8$",
        "<strong>d)</strong> $27^{1/3}=3$, så $3^2=9$.<br><strong>Svar:</strong> $9$",
        "<strong>e)</strong> $4^{1/2}=2$, så $4^{-1/2}=\\dfrac{1}{2}$.<br><strong>Svar:</strong> $\\dfrac{1}{2}$",
      ],
    ),
    o(
      "1.71",
      "Faktoriser ut felles potens — samme triks som i oppgave 1.59.<br><br><strong>a)</strong> Vis at $5^{n+1}-5^n=4\\cdot 5^n$.<br><br><strong>b)</strong> Forenkle $2^{x+2}+2^x$.<br><br><strong>c)</strong> Forenkle $\\dfrac{2^{n+3}}{2^{n-1}}$.<br><br><strong>d)</strong> En bakteriekultur starter med $100$ bakterier og dobler seg hver time. Hvor mange er det etter $5$ timer? Skriv svaret som potens, og som heltall.<br><br><strong>e)</strong> Et kvadrat har side $2^n$ cm. Skriv areal og omkrets som potenser av $2$.",
      "I a)–b): $a^{n+1}=a\\cdot a^n$. Trekk ut $a^n$. I d) er vekstfaktoren $2$. Areal er side i andre.",
      [
        "<strong>a)</strong> $5^{n+1}-5^n=5\\cdot 5^n-5^n=(5-1)\\cdot 5^n=4\\cdot 5^n$.<br><strong>Svar:</strong> vist",
        "<strong>b)</strong> $2^{x+2}=4\\cdot 2^x$, så $4\\cdot 2^x+2^x=5\\cdot 2^x$.<br><strong>Svar:</strong> $5\\cdot 2^x$",
        "<strong>c)</strong> $2^{(n+3)-(n-1)}=2^{n+3-n+1}=2^4=16$.<br><strong>Svar:</strong> $16$",
        "<strong>d)</strong> $100\\cdot 2^5=100\\cdot 32=3200$.<br><strong>Svar:</strong> $100\\cdot 2^5=3200$",
        "<strong>e)</strong> Areal $(2^n)^2=2^{2n}$. Omkrets $4\\cdot 2^n=2^2\\cdot 2^n=2^{n+2}$.<br><strong>Svar:</strong> areal $2^{2n}$, omkrets $2^{n+2}$",
      ],
    ),
    o(
      "1.72",
      "Blandede potensutfordringer.<br><br><strong>a)</strong> $\\dfrac{(2x^3 y^{-2})^3}{4x y^{-4}}$<br><br><strong>b)</strong> $\\left(\\dfrac{1}{2}\\right)^{-3}$<br><br><strong>c)</strong> Hva er størst, $2^{10}$ eller $10^3$? Regn ut begge uten kalkulator.<br><br><strong>d)</strong> Finn $n$ slik at $2^n=8^{n-2}$. Skriv begge sider med grunntall $2$.<br><br><strong>e)</strong> En elev påstår at $a^m+a^n=a^{m+n}$ for alle $a$. Motbevis med $a=2$, $m=2$, $n=3$.",
      "I d): $8=2^3$, så $8^{n-2}=(2^3)^{n-2}=2^{3n-6}$. Da kan du sette eksponentene lik hverandre.",
      [
        "<strong>a)</strong> Teller $8x^9 y^{-6}$. Brøken: $\\dfrac{8}{4}\\cdot x^{8}\\cdot y^{-2}=2x^8 y^{-2}=\\dfrac{2x^8}{y^2}$.<br><strong>Svar:</strong> $\\dfrac{2x^8}{y^2}$",
        "<strong>b)</strong> $\\left(2\\right)^{3}=8$.<br><strong>Svar:</strong> $8$",
        "<strong>c)</strong> $2^{10}=1024$ og $10^3=1000$. Altså $2^{10}>10^3$.<br><strong>Svar:</strong> $2^{10}$ er størst",
        "<strong>d)</strong> $2^n=2^{3(n-2)}=2^{3n-6}$, så $n=3n-6$, $2n=6$, $n=3$. Prøve: $2^3=8$ og $8^{1}=8$.<br><strong>Svar:</strong> $n=3$",
        "<strong>e)</strong> Venstre: $2^2+2^3=4+8=12$. Høyre: $2^5=32$. $12\\neq 32$, så påstanden er usann. (Pluss av potenser er ikke en potensregel.)<br><strong>Svar:</strong> påstanden er usann",
      ],
    ),
    o(
      "1.73",
      "Regnerekkefølge og potenser. Parenteser → potenser → ganging/deling → pluss/minus.<br><br><strong>a)</strong> $2+3^2\\cdot 2$<br><br><strong>b)</strong> $(2+3)^2\\cdot 2$<br><br><strong>c)</strong> $-3^2+(-3)^2$<br><br><strong>d)</strong> Er $2^3\\cdot 3^2$ lik $(2\\cdot 3)^{3+2}$? Regn ut begge.<br><br><strong>e)</strong> $5\\cdot 2^3-4^2$",
      "Uten parentes treffer eksponenten bare tallet like foran, ikke minustegnet. I d) er eksponentene ulike, så produktregelen $(ab)^n$ kan ikke brukes rett fram.",
      [
        "<strong>a)</strong> Potens: $9$. Ganging: $18$. Pluss: $20$.<br><strong>Svar:</strong> $20$",
        "<strong>b)</strong> Parentes: $5$. Potens: $25$. Ganging: $50$.<br><strong>Svar:</strong> $50$",
        "<strong>c)</strong> $-3^2=-9$ og $(-3)^2=9$, så $-9+9=0$.<br><strong>Svar:</strong> $0$",
        "<strong>d)</strong> Venstre: $8\\cdot 9=72$. Høyre: $6^5=7776$. Ikke like.<br><strong>Svar:</strong> nei",
        "<strong>e)</strong> $5\\cdot 8-16=40-16=24$.<br><strong>Svar:</strong> $24$",
      ],
    ),
  ],
};

export const EXTRA_1D_QUIZ: QuizQuestion[] = [
  {
    sporsmal: "Hva er $(2x)^3$ forenklet?",
    alternativer: ["$2x^3$", "$6x^3$", "$8x^3$", "$8x$"],
    riktigSvar: 2,
    forklaring: "Eksponenten treffer alle faktorene: $2^3\\cdot x^3=8x^3$.",
  },
  {
    sporsmal: "Skriv $4^3$ som en potens med grunntall $2$.",
    alternativer: ["$2^3$", "$2^5$", "$2^6$", "$2^{12}$"],
    riktigSvar: 2,
    forklaring: "$4=2^2$, så $4^3=(2^2)^3=2^6$.",
  },
  {
    sporsmal: "Hva blir $\\left(\\dfrac{1}{2}\\right)^{-2}$?",
    alternativer: ["$\\dfrac{1}{4}$", "$-4$", "$4$", "$\\dfrac{1}{2}$"],
    riktigSvar: 2,
    forklaring: "Negativ eksponent snur brøken: $2^2=4$.",
  },
  {
    sporsmal: "Hva er $8^{2/3}$?",
    alternativer: ["$4$", "$16$", "$\\dfrac{16}{3}$", "$2$"],
    riktigSvar: 0,
    forklaring: "$8^{1/3}=2$, deretter $2^2=4$.",
  },
  {
    sporsmal: "Hvilken identitet er sann for alle $a\\neq 0$?",
    alternativer: [
      "$a^2+a^3=a^5$",
      "$(a+b)^2=a^2+b^2$",
      "$a^m\\cdot a^n=a^{m+n}$",
      "$a^m\\cdot a^n=a^{mn}$",
    ],
    riktigSvar: 2,
    forklaring: "Ved ganging av potenser med samme grunntall adderer vi eksponentene. De tre andre er klassiske feil.",
  },
  {
    sporsmal: "Forenkle $\\dfrac{4^n\\cdot 2^n}{8^n}$.",
    alternativer: ["$1$", "$2^n$", "$4^n$", "$2^{2n}$"],
    riktigSvar: 0,
    forklaring:
      "$4^n=(2^2)^n=2^{2n}$, $8^n=(2^3)^n=2^{3n}$. Teller $2^{3n}$ delt på $2^{3n}$ gir $1$.",
  },
  {
    sporsmal: "Hva blir $2^{x+1}-2^x$ forenklet?",
    alternativer: ["$1$", "$2^x$", "$2^{x+1}$", "$0$"],
    riktigSvar: 1,
    forklaring: "$2^{x+1}=2\\cdot 2^x$, så $2\\cdot 2^x-2^x=2^x$.",
  },
  {
    sporsmal: "Regn ut $-2^2+(-2)^2$.",
    alternativer: ["$0$", "$8$", "$-8$", "$4$"],
    riktigSvar: 0,
    forklaring: "$-2^2=-4$ og $(-2)^2=4$, summen er $0$.",
  },
];
