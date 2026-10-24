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
              제품
