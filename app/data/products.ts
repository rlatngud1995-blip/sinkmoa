
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

// 실제 판매 모델과 가격이 확정되면
// 이 배열에 상품을 추가합니다.
// 현재는 임의 상품을 등록하지 않습니다.
export const PRODUCTS: SinkProduct[] = [];

export function getProductsByBrand(
  brand: BrandSlug
) {
  return PRODUCTS.filter(
    (product) => product.brand === brand
  );
}

export function getProductById(id: string) {
  return PRODUCTS.find(
    (product) => product.id === id
  );
}

export function formatPrice(price: number) {
  return price.toLocaleString("ko-KR") + "원";
}
