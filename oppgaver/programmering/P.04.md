---
id: "P.04"
tittel: "Oppgave P.04 — input og talltyper"
---

`input()` leser tekst fra brukeren. Hvis du skal **regne** med tallet, må du gjøre det om med `int()` eller `float()`.

```python
n = int(input("Skriv et tall: "))
```

**a)** Hvorfor gir dette programmet feil når du skriver inn `4` og forventer $8$?

```python
n = input("Tall: ")
print(n * 2)
```

**b)** Rett programmet slik at det skriver ut det dobbelte av tallet brukeren skriver inn.

## Hint

`input()` gir alltid en **streng**. `"4" * 2` blir `"44"`, ikke $8$.

## Fasit

**a)**
`n` er teksten `"4"`. Å gange en streng med $2$ gjentar teksten: `"44"`.

**Svar:** `input()` gir tekst, så `n * 2` blir `"44"` i stedet for $8$.

[STEG]

**b)**
```python
n = int(input("Tall: "))
print(n * 2)
```

**Svar:** Bruk `int(...)` (eller `float`) før du regner.

## Starter

```python
n = 4
print(n * 2)
```
