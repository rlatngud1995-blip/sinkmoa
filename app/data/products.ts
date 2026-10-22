
export type BrandSlug =
  | "regens"
  | "bellago"
  | "artisan"
  | "baekjo";

export type SinkProduct = {
  id: string;
  brand: BrandSlug;
  name: string;
  price: number;
  width?: number;
  depth?: number;
  installationType?: string;
  description?: string;
};

export const BRANDS: Record<
  BrandSlug,
  { name: string; english: string }
> = {
  regens: {
    name: "리젠스",
    english: "REGENS",
  },
  bellago: {
    name: "벨라고",
    english: "BELLAGO",
  },
  artisan: {
    name: "아티잔",
    english: "ARTISAN",
  },
  baekjo: {
    name: "백조",
    english: "BAEKJO",
  },
};

/* =========================================
   싱크모아 판매 상품 목록

   제품 사진은 추후 추가 예정
   실제 판매 모델과 가격만 등록
========================================= */

export const PRODUCTS: SinkProduct[] = [
  {
    id: "baekjo-goni-8630",
    brand: "baekjo",
    name: "백조 고니 8630",
    price: 390000,
    width: 780,
    depth: 400,
    installationType: "인셋",
    description:
      "백조 고니 8630 인셋 싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },
];

/* =========================================
   브랜드별 상품 조회
========================================= */

export function getProductsByBrand(
  brand: BrandSlug
): SinkProduct[] {
  return PRODUCTS.filter(
    (product) => product.brand === brand
  );
}

/* =========================================
   상품 ID로 개별 상품 조회
========================================= */

export function getProductById(
  id: string
): SinkProduct | undefined {
  return PRODUCTS.find(
    (product) => product.id === id
  );
}

/* =========================================
   가격 표시
========================================= */

export function formatPrice(
  price: number
): string {
  return price.toLocaleString("ko-KR") + "원";
}
