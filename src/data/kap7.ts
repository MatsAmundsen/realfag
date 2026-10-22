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

const dk7A: Delkapittel = {
  id: "7A",
  tittel: "7A Pytagorassetningen",
  quiz: [
    q("Pytagoras gjelder for", ["alle trekanter", "rettvinklede trekanter", "likesidede trekanter", "stumpvinklede trekanter"], 1, "$a^2+b^2=c^2$ der $c$ er hypotenusen."),
    q("Katetene er $3$ og $4$. Hypotenusen er", ["$5$", "$7$", "$12$", "$25$"], 0, "$\\sqrt{9+16}=5$."),
    q("Er en trekant med sider $5$, $12$, $13$ rettvinklet?", ["Ja", "Nei", "Kan ikke avgjøres", "Bare hvis vinkelen er $60^\\circ$"], 0, "$25+144=169$."),
  ],
  oppgaver: [
    o("7.1", "I en rettvinklet trekant er katetene $6$ cm og $8$ cm. Finn hypotenusen.", "Pytagoras: $c^2=a^2+b^2$.", [
      "$c^2=36+64=100$, så $c=10$<br><strong>Svar:</strong> $10$ cm",
    ]),
    o("7.2", "Hypotenusen i en rettvinklet trekant er $13$ cm, og den ene kateten er $5$ cm. Finn den andre kateten.", "$b^2=c^2-a^2$.", [
      "$b^2=169-25=144$, så $b=12$<br><strong>Svar:</strong> $12$ cm",
    ]),
    o("7.3", "Avgjør om trekantene er rettvinklede.<br><br><strong>a)</strong> Sider $7$, $24$ og $25$<br><br><strong>b)</strong> Sider $6$, $8$ og $11$", "Sjekk om kvadratet av den lengste siden er lik summen av kvadratene av de to andre.", [
      "<strong>a)</strong> $49+576=625=25^2$. Ja, rettvinklet.",
      "<strong>b)</strong> $36+64=100\\neq 121$. Nei. Siden $121>100$, er vinkelen stump.<br><strong>Svar:</strong> a) ja b) nei",
    ]),
    o("7.4", "En stige som er $5{,}0$ m lang, står mot en vegg. Foten av stigen står $1{,}4$ m fra veggen. Hvor høyt opp på veggen når stigen?", "Stigen er hypotenusen.", [
      "$h=\\sqrt{5{,}0^2-1{,}4^2}=\\sqrt{23{,}04}=4{,}8$<br><strong>Svar:</strong> $4{,}8$ m",
    ]),
    o("7.5", "En TV-skjerm har diagonal $55$ tommer. Forholdet mellom bredde og høyde er $16:9$. Finn bredden og høyden i tommer.", "Sett bredden til $16k$ og høyden til $9k$.", [
      "$(16k)^2+(9k)^2=55^2$<br>$337k^2=3025$<br>$k=\\dfrac{55}{\\sqrt{337}}$",
      "Bredde $16k\\approx 47{,}9$, høyde $9k\\approx 27{,}0$<br><strong>Svar:</strong> ca. $47{,}9$ og $27{,}0$ tommer",
    ]),
    o("7.6", "En likesidet trekant har sider $6$.<br><br><strong>a)</strong> Finn høyden eksakt.<br><br><strong>b)</strong> Finn arealet eksakt.", "Høyden deler grunnlinjen i to like deler.", [
      "<strong>a)</strong> $h^2=6^2-3^2=27$, så $h=\\sqrt{27}=3\\sqrt 3$",
      "<strong>b)</strong> $A=\\dfrac{6\\cdot 3\\sqrt3}{2}=9\\sqrt 3$<br><strong>Svar:</strong> $3\\sqrt3$ og $9\\sqrt3$",
    ]),
    o("7.7", "Den ene kateten i en rettvinklet trekant er $7$ lenger enn den andre. Hypotenusen er $13$. Finn katetene.", "Sett opp $x^2+(x+7)^2=13^2$.", [
      "$2x^2+14x+49=169$<br>$x^2+7x-60=0$<br>$(x+12)(x-5)=0$",
      "$x=5$ (lengde må være positiv).<br><strong>Svar:</strong> $5$ og $12$",
    ]),
    o("7.8", "En eske har lengde $12$ cm, bredde $4$ cm og høyde $3$ cm. Finn lengden av romdiagonalen.", "Finn først diagonalen i bunnen, og bruk Pytagoras én gang til.", [
      "Bunndiagonal: $d^2=12^2+4^2=160$",
      "Romdiagonal: $D^2=160+3^2=169$, så $D=13$<br><strong>Svar:</strong> $13$ cm",
    ]),
  ],
};

const dk7B: Delkapittel = {
  id: "7B",
  tittel: "7B Formlikhet",
  quiz: [
    q("To trekanter er formlike hvis", ["de har samme areal", "to og to vinkler er like store", "de har én lik side", "de er begge rettvinklede"], 1, "Når to vinkler er like, blir den tredje også lik."),
    q("Sidene forstørres med faktor $2$. Arealet blir", ["$2$ ganger så stort", "$4$ ganger så stort", "$8$ ganger så stort", "uendret"], 1, "Areal skalerer med $k^2$."),
    q("$\\triangle ABC\\sim\\triangle DEF$, $AB=4$, $DE=10$, $BC=6$. $EF$ er", ["$12$", "$15$", "$2{,}4$", "$16$"], 1, "$6\\cdot 2{,}5=15$."),
  ],
  oppgaver: [
    o("7.9", "Trekant $ABC$ har sider $4$, $6$ og $8$. Trekant $DEF$ har sider $6$, $9$ og $12$. Er trekantene formlike? Finn i så fall målestokken.", "Sammenlign forholdene mellom samsvarende sider (minst med minst, størst med størst).", [
      "$\\dfrac{6}{4}=\\dfrac{9}{6}=\\dfrac{12}{8}=1{,}5$. Alle forholdene er like.<br><strong>Svar:</strong> Ja, forholdet er $1{,}5$",
    ]),
    o("7.10", "Trekantene $ABC$ og $PQR$ er formlike med $\\angle A=\\angle P$, $\\angle B=\\angle Q$. Vi vet at $AB=5$, $BC=7$, $PQ=8$ og $PR=12$. Finn $QR$ og $AC$.", "$\\dfrac{PQ}{AB}=\\dfrac{QR}{BC}=\\dfrac{PR}{AC}$.", [
      "Forhold $k=\\dfrac{8}{5}=1{,}6$",
      "$QR=1{,}6\\cdot 7=11{,}2$ og $AC=\\dfrac{12}{1{,}6}=7{,}5$<br><strong>Svar:</strong> $QR=11{,}2$, $AC=7{,}5$",
    ]),
    o("7.11", "En pinne som er $1{,}5$ m høy, kaster en skygge på $2{,}0$ m. Samtidig kaster et tre en skygge på $14$ m. Hvor høyt er treet?", "Solstrålene danner like vinkler, så trekantene er formlike.", [
      "$\\dfrac{h}{14}=\\dfrac{1{,}5}{2{,}0}$, så $h=10{,}5$<br><strong>Svar:</strong> $10{,}5$ m",
    ]),
    o("7.12", "I trekant $ABC$ ligger $D$ på $AB$ og $E$ på $AC$, og $DE$ er parallell med $BC$. Vi vet at $AD=4$, $DB=6$ og $DE=5$.<br><br><strong>a)</strong> Forklar hvorfor $\\triangle ADE\\sim\\triangle ABC$.<br><br><strong>b)</strong> Finn $BC$.", "$AB=AD+DB$.", [
      "<strong>a)</strong> $\\angle A$ er felles. $\\angle ADE=\\angle ABC$ (samsvarende vinkler ved parallelle linjer).",
      "<strong>b)</strong> $\\dfrac{BC}{5}=\\dfrac{10}{4}$, så $BC=12{,}5$<br><strong>Svar:</strong> $12{,}5$",
    ]),
    o("7.13", "En trekant har areal $12$ cm². Den forstørres slik at alle sidene blir $3$ ganger så lange. Hva blir det nye arealet?", "Areal skalerer med kvadratet av forholdet.", [
      "$12\\cdot 3^2=108$<br><strong>Svar:</strong> $108$ cm²",
    ]),
    o("7.14", "Trekant 1 har vinkler $50^\\circ$ og $60^\\circ$. Trekant 2 har vinkler $60^\\circ$ og $70^\\circ$. Er trekantene formlike?", "Finn den tredje vinkelen i hver trekant.", [
      "Trekant 1: $180^\\circ-110^\\circ=70^\\circ$. Trekant 2: $180^\\circ-130^\\circ=50^\\circ$.",
      "Begge har vinklene $50^\\circ$, $60^\\circ$ og $70^\\circ$.<br><strong>Svar:</strong> Ja, formlike",
    ]),
    o("7.15", "Trekant $ABC$ er rettvinklet i $C$ med $AC=6$, $BC=8$ og $AB=10$. Høyden $CD$ står vinkelrett på $AB$.<br><br><strong>a)</strong> Forklar hvorfor $\\triangle ACD\\sim\\triangle ABC$.<br><br><strong>b)</strong> Finn $AD$ og $CD$.", "Begge trekantene har en rett vinkel, og $\\angle A$ er felles.", [
      "<strong>a)</strong> $\\angle A$ er felles, og begge har en rett vinkel.",
      "<strong>b)</strong> $\\dfrac{AD}{AC}=\\dfrac{AC}{AB}$ gir $AD=\\dfrac{36}{10}=3{,}6$.<br>$\\dfrac{CD}{BC}=\\dfrac{AC}{AB}$ gir $CD=\\dfrac{6\\cdot 8}{10}=4{,}8$<br><strong>Svar:</strong> $AD=3{,}6$, $CD=4{,}8$",
    ]),
  ],
};

const dk7C: Delkapittel = {
  id: "7C",
  tittel: "7C Tangens, sinus og cosinus",
  quiz: [
    q("$\\sin v$ i en rettvinklet trekant er", ["hosliggende/hypotenus", "motstående/hypotenus", "motstående/hosliggende", "hypotenus/motstående"], 1, "SOH: sinus = motstående over hypotenus."),
    q("$\\tan 45^\\circ$ er", ["$0$", "$1$", "$\\sqrt2$", "$\\dfrac{\\sqrt2}{2}$"], 1, "Katetene er like lange."),
    q("Du kjenner hosliggende katet og hypotenus. Vinkelen finner du med", ["$\\sin^{-1}$", "$\\cos^{-1}$", "$\\tan^{-1}$", "Pytagoras"], 1, "$\\cos v=$ hosliggende/hypotenus."),
    q("$\\cos 60^\\circ$ er", ["$\\dfrac12$", "$\\dfrac{\\sqrt3}{2}$", "$1$", "$\\sqrt3$"], 0, "Fra 30–60–90-trekanten."),
  ],
  oppgaver: [
    o("7.16", "En rettvinklet trekant har kateter $3$ og $4$ og hypotenus $5$. La $v$ være vinkelen som ligger motsatt kateten med lengde $3$.<br><br>Finn $\\sin v$, $\\cos v$ og $\\tan v$.", "Motstående katet er $3$, hosliggende katet er $4$.", [
      "$\\sin v=\\dfrac35=0{,}6$, $\\cos v=\\dfrac45=0{,}8$, $\\tan v=\\dfrac34=0{,}75$",
    ]),
    o("7.17", "I en rettvinklet trekant er hypotenusen $12$ cm, og den ene spisse vinkelen er $35^\\circ$. Finn de to katetene.", "Motstående: $12\\sin 35^\\circ$. Hosliggende: $12\\cos35^\\circ$.", [
      "Motstående $=12\\sin35^\\circ\\approx 6{,}88$ cm. Hosliggende $=12\\cos35^\\circ\\approx 9{,}83$ cm<br><strong>Svar:</strong> ca. $6{,}88$ cm og $9{,}83$ cm",
    ]),
    o("7.18", "I en rettvinklet trekant er katetene $5$ og $8$. Finn vinkelen som ligger motsatt kateten med lengde $5$.", "$\\tan v=\\dfrac{5}{8}$.", [
      "$v=\\tan^{-1}\\left(\\dfrac58\\right)\\approx 32{,}0^\\circ$<br><strong>Svar:</strong> ca. $32{,}0^\\circ$",
    ]),
    o("7.19", "Du står $25$ m fra et tre på flat mark. Vinkelen opp til toppen av treet er $38^\\circ$, målt fra bakkenivå. Hvor høyt er treet?", "$\\tan 38^\\circ=\\dfrac{h}{25}$.", [
      "$h=25\\tan38^\\circ\\approx 19{,}5$ m<br><strong>Svar:</strong> ca. $19{,}5$ m",
    ]),
    o("7.20", "En rettvinklet trekant har vinkler $30^\\circ$, $60^\\circ$ og $90^\\circ$, og hypotenus $2$.<br><br><strong>a)</strong> Forklar at den korteste kateten er $1$, og finn den andre kateten eksakt.<br><br><strong>b)</strong> Finn eksakte verdier for $\\sin30^\\circ$, $\\cos30^\\circ$ og $\\tan60^\\circ$.", "Speil trekanten om den lengste kateten, så får du en likesidet trekant.", [
      "<strong>a)</strong> Speilingen gir en likesidet trekant med side $2$, så den korte kateten er $1$. Den andre er $\\sqrt{4-1}=\\sqrt3$.",
      "<strong>b)</strong> $\\sin30^\\circ=\\dfrac12$, $\\cos30^\\circ=\\dfrac{\\sqrt3}{2}$, $\\tan60^\\circ=\\dfrac{\\sqrt3}{1}=\\sqrt3$",
    ]),
    o("7.21", "En rullestolrampe er $4{,}0$ m lang (langs skråflaten) og heller $6^\\circ$.<br><br><strong>a)</strong> Hvor høyt opp fører rampen?<br><br><strong>b)</strong> En anbefaling sier at stigningen ikke bør være brattere enn $1:12$ (høyde : lengde langs bakken). Hvilken vinkel svarer det til?", "I a) er rampen hypotenusen. I b) er $\\tan v=\\dfrac1{12}$.", [
      "<strong>a)</strong> $h=4{,}0\\sin6^\\circ\\approx 0{,}42$ m",
      "<strong>b)</strong> $v=\\tan^{-1}\\left(\\dfrac1{12}\\right)\\approx 4{,}8^\\circ$. Rampen på $6^\\circ$ er altså brattere enn anbefalt.<br><strong>Svar:</strong> ca. $0{,}42$ m; ca. $4{,}8^\\circ$",
    ]),
    o("7.22", "I en rettvinklet trekant er den ene kateten $7$, og vinkelen mellom denne kateten og hypotenusen er $40^\\circ$. Finn hypotenusen og den andre kateten.", "Kateten på $7$ er hosliggende til vinkelen.", [
      "$\\cos40^\\circ=\\dfrac{7}{c}$ gir $c=\\dfrac{7}{\\cos40^\\circ}\\approx 9{,}14$",
      "$\\tan40^\\circ=\\dfrac{b}{7}$ gir $b\\approx 5{,}87$<br><strong>Svar:</strong> ca. $9{,}14$ og $5{,}87$",
    ]),
    o("7.23", "Fra et punkt på bakken $40$ m fra en bygning ser du bunnen av en flaggstang på taket under vinkelen $30^\\circ$ og toppen av flaggstanga under vinkelen $35^\\circ$. Hvor lang er flaggstanga?", "Finn høyden til bunnen og til toppen hver for seg, og trekk fra.", [
      "Til taket: $40\\tan30^\\circ\\approx 23{,}09$ m. Til toppen: $40\\tan35^\\circ\\approx 28{,}01$ m",
      "Flaggstang: $\\approx 4{,}9$ m<br><strong>Svar:</strong> ca. $4{,}9$ m",
    ]),
  ],
};

const dk7D: Delkapittel = {
  id: "7D",
  tittel: "7D Generell definisjon av sin v og cos v",
  quiz: [
    q("I enhetssirkelen er $\\cos v$", ["$y$-koordinaten", "$x$-koordinaten", "radien", "vinkelen"], 1, "$P=(\\cos v,\\sin v)$."),
    q("$\\sin(180^\\circ-v)$ er lik", ["$\\sin v$", "$-\\sin v$", "$\\cos v$", "$-\\cos v$"], 0, "Speiling om $y$-aksen beholder $y$-koordinaten."),
    q("For en stump vinkel er $\\cos v$", ["positiv", "negativ", "null", "større enn $1$"], 1, "Punktet ligger til venstre for $y$-aksen."),
  ],
  oppgaver: [
    o("7.24", "Vinkelen $v=150^\\circ$ tegnes i enhetssirkelen. Finn koordinatene til punktet $P$ eksakt.", "$P=(\\cos v,\\sin v)$. Bruk $\\cos(180^\\circ-v)=-\\cos v$ og $\\sin(180^\\circ-v)=\\sin v$.", [
      "$\\cos150^\\circ=-\\cos30^\\circ=-\\dfrac{\\sqrt3}{2}$, $\\sin150^\\circ=\\sin30^\\circ=\\dfrac12$<br><strong>Svar:</strong> $P=\\left(-\\dfrac{\\sqrt3}{2},\\,\\dfrac12\\right)$",
    ]),
    o("7.25", "Avgjør om tallet er positivt, negativt eller null.<br><br><strong>a)</strong> $\\sin 120^\\circ$<br><br><strong>b)</strong> $\\cos 170^\\circ$<br><br><strong>c)</strong> $\\cos 90^\\circ$<br><br><strong>d)</strong> $\\tan 135^\\circ$", "Mellom $90^\\circ$ og $180^\\circ$ ligger punktet til venstre for $y$-aksen og over $x$-aksen.", [
      "<strong>a)</strong> positivt",
      "<strong>b)</strong> negativt",
      "<strong>c)</strong> null",
      "<strong>d)</strong> negativt ($\\tan135^\\circ=-1$)",
    ]),
    o("7.26", "Bruk kalkulatoren og regn ut $\\sin140^\\circ$, $\\sin40^\\circ$, $\\cos140^\\circ$ og $\\cos40^\\circ$. Hvilken sammenheng ser du? Forklar med enhetssirkelen.", "$140^\\circ$ og $40^\\circ$ er supplementvinkler.", [
      "$\\sin140^\\circ\\approx\\sin40^\\circ\\approx 0{,}6428$. $\\cos140^\\circ\\approx -0{,}7660$ og $\\cos40^\\circ\\approx 0{,}7660$.",
      "Punktene for $40^\\circ$ og $140^\\circ$ er speilbilder om $y$-aksen. Da er $y$-koordinaten lik, og $x$-koordinaten har motsatt fortegn.<br><strong>Svar:</strong> $\\sin(180^\\circ-v)=\\sin v$ og $\\cos(180^\\circ-v)=-\\cos v$",
    ]),
    o("7.27", "Finn alle vinkler $v$ mellom $0^\\circ$ og $180^\\circ$ slik at $\\sin v=\\dfrac12$.", "Det finnes to vinkler: $v$ og $180^\\circ-v$.", [
      "$v=30^\\circ$ eller $v=180^\\circ-30^\\circ=150^\\circ$<br><strong>Svar:</strong> $30^\\circ$ og $150^\\circ$",
    ]),
    o("7.28", "Finn vinkelen $v$ mellom $0^\\circ$ og $180^\\circ$ når $\\cos v=-0{,}6$.", "Cosinus bestemmer vinkelen entydig mellom $0^\\circ$ og $180^\\circ$.", [
      "$v=\\cos^{-1}(-0{,}6)\\approx 126{,}9^\\circ$<br><strong>Svar:</strong> ca. $126{,}9^\\circ$",
    ]),
    o("7.29", "Fyll ut eksakte verdier i tabellen for $v=120^\\circ$, $135^\\circ$ og $150^\\circ$: $\\sin v$, $\\cos v$ og $\\tan v$.", "Bruk supplementvinklene $60^\\circ$, $45^\\circ$ og $30^\\circ$.", [
      "$120^\\circ$: $\\sin=\\dfrac{\\sqrt3}{2}$, $\\cos=-\\dfrac12$, $\\tan=-\\sqrt3$",
      "$135^\\circ$: $\\sin=\\dfrac{\\sqrt2}{2}$, $\\cos=-\\dfrac{\\sqrt2}{2}$, $\\tan=-1$",
      "$150^\\circ$: $\\sin=\\dfrac12$, $\\cos=-\\dfrac{\\sqrt3}{2}$, $\\tan=-\\dfrac{\\sqrt3}{3}$",
    ]),
    o("7.30", "Vinkelen $v$ er stump, og $\\sin v=\\dfrac35$. Finn $\\cos v$ og $\\tan v$ eksakt.", "Punktet $(\\cos v,\\sin v)$ ligger på enhetssirkelen, så $\\cos^2v+\\sin^2v=1$.", [
      "$\\cos^2v=1-\\dfrac9{25}=\\dfrac{16}{25}$. Siden $v$ er stump, er $\\cos v<0$: $\\cos v=-\\dfrac45$",
      "$\\tan v=\\dfrac{\\sin v}{\\cos v}=-\\dfrac34$<br><strong>Svar:</strong> $\\cos v=-\\dfrac45$, $\\tan v=-\\dfrac34$",
    ]),
  ],
};

const dk7E: Delkapittel = {
  id: "7E",
  tittel: "7E Arealsetningen",
  quiz: [
    q("Arealsetningen er", ["$T=\\dfrac12 ab\\cos C$", "$T=\\dfrac12 ab\\sin C$", "$T=ab\\sin C$", "$T=\\dfrac12 a^2\\sin C$"], 1, "$C$ er vinkelen mellom sidene $a$ og $b$."),
    q("Sider $4$ og $5$ med $90^\\circ$ mellom gir arealet", ["$10$", "$20$", "$5$", "$9$"], 0, "$\\sin90^\\circ=1$."),
    q("Gitt areal og to sider kan vinkelen mellom dem ha", ["alltid én verdi", "opptil to verdier", "ingen verdi", "tre verdier"], 1, "$v$ og $180^\\circ-v$ har samme sinus."),
  ],
  oppgaver: [
    o("7.31", "I en trekant er to av sidene $7$ cm og $10$ cm, og vinkelen mellom dem er $52^\\circ$. Finn arealet.", "$T=\\dfrac12 ab\\sin C$.", [
      "$T=\\dfrac12\\cdot7\\cdot10\\cdot\\sin52^\\circ\\approx 27{,}6$<br><strong>Svar:</strong> ca. $27{,}6$ cm²",
    ]),
    o("7.32", "Finn arealet eksakt.<br><br><strong>a)</strong> To sider er $6$ og $4$, og vinkelen mellom dem er $30^\\circ$.<br><br><strong>b)</strong> Samme sider, men vinkelen er $150^\\circ$. Forklar resultatet.", "$\\sin30^\\circ=\\sin150^\\circ=\\dfrac12$.", [
      "<strong>a)</strong> $T=\\dfrac12\\cdot6\\cdot4\\cdot\\dfrac12=6$",
      "<strong>b)</strong> Også $6$, fordi $\\sin150^\\circ=\\sin30^\\circ$.<br><strong>Svar:</strong> $6$ i begge tilfeller",
    ]),
    o("7.33", "Finn arealet av en trekant der to sider er $9$ m og $12$ m, og vinkelen mellom dem er $115^\\circ$.", "Arealsetningen gjelder også for stumpe vinkler.", [
      "$T=\\dfrac12\\cdot9\\cdot12\\cdot\\sin115^\\circ\\approx 48{,}9$<br><strong>Svar:</strong> ca. $48{,}9$ m²",
    ]),
    o("7.34", "En trekant har areal $20$ cm². To av sidene er $8$ cm og $7$ cm. Finn vinkelen mellom disse sidene. Hvor mange løsninger finnes?", "$\\sin C=\\dfrac{2T}{ab}$. Husk at $\\sin v=\\sin(180^\\circ-v)$.", [
      "$\\sin C=\\dfrac{40}{56}=\\dfrac57$",
      "$C\\approx 45{,}6^\\circ$ eller $C\\approx 134{,}4^\\circ$<br><strong>Svar:</strong> to løsninger: ca. $45{,}6^\\circ$ og $134{,}4^\\circ$",
    ]),
    o("7.35", "En trekant har areal $30$ m². Én side er $10$ m, og vinkelen mellom denne siden og en annen side $b$ er $40^\\circ$. Finn $b$.", "Løs $\\dfrac12\\cdot10\\cdot b\\cdot\\sin40^\\circ=30$.", [
      "$b=\\dfrac{60}{10\\sin40^\\circ}\\approx 9{,}33$<br><strong>Svar:</strong> ca. $9{,}33$ m",
    ]),
    o("7.36", "Et parallellogram har sider $6$ og $9$, og den ene vinkelen er $70^\\circ$. Finn arealet.", "En diagonal deler parallellogrammet i to like trekanter.", [
      "$A=2\\cdot\\dfrac12\\cdot6\\cdot9\\cdot\\sin70^\\circ=54\\sin70^\\circ\\approx 50{,}7$<br><strong>Svar:</strong> ca. $50{,}7$",
    ]),
    o("7.37", "En tomt $ABCD$ deles av diagonalen $AC$ i to trekanter. Vi vet at $AB=40$ m, $BC=30$ m, $\\angle B=100^\\circ$, $AD=35$ m, $CD=28$ m og $\\angle D=85^\\circ$. Finn arealet av tomten.", "Regn ut arealet av $\\triangle ABC$ og $\\triangle ACD$ hver for seg.", [
      "$T_{ABC}=\\dfrac12\\cdot40\\cdot30\\sin100^\\circ\\approx 590{,}9$ m²",
      "$T_{ACD}=\\dfrac12\\cdot35\\cdot28\\sin85^\\circ\\approx 488{,}1$ m²",
      "Sum $\\approx 1079$ m²<br><strong>Svar:</strong> ca. $1080$ m²",
    ]),
  ],
};

const dk7F: Delkapittel = {
  id: "7F",
  tittel: "7F Sinussetningen",
  quiz: [
    q("Sinussetningen brukes når du kjenner", ["tre sider", "to sider og vinkelen mellom dem", "en side og den motstående vinkelen, pluss én til opplysning", "bare vinkler"], 2, "Du trenger et par: side og motstående vinkel."),
    q("Kjent: to sider og en vinkel som ikke ligger mellom dem. Antall løsninger kan være", ["alltid én", "$0$, $1$ eller $2$", "alltid to", "uendelig mange"], 1, "Dette er det tvetydige tilfellet."),
    q("$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}$ med $a=10$, $A=30^\\circ$, $B=90^\\circ$ gir $b=$", ["$5$", "$20$", "$10$", "$10\\sqrt3$"], 1, "$b=\\dfrac{10\\cdot1}{1/2}=20$."),
  ],
  oppgaver: [
    o("7.38", "I trekant $ABC$ er $\\angle A=40^\\circ$, $\\angle B=75^\\circ$ og $a=8$. Finn $\\angle C$, $b$ og $c$.", "$\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}$.", [
      "$\\angle C=180^\\circ-40^\\circ-75^\\circ=65^\\circ$",
      "$b=\\dfrac{8\\sin75^\\circ}{\\sin40^\\circ}\\approx 12{,}02$, $c=\\dfrac{8\\sin65^\\circ}{\\sin40^\\circ}\\approx 11{,}28$<br><strong>Svar:</strong> $C=65^\\circ$, $b\\approx12{,}0$, $c\\approx11{,}3$",
    ]),
    o("7.39", "I trekant $ABC$ er $a=12$, $b=9$ og $\\angle A=70^\\circ$. Finn $\\angle B$, $\\angle C$ og $c$. Forklar hvorfor det bare finnes én løsning.", "$\\sin B=\\dfrac{b\\sin A}{a}$.", [
      "$\\sin B=\\dfrac{9\\sin70^\\circ}{12}$ gir $B\\approx 44{,}8^\\circ$. Den andre muligheten $180^\\circ-44{,}8^\\circ$ er for stor, fordi $A$ allerede er $70^\\circ$ (og $b<a$ betyr $B<A$).",
      "$C\\approx 65{,}2^\\circ$, $c=\\dfrac{12\\sin C}{\\sin70^\\circ}\\approx 11{,}6$<br><strong>Svar:</strong> $B\\approx44{,}8^\\circ$, $C\\approx65{,}2^\\circ$, $c\\approx11{,}6$",
    ]),
    o("7.40", "I trekant $ABC$ er $\\angle A=35^\\circ$, $a=6$ og $b=9$. Vis at det finnes to trekanter, og finn $\\angle B$, $\\angle C$ og $c$ i begge.", "Høyden fra $C$ er $b\\sin A$. Sammenlign med $a$ og $b$.", [
      "$b\\sin A=9\\sin35^\\circ\\approx 5{,}16$. Siden $5{,}16<6<9$, finnes to trekanter.",
      "$\\sin B=\\dfrac{9\\sin35^\\circ}{6}$ gir $B_1\\approx 59{,}4^\\circ$ eller $B_2\\approx 120{,}6^\\circ$",
      "Trekant 1: $C\\approx 85{,}6^\\circ$, $c\\approx 10{,}43$. Trekant 2: $C\\approx 24{,}4^\\circ$, $c\\approx 4{,}31$",
    ]),
    o("7.41", "I trekant $ABC$ skal $\\angle A=60^\\circ$, $a=4$ og $b=6$. Vis at en slik trekant ikke finnes.", "Regn ut $\\sin B$.", [
      "$\\sin B=\\dfrac{6\\sin60^\\circ}{4}=\\dfrac{3\\sqrt3}{4}\\approx 1{,}30>1$. Umulig.<br><strong>Svar:</strong> ingen trekant (høyden $6\\sin60^\\circ\\approx5{,}2$ er lengre enn $a=4$)",
    ]),
    o("7.42", "I trekant $ABC$ er $\\angle A=30^\\circ$, $\\angle B=45^\\circ$ og $a=4$. Finn $b$ eksakt.", "$\\sin30^\\circ=\\dfrac12$, $\\sin45^\\circ=\\dfrac{\\sqrt2}{2}$.", [
      "$b=\\dfrac{4\\cdot\\frac{\\sqrt2}{2}}{\\frac12}=4\\sqrt2$<br><strong>Svar:</strong> $b=4\\sqrt2$",
    ]),
    o("7.43", "To observatører $A$ og $B$ står $500$ m fra hverandre langs en rett strandlinje. De ser et skip $S$. Vinkelen mellom strandlinjen og siktlinjen er $48^\\circ$ ved $A$ og $62^\\circ$ ved $B$.<br><br><strong>a)</strong> Finn avstanden fra $A$ til skipet.<br><br><strong>b)</strong> Hvor langt er skipet fra strandlinjen?", "Finn først vinkelen ved $S$.", [
      "<strong>a)</strong> $\\angle S=70^\\circ$. $AS=\\dfrac{500\\sin62^\\circ}{\\sin70^\\circ}\\approx 470$ m",
      "<strong>b)</strong> $d=AS\\cdot\\sin48^\\circ\\approx 349$ m<br><strong>Svar:</strong> ca. $470$ m og $349$ m",
    ]),
    o("7.44", "Bruk arealsetningen til å vise sinussetningen.<br><br>Arealet av trekant $ABC$ kan skrives på tre måter: $\\dfrac12bc\\sin A=\\dfrac12ac\\sin B=\\dfrac12ab\\sin C$.", "Del alle tre uttrykkene på $\\dfrac12abc$.", [
      "Deler vi på $\\dfrac12abc$, får vi $\\dfrac{\\sin A}{a}=\\dfrac{\\sin B}{b}=\\dfrac{\\sin C}{c}$, som er sinussetningen.",
    ]),
  ],
};

const dk7G: Delkapittel = {
  id: "7G",
  tittel: "7G Cosinussetningen",
  quiz: [
    q("Cosinussetningen brukes når du kjenner", ["to vinkler og en side", "to sider og vinkelen mellom dem, eller tre sider", "bare én side", "en side og den motstående vinkelen"], 1, "SVS eller SSS."),
    q("$a^2=b^2+c^2-2bc\\cos A$ med $A=90^\\circ$ gir", ["$a^2=b^2+c^2$", "$a=b+c$", "$a^2=b^2-c^2$", "ingenting"], 0, "Pytagoras."),
    q("Hvis $\\cos C<0$, er vinkel $C$", ["spiss", "rett", "stump", "null"], 2, "Cosinus er negativ for vinkler mellom $90^\\circ$ og $180^\\circ$."),
  ],
  oppgaver: [
    o("7.45", "I trekant $ABC$ er $b=5$, $c=7$ og $\\angle A=60^\\circ$. Finn $a$ eksakt.", "$a^2=b^2+c^2-2bc\\cos A$, og $\\cos60^\\circ=\\dfrac12$.", [
      "$a^2=25+49-2\\cdot5\\cdot7\\cdot\\dfrac12=39$<br><strong>Svar:</strong> $a=\\sqrt{39}\\approx 6{,}24$",
    ]),
    o("7.46", "En trekant har sider $4$, $6$ og $7$. Finn alle vinklene.", "Finn én vinkel med cosinussetningen, deretter en til, og bruk vinkelsummen til slutt.", [
      "$\\cos A=\\dfrac{36+49-16}{2\\cdot6\\cdot7}=\\dfrac{69}{84}$, så $A\\approx 34{,}8^\\circ$",
      "$\\cos B=\\dfrac{16+49-36}{2\\cdot4\\cdot7}=\\dfrac{29}{56}$, så $B\\approx 58{,}8^\\circ$",
      "$C\\approx 86{,}4^\\circ$<br><strong>Svar:</strong> ca. $34{,}8^\\circ$, $58{,}8^\\circ$ og $86{,}4^\\circ$",
    ]),
    o("7.47", "En trekant har sider $3$, $5$ og $7$. Finn den største vinkelen eksakt.", "Den største vinkelen ligger motsatt den lengste siden.", [
      "$\\cos C=\\dfrac{9+25-49}{2\\cdot3\\cdot5}=-\\dfrac12$<br><strong>Svar:</strong> $C=120^\\circ$",
    ]),
    o("7.48", "To båter forlater en havn samtidig. Etter en time er den ene $12$ km unna og den andre $9$ km unna. Vinkelen mellom kursene er $75^\\circ$. Hvor langt er det mellom båtene?", "Sidene $12$ og $9$ har vinkelen $75^\\circ$ mellom seg.", [
      "$d^2=144+81-2\\cdot12\\cdot9\\cos75^\\circ$, så $d\\approx 13{,}0$ km<br><strong>Svar:</strong> ca. $13{,}0$ km",
    ]),
    o("7.49", "Hva blir cosinussetningen $c^2=a^2+b^2-2ab\\cos C$ når $C=90^\\circ$? Hva betyr det?", "$\\cos90^\\circ=0$.", [
      "Leddet $2ab\\cos C$ blir $0$, og vi får $c^2=a^2+b^2$. Pytagoras er et spesialtilfelle av cosinussetningen.",
    ]),
    o("7.50", "I trekant $ABC$ er $a=10$, $b=14$ og $\\angle C=48^\\circ$. Finn $c$, $\\angle A$ og $\\angle B$.", "Finn $c$ med cosinussetningen. Finn deretter den minste vinkelen ($A$, motsatt den korteste siden) – den er alltid spiss.", [
      "$c^2=100+196-280\\cos48^\\circ$, så $c\\approx 10{,}42$",
      "$\\cos A=\\dfrac{b^2+c^2-a^2}{2bc}$ gir $A\\approx 45{,}5^\\circ$",
      "$B\\approx 86{,}5^\\circ$<br><strong>Svar:</strong> $c\\approx10{,}4$, $A\\approx45{,}5^\\circ$, $B\\approx86{,}5^\\circ$",
    ]),
    o("7.51", "En trekant har sider $6$, $8$ og $11$. Er trekanten spissvinklet, rettvinklet eller stumpvinklet?", "Se på fortegnet til $\\cos$ for vinkelen motsatt den lengste siden.", [
      "$\\cos C=\\dfrac{36+64-121}{96}=-\\dfrac{21}{96}<0$, så $C\\approx 102{,}6^\\circ$<br><strong>Svar:</strong> stumpvinklet",
    ]),
  ],
};

const dk7SM: Delkapittel = {
  id: "7SM",
  tittel: "Sammendrag",
  quiz: [

  ],
  oppgaver: [
    s("7.S1", "Sammendrag 7A–7B — Pytagoras og formlikhet", "<strong>Pytagoras:</strong> $a^2+b^2=c^2$ i rettvinklede trekanter ($c$ er hypotenusen). Den omvendte setningen: Hvis $a^2+b^2=c^2$, er trekanten rettvinklet.<br><br><strong>Formlikhet:</strong> To like vinkler, eller samme forhold mellom alle samsvarende sider. Lengder skaleres med $k$, areal med $k^2$.", "Pass på at du parer samsvarende sider.", ["<strong>Sjekk deg selv:</strong> Målestokk $1:3$. Hvor mange ganger større blir arealet?<br><strong>Svar:</strong> $9$"]),
    s("7.S2", "Sammendrag 7C — Tangens, sinus og cosinus", "I en rettvinklet trekant med vinkel $v$:<br>$\\sin v=\\dfrac{\\text{motstående}}{\\text{hypotenus}}$, $\\cos v=\\dfrac{\\text{hosliggende}}{\\text{hypotenus}}$, $\\tan v=\\dfrac{\\text{motstående}}{\\text{hosliggende}}$<br><br>Eksakte verdier: $\\sin30^\\circ=\\cos60^\\circ=\\dfrac12$, $\\sin45^\\circ=\\cos45^\\circ=\\dfrac{\\sqrt2}{2}$, $\\sin60^\\circ=\\cos30^\\circ=\\dfrac{\\sqrt3}{2}$, $\\tan45^\\circ=1$.", "Bruk $\\sin^{-1}$, $\\cos^{-1}$ eller $\\tan^{-1}$ for å finne vinkler.", ["<strong>Sjekk deg selv:</strong> $\\tan60^\\circ=$?<br><strong>Svar:</strong> $\\sqrt3$"]),
    s("7.S3", "Sammendrag 7D — Enhetssirkelen", "For alle vinkler $0^\\circ\\le v\\le180^\\circ$: punktet på enhetssirkelen er $P=(\\cos v,\\sin v)$, og $\\tan v=\\dfrac{\\sin v}{\\cos v}$.<br>$\\sin(180^\\circ-v)=\\sin v$ og $\\cos(180^\\circ-v)=-\\cos v$.<br>$\\sin^2v+\\cos^2v=1$.", "For stumpe vinkler er cosinus negativ.", ["<strong>Sjekk deg selv:</strong> $\\cos 120^\\circ=$?<br><strong>Svar:</strong> $-\\dfrac12$"]),
    s("7.S4", "Sammendrag 7E–7G — Arealsetningen, sinussetningen og cosinussetningen", "<strong>Arealsetningen:</strong> $T=\\dfrac12ab\\sin C$<br><strong>Sinussetningen:</strong> $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}$. Brukes når du kjenner en side og vinkelen motsatt den. Når du skal finne en vinkel, kan det være to løsninger.<br><strong>Cosinussetningen:</strong> $a^2=b^2+c^2-2bc\\cos A$. Brukes ved to sider og vinkelen mellom (SVS) eller tre sider (SSS).", "Velg setning ut fra hva du kjenner.", ["<strong>Sjekk deg selv:</strong> Du kjenner tre sider. Hvilken setning starter du med?<br><strong>Svar:</strong> Cosinussetningen"]),
  ],
};

const dk7OP: Delkapittel = {
  id: "7OP",
  tittel: "Kapitteltest",
  quiz: [
    q("$\\cos 120^\\circ$ er", ["$\\dfrac12$", "$-\\dfrac12$", "$\\dfrac{\\sqrt3}{2}$", "$-\\dfrac{\\sqrt3}{2}$"], 1, "$-\\cos60^\\circ$."),
    q("Tre kjente sider. Første steg:", ["sinussetningen", "cosinussetningen", "arealsetningen", "Pytagoras"], 1, "SSS → cosinussetningen."),
    q("Formlike trekanter med forhold $2$: arealet blir", ["$2$ ganger", "$4$ ganger", "$8$ ganger", "likt"], 1, "$k^2$."),
  ],
  oppgaver: [
    o("7.OP0", "<strong>Kapittel 7 · Trigonometri — kapitteltest</strong><br><strong>Tid:</strong> ca. $90$ min<br><br><strong>Del 1 — uten hjelpemidler</strong> (oppgave $1$–$5$): Pytagoras, formlikhet, eksakte verdier, arealsetningen og cosinussetningen med kjente vinkler.<br><br><strong>Del 2 — med hjelpemidler</strong> (oppgave $6$–$8$): praktisk trigonometri, sinussetningen med to løsninger, sammensatt problem.<br><br>Vis mellomregning, og tegn hjelpefigur.", "Gjør del 1 uten kalkulator.", [
      "Dette er oversiktssiden. Gå videre til oppgave $1$–$8$.",
    ]),
    o("7.OP1", "<em>Del 1 · uten hjelpemidler</em><br><br>Katetene i en rettvinklet trekant er $2$ og $4$. Finn hypotenusen eksakt og forenklet.", "$\\sqrt{20}=\\sqrt{4\\cdot5}$.", [
      "$c=\\sqrt{4+16}=\\sqrt{20}=2\\sqrt5$<br><strong>Svar:</strong> $2\\sqrt5$",
    ]),
    o("7.OP2", "<em>Del 1 · uten hjelpemidler</em><br><br>En mann som er $1{,}8$ m høy, kaster en skygge på $2{,}4$ m. Samtidig kaster en mast en skygge på $20$ m. Hvor høy er masten?", "Formlike trekanter.", [
      "$h=\\dfrac{1{,}8}{2{,}4}\\cdot20=0{,}75\\cdot20=15$<br><strong>Svar:</strong> $15$ m",
    ]),
    o("7.OP3", "<em>Del 1 · uten hjelpemidler</em><br><br>Finn eksakte verdier.<br><br><strong>a)</strong> $\\sin150^\\circ$<br><br><strong>b)</strong> $\\cos135^\\circ$<br><br><strong>c)</strong> Alle $v\\in[0^\\circ,180^\\circ]$ med $\\sin v=\\dfrac{\\sqrt3}{2}$", "Bruk supplementvinkler.", [
      "<strong>a)</strong> $\\dfrac12$",
      "<strong>b)</strong> $-\\dfrac{\\sqrt2}{2}$",
      "<strong>c)</strong> $60^\\circ$ og $120^\\circ$",
    ]),
    o("7.OP4", "<em>Del 1 · uten hjelpemidler</em><br><br>I trekant $ABC$ er $AB=8$, $AC=6$ og $\\angle A=30^\\circ$. Finn arealet.", "$\\sin30^\\circ=\\dfrac12$.", [
      "$T=\\dfrac12\\cdot8\\cdot6\\cdot\\dfrac12=12$<br><strong>Svar:</strong> $12$",
    ]),
    o("7.OP5", "<em>Del 1 · uten hjelpemidler</em><br><br>En trekant har sider $5$, $7$ og $8$. Finn vinkelen motsatt siden $7$.", "Cosinussetningen, og $\\cos60^\\circ=\\dfrac12$.", [
      "$\\cos v=\\dfrac{25+64-49}{2\\cdot5\\cdot8}=\\dfrac{40}{80}=\\dfrac12$<br><strong>Svar:</strong> $60^\\circ$",
    ]),
    o("7.OP6", "<em>Del 2 · med hjelpemidler</em><br><br>Du står $30$ m fra foten av et tårn. Øynene dine er $1{,}7$ m over bakken, og du ser toppen av tårnet under en vinkel på $41^\\circ$ med horisontalen. Hvor høyt er tårnet?", "Husk å legge til øyehøyden.", [
      "$h=1{,}7+30\\tan41^\\circ\\approx 27{,}8$ m<br><strong>Svar:</strong> ca. $27{,}8$ m",
    ]),
    o("7.OP7", "<em>Del 2 · med hjelpemidler</em><br><br>I trekant $ABC$ er $\\angle A=32^\\circ$, $a=9$ og $b=14$.<br><br><strong>a)</strong> Forklar hvorfor det finnes to trekanter.<br><br><strong>b)</strong> Finn $\\angle B$ og $c$ i begge tilfeller.", "Sammenlign $b\\sin A$ med $a$.", [
      "<strong>a)</strong> $14\\sin32^\\circ\\approx 7{,}42<9<14$",
      "<strong>b)</strong> $B_1\\approx 55{,}5^\\circ$, $c_1\\approx 17{,}0$. $B_2\\approx 124{,}5^\\circ$, $c_2\\approx 6{,}78$",
    ]),
    o("7.OP8", "<em>Del 2 · med hjelpemidler</em><br><br>En trekantet tomt har to sider på $80$ m og $60$ m, og vinkelen mellom dem er $110^\\circ$.<br><br><strong>a)</strong> Finn lengden av den tredje siden.<br><br><strong>b)</strong> Finn arealet av tomten.<br><br><strong>c)</strong> Finn den minste vinkelen i tomten.", "a) Cosinussetningen. b) Arealsetningen. c) Den minste vinkelen ligger motsatt den korteste siden.", [
      "<strong>a)</strong> $d^2=80^2+60^2-2\\cdot80\\cdot60\\cos110^\\circ$, så $d\\approx 115{,}3$ m",
      "<strong>b)</strong> $T=\\dfrac12\\cdot80\\cdot60\\sin110^\\circ\\approx 2255$ m²",
      "<strong>c)</strong> $\\sin v=\\dfrac{60\\sin110^\\circ}{115{,}3}$ gir $v\\approx 29{,}3^\\circ$",
    ]),
  ],
};

export const KAP7: Kapittel = {
  id: "kap7",
  tittel: "Kapittel 7: Trigonometri",
  delkapitler: [dk7A, dk7B, dk7C, dk7D, dk7E, dk7F, dk7G, dk7SM, dk7OP],
};
