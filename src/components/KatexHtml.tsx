import { useMemo } from "react";
import { formatTaskHtml } from "@/lib/katex-render";

export function KatexHtml({
  html,
  className,
  as = "div",
}: {
  html: string;
  className?: string;
  as?: "div" | "span" | "p";
}) {
  const rendered = useMemo(() => formatTaskHtml(html || ""), [html]);
  if (as === "span") {
    return <span className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
  }
  if (as === "p") {
    return <p className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
  }
  return <div className={className} dangerouslySetInnerHTML={{ __html: rendered }} />;
}
