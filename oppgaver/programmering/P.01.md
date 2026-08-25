---
id: "P.01"
tittel: "Oppgave P.01 — Din første utskrift"
---

I Python bruker vi `print()` for å vise tekst på skjermen.

**a)** Skriv et program som skriver ut `Hei, 1T!`

**b)** Hva skjer hvis du glemmer hermetegnene rundt teksten, altså skriver `print(Hei)`?

## Hint

Tekst (strenger) må stå i hermetegn: `"Hei"` eller `'Hei'`.

## Fasit

**a)**
```python
print("Hei, 1T!")
```

**Svar:** Programmet skriver ut teksten `Hei, 1T!`

[STEG]

**b)**
Uten hermetegn tror Python at `Hei` er et **variabelnavn**. Siden variabelen ikke finnes, får du en `NameError`.

**Svar:** Programmet krasjer med `NameError` fordi `Hei` blir tolket som en variabel.

## Starter

```python
print("Hei, 1T!")
```
