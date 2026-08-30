import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

/**
 * Next.js 16 の Proxy 規約で動作するロケールルーティング。
 * / を既定の /ja に誘導し、/ja・/en のURLを解決する。
 */
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale: "ja",
});

export default handleI18nRouting;

// API・静的アセット・拡張子付きファイルはローカルルーティングの対象外
export const config = {
  matcher: ["/((?!api|_next|images|.*\\..*).*)"],
};
