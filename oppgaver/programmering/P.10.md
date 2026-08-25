---
id: "P.10"
tittel: "Oppgave P.10 — Løkke og if sammen"
---

Ofte kombinerer vi `for` og `if`.

**a)** Hva skrives ut?

```python
for n in range(1, 8):
    if n % 2 == 0:
        print(n)
```

**b)** Skriv et program som skriver ut alle oddetall fra $1$ til $20$.

## Hint

Oddetall: `n % 2 == 1` (rest $1$ når du deler på $2$).

## Fasit

**a)**
Bare partall mellom $1$ og $7$ skrives ut.

**Svar:**
```
2
4
6
```

[STEG]

**b)**
```python
for n in range(1, 21):
    if n % 2 == 1:
        print(n)
```

Eventuelt: `for n in range(1, 21, 2): print(n)`

**Svar:** Oddetallene $1, 3, 5, \ldots, 19$.

## Starter

```python
for n in range(1, 8):
    if n % 2 == 0:
        print(n)
```
