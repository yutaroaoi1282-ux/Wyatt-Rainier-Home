import type { ReactNode } from "react";
import { Mask } from "./Reveal";

/**
 * セクション共通見出し。
 * Noto Sans JP ボールド。行ごとにマスクリビールする。
 */
export default function SectionHead({
  lines,
  tone = "dark",
  className = "",
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  /** dark = 明るい背景 / light = 濃い背景 */
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const titleColor = tone === "dark" ? "text-navy" : "text-white";
  return (
    <header className={className}>
      <Tag
        className={`text-[clamp(1.55rem,3.4vw,2.3rem)] font-bold leading-[1.4] tracking-[0.01em] ${titleColor}`}
      >
        {lines.map((line, i) => (
          <Mask key={i} delay={i * 110}>
            {line}
          </Mask>
        ))}
      </Tag>
    </header>
  );
}
