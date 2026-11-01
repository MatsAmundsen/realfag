"""
FORSLAG: sluttsvar og poeng per deloppgave (a, b, c) for 1P-øveprøver (P1–P6), P7 sett 1 og de ti 1P-eksamenene.
Oppføringene bruker samme verktøy og felt som src/spec_svar.py (T, U, L, P, O, UL, S, sympy), men filen er ET FORSLAG:
spec_svar.py er ikke endret. Nøkkelformatet er ikke endelig (kommer fra MatteBot2), så alt som er nøkkelavhengig ligger i
første argument til E/ES/TX og i `_nokkel()` under.

Nøkler
  eksamen   del-id slik den står i dataene, f.eks. «1p-h24-d2-8c» (oppgave uten bokstav: «1p-h24-d2-3»)
  øveprøve  oppgave-id + bokstav, f.eks. «P3.OP2a» (oppgave uten delbokstav: «P2.OP3»)
  P7 sett 1 oppgave-id + bokstav, f.eks. «P7-d1-1a» (P7 har ikke egne del-id; deler står inline i oppgaveteksten)

Tre klasser (felt `klasse`)
  E   auto          sluttsvaret kan autosjekkes: eleven får poeng når sjekkSluttsvar godtar svaret.
  ES  selvvurdering med forhåndsvisning: forklaring/tolkning eller formkrav er med i poenget. `svar` brukes bare til
                    forhåndsvisning og tester (som `selvvurder: true` i spec_svar.py). `hvorfor` oppgir grunnen.
  TX  selvvurdering uten sjekkbart sluttsvar (forklaring, graf, tabell, program, «vis at»): ingen `svar`. Fasiten vises.
`sym` = symbolgrupper fra feat/symbolrad (`symbolrad.ts`): mengde (∈ ∉ ℕ ℤ ℚ ℝ), rot (√), ulikhet (≤ ≥ ≠), pi (π), pm (±),
grader (°). Tom liste = ingen symbolrad nødvendig. `fh` = tekst som MÅ stå i fasiten (norm() fra verify_prove_poeng.py).
`usikker` = fasiten bør sjekkes av en lærer før den brukes som poenggrunnlag.
"""
import os
import sys

sys.path.insert(0, os.environ.get("SPEC_DIR", "/workspace/1p-bibliotek/src"))
import spec_svar as _S  # bare som verktøykasse; SPEC/EKSKLUDERT i spec_svar røres ikke (oppføringer fjernes igjen under)
from spec_svar import (T, U, L, P, O, UL, S, V, R, sqrt, pi, sp, KR, PROS, deg, x, y, a, b, c, n, t, s)  # noqa: F401

FORSLAG = {}   # nøkkel -> oppføring (rekkefølge = rekkefølge i filen)


def _nokkel(k):
    """Nøkkelformatet er ikke endelig: bytt ut her når MatteBot2 har bestemt det."""
    return k


def _legg(klasse, k, svar, fh, hvorfor=None, enhet=None, alt=None, format=None, sym=None, usikker=None):
    k = _nokkel(k)
    assert k not in FORSLAG, k
    e = {"id": k, "klasse": klasse, "fh": list(fh), "sym": sym if sym is not None else []}
    if svar is not None:
        _S.E(k, svar, fh, enhet=enhet, alt=alt, format=format)
        e.update(_S.SPEC.pop(k))
        e["klasse"] = klasse
        e["sym"] = sym if sym is not None else []
    if klasse != "E":
        e["selvvurder"] = True
        e["hvorfor"] = hvorfor
    if usikker:
        e["usikker"] = usikker
    FORSLAG[k] = e


def E(k, svar, fh, **kw):
    _legg("E", k, svar, fh, **kw)


def ES(k, svar, fh, hvorfor, **kw):
    _legg("ES", k, svar, fh, hvorfor=hvorfor, **kw)


def TX(k, fh, hvorfor, **kw):
    _legg("TX", k, None, fh, hvorfor=hvorfor, **kw)

# =========================================================================== eksamen v2026 (1P)
E("1p-v26-d1-4", T(60, 300, fast=True, ord=True), ["60", "300"], enhet=["personer", "kr", "kroner"],
  format="Skriv først antall personer som mangler, så prisen per person som mangler, skilt med komma eller «og».")
ES("1p-v26-d1-5", T(R(1, 10), R(1, 9), R(1, 8), 9, 32, 100, 1000, fast=True, ord=True), ["10^{-1}<3^{-2}"],
   "rangering: eleven kan skrive uttrykkene eller verdiene i stigende rekkefølge", format="Skriv tallene i stigende rekkefølge, skilt med komma.", sym=["rot"])
ES("1p-v26-d1-6", T(99, enhet=PROS), ["99"], "valg (mindre) og begrunnelse")
ES("1p-v26-d1-7", U("850000*0.8*0.94^5"), ["0,94^{5}"], "formkrav: «sett opp et uttrykk», ikke bare tallet")
E("1p-v26-d1-9b", U("50x+1200"), ["50x+1200"])
E("1p-v26-d1-10b", U("n^2-n+1"), ["n^{2}-n+1"])
ES("1p-v26-d1-11a", T(20000, enhet=KR), ["20000"], "tolkning av K(0) er med i poenget")
TX("1p-v26-d1-12", ["Påstand1"], "påstander: sann/usann med begrunnelse",
   usikker="Påstand 2 kan leses på to måter (konstant trykk: riktig; ellers usann). Fasiten viser begge, hovedsvaret er «usann slik den står».")
TX("1p-v26-d1-13a", ["300", "1,6"], "praktisk tolkning av to modeller (forklaring)")
TX("1p-v26-d1-13b", ["2036", "17021"], "tolkning av program og utskrift (forklaring)")
ES("1p-v26-d2-3a", U("-722.2x+9000"), ["-722,2x+9000"], "modell og forklaring (verdiene er lest av figur)",
   usikker="Grafavlesning (punktene på p og q og asymptoten y = 2000) er lest fra figur i PDF-en; selve grafene er ikke tegnet i dataene.")
ES("1p-v26-d2-3b", U("9000*0.867^x"), ["9000*0,867^{x}"], "modell og forklaring (regresjon, koeffisienter avrundet)",
   usikker="Som 3a: avlest fra figur; koeffisienten 0,867 avhenger av avrunding.")
ES("1p-v26-d2-3c", S(U("7000*0.746^x"), U("7000*0.746^x+2000")), ["0,746^{x}"], "modeller og begrunnelse av antakelse (avlest fra figur)",
   usikker="Som 3a: avlest fra figur.")
TX("1p-v26-d2-4a", ["2,51*10^{7}"], "«vis at»: utregningen er svaret", sym=["grader"])

# =========================================================================== eksamen h2025 (1P)
TX("1p-h25-d1-4b", ["ikkeriktig"], "ja/nei-påstand med begrunnelse")
E("1p-h25-d1-5a", T(200, 180, fast=True, ord=True), ["200", "180"], enhet=KR + ["kr/t", "kroner per time"],
  format="Skriv først timelønnen til Nora, så timelønnen til Nils, skilt med komma eller «og».")
E("1p-h25-d1-5b", T(36), ["36"], enhet=["timer", "t"])
E("1p-h25-d1-6a", T(300, 150, 60, 40, fast=True, ord=True), ["300", "150", "60", "40"], enhet=KR,
  format="Skriv prisene per busstur i tabellens rekkefølge (4, 8, 20 og 30 bussturer), skilt med komma eller «og».")
TX("1p-h25-d1-6b", ["1200"], "graf skal tegnes")
ES("1p-h25-d1-6c", T(16, ulikhet="≥"), ["15", "16"], "graf skal brukes (grafisk løsning); fasiten gir både «mer enn 15» og «minst 16»",
   enhet=["ganger", "turer"], sym=["ulikhet"], usikker="Fasiten oppgir både 15 (like dyrt) og minst 16 (lønner seg); begge må godtas ved selvvurdering.")
TX("1p-h25-d1-7", ["1,5,12,22,35,51"], "oversikt og forklaring av program (utskrift er med i fasiten)")
ES("1p-h25-d2-1a", T(0.009657, 3.0, fast=True, ord=True), ["0,00966", "3,00"], "regresjon i GeoGebra og graf skal tegnes (avrundede koeffisienter)",
   format="Skriv a og b i den rekkefølgen oppgaven spør, skilt med komma eller «og».")
E("1p-h25-d2-1b", T(106, abs=1), ["106"], enhet=["cm"])
ES("1p-h25-d2-1c", T(210.3, abs=3), ["210"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["g/cm", "gram per cm"])
ES("1p-h25-d2-2", T(4, 8, 2, 3, fast=True, ord=True), ["A:graf4", "B:graf8", "C:graf2", "D:graf3"], "valg av graf med begrunnelse",
   format="Skriv grafnummer for A, B, C og D i den rekkefølgen, skilt med komma eller «og».")
TX("1p-h25-d2-6a", ["111,12"], "«vis at»: utregningen er svaret")
TX("1p-h25-d2-7a", ["O=2*y+x"], "«forklar at»: formelen skal begrunnes", sym=["pi"])
TX("1p-h25-d2-7b", ["4,7"], "«vis at»: utregningen er svaret")
TX("1p-h25-d2-7d", ["3,5", "10,06"], "systematisk oversikt (regneark)")
ES("1p-h25-d2-7e", S(U("6x-(1/2+pi/8)x^2"), T(10.08, 3.36, fast=True, ord=True, abs=0.05)), ["6x-(\\frac{1}{2}+\\frac{\\pi}{8})x^{2}", "10,1", "3,4"],
   "funksjonsuttrykk og graf skal tegnes", enhet=["m²", "m"], sym=["pi"],
   format="Skriv funksjonsuttrykket, så semikolon, så størst mulig areal og x-verdien skilt med «og».")

# =========================================================================== eksamen v2025 (1P)
_h = lambda r: R(450) / (pi * r**2)
_O = lambda r: pi * r**2 + R(900) / r
TX("1p-v25-d1-2", ["25", "12,5"], "valg (hvilket parti) med begrunnelse")
TX("1p-v25-d1-3", ["omvendtproporsjonale"], "åpen oppgave: egen situasjon, forklaring og graf")
TX("1p-v25-d1-4", ["10^{3}"], "åpen oppgave: eleven finner egne tall; fasiten viser to løsninger")
E("1p-v25-d1-6a", T(36), ["36"])
E("1p-v25-d1-6b", U("n^2+2n+1"), ["(n+1)^{2}"])
TX("1p-v25-d1-7", ["17", "1016760"], "tolkning av program og utskrift (forklaring)")
E("1p-v25-d1-8a", T(12, 30, fast=True, ord=True), ["12", "30"],
  format="Skriv a og b i den rekkefølgen oppgaven spør, skilt med komma eller «og».")
TX("1p-v25-d1-8b", ["12", "30"], "praktisk tolkning (forklaring)")
E("1p-v25-d1-8c", T(126), ["126"], enhet=KR)
TX("1p-v25-d2-1a", ["27,8"], "«vis at»: sammenlikning av modell og data")
TX("1p-v25-d2-1b", ["20"], "praktisk tolkning (forklaring)")
ES("1p-v25-d2-1c", T(71.84, abs=1), ["72"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["tilfeller per måned", "tilfeller/måned"])
ES("1p-v25-d2-3", T(21, ulikhet="≥"), ["20", "21"], "valg av tilbud med beregninger og råd; fasiten oppgir grensen 20/21 aviser",
   enhet=["aviser"], sym=["ulikhet"])
E("1p-v25-d2-6a", T(_h(4), _O(4), _h(6), _O(6), _h(8), _O(8), fast=True, ord=True, abs=0.1), ["8,95", "275,3", "3,98", "263,1", "2,24", "313,6"],
  format="Skriv h og O for r = 4, så for r = 6, så for r = 8, skilt med komma eller «og».")
ES("1p-v25-d2-6b", U("pi*r^2+900/r"), ["\\pi*r^{2}+\\frac{900}{r}"], "funksjonsuttrykk og graf skal tegnes", sym=["pi"])
TX("1p-v25-d2-7", ["600"], "åpen oppgave: egne antakelser og vurdering", usikker="Ingrediensprisene er egne anslag; svaret (ca. 600 kr i måneden) er et eksempel.")

# =========================================================================== eksamen h2024 (1P)
TX("1p-h24-d1-1", ["62,5", "50"], "valg (hvilken pris) med begrunnelse")
TX("1p-h24-d1-3", ["omvendtproporsjonale", "verkenproporsjonale"], "valg av tekst fra boksene med argumentasjon (ikke et tall)")
TX("1p-h24-d1-4a", ["4", "40"], "praktisk tolkning av kode (forklaring)")
TX("1p-h24-d1-4b", ["15026", "14640"], "tolkning av utskrift (forklaring)")
E("1p-h24-d1-5a", U("1.8C+32"), ["1,8*C+32"])
E("1p-h24-d1-5b", T(20), ["20"], enhet=["°C", "grader", "C"], sym=["grader"])
TX("1p-h24-d2-1a", ["4200"], "«vis hvordan» på to måter (regning og graf)")
ES("1p-h24-d2-1b", T(-150.9, abs=2), ["-151"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["personer per år", "personer/år"])
ES("1p-h24-d2-3", T(7.6, nedgang=True, enhet=PROS), ["7,6"], "valg (mindre) og begrunnelse; svaret er med i begrunnelsen")
ES("1p-h24-d2-5a", U("6250x+290000"), ["6250x+290000"], "funksjonsuttrykk og begrunnelse av valg av funksjon")
ES("1p-h24-d2-5b", U("290000*1.0201^x"), ["290000*1,0201^{x}"], "funksjonsuttrykk og begrunnelse av valg av funksjon (1,0201 er avrundet)")
ES("1p-h24-d2-6b", T(18, 93, fast=True, ord=True), ["18", "93"], "valg av bedrift i tre intervaller; hele svaret er tre betingelser",
   sym=["ulikhet"], format="Skriv grensene 18 og 93 skilt med komma eller «og», og si hvilken bedrift som er best i hvert område.")
TX("1p-h24-d2-7b", ["37,8", "28,9"], "forklaring og beregninger (hvilket parti)")
TX("1p-h24-d2-8a", ["60"], "«vis at»: utregningen er svaret")
TX("1p-h24-d2-8b", ["150", "67,5"], "systematisk oversikt (regneark)")
ES("1p-h24-d2-8c", U("(1200-2x)(800-2x)x/1000000"), ["(1200-2x)(800-2x)*x"], "funksjonsuttrykk og graf skal tegnes", enhet=["liter", "L"], sym=["ulikhet"])
E("1p-h24-d2-8d", S(T(157, abs=5), T(67.6, abs=0.15)), ["157", "67,6"], enhet=["mm", "L"],
  format="Skriv sidelengden i mm og volumet i L, skilt med «;» eller «og».")
TX("1p-h24-d2-8e", ["0<x<400"], "gyldighetsområde med argumentasjon", sym=["ulikhet"])

# =========================================================================== eksamen v2024 (1P)
TX("1p-v24-d1-2a", ["20000", "1,0485"], "praktisk tolkning (forklaring)")
TX("1p-v24-d1-2b", ["1212"], "tolkning av utskrift (forklaring)")
TX("1p-v24-d1-3", ["f", "p"], "valg av grafer (proporsjonal / omvendt proporsjonal) fra en figur")
TX("1p-v24-d1-4a", ["24,5"], "«vis hvordan»: utregningen er svaret")
TX("1p-v24-d2-1a", ["2"], "«vis at»: sammenlikning av modellverdier og data")
ES("1p-v24-d2-1c", T(24.04, abs=0.5), ["24"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["kroner per bagett", "kr/bagett", "kr per bagett"])
E("1p-v24-d2-2a", T(123920, rel=0.002), ["123920"], enhet=KR)
E("1p-v24-d2-2b", T(90000, rel=0.002), ["90000"], enhet=KR)
TX("1p-v24-d2-4b", ["1609"], "«vis hvordan»: omregning av rekordfarten til meter")
TX("1p-v24-d2-5", ["partall", "oddetall"], "forklaring/argumentasjon om tallfølge")
ES("1p-v24-d2-6a", U("7.56*x^0.38"), ["7,56*x^{0,38}"], "regresjonskoeffisientene avhenger av avrunding (a ≈ 7,56 og b ≈ 0,38); graf/regresjon i GeoGebra")
ES("1p-v24-d2-6b", S(U("1000*0.88^x"), U("1000*0.5^(x/5.5)")), ["1000*0,88^{x}", "0,8816"],
   "to modeller (Ari og Lisa); Lisas kan skrives 1000·0,8816^x. Skilt de to svarene med «;»",
   alt=[S(U("1000*0.88^x"), U("1000*0.8816^x"))], format="Skriv Aris modell, så «;», så Lisas modell.")
E("1p-v24-d2-6c", T(4.25, abs=0.4), ["4,2"], enhet=["km"],
  usikker="Fasiten oppgir 4,2–4,3 km (avrundede koeffisienter) og 4,3–4,4 km (uten avrunding); 'rundt 4 km' godtas.")
TX("1p-v24-d2-7", ["1842", "1058"], "åpen oppgave: eget løsningsforslag med begrunnelse")

# =========================================================================== eksamen h2023 (1P)
ES("1p-h23-d1-2a", V("ja"), ["Ja"], "ja/nei med begrunnelse; valg-sjekken godtar bare selve ordet «ja»")
ES("1p-h23-d1-31", V("sann"), ["sann"], "sann/usann; valg-sjekken godtar bare selve ordet «sann»")
ES("1p-h23-d1-32", V("usann"), ["usann"], "sann/usann; valg-sjekken godtar bare selve ordet «usann»")
TX("1p-h23-d1-4a", ["6", "2\\le x\\le 14"], "forklaring og gyldighetsområde", sym=["ulikhet"])
TX("1p-h23-d1-4b", ["ikke proporsjonal"], "nei med argumentasjon", sym=["ulikhet"])
ES("1p-h23-d2-1a", U("66360*0.9714^x"), ["66360*0,9714^{x}"], "åpen oppgave: andre godt begrunnede modeller kan gi poeng; a og b avhenger av avrunding", usikker="Åpen oppgave: regresjonen gir a ≈ 66 360 og b ≈ 0,9714; andre modeller kan godtas.")
ES("1p-h23-d2-1b", T(3700, rel=0.03), ["3700"], "vurdering av gyldighetsområdet er med i poenget", enhet=["personer", "fiskere"])
ES("1p-h23-d2-1c", T(-477, abs=5), ["-477"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["personer per år", "personer/år"])
TX("1p-h23-d2-4", ["240", "12"], "åpen oppgave: egne antakelser og vurdering")
ES("1p-h23-d2-5", P((3, 3)), ["(3,3)"], "tre ganger så mye: tabell, funksjon og graf kreves i tillegg til punktet; P(3, 3) og arealet 18")
ES("1p-h23-d2-6b", T(22), ["22"], "program skal lages i tillegg til svaret", enhet=["linjestykker"])
TX("1p-h23-d2-7b", ["2\\pi r"], "undersøkelse (utregning er svaret)", sym=["pi"])
ES("1p-h23-d2-8", V("B"), ["bane B"], "valg av bane fra figur; valg-sjekken godtar bare bokstaven «B»")

# =========================================================================== eksamen v2023 (1P)
TX("1p-v23-d1-1", ["ulike"], "ja/nei med begrunnelse")
TX("1p-v23-d1-3a", ["20x"], "åpent eksempel, begrunnelse og graf")
TX("1p-v23-d1-3b", ["120"], "åpent eksempel, begrunnelse og graf")
E("1p-v23-d1-4a", U("7x+72"), ["7x+72"])
E("1p-v23-d1-4b", T(205), ["205"], enhet=["cm"])
TX("1p-v23-d1-4c", ["4\\le x\\le 10"], "vurdering av gyldighetsområde", sym=["ulikhet"])
ES("1p-v23-d2-1b", T(5.04), ["5,04"], "praktisk tolkning av stigningstallet er med i poenget (enheten «°C per måned» avvises av enhetssjekken; bare «°C» eller «grader» godtas)",
   enhet=["°C", "grader"], sym=["grader"])
TX("1p-v23-d2-3b", ["800"], "systematisk oversikt (tabell) og argumentasjon")
ES("1p-v23-d2-3c", U("x*(80-2x)"), ["x(80-2x)"], "funksjonsuttrykk og graf; «vis at» er også med i poenget")
ES("1p-v23-d2-4a", V("D"), ["D"], "valg av sekk fra figur med begrunnelse; valg-sjekken godtar bare bokstaven")
TX("1p-v23-d2-4b", ["A", "C"], "to sekker (A og C) fra figur med begrunnelse")
ES("1p-v23-d2-4c", V("C"), ["C"], "valg av sekk med begrunnelse; valg-sjekken godtar bare bokstaven")
TX("1p-v23-d2-4d", ["A", "F"], "to sekker (A og F) fra figur med begrunnelse")
ES("1p-v23-d2-5a", T(22, 26, fast=True, ord=True), ["22", "26"], "mønsteret skal også beskrives (4n + 6)",
   format="Skriv antallet i K₄ og K₅ i den rekkefølgen, skilt med komma eller «og».")
TX("1p-v23-d2-5b", ["nonstop_figur+4"], "programlinjer (kode)")
ES("1p-v23-d2-6a", U("17396*1.248^x"), ["17396"], "regresjon i GeoGebra; a og b avhenger av avrunding")
TX("1p-v23-d2-6b", ["17400", "25"], "tolkning av a og b (forklaring)")
ES("1p-v23-d2-6c", T(7.5, enhet=PROS), ["7,5"], "vurdering mot modellen er med i poenget")

# =========================================================================== eksamen h2022 (1P)
TX("1p-h22-d1-2", ["188", "180"], "nei med begrunnelse og beregning")
TX("1p-h22-d1-3a", ["\\sqrt{x}"], "åpent: eget uttrykk med forklaring", sym=["rot"], usikker="Oppgaveteksten gir flere mulige uttrykk; fasiten f(x) = √x er ett av dem.")
ES("1p-h22-d1-3b", T(4, 20, 1.5, fast=True, ord=True), ["f(16) = 4"], "f(−25) skal begrunnes som ikke mulig; tallene 4, 20 og 3/2",
   format="Skriv f(16), f(400) og f(9/4) i den rekkefølgen, skilt med komma eller «og».", sym=["rot"],
   usikker="Avhenger av hvilket uttrykk eleven valgte i a); fasiten antar f(x) = √x.")
ES("1p-h22-d1-4a", T(3.79), ["3,79"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["liter per gallon", "liter per us gallon", "liter/gallon", "L/gallon"])
ES("1p-h22-d1-4b", T(1.6e10, rel=0.04), ["1,6\\cdot 10^{10}"], "formkrav: svaret skal gis på standardform", enhet=["liter", "L"])
ES("1p-h22-d2-1c", T(-3.68, abs=0.1), ["-3,7"], "praktisk tolkning av stigningstallet er med i poenget (enheten «°C per time» avvises av enhetssjekken)", enhet=["°C", "grader"], sym=["grader"])
ES("1p-h22-d2-1d", T(4.485, abs=0.05), ["4,5"], "undersøkelse: «nei» med begrunnelse; tallet 4,5 °C er med i begrunnelsen", enhet=["°C", "grader"], sym=["grader"])
TX("1p-h22-d2-1e", ["3,5"], "praktisk tolkning (forklaring)", sym=["grader"])
TX("1p-h22-d2-3a", ["omvendt proporsjonale"], "valg fra graf med begrunnelse", usikker="Bygger på avlesing av figur.")
TX("1p-h22-d2-3b", ["Ingen av delene"], "valg med begrunnelse", usikker="Bygger på avlesing av tekst/figur.")
TX("1p-h22-d2-3c", ["Ingen av delene"], "valg med begrunnelse", usikker="Bygger på avlesing av tekst/figur.")
TX("1p-h22-d2-4a", ["256"], "systematisk oversikt (tabell) og argumentasjon")
ES("1p-h22-d2-4b", U("x*(32-x)"), ["x(32-x)"], "funksjonsuttrykk og graf; «vis at» er også med i poenget")
TX("1p-h22-d2-5a", ["5"], "forklaring av programmets formål og resultat")
E("1p-h22-d2-5b", T(2, 4, fast=True, ord=True), ["2", "4"], format="Skriv de to utskriftene i den rekkefølgen programmet skriver dem, skilt med komma eller «og».")
TX("1p-h22-d2-5c", ["x = -20"], "programendringer (kode)")
ES("1p-h22-d2-6a", U("2.03*x^0.47"), ["2,03"], "potensregresjon i GeoGebra; a og b avhenger av avrunding")
TX("1p-h22-d2-6b", ["2\\pi"], "«vis at»: omforming av formelen", sym=["pi", "rot"])
TX("1p-h22-d2-6c", ["kvadratroten"], "sammenlikning (forklaring)")
TX("1p-h22-d2-7", ["1,52", "640"], "åpen oppgave: egne antakelser og vurdering", usikker="Åpen oppgave med flere spørsmål; fasiten er ett mulig løsningsforslag.")

# =========================================================================== eksamen v2022 (1P)
ES("1p-v22-d1-2", T(14.3, enhet=PROS), ["14,3"], "valg av år og begrunnelse; prosenttallet 14,3 er med i begrunnelsen", usikker="Oppgaveteksten er avkortet i dataene: det er ikke sikkert at oppgaven ber om selve prosenttallet.")
TX("1p-v22-d1-3a", ["20x"], "åpent eksempel med forklaring")
TX("1p-v22-d1-3b", ["rett linje"], "graf (tegning)")
TX("1p-v22-d1-4b", ["0,99", "7,8"], "tolkning av likningen (forklaring)")
TX("1p-v22-d1-5", ["4158", "15"], "forklaring av programmet og utskriften")
E("1p-v22-d1-6", T(12), ["12"], enhet=["cm"])
ES("1p-v22-d2-1a", T(0, enhet=["liter", "L"]), ["0"], "praktisk tolkning av V(0) er med i poenget")
ES("1p-v22-d2-1b", O(0, 2000), ["[0, 2000]"], "verdimengden skrives som område (grensene 0 og 2000)", enhet=["liter", "L"], sym=["ulikhet"])
ES("1p-v22-d2-1d", T(62.5), ["62,5"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["liter per minutt", "liter/minutt", "L/min"])
ES("1p-v22-d2-1e", T(98.75), ["98,75"], "undersøkelse: «nei» med begrunnelse; tallet 98,75 er med i begrunnelsen", enhet=["liter", "L"])
TX("1p-v22-d2-2a", ["4x+600"], "«forklar at»: forklaringen er svaret")
E("1p-v22-d2-2b", T(20, 4.25, fast=True, ord=True), ["20", "4,25"], enhet=["kr per km", "kr/km", "kroner per kilometer"],
  format="Skriv prisen per km ved 50 km og ved 400 km i den rekkefølgen, skilt med komma eller «og».")
ES("1p-v22-d2-2c", V("C"), ["firma C"], "valg av firma med beregninger; valg-sjekken godtar bare bokstaven «C» (kostnad 1282 kr)")
TX("1p-v22-d2-3", ["D", "C", "A", "B"], "rangering av fire butikker med oversikt (bokstavrekkefølge; ingen serie-sjekk for bokstaver)")
E("1p-v22-d2-6a", T(55), ["55"])
E("1p-v22-d2-6b", T(1210), ["1210"])
E("1p-v22-d2-6c", T(17, 1279, fast=True, ord=True), ["17", "1279"], format="Skriv antall figurer og antall klosser igjen i den rekkefølgen, skilt med komma eller «og».")
E("1p-v22-d2-7a", T(1.8526, 0.4892, fast=True, ord=True), ["1,85", "0,49"], format="Skriv a og b i den rekkefølgen, skilt med komma eller «og».")
TX("1p-v22-d2-7b", ["129"], "vurdering av gyldighetsområde", sym=["ulikhet"])
ES("1p-v22-d2-7c", U("-18.09*0.98^x"), ["-18,09"], "eksponentialregresjon i GeoGebra; koeffisientene avhenger av avrunding")
TX("1p-v22-d2-7d", ["asymptote"], "to grafer og beskrivelse av forskjeller")
ES("1p-v22-d2-7e", S(U("20-18.09*0.98^x"), T(19.86, abs=0.1)), ["20-18,09", "19,9"], "modell T₂ og temperaturen etter 4 timer", enhet=["°C", "grader"], sym=["grader"])
E("1p-v22-d2-8a", T(11), ["11"], enhet=["tråder"])
E("1p-v22-d2-8b", T(6), ["6"], enhet=["lyspærer"])
E("1p-v22-d2-8c", T(903), ["903"], enhet=["lyspærer"])
ES("1p-v22-d2-8d", U("3k-1"), ["3k-1"], "lengdene 2, 5, 8, 11, … m skrives som formel (3k − 1); en liste av lengder er også riktig", alt=[U("3n-1")])

# =========================================================================== eksamen h2021 (1P)
TX("1p-h21-d1-2", ["400000", "0,90"], "forklaring av feil og riktig regnestykke (uten hjelpemidler)")
TX("1p-h21-d1-3b", ["7", "9"], "praktisk tolkning (forklaring)", sym=["grader"])
E("1p-h21-d1-5a", S(U("-2x+3"), U("0.5x-2")), ["-2x+3", "0,5x-2"], format="Skriv f(x) og g(x), skilt med «;».")
E("1p-h21-d1-5b", T(1.25), ["1,25"])
E("1p-h21-d2-1a", T(20.09), ["20"], enhet=["uker"])
ES("1p-h21-d2-1b", T(594), ["594"], "praktisk tolkning av stigningstallet er med i poenget", enhet=["par ski per uke", "par/uke"])
E("1p-h21-d2-3a", U("50x+500"), ["50x+500"])
E("1p-h21-d2-3b", U("500*2^(x/10)"), ["500*2^{\\frac{x}{10}}"], alt=[U("500*1.0718^x")])
TX("1p-h21-d2-3c", ["5,29"], "graf (tegning)")
ES("1p-h21-d2-3d", P((5.29, 43.04), (12, -48.70), (0.84, 12), (9.32, 12), abs=0.05), ["5,29", "43,04"], "tre punktsvar og praktisk tolkning; skriv punktene som (x, y)", format="Skriv toppunktet, så skjæringen med x = 12, så de to skjæringene med y = 12, som punkter (x, y).")
ES("1p-h21-d2-4a", V("riktig"), ["Riktig"], "påstand: riktig/feil med begrunnelse; valg-sjekken godtar bare ordet «riktig»", usikker="Tolkningen av påstandene er usikker i dataene.")
ES("1p-h21-d2-4b", V("feil"), ["Feil"], "påstand: riktig/feil med begrunnelse; valg-sjekken godtar bare ordet «feil»", usikker="Tolkningen av påstandene er usikker i dataene.")
ES("1p-h21-d2-4c", V("feil"), ["Feil"], "påstand: riktig/feil med begrunnelse; valg-sjekken godtar bare ordet «feil»", usikker="Fasiten sier «feil (med denne tolkningen)»; påstand 3 kan leses på to måter.")
ES("1p-h21-d2-4d", V("feil"), ["Feil"], "påstand: riktig/feil med begrunnelse; valg-sjekken godtar bare ordet «feil»", usikker="Tolkningen av påstandene er usikker i dataene.")
TX("1p-h21-d2-6a", ["0,312", "31"], "«vis hvordan»: utregningen er svaret")
TX("1p-h21-d2-6b", ["40,1", "57,8"], "regneark med formler")
TX("1p-h21-d2-6c", ["225000"], "regneark (utvidet tabell)")
E("1p-h21-d2-7a", T(210), ["210"], enhet=["bokser"], usikker="Fasiten antar tårn der etasje k har k bokser; figuren ble ikke sjekket mot tekst.")
E("1p-h21-d2-7b", T(27), ["27"], enhet=["etasjer"], usikker="Se 7a. 27·28/2 = 378 ≤ 400 < 406.")
E("1p-h21-d2-7c", T(1540), ["1540"], enhet=["bokser"], usikker="Pyramide: etasje k har k(k+1)/2 bokser; 20·21·22/6 = 1540. Fasiten er konsistent, men figuren er ikke sjekket.")
E("1p-h21-d2-7d", T(27), ["27"], enhet=["etasjer"], usikker="Se 7c. 27·28·29/6 = 3654 ≤ 4000 < 4060; igjen 346.")
E("1p-h21-d2-8a", T(99), ["99"])
TX("1p-h21-d2-8b", ["99"], "utforskning og forklaring")
TX("1p-h21-d2-8c", ["99(k-1)"], "systematisk oversikt, forklaring og argument")

# =========================================================================== P7 sett 1 (nøkkel = oppgave-id + bokstav, f.eks. «P7-d1-1a»)
# Fire P7-oppgaver (d1-3, d1-4, d2-1, d2-4) har allerede en oppgavenivå-oppføring i spec_svar.py; delnøklene under kommer i tillegg.
ES("P7-d1-1a", T(4.2e-4, 3.5e6, fast=True, ord=True), ["4,2\\cdot 10^{-4}", "3,5\\cdot 10^{6}"], "formkrav: svaret skal gis på standardform",
   format="Skriv begge tallene på standardform, i rekkefølgen oppgaven spør, skilt med komma eller «og».")
ES("P7-d1-1b", T(2.4e4), ["2,4\\cdot 10^{4}"], "formkrav: svaret skal gis på standardform")
TX("P7-d1-1c", ["29\\,000"], "rangering av fire tall skrevet på ulik form (rekkefølge; «<» finnes på tastaturet)")
E("P7-d1-2a", T(2500, enhet=["L", "liter"]), ["2500"])
E("P7-d1-2b", T(3, 36, fast=True, ord=True, enhet=["timer", "minutter", "t", "min"]), ["3", "36"], format="Skriv timer og minutter i den rekkefølgen, skilt med komma eller «og».")
E("P7-d1-2c", T(0.045, enhet=["m^2", "m²", "kvadratmeter"]), ["0,045"])
E("P7-d1-2d", T(20, enhet=["m/s", "meter per sekund"]), ["20"])
E("P7-d1-3a", T(0.2, enhet=["L", "liter"]), ["0,2"])
E("P7-d1-3b", T(3.5, enhet=["L", "liter"]), ["3,5"])
E("P7-d1-3c", T(14, enhet=["glass"]), ["14"])
E("P7-d1-4a", T(2, 25, fast=True, ord=True), ["2", "25"], enhet=["prosentpoeng", "%", "prosent"],
  format="Skriv antall prosentpoeng og så prosentvis økning, skilt med komma eller «og».")
E("P7-d1-4b", T(72), ["72"])
E("P7-d1-4c", T(300), ["300"])
E("P7-d1-5a", T(9600, enhet=KR), ["9600"])
E("P7-d1-5b", T(7680, enhet=KR), ["7680"])
ES("P7-d1-5c", T(4, nedgang=True, enhet=PROS), ["0,96", "4"], "«Nei» med begrunnelse; prosentvis endring og retning er med i poenget")
E("P7-d1-5d", T(600, enhet=KR), ["600"])
E("P7-d1-6a", T(24), ["24"], enhet=["brikker"])
TX("P7-d1-6b", ["n^2 + 2n"], "«vis at»: algebraisk argument")
E("P7-d1-6c", T(120), ["120"], enhet=["brikker"])
ES("P7-d1-6d", T(9), ["99", "9"], "ja/nei for 99 og 100 med begrunnelse; figur 9 for 99 brikker er med i svaret")
E("P7-d2-1a", T(10686.4, enhet=KR), ["10\\,686"])
E("P7-d2-1b", T(21.7, enhet=PROS), ["21,7"])
ES("P7-d2-1c", T(5.96, enhet=["år"]), ["5,96", "år $6$"], "tolkning: «i løpet av år 6» (5,96 år)")
ES("P7-d2-2a", T(0.92, enhet=["kg/L", "kg per liter"]), ["0,92"], "«vis at»: forholdet m : V = 0,92 for alle par er med i poenget")
E("P7-d2-2b", T(5.43, enhet=["L", "liter"]), ["5,43"])
ES("P7-d2-3a", T(2100, 500, fast=True, ord=True), ["2100", "500"], "avlesning fra figur, med månedsnavn (januar og juli)", enhet=["kWh"],
   usikker="Verdiene er lest av et stolpediagram; ingen tallgrunnlag i dataene utover fasiten.")
E("P7-d2-3b", T(76.2, nedgang=True, enhet=PROS), ["76"], usikker="Bygger på avlesningene 2100 og 500 kWh (figur).")
E("P7-d2-3c", T(15200, 1266.67, fast=True, ord=True), ["15\\,200", "1267"], enhet=["kWh"], usikker="Summen 15 200 bygger på tolv avlesninger fra figuren; kan ikke kontrolleres uten figurdata.")
E("P7-d2-3d", T(2500, enhet=KR), ["2500"], usikker="Bygger på forbruket 2000 kWh i desember (figur).")
E("P7-d2-4a", T(4.5, enhet=["L", "liter"]), ["4,5"])
E("P7-d2-4b", T(898, enhet=KR), ["898"])
E("P7-d2-4c", T(10, enhet=PROS), ["10"])
TX("P7-d2-5a", ["HVIS"], "regneark (formel og utfylling)")
E("P7-d2-5b", T(1015, enhet=KR), ["1015"])
E("P7-d2-5c", T(12, enhet=["billetter"]), ["12"])
ES("P7-d2-6a", U("1198*1.19^x"), ["1198", "1,190"], "eksponentialregresjon i GeoGebra; koeffisientene avhenger av avrunding (1198,35 og 1,1904)")
E("P7-d2-6b", T(19.04, enhet=PROS), ["19"])
ES("P7-d2-6c", T(12.17, enhet=["måneder"]), ["12,2", "måned $13$"], "tolkning: «i løpet av måned 13» (12,2 måneder)")
TX("P7-d2-6d", ["begrenset"], "kommentar/vurdering av modellens gyldighet")
ES("P7-d2-7a", U("200x+500"), ["200x+500"], "«vis at»: lik endring per time er med i poenget")
TX("P7-d2-7b", ["200", "500"], "tolkning av stigningstall og konstantledd")
ES("P7-d2-7c", V("nei"), ["Nei"], "ja/nei med begrunnelse; valg-sjekken godtar bare ordet «nei»")
E("P7-d2-7d", T(14, enhet=["timer"]), ["14"])
E("P7-d2-8a", S(U("20000-2000x"), U("20000*0.9^x")), ["20\\,000 - 2000x", "0{,}9^{x}"], format="Skriv formelen for modell L og for modell E, skilt med «;».")
E("P7-d2-8b", T(16000, 16200, fast=True, ord=True), ["16\\,000", "16\\,200"], enhet=KR, format="Skriv verdien for modell L og modell E, i den rekkefølgen, skilt med komma eller «og».")
ES("P7-d2-8c", T(10), ["10", "aldri"], "to delsvar (L: 10 år, E: aldri) og begrunnelse for E", enhet=["år"])
ES("P7-d2-8d", T(13.16, enhet=["år"]), ["13,2", "år $14$"], "tolkning: «i løpet av år 14» (13,2 år)")
TX("P7-d2-9a", ["f(0)=3", "f(4)=3"], "verditabell og graf (tegning)")
E("P7-d2-9b", S(T(1, 3, fast=True, ord=True), P((2, -1))), ["x=1", "x=3", "(2"], format="Skriv nullpunktene, så bunnpunktet som (x, y), skilt med «;».")
E("P7-d2-9c", T(3), ["3"])
ES("P7-d2-9d", UL(1, 3), ["1 < x < 3"], "forklaring ut fra grafen er med i poenget")
TX("P7-d2-10a", ["6,05"], "graf (tegning) og toppunkt")
E("P7-d2-10b", T(20, enhet=["m", "meter"]), ["20"])
ES("P7-d2-10c", T(0.65), ["0,65"], "forklaring av hva vekstfarten betyr er med i poenget", enhet=["m per m", "m/m", "meter per meter"])
TX("P7-d2-10d", ["2"], "tolkning av konstantleddet (forklaring)")
E("P7-d2-11a", U("n^2+n+3"), ["n^2 + n + 3"])
E("P7-d2-11b", T(933), ["933"])
E("P7-d2-11c", T(44), ["44"])
ES("P7-d2-11d", V("nei"), ["Nei"], "ja/nei med begrunnelse; valg-sjekken godtar bare ordet «nei»")
E("P7-d2-12a", T(3, enhet=["timer"]), ["3"])
E("P7-d2-12b", U("48/x"), ["48", "x"])
E("P7-d2-12c", T(20, ulikhet="≥", enhet=["frivillige"]), ["20"], sym=["ulikhet"])

# =========================================================================== øveprøve P1 (nøkkel = oppgave-id + bokstav, f.eks. «P1.OP1a»)
E("P1.OP1a", T(-13), ["-13"])
E("P1.OP1b", T(-8), ["-8"])
E("P1.OP1c", T(7), ["7"])
E("P1.OP1d", T(14), ["14"])
E("P1.OP2a", U("4a^2"), ["4a^2"])
E("P1.OP2b", T(9), ["9"])
E("P1.OP2c", T(125), ["125"])
ES("P1.OP3a", T(2.4e5), ["2,4 \\cdot 10^5"], "formkrav: svaret skal gis på standardform")
TX("P1.OP3b", ["7\\sqrt{2}", "4\\sqrt{2}"], "«vis at»: utregningen med √ er svaret", sym=["rot"])
E("P1.OP4a", T(86400, enhet=["s", "sekunder"]), ["86\\,400"])
ES("P1.OP4b", T(3.63e8, enhet=["m³", "m^3"]), ["3,63 \\cdot 10^8"], "formkrav: standardform med to desimaler")
E("P1.OP5a", T(0.9283, enhet=["m", "meter"]), ["0,93"])
ES("P1.OP5b", T(6.4, enhet=["m³", "m^3"]), ["6,4"], "forklaring uten å regne ut siden er med i poenget (volumet blir 8 ganger så stort)")
E("P1.OP5c", T(1.1447, enhet=["m", "meter"]), ["1,14"])
