import type { ReactNode } from "react";
import { Link } from "@/navigation";
import { Mask } from "./Reveal";

/**
 * サブページ共通ヘッダー。
 * レーニアの等高線モチーフを背景に配し、紙面としての質感を出す。
 */
export default function PageHero({
  crumb,
  lines,
  lede,
  meta,
}: {
  crumb: string;
  lines: ReactNode[];
  lede?: string;
  meta?: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist pt-16">
      {/* 等高線(装飾) */}
      <svg
        className="pointer-events-none absolute -right-24 top-0 hidden h-[130%] w-auto text-glacier/35 md:block"
        viewBox="0 0 420 520"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="1">
          <path d="M190 88 C250 40 330 52 372 108 C414 164 400 250 340 296 C280 342 180 330 140 268 C100 206 130 136 190 88 Z" />
          <path d="M204 130 C246 96 308 104 340 148 C372 192 360 252 316 286 C272 320 198 310 170 264 C142 218 162 164 204 130 Z" />
          <path d="M220 170 C248 148 290 152 312 182 C334 212 324 252 294 274 C264 296 216 288 198 256 C180 224 192 192 220 170 Z" />
          <path d="M238 206 C256 194 278 198 290 214 C302 230 296 250 278 260 C260 270 236 264 228 248 C220 232 226 218 238 206 Z" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-[1180px] px-5 pb-12 pt-10 md:px-6 md:pb-16 md:pt-14">
        <nav aria-label="Breadcrumb" className="font-mono text-[10.5px] tracking-[0.22em] text-ink-soft">
          <ol className="flex items-center gap-2.5">
            <li>
              <Link href="/" className="link-underline hover:text-navy">
                HOME
              </Link>
            </li>
            <li aria-hidden="true" className="text-glacier">
              /
            </li>
            <li aria-current="page" className="text-fjord">
              {crumb}
            </li>
          </ol>
        </nav>

        <h1 className="mt-8 text-[clamp(1.9rem,4.6vw,3.1rem)] font-bold leading-[1.35] text-navy">
          {lines.map((line, i) => (
            <Mask key={i} delay={i * 120}>
              {line}
            </Mask>
          ))}
        </h1>
        {lede && (
          <p className="lede mt-6 max-w-[640px] text-[15px] text-ink">{lede}</p>
        )}
        {meta && meta.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-5 font-mono text-[10.5px] tracking-[0.18em] text-ink-soft">
            {meta.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span className="h-[5px] w-[5px] bg-fjord" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
