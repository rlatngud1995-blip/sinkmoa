/* =========================================
   사이트 공통 정보 (SEO · GEO 구조화 데이터)
========================================= */

export const SITE_URL = "https://www.sinkmoa.com";
export const BRAND = "싱크모아";
export const BRAND_EN = "SINKMOA";
export const PHONE = "010-9413-4686";
export const LOGO_IMAGE = "/5C4799F6-712E-4F0E-8030-2B96BB5FC1C9.png";

// 콘텐츠 최종 수정일 (내용을 크게 바꾸면 갱신)
export const CONTENT_UPDATED = "2026-11-26";

export const SERVICE_AREAS = ["서울", "경기", "인천", "충남", "충북"];

export const PRICE = {
  installation: 170000,
  drain: 20000,
  cutting: 50000,
  faucet: 70000,
};

export const BUSINESS_ID = `${SITE_URL}/#business`;

/** 사이트 전체에서 참조하는 사업자 엔티티 (schema.org) */
export const BUSINESS_SCHEMA = {
  "@type": "HomeAndConstructionBusiness",
  "@id": BUSINESS_ID,
  name: BRAND,
  alternateName: BRAND_EN,
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO_IMAGE}`,
  image: `${SITE_URL}/IMG_0395.jpeg`,
  telephone: "+82-10-9413-4686",
  priceRange: "₩170,000~",
  description:
    "백조·리젠스·벨라고·아티잔 사각 싱크볼 판매와 싱크볼 교체·설치 전문. 서울·경기·인천·충남·충북 방문 시공.",
  areaServed: SERVICE_AREAS.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  knowsAbout: [
    "싱크볼 교체",
    "사각싱크볼 설치",
    "인셋 싱크볼",
    "상판 타공",
    "주방 수전 교체",
    "배수구 교체",
  ],
};
