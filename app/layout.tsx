
import type { Metadata, Viewport } from "next";
import "./globals.css";

/* =========================================
   SINKMOA 홈페이지 공통 설정

   - 파비콘
   - 카카오톡 링크 미리보기
   - 네이버 / 구글 검색 정보
   - Open Graph
   - Twitter / X 카드
========================================= */

const SITE_URL = "https://www.sinkmoa.com";

const BRAND = "싱크모아";

const SITE_TITLE =
  "싱크모아 | 프리미엄 사각 싱크볼 판매 및 설치";

const SITE_DESCRIPTION =
  "백조, 리젠스, 벨라고, 아티잔 프리미엄 사각 싱크볼. 싱크볼 제품 선택부터 교체 및 설치 상담까지, 싱크모아에서 편리하게 문의하세요.";

const LOGO_IMAGE =
  "/5C4799F6-712E-4F0E-8030-2B96BB5FC1C9.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${BRAND}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: BRAND,

  keywords: [
    "싱크모아",
    "싱크볼",
    "사각싱크볼",
    "싱크볼교체",
    "싱크볼설치",
    "인셋싱크볼",
    "백조싱크볼",
    "리젠스싱크볼",
    "벨라고싱크볼",
    "아티잔싱크볼",
    "주방싱크볼",
    "싱크볼판매",
    "싱크볼시공",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  /* 파비콘 및 모바일 홈 화면 아이콘 */

  icons: {
    icon: [
      {
        url: LOGO_IMAGE,
        type: "image/png",
        sizes: "any",
      },
    ],

    shortcut: LOGO_IMAGE,

    apple: [
      {
        url: LOGO_IMAGE,
        type: "image/png",
      },
    ],
  },

  /* 카카오톡, 네이버, 페이스북 공유 미리보기 */

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: BRAND,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    images: [
      {
        url: LOGO_IMAGE,
        width: 1024,
        height: 1024,
        alt: "싱크모아 SINKMOA 프리미엄 로고",
        type: "image/png",
      },
    ],
  },

  /* X 및 기타 공유 카드 */

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [LOGO_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  category: "shopping",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#19262B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
