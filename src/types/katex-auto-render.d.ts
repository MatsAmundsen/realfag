declare module "katex/contrib/auto-render" {
  export default function renderMathInElement(
    elem: HTMLElement,
    options?: {
      delimiters?: { left: string; right: string; display: boolean }[];
      ignoredTags?: string[];
      throwOnError?: boolean;
    },
  ): void;
}
