import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import MountainMark from "@/components/MountainMark";

export default function NotFound() {
  const t = useTranslations("notfound");

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-16 text-center">
      <MountainMark className="h-20 w-[106px] opacity-70" tone="dark" />
      <p className="mt-8 text-[11px] tracking-[0.3em] text-fjord">404</p>
      <h1 className="mt-3 text-[1.5rem] font-bold text-navy">{t("title")}</h1>
      <p className="mt-2 text-[13px] text-ink-soft">{t("desc")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-[12px] font-medium tracking-[0.2em] text-white transition-colors hover:bg-rainier"
      >
        {t("home")}
      </Link>
    </section>
  );
}
