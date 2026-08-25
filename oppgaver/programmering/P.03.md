---
id: "P.03"
tittel: "Oppgave P.03 — Regning med tall"
---

Python kan regne for deg:

| Operator | Betydning |
|---|---|
| `+` | pluss |
| `-` | minus |
| `*` | gange |
| `/` | dele |
| `**` | potens |
| `%` | rest (modulo) |
| `//` | heltallsdivisjon |

**a)** Hva skrives ut?

```python
print(2 ** 5)
print(17 % 5)
print(17 // 5)
```

**b)** Skriv et program som regner ut arealet av et rektangel med lengde $8$ og bredde $5$, og skriver ut svaret.

## Hint

$a^b$ skrives `a ** b`. Modulo `%` gir resten etter divisjon.

## Fasit

**a)**
`2 ** 5` = $32$
`17 % 5` = $2$ (fordi $3 \cdot 5 = 15$, rest $2$)
`17 // 5` = $3$ (heltallsdivisjon, uten desimaler)

**Svar:** `32`, `2` og `3`

[STEG]

**b)**
```python
lengde = 8
bredde = 5
areal = lengde * bredde
print(areal)
```

**Svar:** Programmet skriver ut `40`.

## Starter

```python
print(2 ** 5)
print(17 % 5)
print(17 // 5)
```
