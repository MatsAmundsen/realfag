---
id: "P.11"
tittel: "Oppgave P.11 — Tekst: karaktergrenser"
---

En lærer bruker disse grensene på en prøve (maks $60$ poeng):

- $54$ eller mer: karakter $6$
- $48$ eller mer: karakter $5$
- $42$ eller mer: karakter $4$
- under $42$: ikke bestått

**Skriv et program** som lagrer `poeng = 50` og skriver ut riktig karakter (eller «Ikke bestått»).

## Hint

Bruk `if` / `elif` / `else`. Start med den høyeste grensen.

## Fasit

```python
poeng = 50
if poeng >= 54:
    print("Karakter 6")
elif poeng >= 48:
    print("Karakter 5")
elif poeng >= 42:
    print("Karakter 4")
else:
    print("Ikke bestått")
```

$50$ treffer `elif poeng >= 48`.

**Svar:** Programmet skriver `Karakter 5`.

## Starter

```python
poeng = 50
# Skriv if/elif/else her
```
