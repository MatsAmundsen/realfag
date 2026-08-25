---
id: "P.02"
tittel: "Oppgave P.02 — Variabler"
---

En **variabel** er et navn som lagrer en verdi.

```python
navn = "Sara"
alder = 16
```

**a)** Hva skrives ut her?

```python
x = 7
y = x + 3
print(y)
```

**b)** Lag et program som lagrer navnet ditt og klassen (`1T`) i to variabler, og skriver ut en setning som bruker begge.

## Hint

Du kan sette sammen tekst med `+` eller med en f-streng: `f"Hei, {navn}"`.

## Fasit

**a)**
`x` er $7$. Så blir `y = 7 + 3 = 10`. `print(y)` skriver ut `10`.

**Svar:** `10`

[STEG]

**b)**
Eksempel:

```python
navn = "Mats"
klasse = "1T"
print(f"Jeg heter {navn} og går i {klasse}.")
```

**Svar:** To variabler og én `print` som bruker begge (f-streng eller `+`).

## Starter

```python
x = 7
y = x + 3
print(y)
```
