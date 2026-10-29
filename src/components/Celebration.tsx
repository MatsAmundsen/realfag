import { useEffect, useRef } from "react";
import { Award, X } from "lucide-react";
import { BADGE_META } from "@/lib/progress";
import { useProgressStore } from "@/lib/progress-store";
import { QuizClip } from "./QuizOverlay";

export function CelebrationHost() {
  const celebration = useProgressStore((s) => s.celebration);
  const dismiss = useProgressStore((s) => s.dismissCelebration);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  /** Siste fokuserte element utenfor feiringen: dit går fokus tilbake når den lukkes. */
  const sistFokus = useRef<HTMLElement | null>(null);
  const open = Boolean(celebration);
  const isQuizWin = celebration?.kind === "quiz";
  const isQuizFail = celebration?.kind === "quiz-fail";
  const isQuizClip = isQuizWin || isQuizFail;

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && !t.closest(".cele-overlay")) sistFokus.current = t;
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, []);

  // Modal: fokus inn når den åpnes, Tab holdes inni, Escape lukker, og fokus går tilbake når den er lukket.
  useEffect(() => {
    if (!open) return;
    const opener = sistFokus.current;
    cardRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Fanges først, slik at et quiz-vindu under ikke også lukkes av samme tastetrykk.
        e.preventDefault();
        e.stopPropagation();
        dismiss();
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const fokuserbare = Array.from(card.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"));
      if (fokuserbare.length === 0) {
        e.preventDefault();
        card.focus();
        return;
      }
      const første = fokuserbare[0]!;
      const siste = fokuserbare[fokuserbare.length - 1]!;
      const aktiv = document.activeElement;
      if (!card.contains(aktiv) || aktiv === card) {
        e.preventDefault();
        (e.shiftKey ? siste : første).focus();
      } else if (e.shiftKey && aktiv === første) {
        e.preventDefault();
        siste.focus();
      } else if (!e.shiftKey && aktiv === siste) {
        e.preventDefault();
        første.focus();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      // Knappen som åpnet feiringen kan være borte (f.eks. «Ja, lever»): bruk da elementet som er merket for det, ellers hovedoverskriften.
      let mål: HTMLElement | null = opener && opener.isConnected ? opener : null;
      mål ??= document.querySelector<HTMLElement>("[data-fokus-etter-feiring]") ?? document.querySelector<HTMLElement>("h1");
      if (mål && mål.tabIndex < 0 && !mål.hasAttribute("tabindex")) mål.setAttribute("tabindex", "-1");
      mål?.focus();
    };
  }, [open, dismiss]);

  useEffect(() => {
    if (!celebration) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const colors = isQuizFail
      ? ["#fb7185", "#f59e0b", "#ef4444", "#fde68a", "#ffffff"]
      : isQuizWin
        ? ["#fbbf24", "#f59e0b", "#fde68a", "#34d399", "#ffffff"]
        : ["#6366f1", "#34d399", "#818cf8", "#e2e8f0", "#f59e0b"];
    const bits = Array.from({ length: isQuizClip ? 72 : 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 120,
      r: isQuizWin ? 2.5 + Math.random() * 3 : 3 + Math.random() * 4,
      vx: -1.4 + Math.random() * 2.8,
      vy: 2.4 + Math.random() * 3.2,
      rot: Math.random() * Math.PI,
      vr: -0.12 + Math.random() * 0.24,
      color: colors[Math.floor(Math.random() * colors.length)]!,
    }));
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      bits.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.rot += b.vr;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.r, -b.r / 2, b.r * 2, b.r);
        ctx.restore();
      });
      if (frame < (isQuizClip ? 200 : 140)) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [celebration, isQuizWin, isQuizFail, isQuizClip]);

  if (!celebration) return null;

  return (
    <div className={`cele-overlay${isQuizWin ? " is-quiz-win" : ""}${isQuizFail ? " is-quiz-fail" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cele-title">
      <canvas ref={canvasRef} className="cele-canvas" aria-hidden="true" />
      <div className="cele-card" ref={cardRef} tabIndex={-1}>
        <button type="button" className="quiz-close-btn cele-close" onClick={dismiss} aria-label="Lukk">
          <X size={18} />
        </button>
        {isQuizClip ? (
          <QuizClip kind={isQuizWin ? "win" : "fail"} />
        ) : (
          <div className="cele-mark">
            <Award size={28} />
          </div>
        )}
        <h2 id="cele-title">{celebration.title}</h2>
        <p>{celebration.body}</p>
        {celebration.badges.length > 0 && (
          <ul className="cele-badges">
            {celebration.badges.map((id) => (
              <li key={id}>
                <strong>{BADGE_META[id]?.title || id}</strong>
                <span>{BADGE_META[id]?.desc}</span>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className="btn-primary" onClick={dismiss}>
          Fortsett
        </button>
      </div>
    </div>
  );
}

export function BadgeToast() {
  const queue = useProgressStore((s) => s.badgeQueue);
  useEffect(() => {
    if (!queue.length) return;
    const t = window.setTimeout(() => useProgressStore.setState({ badgeQueue: [] }), 4200);
    return () => window.clearTimeout(t);
  }, [queue]);
  if (!queue.length) return null;
  return (
    <div className="badge-toast show" role="status">
      {queue.map((id) => (
        <div className="badge-toast-item" key={id}>
          <div className="badge-toast-mark" aria-hidden="true">
            <Award size={16} />
          </div>
          <div>
            <strong>{BADGE_META[id]?.title}</strong>
            <span>{BADGE_META[id]?.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
