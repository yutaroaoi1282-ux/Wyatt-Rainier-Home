import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // /ja や /en を必ず付ける
});

export const config = {
  // 静的ファイルや api などは除外
  matcher: [
    // すべてのパスを対象にするが、_next や静的ファイルは除外
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
