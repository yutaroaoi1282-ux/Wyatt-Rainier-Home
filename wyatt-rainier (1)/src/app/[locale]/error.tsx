"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useRouter } from "@/navigation";
import MountainMark from "@/components/MountainMark";

/**
 * セグメント単位のエラーバウンダリ。
 * 遷移中のエラーで白画面になるのを防ぎ、再試行を促す。
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");
  const router = useRouter();
  const pathname = usePathname();

  const goHome = () => {
    reset();
    router.replace("/", { scroll: false });
  };

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
      <MountainMark className="h-20 w-28 opacity-70" tone="dark" />
      <h1 className="mt-8 text-[1.4rem] font-bold text-navy">{t("title")}</h1>
      <p className="mt-3 max-w-[360px] text-[14px] leading-relaxed text-ink-soft">
        {t("desc")}
      </p>
      {error?.digest && (
        <p className="mt-2 text-[10.5px] tracking-[0.12em] text-ink-soft/60">
          ref: {error.digest}
        </p>
      )}
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="bg-navy px-7 py-3 text-[12px] font-medium tracking-[0.18em] text-white transition-colors hover:bg-rainier"
        >
          {t("retry")}
        </button>
        <button
          type="button"
          onClick={goHome}
          className="border border-navy/40 px-7 py-3 text-[12px] font-medium tracking-[0.18em] text-navy transition-colors hover:border-navy"
        >
          {t("home")}
        </button>
      </div>
    </section>
  );
}
