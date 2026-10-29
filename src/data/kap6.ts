import type { Delkapittel, Kapittel, Oppgave, QuizQuestion } from "./types";

// Generert innhold. Alle fasitsvar er regnet ut og kontrollert numerisk (python/numpy).

function o(id: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel: `Oppgave ${id}`, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

function s(id: string, tittel: string, tekst: string, hint: string, steg: string[]): Oppgave {
  return { id, tittel, tekst, bilde: null, hint, fasit: null, fasitSteg: steg, starter: "" };
}

function q(sporsmal: string, alternativer: string[], riktigSvar: number, forklaring: string): QuizQuestion {
  return { sporsmal, alternativer, riktigSvar, forklaring };
}

const dk6A: Delkapittel = {
  id: "6A",
  tittel: "6A Matematiske modeller",
  quiz: [
    q("En modell $f(x)=a\\cdot b^x$ med $b=0{,}95$ beskriver", ["lineær vekst", "en nedgang på $5\\,\\%$ per periode", "en vekst på $95\\,\\%$", "en potensfunksjon"], 1, "Vekstfaktor $0{,}95=1-0{,}05$."),
    q("Hva er gyldighetsområdet til en modell?", ["Alle reelle tall", "Toppunktet", "Verdimengden", "De $x$-verdiene der modellen gir mening"], 3, "Modellen bør bare brukes der den beskriver virkeligheten rimelig godt."),
    q("Tabellen øker med $15$ hver gang $x$ øker med $1$. Hvilken modell passer?", ["lineær", "eksponentiell", "andregrads", "potens"], 0, "Fast differanse betyr lineær vekst."),
    q("Å bruke en modell utenfor området der vi har data, kalles", ["interpolering", "regresjon", "ekstrapolering", "avrunding"], 2, "Ekstrapolering er mer usikkert enn interpolering."),
    q("Modellen $T(l)=2{,}0\\cdot l^{0{,}5}$ er en", ["lineær modell", "eksponentiell modell", "potensmodell", "andregradsmodell"], 2, "Variabelen står i grunntallet: $a\\cdot x^b$."),
    q("Hva er vekstfaktoren for en økning på $8\\,\\%$?", ["$0{,}08$", "$1{,}8$", "$0{,}92$", "$1{,}08$"], 3, "$1+0{,}08=1{,}08$."),
    q("En taxitur koster $P(x)=18x+60$ kr for $x$ km. Hva betyr tallet $60$?", ["startprisen", "prisen per km", "prisen for $60$ km", "største antall km"], 0, "Konstantleddet er prisen når $x=0$."),
  ],
  oppgaver: [
  o("6.1", "En taxi koster $60$ kr i startpris og $18$ kr per kilometer.<br><br><strong>a)</strong> Lag en modell $P(x)$ for prisen når du kjører $x$ km.<br><br><strong>b)</strong> Hva koster en tur på $12$ km?<br><br><strong>c)</strong> Hvor langt kan du kjøre for $500$ kr?<br><br><strong>d)</strong> Hva betyr tallene $18$ og $60$ i modellen?", "Fast beløp blir konstantleddet. Beløp per km blir stigningstallet.", [
    "<strong>a)</strong> $P(x)=18x+60$",
    "<strong>b)</strong> $P(12)=18\\cdot 12+60=276$ kr",
    "<strong>c)</strong> $18x+60=500$ gir $x=\\dfrac{440}{18}\\approx 24{,}4$ km",
    "<strong>d)</strong> $18$ er økningen i pris per km (stigningstall). $60$ er prisen før du har kjørt (konstantledd).<br><strong>Svar:</strong> $P(x)=18x+60$; $276$ kr; ca. $24$ km",
  ]),
  o("6.2", "En bil koster $350\\,000$ kr ny. Verdien synker med $12\\,\\%$ per år.<br><br><strong>a)</strong> Lag en modell $V(x)$ for verdien etter $x$ år.<br><br><strong>b)</strong> Hva er verdien etter $5$ år?<br><br><strong>c)</strong> Bruk graf eller CAS: Når er bilen verdt mindre enn $150\\,000$ kr?", "Prosentvis nedgang gir vekstfaktor $1-0{,}12$.", [
    "<strong>a)</strong> Vekstfaktor $0{,}88$. $V(x)=350\\,000\\cdot 0{,}88^x$",
    "<strong>b)</strong> $V(5)=350\\,000\\cdot 0{,}88^5\\approx 184\\,706$ kr",
    "<strong>c)</strong> Løs $350\\,000\\cdot 0{,}88^x=150\\,000$. Det gir $x\\approx 6{,}63$.<br><strong>Svar:</strong> Etter $7$ hele år er verdien under $150\\,000$ kr.",
  ]),
  o("6.3", "Tabellen viser to størrelser $A$ og $B$ som endrer seg over tid $x$ (år).<table><tr><th>$x$</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td></tr><tr><th>$A$</th><td>$200$</td><td>$230$</td><td>$260$</td><td>$290$</td></tr></table><table><tr><th>$x$</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td></tr><tr><th>$B$</th><td>$200$</td><td>$230$</td><td>$264{,}5$</td><td>$304{,}175$</td></tr></table><br><br><strong>a)</strong> Hvilken av dem vokser lineært, og hvilken vokser eksponentielt? Begrunn.<br><br><strong>b)</strong> Finn en modell for hver av dem.", "Se på differansen og på forholdet mellom to verdier som følger etter hverandre.", [
    "<strong>a)</strong> $A$: differansen er alltid $30$, så veksten er lineær. $B$: forholdet er alltid $\\dfrac{230}{200}=1{,}15$, så veksten er eksponentiell.",
    "<strong>b)</strong> $A(x)=30x+200$ og $B(x)=200\\cdot 1{,}15^x$.<br><strong>Svar:</strong> $A$ lineær, $B$ eksponentiell",
  ]),
  o("6.4", "Du kaster en ball rett opp. Høyden over bakken etter $t$ sekunder er tilnærmet<br><br>$$h(t)=-4{,}9t^2+14t+1{,}5$$<br><strong>a)</strong> Hvor høyt er ballen etter $1$ s?<br><br><strong>b)</strong> Når er ballen høyest, og hvor høyt er den da?<br><br><strong>c)</strong> Når treffer ballen bakken?<br><br><strong>d)</strong> Hva er et rimelig gyldighetsområde for modellen?", "Toppunktet til $at^2+bt+c$ har $t=-\\dfrac{b}{2a}$. Ballen treffer bakken når $h(t)=0$.", [
    "<strong>a)</strong> $h(1)=-4{,}9+14+1{,}5=10{,}6$ m",
    "<strong>b)</strong> $t=\\dfrac{-14}{2\\cdot(-4{,}9)}\\approx 1{,}43$ s, og $h(1{,}43)\\approx 11{,}5$ m",
    "<strong>c)</strong> $h(t)=0$ gir $t\\approx 2{,}96$ s (den negative løsningen forkastes)",
    "<strong>d)</strong> $D_h=[0,\\;2{,}96]$. Før kastet og etter at ballen har landet, gir ikke modellen mening.<br><strong>Svar:</strong> $10{,}6$ m; topp $11{,}5$ m etter $1{,}43$ s; lander etter $2{,}96$ s",
  ]),
  o("6.5", "En vanntank tømmes med jevn fart. Etter $2$ timer er det $340$ L igjen. Etter $5$ timer er det $205$ L igjen.<br><br><strong>a)</strong> Lag en lineær modell $V(t)$.<br><br><strong>b)</strong> Hvor mye vann var det i tanken fra starten?<br><br><strong>c)</strong> Når er tanken tom? Hva blir gyldighetsområdet?", "Stigningstallet er $\\dfrac{\\Delta V}{\\Delta t}$.", [
    "<strong>a)</strong> $a=\\dfrac{205-340}{5-2}=-45$. $340=-45\\cdot 2+b$ gir $b=430$. $V(t)=-45t+430$",
    "<strong>b)</strong> $V(0)=430$ L",
    "<strong>c)</strong> $-45t+430=0$ gir $t=\\dfrac{430}{45}\\approx 9{,}56$ timer. $D_V=[0,\\;9{,}56]$<br><strong>Svar:</strong> $V(t)=-45t+430$; tom etter ca. $9{,}6$ timer",
  ]),
  o("6.6", "Svingetiden $T$ (sekunder) for en pendel med lengde $l$ meter kan modelleres med<br><br>$$T(l)=2{,}0\\cdot l^{0{,}5}$$<br><strong>a)</strong> Finn $T(0{,}81)$.<br><br><strong>b)</strong> Hvor lang må pendelen være for at svingetiden skal bli $3{,}0$ s?<br><br><strong>c)</strong> Hvilken type modell er dette? Forklar forskjellen fra en eksponentiell modell.", "$l^{0{,}5}=\\sqrt{l}$.", [
    "<strong>a)</strong> $T(0{,}81)=2{,}0\\cdot\\sqrt{0{,}81}=2{,}0\\cdot 0{,}9=1{,}8$ s",
    "<strong>b)</strong> $2\\sqrt l=3$ gir $\\sqrt l=1{,}5$, altså $l=2{,}25$ m",
    "<strong>c)</strong> En potensmodell $a\\cdot x^b$: variabelen står i grunntallet. I en eksponentiell modell $a\\cdot b^x$ står variabelen i eksponenten.<br><strong>Svar:</strong> $1{,}8$ s; $2{,}25$ m; potensmodell",
  ]),
  o("6.7", "I et tenkt land er folketallet (i millioner) $x$ år etter 2024 gitt ved $B(x)=5{,}4\\cdot 1{,}008^x$.<br><br><strong>a)</strong> Hva er den årlige veksten i prosent?<br><br><strong>b)</strong> Hva sier modellen om folketallet i 2034?<br><br><strong>c)</strong> Hva sier modellen om år 2224? Er det rimelig? Drøft gyldigheten.", "Vekstfaktor $1{,}008$ betyr $0{,}8\\,\\%$ vekst.", [
    "<strong>a)</strong> $0{,}8\\,\\%$ per år",
    "<strong>b)</strong> $B(10)=5{,}4\\cdot 1{,}008^{10}\\approx 5{,}85$ millioner",
    "<strong>c)</strong> $B(200)\\approx 26{,}6$ millioner. Det er nesten fem ganger så mange. Modellen bygger på at veksten holder seg lik i 200 år, og det er lite trolig. Modellen bør bare brukes noen få år fram i tid.<br><strong>Svar:</strong> $0{,}8\\,\\%$; ca. $5{,}85$ mill.; ekstrapolering langt fram er usikker",
  ]),
  o("6.8", "Du setter inn $25\\,000$ kr på en konto med fast rente $4\\,\\%$ per år.<br><br><strong>a)</strong> Hvor mye står på kontoen etter $10$ år?<br><br><strong>b)</strong> Hvor lang tid tar det før beløpet er doblet?", "Doblet betyr $25\\,000\\cdot 1{,}04^x=50\\,000$, altså $1{,}04^x=2$.", [
    "<strong>a)</strong> $25\\,000\\cdot 1{,}04^{10}\\approx 37\\,006$ kr",
    "<strong>b)</strong> $1{,}04^x=2$ gir $x\\approx 17{,}7$ (graf eller CAS).<br><strong>Svar:</strong> ca. $37\\,006$ kr; doblet etter $18$ hele år",
  ]),
  ],
};

const dk6B: Delkapittel = {
  id: "6B",
  tittel: "6B Regresjon",
  quiz: [
    q("Hva gjør lineær regresjon?", ["Finner linjen gjennom de to første punktene", "Finner toppunktet", "Finner den linjen som passer best til alle punktene", "Løser en likning"], 2, "Regresjon minimerer de samlede (kvadrerte) avvikene."),
    q("Verdiene dobles omtrent hvert tidssteg. Hvilken regresjon bør du prøve?", ["eksponentiell", "lineær", "andregrads", "ingen"], 0, "Fast forhold mellom verdiene peker mot eksponentiell vekst."),
    q("Potensregresjon $a\\cdot x^b$ kan ikke brukes når", ["$x$-verdiene er store", "dataene er få", "$b<1$", "noen $x$-verdier er $0$ eller negative"], 3, "Potensfunksjonen $x^b$ er bare definert for alle $b$ når $x>0$, og regresjonen forutsetter positive $x$- og $y$-verdier."),
    q("RegLin gir $y=2{,}5x+4$. Hva sier modellen om $x=6$?", ["$15$", "$19$", "$21$", "$10$"], 1, "$2{,}5\\cdot 6+4=19$."),
    q("Hva er avviket (residualen) i et datapunkt?", ["modellverdi pluss målt verdi", "målt verdi minus modellverdi", "stigningstallet til modellen", "$x$-verdien til punktet"], 1, "Avviket viser hvor langt punktet ligger over (positivt) eller under (negativt) modellen."),
    q("Punktene ligger på en kurve som først synker og så stiger. Hvilken regresjon bør du prøve?", ["lineær", "eksponentiell", "potens", "andregrads"], 3, "En parabel har et bunnpunkt (eller toppunkt)."),
    q("Avvikene for en lineær modell er $+,-,-,-,+$ (fra venstre). Hva tyder det på?", ["Modellen passer perfekt", "Dataene krummer, så en annen modelltype passer bedre", "Vi har for mange datapunkter", "Stigningstallet er negativt"], 1, "Et systematisk mønster i avvikene betyr at modellen bommer på formen."),
    q("Hvorfor er det lurt å la $x$ være antall år etter 2000 i stedet for årstallet?", ["Konstantleddet får en tydelig betydning og tallene blir små", "Da blir modellen alltid eksponentiell", "Da blir stigningstallet $0$", "GeoGebra godtar ikke årstall"], 0, "Med $x=0$ i år 2000 er konstantleddet modellens verdi i 2000."),
  ],
  oppgaver: [
  o("6.9", "Tabellen viser hvor mange timer $x$ seks elever øvde, og hvor mange poeng $y$ de fikk på en prøve (tenkte data).<table><tr><th>$x$ (timer)</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td><td>$6$</td></tr><tr><th>$y$ (poeng)</th><td>$12$</td><td>$15$</td><td>$19$</td><td>$21$</td><td>$26$</td><td>$28$</td></tr></table><br><br><strong>a)</strong> Bruk lineær regresjon (GeoGebra: <em>RegLin</em>) og finn modellen.<br><br><strong>b)</strong> Hva betyr stigningstallet i denne situasjonen?<br><br><strong>c)</strong> Hva sier modellen om en elev som øver $10$ timer? Kommenter.", "Legg $x$ og $y$ i hver sin kolonne i regnearket, merk dem og velg <em>Regresjonsanalyse → Lineær</em>.", [
    "<strong>a)</strong> $y\\approx 3{,}29x+8{,}67$",
    "<strong>b)</strong> Hver ekstra time gir i gjennomsnitt ca. $3{,}3$ flere poeng.",
    "<strong>c)</strong> $y(10)\\approx 41{,}5$ poeng. Det er ekstrapolering langt utenfor dataene, og prøven har trolig en maksimal poengsum. Svaret er usikkert.<br><strong>Svar:</strong> $y\\approx 3{,}29x+8{,}67$",
  ]),
  o("6.10", "Antallet bakterier i en kultur ble telt hver time (tenkte data).<table><tr><th>$x$ (timer)</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$N$</th><td>$500$</td><td>$640$</td><td>$830$</td><td>$1050$</td><td>$1370$</td><td>$1750$</td></tr></table><br><br><strong>a)</strong> Finn en eksponentiell modell $N(x)=a\\cdot b^x$ ved regresjon (<em>RegEksp</em>).<br><br><strong>b)</strong> Hvor mange prosent vokser kulturen med per time ifølge modellen?<br><br><strong>c)</strong> Hva sier modellen om antallet etter $8$ timer?<br><br><strong>d)</strong> Når passerer antallet $10\\,000$?", "Vekstfaktoren $b$ gir prosentvis vekst: $(b-1)\\cdot 100\\,\\%$.", [
    "<strong>a)</strong> $N(x)\\approx 499\\cdot 1{,}285^x$",
    "<strong>b)</strong> Ca. $28{,}5\\,\\%$ per time",
    "<strong>c)</strong> $N(8)\\approx 3720$",
    "<strong>d)</strong> $N(x)=10\\,000$ gir $x\\approx 11{,}9$ timer.<br><strong>Svar:</strong> $N(x)\\approx 499\\cdot 1{,}285^x$; passerer $10\\,000$ etter knapt $12$ timer",
  ]),
  o("6.11", "Tabellen viser bremselengden $s$ (meter) for en bil ved ulik fart $v$ (km/h) (tenkte data).<table><tr><th>$v$</th><td>$30$</td><td>$40$</td><td>$50$</td><td>$60$</td><td>$70$</td><td>$80$</td></tr><tr><th>$s$</th><td>$9$</td><td>$15$</td><td>$23$</td><td>$33$</td><td>$44$</td><td>$57$</td></tr></table><br><br><strong>a)</strong> Forklar hvorfor en lineær modell passer dårlig.<br><br><strong>b)</strong> Finn en andregradsmodell ved regresjon (<em>RegPoly</em> grad $2$).<br><br><strong>c)</strong> Bruk modellen til å anslå bremselengden ved $100$ km/h.", "Se på differansene: $6, 8, 10, 11, 13$. De øker, så grafen krummer.", [
    "<strong>a)</strong> Differansene øker. Punktene ligger på en kurve som bøyer oppover, ikke på en rett linje.",
    "<strong>b)</strong> $s(v)\\approx 0{,}0084v^2+0{,}040v+0{,}15$",
    "<strong>c)</strong> $s(100)\\approx 88$ m. Det er ekstrapolering litt utenfor dataene.<br><strong>Svar:</strong> ca. $88$ m",
  ]),
  o("6.12", "Svingetiden $T$ for pendler med ulik lengde $l$ ble målt (tenkte måledata).<table><tr><th>$l$ (m)</th><td>$0{,}25$</td><td>$0{,}5$</td><td>$1$</td><td>$1{,}5$</td><td>$2$</td></tr><tr><th>$T$ (s)</th><td>$1{,}0$</td><td>$1{,}42$</td><td>$2{,}01$</td><td>$2{,}45$</td><td>$2{,}84$</td></tr></table><br><br><strong>a)</strong> Finn en potensmodell $T(l)=a\\cdot l^b$ ved regresjon (<em>RegPot</em>).<br><br><strong>b)</strong> Sammenlign med modellen i oppgave 6.6.<br><br><strong>c)</strong> Hvor lang pendel gir svingetid $4$ s?", "Potensregresjon krever at alle $x$- og $y$-verdier er positive.", [
    "<strong>a)</strong> $T(l)\\approx 2{,}01\\cdot l^{0{,}501}$",
    "<strong>b)</strong> Nesten den samme: $a\\approx 2{,}0$ og $b\\approx 0{,}5$, altså $T\\approx 2\\sqrt l$.",
    "<strong>c)</strong> $2{,}01\\cdot l^{0{,}501}=4$ gir $l\\approx 3{,}97$ m.<br><strong>Svar:</strong> ca. $4{,}0$ m",
  ]),
  o("6.13", "En nettbutikk registrerte antall bestillinger $y$ (i hundre) i uke $x$ (tenkte data).<table><tr><th>$x$</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$y$</th><td>$20$</td><td>$26$</td><td>$33$</td><td>$43$</td><td>$56$</td><td>$72$</td></tr></table><br><br><strong>a)</strong> Finn både en lineær og en eksponentiell modell ved regresjon.<br><br><strong>b)</strong> Tegn begge sammen med punktene. Hvilken modell passer best?<br><br><strong>c)</strong> Hva sier hver modell om uke $8$? Hvorfor er forskjellen så stor?", "Se hvor godt grafene treffer det første og det siste punktet.", [
    "<strong>a)</strong> Lineær: $y\\approx 10{,}29x+15{,}95$. Eksponentiell: $y\\approx 19{,}98\\cdot 1{,}292^x$",
    "<strong>b)</strong> Den eksponentielle modellen treffer nesten alle punktene. Den lineære ligger for høyt i midten og for lavt i endene. Summen av kvadrerte avvik er ca. $66$ for lineær og ca. $0{,}26$ for eksponentiell.",
    "<strong>c)</strong> Lineær: ca. $98$. Eksponentiell: ca. $155$. Jo lenger vi ekstrapolerer, jo mer skiller modellene lag.<br><strong>Svar:</strong> Den eksponentielle modellen passer best.",
  ]),
  o("6.14", "Tabellen viser folketallet i Norge (millioner, avrundet), $x$ år etter 1950. Kilde: SSB, via NDLA.<table><tr><th>$x$</th><td>$0$</td><td>$10$</td><td>$20$</td><td>$30$</td><td>$40$</td><td>$50$</td></tr><tr><th>$f(x)$</th><td>$3{,}2$</td><td>$3{,}6$</td><td>$3{,}9$</td><td>$4{,}1$</td><td>$4{,}2$</td><td>$4{,}5$</td></tr></table><br><br><strong>a)</strong> Finn en lineær modell $f(x)$ ved regresjon.<br><br><strong>b)</strong> Hva sier modellen om folketallet i 2015?<br><br><strong>c)</strong> Det faktiske folketallet i 2015 var ca. $5{,}2$ millioner. Hva forteller det om modellen?", "2015 svarer til $x=65$.", [
    "<strong>a)</strong> $f(x)\\approx 0{,}0243x+3{,}3095$",
    "<strong>b)</strong> $f(65)\\approx 4{,}89$ millioner",
    "<strong>c)</strong> Modellen gir for lavt tall. Etter år 2000 vokste folketallet raskere (blant annet på grunn av innvandring), så den lineære trenden holdt ikke.<br><strong>Svar:</strong> ca. $4{,}89$ millioner; modellen undervurderer",
  ]),
  o("6.15", "Bruk modellen fra oppgave 6.9.<br><br><strong>a)</strong> Regn ut modellverdien for $x=4$ og avviket fra målingen $y=21$.<br><br><strong>b)</strong> Hva betyr et negativt avvik?<br><br><strong>c)</strong> Hvorfor kan vi ikke vente at en regresjonsmodell går gjennom alle punktene?", "Avvik = målt verdi − modellverdi.", [
    "<strong>a)</strong> $y(4)\\approx 21{,}81$. Avvik $\\approx 21-21{,}81=-0{,}81$",
    "<strong>b)</strong> Målingen ligger under modellen. Eleven fikk færre poeng enn modellen forutsier.",
    "<strong>c)</strong> Dataene har tilfeldig variasjon. Regresjon finner linjen som samlet sett gir minst avvik (minste kvadraters metode), ikke en linje gjennom alle punktene.<br><strong>Svar:</strong> avvik ca. $-0{,}81$",
  ]),
  ],
};

const dk6C: Delkapittel = {
  id: "6C",
  tittel: "6C Modellering i praksis",
  quiz: [
    q("$K(t)=20+70\\cdot 0{,}9^t$. Hva nærmer $K$ seg når $t$ blir stor?", ["$0$", "$20$", "$70$", "$90$"], 1, "$0{,}9^t\\to 0$."),
    q("Inntekt $I(p)=-5p^2+500p$ er størst for", ["$p=50$", "$p=25$", "$p=100$", "$p=500$"], 0, "$p=-\\dfrac{500}{2\\cdot(-5)}=50$."),
    q("En modell gir negativt antall solgte varer for noen $x$. Hva betyr det?", ["Modellen er feil overalt", "Vi må runde av", "Disse $x$-verdiene er utenfor gyldighetsområdet", "Vi må bruke eksponentiell modell"], 2, "Modeller har begrenset gyldighet."),
    q("Hvordan finner du når to lineære prismodeller koster like mye?", ["Legger modellene sammen", "Bruker regresjon", "Finner toppunktet", "Setter modellene lik hverandre og løser"], 3, "Løs $A(x)=B(x)$, eller finn skjæringspunktet grafisk."),
    q("$M(t)=400\\cdot 0{,}85^t$. Hvor mange prosent brytes ned per time?", ["$85\\,\\%$", "$0{,}85\\,\\%$", "$15\\,\\%$", "$40\\,\\%$"], 2, "$1-0{,}85=0{,}15$."),
    q("Arealet av en hage er $A(x)=x(60-2x)$. Hvilket gyldighetsområde er rimelig?", ["$0<x<60$", "$x>0$", "alle reelle tall", "$0<x<30$"], 3, "Begge sidene $x$ og $60-2x$ må være positive."),
    q("Å bruke modellen innenfor området der vi har data, kalles", ["interpolering", "ekstrapolering", "regresjon", "avrunding"], 0, "Interpolering er tryggere enn ekstrapolering."),
  ],
  oppgaver: [
  o("6.16", "En kopp kaffe settes på bordet i et rom som holder $20\\,^\\circ$C. Temperaturen etter $t$ minutter er<br><br>$$K(t)=20+70\\cdot 0{,}92^t$$<br><strong>a)</strong> Hva er temperaturen når kaffen settes på bordet?<br><br><strong>b)</strong> Hva er temperaturen etter $10$ minutter?<br><br><strong>c)</strong> Når er kaffen avkjølt til $40\\,^\\circ$C?<br><br><strong>d)</strong> Hva skjer med $K(t)$ når $t$ blir stor? Forklar med situasjonen.", "$0{,}92^t$ blir mindre og mindre når $t$ øker.", [
    "<strong>a)</strong> $K(0)=20+70=90\\,^\\circ$C",
    "<strong>b)</strong> $K(10)=20+70\\cdot 0{,}92^{10}\\approx 50{,}4\\,^\\circ$C",
    "<strong>c)</strong> $70\\cdot 0{,}92^t=20$ gir $t\\approx 15{,}0$ min",
    "<strong>d)</strong> $0{,}92^t\\to 0$, så $K(t)\\to 20$. Kaffen nærmer seg romtemperaturen.<br><strong>Svar:</strong> $90\\,^\\circ$C; ca. $50\\,^\\circ$C; ca. $15$ min; nærmer seg $20\\,^\\circ$C",
  ]),
  o("6.17", "En konsertarrangør regner med at antallet solgte billetter er $N(p)=1200-8p$ når prisen er $p$ kroner.<br><br><strong>a)</strong> Vis at inntekten er $I(p)=-8p^2+1200p$.<br><br><strong>b)</strong> Hvilken pris gir størst inntekt, og hvor stor blir den?<br><br><strong>c)</strong> Hva er et rimelig gyldighetsområde for modellen?", "Inntekt = pris · antall. Toppunkt: $p=-\\dfrac{b}{2a}$.", [
    "<strong>a)</strong> $I(p)=p(1200-8p)=-8p^2+1200p$",
    "<strong>b)</strong> $p=\\dfrac{-1200}{2\\cdot(-8)}=75$ kr. $I(75)=75\\cdot 600=45\\,000$ kr",
    "<strong>c)</strong> Både pris og antall må være minst $0$: $0\\le p\\le 150$.<br><strong>Svar:</strong> $75$ kr gir $45\\,000$ kr",
  ]),
  o("6.18", "Du har $60$ m gjerde og skal lage en rektangulær hage inntil en husvegg. Veggen utgjør den ene siden, så du trenger gjerde på bare tre sider.<br><br><strong>a)</strong> La $x$ være lengden av de to sidene som står vinkelrett på veggen. Vis at arealet er $A(x)=x(60-2x)$.<br><br><strong>b)</strong> Finn den $x$ som gir størst areal, og finn arealet.<br><br><strong>c)</strong> Finn gyldighetsområdet.", "Siden parallelt med veggen er $60-2x$.", [
    "<strong>a)</strong> To sider er $x$, og den tredje er $60-2x$. $A=x(60-2x)$",
    "<strong>b)</strong> $A(x)=-2x^2+60x$. Toppunkt i $x=15$. $A(15)=15\\cdot 30=450$ m²",
    "<strong>c)</strong> $0<x<30$<br><strong>Svar:</strong> $x=15$ m gir $450$ m²",
  ]),
  o("6.19", "Abonnement A koster $199$ kr per måned pluss $0{,}50$ kr per minutt. Abonnement B koster $99$ kr per måned pluss $1{,}50$ kr per minutt.<br><br><strong>a)</strong> Lag en modell for hvert abonnement.<br><br><strong>b)</strong> For hvor mange minutter koster de like mye?<br><br><strong>c)</strong> Hvilket abonnement lønner seg for en som ringer $150$ minutter i måneden?", "Sett modellene lik hverandre.", [
    "<strong>a)</strong> $A(x)=0{,}5x+199$ og $B(x)=1{,}5x+99$",
    "<strong>b)</strong> $0{,}5x+199=1{,}5x+99$ gir $x=100$ minutter",
    "<strong>c)</strong> $A(150)=274$ kr og $B(150)=324$ kr. A lønner seg.<br><strong>Svar:</strong> like dyre ved $100$ min; A ved $150$ min",
  ]),
  o("6.20", "En pasient får $400$ mg av et legemiddel. Hver time brytes $15\\,\\%$ av mengden i kroppen ned.<br><br><strong>a)</strong> Lag en modell $M(t)$ for mengden etter $t$ timer.<br><br><strong>b)</strong> Hvor mye er igjen etter $3$ timer?<br><br><strong>c)</strong> Ny dose skal gis når mengden er under $100$ mg. Når skjer det?", "Vekstfaktoren er $1-0{,}15$.", [
    "<strong>a)</strong> $M(t)=400\\cdot 0{,}85^t$",
    "<strong>b)</strong> $M(3)=400\\cdot 0{,}85^3\\approx 245{,}6$ mg",
    "<strong>c)</strong> $0{,}85^t=0{,}25$ gir $t\\approx 8{,}53$ timer.<br><strong>Svar:</strong> etter ca. $8{,}5$ timer",
  ]),
  o("6.21", "En iskiosk noterte dagstemperaturen $x$ ($^\\circ$C) og antall solgte is $y$ (tenkte data).<table><tr><th>$x$</th><td>$12$</td><td>$15$</td><td>$18$</td><td>$21$</td><td>$24$</td><td>$27$</td></tr><tr><th>$y$</th><td>$110$</td><td>$150$</td><td>$185$</td><td>$230$</td><td>$260$</td><td>$300$</td></tr></table><br><br><strong>a)</strong> Finn en lineær modell ved regresjon.<br><br><strong>b)</strong> Hvor mange is kan kiosken vente å selge en dag med $22\\,^\\circ$C?<br><br><strong>c)</strong> Hva sier modellen om $40\\,^\\circ$C og om $2\\,^\\circ$C? Drøft gyldighetsområdet.", "Interpolering (innenfor dataene) er tryggere enn ekstrapolering.", [
    "<strong>a)</strong> $y\\approx 12{,}62x-40{,}24$",
    "<strong>b)</strong> $y(22)\\approx 237$ is",
    "<strong>c)</strong> $y(40)\\approx 465$ og $y(2)\\approx -15$. Et negativt salg er umulig, og ved $40\\,^\\circ$C er det ikke sikkert at salget fortsetter å øke likt. Modellen bør bare brukes omtrent for $12\\le x\\le 27$.<br><strong>Svar:</strong> ca. $237$ is ved $22\\,^\\circ$C",
  ]),
  ],
};

const dk6SM: Delkapittel = {
  id: "6SM",
  tittel: "Sammendrag",
  quiz: [],
  oppgaver: [
  s("6.S1", "Sammendrag 6A — Modeller", "<strong>Typer modeller</strong><br>• Lineær: $f(x)=ax+b$. Fast endring $a$ per enhet.<br>• Eksponentiell: $f(x)=a\\cdot b^x$. Fast prosentvis endring; vekstfaktor $b=1\\pm\\dfrac{p}{100}$.<br>• Andregrads: $f(x)=ax^2+bx+c$. Har toppunkt eller bunnpunkt.<br>• Potens: $f(x)=a\\cdot x^b$.<br><br><strong>Gyldighetsområde:</strong> de $x$-verdiene der modellen gir mening.", "Fast differanse → lineær. Fast forhold → eksponentiell.", [
    "<strong>Sjekk deg selv:</strong> En verdi synker med $6\\,\\%$ per år fra $8000$. Modell?<br><strong>Svar:</strong> $f(x)=8000\\cdot 0{,}94^x$",
  ]),
  s("6.S2", "Sammendrag 6B — Regresjon", "<strong>Regresjon i GeoGebra</strong><br>1. Legg $x$ og $y$ i to kolonner i regnearket.<br>2. Merk dataene og velg <em>Regresjonsanalyse</em>.<br>3. Velg modelltype: Lineær (RegLin), Eksponentiell (RegEksp), Polynom (RegPoly), Potens (RegPot).<br>4. Se på grafen: følger modellen punktene?<br><br><strong>Avvik</strong> = målt verdi − modellverdi.", "Velg modelltype ut fra hvordan punktene ligger, ikke ut fra hvilken som gir finest tall.", [
    "<strong>Sjekk deg selv:</strong> Hvorfor bør $x$ være «år etter 2000» i stedet for selve årstallet?<br><strong>Svar:</strong> Små tall gir enklere og mer stabile modeller, og konstantleddet får en tydelig betydning.",
  ]),
  s("6.S3", "Sammendrag 6C — Modellering i praksis", "<strong>Modellering i praksis</strong><br>1. Les teksten og bestem variablene og enhetene.<br>2. Lag modellen ut fra opplysningene eller ved regresjon.<br>3. Bruk modellen: regn ut verdier, løs likninger, finn topp- og bunnpunkt.<br>4. Vurder modellen: gyldighetsområde, interpolering eller ekstrapolering, og svakheter.", "Avslutt alltid med en kommentar om hvor godt modellen passer.", [
    "<strong>Sjekk deg selv:</strong> Hva er forskjellen på interpolering og ekstrapolering?<br><strong>Svar:</strong> Interpolering er innenfor dataene, ekstrapolering er utenfor. Ekstrapolering er mer usikkert.",
  ]),
  ],
};

const dk6OP: Delkapittel = {
  id: "6OP",
  tittel: "Øveprøve",
  quiz: [
    q("Hvilken modell har fast prosentvis vekst?", ["lineær", "andregrads", "potens", "eksponentiell"], 3, "$a\\cdot b^x$."),
    q("$f(x)=-x^2+40x-300$ har toppunkt i", ["$x=20$", "$x=40$", "$x=10$", "$x=-20$"], 0, "$-\\dfrac{40}{-2}=20$."),
    q("Vekstfaktor for $3\\,\\%$ nedgang er", ["$1{,}03$", "$0{,}97$", "$0{,}3$", "$-0{,}03$"], 1, "$1-0{,}03$."),
    q("RegLin gir $y=-1{,}9x+34{,}8$. Omtrent når er $y=0$?", ["$x\\approx 34{,}8$", "$x\\approx -18{,}3$", "$x\\approx 18{,}3$", "$x\\approx 1{,}9$"], 2, "$x=\\dfrac{34{,}8}{1{,}9}\\approx 18{,}3$."),
    q("Hvilken modell passer til tabellen $5$, $10$, $20$, $40$?", ["lineær", "potens", "eksponentiell", "andregrads"], 2, "Fast forhold $2$ mellom verdiene."),
    q("Målt verdi er $21$, og modellen gir $22$. Hva er avviket?", ["$1$", "$43$", "$21$", "$-1$"], 3, "$21-22=-1$."),
  ],
  oppgaver: [
  s("6.OP0", "Øveprøve kapittel 6 — oversikt", "<strong>Kapittel 6 · Modellering — øveprøve</strong><br><strong>Tid:</strong> ca. $90$ min<br><br><strong>Del 1 — uten hjelpemidler</strong> (oppgave $1$–$4$): lineær og eksponentiell modell, toppunkt, gjenkjenne modelltype.<br><br><strong>Del 2 — med hjelpemidler</strong> (oppgave $5$–$10$): lineær, eksponentiell, potens- og andregradsregresjon, avkjøling, vurdering av modeller og et sammensatt modelleringsproblem.<br><br>Vis mellomregning, og kommenter hvor godt modellene passer.", "Gjør del 1 uten kalkulator.", [
    "Dette er oversiktssiden. Gå videre til oppgave $1$–$10$.",
  ]),
  s("6.OP1", "Oppgave 1 — Lineær modell — mobilabonnement", "<em>Del 1 · uten hjelpemidler</em><br><br>Et mobilabonnement koster $150$ kr per måned pluss $20$ kr per GB data.<br><br><strong>a)</strong> Lag en modell $K(x)$ for prisen når du bruker $x$ GB.<br><br><strong>b)</strong> Hvor mange GB har du brukt hvis regningen er $330$ kr?", "Fastbeløp er konstantleddet.", [
    "<strong>a)</strong> $K(x)=20x+150$",
    "<strong>b)</strong> $20x+150=330$ gir $x=9$ GB<br><strong>Svar:</strong> $9$ GB",
  ]),
  s("6.OP2", "Oppgave 2 — Eksponentiell modell — rente", "<em>Del 1 · uten hjelpemidler</em><br><br>Du setter $8000$ kr i banken med $5\\,\\%$ rente per år.<br><br><strong>a)</strong> Skriv en modell for beløpet etter $x$ år.<br><br><strong>b)</strong> Regn ut beløpet etter $2$ år uten kalkulator.", "Hvert år blir beløpet ganget med $1{,}05$.", [
    "<strong>a)</strong> $B(x)=8000\\cdot 1{,}05^x$",
    "<strong>b)</strong> $8000\\cdot 1{,}1025=8820$ kr<br><strong>Svar:</strong> $8820$ kr",
  ]),
  s("6.OP3", "Oppgave 3 — Toppunkt — størst overskudd", "<em>Del 1 · uten hjelpemidler</em><br><br>Overskuddet (i tusen kroner) ved å produsere $x$ enheter er $O(x)=-2x^2+80x-500$.<br><br><strong>a)</strong> Hvor mange enheter gir størst overskudd?<br><br><strong>b)</strong> Hvor stort er det største overskuddet?", "$x=-\\dfrac{b}{2a}$.", [
    "<strong>a)</strong> $x=\\dfrac{-80}{-4}=20$",
    "<strong>b)</strong> $O(20)=-800+1600-500=300$, altså $300\\,000$ kr<br><strong>Svar:</strong> $20$ enheter; $300\\,000$ kr",
  ]),
  s("6.OP4", "Oppgave 4 — Gjenkjenne modelltype", "<em>Del 1 · uten hjelpemidler</em><br><br>Hvilken modelltype passer best til hver tabell? Begrunn og finn modellen.<br><br><strong>a)</strong> $x$: $0$, $1$, $2$, $3$ og $y$: $5$, $8$, $11$, $14$<br><br><strong>b)</strong> $x$: $0$, $1$, $2$, $3$ og $y$: $5$, $10$, $20$, $40$", "Differanse eller forhold?", [
    "<strong>a)</strong> Fast differanse $3$: lineær. $y=3x+5$",
    "<strong>b)</strong> Fast forhold $2$: eksponentiell. $y=5\\cdot 2^x$<br><strong>Svar:</strong> a) $3x+5$ b) $5\\cdot 2^x$",
  ]),
  s("6.OP5", "Oppgave 5 — Lineær regresjon — regntønne", "<em>Del 2 · med hjelpemidler</em><br><br>Tabellen viser hvor mange liter vann $y$ som var igjen i en regntønne $x$ dager etter siste regnvær (tenkte data).<table><tr><th>$x$</th><td>$2$</td><td>$4$</td><td>$6$</td><td>$8$</td><td>$10$</td></tr><tr><th>$y$</th><td>$31$</td><td>$27$</td><td>$24$</td><td>$19$</td><td>$16$</td></tr></table><br><br><strong>a)</strong> Finn en lineær modell ved regresjon.<br><br><strong>b)</strong> Når er tønna tom ifølge modellen?<br><br><strong>c)</strong> Hvorfor kan det være rimelig å bruke en lineær modell her?", "RegLin i GeoGebra.", [
    "<strong>a)</strong> $y\\approx -1{,}90x+34{,}80$",
    "<strong>b)</strong> $y=0$ gir $x\\approx 18{,}3$ dager",
    "<strong>c)</strong> Fordampingen er omtrent den samme hver dag (så lenge været er stabilt), og punktene ligger nær en rett linje.<br><strong>Svar:</strong> tom etter ca. $18$ dager",
  ]),
  s("6.OP6", "Oppgave 6 — Avkjølingsmodell — kake", "<em>Del 2 · med hjelpemidler</em><br><br>En kake tas ut av ovnen. Temperaturen etter $t$ minutter er $T(t)=22+148\\cdot 0{,}95^t$.<br><br><strong>a)</strong> Hva er temperaturen etter $20$ minutter?<br><br><strong>b)</strong> Kaken kan skjæres når den er under $40\\,^\\circ$C. Når skjer det?<br><br><strong>c)</strong> Hva er romtemperaturen? Begrunn.", "Sett $t=20$ inn i $T(t)$.", [
    "<strong>a)</strong> $T(20)\\approx 75{,}1\\,^\\circ$C",
    "<strong>b)</strong> $148\\cdot 0{,}95^t=18$ gir $t\\approx 41{,}1$ min",
    "<strong>c)</strong> $22\\,^\\circ$C, fordi $0{,}95^t\\to 0$ og $T(t)\\to 22$.<br><strong>Svar:</strong> etter ca. $41$ min",
  ]),
  s("6.OP7", "Oppgave 7 — Lineær eller eksponentiell modell — bakterier", "<em>Del 2 · med hjelpemidler</em><br><br>Tabellen viser antallet bakterier $N$ i en kultur $x$ timer etter start (tenkte data, samme som i oppgave 6.10).<table><tr><th>$x$ (timer)</th><td>$0$</td><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$N$</th><td>$500$</td><td>$640$</td><td>$830$</td><td>$1050$</td><td>$1370$</td><td>$1750$</td></tr></table><br><br><br><strong>a)</strong> Finn både en lineær og en eksponentiell modell ved regresjon.<br><br><strong>b)</strong> Sammenlign den lineære og den eksponentielle modellen. Hvilken passer best?<br><br><strong>c)</strong> Gi én grunn til at den eksponentielle modellen ikke kan gjelde i mange døgn.", "Tegn begge modellene sammen med punktene.", [
    "<strong>a)</strong> Lineær: $y\\approx 247{,}4x+404{,}8$. Eksponentiell: $y\\approx 499\\cdot 1{,}285^x$",
    "<strong>b)</strong> Den eksponentielle modellen følger punktene nesten perfekt. Den lineære bommer i begge ender, fordi økningen blir større for hver time.",
    "<strong>c)</strong> Næring og plass tar slutt, så veksten må avta. Ubegrenset eksponentiell vekst er urealistisk.<br><strong>Svar:</strong> eksponentiell modell passer best på kort sikt",
  ]),
  s("6.OP8", "Oppgave 8 — Potensregresjon — stålkuler", "<em>Del 2 · med hjelpemidler</em><br><br>Massen $m$ (gram) til massive stålkuler med radius $r$ (cm) ble målt.<table><tr><th>$r$ (cm)</th><td>$1$</td><td>$2$</td><td>$3$</td><td>$4$</td><td>$5$</td></tr><tr><th>$m$ (g)</th><td>$4{,}2$</td><td>$33{,}5$</td><td>$113$</td><td>$268$</td><td>$524$</td></tr></table><br><strong>a)</strong> Finn en potensmodell $m(r)=a\\cdot r^b$ ved regresjon (<em>RegPot</em>).<br><br><strong>b)</strong> Hva sier modellen om massen til en kule med radius $6$ cm?<br><br><strong>c)</strong> Hvor stor radius har en kule med masse $1$ kg?<br><br><strong>d)</strong> Forklar hvorfor eksponenten blir omtrent $3$.", "Legg tabellen inn i regnearket i GeoGebra og bruk RegPot.", [
    "<strong>a)</strong> $m(r)\\approx 4{,}20\\cdot r^{3{,}00}$",
    "<strong>b)</strong> $m(6)\\approx 904$ g",
    "<strong>c)</strong> $4{,}20\\cdot r^{3{,}00}=1000$ gir $r\\approx 6{,}2$ cm",
    "<strong>d)</strong> Massen er tetthet ganger volum, og volumet av en kule er $\\tfrac43\\pi r^3$. Derfor er $m$ proporsjonal med $r^3$.<br><strong>Svar:</strong> $m\\approx 4{,}20\\cdot r^{3}$; ca. $904$ g; $r\\approx 6{,}2$ cm",
  ]),
  s("6.OP9", "Oppgave 9 — Andregradsregresjon — ballkast", "<em>Del 2 · med hjelpemidler</em><br><br>En ball kastes på skrå. Høyden $h$ (meter) etter $t$ sekunder ble målt fra en video.<table><tr><th>$t$ (s)</th><td>$0$</td><td>$0{,}5$</td><td>$1$</td><td>$1{,}5$</td><td>$2$</td><td>$2{,}5$</td></tr><tr><th>$h$ (m)</th><td>$1{,}8$</td><td>$6{,}9$</td><td>$9{,}6$</td><td>$9{,}9$</td><td>$7{,}8$</td><td>$3{,}3$</td></tr></table><br><strong>a)</strong> Finn en andregradsmodell ved regresjon (<em>RegPoly</em> grad $2$).<br><br><strong>b)</strong> Når er ballen høyest, og hvor høyt er den da?<br><br><strong>c)</strong> Når treffer ballen bakken? Angi et gyldighetsområde for modellen.", "Legg tabellen inn i regnearket i GeoGebra og bruk RegPoly med grad $2$.", [
    "<strong>a)</strong> $h(t)\\approx -4{,}8t^2+12{,}6t+1{,}8$",
    "<strong>b)</strong> $t=\\dfrac{-12{,}6}{2\\cdot(-4{,}8)}\\approx 1{,}31$ s og $h(1{,}31)\\approx 10{,}1$ m",
    "<strong>c)</strong> $h(t)=0$ gir $t\\approx 2{,}76$ s (den negative løsningen forkastes). $D_h=[0,\\;2{,}76]$<br><strong>Svar:</strong> topp ca. $10{,}1$ m etter $1{,}31$ s; lander etter ca. $2{,}8$ s",
  ]),
  s("6.OP10", "Oppgave 10 — Sammensatt modellering — overskudd", "<em>Del 2 · med hjelpemidler</em><br><br>En liten bedrift lager $x$ lamper per måned. Kostnadene er $K(x)=0{,}5x^2+20x+800$ kroner, og hver lampe selges for $100$ kr.<br><br><strong>a)</strong> Vis at overskuddet er $O(x)=-0{,}5x^2+80x-800$.<br><br><strong>b)</strong> Hvor mange lamper gir størst overskudd, og hvor stort er det?<br><br><strong>c)</strong> Hvor mange lamper må bedriften lage for å gå med overskudd?<br><br><strong>d)</strong> Hvorfor er det urimelig å bruke modellen for svært store $x$?", "Overskudd $=$ inntekt $-$ kostnad, og inntekten er $I(x)=100x$.", [
    "<strong>a)</strong> $O(x)=100x-(0{,}5x^2+20x+800)=-0{,}5x^2+80x-800$",
    "<strong>b)</strong> $x=\\dfrac{-80}{2\\cdot(-0{,}5)}=80$ lamper. $O(80)=-3200+6400-800=2400$ kr",
    "<strong>c)</strong> $O(x)=0$ gir $x=80\\pm 40\\sqrt3$, altså $x\\approx 10{,}7$ og $x\\approx 149{,}3$. Overskudd for $11\\le x\\le 149$ lamper.",
    "<strong>d)</strong> Prisen $100$ kr per lampe og kostnadsmodellen gjelder trolig bare for vanlige produksjonsmengder. Ved svært stor produksjon endres både etterspørsel og kostnader.<br><strong>Svar:</strong> $80$ lamper gir $2400$ kr; overskudd for $11$–$149$ lamper",
  ]),
  ],
};

export const KAP6: Kapittel = { id: "kap6", tittel: "Kapittel 6: Modellering", delkapitler: [dk6A, dk6B, dk6C, dk6SM, dk6OP] };
