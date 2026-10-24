import type { Metadata } from "next";
import Image from "next/image";
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

/* =========================================
   SEO
========================================= */

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
    `${location.fullName} 싱크볼 교체·사각싱크볼 설치 | 싱크모아`;

  const description =
    `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치 상담. ` +
    `백조·리젠스·벨라고·아티잔 싱크볼 판매, 기존 싱크볼 철거, ` +
    `상판 타공, 수전·배수구 연결까지 안내합니다. 기본 설치비 170,000원.`;

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

/* =========================================
   상품
========================================= */

const PRODUCTS = [
  {
    brand: "백조",
    model: "고니 8630",
    price: 390000,
    cutout: "780 × 400mm",
    slug: "baekjo",
    image: "/IMG_1642.jpeg",
  },
  {
    brand: "리젠스",
    model: "8603 엠보",
    price: 420000,
    cutout: "780 × 400mm",
    slug: "regens",
    image: "/IMG_1772.jpeg",
  },
  {
    brand: "벨라고",
    model: "BLE-858 벨리타 엠보",
    price: 440000,
    cutout: "794 × 404mm",
    slug: "bellago",
    image: "/IMG_1757.jpeg",
  },
  {
    brand: "아티잔",
    model: "DU858BLR",
    price: 420000,
    cutout: "794 × 400mm",
    slug: "artisan",
    image: "/IMG_1771.jpeg",
  },
];

/* =========================================
   가능 작업
========================================= */

const SERVICES = [
  {
    number: "01",
    title: "기존 싱크볼 철거",
    description:
      "사용 중인 싱크볼과 기존 연결 부속을 분리한 뒤 새 제품 설치를 준비합니다.",
  },
  {
    number: "02",
    title: "사각싱크볼 교체",
    description:
      "기존 상판 타공 규격을 확인해 설치 가능한 사각싱크볼을 안내합니다.",
  },
  {
    number: "03",
    title: "상판 타공 · 확장",
    description:
      "신규 싱크볼 규격에 맞춰 필요한 경우 기존 상판 타공부를 추가 가공합니다.",
  },
  {
    number: "04",
    title: "수전 연결",
    description:
      "기존 수전을 다시 연결하거나 선택한 6WAY 수전으로 교체 설치할 수 있습니다.",
  },
  {
    number: "05",
    title: "배수구 연결",
    description:
      "기본 배수구 연결부터 올스텐 배수구 업그레이드까지 상담할 수 있습니다.",
  },
  {
    number: "06",
    title: "설치 후 점검",
    description:
      "싱크볼 고정 상태와 수전·배수구 연결 및 누수 여부를 마지막으로 확인합니다.",
  },
];

/* =========================================
   시공 과정
========================================= */

const STEPS = [
  {
    number: "01",
    title: "현장 정보 확인",
    description:
      "기존 싱크볼과 주방 상판 사진, 타공 치수를 확인합니다.",
  },
  {
    number: "02",
    title: "제품 선택",
    description:
      "설치 가능한 브랜드와 모델, 추가 옵션을 상담합니다.",
  },
  {
    number: "03",
    title: "기존 제품 철거",
    description:
      "기존 싱크볼과 연결된 수전·배수 부속을 분리합니다.",
  },
  {
    number: "04",
    title: "신규 설치",
    description:
      "필요 시 상판 작업 후 새로운 싱크볼을 설치합니다.",
  },
  {
    number: "05",
    title: "연결 및 점검",
    description:
      "수전과 배수구를 연결하고 설치 상태를 확인합니다.",
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
      q: `${location.districtName} 싱크볼 교체 설치 상담이 가능한가요?`,
      a:
        `${location.fullName} 지역 싱크볼 교체 및 사각싱크볼 설치 상담을 접수하고 있습니다. ` +
        `정확한 방문 가능 여부와 일정은 주소와 현장 정보를 확인한 뒤 안내드립니다.`,
    },
    {
      q: `${location.districtName} 싱크볼 설치비는 얼마인가요?`,
      a:
        "기본 설치비는 170,000원입니다. 기존 싱크볼 철거와 기존 수전 및 배수구 연결 작업이 포함됩니다. 추가 타공이나 별도 작업이 필요한 경우 추가 비용이 발생할 수 있습니다.",
    },
    {
      q: "기존 싱크볼보다 새 제품이 큰 경우에도 설치할 수 있나요?",
      a:
        "기존 상판 타공 치수보다 신규 제품의 요구 타공 치수가 큰 경우 상판 재질과 여유 공간을 확인한 뒤 타공 또는 확장이 가능합니다. 상판 타공 기본 옵션은 50,000원입니다.",
    },
    {
      q: "인조대리석 상판도 타공할 수 있나요?",
      a:
        "현장 상판 재질과 기존 타공 상태를 확인한 뒤 작업 가능 여부를 안내합니다. 상판의 균열이나 구조에 따라 작업이 어려운 경우도 있습니다.",
    },
    {
      q: "싱크볼과 수전을 같이 교체할 수 있나요?",
      a:
        "가능합니다. 싱크볼 설치와 함께 6WAY 수전 제품을 선택할 수 있으며 현재 옵션 가격은 70,000원입니다.",
    },
    {
      q: "어떤 싱크볼 브랜드를 선택할 수 있나요?",
      a:
        "현재 백조, 리젠스, 벨라고, 아티잔의 인셋 사각싱크볼 제품을 안내하고 있습니다.",
    },
  ];

  const canonicalUrl =
    `${SITE}/installation/${region}/${district}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치`,
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
    description:
      `${location.fullName} 싱크볼 교체, 사각싱크볼 설치, 상판 타공, 수전 및 배수구 연결 상담.`,
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

      {/* =====================================
          HEADER
      ===================================== */}

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

      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero">

        <div className="hero-inner">

          <p className="eyebrow">
            SINKMOA LOCAL INSTALLATION
          </p>

          <h1>
            {location.fullName}
            <br />
            싱크볼 교체 · 설치
          </h1>

          <div className="gold-line" />

          <p className="hero-copy">
            {location.districtName} 사각싱크볼 교체부터
            <br />
            기존 싱크볼 철거 · 상판 타공 ·
            수전 및 배수구 연결까지.
            <br />
            제품 선택과 설치를 한 번에 상담하세요.
          </p>

          <Link
            href="/order"
            className="gold-button"
          >
            {location.districtName} 설치 문의
            <span>↗</span>
          </Link>

          <p className="hero-note">
            방문 가능 여부와 정확한 일정은
            주소 확인 후 안내합니다.
          </p>

        </div>
      </section>

      {/* =====================================
          지역 소개
      ===================================== */}

      <section className="intro-section">

        <div className="content">

          <div className="intro-grid">

            <div>
              <p className="section-label">
                LOCAL SINK REPLACEMENT
              </p>

              <h2>
                {location.districtName}
                <br />
                싱크볼 교체
              </h2>
            </div>

            <div className="intro-copy">

              <p>
                {location.districtName}에서
                싱크볼 교체를 알아보고 계신다면
                새 제품을 선택하기 전에
                기존 주방 상판의 타공 치수를
                확인하는 것이 중요합니다.
              </p>

              <p>
                싱크모아는 기존 싱크볼 규격과
                상판 상태를 확인하고,
                백조·리젠스·벨라고·아티잔
                사각싱크볼 중 설치 가능한 제품을
                안내합니다.
              </p>

              <p>
                제품 교체뿐 아니라 기존 싱크볼 철거,
                상판 타공 및 확장,
                기존 수전과 배수구 연결까지
                함께 상담할 수 있습니다.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================
          설치 가능 작업
      ===================================== */}

      <section className="services-section">

        <div className="content">

          <div className="section-heading">

            <p className="section-label">
              INSTALLATION SERVICE
            </p>

            <h2>
              {location.districtName}
              <br />
              설치 가능 작업
            </h2>

            <p>
              싱크볼 교체에 필요한 주요 작업을
              한 번에 상담할 수 있습니다.
            </p>

          </div>

          <div className="service-grid">

            {SERVICES.map((service) => (

              <article
                key={service.number}
                className="service-card"
              >

                <span className="service-number">
                  {service.number}
                </span>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================
          PRODUCT
      ===================================== */}

      <section className="products-section">

        <div className="content">

          <div className="section-heading">

            <p className="section-label">
              AVAILABLE PRODUCTS
            </p>

            <h2>
              사각싱크볼
              <br />
              제품 선택
            </h2>

            <p>
              현재 싱크모아에서 안내하는
              인셋 사각싱크볼 제품입니다.
            </p>

          </div>

          <div className="product-grid">

            {PRODUCTS.map((product) => (

              <article
                key={product.slug}
                className="product-card"
              >

                <Link
                  href={`/products/${product.slug}`}
                  className="product-image"
                >
                  <Image
                    src={product.image}
                    alt={`${product.brand} ${product.model} 사각싱크볼`}
                    fill
                    sizes="(max-width: 700px) 50vw, 25vw"
                  />
                </Link>

                <div className="product-info">

                  <p className="brand-name">
                    {product.brand}
                  </p>

                  <h3>
                    {product.model}
                  </h3>

                  <div className="spec">

                    <span>
                      상판 타공
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
                      자세히 보기 ↗
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

          <p className="small-note">
            ※ 제품에 표기된 치수는 싱크볼 외경이 아닌
            상판 타공 기준입니다.
            주문 전 기존 상판 타공 치수를 확인해주세요.
          </p>

        </div>

      </section>

      {/* =====================================
          PRICE
      ===================================== */}

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

            <p>
              기본 설치부터 필요한 추가 작업까지
              확인하세요.
            </p>

          </div>

          <div className="price-list">

            <div className="price-row">
              <div>
                <span className="price-label">
                  BASIC
                </span>

                <h3>
                  기본 설치비
                </h3>

                <p>
                  기존 싱크볼 철거 ·
                  기존 수전 및 배수구 연결 포함
                </p>
              </div>

              <strong>
                170,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <span className="price-label">
                  OPTION 01
                </span>

                <h3>
                  올스텐 배수구
                </h3>

                <p>
                  기본 배수구에서
                  올스텐 배수구로 업그레이드
                </p>
              </div>

              <strong>
                +20,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <span className="price-label">
                  OPTION 02
                </span>

                <h3>
                  상판 타공
                </h3>

                <p>
                  기존 타공 규격과
                  신규 제품 규격이 다른 경우
                </p>
              </div>

              <strong>
                +50,000원
              </strong>
            </div>

            <div className="price-row">
              <div>
                <span className="price-label">
                  OPTION 03
                </span>

                <h3>
                  6WAY 수전
                </h3>

                <p>
                  수전 제품 70,000원 ·
                  싱크볼 설치 시 교체 설치비 추가 없음
                </p>
              </div>

              <strong>
                +70,000원
              </strong>
            </div>

          </div>

          <p className="price-notice">
            ※ 현장 상태, 상판 재질,
            추가 가공 여부에 따라
            최종 비용이 달라질 수 있습니다.
          </p>

        </div>

      </section>

      {/* =====================================
          PROCESS
      ===================================== */}

      <section className="process-section">

        <div className="content">

          <div className="section-heading">

            <p className="section-label">
              INSTALLATION PROCESS
            </p>

            <h2>
              상담부터 설치까지
              <br />
              이렇게 진행됩니다
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

      {/* =====================================
          CHECK
      ===================================== */}

      <section className="check-section">

        <div className="content">

          <div className="check-box">

            <div>

              <p className="section-label">
                BEFORE INSTALLATION
              </p>

              <h2>
                문의 전
                <br />
                확인해주세요
              </h2>

            </div>

            <div className="check-list">

              <div>
                <span>01</span>
                <p>
                  현재 사용 중인 싱크볼 전체 사진
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  기존 상판 타공 가로 × 세로 치수
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  설치를 희망하는 싱크볼 모델
                </p>
              </div>

              <div>
                <span>04</span>
                <p>
                  설치 주소 및 희망 일정
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          FAQ
      ===================================== */}

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

                  <span>
                    +
                  </span>
                </summary>

                <p>
                  {item.a}
                </p>

              </details>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================
          OTHER REGIONS
      ===================================== */}

      <section className="nearby-section">

        <div className="content">

          <div className="section-heading">

            <p className="section-label">
              OTHER SERVICE AREAS
            </p>

            <h2>
              {location.regionName}
              <br />
              다른 설치 지역
            </h2>

            <p>
              같은 지역의 다른 시·군·구
              설치 안내를 확인할 수 있습니다.
            </p>

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

      {/* =====================================
          CTA
      ===================================== */}

      <section className="cta">

        <p className="eyebrow">
          SINKMOA
        </p>

        <h2>
          {location.districtName}
          <br />
          싱크볼 교체가 필요하신가요?
        </h2>

        <p>
          기존 싱크볼 사진과
          상판 타공 치수를 준비하시면
          <br />
          보다 빠르게 설치 상담을 받을 수 있습니다.
        </p>

        <Link
          href="/order"
          className="gold-button"
        >
          설치 견적 문의
          <span>↗</span>
        </Link>

      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="content">

          <h2>
            SINKMOA
          </h2>

          <p>
            싱크볼의 선택부터 설치까지, 싱크모아.
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

      {/* =====================================
          STYLE
      ===================================== */}

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

          background: var(--ivory);
          color: var(--ink);

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
          max-width: 1180px;
          margin: auto;
        }

        /* HEADER */

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

        /* HERO */

        .hero {
          padding: 110px 24px 115px;
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
          margin: 0 0 19px;
          color: #b9a17d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .22em;
        }

        .hero h1 {
          margin: 0;
          font-size:
            clamp(42px,6vw,70px);
          line-height: 1.34;
          font-weight: 400;
          letter-spacing: -.055em;
        }

        .gold-line {
          width: 42px;
          height: 1px;
          margin: 29px auto;
          background: var(--gold);
        }

        .hero-copy {
          margin: 0;
          color: #d2d7d5;
          font-size: 15px;
          line-height: 2;
        }

        .gold-button {
          width: min(100%,290px);
          margin-top: 31px;
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
          margin: 17px 0 0;
          color: #9fa9a6;
          font-size: 11px;
        }

        /* INTRO */

        .intro-section {
          padding: 100px 0;
          background: white;
        }

        .intro-grid {
          display: grid;
          grid-template-columns:
            .8fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .intro-section h2,
        .section-heading h2,
        .check-box h2 {
          margin: 0;

          font-size:
            clamp(34px,4vw,51px);

          line-height: 1.4;
          font-weight: 400;

          letter-spacing: -.05em;
        }

        .intro-copy {
          padding-left: 50px;
          border-left:
            1px solid var(--line);
        }

        .intro-copy p {
          margin: 0 0 17px;
          color: #717674;
          font-size: 14px;
          line-height: 2;
        }

        .intro-copy p:last-child {
          margin-bottom: 0;
        }

        /* COMMON */

        .section-heading {
          margin-bottom: 44px;
          text-align: center;
        }

        .section-heading > p:last-child {
          margin: 16px 0 0;
          color: #777;
          font-size: 13px;
          line-height: 1.8;
        }

        /* SERVICE */

        .services-section {
          padding: 100px 0;
          background: var(--beige);
        }

        .service-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 10px;
        }

        .service-card {
          min-height: 195px;
          padding: 25px;

          background: #f8f6f1;
          border: 1px solid #ded6cb;
        }

        .service-number {
          color: var(--gold);
          font-size: 25px;
          font-weight: 300;
        }

        .service-card h3 {
          margin: 25px 0 11px;
          font-size: 16px;
          font-weight: 600;
        }

        .service-card p {
          margin: 0;
          color: #777;
          font-size: 12px;
          line-height: 1.8;
        }

        /* PRODUCTS */

        .products-section {
          padding: 100px 0;
          background: var(--ivory);
        }

        .product-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 12px;
        }

        .product-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e1dacf;
        }

        .product-image {
          position: relative;
          display: block;
          aspect-ratio: 1.2;
          background: #f2f2f0;
          overflow: hidden;
        }

        .product-image img {
          object-fit: contain;
          padding: 10px;
          transition: transform .3s ease;
        }

        .product-card:hover
        .product-image img {
          transform: scale(1.035);
        }

        .product-info {
          padding: 21px;
        }

        .brand-name {
          margin: 0 0 9px;
          color: var(--gold-dark);
          font-size: 10px;
          font-weight: 700;
        }

        .product-card h3 {
          margin: 0 0 20px;
          min-height: 48px;
          font-size: 18px;
          line-height: 1.4;
          font-weight: 500;
        }

        .spec {
          padding: 13px 0;

          display: flex;
          flex-direction: column;
          gap: 5px;

          border-top:
            1px solid #eee8df;
          border-bottom:
            1px solid #eee8df;
        }

        .spec span {
          color: #888;
          font-size: 10px;
        }

        .spec strong {
          font-size: 12px;
        }

        .product-bottom {
          margin-top: 17px;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 9px;
        }

        .product-bottom > strong {
          font-size: 18px;
        }

        .product-bottom a {
          color: var(--gold-dark);
          font-size: 11px;
          font-weight: 700;
        }

        .small-note {
          margin: 20px 0 0;
          color: #888;
          font-size: 11px;
          line-height: 1.8;
          text-align: center;
        }

        /* PRICE */

        .price-section {
          padding: 100px 0;
          background: white;
        }

        .price-list {
          max-width: 830px;
          margin: auto;
          border-top: 1px solid var(--line);
        }

        .price-row {
          padding: 22px 3px;
          min-height: 105px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;

          border-bottom:
            1px solid var(--line);
        }

        .price-label {
          display: block;
          margin-bottom: 7px;

          color: var(--gold-dark);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .13em;
        }

        .price-row h3 {
          margin: 0 0 7px;
          font-size: 15px;
        }

        .price-row p {
          margin: 0;
          color: #888;
          font-size: 11px;
          line-height: 1.6;
        }

        .price-row > strong {
          flex-shrink: 0;
          color: var(--gold-dark);
          font-size: 19px;
        }

        .price-notice {
          max-width: 830px;
          margin: 17px auto 0;
          color: #888;
          font-size: 10px;
          line-height: 1.8;
        }

        /* PROCESS */

        .process-section {
          padding: 100px 0;
          background: var(--beige);
        }

        .process-grid {
          display: grid;
          grid-template-columns:
            repeat(5,minmax(0,1fr));
          gap: 9px;
        }

        .process-card {
          min-height: 185px;
          padding: 23px 19px;
          background: var(--ivory);
          border: 1px solid #ddd5ca;
        }

        .process-card > span {
          color: var(--gold);
          font-size: 25px;
        }

        .process-card h3 {
          margin: 24px 0 10px;
          font-size: 14px;
        }

        .process-card p {
          margin: 0;
          color: #777;
          font-size: 11px;
          line-height: 1.8;
        }

        /* BEFORE CHECK */

        .check-section {
          padding: 90px 0;
          background: var(--ink);
          color: white;
        }

        .check-box {
          display: grid;
          grid-template-columns:
            .8fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .check-list {
          border-top:
            1px solid rgba(255,255,255,.2);
        }

        .check-list > div {
          display: flex;
          align-items: center;
          gap: 20px;

          padding: 18px 0;

          border-bottom:
            1px solid rgba(255,255,255,.14);
        }

        .check-list span {
          color: var(--gold);
          font-size: 11px;
        }

        .check-list p {
          margin: 0;
          color: #e0e4e3;
          font-size: 13px;
        }

        /* FAQ */

        .faq-section {
          padding: 100px 0;
          background: white;
        }

        .faq-list {
          max-width: 880px;
          margin: auto;
          border-top:
            1px solid var(--line);
        }

        .faq-item {
          border-bottom:
            1px solid var(--line);
        }

        .faq-item summary {
          padding: 22px 4px;

          display: flex;
          justify-content: space-between;
          gap: 20px;

          cursor: pointer;
          list-style: none;

          font-size: 13px;
          font-weight: 600;
        }

        .faq-item summary::-webkit-details-marker {
          display: none;
        }

        .faq-item summary span {
          color: var(--gold-dark);
          font-size: 20px;
        }

        .faq-item p {
          margin: 0;
          padding: 0 42px 24px 4px;
          color: #777;
          font-size: 12px;
          line-height: 2;
        }

        /* REGIONS */

        .nearby-section {
          padding: 100px 0;
          background: var(--ivory);
        }

        .nearby-grid {
          display: grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap: 7px;
        }

        .nearby-grid a {
          min-height: 55px;
          padding: 14px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: white;
          border: 1px solid var(--line);

          color: var(--ink);
          font-size: 11px;
          font-weight: 600;
        }

        .nearby-grid a span:last-child {
          color: var(--gold-dark);
        }

        /* CTA */

        .cta {
          padding: 100px 24px;
          background: var(--ink);
          color: white;
          text-align: center;
        }

        .cta h2 {
          margin: 0;
          font-size:
            clamp(37px,5vw,57px);
          line-height: 1.45;
          font-weight: 400;
          letter-spacing: -.05em;
        }

        .cta > p:not(.eyebrow) {
          margin: 22px 0 0;
          color: #c7cecc;
          font-size: 13px;
          line-height: 2;
        }

        /* FOOTER */

        .footer {
          padding: 58px 0;
          background: var(--dark);
          color: white;
        }

        .footer h2 {
          margin: 0 0 12px;
          font-size: 23px;
          letter-spacing: .22em;
        }

        .footer p {
          color: #abb3b1;
          font-size: 11px;
        }

        .footer-links {
          margin-top: 27px;

          display: flex;
          flex-wrap: wrap;
          gap: 21px;
        }

        .footer-links a {
          color: #e5e5e5;
          font-size: 11px;
        }

        /* TABLET */

        @media (max-width: 900px) {

          .intro-grid,
          .check-box {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .intro-copy {
            padding-left: 0;
            border-left: 0;
          }

          .service-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .product-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
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

        /* MOBILE */

        @media (max-width: 600px) {

          .content,
          .header-inner {
            width: calc(100% - 32px);
          }

          .header-inner {
            height: 76px;
          }

          .logo {
            font-size: 19px;
          }

          .header nav {
            gap: 9px;
          }

          .header nav a {
            font-size: 9px;
          }

          .header .order-link {
            padding: 10px;
          }

          .hero {
            padding: 73px 17px 78px;
          }

          .hero h1 {
            font-size: 37px;
          }

          .hero-copy {
            font-size: 12px;
            line-height: 1.95;
          }

          .gold-button {
            margin-top: 27px;
          }

          .intro-section,
          .services-section,
          .products-section,
          .price-section,
          .process-section,
          .faq-section,
          .nearby-section {
            padding: 72px 0;
          }

          .intro-section h2,
          .section-heading h2,
          .check-box h2 {
            font-size: 34px;
          }

          .section-heading {
            margin-bottom: 34px;
          }

          .service-grid {
            grid-template-columns: 1fr 1fr;
            gap: 7px;
          }

          .service-card {
            min-height: 180px;
            padding: 18px 15px;
          }

          .service-card h3 {
            margin-top: 19px;
            font-size: 13px;
          }

          .service-card p {
            font-size: 10px;
          }

          /*
             모바일 상품은 2열로 압축
             기존처럼 한 제품이 화면 전체를
             차지하지 않도록 수정
          */

          .product-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
            gap: 8px;
          }

          .product-image {
            aspect-ratio: 1.15;
          }

          .product-image img {
            padding: 5px;
          }

          .product-info {
            padding: 14px;
          }

          .brand-name {
            margin-bottom: 6px;
            font-size: 9px;
          }

          .product-card h3 {
            min-height: 39px;
            margin-bottom: 12px;
            font-size: 14px;
          }

          .spec {
            padding: 10px 0;
          }

          .spec span {
            font-size: 9px;
          }

          .spec strong {
            font-size: 10px;
          }

          .product-bottom {
            margin-top: 12px;
            gap: 7px;
          }

          .product-bottom > strong {
            font-size: 14px;
          }

          .product-bottom a {
            font-size: 9px;
          }

          .price-row {
            min-height: 95px;
            gap: 13px;
          }

          .price-row > strong {
            font-size: 16px;
            white-space: nowrap;
          }

          .price-row p {
            max-width: 210px;
            font-size: 10px;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .process-card {
            min-height: auto;
          }

          .check-section {
            padding: 72px 0;
          }

          .nearby-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .nearby-grid a {
            min-height: 51px;
            padding: 12px 10px;
            font-size: 10px;
          }

          .cta {
            padding: 78px 18px;
          }

          .cta h2 {
            font-size: 35px;
          }

        }

      `}</style>

    </main>
  );
}
