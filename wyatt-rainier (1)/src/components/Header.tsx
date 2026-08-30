"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import MountainMark from "./MountainMark";

const NAV_KEYS = ["home", "about", "products"] as const;
const NAV_PATHS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  about: "/about",
  products: "/products",
};
const LOCALES = ["ja", "en"] as const;

/** Contact の左に置く、下へ開く言語選択(一行ナビ用のコンパクト版) */
function LangMenu() {
  const locale = useLocale() as (typeof LOCALES)[number];
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (target: (typeof LOCALES)[number]) => {
    setOpen(false);
    if (target === locale) return;
    router.replace(pathname || "/", { locale: target });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("label")}
        className={`flex h-9 items-center gap-1.5 border px-2.5 text-[12px] font-medium transition-colors ${
          open
            ? "border-fjord text-fjord"
            : "border-transparent text-ink hover:border-line hover:text-navy"
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="8" />
          <path d="M2.5 10h15M10 2.5c2.6 2.3 2.6 12.7 0 15M10 2.5c-2.6 2.3-2.6 12.7 0 15" />
        </svg>
        <span className="hidden whitespace-nowrap sm:inline">
          {locale === "ja" ? t("ja") : "English (US)"}
        </span>
        <svg
          viewBox="0 0 10 6"
          width="9"
          height="6"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 top-full z-50 mt-2 w-52 border border-line bg-white py-1.5 shadow-[0_16px_40px_-14px_rgba(12,42,61,0.4)]"
        >
          {LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === locale}
              onClick={() => switchTo(code)}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition-colors ${
                code === locale
                  ? "bg-mist/70 font-bold text-fjord"
                  : "text-ink hover:bg-mist/60"
              }`}
            >
              {code === "ja" ? t("ja") : t("en")}
              {code === locale && (
                <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                  <path
                    d="M3 8.5 L6.5 12 L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * ヘッダー。
 * グラス調(半透明+ブラー)のバーで、ナビはあらゆる画面幅で一行。
 * Contact はボタンとして扱う。
 */
export default function Header() {
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ガラス調バー */}
      <div className="border-b border-navy/10 bg-white/65 shadow-[0_10px_34px_-16px_rgba(12,42,61,0.35)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-2 px-4 md:gap-4 md:px-6">
          {/* ロゴ: レーニアの山 + Wyatt Rainier(狭い画面では文字を省略) */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Wyatt Rainier — Home"
          >
            <MountainMark className="h-8 w-[46px] md:h-9 md:w-[52px]" tone="dark" />
            <span className="hidden whitespace-nowrap font-brand text-[1.22rem] font-semibold leading-none tracking-[0.01em] text-navy md:inline">
              {tSite("name")}
            </span>
          </Link>

          {/* 一行ナビ */}
          <nav
            aria-label="Main"
            className="ml-auto flex min-w-0 items-center gap-1 whitespace-nowrap md:gap-2"
          >
            <ul className="flex items-center gap-2 md:gap-4">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={NAV_PATHS[key]}
                    aria-current={isActive(NAV_PATHS[key]) ? "page" : undefined}
                    className={`link-underline block px-0.5 pb-1 text-[12.5px] font-medium transition-colors md:px-1 md:text-[13.5px] ${
                      isActive(NAV_PATHS[key])
                        ? "text-fjord"
                        : "text-ink hover:text-navy"
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 言語選択(Contact の左) */}
            <div className="hidden sm:block">
              <LangMenu />
            </div>

            {/* Contact: ボタン */}
            <Link
              href="/contact"
              aria-current={isActive("/contact") ? "page" : undefined}
              className="ml-1 shrink-0 whitespace-nowrap border border-navy bg-navy px-3 py-2 text-[12px] font-medium tracking-[0.04em] text-white transition-colors duration-300 hover:bg-rainier hover:border-rainier md:ml-1.5 md:px-4 md:text-[12.5px]"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
      </div>

      {/* モバイルのみ: 言語切替を副表示(一行ナビの補完) */}
      <div className="border-b border-navy/10 bg-white/65 px-4 py-1.5 backdrop-blur-xl sm:hidden">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between">
          <span className="font-brand text-[1.05rem] font-semibold leading-none text-navy">
            {tSite("name")}
          </span>
          <LangMenu />
        </div>
      </div>
    </header>
  );
}
