import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, våren 2025 (21.05.2025). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 2 timer.
 */
export const EKSAMEN_1P_V2025: Exam = officialExam({
  id: "1p-v2025",
  title: "Eksamen vår 2025",
  season: "vår",
  year: 2025,
  date: "21.05.2025",
  del1Minutes: 120,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "21.05.2025", "1P_V25_LK20.pdf"),
  del1: [
    single("1p-v25-d1-1", "1", 1,
      U + r`En sjokoladeplate koster 40 kroner i en butikk og 60 kroner på en bensinstasjon.<br>Hvor mange prosent dyrere er sjokoladeplaten på bensinstasjonen?`,
      r`Finn prisforskjellen og sammenlign den med den opprinnelige prisen, altså prisen i butikken.`,
      [
        r`Prisforskjellen er $60 - 40 = 20$ kroner.`,
        r`Sammenlignet med butikkprisen er det $\dfrac{20}{40} = 0{,}5 = 50\ \%$.`,
        r`<strong>Svar:</strong> Sjokoladeplaten er $50\ \%$ dyrere på bensinstasjonen.`,
      ],
      ["prosent", "prosentvis endring"]),
    single("1p-v25-d1-2", "2", 1,
      U + r`I en kommune fikk Arbeiderpartiet $40\ \%$ av stemmene ved forrige valg. Senterpartiet fikk $20\ \%$ av stemmene. En meningsmåling viser at begge partiene har økt sin oppslutning med $5$ prosentpoeng siden valget.<br>Hvilket parti har hatt størst prosentvis framgang?<br>Husk å begrunne svaret.`,
      r`Prosentpoeng er en forskjell mellom to prosenttall. Prosentvis framgang er endringen delt på det partiet hadde fra før.`,
      [
        r`Begge partiene har gått fram $5$ prosentpoeng, men de startet på ulike nivåer.`,
        r`Arbeiderpartiet: fra $40\ \%$ til $45\ \%$. Prosentvis framgang er $\dfrac{5}{40} = 0{,}125 = 12{,}5\ \%$.`,
        r`Senterpartiet: fra $20\ \%$ til $25\ \%$. Prosentvis framgang er $\dfrac{5}{20} = 0{,}25 = 25\ \%$.`,
        r`<strong>Svar:</strong> Senterpartiet har størst prosentvis framgang ($25\ \%$ mot $12{,}5\ \%$), fordi de samme fem prosentpoengene utgjør en større del av et lite utgangspunkt.`,
      ],
      ["prosent", "prosentpoeng"]),
    single("1p-v25-d1-3", "3", 3,
      U + r`Beskriv en praktisk situasjon der to størrelser er omvendt proporsjonale.<br>Forklar hvorfor størrelsene er omvendt proporsjonale.<br>Tegn en graf som illustrerer sammenhengen mellom størrelsene.<br>Marker tre punkter på grafen, og sett riktige koordinater på punktene.`,
      r`Velg en situasjon der produktet av de to størrelsene alltid er det samme, for eksempel fart og tid på en fast strekning.`,
      [
        r`<strong>Situasjon:</strong> En bil skal kjøre en fast strekning på $120$ km. Jo høyere farten $v$ (km/h) er, jo kortere tid $t$ (timer) tar turen.`,
        r`<strong>Forklaring:</strong> Strekningen er fast, så $v\cdot t = 120$, altså $t = \dfrac{120}{v}$. Produktet av de to størrelsene er konstant. Dobler vi farten, halveres tiden. Det er nettopp det som kjennetegner omvendt proporsjonale størrelser.`,
        r`<strong>Tre punkter:</strong> $v = 30$ gir $t = \dfrac{120}{30} = 4$. $v = 60$ gir $t = \dfrac{120}{60} = 2$. $v = 120$ gir $t = \dfrac{120}{120} = 1$. Punktene er $(30,\ 4)$, $(60,\ 2)$ og $(120,\ 1)$.`,
        r`<strong>Graf:</strong> Tegn et koordinatsystem med $v$ (km/h) på førsteaksen og $t$ (timer) på andreaksen. Marker de tre punktene, og trekk en jevn, avtakende kurve gjennom dem. Kurven nærmer seg aksene uten å nå dem.`,
        r`<strong>Svar:</strong> Fart og tid på en fast strekning er omvendt proporsjonale ($t = \dfrac{120}{v}$). Grafen går gjennom $(30,\ 4)$, $(60,\ 2)$ og $(120,\ 1)$.`,
      ],
      ["omvendt proporsjonalitet", "graf"]),
    single("1p-v25-d1-4", "4", 2,
      U + r`Klassen til Elias arbeider med oppgaven nedenfor.<br><br><em>Oppgave:</em> $\ \square\cdot 10^{\square}\cdot\square\cdot 10^{\square} =$<br><em>Skriv av og fyll inn ett tall i hvert av de fire feltene i uttrykket ovenfor slik at svaret blir $8\,000\,000\,000$. Du kan ikke bruke det samme tallet flere ganger.</em><br><br>Elias påstår at det er mulig å bruke åtte av de ti tallene $0, 1, 2, 3, 4, 5, 6, 7, 8$ og $9$ og sette opp to ulike løsninger av oppgaven.<br>Vis at Elias har rett.`,
      r`Skriv $8\,000\,000\,000 = 8\cdot 10^{9}$. Gangetallene må ha produkt $8$, og eksponentene må ha sum $9$. Finn to slike løsninger som til sammen bruker åtte ulike sifre.`,
      [
        r`Uttrykket er $a\cdot 10^{m}\cdot b\cdot 10^{n} = a\cdot b\cdot 10^{m+n}$. Vi vil ha $8\,000\,000\,000 = 8\cdot 10^{9}$.`,
        r`Det betyr $a\cdot b = 8$ og $m + n = 9$.`,
        r`To siffer med produkt $8$: $1\cdot 8$ eller $2\cdot 4$.`,
        r`<strong>Løsning 1:</strong> $2\cdot 10^{3}\cdot 4\cdot 10^{6} = 8\cdot 10^{9}$. Sifrene som brukes er $2, 3, 4, 6$.`,
        r`<strong>Løsning 2:</strong> $1\cdot 10^{0}\cdot 8\cdot 10^{9} = 8\cdot 10^{9}$. Sifrene som brukes er $1, 0, 8, 9$.`,
        r`Begge utregningene gir $8\cdot 10^{9} = 8\,000\,000\,000$. Sifrene $2, 3, 4, 6$ og $1, 0, 8, 9$ er åtte ulike siffer, og det er ingen gjentakelser innenfor en løsning.`,
        r`<strong>Svar:</strong> Elias har rett. To løsninger er $2\cdot 10^{3}\cdot 4\cdot 10^{6}$ og $1\cdot 10^{0}\cdot 8\cdot 10^{9}$, og de bruker til sammen åtte ulike siffer.`,
      ],
      ["potenser", "standardform"]),
    single("1p-v25-d1-5", "5", 2,
      U + r`I blodet er det tre hovedtyper blodceller. De tre hovedtypene er hvite blodceller, røde blodceller og blodplater.<br>I en liter blod er det $7\cdot 10^{9}$ hvite blodceller, $5\cdot 10^{12}$ røde blodceller og $3\cdot 10^{11}$ blodplater.<br>Hvor mange blodceller blir dette til sammen?`,
      r`Skriv alle tre tallene med samme tierpotens, for eksempel $10^{9}$, og legg sammen.`,
      [
        r`Skriv alle med $10^{9}$: $5\cdot 10^{12} = 5000\cdot 10^{9}$ og $3\cdot 10^{11} = 300\cdot 10^{9}$.`,
        r`Sum: $7\cdot 10^{9} + 5000\cdot 10^{9} + 300\cdot 10^{9} = 5307\cdot 10^{9}$.`,
        r`$5307\cdot 10^{9} = 5{,}307\cdot 10^{12}$.`,
        r`<strong>Svar:</strong> Til sammen er det $5{,}307\cdot 10^{12}$ blodceller, altså $5\,307\,000\,000\,000$ i en liter blod.`,
      ],
      ["standardform", "potenser"]),
    multi("1p-v25-d1-6", "6", 2,
      U + r`Ovenfor ser du tre figurer. Figurene er satt sammen av små grønne kvadrater. Tenk deg at du skal fortsette å lage figurer etter samme mønster.<br><em>Figurene viser: Figur 1 har $4$ kvadrater, figur 2 har $9$ og figur 3 har $16$. Hver figur har en kvadratisk blokk øverst ($1\times 1$, $2\times 2$ og $3\times 3$) og en rad med ett kvadrat til venstre, en søyle med like mange kvadrater som blokkens side til høyre, og en skrå rad med like mange kvadrater under blokken.</em>` +
        figur("p1-v25-d1-6", "6", "Tre figurer av små grønne kvadrater med lysegrønn kant, merket Figur 1, Figur 2, Figur 3. Figur 1: fire kvadrater i en ring rundt et tomt felt (over, til venstre, til høyre, under). Figur 2: en 2×2-blokk øverst, ett kvadrat til venstre, to på høyre side nedover, og to skrått nedover mot venstre (under blokken). Figur 3: en 3×3-blokk øverst, ett kvadrat til venstre, tre på høyre side nedover og tre skrått nedover under blokken."),
      [
        part("1p-v25-d1-6", "a", r`Hvor mange små grønne kvadrater vil det være i figur 5?`,
          r`Tell kvadratene i figur 1, 2 og 3, og se hva tallene er. Fortsett mønsteret.`,
          [
            r`Antall kvadrater i figur 1, 2 og 3 er $4$, $9$ og $16$. Det er $2^{2}$, $3^{2}$ og $4^{2}$.`,
            r`Mønsteret er at figur $n$ har $(n+1)^{2}$ kvadrater. Figur 4 har $25$, og figur 5 har $6^{2} = 36$.`,
            r`<strong>Svar:</strong> Figur 5 har $36$ små grønne kvadrater.`,
          ]),
        part("1p-v25-d1-6", "b", r`Lag en formel for antallet små grønne kvadrater i figur $n$.`,
          r`Del figuren i blokken øverst, enkeltkvadratet til venstre, søylen til høyre og den skrå raden.`,
          [
            r`Figur $n$ har en blokk på $n\cdot n = n^{2}$ kvadrater, ett kvadrat til venstre, $n$ kvadrater til høyre og $n$ kvadrater i den skrå raden.`,
            r`Antall er $n^{2} + 1 + n + n = n^{2} + 2n + 1 = (n+1)^{2}$.`,
            r`Kontroll: $n = 3$ gir $4^{2} = 16$. ✓`,
            r`<strong>Svar:</strong> Antallet kvadrater i figur $n$ er $(n+1)^{2}$, altså $n^{2} + 2n + 1$.`,
          ]),
      ],
      ["tallmønstre", "formler"]),
    single("1p-v25-d1-7", "7", 3,
      U + r`Lars har spart penger i flere år. Han har nå $120\,000$ kroner. Pengene står på en konto i banken. Lars vil fortsette å spare og har en plan. Han har laget programmet nedenfor.<pre><code>1   konto = 120000
2   sparebeløp = 24000
3   vekstfaktor = 1.058
4   år = 0
5
6   while konto &lt; 1000000:
7
8       konto = konto + sparebeløp
9       konto = konto * vekstfaktor
10
11      år = år + 1
12
13  print(år)
14  print(konto)</code></pre>Hva forteller programmet om planen til Lars?<br>Hva vil verdiene som skrives ut, fortelle Lars?`,
      r`Gå gjennom hva som skjer i løkka hvert år: først legges det inn penger, så kommer renten. Hva er betingelsen for at løkka stopper?`,
      [
        r`Startverdiene: kontoen har $120\,000$ kroner, Lars sparer $24\,000$ kroner per år, og vekstfaktoren er $1{,}058$, altså en rente på $5{,}8\ \%$ per år. Tidteller <code>år</code> starter på $0$.`,
        r`Hver gang løkka kjører, legger Lars inn $24\,000$ kroner, og så vokser hele beløpet med $5{,}8\ \%$ rente. Deretter øker <code>år</code> med $1$.`,
        r`Løkka kjører så lenge kontoen har under $1\,000\,000$ kroner. Planen er altså å spare $24\,000$ kroner hvert år til kontoen har nådd en million kroner.`,
        r`Når løkka stopper, skrives <code>år</code> ut. Det er antall år det tar før Lars har minst $1\,000\,000$ kroner. Deretter skrives <code>konto</code> ut. Det er beløpet på kontoen da.`,
        r`Kjører vi programmet, får vi $17$ år og et beløp på omtrent $1\,016\,760$ kroner.`,
        r`<strong>Svar:</strong> Programmet viser planen om å spare $24\,000$ kroner hvert år med $5{,}8\ \%$ rente fram til kontoen har en million kroner. Utskriften forteller hvor mange år det tar ($17$ år) og hvor mye som står på kontoen når målet er nådd (ca. $1\,016\,760$ kroner).`,
      ],
      ["programmering", "vekstfaktor", "sparing"]),
    multi("1p-v25-d1-8", "8", 4,
      U + r`Nora bestemmer seg for å kjøpe en bøtte og fylle den med godteri. Hun ser at det er en lineær sammenheng mellom antall hektogram godteri hun fyller i bøtta, og prisen hun må betale for bøtta med godteriet.<br>Nedenfor ser du en modell som illustrerer dette.<br><em>Figuren viser: en rett, stigende linje. Førsteaksen $x$ er antall hektogram godteri. Andreaksen er pris for bøtta med godteri (kroner). Linjen går gjennom punktene $(5,\ 90)$ og $(20,\ 270)$ og skjærer andreaksen over origo.</em><br>Modellen kan uttrykkes på formen $G(x) = ax + b$.` +
        figur("p1-v25-d1-8", "8", "Koordinatsystem uten tall på aksene. x-aksen: «Antall hektogram godteri». y-aksen: «Pris for bøtta med godteri (kroner)». En rett, stigende linje som starter over origo på y-aksen. To markerte punkter: (5, 90) og (20, 270) med koordinatene skrevet ved siden av. Ingen gridlinjer."),
      [
        part("1p-v25-d1-8", "a", r`Bestem $a$ og $b$.`,
          r`$a$ er stigningstallet: endring i $y$ delt på endring i $x$ mellom de to punktene. Sett så inn ett punkt for å finne $b$.`,
          [
            r`$a = \dfrac{270 - 90}{20 - 5} = \dfrac{180}{15} = 12$.`,
            r`Setter inn punktet $(5,\ 90)$ i $G(x) = 12x + b$: $90 = 12\cdot 5 + b = 60 + b$, så $b = 30$.`,
            r`Kontroll med det andre punktet: $G(20) = 12\cdot 20 + 30 = 270$. ✓`,
            r`<strong>Svar:</strong> $a = 12$ og $b = 30$, altså $G(x) = 12x + 30$.`,
          ]),
        part("1p-v25-d1-8", "b", r`Gi en praktisk tolkning av $a$ og $b$ i denne modellen.`,
          r`$a$ er prisendringen per hektogram. $b$ er prisen når $x = 0$.`,
          [
            r`$a = 12$: For hvert hektogram godteri Nora fyller i bøtta, øker prisen med $12$ kroner. Godteriet koster altså $12$ kroner per hektogram.`,
            r`$b = 30$: Prisen for bøtta uten godteri ($x = 0$) er $30$ kroner. Det er altså en fast pris for selve bøtta.`,
            r`<strong>Svar:</strong> $a = 12$ er prisen per hektogram godteri ($12$ kr/hg), og $b = 30$ er prisen for den tomme bøtta.`,
          ]),
        part("1p-v25-d1-8", "c", r`Hvor mye koster en bøtte med 8 hg godteri?`,
          r`Sett $x = 8$ i $G(x)$.`,
          [
            r`$G(8) = 12\cdot 8 + 30 = 96 + 30 = 126$.`,
            r`<strong>Svar:</strong> En bøtte med $8$ hg godteri koster $126$ kroner.`,
          ]),
      ],
      ["lineære funksjoner", "stigningstall", "konstantledd"]),
  ],
  del2: [
    multi("1p-v25-d2-1", "1", 6,
      r`Tabellen nedenfor viser antall registrerte tilfeller av kikhoste i Norge noen måneder i perioden januar 2023 – oktober 2024.<table><tr><th>Måned</th><td>Januar 2023</td><td>Mai 2023</td><td>Oktober 2023</td><td>Februar 2024</td><td>August 2024</td><td>Oktober 2024</td></tr><tr><th>Antall registrerte tilfeller</th><td>$29$</td><td>$93$</td><td>$164$</td><td>$284$</td><td>$1035$</td><td>$1657$</td></tr></table>La $x$ være antall måneder etter desember 2022. Det vil si at $x = 1$ tilsvarer januar 2023, $x = 3$ tilsvarer mars 2023, og så videre.`,
      [
        part("1p-v25-d2-1", "a", r`Bruk opplysningene ovenfor til å vise at funksjonen $K$ gitt ved $K(x) = 27{,}8\cdot 1{,}2^{x}$ er en god modell for antall registrerte tilfeller av kikhoste i Norge i perioden januar 2023 – oktober 2024.`,
          r`Finn $x$ for hver måned, regn ut $K(x)$ og sammenlign med tabellen. Du kan også legge punktene inn i GeoGebra og gjøre en eksponentiell regresjon.`,
          [
            r`Månedene svarer til $x = 1$ (januar 2023), $x = 5$ (mai 2023), $x = 10$ (oktober 2023), $x = 14$ (februar 2024), $x = 20$ (august 2024) og $x = 22$ (oktober 2024).`,
            r`<table><tr><th>$x$</th><th>Registrert</th><th>$K(x)$</th><th>Avvik</th></tr><tr><td>$1$</td><td>$29$</td><td>$33$</td><td>$+15\ \%$</td></tr><tr><td>$5$</td><td>$93$</td><td>$69$</td><td>$−26\ \%$</td></tr><tr><td>$10$</td><td>$164$</td><td>$172$</td><td>$+5\ \%$</td></tr><tr><td>$14$</td><td>$284$</td><td>$357$</td><td>$+26\ \%$</td></tr><tr><td>$20$</td><td>$1035$</td><td>$1066$</td><td>$+3\ \%$</td></tr><tr><td>$22$</td><td>$1657$</td><td>$1535$</td><td>$−7\ \%$</td></tr></table>`,
            r`Modellverdiene ligger nær de registrerte tallene. Avvikene er størst for $x = 5$ (omtrent $−26\ \%$) og $x = 14$ (omtrent $+26\ \%$), midt i perioden, mens de tre punktene $x = 10$, $x = 20$ og $x = 22$ treffer innenfor $7\ \%$. Både tall og modell øker omtrent eksponentielt, fra under $30$ til over $1600$ tilfeller.`,
            r`Som kontroll: legg punktene inn i GeoGebra og bruk eksponentiell regresjon. Det gir omtrent $27{,}8\cdot 1{,}199^{x}$, nesten likt $K(x)$. Tegner vi grafen til $K$ sammen med punktene, følger punktene kurven godt.`,
            r`<strong>Svar:</strong> $K$ gir verdier nær de registrerte tallene i hele perioden, og regresjon gir nesten samme funksjon. Dermed er $K(x) = 27{,}8\cdot 1{,}2^{x}$ en god modell.`,
          ]),
        part("1p-v25-d2-1", "b", r`Gi en praktisk tolkning av tallet $1{,}2$ i modellen.`,
          r`$1{,}2$ er vekstfaktoren. Gå fra faktoren til prosent.`,
          [
            r`Vekstfaktoren $1{,}2$ betyr at $K(x+1) = 1{,}2\cdot K(x)$, altså $120\ \%$ av forrige måned.`,
            r`Det svarer til en økning på $20\ \%$ per måned.`,
            r`<strong>Svar:</strong> Antall registrerte tilfeller av kikhoste øker med $20\ \%$ hver måned ifølge modellen.`,
          ]),
        part("1p-v25-d2-1", "c", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(4,\ K(4))$ og $(21,\ K(21))$. Gi en praktisk tolkning av svaret du får.`,
          r`Regn ut $K(4)$ og $K(21)$, og bruk $a = \dfrac{\Delta y}{\Delta x}$. Husk hva $x = 4$ og $x = 21$ er for måneder.`,
          [
            r`$K(4) = 27{,}8\cdot 1{,}2^{4} \approx 57{,}6$ og $K(21) = 27{,}8\cdot 1{,}2^{21} \approx 1278{,}9$.`,
            r`Stigningstallet er $a = \dfrac{1278{,}9 - 57{,}6}{21 - 4} = \dfrac{1221{,}3}{17} \approx 71{,}8$.`,
            r`Måned $4$ er april 2023, og måned $21$ er september 2024.`,
            r`<strong>Svar:</strong> Stigningstallet er omtrent $72$. Fra april 2023 til september 2024 økte antall registrerte tilfeller av kikhoste i gjennomsnitt med omtrent $72$ tilfeller per måned.`,
          ]),
        part("1p-v25-d2-1", "d", r`Hvor mange tilfeller av kikhoste vil bli registrert i Norge i mai 2025 ifølge modellen?`,
          r`Finn $x$ for mai 2025: januar 2025 er $x = 25$.`,
          [
            r`Januar 2023 er $x = 1$, så januar 2025 er $x = 1 + 24 = 25$, og mai 2025 er $x = 29$.`,
            r`$K(29) = 27{,}8\cdot 1{,}2^{29} \approx 5499$.`,
            r`<strong>Svar:</strong> Ifølge modellen blir det omtrent $5500$ registrerte tilfeller av kikhoste i mai 2025.`,
          ]),
      ],
      ["eksponentialfunksjoner", "modeller", "regresjon", "GeoGebra"]),
    multi("1p-v25-d2-2", "2", 2,
      r`<em>Artikkel fra aesby.no, «Har gått 83 ganger rundt Jorda»:</em> «I sommerens Stikk UT! har $40\,000$ deltakere registrert nær 1 million turer. De har tilbakelagt $3{,}3$ millioner km på de ulike turene, noe som tilsvarer 83 gangar rundt jorda. Og når Stikk UT!-deltakerne i tillegg har lagt bak seg $78\,000$ høydekilometer, tilsvarer det nesten $9\,000$ ganger opp Mount Everest, går det fram av ei pressemelding fra Sunnmøre friluftsråd.»`,
      [
        part("1p-v25-d2-2", "a", r`Hvor langt har hver deltaker i sommerens Stikk UT! i gjennomsnitt gått?`,
          r`Gjennomsnitt: total lengde delt på antall deltakere. $3{,}3$ millioner km $= 3\,300\,000$ km.`,
          [
            r`Totalt $3\,300\,000$ km på $40\,000$ deltakere.`,
            r`$\dfrac{3\,300\,000}{40\,000} = 82{,}5$.`,
            r`<strong>Svar:</strong> Hver deltaker har i gjennomsnitt gått $82{,}5$ km.`,
          ]),
        part("1p-v25-d2-2", "b", r`Hvor langt har Sunnmøre friluftsråd regnet at det er rundt jorda?`,
          r`$3{,}3$ millioner km tilsvarer $83$ ganger rundt jorda. Hvor langt er én gang?`,
          [
            r`$83$ runder rundt jorda er $3{,}3$ millioner km $= 3\,300\,000$ km.`,
            r`Én runde er $\dfrac{3\,300\,000}{83} \approx 39\,759$ km.`,
            r`<strong>Svar:</strong> Friluftsrådet har regnet at det er omtrent $39\,800$ km, altså ca. $40\,000$ km, rundt jorda.`,
          ]),
      ],
      ["gjennomsnitt", "måleenheter"]),
    single("1p-v25-d2-3", "3", 3,
      r`Elise skal gå fra dør til dør og selge aviser hver lørdag. En avis koster $49$ kroner.<br>Firmaet hun skal arbeide for, beregner lønn på ulike måter. Elise kan velge mellom to tilbud.<br><strong>Tilbud 1:</strong> Lønn: $35\ \%$ av beløpet hun selger aviser for.<br><strong>Tilbud 2:</strong> Fast lønn: $150$ kroner per lørdag. Tillegg: $10$ kroner per avis hun selger.<br>Gjør beregninger og gi Elise råd om hvilket tilbud hun bør velge.`,
      r`La $n$ være antall aviser hun selger. Sett opp lønnen for hvert tilbud som funksjon av $n$ og finn når de er like.`,
      [
        r`Med $n$ solgte aviser er salgsbeløpet $49n$ kroner.`,
        r`Tilbud 1: $L_1(n) = 0{,}35\cdot 49n = 17{,}15n$.`,
        r`Tilbud 2: $L_2(n) = 150 + 10n$.`,
        r`De gir lik lønn når $17{,}15n = 150 + 10n$, altså $7{,}15n = 150$, så $n = \dfrac{150}{7{,}15} \approx 20{,}98$.`,
        r`Test: $n = 20$ gir $L_1 = 343$ og $L_2 = 350$. $n = 21$ gir $L_1 = 360{,}15$ og $L_2 = 360$.`,
        r`Lønnen i Tilbud 1 stiger raskere ($17{,}15$ kroner per avis mot $10$), så Tilbud 1 blir best fra og med $21$ aviser. Tilbud 2 er best for færre.`,
        r`<strong>Svar:</strong> Hvis Elise tror hun selger $20$ aviser eller færre hver lørdag, bør hun velge Tilbud 2. Selger hun $21$ aviser eller flere, bør hun velge Tilbud 1.`,
      ],
      ["funksjoner", "lineære funksjoner", "prosent"]),
    single("1p-v25-d2-4", "4", 2,
      r`<em>Fra nettsiden til Bladkongen: «Dagbladet Lørdag med Magasinet».</em><ul><li>Kjøp 4 aviser for $99$ kroner, spar $49\ \%$</li><li>Kjøp 12 aviser for $449$ kroner, spar $24\ \%$</li><li>Kjøp 24 aviser for $799$ kroner, spar $32\ \%$</li><li>Kjøp 52 aviser for $1399$ kroner, spar $45\ \%$</li></ul>Hvor mye koster Dagbladet Lørdag uten rabatt?`,
      r`Prisen med rabatt er $100\ \% - $ rabatten av prisen uten rabatt. Finn prisen uten rabatt for ett av tilbudene, og del på antall aviser.`,
      [
        r`Ta tilbudet med $24$ aviser: $799$ kroner er $100 - 32 = 68\ \%$ av prisen uten rabatt $p$. Da er $0{,}68\cdot p = 799$.`,
        r`$p = \dfrac{799}{0{,}68} = 1175$ kroner for $24$ aviser.`,
        r`Pris per avis: $\dfrac{1175}{24} \approx 48{,}96$ kroner.`,
        r`Kontroll med $52$ aviser: $\dfrac{1399}{0{,}55\cdot 52} \approx 48{,}92$. Med $4$ aviser: $\dfrac{99}{0{,}51\cdot 4} \approx 48{,}53$. Med $12$ aviser: $\dfrac{449}{0{,}76\cdot 12} \approx 49{,}23$. Alle ligger rundt $49$ kroner.`,
        r`<strong>Svar:</strong> Dagbladet Lørdag koster omtrent $49$ kroner per avis uten rabatt.`,
      ],
      ["prosent", "rabatt"]),
    single("1p-v25-d2-5", "5", 2,
      r`Anne skal bygge en brygge og lurer på hvilken type terrassebord hun skal velge. Hun finner informasjonen nedenfor på nettsiden til en byggevareforhandler. Tykkelse og bredde er gitt i mm. Byggevareforhandleren oppgir pris per meter terrassebord.<table><tr><th>Type</th><th>Pris per meter</th><th>Tykkelse</th><th>Bredde</th></tr><tr><td>Furu 28x145 ter concise brun royal</td><td>$67{,}90$ kr</td><td>$28$</td><td>$145$</td></tr><tr><td>Furu 28x095 ter concise brun royal</td><td>$49{,}90$ kr</td><td>$28$</td><td>$95$</td></tr></table>Hva blir prisen per kvadratmeter for hver av de to typene terrassebord?`,
      r`Én meter terrassebord dekker bredden ganger $1$ meter. Gjør bredden om til meter og del prisen på arealet.`,
      [
        r`Bredden $145$ mm er $0{,}145$ m, så én meter terrassebord dekker $0{,}145\ \text{m}^2$.`,
        r`Pris per kvadratmeter: $\dfrac{67{,}90}{0{,}145} \approx 468{,}28$ kroner.`,
        r`Bredden $95$ mm er $0{,}095$ m, så én meter terrassebord dekker $0{,}095\ \text{m}^2$.`,
        r`Pris per kvadratmeter: $\dfrac{49{,}90}{0{,}095} \approx 525{,}26$ kroner.`,
        r`<strong>Svar:</strong> Furu 28x145 koster omtrent $468$ kroner per kvadratmeter, og Furu 28x095 koster omtrent $525$ kroner per kvadratmeter. Det brede bordet er altså billigst per kvadratmeter. (Mellomrom mellom bordene er ikke regnet med.)`,
      ],
      ["måleenheter", "areal", "pris"]),
    multi("1p-v25-d2-6", "6", 6,
      r`Isabel er industridesigner. Hun arbeider med et design på bokser med form som sylindre.<br>Formel for å regne ut volumet av en boks med radius $r$ og høyde $h$: $V = \pi\cdot r^{2}\cdot h$.<br>Formel for å regne ut arealet av overflaten av boksen: $O = \pi\cdot r^{2} + 2\cdot\pi\cdot r\cdot h$.<br>Isabel lurer på hvor stor radius hun bør velge og hvor høye boksene må være, når hver boks skal ha<ul><li>et volum $V$ på $450\ \text{cm}^3$</li><li>minst mulig overflate $O$</li></ul>Isabel ser at når hun har gitt volum og radius, kan hun regne ut høyden ved å bruke formelen $V = \pi\cdot r^{2}\cdot h$.`,
      [
        part("1p-v25-d2-6", "a", r`Lag en oversikt som vist nedenfor. Gjør beregninger og fyll inn verdiene som mangler.<table><tr><th>Radius, $r$ (cm)</th><th>Høyde, $h$ (cm)</th><th>Overflate, $O$ (cm<sup>2</sup>)</th><th>Volum, $V$ (cm<sup>3</sup>)</th></tr><tr><td>$2$</td><td>$35{,}8$</td><td>$462{,}6$</td><td>$450$</td></tr><tr><td>$4$</td><td></td><td></td><td>$450$</td></tr><tr><td>$6$</td><td></td><td></td><td>$450$</td></tr><tr><td>$8$</td><td></td><td></td><td>$450$</td></tr></table>`,
          r`Løs $V = \pi r^{2}h$ for $h$: $h = \dfrac{450}{\pi r^{2}}$. Sett så $r$ og $h$ inn i overflateformelen.`,
          [
            r`Høyden er $h = \dfrac{450}{\pi\cdot r^{2}}$. Bruk den uavrundede verdien av $h$ videre (for eksempel i et regneark eller i GeoGebra), ikke den avrundede. Da unngår vi avrundingsfeil i overflaten.`,
            r`$r = 4$: $h = \dfrac{450}{\pi\cdot 16} \approx 8{,}95$ og $O = \pi\cdot 16 + 2\cdot\pi\cdot 4\cdot h \approx 275{,}3$.`,
            r`$r = 6$: $h = \dfrac{450}{\pi\cdot 36} \approx 3{,}98$ og $O = \pi\cdot 36 + 2\cdot\pi\cdot 6\cdot h \approx 263{,}1$.`,
            r`$r = 8$: $h = \dfrac{450}{\pi\cdot 64} \approx 2{,}24$ og $O = \pi\cdot 64 + 2\cdot\pi\cdot 8\cdot h \approx 313{,}6$.`,
            r`<strong>Svar:</strong><table><tr><th>Radius, $r$ (cm)</th><th>Høyde, $h$ (cm)</th><th>Overflate, $O$ (cm<sup>2</sup>)</th><th>Volum, $V$ (cm<sup>3</sup>)</th></tr><tr><td>$2$</td><td>$35{,}8$</td><td>$462{,}6$</td><td>$450$</td></tr><tr><td>$4$</td><td>$8{,}95$</td><td>$275{,}3$</td><td>$450$</td></tr><tr><td>$6$</td><td>$3{,}98$</td><td>$263{,}1$</td><td>$450$</td></tr><tr><td>$8$</td><td>$2{,}24$</td><td>$313{,}6$</td><td>$450$</td></tr></table>`,
          ]),
        part("1p-v25-d2-6", "b", r`Isabel ønsker å lage en modell som viser overflaten av ulike bokser hun kan lage ved å endre radius.<br>Sett opp et funksjonsuttrykk Isabel kan bruke, og lag en grafisk framstilling som viser sammenhengen mellom radius og overflate.`,
          r`Sett $h = \dfrac{450}{\pi r^{2}}$ inn i $O = \pi r^{2} + 2\pi r h$, slik at overflaten bare avhenger av $r$. Bruk uavrundet $h$ i regneark/GeoGebra.`,
          [
            r`$O(r) = \pi\cdot r^{2} + 2\cdot\pi\cdot r\cdot\dfrac{450}{\pi\cdot r^{2}}$.`,
            r`Forkort: $2\cdot\pi\cdot r\cdot\dfrac{450}{\pi\cdot r^{2}} = \dfrac{900}{r}$.`,
            r`Funksjonsuttrykket er $O(r) = \pi\cdot r^{2} + \dfrac{900}{r}$.`,
            r`Tegn grafen til $O$ i GeoGebra for eksempel $r$ fra $1$ til $10$. Grafen synker bratt fra en stor verdi (for $r = 2$ er $O = 462{,}6$), har et bunnpunkt ved omtrent $r = 5{,}2$, og stiger så igjen (for $r = 8$ er $O = 313{,}6$).`,
            r`<strong>Svar:</strong> $O(r) = \pi\cdot r^{2} + \dfrac{900}{r}$. Grafen er en kurve med et bunnpunkt (se c).`,
          ]),
        part("1p-v25-d2-6", "c", r`Hvor stor må radius i boksene være for at overflaten skal bli minst mulig? Hvor stor blir overflaten da?`,
          r`Finn bunnpunktet på grafen til $O$ med GeoGebra («Ekstremalpunkt»), eller lag en tabell med verdier av $O(r)$ rundt $r = 5{,}2$.`,
          [
            r`Finn bunnpunktet på grafen: $r \approx 5{,}23$ og $O \approx 258{,}0$.`,
            r`Kontroll med tabell: $O(5) \approx 258{,}54$, $O(5{,}2) \approx 258{,}03$, $O(5{,}23) \approx 258{,}02$, $O(5{,}3) \approx 258{,}06$ og $O(5{,}5) \approx 258{,}67$ cm$^2$. Overflaten er minst rundt $r = 5{,}2$.`,
            r`Da er $h = \dfrac{450}{\pi\cdot 5{,}23^{2}} \approx 5{,}23$, så høyden er like stor som radius.`,
            r`<strong>Svar:</strong> Overflaten blir minst når radius er omtrent $5{,}2$ cm. Overflaten er da omtrent $258\ \text{cm}^2$.`,
          ]),
      ],
      ["funksjoner", "geometri", "sylinder", "optimering", "GeoGebra"]),
    single("1p-v25-d2-7", "7", 3,
      r`Sofie kjøper en bagett med smør, ost, skinke, tomat og salat i kantina på skolen hver dag. Bagetten koster $65$ kroner.<br>Sofie vurderer om hun heller skal kjøpe bagetter i en butikk, smøre dem selv og ta dem med på skolen.<br>Gjør nødvendige antakelser og finn ut hvor mye Sofie vil kunne spare i løpet av en måned dersom hun kjøper bagetter i en butikk og smører dem selv.`,
      r`Du må selv velge antall skoledager i en måned og anslå hva ingrediensene koster per bagett. Skriv antakelsene tydelig.`,
      [
        r`<strong>Antakelser</strong> (egne anslag, ikke priser fra en bestemt butikk): Det er $20$ skoledager i en måned. Prisen på ingrediensene til én bagett er anslått slik:<table><tr><th>Bagett (bakeri/butikk)</th><td>$12$ kr</td></tr><tr><th>Smør</th><td>$2$ kr</td></tr><tr><th>Ost</th><td>$5$ kr</td></tr><tr><th>Skinke</th><td>$9$ kr</td></tr><tr><th>Tomat</th><td>$4$ kr</td></tr><tr><th>Salat</th><td>$3$ kr</td></tr></table>`,
        r`Pris per selvsmurt bagett: $12 + 2 + 5 + 9 + 4 + 3 = 35$ kroner.`,
        r`Kantina i løpet av en måned: $20\cdot 65 = 1300$ kroner.`,
        r`Butikk og egen smøring i løpet av en måned: $20\cdot 35 = 700$ kroner.`,
        r`Besparelse: $1300 - 700 = 600$ kroner.`,
        r`<strong>Svar:</strong> Med disse antakelsene sparer Sofie omtrent $600$ kroner i måneden ($30$ kroner per dag). Med andre priser eller et annet antall skoledager blir svaret et annet; det viktige er at antakelsene er rimelige og oppgitt.`,
      ],
      ["modellering", "antakelser", "regning med penger"],
      "Ingrediensprisene er egne anslag. Oppgaven ber om egne antakelser, så svaret er et eksempel."),
  ],
});
