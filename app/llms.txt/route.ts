/* =========================================
   /llms.txt — AI 검색엔진(ChatGPT·Perplexity·
   네이버 Cue: 등)이 사이트를 빠르게 이해하도록
   핵심 정보를 요약한 텍스트 (GEO)
========================================= */

import { BRANDS, PRODUCTS, formatCutoutSize, formatPrice } from "../data/products";
import { INSTALLATION_REGIONS } from "../data/installation-regions";
import { getDistrictShortName } from "../data/installation-content";
import { CONTENT_UPDATED, PHONE, PRICE, SITE_URL } from "../data/site";

export const dynamic = "force-static";

export function GET() {
  const won = (n: number) => n.toLocaleString("ko-KR") + "원";

  const products = PRODUCTS.map(
    (p) =>
      `- [${p.name}](${SITE_URL}/products/${p.brand}): ${formatPrice(p.price)}, 상판 타공 ${formatCutoutSize(p)}, ${p.installationType ?? "인셋"} 방식`
  ).join("\n");

  const regions = Object.entries(INSTALLATION_REGIONS)
    .map(([slug, r]) => {
      const links = r.districts
        .map(
          (d) =>
            `[${getDistrictShortName(slug, d.slug)}](${SITE_URL}/installation/${slug}/${d.slug})`
        )
        .join(", ");
      return `- ${r.name}: ${links}`;
    })
    .join("\n");

  const body = `# 싱크모아 (SINKMOA)

> 사각 싱크볼 판매 및 싱크볼 교체·설치 전문. ${Object.values(BRANDS)
    .map((b) => b.name)
    .join("·")} 인셋 사각 싱크볼을 판매하고 서울·경기·인천·충남·충북에서 방문 설치합니다.

최종 업데이트: ${CONTENT_UPDATED}
문의: ${PHONE} (문자 상담)

## 가격
- 기본 설치비: ${won(PRICE.installation)} (기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전·배수구 연결 포함)
- 상판 타공: +${won(PRICE.cutting)}
- 올스텐 배수구: +${won(PRICE.drain)}
- 6WAY 수전: +${won(PRICE.faucet)}
- 제품만 단독 구매(택배 배송)도 가능

## 제품
${products}

## 이용 방법
- [구매·배송·설치 안내](${SITE_URL}/guide)
- [주문·견적 문의](${SITE_URL}/order): 싱크볼 사진, 상판 타공 치수, 주소를 보내면 설치 가능 모델과 총 비용 안내

## 지역별 싱크볼 교체 안내
${regions}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
