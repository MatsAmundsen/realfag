// Finner overlapp mellom tegnede kurver/linjer/punkter og tekstbokser i .task-figure-1p-SVG-er.
// Bruk i nettleser: window.__figOverlap(rootEl) → [{fig, text, el}].
// Tekst med halo (paint-order="stroke", stroke-width ≥ 3) som tegnes ETTER linja er lesbar og regnes som akseptert
// (telles i window.__figOverlapAccepted). Akse-tall (data-ax) ligger under kurvene; de flagges ved
// enhver berøring – tallets boks utvidet med halve strekbredden (ikke bare kjernen). Tekst mot tekst og tekst utenfor viewBox flagges alltid.
export const figOverlapSource = `
window.__figOverlap = (root) => {
  const out = []; window.__figOverlapAccepted = 0; window.__figOverlapAcc = [];
  for (const svg of root.querySelectorAll(".task-figure-1p svg")) {
    const fig = svg.closest("figure").querySelector("figcaption")?.textContent || "?";
    const texts = [...svg.querySelectorAll("text")].filter((t) => t.textContent.trim()).map((t) => ({ t: t.textContent.trim(), b: t.getBBox(), el: t,
      ax: t.hasAttribute("data-ax"), halo: t.getAttribute("paint-order") === "stroke" && parseFloat(t.getAttribute("stroke-width") || "0") >= 3 }));
    const holesOf = (el) => { const m = el.getAttribute("mask"); if (!m) return []; const id = m.match(/#([^)]+)/)[1];
      return [...svg.querySelector("#" + CSS.escape(id)).querySelectorAll("rect[fill=black]")].map((r) => r.getBBox()); };
    const clipOf = (el) => { const c = el.getAttribute("clip-path"); if (!c) return null; const r = svg.querySelector("#" + CSS.escape(c.match(/#([^)]+)/)[1]) + " rect"); return r ? r.getBBox() : null; };
    const inB = (p, b, pad = 0) => p.x >= b.x - pad && p.x <= b.x + b.width + pad && p.y >= b.y - pad && p.y <= b.y + b.height + pad;
    // Datategning: alt med clip-path eller mask, pluss sirkler (punkter)
    const els = [...svg.querySelectorAll("path,line,polyline,circle")].filter((e) => e.hasAttribute("clip-path") || e.tagName === "circle")
      .filter((e) => !e.closest("defs,mask,clipPath,marker"));
    for (const el of els) {
      const holes = holesOf(el), clip = clipOf(el);
      const sw = parseFloat(el.getAttribute("stroke-width") || "0") / 2;
      let pts = [];
      if (el.tagName === "circle") { const cx = +el.getAttribute("cx"), cy = +el.getAttribute("cy"), r = +el.getAttribute("r");
        for (let a = 0; a < 16; a++) pts.push({ x: cx + r * Math.cos(a * Math.PI / 8), y: cy + r * Math.sin(a * Math.PI / 8) }); pts.push({ x: cx, y: cy }); }
      else { const L = el.getTotalLength(); for (let d = 0; d <= L; d += 1) { const q = el.getPointAtLength(d); pts.push({ x: q.x, y: q.y }); } }
      const hit = new Set();
      for (const p of pts) {
        if (clip && !inB(p, clip)) continue;
        if (holes.some((h) => inB(p, h))) continue;
        for (const t of texts) if (inB(p, t.b, el.tagName === "circle" ? 0 : Math.max(sw, 1)) && !(el.tagName === "circle" && inB({ x: t.b.x + t.b.width / 2, y: t.b.y + t.b.height / 2 }, el.getBBox()))) hit.add(t);
      }
      for (const T of hit) { const t = T.t;
        if (T && T.halo && !T.ax && (el.compareDocumentPosition(T.el) & Node.DOCUMENT_POSITION_FOLLOWING)) { window.__figOverlapAccepted++; (window.__figOverlapAcc ||= []).push(fig + " | " + t + " | " + el.getAttribute("stroke")); continue; }
        out.push({ fig, text: t, el: el.tagName + (el.getAttribute("stroke") || el.getAttribute("fill") || "").slice(0, 22) }); }
    }
    // Etikettsirkler (r ≥ 8, fylt) som legger seg over en kurve/linje lager hull i den – flagges
    for (const c of svg.querySelectorAll("circle")) { const r = +c.getAttribute("r"); if (r < 8 || (c.getAttribute("fill") || "none") === "none") continue;
      const cx = +c.getAttribute("cx"), cy = +c.getAttribute("cy");
      for (const el of els) { if (el.tagName === "circle" || !(el.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
        const clip = clipOf(el), L = el.getTotalLength(); let hit = false;
        for (let d = 0; d <= L && !hit; d += 1) { const q = el.getPointAtLength(d); if (clip && !inB(q, clip)) continue; if (Math.hypot(q.x - cx, q.y - cy) < r + 1) hit = true; }
        if (hit) out.push({ fig, text: "sirkel@" + cx + "," + cy, el: "dekker " + el.tagName + (el.getAttribute("stroke") || "").slice(0, 22) }); } }
    // Tekst utenfor viewBox (avkuttet)
    const vb = svg.viewBox.baseVal;
    for (const t of texts) if (t.b.x < vb.x - 0.5 || t.b.y < vb.y - 0.5 || t.b.x + t.b.width > vb.x + vb.width + 0.5 || t.b.y + t.b.height > vb.y + vb.height + 0.5) out.push({ fig, text: t.t, el: "utenfor viewBox" });
    // Tekst mot tekst
    for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i].b, c = texts[j].b;
      const ox = Math.min(a.x + a.width, c.x + c.width) - Math.max(a.x, c.x), oy = Math.min(a.y + a.height, c.y + c.height) - Math.max(a.y, c.y);
      if (ox > 0.5 && oy > 2) out.push({ fig, text: texts[i].t + " ↔ " + texts[j].t, el: "text" });
    }
  }
  return out;
};`;
