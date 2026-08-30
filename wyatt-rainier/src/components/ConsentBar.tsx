"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const STORAGE_KEY = "wyatt.rainier.consent";

/**
 * Cookie・個人情報の同意バー。
 * 一度選択(許可/拒否)すると localStorage に保存され、以降は表示しない。
 */
export default function ConsentBar() {
  const t = useTranslations("consent");
  const [shown, setShown] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* SSR・プライバシーモードでは無視 */
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setShown(true), reduced ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* 保存できても画面は閉じる */
    }
    setLeaving(true);
    window.setTimeout(() => setShown(false), 450);
  };

  if (!shown) return null;

  return (
    <div
      role="region"
      aria-label={t("label")}
      className={`fixed inset-x-0 bottom-0 z-[85] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        leaving ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="border-t border-navy bg-abyss/97 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:gap-8 md:px-6">
          <p className="flex-1 text-[12.5px] leading-[1.85] text-white/85">
            {t("text")}{" "}
            <Link
              href="/contact#privacy"
              className="link-underline whitespace-nowrap font-medium text-glacier"
            >
              {t("policy")}
            </Link>
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="bg-glacier px-6 py-2.5 text-[12px] font-bold tracking-[0.12em] text-abyss transition-colors duration-200 hover:bg-white"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => decide("declined")}
              className="border border-white/30 px-6 py-2.5 text-[12px] font-medium tracking-[0.12em] text-white/80 transition-colors duration-200 hover:border-white/70 hover:text-white"
            >
              {t("reject")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
