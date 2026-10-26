import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  INSTALLATION_REGIONS,
  getAllInstallationPaths,
  getInstallationLocation,
} from "../../../data/installation-regions";

const SITE_URL = "https://www.sinkmoa.com";

type PageProps = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

const PRODUCTS = [
  {
    brand: "백조",
    name: "고니 8630",
    description: "사각싱크볼 · 인셋",
    price: "390,000원",
    cutout: "780 × 400mm",
    image: "/IMG_1642.jpeg",
    href: "/products/baekjo",
  },
  {
    brand: "리젠스",
    name: "8603 엠보",
    description: "사각싱크볼 · 인셋",
    price: "420,000원",
    cutout: "780 × 400mm",
    image: "/IMG_1772.jpeg",
    href: "/products/regens",
  },
  {
    brand: "벨라고",
    name: "BLE-858 벨리타 엠보",
    description: "사각싱크볼 · 인셋",
    price: "440,000원",
    cutout: "794 × 404mm",
    image: "/IMG_1757.jpeg",
    href: "/products/bellago",
  },
  {
    brand: "아티잔",
    name: "DU858BLR",
    description: "사각싱크볼 · 인셋",
    price: "420,000원",
    cutout: "794 × 400mm",
    image: "/IMG_1771.jpeg",
    href: "/products/artisan",
  },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInstallationPaths();
}

/* =========================================
   META
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
    return {};
  }

  const isGangnam =
    region === "seoul" &&
    district === "gangnam";

  const title = isGangnam
    ? "강남 싱크볼 교체 | 사각싱크볼 설치·상판 타공 | 싱크모아"
    : `${location.fullName} 싱크볼 교체·사각싱크볼 설치 | 싱크모아`;

  const description = isGangnam
    ? "강남 싱크볼 교체 및 사각싱크볼 설치 상담. 백조·리젠스·벨라고·아티잔 싱크볼 시공, 기존 싱크볼 철거, 상판 타공·확장, 수전·배수구 연결까지 안내합니다. 기본 설치비 170,000원."
    : `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치 상담. 백조·리젠스·벨라고·아티잔 싱크볼 판매 및 설치, 기존 싱크볼 철거, 상판 타공, 수전·배수구 연결까지 안내합니다.`;

  const canonical =
    `${SITE_URL}/installation/${region}/${district}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "싱크모아",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/IMG_0395.jpeg`,
          width: 1200,
          height: 630,
          alt: `${location.fullName} 싱크볼 교체`,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================
   PAGE
========================================= */

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

  const isGangnam =
    region === "seoul" &&
    district === "gangnam";

  const canonical =
    `${SITE_URL}/installation/${region}/${district}`;

  const faq = isGangnam
    ? [
        {
          q: "강남 싱크볼 교체 비용은 얼마인가요?",
          a: "싱크모아 기본 설치비는 170,000원이며 기존 싱크볼 철거와 기존 수전·배수구 연결 작업이 포함됩니다. 제품 가격과 상판 타공, 출장 관련 추가 비용은 현장 조건에 따라 별도로 안내됩니다.",
        },
        {
          q: "강남에서 사각싱크볼 설치가 가능한가요?",
          a: "네. 기존 상판 타공 치수와 싱크대 구조를 확인한 뒤 백조, 리젠스, 벨라고, 아티잔 등 사각싱크볼 설치 상담이 가능합니다.",
        },
        {
          q: "기존 싱크볼보다 새 싱크볼이 크면 설치할 수 있나요?",
          a: "상판 재질과 기존 타공 크기를 확인한 뒤 확장이 가능한 경우 상판 타공 작업을 진행할 수 있습니다. 타공 작업은 기본 설치비와 별도입니다.",
        },
        {
          q: "수전과 배수구 연결도 같이 해주나요?",
          a: "기존 수전과 기존 배수구 연결은 기본 설치비에 포함됩니다. 올스텐 배수구 업그레이드나 6WAY 수전 제품 추가도 상담 가능합니다.",
        },
      ]
    : [
        {
          q: `${location.fullName} 싱크볼 교체가 가능한가요?`,
          a: `네. ${location.fullName} 지역의 싱크볼 교체 및 사각싱크볼 설치 상담을 접수하고 있습니다. 실제 방문 가능 일정은 주소와 현장 조건 확인 후 안내합니다.`,
        },
        {
          q: "기본 설치비에는 어떤 작업이 포함되나요?",
          a: "기본 설치비 170,000원에는 기존 싱크볼 철거와 기존 수전 및 배수구 연결 작업이 포함됩니다.",
        },
        {
          q: "상판 타공도 가능한가요?",
          a: "기존 타공 사이즈보다 신규 싱크볼 타공 치수가 큰 경우 현장 확인 후 상판 타공 또는 확장 작업이 가능합니다.",
        },
      ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "싱크모아",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "싱크볼 설치",
        item: `${SITE_URL}/#regions`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${location.fullName} 싱크볼 교체`,
        item: canonical,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치`,
    serviceType:
      "싱크볼 교체·사각싱크볼 설치·상판 타공",
    provider: {
      "@type": "Organization",
      name: "싱크모아",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location.fullName,
    },
    description: `${location.fullName} 싱크볼 교체, 사각싱크볼 설치, 기존 싱크볼 철거, 상판 타공, 수전 및 배수구 연결 상담.`,
    url: canonical,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="installation-page">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbSchema
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              serviceSchema
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              faqSchema
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
            <Link href="/#brands">
              브랜드별 상품
            </Link>

            <Link href="/#service">
              설치 서비스
            </Link>

            <Link href="/#regions">
              설치 가능 지역
            </Link>

            <Link
              href="/order"
              className="header-order"
            >
              견적 문의
            </Link>
          </nav>

        </div>
      </header>

      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero">

        <div className="hero-image">
          <Image
            src="/IMG_0395.jpeg"
            alt={`${location.fullName} 싱크볼 교체 및 사각싱크볼 설치`}
            fill
            priority
            sizes="100vw"
          />

          <div className="hero-overlay" />
        </div>

        <div className="hero-content">

          <p className="eyebrow">
            SINKMOA INSTALLATION
          </p>

          {isGangnam ? (
            <>
              <h1>
                강남 싱크볼 교체
                <br />
                사각싱크볼 설치
              </h1>

              <p className="hero-description">
                강남구 싱크볼 교체부터
                사각싱크볼 설치,
                <br />
                기존 싱크볼 철거와
                상판 타공까지 상담합니다.
              </p>
            </>
          ) : (
            <>
              <h1>
                {location.fullName}
                <br />
                싱크볼 교체·설치
              </h1>

              <p className="hero-description">
                {location.fullName} 싱크볼
                교체부터 사각싱크볼 설치,
                <br />
                기존 싱크볼 철거와
                상판 타공까지 상담합니다.
              </p>
            </>
          )}

          <div className="hero-actions">

            <Link
              href="/order"
              className="primary-button"
            >
              설치 견적 문의
              <span>↗</span>
            </Link>

            <Link
              href="#products"
              className="secondary-button"
            >
              싱크볼 제품 보기
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================
          강남 전용 SEO 소개
      ===================================== */}

      {isGangnam && (
        <section className="gangnam-intro">

          <div className="content-width">

            <p className="section-label">
              GANGNAM SINK REPLACEMENT
            </p>

            <h2>
              강남 싱크볼 교체,
              <br />
              제품 선택부터 설치까지
            </h2>

            <p className="intro-copy">
              강남구에서 오래된 싱크볼을
              교체하거나 기존 원형·사각
              싱크볼을 새로운
              사각싱크볼로 교체할 계획이라면
              제품 크기만 확인해서는
              정확한 설치 여부를 판단하기
              어렵습니다.
              <br />
              <br />
              기존 싱크대 상판의
              타공 크기와 상판 재질,
              싱크볼 외경,
              수전 및 배수구 위치를
              함께 확인해야 합니다.
              싱크모아는
              <strong>
                {" "}강남 싱크볼 교체
              </strong>
              상담 시 기존 현장 사진과
              타공 치수를 먼저 확인하고,
              설치 가능한 사각싱크볼과
              필요한 추가 작업을
              안내합니다.
            </p>

            <div className="keyword-cards">

              <div>
                <span>01</span>
                <strong>
                  강남 싱크볼 교체
                </strong>
                <p>
                  기존 싱크볼 철거 후
                  신규 사각싱크볼 설치
                </p>
              </div>

              <div>
                <span>02</span>
                <strong>
                  강남 사각싱크볼 설치
                </strong>
                <p>
                  백조·리젠스·벨라고·
                  아티잔 제품 상담
                </p>
              </div>

              <div>
                <span>03</span>
                <strong>
                  강남 상판 타공
                </strong>
                <p>
                  신규 싱크볼 규격에 맞춘
                  타공·확장 상담
                </p>
              </div>

              <div>
                <span>04</span>
                <strong>
                  수전·배수구 연결
                </strong>
                <p>
                  기존 수전 및 배수구
                  연결 점검
                </p>
              </div>

            </div>

          </div>

        </section>
      )}

      {/* =====================================
          일반 지역 소개
      ===================================== */}

      {!isGangnam && (
        <section className="standard-intro">

          <div className="content-width">

            <p className="section-label">
              LOCAL INSTALLATION
            </p>

            <h2>
              {location.fullName}
              <br />
              싱크볼 교체 안내
            </h2>

            <p>
              {location.fullName} 지역에서
              기존 싱크볼 교체,
              사각싱크볼 설치,
              상판 타공 및
              수전·배수구 연결 상담을
              진행합니다.
              제품 선택 전 기존 상판
              타공 사이즈와 현장 사진을
              확인하면 보다 정확한
              설치 상담이 가능합니다.
            </p>

          </div>

        </section>
      )}

      {/* =====================================
          작업 가능 내용
      ===================================== */}

      <section className="work-section">

        <div className="content-width">

          <div className="section-heading">

            <div>
              <p className="section-label">
                INSTALLATION SERVICE
              </p>

              <h2>
                싱크볼 교체 시
                <br />
                가능한 작업
              </h2>
            </div>

            <p>
              단순 제품 교체뿐 아니라
              기존 구조 확인부터
              마감 점검까지
              설치에 필요한 작업을
              함께 확인합니다.
            </p>

          </div>

          <div className="work-grid">

            <article>
              <span>01</span>
              <h3>
                기존 싱크볼 철거
              </h3>
              <p>
                기존 싱크볼과 실리콘,
                연결 상태를 확인한 뒤
                철거합니다.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>
                사각싱크볼 교체
              </h3>
              <p>
                상판 규격에 적합한
                사각싱크볼을 확인하여
                설치합니다.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>
                상판 타공·확장
              </h3>
              <p>
                신규 싱크볼 타공 치수가
                더 큰 경우
                상판 재질 확인 후
                타공을 진행합니다.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>
                수전 연결
              </h3>
              <p>
                기존 수전 연결 상태를
                확인하고 설치 후
                누수 여부를 점검합니다.
              </p>
            </article>

            <article>
              <span>05</span>
              <h3>
                배수구 연결
              </h3>
              <p>
                배수구 및 배수 배관을
                연결하고 배수 상태를
                확인합니다.
              </p>
            </article>

            <article>
              <span>06</span>
              <h3>
                설치 마감 점검
              </h3>
              <p>
                싱크볼 고정,
                실리콘 마감,
                수전·배수 상태를
                최종 점검합니다.
              </p>
            </article>

          </div>

        </div>

      </section>

      {/* =====================================
          실제 시공 과정
      ===================================== */}

      <section className="case-section">

        <div className="content-width">

          <p className="section-label">
            INSTALLATION CASE
          </p>

          <h2>
            {isGangnam
              ? "강남 싱크볼 교체 시공 과정"
              : `${location.fullName} 싱크볼 교체 과정`}
          </h2>

          <p className="case-intro">
            싱크볼 교체는 제품을
            단순히 끼우는 작업이 아니라
            기존 상판 타공 치수와
            배수·수전 위치까지 함께
            확인해야 합니다.
          </p>

          <div className="before-after">

            <div className="case-image">

              <Image
                src="/IMG_0305.jpeg"
                alt={`${location.fullName} 싱크볼 교체 전`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />

              <span>
                BEFORE
              </span>

            </div>

            <div className="case-image">

              <Image
                src="/IMG_0395.jpeg"
                alt={`${location.fullName} 사각싱크볼 설치 후`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />

              <span>
                AFTER
              </span>

            </div>

          </div>

          <div className="process-grid">

            <div>
              <strong>STEP 01</strong>
              <h3>
                기존 타공 확인
              </h3>
              <p>
                현재 싱크볼과 상판
                타공 사이즈를 확인합니다.
              </p>
            </div>

            <div>
              <strong>STEP 02</strong>
              <h3>
                기존 싱크볼 철거
              </h3>
              <p>
                수전·배수 연결을 확인한 후
                기존 싱크볼을 철거합니다.
              </p>
            </div>

            <div>
              <strong>STEP 03</strong>
              <h3>
                상판 준비
              </h3>
              <p>
                필요한 경우
                신규 제품 규격에 맞춰
                상판 타공을 진행합니다.
              </p>
            </div>

            <div>
              <strong>STEP 04</strong>
              <h3>
                신규 싱크볼 설치
              </h3>
              <p>
                싱크볼을 고정하고
                마감 상태를 확인합니다.
              </p>
            </div>

            <div>
              <strong>STEP 05</strong>
              <h3>
                연결 및 점검
              </h3>
              <p>
                수전·배수구를 연결하고
                누수와 배수 상태를
                확인합니다.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          PRODUCTS
      ===================================== */}

      <section
        className="products-section"
        id="products"
      >

        <div className="content-width">

          <div className="section-heading">

            <div>
              <p className="section-label">
                SINK COLLECTION
              </p>

              <h2>
                설치 상담 가능한
                <br />
                사각싱크볼
              </h2>
            </div>

            <p>
              제품별 상판 타공 치수가
              다르므로 기존 싱크볼의
              타공 사이즈를 먼저
              확인하는 것이 좋습니다.
            </p>

          </div>

          <div className="product-grid">

            {PRODUCTS.map(
              (product) => (
                <Link
                  href={product.href}
                  className="product-card"
                  key={product.name}
                >

                  <div className="product-image">

                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.name} 사각싱크볼`}
                      fill
                      sizes="(max-width: 700px) 50vw, 25vw"
                    />

                  </div>

                  <div className="product-info">

                    <span>
                      {product.brand}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <dl>
                      <div>
                        <dt>
                          제품가
                        </dt>
                        <dd>
                          {product.price}
                        </dd>
                      </div>

                      <div>
                        <dt>
                          상판 타공
                        </dt>
                        <dd>
                          {product.cutout}
                        </dd>
                      </div>
                    </dl>

                  </div>

                </Link>
              )
            )}

          </div>

          <p className="cutout-notice">
            ※ 표기된 치수는 싱크볼
            외경이 아니라
            상판 타공 기준 치수입니다.
          </p>

        </div>

      </section>

      {/* =====================================
          PRICE
      ===================================== */}

      <section className="price-section">

        <div className="content-width">

          <p className="section-label">
            INSTALLATION PRICE
          </p>

          <h2>
            설치 비용 안내
          </h2>

          <div className="price-grid">

            <div className="main-price">
              <span>
                기본 설치비
              </span>

              <strong>
                170,000원
              </strong>

              <p>
                기존 싱크볼 철거
                <br />
                기존 수전 연결
                <br />
                기존 배수구 연결 포함
              </p>
            </div>

            <div className="option-prices">

              <div>
                <span>
                  올스텐 배수구
                </span>
                <strong>
                  +20,000원
                </strong>
              </div>

              <div>
                <span>
                  상판 타공
                </span>
                <strong>
                  +50,000원
                </strong>
              </div>

              <div>
                <span>
                  6WAY 수전 제품
                </span>
                <strong>
                  +70,000원
                </strong>
              </div>

            </div>

          </div>

          <p className="price-note">
            현장 조건, 상판 재질,
            출장 지역 등에 따라
            추가 비용이 발생할 수 있으며
            상담 시 사전 안내드립니다.
          </p>

        </div>

      </section>

      {/* =====================================
          설치 전 확인사항
      ===================================== */}

      <section className="check-section">

        <div className="content-width">

          <p className="section-label">
            BEFORE INSTALLATION
          </p>

          <h2>
            설치 상담 전
            <br />
            확인하면 좋은 것
          </h2>

          <div className="check-grid">

            <div>
              <span>01</span>
              <p>
                현재 싱크볼 전체 사진
              </p>
            </div>

            <div>
              <span>02</span>
              <p>
                싱크볼 가로·세로 크기
              </p>
            </div>

            <div>
              <span>03</span>
              <p>
                상판 재질 및 타공 상태
              </p>
            </div>

            <div>
              <span>04</span>
              <p>
                설치 지역 및 주소
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          FAQ
      ===================================== */}

      <section className="faq-section">

        <div className="content-width">

          <p className="section-label">
            FAQ
          </p>

          <h2>
            {isGangnam
              ? "강남 싱크볼 교체 자주 묻는 질문"
              : `${location.fullName} 설치 FAQ`}
          </h2>

          <div className="faq-list">

            {faq.map((item, index) => (
              <div
                className="faq-item"
                key={item.q}
              >

                <span>
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

                <div>
                  <h3>
                    {item.q}
                  </h3>

                  <p>
                    {item.a}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================
          같은 지역 다른 지역구
      ===================================== */}

      <section className="other-areas">

        <div className="content-width">

          <p className="section-label">
            OTHER AREAS
          </p>

          <h2>
            {location.regionName}
            {" "}
            다른 설치 지역
          </h2>

          <div className="area-links">

            {regionData.districts
              .filter(
                (item) =>
                  item.slug !== district
              )
              .map((item) => (
                <Link
                  href={`/installation/${region}/${item.slug}`}
                  key={item.slug}
                >
                  {item.name}
                  {" "}
                  싱크볼 교체
                  <span>↗</span>
                </Link>
              ))}

          </div>

        </div>

      </section>

      {/* =====================================
          CTA
      ===================================== */}

      <section className="cta">

        <div>

          <p className="section-label">
            SINKMOA
          </p>

          <h2>
            {location.fullName}
            <br />
            싱크볼 교체 상담
          </h2>

          <p>
            설치 예정 장소의 사진과
            현재 싱크볼 사이즈를
            보내주시면
            <br />
            제품 및 설치 방법을
            안내해드립니다.
          </p>

          <Link
            href="/order"
            className="cta-button"
          >
            설치 견적 문의하기
            <span>↗</span>
          </Link>

        </div>

      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="content-width">

          <Link href="/" className="footer-logo">
            SINKMOA
          </Link>

          <p>
            프리미엄 사각싱크볼
            판매 및 설치
          </p>

          <p className="footer-area">
            서울 · 경기 · 인천 ·
            충남 · 충북 설치 상담
          </p>

        </div>

      </footer>

      {/* =====================================
          STYLE
      ===================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .installation-page {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          --line: #e7e1d7;

          color: var(--ink);
          background: #fff;

          font-family:
            Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic",
            sans-serif;

          word-break: keep-all;
        }

        .installation-page a {
          text-decoration: none;
        }

        .content-width {
          width: min(
            calc(100% - 48px),
            1180px
          );

          margin: 0 auto;
        }

        .section-label {
          margin: 0 0 17px;

          color: #aa906c;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: .2em;
        }

        /* HEADER */

        .header {
          background: #111a1e;
        }

        .header-inner {
          width: min(
            calc(100% - 48px),
            1280px
          );

          height: 76px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          color: white;

          font-size: 20px;
          font-weight: 700;

          letter-spacing: .22em;
        }

        .header nav {
          display: flex;
          align-items: center;

          gap: 27px;
        }

        .header nav a {
          color: #ddd;

          font-size: 11px;
        }

        .header-order {
          padding: 11px 16px;

          border:
            1px solid
            rgba(255,255,255,.35);
        }

        /* HERO */

        .hero {
          position: relative;

          min-height: 590px;

          display: flex;
          align-items: center;

          overflow: hidden;
        }

        .hero-image {
          position: absolute;
          inset: 0;
        }

        .hero-image img {
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(8,15,18,.85),
              rgba(8,15,18,.55) 50%,
              rgba(8,15,18,.16)
            );
        }

        .hero-content {
          position: relative;
          z-index: 2;

          width: min(
            calc(100% - 48px),
            1180px
          );

          margin: auto;

          color: white;
        }

        .eyebrow {
          margin: 0 0 22px;

          color: #d7bd95;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: .22em;
        }

        .hero h1 {
          margin: 0;

          font-size:
            clamp(41px,5.3vw,70px);

          line-height: 1.22;

          font-weight: 400;

          letter-spacing: -.055em;
        }

        .hero-description {
          margin:
            26px 0 31px;

          color: #e3e5e4;

          font-size: 14px;
          line-height: 1.9;
        }

        .hero-actions {
          display: flex;

          gap: 10px;
        }

        .primary-button,
        .secondary-button {
          padding: 16px 19px;

          display: inline-flex;
          align-items: center;
          justify-content: space-between;

          min-width: 180px;

          font-size: 12px;
          font-weight: 700;
        }

        .primary-button {
          background: #c4b49a;

          color: #19262b;
        }

        .secondary-button {
          border:
            1px solid
            rgba(255,255,255,.6);

          color: white;
        }

        /* GANGNAM INTRO */

        .gangnam-intro,
        .standard-intro {
          padding:
            95px 0;
        }

        .gangnam-intro h2,
        .standard-intro h2 {
          margin: 0 0 30px;

          font-size:
            clamp(32px,4.3vw,53px);

          line-height: 1.4;

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .intro-copy,
        .standard-intro
        .content-width > p:last-child {
          max-width: 780px;

          margin: 0;

          color: #666;

          font-size: 14px;
          line-height: 2.05;
        }

        .keyword-cards {
          margin-top: 46px;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 9px;
        }

        .keyword-cards div {
          padding: 24px 20px;

          border:
            1px solid #e4ded4;

          background: #faf9f6;
        }

        .keyword-cards span {
          display: block;

          margin-bottom: 30px;

          color: #ad9572;

          font-size: 10px;
        }

        .keyword-cards strong {
          font-size: 16px;
        }

        .keyword-cards p {
          margin:
            10px 0 0;

          color: #777;

          font-size: 11px;
          line-height: 1.7;
        }

        /* WORK */

        .work-section {
          padding:
            90px 0;

          background: #f7f5f0;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          gap: 30px;

          margin-bottom: 44px;
        }

        .section-heading h2 {
          margin: 0;

          font-size:
            clamp(31px,4vw,47px);

          line-height: 1.4;

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .section-heading > p {
          max-width: 330px;

          margin: 0;

          color: #777;

          font-size: 12px;
          line-height: 1.9;
        }

        .work-grid {
          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 10px;
        }

        .work-grid article {
          min-height: 200px;

          padding: 24px;

          background: white;

          border:
            1px solid #e5dfd5;
        }

        .work-grid article > span {
          color: #ad9572;

          font-size: 10px;
        }

        .work-grid h3 {
          margin:
            37px 0 10px;

          font-size: 17px;
        }

        .work-grid p {
          margin: 0;

          color: #777;

          font-size: 11px;
          line-height: 1.8;
        }

        /* CASE */

        .case-section {
          padding:
            95px 0;
        }

        .case-section h2,
        .products-section h2,
        .price-section h2,
        .check-section h2,
        .faq-section h2,
        .other-areas h2 {
          margin: 0;

          font-size:
            clamp(31px,4vw,48px);

          font-weight: 400;

          letter-spacing: -.05em;

          line-height: 1.4;
        }

        .case-intro {
          max-width: 650px;

          margin:
            20px 0 40px;

          color: #777;

          font-size: 13px;
          line-height: 1.9;
        }

        .before-after {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 12px;
        }

        .case-image {
          position: relative;

          aspect-ratio: 1.5;

          overflow: hidden;

          background: #eee;
        }

        .case-image img {
          object-fit: cover;
        }

        .case-image span {
          position: absolute;

          left: 17px;
          top: 17px;

          padding: 7px 10px;

          background:
            rgba(18,28,32,.8);

          color: white;

          font-size: 8px;

          letter-spacing: .15em;
        }

        .process-grid {
          margin-top: 13px;

          display: grid;

          grid-template-columns:
            repeat(5,1fr);

          gap: 8px;
        }

        .process-grid div {
          padding: 20px 16px;

          border:
            1px solid #e7e1d7;
        }

        .process-grid strong {
          color: #aa906c;

          font-size: 9px;
        }

        .process-grid h3 {
          margin:
            23px 0 8px;

          font-size: 14px;
        }

        .process-grid p {
          margin: 0;

          color: #777;

          font-size: 10px;
          line-height: 1.7;
        }

        /* PRODUCTS */

        .products-section {
          padding:
            95px 0;

          background: #f7f5f0;
        }

        .product-grid {
          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 10px;
        }

        .product-card {
          display: block;

          overflow: hidden;

          background: white;

          color: #19262b;
        }

        .product-image {
          position: relative;

          aspect-ratio: 1.2;

          background: white;
        }

        .product-image img {
          object-fit: contain;

          padding: 10px;
        }

        .product-info {
          padding: 18px;
        }

        .product-info > span {
          color: #aa906c;

          font-size: 9px;
        }

        .product-info h3 {
          margin:
            7px 0 4px;

          font-size: 17px;
        }

        .product-info > p {
          margin:
            0 0 16px;

          color: #777;

          font-size: 10px;
        }

        .product-info dl {
          margin: 0;

          border-top:
            1px solid #eee8df;
        }

        .product-info dl div {
          padding:
            9px 0;

          display: flex;
          justify-content: space-between;

          border-bottom:
            1px solid #eee8df;
        }

        .product-info dt,
        .product-info dd {
          margin: 0;

          font-size: 9px;
        }

        .product-info dt {
          color: #888;
        }

        .cutout-notice {
          margin:
            16px 0 0;

          color: #888;

          font-size: 10px;
        }

        /* PRICE */

        .price-section {
          padding:
            95px 0;
        }

        .price-grid {
          margin-top: 40px;

          display: grid;

          grid-template-columns:
            1fr 1.3fr;

          gap: 10px;
        }

        .main-price {
          padding: 32px;

          background: #19262b;

          color: white;
        }

        .main-price > span {
          color: #d5bd99;

          font-size: 11px;
        }

        .main-price strong {
          display: block;

          margin:
            17px 0 24px;

          font-size: 35px;

          font-weight: 500;
        }

        .main-price p {
          margin: 0;

          color: #c8cfcd;

          font-size: 11px;
          line-height: 1.9;
        }

        .option-prices {
          border:
            1px solid #e4ded4;
        }

        .option-prices div {
          padding: 22px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .option-prices
        div + div {
          border-top:
            1px solid #e4ded4;
        }

        .option-prices span {
          font-size: 13px;
        }

        .option-prices strong {
          color: #9d8562;

          font-size: 16px;
        }

        .price-note {
          margin:
            14px 0 0;

          color: #888;

          font-size: 10px;
        }

        /* CHECK */

        .check-section {
          padding:
            90px 0;

          background: #ede8df;
        }

        .check-grid {
          margin-top: 37px;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 8px;
        }

        .check-grid div {
          padding: 21px;

          background: white;
        }

        .check-grid span {
          color: #aa906c;

          font-size: 9px;
        }

        .check-grid p {
          margin:
            28px 0 0;

          font-size: 13px;
          font-weight: 600;
        }

        /* FAQ */

        .faq-section {
          padding:
            95px 0;
        }

        .faq-list {
          margin-top: 40px;

          border-top:
            1px solid #ddd6cb;
        }

        .faq-item {
          padding:
            25px 0;

          display: grid;

          grid-template-columns:
            50px 1fr;

          gap: 15px;

          border-bottom:
            1px solid #ddd6cb;
        }

        .faq-item > span {
          color: #aa906c;

          font-size: 10px;
        }

        .faq-item h3 {
          margin:
            0 0 10px;

          font-size: 15px;
        }

        .faq-item p {
          margin: 0;

          max-width: 800px;

          color: #777;

          font-size: 11px;
          line-height: 1.9;
        }

        /* OTHER AREA */

        .other-areas {
          padding:
            90px 0;

          background: #f7f5f0;
        }

        .area-links {
          margin-top: 35px;

          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 7px;
        }

        .area-links a {
          padding: 14px 13px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border:
            1px solid #e2dcd2;

          background: white;

          color: #19262b;

          font-size: 10px;
        }

        .area-links a span {
          color: #aa906c;
        }

        /* CTA */

        .cta {
          min-height: 390px;

          padding: 70px 24px;

          display: flex;
          justify-content: center;
          align-items: center;

          background: #19262b;

          color: white;

          text-align: center;
        }

        .cta h2 {
          margin: 0;

          font-size:
            clamp(34px,4.8vw,55px);

          font-weight: 400;

          line-height: 1.4;
        }

        .cta > div > p:not(.section-label) {
          margin:
            20px 0 27px;

          color: #c7cfcd;

          font-size: 12px;
          line-height: 1.9;
        }

        .cta-button {
          padding: 16px 20px;

          display: inline-flex;

          gap: 35px;

          background: #c4b49a;

          color: #19262b;

          font-size: 12px;
          font-weight: 700;
        }

        /* FOOTER */

        .footer {
          padding:
            45px 0;

          background: #10181c;

          color: white;
        }

        .footer-logo {
          color: white;

          font-size: 19px;
          font-weight: 700;

          letter-spacing: .2em;
        }

        .footer p {
          margin:
            10px 0 0;

          color: #aeb5b3;

          font-size: 10px;
        }

        /* TABLET */

        @media
        (max-width: 850px) {

          .header nav a:not(
            .header-order
          ) {
            display: none;
          }

          .keyword-cards {
            grid-template-columns:
              1fr 1fr;
          }

          .work-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .product-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .process-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .area-links {
            grid-template-columns:
              1fr 1fr;
          }

        }

        /* MOBILE */

        @media
        (max-width: 600px) {

          .content-width {
            width:
              calc(100% - 30px);
          }

          .header-inner {
            width:
              calc(100% - 30px);

            height: 64px;
          }

          .logo {
            font-size: 16px;
          }

          .header-order {
            padding: 9px 12px;
          }

          .hero {
            min-height: 510px;
          }

          .hero-image img {
            object-position:
              center center;
          }

          .hero-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(8,15,18,.84),
                rgba(8,15,18,.55)
              );
          }

          .hero-content {
            width:
              calc(100% - 34px);
          }

          .hero h1 {
            font-size: 37px;
          }

          .hero-description {
            font-size: 12px;
          }

          .hero-actions {
            flex-direction: column;

            max-width: 270px;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .gangnam-intro,
          .standard-intro {
            padding:
              65px 0;
          }

          .gangnam-intro h2,
          .standard-intro h2 {
            font-size: 30px;
          }

          .intro-copy,
          .standard-intro
          .content-width
          > p:last-child {
            font-size: 12px;
          }

          .keyword-cards {
            margin-top: 31px;

            gap: 6px;
          }

          .keyword-cards div {
            padding: 17px 14px;
          }

          .keyword-cards span {
            margin-bottom: 19px;
          }

          .keyword-cards strong {
            font-size: 13px;
          }

          .keyword-cards p {
            font-size: 9px;
          }

          .work-section,
          .case-section,
          .products-section,
          .price-section,
          .check-section,
          .faq-section,
          .other-areas {
            padding:
              65px 0;
          }

          .section-heading {
            display: block;

            margin-bottom: 29px;
          }

          .section-heading h2,
          .case-section h2,
          .products-section h2,
          .price-section h2,
          .check-section h2,
          .faq-section h2,
          .other-areas h2 {
            font-size: 29px;
          }

          .section-heading > p {
            margin-top: 15px;

            font-size: 10px;
          }

          .work-grid {
            gap: 6px;
          }

          .work-grid article {
            min-height: 170px;

            padding: 16px 13px;
          }

          .work-grid h3 {
            margin-top: 25px;

            font-size: 13px;
          }

          .work-grid p {
            font-size: 9px;
          }

          .before-after {
            grid-template-columns: 1fr;

            gap: 7px;
          }

          .case-image {
            aspect-ratio: 1.55;
          }

          .process-grid {
            gap: 6px;
          }

          .process-grid div {
            padding: 15px 12px;
          }

          .process-grid h3 {
            margin-top: 17px;

            font-size: 12px;
          }

          .process-grid p {
            font-size: 9px;
          }

          .product-grid {
            gap: 6px;
          }

          .product-info {
            padding: 13px;
          }

          .product-info h3 {
            font-size: 13px;
          }

          .product-info dl div {
            display: block;
          }

          .product-info dd {
            margin-top: 3px;
          }

          .price-grid {
            grid-template-columns: 1fr;
          }

          .main-price {
            padding: 24px;
          }

          .main-price strong {
            font-size: 30px;
          }

          .option-prices div {
            padding: 17px;
          }

          .check-grid {
            grid-template-columns:
              1fr 1fr;

            gap: 6px;
          }

          .check-grid div {
            padding: 16px;
          }

          .check-grid p {
            margin-top: 20px;

            font-size: 11px;
          }

          .faq-item {
            grid-template-columns:
              32px 1fr;

            padding:
              20px 0;
          }

          .faq-item h3 {
            font-size: 13px;
          }

          .faq-item p {
            font-size: 10px;
          }

          .area-links {
            grid-template-columns:
              1fr 1fr;

            gap: 5px;
          }

          .area-links a {
            padding: 11px 9px;

            font-size: 9px;
          }

          .cta {
            min-height: 350px;

            padding:
              55px 18px;
          }

          .cta h2 {
            font-size: 32px;
          }

        }

      `}</style>

    </main>
  );
}
