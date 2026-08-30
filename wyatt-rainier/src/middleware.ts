import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale: "ja",
});

// API・静的アセット・拡張子付きファイルはローカルルーティングの対象外
export const config = {
  matcher: ["/((?!api|_next|images|.*\\..*).*)"],
};
