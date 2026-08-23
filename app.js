/* ============================================================
   Matteguiden 1T – App Logic v5 (Med trestruktur & subchapters)
   ============================================================ */

// ── Globale quiz-state ────────────────────────────────────────
let currentQuizData = null;
let currentQuizIndex = 0;
let currentQuizScore = 0;
let currentQuizTitle = '';

// ── Hjelpefunksjoner (globale, brukes av onclick-attributter) ─
window.toggleHint = function(hintId) {
    const el = document.getElementById(hintId);
    if (el) el.classList.toggle('visible');
};


window.goToRessurser = function() {
    navigateTo('ressurser');
};

window.toggleSolution = function(fasitId) {
    const el = document.getElementById(fasitId);
    if (el) el.classList.toggle('visible');
};


window.closeMobileSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (sidebarBackdrop) {
        sidebarBackdrop.classList.remove('show');
        setTimeout(() => { sidebarBackdrop.style.display = 'none'; }, 300);
    }
    document.body.style.overflow = '';
};

// ── Three.js Hero-animasjon ───────────────────────────────────
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const h = window.innerWidth <= 640 ? 350 : 600;
    renderer.setSize(canvas.offsetWidth, h);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.offsetWidth / h, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Geometrier
    const isDark = document.body.getAttribute('data-theme') !== 'light';
    const primaryColor = isDark ? 0x6366f1 : 0x4f46e5;
    const accentColor  = isDark ? 0x34d399 : 0x059669;
    const material1 = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true, transparent: true, opacity: 0.35 });
    const material2 = new THREE.MeshBasicMaterial({ color: accentColor,  wireframe: true, transparent: true, opacity: 0.25 });

    const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4, 0), material1);
    icosa.position.set(-2.2, 0.3, 0);
    scene.add(icosa);

    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.28, 10, 40), material2);
    torus.position.set(2.2, -0.2, -1);
    scene.add(torus);

    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), material1.clone());
    octa.position.set(0.4, 0.8, -2);
    scene.add(octa);

    // Mus-parallax
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.25;
    });

    let animId;
    const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = Date.now() * 0.001;
        icosa.rotation.x = t * 0.18 + mouseY;
        icosa.rotation.y = t * 0.22 + mouseX;
        torus.rotation.x = t * 0.14;
        torus.rotation.y = t * 0.19 + mouseX * 0.5;
        octa.rotation.y  = t * 0.28;
        renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
        const w = canvas.offsetWidth;
        const curH = window.innerWidth <= 640 ? 350 : 600;
        camera.aspect = w / curH;
        camera.updateProjectionMatrix();
        renderer.setSize(w, curH);
    };
    window.addEventListener('resize', onResize);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
    };
}

let destroyHeroCanvas = null;

// ── Forsiden ──────────────────────────────────────────────────
function loadHomePage() {
    const cardsEl = document.getElementById('home-chapter-cards');
    if (!cardsEl || cardsEl.dataset.loaded) return;
    cardsEl.dataset.loaded = '1';

    const icons = ['🔢', '🔣', '⚖️', '📈'];
    const descriptions = [
        'Tallmengder, potenser, standardform og logikk',
        'Kvadratsetninger, faktorisering og rasjonale uttrykk',
        'Likninger, ulikheter og polynomdivisjon',
        'Funksjoner, derivasjon og funksjonsdrøfting'
    ];

    if (typeof window.fagsok !== 'undefined') {
        window.fagsok.forEach((kap, i) => {
            const card = document.createElement('div');
            card.className = 'chapter-card';
            const oppgaveCount = kap.delkapitler.reduce((s, d) => s + d.oppgaver.length, 0);
            card.innerHTML = `
                <span class="chapter-card-icon">${icons[i] || '📐'}</span>
                <div class="chapter-card-title">${kap.tittel}</div>
                <div class="chapter-card-sub">${descriptions[i] || ''}</div>
                <div class="chapter-card-meta">
                    <span>📋 ${kap.delkapitler.length} delkapitler</span>
                    <span>✏️ ${oppgaveCount} oppgaver</span>
                </div>
            `;
            card.onclick = () => {
                // Gå til første delkapittel
                if (kap.delkapitler.length) {
                    window.location.hash = `oppgaver/${kap.id}/${kap.delkapitler[0].id}`;
                } else {
                    window.location.hash = `oppgaver/${kap.id}`;
                }
            };
            cardsEl.appendChild(card);
        });
    }

    loadRecentActivity();

    setTimeout(() => {
        destroyHeroCanvas = initHeroCanvas();
    }, 50);
}

function loadRecentActivity() {
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('reel_recent') || '[]'); } catch(e) {}
    if (!recent.length) return;

    const section = document.getElementById('home-recent-section');
    const container = document.getElementById('home-recent-cards');
    if (!section || !container) return;

    section.style.display = 'block';
    container.innerHTML = '';
    recent.slice(0, 3).forEach(item => {
        const card = document.createElement('div');
        card.className = 'recent-card';
        card.innerHTML = `
            <span class="recent-card-label">${item.kapTittel}</span>
            <span class="recent-card-title">${item.delkapTittel}</span>
        `;
        card.onclick = () => { window.location.hash = `oppgaver/${item.kapId}/${item.subId}`; };
        container.appendChild(card);
    });
}

function saveRecentActivity(kapId, subId, kapTittel, delkapTittel) {
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('reel_recent') || '[]'); } catch(e) {}
    recent = recent.filter(r => !(r.kapId === kapId && r.subId === subId));
    recent.unshift({ kapId, subId, kapTittel, delkapTittel });
    if (recent.length > 5) recent = recent.slice(0, 5);
    try { localStorage.setItem('reel_recent', JSON.stringify(recent)); } catch(e) {}
}

// ── Navigasjon (global) ───────────────────────────────────────
window.navigateTo = function(target) {
    if (target === 'home') {
        window.location.hash = 'home';
    } else {
        window.location.hash = target;
    }
};

// ── Quiz-overlay ──────────────────────────────────────────────
window.openQuizOverlay = function() {
    if (!currentQuizData || !currentQuizData.length) return;
    currentQuizIndex = 0;
    currentQuizScore = 0;
    document.getElementById('quiz-overlay').classList.remove('hidden');
    document.getElementById('quiz-backdrop').classList.remove('hidden');
    document.getElementById('quiz-overlay-title').textContent = currentQuizTitle;
    document.body.style.overflow = 'hidden';
    renderQuizQuestion();
};

window.closeQuizOverlay = function() {
    document.getElementById('quiz-overlay').classList.add('hidden');
    document.getElementById('quiz-backdrop').classList.add('hidden');
    document.body.style.overflow = '';
};

function getLevelLabel(index, total) {
    const pct = index / total;
    if (pct < 0.33) return { dot: 'green',  label: 'Grunnleggende' };
    if (pct < 0.65) return { dot: 'yellow', label: 'Anvendelse' };
    if (pct < 0.87) return { dot: 'red',    label: 'Analyse' };
    return                  { dot: 'star',   label: 'Utfordring' };
}

const letterLabels = ['A', 'B', 'C', 'D', 'E'];

function renderQuizQuestion() {
    const body     = document.getElementById('quiz-panel-body');
    const progress = document.getElementById('quiz-progress-bar');
    const progText = document.getElementById('quiz-progress-text');

    const total = currentQuizData.length;
    const idx   = currentQuizIndex;

    // Ferdig
    if (idx >= total) {
        renderQuizResult(total);
        progress.style.width = '100%';
        progText.textContent = `Fullført! ${currentQuizScore}/${total} riktige`;
        return;
    }

    const q = currentQuizData[idx];
    const pct = Math.round((idx / total) * 100);
    progress.style.width = pct + '%';
    progText.textContent = `Spørsmål ${idx + 1} av ${total}`;

    const level = getLevelLabel(idx, total);

    const card = document.createElement('div');
    card.className = 'quiz-question-card';
    card.innerHTML = `
        <div class="quiz-q-level">
            <span class="level-dot ${level.dot}"></span>
            ${level.label}
        </div>
        <p class="quiz-q-text">${q.sporsmal}</p>
        <div class="quiz-options" id="quiz-opts-${idx}"></div>
        <div id="quiz-feedback-${idx}" style="display:none"></div>
    `;
    body.innerHTML = '';
    body.appendChild(card);

    const optsEl = document.getElementById(`quiz-opts-${idx}`);
    q.alternativer.forEach((alt, aIdx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.setAttribute('data-letter', letterLabels[aIdx] || aIdx);
        btn.textContent = alt;
        btn.onclick = () => handleQuizAnswer(idx, aIdx, q.riktigSvar, q.forklaring);
        optsEl.appendChild(btn);
    });

    renderKaTeX(card);
}

function handleQuizAnswer(qIdx, selected, correct, forklaring) {
    const optsEl    = document.getElementById(`quiz-opts-${qIdx}`);
    const feedbackEl = document.getElementById(`quiz-feedback-${qIdx}`);
    if (!optsEl || !feedbackEl) return;

    const isCorrect = selected === correct;
    if (isCorrect) currentQuizScore++;

    const btns = optsEl.querySelectorAll('.quiz-opt-btn');
    btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct)            btn.classList.add('correct');
        else if (i === selected && !isCorrect) btn.classList.add('wrong');
    });

    feedbackEl.style.display = 'block';
    feedbackEl.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackEl.innerHTML = `
        <div class="quiz-feedback-title">${isCorrect ? '🎉 Riktig!' : '❌ Ikke helt riktig.'}</div>
        <p>${forklaring}</p>
        <button class="quiz-next-btn" onclick="advanceQuiz()">
            ${currentQuizIndex + 1 < currentQuizData.length ? 'Neste spørsmål →' : 'Se resultat →'}
        </button>
    `;
    renderKaTeX(feedbackEl);
}

window.advanceQuiz = function() {
    currentQuizIndex++;
    renderQuizQuestion();
};

function renderQuizResult(total) {
    const body = document.getElementById('quiz-panel-body');
    const pct  = Math.round((currentQuizScore / total) * 100);
    let emoji = '😅';
    if (pct >= 90) emoji = '🏆';
    else if (pct >= 70) emoji = '🎉';
    else if (pct >= 50) emoji = '👍';

    body.innerHTML = `
        <div class="quiz-result">
            <span class="quiz-result-emoji">${emoji}</span>
            <div class="quiz-result-score">${currentQuizScore}/${total}</div>
            <div class="quiz-result-text">Du fikk ${pct}% riktig!</div>
            <button class="quiz-restart-btn" onclick="restartQuiz()">Prøv igjen 🔄</button>
        </div>
    `;
}

window.restartQuiz = function() {
    currentQuizIndex = 0;
    currentQuizScore = 0;
    document.getElementById('quiz-progress-bar').style.width = '0%';
    document.getElementById('quiz-progress-text').textContent = '';
    renderQuizQuestion();
};

function setActiveQuiz(quizData, title) {
    currentQuizData  = quizData;
    currentQuizTitle = title;

    const fab   = document.getElementById('quiz-fab');
    const badge = document.getElementById('quiz-fab-badge');
    if (!quizData || !quizData.length) {
        fab.classList.add('hidden');
        return;
    }
    fab.classList.remove('hidden');
    badge.textContent = quizData.length + ' spm';
}

// ── KaTeX helper ───────────────────────────────────────────────
function renderKaTeX(el) {
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$',  right: '$',  display: false }
            ],
            throwOnError: false
        });
    }
}

// ── Oppgave-builder ────────────────────────────────────────────
function buildTaskCard(oppgave, contextLabel, index = 0, total = 1, subId = null, idPrefix = "std-") {
    const article = document.createElement('article');
    
    // Heuristikk for vanskelighetsgrad basert på plassering i delkapittelet
    const ratio = total > 1 ? (index / (total - 1)) : 0;
    let lvlClass = 'lvl-1';
    let lvlLabel = 'Grunnleggende';
    let lvlIcon = '🟢';

    if (ratio >= 0.80) {
        lvlClass = 'lvl-3';
        lvlLabel = 'Utfordring';
        lvlIcon = '🔴';
    } else if (ratio >= 0.35) {
        lvlClass = 'lvl-2';
        lvlLabel = 'Anvendelse';
        lvlIcon = '🟡';
    }

    article.className = `task-card ${lvlClass}`;
    article.id = `${idPrefix}task-${oppgave.id}`;

    let html = `
        <div class="task-card-header">
            ${contextLabel ? `<span class="task-context">${contextLabel}</span>` : '<span></span>'}
            <span class="task-badge ${lvlClass}">${lvlIcon} Nivå ${lvlClass.split('-')[1]}: ${lvlLabel}</span>
        </div>
        <h3 class="task-title">${oppgave.tittel}</h3>
        <div class="task-content">
            ${oppgave.tekst}
            ${oppgave.bilde ? `<img src="${oppgave.bilde}" alt="Figur til ${oppgave.tittel}" class="task-image">` : ''}
        </div>
    `;

    // Fasit HTML
    let fasitKnapp = '';
    let fasitHtml  = '';

    if (oppgave.fasitSteg && oppgave.fasitSteg.length > 0) {
        fasitKnapp = `<button class="hint-btn fasit-btn" onclick="toggleSolution('${idPrefix}fasit-${oppgave.id}')">Vis fasit (Steg 1) 📝</button>`;
        fasitHtml  = `<div id="${idPrefix}fasit-${oppgave.id}" class="solution-content steg-container">`;
        
        oppgave.fasitSteg.forEach((steg, i) => {
            const sid  = `${idPrefix}steg-${oppgave.id}-${i}`;
            const nsid = `${idPrefix}steg-${oppgave.id}-${i + 1}`;
            const isFirst = i === 0;
            const isLast  = i === oppgave.fasitSteg.length - 1;
            
            fasitHtml += `
            <div id="${sid}" class="steg-card" style="display:${isFirst ? 'block' : 'none'};">
                <div class="steg-badge">Steg ${i + 1}</div>
                <div class="steg-content">${steg}</div>
                ${!isLast ? `<button class="steg-next-btn" onclick="
                    const next = document.getElementById('${nsid}');
                    next.style.display='block';
                    this.style.display='none';
                    next.scrollIntoView({behavior: 'smooth', block: 'nearest'});
                ">Vis neste steg ⬇️</button>` : ''}
            </div>`;
        });
        fasitHtml += `</div>`;
    } else if (oppgave.fasit) {
        fasitKnapp = `<button class="hint-btn fasit-btn" onclick="toggleSolution('${idPrefix}fasit-${oppgave.id}')">Fasit 📝</button>`;
        fasitHtml  = `<div id="${idPrefix}fasit-${oppgave.id}" class="solution-content"><strong>Løsningsforslag:</strong><br><br>${oppgave.fasit}</div>`;
    }

    html += `
        <div class="task-action-bar">
            ${(function(){
                // subId sendes nå direkte inn som argument 5 i funksjonen!
                if (subId && typeof prereqMap !== 'undefined' && prereqMap[subId]) {
                    return `<button class="hint-btn prereq-btn" onclick="togglePrereqInline(this, '${idPrefix}prereq-${oppgave.id}', '${subId}')" style="background: var(--primary-subtle); color: var(--primary-dark); border-color: var(--primary-light);">Hva må jeg kunne? 🗺️</button>`;
                }
                return '';
            })()}
            <button class="hint-btn" onclick="toggleHint('${idPrefix}hint-${oppgave.id}')">Vis hint 💡</button>
            ${fasitKnapp}
        </div>
        <div id="${idPrefix}prereq-${oppgave.id}" class="prereq-inline-container" style="display:none;"></div>
        <div id="${idPrefix}hint-${oppgave.id}" class="hint-content">${oppgave.hint}</div>
        ${fasitHtml}
    `;

    article.innerHTML = html;
    return article;
}

// ── Last underkapitttel ─────────────────────────────────────────────
function loadSubchapter(kapId, subId) {
    if (typeof window.fagsok === 'undefined') return;
    const kapData = window.fagsok.find(k => k.id === kapId);
    if (!kapData) return;
    const dkData = kapData.delkapitler.find(d => d.id === subId);
    if (!dkData) return;

    // Sidebar UI - Trekkspill og Aktiv state
    document.querySelectorAll('.subchapter-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.chapter-group').forEach(g => g.classList.remove('expanded'));

    const group = document.querySelector(`.chapter-group[data-group-id="${kapId}"]`);
    if (group) group.classList.add('expanded');

    const activeBtn = document.querySelector(`.subchapter-btn[data-id="${kapId}/${subId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        // Scroll sidebar slightly if needed
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    saveRecentActivity(kapId, subId, kapData.tittel, dkData.tittel);

    const taskContainer = document.getElementById('task-container');
    taskContainer.innerHTML = '';

    // Breadcrumb
    const bc = document.getElementById('breadcrumb');
    if (bc) {
        bc.innerHTML = `
            <span class="breadcrumb-link" onclick="navigateTo('home')">Hjem</span>
            <span class="breadcrumb-sep">›</span>
            <span class="breadcrumb-item">${kapData.tittel}</span>
            <span class="breadcrumb-sep">›</span>
            <span class="breadcrumb-item" style="color:var(--text-main);font-weight:600;">${dkData.tittel}</span>
        `;
    }

    // Kapittel/Delkapittel header
    const header = document.createElement('div');
    header.style.cssText = 'margin-bottom:2.5rem;';
    header.innerHTML = `
        <div style="font-size:0.9rem;color:var(--primary-light);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">${kapData.tittel}</div>
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
            <h2 style="font-size:2.2rem;color:var(--text-main);margin:0;">${dkData.tittel}</h2>
            ${dkData.quiz && dkData.quiz.length ? `<button class="hint-btn" style="flex-shrink:0;font-size:0.85rem;" onclick="setActiveQuizAndOpen(${JSON.stringify(dkData.quiz).replace(/"/g, '&quot;')}, '${dkData.tittel.replace(/'/g, "\\'")}')">🧠 Quiz (${dkData.quiz.length} spm)</button>` : ''}
        </div>
    `;
    taskContainer.appendChild(header);

    // Render tasks
    dkData.oppgaver.forEach((oppgave, idx) => {
        taskContainer.appendChild(buildTaskCard(oppgave, null, idx, dkData.oppgaver.length, dkData.id, "std-"));
    });

    setActiveQuiz(dkData.quiz, dkData.tittel);

    renderKaTeX(taskContainer);
    updateBanner(displayedWeek);
    
    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.setActiveQuizAndOpen = function(quizData, title) {
    setActiveQuiz(quizData, title);
    window.openQuizOverlay();
};

// ── Ukesplan ───────────────────────────────────────────────────
const ukesplan = {
    34: { kapId: null,   subId: null,  tekst: 'Uke 34 - Tirsdag: Grilling og oppstart. Torsdag: Strandheim.' },
    35: { kapId: 'kap1', subId: '1A',  tekst: 'Uke 35 - Tirsdag: Kapittel 1A. Torsdag: Kapittel 1B/1D.' },
    36: { kapId: 'kap1', subId: '1E',  tekst: 'Uke 36 - Tirsdag: Osloprøve. Torsdag: Kapittel 1E.' },
    37: { kapId: 'kap2', subId: '2B',  tekst: 'Uke 37 - Tirsdag: Kapittel 2B. Torsdag: Kapittel 2C.' },
    38: { kapId: 'kap2', subId: '2D',  tekst: 'Uke 38 - Tirsdag: Kapittel 2D. Torsdag: Kapittel 2E/F.' },
    39: { kapId: 'kap2', subId: '2F',  tekst: 'Uke 39 - Tirsdag: Kapittel 2F. Torsdag: Prøve.' },
    40: { kapId: null,   subId: null,  tekst: 'Uke 40 - Høstferie! Slapp av og lad batteriene.' },
    41: { kapId: 'kap3', subId: '3A',  tekst: 'Uke 41 - Tirsdag: Kapittel 3A. Torsdag: Kapittel 3B/3C.' },
    42: { kapId: 'kap3', subId: '3C',  tekst: 'Uke 42 - Tirsdag: Kapittel 3C/3D. Torsdag: Kapittel 3D.' },
    43: { kapId: 'kap3', subId: '3E',  tekst: 'Uke 43 - Tirsdag: Kapittel 3E. Torsdag: Prøve.' },
    44: { kapId: 'kap3', subId: '3F',  tekst: 'Uke 44 - Tirsdag: Kapittel 3F. Torsdag: OD-dag.' },
    45: { kapId: 'kap3', subId: '3G',  tekst: 'Uke 45 - Tirsdag: Kapittel 3G. Torsdag: Kapittel 3G.' },
    46: { kapId: 'kap4', subId: '4A',  tekst: 'Uke 46 - Tirsdag: Kapittel 4A. Torsdag: Kapittel 4A.' },
    47: { kapId: 'kap4', subId: '4B',  tekst: 'Uke 47 - Tirsdag: Kapittel 4B. Torsdag: Prøve.' },
    48: { kapId: 'kap4', subId: '4C',  tekst: 'Uke 48 - Tirsdag: Kapittel 4C. Torsdag: Kapittel 4D.' },
    49: { kapId: 'kap4', subId: '4E',  tekst: 'Uke 49 - Tirsdag: Kapittel 4E. Torsdag: Kapittel 4F.' },
    50: { kapId: 'kap4', subId: '4G',  tekst: 'Uke 50 - Tirsdag: Kapittel 4G. Torsdag: Kapittel 4G/4H.' },
    51: { kapId: 'kap4', subId: '4H',  tekst: 'Uke 51 - Tirsdag: Kapittel 4H. Torsdag: Juleavslutning.' }
};

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

let displayedWeek = getWeekNumber(new Date());

function updateBanner(week) {
    const banner    = document.getElementById('ukesplan-banner');
    const weekNumEl = document.getElementById('week-number');
    const weekTextEl = document.getElementById('week-text');
    const weekBtn   = document.getElementById('week-link-btn');
    if (!banner) return;

    banner.classList.remove('hidden');
    if (weekNumEl) weekNumEl.textContent = week;

    const plan = ukesplan[week];
    if (plan) {
        weekTextEl.textContent = plan.tekst;
        if (plan.kapId && plan.subId) {
            weekBtn.style.display = 'inline-flex';
            weekBtn.onclick = () => { window.location.hash = `oppgaver/${plan.kapId}/${plan.subId}`; };
        } else {
            weekBtn.style.display = 'none';
        }
    } else if (week < 34) {
        weekTextEl.textContent = 'Velkommen! Undervisningen starter i uke 34.';
        weekBtn.style.display = 'none';
    } else {
        weekTextEl.textContent = 'Ingen plan for denne uken.';
        weekBtn.style.display = 'none';
    }

    const prevBtn = document.getElementById('prev-week-btn');
    const nextBtn = document.getElementById('next-week-btn');
    if (prevBtn) prevBtn.style.visibility = week > 33 ? 'visible' : 'hidden';
    if (nextBtn) nextBtn.style.visibility = week < 52 ? 'visible' : 'hidden';
}

// ── Load ressurser ────────────────────────────────────────────
let ressurserLastet = false;
function loadRessurser() {
    const container = document.getElementById('ressurser-container');
    container.innerHTML = '';
    if (typeof window.fagstoff === 'undefined' || !window.fagstoff.length) {
        container.innerHTML = '<p>Ingen ressurser funnet.</p>';
        return;
    }
    const nav = document.createElement('div');
    nav.style.cssText = 'display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem;';
    const contentArea = document.createElement('div');

    window.fagstoff.forEach((tema, i) => {
        const btn = document.createElement('button');
        btn.className = 'hint-btn';
        if (i === 0) btn.style.cssText = 'background:var(--primary);color:#fff;';
        btn.textContent = tema.tittel.replace('Fagbibliotek: ', '');

        const article = document.createElement('article');
        article.className = 'task-card fagstoff-article';
        article.style.display = i === 0 ? 'block' : 'none';
        article.innerHTML = `<h3 class="task-title" style="margin-bottom:1rem">${tema.tittel}</h3><div class="fagstoff-content">${tema.html}</div>`;

        btn.addEventListener('click', () => {
            nav.querySelectorAll('button').forEach(b => { b.style.background = ''; b.style.color = ''; });
            btn.style.cssText = 'background:var(--primary);color:#fff;';
            contentArea.querySelectorAll('article').forEach(a => a.style.display = 'none');
            article.style.display = 'block';
        });

        nav.appendChild(btn);
        contentArea.appendChild(article);
    });

    container.appendChild(nav);
    container.appendChild(contentArea);
    renderKaTeX(container);
}

// ── Load programmering ────────────────────────────────────────
let progLastet = false;
function loadProgrammering() {
    const container = document.getElementById('prog-task-container');
    if (typeof window.programmeringData === 'undefined') {
        container.innerHTML = '<p>Ingen programmeringsoppgaver funnet.</p>';
        return;
    }
    window.programmeringData.forEach((oppgave, idx) => {
        const article = buildTaskCard(oppgave, null, idx, window.programmeringData.length, null, "prog-");
        article.id = `prog-task-${oppgave.id}`;
        container.appendChild(article);
    });
    renderKaTeX(container);
}

// ── Load søk ──────────────────────────────────────────────────
function loadSearchResults(query) {
    const container = document.getElementById('search-results-container');
    const statusEl  = document.getElementById('search-status');
    if (!container || !statusEl) return;
    container.innerHTML = '';

    const inp = document.getElementById('global-search');
    if (inp && inp.value !== query) inp.value = query;

    if (!query) { statusEl.textContent = 'Skriv noe i søkefeltet og trykk Enter.'; return; }

    const lq = query.toLowerCase();
    let count = 0;
    statusEl.textContent = `Søker etter "${query}"...`;

    if (typeof window.fagsok !== 'undefined') {
        window.fagsok.forEach(kap => {
            kap.delkapitler.forEach(dk => {
                dk.oppgaver.forEach(opp => {
                    if (`${opp.tittel} ${opp.tekst} ${opp.hint} ${opp.fasit}`.toLowerCase().includes(lq)) {
                        const card = buildTaskCard(opp, `${kap.tittel} › ${dk.tittel}`, 0, 1, dk.id, "search-");
                        // Add link to go to subchapter
                        const btnArea = card.querySelector('.task-buttons');
                        if (btnArea) {
                            btnArea.innerHTML += `<button class="hint-btn" style="background:var(--card-bg);border-color:var(--primary);" onclick="window.location.hash='oppgaver/${kap.id}/${dk.id}'">Gå til kapittel</button>`;
                        }
                        container.appendChild(card);
                        count++;
                    }
                });
            });
        });
    }

    if (typeof window.programmeringData !== 'undefined') {
        window.programmeringData.forEach(opp => {
            if (`${opp.tittel} ${opp.tekst} ${opp.hint} ${opp.fasit}`.toLowerCase().includes(lq)) {
                container.appendChild(buildTaskCard(opp, 'Programmering', 0, 1, null, 'search-'));
                count++;
            }
        });
    }

    if (typeof window.fagstoff !== 'undefined') {
        window.fagstoff.forEach(tema => {
            if (`${tema.tittel} ${tema.html}`.toLowerCase().includes(lq)) {
                const a = document.createElement('article');
                a.className = 'task-card';
                a.innerHTML = `<div style="font-size:.8rem;color:var(--text-muted);margin-bottom:.5rem;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Fagbibliotek</div><h3 class="task-title" style="margin-bottom:1rem">${tema.tittel}</h3><div>${tema.html}</div>`;
                container.appendChild(a);
                count++;
            }
        });
    }

    statusEl.textContent = count === 0 ? `Ingen treff for "${query}".` : `Fant ${count} treff for "${query}".`;
    renderKaTeX(container);
}

// ── Router ────────────────────────────────────────────────────
function showView(id) {
    ['home-view', 'oppgaver-view', 'programmering-view', 'ressurser-view', 'search-view'].forEach(v => {
        document.getElementById(v)?.classList.add('hidden');
    });
    document.getElementById(id)?.classList.remove('hidden');
}

function handleRoute() {
    if (window.closeMobileSidebar) window.closeMobileSidebar();

    let hash = window.location.hash.substring(1) || 'home';
    const parts    = hash.split('/');
    const mainView = parts[0];
    const kapId    = parts[1];
    const subId    = parts[2];

    // Nav aktiv-tilstand
    document.querySelectorAll('.navbar .nav-btn[data-target]').forEach(b => b.classList.remove('active'));
    const navBtn = document.querySelector(`.navbar .nav-btn[data-target="${mainView}"]`);
    if (navBtn) navBtn.classList.add('active');

    document.getElementById('quiz-fab')?.classList.add('hidden');

    if (mainView === 'home') {
        showView('home-view');
        if (destroyHeroCanvas) { destroyHeroCanvas(); destroyHeroCanvas = null; }
        loadHomePage();
    } else if (mainView === 'programmering') {
        showView('programmering-view');
        if (!progLastet) { loadProgrammering(); progLastet = true; }
    } else if (mainView === 'kunnskapskart') {
        showView('kunnskapskart-view');
        renderGlobalMap();
    } else if (mainView === 'ressurser') {
        showView('ressurser-view');
        if (!ressurserLastet) { loadRessurser(); ressurserLastet = true; }
    } else if (mainView === 'sok') {
        showView('search-view');
        loadSearchResults(kapId ? decodeURIComponent(kapId) : '');
    } else {
        // Oppgaver
        showView('oppgaver-view');
        if (kapId && subId) {
            loadSubchapter(kapId, subId);
        } else if (kapId) {
            // Har kapittel, men ikke sub. Redirect til første sub.
            const kap = window.fagsok?.find(k => k.id === kapId);
            if (kap && kap.delkapitler.length) {
                window.location.hash = `oppgaver/${kap.id}/${kap.delkapitler[0].id}`;
            }
        } else {
            // Ingen kapId gitt, prøv å åpne det første i fagsok
            const firstKap = window.fagsok?.[0];
            if (firstKap && firstKap.delkapitler.length) {
                window.location.hash = `oppgaver/${firstKap.id}/${firstKap.delkapitler[0].id}`;
            }
        }
    }
}


// ── Mermaid Kart Data & Logikk ──────────────────────────────
// ────────────────────────────────────────────────────────────────
// KUNNSKAPSKART GRAFER
// ────────────────────────────────────────────────────────────────

// Forenklet helhetsbilde (thumbnail + modal)
const globalMermaidGraph = `
flowchart LR
    classDef c1 fill:#2563eb,color:#fff,stroke:#1d4ed8,rx:8;
    classDef c2 fill:#16a34a,color:#fff,stroke:#15803d,rx:8;
    classDef c3 fill:#ca8a04,color:#fff,stroke:#a16207,rx:8;
    classDef c4 fill:#9333ea,color:#fff,stroke:#7e22ce,rx:8;
    classDef topp fill:#dc2626,color:#fff,stroke:#991b1b,rx:8;

    K1["📘 KAP 1<br>Grunnkunnskap"]:::c1
    K2["🟢 KAP 2<br>Algebra"]:::c2
    K3["🟡 KAP 3<br>Likninger"]:::c3
    K4["🟣 KAP 4<br>Funksjoner"]:::c4
    EX["🏆 Eksamen"]:::topp

    K1 --> K2 --> K3 --> K4 --> EX
    K1 -.-> K3
    K2 -.-> K4
`;

// KAP 1 – Detaljert
const kap1Graph = `
flowchart LR
    classDef grunnlag fill:#dbeafe,color:#1e3a8a,stroke:#3b82f6,stroke-width:2px,font-weight:bold;
    classDef verktoy fill:#eff6ff,color:#1e40af,stroke:#60a5fa,stroke-width:1px;
    classDef advarsel fill:#fef3c7,color:#92400e,stroke:#f59e0b,stroke-width:2px;

    subgraph A ["📐 Tallmengder & Tallforståelse (1A)"]
        direction TB
        N["Naturlige tall ℕ"]:::grunnlag
        Z2["Hele tall ℤ"]:::grunnlag
        Q["Rasjonale tall ℚ"]:::grunnlag
        R["Reelle tall ℝ"]:::grunnlag
        I["Irrasjonale tall"]:::verktoy
        IV["Intervaller og mengder"]:::verktoy
        ABS["Absoluttverdi |x|"]:::verktoy
        N --> Z2 --> Q --> R
        I --> R
        Q --> IV
        Q --> ABS
    end

    subgraph B ["🔢 Tallmønstre & Spesialtall (1B)"]
        direction TB
        PRIM["Primtall"]:::grunnlag
        KV["Kvadrattall 1,4,9,16..."]:::grunnlag
        KUB["Kubikktall 1,8,27..."]:::grunnlag
        FIG["Figurtall"]:::verktoy
        PRIM --> FIG
        KV --> FIG
        KUB --> FIG
    end

    subgraph C ["➗ Brøk & Euklid (1C)"]
        direction TB
        SFF["Største felles faktor (SFF)"]:::grunnlag
        MFM["Minste felles multiplum (MFM)"]:::grunnlag
        BROK["Brøkregning + forkorting"]:::grunnlag
        FN["Fellesnevner"]:::verktoy
        SFF --> BROK
        MFM --> FN
        BROK --> FN
    end

    subgraph D ["⚡ Potensregler (1D)"]
        direction TB
        P1["aᵐ · aⁿ = aᵐ⁺ⁿ"]:::grunnlag
        P2["(aᵐ)ⁿ = aᵐⁿ"]:::grunnlag
        P3["a⁻ⁿ = 1/aⁿ"]:::grunnlag
        P4["a⁰ = 1"]:::grunnlag
        STD["Standardform a · 10ⁿ"]:::verktoy
        P1 & P2 & P3 & P4 --> STD
    end

    subgraph F ["🧠 Logikk & Bevis (1F)"]
        direction TB
        IMP["Implikasjon ⇒"]:::grunnlag
        EKV["Ekvivalens ⟺"]:::grunnlag
        MOT["Moteksempel"]:::verktoy
        BEVIS["Direkte bevis"]:::verktoy
        IMP --> MOT
        EKV --> BEVIS
    end

    ADVARSEL["⚠️ Mangler du dette?<br>Du vil slite i KAP 2, 3 og 4!"]:::advarsel

    A --> ADVARSEL
    B --> ADVARSEL
    C --> ADVARSEL
    D --> ADVARSEL
    F --> ADVARSEL
`;

// KAP 2 – Detaljert
const kap2Graph = `
flowchart TD
    classDef grunnlag fill:#dcfce7,color:#14532d,stroke:#22c55e,stroke-width:2px,font-weight:bold;
    classDef verktoy fill:#f0fdf4,color:#166534,stroke:#86efac,stroke-width:1px;
    classDef krever fill:#fef9c3,color:#713f12,stroke:#fde047,stroke-width:2px;

    subgraph A ["🔡 2A – Bokstavregning"]
        direction TB
        BA["Samle like ledd"]:::grunnlag
        BB["Distributiv lov:<br>a(b+c) = ab+ac"]:::grunnlag
        BC["To parenteser:<br>(a+b)(c+d)"]:::grunnlag
        BA --> BB --> BC
    end

    subgraph B ["📐 2B – Kvadratsetningene"]
        direction TB
        K1["1. kvset:<br>(a+b)² = a²+2ab+b²"]:::grunnlag
        K2["2. kvset:<br>(a-b)² = a²-2ab+b²"]:::grunnlag
        K3["3. kvset:<br>(a+b)(a-b) = a²-b²"]:::grunnlag
    end

    subgraph C ["🔍 2C – Faktorisering"]
        direction TB
        F1["Felles faktor utenfor"]:::grunnlag
        F2["Kvadratsetning baklengs"]:::grunnlag
        F3["Rotforenkling"]:::verktoy
        F1 & F2 --> F3
    end

    subgraph D ["✅ 2D – Fullstendige kvadrater"]
        direction TB
        D1["Baklengs 1. kvset"]:::grunnlag
        D2["Fullføre kvadratet"]:::grunnlag
        D1 --> D2
    end

    subgraph E ["➗ 2E – Rasjonale uttrykk"]
        direction TB
        E1["Forkorting av brøkuttrykk"]:::grunnlag
        E2["Fellesnevner med variabler"]:::grunnlag
        E1 --> E2
    end

    A --> B
    B --> C
    C --> D
    D --> E

    KREV["🔗 Trengs i Kap 3:<br>Likninger og ABC-formelen"]:::krever
    E --> KREV
`;

// KAP 3 – Detaljert
const kap3Graph = `
flowchart TD
    classDef grunnlag fill:#fef9c3,color:#713f12,stroke:#eab308,stroke-width:2px,font-weight:bold;
    classDef verktoy fill:#fefce8,color:#78350f,stroke:#fde047,stroke-width:1px;
    classDef krever fill:#f3e8ff,color:#581c87,stroke:#d8b4fe,stroke-width:2px;

    subgraph A ["📏 3A – Førstegradslikninger"]
        direction TB
        A1["ax + b = cx + d"]:::grunnlag
        A2["Prøve på svaret<br>(V.S. = H.S.)"]:::verktoy
        A3["Tekstoppgaver"]:::verktoy
        A1 --> A2 & A3
    end

    subgraph CD ["🧮 3C/3D – Andregradslikninger"]
        direction TB
        C1["Produktregelen:\nab = 0"]:::grunnlag
        C2["x² = k → x = ±√k"]:::grunnlag
        D1["ABC-formelen:<br>x = (-b ± √D) / 2a"]:::grunnlag
        D2["Diskriminant:<br>D = b²-4ac"]:::verktoy
        C1 & C2 --> D1
        D1 --> D2
    end

    subgraph EF ["⚖️ 3E/3F – Rasjonale & Nullpunkt"]
        direction TB
        E1["Rasjonale likninger:<br>Definisjonsmengde"]:::grunnlag
        E2["Falske løsninger"]:::verktoy
        F1["Nullpunktmetoden"]:::grunnlag
        F2["Proporsjoner &<br>Kryssmultiplikasjon"]:::verktoy
        E1 --> E2
        F1 --> F2
    end

    subgraph G ["🔬 3G – Tredjegradslikninger"]
        direction TB
        G1["Nullpunktsetningen:<br>finn én x₁"]:::grunnlag
        G2["Polynomdivisjon:<br>P(x) ÷ (x - x₁)"]:::grunnlag
        G3["Løs andregradspolynomet<br>med ABC-formelen"]:::grunnlag
        G1 --> G2 --> G3
    end

    KREV["🔗 Trengs i Kap 4:<br>Funksjoner og drøfting"]:::krever
    CD --> KREV
    G --> KREV
`;

// KAP 4 – Detaljert
const kap4Graph = `
flowchart TD
    classDef grunnlag fill:#f3e8ff,color:#581c87,stroke:#a855f7,stroke-width:2px,font-weight:bold;
    classDef verktoy fill:#faf5ff,color:#6b21a8,stroke:#d8b4fe,stroke-width:1px;
    classDef topp fill:#dc2626,color:#fff,stroke:#991b1b,stroke-width:3px,font-weight:bold;

    subgraph AB ["📈 4A/4B – Funksjoner & Lineære"]
        direction TB
        A1["Funksjonsbegrepet:\nDf og Vf"]:::grunnlag
        A2["Nullpunkter: f(x) = 0"]:::grunnlag
        B1["f(x) = ax + b\nStigningstall a"]:::grunnlag
        B2["Topunktsformel:<br>a = (y₂-y₁)/(x₂-x₁)"]:::verktoy
        A1 --> B1 --> B2
        A2 --> B1
    end

    subgraph CD ["🔄 4C/4D – Andregrads & Rasjonale"]
        direction TB
        C1["Parabel: f(x) = ax²+bx+c"]:::grunnlag
        C2["Symmetriakse:<br>x = -b/2a"]:::verktoy
        C3["Toppunktsform:<br>f(x) = a(x-x₀)²+y₀"]:::verktoy
        D1["Rasjonale:<br>f(x) = P(x)/Q(x)"]:::grunnlag
        D2["Asymptoter:<br>loddrett og vannrett"]:::verktoy
        C1 --> C2 & C3
        C1 --> D1 --> D2
    end

    subgraph EF ["📊 4E/4F – Potens & Eksponential"]
        direction TB
        E1["f(x) = axᵇ<br>Vekstfaktorer"]:::grunnlag
        F1["f(x) = a·bˣ<br>Halveringstid"]:::grunnlag
        F2["Logaritmer:<br>log og ln"]:::verktoy
        E1 & F1 --> F2
    end

    subgraph GH ["🔬 4G/4H – Derivasjon & Drøfting"]
        direction TB
        G1["Gjennomsnittlig vekstfart:<br>∆y/∆x"]:::grunnlag
        G2["Momentan vekstfart:<br>f'(x) = lim(∆x→0)"]:::grunnlag
        H1["Derivasjonsregler:<br>xⁿ → nxⁿ⁻¹"]:::grunnlag
        H2["Fortegnsskjema for f'(x)"]:::verktoy
        H3["Ekstremalpunkter:<br>min/maks"]:::verktoy
        G1 --> G2 --> H1 --> H2 --> H3
    end

    EX["🏆 EKSAMEN<br>Funksjonsdrøfting"]:::topp
    GH --> EX
    CD --> GH
    EF --> GH
`;

// Modal – detaljert helhetsbilde
const modalMermaidGraph = `
flowchart TD
    classDef c1h fill:#2563eb,color:#fff,stroke:#1d4ed8,stroke-width:2px;
    classDef c1 fill:#dbeafe,color:#1e3a8a,stroke:#60a5fa;
    classDef c2h fill:#16a34a,color:#fff,stroke:#15803d,stroke-width:2px;
    classDef c2 fill:#dcfce7,color:#14532d,stroke:#4ade80;
    classDef c3h fill:#ca8a04,color:#fff,stroke:#a16207,stroke-width:2px;
    classDef c3 fill:#fef9c3,color:#713f12,stroke:#facc15;
    classDef c4h fill:#9333ea,color:#fff,stroke:#7e22ce,stroke-width:2px;
    classDef c4 fill:#f3e8ff,color:#581c87,stroke:#c084fc;
    classDef topp fill:#dc2626,color:#fff,stroke:#991b1b,stroke-width:3px;

    subgraph SK1 [📘 KAP 1 - Grunnkunnskap]
        direction TB
        1A["Tallmengder"]:::c1
        1C["Brøk, SFF, MFM"]:::c1
        1D["Potensregler"]:::c1
        1F["Logikk & Bevis"]:::c1
    end

    subgraph SK2 [🟢 KAP 2 - Algebra]
        direction TB
        2A["Bokstavregning"]:::c2
        2B["Kvadratsetninger"]:::c2
        2C["Faktorisering"]:::c2
        2D["Fullstendige kvadrater"]:::c2
        2E["Rasjonale uttrykk"]:::c2
    end

    subgraph SK3 [🟡 KAP 3 - Likninger]
        direction TB
        3A["Førstegradslikninger"]:::c3
        3D["ABC-formelen"]:::c3
        3G["Tredjegradslikninger<br>& Polynomdivisjon"]:::c3
    end

    subgraph SK4 [🟣 KAP 4 - Funksjoner]
        direction TB
        4B["Lineære funksjoner"]:::c4
        4C["Andregradsfunksjoner"]:::c4
        4H["Funksjonsdrøfting f'(x)"]:::c4
    end

    EX["🏆 EKSAMEN"]:::topp

    1A --> 2A
    1C --> 2A
    1D --> 2A
    1F -.->|tenkning| 3G
    2A --> 2B & 3A
    2B --> 2C & 3D
    2C --> 3D & 3G
    2D --> 3D
    2E --> 3D
    3A --> 4B
    3D --> 3G & 4C
    3G --> 4H
    4B --> 4H
    4C --> 4H
    4H --> EX
`;

const prereqMap = {
    '1D': {
        title: "Potenser og Standardform",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Gjentatt Multiplikasjon]:::basic --> Z{Potensregning}:::main\n B[Tallmengder]:::basic --> Z`
    },
    '2B': {
        title: "Kvadratsetninger",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Bokstavregning]:::basic --> Z{Kvadratsetninger}:::main\n B[Potensregning]:::basic --> Z\n C[Parentesregning]:::step --> Z`
    },
    '2C': {
        title: "Faktorisering",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Felles faktor utenfor parentes]:::step --> Z{Faktorisering}:::main\n B[Kvadratsetningene baklengs]:::step --> Z`
    },
    '3D': {
        title: "ABC-formelen",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Kvadratrøtter]:::basic --> Z{ABC-formelen}:::main\n B[Faktorisering 2. grad]:::step --> Z\n C[Kvadratsetninger]:::step --> Z`
    },
    '3G': {
        title: "Tredjegradslikninger",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Grunnleggende Algebra]:::basic --> D(Nullpunktsetningen):::step\n A --> E(Polynomdivisjon):::step\n B[ABC-formelen]:::step --> F(Løse rest-polynomet):::step\n D -->|Finner første x| E\n E -->|Gir andregradspolynom| Z{Tredjegradslikninger}:::main\n F -->|Løser rest| Z`
    },
    '4C': {
        title: "Andregradsfunksjoner",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Koordinatsystemet]:::basic --> Z{Andregradsfunksjoner}:::main\n B[Symmetriakse & Toppunkt]:::step --> Z\n C[ABC-formelen]:::step -->|Finner nullpunkter| Z`
    },
    '4H': {
        title: "Funksjonsdrøfting",
        graph: `flowchart TD\n classDef main fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;\n classDef step fill:#fef08a,color:#854d0e,stroke:#ca8a04,stroke-width:2px;\n classDef basic fill:#f3f4f6,color:#374151,stroke:#9ca3af;\n A[Stigningstall]:::basic --> D(Momentan vekstfart):::step\n B[Polynomregning]:::basic --> E(Derivasjonsregler):::step\n C[Faktorisering]:::step --> F(Fortegnsskjema):::step\n D --> E\n E -->|Finner f'(x)| Z{Funksjonsdrøfting}:::main\n F -->|Finner bunn/topp-punkt| Z`
    }
};

window.togglePrereqInline = async function(btn, containerId, subId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (container.style.display === 'block') {
        container.style.display = 'none';
        btn.innerHTML = 'Hva må jeg kunne? 🗺️';
    } else {
        container.style.display = 'block';
        btn.innerHTML = 'Skjul kart 🗺️';
        if (!container.dataset.rendered) {
            const data = prereqMap[subId];
            container.innerHTML = '<h4 style="margin-top:0; color:var(--text-muted);">Byggeklosser for ' + data.title + '</h4><div class="mermaid">' + data.graph + '</div>';
            try {
                await mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
                container.dataset.rendered = 'true';
            } catch(e) { console.error(e); }
        }
    }
};

async function renderOneGraph(containerId, graphStr) {
    const el = document.getElementById(containerId);
    if (!el || el.dataset.rendered) return;
    el.innerHTML = '<div class="mermaid">' + graphStr + '</div>';
    try {
        await mermaid.run({ nodes: el.querySelectorAll('.mermaid') });
        el.dataset.rendered = 'true';
    } catch(e) { console.error('Mermaid error in ' + containerId, e); }
}

function renderGlobalMap() {
    renderOneGraph('global-mermaid-container', globalMermaidGraph);
    renderOneGraph('kap1-mermaid-container', kap1Graph);
    renderOneGraph('kap2-mermaid-container', kap2Graph);
    renderOneGraph('kap3-mermaid-container', kap3Graph);
    renderOneGraph('kap4-mermaid-container', kap4Graph);
}

window.openMapModal = async function(type = 'global') {
    const overlay = document.getElementById('map-modal-overlay');
    const modalContainer = document.getElementById('modal-mermaid-container');
    if (!overlay || !modalContainer) return;
    
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Determine which graph to show
    let graphToRender = modalMermaidGraph;
    let titleText = '🔗 Helhetsbilde – Slik henger alt sammen i 1T';
    if (type === 'kap1') { graphToRender = kap1Graph; titleText = '📘 Kapittel 1 – Detaljert tankekart'; }
    if (type === 'kap2') { graphToRender = kap2Graph; titleText = '🟢 Kapittel 2 – Detaljert tankekart'; }
    if (type === 'kap3') { graphToRender = kap3Graph; titleText = '🟡 Kapittel 3 – Detaljert tankekart'; }
    if (type === 'kap4') { graphToRender = kap4Graph; titleText = '🟣 Kapittel 4 – Detaljert tankekart'; }
    
    const headerSpan = overlay.querySelector('.map-modal-header span');
    if (headerSpan) headerSpan.innerText = titleText;
    
    // Always re-render when switching to ensure correct graph is shown
    modalContainer.innerHTML = '<div class="mermaid">' + graphToRender + '</div>';
    try {
        // Need to wait slightly for the DOM to update before running mermaid
        setTimeout(async () => {
            try {
                await mermaid.run({ nodes: modalContainer.querySelectorAll('.mermaid') });
            } catch(e) { console.error(e); }
        }, 10);
    } catch(e) { console.error(e); }
};

window.closeMapModal = function() {
    const overlay = document.getElementById('map-modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
};


// ── DOMContentLoaded ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    if (typeof mermaid !== 'undefined') mermaid.initialize({ startOnLoad: false, theme: 'default' });

    
    // Hamburger meny logikk
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    
// Erstattet med global

    if (hamburgerBtn && sidebar && sidebarBackdrop) {
        hamburgerBtn.addEventListener('click', () => {
            // Sjekk om vi er på en annen side (f.eks. forsiden), da må vi bytte til oppgaver-view først
            const oppgaverView = document.getElementById('oppgaver-view');
            if (oppgaverView && oppgaverView.classList.contains('hidden')) {
                window.location.hash = 'oppgaver';
                setTimeout(() => {
                    sidebar.classList.add('open');
                    sidebarBackdrop.style.display = 'block';
                    setTimeout(() => { sidebarBackdrop.classList.add('show'); }, 10);
                    document.body.style.overflow = 'hidden';
                }, 60); // Venter til viewet er vist
            } else {
                sidebar.classList.add('open');
                sidebarBackdrop.style.display = 'block';
                setTimeout(() => { sidebarBackdrop.classList.add('show'); }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
        
        sidebarBackdrop.addEventListener('click', window.closeMobileSidebar);
    }

    // Tema
    const themeBtn = document.getElementById('theme-toggle');
    let theme = 'dark';
    try { theme = localStorage.getItem('reel_theme') || 'dark'; } catch(e) {}
    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeBtn) themeBtn.querySelector('.theme-icon').textContent = '🌙';
    }
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.body.removeAttribute('data-theme');
                themeBtn.querySelector('.theme-icon').textContent = '☀️';
                try { localStorage.setItem('reel_theme', 'dark'); } catch(e) {}
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeBtn.querySelector('.theme-icon').textContent = '🌙';
                try { localStorage.setItem('reel_theme', 'light'); } catch(e) {}
            }
        });
    }

    // Bygg Tre-sidebar-meny
    const chapterList = document.getElementById('chapter-list');
    if (typeof window.fagsok !== 'undefined') {
        const icons = ['🔢', '🔣', '⚖️', '📈'];
        window.fagsok.forEach((kap, i) => {
            const group = document.createElement('li');
            group.className = 'chapter-group';
            group.setAttribute('data-group-id', kap.id);
            
            const btn = document.createElement('button');
            btn.className = 'chapter-btn';
            btn.innerHTML = `
                <div style="display:flex;align-items:center;gap:0.6rem">
                    <span class="chapter-btn-icon">${icons[i] || '📐'}</span>${kap.tittel}
                </div>
                <span class="chapter-chevron">▶</span>
            `;
            
            const subList = document.createElement('ul');
            subList.className = 'subchapter-list';
            
            kap.delkapitler.forEach(dk => {
                const subLi = document.createElement('li');
                const subBtn = document.createElement('button');
                subBtn.className = 'subchapter-btn';
                subBtn.setAttribute('data-id', `${kap.id}/${dk.id}`);
                subBtn.textContent = dk.tittel;
                subBtn.onclick = (e) => {
                    e.stopPropagation();
                    window.location.hash = `oppgaver/${kap.id}/${dk.id}`;
                };
                subLi.appendChild(subBtn);
                subList.appendChild(subLi);
            });
            
            btn.onclick = () => {
                const isExpanded = group.classList.contains('expanded');
                // Auto-kollapse andre kapitler for å holde det ryddig
                document.querySelectorAll('.chapter-group').forEach(g => g.classList.remove('expanded'));
                if (!isExpanded) {
                    group.classList.add('expanded');
                }
            };
            
            group.appendChild(btn);
            group.appendChild(subList);
            chapterList.appendChild(group);
        });
    }

    // Nav-knapper
    document.querySelectorAll('.navbar .nav-btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const t = btn.getAttribute('data-target');
            if (t) window.location.hash = t;
        });
    });

    // Søk
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('global-search');
    if (searchForm) {
        searchForm.addEventListener('submit', e => {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (q) window.location.hash = 'sok/' + encodeURIComponent(q);
        });
    }

    // Ukesplan-pil-knapper
    document.getElementById('prev-week-btn')?.addEventListener('click', () => { displayedWeek--; updateBanner(displayedWeek); });
    document.getElementById('next-week-btn')?.addEventListener('click', () => { displayedWeek++; updateBanner(displayedWeek); });

    // Router
    window.addEventListener('hashchange', handleRoute);
    setTimeout(handleRoute, 50);
});
