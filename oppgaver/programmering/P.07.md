---
id: "P.07"
tittel: "Oppgave P.07 — elif (flere valg)"
---

Når du har **flere** muligheter, bruker du `elif` («else if»). Python sjekker ovenfra og tar **første** treff.

```python
if poeng >= 90:
    print("A")
elif poeng >= 80:
    print("B")
else:
    print("C eller lavere")
```

**a)** Hva skrives ut når `poeng = 85`?

**b)** Utvid programmet slik at:
- minst $90$ → A
- minst $80$ → B
- minst $70$ → C
- ellers → Ikke bestått

Test med `poeng = 72`.

## Hint

Rekkefølgen er viktig. Hvis du sjekker `>= 70` først, vil $95$ også treffe der.

## Fasit

**a)**
$85 \ge 90$ er usant. $85 \ge 80$ er sant, så vi stopper der.

**Svar:** `B`

[STEG]

**b)**
```python
poeng = 72
if poeng >= 90:
    print("A")
elif poeng >= 80:
    print("B")
elif poeng >= 70:
    print("C")
else:
    print("Ikke bestått")
```

**Svar:** Med $72$ skrives `C`.

## Starter

```python
poeng = 85
if poeng >= 90:
    print("A")
elif poeng >= 80:
    print("B")
else:
    print("C eller lavere")
```
