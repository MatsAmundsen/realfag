const fagsok = [
    {
        "id": "kap1",
        "tittel": "Kapittel 1: Tallforståelse og algebra",
        "oppgaver": [
            {
                "id": "1.11",
                "tittel": "Oppgave 1.11",
                "tekst": "Gitt følgende liste med tall: -5, √16, 3/4, π, 0.333..., √7<br><br>a) Hvilke av disse tallene hører til i mengden av rasjonale tall (<strong>Q</strong>)?<br>b) Ett av de rasjonale tallene i listen kan også klassifiseres i en enda 'mindre' og mer spesifikk tallmengde. Hvilket tall er det, og hvilken mengde?",
                "bilde": null,
                "hint": "Rasjonale tall er alle tall som kan skrives som en brøk av to heltall. Naturlige tall er de positive heltallene vi bruker til å telle.",
                "fasit": "<strong>a)</strong> Rasjonale tall er tall som kan skrives som en brøk av to heltall.<br>-5 kan skrives som -5/1. √16 = 4, som kan skrives som 4/1. 3/4 er allerede en brøk. 0.333... er uendelig periodisk og tilsvarer brøken 1/3.<br>Svar a: Rasjonale tall er -5, √16, 3/4 og 0.333... (π og √7 er irrasjonale).<br><br><strong>b)</strong> Tallet √16 = 4 er et positivt heltall. Positive heltall tilhører mengden av naturlige tall (ℕ)."
            },
            {
                "id": "1.12",
                "tittel": "Oppgave 1.12",
                "tekst": "Fyll inn ∈ (element i) eller ∉ (ikke element i) slik at påstandene blir sanne.<br><br>a) 4.2 □ <strong>Q</strong><br>b) -3 □ <strong>N</strong><br>c) √2 □ <strong>R</strong>",
                "bilde": null,
                "hint": "Husk: Q = rasjonale tall, N = positive heltall, R = reelle tall.",
                "fasit": "<strong>a)</strong> ∈ (4.2 kan skrives som 42/10, altså rasjonalt ℚ).<br><strong>b)</strong> ∉ (De naturlige tallene ℕ inneholder kun positive heltall 1, 2, 3...).<br><strong>c)</strong> ∈ (√2 er irrasjonalt, og alle irrasjonale tall er en del av de reelle tallene ℝ)."
            },
            {
                "id": "1.13",
                "tittel": "Oppgave 1.13",
                "tekst": "La oss utforske intervaller på tallinjen.<br><br>a) Skriv ulikheten -2 ≤ x < 8 ved hjelp av intervallnotasjon.<br>b) Tegn en rask skisse av en tallinje og marker intervallet du fant i oppgave a). Bruk fylt/åpen sirkel der det er relevant.",
                "bilde": null,
                "hint": "Bruk klammeparentes [ for 'mindre eller lik', og vinkelhake 〉 for 'mindre enn'.",
                "fasit": "<strong>a)</strong> Intervallet inkluderer -2 (≤), men ikke 8 (<). Svar: x ∈ [-2, 8〉<br><strong>b)</strong> Skissen skal vise en tallinje med en fylt sirkel/prikk ved -2, og en åpen sirkel ved 8. Linjen mellom disse er markert."
            },
            {
                "id": "1.14",
                "tittel": "Oppgave 1.14",
                "tekst": "Vi har et ukjent tall x. Vi vet at absoluttverdien til tallet er tolv (|x| = 12), og at tallet ikke er et naturlig tall (x ∉ <strong>N</strong>).<br><br>a) Skriv opp de to mulige verdiene x kan ha.<br>b) Bruk den siste opplysningen til å avgjøre hva x må være.",
                "bilde": null,
                "hint": "Absoluttverdi betyr avstanden til null, uavhengig av fortegn.",
                "fasit": "<strong>a)</strong> |x| = 12 betyr at avstanden til null er 12. Da kan x = 12 eller x = -12.<br><strong>b)</strong> Oppgaven sier at x ∉ ℕ (ikke et naturlig/positivt heltall). Da må x være det negative alternativet. Svar: x = -12."
            },
            {
                "id": "1.15",
                "tittel": "Oppgave 1.15",
                "tekst": "Skriv intervallet x ∈ ⟨←, 5] ved hjelp av ulikhetstegn.",
                "bilde": null,
                "hint": "Pilen ← indikerer at intervallet går mot minus uendelig.",
                "fasit": "Pilen i intervallet viser at mengden går uendelig mot venstre (minussiden) og stopper på 5, hvor 5 er inkludert. Svar: x ≤ 5."
            },
            {
                "id": "1.16",
                "tittel": "Oppgave 1.16",
                "tekst": "Bruk et fornuftig intervall til å beskrive høydene (målt i cm) til alle voksne menn i Norge.",
                "bilde": null,
                "hint": "Tenk på realistiske høyder. Hva er det laveste og høyeste som gir mening?",
                "fasit": "Ingen voksne menn er lavere enn f.eks. 140 cm eller høyere enn 230 cm. Svar: Et fornuftig intervall er [150, 220]. (Alle logiske intervaller for mennesker godtas)."
            },
            {
                "id": "1.28",
                "tittel": "Oppgave 1.28",
                "tekst": "Se på tallfølgen: 1, 8, 27, 64, ...<br><br>a) Hva kalles disse tallene i matematikken?<br>b) Hva blir det neste tallet i følgen?<br>c) Prøv å finne en generell formel for det n-te tallet i denne følgen.",
                "bilde": null,
                "hint": "Prøv å skrive tallene som en potens av 3.",
                "fasit": "<strong>a)</strong> Tallene (1³, 2³, 3³, 4³) kalles kubikktall.<br><strong>b)</strong> Neste tall er 5³ = 5 · 5 · 5 = 125.<br><strong>c)</strong> Den generelle formelen for tall nummer n er n³."
            },
            {
                "id": "1.29",
                "tittel": "Oppgave 1.29",
                "tekst": "a) Primtallsfaktoriser tallet 126.<br>b) Bruk faktoriseringen fra oppgave a) til å forklare hvorfor 126 er delelig med 9.",
                "bilde": null,
                "hint": "Del tallet på 2, deretter på 3, inntil du kun står igjen med primtall.",
                "fasit": "<strong>a)</strong> Faktorisering: 126 = 2 · 63 = 2 · 9 · 7 = 2 · 3² · 7.<br><strong>b)</strong> Fordi faktoriseringen inneholder 3² (som er 9), vet vi at 9 er en faktor i 126. Når man deler et tall på en av dets faktorer, går divisjonen opp."
            },
            {
                "id": "1.30",
                "tittel": "Oppgave 1.30",
                "tekst": "Nedenfor ser du en visuell representasjon av kvadratiske ringmønstre. Figur 1 har 1 prikk, Figur 2 har 4, Figur 3 har 9.<br><br>a) Tegn Figur 4 basert på samme mønster.<br>b) Hvor mange prikker vil Figur 7 bestå av totalt?",
                "bilde": null,
                "hint": "Antall prikker øker med kvadratet av figurnummeret.",
                "fasit": "<strong>a)</strong> Figur 4 vil være et kvadratisk 4 × 4 rutenett med totalt 16 prikker.<br><strong>b)</strong> Vi ser at mønsteret beskriver kvadrattall (n²). For Figur 7 vil utregningen være 7². Figur 7 består av 49 prikker."
            },
            {
                "id": "1.31",
                "tittel": "Oppgave 1.31",
                "tekst": "En bonde monterer solcellepaneler på et jorde formet som en trekant. I rad 1 legger hun 1 panel. I rad 2 legger hun 3 paneler. I rad 3 legger hun 5 paneler.<br><br>a) Fyll ut tabellen for rad 4 og 5 (antall i raden og totalt antall).<br>b) Hvilken matematisk sammenheng ser du mellom radnummeret (n) og det totale antallet paneler?",
                "bilde": null,
                "hint": "Legg sammen oddetallene opp til radnummeret.",
                "fasit": "<strong>a)</strong> Hver ny rad øker med 2 paneler. Rad 4 får 7 paneler (9 + 7 = 16 totalt). Rad 5 får 9 paneler (16 + 9 = 25 totalt).<br><strong>b)</strong> Vi ser at totalt antall paneler danner kvadrattallene (1, 4, 9, 16, 25). Sammenhengen er at det totale antallet paneler er lik radnummeret opphøyd i andre (n²)."
            },
            {
                "id": "1.32",
                "tittel": "Oppgave 1.32",
                "tekst": "Skriv så enkelt som mulig: √45 - √20",
                "bilde": null,
                "hint": "Skriv 45 og 20 som produkt av to tall, der det ene tallet er et kvadrattall (f.eks. 9 eller 4).",
                "fasit": "√45 - √20 = √(9 · 5) - √(4 · 5) = 3√5 - 2√5 = √5."
            },
            {
                "id": "1.37",
                "tittel": "Oppgave 1.37",
                "tekst": "a) Forklar Euklids algoritme.<br>b) Finn største felles faktor (SFF) for tallene 60 og 24.",
                "bilde": null,
                "hint": "Del det største tallet med det minste. Hvis det blir en rest, deler du det minste tallet med resten. Fortsett til resten er null.",
                "fasit": "Vi bruker Euklids algoritme og deler det største tallet på det minste:<br>60 = 2 · 24 + 12 (rest 12).<br>24 = 2 · 12 + 0 (rest 0).<br>Den største felles faktoren er den siste divisoren før resten ble null. Svar: 12."
            },
            {
                "id": "1.38",
                "tittel": "Oppgave 1.38",
                "tekst": "Regn ut: 7 + 3 · (16 - 10)",
                "bilde": null,
                "hint": "Husk regnerekkefølgen: Parentes først, så ganging, så pluss.",
                "fasit": "Potens og parentes først, deretter multiplikasjon:<br>7 + 3 · (16 - 10) = 7 + 3 · 6 = 7 + 18 = 25."
            },
            {
                "id": "1.39",
                "tittel": "Oppgave 1.39",
                "tekst": "Vi har følgende tall-algoritme: 1) Velg et heltall. 2) Legg til 4. 3) Multipliser resultatet med 2. 4) Trekk fra 8.<br><br>a) Utfør algoritmen med starttallet 5. Hva blir svaret?<br>b) Sett opp et algebraisk uttrykk med variabelen x for å bevise hva sluttresultatet alltid vil bli.",
                "bilde": null,
                "hint": "Pass på å sette parentes rundt (x + 4) før du ganger uttrykket med 2.",
                "fasit": "<strong>a)</strong> Setter inn 5: (1) Tallet er 5. (2) 5 + 4 = 9. (3) 9 · 2 = 18. (4) 18 - 8 = 10.<br><strong>b)</strong> Setter opp algebraisk uttrykk for tallet x: (x + 4) · 2 - 8 = 2x + 8 - 8 = 2x.<br>Algoritmen gir alltid det dobbelte av starttallet."
            },
            {
                "id": "1.40",
                "tittel": "Oppgave 1.40",
                "tekst": "Regn ut: (27 + 5) / (16 - 8)",
                "bilde": null,
                "hint": "Regn ut innholdet i parentesene først før du deler.",
                "fasit": "(27 + 5) / (16 - 8) = 32 / 8 = 4."
            },
            {
                "id": "1.41",
                "tittel": "Oppgave 1.41",
                "tekst": "a) Oversett teksten til et matematisk regnestykke, og regn ut: Kvadratet av differansen mellom ti og fire.<br>b) Hva blir resultatet dersom teksten i stedet var: Differansen mellom kvadratet av ti og kvadratet av fire?",
                "bilde": null,
                "hint": "Differanse betyr minus. Kvadrat betyr å opphøye i andre (²).",
                "fasit": "<strong>a)</strong> Differansen betyr minus: (10 - 4). Kvadratet betyr at hele uttrykket skal opphøyes i andre: (10 - 4)² = 6² = 36.<br><strong>b)</strong> Her er det kvadratene som skal trekkes fra hverandre: 10² - 4² = 100 - 16 = 84."
            },
            {
                "id": "1.42",
                "tittel": "Oppgave 1.42",
                "tekst": "Regn ut uten hjelpemidler: -5 - (-6) - 16",
                "bilde": null,
                "hint": "To minustegn etter hverandre blir pluss.",
                "fasit": "Løser opp parentesen: -5 - (-6) - 16 = -5 + 6 - 16 = 1 - 16 = -15."
            },
            {
                "id": "1.54",
                "tittel": "Oppgave 1.54",
                "tekst": "a) x³ · x⁵<br>b) y⁸ / y²",
                "bilde": null,
                "hint": "Når man ganger sammen potenser med samme grunntall, adderes eksponentene.",
                "fasit": "<strong>a)</strong> Samme grunntall ved multiplikasjon: addere eksponentene. x³⁺⁵ = x⁸.<br><strong>b)</strong> Samme grunntall ved divisjon: subtrahere eksponentene. y⁸⁻² = y⁶."
            },
            {
                "id": "1.55",
                "tittel": "Oppgave 1.55",
                "tekst": "Skriv tallene i stigende rekkefølge: -3², 3⁻¹, 2⁰, (-2)²",
                "bilde": null,
                "hint": "Husk at ethvert tall opphøyd i 0 er lik 1. (-2)² betyr (-2)*(-2).",
                "fasit": "Beregner verdiene: 3⁻¹ = 1/3 ≈ 0.33. 2⁰ = 1. (-2)² = 4. -3² = -(3²) = -9.<br>Stigende rekkefølge: -3², 3⁻¹, 2⁰, (-2)²."
            },
            {
                "id": "1.56",
                "tittel": "Oppgave 1.56",
                "tekst": "Regn ut: a) 4⁻² · 2³  b) (3 / 2)⁻²",
                "bilde": null,
                "hint": "Negativ eksponent betyr at tallet flyttes under brøkstreken, eller at brøken snus på hodet.",
                "fasit": "<strong>a)</strong> 4⁻² · 2³ = (1 / 4²) · 8 = (1 / 16) · 8 = 8 / 16 = 1/2.<br><strong>b)</strong> En negativ eksponent på en brøk betyr at vi kan snu brøken på hodet og gjøre eksponenten positiv: (3 / 2)⁻² = (2 / 3)² = 2² / 3² = 4 / 9."
            },
            {
                "id": "1.57",
                "tittel": "Oppgave 1.57",
                "tekst": "Forenkle uttrykket: 2³ · (a² · b⁻¹)³ · a⁻⁴ · b²",
                "bilde": null,
                "hint": "Løs opp parentesen først ved å gange eksponenten 3 med eksponentene inni.",
                "fasit": "Løser opp parentesen ved å gange eksponenten 3 inn på alle eksponentene inni:<br>2³ · a²ᐧ³ · b⁻¹ᐧ³ · a⁻⁴ · b² = 8a⁶b⁻³a⁻⁴b².<br>Samler a-ene og b-ene: 8 · a⁶⁻⁴ · b⁻³⁺² = 8a²b⁻¹.<br>Svar med kun positiv eksponent: (8a²) / b."
            },
            {
                "id": "1.58",
                "tittel": "Oppgave 1.58",
                "tekst": "I klasserommet ser du to ulike løsningsforslag på tavla for uttrykket: ((x³)²)/(x⁻¹).<br>Løsning A ender med x⁶. Løsning B ender med x⁵.<br>Læreren sier at begge inneholder feil. Finn feilene og vis korrekt utregning.",
                "bilde": null,
                "hint": "Potens av en potens regnes ut ved å multiplisere, ikke addere. Husk minus minus ved divisjon.",
                "fasit": "Feil i Løsning A: Eleven har summert eksponentene i (x³)² og fått x⁵. Potens av en potens regnes ut ved å multiplisere eksponentene: x³ᐧ² = x⁶.<br>Feil i Løsning B: Eleven har klart (x³)² = x⁶ men har feil i brøkdivisjonen. I nevneren står det x⁻¹. Når vi flytter den opp (eller trekker fra eksponenten) blir det 6 - (-1), ikke 6 - 1.<br>Korrekt utregning: (x³)² / x⁻¹ = x⁶ / x⁻¹ = x⁶⁻⁽⁻¹⁾ = x⁶⁺¹ = x⁷."
            },
            {
                "id": "1.59",
                "tittel": "Oppgave 1.59",
                "tekst": "Bruk potensreglene til å bevise algebraisk at ligningen stemmer: 4ˣ⁺¹ - 4ˣ = 3 · 4ˣ",
                "bilde": null,
                "hint": "Splitt opp 4ˣ⁺¹ til 4ˣ · 4¹.",
                "fasit": "Regelen aⁿ⁺ᵐ = aⁿ · aᵐ brukt baklengs på 4ˣ⁺¹ gir oss 4ˣ · 4¹ = 4 · 4ˣ.<br>Ligningen (venstre side) blir da: 4 · 4ˣ - 1 · 4ˣ.<br>Vi har altså 4 stykker av faktoren 4ˣ, og trekker fra 1 stykke av den samme faktoren. Det gir oss 3 · 4ˣ. Venstre side er nå lik høyre side. (Q.E.D.)"
            },
            {
                "id": "1.74",
                "tittel": "Oppgave 1.74",
                "tekst": "a) Skriv tallet 0.00000042 på standardform.<br>b) Regn ut (9 · 10⁸) / (3 · 10²) og oppgi svaret på standardform.",
                "bilde": null,
                "hint": "Flytt kommaet slik at det står et tall mellom 1 og 10 foran 10-potensen.",
                "fasit": "<strong>a)</strong> Flytter komma 7 plasser til høyre for å få tallet mellom 1 og 10: 4.2 · 10⁻⁷.<br><strong>b)</strong> Deler først tallene (9 / 3 = 3), deretter trekkes eksponentene fra hverandre (10⁸⁻² = 10⁶). Svar: 3 · 10⁶."
            },
            {
                "id": "1.75",
                "tittel": "Oppgave 1.75",
                "tekst": "Skriv tallene i synkende rekkefølge (fra størst til minst): 4 · 10⁵, 0.005, 350 000, 6 · 10⁻⁴",
                "bilde": null,
                "hint": "Gjør om alle tallene til vanlige desimaltall før du sammenligner dem.",
                "fasit": "Omgjort til vanlige tall: 400 000, 0.005, 350 000, 0.0006.<br>Synkende (størst til minst): 4 · 10⁵, 350 000, 0.005, 6 · 10⁻⁴."
            },
            {
                "id": "1.76",
                "tittel": "Oppgave 1.76",
                "tekst": "Gjør om målingen slik at du kan bruke et passende prefiks: 0.000007 meter.",
                "bilde": null,
                "hint": "Prefikset for 10⁻³ er milli, og for 10⁻⁶ er det mikro.",
                "fasit": "0.000007 m kan skrives som 7 · 10⁻⁶ m. Prefikset for 10⁻⁶ er mikro (μ).<br>Svar: 7 mikrometer / 7 μm."
            },
            {
                "id": "1.77",
                "tittel": "Oppgave 1.77",
                "tekst": "Menneskets hjerte slår omtrent 3.5 · 10⁷ ganger i året.<br>a) Omtrent hvor mange ganger slår det på en måned?<br>b) Dersom et menneske lever i 80 år, hvor mange slag blir det totalt på standardform?",
                "bilde": null,
                "hint": "Husk å justere desimaltallet slik at det er mellom 1 og 10 for at det skal være ekte standardform.",
                "fasit": "<strong>a)</strong> Vi deler årsforbruket på 12 måneder: (3.5 · 10⁷) / 12 ≈ 0.291 · 10⁷ = 2.9 · 10⁶ ganger i måneden.<br><strong>b)</strong> Vi multipliserer årsforbruket med 80 år: 3.5 · 10⁷ · 80 = 280 · 10⁷. Justerer til standardform: 2.8 · 10⁹ slag totalt."
            },
            {
                "id": "1.78",
                "tittel": "Oppgave 1.78",
                "tekst": "Massen til et elektron er ca. 9.1 · 10⁻³¹ kg. Gjør om dette tallet til gram, og oppgi svaret på standardform.",
                "bilde": null,
                "hint": "1 kg er 10³ gram.",
                "fasit": "Gjør om fra kg til gram ved å multiplisere med 10³ (1000 gram i en kg).<br>9.1 · 10⁻³¹ · 10³ = 9.1 · 10⁻²⁸ gram."
            },
            {
                "id": "1.79",
                "tittel": "Oppgave 1.79",
                "tekst": "Avstanden fra Jorda til Sola er omtrent 1.5 · 10¹¹ meter. Lysets hastighet er ca. 3.0 · 10⁸ m/s. Hvor mange sekunder bruker lyset fra Sola til Jorda?",
                "bilde": null,
                "hint": "Bruk formelen for tid: tid = strekning / fart.",
                "fasit": "Tid er lik strekning delt på fart (t = s / v).<br>t = (1.5 · 10¹¹) / (3.0 · 10⁸) = (1.5 / 3.0) · 10¹¹⁻⁸ = 0.5 · 10³ = 500 sekunder."
            },
            {
                "id": "1.88",
                "tittel": "Oppgave 1.88",
                "tekst": "Sett inn riktig pil (⇒, ⇐ eller ⇔) mellom påstandene. Begrunn svaret.<br>a) x = 5 □ x² = 25<br>b) Trekant ABC er likesidet □ Trekant ABC er likebeint.<br>c) x + 3 = 7 □ 2x = 8",
                "bilde": null,
                "hint": "Husk at ⇒ betyr at det første medfører det andre, mens ⇔ betyr at begge er nøyaktig like sanne den ene og den andre veien.",
                "fasit": "<strong>a)</strong> x = 5 ⇒ x² = 25. Pilen peker kun til høyre. (Hvis x = 5, vil x² garantert være 25. Men hvis x² = 25, kan x være både 5 og -5. Det går ikke begge veier).<br><strong>b)</strong> Trekant ABC er likesidet ⇒ Trekant ABC er likebeint. Pilen peker kun til høyre. (En likesidet har 3 like sider, og oppfyller da kravet for likebeint, som er minst to like sider).<br><strong>c)</strong> Løser vi begge ligningene for x, får vi x = 4. Fordi de deler nøyaktig samme løsning, er påstandene ekvivalente: ⇔."
            },
            {
                "id": "1.89",
                "tittel": "Oppgave 1.89",
                "tekst": "Bevis med et moteksempel at følgende påstand er usann: «For alle reelle tall x, gjelder det at x² > x».",
                "bilde": null,
                "hint": "Test påstanden med et desimaltall, for eksempel 0.5.",
                "fasit": "For å bevise at påstanden er usann, må vi finne minst én x der x² ikke er større enn x. Vi kan velge x = 0.5. Kvadratet blir 0.5² = 0.25. Siden 0.25 ikke er større enn 0.5, har vi motbevist regelen."
            },
            {
                "id": "1.90",
                "tittel": "Oppgave 1.90",
                "tekst": "Vurder påstanden: 'Dersom n er et primtall, så vil også n + 2 være et primtall.' Finn et moteksempel som beviser at påstanden er feil.",
                "bilde": null,
                "hint": "Et primtall kan kun deles på 1 og seg selv. Prøv å sette inn primtallet 7.",
                "fasit": "Vi tester regelen med et tilfeldig primtall, for eksempel n = 7. Resultatet av n + 2 blir da 7 + 2 = 9. Siden tallet 9 er delelig med 3, er det ikke et primtall. Vi har funnet et moteksempel som viser at påstanden er feil."
            },
            {
                "id": "1.91",
                "tittel": "Oppgave 1.91",
                "tekst": "Et oddetall kan skrives som 2k + 1 og et partall kan skrives som 2m, der k og m er heltall. Bruk algebra til å føre et direkte bevis for at summen av et oddetall og et partall alltid resulterer i et oddetall.",
                "bilde": null,
                "hint": "Legg uttrykkene sammen og prøv å faktorisere ut tallet 2.",
                "fasit": "Summen av oddetallet og partallet blir: (2k + 1) + 2m = 2k + 2m + 1.<br>Vi trekker ut 2 som felles faktor for leddene med k og m: 2(k + m) + 1.<br>Siden k og m er heltall, må summen av dem (k + m) også være et heltall. La oss kalle dette nye heltallet for c.<br>Uttrykket blir da 2c + 1. Et hvilket som helst tall multiplisert med to, pluss én, er den matematiske definisjonen på et oddetall. Beviset er fullført."
            },
            {
                "id": "1.prog1",
                "tittel": "Oppgave 1E: Programmering",
                "tekst": "Arne har laget et program han mener finner funksjonsuttrykket til en rett linje gitt to punkter. Programmet han har laget er som følger:<br><br><pre style=\"background:#1e293b; padding:1.2rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#22d3ee; line-height:1.6;\"><code>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</code></pre><br><br>Forklar hva koden gjør (eller bør gjøre i prinsippet), og hvordan den kan forbedres.",
                "bilde": null,
                "hint": "En rett linje har funksjonsuttrykket y = ax + b. For å finne a (stigningstallet) bruker man formelen a = (y2 - y1) / (x2 - x1). Tenk på hva som skjer med brøken dersom x2 er lik x1.",
                "fasit": "<strong>Fasit:</strong><br>Siden koden er blank i oppgaveteksten, er prinsippet for å finne en rett linje y = ax + b fra to punkter (x1, y1) og (x2, y2) matematisk sett:<br>1. Stigningstall a = (y2 - y1) / (x2 - x1)<br>2. Konstantledd b = y1 - a · x1<br><br><strong>Forbedring:</strong> Koden må ta høyde for at x2 kan være lik x1. Hvis x2 = x1, vil deling på null krasje programmet. Arne bør legge inn en <code>if (x1 == x2)</code>-sjekk som returnerer en feilmelding, eller behandler det som en loddrett linje."
            }
        ]
    },
    {
        "id": "kap2",
        "tittel": "Kapittel 2: Algebra og Mønstre",
        "oppgaver": [
            {
                "id": "2.1",
                "tittel": "Oppgave 2.1",
                "tekst": "Forenkle følgende uttrykk ved å trekke sammen like ledd:<br>a) 1 + 2x + 3 - 3x<br>b) 4x + 3y - 2x + 5y<br>c) 4(-x + 4)",
                "bilde": null,
                "hint": "Samle alle x-ene for seg og tallene for seg. Når det er et tall foran en parentes, må det ganges inn med alle leddene inni.",
                "fasit": "a) 1 + 2x + 3 - 3x = -x + 4<br>b) 4x + 3y - 2x + 5y = 2x + 8y<br>c) 4(-x + 4) = -4x + 16"
            },
            {
                "id": "2.2",
                "tittel": "Oppgave 2.2",
                "tekst": "Løs opp parentesene og trekk sammen:<br>a) 3(a - 2) - 2(a + 4)<br>b) 5(b⁴ - 3a) + 10<br>c) Finn feilen i 2x(x - 3) = 2x² - 3. Hva er riktig svar?",
                "bilde": null,
                "hint": "Husk fortegnsreglene (minus og pluss blir minus).",
                "fasit": "a) 3a - 6 - 2a - 8 = a - 14<br>b) 5b⁴ - 15a + 10<br>c) Feilen er at 2x kun er multiplisert med x, og ikke med -3. Riktig svar: 2x(x - 3) = 2x² - 6x."
            },
            {
                "id": "2.3",
                "tittel": "Oppgave 2.3",
                "tekst": "Løs opp parentesene og trekk sammen:<br>(3x - 1)(2x + 4) - (x + 2)(x - 2)",
                "bilde": null,
                "hint": "Bruk konjugatsetningen for den andre parentesen. Husk at minustegnet foran parentesen snur fortegnet på innholdet når parentesen fjernes.",
                "fasit": "(3x - 1)(2x + 4) - (x + 2)(x - 2)<br>= (6x² + 12x - 2x - 4) - (x² - 4)<br>= 6x² + 10x - 4 - x² + 4<br>= 5x² + 10x"
            },
            {
                "id": "2.4",
                "tittel": "Oppgave 2.4",
                "tekst": "a) Skriv ned alle kvadratsetningene.<br>b) Vis med eksempel de ulike kvadratsetningene.",
                "bilde": null,
                "hint": "Det finnes to kvadratsetninger og én konjugatsetning.",
                "fasit": "1. kvadratsetning: (a + b)² = a² + 2ab + b²<br>Eksempel: (x + 3)² = x² + 6x + 9<br><br>2. kvadratsetning: (a - b)² = a² - 2ab + b²<br>Eksempel: (x - 4)² = x² - 8x + 16<br><br>3. kvadratsetning (Konjugatsetningen): (a + b)(a - b) = a² - b²<br>Eksempel: (x + 5)(x - 5) = x² - 25"
            },
            {
                "id": "2.5",
                "tittel": "Oppgave 2.5",
                "tekst": "Bruk kvadratsetningene til å regne ut eksakt:<br>a) (v + 5)²<br>b) (3a - 2)²<br>c) (4y + 3)(4y - 3)",
                "bilde": null,
                "hint": "Oppgave c er konjugatsetningen. Den gir deg differansen mellom to kvadrater.",
                "fasit": "a) (v + 5)² = v² + 10v + 25<br>b) (3a - 2)² = 9a² - 12a + 4<br>c) (4y + 3)(4y - 3) = 16y² - 9"
            },
            {
                "id": "2.6",
                "tittel": "Oppgave 2.6",
                "tekst": "a) (√10 + b)(√10 - b)<br>b) -(v + 5)² + (v - 5)²<br>c) (b² + a³)²",
                "bilde": null,
                "hint": "Kvadratroten av 10 ganget med kvadratroten av 10 er bare 10.",
                "fasit": "a) (√10 + b)(√10 - b) = 10 - b²<br>b) -(v + 5)² + (v - 5)² = -(v² + 10v + 25) + (v² - 10v + 25) = -v² - 10v - 25 + v² - 10v + 25 = -20v<br>c) (b² + a³)² = (b²)² + 2(b²)(a³) + (a³)² = b⁴ + 2a³b² + a⁶"
            },
            {
                "id": "2.7",
                "tittel": "Oppgave 2.7",
                "tekst": "Faktoriser:<br>a) 4<br>b) 36<br>c) 16a²<br>d) πx + 2π",
                "bilde": null,
                "hint": "Bryt tallene helt ned til sine minste byggesteiner (primtall).",
                "fasit": "a) 4 = 2 · 2<br>b) 36 = 2 · 2 · 3 · 3 (eller 6²)<br>c) 16a² = 4 · 4 · a · a = 2 · 2 · 2 · 2 · a · a<br>d) πx + 2π = π(x + 2)"
            },
            {
                "id": "2.8",
                "tittel": "Oppgave 2.8",
                "tekst": "Faktoriser ved å sette felles faktor utenfor parentes:<br>a) Vis at √20 - √5 = √5<br>b) 15x² - 5x<br>c) 8a²b + 12ab²<br>d) Vis at √12 + √16 = 2(√3 + 2)",
                "bilde": null,
                "hint": "Finn det største tallet og de variablene som finnes i begge ledd.",
                "fasit": "a) √20 = √(4·5) = 2√5. Vi får 2√5 - √5 = √5.<br>b) 15x² - 5x = 5x(3x - 1)<br>c) 8a²b + 12ab² = 4ab(2a + 3b)<br>d) √12 = 2√3. √16 = 4. 2√3 + 4 = 2(√3 + 2)."
            },
            {
                "id": "2.9",
                "tittel": "Oppgave 2.9",
                "tekst": "Forklar om summen av to partall er et oddetall eller partall. Vis med eksempel.",
                "bilde": null,
                "hint": "Husk at ethvert tall som kan deles på 2 er et partall.",
                "fasit": "Svar: Summen av to partall er alltid et partall.<br>Forklaring: Et partall kan skrives som 2n, og et annet partall kan skrives som 2m. Legger vi dem sammen får vi 2n + 2m = 2(n + m). Siden 2 kan settes utenfor en parentes som en faktor, er tallet alltid delelig på 2, og dermed et partall.<br>Eksempel: 4 + 8 = 12."
            },
            {
                "id": "2.10",
                "tittel": "Oppgave 2.10",
                "tekst": "Faktoriser uttrykkene:<br>a) x² + 10x + 25<br>b) 9y² - 16<br>c) a² - 2a<br>d) Hvilket tall mangler for at uttrykket skal bli et fullstendig kvadrat? x² + 8x + ___",
                "bilde": null,
                "hint": "For d), ta halvparten av tallet foran x, og opphøy det i andre.",
                "fasit": "a) x² + 10x + 25 = (x + 5)²<br>b) 9y² - 16 = (3y + 4)(3y - 4)<br>c) a² - 2a = a(a - 2)<br>d) Vi tar halvparten av tallet foran x, og kvadrerer det: (8/2)² = 4² = 16. Tallet som mangler er 16."
            },
            {
                "id": "2.11",
                "tittel": "Oppgave 2.11",
                "tekst": "Faktoriser hvis det er mulig:<br>a) -b + 63/7<br>b) a² - 6a - 12<br>c) 15 - 10v + v²",
                "bilde": null,
                "hint": "Husk at fullstendige kvadrater krever at siste tall er kvadratet av halve det midterste tallet.",
                "fasit": "a) -b + 63/7 = -b + 9 (Kan ikke faktoriseres mer).<br>b) a² - 6a - 12 : Kan ikke faktoriseres med heltall fordi -12 ikke passer inn i et fullstendig kvadrat (det burde vært +9).<br>c) Omskrevet: v² - 10v + 15. Kan ikke faktoriseres med heltall, siden 15 ikke er lik (10/2)²."
            },
            {
                "id": "2.12",
                "tittel": "Oppgave 2.12",
                "tekst": "Sett tallene i stigende rekkefølge: -14/7, 2.5, 1/2, 3/4, √1, √25, 12/5",
                "bilde": null,
                "hint": "Gjør alt om til desimaltall før du begynner å sortere dem.",
                "fasit": "Gjort om til desimal: -2, 2.5, 0.5, 0.75, 1, 5, 2.4.<br>Stigende rekkefølge: -14/7, 1/2, 3/4, √1, 12/5, 2.5, √25."
            },
            {
                "id": "2.13",
                "tittel": "Oppgave 2.13",
                "tekst": "Hvis det er mulig, forkort brøkene:<br>a) (10a - 5)/5<br>b) (12 - 6v)/(6v)<br>c) (36 - a²)/(6 + a)",
                "bilde": null,
                "hint": "Faktoriser teller (sett utenfor parentes) før du stryker noe mot nevner.",
                "fasit": "a) (10a - 5)/5 = 5(2a - 1)/5 = 2a - 1<br>b) (12 - 6v)/6v = 6(2 - v)/6v = (2 - v)/v<br>c) (36 - a²)/(6 + a) = (6 - a)(6 + a)/(6 + a) = 6 - a"
            },
            {
                "id": "2.14",
                "tittel": "Oppgave 2.14",
                "tekst": "Trekk sammen og forkort mest mulig:<br>a) 2x/3 + (x - 1)/4<br>b) (1/b²) * (3b/6)<br>c) (2 - z)/6 + (3 + z)/2<br>d) (3/4b) / (2/4)<br>e) 2/(b + 4) - (2b - 8)/(b² - 16) + 4",
                "bilde": null,
                "hint": "Ved addisjon av brøk, finn fellesnevner. Ved divisjon av brøk, snu den siste brøken på hodet og multipliser.",
                "fasit": "a) Fellesnevner 12: (8x + 3x - 3)/12 = (11x - 3)/12<br>b) 3b / 6b² = 1 / 2b<br>c) Fellesnevner 6: (2 - z + 9 + 3z)/6 = (2z + 11)/6<br>d) Snu og gang: (3/4b) * (4/2) = 12/8b = 3/2b<br>e) (2b - 8)/(b² - 16) = 2(b - 4)/((b-4)(b+4)) = 2/(b+4). Regnestykket blir da 2/(b+4) - 2/(b+4) + 4 = 4."
            },
            {
                "id": "2.15",
                "tittel": "Oppgave 2.15 (Formelregning)",
                "tekst": "I en rettvinklet trekant er arealet A. Grunnlinjen er dobbelt så lang som høyden h.<br>a) Sett opp en formel for A uttrykt ved h.<br>b) Gjør om formelen slik at h står alene på den ene siden av likhetstegnet.",
                "bilde": null,
                "hint": "Arealet av en trekant er (grunnlinje * høyde) / 2.",
                "fasit": "a) A = (g · h) / 2. Siden g = 2h, får vi A = (2h · h) / 2 = 2h² / 2 = h².<br>b) Siden A = h², tar vi kvadratroten: h = √A."
            },
            {
                "id": "2.16",
                "tittel": "Oppgave 2.16 (Sekskanttall)",
                "tekst": "Figuren viser de fire første sentrerte sekskanttallene, C1, C2, C3 og C4.<br>a) Finn det femte sentrerte sekskanttallet, C5.<br>b) En formel er C_n = 3n² - 3n + 1. Vis at formelen stemmer for de fire første.<br>c) Bruk formelen til å bestemme sentrert sekskanttall nummer 10.",
                "bilde": "Bilde2.16.png",
                "hint": "Se på økningen. Fra 1 til 7 er det +6. Fra 7 til 19 er det +12.",
                "fasit": "a) Økningen er +6, +12, +18. For C5 legger vi til 18 + 6 = 24 prikker på C4 (37). C5 = 37 + 24 = 61.<br>b) Tester formelen for n=1: 3(1)² - 3(1) + 1 = 1. n=2: 3(4) - 6 + 1 = 7. n=3: 3(9) - 9 + 1 = 19. n=4: 3(16) - 12 + 1 = 37.<br>c) C10 = 3(10)² - 3(10) + 1 = 300 - 30 + 1 = 271."
            }
        ]
    },
    {
        "id": "kap3",
        "tittel": "Kapittel 3: Likninger og Ulikheter",
        "oppgaver": [
            {
                "id": "3.1",
                "tittel": "Oppgave 3.1",
                "tekst": "Løs likningene og sett prøve på svaret:<br><br>a) x + 2 = -x - 2<br>b) 24 + 2a = 1 + a<br>c) 4x - (2x + 5) = 11<br>d) (x/2) + (x/3) = 10<br>e) 7/4 + 2/4 + 2b = 4<br>f) Hvorfor setter man prøve på svaret?",
                "bilde": null,
                "hint": "Førstegradslikninger løses ved å samle alle variabler på én side, og tall på den andre. Husk å bytte fortegn når du flytter over likhetstegnet.",
                "fasit": "<strong>a)</strong> 2x = -4 ⇒ x = -2. Prøve: V.S: -2+2=0. H.S: -(-2)-2 = 0.<br><strong>b)</strong> 2a - a = 1 - 24 ⇒ a = -23.<br><strong>c)</strong> 4x - 2x - 5 = 11 ⇒ 2x = 16 ⇒ x = 8.<br><strong>d)</strong> Fellesnevner er 6. Multipliser alle ledd: 3x + 2x = 60 ⇒ 5x = 60 ⇒ x = 12.<br><strong>e)</strong> 9/4 + 2b = 16/4 ⇒ 2b = 7/4 ⇒ b = 7/8.<br><strong>f)</strong> Vi setter prøve for å sjekke at vi ikke har gjort regnefeil underveis. For mer avanserte likninger avslører det falske løsninger."
            },
            {
                "id": "3.2",
                "tittel": "Oppgave 3.2",
                "tekst": "a) En fotballbane har omkrets på 350 meter. Bredden på banen er 35 meter kortere enn lengden. Hvor lang er lengden på fotballbanen?<br>b) Regn ut areal av fotballbanen.",
                "bilde": null,
                "hint": "La lengden være l. Da er bredden b = l - 35. Formelen for omkrets er O = 2l + 2b.",
                "fasit": "<strong>a)</strong> 350 = 2l + 2(l - 35) ⇒ 350 = 4l - 70 ⇒ 420 = 4l ⇒ l = 105. Lengden er 105 meter.<br><strong>b)</strong> Bredden er 105 - 35 = 70 m. Arealet A = 105 · 70 = 7350 m²."
            },
            {
                "id": "3.3",
                "tittel": "Oppgave 3.3",
                "tekst": "Olav, Kari og Ali har til sammen 120 abonnenter på sin YouTube-kanal. Olav har dobbelt så mange som Kari. Ali har 20 flere enn Kari. Hvor mange abonnenter har hver av dem?",
                "bilde": null,
                "hint": "La Kari ha K abonnenter. Sett opp uttrykk for Olav og Ali ved hjelp av K.",
                "fasit": "La K = Kari. Olav = 2K. Ali = K + 20.<br>K + 2K + (K + 20) = 120 ⇒ 4K = 100 ⇒ K = 25.<br>Svar: Kari har 25, Olav har 50 og Ali har 45 abonnenter."
            },
            {
                "id": "3.4",
                "tittel": "Oppgave 3.4",
                "tekst": "Den kinetiske energien (E) til et legeme er gitt ved formelen E = (1/2) · m · v².<br>Finn en formel for farten v uttrykt ved E og m.",
                "bilde": null,
                "hint": "Få v² til å stå alene ved å gange med 2 og dele på m. Ta til slutt kvadratroten.",
                "fasit": "Multipliserer med 2: 2E = mv².<br>Deler på m: v² = (2E) / m.<br>Tar kvadratroten: v = √((2E)/m)."
            },
            {
                "id": "3.5",
                "tittel": "Oppgave 3.5",
                "tekst": "Formel for baseball-kast: V_b = 2a + (m · k) / 3. Her er a = akselerasjon, m = masse, k = kraft. En spiller kaster med hastighet 100 km/t (V_b = 100), ballen veier 0.15 kg, og kraften er 30 N. (Se bort fra enheter).<br><br>a) Hvor fort akselererer ballen?<br>b) Skriv om formelen slik at den viser kraft (k).",
                "bilde": null,
                "hint": "Sett de oppgitte tallene inn i formelen og løs for den ukjente.",
                "fasit": "<strong>a)</strong> 100 = 2a + (0.15 · 30) / 3 ⇒ 100 = 2a + 1.5 ⇒ 98.5 = 2a ⇒ a = 49.25.<br><strong>b)</strong> V_b - 2a = (mk)/3 ⇒ 3(V_b - 2a) = mk ⇒ k = (3(V_b - 2a)) / m."
            },
            {
                "id": "3.6",
                "tittel": "Oppgave 3.6",
                "tekst": "1/T = 2/T_A + 2/T_B. Finn formel for T.",
                "bilde": null,
                "hint": "Finn fellesnevner (T_A · T_B) for brøkene på høyre side.",
                "fasit": "Fellesnevner på høyre side er T_A · T_B: 1/T = (2T_B + 2T_A) / (T_A · T_B).<br>Snu brøkene (eller kryssmultipliser): T = (T_A · T_B) / (2(T_A + T_B))."
            },
            {
                "id": "3.7",
                "tittel": "Oppgave 3.7",
                "tekst": "a) Forklar hva som skiller andregradslikninger fra førstegradslikninger. Vis med eksempel.<br>b) Forklar produktregelen og vis med eksempel.",
                "bilde": null,
                "hint": "Hvilken potens står den ukjente variabelen opphøyd i?",
                "fasit": "<strong>a)</strong> En andregradslikning inneholder en ukjent variabel opphøyd i andre potens (f.eks. x²), og kan ha opptil to løsninger. Førstegrad har x i første potens og gjerne bare én løsning.<br><strong>b)</strong> Produktregelen sier at hvis to faktorer multiplisert gir null, må minst én av dem være null. F.eks. hvis x(x-3) = 0, er x = 0 eller x = 3."
            },
            {
                "id": "3.8",
                "tittel": "Oppgave 3.8",
                "tekst": "Løs likningene:<br>a) y² = 16<br>b) y² = 9<br>c) 2x² = 4<br>d) k² = -6<br>e) 5k² = 0",
                "bilde": null,
                "hint": "Når you tar kvadratroten, må du huske at svaret kan være både positivt og negativt (±).",
                "fasit": "<strong>a)</strong> y = ±4.<br><strong>b)</strong> y = ±3.<br><strong>c)</strong> x² = 2 ⇒ x = ±√2.<br><strong>d)</strong> Et reelt tall i andre potens kan ikke være negativt. L = Ø.<br><strong>e)</strong> k² = 0 ⇒ k = 0."
            },
            {
                "id": "3.9",
                "tittel": "Oppgave 3.9",
                "tekst": "Løs andregradslikningene. Bruk produktregelen der det er mulig:<br>a) x(x - 4) = 0<br>b) 0 = -25 + k²<br>c) x² + 6x = 0<br>d) 16b + b² = 0<br>e) (k - 3)(k + 8) = 0",
                "bilde": null,
                "hint": "For å bruke produktregelen må du faktorisere uttrykket først, f.eks. trekke ut en felles x.",
                "fasit": "<strong>a)</strong> x = 0 eller x = 4.<br><strong>b)</strong> k² = 25 ⇒ k = ±5.<br><strong>c)</strong> x(x + 6) = 0 ⇒ x = 0 eller x = -6.<br><strong>d)</strong> b(16 + b) = 0 ⇒ b = 0 eller b = -16.<br><strong>e)</strong> k = 3 eller k = -8."
            },
            {
                "id": "3.10",
                "tittel": "Oppgave 3.10",
                "tekst": "En bonde har inngjerdet sauene sine på et område formet som et rektangel med et areal på 140 kvadratmeter. Bredden er ukjent (a). Lengden er bredden + 10 meter. Regn ut bredden og lengden.",
                "bilde": null,
                "hint": "Areal = lengde · bredde. Sett opp en likning med informasjonen du har.",
                "fasit": "Likning: a(a + 10) = 140 ⇒ a² + 10a - 140 = 0.<br>Bruker ABC-formelen: a ≈ (-10 ± 25.69) / 2.<br>Siden en lengde må være positiv, er bredden a ≈ 7.85 m. Lengden er da 17.85 m."
            },
            {
                "id": "3.11",
                "tittel": "Oppgave 3.11",
                "tekst": "a) Skriv opp ABC formelen og vis et regneeksempel.<br>b) Når har ABC formelen ulikt antall løsninger?",
                "bilde": null,
                "hint": "Se på uttrykket under kvadratroten (b² - 4ac). Dette kalles diskriminanten.",
                "fasit": "<strong>a)</strong> x = (-b ± √(b² - 4ac)) / 2a.<br><strong>b)</strong> Hvis b² - 4ac > 0 har vi to løsninger. Hvis lik 0 har vi én løsning. Hvis mindre enn 0 finnes ingen reelle løsninger."
            },
            {
                "id": "3.12",
                "tittel": "Oppgave 3.12",
                "tekst": "Bruk abc-formelen til å løse likningen:<br>a) 2x² - 8x + 6 = 0<br>b) a² - 3a = 4<br>c) c² - 10c + 25 = 0<br>d) 2x² + 5x - 3 = 0<br>e) Forenkle brøken: (2y² + 5y - 3) / (y² + 5y + 6)",
                "bilde": null,
                "hint": "For å forenkle brøken i e), må du faktorisere både teller og nevner ved å finne nullpunktene først.",
                "fasit": "<strong>a)</strong> x = 1 eller x = 3.<br><strong>b)</strong> a² - 3a - 4 = 0 ⇒ a = 4 eller a = -1.<br><strong>c)</strong> (c - 5)² = 0 ⇒ c = 5.<br><strong>d)</strong> x = 1/2 eller x = -3.<br><strong>e)</strong> Teller faktoriseres til 2(y - 1/2)(y + 3) = (2y - 1)(y + 3). Nevner faktoriseres til (y + 2)(y + 3). Brøken forkortes til (2y - 1) / (y + 2)."
            },
            {
                "id": "3.13",
                "tittel": "Oppgave 3.13",
                "tekst": "Et rektangel har et areal på 45 kvadratcentimeter. Lengden er 4 cm lengre enn bredden. Finn sidene ved å sette opp og løse en andregradslikning.",
                "bilde": null,
                "hint": "La bredden være b. Arealet = b * (b + 4).",
                "fasit": "b(b + 4) = 45 ⇒ b² + 4b - 45 = 0. Faktoriserer til (b + 9)(b - 5) = 0. Siden b ikke kan være negativ forkaster vi -9. Bredden er 5 cm, og lengden er 9 cm."
            },
            {
                "id": "3.14",
                "tittel": "Oppgave 3.14",
                "tekst": "a) Forklar hva som menes med rasjonale likninger og vis med et praktisk eksempel.<br>b) Hva menes med uttrykket L=Ø?",
                "bilde": null,
                "hint": "Rasjonell henger sammen med ordet 'ratio' som betyr brøk.",
                "fasit": "<strong>a)</strong> En rasjonal likning er en likning der den ukjente (x) er i nevneren. F.eks: Skal leie hytte til 10 000 kr, maks 2000 kr per person. Hvor mange må vi minst være? 10000/x = 2000.<br><strong>b)</strong> L=Ø betyr at løsningsmengden er tom (likningen har ingen løsning)."
            },
            {
                "id": "3.15",
                "tittel": "Oppgave 3.15",
                "tekst": "Løs likningene (husk å sjekke for falske løsninger):<br>a) 4/x = 2/(x - 3)<br>b) 3 + 4/x = -1 + 5/x<br>c) 2/(a + 4) + 3/(a + 4) = 1<br>d) (2a)/(a² - 9) = a/(a - 3) - 2/(a + 3)",
                "bilde": null,
                "hint": "Gang likningen med fellesnevner. Pass på at de løsningene du får ikke gjør noen av de opprinnelige nevnerne lik null.",
                "fasit": "<strong>a)</strong> Kryssmultiplikasjon gir 4(x - 3) = 2x ⇒ 4x - 12 = 2x ⇒ x = 6.<br><strong>b)</strong> 4 = 1/x ⇒ x = 1/4.<br><strong>c)</strong> 5/(a+4) = 1 ⇒ a+4 = 5 ⇒ a = 1.<br><strong>d)</strong> Ganger med fellesnevner (a²-9): 2a = a(a+3) - 2(a-3) ⇒ a² - a + 6 = 0. Denne har negativ diskriminant og dermed ingen reelle løsninger. L = Ø."
            },
            {
                "id": "3.15F",
                "tittel": "Oppgave 3.15F (Funksjoner)",
                "tekst": "a) Hva er en funksjon og hvordan skriver vi det i matematikk?<br>b) Hva er et nullpunkt?<br>c) Forklar nullpunktfaktorisering.<br>d) Når er det vi benytter oss av denne metoden?",
                "bilde": null,
                "hint": "Tenk på en funksjon som en regel der ett input (x) gir ett output (y).",
                "fasit": "<strong>a)</strong> En matematisk regel som tar en inn-verdi og gir én ut-verdi. Skrives f(x).<br><strong>b)</strong> x-verdien(e) der grafen krysser x-aksen (y=0).<br><strong>c)</strong> Faktorisering av polynomer ved å bruke formelen a(x-x1)(x-x2) etter å ha funnet nullpunktene.<br><strong>d)</strong> Nyttig for å forkorte brøker eller tegne fortegnsskjema."
            },
            {
                "id": "3.16",
                "tittel": "Oppgave 3.16",
                "tekst": "Forklar hva som menes med proporsjoner i matematikk, vis med matematisk eksempel.",
                "bilde": null,
                "hint": "To brøker som er like store.",
                "fasit": "Proporsjoner betyr at forholdet mellom to verdier er konstant. Eksempel: x/y = k, eller 4/2 = 10/5."
            },
            {
                "id": "3.16F",
                "tittel": "Oppgave 3.16F",
                "tekst": "Nedenfor er det skrevet 3 funksjoner. Er -1 et nullpunkt for funksjonene?<br>a) F(x) = 20x² + 5<br>b) G(x) = x² + x<br>c) H(x) = -5x² - 7x - 2",
                "bilde": null,
                "hint": "Regn ut F(-1), G(-1) og H(-1). Hvis svaret er 0, er det et nullpunkt.",
                "fasit": "<strong>a)</strong> Nei (gir 25).<br><strong>b)</strong> Ja (gir 0).<br><strong>c)</strong> Ja (gir 0)."
            },
            {
                "id": "3.17",
                "tittel": "Oppgave 3.17",
                "tekst": "Avgjør når disse matematiske uttrykkene er sanne:<br>a) a/5 = 3/10<br>b) 10/2b = 4/5",
                "bilde": null,
                "hint": "Bruk kryssmultiplikasjon for å løse ligningene.",
                "fasit": "<strong>a)</strong> 10a = 15 ⇒ a = 1.5.<br><strong>b)</strong> 8b = 50 ⇒ b = 6.25."
            },
            {
                "id": "3.17F",
                "tittel": "Oppgave 3.17F",
                "tekst": "Faktoriser polynomet ved hjelp av nullpunktmetoden:<br>a) t² - 8t + 15<br>b) x² - 7x + 10<br>c) 2m² + 5m - 12<br>d) -z² + 4z + 12<br>e) (p² - 2p - 8) / (p² - 16)<br>f) (3v² - 14v + 8) / (v² - 6v + 8)<br>g) (-2y² + 10y - 12) / (2y² - 8y + 8)",
                "bilde": null,
                "hint": "Bruk abc-formelen for å finne nullpunktene først, og sett deretter inn i a(x-x1)(x-x2).",
                "fasit": "<strong>a)</strong> (t-3)(t-5)<br><strong>b)</strong> (x-2)(x-5)<br><strong>c)</strong> 2(m-1.5)(m+4) = (2m-3)(m+4)<br><strong>d)</strong> -(z+2)(z-6)<br><strong>e)</strong> Forkortes til: (p+2) / (p+4)<br><strong>f)</strong> Forkortes til: (3v-2) / (v-2)<br><strong>g)</strong> Forkortes til: (3-y) / (y-2)"
            },
            {
                "id": "3.18",
                "tittel": "Oppgave 3.18",
                "tekst": "a) Når benytter vi oss av polynomdivisjon?<br>b) Hvilke begrensninger har polynomdivisjon?",
                "bilde": null,
                "hint": "Tenk på hvorfor vi ikke bare kan bruke abc-formelen på x³.",
                "fasit": "<strong>a)</strong> For å faktorisere polynomer av grad tre eller høyere for å løse likninger.<br><strong>b)</strong> Vi må kjenne til eller gjette minst ett av polynomets nullpunkter på forhånd for å ha noe å dele på."
            },
            {
                "id": "3.19",
                "tittel": "Oppgave 3.19",
                "tekst": "Utfør polynomdivisjon og skriv deretter alle svarene som et produkt av lineære faktorer:<br>a) (x² - 7x + 12) : (x - 3)<br>b) (x² + 3x - 10) : (x + 5)<br>c) (2x² - 5x + 7) : (x - 2)<br>d) (x³ - 2x² - 5x + 6) : (x - 1)<br>e) (x³ + 4x² + x - 6) : (x + 2)",
                "bilde": null,
                "hint": "Husk algoritmen: Del, gang tilbake, trekk fra, og gjenta. Husk at hvis divisjonen har rest (som i c), er det ikke et nullpunkt.",
                "fasit": "<strong>a)</strong> Svar: x - 4. Faktorisert: (x-3)(x-4).<br><strong>b)</strong> Svar: x - 2. Faktorisert: (x+5)(x-2).<br><strong>c)</strong> Svar: 2x - 1 + 5/(x-2). Gir rest og lar seg ikke faktorisere.<br><strong>d)</strong> Svar: x² - x - 6. Faktorisert: (x-1)(x-3)(x+2).<br><strong>e)</strong> Svar: x² + 2x - 3. Faktorisert: (x+2)(x-1)(x+3)."
            },
            {
                "id": "3.20",
                "tittel": "Oppgave 3.20",
                "tekst": "Utfør polynomdivisjonen:<br>a) (x³ - 7x - 6) : (x - 3)<br>b) (x³ - 8) : (x - 2)",
                "bilde": null,
                "hint": "Tips til b): Legg inn 0x² og 0x underveis i divisjonen for å ikke miste plassen.",
                "fasit": "<strong>a)</strong> x² + 3x + 2<br><strong>b)</strong> x² + 2x + 4"
            },
            {
                "id": "3.21",
                "tittel": "Oppgave 3.21",
                "tekst": "Utfør polynomdivisjonen:<br>a) (2x³ - 3x² - 3x + 2) : (x - 2)<br>b) (3x³ - 10x² + 9x - 2) : (x - 1)<br>c) (4x³ - 8x² - x + 2) : (2x - 1)",
                "bilde": null,
                "hint": "Pass ekstra godt på fortegn når du trekker fra.",
                "fasit": "<strong>a)</strong> 2x² + x - 1<br><strong>b)</strong> 3x² - 7x + 2<br><strong>c)</strong> 2x² - 3x - 2"
            },
            {
                "id": "3.22",
                "tittel": "Oppgave 3.22",
                "tekst": "Divisjonen (x³ - 4x² + cx - 12) : (x - 3) går opp uten rest. Bestem c.",
                "bilde": null,
                "hint": "Bruk restteoremet: Siden det ikke blir noen rest, må uttrykket bli lik null når du setter inn x = 3.",
                "fasit": "P(3) = 0 ⇒ 3³ - 4(3)² + c(3) - 12 = 0 ⇒ 27 - 36 + 3c - 12 = 0 ⇒ -21 + 3c = 0 ⇒ 3c = 21 ⇒ c = 7."
            }
        ]
    },
    {
        "id": "kap4",
        "tittel": "Kapittel 4: Funksjoner",
        "oppgaver": [
            {
                "id": "4.0",
                "tittel": "Oppgave 4.0",
                "tekst": "a) Tegn opp et koordinatsystem.<br>b) Tegn på 1, 2, 3 og 4 kvadrant.<br>c) Tegn på koordinatene (-1,-1) og (1,2).<br>d) Trekk en rett linje gjennom koordinatene i c). Hva kalles det du har konstruert?",
                "bilde": null,
                "hint": "1. kvadrant er oppe til høyre, hvor begge tall er positive.",
                "fasit": "<strong>a)</strong> Tegn x-akse (horisontal) og y-akse (vertikal). Kryss origo.br><strong>b)</strong> 1. kvadrant (+,+), 2. kvadrant (-,+), 3. kvadrant (-,-), 4. kvadrant (+,-). Plott punktene.br><strong>c)</strong>Marker punktet (-1,-1) ved å gå 1 enhet til venstre og 1 ned fra origo. Marker (1,2) ved å gå 1 enhet til høyre og 2 opp.<br><strong>d)</strong> En rett linje som representerer en lineær funksjon."
            },
            {
                "id": "4.1",
                "tittel": "Oppgave 4.1",
                "tekst": "a) Bruk et eget eksempel til å vise definisjonsmengde (D_f) og verdimengde (V_f).<br>b) Hva menes med nullpunkter til en graf? Tegn og forklar.",
                "bilde": null,
                "hint": "Definisjonsmengde handler om x-verdiene. Verdimengde handler om y-verdiene.",
                "fasit": "<strong>a)</strong> Df er alle gyldige x-verdier. Vf er alle y-verdier funksjonen kan gi. Eksempel: En graf fra x=0 til x=5, med y fra 0 til 10 gir Df=[0, 5], Vf=[0, 10].<br><strong>b)</strong> Nullpunkt er der grafen skjærer x-aksen (når y = 0)."
            },
            {
                "id": "4.2",
                "tittel": "Oppgave 4.2",
                "tekst": "Funksjonen B gitt ved B(t) = 2πt², der definisjonsmengden er D_B = [2, 5].<br>a) Bestem eksakte verdier for B(2) og B(5).<br>b) Bestem verdimengden V_B.",
                "bilde": null,
                "hint": "Sett x-verdiene rett inn i uttrykket. Ikke gjør π om til desimaltall.",
                "fasit": "<strong>a)</strong> B(2) = 2π(2)² = 8π. B(5) = 2π(5)² = 50π.<br><strong>b)</strong> Siden funksjonen stiger kontinuerlig i intervallet [2, 5], er verdimengden VB = [8π, 50π]."
            },
            {
                "id": "4.3",
                "tittel": "Oppgave 4.3",
                "tekst": "Gitt grafen til g(x) = x² - 4x + 3.<br>a) Finn nullpunktene til g.<br>b) Hva er verdimengden til g?<br>c) Finn g(0).<br>d) For hvilke verdier av x er g(x) = 3?",
                "bilde": null,
                "hint": "For nullpunkter setter du uttrykket lik null. For verdimengde til en parabel, finn bunnpunktet.",
                "fasit": "<strong>a)</strong> x² - 4x + 3 = 0 gir x = 1 og x = 3.<br><strong>b)</strong> x-koordinat for bunnpunkt: x = -(-4)/(2*1) = 2. g(2) = -1. Vg = [-1, →〉.<br><strong>c)</strong> g(0) = 3.<br><strong>d)</strong> x² - 4x + 3 = 3 ⇒ x(x - 4) = 0 ⇒ x = 0 eller x = 4."
            },
            {
                "id": "4.4",
                "tittel": "Oppgave 4.4",
                "tekst": "Vi har en funksjon h. 1) Hva er h(x) når x = c? 2) Hva er x når h(x) = d?<br>a) Kan det finnes mer enn ett svar på spørsmål 1?<br>b) Kan det finnes mer enn ett svar på spørsmål 2? Begrunn kort.",
                "bilde": null,
                "hint": "Tenk på definisjonen av en funksjon. Kan samme x-verdi gi to forskjellige y-verdier?",
                "fasit": "<strong>a)</strong> Nei. En funksjon kan per definisjon kun ha én y-verdi for en gitt x-verdi.<br><strong>b)</strong> Ja. Flere x-verdier kan gi samme y-verdi (f.eks. for en parabel der y = 4 for både x = 2 og x = -2)."
            },
            {
                "id": "4.5",
                "tittel": "Oppgave 4.5",
                "tekst": "Funksjonen p er gitt ved p(x) = 5 - √(2x).<br>a) Hva er p(x) når x = 8?<br>b) Hva er x når p(x) = 3?<br>c) Finn definisjonsmengden og verdimengden til p.",
                "bilde": null,
                "hint": "Husk at du ikke kan ta kvadratroten av et negativt tall. Dette avgjør definisjonsmengden.",
                "fasit": "<strong>a)</strong> p(8) = 5 - √16 = 1.<br><strong>b)</strong> 5 - √(2x) = 3 ⇒ √(2x) = 2 ⇒ 2x = 4 ⇒ x = 2.<br><strong>c)</strong> Dp: 2x ≥ 0 ⇒ x ≥ 0. Dp = [0, →〉. Vp: Roten er alltid positiv, så største verdi er 5 (når roten er 0). Vp = 〈←, 5]."
            },
            {
                "id": "4.6",
                "tittel": "Oppgave 4.6",
                "tekst": "Funksjonen g(x) = x² + 2x - 3. Bestem et uttrykk for:<br>a) g(k)<br>b) g(2k)<br>c) g(k-1)",
                "bilde": null,
                "hint": "Bytt ut alle 'x'-er i uttrykket med det som står i parentesen.",
                "fasit": "<strong>a)</strong> k² + 2k - 3.<br><strong>b)</strong> (2k)² + 2(2k) - 3 = 4k² + 4k - 3.<br><strong>c)</strong> (k-1)² + 2(k-1) - 3 = k² - 4."
            },
            {
                "id": "4.7",
                "tittel": "Oppgave 4.7",
                "tekst": "f(x) = 0.5x² + 3x - 3 og g(x) = 2x + b. Grafene skjærer hverandre i (2, 5).<br>a) Finn funksjonsuttrykkene til f og g.<br>b) Finn det andre skjæringspunktet.<br>c) Ligger punktet (1, 4) på minst én av grafene?",
                "bilde": null,
                "hint": "Bruk punktet (2,5) til å finne b i uttrykket for g.",
                "fasit": "<strong>a)</strong> 5 = 2(2) + b ⇒ b = 1. g(x) = 2x + 1.<br><strong>b)</strong> 0.5x² + 3x - 3 = 2x + 1 ⇒ x² + 2x - 8 = 0 ⇒ x = 2 og x = -4. y-verdi for -4: g(-4) = -7. Punkt: (-4, -7).<br><strong>c)</strong> f(1) = 0.5, g(1) = 3. Punktet ligger ikke på noen av dem."
            },
            {
                "id": "4.8",
                "tittel": "Oppgave 4.8",
                "tekst": "a) Tegn et koordinatsystem og konstruer en lineær funksjon.<br>b) På hvilken form skrives alle lineære funksjoner? Forklar leddene.",
                "bilde": null,
                "hint": "Lineære funksjoner er alltid rette linjer.",
                "fasit": "<strong>a)</strong> Tegn en rett linje.<br><strong>b)</strong> Form: f(x) = ax + b. 'a' er stigningstallet, 'b' er konstantleddet."
            },
            {
                "id": "4.9",
                "tittel": "Oppgave 4.9",
                "tekst": "Konstruer funksjonene: v(x)=3, f(x)=x-2, g(x)=-x+2, h(x)=2x-2.<br>a) Hvilke grafer krysser hverandre?<br>b) Når krysser de hverandre?<br>c) Hva betyr uttrykket f(x) = v(x)?",
                "bilde": null,
                "hint": "Stigningstallet avslører om to linjer er parallelle.",
                "fasit": "<strong>a)</strong> Alle som ikke har samme stigningstall vil krysse hverandre.<br><strong>b)</strong> v krysser f i x=5. f krysser g i x=2, etc.<br><strong>c)</strong> Betyr å finne x-verdien der linjene f og v skjærer hverandre."
            },
            {
                "id": "4.10",
                "tittel": "Oppgave 4.10",
                "tekst": "Lineær funksjon h går gjennom (1, 5) og (4, -1).<br>a) Bestem funksjonsuttrykket.<br>b) Ligger punktet (3, 1) på grafen?<br>c) Hva er nullpunktet?",
                "bilde": null,
                "hint": "Stigningstall a = (endring i y) / (endring i x).",
                "fasit": "<strong>a)</strong> a = (-1 - 5) / (4 - 1) = -2. Bruker (1,5): 5 = -2(1) + b ⇒ b = 7. h(x) = -2x + 7.<br><strong>b)</strong> h(3) = -2(3) + 7 = 1. Ja.<br><strong>c)</strong> -2x + 7 = 0 ⇒ x = 3.5."
            },
            {
                "id": "4.11",
                "tittel": "Oppgave 4.11",
                "tekst": "En rett linje skjærer koordinataksene i punktene (5, 0) og (0, 3). Finn likningen på formen y = ax + b.",
                "bilde": null,
                "hint": "Punktet (0,3) gir deg konstantleddet 'b' helt gratis.",
                "fasit": "Skjæring med y-akse gir b = 3. a = (3 - 0) / (0 - 5) = -0.6. Svar: y = -0.6x + 3."
            },
            {
                "id": "4.12",
                "tittel": "Oppgave 4.12",
                "tekst": "Rett linje gitt ved 15x + 45y = 900.<br>a) Finn skjæringspunktene med aksene ved regning.<br>b) Skisser linja ut fra punktene.",
                "bilde": null,
                "hint": "Sett inn x=0 for å finne skjæring med y-aksen, og omvendt.",
                "fasit": "<strong>a)</strong> x=0 gir 45y = 900 ⇒ y = 20. Punkt (0, 20). y=0 gir 15x = 900 ⇒ x = 60. Punkt (60, 0).<br><strong>b)</strong> Trekk linjen mellom (0,20) og (60,0)."
            },
            {
                "id": "4.13",
                "tittel": "Oppgave 4.13",
                "tekst": "To ulike lineære funksjoner f og g har D_f = D_g = [2, 6] og V_f = V_g = [4, 12]. Finn funksjonsuttrykkene.",
                "bilde": null,
                "hint": "Funksjonene danner to diagonaler i et rektangel. Én går oppover, én går nedover.",
                "fasit": "f vokser fra (2, 4) til (6, 12): a = 8/4 = 2. 4 = 2(2)+b ⇒ b=0. f(x) = 2x.<br>g avtar fra (2, 12) til (6, 4): a = -8/4 = -2. 12 = -2(2)+b ⇒ b=16. g(x) = -2x + 16."
            },
            {
                "id": "4.14",
                "tittel": "Oppgave 4.14",
                "tekst": "Linja p er gitt ved y = -3x + 2. Linja q går gjennom (3, 5) og står vinkelrett på p. Finn likningen for q.",
                "bilde": null,
                "hint": "Regelen sier: a_p · a_q = -1.",
                "fasit": "Vinkelrett krever a_q · (-3) = -1 ⇒ a_q = 1/3. Setter inn punktet: 5 = (1/3)(3) + b ⇒ b = 4. Likning: y = (1/3)x + 4."
            },
            {
                "id": "4.15",
                "tittel": "Oppgave 4.15",
                "tekst": "f går gjennom (0, 2) og (4, 6). g går gjennom (0, 5) og (5, 0).<br>a) Bestem uttrykkene til f og g.<br>b) Løs f(x) = g(x) eksakt.",
                "bilde": null,
                "hint": "Bruk punktene til å finne stigningstall og konstantledd for hver funksjon.",
                "fasit": "<strong>a)</strong> For f: a = 4/4 = 1, b = 2 ⇒ f(x) = x + 2. For g: a = -5/5 = -1, b = 5 ⇒ g(x) = -x + 5.<br><strong>b)</strong> x + 2 = -x + 5 ⇒ 2x = 3 ⇒ x = 1.5."
            },
            {
                "id": "4.16",
                "tittel": "Oppgave 4.16",
                "tekst": "En linje er gitt ved px + qy = r (q ≠ 0). Finn et uttrykk for stigningstallet og konstantleddet.",
                "bilde": null,
                "hint": "Gjør om likningen slik at y står alene (y = ax + b).",
                "fasit": "Isolerer y: px + qy = r ⇒ qy = -px + r ⇒ y = -(p/q)x + (r/q). Stigningstallet er -(p/q) og konstantleddet (r/q)."
            },
            {
                "id": "4.17",
                "tittel": "Oppgave 4.17",
                "tekst": "På hvilken form skrives polynomfunksjoner? Konstruer en andregrads-, tredjegrads- og fjerdegradsfunksjon.",
                "bilde": null,
                "hint": "Graden bestemmes av den høyeste eksponenten til x.",
                "fasit": "Form: f(x) = a_n·xⁿ + ... + a_0. Eksempler: f(x) = x² (2. grad), f(x) = x³ - x (3. grad), f(x) = x⁴ - 1 (4. grad)."
            },
            {
                "id": "4.18",
                "tittel": "Oppgave 4.18",
                "tekst": "Temperaturen T(t) = -0.2t² + 5.2t - 18.8 (kl. 08:00 er t=8).<br>a) Tegn grafen.<br>b) Når var temperaturen høyest?<br>c) Temperatur kl 08:00 og 15:00?",
                "bilde": null,
                "hint": "Høyeste temperatur er parabelens toppunkt (-b / 2a).",
                "fasit": "<strong>a)</strong> Tegn en parabel vendt nedover.<br><strong>b)</strong> Toppunkt: t = -5.2 / (2·(-0.2)) = 13 (kl 13:00). Temperatur: T(13) = 15.0 °C.<br><strong>c)</strong> T(8) = 10.0 °C. T(15) = 14.2 °C."
            },
            {
                "id": "4.19",
                "tittel": "Oppgave 4.19",
                "tekst": "g(x) = x² + 6x + 5.<br>a) Hva menes med andreaksen?<br>b) Når skjærer g andreaksen?<br>c) Bestem nullpunktene.<br>d) Hva slags ekstremalpunkt har funksjonen?<br>e) Finn punktet.",
                "bilde": null,
                "hint": "Andreaksen er y-aksen.",
                "fasit": "<strong>a)</strong> y-aksen.<br><strong>b)</strong> Skjærer når x=0: g(0) = 5. Punkt (0, 5).<br><strong>c)</strong> ABC-formelen gir x = -1 og x = -5.<br><strong>d)</strong> 'Smilende' parabel (positiv x²), så den har bunnpunkt.<br><strong>e)</strong> x = -b/2a = -3. g(-3) = -4. Punkt: (-3, -4)."
            },
            {
                "id": "4.20",
                "tittel": "Oppgave 4.20",
                "tekst": "Tredjegradspolynom med nullpunkter x=-2, 1, og 3.<br>a) Sett opp funksjonsuttrykket på faktorisert form.<br>b) Hvis h(0) = 12, finn a.<br>c) Finn det fullstendige uttrykket.",
                "bilde": null,
                "hint": "Faktorisert form er a(x-x_1)(x-x_2)...",
                "fasit": "<strong>a)</strong> h(x) = a(x + 2)(x - 1)(x - 3).<br><strong>b)</strong> 12 = a(2)(-1)(-3) ⇒ 6a = 12 ⇒ a = 2.<br><strong>c)</strong> Ganger ut: h(x) = 2x³ - 4x² - 10x + 12."
            },
            {
                "id": "4.21",
                "tittel": "Oppgave 4.21",
                "tekst": "P(x) = 2x³ - 10x² + 14x - 6. x=3 er et nullpunkt. Bruk polynomdivisjon til å skrive uttrykket på fullstendig faktorisert form.",
                "bilde": null,
                "hint": "Del polynomet på (x-3) og faktoriser restpolynomet.",
                "fasit": "Polynomdivisjon gir (2x² - 4x + 2). Trekk ut 2: 2(x² - 2x + 1). Med kvadratsetning: 2(x-1)². Resultat: P(x) = 2(x-3)(x-1)²."
            },
            {
                "id": "4.22",
                "tittel": "Oppgave 4.22",
                "tekst": "En parabel har toppunkt i (1, 4) og skjærer x-aksen i x=3.<br>a) Form?<br>b) Leif sier f(x) = a(x-1)² + 4 (a er negativ). Rett/Galt?<br>c) Bestem a.<br>d) Skriv f(x).",
                "bilde": null,
                "hint": "Toppunkt betyr at den åpner nedover.",
                "fasit": "<strong>a)</strong> Bue nedover.<br><strong>b)</strong> Leif har rett. Generell form fra toppunkt er f(x) = a(x-x_t)²+y_t. Toppunkt krever a < 0.<br><strong>c)</strong> 0 = a(3-1)² + 4 ⇒ 4a = -4 ⇒ a = -1.<br><strong>d)</strong> f(x) = -x² + 2x + 3."
            },
            {
                "id": "4.23",
                "tittel": "Oppgave 4.23",
                "tekst": "Forklar hva en rasjonal funksjon er og illustrer et eksempel.",
                "bilde": null,
                "hint": "En funksjon som er en brøk av polynomer.",
                "fasit": "En rasjonal funksjon kan skrives som en brøk der teller og nevner er polynomer. Eks: f(x) = 1/x (illustreres som en hyperbel)."
            },
            {
                "id": "4.24",
                "tittel": "Oppgave 4.24",
                "tekst": "Forklar hva en asymptote er, og de to hovedtypene.",
                "bilde": null,
                "hint": "Tenk på en linje grafen nærmer seg, men aldri treffer.",
                "fasit": "En asymptote er en linje grafen nærmer seg uendelig uten å berøre. 1) Loddrett: oppstår når nevner går mot 0. 2) Vannrett: viser verdien grafen flater ut på for store x."
            },
            {
                "id": "4.25",
                "tittel": "Oppgave 4.25",
                "tekst": "Vis hvordan man finner vannrett og loddrett asymptote og hvordan svaret skrives.",
                "bilde": null,
                "hint": "Sjekk telleren mot nevneren.",
                "fasit": "Vannrett: Se på forholdet mellom høyeste grad i teller og nevner (deles på hverandre). Skrives y=tall. Loddrett: Finn x som gjør at nevneren er 0. Skrives x=tall."
            },
            {
                "id": "4.26",
                "tittel": "Oppgave 4.26",
                "tekst": "k(x) = (3x - 6)/(x + 2).<br>a) Nullpunkt og y-skjæring.<br>b) Asymptoter.<br>c) D_k og V_k.<br>d) Tegn for hånd.",
                "bilde": null,
                "hint": "Nullpunkt: teller = 0. Asymptote loddrett: nevner = 0.",
                "fasit": "<strong>a)</strong> Teller=0 ⇒ x=2. y-skjæring x=0 ⇒ (0-6)/2 = -3. P:(0,-3).<br><strong>b)</strong> Loddrett: x+2=0 ⇒ x=-2. Vannrett: 3x/x ⇒ y=3.<br><strong>c)</strong> Dk = ℝ \\ {-2}. Vk = ℝ \\ {3}.<br><strong>d)</strong> Tegn asymptoter x=-2, y=3 og kurver i hjørnene."
            },
            {
                "id": "4.27",
                "tittel": "Oppgave 4.27",
                "tekst": "Vi har en rasjonal graf (skjult). Finn riktig uttrykk: 1) f(x) = (x+1)/(x-2), 2) (x-1)/(x+2), 3) (2x+2)/(x-2), 4) (x+2)/(x-1).",
                "bilde": "Bilde4.27.png",
                "hint": "Avles grafen. Hvor ligger den loddrette asymptoten, og hvor krysser den x-aksen?",
                "fasit": "Fra grafen: Loddrett asymptote i x = 1 (nevner x-1). Nullpunkt i x = -2 (teller x+2). Alternativ 4 er riktig: f(x) = (x+2)/(x-1)."
            },
            {
                "id": "4.28",
                "tittel": "Oppgave 4.28",
                "tekst": "r(x) = (2x² - x - 3) / (x - 1).<br>a) Nullpunkt og y-skjæring.<br>b) Loddrett asymptote.<br>c) Bruk polynomdivisjon for å vise skrå asymptote y = 2x+1.<br>d) Har den vannrett asymptote?",
                "bilde": null,
                "hint": "Når teller har høyere grad enn nevner, får vi en skrå asymptote.",
                "fasit": "<strong>a)</strong> Nullpunkt (teller=0): x=1.5, x=-1. y-skjæring x=0: 3.<br><strong>b)</strong> Nevner=0 ⇒ x=1.<br><strong>c)</strong> Divisjon gir 2x+1 med rest -2. Form: 2x+1 - 2/(x-1).<br><strong>d)</strong> Nei, fordi telleren (grad 2) dominerer nevneren (grad 1) mot uendelig."
            },
            {
                "id": "4.29",
                "tittel": "Oppgave 4.29",
                "tekst": "b(x) = (ax+b)/(cx-3). Loddrett asymptote x=1.5, vannrett y=2. Går gjennom (2, 5). Finn a, b, c.",
                "bilde": null,
                "hint": "Loddrett asymptote betyr nevner = 0 for x=1.5.",
                "fasit": "x=1.5 ⇒ 1.5c-3=0 ⇒ c=2. Vannrett: a/c = 2 ⇒ a/2=2 ⇒ a=4. Punktet (2,5): 5=(4(2)+b)/(2(2)-3) ⇒ 5=8+b ⇒ b=-3."
            },
            {
                "id": "4.30",
                "tittel": "Oppgave 4.30",
                "tekst": "P(x) = (x⁴-x³+2x²-x+3) / (x²+1).<br>a) Utfør polynomdivisjon.<br>b) Skriv på rest-form og forklar oppførselen for store x.",
                "bilde": null,
                "hint": "Pass på mellomregningene i divisjonen av x⁴.",
                "fasit": "<strong>a)</strong> Resultat: x²-x+1 med rest 2.<br><strong>b)</strong> P(x) = (x²-x+1) + 2/(x²+1). For store x går restbrøken mot null, og grafen vil dermed legge seg inntil parabelen y = x²-x+1."
            },
            {
                "id": "4.31",
                "tittel": "Oppgave 4.31",
                "tekst": "a) Form for potensfunksjoner? Forklar parameterne.<br>b) Når er potensfunksjoner hensiktsmessig?",
                "bilde": null,
                "hint": "I en potensfunksjon står x i grunntallet.",
                "fasit": "<strong>a)</strong> f(x) = a·x^b. 'a' er skaleringsfaktor, 'x' er variabel grunntall, 'b' fast eksponent.<br><strong>b)</strong> I fysikk og geometri (f.eks areal/volum) der relativ vekst avhenger av grunnverdien."
            },
            {
                "id": "4.32",
                "tittel": "Oppgave 4.32",
                "tekst": "Volum av krystall: V(t) = 2.5·t^0.6.<br>a) Tid til V=10 cm³.<br>b) Hvor mange prosent vokser det i fjerde uke (t=3 til t=4)?",
                "bilde": null,
                "hint": "I del b regner du ut V(4) og deler det på V(3) for vekstfaktor.",
                "fasit": "<strong>a)</strong> 2.5·t^0.6=10 ⇒ t^0.6=4 ⇒ t=4^(1/0.6) ≈ 10.1 uker.<br><strong>b)</strong> V(4)/V(3) = 5.74/4.83 ≈ 1.188. Øker med 18.8 %."
            },
            {
                "id": "4.33",
                "tittel": "Oppgave 4.33",
                "tekst": "Steketid T(m) = 1.2·m^0.55.<br>a) Skisser (1000-3000g).<br>b) Tid for 2000g.<br>c) Forskjell mellom 2500g og 2000g.",
                "bilde": null,
                "hint": "0.55 er en positiv eksponent under 1, så grafen stiger, men slakker av.",
                "fasit": "<strong>a)</strong> Kurve vokser fra 53.8 til 98.4.<br><strong>b)</strong> T(2000) = 1.2·2000^0.55 ≈ 78.7 min.<br><strong>c)</strong> T(2500) ≈ 89.0 min. Forskjell: 10.3 minutter."
            },
            {
                "id": "4.34",
                "tittel": "Oppgave 4.34",
                "tekst": "Etterspørsel E(p) = 25000·p^-1.2.<br>a) p=100.<br>b) Pris opp 10% (100->110).<br>c) Pris ned 10% (100->90).",
                "bilde": null,
                "hint": "Negativ eksponent betyr at høyere pris gir lavere etterspørsel.",
                "fasit": "<strong>a)</strong> E(100) ≈ 100 enheter.<br><strong>b)</strong> p=1.10. Endring: (1.10)^-1.2 ≈ 0.892 (nedgang 10.8 %).<br><strong>c)</strong> p=0.90. Endring: (0.90)^-1.2 ≈ 1.135 (økning 13.5 %)."
            },
            {
                "id": "4.35",
                "tittel": "Oppgave 4.35",
                "tekst": "Areal oljeutslipp: A(x) = 3.14·x^1.9.<br>a) Areal radius 5.0.<br>b) Radius når areal=100.<br>c) Prosent økning i areal hvis radius øker med 15 %.",
                "bilde": null,
                "hint": "c) Vekstfaktoren 1.15 må opphøyes i eksponenten 1.9.",
                "fasit": "<strong>a)</strong> A(5) ≈ 66.8 km².<br><strong>b)</strong> x^1.9 = 100/3.14 ⇒ x ≈ 6.13 km.<br><strong>c)</strong> (1.15)^1.9 ≈ 1.304. Arealet øker 30.4 %."
            },
            {
                "id": "4.36",
                "tittel": "Oppgave 4.36",
                "tekst": "Kapasitet C(x) = 150·x^-0.15 (ladesykluser).<br>a) Kapasitet etter 500.<br>b) Skisser.<br>c) Sykluser til 60 % kapasitet.<br>d) Kapasitetsnedgang hvis sykluser øker med 30 %.",
                "bilde": null,
                "hint": "En negativ potensfunksjon flater gradvis ut for høye x.",
                "fasit": "<strong>a)</strong> C(500) ≈ 57 %.<br><strong>b)</strong> Synkende kurve som flater ut.<br><strong>c)</strong> 60 = 150·x^-0.15 ⇒ x ≈ 395 sykluser.<br><strong>d)</strong> (1.3)^-0.15 ≈ 0.961. Nedgang på 3.9 %."
            },
            {
                "id": "4.37",
                "tittel": "Oppgave 4.37",
                "tekst": "a) Form for eksponentialfunksjoner?<br>b) Hvordan finne uttrykket basert på kun to punkter?",
                "bilde": null,
                "hint": "I en eksponentialfunksjon er det x som står som eksponent.",
                "fasit": "<strong>a)</strong> f(x) = a·b^x. a=startverdi, b=vekstfaktor.<br><strong>b)</strong> Sett opp to likninger, del likning 2 på 1 for å fjerne 'a', løs for 'b'. Sett b inn for å finne 'a'."
            },
            {
                "id": "4.38",
                "tittel": "Oppgave 4.38",
                "tekst": "Bakteriekultur: 10 mill. Øker 3 % daglig.<br>a) Uttrykk B(x).<br>b) Antall etter ett år (365 dager).",
                "bilde": null,
                "hint": "3 % økning gir en vekstfaktor på 1.03.",
                "fasit": "<strong>a)</strong> B(x) = 10·1.03^x.<br><strong>b)</strong> B(365) = 10·1.03^365 ≈ 484 827 millioner."
            },
            {
                "id": "4.39",
                "tittel": "Oppgave 4.39",
                "tekst": "Bilverdi: V(t) = 400000·0.85^t.<br>a) Verdi som ny.<br>b) Årlig prosentvis nedgang.<br>c) Skisser.<br>d) Verdi etter 4 år.<br>e) Halveringstid?",
                "bilde": null,
                "hint": "En vekstfaktor under 1 betyr prosentvis nedgang (1 - 0.85).",
                "fasit": "<strong>a)</strong> 400 000 kr.<br><strong>b)</strong> 15 %.<br><strong>c)</strong> Fallende kurve.<br><strong>d)</strong> V(4) ≈ 208 801 kr.<br><strong>e)</strong> 0.5 = 0.85^t ⇒ t = ln(0.5)/ln(0.85) ≈ 4.26 år."
            },
            {
                "id": "4.40",
                "tittel": "Oppgave 4.40",
                "tekst": "f(x) = a·b^x gjennom (0, 5) og (3, 40).<br>a) Bestem uttrykk.<br>b) Ligger (-1, 2.5) på grafen?<br>c) Løs f(x) = 320.",
                "bilde": null,
                "hint": "x=0 gir startverdien 'a'.",
                "fasit": "<strong>a)</strong> a=5. 40=5·b³ ⇒ b=2. f(x)=5·2^x.<br><strong>b)</strong> f(-1)=5·2^-1=2.5. Ja.<br><strong>c)</strong> 5·2^x=320 ⇒ 2^x=64 ⇒ x=6."
            },
            {
                "id": "4.41",
                "tittel": "Oppgave 4.41",
                "tekst": "Investering sank fra 12 000 (2020) til 10 800 (2021). Hva er verdien i 2025 hvis samme nedgang fortsetter?",
                "bilde": null,
                "hint": "Finn vekstfaktoren (10800/12000).",
                "fasit": "Vekstfaktor: 0.90. (10% ned). Etter 5 år (t=5): 12000·0.90^5 = 7 086 kr."
            },
            {
                "id": "4.42",
                "tittel": "Oppgave 4.42",
                "tekst": "2010-2020: 4 % økning årlig. 2015 = 25 000 kr.<br>a) Verdi 2020.<br>b) Verdi 2010.<br>c) Prosent økning 2010 til 2020.",
                "bilde": null,
                "hint": "For å regne bakover i tid, deler vi på vekstfaktoren opphøyd i antall år.",
                "fasit": "<strong>a)</strong> 25000·1.04^5 = 30 416 kr.<br><strong>b)</strong> 25000/1.04^5 = 20 548 kr.<br><strong>c)</strong> Vekstfaktor total: 1.04^10 ≈ 1.480. Økning på 48 %."
            },
            {
                "id": "4.43",
                "tittel": "Oppgave 4.43",
                "tekst": "Halveringstid T i f(t) = a·b^t (0<b<1).<br>a) Hvorfor f(t+T) = 0.5·f(t)?<br>b) Vis at b^T = 0.5.<br>c) Hva forteller dette?",
                "bilde": null,
                "hint": "Matematisk vis at leddene 'a' og 'b^t' finnes på begge sider av likhetstegnet.",
                "fasit": "<strong>a)</strong> Etter T år har verdien blitt halvparten av hva den var ved t.<br><strong>b)</strong> a·b^(t+T) = 0.5·a·b^t. Vi deler begge sider på a·b^t, og står igjen med b^T = 0.5.<br><strong>c)</strong> Tiden avhenger kun av vekstfaktoren, ikke startverdien."
            },
            {
                "id": "4.44",
                "tittel": "Oppgave 4.44",
                "tekst": "Forklar begrepene: Gjennomsnittlig vekstfart, momentan vekstfart og hvordan de regnes ut.",
                "bilde": null,
                "hint": "Gjennomsnittlig gjelder over et tidsintervall. Momentan er i ett nøyaktig øyeblikk.",
                "fasit": "Gjennomsnitt = Endring over intervall [x1, x2]. Regnes som stigningstall til en sekant: (f(x2)-f(x1))/(x2-x1). Momentan = Endring i ett punkt (tangentens stigningstall). Finnes ved å derivere funksjonen og sette inn x-verdien."
            },
            {
                "id": "4.45",
                "tittel": "Oppgave 4.45",
                "tekst": "f(x) = -x² + 4x + 2.<br>a) Gjennomsnittsfart i [0,2] og [2,4].<br>b) Tangent i (2, f(2)). Momentan fart x=2?<br>c) Momentan x=3?<br>d) Momentan x=0?",
                "bilde": null,
                "hint": "Finn den deriverte f'(x) for oppgave b, c og d.",
                "fasit": "<strong>a)</strong> [0,2]: (6-2)/2=2. [2,4]: (2-6)/2=-2.<br><strong>b)</strong> f'(x) = -2x+4. f'(2) = 0. Grafen har et toppunkt her.<br><strong>c)</strong> f'(3) = -2.<br><strong>d)</strong> f'(0) = 4."
            },
            {
                "id": "4.46",
                "tittel": "Oppgave 4.46",
                "tekst": "Tangent i (20, 300) har stigning 15. f(40) = 500.<br>a) Stigningstall tangent?<br>b) Momentan x=20?<br>c) Gjennomsnittsfart i [20,40].",
                "bilde": null,
                "hint": "Tangentens stigningstall er nøyaktig det samme som den momentane vekstfarten.",
                "fasit": "<strong>a)</strong> 15 (Grafen stiger med 15 y-enheter per x-enhet akkurat her).<br><strong>b)</strong> 15.<br><strong>c)</strong> (500-300)/20 = 10."
            },
            {
                "id": "4.47",
                "tittel": "Oppgave 4.47",
                "tekst": "Industriovn: T(t) = 200 - 180·0.92^t.<br>a) Gjennomsnittsfart [0, 10].<br>b) Momentan t=5, 10, 15.",
                "bilde": null,
                "hint": "Finn T'(t). Siden det er 0.92^t, bruker vi ln for å derivere: T'(t) = -180 · ln(0.92) · 0.92^t.",
                "fasit": "<strong>a)</strong> (T(10)-T(0))/10 ≈ 10.2 grader/min.<br><strong>b)</strong> T'(t) ≈ 15.01·0.92^t. 1) 9.9 2) 6.5 3) 4.3 grader/min. Viser at oppvarmingen går langsommere jo lengre den står."
            },
            {
                "id": "4.48",
                "tittel": "Oppgave 4.48",
                "tekst": "f(x) = 0.25x³ - 2x.<br>a) Skisser [-4,4].<br>b) Tangenter x=-2 og 2.<br>c) Momentan fart x=-2 og 2 ved regning.<br>d) Når er momentan = 0?<br>e) Når er momentan = 1?",
                "bilde": null,
                "hint": "For c, finn f'(x).",
                "fasit": "<strong>c)</strong> f'(x) = 0.75x² - 2. f'(-2)=1, f'(2)=1.<br><strong>d)</strong> 0.75x²-2=0 ⇒ x ≈ ±1.63 (topp/bunnpunkt).<br><strong>e)</strong> 0.75x²-2=1 ⇒ x = ±2."
            },
            {
                "id": "4.49",
                "tittel": "Oppgave 4.49",
                "tekst": "Skisser en andregradsfunksjon der momentan vekst = -4 i x=1, og gjennomsnittsfart [1,5] er 0.",
                "bilde": null,
                "hint": "Hvis gjennomsnittsfarten over intervallet er 0, må y-verdiene være like (f.eks f(1) = f(5)). Da er symmetrilinjen midt imellom.",
                "fasit": "Symmetrilinje er x=3. f'(1)=-4. Et mulig uttrykk f(x)=x²-6x oppfyller dette. Grafen er en parabel som snur i x=3."
            },
            {
                "id": "4.50",
                "tittel": "Oppgave 4.50",
                "tekst": "a) Hva representerer den deriverte?<br>b) Hva kan fortegnet forklare?<br>c) Hvordan finne ekstremalpunkt?",
                "bilde": null,
                "hint": "Den deriverte er funksjonens endringshastighet.",
                "fasit": "<strong>a)</strong> Momentan vekstfart (tangentens stigningstall).<br><strong>b)</strong> + (vokser), 0 (flat), - (avtar).<br><strong>c)</strong> Sett f'(x) = 0, da har grafen et lokalt topp- eller bunnpunkt."
            },
            {
                "id": "4.51",
                "tittel": "Oppgave 4.51",
                "tekst": "Finn f'(x) og f'(2):<br>a) f(x) = 5x - 3<br>b) f(x) = -x + 4<br>c) f(x) = √3·x<br>d) f(x) = -7",
                "bilde": null,
                "hint": "Konstanter forsvinner ved derivasjon, og for 1. grads ledd sitter du igjen med stigningstallet.",
                "fasit": "<strong>a)</strong> 5 og 5.<br><strong>b)</strong> -1 og -1.<br><strong>c)</strong> √3 og √3.<br><strong>d)</strong> 0 og 0."
            },
            {
                "id": "4.52",
                "tittel": "Oppgave 4.52",
                "tekst": "a) Hva viser en fortegnslinje?<br>b) Tegn fortegnslinja til f(x) = x+3.",
                "bilde": null,
                "hint": "Krysser grafen x-aksen? Hvor er den under/over?",
                "fasit": "<strong>a)</strong> Viser hvor et uttrykk er positivt (heltrukken strek) og negativt (stiplet).<br><strong>b)</strong> Null for x=-3. Stiplet før -3, heltrukken etter."
            },
            {
                "id": "4.53",
                "tittel": "Oppgave 4.53",
                "tekst": "g(x) = -x² + 4x.<br>a) Nullpunkter.<br>b) Fortegnslinje g(x).<br>c) Finn g'(x) og lag fortegnslinje.<br>d) Beregn g'(3).<br>e) Løs g'(x)=0.",
                "bilde": null,
                "hint": "Tegn fortegnslinje for g'(x) ved å finne nullpunktet til den deriverte.",
                "fasit": "<strong>a)</strong> x=0 og x=4.<br><strong>b)</strong> Stiplet under 0, heltrukken til 4, stiplet etter.<br><strong>c)</strong> g'(x) = -2x+4. Positiv til x=2, negativ etter.<br><strong>d)</strong> -2.<br><strong>e)</strong> x=2."
            },
            {
                "id": "4.54",
                "tittel": "Oppgave 4.54",
                "tekst": "f'(x) < 0 for x < -1, null i x = -1, positiv til x = 3, null i x = 3, negativ etter. Skisser.",
                "bilde": null,
                "hint": "Hva forteller fortegnet på f' om stigningen til selve f?",
                "fasit": "Funksjonen synker frem til x=-1 (bunnpunkt), stiger til x=3 (toppunkt), og synker deretter."
            },
            {
                "id": "4.55",
                "tittel": "Oppgave 4.55",
                "tekst": "f(x) = x³ - 6x² + 9x + 2.<br>a) Stigningstall x=1, 2, 3.<br>b) Verdien for f'(1), f'(2), f'(3).<br>c) Stigning x=0.<br>d) Løs f(x)=2 og f'(x)=0.",
                "bilde": null,
                "hint": "Deriver først. Svar på a og b er identisk.",
                "fasit": "f'(x) = 3x² - 12x + 9.<br><strong>a/b)</strong> x=1 gir 0. x=2 gir -3. x=3 gir 0.<br><strong>c)</strong> f'(0) = 9.<br><strong>d)</strong> f(x)=2 ⇒ x(x-3)²=0 ⇒ x=0, 3. f'(x)=0 ⇒ x=1, 3."
            },
            {
                "id": "4.56",
                "tittel": "Oppgave 4.56",
                "tekst": "f'(x) er linjen y = 2x - 4. Skisser f når den går gjennom (0, 2).",
                "bilde": null,
                "hint": "Anti-deriver for å finne uttrykket. Hva blir x² derivert?",
                "fasit": "Siden f' er 2x-4, er f(x) en parabel f(x)=x²-4x+C. Gjennom (0,2) gir C=2. f(x) = x²-4x+2. Parabelen har bunnpunkt i x=2."
            },
            {
                "id": "4.57",
                "tittel": "Oppgave 4.57",
                "tekst": "Oppgitt for f:<br>f(x)=0 i 0 og 4. Under x-aksen mellom. Over ellers.<br>f'(x)=0 i 2. Negativ før, positiv etter. Skisser f.",
                "bilde": null,
                "hint": "Informasjonen beskriver en u-formet bue.",
                "fasit": "Alle opplysningene peker på en 'smilende' parabel med bunnpunkt nøyaktig i x=2, som for eksempel f(x) = x² - 4x."
            }
        ]
    }
];
