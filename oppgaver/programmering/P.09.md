---
id: "P.09"
tittel: "Oppgave P.09 — while-løkke"
---

En `while`-løkke kjører **så lenge** et vilkår er sant. Du må selv oppdatere variabelen, ellers blir det en evig løkke.

```python
n = 3
while n > 0:
    print(n)
    n = n - 1
```

**a)** Hva skrives ut?

**b)** Skriv et program som starter med `x = 1` og dobler `x` helt til `x` er større enn $100$. Skriv ut `x` hver gang.

## Hint

Husk å endre `x` inni løkken, f.eks. `x = x * 2`.

## Fasit

**a)**
Første runde: $3$. Så $n=2$. Så $n=1$. Så $n=0$, og løkken stopper.

**Svar:**
```
3
2
1
```

[STEG]

**b)**
```python
x = 1
while x <= 100:
    print(x)
    x = x * 2
```

**Svar:** Skriver $1, 2, 4, 8, 16, 32, 64$ (neste dobling $128$ er over $100$).

## Starter

```python
n = 3
while n > 0:
    print(n)
    n = n - 1
```
