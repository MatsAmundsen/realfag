#!/usr/bin/env node
/**
 * Nettlesertest: tegn som skrives i samme øyeblikk som klikket i MathLive-svarfeltet skal ikke gå tapt.
 * (MathLive flytter tastaturfokus først 60 ms etter klikket; «x=1, x=6, x=-2» ble tidligere til «1, x=6, x=-2».)
 *
 * Krever en kjørende dev-server og en Chrome/Chromium. Ikke en del av `npm test`.
 *   npm run dev &   (port 8080)
 *   BASE=http://localhost:8080 CHROME=/usr/bin/google-chrome node scripts/mathlive-forste-tegn.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:8080";
const SIDE = process.env.SIDE || "/eksamen/h2025";
const FELT = process.env.FELT || "#sluttsvar-h25-d1-2";
const executablePath = process.env.CHROME || undefined;

const browser = await chromium.launch({ executablePath, args: ["--no-sandbox"] });
let feil = 0;

async function nyttFelt() {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(BASE + SIDE, { waitUntil: "networkidle" });
  await p.click("text=Prøvemodus");
  await p.waitForSelector(`math-field${FELT}`, { timeout: 15000 });
  await p.waitForTimeout(500);
  const f = p.locator(FELT);
  await f.scrollIntoViewIfNeeded();
  return { ctx, p, f };
}

function sjekk(navn, faktisk, forventet) {
  const ok = faktisk === forventet;
  if (!ok) feil++;
  console.log(`${ok ? "OK  " : "FEIL"} ${navn}: ${JSON.stringify(faktisk)}${ok ? "" : ` (forventet ${JSON.stringify(forventet)})`}`);
}

// 1) Skriv med en gang etter klikket, ulike pauser (0 ms var feilen).
for (const [pause, forsinkelse] of [[0, 30], [0, 0], [10, 20]]) {
  const { ctx, p, f } = await nyttFelt();
  await f.click();
  if (pause) await p.waitForTimeout(pause);
  await p.keyboard.type("x=1, x=6, x=-2", { delay: forsinkelse });
  await p.waitForTimeout(300);
  sjekk(`klikk, ${pause} ms pause, ${forsinkelse} ms mellom tegn`, await f.evaluate((e) => e.value), "x=1{,}\\;x=6{,}\\;x=-2");
  await ctx.close();
}

// 2) Klikk i felt som alt har tekst, og skriv med en gang: tegnene kommer med og ingenting forsvinner.
{
  const { ctx, p, f } = await nyttFelt();
  await f.click();
  await p.keyboard.type("x=1", { delay: 30 });
  await p.waitForTimeout(300);
  await p.locator("body").click({ position: { x: 5, y: 5 } });
  await p.waitForTimeout(200);
  await f.click();
  await p.keyboard.press("End");
  await p.keyboard.type("+2", { delay: 0 });
  await p.waitForTimeout(300);
  const v = await f.evaluate((e) => e.value);
  sjekk("klikk i felt med tekst, så skriv med en gang (inneholder x=1 og +2)", v.includes("x=1") && v.includes("+2"), true);
  await ctx.close();
}

await browser.close();
console.log(feil ? `${feil} feil` : "Alle OK");
process.exit(feil ? 1 : 0);
