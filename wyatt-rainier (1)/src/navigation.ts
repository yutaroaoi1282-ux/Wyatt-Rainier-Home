import { createNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./i18n";

/**
 * ローカル対応のナビゲーション。
 * Link はパスに自動で現在のロケアルプレフィックスを付ける。
 */
export const { Link, usePathname, useRouter, redirect } = createNavigation({
  locales,
  defaultLocale,
});
