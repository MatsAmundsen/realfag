export type MapLink = { kapId: string; subId: string; hash?: string };

export type ConceptNode = {
  id: string;
  label: string;
  hint?: string;
  link: MapLink;
};

export type Cluster = {
  id: string;
  title: string;
  subId: string;
  layout: "stack" | "row";
  nodes: ConceptNode[];
};

export type ChapterDetail = {
  kapId: string;
  title: string;
  blurb: string;
  nextLabel: string;
  clusters: Cluster[];
};

export type HelhetNode = {
  id: string;
  label: string;
  kapId: string;
  subId: string;
};

export type HelhetEdge = {
  from: string;
  to: string;
  dashed?: boolean;
  label?: string;
};

export type PrereqInput = {
  label: string;
  subId: string;
  kapId: string;
  role: "basic" | "step";
};

export type Prereq = {
  title: string;
  blurb: string;
  inputs: PrereqInput[];
};

function n(id: string, label: string, subId: string, hint?: string, hash?: string): ConceptNode {
  return {
    id,
    label,
    hint,
    link: { kapId: `kap${subId[0]}`, subId, hash },
  };
}

export const OVERVIEW: { id: string; kapId: string; title: string; short: string }[] = [
  { id: "kap1", kapId: "kap1", title: "Kapittel 1", short: "Tall og algebra" },
  { id: "kap2", kapId: "kap2", title: "Kapittel 2", short: "Algebra og mønstre" },
  { id: "kap3", kapId: "kap3", title: "Kapittel 3", short: "Likninger" },
  { id: "kap4", kapId: "kap4", title: "Kapittel 4", short: "Funksjoner" },
];

export const HELHET_NODES: HelhetNode[] = [
  { id: "1A", label: "Tallmengder", kapId: "kap1", subId: "1A" },
  { id: "1B", label: "Figurtall", kapId: "kap1", subId: "1B" },
  { id: "1C", label: "Brøk, SFF, MFM", kapId: "kap1", subId: "1C" },
  { id: "1D", label: "Potenser", kapId: "kap1", subId: "1D" },
  { id: "1E", label: "Standardform", kapId: "kap1", subId: "1E" },
  { id: "1F", label: "Logikk og bevis", kapId: "kap1", subId: "1F" },
  { id: "2A", label: "Bokstavregning", kapId: "kap2", subId: "2A" },
  { id: "2B", label: "Kvadratsetninger", kapId: "kap2", subId: "2B" },
  { id: "2C", label: "Felles faktor", kapId: "kap2", subId: "2C" },
  { id: "2D", label: "Faktorisering", kapId: "kap2", subId: "2D" },
  { id: "2E", label: "Algebraiske brøker", kapId: "kap2", subId: "2E" },
  { id: "2F", label: "Figurer og mønstre", kapId: "kap2", subId: "2F" },
  { id: "3A", label: "Førstegradslikninger", kapId: "kap3", subId: "3A" },
  { id: "3B", label: "Formler", kapId: "kap3", subId: "3B" },
  { id: "3C", label: "Andregradslikninger", kapId: "kap3", subId: "3C" },
  { id: "3D", label: "ABC-formelen", kapId: "kap3", subId: "3D" },
  { id: "3E", label: "Rasjonale likninger", kapId: "kap3", subId: "3E" },
  { id: "3F", label: "Proporsjoner", kapId: "kap3", subId: "3F" },
  { id: "3G", label: "Polynomdivisjon", kapId: "kap3", subId: "3G" },
  { id: "4A", label: "Funksjonsbegrepet", kapId: "kap4", subId: "4A" },
  { id: "4B", label: "Lineære funksjoner", kapId: "kap4", subId: "4B" },
  { id: "4C", label: "Polynomfunksjoner", kapId: "kap4", subId: "4C" },
  { id: "4D", label: "Rasjonale funksjoner", kapId: "kap4", subId: "4D" },
  { id: "4E", label: "Potensfunksjoner", kapId: "kap4", subId: "4E" },
  { id: "4F", label: "Eksponentialfunksjoner", kapId: "kap4", subId: "4F" },
  { id: "4G", label: "Drøfting", kapId: "kap4", subId: "4G" },
  { id: "4H", label: "Vekstfart og derivasjon", kapId: "kap4", subId: "4H" },
];

export const HELHET_EDGES: HelhetEdge[] = [
  { from: "1A", to: "2A" },
  { from: "1C", to: "2A" },
  { from: "1D", to: "2A" },
  { from: "1F", to: "3G", dashed: true, label: "tenkning" },
  { from: "2A", to: "2B" },
  { from: "2A", to: "3A" },
  { from: "2B", to: "2C" },
  { from: "2B", to: "3D" },
  { from: "2C", to: "3D" },
  { from: "2C", to: "3G" },
  { from: "2D", to: "3D" },
  { from: "2E", to: "3E" },
  { from: "3A", to: "4B" },
  { from: "3D", to: "3G" },
  { from: "3D", to: "4C" },
  { from: "3G", to: "4H" },
  { from: "4B", to: "4H" },
  { from: "4C", to: "4G" },
  { from: "4H", to: "4G" },
];

export const CHAPTER_MAPS: Record<string, ChapterDetail> = {
  kap1: {
    kapId: "kap1",
    title: "Kapittel 1 — grunnkunnskap",
    blurb: "Tallmengder, brøk og potenser er byggeklossene du bruker i resten av 1T.",
    nextLabel: "Trengs i kapittel 2, 3 og 4",
    clusters: [
      {
        id: "1A",
        title: "1A Tallmengder",
        subId: "1A",
        layout: "stack",
        nodes: [
          n("1A-n", "Naturlige tall ℕ", "1A"),
          n("1A-z", "Hele tall ℤ", "1A"),
          n("1A-q", "Rasjonale tall ℚ", "1A"),
          n("1A-r", "Reelle tall ℝ", "1A"),
          n("1A-i", "Irrasjonale tall", "1A"),
          n("1A-abs", "Absoluttverdi |x|", "1A"),
        ],
      },
      {
        id: "1B",
        title: "1B Figurtall",
        subId: "1B",
        layout: "stack",
        nodes: [
          n("1B-p", "Primtall", "1B"),
          n("1B-k", "Kvadrattall 1, 4, 9, …", "1B"),
          n("1B-u", "Kubikktall 1, 8, 27, …", "1B"),
          n("1B-f", "Figurtall og mønstre", "1B"),
        ],
      },
      {
        id: "1C",
        title: "1C Faktorer og brøk",
        subId: "1C",
        layout: "stack",
        nodes: [
          n("1C-sff", "Største felles faktor", "1C"),
          n("1C-mfm", "Minste felles multiplum", "1C"),
          n("1C-brok", "Brøk, utvid og forkort", "1C", "Start enkelt, øk gradvis.", "oppgave-1.46"),
          n("1C-fn", "Fellesnevner", "1C"),
        ],
      },
      {
        id: "1D",
        title: "1D Potenser",
        subId: "1D",
        layout: "stack",
        nodes: [
          n("1D-1", "aᵐ · aⁿ = aᵐ⁺ⁿ", "1D"),
          n("1D-2", "(aᵐ)ⁿ = aᵐⁿ", "1D"),
          n("1D-3", "a⁻ⁿ = 1/aⁿ", "1D"),
          n("1D-4", "a⁰ = 1", "1D"),
        ],
      },
      {
        id: "1E",
        title: "1E Standardform",
        subId: "1E",
        layout: "stack",
        nodes: [
          n("1E-std", "a · 10ⁿ", "1E"),
          n("1E-sqrt", "Kvadratrøtter", "1E"),
        ],
      },
      {
        id: "1F",
        title: "1F Logikk og bevis",
        subId: "1F",
        layout: "stack",
        nodes: [
          n("1F-imp", "Implikasjon ⇒", "1F"),
          n("1F-ekv", "Ekvivalens ⇔", "1F"),
          n("1F-mot", "Moteksempel", "1F"),
          n("1F-bev", "Direkte bevis", "1F"),
        ],
      },
    ],
  },
  kap2: {
    kapId: "kap2",
    title: "Kapittel 2 — algebra",
    blurb: "Her lærer du å regne med bokstaver. Det er verktøyet til likninger i kapittel 3.",
    nextLabel: "Trengs i kapittel 3: likninger og ABC-formelen",
    clusters: [
      {
        id: "2A",
        title: "2A Forenkle uttrykk",
        subId: "2A",
        layout: "stack",
        nodes: [
          n("2A-ledd", "Samle like ledd", "2A"),
          n("2A-dist", "Distributiv lov a(b+c)", "2A"),
          n("2A-par", "To parenteser (a+b)(c+d)", "2A"),
        ],
      },
      {
        id: "2B",
        title: "2B Kvadratsetninger",
        subId: "2B",
        layout: "stack",
        nodes: [
          n("2B-1", "(a+b)² = a² + 2ab + b²", "2B"),
          n("2B-2", "(a−b)² = a² − 2ab + b²", "2B"),
          n("2B-3", "(a+b)(a−b) = a² − b²", "2B"),
        ],
      },
      {
        id: "2C",
        title: "2C Felles faktor",
        subId: "2C",
        layout: "stack",
        nodes: [n("2C-f", "Felles faktor utenfor parentes", "2C")],
      },
      {
        id: "2D",
        title: "2D Faktorisering",
        subId: "2D",
        layout: "stack",
        nodes: [
          n("2D-bak", "Kvadratsetning baklengs", "2D"),
          n("2D-full", "Fullføre kvadratet", "2D"),
        ],
      },
      {
        id: "2E",
        title: "2E Algebraiske brøker",
        subId: "2E",
        layout: "stack",
        nodes: [
          n("2E-fork", "Forkorte brøkuttrykk", "2E"),
          n("2E-fn", "Fellesnevner med variabler", "2E"),
        ],
      },
      {
        id: "2F",
        title: "2F Figurer og mønstre",
        subId: "2F",
        layout: "stack",
        nodes: [n("2F-fig", "Algebra bak figurtall", "2F")],
      },
    ],
  },
  kap3: {
    kapId: "kap3",
    title: "Kapittel 3 — likninger",
    blurb: "Løs likninger av første, andre og tredje grad. Dette er kjernen i 1T-eksamen.",
    nextLabel: "Trengs i kapittel 4: funksjoner og drøfting",
    clusters: [
      {
        id: "3A",
        title: "3A Førstegradslikninger",
        subId: "3A",
        layout: "stack",
        nodes: [
          n("3A-lin", "ax + b = cx + d", "3A"),
          n("3A-prove", "Prøve på svaret (VS = HS)", "3A"),
          n("3A-tekst", "Tekstoppgaver", "3A"),
        ],
      },
      {
        id: "3B",
        title: "3B Formler",
        subId: "3B",
        layout: "stack",
        nodes: [n("3B-f", "Løse en formel for en bokstav", "3B")],
      },
      {
        id: "3C",
        title: "3C Andregradslikninger",
        subId: "3C",
        layout: "stack",
        nodes: [
          n("3C-prod", "Produktregelen ab = 0", "3C"),
          n("3C-rot", "x² = k  →  x = ±√k", "3C"),
        ],
      },
      {
        id: "3D",
        title: "3D ABC-formelen",
        subId: "3D",
        layout: "stack",
        nodes: [
          n("3D-d", "Diskriminant D = b² − 4ac", "3D"),
          n("3D-abc", "x = (−b ± √D) / 2a", "3D"),
        ],
      },
      {
        id: "3E",
        title: "3E Rasjonale likninger",
        subId: "3E",
        layout: "stack",
        nodes: [
          n("3E-def", "Definisjonsmengde", "3E"),
          n("3E-falsk", "Falske løsninger", "3E"),
        ],
      },
      {
        id: "3F",
        title: "3F Proporsjoner",
        subId: "3F",
        layout: "stack",
        nodes: [n("3F-kryss", "Kryssmultiplikasjon", "3F")],
      },
      {
        id: "3G",
        title: "3G Polynomdivisjon",
        subId: "3G",
        layout: "stack",
        nodes: [
          n("3G-null", "Nullpunktsetningen — finn én x₁", "3G"),
          n("3G-div", "P(x) ÷ (x − x₁)", "3G"),
          n("3G-rest", "Løs restpolynomet med ABC", "3G"),
        ],
      },
    ],
  },
  kap4: {
    kapId: "kap4",
    title: "Kapittel 4 — funksjoner",
    blurb: "Fra graf og stigningstall til derivasjon og funksjonsdrøfting — det eksamen tester mest.",
    nextLabel: "Dette er eksamenskartet",
    clusters: [
      {
        id: "4A",
        title: "4A Funksjonsbegrepet",
        subId: "4A",
        layout: "stack",
        nodes: [
          n("4A-df", "Definisjonsmengde D_f og verdier", "4A"),
          n("4A-null", "Nullpunkter: f(x) = 0", "4A"),
        ],
      },
      {
        id: "4B",
        title: "4B Lineære funksjoner",
        subId: "4B",
        layout: "stack",
        nodes: [
          n("4B-lin", "f(x) = ax + b", "4B"),
          n("4B-stig", "Stigningstall a", "4B"),
          n("4B-to", "Topunktsformel", "4B"),
        ],
      },
      {
        id: "4C",
        title: "4C Polynomfunksjoner",
        subId: "4C",
        layout: "stack",
        nodes: [
          n("4C-par", "Parabel ax² + bx + c", "4C"),
          n("4C-sym", "Symmetriakse x = −b / 2a", "4C"),
          n("4C-topp", "Toppunktsform", "4C"),
        ],
      },
      {
        id: "4D",
        title: "4D Rasjonale funksjoner",
        subId: "4D",
        layout: "stack",
        nodes: [
          n("4D-pq", "f(x) = P(x) / Q(x)", "4D"),
          n("4D-as", "Asymptoter — loddrett og vannrett", "4D"),
        ],
      },
      {
        id: "4E",
        title: "4E Potensfunksjoner",
        subId: "4E",
        layout: "stack",
        nodes: [n("4E-p", "f(x) = a xᵇ", "4E")],
      },
      {
        id: "4F",
        title: "4F Eksponentialfunksjoner",
        subId: "4F",
        layout: "stack",
        nodes: [
          n("4F-exp", "f(x) = a · bˣ", "4F"),
          n("4F-log", "Logaritmer log og ln", "4F"),
        ],
      },
      {
        id: "4H",
        title: "4H Vekstfart og derivasjon",
        subId: "4H",
        layout: "stack",
        nodes: [
          n("4H-gjsn", "Gjennomsnittlig vekstfart Δy/Δx", "4H"),
          n("4H-mom", "Momentan vekstfart f'(x)", "4H"),
          n("4H-reg", "Derivasjonsregler xⁿ → n xⁿ⁻¹", "4H"),
        ],
      },
      {
        id: "4G",
        title: "4G Drøfting",
        subId: "4G",
        layout: "stack",
        nodes: [
          n("4G-for", "Fortegnsskjema for f'(x)", "4G"),
          n("4G-eks", "Ekstremalpunkter min/maks", "4G"),
        ],
      },
    ],
  },
};

export const PREREQS: Record<string, Prereq> = {
  "1C": {
    title: "Brøkregning",
    blurb: "Du trenger tallmengder og faktorer før du utvider, forkorter og regner med brøk.",
    inputs: [
      { label: "Tallmengder ℚ", subId: "1A", kapId: "kap1", role: "basic" },
      { label: "Primtall og SFF", subId: "1B", kapId: "kap1", role: "step" },
    ],
  },
  "1D": {
    title: "Potenser",
    blurb: "Potensregning er gjentatt multiplikasjon, skrevet kompakt.",
    inputs: [
      { label: "Gjentatt multiplikasjon", subId: "1A", kapId: "kap1", role: "basic" },
      { label: "Tallmengder", subId: "1A", kapId: "kap1", role: "basic" },
    ],
  },
  "1E": {
    title: "Standardform",
    blurb: "Store og små tall skrives som a · 10ⁿ. Du trenger potensreglene først.",
    inputs: [
      { label: "Potensregler", subId: "1D", kapId: "kap1", role: "step" },
      { label: "Desimaltall", subId: "1A", kapId: "kap1", role: "basic" },
    ],
  },
  "2A": {
    title: "Bokstavregning",
    blurb: "Samme regneregler som med tall, bare med bokstaver.",
    inputs: [
      { label: "Regneregler", subId: "1A", kapId: "kap1", role: "basic" },
      { label: "Potenser", subId: "1D", kapId: "kap1", role: "step" },
    ],
  },
  "2B": {
    title: "Kvadratsetninger",
    blurb: "Tre identiteter som sparer deg for lang parentesregning.",
    inputs: [
      { label: "Bokstavregning", subId: "2A", kapId: "kap2", role: "basic" },
      { label: "Potensregning", subId: "1D", kapId: "kap1", role: "basic" },
      { label: "Parentesregning", subId: "2A", kapId: "kap2", role: "step" },
    ],
  },
  "2C": {
    title: "Felles faktor",
    blurb: "Det motsatte av å gange inn i parentes.",
    inputs: [
      { label: "Distributiv lov baklengs", subId: "2A", kapId: "kap2", role: "step" },
    ],
  },
  "2D": {
    title: "Faktorisering",
    blurb: "Skriv et polynom som et produkt. Kvadratsetningene baklengs er nøkkelen.",
    inputs: [
      { label: "Felles faktor", subId: "2C", kapId: "kap2", role: "step" },
      { label: "Kvadratsetning baklengs", subId: "2B", kapId: "kap2", role: "step" },
    ],
  },
  "2E": {
    title: "Algebraiske brøker",
    blurb: "Samme brøkregler som i 1C, nå med bokstaver. Faktoriser først.",
    inputs: [
      { label: "Brøkregning", subId: "1C", kapId: "kap1", role: "basic" },
      { label: "Faktorisering", subId: "2D", kapId: "kap2", role: "step" },
    ],
  },
  "3A": {
    title: "Førstegradslikninger",
    blurb: "Isoler x med omvendte regnearter. Prøv alltid svaret.",
    inputs: [
      { label: "Bokstavregning", subId: "2A", kapId: "kap2", role: "basic" },
    ],
  },
  "3C": {
    title: "Andregradslikninger",
    blurb: "Produktregelen og kvadratrot er første verktøy, før ABC.",
    inputs: [
      { label: "Faktorisering", subId: "2D", kapId: "kap2", role: "step" },
      { label: "Kvadratrøtter", subId: "1E", kapId: "kap1", role: "basic" },
    ],
  },
  "3D": {
    title: "ABC-formelen",
    blurb: "Virker for alle andregradslikninger. Diskriminanten forteller hvor mange løsninger.",
    inputs: [
      { label: "Kvadratrøtter", subId: "1E", kapId: "kap1", role: "basic" },
      { label: "Faktorisering 2. grad", subId: "2D", kapId: "kap2", role: "step" },
      { label: "Kvadratsetninger", subId: "2B", kapId: "kap2", role: "step" },
    ],
  },
  "3E": {
    title: "Rasjonale likninger",
    blurb: "Gang med fellesnevner, men sjekk definisjonsmengden — ellers får du falske løsninger.",
    inputs: [
      { label: "Algebraiske brøker", subId: "2E", kapId: "kap2", role: "step" },
      { label: "Førstegradslikninger", subId: "3A", kapId: "kap3", role: "basic" },
    ],
  },
  "3G": {
    title: "Tredjegradslikninger",
    blurb: "Finn ett nullpunkt, del polynomet, løs restpolynomet med ABC.",
    inputs: [
      { label: "Nullpunktsetningen", subId: "3C", kapId: "kap3", role: "step" },
      { label: "ABC-formelen", subId: "3D", kapId: "kap3", role: "step" },
      { label: "Grunnleggende algebra", subId: "2A", kapId: "kap2", role: "basic" },
    ],
  },
  "4B": {
    title: "Lineære funksjoner",
    blurb: "En rett linje. Stigningstallet er det samme som i førstegradslikninger.",
    inputs: [
      { label: "Førstegradslikninger", subId: "3A", kapId: "kap3", role: "basic" },
      { label: "Koordinatsystemet", subId: "4A", kapId: "kap4", role: "basic" },
    ],
  },
  "4C": {
    title: "Andregradsfunksjoner",
    blurb: "Parabelen. ABC finner nullpunktene, symmetriaksen finner toppunktet.",
    inputs: [
      { label: "ABC-formelen", subId: "3D", kapId: "kap3", role: "step" },
      { label: "Koordinatsystemet", subId: "4A", kapId: "kap4", role: "basic" },
    ],
  },
  "4D": {
    title: "Rasjonale funksjoner",
    blurb: "Nevneren gir loddrette asymptoter. Gradene gir vannrett asymptote.",
    inputs: [
      { label: "Rasjonale uttrykk", subId: "2E", kapId: "kap2", role: "step" },
      { label: "Funksjonsbegrepet", subId: "4A", kapId: "kap4", role: "basic" },
    ],
  },
  "4G": {
    title: "Funksjonsdrøfting",
    blurb: "Fortegnsskjema for f' forteller hvor grafen stiger og synker.",
    inputs: [
      { label: "Derivasjonsregler", subId: "4H", kapId: "kap4", role: "step" },
      { label: "Faktorisering", subId: "2D", kapId: "kap2", role: "step" },
      { label: "Andregradsfunksjoner", subId: "4C", kapId: "kap4", role: "basic" },
    ],
  },
  "4H": {
    title: "Vekstfart og derivasjon",
    blurb: "Fra gjennomsnittlig stigning til momentan vekstfart — definisjonen av f'(x).",
    inputs: [
      { label: "Stigningstall", subId: "4B", kapId: "kap4", role: "basic" },
      { label: "Polynomregning", subId: "2A", kapId: "kap2", role: "basic" },
    ],
  },
};

export function findConcept(id: string): ConceptNode | undefined {
  for (const ch of Object.values(CHAPTER_MAPS)) {
    for (const c of ch.clusters) {
      const hit = c.nodes.find((x) => x.id === id);
      if (hit) return hit;
    }
  }
  return undefined;
}

export function clusterForNode(id: string): Cluster | undefined {
  for (const ch of Object.values(CHAPTER_MAPS)) {
    for (const c of ch.clusters) {
      if (c.nodes.some((x) => x.id === id) || c.id === id) return c;
    }
  }
  return undefined;
}
