
import type { MetadataRoute } from "next";

const SITE_URL = "https://www.sinkmoa.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/ 는 CSS·JS가 있어 차단하면 검색엔진이 화면을 제대로 렌더링하지 못함
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
