import MountainMark from "./MountainMark";

/**
 * VisionAir の画面イメージ。
 * ストック写真ではなく UI をそのまま CSS で構築し、
 * 実在するアプリのスクリーンショットとしての信頼感を持たせる。
 */
export default function VisionAirMock({
  className = "",
  float = false,
}: {
  className?: string;
  float?: boolean;
}) {
  return (
    <figure
      className={`relative ${float ? "anim-float" : ""} ${className}`}
      aria-label="VisionAir アプリの画面イメージ"
    >
      <div className="overflow-hidden border border-navy/20 bg-[#f7fafb] shadow-[0_30px_60px_-25px_rgba(11,31,48,0.45)]">
        {/* ウィンドウバー */}
        <div className="flex items-center justify-between border-b border-[#dfe7ec] bg-[#eef3f6] px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <MountainMark className="h-4 w-5" tone="dark" />
            <span className="text-[11px] font-medium tracking-wide text-navy">
              四半期レビュー_v3.psv
            </span>
            <span className="hidden rounded-[2px] bg-glacier/25 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-fjord sm:block">
              AUTO-LAYOUT ON
            </span>
          </div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#c3d2da]" />
            <span className="h-2 w-2 rounded-full bg-[#c3d2da]" />
            <span className="h-2 w-2 rounded-full bg-fjord/60" />
          </div>
        </div>

        <div className="flex">
          {/* 左:スライドサムネイル */}
          <div className="hidden w-[104px] shrink-0 space-y-2 border-r border-[#e3eaee] bg-[#eef2f4] p-2.5 sm:block">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative aspect-[16/10] border p-1.5 ${
                  i === 2
                    ? "border-fjord bg-white shadow-[0_0_0_1px_#2e6d94]"
                    : "border-[#d5dfe5] bg-white/70"
                }`}
              >
                <div className={`h-[3px] w-3/4 ${i === 2 ? "bg-navy" : "bg-[#c8d5dc]"}`} />
                <div className="mt-1 space-y-[3px]">
                  <div className="h-[2px] w-full bg-[#dde6eb]" />
                  <div className="h-[2px] w-2/3 bg-[#dde6eb]" />
                </div>
                {i === 1 && (
                  <div className="absolute bottom-1.5 left-1.5 flex items-end gap-[2px]">
                    <span className="h-2 w-1 bg-glacier" />
                    <span className="h-3 w-1 bg-glacier" />
                    <span className="h-2.5 w-1 bg-glacier" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 中央:スライド本体 */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="flex min-h-[190px] flex-col justify-between border border-[#d5dfe5] bg-white p-4 sm:min-h-[220px] sm:p-5">
              <div>
                <p className="font-mono text-[8.5px] tracking-[0.3em] text-fjord">
                  WYATT · Q3 2025
                </p>
                <h4 className="mt-2 font-heading text-[17px] font-bold leading-snug text-navy sm:text-[19px]">
                  四半期レビュー
                  <span className="ml-2 text-[12px] font-medium text-ink-soft">
                    売上は前年比 +18%
                  </span>
                </h4>
              </div>

              <div className="grid grid-cols-5 items-end gap-2 sm:gap-3">
                <div className="col-span-2 space-y-1.5">
                  <div className="h-[3px] w-11/12 bg-[#d3dee4]" />
                  <div className="h-[3px] w-full bg-[#d3dee4]" />
                  <div className="h-[3px] w-4/6 bg-[#d3dee4]" />
                  <div className="mt-3 inline-flex items-center gap-1.5 border border-fjord/40 px-2 py-1 font-mono text-[8.5px] tracking-widest text-fjord">
                    自動で整いました
                  </div>
                </div>
                <div className="col-span-3 flex h-[72px] items-end gap-[6px] sm:h-[84px]" aria-hidden="true">
                  {[34, 48, 41, 58, 52, 66, 78, 92].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 ${i >= 6 ? "bg-fjord" : "bg-glacier/50"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 右下にツールチップ風の注記 */}
            <div className="mt-3 flex items-center justify-between font-mono text-[9px] tracking-widest text-ink-soft">
              <span>SLIDE 03 / 08</span>
              <span>字間・余白を自動調整中…</span>
            </div>
          </div>
        </div>

        {/* ステータスバー */}
        <div className="flex items-center justify-between border-t border-[#dfe7ec] bg-[#eef3f6] px-4 py-2 font-mono text-[9.5px] tracking-widest text-ink-soft">
          <span>自動保存済み 14:02</span>
          <span className="flex items-center gap-3">
            <span>OFFLINE-READY</span>
            <span className="text-fjord">0.9s STARTUP</span>
          </span>
        </div>
      </div>

      {/* 浮かぶ注記バッジ */}
      <div className="absolute -right-3 -top-3 hidden rotate-2 border border-navy/15 bg-abyss px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-ice shadow-lg md:block">
        起動 <span className="text-glacier">0.9s</span>
      </div>
    </figure>
  );
}
