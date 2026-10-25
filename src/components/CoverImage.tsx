/**
 * Kapittelomslag i riktig størrelse: AVIF/WebP/JPEG i 480 px (1×) og 960 px (2×),
 * med width/height mot layoutskift og lazy-lasting. Faller tilbake til originalbildet.
 */
export function CoverImage({ src, sizes }: { src?: string; sizes: string }) {
  const m = src?.match(/\/images\/((?:1p\/)?kap\d)\.jpg$/);
  if (!m) return src ? <img src={src} alt="" width={480} height={360} loading="lazy" decoding="async" /> : null;
  const b = `/images/omslag/${m[1]}`;
  const set = (ext: string) => `${b}-480.${ext} 480w, ${b}-960.${ext} 960w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img src={`${b}-480.jpg`} srcSet={set("jpg")} sizes={sizes} alt="" width={480} height={360} loading="lazy" decoding="async" />
    </picture>
  );
}
