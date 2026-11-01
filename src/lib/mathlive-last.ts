/**
 * Laster MathLive først når en side faktisk har et svarfelt (dynamisk import),
 * og setter det som skal være likt for alle felt. Kalles bare fra useEffect,
 * aldri under server-rendering.
 */
let lover: Promise<void> | null = null;

export function lastMathLive(): Promise<void> {
  if (!lover) {
    lover = import("mathlive").then(({ MathfieldElement }) => {
      // Skrifter: bruker KaTeX-skriftene som siden allerede har (katex.min.css), ingen ekstra nedlasting.
      MathfieldElement.fontsDirectory = null;
      MathfieldElement.soundsDirectory = null;
      // Norsk desimalkomma: «2,5» blir ett tall og ikke en liste.
      MathfieldElement.decimalSeparator = ",";
    });
    // Mislykket lasting (offline, blokkert) skal kunne prøves igjen ved neste montering.
    lover.catch(() => {
      lover = null;
    });
  }
  return lover;
}
