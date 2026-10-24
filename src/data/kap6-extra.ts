import type { Oppgave } from "./types";

// Ekstraøvinger for kapittel 6. Alle tall er kontrollert med numpy/sympy.

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

export const KAP6_EXTRA: Record<string, Oppgave[]> = {
  "6A": [
    o(
      "6A.1",
      "Grafen viser fire funksjoner $f$, $g$, $h$ og $k$.<br><br>Hvilken graf passer best til hver situasjon? Begrunn med formen på grafen.<br><br><strong>a)</strong> Verdien av en bil som synker med samme prosent hvert år.<br><br><strong>b)</strong> Prisen for en taxitur med fast startpris og fast pris per km.<br><br><strong>c)</strong> Høyden til en ball som kastes opp.<br><br><strong>d)</strong> Svingetiden til en pendel, $T=2\\sqrt l$, som funksjon av lengden.",
      "Rett linje: lineær. Avtar raskt først og flater ut: eksponentiell nedgang. Toppunkt: andregrads. Stiger brattest i starten og så stadig slakere uten toppunkt: potens med $0<b<1$.",
      [
        "<strong>a)</strong> $g$: avtar raskt først og flater ut mot $0$. Det er eksponentiell nedgang.",
        "<strong>b)</strong> $f$: en rett linje som starter over $0$ (startprisen).",
        "<strong>c)</strong> $h$: en parabel med toppunkt.",
        "<strong>d)</strong> $k$: starter i $0$, stiger brattest først og blir stadig slakere. Det passer med $2\\sqrt l=2\\cdot l^{0{,}5}$.<br><strong>Svar:</strong> a) $g$ b) $f$ c) $h$ d) $k$",
      ],
    ),
    o(
      "6A.2",
      "Hvilken modelltype passer til hver tabell? Finn modellen.<br><br><strong>a)</strong><table><tr><th>$x$</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td></tr><tr><th>$y$</th><td>$800$</td><td>$720$</td><td>$648$</td><td>$583{,}2$</td><td>$524{,}88$</td></tr></table><br><strong>b)</strong><table><tr><th>$x$</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td></tr><tr><th>$y$</th><td>$2$</td><td>$8$</td><td>$18$</td><td>$32$</td></tr></table>",
      "Se på differansene og forholdene mellom etterfølgende $y$-verdier. I b): sammenlign $y$ med $x^2$.",
      [
        "<strong>a)</strong> Forholdet er hele tiden $\\dfrac{720}{800}=0{,}9$. Eksponentiell modell: $y=800\\cdot 0{,}9^x$ (nedgang på $10\\,\\%$ per steg).",
        "<strong>b)</strong> Differansene $6,\\ 10,\\ 14$ øker, og forholdene er ikke faste. Men $y=2\\cdot 1^2,\\ 2\\cdot 2^2,\\ 2\\cdot 3^2,\\ 2\\cdot 4^2$. Potensmodell (og andregradsmodell): $y=2x^2$.<br><strong>Svar:</strong> a) $y=800\\cdot 0{,}9^x$ b) $y=2x^2$",
      ],
    ),
    o(
      "6A.3",
      "En mobil lades fra $15\\,\\%$. Batterinivået (prosent) etter $t$ minutter er tilnærmet $B(t)=15+1{,}7t$.<br><br><strong>a)</strong> Hva betyr tallene $15$ og $1{,}7$?<br><br><strong>b)</strong> Når er batteriet fullt ladet ifølge modellen?<br><br><strong>c)</strong> Finn et rimelig gyldighetsområde. Hva sier modellen om $t=60$?",
      "Fullt batteri er $100\\,\\%$.",
      [
        "<strong>a)</strong> $15$: batterinivået ved start (prosent). $1{,}7$: økning i prosentpoeng per minutt.",
        "<strong>b)</strong> $15+1{,}7t=100$ gir $t=50$ min",
        "<strong>c)</strong> $D_B=[0,\\;50]$. $B(60)=117$, men batteriet kan ikke bli mer enn $100\\,\\%$ ladet. Modellen gjelder ikke der.<br><strong>Svar:</strong> fullt etter $50$ min; $D_B=[0,\\;50]$",
      ],
    ),
    o(
      "6A.4",
      "En aksje var verdt $2000$ kr i starten av 2024 og $2420$ kr i starten av 2026. Anta at verdien har vokst med samme prosent hvert år.<br><br><strong>a)</strong> Finn vekstfaktoren og den årlige prosentvise veksten.<br><br><strong>b)</strong> Lag en modell $V(x)$, der $x$ er antall år etter starten av 2024.<br><br><strong>c)</strong> Hva sier modellen om verdien i starten av 2030? Hvor sikkert er svaret?",
      "Over to år er verdien ganget med $b^2$.",
      [
        "<strong>a)</strong> $b^2=\\dfrac{2420}{2000}=1{,}21$, så $b=1{,}1$. Veksten er $10\\,\\%$ per år.",
        "<strong>b)</strong> $V(x)=2000\\cdot 1{,}1^x$",
        "<strong>c)</strong> $V(6)=2000\\cdot 1{,}1^6\\approx 3543$ kr. Aksjekurser svinger mye, og modellen bygger på bare to verdier. Svaret er svært usikkert (ekstrapolering).<br><strong>Svar:</strong> $10\\,\\%$; $V(x)=2000\\cdot 1{,}1^x$; ca. $3543$ kr",
      ],
    ),
  ],
  "6B": [
    o(
      "6B.1",
      "Måledata og modellen $y=2x+1$ er gitt.<table><tr><th>$x$</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$y$</th><td>$3{,}4$</td><td>$4{,}8$</td><td>$7{,}3$</td><td>$8{,}7$</td><td>$11{,}2$</td></tr></table><br><strong>a)</strong> Regn ut avviket (residualen) $y-(2x+1)$ for hvert punkt.<br><br><strong>b)</strong> Regn ut summen av de kvadrerte avvikene.<br><br><strong>c)</strong> Tegn avvikene i et diagram. Passer modellen godt?",
      "Avvik $=$ målt verdi $-$ modellverdi. Positivt avvik betyr at punktet ligger over linjen.",
      [
        "<strong>a)</strong> Modellverdiene er $3,\\ 5,\\ 7,\\ 9,\\ 11$. Avvikene er $0{,}4,\\ -0{,}2,\\ 0{,}3,\\ -0{,}3,\\ 0{,}2$.",
        "<strong>b)</strong> $0{,}16+0{,}04+0{,}09+0{,}09+0{,}04=0{,}42$",
        "<strong>c)</strong> Avvikene er små og veksler mellom positive og negative uten noe mønster. Modellen passer godt.<br><strong>Svar:</strong> sum av kvadrerte avvik $0{,}42$; modellen passer godt",
      ],
    ),
    o(
      "6B.2",
      "Bruk bremselengdedataene fra oppgave 6.11:<table><tr><th>$v$</th><td>$30$</td><td>$40$</td><td>$50$</td><td>$60$</td><td>$70$</td><td>$80$</td></tr><tr><th>$s$</th><td>$9$</td><td>$15$</td><td>$23$</td><td>$33$</td><td>$44$</td><td>$57$</td></tr></table><br><strong>a)</strong> Finn en lineær modell ved regresjon.<br><br><strong>b)</strong> Regn ut avvikene $s-\\text{modell}$. Hvilket mønster ser du?<br><br><strong>c)</strong> Hva forteller mønsteret om valget av modell?",
      "Lag en tabell med målt verdi, modellverdi og avvik.",
      [
        "<strong>a)</strong> $s\\approx 0{,}963v-22{,}79$",
        "<strong>b)</strong> Avvikene er ca. $2{,}9;\\ -0{,}7;\\ -2{,}4;\\ -2{,}0;\\ -0{,}6;\\ 2{,}8$. Positive i endene og negative i midten.",
        "<strong>c)</strong> Avvikene har et systematisk mønster (som en parabel). Dataene krummer, så en andregradsmodell passer bedre, slik som i oppgave 6.11.<br><strong>Svar:</strong> mønster $+,-,-,-,-,+$: velg andregradsmodell",
      ],
    ),
    o(
      "6B.3",
      "Diagrammet viser temperaturen $y$ ($^\\circ$C) i en kopp te $x$ minutter etter at den ble satt i et kjøleskap (tenkte data).<table><tr><th>$x$ (min)</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$y$ ($^\\circ$C)</th><td>$80$</td><td>$62$</td><td>$49$</td><td>$38$</td><td>$30$</td><td>$23$</td></tr></table><br><strong>a)</strong> Hvilken type regresjon bør du velge? Begrunn ut fra diagrammet og tabellen.<br><br><strong>b)</strong> Finn modellen.<br><br><strong>c)</strong> Hva sier modellen om temperaturen etter $8$ minutter? Er det realistisk etter svært lang tid?",
      "Regn ut forholdet mellom etterfølgende $y$-verdier.",
      [
        "<strong>a)</strong> Punktene synker raskt først og flater ut. Forholdene $\\tfrac{62}{80}\\approx 0{,}78$, $\\tfrac{49}{62}\\approx 0{,}79$, … er nesten like. Eksponentiell regresjon.",
        "<strong>b)</strong> $y\\approx 79{,}95\\cdot 0{,}781^x$",
        "<strong>c)</strong> $y(8)\\approx 11\\,^\\circ$C. Modellen går mot $0\\,^\\circ$C, men teen kan ikke bli kaldere enn kjøleskapet (ca. $4\\,^\\circ$C). For store $x$ gjelder ikke modellen.<br><strong>Svar:</strong> $y\\approx 79{,}95\\cdot 0{,}781^x$; ca. $11\\,^\\circ$C",
      ],
    ),
    o(
      "6B.4",
      "Tabellen viser omtrentlig energibehov $E$ (kcal per døgn) for pattedyr med masse $m$ (kg) (tenkte data).<table><tr><th>$m$ (kg)</th><td>$1$</td><td>$5$</td><td>$10$</td><td>$50$</td><td>$100$</td></tr><tr><th>$E$ (kcal)</th><td>$70$</td><td>$234$</td><td>$394$</td><td>$1317$</td><td>$2214$</td></tr></table><br><strong>a)</strong> Finn en potensmodell $E(m)=a\\cdot m^b$ ved regresjon.<br><br><strong>b)</strong> Hva er energibehovet til et dyr på $20$ kg ifølge modellen?<br><br><strong>c)</strong> Et dyr er dobbelt så tungt som et annet. Trenger det dobbelt så mye energi? Bruk modellen.",
      "RegPot i GeoGebra. I c): sammenlign $E(2m)$ med $E(m)$.",
      [
        "<strong>a)</strong> $E(m)\\approx 70{,}0\\cdot m^{0{,}750}$",
        "<strong>b)</strong> $E(20)\\approx 662$ kcal",
        "<strong>c)</strong> $\\dfrac{E(2m)}{E(m)}=2^{0{,}75}\\approx 1{,}68$. Det trenger bare ca. $68\\,\\%$ mer energi, ikke dobbelt så mye.<br><strong>Svar:</strong> $E\\approx 70\\cdot m^{0{,}75}$; ca. $662$ kcal",
      ],
    ),
  ],
  "6C": [
    o(
      "6C.1",
      "To bakteriekulturer vokser. Antallet etter $x$ timer er<br><br>$$A(x)=1200+150x\\qquad B(x)=800\\cdot 1{,}12^x$$<br><strong>a)</strong> Hvilken kultur er størst ved start? Beskriv veksten til hver av dem.<br><br><strong>b)</strong> Bruk graf eller CAS: Når blir kultur B større enn kultur A?<br><br><strong>c)</strong> Hvorfor vil B alltid gå forbi A til slutt?",
      "Tegn begge grafene i GeoGebra og finn skjæringspunktet med <em>Skjæring</em>.",
      [
        "<strong>a)</strong> $A(0)=1200$ og $B(0)=800$, så A er størst ved start. A vokser med $150$ bakterier per time (lineært). B vokser med $12\\,\\%$ per time (eksponentielt).",
        "<strong>b)</strong> $A(x)=B(x)$ gir $x\\approx 11{,}4$ timer. Etter ca. $11{,}4$ timer er B størst.",
        "<strong>c)</strong> Den eksponentielle veksten øker for hver time, mens den lineære er fast. Til slutt vokser B mye raskere.<br><strong>Svar:</strong> B går forbi A etter ca. $11{,}4$ timer",
      ],
    ),
    o(
      "6C.2",
      "En stein kastes opp fra en bro. Høyden over vannet etter $t$ sekunder er $h(t)=-5t^2+12t+1$ meter.<br><br><strong>a)</strong> Hvor høyt over vannet kastes steinen fra?<br><br><strong>b)</strong> Finn toppunktet.<br><br><strong>c)</strong> Når treffer steinen vannet? Angi gyldighetsområdet.",
      "$t=-\\dfrac{b}{2a}$ gir toppunktet.",
      [
        "<strong>a)</strong> $h(0)=1$ m",
        "<strong>b)</strong> $t=\\dfrac{-12}{-10}=1{,}2$ s og $h(1{,}2)=-7{,}2+14{,}4+1=8{,}2$ m",
        "<strong>c)</strong> $h(t)=0$ gir $t\\approx 2{,}48$ s (den negative løsningen forkastes). $D_h=[0,\\;2{,}48]$<br><strong>Svar:</strong> topp $8{,}2$ m etter $1{,}2$ s; treffer vannet etter ca. $2{,}5$ s",
      ],
    ),
    o(
      "6C.3",
      "En togtur koster $120$ kr uten rabattkort. Et rabattkort koster $990$ kr per år og gir turer til $60$ kr.<br><br><strong>a)</strong> Lag modeller $U(x)$ og $R(x)$ for årlig kostnad uten og med rabattkort når du tar $x$ turer.<br><br><strong>b)</strong> Hvor mange turer må du ta før rabattkortet lønner seg?<br><br><strong>c)</strong> Hva er gyldighetsområdet for modellene?",
      "Løs $R(x)<U(x)$. Antall turer er et helt tall.",
      [
        "<strong>a)</strong> $U(x)=120x$ og $R(x)=60x+990$",
        "<strong>b)</strong> $60x+990<120x$ gir $x>16{,}5$. Rabattkortet lønner seg fra $17$ turer.",
        "<strong>c)</strong> $x$ er et helt tall og $x\\ge 0$. Kortet gjelder ett år, så $x$ er antall turer i løpet av året.<br><strong>Svar:</strong> fra $17$ turer",
      ],
    ),
    o(
      "6C.4",
      "En strikkebutikk har prøvd ulike priser $p$ (kr) på en lue og notert hvor mange luer $n$ som ble solgt per måned.<table><tr><th>$p$ (kr)</th><td>$100$</td><td>$150$</td><td>$200$</td><td>$250$</td><td>$300$</td></tr><tr><th>$n$</th><td>$82$</td><td>$70$</td><td>$61$</td><td>$49$</td><td>$40$</td></tr></table><br><strong>a)</strong> Finn en lineær modell $n(p)$ ved regresjon.<br><br><strong>b)</strong> Vis at inntekten er tilnærmet $I(p)=-0{,}21p^2+102{,}4p$.<br><br><strong>c)</strong> Hvilken pris gir størst inntekt, og hvor stor blir den?<br><br><strong>d)</strong> Drøft hvor godt modellen kan brukes.",
      "Inntekt $=$ pris $\\cdot$ antall solgt.",
      [
        "<strong>a)</strong> $n(p)\\approx -0{,}21p+102{,}4$",
        "<strong>b)</strong> $I(p)=p\\cdot n(p)=p(-0{,}21p+102{,}4)=-0{,}21p^2+102{,}4p$",
        "<strong>c)</strong> $p=\\dfrac{-102{,}4}{2\\cdot(-0{,}21)}\\approx 244$ kr. Da selges ca. $51$ luer, og $I\\approx 12\\,483$ kr.",
        "<strong>d)</strong> Optimal pris ligger inne i dataområdet ($100$–$300$ kr), så det er interpolering. Modellen bygger likevel på få måneder, og salget kan variere med sesong.<br><strong>Svar:</strong> ca. $244$ kr gir ca. $12\\,500$ kr per måned",
      ],
    ),
  ],
};
