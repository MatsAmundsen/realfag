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
from spec_svar import (T, U, L, P, O, UL, S, R, sqrt, pi, sp, KR, PROS, deg, x, y, a, b, c, n, t, s)  # noqa: F401

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
