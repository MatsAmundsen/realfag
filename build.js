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

// ─── Markdown → HTML (enkel konverter) ──────────────────────────────────────

function markdownToHtml(md) {
    if (!md) return '';
    let html = md.trim();

    // Kodeblokker (``` ... ```) → <pre><code>
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="prog-code"><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code `...` → <code>...</code>
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold **...** → <strong>...</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Overskrifter
    html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h3 style="margin-top:1.5rem; color:var(--text-light); border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">$1</h3>');

    // Bilder ![alt](src) → <img>
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="task-image" style="max-width:100%; border-radius:8px; margin:1rem 0;">');

    // Markdown-lenker [tekst](url)
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--primary); text-decoration:underline; font-weight:bold;">$1</a>');

    // Rå URLer (https://...) som ikke er i en a-tag allerede
    html = html.replace(/(^|[^"'])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" style="color:var(--primary); text-decoration:underline;">$2</a>');

    // Markdown-tabeller
    html = html.replace(/(?:^|\n)((?:\|.*\|\n?)+)/g, (match, tableBlock) => {
        let rows = tableBlock.trim().split('\n');
        let tableHtml = '<table style="width:100%; border-collapse:collapse; margin:1rem 0; text-align:left;">';
        
        rows.forEach((row, i) => {
            // Hopp over separator-raden (---|---)
            if (row.match(/^\|[\s\-\|]+\|$/)) return;
            
            let cells = row.split('|').map(c => c.trim());
            // Fjern første og siste tomme celle fra splittingen
            if (cells[0] === '') cells.shift();
            if (cells[cells.length - 1] === '') cells.pop();
            
            tableHtml += '<tr>';
            cells.forEach(cell => {
                if (i === 0) {
                    tableHtml += `<th style="border:1px solid var(--border); padding:0.75rem; background:rgba(255,255,255,0.05);">${cell}</th>`;
                } else {
                    tableHtml += `<td style="border:1px solid var(--border); padding:0.75rem;">${cell}</td>`;
                }
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</table>';
        return tableHtml;
    });

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
    let starter = '';

    for (let i = 1; i < parts.length; i++) {
        const section = parts[i];
        if (section.match(/^Hint\s*\n/i)) {
            hint = section.replace(/^Hint\s*\n/i, '').trim();
        } else if (section.match(/^Fasit\s*\n/i)) {
            fasit = section.replace(/^Fasit\s*\n/i, '').trim();
        } else if (section.match(/^Starter\s*\n/i)) {
            starter = section.replace(/^Starter\s*\n/i, '').trim()
                .replace(/^```(?:python)?\n?/, '')
                .replace(/\n?```$/, '')
                .trim();
        }
    }

    return { tekst, hint, fasit, starter };
}

// ─── Les kapittelinfo fra _kapittel.yml ─────────────────────────────────────

function readKapittelInfo(dirPath) {
    const ymlPath = path.join(dirPath, '_kapittel.yml');
    const delkapYmlPath = path.join(dirPath, '_delkapittel.yml');
    const metaPath = fs.existsSync(ymlPath) ? ymlPath
        : (fs.existsSync(delkapYmlPath) ? delkapYmlPath : null);
    if (!metaPath) {
        // Fallback: utled fra mappenavn
        const dirName = path.basename(dirPath);
        const kapMatch = dirName.match(/^(kap\d+)/);
        return {
            id: kapMatch ? kapMatch[1] : dirName,
            tittel: dirName,
        };
    }

    const content = fs.readFileSync(metaPath, 'utf-8');
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

function parseOppgaveFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { meta, body } = parseFrontmatter(content);
    const sections = parseSections(body);
    const mdFile = path.basename(filePath);

    let fasitSteg = null;
    let fasitHtml = null;
    if (sections.fasit) {
        if (sections.fasit.includes('[STEG]')) {
            fasitSteg = sections.fasit.split('[STEG]').map(s => markdownToHtml(s.trim()));
        } else {
            fasitHtml = markdownToHtml(sections.fasit);
        }
    }

    return {
        id: meta.id || mdFile.replace('.md', ''),
        tittel: meta.tittel || `Oppgave ${meta.id || mdFile.replace('.md', '')}`,
        tekst: markdownToHtml(sections.tekst),
        bilde: meta.bilde || null,
        hint: markdownToHtml(sections.hint),
        fasit: fasitHtml,
        fasitSteg: fasitSteg,
        starter: sections.starter || ''
    };
}

// ─── Hovedlogikk ────────────────────────────────────────────────────────────

function build() {
    if (!fs.existsSync(OPPGAVER_DIR)) {
        console.error('Finner ikke oppgaver/-mappen. Kjør dette fra prosjektets rot.');
        process.exit(1);
    }

    // --- Bygg oppgaver ---
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

        const delkapDirs = fs.readdirSync(dirPath)
            .filter(name => fs.statSync(path.join(dirPath, name)).isDirectory())
            .sort(naturalSort);

        const delkapitler = [];
        let oppgaverIKapittel = 0;

        for (const delkapName of delkapDirs) {
            const delkapPath = path.join(dirPath, delkapName);
            const mdFiles = fs.readdirSync(delkapPath)
                .filter(f => f.endsWith('.md'))
                .sort(naturalSort);

            const oppgaver = [];

            for (const mdFile of mdFiles) {
                const filePath = path.join(delkapPath, mdFile);
                oppgaver.push(parseOppgaveFile(filePath));
            }

            // Sjekk etter quiz for dette delkapittelet
            let quiz = null;
            const quizPath = path.join(delkapPath, `quiz_${delkapName}.json`);
            if (fs.existsSync(quizPath)) {
                try {
                    quiz = JSON.parse(fs.readFileSync(quizPath, 'utf-8'));
                } catch (e) {
                    console.error(`Feil ved lesing av quiz for ${delkapName}:`, e);
                }
            }

            if (oppgaver.length > 0 || quiz) {
                const delkapMeta = readKapittelInfo(delkapPath);
                const delkapTittel = delkapMeta.tittel && delkapMeta.tittel !== delkapName
                    ? delkapMeta.tittel
                    : `Delkapittel ${delkapName}`;
                delkapitler.push({
                    id: delkapName,
                    tittel: delkapTittel,
                    oppgaver: oppgaver,
                    quiz: quiz
                });
                oppgaverIKapittel += oppgaver.length;
            }
        }

        fagsok.push({
            id: kapInfo.id,
            tittel: kapInfo.tittel,
            delkapitler: delkapitler,
        });

        totalOppgaver += oppgaverIKapittel;
        console.log(`✓ ${kapInfo.tittel}: ${delkapitler.length} delkapitler, ${oppgaverIKapittel} oppgaver`);
    }

    // --- Bygg fagstoff ---
    const FAGSTOFF_DIR = path.join(__dirname, 'fagstoff');
    const fagstoff = [];
    if (fs.existsSync(FAGSTOFF_DIR)) {
        const mdFiles = fs.readdirSync(FAGSTOFF_DIR).filter(f => f.endsWith('.md')).sort(naturalSort);
        for (const mdFile of mdFiles) {
            const filePath = path.join(FAGSTOFF_DIR, mdFile);
            const content = fs.readFileSync(filePath, 'utf-8');
            const { meta, body } = parseFrontmatter(content);
            
            fagstoff.push({
                id: mdFile.replace('.md', ''),
                tittel: meta.tittel || mdFile.replace('.md', ''),
                src: meta.src || undefined,
                html: meta.src ? "" : markdownToHtml(body)
            });
        }
        console.log(`✓ Fant ${fagstoff.length} fagstoff-dokumenter`);
    }

    const PROG_DIR = path.join(OPPGAVER_DIR, 'programmering');
    const programmering = [];
    if (fs.existsSync(PROG_DIR)) {
        const mdFiles = fs.readdirSync(PROG_DIR).filter(f => f.endsWith('.md')).sort(naturalSort);
        for (const mdFile of mdFiles) {
            programmering.push(parseOppgaveFile(path.join(PROG_DIR, mdFile)));
        }
        console.log(`✓ Programmering: ${programmering.length} oppgaver`);
    }

    // Generer data.js med både fagsok (oppgaver) og fagstoff
    const OUTPUT_JS = path.join(__dirname, 'data.js');
    const jsContent =
        `window.fagsok = ${JSON.stringify(fagsok, null, 4)};\n\n` +
        `window.fagstoff = ${JSON.stringify(fagstoff, null, 4)};\n\n` +
        `window.programmeringData = ${JSON.stringify(programmering, null, 4)};\n`;
    fs.writeFileSync(OUTPUT_JS, jsContent);

    stampAssets();

    console.log(`\n✓ Genererte data.js`);
    console.log(`  ${fagsok.length} kapitler, ${totalOppgaver} oppgaver totalt`);
}

function fileHash(filePath) {
    const buf = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 10);
}

function hashTree(dir) {
    if (!fs.existsSync(dir)) return '';
    const parts = [];
    for (const name of fs.readdirSync(dir).sort()) {
        const full = path.join(dir, name);
        const stat = fs.statSync(full);
        if (stat.isDirectory()) parts.push(hashTree(full));
        else parts.push(fileHash(full));
    }
    return parts.join('');
}

/**
 * Setter innholdsbasert cache-busting slik at GitHub Pages/nettleser
 * henter nye app.js, data.js, style.css og fagstoff uten hard refresh.
 */
function stampAssets() {
    const root = __dirname;
    const dataPath = path.join(root, 'data.js');
    const appPath = path.join(root, 'app.js');
    const stylePath = path.join(root, 'style.css');
    const htmlPath = path.join(root, 'Indeks.html');
    const fagstoffDir = path.join(root, 'fagstoff');

    const combined = crypto.createHash('sha256')
        .update(fileHash(dataPath))
        .update(fs.existsSync(appPath) ? fileHash(appPath) : '')
        .update(fs.existsSync(stylePath) ? fileHash(stylePath) : '')
        .update(hashTree(fagstoffDir))
        .digest('hex')
        .slice(0, 10);

    fs.appendFileSync(dataPath, `\nwindow.ASSET_VERSION = ${JSON.stringify(combined)};\n`);

    const versionFile = path.join(root, 'version.json');
    fs.writeFileSync(versionFile, JSON.stringify({ version: combined, builtAt: new Date().toISOString() }, null, 2) + '\n');

    if (fs.existsSync(htmlPath)) {
        let html = fs.readFileSync(htmlPath, 'utf-8');
        html = html
            .replace(/href="style\.css(\?v=[^"]*)?"/g, `href="style.css?v=${combined}"`)
            .replace(/src="data\.js(\?v=[^"]*)?"/g, `src="data.js?v=${combined}"`)
            .replace(/src="app\.js(\?v=[^"]*)?"/g, `src="app.js?v=${combined}"`);
        fs.writeFileSync(htmlPath, html);
    }

    console.log(`✓ Cache-busting: v=${combined}`);
}

build();
