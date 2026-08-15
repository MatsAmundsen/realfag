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
    'Indeks.html': 'index.html',   // Omdøp til index.html
    'app.js':      'app.js',
    'style.css':   'style.css',
    'data.js':     'data.js',
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

// Kopier alle bilder (png, jpg, svg)
const imageExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];
for (const file of fs.readdirSync(ROOT)) {
    if (imageExts.includes(path.extname(file).toLowerCase())) {
        fs.copyFileSync(path.join(ROOT, file), path.join(DIST, file));
        console.log(`  ✓ ${file} → dist/${file}`);
    }
}

console.log('\n✓ dist/ er klar for deployment');
