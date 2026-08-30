import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Outfit } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ConsentBar from "@/components/ConsentBar";

/* 基本・見出し: Noto Sans JP / ロゴ: Outfit(Alexa Std 同等の意図) */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wyatt Rainier",
    template: "%s | Wyatt Rainier",
  },
  description:
    "Wyatt Rainier — software that solves your concerns and blends into daily life. Since 2019, we have built light, unified, intuitive products, led by VisionAir, the free slide application.",
};

export const viewport: Viewport = {
  themeColor: "#0c2a3d",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = await getTranslations("accessibility");

  return (
    <html lang={locale} className={`${notoSansJP.variable} ${outfit.variable}`}>
      <body className="bg-paper text-ink">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="absolute left-4 top-4 z-[100] -translate-y-[200%] bg-navy px-4 py-2.5 text-[12px] font-medium text-white transition-transform focus:translate-y-0"
          >
            {t("skip")}
          </a>
          <div className="grain" aria-hidden="true" />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <LanguageSwitcher />
          <ConsentBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
