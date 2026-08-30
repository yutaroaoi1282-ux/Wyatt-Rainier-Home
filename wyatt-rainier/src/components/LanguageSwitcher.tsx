"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

const CLOSED_KEY = "wyatt.rainier.lang-switcher-closed";
const CONSENT_KEY = "wyatt.rainier.consent";
const LOCALES = ["ja", "en"] as const;

/**
 * 画面右下に浮かぶ言語選択。
 * 初回アクセス(未クローズ)の時のみ表示され、✕ で閉じると再表示しない。
 * Cookie 同意バーが表示中は、その上段に配置して干渉を避ける。
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [aboveBar, setAboveBar] = useState(false);

  useEffect(() => {
    setMounted(true);
    let closed = false;
    let consented = false;
    try {
      closed = Boolean(localStorage.getItem(CLOSED_KEY));
      consented = Boolean(localStorage.getItem(CONSENT_KEY));
    } catch {
      /* 無視 */
    }
    setAboveBar(!consented);
    if (closed) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShown(true), reduced ? 0 : 550);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted || !shown) return null;

  const switchTo = (target: (typeof LOCALES)[number]) => {
    if (target === locale) return;
    router.replace(window.location.pathname.replace(/^\/(ja|en)(?=\/|$)/, ""), {
      locale: target,
    });
  };

  const close = () => {
    try {
      localStorage.setItem(CLOSED_KEY, "1");
    } catch {
      /* 無視 */
    }
    setShown(false);
  };

  return (
    <div
      className={`fixed right-5 z-[90] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        aboveBar ? "bottom-[5.6rem] md:bottom-6" : "bottom-6"
      }`}
    >
      <div
        className="flex items-stretch border border-line bg-white shadow-[0_10px_30px_-10px_rgba(12,42,61,0.35)]"
        role="group"
        aria-label={t("label")}
      >
        <span className="flex items-center pl-3 pr-1 text-fjord" aria-hidden="true">
          <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="10" cy="10" r="8" />
            <path d="M2.5 10h15M10 2.5c2.6 2.3 2.6 12.7 0 15M10 2.5c-2.6 2.3-2.6 12.7 0 15" />
          </svg>
        </span>
        {LOCALES.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              onClick={() => switchTo(code)}
              aria-pressed={active}
              className={`px-4 py-2.5 text-[12px] font-medium tracking-wide transition-colors duration-200 ${
                active ? "bg-navy text-white" : "text-ink-soft hover:bg-mist hover:text-navy"
              }`}
            >
              {code === "ja" ? t("ja") : t("en")}
            </button>
          );
        })}
        <button
          type="button"
          onClick={close}
          aria-label={t("close")}
          className="ml-1 border-l border-line px-2.5 text-ink-soft transition-colors hover:bg-mist hover:text-navy"
        >
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
