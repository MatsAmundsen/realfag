import { useMemo } from "react";
import { formatArticleHtml, formatTaskHtml } from "@/lib/katex-render";

export function KatexHtml({
  html,
  className,
  as = "div",
  mode = "task",
}: {
  html: string;
  className?: string;
  as?: "div" | "span" | "p";
  mode?: "task" | "article";
}) {
  const rendered = useMemo(
    () => (mode === "article" ? formatArticleHtml(html || "") : formatTaskHtml(html || "")),
    [html, mode],
  );
  if (as === "span") {
    return <span className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
  }
  if (as === "p") {
    return <p className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
  }
  return <div className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
}
