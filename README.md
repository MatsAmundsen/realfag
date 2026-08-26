# Matteguiden 1T

Utforskende læring i matematikk 1T: oppgaver, quizer, fagstoff og kunnskapskart.

**Offisiell nettside:** https://matsamundsen.github.io/

## Hvor ligger koden?

Den **live** siden er React-appen i `src/`. Den bygges og publiseres til [MatsAmundsen.github.io](https://github.com/MatsAmundsen/MatsAmundsen.github.io).

Filene `index.html`, `app.js` og `style.css` i rotmappa er den **gamle vanilla-versjonen**. De vises ikke på nettsiden lenger.

## Publisering

GitHub Action i github.io-repoet bygger `src/` hvert 15. minutt (og kan kjøres manuelt under Actions → «Bygg live fra realfag»).

Etter push til `main` her, vent inntil 15 minutter — eller kjør actionen manuelt.
