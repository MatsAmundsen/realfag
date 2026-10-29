import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, høsten 2022 (16.11.2022). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 * Eksamenen oppgir ingen poeng eller vekting per oppgave, derfor står points: 0 (viser ingen poengtall).
 */
export const EKSAMEN_1P_H2022: Exam = officialExam({
  id: "1p-h2022",
  title: "Eksamen høst 2022",
  season: "høst",
  year: 2022,
  date: "16.11.2022",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "16.11.2022", "1P_H22_LK20.pdf"),
  del1: [
    multi("1p-h22-d1-1", "1", 0,
      U + r`I $2022$ må innbyggerne i Lindesnes kommune betale $3{,}0\ \text{‰}$ i eiendomsskatt. Eiendomsskatten beregnes ut fra en eiendoms likningsverdi.<br>Familien Hansen har en bolig med likningsverdi $2\,500\,000$ kroner.`,
      [
        part("1p-h22-d1-1", "a", r`Hvor mye betaler familien Hansen i eiendomsskatt i $2022$?`,
          r`$1\ \text{‰}$ betyr $\dfrac{1}{1000}$. Finn $3{,}0$ promille av likningsverdien.`,
          [
            r`$3{,}0\ \text{‰} = \dfrac{3}{1000} = 0{,}003$.`,
            r`Eiendomsskatt: $0{,}003\cdot 2\,500\,000 = 7500$ kroner.`,
            r`Kontroll: $2\,500\,000 \div 1000 = 2500$ per promille, og $3\cdot 2500 = 7500$. ✓`,
            r`<strong>Svar:</strong> Familien Hansen betaler $7500$ kroner i eiendomsskatt.`,
          ]),
        part("1p-h22-d1-1", "b", r`I $2023$ vil satsen øke fra $3{,}0\ \text{‰}$ til $3{,}5\ \text{‰}$. Hvor mange prosentpoeng er endringen på?`,
          r`Gjør promille om til prosent: $1\ \text{‰} = 0{,}1\ \%$. Prosentpoeng er differansen mellom to prosentsatser.`,
          [
            r`$3{,}0\ \text{‰} = 0{,}30\ \%$ og $3{,}5\ \text{‰} = 0{,}35\ \%$.`,
            r`Endringen i prosentpoeng: $0{,}35 - 0{,}30 = 0{,}05$ prosentpoeng.`,
            r`Kontroll: Endringen er $0{,}5\ \text{‰}$, og $0{,}5\ \text{‰} = 0{,}5\cdot 0{,}1\ \% = 0{,}05\ \%$. ✓`,
            r`<strong>Svar:</strong> Endringen er $0{,}05$ prosentpoeng.`,
          ]),
      ],
      ["promille", "prosent", "prosentpoeng"]),
    single("1p-h22-d1-2", "2", 0,
      U + r`David eier en tomt. Arealet av tomten er $600\ \text{m}^{2}$. Reguleringsplanen for tomten har et krav som sier at han ikke kan bygge på mer enn $30\ \%$ av tomtens areal.<br>På tomten ønsker David å bygge<ul><li>en bolig som har en grunnflate med areal $140\ \text{m}^{2}$</li><li>en garasje med bredde $6$ m og lengde $8$ m</li></ul>Gjør beregninger, og avgjør om det vil være mulig for David å bygge både huset og garasjen på tomten dersom han skal holde seg innenfor kravet i reguleringsplanen.`,
      r`Finn først hvor stort areal han maksimalt kan bygge på. Finn så hvor stort areal boligen og garasjen til sammen tar.`,
      [
        r`Tillatt bebygd areal: $30\ \% \text{ av } 600 = 0{,}30\cdot 600 = 180\ \text{m}^{2}$.`,
        r`Garasjens grunnflate: $6\cdot 8 = 48\ \text{m}^{2}$.`,
        r`Bolig og garasje til sammen: $140 + 48 = 188\ \text{m}^{2}$.`,
        r`Sammenligning: $188\ \text{m}^{2} > 180\ \text{m}^{2}$. Det er $8\ \text{m}^{2}$ for mye.`,
        r`<strong>Svar:</strong> Nei, det er ikke mulig. Bolig og garasje tar $188\ \text{m}^{2}$, men han kan bare bygge på $180\ \text{m}^{2}$.`,
      ],
      ["areal", "prosent", "vurdering"]),
    multi("1p-h22-d1-3", "3", 0,
      U + r`Grafen til en funksjon $f$ er vist i figuren. Grafen går gjennom punktene $(4,\ 2)$, $(25,\ 5)$, $(49,\ 7)$, $(81,\ 9)$ og $(100,\ 10)$.` +
        figur("p1-h22-d1-3", "3", "Koordinatsystem (GeoGebra-stil) med x-akse fra −10 til ca. 110 og y-akse fra −2 til ca. 11. Grafen er en grønn kurve som starter i origo, stiger bratt først og flater gradvis ut (kvadratrotkurve). Fem markerte punkter med koordinater: (4, 2), (25, 5), (49, 7), (81, 9) og (100, 10)."),
      [
        part("1p-h22-d1-3", "a", r`Sett opp et mulig uttrykk for $f(x)$. Husk å forklare hvordan du tenker.`,
          r`Se på koordinatene. Hva er sammenhengen mellom $x$ og $y$ i punktene? Tenk på kvadrattall.`,
          [
            r`Punktene er $(4,\ 2)$, $(25,\ 5)$, $(49,\ 7)$, $(81,\ 9)$ og $(100,\ 10)$. Alle $x$-verdiene er kvadrattall: $4 = 2^{2}$, $25 = 5^{2}$, $49 = 7^{2}$, $81 = 9^{2}$, $100 = 10^{2}$.`,
            r`$y$-verdien er hver gang kvadratroten av $x$: $\sqrt{4} = 2$, $\sqrt{25} = 5$, $\sqrt{49} = 7$, $\sqrt{81} = 9$, $\sqrt{100} = 10$.`,
            r`Grafen starter i origo og flater gradvis ut, slik som en kvadratrotfunksjon.`,
            r`<strong>Svar:</strong> Et mulig uttrykk er $f(x) = \sqrt{x}$.`,
          ]),
        part("1p-h22-d1-3", "b", r`Bestem, hvis det er mulig, $f(16)$, $f(400)$, $f\!\left(\dfrac{9}{4}\right)$ og $f(-25)$. Om du mener det ikke er mulig å bestemme én eller flere av verdiene, må du huske å argumentere for dette.`,
          r`Bruk $f(x) = \sqrt{x}$. Hva er kvadratroten av et negativt tall?`,
          [
            r`$f(16) = \sqrt{16} = 4$, fordi $4^{2} = 16$.`,
            r`$f(400) = \sqrt{400} = 20$, fordi $20^{2} = 400$.`,
            r`$f\!\left(\dfrac{9}{4}\right) = \sqrt{\dfrac{9}{4}} = \dfrac{\sqrt{9}}{\sqrt{4}} = \dfrac{3}{2} = 1{,}5$.`,
            r`$f(-25) = \sqrt{-25}$ lar seg ikke bestemme: Ingen reelle tall ganget med seg selv gir et negativt tall, så kvadratroten av et negativt tall finnes ikke. Grafen starter også i origo og har ingen punkter til venstre for andreaksen.`,
            r`<strong>Svar:</strong> $f(16) = 4$, $f(400) = 20$, $f\!\left(\dfrac{9}{4}\right) = \dfrac{3}{2}$, mens $f(-25)$ ikke kan bestemmes.`,
          ]),
      ],
      ["funksjoner", "kvadratrot", "definisjonsmengde"],
      "Funksjonsuttrykket f(x) = √x er funnet fra punktene i figuren; andre uttrykk som går gjennom de samme fem punktene kan finnes (oppgaven ber om «et mulig uttrykk»)."),
    multi("1p-h22-d1-4", "4", 0,
      U + r`I USA brukes gallon (US gallon) som måleenhet for volumer av flytende varer. Den grafiske framstillingen nedenfor viser sammenhengen mellom gallon og liter. Linjen går gjennom origo og punktene $(42,\ 159)$ og $(142,\ 538)$.` +
        figur("p1-h22-d1-4", "4", "Koordinatsystem med «US gallon» på førsteaksen (merker 20, 40, …, 140) og «Liter» på andreaksen (merker 100, 200, 300, 400, 500). Rett linje fra origo oppover mot høyre gjennom punktene (42, 159) og (142, 538), begge merket med koordinater."),
      [
        part("1p-h22-d1-4", "a", r`Bestem stigningstallet til den rette linjen. Gi en praktisk tolkning av dette tallet.`,
          r`Stigningstall $= \dfrac{\Delta y}{\Delta x}$. Hva står $x$ og $y$ for?`,
          [
            r`$a = \dfrac{538 - 159}{142 - 42} = \dfrac{379}{100} = 3{,}79$.`,
            r`$x$ er US gallon og $y$ er liter. Stigningstallet har derfor enheten liter per US gallon.`,
            r`<strong>Svar:</strong> Stigningstallet er $3{,}79$. Det betyr at $1$ US gallon tilsvarer $3{,}79$ liter.`,
          ]),
        part("1p-h22-d1-4", "b", r`Fat er en enhet for volummåling av råolje. Ett fat tilsvarer $42$ US gallon. I $2022$ er det anslått at etterspørselen av råolje vil være $100$ millioner fat per dag. Omtrent hvor mange liter tilsvarer dette per dag? Gi svaret på standardform.`,
          r`Regn først om fat til US gallon, og så US gallon til liter med $3{,}79$ L per gallon.`,
          [
            r`$100$ millioner fat $= 10^{8}$ fat.`,
            r`I US gallon: $10^{8}\cdot 42 = 4{,}2\cdot 10^{9}$ US gallon.`,
            r`I liter: $4{,}2\cdot 10^{9}\cdot 3{,}79 = 15{,}918\cdot 10^{9} \approx 1{,}6\cdot 10^{10}$ liter.`,
            r`Kontroll av størrelsesorden med $3{,}79 \approx 4$: $4{,}2\cdot 4 = 16{,}8$, så svaret ligger rundt $1{,}7\cdot 10^{10}$, og $1{,}6\cdot 10^{10}$ er rimelig.`,
            r`<strong>Svar:</strong> Det tilsvarer omtrent $1{,}6\cdot 10^{10}$ liter per dag.`,
          ]),
      ],
      ["lineære funksjoner", "stigningstall", "standardform", "enheter"]),
  ],
  del2: [
    multi("1p-h22-d2-1", "1", 0,
      r`Strømmen som holder vannet i et hagebasseng varmt, blir slått av.<br>Anta at funksjonen $T$ gitt ved<br>$$T(x) = 3{,}5 + 34{,}5\cdot 0{,}87^{x},\qquad x \ge 0$$<br>kan brukes som en modell for temperaturen $T(x)\ ^{\circ}$C i vannet $x$ timer etter at strømmen blir slått av.`,
      [
        part("1p-h22-d2-1", "a", r`Hva er temperaturen i vannet når strømmen blir slått av?`,
          r`Strømmen slås av når $x = 0$.`,
          [
            r`$T(0) = 3{,}5 + 34{,}5\cdot 0{,}87^{0} = 3{,}5 + 34{,}5\cdot 1 = 38$.`,
            r`<strong>Svar:</strong> Temperaturen er $38\ ^{\circ}$C.`,
          ]),
        part("1p-h22-d2-1", "b", r`Hvor lang tid vil det ta før temperaturen i vannet er under $20\ ^{\circ}$C?`,
          r`Løs likningen $T(x) = 20$ med CAS eller finn skjæringspunktet mellom grafen til $T$ og linjen $y = 20$ i GeoGebra.`,
          [
            r`Vi løser $3{,}5 + 34{,}5\cdot 0{,}87^{x} = 20$ i CAS i GeoGebra. Det gir $x \approx 5{,}30$.`,
            r`Kontroll: $T(5{,}3) = 3{,}5 + 34{,}5\cdot 0{,}87^{5{,}3} \approx 20{,}0$. ✓ Funksjonen er synkende, så temperaturen er under $20\ ^{\circ}$C for $x > 5{,}30$.`,
            r`$0{,}30\ \text{timer} = 0{,}30\cdot 60 \approx 18$ minutter.`,
            r`<strong>Svar:</strong> Det tar omtrent $5{,}3$ timer (ca. $5$ timer og $18$ minutter) før temperaturen er under $20\ ^{\circ}$C.`,
          ]),
        part("1p-h22-d2-1", "c", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(0,\ T(0))$ og $(4,\ T(4))$. Gi en praktisk tolkning av svaret.`,
          r`Regn ut $T(4)$. Stigningstallet er $\dfrac{T(4) - T(0)}{4 - 0}$.`,
          [
            r`$T(0) = 38$ og $T(4) = 3{,}5 + 34{,}5\cdot 0{,}87^{4} \approx 23{,}26$.`,
            r`$a = \dfrac{T(4) - T(0)}{4 - 0} = \dfrac{23{,}26 - 38}{4} \approx -3{,}68$.`,
            r`<strong>Svar:</strong> Stigningstallet er omtrent $-3{,}7$. I løpet av de fire første timene etter at strømmen er slått av, synker temperaturen i gjennomsnitt med omtrent $3{,}7\ ^{\circ}$C per time.`,
          ]),
        part("1p-h22-d2-1", "d", r`Undersøk om temperaturen i vannet noen gang vil synke med mer enn $5\ ^{\circ}$C i løpet av en time.`,
          r`Regn ut hvor mye temperaturen synker fra $x$ til $x + 1$. Når synker den mest?`,
          [
            r`Nedgangen fra tidspunkt $x$ til $x + 1$ er $T(x) - T(x + 1) = 34{,}5\cdot 0{,}87^{x} - 34{,}5\cdot 0{,}87^{x+1} = 34{,}5\cdot 0{,}87^{x}\,(1 - 0{,}87) = 4{,}485\cdot 0{,}87^{x}$.`,
            r`Fordi $0{,}87^{x}$ avtar når $x$ øker, er nedgangen størst når $x = 0$: $4{,}485\cdot 0{,}87^{0} = 4{,}485$.`,
            r`Kontroll i GeoGebra: Nedgangen er $T(0) - T(1) = 38 - 33{,}5 = 4{,}485 \approx 4{,}5$, og den blir mindre senere (for eksempel $T(1) - T(2) \approx 3{,}9$).`,
            r`<strong>Svar:</strong> Nei. Den største nedgangen på en time er omtrent $4{,}5\ ^{\circ}$C, i første time. Temperaturen synker aldri med mer enn $5\ ^{\circ}$C på en time.`,
          ]),
        part("1p-h22-d2-1", "e", r`Gi en praktisk tolkning av tallet $3{,}5$ i modellen.`,
          r`Hva skjer med $0{,}87^{x}$ når $x$ blir veldig stor?`,
          [
            r`Når $x$ blir stor, går $0{,}87^{x}$ mot $0$. Da går $T(x)$ mot $3{,}5 + 34{,}5\cdot 0 = 3{,}5$.`,
            r`Temperaturen i vannet nærmer seg altså $3{,}5\ ^{\circ}$C uten å bli lavere. Det er omgivelsenes temperatur.`,
            r`<strong>Svar:</strong> $3{,}5$ er temperaturen i omgivelsene (i grader celsius) som vannet kjøles ned mot og til slutt nærmer seg.`,
          ]),
      ],
      ["eksponentialfunksjoner", "likninger", "gjennomsnittlig vekstfart", "tolkning", "GeoGebra"]),
    single("1p-h22-d2-2", "2", 0,
      r`I en bygård er det $40$ leiligheter med til sammen $90$ rom. Hver leilighet har enten to eller tre rom.<br>Hvor mange leiligheter har to rom, og hvor mange har tre rom?`,
      r`La $x$ være antall leiligheter med to rom og $y$ antall med tre rom. Sett opp to likninger.`,
      [
        r`La $x$ være antall to-roms leiligheter og $y$ antall tre-roms leiligheter.`,
        r`Antall leiligheter: $x + y = 40$. Antall rom: $2x + 3y = 90$.`,
        r`Fra den første likningen er $x = 40 - y$. Setter inn i den andre: $2(40 - y) + 3y = 90$, så $80 - 2y + 3y = 90$, altså $y = 10$.`,
        r`Da er $x = 40 - 10 = 30$.`,
        r`Kontroll: $30 + 10 = 40$ leiligheter og $2\cdot 30 + 3\cdot 10 = 60 + 30 = 90$ rom. ✓`,
        r`<strong>Svar:</strong> $30$ leiligheter har to rom, og $10$ leiligheter har tre rom.`,
      ],
      ["likningssett", "modellering"]),
    multi("1p-h22-d2-3", "3", 0,
      r`I denne oppgaven skal du se på sammenhenger mellom ulike størrelser og avgjøre om størrelsene er proporsjonale, omvendt proporsjonale eller ingen av delene.`,
      [
        part("1p-h22-d2-3", "a", r`Er fart og tid proporsjonale størrelser, omvendt proporsjonale størrelser eller ingen av delene i den grafiske framstillingen nedenfor?` +
          figur("p1-h22-d2-3", "3a", "Koordinatsystem med «Fart (km/h)» på andreaksen (0 til 130) og «Tid (minutter)» på førsteaksen (0 til ca. 105). En fallende kurve fra øverst til venstre (ved ca. tid 28 og fart 130) som flater ut mot høyre (ved ca. tid 100 og fart ca. 35). Kurven passerer omtrent (30, 120), (40, 90), (60, 60) og (90, 40). Ingen punkter er markert."),
          r`Sjekk om produktet fart · tid er det samme for flere punkter på kurven.`,
          [
            r`Fra grafen leser vi omtrent punktene $(30,\ 120)$, $(40,\ 90)$, $(60,\ 60)$ og $(90,\ 40)$.`,
            r`Produktene er $30\cdot 120 = 3600$, $40\cdot 90 = 3600$, $60\cdot 60 = 3600$ og $90\cdot 40 = 3600$. Produktet er konstant.`,
            r`Kurven synker mot førsteaksen uten å treffe den, slik som en graf for $y = \dfrac{3600}{x}$.`,
            r`<strong>Svar:</strong> Fart og tid er omvendt proporsjonale. (Produktet er $3600$ km/h$\cdot$min, som tilsvarer $60$ km.)`,
          ]),
        part("1p-h22-d2-3", "b", r`Nedenfor ser du en huskeregel for å bestemme bremselengder: «Når farten dobles, firedobles bremselengden.» Er fart og bremselengde proporsjonale størrelser, omvendt proporsjonale størrelser eller ingen av delene ifølge denne huskeregelen?`,
          r`Hva ville skjedd med bremselengden ved dobbel fart om størrelsene var proporsjonale? Og om de var omvendt proporsjonale?`,
          [
            r`Hvis fart og bremselengde var proporsjonale, ville dobbel fart gi dobbel bremselengde. Det er ikke det huskeregelen sier.`,
            r`Hvis de var omvendt proporsjonale, ville dobbel fart gi halv bremselengde. Heller ikke det stemmer: bremselengden blir fire ganger så stor.`,
            r`Huskeregelen passer med $b = k\cdot v^{2}$: Ved dobbel fart er $b(2v) = k\,(2v)^{2} = 4kv^{2} = 4\,b(v)$.`,
            r`<strong>Svar:</strong> Ingen av delene. Bremselengden er proporsjonal med kvadratet av farten, ikke med farten selv.`,
          ]),
        part("1p-h22-d2-3", "c", r`For å gjøre om fra grader fahrenheit $F$ til grader celsius $C$ kan vi bruke formelen $C = \dfrac{F - 32}{1{,}8}$. Er grader celsius og grader fahrenheit proporsjonale størrelser, omvendt proporsjonale størrelser eller ingen av delene?`,
          r`For proporsjonale størrelser er $\dfrac{C}{F}$ konstant. For omvendt proporsjonale er $C\cdot F$ konstant. Prøv noen verdier.`,
          [
            r`$F = 32$ gir $C = 0$. $F = 50$ gir $C = \dfrac{18}{1{,}8} = 10$. $F = 86$ gir $C = \dfrac{54}{1{,}8} = 30$.`,
            r`Forholdet $\dfrac{C}{F}$: $\dfrac{10}{50} = 0{,}2$ og $\dfrac{30}{86} \approx 0{,}35$. Ikke konstant, så de er ikke proporsjonale.`,
            r`Produktet $C\cdot F$: $10\cdot 50 = 500$ og $30\cdot 86 = 2580$. Ikke konstant, så de er ikke omvendt proporsjonale.`,
            r`Formelen kan skrives $C = \dfrac{1}{1{,}8}F - \dfrac{32}{1{,}8}$. Det er en rett linje som ikke går gjennom origo, siden $F = 0$ gir $C \approx -17{,}8$.`,
            r`<strong>Svar:</strong> Ingen av delene. Sammenhengen er lineær, men grafen går ikke gjennom origo.`,
          ]),
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet", "lineære funksjoner", "argumentasjon"],
      "3a: kurven er lest av figuren (punktene (30, 120), (40, 90), (60, 60), (90, 40)); produktet 3600 er et avlest, ikke oppgitt tall. Se figurbestilling p1-h22-d2-3."),
    multi("1p-h22-d2-4", "4", 0,
      r`Per og Solveig har nok materialer til å lage et gjerde som er $64$ m langt. De skal gjerde inn et område som skal ha form som et rektangel, og de ønsker at området skal få størst mulig areal.<br>Per påstår at arealet blir størst mulig dersom alle sidekantene er like lange.`,
      [
        part("1p-h22-d2-4", "a", r`Vis at Per sin påstand kan være riktig, ved å lage en oversikt som viser arealet av ulike rektangler med omkrets $64$ m.`,
          r`Omkretsen er $2l + 2b = 64$, så $l + b = 32$. Lag en tabell med ulike $b$ og regn ut arealet.`,
          [
            r`Omkretsen er $2l + 2b = 64$, så $l + b = 32$ og $l = 32 - b$.<table><tr><th>Bredde $b$ (m)</th><th>Lengde $l$ (m)</th><th>Areal ($\text{m}^{2}$)</th></tr><tr><td>$4$</td><td>$28$</td><td>$112$</td></tr><tr><td>$8$</td><td>$24$</td><td>$192$</td></tr><tr><td>$12$</td><td>$20$</td><td>$240$</td></tr><tr><td>$14$</td><td>$18$</td><td>$252$</td></tr><tr><td>$15$</td><td>$17$</td><td>$255$</td></tr><tr><td>$16$</td><td>$16$</td><td>$256$</td></tr><tr><td>$17$</td><td>$15$</td><td>$255$</td></tr><tr><td>$20$</td><td>$12$</td><td>$240$</td></tr></table>`,
            r`Arealet øker mot $b = 16$ og avtar deretter. Tabellen er symmetrisk rundt $b = 16$, og det største arealet er $256\ \text{m}^{2}$.`,
            r`Når $b = 16$, er også $l = 16$, så rektangelet er et kvadrat med alle sidekanter like lange.`,
            r`<strong>Svar:</strong> Oversikten viser størst areal ($256\ \text{m}^{2}$) for et kvadrat med side $16$ m. Pers påstand kan derfor være riktig. (Tabellen viser bare utvalgte verdier, så den beviser ikke påstanden.)`,
          ]),
        part("1p-h22-d2-4", "b", r`Solveig lurer på om de kan tegne en graf som viser at Per har rett. Hun prøver å sette opp et funksjonsuttrykk som hun kan bruke. Sett opp funksjonsuttrykket for Solveig. Tegn grafen, og vis at Per sin påstand er riktig.`,
          r`La bredden være $x$. Uttrykk lengden ved $x$ og sett opp arealet som funksjon av $x$. Finn toppunktet.`,
          [
            r`La bredden være $x$ meter. Fra $l + x = 32$ er lengden $l = 32 - x$.`,
            r`Arealet: $A(x) = x\,(32 - x) = 32x - x^{2}$, med $0 < x < 32$.`,
            r`Vi tegner grafen i GeoGebra. Den er en parabel som vender ned, og toppunktet er $(16,\ 256)$.`,
            r`Kontroll uten verktøy: Nullpunktene er $x = 0$ og $x = 32$, og toppunktet ligger midt mellom: $x = \dfrac{0 + 32}{2} = 16$. Da er $A(16) = 16\cdot 16 = 256$.`,
            r`Ved toppunktet er bredden $16$ m og lengden $32 - 16 = 16$ m, så alle sidene er like lange.`,
            r`<strong>Svar:</strong> $A(x) = x(32 - x)$. Grafen har toppunkt i $(16,\ 256)$, så arealet er størst, $256\ \text{m}^{2}$, når bredden er $16$ m og lengden er $16$ m. Alle sidekantene er like lange, og Pers påstand er riktig.`,
          ]),
      ],
      ["areal", "andregradsfunksjoner", "optimering", "GeoGebra"]),
    multi("1p-h22-d2-5", "5", 0,
      r`Lars har skrevet programkoden nedenfor.<pre><code>def f(x):
    return 3 * x - 15      # Definerer funksjonen f gitt ved f(x) = 3x - 15

x = 0

while x &lt;= 10:

    if f(x) == 0:
        print(x)

    x = x + 1</code></pre>`,
      [
        part("1p-h22-d2-5", "a", r`Hva ønsker han å finne ut? Hva blir resultatet når han kjører programmet?`,
          r`Programmet går gjennom heltallene $0, 1, \ldots, 10$ og skriver ut $x$ når $f(x) = 0$. Hva kalles slike $x$-verdier?`,
          [
            r`Programmet setter $x = 0$ og øker $x$ med $1$ for hver runde så lenge $x \le 10$. For hver verdi sjekkes det om $f(x) = 0$, og i så fall skrives $x$ ut.`,
            r`Lars vil altså finne nullpunktene til $f$, det vil si de heltallige $x$-verdiene fra $0$ til $10$ der $3x - 15 = 0$.`,
            r`Vi løser selv: $3x - 15 = 0$ gir $3x = 15$ og $x = 5$. Verdien $5$ ligger mellom $0$ og $10$.`,
            r`<strong>Svar:</strong> Lars vil finne nullpunktet til $f(x) = 3x - 15$ blant heltallene fra $0$ til $10$. Programmet skriver ut <code>5</code>.`,
          ]),
        part("1p-h22-d2-5", "b", r`Hva vil resultatet bli om han endrer funksjonsuttrykket til $x^{2} - 6x + 8$?`,
          r`Finn nullpunktene til $x^{2} - 6x + 8$ og sjekk hvilke som ligger blant heltallene fra $0$ til $10$.`,
          [
            r`Programmet skriver ut alle heltall $x$ fra $0$ til $10$ som oppfyller $x^{2} - 6x + 8 = 0$.`,
            r`Med abc-formelen: $x = \dfrac{6 \pm \sqrt{36 - 32}}{2} = \dfrac{6 \pm 2}{2}$, så $x = 4$ eller $x = 2$.`,
            r`Begge ligger mellom $0$ og $10$ og er heltall. Faktorisert: $x^{2} - 6x + 8 = (x - 2)(x - 4)$.`,
            r`<strong>Svar:</strong> Programmet skriver ut $2$ og deretter $4$ (på hver sin linje).`,
          ]),
        part("1p-h22-d2-5", "c", r`Lars endrer funksjonsuttrykket til $x^{2} - 144$ og ser at han må gjøre noe med programmet. Foreslå endringer Lars kan gjøre.`,
          r`Løs $x^{2} - 144 = 0$. Ligger løsningene innenfor området programmet leter i?`,
          [
            r`$x^{2} - 144 = 0$ gir $x^{2} = 144$, så $x = 12$ eller $x = -12$.`,
            r`Programmet leter bare fra $x = 0$ til $x = 10$, så ingen av løsningene blir funnet.`,
            r`Lars må utvide søkeområdet. Han kan starte lavere og la løkka gå lenger, for eksempel fra $-20$ til $20$:<pre><code>def f(x):
    return x ** 2 - 144

x = -20

while x &lt;= 20:

    if f(x) == 0:
        print(x)

    x = x + 1</code></pre>`,
            r`Dette programmet skriver ut $-12$ og $12$. Metoden finner bare heltallige nullpunkter siden $x$ øker med $1$ om gangen. Det går bra her fordi nullpunktene er heltall.`,
            r`<strong>Svar:</strong> Lars må endre startverdien til for eksempel <code>x = -20</code> og betingelsen i løkka til for eksempel <code>x &lt;= 20</code>. Da skriver programmet ut $-12$ og $12$.`,
          ]),
      ],
      ["programmering", "nullpunkter", "andregradslikninger"]),
    multi("1p-h22-d2-6", "6", 0,
      r`Figuren viser en pendel. Tiden pendelen bruker på å svinge fra posisjon A til posisjon B og tilbake til posisjon A igjen, kalles svingetiden.` +
        figur("p1-h22-d2-6", "6", "Skisse av en pendel: en snor (merket «Snor») festet i taket, med en pendelkule (merket «Pendelkule») nederst. Pendelen er tegnet i tre posisjoner: A (til venstre, sving ut), midten (hengende rett ned) og B (til høyre, sving ut). Pil som viser svingebevegelsen mellom A og B.") +
        r`Klasse 1STA har utført et forsøk i naturfag. De har målt svingetiden til pendler med ulike snorlengder.<br>Tabellen nedenfor viser svingetiden til pendler med åtte ulike snorlengder.<table><tr><th>Snorlengde (meter)</th><td>$0{,}1$</td><td>$0{,}3$</td><td>$0{,}5$</td><td>$0{,}8$</td><td>$1{,}0$</td><td>$1{,}3$</td><td>$1{,}6$</td><td>$2{,}0$</td></tr><tr><th>Svingetid (sekund)</th><td>$0{,}69$</td><td>$1{,}17$</td><td>$1{,}44$</td><td>$1{,}82$</td><td>$2{,}08$</td><td>$2{,}27$</td><td>$2{,}53$</td><td>$2{,}80$</td></tr></table>`,
      [
        part("1p-h22-d2-6", "a", r`Bruk tallene i tabellen, og lag en modell på formen $S(x) = a\cdot x^{b}$ som viser svingetiden $S(x)$ sekunder til en pendel med snorlengde $x$ meter.`,
          r`Legg tallene inn i GeoGebra og bruk potensregresjon.`,
          [
            r`Vi legger punktene $(0{,}1,\ 0{,}69)$, $(0{,}3,\ 1{,}17)$, $\ldots$, $(2{,}0,\ 2{,}80)$ inn i regnearket i GeoGebra og bruker potensregresjon.`,
            r`Det gir $a \approx 2{,}03$ og $b \approx 0{,}47$.`,
            r`Kontroll: $S(1{,}0) = 2{,}03\cdot 1^{0{,}47} = 2{,}03$ (mot $2{,}08$ i tabellen), og $S(2{,}0) = 2{,}03\cdot 2^{0{,}47} \approx 2{,}81$ (mot $2{,}80$).`,
            r`<strong>Svar:</strong> $S(x) = 2{,}03\cdot x^{0{,}47}$, der $x$ er snorlengden i meter og $S(x)$ er svingetiden i sekunder.`,
          ]),
        part("1p-h22-d2-6", "b", r`Formelen $T = 2\pi\sqrt{\dfrac{L}{g}}$ kan brukes for å regne ut svingetiden $T$ til en pendel, når vi ser bort fra friksjon og luftmotstand. $L$ er snorlengden gitt i meter, og $g$ er tyngdens akselerasjon. På jorden er $g = 9{,}81\ \text{m/s}^{2}$. Vis at denne formelen kan forenkles til $T \approx 2\sqrt{L}$.`,
          r`Bruk at $\sqrt{\dfrac{L}{g}} = \dfrac{\sqrt{L}}{\sqrt{g}}$ og sett inn $g = 9{,}81$.`,
          [
            r`$T = 2\pi\sqrt{\dfrac{L}{9{,}81}} = 2\pi\cdot \dfrac{\sqrt{L}}{\sqrt{9{,}81}} = \dfrac{2\pi}{\sqrt{9{,}81}}\cdot \sqrt{L}$.`,
            r`Tallfaktoren er $\dfrac{2\pi}{\sqrt{9{,}81}} \approx \dfrac{6{,}283}{3{,}132} \approx 2{,}006 \approx 2$.`,
            r`Altså er $T \approx 2\sqrt{L}$. (Enda kortere: $\sqrt{9{,}81} \approx \sqrt{\pi^{2}} = \pi$, fordi $\pi^{2} \approx 9{,}87$, så faktoren blir $\dfrac{2\pi}{\pi} = 2$.)`,
            r`<strong>Svar:</strong> $T = \dfrac{2\pi}{\sqrt{9{,}81}}\sqrt{L} \approx 2{,}006\sqrt{L} \approx 2\sqrt{L}$.`,
          ]),
        part("1p-h22-d2-6", "c", r`Sammenlikn modellen du fant i oppgave a), med formelen for $T$.`,
          r`Skriv $2\sqrt{L}$ som en potens $2\cdot L^{0{,}5}$ og sammenlikn med $a$ og $b$.`,
          [
            r`Formelen er $T \approx 2\sqrt{L} = 2\cdot L^{0{,}5}$. Modellen er $S(x) = 2{,}03\cdot x^{0{,}47}$.`,
            r`Begge er potensfunksjoner. Eksponenten er $0{,}47$ mot $0{,}5$, og faktoren er $2{,}03$ mot $2$. Forskjellen er liten.`,
            r`Eksempel: For $L = 1{,}0$ gir formelen $T \approx 2{,}0$ og modellen $2{,}03$. For $L = 2{,}0$ gir formelen $2\sqrt{2} \approx 2{,}83$ og modellen $2{,}81$.`,
            r`Små avvik kan skyldes målefeil i forsøket og at friksjon og luftmotstand ikke er tatt hensyn til i formelen.`,
            r`<strong>Svar:</strong> Modellen ligger svært nær formelen. Begge viser at svingetiden vokser omtrent som kvadratroten av snorlengden.`,
          ]),
      ],
      ["potensfunksjoner", "regresjon", "modellering", "GeoGebra"]),
    single("1p-h22-d2-7", "7", 0,
      r`Sofie løper på en tredemølle. Etter tre minutter står det i displayet at hun har<ul><li>brukt $32$ kilokalorier (kcal) energi</li><li>løpt $0{,}38$ km</li></ul>Sofie gjør seg noen tanker mens hun løper:<ul><li>«I Cooper-testen løper man i $12$ minutter. Jeg har løpt $380$ m på $3$ minutter. Hvor langt kommer jeg på $12$ minutter?»</li><li>«Hvor mange kilokalorier bruker jeg dersom jeg løper i én time?»</li><li>«Hvor mange kilokalorier bruker jeg per kilometer jeg løper?»</li><li>«Jeg vil øke farten. Jeg har hørt at jenter må løpe minst $2200$ m på $12$ minutter for å få en god karakter på Cooper-testen. Hvilken fart må jeg velge?»</li></ul>Etter løpingen spiser Sofie en melkesjokolade som veier $60$ g. På etiketten står det at $100$ g sjokolade inneholder $550$ kcal. Sofie spør seg selv: «Er det flere kalorier i sjokoladen enn jeg brukte da jeg løp på tredemøllen?»<br>Gjør beregninger og vurderinger, og lag en oversikt som gir Sofie mest mulig informasjon om sammenhengene hun er opptatt av.`,
      r`Anta at Sofie holder jevn fart og bruker like mye energi per minutt hele tiden. Da er alt proporsjonalt med tiden. Gjør tallene om til per minutt og per kilometer.`,
      [
        r`Forutsetning: Sofie løper med jevn fart ($380$ m på $3$ min) og bruker like mye energi hvert minutt. Da er strekning og energi proporsjonale med tiden.`,
        r`Cooper-testen ($12$ min): $12 \div 3 = 4$, så strekningen er $4\cdot 0{,}38 = 1{,}52$ km.`,
        r`Én time ($60$ min): $60 \div 3 = 20$, så energien er $20\cdot 32 = 640$ kcal.`,
        r`Energi per km: $\dfrac{32}{0{,}38} \approx 84{,}2$ kcal per km. Energi per minutt: $\dfrac{32}{3} \approx 10{,}7$ kcal per minutt.`,
        r`Fart nå: $\dfrac{0{,}38\ \text{km}}{3\ \text{min}} \approx 0{,}127$ km/min $\approx 7{,}6$ km/t.`,
        r`Fart for $2200$ m på $12$ min: $\dfrac{2200}{12} \approx 183{,}3$ m/min $= 11{,}0$ km/t. Hun må altså øke farten fra $7{,}6$ km/t til minst $11$ km/t, omtrent $45\ \%$ mer.`,
        r`Sjokoladen: $60\ \text{g}$ gir $0{,}60\cdot 550 = 330$ kcal. Etter $3$ minutter har hun brukt $32$ kcal, så sjokoladen har mer enn ti ganger så mange kalorier.`,
        r`For å bruke $330$ kcal må hun løpe $\dfrac{330}{32/3} \approx 30{,}9$ minutter, eller $\dfrac{330}{84{,}2} \approx 3{,}9$ km, med dagens fart og energiforbruk.`,
        r`Oversikt: <table><tr><th>Tid (min)</th><th>Strekning (km)</th><th>Energi (kcal)</th></tr><tr><td>$3$</td><td>$0{,}38$</td><td>$32$</td></tr><tr><td>$12$</td><td>$1{,}52$</td><td>$128$</td></tr><tr><td>$31$</td><td>$3{,}9$</td><td>$330$</td></tr><tr><td>$60$</td><td>$7{,}6$</td><td>$640$</td></tr></table>`,
        r`Ved fart $11$ km/t (Cooper-målet) er $2{,}2$ km i $12$ min. Hvis energien per kilometer er den samme, brukes $2{,}2\cdot 84{,}2 \approx 185$ kcal. Det er en forenkling, siden energiforbruket per km kan endre seg med farten.`,
        r`<strong>Svar:</strong> Sofie løper $1{,}52$ km på $12$ min og bruker $640$ kcal på en time (ca. $84$ kcal per km). For $2200$ m på $12$ min må hun holde minst $11$ km/t. Sjokoladen har $330$ kcal, mange flere enn de $32$ kcal hun brukte på tredemøllen. For å forbrenne den må hun løpe i omtrent $31$ minutter.`,
      ],
      ["proporsjonalitet", "enheter", "vurdering", "oversikt"],
      "Åpen oppgave («lag en oversikt …»); løsningen er et eksempel på en oversikt under forutsetning av jevn fart og konstant energiforbruk per kilometer. Ikke kontrollert mot Udirs eget løsningsforslag."),
  ],
});
