import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "싱크볼 주문·설치 견적 문의",
  description:
    "원하는 사각 싱크볼과 설치 여부, 상판 타공·올스텐 배수구·6WAY 수전 옵션을 고르면 예상 금액이 바로 계산됩니다. 문자로 주문·설치 견적을 요청하세요.",
  alternates: { canonical: "/order" },
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
