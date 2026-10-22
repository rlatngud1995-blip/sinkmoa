
import type { Metadata } from "next";
import "./globals.css";

const SITE = "https://www.sinkmoa.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "싱크모아 | 싱크볼 판매 및 설치 전문몰",
    template: "%s | 싱크모아",
  },
  description:
    "싱크모아는 리젠스, 벨라고, 아티잔, 백조 싱크볼을 판매하고 설치 상담을 제공합니다. 제품 단독 구매 및 설치 포함 견적 문의가 가능합니다.",
  keywords: [
    "싱크모아",
    "싱크볼",
    "사각싱크볼",
    "싱크볼교체",
    "싱크볼설치",
    "백조싱크볼",
    "리젠스싱크볼",
    "벨라고싱크볼",
    "아티잔싱크볼",
    "싱크볼판매",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "싱크모아 | 싱크볼 판매 및 설치 전문몰",
    description:
      "리젠스·벨라고·아티잔·백조 싱크볼 판매 및 설치 상담",
    url: SITE,
    siteName: "싱크모아",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
