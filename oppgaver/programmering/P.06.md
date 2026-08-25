---
id: "P.06"
tittel: "Oppgave P.06 — if og else"
---

`else` kjører når vilkåret **ikke** er sant.

```python
if n % 2 == 0:
    print("Partall")
else:
    print("Oddetall")
```

**a)** Hva skrives ut for `n = 15` i koden over?

**b)** Skriv et program der `alder = 15`. Skriv `Voksenbillett` hvis alderen er minst $16$, ellers `Ungdomsbillett`.

## Hint

`n % 2 == 0` betyr «delelig med 2», altså partall.

## Fasit

**a)**
$15$ er ikke delelig med $2$, så `else` kjører.

**Svar:** `Oddetall`

[STEG]

**b)**
```python
alder = 15
if alder >= 16:
    print("Voksenbillett")
else:
    print("Ungdomsbillett")
```

**Svar:** `Ungdomsbillett`

## Starter

```python
n = 15
if n % 2 == 0:
    print("Partall")
else:
    print("Oddetall")
```
