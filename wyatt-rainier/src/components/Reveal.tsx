"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IO が使えない環境では常に表示
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // 画面内(折りたたみ上)に既にある要素は、非同期の IO コールバックを待たずに
    // 即表示する。これで「ヒーローが非表示のまま白背景に見える」状況を回避する。
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    let cancelled = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          if (!cancelled) setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);

    // 最終的なセーフティネット: 極端な場合でも表示され続ける事がないよう 1.5s で解放
    const safety = window.setTimeout(() => {
      if (!cancelled) setVisible(true);
      io.disconnect();
    }, 1500);

    return () => {
      cancelled = true;
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, [threshold]);

  return { ref, visible };
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * 視界に入ると上に浮上して現れるコンテナ。
 * prefers-reduced-motion の場合、表示のみ(移動なし)。
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, visible } = useInView<HTMLDivElement>();
  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: reduced
          ? "none"
          : `opacity 0.9s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * 行マスクリビール — 見出しを1行ずつ下から引き上げる演出。
 */
export function Mask({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  const shown = visible || reduced;

  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <span
        className="block will-change-transform"
        style={{
          transform: shown ? "translateY(0)" : "translateY(112%)",
          transition: reduced
            ? "none"
            : `transform 1.05s ${EASE} ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * カウントアップ数値。
 */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1400,
  className = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { ref, visible } = useInView<HTMLSpanElement>(0.6);
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration, reduced]);

  const formatted = display.toLocaleString("ja-JP", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
