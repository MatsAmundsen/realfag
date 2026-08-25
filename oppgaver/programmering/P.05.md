---
id: "P.05"
tittel: "Oppgave P.05 — if-test"
---

En `if`-test kjører kode **bare hvis** et vilkår er sant.

```python
if poeng >= 50:
    print("Bestått")
```

**a)** Hva skrives ut når `alder = 18`?

```python
alder = 18
if alder >= 18:
    print("Myndig")
print("Ferdig")
```

**b)** Skriv et program som lagrer `temperatur = -3` og skriver `Frost` hvis temperaturen er under $0$.

## Hint

Linjen under `if` **må** være rykket inn (vanligvis 4 mellomrom). `print("Ferdig")` ligger utenfor `if` hvis den ikke er rykket inn.

## Fasit

**a)**
Vilkåret `18 >= 18` er sant, så `Myndig` skrives ut. Deretter skrives `Ferdig` uansett.

**Svar:**
```
Myndig
Ferdig
```

[STEG]

**b)**
```python
temperatur = -3
if temperatur < 0:
    print("Frost")
```

**Svar:** Programmet skriver `Frost` fordi $-3 < 0$.

## Starter

```python
alder = 18
if alder >= 18:
    print("Myndig")
print("Ferdig")
```
