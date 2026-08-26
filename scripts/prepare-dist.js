/**
 * prepare-dist.js
 *
 * Kopierer alle statiske filer til dist/ for deployment.
 * Kjøres som del av 'pnpm run build'.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname.replace(/[/\\]scripts$/, '');
const DIST = path.join(ROOT, 'dist');

// Opprett dist/ (slett først hvis den finnes)
if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true });
}
fs.mkdirSync(DIST);

// Filer som skal med i deployet
const files = {
    'Indeks.html': 'index.html',
    'app.js':      'app.js',
    'style.css':   'style.css',
    'data.js':     'data.js',
    'sw.js':       'sw.js',
};

// Kopier faste filer
for (const [src, dest] of Object.entries(files)) {
    const srcPath = path.join(ROOT, src);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(DIST, dest));
        console.log(`  ✓ ${src} → dist/${dest}`);
    } else {
        console.error(`  ✗ Mangler ${src}`);
        process.exit(1);
    }
}

const versionSrc = path.join(ROOT, 'version.json');
if (fs.existsSync(versionSrc)) {
    fs.copyFileSync(versionSrc, path.join(DIST, 'version.json'));
    console.log('  ✓ version.json → dist/version.json');
}

function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
        const from = path.join(src, name);
        const to = path.join(dest, name);
        if (fs.statSync(from).isDirectory()) copyDir(from, to);
        else fs.copyFileSync(from, to);
    }
}

const fagstoffSrc = path.join(ROOT, 'fagstoff');
if (fs.existsSync(fagstoffSrc)) {
    copyDir(fagstoffSrc, path.join(DIST, 'fagstoff'));
    console.log('  ✓ fagstoff/ → dist/fagstoff/');
}

// Kopier alle bilder (png, jpg, svg)
const imageExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];
for (const file of fs.readdirSync(ROOT)) {
    if (imageExts.includes(path.extname(file).toLowerCase())) {
        fs.copyFileSync(path.join(ROOT, file), path.join(DIST, file));
        console.log(`  ✓ ${file} → dist/${file}`);
    }
}

console.log('\n✓ dist/ er klar for deployment');
