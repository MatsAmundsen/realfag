"""Verifiserer deloppgaver-1p-forslag.py: (1) fh i fasiten, (2) sjekkSluttsvar godtar generert riktig svar og avviser feil,
(3) symbolforslag mot svar/oppgavetekst. Bruk: python3 verifiser.py [prefiks ...]"""
import importlib.util, json, re, subprocess, sys, html, os
FORSLAG_PATH = os.environ.get("FORSLAG", "/workspace/realfag-deloppgaver-forslag/review/deloppgaver-1p-forslag.py")
UNITS = os.environ.get("UNITS_JSON", "/workspace/ss-check/units.json")
spec = importlib.util.spec_from_file_location("forslag", FORSLAG_PATH); M = importlib.util.module_from_spec(spec); spec.loader.exec_module(M)
F = M.FORSLAG
units = json.load(open(UNITS))
def uid(k):
    return k
byid = {u["id"]: u for u in units}
def task_of(k):
    if k in byid: return byid[k], None
    m = re.match(r"^(P\d\.OP\d|P7-d\d-\d+)([a-z])$", k)
    if m and m.group(1) in byid: return byid[m.group(1)], m.group(2)
    return None, None
def norm(s):
    s = re.sub(r"<[^>]+>", "", s); s = html.unescape(re.sub(r"\s+", " ", s))
    for a, b in [(r"\left", ""), (r"\right", ""), (r"\dfrac", r"\frac"), (r"\tfrac", r"\frac"), ("\u2212", "-"), ("{,}", ","), (r"\,", ""), (r"\;", ""), (r"\!", ""), (r"\ ", ""), ("$", ""), (r"\cdot", "*"), (r"\times", "*"), ("\u00b7", "*")]:
        s = s.replace(a, b)
    return re.sub(r"\s+", "", s)
def fmt(v, sig=None):
    if sig: v = float(f"{v:.{sig}g}")
    s = f"{v:.10g}"
    if "e" in s: s = f"{v:.0f}"
    return s.replace(".", ",").replace("-", "\u2212")
def inputs(e):
    sv = e["svar"]; acc = []; rej = []
    enh = (e.get("enhet") or [""])[0]
    def gen(sv):
        t = sv["type"]
        if t == "tall":
            vs = sv["verdier"]
            irr = "tol" in sv and "rel" in sv["tol"] and sv["tol"]["rel"] == 0.002 and not all(float(v).is_integer() or abs(v*1000-round(v*1000))<1e-9 for v in vs)
            a = [fmt(v, 4 if irr else None) for v in vs]; w = [fmt(v * 1.37 + 3) for v in vs]
            return [" og ".join(a), ", ".join(a)] if len(vs) > 1 else [a[0], a[0] + " " + enh], [" og ".join(w)]
        if t == "uttrykk":
            u = sv["uttrykk"].replace(".", ",")
            return [u, "y=" + u, "f(x)=" + u] , ["7x+1"]
        if t == "serie":
            parts = [gen(d) for d in sv["deler"]]
            a = ["; ".join(p[0][0] for p in parts)]
            w = ["; ".join([parts[0][1][0]] + [p[0][0] for p in parts[1:]])]
            return a, w
        if t == "likning":
            vs = [v for l in sv["losninger"].values() for v in l]
            return [" og ".join(fmt(v) for v in vs)], [" og ".join(fmt(v + 1) for v in vs)]
        if t == "punkt":
            return ["; ".join(f"({fmt(p)}, {fmt(q)})" for p, q in sv["punkter"])], ["(99, 99)"]
        if t == "ulikhet":
            return [f"{fmt(sv['fra'])} < x < {fmt(sv['til'])}"], ["0 < x < 0,5"]
        if t == "omrade":
            return [fmt((sv["fra"] + sv["til"]) / 2)], ["9999"]
        return [], []
    a, w = gen(sv)
    return a, w
only = sys.argv[1:]
tests = []
fh_fail = []; ukjent = []
for k, e in F.items():
    if only and not any(k.startswith(p) for p in only): continue
    u, bokst = task_of(k)
    if u is None: ukjent.append(k)
    else:
        txt = norm(" ".join(u["fasit"]))
        for f in e["fh"]:
            if norm(f) not in txt: fh_fail.append((k, f))
    if "svar" in e:
        a, w = inputs(e)
        tests.append({"id": k, "spec": {kk: e[kk] for kk in ("svar", "alternativer", "enhet", "format") if kk in e}, "acc": a, "rej": w})
json.dump(tests, open("/tmp/forslag-tests.json", "w"))
r = subprocess.run(["node", "/workspace/ss-check/kjor-forslag.mjs"], capture_output=True, text=True)
print(r.stdout, r.stderr[-500:])
print("ukjent id:", ukjent); print("fh mangler:", fh_fail)
# symbolforslag
SIG = {"mengde": r"\\in(?![A-Za-z])|\\notin|\\mathbb|[∈∉ℕℤℚℝ]|tilhører|tallmengd", "rot": r"\\sqrt|√", "ulikhet": r"\\le|\\ge|\\ne|[≤≥≠]|ulikhet",
       "pi": r"\\pi|π", "pm": r"\\pm|±", "grader": r"\^\s*\{?\s*\\circ|°|grader"}
for k, e in F.items():
    if only and not any(k.startswith(p) for p in only): continue
    u, bokst = task_of(k)
    if not u: continue
    sv = "\n".join(l for l in u["fasit"] if re.search(r"Svar|^" + (bokst or "") + r"\)", l)) or " ".join(u["fasit"])
    tekst = u["text"] + " " + sv
    sug = [g for g, rx in SIG.items() if re.search(rx, tekst)]
    if e.get("svar") and "ulikhet" in json.dumps(e["svar"]) and "ulikhet" not in sug: sug.append("ulikhet")
    if set(sug) != set(e["sym"]): print("SYM", k, "mitt:", e["sym"], "foreslått:", sug)
cnt = {}
for e in F.values():
    if only and not any(e["id"].startswith(p) for p in only): continue
    cnt[e["klasse"]] = cnt.get(e["klasse"], 0) + 1
print("antall", cnt)
