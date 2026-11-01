# Deloppgaver 1P: sluttsvar og poeng per del (forslag)

Forslagsfil: `review/deloppgaver-1p-forslag.py` (branch `review/deloppgaver-1p-a0e68e8`, basert på `feat/deloppgaver` a0e68e8). Oppføringene er (etter korrekturlesingen til MatteBot2) flyttet inn i `spec_svar.py` som en egen 1P-seksjon med `DEL(klasse, k, …)`; en kopi av seksjonen ligger i `review/spec_svar-1p-seksjon.py`. `feat/deloppgaver` er urørt. Ingen push eller deploy.

## Omfang

| Prøve | Deler | auto (E) | selvvurdering med svar (ES) | selvvurdering uten svar (TX) |
|---|---:|---:|---:|---:|
| Vår 2026 | 14 | 3 | 7 | 4 |
| Høst 2025 | 16 | 4 | 5 | 7 |
| Vår 2025 | 16 | 5 | 3 | 8 |
| Høst 2024 | 18 | 3 | 6 | 9 |
| Vår 2024 | 14 | 3 | 3 | 8 |
| Høst 2023 | 13 | 0 | 9 | 4 |
| Vår 2023 | 18 | 2 | 7 | 9 |
| Høst 2022 | 20 | 1 | 7 | 12 |
| Vår 2022 | 26 | 9 | 9 | 8 |
| Høst 2021 | 24 | 10 | 5 | 9 |
| P7 sett 1 | 63 | 39 | 16 | 8 |
| P1 | 14 | 10 | 3 | 1 |
| P2 | 14 | 12 | 1 | 1 |
| P3 | 12 | 10 | 2 | 0 |
| P4 | 18 | 11 | 5 | 2 |
| P5 | 18 | 3 | 7 | 8 |
| P6 | 16 | 10 | 5 | 1 |
| **Sum** | **334** | **135** | **100** | **99** |

Eksamener (10 prøver): 179 deler. P7 sett 1: 63 deler. Øveprøver P1–P6: 92 deler (31 oppgaver i appen).

Avstemming mot oppdragets tall («54 deler i øveprøvene», «ca. 194 enheter i eksamenene inkl. P7»): jeg har ikke fått tallene til å stemme eksakt. Forslaget dekker alle bokstavdeler jeg fant: 92 øveprøvedeler (76 av dem i oppgaver som appen faktisk deler, 16 i fem oppgaver som ikke deles, se under) og 242 eksamens- og P7-deler. Det siste inkluderer deler i oppgaver som allerede har et oppgavenivå-svar; en nøkkel per del overstyrer serie og tall på oppgavenivå. Teller jeg bare eksamens- og P7-enheter uten eksisterende spec, får jeg 194, som stemmer med oppdraget. For øveprøvene vet jeg ikke hvordan 54 er talt.

## Klasser og kobling til MatteBOTs D-kategorier

- **E** = auto (`D(..., "auto", ...)`): `sjekkSluttsvar` avgjør.
- **ES** = selvvurdering med forhåndsvisning (`formkrav` eller `åpen`, `selvvurder: true`): svaret vises som fasit og eleven vurderer selv. Brukes for tolkning, formkrav, regresjonsuttrykk, graf pluss tall og valg pluss begrunnelse.
- **TX** = selvvurdering uten sjekkbart svar (`forklaring` eller `ikke-støttet`): i appen blir dette `FRI_SLUTTSVAR` (`svar.type = "fri"`, `selvvurder: true`). Fasiten (`fh`) vises.

Hver oppføring har feltene `id`, `klasse`, `fh` (tekst som må stå i fasiten), `sym`, `svar`, `enhet`, `alternativer`, `format`, `selvvurder`, `hvorfor`, `usikker` og (for fem øveprøveoppgaver) `ikke_delt_i_app`. Nøkkelformatet ligger i `_nokkel()` og er lett å bytte.

## Nøkler og hvordan appen slår opp (a0e68e8)

- Eksamen: del-id fra dataene, f.eks. `1p-h24-d2-8c`. Oppgave uten bokstav bruker oppgave-id.
- Øveprøve: oppgave-id + bokstav, f.eks. `P3.OP2a`. Oppgave uten deler bruker oppgave-id (f.eks. `P2.OP3`). Dette er samme skjema som `splittDeler` i `src/lib/deloppgaver.ts`.
- P7 sett 1: `P7-dX-NN<bokstav>` (alle 22 oppgavene, også de fire som har oppgavenivå-spec: d1-3, d1-4, d2-1, d2-4).
- En nøkkel per del har første prioritet foran serie og tall på oppgavenivå.
- Ingen av forslagets nøkler finnes i `eksamen-svar.ts` i dag (null kollisjoner).

### Fem øveprøveoppgaver som ikke deles i appen

`splittDeler` gir `null` når antall `fasitSteg` ≠ antall deler. Det gjelder `P1.OP1` (4 deler, 2 fasitSteg), `P2.OP1` (5 / 2), `P3.OP1` (3 / 2), `P3.OP4` (teksten har ingen gyldig a)/b)-merking som `splittDeler` godtar, 2 fasitSteg) og `P6.OP2` (ingen a)/b)-merker, 2 fasitSteg). For disse er oppgaven fortsatt én enhet med oppgave-id, og de eksisterende oppgavenøklene (som alle fem allerede har) gjelder. De 16 delnøklene i forslaget er merket `ikke_delt_i_app` og virker først når fasitSteg i dataene gjøres 1:1 med delene. Anbefaling: behold dem som reserve, eller rett dataene.

## Innføring i spec_svar.py (gjort)

- Seksjonen «1P øveprøver, eksamener og P7 per delspørsmål» står sist i `spec_svar.py`: 318 `DEL(klasse, k, …)`-kall (121 E, 98 ES, 99 TX; 334 minus 16 ikke-delte, som var 14 E og 2 ES). 232 gir en `SLUTTSVAR`-oppføring (121 + 98 + 13 TX med spesialtegn); de øvrige 86 TX får fritt felt uten oppføring.
- De 16 delene i P1.OP1, P2.OP1, P3.OP1, P3.OP4 og P6.OP2 er ikke med som delnøkler (oppgavene deles ikke i appen; delnøklene ville blitt foreldreløse). Oppgave-id-oppføringene gjelder fortsatt.
- `sym` er utelatt overalt (appen utleder symbolrad). Ingen oppføring bruker `sym=[]` eller `ingen_symboler`. `P2.OP3` hadde `sym=[]` i forslaget; det er fjernet.
- 55 av P7-delnøklene (`P7-d1-1a` …) er ikke egne enheter i appen ennå: P7-oppgavene i `exams.ts` har ingen `parts`. Foreldreløs-sjekken i `gen_svar.py` fanger dem ikke (den ser bare på øveprøve-id-er). De er døde data til P7-oppgavene får deler.
- Alle 177 øvrige nøkler (eksamensdeler og øveprøvedeler) er kontrollert mot de faktiske enhetene i appen.
- 681 tester mot `sjekkSluttsvar` (riktig svar godtas, feil avvises): 0 avvik.

## Begrensninger i sjekkeren som påvirket valgene

- `uttrykk`-sjekken er følsom for variabelnavn: andre navn enn i fasiten krever `alt`.
- Enheter som kombinerer «°» med «per …» (f.eks. «°C per måned») avvises av enhetssjekken. «US gallon» avvises også. Enhetslistene er derfor begrenset, og grunnen står i `hvorfor`.
- `V` (valg) godtar bare nøyaktig token. «A og C» eller en hel setning avvises. Valg pluss begrunnelse er derfor ES.
- `serie` deler på «;». Flere verdier i én del må skrives med «og».

## Spesialtegn per del

Regel: `sym` gjelder det eleven må skrive i sluttsvaret, ikke tegn som bare står i oppgaveteksten. `<` og `>` ligger på tastaturet og trenger ikke symbolrad. Delene som ikke står i listen trenger ingen symbolrad. Gruppene: `mengde` (∈ ∉ ℕ ℤ ℚ ℝ), `rot` (√), `ulikhet` (≤ ≥ ≠), `pi` (π), `pm` (±), `grader` (°). Ingen del trenger `mengde` eller `pm` i sluttsvaret.

- **rot** (5): `1p-v26-d1-5`, `1p-h22-d1-3a`, `1p-h22-d1-3b`, `1p-h22-d2-6b`, `P1.OP3b`
- **ulikhet** (12): `1p-h25-d1-6c`, `1p-v25-d2-3`, `1p-h24-d2-6b`, `1p-h24-d2-8c`, `1p-h24-d2-8e`, `1p-h23-d1-4a`, `1p-h23-d1-4b`, `1p-v23-d1-4c`, `1p-v22-d2-7b`, `P7-d2-12c`, `P5.OP2c`, `P6.OP4c`
- **pi** (5): `1p-h25-d2-7a`, `1p-h25-d2-7e`, `1p-v25-d2-6b`, `1p-h23-d2-7b`, `1p-h22-d2-6b`
- **grader** (8): `1p-v26-d2-4a`, `1p-h24-d1-5b`, `1p-v23-d2-1b`, `1p-h22-d2-1c`, `1p-h22-d2-1d`, `1p-h22-d2-1e`, `1p-v22-d2-7e`, `1p-h21-d1-3b`
- **mengde** (0): ingen
- **pm** (0): ingen

## Usikre fasiter (bør kontrolleres av lærer)

12 oppføringer har `usikker=` etter korrekturlesingen (30 før). MatteBot2 telte 30; min tidligere «36» var feiltelling. De 18 som er tatt bort: 1p-v22-d1-2 (teksten er ikke avkortet), 1p-h21-d2-4a/4b/4d, 1p-h21-d2-7a–d, P7-d2-3a–d, 1p-v26-d2-3a–c og 1p-h22-d2-3a–c (figurer og tall kontrollert).

- `1p-v26-d1-12` (TX): Påstand 2 kan leses på to måter (konstant trykk: riktig; ellers usann). Fasiten viser begge, hovedsvaret er «usann slik den står».
- `1p-h25-d1-6c` (ES): Fasiten oppgir både 15 (like dyrt) og minst 16 (lønner seg); begge må godtas ved selvvurdering.
- `1p-v25-d2-7` (TX): Ingrediensprisene er egne anslag; svaret (ca. 600 kr i måneden) er et eksempel.
- `1p-v24-d2-6c` (E): Fasiten oppgir 4,2–4,3 km (avrundede koeffisienter) og 4,3–4,4 km (uten avrunding); 'rundt 4 km' godtas.
- `1p-h23-d2-1a` (ES): Åpen oppgave: regresjonen gir a ≈ 66 360 og b ≈ 0,9714; andre modeller kan godtas.
- `1p-h22-d1-3a` (TX): Oppgaveteksten gir flere mulige uttrykk; fasiten f(x) = √x er ett av dem.
- `1p-h22-d1-3b` (ES): Avhenger av hvilket uttrykk eleven valgte i a); fasiten antar f(x) = √x.
- `1p-h22-d2-7` (TX): Åpen oppgave med flere spørsmål; fasiten er ett mulig løsningsforslag.
- `1p-h21-d2-4c` (TX): Påstand 3 er tvetydig; Udirs sensorveiledning er ikke funnet. «feil (med denne tolkningen)» er forsvarlig, men ikke bekreftet.
- `P5.OP4a` (ES): Regresjonen gir K(x) = 2,1246x² + 91,997x + 6347,73. Fasiten i dataene har den grove avrundingen 2,12x² + 92,00x (K(200) = 109 548 mot 109 733); den bør rettes i dataene. Begge former godtas som forhåndsvisning.
- `P6.OP2a` (ES): Oppgaven har ikke delbokstaver i dataene: tabell A og tabell B er brukt som a og b.
- `P6.OP2b` (ES): Se P6.OP2a.

## Annet

- h2023 og v2023 ligger i én commit (avvik fra én commit per prøve).
- `spec_svar.py` var midt i en redigering under arbeidet, og jeg verifiserte da mot en kopi. Sluttverifiseringen er kjørt mot den nyeste versjonen.
- Den eldre branchen `review/deloppgaver-1p-forslag` (basert på 02a6a90, med en sporet `.pyc`-fil) er bare en referanse og skal ikke brukes.
- 1T er overlatt til MatteBOT.
