document.addEventListener("DOMContentLoaded", () => {
    // --- TEMA (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    let currentTheme = "dark";
    try {
        currentTheme = localStorage.getItem("theme") || "dark";
    } catch (e) {
        console.warn("localStorage er ikke tilgjengelig.");
    }
    
    if (currentTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            let newTheme = "dark";
            if (document.body.getAttribute("data-theme") === "light") {
                document.body.removeAttribute("data-theme");
                themeToggleBtn.textContent = "☀️";
            } else {
                document.body.setAttribute("data-theme", "light");
                themeToggleBtn.textContent = "🌙";
                newTheme = "light";
            }
            try {
                localStorage.setItem("theme", newTheme);
            } catch (e) {}
        });
    }

    initApp();

    function initApp() {
        const chapterList = document.getElementById("chapter-list");
        const taskContainer = document.getElementById("task-container");

    // --- UKESPLAN LOGIKK ---
    const ukesplan = {
        34: { kapId: null, underkap: null, tekst: "Uke 34 - Tirsdag: Grilling og oppstart. Torsdag: Strandheim." },
        35: { kapId: "kap1", underkap: "1A", tekst: "Uke 35 - Tirsdag: Kapittel 1A. Torsdag: Kapittel 1B/1D." },
        36: { kapId: "kap1", underkap: "1E", tekst: "Uke 36 - Tirsdag: Osloprøve. Torsdag: Kapittel 1E." },
        37: { kapId: "kap2", underkap: "2B", tekst: "Uke 37 - Tirsdag: Kapittel 2B. Torsdag: Kapittel 2C." },
        38: { kapId: "kap2", underkap: "2D", tekst: "Uke 38 - Tirsdag: Kapittel 2D. Torsdag: Kapittel 2E/F." },
        39: { kapId: "kap2", underkap: "2F", tekst: "Uke 39 - Tirsdag: Kapittel 2F. Torsdag: Prøve." },
        40: { kapId: null, underkap: null, tekst: "Uke 40 - Høstferie! Slapp av og lad batteriene." },
        41: { kapId: "kap3", underkap: "3A", tekst: "Uke 41 - Tirsdag: Kapittel 3A. Torsdag: Kapittel 3B/3C." },
        42: { kapId: "kap3", underkap: "3C", tekst: "Uke 42 - Tirsdag: Kapittel 3C/3D. Torsdag: Kapittel 3D." },
        43: { kapId: "kap3", underkap: "3E", tekst: "Uke 43 - Tirsdag: Kapittel 3E. Torsdag: Prøve." },
        44: { kapId: "kap3", underkap: "3F", tekst: "Uke 44 - Tirsdag: Kapittel 3F. Torsdag: OD-dag." },
        45: { kapId: "kap3", underkap: "3G", tekst: "Uke 45 - Tirsdag: Kapittel 3G. Torsdag: Kapittel 3G." },
        46: { kapId: "kap4", underkap: "4A", tekst: "Uke 46 - Tirsdag: Kapittel 4A. Torsdag: Kapittel 4A." },
        47: { kapId: "kap4", underkap: "4B", tekst: "Uke 47 - Tirsdag: Kapittel 4B. Torsdag: Prøve." },
        48: { kapId: "kap4", underkap: "4C", tekst: "Uke 48 - Tirsdag: Kapittel 4C. Torsdag: Kapittel 4D." },
        49: { kapId: "kap4", underkap: "4E", tekst: "Uke 49 - Tirsdag: Kapittel 4E. Torsdag: Kapittel 4F." },
        50: { kapId: "kap4", underkap: "4G", tekst: "Uke 50 - Tirsdag: Kapittel 4G. Torsdag: Kapittel 4G/4H." },
        51: { kapId: "kap4", underkap: "4H", tekst: "Uke 51 - Tirsdag: Kapittel 4H. Torsdag: Juleavslutning / siste skoledag." }
    };

    // Definerer hvilken oppgave-ID hvert underkapittel starter på
    const delkapittelStart = {
        "1A": "1.11", "1B": "1.28", "1C": "1.37", "1D": "1.54", "1E": "1.74", "1F": "1.88",
        "2A": "2.1", "2B": "2.4", "2C": "2.7", "2D": "2.10", "2E": "2.12", "2F": "2.15",
        "3A": "3.1", "3B": "3.4", "3C": "3.7", "3D": "3.11", "3E": "3.14", "3F": "3.15F", "3G": "3.18",
        "4A": "4.0", "4B": "4.8", "4C": "4.17", "4D": "4.23", "4E": "4.31", "4F": "4.37", "4G": "4.44", "4H": "4.50"
    };

    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        return Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    }

    const currWeek = getWeekNumber(new Date());
    let displayedWeek = currWeek;
    
    // Håndter Banner på skjermen
    const banner = document.getElementById("ukesplan-banner");
    const weekNumEl = document.getElementById("week-number");
    const weekTextEl = document.getElementById("week-text");
    const weekBtn = document.getElementById("week-link-btn");
    const prevWeekBtn = document.getElementById("prev-week-btn");
    const nextWeekBtn = document.getElementById("next-week-btn");

    function updateBanner(week) {
        banner.classList.remove("hidden");
        weekNumEl.textContent = week;
        
        if (ukesplan[week]) {
            weekTextEl.textContent = ukesplan[week].tekst;
            if (ukesplan[week].kapId) {
                weekBtn.style.display = "block";
                weekBtn.onclick = () => scrollToSubchapter(ukesplan[week].kapId, ukesplan[week].underkap);
            } else {
                weekBtn.style.display = "none";
            }
        } else if (week < 34) {
            weekTextEl.textContent = "Velkommen! Undervisningen for Matematikk 1T starter i uke 34.";
            weekBtn.style.display = "none";
        } else {
            weekTextEl.textContent = "Ingen plan lagt inn for denne uken.";
            weekBtn.style.display = "none";
        }
        
        if (prevWeekBtn) prevWeekBtn.style.visibility = (week > 33) ? "visible" : "hidden";
        if (nextWeekBtn) nextWeekBtn.style.visibility = (week < 52) ? "visible" : "hidden";
    }

    updateBanner(displayedWeek);

    if (prevWeekBtn) {
        prevWeekBtn.addEventListener("click", () => {
            displayedWeek--;
            updateBanner(displayedWeek);
        });
    }

    if (nextWeekBtn) {
        nextWeekBtn.addEventListener("click", () => {
            displayedWeek++;
            updateBanner(displayedWeek);
        });
    }

    function scrollToSubchapter(kapId, subKap) {
        const chapterBtns = document.querySelectorAll(".chapter-btn");
        const targetBtn = Array.from(chapterBtns).find(btn => btn.getAttribute("data-id") === kapId);
        if (targetBtn && !targetBtn.classList.contains("active")) {
            targetBtn.click();
        }

        const taskId = delkapittelStart[subKap];
        if (taskId) {
            setTimeout(() => {
                const taskEl = document.getElementById(`task-${taskId}`);
                if (taskEl) {
                    taskEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    taskEl.style.boxShadow = "0 0 40px rgba(34, 211, 238, 0.9)";
                    taskEl.style.borderColor = "var(--primary)";
                    taskEl.style.transform = "scale(1.02)";
                    
                    setTimeout(() => {
                        taskEl.style.boxShadow = "";
                        taskEl.style.borderColor = "";
                        taskEl.style.transform = "";
                    }, 2500);
                }
            }, 100);
        }
    }

    // --- BYGGING AV KAPITTELMENY OG OPPGAVER ---
    fagsok.forEach((kapittel) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.className = "chapter-btn";
        btn.textContent = kapittel.tittel;
        btn.setAttribute("data-id", kapittel.id);
        btn.onclick = () => { window.location.hash = "oppgaver/" + kapittel.id; };
        
        li.appendChild(btn);
        chapterList.appendChild(li);
    });

    function loadChapter(kapittelId, activeBtn) {
        document.querySelectorAll(".chapter-btn").forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");

        const kapData = fagsok.find(k => k.id === kapittelId);
        if (!kapData) return;

        taskContainer.innerHTML = `<h2>${kapData.tittel}</h2>`;

        kapData.delkapitler.forEach((delkap) => {
            // Legg til en overskrift for hvert delkapittel
            const delkapHeader = document.createElement("div");
            delkapHeader.className = "delkapittel-header";
            delkapHeader.innerHTML = `<h3 style="margin-top: 2rem; color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 0.5rem;">${delkap.tittel}</h3>`;
            taskContainer.appendChild(delkapHeader);

            delkap.oppgaver.forEach((oppgave) => {
                const article = document.createElement("article");
                article.className = "task-card";
                article.id = `task-${oppgave.id}`; 
                
                let html = `<h3 class="task-title">${oppgave.tittel}</h3>`;
                html += `<p>${oppgave.tekst}</p>`;
                
                if (oppgave.bilde) {
                    html += `<img src="${oppgave.bilde}" alt="Figur til ${oppgave.tittel}" class="task-image">`;
                }

                // Bygger knappene og innholdet for Hint og Fasit skjult under hver oppgave
                html += `
                    <div class="task-buttons">
                        <button class="hint-btn" onclick="toggleHint('hint-${oppgave.id}')">Vis hint 💡</button>
                        <button class="hint-btn fasit-btn" onclick="toggleSolution('fasit-${oppgave.id}')">Fasit ${oppgave.id} 📝</button>
                    </div>
                    <div id="hint-${oppgave.id}" class="hint-content">
                        ${oppgave.hint}
                    </div>
                    <div id="fasit-${oppgave.id}" class="solution-content">
                        <strong>Løsningsforslag:</strong><br><br>
                        ${oppgave.fasit}
                    </div>
                `;
                
                article.innerHTML = html;
                taskContainer.appendChild(article);
            });
        });

        // Re-render KaTeX for nytt innhold
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(taskContainer, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
    }

    // --- NAVIGASJON MELLOM FANER (URL ROUTING) ---
    window.goToRessurser = function() { window.location.hash = "ressurser"; window.scrollTo(0,0); };
    let programmeringLastet = false;
    let ressurserLastet = false;

    function handleRoute() {
        let hash = window.location.hash.substring(1);
        if (!hash) hash = "oppgaver";
        
        const parts = hash.split("/");
        const mainView = parts[0];
        const subView = parts[1];

        // Oppdater knapper i hovedmeny
        document.querySelectorAll(".navbar .nav-btn").forEach(b => b.classList.remove("active"));
        const activeNavBtn = document.querySelector(`.navbar .nav-btn[data-target='${mainView}']`);
        if (activeNavBtn) activeNavBtn.classList.add("active");

        // Skjul alle views først
        document.getElementById("oppgaver-view").classList.add("hidden");
        document.getElementById("programmering-view").classList.add("hidden");
        document.getElementById("ressurser-view").classList.add("hidden");
        document.getElementById("search-view").classList.add("hidden");

        // Vis riktig view og last innhold
        if (mainView === "programmering") {
            document.getElementById("programmering-view").classList.remove("hidden");
            if (!programmeringLastet) {
                loadProgrammering();
                programmeringLastet = true;
            }
        } else if (mainView === "ressurser") {
            document.getElementById("ressurser-view").classList.remove("hidden");
            if (!ressurserLastet) {
                loadRessurser();
                ressurserLastet = true;
            }
        } else if (mainView === "sok") {
            document.getElementById("search-view").classList.remove("hidden");
            loadSearchResults(subView ? decodeURIComponent(subView) : "");
        } else {
            // Standard: Oppgaver
            document.getElementById("oppgaver-view").classList.remove("hidden");
            if (subView) {
                const chapBtn = document.querySelector(`.chapter-btn[data-id='${subView}']`);
                if (chapBtn) loadChapter(subView, chapBtn);
            }
        }
    }

    // Lytt på endringer i URL
    window.addEventListener("hashchange", handleRoute);

    // Oppdater hovedmenyen til å endre hash
    document.querySelectorAll(".navbar .nav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const target = e.target.getAttribute("data-target");
            if (target) {
                window.location.hash = target;
            }
        });
    });

    // Kaller funksjonen en gang ved oppstart for å lese eksisterende URL
    setTimeout(handleRoute, 50);

    function loadRessurser() {
        const container = document.getElementById("ressurser-container");
        container.innerHTML = "";
        if (typeof fagstoff !== 'undefined' && fagstoff.length > 0) {
            
            // Lag knapperad
            const nav = document.createElement("div");
            nav.style.display = "flex";
            nav.style.gap = "1rem";
            nav.style.justifyContent = "center";
            nav.style.flexWrap = "wrap";
            nav.style.marginBottom = "2rem";
            
            // Lag innholdscontainer
            const contentArea = document.createElement("div");
            
            fagstoff.forEach((tema, index) => {
                const btn = document.createElement("button");
                btn.className = "nav-btn";
                // Style knappen slik at den ligner de andre fanene, men kanskje litt mindre
                btn.style.padding = "10px 20px";
                btn.style.borderRadius = "8px";
                btn.style.border = "none";
                btn.style.cursor = "pointer";
                btn.style.fontWeight = "bold";
                btn.style.backgroundColor = index === 0 ? "var(--primary)" : "var(--card-bg)";
                btn.style.color = index === 0 ? "white" : "var(--text-main)";
                
                // Bruk tittel, men rens bort "Fagbibliotek: " for knappen
                let shortTitle = tema.tittel.replace("Fagbibliotek: ", "");
                btn.textContent = shortTitle;
                
                // Artikkel for innhold
                const article = document.createElement("article");
                article.className = "task-card fagstoff-article";
                article.style.display = index === 0 ? "block" : "none";
                article.innerHTML = `<h3 class="task-title" style="margin-bottom: 1rem;">${tema.tittel}</h3><div class="fagstoff-content">${tema.html}</div>`;
                
                btn.addEventListener("click", () => {
                    // Reset buttons
                    Array.from(nav.children).forEach(b => {
                        b.style.backgroundColor = "var(--card-bg)";
                        b.style.color = "var(--text-main)";
                    });
                    btn.style.backgroundColor = "var(--primary)";
                    btn.style.color = "white";
                    
                    // Skjul alle artikler
                    Array.from(contentArea.children).forEach(a => a.style.display = "none");
                    article.style.display = "block";
                });
                
                nav.appendChild(btn);
                contentArea.appendChild(article);
            });
            
            container.appendChild(nav);
            container.appendChild(contentArea);
            
            // Render KaTeX for alt innhold i ressurser
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(container, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ]
                });
            }
            
        } else {
            container.innerHTML = "<p>Ingen ressurser funnet.</p>";
        }
    }
    function loadProgrammering() {
        const progContainer = document.getElementById("prog-task-container");
        
        if (typeof programmeringData === 'undefined') {
            progContainer.innerHTML = "<p>Ingen programmeringsoppgaver funnet.</p>";
            return;
        }

        programmeringData.forEach((oppgave) => {
            const article = document.createElement("article");
            article.className = "task-card";
            article.id = `prog-task-${oppgave.id}`; 
            
            let html = `<h3 class="task-title">${oppgave.tittel}</h3>`;
            html += `<p>${oppgave.tekst}</p>`;
            
            html += `
                <div class="task-buttons">
                    <button class="hint-btn" onclick="toggleHint('hint-${oppgave.id}')">Vis hint 💡</button>
                    <button class="hint-btn fasit-btn" onclick="toggleSolution('fasit-${oppgave.id}')">Fasit 📝</button>
                </div>
                <div id="hint-${oppgave.id}" class="hint-content">
                    ${oppgave.hint}
                </div>
                <div id="fasit-${oppgave.id}" class="solution-content">
                    <strong>Løsningsforslag:</strong><br><br>
                    ${oppgave.fasit}
                </div>
            `;
            
            article.innerHTML = html;
            progContainer.appendChild(article);
        });
    }
    // --- SØKEFUNKSJON ---
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("global-search");
    
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Forhindre sideoppdatering
            const query = searchInput.value.trim();
            if (query.length > 0) {
                window.location.hash = "sok/" + encodeURIComponent(query);
            }
        });
    }

    function loadSearchResults(query) {
        const container = document.getElementById("search-results-container");
        const statusEl = document.getElementById("search-status");
        if (!container || !statusEl) return;
        
        container.innerHTML = ""; // Tøm tidligere søk
        
        // Oppdater tekst i søkefeltet dersom vi navigerte via lenke
        if (searchInput && searchInput.value !== query) {
            searchInput.value = query;
        }
        
        if (!query) {
            statusEl.textContent = "Skriv noe i søkefeltet og trykk Enter for å søke.";
            return;
        }

        const lowerQuery = query.toLowerCase();
        let matchCount = 0;
        
        statusEl.textContent = `Søker etter "${query}"...`;
        
        // Hjelpefunksjon for å bygge oppgave-kort i søkeresultat
        const buildTaskHTML = (oppgave, contextName, kapId) => {
            const article = document.createElement("article");
            article.className = "task-card";
            let html = `<h4 style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${contextName}</h4>`;
            html += `<h3 class="task-title">${oppgave.tittel}</h3>`;
            html += `<p>${oppgave.tekst}</p>`;
            
            if (oppgave.bilde) {
                html += `<img src="${oppgave.bilde}" class="task-image" alt="Figur">`;
            }

            html += `
                <div class="task-buttons">
                    <button class="hint-btn" onclick="toggleHint('search-hint-${oppgave.id}')">Vis hint 💡</button>
                    <button class="hint-btn fasit-btn" onclick="toggleSolution('search-fasit-${oppgave.id}')">Fasit 📝</button>
                    ${kapId ? `<button class="hint-btn" style="background: var(--card-bg); border: 1px solid var(--primary);" onclick="window.location.hash='oppgaver/${kapId}'">Gå til kapittel</button>` : ""}
                </div>
                <div id="search-hint-${oppgave.id}" class="hint-content">${oppgave.hint}</div>
                <div id="search-fasit-${oppgave.id}" class="solution-content"><strong>Løsningsforslag:</strong><br><br>${oppgave.fasit}</div>
            `;
            
            article.innerHTML = html;
            container.appendChild(article);
            matchCount++;
        };

        // 1. Søk i vanlig pensum (fagsok)
        if (typeof fagsok !== 'undefined') {
            fagsok.forEach(kap => {
                kap.delkapitler.forEach(delkap => {
                    delkap.oppgaver.forEach(oppgave => {
                        const searchStr = `${oppgave.tittel} ${oppgave.tekst} ${oppgave.hint} ${oppgave.fasit}`.toLowerCase();
                        if (searchStr.includes(lowerQuery)) {
                            buildTaskHTML(oppgave, `Matematikk 1T > ${kap.tittel} > ${delkap.tittel}`, kap.id);
                        }
                    });
                });
            });
        }

        // 2. Søk i programmering (programmeringData)
        if (typeof programmeringData !== 'undefined') {
            programmeringData.forEach(oppgave => {
                const searchStr = `${oppgave.tittel} ${oppgave.tekst} ${oppgave.hint} ${oppgave.fasit}`.toLowerCase();
                if (searchStr.includes(lowerQuery)) {
                    buildTaskHTML(oppgave, `Programmering`, null);
                }
            });
        }

        // 3. Søk i fagstoff
        if (typeof fagstoff !== 'undefined') {
            fagstoff.forEach(tema => {
                const searchStr = `${tema.tittel} ${tema.html}`.toLowerCase();
                if (searchStr.includes(lowerQuery)) {
                    const article = document.createElement("article");
                    article.className = "task-card fagstoff-article";
                    article.innerHTML = `<h4 style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Fagbibliotek</h4>
                                         <h3 class="task-title" style="margin-bottom: 1rem;">${tema.tittel}</h3>
                                         <div class="fagstoff-content">${tema.html}</div>`;
                    container.appendChild(article);
                    matchCount++;
                }
            });
        }

        // Oppdater status
        if (matchCount === 0) {
            statusEl.textContent = `Fant ingen treff for "${query}".`;
        } else {
            statusEl.textContent = `Fant ${matchCount} treff for "${query}".`;
        }
        
        // Re-render KaTeX
        if (typeof renderMathInElement === 'function') {
            renderMathInElement(container, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
    }

    } // Slutt på initApp
}); // Her slutter document.addEventListener("DOMContentLoaded", () => {

// Funksjoner for å toggle Hint og Fasit (Må ligge globalt)
function toggleHint(hintId) {
    const hintDiv = document.getElementById(hintId);
    hintDiv.classList.toggle("visible");
}

window.toggleSolution = function(fasitId) {
    const fasitDiv = document.getElementById(fasitId);
    fasitDiv.classList.toggle("visible");
}