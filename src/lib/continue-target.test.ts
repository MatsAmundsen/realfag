import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emptyProgress, studyTarget, type ChapterLike } from "./progress.ts";

const chapters: ChapterLike[] = [
  {
    id: "kap1",
    delkapitler: [
      { id: "1A", tittel: "1A Tallmengder", oppgaver: [{ id: "1.10" }, { id: "1.11" }] },
      { id: "1B", tittel: "1B Figurtall", oppgaver: [{ id: "1.28" }] },
    ],
  },
  {
    id: "kap2",
    delkapitler: [{ id: "2A", tittel: "2A Forenkle", oppgaver: [{ id: "2.1" }] }],
  },
];

describe("studyTarget", () => {
  it("starter på første delkapittel uten progresjon", () => {
    const t = studyTarget(chapters, emptyProgress());
    assert.equal(t?.kind, "start");
    assert.equal(t?.subId, "1A");
  });

  it("fortsetter i delkapittelet eleven jobbet sist med", () => {
    const p = emptyProgress();
    p.tasks["kap1/1A/1.10"] = 100;
    const t = studyTarget(chapters, p);
    assert.equal(t?.kind, "continue");
    assert.equal(t?.subId, "1A");
    assert.equal(t?.done, 1);
    assert.equal(t?.total, 2);
  });

  it("hopper til neste uferdige når siste delkapittel er ferdig", () => {
    const p = emptyProgress();
    p.tasks["kap1/1A/1.10"] = 10;
    p.tasks["kap1/1A/1.11"] = 20;
    const t = studyTarget(chapters, p);
    assert.equal(t?.kind, "continue");
    assert.equal(t?.subId, "1B");
  });

  it("er ferdig når alt er merket", () => {
    const p = emptyProgress();
    p.tasks["kap1/1A/1.10"] = 1;
    p.tasks["kap1/1A/1.11"] = 2;
    p.tasks["kap1/1B/1.28"] = 3;
    p.tasks["kap2/2A/2.1"] = 4;
    const t = studyTarget(chapters, p);
    assert.equal(t?.kind, "done");
  });
});
