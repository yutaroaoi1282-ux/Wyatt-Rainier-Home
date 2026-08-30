import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

// next-intl: リクエスト設定(src/i18n.ts)を明示的に指定する
const withNextIntlPlugin = withNextIntl({
  requestConfig: "./src/i18n.ts",
});

export default withNextIntlPlugin(nextConfig);
