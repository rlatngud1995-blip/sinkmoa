
/* =========================================
   SINKMOA PRODUCT DATABASE

   싱크모아 상품 관리 파일

   이 파일에서 관리하는 정보:
   - 브랜드
   - 모델명
   - 판매가격
   - 상판 타공 사이즈
   - 설치 방식
   - 상품 설명

   주의:
   width / depth는 제품 외경이 아니라
   상판 타공 사이즈(mm)입니다.

   사진과 SEO 관련 정보는 추후 추가합니다.
========================================= */

/* =========================================
   브랜드 타입
========================================= */

export type BrandSlug =
  | "regens"
  | "bellago"
  | "artisan"
  | "baekjo";

/* =========================================
   상품 타입
========================================= */

export type SinkProduct = {
  id: string;
  brand: BrandSlug;
  name: string;

  // 제품 단독 판매가격 (원)
  price: number;

  // 상판 타공 사이즈 (mm)
  width?: number;
  depth?: number;

  // 설치 방식
  installationType?: string;

  // 상품 설명
  description?: string;
};

/* =========================================
   브랜드 정보
========================================= */

export const BRANDS: Record<
  BrandSlug,
  {
    name: string;
    english: string;
  }
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
   전체 상품 목록

   새 상품은 해당 브랜드 구역에
   객체 하나를 추가하면 됩니다.
========================================= */

export const PRODUCTS: SinkProduct[] = [

  /* =====================================
     01. 리젠스 REGENS
  ===================================== */

  {
    id: "regens-8603-emboss",
    brand: "regens",
    name: "리젠스 사각 싱크볼 8603 엠보",

    price: 420000,

    // 상판 타공 가로 × 세로
    width: 780,
    depth: 400,

    installationType: "인셋",

    description:
      "리젠스 8603 엠보 사각 싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },


  /* =====================================
     02. 벨라고 BELLAGO
  ===================================== */

  {
    id: "bellago-ble-858",
    brand: "bellago",
    name: "벨라고 BLE-858 벨리타 엠보",

    price: 440000,

    // 상판 타공 가로 × 세로
    width: 794,
    depth: 404,

    installationType: "인셋",

    description:
      "벨라고 BLE-858 벨리타 엠보 인셋 싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },


  /* =====================================
     03. 아티잔 ARTISAN
  ===================================== */

  {
    id: "artisan-du858blr",
    brand: "artisan",
    name: "아티잔 DU858BLR 사각싱크볼",

    price: 420000,

    // 상판 타공 가로 × 세로
    width: 794,
    depth: 400,

    installationType: "인셋",

    description:
      "아티잔 DU858BLR 인셋 사각싱크볼. 제품 단독 구매 및 설치 포함 주문 상담이 가능합니다.",
  },


  /* =====================================
     04. 백조 BAEKJO
  ===================================== */

  {
    id: "baekjo-goni-8630",
    brand: "baekjo",
    name: "백조 고니 8630",

    price: 390000,

    // 상판 타공 가로 × 세로
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

/* =========================================
   상판 타공 사이즈 표시

   예:
   780 × 400mm
========================================= */

export function formatCutoutSize(
  product: SinkProduct
): string {
  if (
    product.width === undefined ||
    product.depth === undefined
  ) {
    return "상담 시 확인";
  }

  return `${product.width} × ${product.depth}mm`;
}

/* =========================================
   상품 데이터 점검

   개발 중 상품 등록 오류를 확인할 때 사용
========================================= */

export function validateProducts(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const product of PRODUCTS) {
    if (!product.id.trim()) {
      errors.push("상품 ID가 비어 있습니다.");
    }

    if (ids.has(product.id)) {
      errors.push(
        `중복 상품 ID: ${product.id}`
      );
    }

    ids.add(product.id);

    if (!product.name.trim()) {
      errors.push(
        `상품명이 비어 있습니다: ${product.id}`
      );
    }

    if (
      !Number.isFinite(product.price) ||
      product.price < 0
    ) {
      errors.push(
        `판매가격 오류: ${product.id}`
      );
    }

    if (
      product.width !== undefined &&
      (!Number.isFinite(product.width) ||
        product.width <= 0)
    ) {
      errors.push(
        `상판 타공 가로 사이즈 오류: ${product.id}`
      );
    }

    if (
      product.depth !== undefined &&
      (!Number.isFinite(product.depth) ||
        product.depth <= 0)
    ) {
      errors.push(
        `상판 타공 세로 사이즈 오류: ${product.id}`
      );
    }
  }

  return errors;
}
