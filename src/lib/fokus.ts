import { useCallback, useEffect, useRef } from "react";

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
