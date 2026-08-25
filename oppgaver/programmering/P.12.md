---
id: "P.12"
tittel: "Oppgave P.12 — Tekst: summen av de første n oddetallene"
---

Det sies at summen av de $n$ første oddetallene er $n^2$.
Eksempel: $1+3+5 = 9 = 3^2$.

**Skriv et program** som:
1. setter `n = 6`
2. bruker en `for`-løkke til å legge sammen de $6$ første oddetallene
3. skriver ut både summen og $n^2$, så du kan sjekke at de er like

## Hint

De $n$ første oddetallene er $1, 3, 5, \ldots, 2n-1$.
Du kan løkke `for k in range(n)` og legge til `2*k + 1`.

## Fasit

```python
n = 6
s = 0
for k in range(n):
    s = s + (2 * k + 1)
print(s)
print(n ** 2)
```

Oddetallene: $1+3+5+7+9+11 = 36 = 6^2$.

**Svar:** Begge `print` gir `36`.

## Starter

```python
n = 6
s = 0
# Bruk for-løkke til å legge sammen oddetallene
```
