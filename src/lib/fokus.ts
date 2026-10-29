import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * Flytter fokus til et logisk element etter neste visning. Bruk når handlingen fjerner eller bytter ut
 * knappen som hadde fokus (ellers faller fokus til body). Elementet må finnes i DOM etter oppdateringen.
 */
export function useFokusEtterVisning() {
  const mål = useRef<(() => HTMLElement | null | undefined) | null>(null);
  useEffect(() => {
    const finn = mål.current;
    if (!finn) return;
    mål.current = null;
    finn()?.focus();
  });
  return useCallback((finn: () => HTMLElement | null | undefined) => {
    mål.current = finn;
  }, []);
}

const FOKUSERBARE = "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

/**
 * Modal dialog (samme mønster som feiringen i Celebration.tsx): Tab holdes inni dialogen og Escape kaller `lukk`.
 * Fokus inn og tilbake til knappen flyttes av kallestedet med `useFokusEtterVisning`, siden dialogen og knappen bytter plass i DOM.
 */
export function useDialogFelle(ref: RefObject<HTMLElement | null>, åpen: boolean, lukk: () => void) {
  const lukkRef = useRef(lukk);
  useEffect(() => {
    lukkRef.current = lukk;
  });
  useEffect(() => {
    if (!åpen) return;
    const onKey = (e: KeyboardEvent) => {
      const dialog = ref.current;
      if (!dialog) return;
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        lukkRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const fokuserbare = Array.from(dialog.querySelectorAll<HTMLElement>(FOKUSERBARE));
      if (fokuserbare.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const første = fokuserbare[0]!;
      const siste = fokuserbare[fokuserbare.length - 1]!;
      const aktiv = document.activeElement;
      if (!dialog.contains(aktiv) || aktiv === dialog) {
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
    return () => window.removeEventListener("keydown", onKey, true);
  }, [åpen, ref]);
}
