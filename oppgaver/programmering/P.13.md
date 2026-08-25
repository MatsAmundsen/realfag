---
id: "P.13"
tittel: "Oppgave P.13 — Tekst: sparekonto"
---

Nora starter med $200$ kroner på konto. Hver måned setter hun inn $50$ kroner.
Hun vil fortsette **helt til** hun har minst $500$ kroner.

**Skriv et program** med `while` som:
- starter med `saldo = 200`
- teller antall måneder
- legger til $50$ hver måned
- til slutt skriver ut hvor mange måneder det tok, og sluttbeløpet

## Hint

Løkken skal kjøre så lenge `saldo < 500`. Husk å øke både saldo og månedsteller inni løkken.

## Fasit

```python
saldo = 200
maaneder = 0
while saldo < 500:
    saldo = saldo + 50
    maaneder = maaneder + 1
print(maaneder)
print(saldo)
```

$200 + 6 \cdot 50 = 500$, altså $6$ måneder.

**Svar:** `6` måneder og saldo `500`.

## Starter

```python
saldo = 200
maaneder = 0
# while saldo < 500: ...
```
