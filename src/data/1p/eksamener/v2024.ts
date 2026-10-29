import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, våren 2024 (23.05.2024). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 */
export const EKSAMEN_1P_V2024: Exam = officialExam({
  id: "1p-v2024",
  title: "Eksamen vår 2024",
  season: "vår",
  year: 2024,
  date: "23.05.2024",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "23.05.2024", "1P_V24_LK20.pdf"),
  del1: [
    single("1p-v24-d1-1", "1", 2,
      U + r`Anta at det på et tidspunkt vil bo $18$ millioner mennesker i et land, og at dette vil tilsvare $2$ promille av verdens befolkning.<br>Hvor stor vil verdens befolkning være på dette tidspunktet?`,
      r`$2$ promille er $2$ av $1000$, altså $0{,}002$. Delen er $18$ millioner, og vi leter etter hele.`,
      [
        r`$2$ promille $= \dfrac{2}{1000} = 0{,}002$.`,
        r`Hele $=$ del $\div$ andel, så verdens befolkning er $\dfrac{18\,000\,000}{0{,}002} = \dfrac{18\,000\,000\cdot 1000}{2} = 9\,000\cdot 1\,000\,000 = 9\,000\,000\,000$.`,
        r`Kontroll: $0{,}002\cdot 9\,000\,000\,000 = 18\,000\,000$. ✓`,
        r`<strong>Svar:</strong> Verdens befolkning vil være $9$ milliarder mennesker.`,
      ],
      ["promille", "prosent", "store tall"]),
    multi("1p-v24-d1-2", "2", 4,
      U + r`Ada vil spare penger og har funnet ut at hun kan bruke funksjonen $f$ gitt ved $f(x) = 20\,000\cdot 1{,}0485^{x}$ for å regne ut hvor mye penger hun vil ha i banken om $x$ år.`,
      [
        part("1p-v24-d1-2", "a", r`Gi en praktisk tolkning av tallet $20\,000$ og av tallet $1{,}0485$.`,
          r`I $f(x) = b\cdot k^{x}$ er $b$ startverdien og $k$ er vekstfaktoren.`,
          [
            r`$20\,000$ er startverdien: Ada setter inn $20\,000$ kroner i banken, for $f(0) = 20\,000\cdot 1{,}0485^{0} = 20\,000$.`,
            r`$1{,}0485$ er vekstfaktoren: beløpet blir $1{,}0485$ ganger så stort hvert år. Det betyr en rente på $4{,}85\ \%$ per år, siden $1{,}0485 = 1 + 0{,}0485$.`,
            r`<strong>Svar:</strong> $20\,000$ kroner er det Ada har på konto i starten, og $1{,}0485$ forteller at beløpet vokser med $4{,}85\ \%$ hvert år.`,
          ]),
        part("1p-v24-d1-2", "b", r`Ada har laget programmet nedenfor.<pre><code>1  def f(x):
2      return 20000 * 1.0485 ** x
3
4  start = 0
5  slutt = 10
6
7  v = (f(slutt) - f(start))/(slutt - start)
8
9  print(v)</code></pre>Hva forteller tallet som vil bli skrevet ut når hun kjører programmet?`,
          r`Uttrykket i linje 7 har formen $\dfrac{f(b) - f(a)}{b - a}$. Hva kalles det?`,
          [
            r`Linje 7 regner ut $v = \dfrac{f(10) - f(0)}{10 - 0}$, altså endringen i beløpet delt på antall år. Dette er <strong>gjennomsnittlig vekstfart</strong>, og det er stigningstallet til linjen gjennom $(0,\ f(0))$ og $(10,\ f(10))$.`,
            r`Tallet som skrives ut, er hvor mange kroner beløpet i banken i gjennomsnitt øker med per år de første $10$ årene. (Kjører vi programmet, får vi omtrent $1212$.)`,
            r`<strong>Svar:</strong> Tallet forteller at Ada sine penger i gjennomsnitt øker med omtrent $1212$ kroner per år de første $10$ årene.`,
          ]),
      ],
      ["eksponentialfunksjoner", "gjennomsnittlig vekstfart", "programmering"]),
    single("1p-v24-d1-3", "3", 2,
      U + r`<em>Figuren viser: fire grafer $f$, $g$, $p$ og $q$ i samme koordinatsystem. Førsteaksen $x$ går fra $0$ til $15$, andreaksen $y$ fra $0$ til $1100$. $f$ er en rett linje fra origo som går gjennom omtrent $(4,\ 500)$ og $(8,\ 1000)$. $g$ er en rett linje som starter i $(0,\ 300)$ og går gjennom omtrent $(4,\ 500)$ og $(12,\ 900)$. $p$ er en avtakende kurve som går gjennom omtrent $(2,\ 500)$, $(5,\ 200)$ og $(10,\ 100)$ og nærmer seg førsteaksen. $q$ er en avtakende kurve som starter i $(0,\ 1000)$ og synker raskt mot førsteaksen.</em>` +
        figur("p1-v24-d1-3", "3", "Koordinatsystem med x fra 0 til 15 (merker for hver 1) og y fra 0 til 1100 (merker for hver 100), stiplede hjelpelinjer. Fire grafer: f (lysegrønn rett linje fra origo, stiger bratt, ca. (4, 500) og (8, 1000)), g (lilla rett linje som starter i (0, 300) og går gjennom ca. (4, 500) og (12, 900)), p (blå avtakende kurve, ca. (2, 500), (5, 200), (10, 100), kommer fra stor y nær x = 1 og flater ut mot x-aksen), q (rød avtakende kurve som starter i (0, 1000), omtrent 420 ved x = 2, og flater raskt ut mot x-aksen). Grafene f og g krysser hverandre rundt (4, 500)." ) +
        r`Ovenfor ser du grafene til fire funksjoner $f$, $g$, $p$ og $q$.<ul><li>Avgjør om en eller flere av grafene viser sammenhengen mellom to størrelser som er proporsjonale.</li><li>Avgjør om en eller flere av grafene viser sammenhengen mellom to størrelser som er omvendt proporsjonale.</li></ul>Husk å argumentere for svarene dine.`,
      r`Proporsjonale: rett linje gjennom origo ($y/x$ konstant). Omvendt proporsjonale: $x\cdot y$ er konstant, og grafen skjærer aldri aksene.`,
      [
        r`<strong>Proporsjonale størrelser:</strong> Grafen til $f$ er en rett linje gjennom origo. Det gir $\dfrac{y}{x}$ konstant: $\dfrac{500}{4} = \dfrac{1000}{8} = 125$, så $f(x) = 125x$. Grafen til $g$ er også rett, men skjærer andreaksen i $300$ og ikke i $0$, så $g$ er lineær, men ikke proporsjonal. Kurvene $p$ og $q$ er ikke rette linjer.`,
        r`<strong>Omvendt proporsjonale størrelser:</strong> For $p$ er produktet av koordinatene tilnærmet konstant: $2\cdot 500 = 5\cdot 200 = 10\cdot 100 = 1000$, så $p(x) = \dfrac{1000}{x}$. Grafen blir bare brattere og brattere nær andreaksen uten å treffe den, og flater ut mot førsteaksen, slik en omvendt proporsjonal sammenheng gjør.`,
        r`Grafen til $q$ starter i $(0,\ 1000)$, altså har den en verdi for $x = 0$. En omvendt proporsjonal sammenheng er ikke definert for $x = 0$, og produktet $x\cdot y$ er ikke konstant (det er $0$ for $x = 0$ og vokser deretter). Dermed er $q$ ikke omvendt proporsjonal.`,
        r`<strong>Svar:</strong> Bare grafen til $f$ viser proporsjonale størrelser, og bare grafen til $p$ viser omvendt proporsjonale størrelser.`,
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet", "grafer"]),
    multi("1p-v24-d1-4", "4", 4,
      U + r`For å regne ut bremselengder på sommerføre kan vi bruke formelen $B = \dfrac{x^{2}}{2}$.<br>Her er $B$ bremselengde (meter), og $x$ er fart (km/h) delt på $10$.<br>På nettsidene til Viking Redningstjeneste står det at en bil som kjører i $70$ km/h, har en bremselengde på $24{,}5$ meter.`,
      [
        part("1p-v24-d1-4", "a", r`Vis hvordan Viking Redningstjeneste kan ha regnet ut denne bremselengden.`,
          r`Farten i formelen er km/h delt på $10$.`,
          [
            r`Farten er $70$ km/h, så $x = \dfrac{70}{10} = 7$.`,
            r`$B = \dfrac{7^{2}}{2} = \dfrac{49}{2} = 24{,}5$.`,
            r`<strong>Svar:</strong> Med $x = 7$ gir formelen $B = \dfrac{49}{2} = 24{,}5$ meter.`,
          ]),
        part("1p-v24-d1-4", "b", r`Hvor fort kjører en bil som har en bremselengde på $40{,}5$ meter?`,
          r`Sett $B = 40{,}5$ og løs likningen for $x$. Husk at $x$ er farten delt på $10$.`,
          [
            r`$\dfrac{x^{2}}{2} = 40{,}5$.`,
            r`$x^{2} = 2\cdot 40{,}5 = 81$, så $x = 9$ (farten er positiv).`,
            r`Farten er $10\cdot x = 10\cdot 9 = 90$ km/h.`,
            r`<strong>Svar:</strong> Bilen kjører i $90$ km/h.`,
          ]),
      ],
      ["formler", "likninger"]),
  ],
  del2: [
    multi("1p-v24-d2-1", "1", 6,
      r`Tabellen nedenfor viser hvor mange bagetter en kantine har solgt hver av de siste sju ukene, og hvor stort overskudd salget har gitt.<table><tr><th>Solgte bagetter</th><td>$100$</td><td>$130$</td><td>$160$</td><td>$175$</td><td>$190$</td><td>$220$</td><td>$235$</td></tr><tr><th>Overskudd (kroner)</th><td>$1450$</td><td>$2300$</td><td>$3050$</td><td>$3365$</td><td>$3720$</td><td>$4140$</td><td>$4175$</td></tr></table>`,
      [
        part("1p-v24-d2-1", "a", r`Bruk opplysningene ovenfor til å vise at funksjonen $O$ gitt ved $O(x) = −0{,}09x^{2} + 51{,}04x − 2776{,}98$ er en god modell for hvor stort overskuddet en uke blir når kantinen produserer og selger $x$ bagetter i løpet av uken.`,
          r`Regn ut $O(x)$ for hver verdi av $x$ i tabellen og sammenlikn med det faktiske overskuddet. Du kan også tegne punktene og grafen i GeoGebra.`,
          [
            r`Vi regner ut modellverdiene, for eksempel $O(100) = −0{,}09\cdot 100^{2} + 51{,}04\cdot 100 − 2776{,}98 = −900 + 5104 − 2776{,}98 = 1427{,}02$.`,
            r`<table><tr><th>$x$</th><td>$100$</td><td>$130$</td><td>$160$</td><td>$175$</td><td>$190$</td><td>$220$</td><td>$235$</td></tr><tr><th>Faktisk</th><td>$1450$</td><td>$2300$</td><td>$3050$</td><td>$3365$</td><td>$3720$</td><td>$4140$</td><td>$4175$</td></tr><tr><th>$O(x)$</th><td>$1427$</td><td>$2337$</td><td>$3085$</td><td>$3399$</td><td>$3672$</td><td>$4096$</td><td>$4247$</td></tr></table>`,
            r`Avvikene er fra $−48$ til $+72$ kroner, altså under $2\ \%$ av det faktiske overskuddet i alle ukene. Legger vi punktene inn i GeoGebra sammen med grafen til $O$, ligger punktene tett inntil grafen.`,
            r`<strong>Svar:</strong> Modellverdiene ligger svært nær de faktiske overskuddene (avvik under $2\ \%$), så $O$ er en god modell.`,
          ]),
        part("1p-v24-d2-1", "b", r`Hvor mange bagetter må kantinen produsere og selge i løpet av en uke, ifølge modellen $O$, for at overskuddet skal bli størst mulig? Hvor stort blir dette overskuddet?`,
          r`Grafen er en parabel som vender nedover. Finn toppunktet, for eksempel med «Ekstremalpunkt» i GeoGebra, eller med $x = \dfrac{-b}{2a}$. Antall bagetter må være et helt tall.`,
          [
            r`Toppunktet ligger ved $x = \dfrac{−51{,}04}{2\cdot(−0{,}09)} = \dfrac{51{,}04}{0{,}18} \approx 283{,}6$.`,
            r`Antall bagetter må være et helt tall, så vi sammenlikner: $O(283) \approx 4459{,}33$ og $O(284) \approx 4459{,}34$. Det er litt høyere for $284$.`,
            r`<strong>Svar:</strong> Kantinen må produsere og selge $284$ bagetter. Overskuddet blir da omtrent $4459$ kroner.`,
          ]),
        part("1p-v24-d2-1", "c", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(100,\ O(100))$ og $(200,\ O(200))$. Gi en praktisk tolkning av svaret du får.`,
          r`Regn ut $O(100)$ og $O(200)$ og bruk $a = \dfrac{\Delta y}{\Delta x}$.`,
          [
            r`$O(100) \approx 1427{,}02$ og $O(200) = −0{,}09\cdot 200^{2} + 51{,}04\cdot 200 − 2776{,}98 = −3600 + 10\,208 − 2776{,}98 = 3831{,}02$.`,
            r`$a = \dfrac{3831{,}02 - 1427{,}02}{200 - 100} = \dfrac{2404}{100} = 24{,}04$.`,
            r`<strong>Svar:</strong> Stigningstallet er $24{,}04$. Fra $100$ til $200$ bagetter øker overskuddet i gjennomsnitt med omtrent $24$ kroner for hver ekstra bagett.`,
          ]),
      ],
      ["andregradsfunksjoner", "modeller", "gjennomsnittlig vekstfart", "GeoGebra"]),
    multi("1p-v24-d2-2", "2", 4,
      r`Oppgave a) og oppgave b) nedenfor skal du løse på to ulike måter. Du skal løse hver av deloppgavene<ol><li>ved å gjøre beregninger</li><li>grafisk</li></ol>For fem år siden satte Gaute inn sparepengene sine på en konto med en fast rente på $3{,}25\ \%$ per år. I dag står det litt over $105\,607$ kroner på kontoen.`,
      [
        part("1p-v24-d2-2", "a", r`Hvor mye vil det være på kontoen om fem år?`,
          r`Vekstfaktoren er $1{,}0325$. Beløpet i dag er startverdi for de neste fem årene. Løs først ved regning, så grafisk.`,
          [
            r`<strong>Beregning:</strong> Vekstfaktor $1{,}0325$. Om fem år: $105\,607\cdot 1{,}0325^{5} \approx 105\,607\cdot 1{,}17341 \approx 123\,920$.`,
            r`<strong>Grafisk:</strong> Sett opp $g(x) = 105\,607\cdot 1{,}0325^{x}$, der $x$ er antall år fra i dag. Tegn grafen i GeoGebra og les av punktet med $x = 5$. Det gir $(5,\ 123\,920)$.`,
            r`<strong>Svar:</strong> Om fem år vil det være omtrent $123\,920$ kroner på kontoen.`,
          ]),
        part("1p-v24-d2-2", "b", r`Hvor mye satte Gaute inn på kontoen for fem år siden?`,
          r`Beløpet i dag er $K_0\cdot 1{,}0325^{5}$. Løs likningen $K_0\cdot 1{,}0325^{5} = 105\,607$, først ved regning, så grafisk.`,
          [
            r`<strong>Beregning:</strong> $K_0\cdot 1{,}0325^{5} = 105\,607$ gir $K_0 = \dfrac{105\,607}{1{,}0325^{5}} \approx \dfrac{105\,607}{1{,}17341} \approx 90\,000$.`,
            r`<strong>Grafisk:</strong> Tegn $h(x) = 105\,607$ og $k(x) = x\cdot 1{,}0325^{5}$ i GeoGebra og finn skjæringspunktet. Førstekoordinaten er $x \approx 90\,000$.`,
            r`Kontroll: $90\,000\cdot 1{,}0325^{5} \approx 105\,607{,}0$. ✓`,
            r`<strong>Svar:</strong> Gaute satte inn $90\,000$ kroner for fem år siden.`,
          ]),
      ],
      ["rente", "eksponentialfunksjoner", "GeoGebra"]),
    multi("1p-v24-d2-3", "3", 4,
      r`Fat er en enhet for volummåling av olje. $1\ \text{fat} \approx 158{,}987$ liter.<br>I 2023 ble det i gjennomsnitt produsert $1{,}794$ millioner fat olje på norsk sokkel hvert døgn.`,
      [
        part("1p-v24-d2-3", "a", r`Omtrent hvor mange liter olje ble det produsert på norsk sokkel i 2023? Skriv svaret på standardform.`,
          r`Gang antall fat per døgn med liter per fat og med antall døgn i 2023 ($365$).`,
          [
            r`Fat per døgn: $1{,}794\cdot 10^{6}$. Liter per døgn: $1{,}794\cdot 10^{6}\cdot 158{,}987 \approx 2{,}852\cdot 10^{8}$.`,
            r`2023 var ikke skuddår, så det var $365$ døgn: $2{,}852\cdot 10^{8}\cdot 365 \approx 1{,}041\cdot 10^{11}$.`,
            r`<strong>Svar:</strong> Det ble produsert omtrent $1{,}04\cdot 10^{11}$ liter olje.`,
          ]),
        part("1p-v24-d2-3", "b", r`I 2022 ble det i gjennomsnitt produsert $1{,}685$ millioner fat hvert døgn.<br>Hvor mange prosent steg produksjonsmengden med fra 2022 til 2023?`,
          r`Prosentvis endring er $\dfrac{\text{ny} - \text{gammel}}{\text{gammel}}$.`,
          [
            r`Endring: $1{,}794 - 1{,}685 = 0{,}109$ millioner fat per døgn.`,
            r`Prosentvis endring: $\dfrac{0{,}109}{1{,}685} \approx 0{,}0647 = 6{,}5\ \%$. (Med vekstfaktor: $\dfrac{1{,}794}{1{,}685} \approx 1{,}065$.)`,
            r`<strong>Svar:</strong> Produksjonen steg med omtrent $6{,}5\ \%$.`,
          ]),
      ],
      ["standardform", "måleenheter", "prosent"]),
    multi("1p-v24-d2-4", "4", 4,
      r`Tabellen nedenfor viser noen av de personlige rekordene til friidrettsutøveren Jakob Ingebrigtsen.<table><tr><th colspan="3">Personlige rekorder utendørs</th></tr><tr><th>Dato</th><th>Øvelse</th><th>Tid</th></tr><tr><td>01.09.2017</td><td>$400$ m</td><td>$51{,}03$</td></tr><tr><td>30.06.2020</td><td>$800$ m</td><td>$1{:}46{,}44$</td></tr><tr><td>16.07.2023</td><td>$1500$ m</td><td>$3{:}27{,}14$</td></tr><tr><td>16.09.2023</td><td>$1$ engelsk mil</td><td>$3{:}43{,}73$</td></tr><tr><td>08.09.2023</td><td>$2000$ m</td><td>$4{:}43{,}13$</td></tr><tr><td>17.09.2023</td><td>$3000$ m</td><td>$7{:}23{,}63$</td></tr></table>Tidene er gitt i minutter (før kolon) og sekunder (etter kolon). For eksempel betyr $7{:}23{,}63$ en tid på $7$ minutter og $23{,}63$ sekunder.<br>Alle løpene i tabellen er gjennomført på en bane der en runde er $400$ meter lang.`,
      [
        part("1p-v24-d2-4", "a", r`Bestem den gjennomsnittlige rundetiden til Jakob Ingebrigtsen da han satte personlig rekord på $1500$ meter.`,
          r`Finn antall runder, og del tiden (i sekunder) på antall runder.`,
          [
            r`Antall runder: $\dfrac{1500}{400} = 3{,}75$.`,
            r`Tid: $3{:}27{,}14 = 3\cdot 60 + 27{,}14 = 207{,}14$ sekunder.`,
            r`Rundetid: $\dfrac{207{,}14}{3{,}75} \approx 55{,}24$ sekunder.`,
            r`<strong>Svar:</strong> Den gjennomsnittlige rundetiden var omtrent $55{,}2$ sekunder.`,
          ]),
        part("1p-v24-d2-4", "b", r`Da Jakob Ingebrigtsen satte personlig rekord på $1$ engelsk mil, holdt han en gjennomsnittsfart på omtrent $25{,}89$ km/h.<br>Vis hvordan vi kan bruke opplysningene om Jakob sitt rekordløp til å avgjøre omtrent hvor mange meter det er i $1$ engelsk mil.`,
          r`Strekning $=$ fart $\cdot$ tid. Gjør om km/h til m/s ved å dele på $3{,}6$, og tiden til sekunder.`,
          [
            r`Tid: $3{:}43{,}73 = 3\cdot 60 + 43{,}73 = 223{,}73$ sekunder.`,
            r`Fart: $25{,}89\ \text{km/h} = \dfrac{25{,}89}{3{,}6}\ \text{m/s} \approx 7{,}19\ \text{m/s}$.`,
            r`Strekning: $s = v\cdot t \approx 7{,}19\cdot 223{,}73 \approx 1609$ meter.`,
            r`<strong>Svar:</strong> $1$ engelsk mil er omtrent $1609$ meter.`,
          ]),
      ],
      ["fart", "måleenheter"]),
    single("1p-v24-d2-5", "5", 4,
      r`Knut og Sabrina jobber med tallfølgen $2,\ 5,\ 11,\ 23,\ 47,\ \ldots$<br><strong>Knut:</strong> Jeg tror jeg har oppdaget et mønster, og jeg er nokså sikker på at alle leddene bortsett fra det første er oddetall.<br><strong>Sabrina:</strong> Har du funnet en formel som kan gi deg et hvilket som helst ledd i tallfølgen?<br><strong>Knut:</strong> Nei, det klarte jeg ikke, men jeg er nokså sikker på at jeg har funnet et mønster som gjør at jeg alltid kan finne det neste leddet i tallfølgen. Jeg er helt sikker på at det bare blir oddetall videre.<br>Ta utgangspunkt i det Knut og Sabrina sier og<ul><li>beskriv et mønster for tallfølgen</li><li>argumenter for at alle leddene i tallfølgen bortsett fra det første er oddetall</li></ul>`,
      r`Se på hvordan hvert ledd er laget av leddet før. Hva skjer med et partall når du ganger det med $2$, og hva skjer når du så legger til $1$?`,
      [
        r`<strong>Mønster:</strong> $2\cdot 2 + 1 = 5$, $2\cdot 5 + 1 = 11$, $2\cdot 11 + 1 = 23$, $2\cdot 23 + 1 = 47$. Hvert ledd er to ganger leddet før, pluss $1$. Med $a_{n}$ som ledd nummer $n$ er $a_{n+1} = 2a_{n} + 1$ og $a_{1} = 2$. Da blir neste ledd $2\cdot 47 + 1 = 95$.`,
        r`<strong>Argument for oddetall:</strong> Uansett hvilket helt tall $a_{n}$ er, er $2a_{n}$ et partall, fordi det er delelig med $2$. Et partall pluss $1$ er et oddetall. Derfor er $a_{n+1} = 2a_{n} + 1$ alltid et oddetall. Dette gjelder for alle ledd fra og med ledd nummer $2$.`,
        r`Første ledd, $2$, er et partall, og det er det eneste som ikke er produsert på denne måten, så det er derfor unntaket.`,
        r`<strong>Svar:</strong> Mønsteret er at hvert ledd er to ganger leddet før pluss $1$. Siden $2$ ganger et helt tall alltid er partall, og partall pluss $1$ er oddetall, er alle ledd bortsett fra det første oddetall.`,
      ],
      ["tallfølger", "mønster", "argumentasjon"]),
    multi("1p-v24-d2-6", "6", 8,
      r`Lufttrykk måles ofte i hektopascal (hPa). Jo høyere over havet vi befinner oss, jo lavere er lufttrykket. Lufttrykket ved havets overflate er ca. $1000$ hPa.<br>Når lufttrykket er lavere enn $1000$ hPa, vil kokepunktet for vann være lavere enn $100\ °\text{C}$. Se tabellen nedenfor.<table><tr><th>Lufttrykk (hPa)</th><th>Kokepunkt for vann (°C)</th></tr><tr><td>$1000$</td><td>$100$</td></tr><tr><td>$500$</td><td>$81{,}4$</td></tr><tr><td>$200$</td><td>$60{,}1$</td></tr><tr><td>$80$</td><td>$41{,}5$</td></tr><tr><td>$40$</td><td>$29$</td></tr></table>`,
      [
        part("1p-v24-d2-6", "a", r`Bestem en modell $K$ på formen $K(x) = a\cdot x^{b}$ som tilnærmet viser sammenhengen mellom lufttrykket $x$ hPa og kokepunktet $K(x)\ °\text{C}$.`,
          r`Legg tabellen inn i regnearket i GeoGebra og bruk potensregresjon («RegPot»).`,
          [
            r`Legg verdiene fra tabellen inn i regnearket i GeoGebra som punkter og velg regresjon med potensfunksjon (formen $a\cdot x^{b}$).`,
            r`Resultatet er $a \approx 7{,}56$ og $b \approx 0{,}38$. Kontroll: $K(1000) \approx 104$, $K(500) \approx 80{,}2$, $K(200) \approx 56{,}6$, $K(80) \approx 40{,}0$ og $K(40) \approx 30{,}7$. Det er innenfor noen få grader fra tabellverdiene, så modellen passer tilnærmet.`,
            r`<strong>Svar:</strong> $K(x) = 7{,}56\cdot x^{0{,}38}$.`,
          ]),
        part("1p-v24-d2-6", "b", r`<strong>Ari:</strong> Betyr dette at det ikke går an å få egg hardkokte oppe på et høyt fjell? Et egg blir ikke hardkokt dersom temperaturen i vannet er lavere enn $85\ °\text{C}$.<br><strong>Lisa:</strong> Det kommer vel an på hvor høyt fjellet er?<br><strong>Ari:</strong> Jeg vil lage en modell som viser hvor høyt lufttrykket er $x$ kilometer over havets overflate. Jeg har lært at lufttrykket minker med ca. $12\ \%$ per km.<br><strong>Lisa:</strong> Jeg har lært at lufttrykket halveres for hver $5{,}5$ km. Jeg vil ta utgangspunkt i dette og lage en modell på samme form som den du lager, Ari.<br>Lag modellene for Ari og Lisa.`,
          r`Lufttrykket synker med samme prosent per km, så modellene er eksponentielle: $P(x) = 1000\cdot k^{x}$. Ari: $k = 0{,}88$. Lisa: $k^{5{,}5} = 0{,}5$.`,
          [
            r`Begge modellene har form $P(x) = 1000\cdot k^{x}$, der $x$ er km over havet og $1000$ hPa er trykket ved havet.`,
            r`<strong>Ari:</strong> en nedgang på $12\ \%$ per km gir vekstfaktor $1 - 0{,}12 = 0{,}88$, så $A(x) = 1000\cdot 0{,}88^{x}$.`,
            r`<strong>Lisa:</strong> trykket halveres for hver $5{,}5$ km, så $k^{5{,}5} = 0{,}5$, altså $k = 0{,}5^{\frac{1}{5{,}5}} \approx 0{,}8816$. Da er $L(x) = 1000\cdot 0{,}5^{\frac{x}{5{,}5}} \approx 1000\cdot 0{,}8816^{x}$. (Det svarer til en nedgang på omtrent $11{,}8\ \%$ per km.)`,
            r`<strong>Svar:</strong> Ari: $A(x) = 1000\cdot 0{,}88^{x}$. Lisa: $L(x) = 1000\cdot 0{,}5^{\frac{x}{5{,}5}} \approx 1000\cdot 0{,}8816^{x}$.`,
          ]),
        part("1p-v24-d2-6", "c", r`Omtrent hvor høyt over havet er det mulig å få egg hardkokte?`,
          r`Finn først lufttrykket der kokepunktet er $85\ °\text{C}$ ($K(x) = 85$), og så høyden der modellene til Ari og Lisa gir dette trykket.`,
          [
            r`Egg blir hardkokt når $K(x) \ge 85$. Løs $7{,}56\cdot x^{0{,}38} = 85$. Det gir $x = \left(\dfrac{85}{7{,}56}\right)^{\frac{1}{0{,}38}} \approx 583$ hPa (grafisk: skjæringspunkt mellom $K$ og $y = 85$).`,
            r`Finn høyden der trykket er $583$ hPa. Ari: $1000\cdot 0{,}88^{x} = 583$, som gir $x = \dfrac{\ln 0{,}583}{\ln 0{,}88} \approx 4{,}2$ km. Lisa: $1000\cdot 0{,}8816^{x} = 583$, som gir $x \approx 4{,}3$ km.`,
            r`<strong>Svar:</strong> Det er mulig å få egg hardkokte opp til omtrent $4{,}2$ til $4{,}3$ km over havet, altså rundt $4$ km.`,
          ]),
      ],
      ["potensfunksjoner", "eksponentialfunksjoner", "modeller", "GeoGebra"]),
    single("1p-v24-d2-7", "7", 4,
      r`<strong>TA 3 PAR SKO, BETAL FOR 2 PAR. Vi spanderer det rimeligste paret.</strong><br>Du har bestemt deg for å benytte et «Ta 3, betal for 2»-tilbud i en skobutikk. Du trenger bare to par sko selv, men du tar med deg en venn som også trenger et par sko.<br>Du velger et par sko som koster $800$ kroner, og et par sko som koster $1550$ kroner. Vennen din velger et par sko som koster $1350$ kroner.<br>Vis hvordan du kan bruke prosentregning til å bestemme hvor mye hver av dere bør betale. Begrunn framgangsmåten din, og forklar hvordan du har tenkt.`,
      r`Finn hvor mange prosent rabatt de tre parene til sammen får, og la hver av dere få samme prosentvise rabatt på sitt eget kjøp.`,
      [
        r`Tre par koster $800 + 1550 + 1350 = 3700$ kroner. Det rimeligste paret ($800$ kroner) er gratis, så til sammen skal dere betale $1550 + 1350 = 2900$ kroner.`,
        r`Rabatten er $800$ kroner av $3700$ kroner, altså $\dfrac{800}{3700} \approx 21{,}6\ \%$. Dere betaler dermed $\dfrac{2900}{3700} \approx 78{,}4\ \%$ av prisen. Vekstfaktoren er $0{,}784$.`,
        r`<strong>Begrunnelse:</strong> Rabatten får dere fordi dere handler sammen, så den bør fordeles rettferdig. Det er rimelig at hver av dere får samme prosentvise rabatt på det dere selv velger, slik at den som kjøper dyrest, også får mest igjen i kroner.`,
        r`Du: $(800 + 1550)\cdot 0{,}784 = 2350\cdot 0{,}784 \approx 1842$ kroner. Vennen: $1350\cdot 0{,}784 \approx 1058$ kroner.`,
        r`Kontroll: $1842 + 1058 = 2900$ kroner. ✓`,
        r`<strong>Svar:</strong> Du bør betale omtrent $1842$ kroner, og vennen din bør betale omtrent $1058$ kroner, slik at begge får omtrent $21{,}6\ \%$ rabatt. (Oppgaven er åpen. Dette er ett mulig løsningsforslag med god begrunnelse.)`,
      ],
      ["prosent", "rabatt", "argumentasjon"]),
  ],
});
