# Matteguiden 1T

Nettsted for vg1 matematikk 1T: oppgaver, quizer, øveprøver, fagstoff, programmering, kunnskapskart og offisielle Udir-eksamener.

## Kjøre lokalt

Krever Node 22+.

```bash
npm install
npm run dev
```

Åpne adressen som vises i terminalen (standard er port 8080).

Produksjonsbygg:

```bash
npm run build
npm run preview
```

## Innhold

- Kapittel 1–4 med delkapitler, ekstraøving og øveprøver (øve-/prøvemodus)
- Interaktivt kunnskapskart: noder peker på delkapitler og oppgaver
- Eksamensarkiv MAT1021 (vår/høst 2023–2026). Del 1 er komplett; Del 2 er et utvalg
- Fremdrift lagres i nettleseren (`localStorage`)

Markdown-kildene til oppgavene ligger fortsatt under `oppgaver/`. Den kjørende appen leser innholdet fra `src/data/`.
