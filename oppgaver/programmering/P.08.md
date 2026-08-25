---
id: "P.08"
tittel: "Oppgave P.08 — for-løkke"
---

En `for`-løkke gjentar kode et bestemt antall ganger.

```python
for i in range(5):
    print(i)
```

`range(5)` gir tallene $0, 1, 2, 3, 4$ (fem tall, starter på $0$).

**a)** Hva skrives ut av koden over?

**b)** Skriv et program som skriver ut tallene $1$ til $10$ (hvert tall på egen linje).

## Hint

`range(1, 11)` gir $1, 2, \ldots, 10$ (siste tall er ikke med).

## Fasit

**a)**
```
0
1
2
3
4
```

**Svar:** Tallene $0$ til $4$, hvert på egen linje.

[STEG]

**b)**
```python
for i in range(1, 11):
    print(i)
```

**Svar:** `range(1, 11)` og `print(i)` inne i løkken.

## Starter

```python
for i in range(5):
    print(i)
```
