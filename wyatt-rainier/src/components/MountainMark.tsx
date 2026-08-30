type Tone = {
  /** 山体の塗り */
  body: string;
  /** 冠雪(雪面)の塗り */
  snow: string;
  /** 裾の氷河線の塗り */
  line: string;
};

const TONES: Record<"dark" | "light" | "ghost", Tone> = {
  // 明るい背景(ヘッダー等)
  dark: { body: "#123b52", snow: "#ffffff", line: "#5eb3d5" },
  // 写真・ダーク面の上
  light: { body: "#eaf3f8", snow: "#0c2a3d", line: "#a9cfdc" },
  // 薄い透かし
  ghost: {
    body: "rgba(94,179,213,0.28)",
    snow: "rgba(94,179,213,0.12)",
    line: "rgba(94,179,213,0.45)",
  },
};

/**
 * Wyatt Rainier 象徴の「レーニア山」マーク。
 * 実際のレーニアに近い、二つのドームからなる稜線と冠雪、
 * そして裾に流れる氷河の二線から成る。
 */
export default function MountainMark({
  className = "",
  tone = "dark",
  ariaHidden = true,
}: {
  className?: string;
  tone?: keyof typeof TONES;
  ariaHidden?: boolean;
}) {
  const t = TONES[tone];
  return (
    <svg
      viewBox="0 0 144 100"
      className={className}
      aria-hidden={ariaHidden}
      role={ariaHidden ? "presentation" : "img"}
    >
      {/* 山体(左の肩が低い二ドームの稜線) */}
      <path
        d="M4 88
           C 24 84, 36 66, 47 44
           C 53 32, 59 24, 65 26
           C 71 28, 74 24, 81 19
           C 90 12, 99 20, 106 33
           C 117 53, 127 72, 140 88
           Z"
        fill={t.body}
      />
      {/* 冠雪(稜線をなぞり、裾がジグザグ) */}
      <path
        d="M40 50
           L 57 27 L 66 33
           L 80 20 L 108 47
           L 99 43 L 91 49
           L 82 41 L 72 47
           L 62 41 L 53 47
           L 46 45 Z"
        fill={t.snow}
      />
      {/* 氷河の二線 */}
      <rect x="36" y="91.5" width="72" height="2.5" fill={t.line} />
      <rect x="48" y="96.5" width="48" height="2" fill={t.line} opacity="0.7" />
    </svg>
  );
}
