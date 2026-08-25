---
id: "P.14"
tittel: "Oppgave P.14 — Tekst: kinobillett"
---

En kino har denne prisen:

- Under $12$ år: $80$ kr
- Fra $12$ til og med $17$ år: $110$ kr
- $18$ år eller mer: $150$ kr
- Hvis kunden er **student** (og minst $18$), får hen $20$ kr i rabatt

**Skriv et program** med `alder = 19` og `student = True` som skriver ut prisen kunden skal betale.

## Hint

Sjekk aldersgruppen først. Studentrabatt gjelder bare i voksenprisen.

## Fasit

```python
alder = 19
student = True

if alder < 12:
    pris = 80
elif alder <= 17:
    pris = 110
else:
    pris = 150
    if student:
        pris = pris - 20

print(pris)
```

$19$ år → voksenpris $150$, student → $130`.

**Svar:** Programmet skriver `130`.

## Starter

```python
alder = 19
student = True
# Beregn pris
```
