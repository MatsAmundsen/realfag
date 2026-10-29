import { useEffect, type RefObject } from "react";
import { PROGRESS_KEY } from "@/lib/progress";

/**
 * Oppgavetekst, figurer og låste hint-/løsningsknapper står fra første tegning (også uten JS).
 * Har eleven allerede et levert forsøk eller et utkast for dette settet, endrer oppsettet seg når lagret
 * fremgang leses (svarfelt blir resultater, låsene åpnes), og da ville teksten hoppe. Dette skriptet kjører før
 * første tegning, ser etter lagret forsøk eller utkast, og skjuler i så fall omslaget (med plassen beholdt)
 * til `useAvslor` viser det igjen etter hydrering. Nederste navigasjon står inni omslaget, siden den ellers
 * ville flyttet seg synlig når siden skifter høyde. Uten lagret fremgang og uten JS skjules ingenting.
 * Skriptet står som første barn i omslaget som skal skjules.
 */
export function SkjulTilHydrert({ forsokNokkel, utkastNokkel }: { forsokNokkel: string; utkastNokkel: string }) {
  const js =
    "(function(){try{var w=document.currentScript&&document.currentScript.parentElement;if(!w)return;var h=false;" +
    `var p=JSON.parse(localStorage.getItem(${JSON.stringify(PROGRESS_KEY)})||"null");` +
    `if(p&&p.exams&&p.exams[${JSON.stringify(forsokNokkel)}])h=true;` +
    `var d=JSON.parse(localStorage.getItem(${JSON.stringify(utkastNokkel)})||"null");` +
    "if(d){var a=d.answers||{},f=d.ferdig||{};" +
    "for(var k in a)if(a[k])h=true;for(var k2 in f)if(f[k2])h=true}" +
    'if(h)w.style.visibility="hidden"}catch(e){}})()';
  return <script dangerouslySetInnerHTML={{ __html: js.replace(/</g, "\\u003c") }} />;
}

/** Viser omslaget igjen når lagret fremgang er lest og siden er tegnet på nytt med riktig oppsett. */
export function useAvslor(ref: RefObject<HTMLElement | null>, hydrert: boolean) {
  useEffect(() => {
    if (hydrert) ref.current?.style.removeProperty("visibility");
  }, [hydrert, ref]);
}
