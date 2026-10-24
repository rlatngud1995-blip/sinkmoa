import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  INSTALLATION_REGIONS,
  getAllInstallationPaths,
  getInstallationLocation,
} from "../../../data/installation-regions";

const SITE = "https://www.sinkmoa.com";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInstallationPaths();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const location = getInstallationLocation(
    region,
    district
  );

  if (!location) {
    return {
      title: "지역을 찾을 수 없습니다 | 싱크모아",
    };
  }

  const title =
    `${location.fullName} 싱크볼 교체·설치 | 싱크모아`;

  const description =
    `${location.fullName} 싱크볼 교체 및 설치 상담. ` +
    `백조, 리젠스, 벨라고, 아티잔 사각싱크볼 판매 및 ` +
    `기존 싱크볼 철거, 상판 타공, 수전·배수구 연결 안내. ` +
    `기본 설치비 170,000원.`;

  const url =
    `${SITE}/installation/${region}/${district}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "싱크모아",
      locale: "ko_KR",
      type: "website",
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const PRODUCTS = [
  {
    brand: "백조",
    model: "고니 8630",
    price: 390000,
    cutout: "780 × 400mm",
    slug: "baekjo",
  },
  {
    brand: "리젠스",
    model: "8603 엠보",
    price: 420000,
    cutout: "780 × 400mm",
    slug: "regens",
  },
  {
    brand: "벨라고",
    model: "BLE-858 벨리타 엠보",
    price: 440000,
    cutout: "794 × 404mm",
    slug: "bellago",
  },
  {
    brand: "아티잔",
    model: "DU858BLR",
    price: 420000,
    cutout: "794 × 400mm",
    slug: "artisan",
  },
];

const STEPS = [
  {
    number: "01",
    title: "기존 타공 확인",
    description:
      "기존 싱크볼과 상판 타공 치수를 확인합니다.",
  },
  {
    number: "02",
    title: "제품 상담",
    description:
      "원하시는 싱크볼 모델과 설치 가능 여부를 확인합니다.",
  },
  {
    number: "03",
    title: "기존 싱크볼 철거",
    description:
      "기존 싱크볼과 연결 부속을 분리합니다.",
  },
  {
    number: "04",
    title: "신규 싱크볼 설치",
    description:
      "필요한 상판 작업 후 새 싱크볼을 설치합니다.",
  },
  {
    number: "05",
    title: "연결 및 점검",
    description:
      "수전과 배수구를 연결하고 누수 여부를 확인합니다.",
  },
];

function money(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default async function InstallationPage({
  params,
}: PageProps) {
  const { region, district } = await params;

  const location = getInstallationLocation(
    region,
    district
  );

  if (!location) {
    notFound();
  }

  const regionData =
    INSTALLATION_REGIONS[region];

  if (!regionData) {
    notFound();
  }

  const nearby =
    regionData.districts.filter(
      (item) => item.slug !== district
    );

  const faq = [
    {
      q: `${location.districtName}에서 싱크볼 설치가 가능한가요?`,
      a:
        `${location.fullName} 지역의 싱크볼 교체 및 설치 상담을 접수하고 있습니다. ` +
        `실제 방문 가능 여부와 일정은 주소 확인 후 안내드립니다.`,
    },
    {
      q: "기본 설치비는 얼마인가요?",
      a:
        "기본 설치비는 170,000원이며 기존 싱크볼 철거와 기존 수전 및 배수구 연결 시공이 포함됩니다.",
    },
    {
      q: "기존 타공 크기가 달라도 설치할 수 있나요?",
      a:
        "기존 상판 타공 치수와 신규 싱크볼 규격을 확인한 후 상판 타공 여부를 안내드립니다. 기본 상판 타공 옵션은 50,000원입니다.",
    },
    {
      q: "어떤 브랜드를 설치할 수 있나요?",
      a:
        "백조, 리젠스, 벨라고, 아티잔 사각싱크볼 제품을 안내하고 있습니다.",
    },
  ];

  const canonicalUrl =
    `${SITE}/installation/${region}/${district}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",

    name:
      `${location.fullName} 싱크볼 교체 및 설치`,

    serviceType:
      "싱크볼 교체 및 설치",

    provider: {
      "@type": "Organization",
      name: "싱크모아",
      url: SITE,
    },

    areaServed: {
      "@type": "AdministrativeArea",
      name: location.fullName,
    },

    url: canonicalUrl,
  };

  return (
    <main className="installation-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* HEADER */}

      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav>
            <Link href="/">
              홈
            </Link>

            <Link href="/#regions">
              설치 지역
            </Link>

            <Link
              href="/order"
              className="order-link"
            >
              주문 문의
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}

      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">
            SINKMOA INSTALLATION SERVICE
          </p>

          <h1>
            {location.fullName}
            <br />
            싱크볼 교체 · 설치
          </h1>

          <div className="gold-line" />

          <p className="hero-copy">
            주방에 어울리는 사각싱크볼 선택부터
            <br />
            기존 싱크볼 철거,
            신규 설치와 연결 점검까지.
            <br />
            싱크모아에서 제품과 설치를
            함께 상담하세요.
          </p>

          <Link
            href="/order"
            className="gold-button"
          >
            주문 및 설치 문의
            <span>↗</span>
          </Link>

          <p className="hero-note">
            지역별 방문 가능 여부 및 일정은
            상담 후 확인됩니다.
          </p>
        </div>
      </section>

      {/* 지역 소개 */}

      <section className="intro-section">
        <div className="content">
          <div className="intro-grid">
            <div>
              <p className="section-label">
                LOCAL INSTALLATION
              </p>

              <h2>
                {location.districtName}
                <br />
                싱크볼 설치
              </h2>
            </div>

            <div className="intro-copy">
              <p>
                싱크볼 교체 시 가장 먼저 확인할
                부분은 기존 주방 상판의 타공
                치수와 현장 상태입니다.
              </p>

              <p>
                기존 규격과 선택하신 제품을
                비교해 적합한 설치 방법과
                필요한 추가 작업을 안내합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT */}

      <section className="products-section">
        <div className="content">
          <div className="section-heading">
            <p className="section-label">
              AVAILABLE PRODUCTS
            </p>

            <h2>
              {location.districtName}
              <br />
              싱크볼 제품 안내
            </h2>

            <p>
              백조 · 리젠스 · 벨라고 · 아티잔
              사각싱크볼을 비교해보세요.
            </p>
          </div>

          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <article
                key={product.slug}
                className="product-card"
              >
                <p className="brand-name">
                  {product.brand}
                </p>

                <h3>
                  {product.model}
                </h3>

                <p className="inset">
                  INSET TYPE
                </p>

                <div className="spec">
                  <span>
                    상판 타공 치수
                  </span>

                  <strong>
                    {product.cutout}
                  </strong>
                </div>

                <div className="product-bottom">
                  <strong>
                    {money(product.price)}
                  </strong>

                  <Link
                    href={`/products/${product.slug}`}
                  >
                    제품 보기 ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="small-note">
            ※ 표시된 치수는 싱크볼 외경이 아닌
            상판 타공 기준 치수입니다.
          </p>
        </div>
      </section>

      {/* PRICE */}

      <section className="price-section">
        <div className="content">
          <div className="section-heading">
            <p className="section-label">
              INSTALLATION PRICE
            </p>

            <h2>
              설치비 및
              <br />
              추가 옵션
            </h2>
          </div>

          <div className="price-list">
            <div className="price-row">
              <div>
                <h3>기본 설치비</h3>
                <p>
                  기존 싱크볼 철거 · 기존 수전
                  및 배수구 연결
                </p>
              </div>

              <strong>
                170,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <h3>
                  올스텐 배수구
                </h3>
                <p>
                  배수구 업그레이드
                </p>
              </div>

              <strong>
                +20,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <h3>
                  상판 타공
                </h3>
                <p>
                  기존 타공 규격과 다른 경우
                </p>
              </div>

              <strong>
                +50,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <h3>
                  6WAY 수전
                </h3>
                <p>
                  수전 제품 · 설치비 추가 없음
                </p>
              </div>

              <strong>
                +70,000원
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}

      <section className="process-section">
        <div className="content">
          <div className="section-heading">
            <p className="section-label">
              INSTALLATION PROCESS
            </p>

            <h2>
              싱크볼 교체
              <br />
              진행 과정
            </h2>
          </div>

          <div className="process-grid">
            {STEPS.map((step) => (
              <article
                key={step.number}
                className="process-card"
              >
                <span>
                  {step.number}
                </span>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="faq-section">
        <div className="content">
          <div className="section-heading">
            <p className="section-label">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2>
              {location.districtName}
              <br />
              싱크볼 설치 FAQ
            </h2>
          </div>

          <div className="faq-list">
            {faq.map((item) => (
              <details
                key={item.q}
                className="faq-item"
              >
                <summary>
                  {item.q}
                  <span>+</span>
                </summary>

                <p>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER REGIONS */}

      <section className="nearby-section">
        <div className="content">
          <div className="section-heading">
            <p className="section-label">
              SERVICE AREAS
            </p>

            <h2>
              {location.regionName}
              <br />
              다른 지역
            </h2>
          </div>

          <div className="nearby-grid">
            {nearby.map((item) => (
              <Link
                key={item.slug}
                href={`/installation/${region}/${item.slug}`}
              >
                <span>
                  {item.name}
                </span>

                <span>
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta">
        <p className="eyebrow">
          SINKMOA
        </p>

        <h2>
          {location.districtName}
          <br />
          싱크볼 교체 상담
        </h2>

        <p>
          제품 선택부터 설치까지
          <br />
          싱크모아에서 편리하게 문의하세요.
        </p>

        <Link
          href="/order"
          className="gold-button"
        >
          주문 및 견적 문의
          <span>↗</span>
        </Link>
      </section>

      {/* FOOTER */}

      <footer className="footer">
        <div className="content">
          <h2>
            SINKMOA
          </h2>

          <p>
            프리미엄 싱크볼 판매 및 설치 전문몰
          </p>

          <div className="footer-links">
            <Link href="/">
              홈
            </Link>

            <Link href="/#brands">
              브랜드별 상품
            </Link>

            <Link href="/#regions">
              설치 가능 지역
            </Link>

            <Link href="/order">
              주문·견적 문의
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .installation-page {
          --ink: #19262b;
          --dark: #111a1e;
          --gold: #c4b49a;
          --gold-dark: #9a8567;
          --ivory: #f7f5f0;
          --beige: #eeeae3;
          --line: #ded7cc;

          color: var(--ink);
          background: var(--ivory);

          font-family:
            Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic",
            sans-serif;

          word-break: keep-all;
          overflow-x: hidden;
        }

        .installation-page a {
          text-decoration: none;
        }

        .content {
          width: calc(100% - 80px);
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          background: var(--dark);
          border-bottom:
            1px solid rgba(255,255,255,.12);
        }

        .header-inner {
          width: calc(100% - 80px);
          max-width: 1360px;
          height: 90px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          color: white;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: .22em;
        }

        .header nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .header nav a {
          color: #eee;
          font-size: 12px;
        }

        .header .order-link {
          padding: 13px 17px;
          background: var(--gold);
          color: var(--ink);
          font-weight: 700;
        }

        .hero {
          padding: 115px 24px 120px;
          background: var(--ink);
          color: white;
          text-align: center;
        }

        .hero-inner {
          max-width: 900px;
          margin: auto;
        }

        .eyebrow,
        .section-label {
          margin: 0 0 20px;
          color: #b9a17d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
        }

        .hero h1 {
          margin: 0;
          font-size:
            clamp(42px,6vw,72px);
          line-height: 1.35;
          font-weight: 400;
          letter-spacing: -.055em;
        }

        .gold-line {
          width: 42px;
          height: 1px;
          margin: 30px auto;
          background: var(--gold);
        }

        .hero-copy {
          color: #d2d7d5;
          font-size: 15px;
          line-height: 2;
        }

        .gold-button {
          width: min(100%,280px);
          margin-top: 30px;
          padding: 19px 22px;

          display: inline-flex;
          justify-content: space-between;
          align-items: center;

          background: var(--gold);
          color: var(--ink);

          font-size: 13px;
          font-weight: 700;
        }

        .hero-note {
          margin-top: 18px;
          color: #9fa9a6;
          font-size: 11px;
        }

        .intro-section {
          padding: 105px 0;
          background: white;
        }

        .intro-grid {
          display: grid;
          grid-template-columns:
            .85fr 1.15fr;
          gap: 90px;
          align-items: center;
        }

        .intro-section h2,
        .section-heading h2 {
          margin: 0;
          font-size:
            clamp(35px,4vw,53px);
          line-height: 1.4;
          font-weight: 400;
          letter-spacing: -.05em;
        }

        .intro-copy {
          padding-left: 55px;
          border-left: 1px solid var(--line);
        }

        .intro-copy p {
          margin: 0 0 20px;
          color: #777;
          font-size: 14px;
          line-height: 2;
        }

        .products-section,
        .process-section,
        .nearby-section {
          padding: 110px 0;
          background: var(--ivory);
        }

        .section-heading {
          margin-bottom: 50px;
          text-align: center;
        }

        .section-heading > p:last-child {
          margin-top: 18px;
          color: #777;
          font-size: 13px;
        }

        .product-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0,1fr));
          gap: 18px;
        }

        .product-card {
          padding: 34px;
          background: white;
          border: 1px solid #e2dbd0;
        }

        .brand-name {
          margin: 0 0 17px;
          color: var(--gold-dark);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .13em;
        }

        .product-card h3 {
          margin: 0 0 12px;
          font-size: 27px;
          font-weight: 500;
        }

        .inset {
          margin: 0 0 25px;
          color: #aaa;
          font-size: 10px;
          letter-spacing: .15em;
        }

        .spec {
          padding: 18px 0;

          display: flex;
          justify-content: space-between;
          gap: 15px;

          border-top: 1px solid #eee9e1;
          border-bottom: 1px solid #eee9e1;

          font-size: 12px;
        }

        .spec span {
          color: #777;
        }

        .product-bottom {
          margin-top: 28px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
        }

        .product-bottom > strong {
          font-size: 23px;
        }

        .product-bottom a {
          color: var(--gold-dark);
          font-size: 12px;
          font-weight: 700;
        }

        .small-note {
          margin-top: 20px;
          color: #888;
          text-align: center;
          font-size: 11px;
        }

        .price-section {
          padding: 110px 0;
          background: white;
        }

        .price-list {
          max-width: 850px;
          margin: auto;
          border-top: 1px solid var(--line);
        }

        .price-row {
          min-height: 110px;
          padding: 23px 0;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;

          border-bottom: 1px solid var(--line);
        }

        .price-row h3 {
          margin: 0 0 8px;
          font-size: 15px;
        }

        .price-row p {
          margin: 0;
          color: #888;
          font-size: 12px;
        }

        .price-row > strong {
          color: var(--gold-dark);
          font-size: 20px;
        }

        .process-section {
          background: var(--beige);
        }

        .process-grid {
          display: grid;
          grid-template-columns:
            repeat(5,minmax(0,1fr));
          gap: 10px;
        }

        .process-card {
          padding: 25px 20px;
          background: var(--ivory);
          border: 1px solid #ddd6cb;
        }

        .process-card > span {
          color: var(--gold);
          font-size: 28px;
        }

        .process-card h3 {
          margin: 30px 0 12px;
          font-size: 14px;
        }

        .process-card p {
          margin: 0;
          color: #777;
          font-size: 12px;
          line-height: 1.8;
        }

        .faq-section {
          padding: 110px 0;
          background: white;
        }

        .faq-list {
          max-width: 900px;
          margin: auto;
          border-top: 1px solid var(--line);
        }

        .faq-item {
          border-bottom: 1px solid var(--line);
        }

        .faq-item summary {
          padding: 24px 4px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          cursor: pointer;
          list-style: none;
          font-size: 14px;
          font-weight: 600;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary span {
          color: var(--gold-dark);
          font-size: 22px;
        }

        .faq-item p {
          margin: 0;
          padding: 0 40px 27px 4px;
          color: #777;
          font-size: 13px;
          line-height: 2;
        }

        .nearby-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 8px;
        }

        .nearby-grid a {
          min-height: 58px;
          padding: 15px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: white;
          border: 1px solid var(--line);

          color: var(--ink);
          font-size: 12px;
          font-weight: 600;
        }

        .nearby-grid a span:last-child {
          color: var(--gold-dark);
        }

        .cta {
          padding: 105px 24px;
          background: var(--ink);
          color: white;
          text-align: center;
        }

        .cta h2 {
          margin: 0;
          font-size:
            clamp(38px,5vw,59px);
          line-height: 1.45;
          font-weight: 400;
          letter-spacing: -.05em;
        }

        .cta > p:not(.eyebrow) {
          margin: 24px 0 0;
          color: #c7cecc;
          font-size: 14px;
          line-height: 2;
        }

        .footer {
          padding: 60px 0;
          background: var(--dark);
          color: white;
        }

        .footer h2 {
          margin: 0 0 13px;
          font-size: 24px;
          letter-spacing: .22em;
        }

        .footer p {
          color: #abb3b1;
          font-size: 12px;
        }

        .footer-links {
          margin-top: 28px;
          display: flex;
          flex-wrap: wrap;
          gap: 22px;
        }

        .footer-links a {
          color: #e5e5e5;
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .intro-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .intro-copy {
            padding-left: 0;
            border-left: 0;
          }

          .process-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .nearby-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }
        }

        @media (max-width: 600px) {
          .content,
          .header-inner {
            width: calc(100% - 36px);
          }

          .header-inner {
            height: 78px;
          }

          .logo {
            font-size: 20px;
          }

          .header nav {
            gap: 11px;
          }

          .header nav a {
            font-size: 10px;
          }

          .header .order-link {
            padding: 10px 11px;
          }

          .hero {
            padding: 80px 18px 85px;
          }

          .hero h1 {
            font-size: 40px;
          }

          .hero-copy {
            font-size: 13px;
          }

          .intro-section,
          .products-section,
          .price-section,
          .process-section,
          .faq-section,
          .nearby-section {
            padding: 82px 0;
          }

          .intro-section h2,
          .section-heading h2 {
            font-size: 37px;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .product-card {
            padding: 26px 22px;
          }

          .product-bottom > strong {
            font-size: 20px;
          }

          .price-row {
            gap: 14px;
          }

          .price-row > strong {
            font-size: 17px;
            white-space: nowrap;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .nearby-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .nearby-grid a {
            padding: 14px 11px;
            font-size: 11px;
          }

          .cta {
            padding: 85px 18px;
          }
        }
      `}</style>
    </main>
  );
}
