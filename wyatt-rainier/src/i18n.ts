import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

export const locales = ["ja", "en"] as const;
export const defaultLocale = "ja" as const;
export type Locale = (typeof locales)[number];

/**
 * next-intl のリクエスト設定。
 * どの言語で応答するかをリクエスト単位で解決し、対応するメッセージを読み込む。
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !hasLocale(locales, locale)) {
    locale = "ja";
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
