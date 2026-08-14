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

// ─── Markdown → HTML (enkel konverter) ──────────────────────────────────────

function markdownToHtml(md) {
    if (!md) return '';
    let html = md.trim();

    // Kodeblokker (``` ... ```) → <pre><code>
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre style="background:#1e293b; padding:1.2rem; border-radius:8px; border:1px solid rgba(255,255,255,0.1); color:#22d3ee; line-height:1.6;"><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code `...` → <code>...</code>
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **...** → <strong>...</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Newlines → <br>
    html = html.replace(/\n/g, '<br>');

    // Fjern doble <br>
    html = html.replace(/(<br>){3,}/g, '<br><br>');

    return html;
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// ─── Splitt Markdown-body i seksjoner ───────────────────────────────────────

function parseSections(body) {
    // Splitt på ## overskrifter
    const parts = body.split(/^## /m);

    // Første del er oppgaveteksten (før noen ## overskrift)
    const tekst = parts[0].trim();
    let hint = '';
    let fasit = '';

    for (let i = 1; i < parts.length; i++) {
        const section = parts[i];
        if (section.match(/^Hint\s*\n/i)) {
            hint = section.replace(/^Hint\s*\n/i, '').trim();
        } else if (section.match(/^Fasit\s*\n/i)) {
            fasit = section.replace(/^Fasit\s*\n/i, '').trim();
        }
    }

    return { tekst, hint, fasit };
}

// ─── Les kapittelinfo fra _kapittel.yml ─────────────────────────────────────

function readKapittelInfo(dirPath) {
    const ymlPath = path.join(dirPath, '_kapittel.yml');
    if (!fs.existsSync(ymlPath)) {
        // Fallback: utled fra mappenavn
        const dirName = path.basename(dirPath);
        const kapMatch = dirName.match(/^(kap\d+)/);
        return {
            id: kapMatch ? kapMatch[1] : dirName,
            tittel: dirName,
        };
    }

    const content = fs.readFileSync(ymlPath, 'utf-8');
    const info = {};
    for (const line of content.split('\n')) {
        const m = line.match(/^(\w+)\s*:\s*"?(.*?)"?\s*$/);
        if (m) info[m[1]] = m[2];
    }
    return info;
}

// ─── Naturlig sortering av oppgave-IDer ─────────────────────────────────────

function naturalSort(a, b) {
    const re = /(\d+)|(\D+)/g;
    const aParts = a.match(re) || [];
    const bParts = b.match(re) || [];

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || '';
        const bPart = bParts[i] || '';
        const aNum = Number(aPart);
        const bNum = Number(bPart);

        if (!isNaN(aNum) && !isNaN(bNum)) {
            if (aNum !== bNum) return aNum - bNum;
        } else {
            if (aPart !== bPart) return aPart.localeCompare(bPart);
        }
    }
    return 0;
}

// ─── Hovedlogikk ────────────────────────────────────────────────────────────

function build() {
    if (!fs.existsSync(OPPGAVER_DIR)) {
        console.error('Finner ikke oppgaver/-mappen. Kjør dette fra prosjektets rot.');
        process.exit(1);
    }

    // Finn alle kapittelmapper (sortert)
    const kapDirs = fs.readdirSync(OPPGAVER_DIR)
        .filter(name => {
            const fullPath = path.join(OPPGAVER_DIR, name);
            return fs.statSync(fullPath).isDirectory() && name.startsWith('kap');
        })
        .sort(naturalSort);

    const fagsok = [];
    let totalOppgaver = 0;

    for (const dirName of kapDirs) {
        const dirPath = path.join(OPPGAVER_DIR, dirName);
        const kapInfo = readKapittelInfo(dirPath);

        // Finn alle .md-filer (ekskluder _-filer)
        const mdFiles = fs.readdirSync(dirPath)
            .filter(f => f.endsWith('.md') && !f.startsWith('_'))
            .sort(naturalSort);

        const oppgaver = [];

        for (const mdFile of mdFiles) {
            const filePath = path.join(dirPath, mdFile);
            const content = fs.readFileSync(filePath, 'utf-8');
            const { meta, body } = parseFrontmatter(content);
            const sections = parseSections(body);

            const oppgave = {
                id: meta.id || mdFile.replace('.md', ''),
                tittel: meta.tittel || `Oppgave ${meta.id || mdFile.replace('.md', '')}`,
                tekst: markdownToHtml(sections.tekst),
                bilde: meta.bilde || null,
                hint: markdownToHtml(sections.hint),
                fasit: markdownToHtml(sections.fasit),
            };

            oppgaver.push(oppgave);
        }

        fagsok.push({
            id: kapInfo.id,
            tittel: kapInfo.tittel,
            oppgaver: oppgaver,
        });

        totalOppgaver += oppgaver.length;
        console.log(`✓ ${kapInfo.tittel}: ${oppgaver.length} oppgaver`);
    }

    // Generer data.js
    const jsContent = `const fagsok = ${JSON.stringify(fagsok, null, 4)};\n`;
    fs.writeFileSync(OUTPUT_FILE, jsContent);

    console.log(`\n✓ Genererte ${OUTPUT_FILE}`);
    console.log(`  ${fagsok.length} kapitler, ${totalOppgaver} oppgaver totalt`);
}

build();
