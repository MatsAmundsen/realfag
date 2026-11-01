import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { enheterFor, erGammelInnlevering, fasitEllerFri, FRI_SLUTTSVAR, fasitForDel, migrerUtkast, splittDeler } from "./deloppgaver.ts";
import type { Sluttsvar } from "./svar-sjekk.ts";

const opp = (tekst: string, fasitSteg: string[], id = "9.OP1") => ({ id, tekst, fasitSteg });
const tre = opp("Intro. <strong>a)</strong> Del én <br><strong>b)</strong> Del to <br><strong>c)</strong> Del tre", ["A", "B", "C"]);

describe("splittDeler", () => {
  it("deler på <strong>a)</strong> og gir id <oppgave><bokstav>", () => {
    const o = splittDeler(tre)!;
    assert.deepEqual(o.deler.map((d) => d.id), ["9.OP1a", "9.OP1b", "9.OP1c"]);
    assert.deepEqual(o.deler.map((d) => d.tekst), ["Del én", "Del to", "Del tre"]);
    assert.equal(o.intro, "Intro. ");
  });
  it("faller tilbake til hele oppgaven når fasitSteg ikke er 1:1 med delene", () => {
    assert.equal(splittDeler(opp(tre.tekst, ["A", "B"])), null);
    assert.equal(splittDeler(opp(tre.tekst, ["A", "B", "C", "D"])), null);
    assert.equal(splittDeler(opp(tre.tekst, [])), null);
  });
  it("faller tilbake når det ikke er minst to deler eller bokstavene ikke er i rekkefølge", () => {
    assert.equal(splittDeler(opp("Bare tekst", ["A"])), null);
    assert.equal(splittDeler(opp("<strong>a)</strong> Alene", ["A"])), null);
    assert.equal(splittDeler(opp("<strong>a)</strong> x <strong>c)</strong> y", ["A", "B"])), null);
    assert.equal(splittDeler(opp("<strong>b)</strong> x <strong>c)</strong> y", ["A", "B"])), null);
  });
  it("faller tilbake når en del ikke er gyldig html alene", () => {
    assert.equal(splittDeler(opp("<div><strong>a)</strong> x <strong>b)</strong> y</div>", ["A", "B"])), null);
  });
  it("fasitSteg som er null er det samme som ingen steg", () => {
    assert.equal(splittDeler({ id: "9.OP1", tekst: tre.tekst, fasitSteg: null }), null);
  });
});

describe("fasitForDel", () => {
  const serie: Sluttsvar = { svar: { type: "serie", deler: [{ type: "tall", verdier: [1] }, { type: "tall", verdier: [2] }, { type: "tall", verdier: [3] }] }, enhet: ["kr"] };
  const tall: Sluttsvar = { svar: { type: "tall", verdier: [10, 20, 30], heltall: [1] }, enhet: ["kr"], selvvurder: true };
  const slikt = (s: Record<string, Sluttsvar>) => enheterFor(tre, s).enheter.map((e) => e.fasit);

  it("egen del-nøkkel går foran serie og tall", () => {
    const egen: Sluttsvar = { svar: { type: "tall", verdier: [99] } };
    const f = slikt({ "9.OP1": serie, "9.OP1b": egen });
    assert.equal(f[1], egen);
    assert.deepEqual(f[0]!.svar, { type: "tall", verdier: [1] });
    assert.deepEqual(f[2]!.svar, { type: "tall", verdier: [3] });
  });
  it("serie med like mange deler deles per del og beholder enhet", () => {
    const f = slikt({ "9.OP1": serie });
    assert.deepEqual(f.map((x) => x!.svar), serie.svar.type === "serie" ? serie.svar.deler : []);
    assert.deepEqual(f[0]!.enhet, ["kr"]);
  });
  it("serie med feil antall deler: fasiten går ikke tapt, oppgaven blir én enhet", () => {
    const kort: Sluttsvar = { svar: { type: "serie", deler: [{ type: "tall", verdier: [1] }, { type: "tall", verdier: [2] }] } };
    const e = enheterFor(tre, { "9.OP1": kort });
    assert.equal(e.harDeler, false);
    assert.deepEqual(e.enheter.map((x) => x.id), ["9.OP1"]);
    assert.equal(e.enheter[0].fasit, kort);
  });
  it("fasit på bare noen av delene: resten blir fri", () => {
    const egen: Sluttsvar = { svar: { type: "tall", verdier: [5] } };
    assert.deepEqual(slikt({ "9.OP1": { svar: { type: "tall", verdier: [1, 2] } }, "9.OP1c": egen }), [undefined, undefined, egen]);
  });
  it("tall med ett tall per del deles, heltall følger delen", () => {
    const f = slikt({ "9.OP1": tall });
    assert.deepEqual(f.map((x) => (x!.svar as { verdier: number[] }).verdier), [[10], [20], [30]]);
    assert.equal((f[0]!.svar as { heltall?: number[] }).heltall, undefined);
    assert.deepEqual((f[1]!.svar as { heltall?: number[] }).heltall, [0]);
    assert.equal(f[2]!.selvvurder, true);
  });
  it("tall med feil antall verdier: oppgaven blir én enhet", () => {
    assert.equal(enheterFor(tre, { "9.OP1": { svar: { type: "tall", verdier: [1, 2] } } }).harDeler, false);
  });
  it("uten oppføring: fri, og fasitEllerFri gir selvvurdering", () => {
    assert.deepEqual(slikt({}), [undefined, undefined, undefined]);
    assert.equal(fasitEllerFri(undefined), FRI_SLUTTSVAR);
    assert.equal(FRI_SLUTTSVAR.selvvurder, true);
    assert.equal(FRI_SLUTTSVAR.svar.type, "fri");
  });
  it("er stabil å kalle direkte", () => {
    const d = splittDeler(tre)!;
    assert.equal(fasitForDel({}, "9.OP1", d.deler[0], 0, 3), undefined);
  });
});

describe("enheterFor", () => {
  it("én enhet med oppgavens id når oppgaven ikke kan deles", () => {
    const e = enheterFor(opp("Ingen deler", ["A"]), { "9.OP1": { svar: { type: "tall", verdier: [1] } } });
    assert.equal(e.harDeler, false);
    assert.deepEqual(e.enheter.map((x) => x.id), ["9.OP1"]);
    assert.ok(e.enheter[0].fasit);
  });
  it("gammel innlevering gir én enhet selv om oppgaven kan deles", () => {
    assert.deepEqual(enheterFor(tre, {}, true).enheter.map((x) => x.id), ["9.OP1"]);
  });
  it("delenes tekst har introen foran (til valg av spesialtegn)", () => {
    assert.match(enheterFor(tre, {}).enheter[1].tekst, /^Intro\. +Del to$/);
  });
});

describe("erGammelInnlevering", () => {
  it("ingen innlevering: aldri gammel", () => assert.equal(erGammelInnlevering(undefined, false, "9.OP1"), false));
  it("innlevering uten poeng er gammel", () => assert.equal(erGammelInnlevering(undefined, true, "9.OP1"), true));
  it("poeng på oppgavens id er gammel, på delenes id er ny", () => {
    assert.equal(erGammelInnlevering({ "9.OP1": {} }, true, "9.OP1"), true);
    assert.equal(erGammelInnlevering({ "9.OP1a": {}, "9.OP1b": {} }, true, "9.OP1"), false);
  });
});

describe("migrerUtkast", () => {
  const oppg = [tre, opp("Uten deler", ["A"], "9.OP2")];
  it("flytter gammel utregning til del a og gammelt sluttsvar på delene", () => {
    const m = migrerUtkast(oppg, {}, { answers: { "9.OP1": "min utregning", "9.OP1::sluttsvar": "1; 2; 3", "9.OP2": "uendret" }, ferdig: { "9.OP1": true, "9.OP2": true } });
    assert.equal(m.endret, true);
    assert.deepEqual(m.answers, {
      "9.OP1a": "min utregning",
      "9.OP1a::sluttsvar": "1",
      "9.OP1b::sluttsvar": "2",
      "9.OP1c::sluttsvar": "3",
      "9.OP2": "uendret",
    });
    assert.deepEqual(m.ferdig, { "9.OP1a": true, "9.OP1b": true, "9.OP1c": true, "9.OP2": true });
  });
  it("sluttsvar som ikke lar seg dele havner i del a", () => {
    const m = migrerUtkast(oppg, {}, { answers: { "9.OP1::sluttsvar": "bare ett svar" }, ferdig: {} });
    assert.deepEqual(m.answers, { "9.OP1a::sluttsvar": "bare ett svar" });
  });
  it("tidligere svar-blokk når del a allerede har tekst, og ingenting går tapt", () => {
    const m = migrerUtkast(oppg, {}, { answers: { "9.OP1": "gammelt", "9.OP1a": "nytt" }, ferdig: {} });
    assert.equal(m.answers["9.OP1a"], "Tidligere svar:\ngammelt\n\nnytt");
    assert.equal("9.OP1" in m.answers, false);
  });
  it("er idempotent og gir endret=false når det ikke er noe å flytte", () => {
    const første = migrerUtkast(oppg, {}, { answers: { "9.OP1": "x" }, ferdig: {} });
    const andre = migrerUtkast(oppg, {}, { answers: første.answers, ferdig: første.ferdig });
    assert.equal(andre.endret, false);
    assert.deepEqual(andre.answers, første.answers);
  });
  it("rører ikke input-objektene", () => {
    const answers = { "9.OP1": "x" };
    migrerUtkast(oppg, {}, { answers, ferdig: {} });
    assert.deepEqual(answers, { "9.OP1": "x" });
  });
});
