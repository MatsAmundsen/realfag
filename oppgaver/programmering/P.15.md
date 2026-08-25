---
id: "P.15"
tittel: "Oppgave P.15 — Tekst: gangetabell med merkelapper"
---

Du skal lage en oversikt over $7$-gangen fra $1$ til $12$.

**Skriv et program** som for hvert tall $k$ fra $1$ til $12$:
- regner ut `produkt = 7 * k`
- skriver ut `k x 7 = produkt`
- **i tillegg:** hvis produktet er delelig med $10$, skriv ` (delelig med 10)` på samme linje

Eksempel på to linjer:
```
1 x 7 = 7
...
10 x 7 = 70 (delelig med 10)
```

## Hint

Bruk `for k in range(1, 13)`. Sjekk `produkt % 10 == 0`. Du kan bygge linjen i en variabel før `print`.

## Fasit

```python
for k in range(1, 13):
    produkt = 7 * k
    linje = f"{k} x 7 = {produkt}"
    if produkt % 10 == 0:
        linje = linje + " (delelig med 10)"
    print(linje)
```

Linjene for $k=10$ (`70`) treffer merkelappen.

**Svar:** `for`-løkke + `if` med modulo $10$, og `print` av den ferdige linjen.

## Starter

```python
for k in range(1, 13):
    produkt = 7 * k
    print(produkt)
```
