import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, våren 2026 (19.05.2026). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 3 timer.
 */
export const EKSAMEN_1P_V2026: Exam = officialExam({
  id: "1p-v2026",
  title: "Eksamen vår 2026",
  season: "vår",
  year: 2026,
  date: "19.05.2026",
  del1Minutes: 180,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "19.05.2026", "1P_V26_LK20.pdf"),
  del1: [
    single("1p-v26-d1-1", "1", 1,
      U + r`En bonde har 60 sauer. 80 % av sauene skal slaktes.<br>Hvor mange sauer skal slaktes?`,
      r`80 % av en mengde er $0{,}8$ ganger mengden. Du kan også finne 20 % først (en femtedel) og trekke fra.`,
      [
        r`$80\ \% = 0{,}8$, så antall sauer som skal slaktes er $0{,}8\cdot 60$.`,
        r`$0{,}8\cdot 60 = 8\cdot 6 = 48$.`,
        r`<strong>Svar:</strong> $48$ sauer skal slaktes.`,
      ],
      ["prosent"]),
    single("1p-v26-d1-2", "2", 1,
      U + r`En familie leser av vannmåleren og ser at de i løpet av det siste året har brukt $120\ \text{m}^3$ vann.<br>Hvor mange liter vann har familien i gjennomsnitt brukt hver måned?`,
      r`Gjør om kubikkmeter til liter først ($1\ \text{m}^3 = 1000$ L). Et år har 12 måneder.`,
      [
        r`$120\ \text{m}^3 = 120\cdot 1000\ \text{L} = 120\,000$ L.`,
        r`Gjennomsnitt per måned: $120\,000 : 12 = 10\,000$.`,
        r`<strong>Svar:</strong> Familien har i gjennomsnitt brukt $10\,000$ liter vann per måned.`,
      ],
      ["måleenheter", "gjennomsnitt"]),
    single("1p-v26-d1-3", "3", 1,
      U + r`Regn ut<br>$250\,000\,000\cdot 0{,}000\,008$`,
      r`Skriv begge tallene på standardform og gang tallene og tierpotensene hver for seg.`,
      [
        r`$250\,000\,000 = 2{,}5\cdot 10^{8}$ og $0{,}000\,008 = 8\cdot 10^{-6}$.`,
        r`Produktet er $2{,}5\cdot 8\cdot 10^{8}\cdot 10^{-6} = 20\cdot 10^{2}$.`,
        r`$20\cdot 10^{2} = 2000$.`,
        r`<strong>Svar:</strong> $2000$`,
      ],
      ["standardform", "potenser"]),
    single("1p-v26-d1-4", "4", 1,
      U + r`<table><tr><th>Antall personer</th><td>$10$</td><td>$20$</td><td></td></tr><tr><th>Pris per person (kroner)</th><td>$600$</td><td></td><td>$100$</td></tr></table>Skriv av og fyll ut tabellen ovenfor slik at antall personer og pris per person blir omvendt proporsjonale størrelser.`,
      r`Ved omvendt proporsjonalitet er produktet av de to størrelsene det samme i alle kolonner.`,
      [
        r`Første kolonne gir produktet $10\cdot 600 = 6000$.`,
        r`Kolonne 2: $20\cdot y = 6000$, så $y = 6000 : 20 = 300$ kroner.`,
        r`Kolonne 3: $x\cdot 100 = 6000$, så $x = 6000 : 100 = 60$ personer.`,
        r`<strong>Svar:</strong> Antall personer: $10,\ 20,\ 60$. Pris per person: $600,\ 300,\ 100$ kroner.`,
      ],
      ["omvendt proporsjonalitet"]),
    single("1p-v26-d1-5", "5", 2,
      U + r`Gjør beregninger og sorter tallene i stigende rekkefølge.<br>$\sqrt{81}$, $\;\sqrt{10^{6}}$, $\;3^{-2}$, $\;10^{-1}$, $\;10^{2}$, $\;2\cdot 2^{4}$, $\;\dfrac{1}{2^{3}}$`,
      r`Regn ut hvert tall for seg. Negative eksponenter gir brøker: $a^{-n} = \dfrac{1}{a^{n}}$.`,
      [
        r`$\sqrt{81} = 9$ og $\sqrt{10^{6}} = 10^{3} = 1000$.`,
        r`$3^{-2} = \dfrac{1}{3^{2}} = \dfrac{1}{9}$ og $10^{-1} = \dfrac{1}{10} = 0{,}1$.`,
        r`$10^{2} = 100$, $\;2\cdot 2^{4} = 2^{5} = 32$ og $\dfrac{1}{2^{3}} = \dfrac{1}{8} = 0{,}125$.`,
        r`Brøkene i rekkefølge: $\dfrac{1}{10} < \dfrac{1}{9} < \dfrac{1}{8}$, fordi en større nevner gir en mindre brøk.`,
        r`<strong>Svar:</strong> $10^{-1} < 3^{-2} < \dfrac{1}{2^{3}} < \sqrt{81} < 2\cdot 2^{4} < 10^{2} < \sqrt{10^{6}}$`,
      ],
      ["potenser", "kvadratrøtter"]),
    single("1p-v26-d1-6", "6", 1,
      U + r`Prisen for en vare settes opp med 10 %.<br>Litt senere settes prisen ned igjen med 10 %.<br>Koster varen nå mer enn, mindre enn eller det samme som den gjorde før de to prisendringene? Husk å begrunne svaret.`,
      r`Prosentene regnes av ulike beløp. Prøv med en pris på 100 kroner.`,
      [
        r`Oppgang på 10 % gir vekstfaktor $1{,}10$. Nedgang på 10 % gir vekstfaktor $0{,}90$.`,
        r`Samlet vekstfaktor: $1{,}10\cdot 0{,}90 = 0{,}99$.`,
        r`Eksempel: $100\to 110\to 99$ kroner. Nedgangen på 10 % regnes av den høyere prisen $110$, så den er større enn oppgangen.`,
        r`<strong>Svar:</strong> Varen koster nå mindre enn før, nemlig $99\ \%$ av den opprinnelige prisen.`,
      ],
      ["prosent", "vekstfaktor"]),
    single("1p-v26-d1-7", "7", 2,
      U + r`Christoffer har kjøpt ny båt. Båtens verdi er 850 000 kroner. Anta at verdien vil falle med 20 % det første året og så med 6 % per år de neste fem årene.<br>Sett opp et uttrykk som kan brukes for å regne ut båtens verdi etter seks år.`,
      r`Første år: vekstfaktor $0{,}80$. De fem neste årene: vekstfaktor $0{,}94$ hvert år.`,
      [
        r`Nedgang på 20 % gir vekstfaktor $1 - 0{,}20 = 0{,}80$. Nedgang på 6 % gir vekstfaktor $1 - 0{,}06 = 0{,}94$.`,
        r`Etter første år: $850\,000\cdot 0{,}80$. Så ganges verdien med $0{,}94$ fem ganger.`,
        r`<strong>Svar:</strong> $850\,000\cdot 0{,}80\cdot 0{,}94^{5}$ kroner`,
      ],
      ["vekstfaktor", "prosentvis endring"]),
    single("1p-v26-d1-8", "8", 2,
      U + r`En stålplate har form som et rektangel.<br>Platen er 1000 mm lang, 500 mm bred og 6 mm tykk.<br>Stål har en massetetthet på $8\ \text{g}/\text{cm}^3$.<br>Hvor mye veier stålplaten?`,
      r`Platen er en rett blokk. Gjør om til cm før du regner ut volumet, så massetettheten kan brukes direkte.`,
      [
        r`$1000\ \text{mm} = 100\ \text{cm}$, $\;500\ \text{mm} = 50\ \text{cm}$ og $6\ \text{mm} = 0{,}6\ \text{cm}$.`,
        r`Volum: $V = 100\cdot 50\cdot 0{,}6\ \text{cm}^3 = 3000\ \text{cm}^3$.`,
        r`Masse: $3000\ \text{cm}^3\cdot 8\ \text{g}/\text{cm}^3 = 24\,000$ g.`,
        r`$24\,000\ \text{g} = 24$ kg.`,
        r`<strong>Svar:</strong> Stålplaten veier $24$ kg.`,
      ],
      ["volum", "måleenheter", "tetthet"]),
    multi("1p-v26-d1-9", "9", 4,
      U + r`Petter, Ola og Ine eier hver sin hytte. Hyttene ligger i et stort hyttefelt. På veien inn til hyttefeltet er det satt opp en bom. Alle hytteeierne må betale en fast årsavgift for å kunne bruke veien. I tillegg må de betale for hver bompassering.<br>I fjor passerte Petter bommen 40 ganger. Han betalte til sammen 3200 kroner i årsavgift og for passeringer.<br>Ola passerte bommen 100 ganger og betalte til sammen 6200 kroner.`,
      [
        part("1p-v26-d1-9", "a", r`Hvor mye betaler hver hytteeier i årsavgift?<br>Hva er prisen per bompassering?`,
          r`Forskjellen i pris skyldes bare de ekstra passeringene. Finn først hvor mange flere ganger Ola passerte og hvor mye mer han betalte.`,
          [
            r`Ola passerte $100 - 40 = 60$ flere ganger enn Petter og betalte $6200 - 3200 = 3000$ kroner mer.`,
            r`Pris per passering: $3000 : 60 = 50$ kroner.`,
            r`Petter betalte $40\cdot 50 = 2000$ kroner for passeringene. Årsavgiften er $3200 - 2000 = 1200$ kroner.`,
            r`Kontroll med Ola: $100\cdot 50 + 1200 = 6200$. Det stemmer.`,
            r`<strong>Svar:</strong> Årsavgiften er $1200$ kroner, og hver bompassering koster $50$ kroner.`,
          ]),
        part("1p-v26-d1-9", "b", r`Sett opp en lineær modell som viser sammenhengen mellom antall bompasseringer og den totale prisen hver hytteeier må betale hvert år.`,
          r`En lineær modell har formen $y = ax + b$. Bruk tallene fra a).`,
          [
            r`La $x$ være antall bompasseringer og $y$ total pris i kroner.`,
            r`Stigningstallet er prisen per passering, $50$. Konstantleddet er årsavgiften, $1200$.`,
            r`<strong>Svar:</strong> $y = 50x + 1200$`,
          ]),
        part("1p-v26-d1-9", "c", r`Ine betalte til sammen 5200 kroner.<br>Hvor mange ganger passerte hun bommen?`,
          r`Sett $y = 5200$ i modellen og løs likningen.`,
          [
            r`$50x + 1200 = 5200$`,
            r`$50x = 5200 - 1200 = 4000$`,
            r`$x = 4000 : 50 = 80$`,
            r`<strong>Svar:</strong> Ine passerte bommen $80$ ganger.`,
          ]),
      ],
      ["lineære modeller", "likninger"]),
    multi("1p-v26-d1-10", "10", 2,
      U + r`Susanne arbeider med tallfølgen<br>$1,\ 3,\ 7,\ 13,\ 21,\ \ldots$<br>Hun ser et mønster og skriver<br>$0\cdot 1 + 1 = 1$<br>$1\cdot 2 + 1 = 3$<br>$2\cdot 3 + 1 = 7$<br>$3\cdot 4 + 1 = 13$`,
      [
        part("1p-v26-d1-10", "a", r`Bestem tall nummer 8 i tallfølgen.`,
          r`Se hvordan tall nummer 1, 2, 3 og 4 er bygd opp. Tall nummer $n$ bruker faktorene $n-1$ og $n$.`,
          [
            r`Tall nummer 1: $0\cdot 1 + 1$. Tall nummer 2: $1\cdot 2 + 1$. Tall nummer 4: $3\cdot 4 + 1$.`,
            r`Tall nummer 8: $7\cdot 8 + 1 = 56 + 1 = 57$.`,
            r`<strong>Svar:</strong> Tall nummer 8 er $57$.`,
          ]),
        part("1p-v26-d1-10", "b", r`Sett opp en formel som Susanne kan bruke for finne tall nummer $n$ i tallfølgen.`,
          r`Skriv mønsteret med $n$ i stedet for tallene.`,
          [
            r`Tall nummer $n$ er produktet av $n-1$ og $n$, pluss $1$.`,
            r`Kontroll for $n = 5$: $4\cdot 5 + 1 = 21$. Det stemmer med følgen.`,
            r`<strong>Svar:</strong> Tall nummer $n$ er $(n-1)\cdot n + 1 = n^{2} - n + 1$.`,
          ]),
      ],
      ["tallfølger", "formler"]),
    multi("1p-v26-d1-11", "11", 3,
      U + r`En bedrift produserer en vare. Kostnadene $K(x)$ kroner ved produksjon av $x$ enheter av varen er gitt ved<br>$K(x) = x^{2} + b\cdot x + 20\,000$`,
      [
        part("1p-v26-d1-11", "a", r`Bestem $K(0)$. Hva forteller denne verdien om kostnadene ved produksjonen?`,
          r`Sett $x = 0$ i uttrykket for $K(x)$.`,
          [
            r`$K(0) = 0^{2} + b\cdot 0 + 20\,000 = 20\,000$.`,
            r`Når ingen enheter produseres, er kostnaden likevel $20\,000$ kroner. Det er de faste kostnadene.`,
            r`<strong>Svar:</strong> $K(0) = 20\,000$. Bedriften har faste kostnader på $20\,000$ kroner som ikke avhenger av hvor mye som produseres.`,
          ]),
        part("1p-v26-d1-11", "b", r`Det koster 30 000 kroner å produsere 50 enheter.<br>Bestem $b$.`,
          r`Det oppgitte betyr $K(50) = 30\,000$. Sett $x = 50$ og løs likningen for $b$.`,
          [
            r`$K(50) = 50^{2} + b\cdot 50 + 20\,000 = 30\,000$`,
            r`$2500 + 50b + 20\,000 = 30\,000$`,
            r`$50b = 30\,000 - 22\,500 = 7500$`,
            r`$b = 7500 : 50 = 150$`,
            r`<strong>Svar:</strong> $b = 150$`,
          ]),
      ],
      ["funksjoner", "likninger"]),
    single("1p-v26-d1-12", "12", 2,
      U + r`Lufttetthet er et mål på hvor mye luftmasse det er i et bestemt volum, altså hvor tettpakket luften er.<br>I tørr luft er sammenhengen mellom lufttettheten $L$, trykket $p$ og temperaturen $T$ gitt ved<br>$L = \dfrac{p}{287\cdot T}$<br>Argumenter for om hver påstand nedenfor er sann eller usann.<br><strong>Påstand 1:</strong> Når temperaturen er konstant, er trykk og lufttetthet proporsjonale størrelser.<br><strong>Påstand 2:</strong> Lufttetthet og temperatur er omvendt proporsjonale størrelser.`,
      r`Proporsjonale størrelser har konstant forhold $\dfrac{y}{x}$. Omvendt proporsjonale størrelser har konstant produkt $x\cdot y$. Spør deg hvilke størrelser som må holdes fast i hver påstand.`,
      [
        r`<strong>Påstand 1.</strong> Vi holder $T$ fast. Da står det bare $p$ som variabel i formelen: $L = \dfrac{1}{287\cdot T}\cdot p$, og faktoren foran $p$ er et fast tall. Forholdet $\dfrac{L}{p} = \dfrac{1}{287\cdot T}$ er altså konstant, så dobles trykket, dobles lufttettheten. Påstanden er sann.`,
        r`<strong>Påstand 2.</strong> Omvendt proporsjonalitet mellom $L$ og $T$ betyr at produktet $L\cdot T$ er konstant. Fra formelen får vi $L\cdot T = \dfrac{p}{287}$. Produktet er bare fast dersom $p$ er fast. Oppgaven sier ikke at trykket er konstant, så $L\cdot T$ kan endre seg.`,
        r`Et eksempel som viser det: Ved $p = 100\,000$ er $L \approx 1{,}16$ når $T = 300$ og $L \approx 0{,}58$ når $T = 600$, så her halveres $L$ når $T$ dobles. Men dersom trykket også dobles til $p = 200\,000$ samtidig som $T = 600$, får vi igjen $L \approx 1{,}16$, og da er $L$ uendret selv om $T$ er doblet.`,
        r`<strong>Annen tolkning:</strong> Hvis oppgaven er ment slik at trykket skal holdes konstant, på samme måte som temperaturen i påstand 1, er $L\cdot T = \dfrac{p}{287}$ et fast tall, og da er påstand 2 riktig.`,
        r`<strong>Svar:</strong> Påstand 1 er sann. Påstand 2 er usann slik den står, fordi den bare stemmer når trykket $p$ er konstant. Med konstant trykk er den riktig.`,
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet"],
      "Påstand 2 kan leses på to måter. Slik den står, uten at trykket er oppgitt som konstant, er den usann (hovedsvaret). Hvis trykket regnes som konstant, er den riktig (matematikk.net leser den slik). Begge tolkningene er vist i løsningen."),
    multi("1p-v26-d1-13", "13", 4,
      U + r`I 2026 består et fuglebestand av 20 000 individer. Sofie er forsker. Hun antar at bestanden vil minke de kommende årene. Hun har laget to modeller og skrevet programkoden nedenfor.<pre><code>x = 0       # x er antall år etter 2026

def f(x):
    return 20000 - 300 * x

def g(x):
    return 20000 * 0.984 ** x

while f(x) >= g(x):
    x = x + 1

print("Resultat:")
print(x)
print(f(x))
print(g(x))</code></pre>Når programmet kjøres, skrives dette ut:<pre><code>Resultat:
10
17000
17020.83963620087</code></pre>`,
      [
        part("1p-v26-d1-13", "a", r`Gi en praktisk tolkning av modellene $f$ og $g$.`,
          r`Se på hvordan hver funksjon forandrer seg for hvert år: $f$ trekker fra et fast tall, $g$ ganges med en fast faktor.`,
          [
            r`$f(x) = 20\,000 - 300x$ er lineær. Bestanden starter på $20\,000$ i 2026 og minker med like mange individer, $300$, hvert år.`,
            r`$g(x) = 20\,000\cdot 0{,}984^{x}$ er eksponentiell. Vekstfaktoren $0{,}984 = 1 - 0{,}016$ betyr at bestanden minker med $1{,}6\ \%$ hvert år.`,
            r`<strong>Svar:</strong> I $f$ avtar bestanden med $300$ individer per år. I $g$ avtar den med $1{,}6\ \%$ per år, regnet av bestanden året før.`,
          ]),
        part("1p-v26-d1-13", "b", r`Hva ønsker Sofie å finne ut?<br>Hva forteller verdiene som skrives ut når programmet kjøres?`,
          r`Løkka stopper første gang betingelsen $f(x) \ge g(x)$ ikke lenger er sann. Hva betyr det om de to modellene?`,
          [
            r`Starten er $x = 0$, der $f(0) = g(0) = 20\,000$. Løkka øker $x$ med $1$ så lenge $f(x) \ge g(x)$.`,
            r`Den stopper første gang $f(x) < g(x)$. Sofie vil altså finne ut når modellen med lineær nedgang første gang gir en mindre bestand enn modellen med eksponentiell nedgang.`,
            r`Utskriften: $x = 10$ er antall år etter 2026, altså 2036. Da er $f(10) = 17\,000$ og $g(10) \approx 17\,021$ individer.`,
            r`Kontroll: $f(10) = 20\,000 - 3000 = 17\,000$. For $x = 9$ er $f(9) = 17\,300 \ge g(9) \approx 17\,298$, så løkka kjørte videre til $x = 10$. Modellene er like i starten ($f(0) = g(0) = 20\,000$), og $f$ er litt større enn $g$ for $x = 1,\ 2,\ \ldots,\ 9$.`,
            r`<strong>Svar:</strong> Sofie vil finne ut hvor mange år det går før den lineære modellen gir lavere bestand enn den eksponentielle. Det skjer $10$ år etter 2026, i 2036. Da gir $f$ $17\,000$ individer og $g$ omtrent $17\,021$.`,
          ]),
      ],
      ["modeller", "programmering", "lineære modeller", "eksponentialfunksjoner"]),
  ],
  del2: [
    multi("1p-v26-d2-1", "1", 5,
      r`Fru Hansen eier en gammel bil. Når hun kjører med en fart på $x$ km/h, slipper bilen ut $U(x)$ gram CO<sub>2</sub> per kilometer, der $U(x)$ er gitt ved<br>$U(x) = \dfrac{5400}{x} + 0{,}0074x^{2} + 50,\quad 30 < x < 110$`,
      [
        part("1p-v26-d2-1", "a", r`Hvor mange gram CO<sub>2</sub> slipper bilen ut per kilometer dersom fru Hansen kjører med en fart på 50 km/h?`,
          r`Sett $x = 50$ inn i $U(x)$.`,
          [
            r`$U(50) = \dfrac{5400}{50} + 0{,}0074\cdot 50^{2} + 50 = 108 + 18{,}5 + 50 = 176{,}5$.`,
            r`<strong>Svar:</strong> Bilen slipper ut $176{,}5$ gram CO<sub>2</sub> per kilometer.`,
          ]),
        part("1p-v26-d2-1", "b", r`Hvilken fart gir minst utslipp av CO<sub>2</sub> per kilometer?<br>Hvor mange gram CO<sub>2</sub> slipper bilen ut per kilometer ved denne farten?`,
          r`Tegn grafen til $U$ i GeoGebra for $30 < x < 110$ og finn bunnpunktet (minimumspunktet). Du kan også lage en tabell med verdier av $U(x)$ og se hvor utslippet er minst.`,
          [
            r`Grafen til $U$ har et bunnpunkt mellom $30$ og $110$. Finn det med «Ekstremalpunkt» i GeoGebra: $x \approx 71{,}46$.`,
            r`Kontroll med tabell: $U(60) = 166{,}64$, $U(70) \approx 163{,}40$, $U(71{,}46) \approx 163{,}36$ og $U(80) = 164{,}86$ gram per kilometer. Utslippet er minst rundt $x = 71$.`,
            r`$U(71{,}46) \approx 163{,}36$.`,
            r`<strong>Svar:</strong> Utslippet er minst ved en fart på omtrent $71{,}5$ km/h. Da slipper bilen ut omtrent $163{,}4$ gram CO<sub>2</sub> per kilometer.`,
          ]),
        part("1p-v26-d2-1", "c", r`Fru Hansen kjører med en fart på 90 km/h i 20 minutter.<br>Hvor mange gram CO<sub>2</sub> slipper bilen ut i løpet av disse 20 minuttene?`,
          r`Finn først hvor langt hun kjører på 20 minutter ($20$ min er en tredjedel av en time). Gang så med utslippet per kilometer ved $90$ km/h.`,
          [
            r`Strekning: $90\ \text{km/h}\cdot \dfrac{20}{60}\ \text{h} = 30$ km.`,
            r`Utslipp per kilometer: $U(90) = \dfrac{5400}{90} + 0{,}0074\cdot 90^{2} + 50 = 60 + 59{,}94 + 50 = 169{,}94$ gram.`,
            r`Totalt utslipp: $30\cdot 169{,}94 = 5098{,}2$ gram.`,
            r`<strong>Svar:</strong> Bilen slipper ut omtrent $5100$ gram CO<sub>2</sub>, nøyaktig $5098{,}2$ gram.`,
          ]),
      ],
      ["funksjoner", "ekstremalpunkt", "GeoGebra"]),
    multi("1p-v26-d2-2", "2", 2,
      r`I september 2025 satte Norges Bank ned styringsrenten fra 4,25 % til 4 %.`,
      [
        part("1p-v26-d2-2", "a", r`Hvor mange prosentpoeng ble styringsrenten satt ned med?`,
          r`Prosentpoeng er differansen mellom de to prosentene.`,
          [
            r`$4{,}25 - 4 = 0{,}25$.`,
            r`<strong>Svar:</strong> Renten ble satt ned med $0{,}25$ prosentpoeng.`,
          ]),
        part("1p-v26-d2-2", "b", r`Hvor mange prosent ble styringsrenten satt ned med?`,
          r`Prosentvis endring er endringen delt på startverdien.`,
          [
            r`Endringen var $0{,}25$ prosentpoeng, og renten var $4{,}25\ \%$ før nedsettelsen.`,
            r`$\dfrac{0{,}25}{4{,}25} \approx 0{,}0588 = 5{,}88\ \%$.`,
            r`<strong>Svar:</strong> Styringsrenten ble satt ned med omtrent $5{,}9\ \%$.`,
          ]),
      ],
      ["prosent", "prosentpoeng"]),
    multi("1p-v26-d2-3", "3", 6,
      r`Vipa er en kritisk truet fugleart i Norge.<br>I 2013 ble bestanden av viper anslått til å være omtrent 9000 par. I 2022 var bestanden omtrent 2500 par.<table><tr><th>År</th><td>2013</td><td>2022</td></tr><tr><th>Vipebestand (par)</th><td>$9000$</td><td>$2500$</td></tr></table>Tor antar at bestanden av viper har avtatt lineært og vil fortsette å avta lineært i årene framover. Egil antar at nedgangen har vært, og fortsatt vil være, eksponentiell.<br>La $x$ være antall år etter 2013.`,
      [
        part("1p-v26-d2-3", "a", r`Lag en modell $f$ som viser utviklingen av vipebestanden ut fra Tors antakelser.<br>Forklar hva modellen forteller om utviklingen.`,
          r`Året 2022 er $x = 9$. Lineær modell: $f(x) = ax + b$ med punktene $(0,\ 9000)$ og $(9,\ 2500)$. Du kan bruke regresjon i GeoGebra eller regne for hånd.`,
          [
            r`2013 gir $x = 0$ og 2022 gir $x = 9$. Punktene er $(0,\ 9000)$ og $(9,\ 2500)$.`,
            r`Konstantleddet er $b = 9000$. Stigningstallet er $a = \dfrac{2500 - 9000}{9 - 0} = \dfrac{-6500}{9} \approx -722{,}2$.`,
            r`<strong>Svar:</strong> $f(x) = -722{,}2x + 9000$. Modellen forteller at vipebestanden avtar med omtrent $722$ par hvert år, like mye hvert år.`,
          ]),
        part("1p-v26-d2-3", "b", r`Lag en modell $g$ som viser utviklingen av vipebestanden ut fra Egils antakelser.<br>Forklar hva modellen forteller om utviklingen.`,
          r`Eksponentiell modell: $g(x) = a\cdot b^{x}$. Startverdien er $a = 9000$. Bruk $g(9) = 2500$ til å finne $b$, eller bruk eksponentiell regresjon i GeoGebra.`,
          [
            r`Startverdien er $a = 9000$, så $g(x) = 9000\cdot b^{x}$.`,
            r`Kravet $g(9) = 2500$ gir $9000\cdot b^{9} = 2500$, så $b^{9} = \dfrac{2500}{9000} = \dfrac{5}{18}$.`,
            r`$b = \left(\dfrac{5}{18}\right)^{1/9} \approx 0{,}8673$. Nedgangen per år er $1 - 0{,}8673 = 0{,}1327 \approx 13{,}3\ \%$.`,
            r`<strong>Svar:</strong> $g(x) = 9000\cdot 0{,}867^{x}$. Modellen forteller at bestanden avtar med omtrent $13{,}3\ \%$ hvert år, altså mindre i antall par for hvert år som går.`,
          ]),
        part("1p-v26-d2-3", "c", r`Myndigheter og interesseorganisasjoner arbeider med å verne hekkeområdene til vipa. De håper at dette skal bidra til å stoppe nedgangen, slik at bestanden vil stabilisere seg.<br>Egil ønsker å lage en ny modell som tar hensyn til dette. Han lager først den eksponentielle modellen $p$. Så endrer han litt på denne og kommer fram til modellen $q$. Nedenfor ser du grafene til de to modellene.<br><em>Figuren viser tre små diagrammer: modellen $p$, modellene $p$ og $q$ sammen, og modellen $q$. $p$ går gjennom punktene $(0,\ 7000)$ og $(9,\ 500)$ og nærmer seg $0$. $q$ går gjennom $(0,\ 9000)$ og $(9,\ 2500)$ og nærmer seg den stiplede linjen $y = 2000$.</em>` + figur("p1-v26-d2-3", "3", "To eksponentielle grafer for x fra 0 til ca. 30. p: (0, 7000) og (9, 500), asymptote y = 0. q: (0, 9000) og (9, 2500), vannrett stiplet asymptote y = 2000. Tre små diagrammer i oppgavehefte: p alene, p og q sammen, q alene. Punktene er merket med koordinater.") + r`Gjør rede for hvilke antakelser Egil har lagt til grunn for modellen $q$.<br>Bestem $p(x)$ og $q(x)$.`,
          r`Graf $q$ ser ut som graf $p$ flyttet $2000$ opp. Sjekk: $7000 + 2000 = 9000$ og $500 + 2000 = 2500$. Finn $p(x) = a\cdot b^{x}$ først.`,
          [
            r`<strong>Antakelser.</strong> Bestanden synker fortsatt eksponentielt, men den stabiliserer seg på $2000$ par, siden vernetiltakene bidrar til å stoppe nedgangen. Bestanden går altså mot $2000$, ikke mot $0$. Det er bare avstanden opp til $2000$ som minker eksponentielt.`,
            r`<strong>Finn $p(x)$.</strong> Startverdien er $7000$, så $p(x) = 7000\cdot b^{x}$. Fra $p(9) = 500$ får vi $b^{9} = \dfrac{500}{7000} = \dfrac{1}{14}$.`,
            r`$b = \left(\dfrac{1}{14}\right)^{1/9} \approx 0{,}7459$. Altså $p(x) = 7000\cdot 0{,}746^{x}$.`,
            r`<strong>Finn $q(x)$.</strong> Grafen til $q$ er grafen til $p$ flyttet $2000$ enheter opp: $q(x) = p(x) + 2000$. Kontroll: $q(0) = 7000 + 2000 = 9000$ og $q(9) = 500 + 2000 = 2500$. Begge stemmer med grafen.`,
            r`<strong>Svar:</strong> $p(x) = 7000\cdot 0{,}746^{x}$ og $q(x) = 7000\cdot 0{,}746^{x} + 2000$. Egil antar at bestanden synker eksponentielt mot en nedre grense på $2000$ par og stabiliserer seg der.`,
          ]),
      ],
      ["lineære modeller", "eksponentialfunksjoner", "modeller", "GeoGebra"],
      "Grafavlesning (punktene på p og q og asymptoten y = 2000) er lest fra figur i PDF-en, og er klar nok. Selve grafene er ikke tegnet. Se figurbestilling p1-v26-d2-3."),
    multi("1p-v26-d2-4", "4", 4,
      r`For å varme opp 1 liter vann 1 grad celsius kreves en energi på 4184 joule (J).<br>Når kaldt vann kommer inn i en varmtvannstank, er temperaturen omtrent $10\ ^\circ\text{C}$. I varmtvannstanken varmes vannet opp til $70\ ^\circ\text{C}$.`,
      [
        part("1p-v26-d2-4", "a", r`Vis at å varme opp 100 L vann fra $10\ ^\circ\text{C}$ til $70\ ^\circ\text{C}$ krever en energi på $2{,}51\cdot 10^{7}$ J.`,
          r`Temperaturen øker med $70 - 10 = 60$ grader. Hver liter og hver grad krever $4184$ J.`,
          [
            r`Temperaturøkning: $70 - 10 = 60$ grader.`,
            r`Energi: $4184\ \text{J}\cdot 100\cdot 60 = 25\,104\,000\ \text{J}$.`,
            r`$25\,104\,000 = 2{,}5104\cdot 10^{7} \approx 2{,}51\cdot 10^{7}$.`,
            r`<strong>Svar:</strong> Energien er $2{,}51\cdot 10^{7}$ J, slik oppgaven sier.`,
          ]),
        part("1p-v26-d2-4", "b", r`Når Martin dusjer, bruker han 15 liter vann per minutt. Vannet i dusjen er en blanding av varmt vann fra varmtvannstanken og kaldt vann med en temperatur på $10\ ^\circ\text{C}$. Vannet i dusjen har en temperatur på $40\ ^\circ\text{C}$.<br>Martin har funnet ut at han kan bruke formelen $V = \dfrac{T - 10}{4}$ til å finne ut hvor mange liter vann $V$ fra varmtvannstanken han bruker per minutt når temperaturen på vannet i dusjen er $T\ ^\circ\text{C}$.<br>En dag dusjer Martin i 10 minutter. Vannet i dusjen har en temperatur på $40\ ^\circ\text{C}$.<br>Hvor mange liter vann fra varmtvannstanken bruker han?`,
          r`Sett $T = 40$ i formelen. Da får du liter per minutt. Gang med antall minutter.`,
          [
            r`$V = \dfrac{40 - 10}{4} = \dfrac{30}{4} = 7{,}5$ liter per minutt.`,
            r`På 10 minutter: $7{,}5\cdot 10 = 75$ liter.`,
            r`<strong>Svar:</strong> Martin bruker $75$ liter vann fra varmtvannstanken.`,
          ]),
        part("1p-v26-d2-4", "c", r`Hvor mye energi kreves for å varme opp vannet han bruker fra varmtvannstanken?`,
          r`Bruk samme metode som i a): $75$ liter varmes opp fra $10\ ^\circ\text{C}$ til $70\ ^\circ\text{C}$.`,
          [
            r`Temperaturøkningen er $60$ grader, og det er $75$ liter.`,
            r`Energi: $4184\cdot 75\cdot 60 = 18\,828\,000$ J.`,
            r`<strong>Svar:</strong> Det kreves $18\,828\,000$ J, altså omtrent $1{,}88\cdot 10^{7}$ J.`,
          ]),
        part("1p-v26-d2-4", "d", r`Når vi betaler for den elektriske energien vi bruker, betaler vi per kilowattime (kWh).<br>$1\ \text{kWh} = 3{,}6\cdot 10^{6}$ J<br>En morgen var strømprisen 134 øre per kWh.<br>Hvor mye kostet det Martin å ta en dusj på 10 minutter denne morgenen?`,
          r`Gjør om joule til kWh ved å dele på $3{,}6\cdot 10^{6}$. Gang med prisen. Husk at $134$ øre er $1{,}34$ kroner.`,
          [
            r`Energi i kWh: $\dfrac{18\,828\,000}{3\,600\,000} = 5{,}23$ kWh.`,
            r`Pris: $5{,}23\cdot 1{,}34 \approx 7{,}01$ kroner.`,
            r`<strong>Svar:</strong> Dusjen kostet omtrent $7{,}01$ kroner.`,
          ]),
      ],
      ["standardform", "formler", "enheter"]),
  ],
});
