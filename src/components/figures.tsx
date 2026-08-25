import type { ReactNode } from "react";

const ink = "var(--text-main)";
const muted = "var(--text-muted)";
const accent = "var(--accent)";
const primary = "var(--primary-light)";

function Svg({
  children,
  w = 320,
  h = 220,
  label,
}: {
  children: ReactNode;
  w?: number;
  h?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      role="img"
      aria-label={label}
      className="exam-figure"
    >
      {children}
    </svg>
  );
}

export function ExamFigure({ id }: { id?: string }) {
  if (!id) return null;
  switch (id) {
    case "tri-6-8-10":
      return (
        <Svg label="Rettvinklet trekant med kateter 6 og 8 og hypotenus 10" w={280} h={200}>
          <polygon points="40,160 200,160 200,40" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <rect x="184" y="144" width="16" height="16" fill="none" stroke={ink} />
          <text x="112" y="182" fill={muted} fontSize="14">6</text>
          <text x="212" y="108" fill={muted} fontSize="14">8</text>
          <text x="96" y="88" fill={muted} fontSize="14">10</text>
          <text x="186" y="176" fill={primary} fontSize="14">u</text>
        </Svg>
      );
    case "tri-6-8-10-uv":
      return (
        <Svg label="Rettvinklet trekant med vinkler u og v" w={280} h={200}>
          <polygon points="40,160 200,160 200,40" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <rect x="184" y="144" width="16" height="16" fill="none" stroke={ink} />
          <text x="112" y="182" fill={muted} fontSize="14">6</text>
          <text x="212" y="108" fill={muted} fontSize="14">8</text>
          <text x="96" y="88" fill={muted} fontSize="14">10</text>
          <text x="186" y="52" fill={primary} fontSize="14">u</text>
          <text x="168" y="176" fill={primary} fontSize="14">v</text>
        </Svg>
      );
    case "tri-30-60-90":
      return (
        <Svg label="30-60-90-trekant med sider 1, rot 3 og 2" w={280} h={200}>
          <polygon points="40,170 200,170 40,50" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <rect x="40" y="154" width="16" height="16" fill="none" stroke={ink} />
          <text x="112" y="192" fill={muted} fontSize="14">1</text>
          <text x="12" y="118" fill={muted} fontSize="14">√3</text>
          <text x="132" y="100" fill={muted} fontSize="14">2</text>
          <text x="48" y="78" fill={primary} fontSize="13">30°</text>
          <text x="156" y="164" fill={primary} fontSize="13">60°</text>
        </Svg>
      );
    case "likesidet-2":
      return (
        <Svg label="Likesidet trekant med side 2" w={260} h={200}>
          <polygon points="130,30 30,180 230,180" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <text x="70" y="110" fill={muted} fontSize="14">2</text>
          <text x="176" y="110" fill={muted} fontSize="14">2</text>
          <text x="122" y="196" fill={muted} fontSize="14">2</text>
        </Svg>
      );
    case "likesidet-hoyde":
      return (
        <Svg label="Likesidet trekant med høyde" w={260} h={200}>
          <polygon points="130,28 30,178 230,178" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <line x1="130" y1="28" x2="130" y2="178" stroke={accent} strokeDasharray="4 3" />
          <rect x="130" y="162" width="14" height="14" fill="none" stroke={ink} />
          <text x="70" y="100" fill={muted} fontSize="14">2</text>
          <text x="176" y="100" fill={muted} fontSize="14">2</text>
          <text x="122" y="196" fill={muted} fontSize="14">2</text>
        </Svg>
      );
    case "iso-rett-1":
      return (
        <Svg label="Rettvinklet likebeint trekant med kateter 1" w={220} h={200}>
          <polygon points="40,170 160,170 40,50" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <rect x="40" y="154" width="16" height="16" fill="none" stroke={ink} />
          <text x="92" y="190" fill={muted} fontSize="14">1</text>
          <text x="16" y="118" fill={muted} fontSize="14">1</text>
        </Svg>
      );
    case "v24-gront-areal":
      return (
        <Svg label="Kvadrat delt i grønt område og lite kvadrat" w={260} h={220}>
          <rect x="40" y="30" width="160" height="160" fill="rgba(52,211,153,0.25)" stroke={ink} />
          <rect x="140" y="130" width="60" height="60" fill="var(--bg-elevated)" stroke={ink} />
          <text x="20" y="118" fill={muted} fontSize="13">a</text>
          <text x="108" y="208" fill={muted} fontSize="13">a−b</text>
          <text x="158" y="208" fill={muted} fontSize="13">b</text>
        </Svg>
      );
    case "h24-kvadrat-identitet":
      return (
        <Svg label="Stort kvadrat delt i lite kvadrat og to rektangler" w={260} h={220}>
          <rect x="40" y="30" width="160" height="160" fill="none" stroke={ink} />
          <rect x="40" y="30" width="100" height="160" fill="rgba(52,211,153,0.2)" stroke={ink} />
          <rect x="140" y="30" width="60" height="100" fill="rgba(99,102,241,0.25)" stroke={ink} />
          <rect x="140" y="130" width="60" height="60" fill="var(--bg-elevated)" stroke={ink} />
          <text x="160" y="88" fill={muted} fontSize="13">t</text>
          <text x="160" y="164" fill={muted} fontSize="13">s</text>
          <text x="80" y="208" fill={muted} fontSize="13">t</text>
          <text x="158" y="208" fill={muted} fontSize="13">s</text>
        </Svg>
      );
    case "v24-parabel":
      return (
        <Svg label="Parabel gjennom minus 3, 0 og 4 med toppunkt (0,24)" w={340} h={240}>
          <line x1="20" y1="200" x2="320" y2="200" stroke={muted} />
          <line x1="140" y1="16" x2="140" y2="228" stroke={muted} />
          <path d="M40 220 Q140 -10 280 220" fill="none" stroke={accent} strokeWidth="2.5" />
          <circle cx="80" cy="200" r="4" fill={ink} />
          <circle cx="220" cy="200" r="4" fill={ink} />
          <circle cx="140" cy="28" r="4" fill={ink} />
          <text x="58" y="218" fill={muted} fontSize="12">(−3,0)</text>
          <text x="228" y="218" fill={muted} fontSize="12">(4,0)</text>
          <text x="150" y="32" fill={muted} fontSize="12">(0,24)</text>
        </Svg>
      );
    case "v23-rasjonal":
      return (
        <Svg label="Rasjonal funksjon med asymptoter x=1 og y=3" w={340} h={240}>
          <line x1="20" y1="180" x2="320" y2="180" stroke={muted} />
          <line x1="160" y1="16" x2="160" y2="228" stroke={muted} />
          <line x1="180" y1="16" x2="180" y2="228" stroke={primary} strokeDasharray="5 4" />
          <line x1="20" y1="90" x2="320" y2="90" stroke={primary} strokeDasharray="5 4" />
          <path d="M30 96 C90 100, 150 40, 172 20" fill="none" stroke={accent} strokeWidth="2.4" />
          <path d="M190 220 C210 140, 250 100, 320 94" fill="none" stroke={accent} strokeWidth="2.4" />
        </Svg>
      );
    case "v23-derivert":
      return (
        <Svg label="Grafen til den deriverte med tre nullpunkter" w={340} h={180}>
          <line x1="20" y1="100" x2="320" y2="100" stroke={muted} />
          <line x1="160" y1="16" x2="160" y2="164" stroke={muted} />
          <path d="M40 150 C80 40, 140 40, 180 100 S250 150, 300 30" fill="none" stroke={accent} strokeWidth="2.4" />
          <circle cx="88" cy="100" r="3.5" fill={ink} />
          <circle cx="180" cy="100" r="3.5" fill={ink} />
          <circle cx="258" cy="100" r="3.5" fill={ink} />
        </Svg>
      );
    case "enhetssirkel-50":
      return (
        <Svg label="Enhetssirkel med punkt P og vinkel 50 grader" w={260} h={240}>
          <line x1="20" y1="120" x2="240" y2="120" stroke={muted} />
          <line x1="130" y1="16" x2="130" y2="224" stroke={muted} />
          <circle cx="130" cy="120" r="80" fill="none" stroke={ink} />
          <line x1="130" y1="120" x2="182" y2="58" stroke={accent} />
          <circle cx="182" cy="58" r="4" fill={accent} />
          <text x="186" y="54" fill={muted} fontSize="12">(0,64; 0,77)</text>
          <text x="148" y="112" fill={primary} fontSize="12">50°</text>
        </Svg>
      );
    case "stjerne-12":
      return (
        <Svg label="Davidsstjerne av likesidede trekanter" w={220} h={220}>
          <polygon points="110,20 180,140 40,140" fill="rgba(52,211,153,0.35)" stroke={ink} />
          <polygon points="110,200 40,80 180,80" fill="rgba(99,102,241,0.28)" stroke={ink} />
        </Svg>
      );
    case "tolvkant":
      return (
        <Svg label="Regelmessig tolvkant innskrevet i sirkel" w={240} h={240}>
          <circle cx="120" cy="120" r="90" fill="none" stroke={muted} />
          <polygon
            points="120,30 165,42 198,75 210,120 198,165 165,198 120,210 75,198 42,165 30,120 42,75 75,42"
            fill="rgba(52,211,153,0.25)"
            stroke={ink}
          />
          <line x1="120" y1="120" x2="165" y2="42" stroke={primary} />
          <text x="150" y="92" fill={primary} fontSize="12">30°</text>
        </Svg>
      );
    case "v26-parabel-linje":
      return (
        <Svg label="Parabel y=-x^2+4 og linje y=x-2" w={320} h={240}>
          <line x1="20" y1="140" x2="300" y2="140" stroke={muted} />
          <line x1="160" y1="16" x2="160" y2="224" stroke={muted} />
          <path d="M40 200 Q160 -20 280 200" fill="none" stroke={accent} strokeWidth="2.4" />
          <line x1="40" y1="200" x2="280" y2="80" stroke={primary} strokeWidth="2" />
        </Svg>
      );
    case "v26-parabel-tangent":
      return (
        <Svg label="Parabel med bunnpunkt og tangent med stigning 5" w={320} h={240}>
          <line x1="20" y1="40" x2="300" y2="40" stroke={muted} opacity="0.4" />
          <path d="M40 40 Q140 210 280 30" fill="none" stroke={accent} strokeWidth="2.4" />
          <circle cx="150" cy="188" r="4" fill={ink} />
          <line x1="200" y1="160" x2="290" y2="40" stroke="#f87171" strokeWidth="2" />
          <text x="96" y="210" fill={muted} fontSize="12">(−1, −12,5)</text>
          <text x="232" y="128" fill="#f87171" fontSize="12">5</text>
        </Svg>
      );
    case "v26-45-45-90":
      return (
        <Svg label="Likebeint rettvinklet trekant" w={220} h={180}>
          <polygon points="40,150 180,150 40,30" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <rect x="40" y="134" width="16" height="16" fill="none" stroke={ink} />
          <text x="48" y="78" fill={primary} fontSize="13">45°</text>
          <text x="132" y="144" fill={primary} fontSize="13">45°</text>
        </Svg>
      );
    case "v26-trekant-30":
      return (
        <Svg label="Likesidet trekant med 30 grader og høyde" w={240} h={180}>
          <polygon points="120,24 30,160 210,160" fill="var(--primary-subtle)" stroke={ink} strokeWidth="2" />
          <line x1="120" y1="24" x2="120" y2="160" stroke={accent} />
          <text x="126" y="70" fill={primary} fontSize="12">30°</text>
          <text x="58" y="92" fill={muted} fontSize="13">4</text>
          <text x="168" y="92" fill={muted} fontSize="13">4</text>
        </Svg>
      );
    case "h23-to-trekanter":
      return (
        <Svg label="To trekanter, 150 grader og 32 grader" w={360} h={160}>
          <polygon points="20,80 140,40 140,120" fill="var(--primary-subtle)" stroke={ink} />
          <text x="70" y="54" fill={muted} fontSize="12">6</text>
          <text x="70" y="118" fill={muted} fontSize="12">6</text>
          <text x="108" y="84" fill={primary} fontSize="11">150°</text>
          <polygon points="210,120 330,120 300,30" fill="var(--accent-subtle)" stroke={ink} />
          <text x="250" y="138" fill={muted} fontSize="12">6</text>
          <text x="322" y="80" fill={muted} fontSize="12">6</text>
          <text x="226" y="108" fill={primary} fontSize="11">32°</text>
        </Svg>
      );
    case "h23-seks-grafer":
      return (
        <Svg label="Seks grafer av rasjonale funksjoner merket A til F" w={360} h={240}>
          {[
            ["A", 20, 20],
            ["B", 130, 20],
            ["C", 240, 20],
            ["D", 20, 128],
            ["E", 130, 128],
            ["F", 240, 128],
          ].map(([lab, x, y]) => (
            <g key={lab} transform={`translate(${x},${y})`}>
              <rect width="100" height="100" rx="8" fill="var(--bg-elevated)" stroke={ink} />
              <line x1="8" y1="70" x2="92" y2="70" stroke={muted} />
              <line x1="40" y1="8" x2="40" y2="92" stroke={muted} />
              <text x="8" y="18" fill={primary} fontSize="12">{lab}</text>
            </g>
          ))}
        </Svg>
      );
    case "h23-firkant":
      return (
        <Svg label="Firkant ABCD med diagonal DB" w={280} h={200}>
          <polygon points="40,160 200,170 230,40 70,50" fill="var(--primary-subtle)" stroke={ink} />
          <line x1="40" y1="160" x2="230" y2="40" stroke={accent} strokeDasharray="4 3" />
          <text x="48" y="176" fill={muted} fontSize="12">A</text>
          <text x="206" y="188" fill={muted} fontSize="12">B</text>
          <text x="236" y="36" fill={muted} fontSize="12">C</text>
          <text x="52" y="44" fill={muted} fontSize="12">D</text>
          <text x="210" y="110" fill={muted} fontSize="12">6</text>
          <text x="140" y="36" fill={muted} fontSize="12">8</text>
          <text x="128" y="118" fill={primary} fontSize="12">12</text>
        </Svg>
      );
    case "h25-firkant":
      return (
        <Svg label="Firkant ABCD med diagonal AC" w={280} h={200}>
          <polygon points="50,160 210,160 240,50 80,40" fill="var(--primary-subtle)" stroke={ink} />
          <line x1="50" y1="160" x2="240" y2="50" stroke={accent} />
          <text x="48" y="178" fill={muted} fontSize="12">A</text>
          <text x="214" y="178" fill={muted} fontSize="12">B</text>
          <text x="246" y="46" fill={muted} fontSize="12">C</text>
          <text x="62" y="36" fill={muted} fontSize="12">D</text>
        </Svg>
      );
    case "v26-abd":
      return (
        <Svg label="Trekanter ADC og ACB som deler side AC" w={300} h={200}>
          <polygon points="40,160 160,40 220,160" fill="var(--primary-subtle)" stroke={ink} />
          <polygon points="160,40 270,90 220,160" fill="var(--accent-subtle)" stroke={ink} />
          <text x="28" y="176" fill={muted} fontSize="12">D</text>
          <text x="150" y="32" fill={muted} fontSize="12">A</text>
          <text x="226" y="178" fill={muted} fontSize="12">C</text>
          <text x="276" y="88" fill={muted} fontSize="12">B</text>
        </Svg>
      );
    case "femkanttall":
      return (
        <Svg label="Figurtall som vokser som femkanter" w={340} h={140}>
          <circle cx="30" cy="80" r="10" fill="#fbbf24" />
          <circle cx="110" cy="80" r="10" fill="#fbbf24" />
          <circle cx="90" cy="50" r="10" fill="#fb7185" />
          <circle cx="130" cy="50" r="10" fill="#fb7185" />
          <circle cx="90" cy="110" r="10" fill="#fb7185" />
          <circle cx="130" cy="110" r="10" fill="#fb7185" />
          <circle cx="230" cy="80" r="10" fill="#fbbf24" />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={210 + Math.cos((i * 72 * Math.PI) / 180) * 32} cy={80 + Math.sin((i * 72 * Math.PI) / 180) * 32} r="10" fill="#fb7185" />
          ))}
        </Svg>
      );
    default:
      return null;
  }
}
