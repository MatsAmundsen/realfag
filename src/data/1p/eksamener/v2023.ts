import type { Exam } from "../../types";
import { figur, multi, officialExam, part, single, U, udirSource } from "./helpers";

const r = String.raw;

/**
 * Eksamen MAT1019 Matematikk 1P, våren 2023 (26.05.2023). Oppgavetekster: Utdanningsdirektoratet.
 * Løsningsforslag: Matteguidens egne. Del 1 skal leveres etter 1 time.
 * Eksamenen oppgir ingen poeng per oppgave. Hver deloppgave vektes likt, med unntak av oppgave 4a, 4b og 4c i Del 2
 * (halv vekt) og oppgave 5b i Del 2 (dobbel vekt). Derfor står points: 0 (viser ingen poengtall).
 */
export const EKSAMEN_1P_V2023: Exam = officialExam({
  id: "1p-v2023",
  title: "Eksamen vår 2023",
  season: "vår",
  year: 2023,
  date: "26.05.2023",
  del1Minutes: 60,
  totalMinutes: 300,
  source: udirSource("MAT1019 Matematikk 1P", "26.05.2023", "1P_V23_LK20.pdf"),
  del1: [
    single("1p-v23-d1-1", "1", 0,
      U + r`Marko har kjøpt en sjokoladeplate i en butikk. Den kostet $20$ kroner. Mari har kjøpt en sjokoladeplate på en bensinstasjon. Den kostet $50$ kroner.<br><strong>Marko:</strong> «Jeg har regnet og funnet ut at sjokoladeplaten er $150\ \%$ dyrere på bensinstasjonen enn i butikken.»<br><strong>Mari:</strong> «Jeg har regnet og funnet ut at sjokoladeplaten er $60\ \%$ billigere i butikken enn på bensinstasjonen.»<br><strong>Marko:</strong> «Kan vi ha regnet riktig? Hvorfor får vi ulike prosenter? Det var rart.»<br>Gjør beregninger og svar på Marko sine spørsmål.`,
      r`Prosentvis endring er endringen delt på det du sammenligner med. Hva er «det du sammenligner med» i hvert av de to tilfellene?`,
      [
        r`Prisforskjellen er $50 - 20 = 30$ kroner.`,
        r`Bensinstasjonen sammenlignet med butikken (grunnlag $20$ kr): $\dfrac{30}{20} = 1{,}5 = 150\ \%$ dyrere.`,
        r`Butikken sammenlignet med bensinstasjonen (grunnlag $50$ kr): $\dfrac{30}{50} = 0{,}6 = 60\ \%$ billigere.`,
        r`Begge har altså regnet riktig. Prosentene er ulike fordi forskjellen på $30$ kr er regnet i forhold til ulike grunnlag: $20$ kr i det ene tilfellet og $50$ kr i det andre. $30$ kr er mye av $20$ kr, men mindre av $50$ kr.`,
        r`<strong>Svar:</strong> Ja, begge kan ha regnet riktig. Prosentene blir ulike fordi vi regner prosent av ulike utgangspriser ($20$ kr og $50$ kr).`,
      ],
      ["prosent", "prosentvis endring", "tolkning"]),
    single("1p-v23-d1-2", "2", 0,
      U + r`<ul><li>Tall fra FN viser at folketallet på jorden nå har passert $8$ milliarder.</li><li>Forskere har kommet fram til at det er omtrent $2{,}5$ millioner ganger så mange maur som mennesker på jorden.</li></ul>Omtrent hvor mange maur er det på jorden? Skriv svaret på standardform.`,
      r`Skriv begge tallene på standardform og gang: ganger tallene og legg sammen eksponentene.`,
      [
        r`$8$ milliarder $= 8\cdot 10^{9}$ og $2{,}5$ millioner $= 2{,}5\cdot 10^{6}$.`,
        r`Antall maur: $8\cdot 10^{9}\cdot 2{,}5\cdot 10^{6} = (8\cdot 2{,}5)\cdot 10^{9+6} = 20\cdot 10^{15}$.`,
        r`Standardform krever et tall mellom $1$ og $10$ foran tierpotensen: $20\cdot 10^{15} = 2\cdot 10^{1}\cdot 10^{15} = 2\cdot 10^{16}$.`,
        r`<strong>Svar:</strong> Det er omtrent $2\cdot 10^{16}$ maur på jorden.`,
      ],
      ["standardform", "potenser"]),
    multi("1p-v23-d1-3", "3", 0,
      U + r`Du skal gi eksempler på praktiske situasjoner. Tegn grafene for hånd i besvarelsen din.`,
      [
        part("1p-v23-d1-3", "a", r`Gi et eksempel på en praktisk situasjon der to størrelser er proporsjonale. Begrunn at størrelsene er proporsjonale. Tegn en graf som viser sammenhengen mellom størrelsene.`,
          r`Velg en situasjon med fast pris per enhet. Proporsjonale størrelser har et konstant forhold $y/x$, og grafen er en rett linje gjennom origo.`,
          [
            r`Eksempel: Bensin koster $20$ kr per liter. Prisen $y$ (kr) for $x$ liter er $y = 20x$.`,
            r`<table><tr><th>Liter $x$</th><td>0</td><td>10</td><td>20</td><td>30</td></tr><tr><th>Pris $y$ (kr)</th><td>$0$</td><td>$200$</td><td>$400$</td><td>$600$</td></tr></table>`,
            r`Begrunnelse: Forholdet $\dfrac{y}{x}$ er hele tiden $\dfrac{200}{10} = \dfrac{400}{20} = \dfrac{600}{30} = 20$. Dobler vi antall liter, dobles prisen. Størrelsene er derfor proporsjonale.`,
            r`Graf: Sett liter langs førsteaksen og pris langs andreaksen. Punktene $(0,\ 0)$, $(10,\ 200)$, $(20,\ 400)$ og $(30,\ 600)$ ligger på en rett linje som går gjennom origo og stiger med stigningstall $20$.`,
            r`<strong>Svar:</strong> Bensinprisen ($y = 20x$) er proporsjonal med antall liter. Grafen er en rett linje gjennom origo.`,
          ]),
        part("1p-v23-d1-3", "b", r`Gi et eksempel på en praktisk situasjon der to størrelser er omvendt proporsjonale. Begrunn at størrelsene er omvendt proporsjonale. Tegn en graf som viser sammenhengen mellom størrelsene.`,
          r`Omvendt proporsjonale størrelser har et konstant produkt $x\cdot y$. Tenk på tid og fart for en fast strekning.`,
          [
            r`Eksempel: En bil kjører en fast strekning på $120$ km. Kjøretiden $t$ (timer) er $t = \dfrac{120}{v}$, der $v$ er farten i km/t.`,
            r`<table><tr><th>Fart $v$ (km/t)</th><td>$30$</td><td>$40$</td><td>$60$</td><td>$120$</td></tr><tr><th>Tid $t$ (timer)</th><td>$4$</td><td>$3$</td><td>$2$</td><td>$1$</td></tr></table>`,
            r`Begrunnelse: Produktet $v\cdot t$ er konstant: $30\cdot 4 = 40\cdot 3 = 60\cdot 2 = 120\cdot 1 = 120$. Dobler vi farten, halveres tiden. Størrelsene er derfor omvendt proporsjonale.`,
            r`Graf: Sett farten langs førsteaksen og tiden langs andreaksen. Punktene $(30,\ 4)$, $(40,\ 3)$, $(60,\ 2)$ og $(120,\ 1)$ ligger på en kurve som synker bratt først og flater ut mot førsteaksen. Kurven treffer verken aksene.`,
            r`<strong>Svar:</strong> Kjøretiden ($t = \dfrac{120}{v}$) er omvendt proporsjonal med farten. Grafen er en synkende kurve (hyperbel) i første kvadrant.`,
          ]),
      ],
      ["proporsjonalitet", "omvendt proporsjonalitet", "grafer"]),
    multi("1p-v23-d1-4", "4", 0,
      U + r`Tabellen nedenfor viser høyden til Klara noen år fra hun var $4$ år, til hun var $10$ år.<table><tr><th>Alder (år)</th><td>$4$</td><td>$5$</td><td>$8$</td><td>$10$</td></tr><tr><th>Høyde (cm)</th><td>$100$</td><td>$107$</td><td>$128$</td><td>$142$</td></tr></table>`,
      [
        part("1p-v23-d1-4", "a", r`Lag en modell som viser sammenhengen mellom høyden og alderen til Klara basert på tallene i tabellen.`,
          r`Finn hvor mange centimeter Klara vokser per år mellom hvert par av målinger. Er veksten like stor hver gang?`,
          [
            r`Fra $4$ til $5$ år: $\dfrac{107 - 100}{5 - 4} = 7$ cm per år.`,
            r`Fra $5$ til $8$ år: $\dfrac{128 - 107}{8 - 5} = \dfrac{21}{3} = 7$ cm per år.`,
            r`Fra $8$ til $10$ år: $\dfrac{142 - 128}{10 - 8} = \dfrac{14}{2} = 7$ cm per år.`,
            r`Veksten er $7$ cm per år hver gang, så punktene ligger på en rett linje med stigningstall $7$. Modellen er $H(x) = 7x + b$, der $H(x)$ er høyden i cm ved alder $x$ år.`,
            r`Punktet $(4,\ 100)$ gir $100 = 7\cdot 4 + b$, så $b = 100 - 28 = 72$.`,
            r`Kontroll: $H(8) = 7\cdot 8 + 72 = 128$ og $H(10) = 7\cdot 10 + 72 = 142$. Begge stemmer med tabellen.`,
            r`<strong>Svar:</strong> $H(x) = 7x + 72$, der $x$ er alder i år og $H(x)$ er høyde i cm.`,
          ]),
        part("1p-v23-d1-4", "b", r`Hvor høy vil Klara være når hun fyller $19$ år, ifølge modellen?`,
          r`Sett $x = 19$ inn i modellen.`,
          [
            r`$H(19) = 7\cdot 19 + 72 = 133 + 72 = 205$.`,
            r`<strong>Svar:</strong> Ifølge modellen vil Klara være $205$ cm høy når hun fyller $19$ år.`,
          ]),
        part("1p-v23-d1-4", "c", r`Klara var $50$ cm høy da hun ble født. Gjør beregninger og vurder gyldighetsområdet til modellen du fant i oppgave a).`,
          r`Regn ut hva modellen sier ved fødselen ($x = 0$), og vurder om svaret i b) er realistisk.`,
          [
            r`Ved fødselen er $x = 0$. Modellen gir $H(0) = 7\cdot 0 + 72 = 72$ cm, men Klara var $50$ cm. Avviket er $22$ cm. Modellen gjelder derfor ikke helt tilbake til fødselen.`,
            r`Ved $19$ år gir modellen $205$ cm. Det er svært høyt for en jente, og veksten vil i virkeligheten flate ut. Modellen kan derfor ikke brukes helt opp til $19$ år.`,
            r`Modellen stemmer for alle fire målingene, så den er gyldig i området der vi har data: $4 \le x \le 10$. Rett utenfor dette området kan den være en rimelig grov tilnærming, men aldri helt ned til $0$ år eller opp til $19$ år.`,
            r`<strong>Svar:</strong> Modellen er gyldig for omtrent $4 \le x \le 10$ år. Den gjelder ikke for $x = 0$ ($72$ cm mot virkelig $50$ cm) og ikke for $x = 19$ ($205$ cm er urealistisk).`,
          ]),
      ],
      ["lineære funksjoner", "modellering", "gyldighetsområde"]),
  ],
  del2: [
    multi("1p-v23-d2-1", "1", 0,
      r`De siste årene har Lars bodd på Svalbard fra 1. februar til 1. oktober. Hvert år har han målt temperaturen utenfor huset sitt på ulike tidspunkt noen dager hver uke.<br>Han har funnet at funksjonen $T$ gitt ved<br>$$T(x) = 0{,}048x^{4} - 1{,}4x^{3} + 13{,}36x^{2} - 45{,}8x + 35{,}2,\qquad 2 \le x \le 10$$<br>er en rimelig bra modell for gjennomsnittstemperaturen $T(x)\ ^{\circ}$C hvert døgn de månedene han bor på Svalbard, når han lar $x = 2$ svare til 1. februar, $x = 3$ til 1. mars, $x = 4$ til 1. april og så videre.`,
      [
        part("1p-v23-d2-1", "a", r`Omtrent hvor mange døgn i perioden 1. februar til 1. oktober er gjennomsnittstemperaturen over $0\ ^{\circ}$C ifølge modellen?`,
          r`Tegn grafen til $T$ i GeoGebra for $2 \le x \le 10$ og finn skjæringspunktene med førsteaksen. Gjør forskjellen i $x$ om til døgn.`,
          [
            r`Vi løser $T(x) = 0$ med CAS/skjæring i GeoGebra for $2 \le x \le 10$: $x \approx 5{,}77$ og $x \approx 8{,}91$.`,
            r`$T(2) \approx -13{,}4$ og $T(10) = -6{,}8$, så temperaturen er under $0$ i begynnelsen og slutten. Grafen ligger over førsteaksen mellom de to nullpunktene.`,
            r`Lengden på intervallet er $8{,}91 - 5{,}77 \approx 3{,}13$ måneder.`,
            r`Gjør om til døgn: Én enhet i $x$ er én måned, og vi bruker de faktiske månedslengdene. $x \approx 5{,}77$ er om lag $0{,}77$ av mai ($31$ døgn), altså omtrent 24. mai. $x \approx 8{,}91$ er om lag $0{,}91$ av august ($31$ døgn), altså omtrent 29. august.`,
            r`Fra omtrent 24. mai til omtrent 29. august er det $(31 - 23{,}9) + 30 + 31 + 28{,}1 \approx 96$ døgn.`,
            r`<strong>Svar:</strong> Gjennomsnittstemperaturen er over $0\ ^{\circ}$C i omtrent $96$ døgn, fra slutten av mai til slutten av august.`,
          ]),
        part("1p-v23-d2-1", "b", r`Bestem stigningstallet til den rette linjen som går gjennom punktene $(3,\ T(3))$ og $(7,\ T(7))$. Gi en praktisk tolkning av dette stigningstallet.`,
          r`Regn ut $T(3)$ og $T(7)$ og bruk $a = \dfrac{\Delta y}{\Delta x}$. Husk hva $x$ og $T$ betyr.`,
          [
            r`$T(3) = 0{,}048\cdot 81 - 1{,}4\cdot 27 + 13{,}36\cdot 9 - 45{,}8\cdot 3 + 35{,}2 = -15{,}872$.`,
            r`$T(7) = 0{,}048\cdot 2401 - 1{,}4\cdot 343 + 13{,}36\cdot 49 - 45{,}8\cdot 7 + 35{,}2 = 4{,}288$.`,
            r`Stigningstall: $a = \dfrac{T(7) - T(3)}{7 - 3} = \dfrac{4{,}288 - (-15{,}872)}{4} = \dfrac{20{,}16}{4} = 5{,}04$.`,
            r`Tolkning: $x = 3$ er 1. mars og $x = 7$ er 1. juli, så $\Delta x = 4$ er fire måneder, og $T$ er temperatur i $^{\circ}$C.`,
            r`<strong>Svar:</strong> Stigningstallet er $5{,}04$. Fra 1. mars til 1. juli stiger gjennomsnittstemperaturen i gjennomsnitt med omtrent $5{,}0\ ^{\circ}$C per måned.`,
          ]),
      ],
      ["polynomfunksjoner", "gjennomsnittlig vekstfart", "GeoGebra", "tolkning"]),
    single("1p-v23-d2-2", "2", 0,
      r`En dag går Aurora med jevn fart fra huset der hun bor, til postkontoret, som ligger noen kilometer unna. Hun står i kø for å hente en pakke. Når hun har fått pakken, går hun med jevn fart hjem igjen.<br>Hvilken av de grafiske framstillingene A, B, C og D nedenfor beskriver best lengden av turen som en funksjon av tiden? Husk å begrunne svaret ditt.` +
        figur("p1-v23-d2-2", "2", "Fire små grafer A, B, C og D, hver med «x minutter» på førsteaksen og «y kilometer» på andreaksen. A: en S-formet kurve som stiger, flater ut og stiger igjen. B: en kurve som stiger til en topp og deretter synker (parabellignende). C: en rett linje som stiger, har et kort vannrett stykke og deretter stiger videre med samme helning som først. D: en rett linje som stiger, et vannrett stykke på toppen og deretter en rett linje som synker tilbake til første aksen."),
      r`Tenk gjennom hva «lengden av turen» gjør i hver av de tre delene: gå, stå i kø, gå hjem. Hva betyr «jevn fart» for grafens form?`,
      [
        r`«Lengden av turen» er hvor langt Aurora til sammen har gått. Den kan aldri minke, selv om hun går hjem.`,
        r`Jevn fart på veien til postkontoret betyr at strekningen vokser like mye per minutt. Grafen er da en rett linje som stiger.`,
        r`I køen står hun stille. Ingen ny strekning legges til, så grafen er vannrett i denne perioden.`,
        r`Når hun går hjem med jevn fart, øker den totale strekningen igjen med like mye per minutt. Grafen stiger som en ny rett linje.`,
        r`A passer ikke: den er krum, og det betyr at farten endrer seg. B passer ikke: den synker, så turen ville blitt kortere. D passer ikke: den synker mot $0$ på slutten, og det ville vært en graf for avstand fra huset, ikke for lengden av turen.`,
        r`C har først en stigende rett linje, deretter et vannrett stykke, og så en stigende rett linje.`,
        r`<strong>Svar:</strong> Graf C beskriver best lengden av turen som funksjon av tiden.`,
      ],
      ["funksjonsforståelse", "grafer", "argumentasjon"]),
    multi("1p-v23-d2-3", "3", 0,
      r`En gruppe speidere har slått opp telt ved en elv. De har et tau som er $80$ m langt, og fire pinner. Tauet og pinnene skal de bruke til å sette opp et gjerde rundt teltet. Området de gjerder inn, skal ha form som et rektangel, og de vil ikke sette opp gjerde langs elven. Se skissen nedenfor.` +
        figur("p1-v23-d2-3", "3", "Perspektivskisse (eller ovenfra) av et gresseng ved en elv. Elven ligger langs venstre side av et rektangulært område med et rødt telt. Gjerdet står på de tre andre sidene og ikke langs elven. Den siden som går parallelt med elven er merket «Lengde» (pil på høyre side), og siden som går vinkelrett på elven er merket «Bredde» (pil nederst)."),
      [
        part("1p-v23-d2-3", "a", r`Hvor stort blir arealet av området dersom de velger at lengden skal være $60$ meter?`,
          r`Gjerdet står på tre sider: én lengde og to bredder. Bruk at tauet er $80$ m til å finne bredden.`,
          [
            r`Siden langs elven får ikke gjerde. Gjerdet består derfor av én lengde og to bredder, og tauet er $80$ m: $l + 2b = 80$.`,
            r`Med $l = 60$ er $2b = 80 - 60 = 20$, så $b = 10$ m.`,
            r`Areal: $A = l\cdot b = 60\cdot 10 = 600$ m$^2$.`,
            r`<strong>Svar:</strong> Arealet blir $600$ m$^2$.`,
          ]),
        part("1p-v23-d2-3", "b", r`Herman påstår at arealet av området blir størst dersom lengden er dobbelt så lang som bredden. Lag en systematisk oversikt som viser arealet av ulike områder som de kan gjerde inn. Bruk oversikten til å argumentere for at Hermans påstand kan være riktig.`,
          r`Lag en tabell med lengde $l$, bredde $b = \dfrac{80 - l}{2}$ og areal $l\cdot b$. Se hvor arealet er størst.`,
          [
            r`Fra $l + 2b = 80$ får vi $b = \dfrac{80 - l}{2}$. Vi prøver ulike lengder:<table><tr><th>Lengde $l$ (m)</th><th>Bredde $b$ (m)</th><th>Areal (m$^2$)</th></tr><tr><td>$10$</td><td>$35$</td><td>$350$</td></tr><tr><td>$20$</td><td>$30$</td><td>$600$</td></tr><tr><td>$30$</td><td>$25$</td><td>$750$</td></tr><tr><td>$36$</td><td>$22$</td><td>$792$</td></tr><tr><td>$40$</td><td>$20$</td><td>$800$</td></tr><tr><td>$44$</td><td>$18$</td><td>$792$</td></tr><tr><td>$50$</td><td>$15$</td><td>$750$</td></tr><tr><td>$60$</td><td>$10$</td><td>$600$</td></tr><tr><td>$70$</td><td>$5$</td><td>$350$</td></tr></table>`,
            r`Arealet øker til $l = 40$ og avtar etterpå. Tabellen er symmetrisk rundt $l = 40$ (for eksempel $792$ både for $l = 36$ og $l = 44$), og det største arealet er $800$ m$^2$ for $l = 40$ og $b = 20$.`,
            r`For $l = 40$ og $b = 20$ er $l = 2b$.`,
            r`<strong>Svar:</strong> Tabellen viser størst areal ($800$ m$^2$) når lengden er $40$ m og bredden er $20$ m. Da er lengden dobbelt så lang som bredden, så Hermans påstand kan være riktig. (Tabellen viser bare utvalgte verdier, så den beviser ikke påstanden.)`,
          ]),
        part("1p-v23-d2-3", "c", r`Josefine lurer på om de kan tegne en graf som viser at Herman har rett. Sett opp et funksjonsuttrykk for Josefine. Tegn grafen og vis at Hermans påstand er riktig.`,
          r`La $b = x$ være bredden. Uttrykk lengden ved $x$ og sett opp arealet som funksjon av $x$. Finn toppunktet i GeoGebra.`,
          [
            r`La bredden være $x$ meter. Fra $l + 2x = 80$ er lengden $l = 80 - 2x$.`,
            r`Arealet som funksjon av bredden: $A(x) = x\,(80 - 2x) = 80x - 2x^{2}$, med $0 < x < 40$.`,
            r`Vi tegner grafen i GeoGebra. Den er en parabel som vender ned, og toppunktet er $(20,\ 800)$.`,
            r`Kontroll uten verktøy: Nullpunktene er $x = 0$ og $x = 40$, og toppunktet ligger midt mellom dem: $x = \dfrac{0 + 40}{2} = 20$. Da er $A(20) = 20\cdot 40 = 800$.`,
            r`Ved toppunktet er bredden $x = 20$ m og lengden $l = 80 - 2\cdot 20 = 40$ m. Altså $l = 2\cdot 20 = 2x$.`,
            r`<strong>Svar:</strong> $A(x) = x(80 - 2x)$. Grafen har toppunkt i $(20,\ 800)$, så arealet er størst, $800$ m$^2$, når bredden er $20$ m og lengden er $40$ m. Lengden er dobbelt så lang som bredden, og Hermans påstand er riktig.`,
          ]),
      ],
      ["areal", "andregradsfunksjoner", "optimering", "GeoGebra"]),
    multi("1p-v23-d2-4", "4", 0,
      r`<em>Vekting: deloppgave a, b og c teller halvparten av de andre deloppgavene.</em><br>En bonde selger sekker med poteter. I koordinatsystemet nedenfor ser du sammenhengen mellom vekt og pris for potetsekkene. Hvert av punktene A, B, C, D, E og F representerer en potetsekk.` +
        figur("p1-v23-d2-4", "4", "Koordinatsystem med Vekt (kg) på førsteaksen og Pris (kroner) på andreaksen, uten tall på aksene. Seks punkter. Omtrent avlest (relativt, målt fra origo i like enheter): A (71, 176), B (196, 128), C (448, 176), D (514, 279), E (402, 445), F (196, 499). A og C ligger på samme høyde, B og F ligger rett over hverandre (samme vekt), og A og F ligger på en rett linje gjennom origo. Punktene er merket med bokstaver og ligger på prikker."),
      [
        part("1p-v23-d2-4", "a", r`Hvilken sekk er tyngst? Begrunn svaret.`,
          r`Vekten leses av på førsteaksen. Hvilket punkt ligger lengst til høyre?`,
          [
            r`Vekten står på førsteaksen. Jo lenger til høyre punktet ligger, desto tyngre er sekken.`,
            r`Punkt D ligger lengst til høyre, litt lenger enn C.`,
            r`<strong>Svar:</strong> Sekk D er tyngst.`,
          ]),
        part("1p-v23-d2-4", "b", r`Hvilke sekker koster like mye? Begrunn svaret.`,
          r`Prisen leses av på andreaksen. Hvilke punkter ligger på samme høyde?`,
          [
            r`Pris står på andreaksen. Punkter som koster like mye, ligger på samme høyde (en vannrett linje).`,
            r`Punktene A og C ligger på samme høyde. Ingen andre punkter har samme høyde.`,
            r`<strong>Svar:</strong> Sekkene A og C koster like mye.`,
          ]),
        part("1p-v23-d2-4", "c", r`Vil det lønne seg å kjøpe sekk B eller sekk C? Begrunn svaret.`,
          r`Sammenlign prisen per kilogram. For et punkt $(x,\ y)$ er pris per kg $\dfrac{y}{x}$, som er stigningstallet til linjen fra origo til punktet.`,
          [
            r`B koster litt mindre enn C, men C er mye tyngre (omtrent $2{,}3$ ganger så tung som B).`,
            r`Pris per kilogram er $\dfrac{\text{pris}}{\text{vekt}}$. Linjen fra origo til C er slakere enn linjen fra origo til B, så C har lavest pris per kilogram.`,
            r`Avlest i figuren er forholdet omtrent $\dfrac{128}{196} \approx 0{,}65$ for B og $\dfrac{176}{448} \approx 0{,}39$ for C (enheter i figuren), altså er C klart billigst per kilogram.`,
            r`<strong>Svar:</strong> Det lønner seg å kjøpe sekk C, fordi den har lavest pris per kilogram (selv om B har lavere totalpris).`,
          ]),
        part("1p-v23-d2-4", "d", r`I to av sekkene koster potetene like mye per kilogram. Hvilke sekker er dette? Begrunn svaret.`,
          r`Lik pris per kilogram betyr at punktene ligger på samme rette linje gjennom origo. Sammenlign forholdet $\dfrac{y}{x}$ for alle seks punktene.`,
          [
            r`Pris per kg er $\dfrac{y}{x}$. Avlest i figuren (like enheter): A $\approx 2{,}5$, B $\approx 0{,}65$, C $\approx 0{,}39$, D $\approx 0{,}54$, E $\approx 1{,}1$, F $\approx 2{,}5$.`,
            r`Bare A og F har samme forhold. De ligger på samme rette linje gjennom origo.`,
            r`<strong>Svar:</strong> Sekkene A og F koster like mye per kilogram.`,
          ]),
      ],
      ["koordinatsystem", "proporsjonalitet", "tolkning av grafer"]),
    multi("1p-v23-d2-5", "5", 0,
      r`<em>Vekting: deloppgave b teller dobbelt så mye som de andre deloppgavene.</em><br>Kari har brukt Non Stop og laget tre K-er. Se nedenfor. Tenk deg at hun skal fortsette å lage K-er etter samme mønster.` +
        figur("p1-v23-d2-5", "5", "Tre K-er laget av Non Stop-drops i ulike farger: K1, K2, K3 (merket under hver). K1: loddrett stamme av $5$ drops, to skråstriper med $2$ drops hver og $1$ drops i midten (til sammen $10$). K2: stamme av $7$ drops, to skråstriper med $3$ drops hver og $1$ i midten (til sammen $14$). K3: stamme av $9$ drops, to skråstriper med $4$ drops hver og $1$ i midten (til sammen $18$). Stammen er vertikal og de to skråstripene går fra midten av stammen opp til høyre og ned til høyre."),
      [
        part("1p-v23-d2-5", "a", r`Beskriv mønsteret, og bestem hvor mange Non Stop det vil være i $K_4$ og i $K_5$.`,
          r`Tell Non Stop i $K_1$, $K_2$ og $K_3$ (stamme + skråstriper). Hvor mange flere er det for hver nye K?`,
          [
            r`Tellinger: $K_1$ har $10$, $K_2$ har $14$ og $K_3$ har $18$ Non Stop.`,
            r`Hver K består av en loddrett stamme, to like lange skråstriper og $1$ Non Stop i midten. I $K_n$ har stammen $2n + 3$ Non Stop, hver skråstripe har $n + 1$ Non Stop, og det er $1$ i midten.`,
            r`Fra $K_n$ til $K_{n+1}$ blir stammen $2$ lengre og hver skråstripe $1$ lengre, til sammen $4$ flere Non Stop. Antall i $K_n$ er $4n + 6$.`,
            r`$K_4$: $18 + 4 = 22$. $K_5$: $22 + 4 = 26$. Kontroll med formelen: $4\cdot 4 + 6 = 22$ og $4\cdot 5 + 6 = 26$.`,
            r`<strong>Svar:</strong> Mønsteret er at hver ny K har $4$ flere Non Stop enn den forrige (antall i $K_n$ er $4n + 6$). $K_4$ har $22$ og $K_5$ har $26$ Non Stop.`,
          ]),
        part("1p-v23-d2-5", "b", r`Kari ønsker å lage et program som finner antall Non Stop hun trenger for å lage hver av de $20$ første K-ene. Hun ønsker også å vite hvor mange Non Stop hun trenger til sammen for å lage alle disse $20$ K-ene. Lag et program som Kari kan bruke. Du kan for eksempel begynne som vist nedenfor, men legge inn formler i stedet for tallet én i linje $14$ og $15$ slik at den riktige oversikten skrives ut.<pre><code># Startverdier
nonstop_figur = 10
nonstop_totalt = 10

# Overskrifter
print("Figurnummer      Non Stop i figur      Non Stop totalt")


for figurnummer in range(1, 21):

    # Skriver ut i tre kolonner ved å bruke tabulatorer sep = "\t\t\t"
    print(figurnummer, nonstop_figur, nonstop_totalt, sep="\t\t\t")

    nonstop_figur = 1
    nonstop_totalt = 1</code></pre>`,
          r`I løkka skal «Non Stop i figur» øke med $4$ for hver K, og «totalt» skal øke med antallet i den nye figuren. Rekkefølgen på de to linjene har betydning.`,
          [
            r`Startverdiene er $K_1$: $10$ i figuren og $10$ totalt. Linje $14$ og $15$ skal gjøre klar neste rad:<pre><code># Startverdier
nonstop_figur = 10
nonstop_totalt = 10

# Overskrifter
print("Figurnummer      Non Stop i figur      Non Stop totalt")


for figurnummer in range(1, 21):

    # Skriver ut i tre kolonner ved å bruke tabulatorer sep = "\t\t\t"
    print(figurnummer, nonstop_figur, nonstop_totalt, sep="\t\t\t")

    nonstop_figur = nonstop_figur + 4
    nonstop_totalt = nonstop_totalt + nonstop_figur</code></pre>`,
            r`Forklaring: Først oppdateres antallet i figuren ($+4$). Deretter legges det nye antallet til i totalen. Dermed er begge tallene riktige når neste rad skrives ut.`,
            r`De første radene er $1$: $10$ og $10$, $2$: $14$ og $24$, $3$: $18$ og $42$. Siste rad er $20$: $86$ og $960$.`,
            r`<strong>Svar:</strong> Linje $14$ blir <code>nonstop_figur = nonstop_figur + 4</code> og linje $15$ blir <code>nonstop_totalt = nonstop_totalt + nonstop_figur</code>.`,
          ]),
        part("1p-v23-d2-5", "c", r`Hvor mange Non Stop trenger Kari til sammen for å lage de $20$ første K-ene?`,
          r`Les av siste rad i programmet, eller bruk formelen for summen av en aritmetisk rekke.`,
          [
            r`Siste rad i programmet gir $960$ i kolonnen «Non Stop totalt».`,
            r`Kontroll med formel: leddene $10,\ 14,\ \ldots,\ 86$ er en aritmetisk rekke. Summen er $S_{20} = \dfrac{20\cdot (10 + 86)}{2} = 10\cdot 96 = 960$.`,
            r`<strong>Svar:</strong> Kari trenger $960$ Non Stop til sammen.`,
          ]),
        part("1p-v23-d2-5", "d", r`Kari har $2000$ Non Stop. Hun vil begynne med $K_1$ og lage én K i hver størrelse. Hvor mange K-er kan Kari lage?`,
          r`Summen av de $N$ første K-ene er $\dfrac{N(10 + (4N + 6))}{2}$. Finn største $N$ med sum høyst $2000$, eller utvid løkka i programmet.`,
          [
            r`Summen av de $N$ første K-ene er $S_N = \dfrac{N\,(10 + 4N + 6)}{2} = 2N^{2} + 8N$.`,
            r`Vi må finne største hele $N$ med $2N^{2} + 8N \le 2000$. Tegn grafen til $S(x) = 2x^{2} + 8x$ og linjen $y = 2000$ i GeoGebra og finn skjæringspunktet med «Skjæring mellom to objekt». Eller løs likningen $2x^{2} + 8x = 2000$ med CAS (Løs). Begge gir $x \approx 29{,}7$ (den andre løsningen, $x \approx -33{,}7$, passer ikke).`,
            r`Så $N \le 29$. Kontroll: $S_{29} = 2\cdot 29^{2} + 8\cdot 29 = 1682 + 232 = 1914 \le 2000$, mens $S_{30} = 2\cdot 30^{2} + 8\cdot 30 = 2040 > 2000$.`,
            r`Det betyr at $K_{30}$ ikke kan lages, og at det er $2000 - 1914 = 86$ Non Stop til overs.`,
            r`<strong>Svar:</strong> Kari kan lage $29$ K-er ($K_1$ til $K_{29}$).`,
          ]),
      ],
      ["mønstre", "aritmetiske rekker", "programmering", "likninger"]),
    multi("1p-v23-d2-6", "6", 0,
      r`Tabellen nedenfor viser salg av energidrikker i Norge hvert år fra $2015$ til $2021$.<table><tr><th>Årstall</th><td>$2015$</td><td>$2016$</td><td>$2017$</td><td>$2018$</td><td>$2019$</td><td>$2020$</td><td>$2021$</td></tr><tr><th>Salg (tusen liter)</th><td>$18\,899$</td><td>$21\,664$</td><td>$25\,381$</td><td>$31\,385$</td><td>$41\,142$</td><td>$55\,497$</td><td>$67\,997$</td></tr></table>La $x$ være antall år etter $2015$.`,
      [
        part("1p-v23-d2-6", "a", r`Lag en modell på formen $E(x) = a\cdot b^{x}$ som passer godt med tallene i tabellen.`,
          r`Legg tallene inn i regnearket i GeoGebra (med $x = 0, 1, \ldots, 6$) og bruk eksponentiell regresjon.`,
          [
            r`Vi setter $x = 0$ for $2015$, $x = 1$ for $2016$ og så videre til $x = 6$ for $2021$. Punktene $(0,\ 18\,899)$, $(1,\ 21\,664)$, $\ldots$, $(6,\ 67\,997)$ legges inn i GeoGebra.`,
            r`Eksponentiell regresjon gir $a \approx 17\,396$ og $b \approx 1{,}248$.`,
            r`Kontroll (bruk de uavrundede verdiene av $a$ og $b$ fra regresjonen, for eksempel ved å skrive $E(6)$ i GeoGebra): $E(0) \approx 17\,400$ (mot $18\,899$) og $E(6) \approx 65\,800$ (mot $67\,997$). Modellen passer rimelig godt gjennom hele perioden.`,
            r`<strong>Svar:</strong> $E(x) = 17\,396\cdot 1{,}248^{x}$, der $x$ er antall år etter $2015$ og $E(x)$ er salget i tusen liter.`,
          ]),
        part("1p-v23-d2-6", "b", r`Hva forteller tallene $a$ og $b$ i modellen du fant i oppgave a)?`,
          r`$a$ er verdien når $x = 0$. $b$ er vekstfaktoren. Hvor mange prosent økning svarer $b = 1{,}248$ til?`,
          [
            r`$a$: Når $x = 0$ er $E(0) = a\cdot b^{0} = a$. Tallet $a \approx 17\,400$ er altså startverdien, det vil si salget i $2015$ ifølge modellen, omtrent $17\,400$ tusen liter.`,
            r`$b$: For hvert år multipliseres salget med $b = 1{,}248$. Det er en vekstfaktor på $1{,}248 = 1 + 0{,}248$, som svarer til en økning på $24{,}8\ \%$ per år.`,
            r`<strong>Svar:</strong> $a \approx 17\,400$ forteller at salget var omtrent $17\,400$ tusen liter i $2015$ ifølge modellen. $b \approx 1{,}25$ forteller at salget øker med omtrent $25\ \%$ per år.`,
          ]),
        part("1p-v23-d2-6", "c", r`I $2022$ var salget av energidrikk $73\,109$ tusen liter. Hvor stor var økningen i salget av energidrikk i prosent fra $2021$ til $2022$? Vurder hvordan dette passer med modellen i oppgave a).`,
          r`Prosentvis økning er $\dfrac{\text{endring}}{\text{gammel verdi}}$. Regn også ut hva modellen sier for $2022$ ($x = 7$).`,
          [
            r`Økningen er $73\,109 - 67\,997 = 5112$ tusen liter.`,
            r`Prosentvis økning: $\dfrac{5112}{67\,997} \approx 0{,}0752 = 7{,}5\ \%$.`,
            r`Modellen gir for $2022$ ($x = 7$), regnet med de uavrundede verdiene av $a$ og $b$ fra regresjonen: $E(7) \approx 82\,100$ tusen liter. Det er omtrent $9\,000$ tusen liter mer enn det som faktisk ble solgt.`,
            r`Modellen forutsetter en vekst på omtrent $25\ \%$ per år, men den virkelige veksten fra $2021$ til $2022$ var bare omtrent $7{,}5\ \%$. Veksten har altså avtatt kraftig.`,
            r`<strong>Svar:</strong> Salget økte med omtrent $7{,}5\ \%$. Det passer dårlig med modellen, som gir omtrent $25\ \%$ vekst per år og overestimerer salget i $2022$. Modellen er dermed ikke egnet til å forutsi salget etter $2021$.`,
          ]),
      ],
      ["eksponentialfunksjoner", "regresjon", "prosent", "tolkning", "GeoGebra"]),
  ],
});
