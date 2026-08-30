import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import MountainMark from "./MountainMark";

const SITE_LINKS = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "contact", href: "/contact" },
] as const;

export default async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const ts = await getTranslations("site");

  return (
    <footer className="relative overflow-hidden bg-abyss text-ice/80">
      <MountainMark
        tone="ghost"
        className="pointer-events-none absolute -right-10 -top-12 h-64 w-80 opacity-60"
      />

      <div className="relative mx-auto max-w-[1180px] px-5 py-14 md:px-6">
        {/* 最上段: ロゴ + ビジョン */}
        <div className="flex flex-col gap-8 border-b border-navy pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <MountainMark className="h-11 w-[58px]" tone="light" />
              <span className="font-brand text-[1.7rem] font-semibold leading-none tracking-[0.01em] text-ice">
                {ts("name")}
              </span>
            </div>
            <p className="mt-5 max-w-md text-[14.5px] font-medium leading-7 text-glacier">
              {t("vision")}
            </p>
          </div>

          <a
            href="#main"
            className="group inline-flex w-max items-center gap-3 border border-navy px-5 py-2.5 text-[11.5px] font-medium tracking-[0.14em] text-ice/70 transition-colors hover:border-glacier hover:text-ice"
          >
            {t("backToTop")}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </a>
        </div>

        {/* 中段: カラム */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-10 md:grid-cols-4">
          <nav aria-label="Sitemap">
            <h3 className="text-[10.5px] font-medium tracking-[0.24em] text-glacier/75">
              {t("site")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {SITE_LINKS.map((s) => (
                <li key={s.key}>
                  <Link href={s.href} className="link-underline text-ice/85 hover:text-ice">
                    {tn(s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products">
            <h3 className="text-[10.5px] font-medium tracking-[0.24em] text-glacier/75">
              {t("product")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <Link href="/products" className="link-underline text-ice/85 hover:text-ice">
                  {t("productVisionair")}
                </Link>
              </li>
              <li>
                <Link href="/products#spec" className="link-underline text-ice/85 hover:text-ice">
                  {t("productSpec")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact?subject=download"
                  className="link-underline text-ice/85 hover:text-ice"
                >
                  {t("productDownload")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.24em] text-glacier/75">
              {t("contact")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <a
                  href={`mailto:${ts("email")}`}
                  className="link-underline text-ice/85 hover:text-ice"
                >
                  {ts("email")}
                </a>
              </li>
              <li className="text-ice/55">{t("hours")}</li>
              <li className="text-ice/55">{t("reply")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10.5px] font-medium tracking-[0.24em] text-glacier/75">
              {t("office")}
            </h3>
            <address className="mt-4 space-y-1.5 text-[13.5px] not-italic leading-[1.8] text-ice/55">
              <p>{ts("address")}</p>
              <p>
                <a href={`mailto:${ts("email")}`} className="link-underline text-ice/75 hover:text-ice">
                  {ts("address2")}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* 最下段 */}
        <div className="flex flex-col gap-3 border-t border-navy pt-6 text-[11px] tracking-[0.06em] text-ice/45 md:flex-row md:items-center md:justify-between">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="/contact#privacy" className="link-underline hover:text-ice/80">
              {t("privacy")}
            </Link>
            <Link href="/contact" className="link-underline hover:text-ice/80">
              {t("contactLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
