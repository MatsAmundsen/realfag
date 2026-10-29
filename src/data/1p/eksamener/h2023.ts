import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, høsten 2023 (20.11.2023). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 * Eksamenen oppgir ingen poeng per oppgave. Hver deloppgave vektes likt, med unntak av oppgave 5 i Del 2 (vektes 3 ganger)
 * og oppgave 6b i Del 2 (vektes 1,5 ganger). Derfor står points: 0 (viser ingen poengtall).
 */
export const EKSAMEN_1P_H2023: Exam = officialExam({
  id: "1p-h2023",
  title: "Eksamen høst 2023",
  season: "høst",
  year: 2023,
  date: "20.11.2023",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "20.11.2023", "1P_H23_LK20.pdf"),
  del1: [
    single("1p-h23-d1-1", "1", 0,
      U + r`Tobias lurer på hvor mye vann han bør drikke hver dag. Han finner ulike svar på ulike nettsider. På en nettside finner han teksten nedenfor.<br><em>«Voksne har hvert døgn behov for ca. $30$ mL væske per kilogram kroppsvekt. Husk at vann er den beste tørstedrikken.»</em><br>Tobias veier $70$ kg.<br>Hvor mange liter vann bør Tobias drikke i løpet av et døgn ifølge nettsiden?`,
      r`Regn først ut hvor mange mL han trenger, og gjør så om til liter ($1$ L $= 1000$ mL).`,
      [
        r`Behovet er $30$ mL for hver av de $70$ kilogrammene: $30\cdot 70 = 2100$ mL.`,
        r`$1$ L $= 1000$ mL, så $2100$ mL $= 2100 \div 1000 = 2{,}1$ L.`,
        r`<strong>Svar:</strong> Tobias bør drikke $2{,}1$ liter i løpet av et døgn.`,
      ],
      ["enheter", "multiplikasjon"]),
    multi("1p-h23-d1-2", "2", 0,
      U + r`<strong>Ni av ti nordmenn bruker sosiale medier</strong><br>$88\ \%$ av nordmenn bruker sosiale medier.<br>De siste fem årene har antall nordmenn som bruker sosiale medier, økt med $8$ prosentpoeng.<br><em>Opplysningene er hentet fra ssb.no.</em>`,
      [
        part("1p-h23-d1-2", "a", r`Vil du si at overskriften samsvarer med første setning i teksten? Begrunn svaret ditt.`,
          r`Gjør «ni av ti» om til prosent og sammenlign med $88\ \%$.`,
          [
            r`«Ni av ti» er $\dfrac{9}{10} = 0{,}9 = 90\ \%$.`,
            r`Teksten sier $88\ \%$. Det er $2$ prosentpoeng fra $90\ \%$, og $88\ \%$ ligger nærmere $90\ \%$ enn noen andre hele tiere ($80\ \%$ eller $100\ \%$).`,
            r`<strong>Svar:</strong> Ja, overskriften samsvarer tilnærmet. $88\ \%$ er avrundet til nærmeste tier $90\ \%$, som er «ni av ti». Overskriften er en avrunding, ikke et eksakt tall.`,
          ]),
        part("1p-h23-d1-2", "b", r`Hvor mange prosent tilsvarer økningen på $8$ prosentpoeng?`,
          r`Før økningen var andelen $88 - 8$ prosent. Prosentvis økning regnes i forhold til startverdien.`,
          [
            r`For fem år siden var andelen $88\ \% - 8\ \% = 80\ \%$.`,
            r`Økningen i prosent er endringen delt på startverdien: $\dfrac{8}{80} = \dfrac{1}{10} = 0{,}10 = 10\ \%$.`,
            r`<strong>Svar:</strong> Økningen på $8$ prosentpoeng tilsvarer en økning på $10\ \%$.`,
          ]),
      ],
      ["prosent", "prosentpoeng", "tolkning"]),
    multi("1p-h23-d1-3", "3", 0,
      U + r`Ohms lov sier at strømmen ($I$) gjennom en metallisk leder med konstant temperatur er proporsjonal med spenningen ($U$) og omvendt proporsjonal med motstanden ($R$) i lederen.<br>Argumenter for om hver av påstandene er sann eller usann.`,
      [
        part("1p-h23-d1-3", "1", r`Hvis vi øker spenningen, vil strømmen også øke.`,
          r`Skriv sammenhengen som $I = \dfrac{U}{R}$. Hva skjer med $I$ når $U$ blir større og $R$ er den samme?`,
          [
            r`Ohms lov kan skrives $I = \dfrac{U}{R}$. Strømmen er proporsjonal med spenningen, så $I = k\cdot U$ med $k = \dfrac{1}{R}$, og $k > 0$.`,
            r`Når $U$ blir større og $R$ er uendret, blir $I$ større. Dobler vi $U$, dobles også $I$.`,
            r`<strong>Svar:</strong> Påstanden er sann (når motstanden er uendret).`,
          ]),
        part("1p-h23-d1-3", "2", r`Hvis vi øker motstanden, vil strømmen også øke.`,
          r`Strømmen er omvendt proporsjonal med motstanden. Hva skjer med en brøk når nevneren blir større?`,
          [
            r`Fra $I = \dfrac{U}{R}$ ser vi at $I$ blir mindre når nevneren $R$ blir større (med uendret $U$).`,
            r`Eksempel: $U = 12$ V. Med $R = 4$ er $I = \dfrac{12}{4} = 3$, og med $R = 6$ er $I = \dfrac{12}{6} = 2$. Strømmen sank.`,
            r`<strong>Svar:</strong> Påstanden er usann. Øker vi motstanden, blir strømmen mindre.`,
          ]),
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet", "argumentasjon"]),
    multi("1p-h23-d1-4", "4", 0,
      U + r`Hunder utvikler seg raskere enn mennesker. Når en hund er $1$ år gammel, tilsvarer det $16$ menneskeår. Se tabellen nedenfor.<table><tr><th>Hundens alder</th><th>Små/mellomstore hunder</th><th>Store hunder</th><th>Veldig store hunder</th></tr><tr><td>2 måneder</td><td>$2$ år</td><td>$2$ år</td><td>$2$ år</td></tr><tr><td>4 måneder</td><td>$6$ år</td><td>$6$ år</td><td>$6$ år</td></tr><tr><td>6 måneder</td><td>$10$ år</td><td>$10$ år</td><td>$10$ år</td></tr><tr><td>8 måneder</td><td>$12$ år</td><td>$12$ år</td><td>$12$ år</td></tr><tr><td>10 måneder</td><td>$14$ år</td><td>$14$ år</td><td>$14$ år</td></tr><tr><td>1 år</td><td>$16$ år</td><td>$16$ år</td><td>$16$ år</td></tr><tr><td>1,5 år</td><td>$20$ år</td><td>$20$ år</td><td>$20$ år</td></tr><tr><td>2 år</td><td>$24$ år</td><td>$24$ år</td><td>$24$ år</td></tr><tr><td>3 år</td><td>$29$ år</td><td>$30$ år</td><td>$31$ år</td></tr><tr><td>4 år</td><td>$34$ år</td><td>$36$ år</td><td>$38$ år</td></tr><tr><td>5 år</td><td>$39$ år</td><td>$42$ år</td><td>$45$ år</td></tr><tr><td>6 år</td><td>$44$ år</td><td>$48$ år</td><td>$52$ år</td></tr><tr><td>7 år</td><td>$49$ år</td><td>$54$ år</td><td>$59$ år</td></tr><tr><td>8 år</td><td>$54$ år</td><td>$60$ år</td><td>$66$ år</td></tr><tr><td>9 år</td><td>$59$ år</td><td>$66$ år</td><td>$73$ år</td></tr><tr><td>10 år</td><td>$64$ år</td><td>$72$ år</td><td>$80$ år</td></tr><tr><td>11 år</td><td>$69$ år</td><td>$78$ år</td><td>$87$ år</td></tr><tr><td>12 år</td><td>$74$ år</td><td>$84$ år</td><td>$94$ år</td></tr><tr><td>13 år</td><td>$79$ år</td><td>$90$ år</td><td>$101$ år</td></tr><tr><td>14 år</td><td>$84$ år</td><td>$96$ år</td><td>$108$ år</td></tr></table><em>Kilde for tabellen: www.agria.no (24.04.2023).</em><br>Sondre har en hund som er $2$ år gammel. Han mener funksjonen $H$ gitt ved $H(x) = 6x + 12$ kan brukes som en modell for hvor mange menneskeår $H(x)$ en stor hund er når den er $x$ hundeår.`,
      [
        part("1p-h23-d1-4", "a", r`Forklar hvordan Sondre kan ha kommet fram til dette uttrykket, og argumenter for når modellen er gyldig.`,
          r`Se på kolonnen «Store hunder» fra $2$ år og oppover. Hvor mye øker tallet for hvert hundeår? Hva er verdien ved $2$ år?`,
          [
            r`I kolonnen for store hunder øker alderen i menneskeår med $6$ for hvert hundeår fra $2$ år og oppover: $24,\ 30,\ 36,\ 42,\ \ldots$ Derfor er stigningstallet $6$.`,
            r`Ved $2$ år er hunden $24$ menneskeår. Linjen $y = 6x + b$ gjennom $(2,\ 24)$ gir $24 = 6\cdot 2 + b$, altså $b = 24 - 12 = 12$. Dermed $H(x) = 6x + 12$.`,
            r`Kontroll: $H(3) = 6\cdot 3 + 12 = 30$ og $H(14) = 6\cdot 14 + 12 = 96$. Begge stemmer med tabellen.`,
            r`Gyldighet: For $x = 1$ gir modellen $H(1) = 18$, men tabellen sier $16$, så modellen gjelder ikke for unge hunder. Tabellen slutter ved $14$ år.`,
            r`<strong>Svar:</strong> Sondre har funnet en rett linje gjennom punktene i tabellen for store hunder, med stigningstall $6$ og $H(2) = 24$. Modellen er gyldig for $2 \le x \le 14$.`,
          ]),
        part("1p-h23-d1-4", "b", r`Sondre påstår at modellen han har funnet, viser at alderen til en hund er proporsjonal med alderen til et menneske. Stemmer påstanden til Sondre? Husk å argumentere for svaret ditt.`,
          r`Proporsjonale størrelser har formen $y = k\cdot x$. Hva er $H(0)$? Er $\dfrac{H(x)}{x}$ den samme for alle $x$?`,
          [
            r`Hvis hundens alder (i menneskeår) var proporsjonal med antall hundeår, måtte $H(x) = k\cdot x$, og forholdet $\dfrac{H(x)}{x}$ måtte være det samme hele tiden. Grafen ville gått gjennom origo.`,
            r`Men $H(0) = 12 \ne 0$, så grafen går ikke gjennom origo. Forholdet endrer seg også: $\dfrac{H(2)}{2} = \dfrac{24}{2} = 12$, mens $\dfrac{H(3)}{3} = \dfrac{30}{3} = 10$.`,
            r`<strong>Svar:</strong> Nei, påstanden stemmer ikke. Modellen $H(x) = 6x + 12$ er lineær, men ikke proporsjonal, siden $H(0) \ne 0$ og forholdet $\dfrac{H(x)}{x}$ ikke er konstant.`,
          ]),
      ],
      ["lineære funksjoner", "proporsjonalitet", "modeller"]),
    single("1p-h23-d1-5", "5", 0,
      U + r`På en nettside har Dennis funnet teksten nedenfor.<br><em>«Verdifallet utgjør bilens største kostnad. Verdifallet er i de aller fleste tilfellene størst det første året. For en ny bil kan du vente et verdifall på $20\ \%$ det første året. Deretter $14\ \%$ av bruktprisen det andre året, $13\ \%$ det tredje året, osv., synkende til $10\ \%$ det sjette året. Fra og med det sjette året må du regne med et verdifall på $10\ \%$ årlig.»</em><br>Dennis vil kjøpe en ny bil som koster $490\,000$ kroner.<br>Sett opp et regnestykke som vil gi bilens verdi etter $2$ år.`,
      r`Et verdifall på $20\ \%$ gir vekstfaktor $1 - 0{,}20$. Bruk neste vekstfaktor på verdien etter første år.`,
      [
        r`Første år faller verdien med $20\ \%$. Vekstfaktoren er $1 - 0{,}20 = 0{,}80$.`,
        r`Andre år faller verdien med $14\ \%$ av bruktprisen. Vekstfaktoren er $1 - 0{,}14 = 0{,}86$.`,
        r`Verdien etter to år er $490\,000\cdot 0{,}80\cdot 0{,}86$.`,
        r`Utregning for kontroll: $490\,000\cdot 0{,}80 = 392\,000$, og $392\,000\cdot 0{,}86 = 337\,120$.`,
        r`<strong>Svar:</strong> Regnestykket er $490\,000\cdot 0{,}80\cdot 0{,}86$. Bilens verdi etter $2$ år er $337\,120$ kroner.`,
      ],
      ["prosent", "vekstfaktor", "verdifall"]),
  ],
  del2: [
    multi("1p-h23-d2-1", "1", 0,
      r`Tabellen nedenfor viser antall personer i Norge som hadde fiske som hovedyrke noen år i perioden $1952$ til $2022$.<table><tr><th>År</th><th>1952</th><th>1982</th><th>1992</th><th>2002</th><th>2012</th><th>2022</th></tr><tr><th>Antall fiskere</th><td>$65\,956$</td><td>$25\,289$</td><td>$19\,780$</td><td>$13\,841$</td><td>$9\,825$</td><td>$9\,591$</td></tr></table>`,
      [
        part("1p-h23-d2-1", "a", r`La $x$ være antall år etter $1950$ og bruk opplysningene i tabellen til å bestemme en modell $F$ som du mener kan brukes til å si noe om antall personer som har hatt fiske som hovedyrke i perioden $1952$ til $2022$.`,
          r`Skriv $x$-verdiene som $2,\ 32,\ 42,\ 52,\ 62,\ 72$. Legg punktene inn i GeoGebra og prøv eksponentiell regresjon («RegEksp»). Se om kurven passer.`,
          [
            r`Med $x$ som antall år etter $1950$ blir punktene $(2,\ 65\,956)$, $(32,\ 25\,289)$, $(42,\ 19\,780)$, $(52,\ 13\,841)$, $(62,\ 9\,825)$ og $(72,\ 9\,591)$.`,
            r`Antallet synker, og nedgangen blir mindre i absolutte tall. Det passer med en eksponentiell modell $F(x) = a\cdot b^{x}$ med $b < 1$. Vi legger punktene inn i regnearket i GeoGebra og velger regresjon med eksponentialfunksjon.`,
            r`Resultat: $a \approx 66\,360$ og $b \approx 0{,}9714$. Modellen er $F(x) = 66\,360\cdot 0{,}9714^{x}$. Den gir f.eks. $F(2) \approx 62\,600$, $F(32) \approx 26\,300$ og $F(72) \approx 8\,200$. Det er et tydelig avvik for $2022$ (modell $8\,200$ mot virkelig $9\,591$), men kurven følger hovedtrenden.`,
            r`Kommentar: Et andregradspolynom passer enda bedre i punktene, men grafen snur fra synkende til stigende omkring $x \approx 69$ (år $2019$). Det er urealistisk, så vi velger den eksponentielle modellen.`,
            r`<strong>Svar:</strong> $F(x) = 66\,360\cdot 0{,}9714^{x}$, der $x$ er antall år etter $1950$ ($2 \le x \le 72$). (Oppgaven er åpen. Andre modeller kan gi full uttelling hvis de er godt begrunnet.)`,
          ]),
        part("1p-h23-d2-1", "b", r`Hvor mange personer i Norge vil ha fiske som hovedyrke i $2050$ ifølge modellen fra oppgave a)? Vurder modellens gyldighetsområde.`,
          r`$2050$ svarer til $x = 100$. Hvilke $x$-verdier bygger modellen på?`,
          [
            r`År $2050$ gir $x = 2050 - 1950 = 100$.`,
            r`$F(100) = 66\,360\cdot 0{,}9714^{100} \approx 3\,700$.`,
            r`Gyldighetsområde: Modellen bygger på data fra $x = 2$ til $x = 72$ ($1952$ til $2022$). $x = 100$ ligger $28$ år utenfor. De siste ti årene er tallet nesten uendret ($9\,825$ til $9\,591$), mens modellen faller videre. Modellen ligger allerede under virkelig verdi i $2022$, så den kan undervurdere antallet i $2050$. Modellen gir aldri $0$, men det kan i virkeligheten skje at yrket forsvinner.`,
            r`<strong>Svar:</strong> Ifølge modellen vil omtrent $3\,700$ personer ha fiske som hovedyrke i $2050$. Svaret er usikkert, fordi $2050$ ligger utenfor området $1952$ til $2022$ som modellen bygger på.`,
          ]),
        part("1p-h23-d2-1", "c", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(30,\ F(30))$ og $(70,\ F(70))$. Gi en praktisk tolkning av svaret.`,
          r`Stigningstallet er $\dfrac{F(70) - F(30)}{70 - 30}$. Det er gjennomsnittlig vekstfart.`,
          [
            r`$F(30) = 66\,360\cdot 0{,}9714^{30} \approx 27\,800$ og $F(70) = 66\,360\cdot 0{,}9714^{70} \approx 8\,700$.`,
            r`Stigningstallet er $a = \dfrac{F(70) - F(30)}{70 - 30} \approx \dfrac{8\,727 - 27\,817}{40} \approx -477$.`,
            r`Tolkning: $x = 30$ er $1980$ og $x = 70$ er $2020$. Stigningstallet er gjennomsnittlig endring per år.`,
            r`<strong>Svar:</strong> Stigningstallet er omtrent $-477$. Ifølge modellen sank antall personer med fiske som hovedyrke i gjennomsnitt med omtrent $477$ personer per år fra $1980$ til $2020$.`,
          ]),
      ],
      ["regresjon", "eksponentialfunksjoner", "modeller", "gjennomsnittlig vekstfart", "GeoGebra"]),
    single("1p-h23-d2-2", "2", 0,
      r`Sofie har et rektangelformet uteområde. Hun vil endre på dette området ved å øke lengden med $10\ \%$ og redusere bredden med $20\ \%$.<br>Hvor stor vil den prosentvise endringen av arealet bli?`,
      r`Arealet er lengde ganger bredde. Gang vekstfaktorene sammen.`,
      [
        r`La lengden være $l$ og bredden $b$, slik at det opprinnelige arealet er $l\cdot b$.`,
        r`Ny lengde: $1{,}10\cdot l$ (økning på $10\ \%$). Ny bredde: $0{,}80\cdot b$ (reduksjon på $20\ \%$).`,
        r`Nytt areal: $1{,}10\,l\cdot 0{,}80\,b = 0{,}88\cdot l\,b$. Vekstfaktoren er $0{,}88$.`,
        r`$0{,}88 - 1 = -0{,}12$, så arealet synker med $12\ \%$.`,
        r`Kontroll med $l = 10$ og $b = 10$: opprinnelig areal $100$, nytt areal $11\cdot 8 = 88$. Det er $12\ \%$ lavere. ✓`,
        r`<strong>Svar:</strong> Arealet blir $12\ \%$ mindre.`,
      ],
      ["prosent", "vekstfaktor", "areal"]),
    multi("1p-h23-d2-3", "3", 0,
      r`Opplysningene nedenfor er hentet fra nrk.no.<ul><li>Vi spiser omtrent $500$ millioner pølser i Norge hvert år.</li><li>$13$ millioner av disse pølsene spiser vi $17$. mai.</li><li>Om vi hadde lagt alle pølsene nordmenn spiser i løpet av ett år etter hverandre, ville vi kommet to og en halv gang rundt jorda.</li></ul>`,
      [
        part("1p-h23-d2-3", "a", r`Hvor mange pølser spiser vi i gjennomsnitt hvert sekund i Norge?`,
          r`Regn ut hvor mange sekunder det er i et år ($365$ dager à $24$ timer à $60$ minutter à $60$ sekunder).`,
          [
            r`Antall sekunder i et år (ikke skuddår): $365\cdot 24\cdot 60\cdot 60 = 31\,536\,000$.`,
            r`Pølser per sekund: $\dfrac{500\,000\,000}{31\,536\,000} \approx 15{,}9$.`,
            r`<strong>Svar:</strong> Vi spiser i gjennomsnitt omtrent $16$ pølser hvert sekund.`,
          ]),
        part("1p-h23-d2-3", "b", r`Hvor mange prosent av pølsene spiser vi $17$. mai?`,
          r`Prosent er del delt på helhet.`,
          [
            r`$\dfrac{13\,000\,000}{500\,000\,000} = \dfrac{13}{500} = 0{,}026 = 2{,}6\ \%$.`,
            r`<strong>Svar:</strong> Vi spiser $2{,}6\ \%$ av pølsene $17$. mai.`,
          ]),
        part("1p-h23-d2-3", "c", r`Jordens radius er $6378$ km ved ekvator. Omtrent hvor lang har NRK regnet at en pølse er?`,
          r`Finn omkretsen av jorda med $O = 2\pi r$. Gang med $2{,}5$ og del på antall pølser.`,
          [
            r`Jordens omkrets ved ekvator: $O = 2\pi r = 2\cdot \pi\cdot 6378 \approx 40\,074$ km.`,
            r`Å gå $2{,}5$ ganger rundt jorda er $2{,}5\cdot 40\,074 \approx 100\,185$ km $= 100\,185\,000$ m.`,
            r`Lengde per pølse: $\dfrac{100\,185\,000\text{ m}}{500\,000\,000} \approx 0{,}20$ m $= 20$ cm.`,
            r`<strong>Svar:</strong> NRK har regnet at en pølse er omtrent $20$ cm lang.`,
          ]),
      ],
      ["enheter", "store tall", "prosent", "omkrets"]),
    single("1p-h23-d2-4", "4", 0,
      r`Snorre har en hund som heter Mira. Mira har spist $200$ g melkesjokolade. Snorre har hørt at sjokolade er giftig for hunder, og lurer på hva han skal gjøre. Han finner informasjonen nedenfor på helsenorge.no.<ul><li>Sjokolade inneholder teobromin, som er giftig for hunder.</li><li>I norsk melkesjokolade er det ca. $1{,}2$ mg teobromin per gram sjokolade.</li><li>Hunder som har spist mer enn $20$ mg teobromin per kg kroppsvekt, kan få kliniske tegn på forgiftning.</li><li>Kontakt veterinær hvis hunden din har spist en giftig mengde sjokolade.</li></ul>Gjør antakelser og beregninger, og vurder om Snorre bør kontakte veterinær.`,
      r`Regn ut hvor mye teobromin Mira har fått i seg. Del på vekten $w$ kg for å få mg per kg, og sammenlign med $20$. Vekten er ikke oppgitt, så du må gjøre en antakelse.`,
      [
        r`Mengde teobromin: $200\text{ g}\cdot 1{,}2\ \dfrac{\text{mg}}{\text{g}} = 240$ mg.`,
        r`Mira har vekt $w$ kg, så hun har fått i seg $\dfrac{240}{w}$ mg per kg. Forgiftningsgrensen er $20$ mg per kg.`,
        r`Mira har spist over grensen når $\dfrac{240}{w} > 20$, altså $w < \dfrac{240}{20} = 12$ kg.`,
        r`Antakelse A: Mira er en liten hund på $8$ kg. Da har hun fått $\dfrac{240}{8} = 30$ mg/kg, som er over grensen på $20$ mg/kg.`,
        r`Antakelse B: Mira er en mellomstor hund på $15$ kg. Da har hun fått $\dfrac{240}{15} = 16$ mg/kg, som er under grensen, men ikke langt unna. Er hun bare $12$ kg, er hun akkurat på grensen.`,
        r`<strong>Svar:</strong> Mira har spist $240$ mg teobromin. Hvis hun veier under $12$ kg, har hun fått i seg en giftig mengde, og Snorre bør kontakte veterinær. Veier hun mer, er hun under grensen, men siden grensen ikke er langt unna for en mellomstor hund, og fordi sjokoladeinnholdet bare er et omtrentlig tall, bør Snorre ringe veterinæren for å være på den sikre siden. (Oppgaven er åpen. Dette er ett mulig løsningsforslag.)`,
      ],
      ["enheter", "antakelser", "modellering"]),
    single("1p-h23-d2-5", "5", 0,
      r`<em>Denne oppgaven vektes tre ganger så mye som en vanlig deloppgave.</em><br>Klassen til Maria og Marta arbeider med oppgaven nedenfor.<br><strong>Et rektangel er innskrevet i en likebeint, rettvinklet trekant. Trekanten har hjørner i punktene $A(-6,\ 0)$, $B(6,\ 0)$ og $C(0,\ 6)$. Punktet $P$ er et hjørne i rektangelet og ligger på linjestykket $BC$. Bestem koordinatene til punktet $P$ slik at arealet av rektangelet blir størst mulig.</strong>` +
        figur("p1-h23-d2-5", "5", "Koordinatsystem (GeoGebra-stil) med trekant ABC: A(−6, 0), B(6, 0), C(0, 6). Et rektangel er innskrevet slik at det ene sidene ligger på AB og de to øvre hjørnene ligger på AC og BC. Punktet P(x, y) er øvre høyre hjørne på linjestykket BC. Rektangelet er symmetrisk om y-aksen. A, B, C og P er merket.") +
        r`Martin og Maria diskuterer hvordan de skal komme i gang, og vurderer ulike strategier.<br><strong>Martin:</strong> «Skal vi begynne med å prøve oss litt fram? Vi lager en oversikt som viser arealet av ulike rektangler.»<br><strong>Maria:</strong> «Ja, det kan vi gjøre. Vi kan starte med å velge $x = 1$. Da blir $y = 5$ fordi $y = 6 - x$.»<br><strong>Martin:</strong> «Hvordan kan du se det? Og hvordan kan vi finne arealet dersom vi vet at $x = 1$ og $y = 5$?»<br><strong>Maria:</strong> «Jeg kan vise deg det! Husk hva vi har lært om rette linjer.»<br><strong>Martin:</strong> «Jeg tror også vi bør sette opp et funksjonsuttrykk som viser arealet, og tegne en graf. Da kan vi bruke funksjonen til å vise at det vi kommer fram til når vi prøver oss fram, er riktig.»<br>Ta utgangspunkt i samtalen mellom Martin og Maria, og løs oppgaven klassen har fått.`,
      r`Linjen gjennom $B$ og $C$ er $y = 6 - x$. Rektangelet er symmetrisk om $y$-aksen, så bredden er $2x$ og høyden er $y$. Lag en tabell og et funksjonsuttrykk for arealet.`,
      [
        r`<strong>Hvorfor $y = 6 - x$:</strong> Linjen gjennom $B(6,\ 0)$ og $C(0,\ 6)$ har stigningstall $\dfrac{6 - 0}{0 - 6} = -1$ og skjærer $y$-aksen i $6$. Altså $y = -x + 6 = 6 - x$.`,
        r`<strong>Areal for $x = 1$:</strong> Da er $y = 6 - 1 = 5$. Rektangelet har hjørner på linjene $AC$ og $BC$, som er symmetriske om $y$-aksen. Bredden er $2x = 2$ og høyden er $y = 5$. Arealet er $2\cdot 5 = 10$.`,
        r`<strong>Prøve seg fram:</strong> <table><tr><th>$x$</th><th>$y = 6 - x$</th><th>Bredde $2x$</th><th>Areal $2x\cdot y$</th></tr><tr><td>$1$</td><td>$5$</td><td>$2$</td><td>$10$</td></tr><tr><td>$2$</td><td>$4$</td><td>$4$</td><td>$16$</td></tr><tr><td>$3$</td><td>$3$</td><td>$6$</td><td>$18$</td></tr><tr><td>$4$</td><td>$2$</td><td>$8$</td><td>$16$</td></tr><tr><td>$5$</td><td>$1$</td><td>$10$</td><td>$10$</td></tr></table>Arealet er størst for $x = 3$ i tabellen.`,
        r`<strong>Funksjon for arealet:</strong> $A(x) = 2x\cdot y = 2x\,(6 - x) = 12x - 2x^{2}$, for $0 < x < 6$.`,
        r`<strong>Graf:</strong> Grafen til $A$ er en parabel som vender nedover. Toppunktet ligger midt mellom nullpunktene $x = 0$ og $x = 6$, altså ved $x = 3$. Grafisk (GeoGebra, ekstremalpunkt) får vi toppunkt $(3,\ 18)$. Det bekrefter tabellen.`,
        r`Da er $y = 6 - 3 = 3$, og det største arealet er $A(3) = 12\cdot 3 - 2\cdot 3^{2} = 36 - 18 = 18$.`,
        r`<strong>Svar:</strong> Arealet blir størst når $P = (3,\ 3)$. Rektangelet har da bredde $6$, høyde $3$ og areal $18$.`,
      ],
      ["optimering", "andregradsfunksjoner", "lineære funksjoner", "GeoGebra"]),
    multi("1p-h23-d2-6", "6", 0,
      r`I denne oppgaven skal du arbeide med linjestykker som settes sammen til en figur.<br>Skissen nedenfor viser de $16$ første linjestykkene i figuren. Lengden av et linjestykke er alltid $90\ \%$ av lengden av det forrige linjestykket. Det første linjestykket er $100$ cm langt.` +
        figur("p1-h23-d2-6", "6", "Sikksakkmønster (firkantbølge) av 16 linjestykker som blir stadig kortere mot høyre. Linjestykkene ligger vekselvis loddrett (lysegrønne) og vannrett (mørkegrå). Første linjestykke er loddrett, $100$ cm (merket «100 cm»), og går oppover til øverste venstre hjørne. Så følger et vannrett stykke på $90$ cm mot høyre (merket «90 cm»), et loddrett stykke på $81$ cm nedover, et vannrett på $72{,}9$ cm mot høyre, et loddrett oppover på ca. $65{,}6$ cm, og så videre. Mønsteret går vekselvis ned og opp mens hvert stykke er 90 % av det forrige."),
      [
        part("1p-h23-d2-6", "a", r`Bestem summen av lengdene av de $8$ første linjestykkene i figuren.`,
          r`Lengdene er $100,\ 90,\ 81,\ \ldots$ Det er en geometrisk rekke med første ledd $100$ og vekstfaktor $0{,}9$. Bruk summeformelen.`,
          [
            r`Lengdene er $100,\ 100\cdot 0{,}9,\ 100\cdot 0{,}9^{2},\ \ldots,\ 100\cdot 0{,}9^{7}$.`,
            r`Summen av en geometrisk rekke: $S_{n} = a_{1}\cdot \dfrac{1 - k^{n}}{1 - k}$. Her er $a_{1} = 100$, $k = 0{,}9$ og $n = 8$.`,
            r`$S_{8} = 100\cdot \dfrac{1 - 0{,}9^{8}}{1 - 0{,}9} = 1000\,(1 - 0{,}9^{8}) = 1000\cdot (1 - 0{,}4305) \approx 569{,}5$ cm.`,
            r`Kontroll ved å legge sammen leddene: $100 + 90 + 81 + 72{,}9 + 65{,}61 + 59{,}05 + 53{,}14 + 47{,}83 \approx 569{,}5$. ✓`,
            r`<strong>Svar:</strong> Summen av de $8$ første linjestykkene er omtrent $570$ cm (altså $5{,}7$ m).`,
          ]),
        part("1p-h23-d2-6", "b", r`<em>Denne deloppgaven vektes $1{,}5$ ganger så mye som en vanlig deloppgave.</em><br>Lag et program som du kan bruke til å bestemme summen av lengdene av linjestykkene dersom det er mange linjestykker i figuren. Hvor mange linjestykker må vi ha med i figuren dersom summen av lengdene skal bli minst $9$ meter?`,
          r`$9$ m $= 900$ cm. La programmet legge til ett og ett linjestykke i en løkke og telle til summen er minst $900$.`,
          [
            r`Programmet legger til lengden av neste linjestykke og ganger lengden med $0{,}9$ for hvert trinn, helt til summen er minst $900$ cm:<pre><code>lengde = 100
s = 0
n = 0

while s &lt; 900:
    s = s + lengde
    lengde = lengde * 0.9
    n = n + 1

print(n, s)</code></pre>`,
            r`Kjører vi programmet, får vi $n = 22$ og $s \approx 901{,}5$.`,
            r`Kontroll med formelen: $S_{n} = 1000\,(1 - 0{,}9^{n}) \ge 900$ gir $0{,}9^{n} \le 0{,}1$. Med $n = 21$ er $S_{21} \approx 890{,}6$ (for lite), og med $n = 22$ er $S_{22} \approx 901{,}5$ (nok).`,
            r`<strong>Svar:</strong> Vi må ha med $22$ linjestykker for at summen skal bli minst $9$ meter.`,
          ]),
        part("1p-h23-d2-6", "c", r`Hvor mange prosent øker summen av lengdene dersom vi øker antall linjestykker i figuren fra $50$ til $100$?`,
          r`Regn ut $S_{50}$ og $S_{100}$ og finn prosentvis endring.`,
          [
            r`$S_{50} = 1000\,(1 - 0{,}9^{50}) \approx 994{,}85$ cm og $S_{100} = 1000\,(1 - 0{,}9^{100}) \approx 999{,}97$ cm.`,
            r`Prosentvis endring: $\dfrac{999{,}97 - 994{,}85}{994{,}85} \approx 0{,}0051 = 0{,}5\ \%$.`,
            r`Det er rimelig: Summen nærmer seg $1000$ cm ($10$ m), så flere linjestykker bidrar nesten ingenting.`,
            r`<strong>Svar:</strong> Summen øker med omtrent $0{,}5\ \%$.`,
          ]),
      ],
      ["geometriske rekker", "programmering", "prosent"]),
    multi("1p-h23-d2-7", "7", 0,
      r`Nedenfor ser du en ellipse med sentrum i $S$. Linjestykket $SA = a$ kalles den store halvaksen, og linjestykket $SB = b$ kalles den lille halvaksen.` +
        figur("p1-h23-d2-7", "7", "Ellipse med sentrum S. Horisontal halvakse SA = a (til høyre, ut til punktet A på ellipsen) og vertikal halvakse SB = b (oppover, ut til punktet B på ellipsen) er tegnet som grønne linjestykker og merket a og b. S, A og B er markert med punkter.") +
        r`Den indiske matematikeren Ramanujan kom fram til en formel for omkretsen av en ellipse. Ifølge formelen er omkretsen $O$ tilnærmet gitt ved $$O \approx \pi\,(a + b)\left(1 + \dfrac{3h}{10 + \sqrt{4 - 3h}}\right)$$ der $h = \left(\dfrac{a - b}{a + b}\right)^{2}$ og $a$ og $b$ er store og lille halvakse.<br>Mari har tegnet en ellipse der $a = 3$ cm og $b = 2$ cm ved hjelp av et digitalt verktøy. Hun har funnet at ellipsen har en omkrets på $15{,}865$ cm.`,
      [
        part("1p-h23-d2-7", "a", r`Bruk Ramanujans formel, og bestem $O$ når $a = 3$ og $b = 2$. Sammenlikn med svaret Mari har funnet.`,
          r`Regn først ut $h$, og sett så inn i formelen.`,
          [
            r`$h = \left(\dfrac{3 - 2}{3 + 2}\right)^{2} = \left(\dfrac{1}{5}\right)^{2} = \dfrac{1}{25} = 0{,}04$.`,
            r`$O \approx \pi\cdot (3 + 2)\left(1 + \dfrac{3\cdot 0{,}04}{10 + \sqrt{4 - 3\cdot 0{,}04}}\right) = 5\pi\left(1 + \dfrac{0{,}12}{10 + \sqrt{3{,}88}}\right)$.`,
            r`$\sqrt{3{,}88} \approx 1{,}9698$, så brøken er $\dfrac{0{,}12}{11{,}9698} \approx 0{,}01003$ og $O \approx 5\pi\cdot 1{,}01003 \approx 15{,}865$.`,
            r`Kontroll: $5\pi \approx 15{,}708$ og $15{,}708\cdot 1{,}01003 \approx 15{,}865$. Det samme som Mari fikk.`,
            r`<strong>Svar:</strong> Formelen gir $O \approx 15{,}865$ cm. Det stemmer med Maris verdi på $15{,}865$ cm (til tre desimaler).`,
          ]),
        part("1p-h23-d2-7", "b", r`Undersøk om Ramanujans formel gjelder i det spesialtilfellet at ellipsen er en sirkel.`,
          r`En ellipse er en sirkel når $a = b = r$. Hva blir $h$? Hva er omkretsen av en sirkel?`,
          [
            r`Er ellipsen en sirkel, er $a = b = r$ (begge halvaksene er radien).`,
            r`Da er $h = \left(\dfrac{r - r}{r + r}\right)^{2} = 0$.`,
            r`Formelen gir $O \approx \pi\,(r + r)\left(1 + \dfrac{3\cdot 0}{10 + \sqrt{4 - 0}}\right) = 2\pi r\cdot \left(1 + \dfrac{0}{12}\right) = 2\pi r\cdot 1 = 2\pi r$.`,
            r`<strong>Svar:</strong> Ja. For en sirkel gir formelen $O = 2\pi r$, som er den vanlige formelen for omkretsen av en sirkel (og her er formelen eksakt).`,
          ]),
      ],
      ["formler", "omkrets", "kvadratrot", "sirkel"]),
    single("1p-h23-d2-8", "8", 0,
      r`Grafen nedenfor viser hvordan farten til en racerbil har variert gjennom en runde av et billøp.` +
        figur("p1-h23-d2-8", "8", "Del 1: Graf med «Tilbakelagt strekning» på førsteaksen og «Fart» på andreaksen. Farten er konstant høy, men det er tre nedsenkninger (dumper) i grafen: første dump er medium dyp og smal (omtrent 70 enheter etter start), andre dump er den dypeste og smaleste (omtrent midt i løpet), tredje dump er den grunneste og bredeste (omtrent 3/4 ut i runden). Mellom dumpene er det lange flate stykker med konstant høy fart, og etter tredje dump er det et kortere flatt stykke til runden er ferdig. Del 2: Seks baner merket A til F, hver med en rød markering som viser start og piler som viser kjøreretning. A: uregelmessig stjerne/propell med mange svinger. B: langstrakt trekant med to avrundede hjørner til venstre og ett spisst hjørne til høyre, start på venstre side, kjøreretning opp og så langs toppen mot høyre. C: firkant (trapes) med to rette vinkler. D: avlang avrundet rektangel med tre hakk (små dumper) på toppsiden. E: likesidet trekant. F: skjev, spiss trekant, start midt på venstre side.") +
        r`Bilen har kjørt på en av banene nedenfor, og runden har startet ved den røde markeringen.<br>Hvilken bane har bilen kjørt på? Husk å argumentere for at svaret ditt er riktig.`,
      r`Hver dump i fartsgrafen svarer til et sted bilen må senke farten, altså en sving. Dypere dump er skarpere sving. Sammenlign antall dumper, hvor dype de er, og avstandene mellom dem, med hver bane.`,
      [
        r`<strong>Hva grafen forteller:</strong> Det er tre dumper. De er ulike: dump $1$ er middels dyp, dump $2$ er dypest, og dump $3$ er grunnest og bredest (en slakk sving). Det er korte flate stykker før første dump og etter siste dump, og lange flate stykker mellom dumpene. Mellom dump $1$ og $2$ og mellom $2$ og $3$ er avstanden omtrent lik.`,
        r`<strong>A:</strong> Banen har mange svinger, men grafen har bare tre. Nei.`,
        r`<strong>C:</strong> Banen har fire hjørner (fire sving), men grafen har tre dumper. Nei.`,
        r`<strong>E:</strong> Likesidet trekant: tre like hjørner gir tre like dype dumper med lik avstand. Grafen har ulike dumper. Nei.`,
        r`<strong>D:</strong> Tre hakk, men alle på samme side, tett på hverandre. I tillegg ville endene av den avlange formen gitt flere sving, slik at grafen måtte hatt minst fem dumper, ikke tre. Etter siste hakk skulle det vært en veldig lang rett strekning (resten av runden). På grafen er det bare et kort flatt stykke etter tredje dump. Nei.`,
        r`<strong>F:</strong> Starten ligger midt på venstre side, og første hjørne er det spisse hjørnet øverst. Det ville gitt en dyp første dump, men grafen har første dump middels dyp og dypeste i midten. Nei.`,
        r`<strong>B:</strong> Starten ligger like ved det avrundede hjørnet øverst til venstre (kort strekning, middels dyp dump), så følger lang topplinje til det spisse hjørnet (dypeste dump), deretter lang bunnlinje til det avrundede hjørnet nede til venstre (grunneste dump), og så et kort stykke opp til start. Det passer med alle tre dumpene og avstandene.`,
        r`<strong>Svar:</strong> Bilen har kjørt på bane B.`,
      ],
      ["funksjoner", "tolkning av grafer", "argumentasjon"]),
  ],
});
