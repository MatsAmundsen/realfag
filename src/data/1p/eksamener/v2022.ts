import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, våren 2022 (25.05.2022). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 * Eksamenen oppgir ingen poeng eller vekting per oppgave, derfor står points: 0 (viser ingen poengtall).
 */
export const EKSAMEN_1P_V2022: Exam = officialExam({
  id: "1p-v2022",
  title: "Eksamen vår 2022",
  season: "vår",
  year: 2022,
  date: "25.05.2022",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "25.05.2022", "1P_V22_LK20.pdf"),
  del1: [
    multi("1p-v22-d1-1", "1", 0,
      U + r`Renten på et lån steg fra $2{,}0\ \%$ til $2{,}2\ \%$.`,
      [
        part("1p-v22-d1-1", "a", r`Hvor mange prosentpoeng steg renten med?`,
          r`Prosentpoeng er differansen mellom de to rentesatsene.`,
          [
            r`$2{,}2 - 2{,}0 = 0{,}2$.`,
            r`<strong>Svar:</strong> Renten steg med $0{,}2$ prosentpoeng.`,
          ]),
        part("1p-v22-d1-1", "b", r`Hvor mange prosent steg renten med?`,
          r`Prosentvis endring $= \dfrac{\text{endring}}{\text{opprinnelig verdi}}$.`,
          [
            r`Endringen er $0{,}2$ prosentpoeng, og den opprinnelige renten var $2{,}0\ \%$.`,
            r`$\dfrac{0{,}2}{2{,}0} = 0{,}1 = 10\ \%$.`,
            r`Kontroll: $10\ \%$ av $2{,}0$ er $0{,}2$, og $2{,}0 + 0{,}2 = 2{,}2$. ✓`,
            r`<strong>Svar:</strong> Renten steg med $10\ \%$.`,
          ]),
      ],
      ["prosent", "prosentpoeng"]),
    single("1p-v22-d1-2", "2", 0,
      U + r`Diagrammet viser antall elever ved en videregående skole de fire siste årene.` +
        figur("p1-v22-d1-2", "2", "Søylediagram med tittel «Elever ved skolen». Førsteaksen «År» har fire søyler: 2018, 2019, 2020 og 2021. Andreaksen «Antall elever» går fra 0 til 1200 med hjelpelinjer for hver 200. Søylehøydene er omtrent 700 (2018), 800 (2019), 900 (2020) og 1000 (2021). Søylene er grønne.") +
        r`<br>Når var det størst prosentvis økning i antall elever fra et år til det neste?`,
      r`Alle økningene er like store i antall. Hva avgjør da hvor stor den prosentvise økningen er?`,
      [
        r`Fra diagrammet leser vi: $700$ elever i 2018, $800$ i 2019, $900$ i 2020 og $1000$ i 2021.`,
        r`Hver økning er $100$ elever. Den prosentvise økningen er $\dfrac{100}{\text{antall året før}}$.`,
        r`2018 til 2019: $\dfrac{100}{700} = \dfrac{1}{7} \approx 14{,}3\ \%$.`,
        r`2019 til 2020: $\dfrac{100}{800} = \dfrac{1}{8} = 12{,}5\ \%$.`,
        r`2020 til 2021: $\dfrac{100}{900} = \dfrac{1}{9} \approx 11{,}1\ \%$.`,
        r`<strong>Svar:</strong> Størst prosentvis økning var fra 2018 til 2019, omtrent $14{,}3\ \%$. Den absolutte økningen er like stor hvert år, men grunnlaget er minst da.`,
      ],
      ["prosent", "diagrammer", "prosentvis endring"]),
    multi("1p-v22-d1-3", "3", 0,
      U + r``,
      [
        part("1p-v22-d1-3", "a", r`Gi et eksempel på to størrelser som er proporsjonale.`,
          r`Tenk på en vare som selges per kilo. Hva skjer med prisen når du dobler vekten?`,
          [
            r`Pris og vekt for epler som koster $20$ kr per kilo er proporsjonale: Dobler vi vekten, dobles prisen. Forholdet pris $\div$ vekt er alltid $20$ kr/kg.`,
            r`<strong>Svar:</strong> Eksempel: Prisen $y$ kroner for $x$ kilo epler til $20$ kr per kilo, $y = 20x$. (Andre gode eksempler er vei og tid ved konstant fart, eller omkrets og side i et kvadrat.)`,
          ]),
        part("1p-v22-d1-3", "b", r`Lag en grafisk framstilling som viser sammenhengen mellom de to størrelsene.`,
          r`Lag en verditabell, tegn punktene i et koordinatsystem og trekk en rett linje. Hvor må linjen starte?`,
          [
            r`Verditabell: <table><tr><th>Vekt (kg)</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>Pris (kr)</th><td>$0$</td><td>$20$</td><td>$40$</td><td>$60$</td><td>$80$</td><td>$100$</td></tr></table>`,
            r`Vi setter vekt på førsteaksen og pris på andreaksen, merker av punktene og trekker en rett linje gjennom dem. Linjen går gjennom origo, fordi $0$ kg koster $0$ kr, og det er kjennetegnet på proporsjonale størrelser.` + figur("p1-v22-d1-3b", "3b", "Eksempelsvar: Koordinatsystem med «Vekt (kg)» på førsteaksen (0 til 5) og «Pris (kr)» på andreaksen (0 til 100). Rett linje fra origo gjennom punktene (1, 20), (2, 40), (3, 60), (4, 80) og (5, 100)."),
            r`<strong>Svar:</strong> Grafen er en rett linje gjennom origo med stigningstall $20$ (kroner per kilo).`,
          ]),
      ],
      ["proporsjonalitet", "grafer", "lineære funksjoner"]),
    multi("1p-v22-d1-4", "4", 0,
      U + r`Siri har et stykke papp og vil lage en eske. Hun har satt opp en modell som viser volumet $V(x)\ \text{cm}^{3}$ av esken dersom hun lager den $x$ cm høy:<br>$$V(x) = 4x^{3} - 100x^{2} + 600x,\qquad 0 < x < 10$$`,
      [
        part("1p-v22-d1-4", "a", r`Hvor stort volum får esken dersom Siri lager den $5$ cm høy?`,
          r`Sett $x = 5$ inn i uttrykket for $V(x)$.`,
          [
            r`$V(5) = 4\cdot 5^{3} - 100\cdot 5^{2} + 600\cdot 5$.`,
            r`$5^{3} = 125$ og $5^{2} = 25$, så $V(5) = 4\cdot 125 - 100\cdot 25 + 3000 = 500 - 2500 + 3000 = 1000$.`,
            r`<strong>Svar:</strong> Esken får volum $1000\ \text{cm}^{3}$.`,
          ]),
        part("1p-v22-d1-4", "b", r`Hva finner Siri ut dersom hun løser likningen $V(x) = 500$?`,
          r`Hva betyr $V(x)$, og hva betyr $500$? Hva er $x$ i løsningen?`,
          [
            r`$V(x)$ er volumet i $\text{cm}^{3}$ når esken er $x$ cm høy. Likningen $V(x) = 500$ spør etter hvilke høyder $x$ som gir volumet $500\ \text{cm}^{3}$.`,
            r`Løsningene må ligge mellom $0$ og $10$, siden modellen bare gjelder for $0 < x < 10$.`,
            r`Vi kan se hvor løsningene ligger ved å regne ut noen verdier: $V(0) = 0$, $V(1) = 4 - 100 + 600 = 504$, $V(7) = 672$ og $V(8) = 448$. Volumet er $500\ \text{cm}^{3}$ en gang mellom $x = 0$ og $x = 1$, og en gang mellom $x = 7$ og $x = 8$. Siden modellen gjelder for $0 < x < 10$, er det to løsninger i dette området.`,
            r`Med digitalt verktøy (graf, eller CAS) får vi mer nøyaktige verdier: $x \approx 0{,}99$ og $x \approx 7{,}77$. Likningen har også en tredje løsning, $x \approx 16{,}2$, men den ligger utenfor $0 < x < 10$ og gjelder derfor ikke for esken.`,
            r`<strong>Svar:</strong> Siri finner ut hvilke høyder esken kan ha for at volumet skal bli $500\ \text{cm}^{3}$. Det er to slike høyder: $x \approx 0{,}99$ cm og $x \approx 7{,}8$ cm.`,
          ]),
      ],
      ["funksjoner", "likninger", "tolkning"]),
    single("1p-v22-d1-5", "5", 0,
      U + r`<pre><code>startverdi = 2000
verdi = startverdi
vekstfaktor = 1.05
år = 0

while verdi &lt; startverdi * 2:
    verdi = verdi * vekstfaktor
    år = år + 1

print(verdi)
print(år)</code></pre>En elev har skrevet programkoden ovenfor.<br>Hva ønsker eleven å finne ut? Forklar hva som skjer når programmet kjøres.`,
      r`Hva skjer med <code>verdi</code> for hver runde i løkka? Når stopper løkka?`,
      [
        r`Startverdien er $2000$ og vekstfaktoren er $1{,}05$, altså en økning på $5\ \%$ per år. Variabelen <code>år</code> teller antall år.`,
        r`Løkka kjøres så lenge <code>verdi</code> er mindre enn <code>startverdi * 2</code>, det vil si mindre enn $4000$. I hver runde ganges verdien med $1{,}05$, og <code>år</code> økes med $1$.`,
        r`Løkka stopper første gang verdien har nådd $4000$ eller mer, altså når verdien er minst doblet.`,
        r`Hvor mange runder det blir nøyaktig, krever potenser av $1{,}05$ og trengs ikke for å forklare hva programmet gjør. Vi kan likevel anslå: hadde verdien økt med like mye hvert år ($5\ \%$ av $2000$, altså $100$ kroner), ville doblingen tatt $20$ år. Fordi hver økning regnes av en stadig større verdi, går det litt raskere enn det.`,
        r`Med hjelpemidler (kalkulator eller regneark) finner vi at verdien etter $14$ år er $2000\cdot 1{,}05^{14} \approx 3960$, altså fortsatt under $4000$, mens den etter $15$ år er $2000\cdot 1{,}05^{15} \approx 4158$. Da stopper løkka, og programmet skriver ut verdien ($\approx 4158$) og antall år ($15$).`,
        r`<strong>Svar:</strong> Eleven vil finne ut hvor mange år det tar før en verdi på $2000$ er doblet, når den vokser med $5\ \%$ per år. Programmet skriver ut verdien etter at den er doblet, omtrent $4158$, og antall år, $15$.`,
      ],
      ["programmering", "vekstfaktor", "eksponentiell vekst"]),
    single("1p-v22-d1-6", "6", 0,
      U + r`Et rektangel er tre ganger så langt som det er bredt. Arealet av rektangelet er $432\ \text{cm}^{2}$.` +
        figur("p1-v22-d1-6", "6", "Et tomt rektangel (lengre enn det er høyt) uten mål eller bokstaver. Brukes bare som skisse.") +
        r`<br>Hvor bredt er rektangelet?`,
      r`La bredden være $x$. Hva blir da lengden, og hva blir arealet uttrykt ved $x$?`,
      [
        r`La bredden være $x$ cm. Da er lengden $3x$ cm.`,
        r`Arealet: $x\cdot 3x = 3x^{2} = 432$.`,
        r`Deler på $3$: $x^{2} = 144$. Siden $x > 0$ er $x = \sqrt{144} = 12$.`,
        r`Kontroll: Lengden er $3\cdot 12 = 36$ cm, og $12\cdot 36 = 432\ \text{cm}^{2}$. ✓`,
        r`<strong>Svar:</strong> Rektangelet er $12$ cm bredt (og $36$ cm langt).`,
      ],
      ["areal", "likninger", "kvadratrot"]),
  ],
  del2: [
    multi("1p-v22-d2-1", "1", 0,
      r`En fabrikk har en vanntank. Vannet i tanken skal tappes ut.<br>Anta at funksjonen $V$ gitt ved<br>$$V(x) = 2000 - 2000\cdot\left(1 - \frac{x}{40}\right)^{2},\qquad 0 \le x \le 40$$<br>kan brukes som en modell for hvor mange liter vann $V(x)$ som er tappet ut av tanken $x$ minutter etter at tappingen startet.`,
      [
        part("1p-v22-d2-1", "a", r`Bestem $V(0)$. Gi en praktisk tolkning av svaret.`,
          r`Sett inn $x = 0$.`,
          [
            r`$V(0) = 2000 - 2000\cdot\left(1 - \dfrac{0}{40}\right)^{2} = 2000 - 2000\cdot 1 = 0$.`,
            r`<strong>Svar:</strong> $V(0) = 0$. Når tappingen starter, er det tappet ut $0$ liter.`,
          ]),
        part("1p-v22-d2-1", "b", r`Bestem verdimengden til $V$.`,
          r`Finn $V$ i endepunktene av definisjonsmengden. Er funksjonen økende?`,
          [
            r`$V(0) = 0$ og $V(40) = 2000 - 2000\cdot\left(1 - 1\right)^{2} = 2000$.`,
            r`Når $x$ øker fra $0$ til $40$, avtar $1 - \dfrac{x}{40}$ fra $1$ til $0$, og kvadratet avtar også. Dermed øker $V(x)$ hele veien. Vi kan også se det på grafen i GeoGebra.`,
            r`<strong>Svar:</strong> Verdimengden er $V_f = [0,\ 2000]$, altså alle verdier fra $0$ til $2000$ liter.`,
          ]),
        part("1p-v22-d2-1", "c", r`Hvor lang tid vil det ta før halvparten av vannet er tappet ut av tanken?`,
          r`Tanken rommer $2000$ liter, så halvparten er $1000$ liter. Løs $V(x) = 1000$.`,
          [
            r`Løser $2000 - 2000\cdot\left(1 - \dfrac{x}{40}\right)^{2} = 1000$ i CAS i GeoGebra. Vi får $x \approx 11{,}7$ (den andre løsningen, $x \approx 68{,}3$, ligger utenfor definisjonsmengden).`,
            r`Kontroll for hånd: $\left(1 - \dfrac{x}{40}\right)^{2} = 0{,}5$ gir $1 - \dfrac{x}{40} = \sqrt{0{,}5} \approx 0{,}7071$, så $x = 40\cdot(1 - 0{,}7071) \approx 11{,}7$. ✓`,
            r`$0{,}7$ minutter er omtrent $43$ sekunder.`,
            r`<strong>Svar:</strong> Det tar omtrent $11{,}7$ minutter (ca. $11$ minutter og $43$ sekunder).`,
          ]),
        part("1p-v22-d2-1", "d", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(0,\ V(0))$ og $(30,\ V(30))$. Gi en praktisk tolkning av svaret.`,
          r`Regn ut $V(30)$ og bruk $a = \dfrac{\Delta y}{\Delta x}$.`,
          [
            r`$V(30) = 2000 - 2000\cdot\left(1 - \dfrac{30}{40}\right)^{2} = 2000 - 2000\cdot 0{,}25^{2} = 2000 - 2000\cdot 0{,}0625 = 1875$.`,
            r`$a = \dfrac{V(30) - V(0)}{30 - 0} = \dfrac{1875 - 0}{30} = 62{,}5$.`,
            r`<strong>Svar:</strong> Stigningstallet er $62{,}5$. I løpet av de første $30$ minuttene tappes det i gjennomsnitt ut $62{,}5$ liter per minutt.`,
          ]),
        part("1p-v22-d2-1", "e", r`Undersøk om det noen gang vil tappes ut mer enn $105$ liter vann i løpet av ett minutt.`,
          r`Regn ut $V(x + 1) - V(x)$. Når er økningen størst?`,
          [
            r`Mengden som tappes ut mellom $x$ og $x + 1$ er $V(x + 1) - V(x) = 2000\left[\left(1 - \dfrac{x}{40}\right)^{2} - \left(1 - \dfrac{x + 1}{40}\right)^{2}\right]$.`,
            r`Grafen til $V$ er en parabel som flater ut mot $x = 40$. Den stiger altså raskest i begynnelsen, så den største mengden per minutt er i første minutt.`,
            r`$V(1) - V(0) = 2000 - 2000\cdot\left(\dfrac{39}{40}\right)^{2} - 0 = 2000 - 2000\cdot 0{,}950625 = 98{,}75$.`,
            r`Neste minutt er det lavere: $V(2) - V(1) \approx 96{,}25$. Verdien avtar videre.`,
            r`<strong>Svar:</strong> Nei. Det mest som tappes ut i løpet av ett minutt er omtrent $98{,}75$ liter (første minutt), og det er under $105$ liter.`,
          ]),
      ],
      ["funksjoner", "verdimengde", "gjennomsnittlig vekstfart", "tolkning", "GeoGebra"]),
    multi("1p-v22-d2-2", "2", 0,
      r`Markus skal leie en bil i et døgn. Grafene nedenfor viser prisen han må betale hos firma A, firma B og firma C.` +
        figur("p1-v22-d2-2", "2", "Koordinatsystem med «Kroner» på andreaksen (merker for hver 100 fra 100 til 1500) og «Antall kilometer» på førsteaksen (merker 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300). Tre rette linjer: Firma A (lilla) starter i (0, 600) og er brattest; Firma B (blå) starter i (0, 900) og er slakest; Firma C (turkis) starter i (0, 700). A og C krysser i (100, 1000), A og B krysser i (150, 1200), og B og C krysser i (200, 1300). Ved 300 km er B omtrent 1500."),
      [
        part("1p-v22-d2-2", "a", r`Forklar at prisen Markus må betale hos firma A, kan beskrives med uttrykket $A(x) = 4x + 600$.`,
          r`Les av hvor linjen starter og hvor mye den stiger.`,
          [
            r`Grafen til firma A er en rett linje, så uttrykket har formen $ax + b$.`,
            r`Konstantleddet $b$ er prisen når $x = 0$ km. Grafen starter i $(0,\ 600)$, så $b = 600$ (fast pris).`,
            r`Grafen går gjennom $(100,\ 1000)$. Stigningstallet er $a = \dfrac{1000 - 600}{100 - 0} = \dfrac{400}{100} = 4$ (kroner per kilometer).`,
            r`Kontroll med punktet $(150,\ 1200)$: $A(150) = 4\cdot 150 + 600 = 1200$. ✓`,
            r`<strong>Svar:</strong> Prisen består av en fast pris på $600$ kr og $4$ kr per kilometer, så $A(x) = 4x + 600$.`,
          ]),
        part("1p-v22-d2-2", "b", r`Hva blir prisen per kilometer hos firma B dersom Markus kjører $50$ km? Hva blir prisen per kilometer hos firma B dersom Markus kjører $400$ km?`,
          r`Finn uttrykket for $B(x)$ på samme måte som i a). Pris per kilometer er $\dfrac{B(x)}{x}$.`,
          [
            r`Grafen til B starter i $(0,\ 900)$ og krysser grafen til A i $(150,\ 1200)$. Stigningstallet er $\dfrac{1200 - 900}{150 - 0} = 2$, så $B(x) = 2x + 900$.`,
            r`$B(50) = 2\cdot 50 + 900 = 1000$ kr, og prisen per kilometer er $\dfrac{1000}{50} = 20$ kr/km.`,
            r`$400$ km er utenfor grafen, men vi antar at linjen fortsetter: $B(400) = 2\cdot 400 + 900 = 1700$ kr. Prisen per kilometer er $\dfrac{1700}{400} = 4{,}25$ kr/km.`,
            r`<strong>Svar:</strong> Ved $50$ km er prisen $20$ kr per kilometer, og ved $400$ km er den $4{,}25$ kr per kilometer. Jo lenger han kjører, jo lavere blir prisen per kilometer, fordi den faste prisen fordeles på flere kilometer.`,
          ]),
        part("1p-v22-d2-2", "c", r`Markus skal kjøre fra Bodø til Sulitjelma og tilbake til Bodø igjen. På internett finner han ut at avstanden fra Bodø til Sulitjelma er $9{,}7$ mil. Gjør beregninger, og vurder hvilket firma han bør leie bil hos.`,
          r`En mil er $10$ km. Finn totalt antall kilometer, og sett inn i alle tre uttrykkene.`,
          [
            r`$9{,}7$ mil $= 97$ km. Tur-retur: $2\cdot 97 = 194$ km.`,
            r`Firma C: grafen starter i $(0,\ 700)$ og går gjennom $(100,\ 1000)$, så $a = \dfrac{300}{100} = 3$ og $C(x) = 3x + 700$.`,
            r`Firma A: $A(194) = 4\cdot 194 + 600 = 1376$ kr.`,
            r`Firma B: $B(194) = 2\cdot 194 + 900 = 1288$ kr.`,
            r`Firma C: $C(194) = 3\cdot 194 + 700 = 1282$ kr.`,
            r`Kontroll mot grafen: B og C krysser hverandre der $2x + 900 = 3x + 700$, altså $x = 200$. Under $200$ km er C billigst av de to, og $194$ km er like under.`,
            r`<strong>Svar:</strong> Han bør leie hos firma C, som koster $1282$ kr. Firma B koster $1288$ kr, bare $6$ kr mer, og firma A koster $1376$ kr. Hvis han i tillegg kjører litt omveier og passerer $200$ km, blir B billigere enn C, så valget er ganske jevnt.`,
          ]),
      ],
      ["lineære funksjoner", "avlesning av grafer", "vurdering", "enheter"]),
    single("1p-v22-d2-3", "3", 0,
      r`En flaske dusjsåpe koster det samme i fire butikker. De fire butikkene bestemmer seg for å sette ned prisen. Dette gjør de på hver sin måte:<ul><li><strong>Butikk A:</strong> Ta $3$ flasker, og betal for $2$ av dem.</li><li><strong>Butikk B:</strong> $30\ \%$ rabatt.</li><li><strong>Butikk C:</strong> Betal full pris for én flaske, og få $75\ \%$ rabatt på den neste.</li><li><strong>Butikk D:</strong> Betal full pris for $3$ flasker, og få i tillegg $2$ gratis.</li></ul>Gjør beregninger, og sett opp en oversikt hvor du sorterer tilbudene etter hvor gode de er.`,
      r`Kall prisen for én flaske for $p$. Regn ut hva en flaske koster i gjennomsnitt i hvert tilbud.`,
      [
        r`La $p$ være vanlig pris for én flaske. Vi sammenligner pris per flaske når man kjøper et helt tilbud.`,
        r`<strong>A:</strong> $3$ flasker for prisen av $2$: $\dfrac{2p}{3} \approx 0{,}667p$ per flaske.`,
        r`<strong>B:</strong> $30\ \%$ rabatt: $0{,}70p$ per flaske.`,
        r`<strong>C:</strong> $2$ flasker koster $p + 0{,}25p = 1{,}25p$, så $\dfrac{1{,}25p}{2} = 0{,}625p$ per flaske.`,
        r`<strong>D:</strong> $5$ flasker koster $3p$, så $\dfrac{3p}{5} = 0{,}60p$ per flaske.`,
        r`Oversikt, best først: <table><tr><th>Plass</th><th>Tilbud</th><th>Pris per flaske</th><th>Rabatt</th></tr><tr><td>$1$</td><td>D</td><td>$0{,}60p$</td><td>$40\ \%$</td></tr><tr><td>$2$</td><td>C</td><td>$0{,}625p$</td><td>$37{,}5\ \%$</td></tr><tr><td>$3$</td><td>A</td><td>$0{,}667p$</td><td>$33{,}3\ \%$</td></tr><tr><td>$4$</td><td>B</td><td>$0{,}70p$</td><td>$30\ \%$</td></tr></table>`,
        r`Forutsetning: Kunden kjøper et helt antall tilbudspakker ($5$ i D, $2$ i C og $3$ i A). Hvis bare én flaske skal kjøpes, er B det eneste tilbudet som gir rabatt.`,
        r`<strong>Svar:</strong> Rangering fra best til dårligst: D ($40\ \%$ rabatt), C ($37{,}5\ \%$), A ($33{,}3\ \%$), B ($30\ \%$).`,
      ],
      ["prosent", "prisberegning", "vurdering", "oversikt"]),
    multi("1p-v22-d2-4", "4", 0,
      r`Ved en temperatur på $22\ ^{\circ}$C veier $1$ L olje $0{,}9124$ kg.`,
      [
        part("1p-v22-d2-4", "a", r`Hvor mange gram veier $10$ mL av oljen ved denne temperaturen?`,
          r`Gjør om til gram og liter. $10$ mL er $0{,}01$ L.`,
          [
            r`$1$ L veier $0{,}9124$ kg $= 912{,}4$ g.`,
            r`$10$ mL $= 0{,}010$ L $= \dfrac{1}{100}$ av en liter.`,
            r`$912{,}4\ \text{g}\cdot 0{,}01 = 9{,}124$ g.`,
            r`<strong>Svar:</strong> $10$ mL olje veier $9{,}124$ g (omtrent $9{,}1$ g).`,
          ]),
        part("1p-v22-d2-4", "b", r`Oljen i et beger veier $556{,}6$ g ved en temperatur på $22\ ^{\circ}$C. Hvor mange desiliter olje er det i begeret?`,
          r`Delt masse på massen per liter gir antall liter. Husk $1$ L $= 10$ dL.`,
          [
            r`Antall liter: $\dfrac{556{,}6\ \text{g}}{912{,}4\ \text{g/L}} \approx 0{,}610$ L.`,
            r`$0{,}610\ \text{L} = 0{,}610\cdot 10\ \text{dL} = 6{,}10$ dL.`,
            r`Kontroll: $6{,}1\ \text{dL} = 0{,}61\ \text{L}$ og $0{,}61\cdot 912{,}4 = 556{,}56 \approx 556{,}6$ g. ✓`,
            r`<strong>Svar:</strong> Det er omtrent $6{,}1$ dL olje i begeret.`,
          ]),
      ],
      ["enheter", "proporsjonalitet", "målestørrelser"]),
    single("1p-v22-d2-5", "5", 0,
      r`En bakterie formerer seg ved todeling hvert $20$. minutt. Det vil si at om det i starten er én bakterie, vil det etter $20$ minutter være $2$ bakterier, etter $40$ minutter fire bakterier osv.<br>Hvor mange bakterier vil det være etter $12$ timer?`,
      r`Hvor mange ganger deler bakteriene seg på $12$ timer? Hver todeling dobler antallet.`,
      [
        r`$12$ timer $= 12\cdot 60 = 720$ minutter.`,
        r`Antall todelinger: $\dfrac{720}{20} = 36$.`,
        r`Antallet dobles $36$ ganger: $2^{36}$. Vi regner ut med kalkulator: $2^{36} = 68\,719\,476\,736$.`,
        r`Kontroll av størrelsesorden: $2^{10} = 1024 \approx 10^{3}$, så $2^{36} \approx 10^{10{,}8} \approx 6{,}9\cdot 10^{10}$. ✓`,
        r`<strong>Svar:</strong> Etter $12$ timer er det $2^{36} = 68\,719\,476\,736$ bakterier, omtrent $6{,}9\cdot 10^{10}$ (når vi starter med én bakterie).`,
      ],
      ["eksponentiell vekst", "potenser", "standardform"]),
    multi("1p-v22-d2-6", "6", 0,
      r`Ovenfor ser du tre figurer. Figurene er satt sammen av små klosser. Roar vil fortsette å lage figurer etter samme mønster.` +
        figur("p1-v22-d2-6", "6", "Tre figurer av små grønne terninger (klosser) i 3D, merket Figur 1, Figur 2 og Figur 3. Figur 1 er én kloss. Figur 2 er et nederste lag på 2 × 2 klosser med én kloss oppå. Figur 3 er et nederste lag på 3 × 3 klosser, et lag på 2 × 2 over det og én kloss øverst (trappepyramide)."),
      [
        part("1p-v22-d2-6", "a", r`Hvor mange klosser trenger han for å lage figur $5$?`,
          r`Se på hvordan figurene er bygget opp i lag. Hvor mange klosser er det i hvert lag?`,
          [
            r`Figur $1$: $1$ kloss. Figur $2$: lag på $2\cdot 2 = 4$ og $1$ kloss over, til sammen $4 + 1 = 5$. Figur $3$: $3\cdot 3 = 9$, $2\cdot 2 = 4$ og $1$, til sammen $14$.`,
            r`Figur $n$ har kvadratiske lag med $n^{2}, (n - 1)^{2}, \ldots, 1^{2}$ klosser (antar at figurene er massive, slik at lagene er fylt).`,
            r`Figur $5$: $5^{2} + 4^{2} + 3^{2} + 2^{2} + 1^{2} = 25 + 16 + 9 + 4 + 1 = 55$.`,
            r`<strong>Svar:</strong> Han trenger $55$ klosser.`,
          ]),
        part("1p-v22-d2-6", "b", r`Hvor mange klosser trenger han til sammen for å lage de $10$ første figurene?`,
          r`Lag en tabell (for eksempel i regneark) med antall klosser i hver figur og summer.`,
          [
            r`Antall klosser i figur $n$ er $1^{2} + 2^{2} + \cdots + n^{2}$: <table><tr><th>Figur</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td><td>$6$</td><td>$7$</td><td>$8$</td><td>$9$</td><td>$10$</td></tr><tr><th>Klosser</th><td>$1$</td><td>$5$</td><td>$14$</td><td>$30$</td><td>$55$</td><td>$91$</td><td>$140$</td><td>$204$</td><td>$285$</td><td>$385$</td></tr></table>`,
            r`Summen: $1 + 5 + 14 + 30 + 55 + 91 + 140 + 204 + 285 + 385 = 1210$.`,
            r`<strong>Svar:</strong> Til sammen trenger han $1210$ klosser.`,
          ]),
        part("1p-v22-d2-6", "c", r`Roar har $10\,000$ klosser. Han vil starte med den minste figuren og lage én figur i hver størrelse. Hvor mange figurer kan han lage? Hvor mange klosser vil han ha igjen når han har laget figurene?`,
          r`Fortsett tabellen og summer til du går forbi $10\,000$.`,
          [
            r`Vi fortsetter med de neste figurene: $11$: $506$, $12$: $650$, $13$: $819$, $14$: $1015$, $15$: $1240$, $16$: $1496$, $17$: $1785$, $18$: $2109$.`,
            r`Sum etter $10$ figurer: $1210$. Videre: $1716$ ($11$), $2366$ ($12$), $3185$ ($13$), $4200$ ($14$), $5440$ ($15$), $6936$ ($16$), $8721$ ($17$), $10\,830$ ($18$).`,
            r`Med $17$ figurer trengs $8721$ klosser, men $18$ figurer krever $10\,830 > 10\,000$.`,
            r`Klosser igjen: $10\,000 - 8721 = 1279$.`,
            r`<strong>Svar:</strong> Han kan lage $17$ figurer, og han har $1279$ klosser igjen.`,
          ]),
      ],
      ["mønstre", "kvadrattall", "summer", "regneark"]),
    multi("1p-v22-d2-7", "7", 0,
      r`Da Eline og Malene kom til hytta, var temperaturen i stua $2{,}0\ ^{\circ}$C. De skrudde på varmen og stilte termostaten på $20\ ^{\circ}$C. Tabell 1 viser temperaturen i stua $x$ minutter etter at de skrudde på varmen.<table><tr><th>Tid (minutter)</th><td>$1$</td><td>$5$</td><td>$10$</td><td>$20$</td><td>$30$</td><td>$50$</td><td>$80$</td><td>$120$</td></tr><tr><th>Temperatur ($^{\circ}$C)</th><td>$2{,}0$</td><td>$3{,}7$</td><td>$5{,}3$</td><td>$8{,}0$</td><td>$10{,}2$</td><td>$13{,}4$</td><td>$16{,}4$</td><td>$18{,}4$</td></tr></table><em>Tabell 1</em><br>Eline og Malene vil lage en modell som viser temperaturen i stua $x$ minutter etter at de skrudde på varmen. De starter med å bruke tallene i tabell 1 til å lage en modell $T_1$ på formen $T_1(x) = a\cdot x^{b}$.`,
      [
        part("1p-v22-d2-7", "a", r`Bestem tallene $a$ og $b$.`,
          r`Bruk potensregresjon på tallene i tabell 1 i GeoGebra.`,
          [
            r`Vi legger inn punktene $(1,\ 2{,}0)$, $(5,\ 3{,}7)$, $\ldots$, $(120,\ 18{,}4)$ i regnearket i GeoGebra og bruker potensregresjon (<code>FitPow</code>).`,
            r`Det gir $a \approx 1{,}85$ og $b \approx 0{,}49$.`,
            r`Kontroll: $T_1(20) = 1{,}85\cdot 20^{0{,}49} \approx 8{,}0$ (tabellen: $8{,}0$) og $T_1(120) \approx 19{,}3$ (tabellen: $18{,}4$).`,
            r`<strong>Svar:</strong> $a \approx 1{,}85$ og $b \approx 0{,}49$, det vil si $T_1(x) = 1{,}85\cdot x^{0{,}49}$.`,
          ]),
        part("1p-v22-d2-7", "b", r`Vurder gyldighetsområdet til modellen $T_1$.`,
          r`Termostaten er stilt på $20\ ^{\circ}$C. Når overstiger modellen $20$ grader? Hva gir modellen ved $x = 0$?`,
          [
            r`Funksjonen $T_1(x) = 1{,}85\cdot x^{0{,}49}$ vokser uten grense. Stua kan imidlertid ikke bli varmere enn termostatens $20\ ^{\circ}$C.`,
            r`Vi løser $T_1(x) = 20$ og får $x \approx 129$ minutter. Etter det gir modellen temperaturer over $20\ ^{\circ}$C, for eksempel $T_1(240) \approx 27\ ^{\circ}$C, og det er urealistisk.`,
            r`Ved starten gir modellen $T_1(0) = 0\ ^{\circ}$C, mens temperaturen i stua var $2{,}0\ ^{\circ}$C. Modellen passer altså dårlig helt i begynnelsen.`,
            r`<strong>Svar:</strong> Modellen er rimelig for omtrent $1 \le x \le 129$ (opptil litt over to timer, til den når $20\ ^{\circ}$C). Utenfor dette området passer den ikke.`,
          ]),
        part("1p-v22-d2-7", "c", r`Eline og Malene ønsker å forbedre modellen $T_1$. Eline foreslår at de skal trekke $20\ ^{\circ}$C fra hver temperatur de har målt, og heller bruke en eksponentialfunksjon som modell. Hun setter opp en ny tabell (Tabell 2): <table><tr><th>Tid (minutter)</th><td>$1$</td><td>$5$</td><td>$10$</td><td>$20$</td><td>$30$</td><td>$50$</td><td>$80$</td><td>$120$</td></tr><tr><th>Korrigert temperatur ($^{\circ}$C)</th><td>$-18{,}0$</td><td>$-16{,}3$</td><td>$-14{,}7$</td><td>$-12{,}0$</td><td>$-9{,}8$</td><td>$-6{,}6$</td><td>$-3{,}6$</td><td>$-1{,}6$</td></tr></table>Lag en eksponentialfunksjon $f$ som passer godt til tallene i tabell 2.`,
          r`Eksponentialregresjon gir positive verdier. Hva må du gjøre med de negative tallene?`,
          [
            r`Alle verdiene i tabell 2 er negative, så vi kan ikke bruke vanlig eksponentialregresjon direkte. Vi bytter fortegn: tallene $18{,}0$, $16{,}3$, $\ldots$, $1{,}6$ og bruker eksponentialregresjon (<code>FitGrowth</code>) i GeoGebra.`,
            r`Det gir $18{,}09\cdot 0{,}980^{x}$. Vi bytter tilbake fortegn.`,
            r`Kontroll: $f(10) = -18{,}09\cdot 0{,}98^{10} \approx -14{,}8$ (tabellen: $-14{,}7$), $f(120) \approx -1{,}60$ (tabellen: $-1{,}6$). ✓`,
            r`<strong>Svar:</strong> $f(x) = -18{,}09\cdot 0{,}980^{x}$.`,
          ]),
        part("1p-v22-d2-7", "d", r`Tegn grafen til $T_1$ og grafen til $f$ i samme koordinatsystem. Beskriv forskjeller mellom de to grafene.`,
          r`Tegn begge i GeoGebra. Se på hva som skjer for store $x$ og i starten.`,
          [
            r`Vi skriver inn $T_1(x) = 1{,}85\cdot x^{0{,}49}$ og $f(x) = -18{,}09\cdot 0{,}98^{x}$ i GeoGebra og viser grafene i samme koordinatsystem.`,
            r`<strong>Forskjeller:</strong> <ul><li>$T_1$ ligger over førsteaksen og stiger uten grense. Grafen blir flatere, men går forbi $20$ ved $x \approx 129$ og fortsetter oppover.</li><li>$f$ ligger under førsteaksen, starter i $f(0) \approx -18{,}1$ og stiger mot $0$. Førsteaksen er en vannrett asymptote, så $f$ nærmer seg $0$ uten å passere den.</li><li>$T_1(0) = 0$, mens $f(0) \approx -18{,}1$. De to grafene har forskjellig utgangspunkt.</li><li>$T_1$ overskyter målingen ved $x = 120$ ($19{,}3$ mot $18{,}4$), mens $f$ passer bedre ($-1{,}60$ mot $-1{,}6$).</li></ul>`,
            r`<strong>Svar:</strong> $T_1$ vokser uten grense, mens $f$ nærmer seg en vannrett asymptote ($y = 0$) og passer bedre til målingene.`,
          ]),
        part("1p-v22-d2-7", "e", r`Malene mener de kan bruke funksjonen $f$ til å lage en bedre modell enn $T_1$ for temperaturen i stua. «Vi løfter grafen til $f$ opp $20\ ^{\circ}$C, slik at den starter omtrent i punktet $(0,\ 2)$», sier hun. «Da vil den passe perfekt.» Bruk funksjonen $f$, og lag en modell $T_2$ ved å gjøre som Malene foreslår. Hva vil temperaturen i stua være etter $4$ timer ifølge modellen $T_2$?`,
          r`Å løfte grafen $20$ opp betyr å legge til $20$. Hvor mange minutter er $4$ timer?`,
          [
            r`Løfter vi grafen $20$ enheter opp, legger vi til $20$: $T_2(x) = f(x) + 20 = 20 - 18{,}09\cdot 0{,}98^{x}$.`,
            r`Sjekk av start: $T_2(0) = 20 - 18{,}09 = 1{,}91 \approx 2$, så modellen starter omtrent i $(0,\ 2)$. ✓`,
            r`$4$ timer $= 240$ minutter: $T_2(240) = 20 - 18{,}09\cdot 0{,}98^{240} \approx 20 - 0{,}14 = 19{,}86$.`,
            r`<strong>Svar:</strong> $T_2(x) = 20 - 18{,}09\cdot 0{,}98^{x}$, og etter $4$ timer er temperaturen i stua omtrent $19{,}9\ ^{\circ}$C, altså nær termostatens $20\ ^{\circ}$C.`,
          ]),
      ],
      ["potensfunksjoner", "eksponentialfunksjoner", "regresjon", "modellering", "gyldighetsområde", "GeoGebra"]),
    multi("1p-v22-d2-8", "8", 0,
      r`Figuren viser et lysgardin med små lyspærer.` +
        figur("p1-v22-d2-8", "8", "Lysgardin med 9 tråder som henger fra en vannrett list. Målestokk «80 cm» over hele bredden (første til siste tråd). Tråd 1 har 3 lyspærer, tråd 2 har 6, tråd 3 har 9, tråd 4 har 3, tråd 5 har 6, tråd 6 har 9, tråd 7 har 3, tråd 8 har 6 og tråd 9 har 9 (gule lyspærer med like store mellomrom). Tabell til høyre: Meter 1 → 63, 2 → 126, 3 → 183, 4 → 243, 5 → 306, 6 → 363 lyspærer.") +
        r`Lyspærene henger på tråder. Den første tråden i en lenke har tre lyspærer, den neste har seks og den tredje har ni. Dette mønsteret gjentas videre. Avstanden mellom hver tråd er $10$ cm. Figuren viser altså et gardin med lengde $80$ cm.<br>Et annet lysgardin av samme type er én meter langt.<br>Tabellen viser antall lyspærer på lysgardiner med ulike lengder:<table><tr><th>Meter</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td><td>$6$</td></tr><tr><th>Antall lyspærer</th><td>$63$</td><td>$126$</td><td>$183$</td><td>$243$</td><td>$306$</td><td>$363$</td></tr></table>`,
      [
        part("1p-v22-d2-8", "a", r`Hvor mange tråder har dette lysgardinet?`,
          r`Gardinet på $80$ cm har $9$ tråder. Hvorfor er det ikke $8$?`,
          [
            r`Et gardin på $80$ cm har $\dfrac{80}{10} = 8$ mellomrom og $8 + 1 = 9$ tråder (første og siste tråd står i hver sin ende).`,
            r`Et gardin på $1$ m $= 100$ cm har $\dfrac{100}{10} = 10$ mellomrom og $10 + 1 = 11$ tråder.`,
            r`<strong>Svar:</strong> Gardinet har $11$ tråder.`,
          ]),
        part("1p-v22-d2-8", "b", r`Hvor mange lyspærer er det på den siste tråden?`,
          r`Mønsteret $3,\ 6,\ 9$ gjentas. Se hvor tråd nr. $11$ kommer i mønsteret.`,
          [
            r`Trådene har $3,\ 6,\ 9,\ 3,\ 6,\ 9,\ 3,\ 6,\ 9,\ 3,\ 6,\ \ldots$ lyspærer.`,
            r`$11 = 3\cdot 3 + 2$, så tråd nr. $11$ er nummer $2$ i en ny gruppe på tre. Den har $6$ lyspærer.`,
            r`Kontroll mot tabellen: $3\cdot(3 + 6 + 9) + 3 + 6 = 54 + 9 = 63$ lyspærer, det samme som tabellen for $1$ m. ✓`,
            r`<strong>Svar:</strong> Den siste tråden har $6$ lyspærer.`,
          ]),
        part("1p-v22-d2-8", "c", r`Hvor mange lyspærer er det på et $15$ meter langt lysgardin?`,
          r`Finn antall tråder, og del dem inn i grupper på tre. Hver gruppe har $3 + 6 + 9 = 18$ lyspærer.`,
          [
            r`$15$ m $= 1500$ cm gir $\dfrac{1500}{10} + 1 = 151$ tråder.`,
            r`$151 = 3\cdot 50 + 1$: $50$ hele grupper på tre tråder og én tråd til.`,
            r`Hver hel gruppe har $3 + 6 + 9 = 18$ lyspærer: $50\cdot 18 = 900$. Den siste tråden er nummer $1$ i en ny gruppe, så den har $3$ lyspærer.`,
            r`$900 + 3 = 903$.`,
            r`Kontroll med $2$ m: $21$ tråder $= 7$ grupper, $7\cdot 18 = 126$, som stemmer med tabellen. ✓`,
            r`<strong>Svar:</strong> Det er $903$ lyspærer på et $15$ meter langt lysgardin.`,
          ]),
        part("1p-v22-d2-8", "d", r`Hvilke lengder, i hele meter, kan et lysgardin ha om det skal være ni lyspærer på den siste tråden?`,
          r`Den siste tråden har ni lyspærer når antall tråder er delelig med $3$. Hvor mange tråder har et gardin på $m$ meter?`,
          [
            r`Et gardin på $m$ meter har $10m + 1$ tråder.`,
            r`Den siste tråden har $9$ lyspærer når antall tråder er delelig med $3$ (tråd nr. $3,\ 6,\ 9,\ \ldots$).`,
            r`Prøver: $m = 1$: $11$ tråder (ikke delelig med $3$). $m = 2$: $21$ tråder, og $21 = 3\cdot 7$. ✓ $m = 3$: $31$ (nei). $m = 4$: $41$ (nei). $m = 5$: $51 = 3\cdot 17$. ✓ $m = 6$: $61$ (nei). $m = 7$: $71$ (nei). $m = 8$: $81 = 3\cdot 27$. ✓`,
            r`Antall tråder øker med $10$ for hver meter. Fordi $10 = 3\cdot 3 + 1$, øker resten ved deling på $3$ med $1$ for hver meter: $11$ har rest $2$, $21$ har rest $0$, $31$ rest $1$, $41$ rest $2$, $51$ rest $0$ og så videre. Resten er altså $0$ hver tredje meter, fra $2$ m.`,
            r`<strong>Svar:</strong> Lengdene $2$ m, $5$ m, $8$ m, $11$ m, $\ldots$, altså lengdene $3k - 1$ meter for $k = 1,\ 2,\ 3,\ \ldots$.`,
          ]),
      ],
      ["mønstre", "tallfølger", "delelighet", "modellering"]),
  ],
});
