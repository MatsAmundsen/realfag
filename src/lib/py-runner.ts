const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

type Pyodide = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  setStdin: (opts: { stdin: () => string }) => void;
};

let pyodidePromise: Promise<Pyodide> | null = null;

function loadPyodideRuntime(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    const w = window as Window & {
      loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
    };
    if (typeof w.loadPyodide !== "function") {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = PYODIDE_INDEX + "pyodide.js";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Klarte ikke å laste Python. Sjekk nettilkoblingen."));
        document.head.appendChild(s);
      });
    }
    if (typeof w.loadPyodide !== "function") {
      throw new Error("Python-runtime mangler.");
    }
    return w.loadPyodide({ indexURL: PYODIDE_INDEX });
  })();
  return pyodidePromise;
}

export async function runPythonEditor(id: string | null) {
  if (!id) return;
  const ta = document.getElementById(`${id}-code`) as HTMLTextAreaElement | null;
  const out = document.getElementById(`${id}-out`);
  if (!ta || !out) return;
  out.classList.remove("py-out-err");
  out.textContent = "Laster Python … (første gang kan ta noen sekunder)";
  let buffer = "";
  try {
    const py = await loadPyodideRuntime();
    out.textContent = "Kjører …";
    py.setStdout({ batched: (s) => { buffer += s.endsWith("\n") ? s : `${s}\n`; } });
    py.setStderr({ batched: (s) => { buffer += s.endsWith("\n") ? s : `${s}\n`; } });
    py.setStdin({
      stdin: () => {
        const v = window.prompt("Programmet kaller input():");
        return v === null ? "" : `${v}\n`;
      },
    });
    const timed = new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error("Koden kjørte for lenge. Sjekk at while-løkken stopper.")), 8000),
    );
    await Promise.race([py.runPythonAsync(ta.value), timed]);
    out.textContent = buffer.trimEnd() === "" ? "(ingen utskrift — husk print(...))" : buffer;
  } catch (err) {
    out.classList.add("py-out-err");
    const msg = err instanceof Error ? err.message : String(err);
    out.textContent = (buffer ? `${buffer}\n` : "") + msg;
  }
}

if (typeof window !== "undefined") {
  (window as Window & { __mgRunPython?: typeof runPythonEditor }).__mgRunPython = runPythonEditor;
}

export function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url, window.location.origin);
    if (u.hostname === "youtu.be") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      return id && id.length === 11 ? id : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v && v.length === 11) return v;
      const parts = u.pathname.split("/").filter(Boolean);
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]?.length === 11) return parts[embedIdx + 1];
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1]?.length === 11) return parts[shortsIdx + 1];
    }
  } catch {
    /* ignore */
  }
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m?.[1] ?? null;
}

export function scrollFagTarget(root: ParentNode | null, id: string) {
  if (!id) return;
  const scope = root || document;
  let target: HTMLElement | null = null;
  try {
    target = scope.querySelector("#" + CSS.escape(id));
  } catch {
    /* ignore */
  }
  if (!target) target = document.getElementById(id);
  if (!target) return;

  let node: HTMLElement | null = target;
  while (node) {
    if (node.tagName === "DETAILS") (node as HTMLDetailsElement).open = true;
    node = node.parentElement;
  }

  const nav = document.querySelector(".navbar") as HTMLElement | null;
  const offset = (nav?.getBoundingClientRect().height ?? 72) + 12;
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
