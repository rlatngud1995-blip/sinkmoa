
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
   싱크모아 전체 판매 상품

   제품 사진은 추후 추가 예정
   제품 규격은 사용자 제공 기준
========================================= */

export const PRODUCTS: SinkProduct[] = [
  /* =====================================
     백조
  ===================================== */
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

  /* =====================================
     리젠스
  ===================================== */
  {
    id: "regens-8603-emboss",
    brand: "regens",
    name: "리젠스 사각 싱크볼 8603 엠보",
    price: 420000,
    width: 780,
    depth: 400,
    installationType: "인셋",
    description:
      "리젠스 8603 엠보 사각 싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },

  /* =====================================
     벨라고
  ===================================== */
  {
    id: "bellago-ble-858",
    brand: "bellago",
    name: "벨라고 BLE-858 벨리타 엠보",
    price: 440000,
    width: 794,
    depth: 404,
    installationType: "인셋",
    description:
      "벨라고 BLE-858 벨리타 엠보 인셋 싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },

  /* =====================================
     아티잔
  ===================================== */
  {
    id: "artisan-du858blr",
    brand: "artisan",
    name: "아티잔 DU858BLR 사각싱크볼",
    price: 420000,
    width: 794,
    depth: 400,
    installationType: "인셋",
    description:
      "아티잔 DU858BLR 인셋 사각싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
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
   상품 ID로 조회
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
