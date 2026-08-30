import type { SVGProps } from "react";

/**
 * Wyatt 専用的アイコン群。
 * 汎用ライブラリではなく、ブランドの「山・線」のモチーフに合わせた自前パス。
 * 共通: 24×24 / stroke 1.75 / round cap
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* 美しさ — 山稜を結ぶ弧 */
export function BeautyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 18 L9.5 7 L14 13.5 L17 9 L21 18" />
      <path d="M3 18 H21" opacity={0.45} />
      <circle cx="17.5" cy="4.5" r="1.4" />
    </Base>
  );
}

/* 日常へのフィット — 家と重なる輪 */
export function FitIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 11 L10.5 4.5 L17 11 V19.5 H4 Z" />
      <circle cx="16" cy="15" r="4.4" />
    </Base>
  );
}

/* 統一感 — 揃えられた三線と稜 */
export function UnityIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 7 H20.5" />
      <path d="M3.5 12 H20.5" />
      <path d="M3.5 17 H20.5" />
      <path d="M9 7 L12 3.5 L15 7" fill="var(--color-paper, #f3f5f6)" />
    </Base>
  );
}

/* 直感 — 手が自然に向かう一点 */
export function IntuitionIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" opacity={0.5} />
      <path d="M12 12 L18.5 5.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M16.2 5.2 L18.8 5 L18.6 7.6" />
    </Base>
  );
}

/* 軽量さ — 羽 */
export function FeatherIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M19.5 4.5 C13 4.5 6.5 10 5 19.5 C14.5 18 20 11.5 19.5 4.5 Z" />
      <path d="M5 19.5 L15 9.5" opacity={0.55} />
      <path d="M9.5 16.5 H14.5 M12 13.8 H16.2" opacity={0.55} />
    </Base>
  );
}

/* オフライン — 切れのある雲 */
export function CloudOffIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.5 18.5 H16 A4 4 0 0 0 16.5 10.6 A6 6 0 0 0 5.6 11" />
      <path d="M5.8 15.4 A4 4 0 0 0 7.5 18.5" />
      <path d="M15 18.5 A4 4 0 0 0 17.2 12.2" />
      <path d="M4 4 L20 20" />
    </Base>
  );
}

/* 自動レイアウト — 整ったグリッド */
export function LayoutIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" />
      <path d="M3.5 9.5 H20.5" />
      <path d="M9.5 9.5 V19.5" />
      <path d="M13.5 13 H16.5 M13.5 15.5 H16.5" opacity={0.55} />
    </Base>
  );
}

/* 共有 — 一本のリンク */
export function LinkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9.5 14.5 L14.5 9.5" />
      <path d="M11 6.8 L13.2 4.6 A3.4 3.4 0 0 1 18 9.4 L15.8 11.6" />
      <path d="M13 17.2 L10.8 19.4 A3.4 3.4 0 0 1 6 14.6 L8.2 12.4" />
    </Base>
  );
}

/* プレゼン — 画面と再生線 */
export function PresentIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="12" />
      <path d="M10.5 8.5 L14.5 11 L10.5 13.5 Z" />
      <path d="M12 17 V20 M8.5 20 H15.5" />
    </Base>
  );
}

/* メール — 封筒のフタが稜線になっている宛地アイコン */
export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="M3.5 6.5 L12 13.5 L20.5 6.5" />
      <path d="M8.5 18.2 L10.6 15.6 L12.6 17.6 L14.8 14.8 L16.6 18.2" opacity={0.55} />
    </Base>
  );
}

/* 矢印(リンク用・右向き) */
export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12 H19" />
      <path d="M14 6.5 L19.5 12 L14 17.5" />
    </Base>
  );
}

/* チェック */
export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4.5 12.5 L9.5 17.5 L19.5 6.5" />
    </Base>
  );
}
