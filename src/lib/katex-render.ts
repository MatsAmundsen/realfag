import katex from "katex";
import renderMathInElement from "katex/contrib/auto-render";

function cleanTex(tex: string): string {
  return tex
    .replace(/\u000c\s*rac/g, "\\frac")
    .replace(/\u0009\s*ext/g, "\\text")
    .replace(/&nbsp;/g, " ")
    .replace(new RegExp("&" + "amp;", "g"), "&")
    .replace(new RegExp("&" + "lt;", "g"), "<")
    .replace(new RegExp("&" + "gt;", "g"), ">")
    .replace(new RegExp("&" + "minus;", "g"), "-")
    .replace(new RegExp("&" + "pi;", "g"), "\\pi");
}

function renderTex(tex: string, display: boolean): string {
  const cleaned = cleanTex(tex);
  try {
    return katex.renderToString(cleaned, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: "html",
    });
  } catch {
    return display ? `$$${cleaned}$$` : `$${cleaned}$`;
  }
}

/** Turn task/exam HTML with $math$, **bold** and a)/b) markers into rendered HTML. */
export function formatTaskHtml(html: string): string {
  if (!html) return "";
  let s = html
    .replace(/\u000c\s*rac/g, "\\frac")
    .replace(/\u0009\s*ext/g, "\\text")
    .replace(
      /<button[^>]*goToRessurser[\s\S]*?<\/button>/gi,
      '<a class="hint-btn" href="/ressurser">Lær mer i fagbiblioteket</a>',
    );

  const stash: string[] = [];
  s = s.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>|<svg[\s\S]*?<\/svg>/gi, (m) => {
    stash.push(m);
    return `\u0000${stash.length - 1}\u0000`;
  });

  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex: string) => renderTex(tex, true));
  s = s.replace(/\$([^$]+)\$/g, (_, tex: string) => renderTex(tex, false));
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|>)(\s*)([a-h]\))(\s)/gi, "$1$2<strong>$3</strong>$4");

  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => stash[Number(i)] || "");
  return s;
}

export function renderKatex(root: HTMLElement | null) {
  if (!root) return;
  try {
    const fn =
      typeof renderMathInElement === "function"
        ? renderMathInElement
        : (renderMathInElement as { default?: typeof renderMathInElement })?.default;
    if (typeof fn !== "function") return;
    fn(root, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    });
  } catch {
    /* ignore */
  }
}
