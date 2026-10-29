import { useCallback, useEffect, useState } from "react";

type Draft = { answers: Record<string, string>; ferdig: Record<string, boolean> };

function readDraft(key: string): Draft {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (!raw) return { answers: {}, ferdig: {} };
    const d = JSON.parse(raw) as Partial<Draft>;
    return { answers: d.answers || {}, ferdig: d.ferdig || {} };
  } catch {
    return { answers: {}, ferdig: {} };
  }
}

/** Tilstand for svar og «ferdig». Lagres lokalt som utkast til eleven leverer, slik at en omlasting ikke sletter svarene. */
export function useProveUtkast(storageKey: string) {
  const full = `mg-prove-utkast:${storageKey}`;
  const [draft, setDraft] = useState<Draft>({ answers: {}, ferdig: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDraft(readDraft(full));
    setReady(true);
  }, [full]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(full, JSON.stringify(draft));
    } catch {
      /* lagring er valgfritt */
    }
  }, [draft, full, ready]);

  const setAnswer = useCallback((id: string, v: string) => setDraft((d) => ({ ...d, answers: { ...d.answers, [id]: v } })), []);
  const setFerdig = useCallback((id: string, v: boolean) => setDraft((d) => ({ ...d, ferdig: { ...d.ferdig, [id]: v } })), []);
  const clear = useCallback(() => {
    setDraft({ answers: {}, ferdig: {} });
    try {
      window.localStorage.removeItem(full);
    } catch {
      /* ignorer */
    }
  }, [full]);

  return { answers: draft.answers, ferdig: draft.ferdig, setAnswer, setFerdig, clear };
}

export function formatKlokke(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const mm = String(m).padStart(2, "0");
  const sk = String(ss).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${sk}` : `${mm}:${sk}`;
}
