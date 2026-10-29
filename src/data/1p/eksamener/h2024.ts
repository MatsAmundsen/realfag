import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, høsten 2024 (20.11.2024). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 */
export const EKSAMEN_1P_H2024: Exam = officialExam({
  id: "1p-h2024",
  title: "Eksamen høst 2024",
  season: "høst",
  year: 2024,
  date: "20.11.2024",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "20.11.2024", "1P_H24_LK20.pdf"),
  del1: [
    single("1p-h24-d1-1", "1", 2,
      U + r`Prisen for en vare A øker fra $120$ kroner til $180$ kroner.<br>Prisen for en vare B øker fra $16$ kroner til $26$ kroner.<br>Hvilken pris øker prosentvis mest?<br>Husk å begrunne svaret ditt.`,
      r`Prosentvis økning er økningen delt på den gamle prisen. Sammenlign de to brøkene.`,
      [
        r`Vare A: økningen er $180 - 120 = 60$ kroner. Prosentvis økning er $\dfrac{60}{120} = 0{,}5 = 50\ \%$.`,
        r`Vare B: økningen er $26 - 16 = 10$ kroner. Prosentvis økning er $\dfrac{10}{16} = \dfrac{5}{8} = 0{,}625 = 62{,}5\ \%$.`,
        r`<strong>Svar:</strong> Prisen på vare B øker prosentvis mest ($62{,}5\ \%$ mot $50\ \%$), selv om vare A øker mest i kroner.`,
      ],
      ["prosent", "prosentvis endring"]),
    multi("1p-h24-d1-2", "2", 3,
      U + r`Forskere har kommet fram til at det er omtrent $20$ billiarder maur på jorden. En billiard er tusen millioner millioner.`,
      [
        part("1p-h24-d1-2", "a", r`Skriv $20$ billiarder på standardform.`,
          r`Skriv en billiard som en tierpotens: tusen $= 10^{3}$ og en million $= 10^{6}$.`,
          [
            r`En billiard er $1000\cdot 1\,000\,000\cdot 1\,000\,000 = 10^{3}\cdot 10^{6}\cdot 10^{6} = 10^{15}$.`,
            r`$20$ billiarder er $20\cdot 10^{15} = 2\cdot 10^{1}\cdot 10^{15} = 2\cdot 10^{16}$.`,
            r`<strong>Svar:</strong> $20$ billiarder er $2\cdot 10^{16}$.`,
          ]),
        part("1p-h24-d1-2", "b", r`I en normalt stor maurtue er det mellom $200\,000$ og $300\,000$ maur. Anta at en maur veier mellom $7$ mg og $9$ mg.<br>Omtrent hvor mange kilogram veier alle maurene i en normalt stor maurtue til sammen?`,
          r`Regn med minste og største antall og minste og største vekt, og gjør om milligram til kilogram: $1\ \text{kg} = 1\,000\,000\ \text{mg}$.`,
          [
            r`Minst: $200\,000\cdot 7\ \text{mg} = 1\,400\,000\ \text{mg} = 1{,}4\ \text{kg}$.`,
            r`Størst: $300\,000\cdot 9\ \text{mg} = 2\,700\,000\ \text{mg} = 2{,}7\ \text{kg}$.`,
            r`Midt imellom: omtrent $250\,000\cdot 8\ \text{mg} = 2\,000\,000\ \text{mg} = 2\ \text{kg}$.`,
            r`<strong>Svar:</strong> Maurene i en maurtue veier til sammen omtrent $2$ kg (mellom $1{,}4$ kg og $2{,}7$ kg).`,
          ]),
      ],
      ["standardform", "måleenheter"]),
    single("1p-h24-d1-3", "3", 2,
      U + r`Nedenfor er det beskrevet tre situasjoner. Fullfør siste setning i hver beskrivelse ved å sette inn teksten som står i en av boksene nedenfor.<table><tr><td>proporsjonale størrelser</td><td>omvendt proporsjonale størrelser</td><td>verken proporsjonale eller omvendt proporsjonale størrelser</td></tr></table>Husk å argumentere for alle tre svarene dine.<br><strong>Situasjon A:</strong> Det koster $2200$ kroner å leie en badstue. Antallet personer som er med på å betale leien, og prisen per person er …<br><strong>Situasjon B:</strong> Når du kjøper brus, kan du ta tre flasker og betale for to. Antallet flasker du kjøper, og prisen du betaler for alle flaskene, er …<br><strong>Situasjon C:</strong> Antallet porsjoner vaffelrøre du lager, og mengden mel du trenger, er …`,
      r`Proporsjonale: forholdet $y/x$ er konstant (dobbelt av det ene gir dobbelt av det andre). Omvendt proporsjonale: produktet $x\cdot y$ er konstant (dobbelt av det ene gir halvparten av det andre).`,
      [
        r`<strong>A:</strong> Hvis $n$ personer deler på $2200$ kroner, er prisen per person $\dfrac{2200}{n}$, så $n\cdot\text{pris} = 2200$ er konstant. Dobbelt så mange personer gir halv pris per person. Antallet personer og prisen per person er <strong>omvendt proporsjonale størrelser</strong>.`,
        r`<strong>B:</strong> La en flaske koste $p$. Tre flasker koster $2p$, seks flasker koster $4p$, men én flaske koster $p$ og to flasker koster $2p$. Prisen delt på antall flasker er ikke konstant: $\dfrac{p}{1} = p$, mens $\dfrac{2p}{3} \approx 0{,}67p$. Produktet er heller ikke konstant. Antallet flasker og prisen er <strong>verken proporsjonale eller omvendt proporsjonale størrelser</strong>.`,
        r`<strong>C:</strong> Dobbelt så mange porsjoner krever dobbelt så mye mel. Mengden mel per porsjon er konstant, så $\dfrac{\text{mel}}{\text{porsjoner}}$ er konstant. Antallet porsjoner og mengden mel er <strong>proporsjonale størrelser</strong>.`,
        r`<strong>Svar:</strong> A: omvendt proporsjonale. B: verken proporsjonale eller omvendt proporsjonale. C: proporsjonale.`,
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet"]),
    multi("1p-h24-d1-4", "4", 3,
      U + r`Lisa driver en butikk. Butikken skal begynne å selge et nytt produkt 1. januar 2025. Lisa håper å selge $1000$ enheter av produktet i januar. Hun håper også at salget av produktet vil øke hver måned.<br>Lisa har laget de to programmene nedenfor.<br><strong>Program 1</strong><pre><code>1   e = 1000
2   t = 0
3   m = 1
4
5   while m &lt;= 12:
6       t = t + e
7       e = e * 1.04
8       m = m + 1
9
10  print(t)</code></pre><strong>Program 2</strong><pre><code>1   e = 1000
2   t = 0
3   m = 1
4
5   while m &lt;= 12:
6       t = t + e
7       e = e + 40
8       m = m + 1
9
10  print(t)</code></pre>`,
      [
        part("1p-h24-d1-4", "a", r`Gi en praktisk tolkning av koden Lisa bruker i linje 7 i hvert av programmene.`,
          r`Variabelen <code>e</code> er antall enheter solgt i en måned. Hva skjer med <code>e</code> mellom to måneder?`,
          [
            r`<code>e</code> er antall solgte enheter i måneden. Linje 7 regner ut salget for neste måned.`,
            r`Program 1: <code>e = e * 1&#46;04</code>. Salget i neste måned er $1{,}04$ ganger salget denne måneden. Salget øker altså med $4\ \%$ hver måned.`,
            r`Program 2: <code>e = e + 40</code>. Salget i neste måned er $40$ enheter høyere enn denne måneden. Salget øker altså med $40$ enheter hver måned.`,
            r`<strong>Svar:</strong> Program 1: salget øker med $4\ \%$ per måned. Program 2: salget øker med $40$ enheter per måned.`,
          ]),
        part("1p-h24-d1-4", "b", r`Hva vil verdiene som skrives ut fortelle Lisa?`,
          r`I linje 6 legges månedens salg til <code>t</code>. Løkka kjører for $m = 1$ til $m = 12$.`,
          [
            r`<code>t</code> er summen av salget for de $12$ månedene, altså det totale antallet enheter solgt i 2025.`,
            r`Program 1 skriver ut totalsalget når salget øker med $4\ \%$ per måned. Program 2 skriver ut totalsalget når salget øker med $40$ enheter per måned.`,
            r`Kjører vi programmene, får vi omtrent $15\,026$ enheter i Program 1 og $14\,640$ enheter i Program 2.`,
            r`<strong>Svar:</strong> Verdiene forteller hvor mange enheter Lisa totalt selger i løpet av 2025 hvis salget utvikler seg som beskrevet. Det gir et sammenlikningsgrunnlag mellom en prosentvis og en fast økning (ca. $15\,026$ mot $14\,640$ enheter).`,
          ]),
      ],
      ["programmering", "vekstfaktor", "lineær vekst"]),
    multi("1p-h24-d1-5", "5", 3,
      U + r`Grader celsius (°C) og grader fahrenheit (°F) er to ulike måleenheter for temperatur. Det er en lineær sammenheng mellom de to måleenhetene. Punktene i koordinatsystemet ovenfor viser temperaturer målt i grader celsius og i grader fahrenheit.<br><em>Fra figuren i oppgaveheftet: tre punkter. Førsteaksen $x$ er grader celsius, andreaksen $y$ er grader fahrenheit. Punktene er $(−40,\ −40)$, $(0,\ 32)$ og $(100,\ 212)$.</em>` +
        figur("p1-h24-d1-5", "5", "Koordinatsystem med x-akse «Grader celsius (°C)» fra −80 til ca. 170 (merker for hver 20) og y-akse «Grader fahrenheit (°F)» fra ca. −130 til 260 (merker for hver 50). Stiplede hjelpelinjer. Tre markerte punkter med koordinater: (−40, −40), (0, 32), (100, 212). Ingen linje tegnet gjennom punktene."),
      [
        part("1p-h24-d1-5", "a", r`Bestem en formel som kan brukes til å regne om temperaturer fra grader celsius til grader fahrenheit.`,
          r`Sammenhengen er lineær, $F = a\cdot C + b$. $b$ er verdien når $C = 0$. $a$ er stigningstallet mellom to av punktene.`,
          [
            r`La $C$ være grader celsius og $F$ grader fahrenheit. Sammenhengen har formen $F = a\cdot C + b$.`,
            r`Punktet $(0,\ 32)$ gir $b = 32$.`,
            r`Stigningstallet: $a = \dfrac{212 - 32}{100 - 0} = \dfrac{180}{100} = 1{,}8$.`,
            r`Kontroll med $(−40,\ −40)$: $1{,}8\cdot(−40) + 32 = −72 + 32 = −40$. ✓`,
            r`<strong>Svar:</strong> $F = 1{,}8\cdot C + 32$.`,
          ]),
        part("1p-h24-d1-5", "b", r`Hvor mange grader celsius tilsvarer $68\ °\text{F}$?`,
          r`Sett $F = 68$ i formelen og løs likningen for $C$.`,
          [
            r`$68 = 1{,}8\cdot C + 32$.`,
            r`$1{,}8\cdot C = 68 - 32 = 36$.`,
            r`$C = \dfrac{36}{1{,}8} = 20$.`,
            r`<strong>Svar:</strong> $68\ °\text{F}$ tilsvarer $20\ °\text{C}$.`,
          ]),
      ],
      ["lineære funksjoner", "måleenheter"]),
  ],
  del2: [
    multi("1p-h24-d2-1", "1", 6,
      r`Funksjonen $P$ gitt ved $P(x) = 3600\cdot 0{,}85^{x} + 600$ er en modell som viser hvor mange personer som abonnerte på papirutgaven av en avis $x$ år etter 2010.`,
      [
        part("1p-h24-d2-1", "a", r`Vis hvordan du på to ulike måter kan finne ut hvor mange personer som abonnerte på papirutgaven i 2010.`,
          r`2010 svarer til $x = 0$. Du kan regne ut $P(0)$ for hånd, og du kan lese av grafen eller en tabell i GeoGebra.`,
          [
            r`2010 er $0$ år etter 2010, så vi skal finne $P(0)$.`,
            r`<strong>Måte 1 (regning):</strong> $P(0) = 3600\cdot 0{,}85^{0} + 600 = 3600\cdot 1 + 600 = 4200$.`,
            r`<strong>Måte 2 (graf):</strong> Tegn grafen til $P$ i GeoGebra. Skjæringspunktet med andreaksen ($x = 0$) er $(0,\ 4200)$.`,
            r`<strong>Svar:</strong> I 2010 abonnerte $4200$ personer på papirutgaven.`,
          ]),
        part("1p-h24-d2-1", "b", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(4,\ P(4))$ og $(14,\ P(14))$. Gi en praktisk tolkning av svaret du får.`,
          r`Regn ut $P(4)$ og $P(14)$, og bruk $a = \dfrac{\Delta y}{\Delta x}$. $x = 4$ er 2014 og $x = 14$ er 2024.`,
          [
            r`$P(4) = 3600\cdot 0{,}85^{4} + 600 \approx 2479{,}2$ og $P(14) = 3600\cdot 0{,}85^{14} + 600 \approx 970{,}0$.`,
            r`$a = \dfrac{970{,}0 - 2479{,}2}{14 - 4} = \dfrac{−1509{,}3}{10} \approx −150{,}9$.`,
            r`<strong>Svar:</strong> Stigningstallet er omtrent $−151$. Fra 2014 til 2024 sank antallet papirabonnenter i gjennomsnitt med omtrent $151$ personer per år.`,
          ]),
        part("1p-h24-d2-1", "c", r`I 2019 abonnerte $1000$ personer på den digitale utgaven av avisen. Antallet personer som abonnerte på den digitale utgaven, økte med $5{,}5\ \%$ hvert år fra 2019 til 2024.<br>Hvilket år var det for første gang flere personer som abonnerte på den digitale utgaven av avisen enn på papirutgaven?`,
          r`2019 er $x = 9$. Sett opp en eksponentiell funksjon for digitale abonnenter og finn når den passerer $P$. Bruk graf eller tabell i GeoGebra.`,
          [
            r`2019 er $x = 9$. Med vekstfaktor $1{,}055$ er antall digitale abonnenter $D(x) = 1000\cdot 1{,}055^{x-9}$.`,
            r`Tegn grafene til $P$ og $D$ i samme koordinatsystem. Skjæringspunktet er ved $x \approx 11{,}6$.`,
            r`Kontroll i tabell: $x = 11$ (2021): $D \approx 1113$ og $P \approx 1202$. $x = 12$ (2022): $D \approx 1174$ og $P \approx 1112$.`,
            r`<strong>Svar:</strong> Det var for første gang flere digitale abonnenter enn papirabonnenter i 2022.`,
          ]),
      ],
      ["eksponentialfunksjoner", "modeller", "GeoGebra"]),
    single("1p-h24-d2-2", "2", 2,
      r`En lege rører ut et pulver i vann for å lage medisin til en pasient. Han bruker $6$ mg av pulveret per milliliter vann.<br>Pasienten veier $75$ kg og skal ha $15$ mg pulver per kilogram kroppsvekt hvert døgn, fordelt på tre like store doser.<br>Hvor mange milliliter av medisinen skal pasienten ha i hver dose?`,
      r`Finn først mengden pulver per døgn, deretter per dose, og til slutt hvor mange milliliter det blir.`,
      [
        r`Pulver per døgn: $75\cdot 15 = 1125$ mg.`,
        r`Pulver per dose: $\dfrac{1125}{3} = 375$ mg.`,
        r`Siden $6$ mg går i hver milliliter, trengs $\dfrac{375}{6} = 62{,}5$ mL.`,
        r`<strong>Svar:</strong> Pasienten skal ha $62{,}5$ mL medisin i hver dose.`,
      ],
      ["måleenheter", "forhold"]),
    single("1p-h24-d2-3", "3", 2,
      r`Prisen for en vare ble satt opp med $10\ \%$ i juni og med $20\ \%$ i august. I oktober ble prisen satt ned med $30\ \%$.<br>Vil varen nå koste mer, mindre eller like mye som den gjorde før prisen ble satt opp første gang?<br>Husk å begrunne svaret ditt.`,
      r`Gang vekstfaktorene sammen: $1{,}10$, $1{,}20$ og $0{,}70$. Prosentene kan ikke bare legges sammen.`,
      [
        r`La prisen før første endring være $p$. Vekstfaktorene er $1{,}10$ (opp $10\ \%$), $1{,}20$ (opp $20\ \%$) og $0{,}70$ (ned $30\ \%$).`,
        r`Ny pris: $p\cdot 1{,}10\cdot 1{,}20\cdot 0{,}70 = p\cdot 0{,}924$.`,
        r`$0{,}924$ svarer til en nedgang på $1 - 0{,}924 = 0{,}076 = 7{,}6\ \%$.`,
        r`Merk: Vi kan ikke bare legge sammen prosentene ($10 + 20 - 30 = 0$), fordi hver endring gjelder for prisen slik den var rett før endringen.`,
        r`<strong>Svar:</strong> Varen koster nå mindre enn før, omtrent $7{,}6\ \%$ mindre.`,
      ],
      ["prosent", "vekstfaktor"]),
    multi("1p-h24-d2-4", "4", 3,
      r`Når en strekning på $s$ kilometer kjøres to ganger, er tidsforskjellen $t$ minutter gitt ved $t = \left(\dfrac{1}{v_1} - \dfrac{1}{v_2}\right)\cdot s\cdot 60$, der $v_1$ kilometer per time er gjennomsnittsfarten den første gangen strekningen kjøres, og $v_2$ kilometer per time er gjennomsnittsfarten andre gangen.<br>Camilla kjører $18$ km hver morgen for å komme til skolen. En mandag kjørte hun med en gjennomsnittsfart på $58$ km/h. Fredag i samme uke kjørte hun med en gjennomsnittsfart på $65$ km/h.`,
      [
        part("1p-h24-d2-4", "a", r`Hvor mye lengre tid brukte hun på kjøreturen på mandagen sammenliknet med kjøreturen på fredagen?`,
          r`Sett $s = 18$, $v_1 = 58$ og $v_2 = 65$ inn i formelen.`,
          [
            r`$t = \left(\dfrac{1}{58} - \dfrac{1}{65}\right)\cdot 18\cdot 60 \approx 0{,}001857\cdot 1080 \approx 2{,}0$.`,
            r`Kontroll: mandag $\dfrac{18}{58}\cdot 60 \approx 18{,}62$ min, fredag $\dfrac{18}{65}\cdot 60 \approx 16{,}62$ min. Differansen er $2{,}0$ min.`,
            r`<strong>Svar:</strong> Hun brukte omtrent $2$ minutter lengre tid på mandagen.`,
          ]),
        part("1p-h24-d2-4", "b", r`Camilla vil sammenlikne to andre dager hun kjørte til skolen. Den ene dagen var gjennomsnittsfarten dobbelt så høy som den andre dagen. Tidsforskjellen mellom kjøreturene var $20$ minutter.<br>Hvor lang tid brukte Camilla på hver av de to kjøreturene?`,
          r`La den laveste farten være $v$ og den høyeste $2v$. Sett inn i formelen med $t = 20$ og $s = 18$, og løs for $v$.`,
          [
            r`La $v_1 = v$ være den laveste farten og $v_2 = 2v$ den høyeste. Da er $20 = \left(\dfrac{1}{v} - \dfrac{1}{2v}\right)\cdot 18\cdot 60 = \dfrac{1}{2v}\cdot 1080 = \dfrac{540}{v}$.`,
            r`$v = \dfrac{540}{20} = 27$ km/h. Den høyeste farten er $2\cdot 27 = 54$ km/h.`,
            r`Tid ved $27$ km/h: $\dfrac{18}{27}\ \text{h}\cdot 60 = 40$ min. Tid ved $54$ km/h: $\dfrac{18}{54}\ \text{h}\cdot 60 = 20$ min.`,
            r`Kontroll: $40 - 20 = 20$ min. ✓`,
            r`<strong>Svar:</strong> Hun brukte $40$ minutter den ene dagen (fart $27$ km/h) og $20$ minutter den andre dagen (fart $54$ km/h).`,
          ]),
      ],
      ["formler", "fart", "likninger"]),
    multi("1p-h24-d2-5", "5", 4,
      r`For $8$ måneder siden hadde Isabel $290\,000$ følgere på Snapchat. I dag har hun $340\,000$ følgere.`,
      [
        part("1p-h24-d2-5", "a", r`Sett opp et uttrykk for en funksjon $f$ som beskriver utviklingen dersom antallet følgere har økt med samme antall hver måned.<br>Gjør rede for valg av funksjon.`,
          r`Lik økning hver måned betyr lineær vekst, $f(x) = ax + b$. La $x$ være antall måneder siden for $8$ måneder siden.`,
          [
            r`Økning med samme antall hver gang er <strong>lineær vekst</strong>, så $f(x) = ax + b$. La $x$ være antall måneder etter tidspunktet for $8$ måneder siden. Da er $f(0) = 290\,000$ og $f(8) = 340\,000$.`,
            r`$b = 290\,000$ og $a = \dfrac{340\,000 - 290\,000}{8} = \dfrac{50\,000}{8} = 6250$.`,
            r`<strong>Svar:</strong> $f(x) = 6250x + 290\,000$. Funksjonen er lineær fordi økningen er like stor, $6250$ følgere, hver måned.`,
          ]),
        part("1p-h24-d2-5", "b", r`Sett opp et uttrykk for en funksjon $g$ som beskriver utviklingen dersom antallet følgere har økt med samme prosent hver måned.<br>Gjør rede for valg av funksjon.`,
          r`Lik prosentvis økning betyr eksponentiell vekst, $g(x) = b\cdot k^{x}$. Finn $k$ fra $290\,000\cdot k^{8} = 340\,000$.`,
          [
            r`Økning med samme prosent hver gang er <strong>eksponentiell vekst</strong>, så $g(x) = b\cdot k^{x}$ med $b = 290\,000$.`,
            r`Vi må ha $g(8) = 340\,000$, altså $290\,000\cdot k^{8} = 340\,000$, som gir $k^{8} = \dfrac{340}{290}$, og $k = \left(\dfrac{340}{290}\right)^{\frac{1}{8}} \approx 1{,}0201$.`,
            r`Vekstfaktoren $1{,}0201$ svarer til en økning på omtrent $2{,}0\ \%$ per måned.`,
            r`<strong>Svar:</strong> $g(x) = 290\,000\cdot 1{,}0201^{x}$. Funksjonen er eksponentiell fordi økningen er like mange prosent, omtrent $2{,}0\ \%$, hver måned.`,
          ]),
      ],
      ["lineære funksjoner", "eksponentialfunksjoner", "modeller"]),
    multi("1p-h24-d2-6", "6", 3,
      r`Du har fått tilbud om jobb hos tre ulike bedrifter. Bedriftene har ulike måter å regne ut lønn på.<table><tr><th>Bedrift</th><th>Fast månedslønn</th><th>Tillegg ved reiseoppdrag</th></tr><tr><td>A</td><td>$32\,000$ kroner</td><td>$20\,000$ kroner</td></tr><tr><td>B</td><td>$63\,000$ kroner</td><td>$16\,000$ kroner</td></tr><tr><td>C</td><td>$75\,000$ kroner</td><td>$8000$ kroner</td></tr></table>`,
      [
        part("1p-h24-d2-6", "a", r`Bestem årslønnen din hos hver av bedriftene dersom du får tre reiseoppdrag i løpet av året.`,
          r`Årslønn $= 12\cdot$ fast månedslønn $+\ 3\cdot$ tillegg per reiseoppdrag.`,
          [
            r`A: $12\cdot 32\,000 + 3\cdot 20\,000 = 384\,000 + 60\,000 = 444\,000$.`,
            r`B: $12\cdot 63\,000 + 3\cdot 16\,000 = 756\,000 + 48\,000 = 804\,000$.`,
            r`C: $12\cdot 75\,000 + 3\cdot 8000 = 900\,000 + 24\,000 = 924\,000$.`,
            r`<strong>Svar:</strong> Årslønnen er $444\,000$ kroner i A, $804\,000$ kroner i B og $924\,000$ kroner i C.`,
          ]),
        part("1p-h24-d2-6", "b", r`Du forventer å ha like mange reiseoppdrag hos hver av de tre bedriftene.<br>Hvor mange reiseoppdrag må du ha i løpet av ett år for at du skal få best lønn i bedrift A, for at du skal få best lønn i bedrift B, og for at du skal få best lønn i bedrift C?`,
          r`Sett opp årslønnen som funksjon av antall reiseoppdrag $n$ for hver bedrift, og finn skjæringspunktene (graf eller likning).`,
          [
            r`Med $n$ reiseoppdrag: $A(n) = 384\,000 + 20\,000n$, $B(n) = 756\,000 + 16\,000n$ og $C(n) = 900\,000 + 8000n$.`,
            r`$B = C$: $756\,000 + 16\,000n = 900\,000 + 8000n$ gir $8000n = 144\,000$, så $n = 18$.`,
            r`$A = B$: $384\,000 + 20\,000n = 756\,000 + 16\,000n$ gir $4000n = 372\,000$, så $n = 93$.`,
            r`Tegn grafene i GeoGebra, eller sjekk: $n = 0$ gir $C$ høyest. Bedrift C har høyest fast lønn men lavest tillegg, så grafen til C starter høyest og stiger tregest. A starter lavest og stiger raskest.`,
            r`<strong>Svar:</strong> Bedrift C gir best lønn for færre enn $18$ reiseoppdrag, bedrift B gir best lønn for mellom $18$ og $93$ reiseoppdrag, og bedrift A gir best lønn for flere enn $93$ reiseoppdrag. (Ved nøyaktig $18$ er B og C like gode, og ved nøyaktig $93$ er A og B like gode.)`,
          ]),
      ],
      ["lineære funksjoner", "likninger", "GeoGebra"]),
    multi("1p-h24-d2-7", "7", 3,
      r`Oversikten nedenfor er hentet fra valgresultat.no etter kommunestyrevalget høsten 2023. I oversikten er «pp» brukt som forkortelse for prosentpoeng.<table><tr><th>Parti</th><th>Oppslutning (%)</th><th>Antall stemmer</th><th>Endring siste kommunestyrevalg (pp)</th></tr><tr><td>Høyre</td><td>$25{,}9$</td><td>$689\,952$</td><td>$+5{,}8$</td></tr><tr><td>Arbeiderpartiet</td><td>$21{,}6$</td><td>$576\,082$</td><td>$−3{,}2$</td></tr><tr><td>Fremskrittspartiet</td><td>$11{,}3$</td><td>$302\,722$</td><td>$+3{,}1$</td></tr><tr><td>Senterpartiet</td><td>$8{,}2$</td><td>$217\,608$</td><td>$−6{,}2$</td></tr><tr><td>SV − Sosialistisk Venstreparti</td><td>$6{,}9$</td><td>$183\,573$</td><td>$+0{,}8$</td></tr><tr><td>Venstre</td><td>$5{,}0$</td><td>$134\,074$</td><td>$+1{,}1$</td></tr><tr><td>Miljøpartiet De Grønne</td><td>$4{,}2$</td><td>$112\,131$</td><td>$−2{,}6$</td></tr><tr><td>Kristelig Folkeparti</td><td>$4{,}0$</td><td>$106\,266$</td><td>$0{,}0$</td></tr><tr><td>Rødt</td><td>$3{,}5$</td><td>$92\,900$</td><td>$−0{,}3$</td></tr><tr><td>Andre</td><td>$9{,}5$</td><td>$253\,009$</td><td>$+1{,}5$</td></tr></table>Antall stemmeberettigede: $4\,341\,850$. Fremmøteprosent: $62{,}4\ \%$.`,
      [
        part("1p-h24-d2-7", "a", r`Hvor mange personer brukte ikke stemmeretten sin ved valget?`,
          r`Fremmøteprosenten forteller hvor mange prosent av de stemmeberettigede som stemte. Resten brukte ikke stemmeretten.`,
          [
            r`Andelen som ikke stemte er $100\ \% - 62{,}4\ \% = 37{,}6\ \% = 0{,}376$.`,
            r`$0{,}376\cdot 4\,341\,850 \approx 1\,632\,536$.`,
            r`<strong>Svar:</strong> Omtrent $1{,}63$ millioner personer, altså ca. $1\,632\,500$, brukte ikke stemmeretten.`,
          ]),
        part("1p-h24-d2-7", "b", r`Tore mener at Høyre har hatt størst prosentvis framgang siden siste kommunestyrevalg.<br>Forklar Tore hvorfor dette er feil, og gjør beregninger som viser hvilket parti som har hatt størst prosentvis framgang.`,
          r`Høyre har størst framgang i prosentpoeng, men prosentvis framgang er endringen delt på oppslutningen ved forrige valg. Forrige oppslutning er oppslutning nå minus endringen.`,
          [
            r`Tore ser på prosentpoeng. Høyre har gått mest fram i prosentpoeng ($+5{,}8$), men prosentvis framgang avhenger også av hvor stort partiet var fra før.`,
            r`Forrige oppslutning er dagens oppslutning minus endringen. Høyre: $25{,}9 - 5{,}8 = 20{,}1\ \%$. Prosentvis framgang er $\dfrac{5{,}8}{20{,}1} \approx 0{,}289 = 28{,}9\ \%$.`,
            r`Fremskrittspartiet: forrige oppslutning $11{,}3 - 3{,}1 = 8{,}2\ \%$. Prosentvis framgang er $\dfrac{3{,}1}{8{,}2} \approx 0{,}378 = 37{,}8\ \%$.`,
            r`De andre partiene som gikk fram: Venstre $\dfrac{1{,}1}{3{,}9} \approx 28{,}2\ \%$, SV $\dfrac{0{,}8}{6{,}1} \approx 13{,}1\ \%$ og Andre $\dfrac{1{,}5}{8} \approx 18{,}8\ \%$. Ingen av dem er over $37{,}8\ \%$.`,
            r`<strong>Svar:</strong> Tore har feil: Høyre har størst framgang i prosentpoeng, men Fremskrittspartiet har størst prosentvis framgang ($37{,}8\ \%$ mot $28{,}9\ \%$ for Høyre).`,
          ]),
      ],
      ["prosent", "prosentpoeng", "tabeller"]),
    multi("1p-h24-d2-8", "8", 7,
      r`Sofie arbeider ved en bedrift og skal lage kasser av metallplater. Metallplatene har form som rektangler og er $1200$ mm lange og $800$ mm brede.<br>For å lage kassene skal hun skjære bort et kvadrat i hvert av hjørnene og brette opp sidekantene.<br><em>Fra figuren i oppgaveheftet: tre skisser fra venstre mot høyre. Metallplate med form som et rektangel. Skjær bort et kvadrat i hvert hjørne. Brett langs de stiplede linjene for å lage en kasse.</em><br>Kassene skal fylles med sand.` +
        figur("p1-h24-d2-8", "8", "Tre skisser ved siden av hverandre, grå fyll og tynn svart kant. 1: et liggende rektangel, bildetekst «Metallplate med form som et rektangel». 2: samme rektangel med et lite kvadrat klippet bort i hvert hjørne (kvadratene vist med stiplet kant), bildetekst «Skjær bort et kvadrat i hvert hjørne». 3: det kryssformede stykket med stiplede brettelinjer langs kvadratenes sider inne i figuren, bildetekst «Brett langs de stiplede linjene for å lage en kasse». Gjerne med sidelengden x merket på ett kvadrat."),
      [
        part("1p-h24-d2-8", "a", r`Vis at det vil være plass til $60$ L sand i en kasse dersom Sofie skjærer bort kvadrater med sidelengde $100$ mm i hvert hjørne.`,
          r`Finn lengde, bredde og høyde på kassen. Hjørnene på $100$ mm tas fra begge ender av hver side. $1\ \text{L} = 1\ \text{dm}^3$.`,
          [
            r`Høyden på kassen er $100$ mm. Lengden er $1200 - 2\cdot 100 = 1000$ mm, og bredden er $800 - 2\cdot 100 = 600$ mm.`,
            r`Mål i dm: $10$ dm, $6$ dm og $1$ dm. Volumet er $10\cdot 6\cdot 1 = 60\ \text{dm}^3$.`,
            r`<strong>Svar:</strong> Siden $1\ \text{dm}^3 = 1$ L, er det plass til $60$ L sand.`,
          ]),
        part("1p-h24-d2-8", "b", r`Sofie ønsker en oversikt som viser volumet av ulike kasser hun kan lage av metallplatene.<br>Lag en systematisk oversikt for Sofie. Av oversikten skal Sofie kunne se omtrent hvor lange sidene i kvadratene hun skjærer bort må være, for at volumet av kassen skal bli størst mulig.`,
          r`La $x$ (mm) være sidelengden på kvadratene. Volumet er $(1200 - 2x)(800 - 2x)\cdot x$. Lag en tabell i regneark for ulike $x$ og se hvor volumet er størst.`,
          [
            r`Med sidelengde $x$ mm blir lengden $1200 - 2x$, bredden $800 - 2x$ og høyden $x$. Volumet i liter er $V = \dfrac{(1200 - 2x)(800 - 2x)\cdot x}{1\,000\,000}$.`,
            r`<table><tr><th>$x$ (mm)</th><td>$50$</td><td>$100$</td><td>$125$</td><td>$150$</td><td>$175$</td><td>$200$</td><td>$250$</td><td>$300$</td></tr><tr><th>Volum (L)</th><td>$38{,}5$</td><td>$60{,}0$</td><td>$65{,}3$</td><td>$67{,}5$</td><td>$66{,}9$</td><td>$64{,}0$</td><td>$52{,}5$</td><td>$36{,}0$</td></tr></table>`,
            r`Volumet vokser til omtrent $x = 150$ og avtar deretter. Forfiner vi tabellen rundt $150$, ser vi at toppen ligger rundt $x = 157$.`,
            r`<strong>Svar:</strong> Oversikten viser at volumet blir størst når sidene i kvadratene er omtrent $150$ mm, med et volum på omtrent $67{,}5$ L.`,
          ]),
        part("1p-h24-d2-8", "c", r`Sofie ønsker å lage en modell som viser volumet av de ulike kassene hun kan lage av metallplatene.<br>Sett opp et funksjonsuttrykk Sofie kan bruke, og lag en grafisk framstilling som viser sammenhengen mellom lengden av sidene i kvadratene hun skjærer bort, og volumet av kassene.`,
          r`Bruk volumet fra b) som funksjon av $x$. Tegn grafen i GeoGebra med passende vindu.`,
          [
            r`La $x$ være sidelengden i mm og $V(x)$ volumet i mm<sup>3</sup>: $V(x) = (1200 - 2x)(800 - 2x)\cdot x$.`,
            r`Skal volumet oppgis i liter, deler vi på $1\,000\,000$: $V(x) = \dfrac{(1200 - 2x)(800 - 2x)\cdot x}{1\,000\,000}$ liter.`,
            r`Tegn grafen i GeoGebra for $x$ fra $0$ til $400$. Grafen starter i origo, stiger til et toppunkt rundt $x \approx 157$ og synker ned til $0$ ved $x = 400$.`,
            r`<strong>Svar:</strong> $V(x) = \dfrac{(1200 - 2x)(800 - 2x)\cdot x}{1\,000\,000}$ liter, tegnet for $0 \le x \le 400$.`,
          ]),
        part("1p-h24-d2-8", "d", r`Hvor mye av hjørnene må Sofie skjære bort dersom hun vil lage kassene slik at volumet blir størst mulig? Hvor stort blir dette volumet?`,
          r`Finn toppunktet på grafen med «Ekstremalpunkt» i GeoGebra.`,
          [
            r`Toppunktet på grafen fra c) er $x \approx 156{,}9$ mm og $V \approx 67{,}6$ L.`,
            r`Kontroll med derivasjon: $V'(x) = 0$ gir $12x^{2} - 8000x + 960\,000 = 0$, med løsningene $x \approx 157$ og $x \approx 510$. Bare $x \approx 157$ ligger mellom $0$ og $400$.`,
            r`<strong>Svar:</strong> Sofie må skjære bort kvadrater med sidelengde omtrent $157$ mm i hvert hjørne. Volumet blir da omtrent $67{,}6$ L.`,
          ]),
        part("1p-h24-d2-8", "e", r`Hva vil du si er modellens gyldighetsområde?<br>Argumenter for svaret ditt.`,
          r`Hvilke verdier av $x$ gir en kasse som faktisk finnes? Siden kan ikke være negativ, og to kvadrater kan ikke ta mer enn hele bredden.`,
          [
            r`Sidelengden $x$ kan ikke være negativ, så $x \ge 0$.`,
            r`Platen er $800$ mm bred. Skjærer vi bort to kvadrater, må det være noe igjen av bredden, så $800 - 2x > 0$, altså $x < 400$.`,
            r`Ved $x = 0$ og $x = 400$ er volumet $0$, så det blir ingen kasse. I praksis ligger gyldighetsområdet i det åpne intervallet mellom dem.`,
            r`<strong>Svar:</strong> Gyldighetsområdet er $0 < x < 400$ (mm), siden $x$ må være positiv og $800 - 2x$ må være positiv for at det skal bli en kasse.`,
          ]),
      ],
      ["funksjoner", "geometri", "volum", "optimering", "regneark", "GeoGebra"]),
  ],
});
