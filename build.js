/**
 * build.js
 *
 * Bygger data.js fra Markdown-filer i oppgaver-mappen.
 *
 * Bruk:  node build.js
 *
 * Leser alle .md-filer fra kapittelmappene under oppgaver,
 * parser YAML-frontmatter og Markdown-seksjonene (oppgavetekst,
 * Hint, Fasit), konverterer til HTML, og genererer data.js med
 * fagsok-arrayet som app.js forventer.
 *
 * Ingen npm-avhengigheter.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const OPPGAVER_DIR = path.join(__dirname, 'oppgaver');
const OUTPUT_FILE = path.join(__dirname, 'data.js');

// ─── YAML frontmatter parser (enkel) ────────────────────────────────────────

function parseFrontmatter(content) {
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) {
        return { meta: {}, body: content };
    }

    const meta = {};
    for (const line of match[1].split('\n')) {
        const m = line.match(/^(\w+)\s*:\s*(.*)$/);
        if (m) {
            let val = m[2].trim();
            // Fjern quotes
            if ((val.startsWith('"') && val.endsWith('"')) ||
                (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }
            if (val === 'null' || val === '') val = null;
            meta[m[1]] = val;
        }
    }

    return { meta, body: match[2] };
}

// Rest of build.js truncated for this call - will push full in next if needed
