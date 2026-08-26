import type { QuizQuestion } from "./types";

function q(sporsmal: string, alternativer: string[], riktigSvar: number, forklaring: string): QuizQuestion {
  return { sporsmal, alternativer, riktigSvar, forklaring };
}

export const KAP4_QUIZ: Record<string, QuizQuestion[]> = {
  "4A": [
    q(
      "Hva kjennetegner en funksjon $f$?",
      [
        "Hver $y$-verdi har nøyaktig én $x$-verdi",
        "Hver $x$-verdi i definisjonsmengden har nøyaktig én $y$-verdi",
        "Grafen må være en rett linje",
        "Funksjonen må gå gjennom origo",
      ],
      1,
      "Definisjonen: til hver tillatt $x$ hører nøyaktig ett tall $f(x)$. Flere $x$ kan gi samme $y$.",
    ),
    q(
      "Hva er definisjonsmengden $D_f$?",
      [
        "Alle tillatte $x$-verdier",
        "Alle mulige $y$-verdier",
        "Nullpunktene til grafen",
        "Skjæringspunktet med $y$-aksen",
      ],
      0,
      "$D_f$ er $x$-verdiene vi kan sette inn. Verdimengden $V_f$ er $y$-verdiene vi kan få ut.",
    ),
    q(
      "Et nullpunkt til grafen til $f$ er",
      [
        "der grafen skjærer $y$-aksen",
        "toppunktet",
        "et punkt der $f(x)=0$ (grafen skjærer $x$-aksen)",
        "alltid origo",
      ],
      2,
      "Nullpunkt betyr $y=0$, altså skjæring med $x$-aksen.",
    ),
    q(
      "Gitt $p(x)=5-\\sqrt{2x}$. Hva er $p(8)$?",
      ["$5$", "$1$", "$0$", "udefinert"],
      1,
      "$p(8)=5-\\sqrt{16}=5-4=1$.",
    ),
    q(
      "Kan likningen $f(c)=d$ ha mer enn én løsning for $c$, når $d$ er gitt?",
      [
        "Nei, en funksjon gir alltid bare én $x$ per $y$",
        "Ja, flere $x$ kan gi samme $y$ (f.eks. $x^2=4$)",
        "Bare hvis $f$ er lineær",
        "Bare hvis $d=0$",
      ],
      1,
      "Én $x$ gir én $y$, men én $y$ kan komme fra flere $x$. Parabelen $y=x^2$ har $y=4$ både i $x=2$ og $x=-2$.",
    ),
    q(
      "Gitt $g(x)=x^2+2x-3$. Hva er $g(2k)$?",
      ["$2k^2+4k-3$", "$4k^2+2k-3$", "$4k^2+4k-3$", "$k^2+4k-3$"],
      2,
      "$g(2k)=(2k)^2+2(2k)-3=4k^2+4k-3$. Husk parentes rundt $2k$.",
    ),
    q(
      "Gitt $B(t)=2\\pi t^2$. Hva er $B(2)$?",
      ["$2\\pi$", "$8\\pi$", "$4\\pi$", "$16\\pi$"],
      1,
      "$B(2)=2\\pi\\cdot 4=8\\pi$.",
    ),
    q(
      "Hvilken påstand er sann for $g(x)=x^2-4x+3$?",
      [
        "Nullpunktene er $x=0$ og $x=4$",
        "Grafen vender nedover",
        "Nullpunktene er $x=1$ og $x=3$",
        "$g(0)=3$ er et nullpunkt",
      ],
      2,
      "$(x-1)(x-3)=x^2-4x+3$. $g(0)=3$ er $y$-skjæringen, ikke et nullpunkt.",
    ),
  ],

  "4B": [
    q(
      "I $f(x)=ax+b$ er $a$",
      ["konstantleddet ($y$-skjæringen)", "stigningstallet", "nullpunktet", "definisjonsmengden"],
      1,
      "$a$ sier hvor mye $y$ øker når $x$ øker med $1$. $b$ er verdien når $x=0$.",
    ),
    q(
      "En linje gjennom $(1,5)$ og $(4,-1)$ har stigningstall",
      ["$2$", "$-2$", "$-1$", "$3$"],
      1,
      "$a=\\dfrac{-1-5}{4-1}=\\dfrac{-6}{3}=-2$.",
    ),
    q(
      "Linja gjennom $(5,0)$ og $(0,3)$ har likning",
      ["$y=\\dfrac{3}{5}x+3$", "$y=-\\dfrac{3}{5}x+3$", "$y=-\\dfrac{5}{3}x+5$", "$y=3x+5$"],
      1,
      "$b=3$. $a=\\dfrac{0-3}{5-0}=-\\dfrac{3}{5}$. Altså $y=-\\dfrac{3}{5}x+3$.",
    ),
    q(
      "To linjer er parallelle når de har",
      ["motsatt stigningstall", "samme konstantledd", "samme stigningstall og ulike konstantledd", "produkt av stigningstall lik $-1$"],
      2,
      "Samme helling, men forskjøvet. Produkt $-1$ gjelder vinkelrette linjer.",
    ),
    q(
      "Linja $y=-3x+2$ står vinkelrett på en linje med stigningstall",
      ["$-3$", "$3$", "$\\dfrac{1}{3}$", "$-\\dfrac{1}{3}$"],
      2,
      "Vinkelrett: $a_1\\cdot a_2=-1$, så $-3\\cdot a_2=-1$ og $a_2=\\dfrac{1}{3}$.",
    ),
    q(
      "$15x+45y=900$ skjærer $y$-aksen i",
      ["$(0,20)$", "$(0,60)$", "$(20,0)$", "$(15,0)$"],
      0,
      "$x=0$ gir $45y=900$, $y=20$. Punktet er $(0,20)$.",
    ),
    q(
      "$f(x)=x+2$ og $g(x)=-x+5$ skjærer hverandre når $x$ er",
      ["$2$", "$\\dfrac{3}{2}$", "$7$", "$0$"],
      1,
      "$x+2=-x+5$, $2x=3$, $x=\\dfrac{3}{2}$. Da $y=\\dfrac{7}{2}$.",
    ),
    q(
      "Likningen $px+qy=r$ ($q\\neq 0$) har stigningstall",
      ["$\\dfrac{p}{q}$", "$-\\dfrac{p}{q}$", "$\\dfrac{r}{q}$", "$p$"],
      1,
      "$qy=-px+r$, $y=-\\dfrac{p}{q}x+\\dfrac{r}{q}$.",
    ),
  ],

  "4C": [
    q(
      "Hvilket polynom er av tredje grad?",
      ["$x^2+3x-1$", "$2x^3-10x^2+14x-6$", "$5x-3$", "$\\dfrac{1}{x}+x$"],
      1,
      "Graden er høyeste eksponent med koeffisient $\\neq 0$. Her $3$.",
    ),
    q(
      "Nullpunktene til $g(x)=x^2+6x+5$ er",
      ["$x=1$ og $x=5$", "$x=-1$ og $x=-5$", "$x=0$ og $x=-6$", "$x=2$ og $x=3$"],
      1,
      "$(x+1)(x+5)=x^2+6x+5$.",
    ),
    q(
      "Parabelen $g(x)=x^2+6x+5$ har",
      ["toppunkt i $(-3,-4)$", "bunnpunkt i $(-3,-4)$", "bunnpunkt i $(0,5)$", "toppunkt i $(3,4)$"],
      1,
      "$a=1>0$, så den vender opp (bunnpunkt). Symmetrilinje $x=-\\dfrac{6}{2}=-3$, $g(-3)=-4$.",
    ),
    q(
      "En parabel med toppunkt $(1,4)$ som skjærer $x$-aksen i $x=3$, kan skrives",
      ["$f(x)=(x-1)^2+4$", "$f(x)=-(x-1)^2+4$", "$f(x)=(x-3)^2$", "$f(x)=x^2+4$"],
      1,
      "Toppunktform $a(x-1)^2+4$ med $a<0$ fordi den vender ned. $f(3)=0$ gir $a\\cdot 4+4=0$, $a=-1$.",
    ),
    q(
      "Tredjegraden med nullpunkt $-2$, $1$ og $3$ og $h(0)=12$ er",
      ["$(x+2)(x-1)(x-3)$", "$2(x+2)(x-1)(x-3)$", "$-2(x+2)(x-1)(x-3)$", "$x^3-12$"],
      1,
      "$h(0)=a(2)(-1)(-3)=6a=12$, så $a=2$.",
    ),
    q(
      "Andreaksen er",
      ["$x$-aksen", "$y$-aksen", "symmetrilinjen til parabelen", "linjen $y=x$"],
      1,
      "Andreaksen er $y$-aksen. Skjæring der: sett $x=0$.",
    ),
    q(
      "$T(t)=-0.2t^2+5.2t-18.8$ har ekstremalpunkt når $t$ er",
      ["$8$", "$13$", "$15$", "$5.2$"],
      1,
      "$t=-\\dfrac{b}{2a}=-\\dfrac{5.2}{2\\cdot(-0.2)}=13$. Siden $a<0$ er det et toppunkt.",
    ),
    q(
      "Hvis $P(x)=2(x-3)(x-1)^2$, hvor mange ulike nullpunkt har $P$?",
      ["$1$", "$2$", "$3$", "$4$"],
      1,
      "Null i $x=3$ (enkel) og $x=1$ (dobbel rot). To ulike $x$-verdier.",
    ),
  ],

  "4D": [
    q(
      "En rasjonal funksjon er",
      ["et polynom", "en brøk der teller og nevner er polynomer", "alltid $1/x$", "en funksjon uten asymptoter"],
      1,
      "F.eks. $k(x)=\\dfrac{3x-6}{x+2}$. Polynomer er det spesialtilfellet der nevneren er konstant.",
    ),
    q(
      "Loddrett asymptote oppstår typisk der",
      ["telleren er $0$", "nevneren er $0$ og telleren ikke er $0$", "$x\\to\\infty$", "grafen skjærer $y$-aksen"],
      1,
      "Nevner mot $0$ gjør at funksjonsverdien skyter mot $\\pm\\infty$.",
    ),
    q(
      "For $k(x)=\\dfrac{3x-6}{x+2}$ er den vannrette asymptoten",
      ["$x=-2$", "$y=3$", "$y=-3$", "$y=0$"],
      1,
      "Samme grad i teller og nevner: forholdet mellom ledende koeffisienter er $3/1=3$. Altså $y=3$.",
    ),
    q(
      "For $k(x)=\\dfrac{3x-6}{x+2}$ er den loddrette asymptoten",
      ["$x=2$", "$x=-2$", "$y=3$", "$x=0$"],
      1,
      "Nevner $x+2=0$ gir $x=-2$. Telleren er da $3(-2)-6=-12\\neq 0$.",
    ),
    q(
      "Nullpunktet til $k(x)=\\dfrac{3x-6}{x+2}$ er",
      ["$x=-2$", "$x=2$", "$x=0$", "$x=3$"],
      1,
      "Teller $3x-6=0$ og $x\\neq -2$ gir $x=2$.",
    ),
    q(
      "Definisjonsmengden til $k(x)=\\dfrac{3x-6}{x+2}$ er",
      ["$\\mathbb{R}$", "$\\mathbb{R}\\setminus\\{-2\\}$", "$\\mathbb{R}\\setminus\\{2\\}$", "$x>0$"],
      1,
      "Alt er tillatt unntatt der nevneren er $0$.",
    ),
    q(
      "Skrå asymptote kan oppstå når",
      [
        "teller og nevner har samme grad",
        "telleren har nøyaktig én grad høyere enn nevneren",
        "nevneren har høyere grad enn telleren",
        "funksjonen er lineær",
      ],
      1,
      "Polynomdivisjon gir da $ax+b$ pluss en rest som går mot $0$. $y=ax+b$ er skrå asymptote.",
    ),
    q(
      "$k(0)$ for $k(x)=\\dfrac{3x-6}{x+2}$ er",
      ["$3$", "$-3$", "$0$", "udefinert"],
      1,
      "$k(0)=\\dfrac{-6}{2}=-3$. Dette er $y$-skjæringen.",
    ),
  ],

  "4E": [
    q(
      "En potensfunksjon har formen",
      ["$f(x)=a\\cdot b^x$", "$f(x)=a\\cdot x^b$", "$f(x)=ax+b$", "$f(x)=\\dfrac{a}{x+b}$"],
      1,
      "Eksponenten $b$ er konstant, basen er variabelen $x$. Ikke omvendt — det er eksponentialfunksjon.",
    ),
    q(
      "Potensfunksjoner passer særlig godt til",
      ["rente og halveringstid", "areal, volum og liknende geometri/fysikk", "rettlinjet bevegelse", "periodiske svingninger"],
      1,
      "Areal $\\propto x^2$, volum $\\propto x^3$, mange empiriske lover er $a\\cdot x^b$.",
    ),
    q(
      "$V(t)=2{,}5\\cdot t^{0{,}6}$. Når $V=10$, er $t$ nærmest",
      ["$4$", "$10$", "$16$", "$25$"],
      1,
      "$t^{0{,}6}=4$, $t=4^{1/0{,}6}=4^{5/3}\\approx 10{,}1$.",
    ),
    q(
      "Hvis $A(x)=c\\cdot x^{1{,}9}$ og radiusen øker med $15\\,\\%$, øker arealet med omtrent",
      ["$15\\,\\%$", "$30\\,\\%$", "$1{,}9\\,\\%$", "$115\\,\\%$"],
      1,
      "Ny verdi: $1{,}15^{1{,}9}\\approx 1{,}304$, altså ca. $30\\,\\%$ økning.",
    ),
    q(
      "Gitt $C(x)=150\\cdot x^{-0{,}15}$. Hva skjer når $x$ øker?",
      ["$C$ øker", "$C$ avtar (mot $0$)", "$C$ er konstant", "$C$ blir negativ"],
      1,
      "Negativ eksponent gir avtakende potensfunksjon for $x>0$.",
    ),
    q(
      "$E(p)=25000\\cdot p^{-1{,}2}$. Etterspørselen ved $p=100$ er nærmest",
      ["$250$", "$100$", "$25$", "$25000$"],
      1,
      "$100^{1{,}2}=100\\cdot 100^{0{,}2}\\approx 251$, og $25000/251\\approx 100$.",
    ),
    q(
      "Hva skiller $f(x)=x^2$ fra $g(x)=2^x$?",
      [
        "Ingenting, de er like",
        "$f$ er potensfunksjon (variabel i basen), $g$ er eksponentialfunksjon (variabel i eksponenten)",
        "Begge er lineære",
        "$f$ har asymptote, $g$ har ikke",
      ],
      1,
      "Hvem som er variabel — basen eller eksponenten — avgjør funksjonstypen.",
    ),
    q(
      "For $x>0$ og $0<b<1$ er $f(x)=x^b$",
      ["avtakende og negativ", "voksende, men avtakende stigning (flater ut)", "en rett linje", "udefinert"],
      1,
      "F.eks. $\\sqrt{x}=x^{1/2}$: vokser, men saktere og saktere.",
    ),
  ],

  "4F": [
    q(
      "En eksponentialfunksjon har formen",
      ["$f(x)=a\\cdot x^b$", "$f(x)=a\\cdot b^x$", "$f(x)=ax+b$", "$f(x)=a/x$"],
      1,
      "Konstant base $b>0$, $b\\neq 1$, og variabelen i eksponenten.",
    ),
    q(
      "En årlig økning på $3\\,\\%$ gir vekstfaktor",
      ["$0{,}03$", "$1{,}03$", "$3$", "$0{,}97$"],
      1,
      "Ny verdi $=\\text{gammel}\\cdot 1{,}03$. Nedgang på $3\\,\\%$ ville gitt $0{,}97$.",
    ),
    q(
      "I $V(t)=400000\\cdot 0{,}85^t$ er den årlige prosentvise endringen",
      ["økning $85\\,\\%$", "nedgang $15\\,\\%$", "nedgang $85\\,\\%$", "økning $15\\,\\%$"],
      1,
      "Vekstfaktor $0{,}85=1-0{,}15$, altså $15\\,\\%$ årlig verditap.",
    ),
    q(
      "Eksponentialen gjennom $(0,5)$ og $(3,40)$ er",
      ["$f(x)=5\\cdot 8^x$", "$f(x)=5\\cdot 2^x$", "$f(x)=5x+35$", "$f(x)=40\\cdot 2^x$"],
      1,
      "$a=f(0)=5$. $5\\cdot b^3=40$, $b^3=8$, $b=2$.",
    ),
    q(
      "Halveringstid $T$ for $f(t)=a\\cdot b^t$ ($0<b<1$) oppfyller",
      ["$b^T=2$", "$b^T=0{,}5$", "$a=0{,}5$", "$T=b/2$"],
      1,
      "$f(t+T)=a b^{t+T}=a b^t b^T=f(t)\\cdot b^T$. Halvering krever $b^T=1/2$.",
    ),
    q(
      "En verdi faller fra $12000$ til $10800$ på ett år. Etter fem slike år til er verdien nærmest",
      ["$6000$", "$7086$", "$9000$", "$4320$"],
      1,
      "Faktor $10800/12000=0{,}9$ per år. $12000\\cdot 0{,}9^5=12000\\cdot 0{,}59049\\approx 7086$.",
    ),
    q(
      "Jevn årlig økning på $4\\,\\%$ i $10$ år gir total økning på omtrent",
      ["$40\\,\\%$", "$48\\,\\%$", "$4\\,\\%$", "$140\\,\\%$"],
      1,
      "$1{,}04^{10}\\approx 1{,}48$, altså ca. $48\\,\\%$ totalt — ikke $10\\cdot 4\\,\\%$.",
    ),
    q(
      "Startverdien i $V(t)=400000\\cdot 0{,}85^t$ er",
      ["$0{,}85$", "$400000$", "$340000$", "$0$"],
      1,
      "$V(0)=400000\\cdot 1=400000$ (verdien som ny).",
    ),
  ],

  "4G": [
    q(
      "Gjennomsnittlig vekstfart til $f$ på $[x_1,x_2]$ er",
      [
        "$f'(x_1)$",
        "$\\dfrac{f(x_2)-f(x_1)}{x_2-x_1}$",
        "$f(x_2)-f(x_1)$",
        "stigningstallet til tangenten i $x_1$",
      ],
      1,
      "Det er stigningstallet til sekanten gjennom de to punktene på grafen.",
    ),
    q(
      "Momentan vekstfart i et punkt er",
      [
        "gjennomsnittet over hele $D_f$",
        "stigningstallet til tangenten i punktet",
        "alltid $0$",
        "det samme som $f(x)$",
      ],
      1,
      "Grenseverdien av gjennomsnittsfarten når intervallet krymper mot punktet — altså $f'(x)$.",
    ),
    q(
      "Gitt $f(x)=-x^2+4x+2$. Gjennomsnittsfarten på $[0,2]$ er",
      ["$0$", "$2$", "$-2$", "$6$"],
      1,
      "$f(0)=2$, $f(2)=6$. $\\dfrac{6-2}{2}=2$.",
    ),
    q(
      "I topp- eller bunnpunktet til en glatt funksjon er den momentane vekstfarten",
      ["$1$", "$0$", "udefinert", "lik gjennomsnittsfarten overalt"],
      1,
      "Tangenten er vannrett, så $f'(x)=0$.",
    ),
    q(
      "En tangent i $(20,300)$ har stigningstall $15$. Den momentane vekstfarten når $x=20$ er",
      ["$300$", "$15$", "$20$", "$\\dfrac{300}{20}$"],
      1,
      "Momentan vekstfart $=$ tangentens stigningstall i det punktet.",
    ),
    q(
      "$f(20)=300$ og $f(40)=500$. Gjennomsnittsfarten på $[20,40]$ er",
      ["$15$", "$10$", "$200$", "$20$"],
      1,
      "$\\dfrac{500-300}{40-20}=\\dfrac{200}{20}=10$.",
    ),
    q(
      "Gjennomsnittsfart $0$ på $[1,5]$ betyr at",
      ["$f'(x)=0$ overalt på intervallet", "$f(1)=f(5)$", "$f$ er konstant lik $0$", "grafen er en rett linje"],
      1,
      "Telleren $f(5)-f(1)$ er $0$. Funksjonen kan stige og synke imellom (f.eks. en parabel).",
    ),
    q(
      "Gitt $f(x)=-x^2+4x+2$. Momentan vekstfart i $x=2$ er",
      ["$2$", "$0$", "$-2$", "$6$"],
      1,
      "Symmetrilinje $x=2$ er toppunktet, så tangenten er vannrett og $f'(2)=0$.",
    ),
  ],

  "4H": [
    q(
      "Den deriverte $f'(x)$ beskriver",
      ["funksjonsverdien", "den momentane vekstfarten (tangentens stigningstall)", "arealet under grafen", "nullpunktene"],
      1,
      "Grafisk: hvor bratt grafen er akkurat i $x$.",
    ),
    q(
      "Hvis $f'(x)>0$ på et intervall, så er $f$",
      ["avtakende der", "voksende der", "konstant der", "negativ der"],
      1,
      "Positiv stigning betyr at grafen går oppover. Fortegnet til $f$ selv avgjøres ikke av $f'$.",
    ),
    q(
      "Kandidater til ekstremalpunkt finner vi ved å",
      ["sette $f(x)=0$", "sette $f'(x)=0$ (og sjekke endepunkt)", "sette $x=0$", "derivere to ganger og stoppe"],
      1,
      "Vannrett tangent: $f'(x)=0$. Deretter fortegnslinje eller andrederivert for å skille max/min.",
    ),
    q(
      "Gitt $f(x)=5x-3$. Da er $f'(x)$ og $f'(2)$ lik",
      ["$5$ og $7$", "$5$ og $5$", "$0$ og $-3$", "$5x$ og $10$"],
      1,
      "Den deriverte av en lineær funksjon er stigningstallet, en konstant. $f'(2)=5$.",
    ),
    q(
      "Gitt $f(x)=-7$. Da er $f'(x)$",
      ["$-7$", "$0$", "$-7x$", "udefinert"],
      1,
      "Konstant funksjon har vannrett graf, stigning $0$.",
    ),
    q(
      "Gitt $g(x)=-x^2+4x$. Løsningen på $g'(x)=0$ er",
      ["$x=0$", "$x=2$", "$x=4$", "$x=-2$"],
      1,
      "$g'(x)=-2x+4=0$ gir $x=2$. Det er toppunktet.",
    ),
    q(
      "$f'$ er negativ for $x<-1$, null i $x=-1$, positiv fram til $x=3$, null i $x=3$, og negativ etter. Da har $f$",
      [
        "toppunkt i $x=-1$ og bunnpunkt i $x=3$",
        "bunnpunkt i $x=-1$ og toppunkt i $x=3$",
        "bare nullpunkt i $\\pm 1$",
        "ingen ekstremalpunkt",
      ],
      1,
      "Synkende $\\to$ bunnpunkt $\\to$ stigende $\\to$ toppunkt $\\to$ synkende.",
    ),
    q(
      "Hvis $f'(x)=2x-4$ og $f(0)=2$, så er $f(x)$",
      ["$2x-4$", "$x^2-4x+2$", "$x^2-4x$", "$2x^2-4x+2$"],
      1,
      "Antiderivert: $x^2-4x+C$. $f(0)=C=2$.",
    ),
  ],
};
