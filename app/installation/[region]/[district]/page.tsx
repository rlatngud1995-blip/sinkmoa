
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

  const title = `${location.fullName} 싱크볼 교체·설치 | 사각싱크볼 전문 싱크모아`;

  const description =
    `${location.fullName} 싱크볼 교체 및 설치 상담. ` +
    "백조, 리젠스, 벨라고, 아티잔 사각싱크볼 판매 및 " +
    "기존 싱크볼 철거, 상판 타공, 수전·배수구 연결 안내. " +
    "기본 설치비 170,000원. 방문 가능 여부는 상담 후 확인합니다.";

  const url = `${SITE}/installation/${region}/${district}`;

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
      type: "website",
      locale: "ko_KR",
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
    title: "기존 싱크볼 확인",
    description:
      "기존 싱크볼과 상판 타공 치수를 확인합니다.",
  },
  {
    number: "02",
    title: "제품 및 옵션 상담",
    description:
      "희망 모델과 설치 가능 여부를 상담합니다.",
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
      "필요한 상판 작업 후 싱크볼을 설치합니다.",
  },
  {
    number: "05",
    title: "연결 및 마무리",
    description:
      "수전과 배수구 연결 상태를 점검합니다.",
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

  if (!location) notFound();

  const regionData = INSTALLATION_REGIONS[region];

  const nearby = regionData.districts.filter(
    (item) => item.slug !== district
  );

  const faq = [
    {
      question: `${location.districtName}에서 싱크볼 교체 상담이 가능한가요?`,
      answer:
        `${location.fullName} 지역의 싱크볼 교체·설치 문의를 접수하고 있습니다. ` +
        "실제 방문 가능 여부와 일정, 출장 관련 추가 비용은 상담 후 안내합니다.",
    },
    {
      question: "싱크볼 기본 설치비는 얼마인가요?",
      answer:
        "기본 설치비는 170,000원이며 기존 싱크볼 철거와 기존 수전 및 배수구 연결 작업을 포함합니다. " +
        "현장 상태에 따라 추가 작업이 필요할 수 있습니다.",
    },
    {
      question: "기존 상판 타공 크기가 달라도 설치할 수 있나요?",
      answer:
        "상판 재질, 기존 타공 치수와 선택한 싱크볼의 규격에 따라 달라집니다. " +
        "타공 작업은 기본 옵션 기준 50,000원이 추가되며 작업 가능 여부는 사전 확인이 필요합니다.",
    },
    {
      question: "어떤 싱크볼 브랜드를 선택할 수 있나요?",
      answer:
        "백조, 리젠스, 벨라고, 아티잔의 등록된 사각싱크볼 제품을 선택할 수 있습니다. " +
        "모델별 가격과 타공 치수는 주문 페이지에서 확인할 수 있습니다.",
    },
  ];

  const url = `${SITE}/installation/${region}/${district}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${location.fullName} 싱크볼 교체 및 설치 상담`,
    serviceType: "싱크볼 교체 및 설치",
    provider: {
      "@type": "Organization",
      name: "싱크모아",
      url: SITE,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location.fullName,
    },
    url,
    description:
      `${location.fullName} 싱크볼 교체 및 설치 상담. ` +
      "방문 가능 여부와 최종 견적은 상담 후 확정됩니다.",
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#19262B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <header className="border-b border-[#e6e0d6] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[0.15em]"
          >
            SINKMOA
          </Link>

          <nav className="flex items-center gap-5 text-xs sm:text-sm">
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <Link
              href="/order"
              className="bg-[#19262B] px-4 py-3 text-white"
            >
              주문 문의
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#19262B] px-5 py-20 text-center text-white sm:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs tracking-[0.3em] text-[#C4B49A]">
            SINKMOA INSTALLATION SERVICE
          </p>

          <h1 className="text-3xl font-semibold leading-[1.5] tracking-tight sm:text-5xl">
            {location.fullName}
            <br />
            싱크볼 교체 · 설치 상담
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-[#D0D5D2] sm:text-base">
            주방에 어울리는 사각싱크볼 선택부터
            <br className="hidden sm:block" />
            기존 싱크볼 철거, 신규 설치와 연결 점검까지.
            <br />
            싱크모아에서 제품과 설치를 함께 상담하세요.
          </p>

          <Link
            href="/order"
            className="mt-9 inline-block bg-[#C4B49A] px-9 py-4 text-sm font-semibold text-[#19262B]"
          >
            싱크볼 주문 및 설치 문의 ↗
          </Link>

          <p className="mt-5 text-xs leading-6 text-[#BEC7C4]">
            지역별 방문 가능 여부 및 일정은 상담 후 확인
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <section>
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A18B6A]">
            AVAILABLE PRODUCTS
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {location.districtName} 싱크볼 제품 안내
          </h2>

          <p className="mt-4 text-sm leading-8 text-[#777]">
            등록된 4개 브랜드의 인셋 사각싱크볼을
            비교해보세요. 아래 가격은 제품 가격이며
            설치비는 별도입니다.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <article
                key={product.slug}
                className="border border-[#e5dfd5] bg-white p-6 sm:p-8"
              >
                <p className="text-xs tracking-widest text-[#A18B6A]">
                  {product.brand}
                </p>

                <h3 className="mt-3 text-lg font-semibold">
                  {product.model}
                </h3>

                <p className="mt-3 text-xs text-[#777]">
                  인셋 방식 · 상판 타공 치수{" "}
                  {product.cutout}
                </p>

                <div className="mt-7 flex items-end justify-between gap-3">
                  <strong className="text-xl">
                    {money(product.price)}
                  </strong>

                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-semibold text-[#927B5A] underline underline-offset-4"
                  >
                    제품 보기 ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs leading-7 text-[#888]">
            ※ 상판 타공 치수는 싱크볼 외경과 다릅니다.
            실제 제품 사양과 설치 적합성은 주문 전
            확인해주세요.
          </p>
        </section>

        <section className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A18B6A]">
            INSTALLATION PRICE
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            싱크볼 설치비 및 추가 옵션
          </h2>

          <div className="mt-8 overflow-hidden border border-[#e5dfd5] bg-white">
            {[
              {
                name: "기본 설치비",
                detail:
                  "기존 싱크볼 철거 및 기존 수전·배수구 연결 포함",
                price: 170000,
              },
              {
                name: "올스텐 배수구 업그레이드",
                detail: "기본 배수구에서 변경",
                price: 20000,
              },
              {
                name: "상판 타공",
                detail:
                  "상판 재질 및 현장 조건에 따라 작업 가능 여부 확인",
                price: 50000,
              },
              {
                name: "6WAY 수전 제품",
                detail:
                  "싱크볼 설치 주문 시 수전 교체 설치비 추가 없음",
                price: 70000,
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-col gap-3 border-b border-[#eee8de] p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:p-7"
              >
                <div>
                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#888]">
                    {item.detail}
                  </p>
                </div>

                <strong className="text-lg text-[#927B5A]">
                  +{money(item.price)}
                </strong>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-7 text-[#888]">
            ※ 싱크볼 제품 가격은 별도입니다. 현장 조건,
            출장 거리, 추가 작업에 따라 최종 견적이
            달라질 수 있습니다.
          </p>
        </section>

        <section className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A18B6A]">
            INSTALLATION PROCESS
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            싱크볼 교체 진행 과정
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step) => (
              <article
                key={step.number}
                className="border border-[#e5dfd5] bg-white p-6"
              >
                <span className="text-2xl text-[#C4B49A]">
                  {step.number}
                </span>
                <h3 className="mt-5 text-sm font-semibold">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs leading-7 text-[#777]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A18B6A]">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {location.districtName} 싱크볼 설치 FAQ
          </h2>

          <div className="mt-8 space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group border border-[#e5dfd5] bg-white p-6"
              >
                <summary className="cursor-pointer text-sm font-semibold leading-7">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-8 text-[#777]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#A18B6A]">
            SERVICE AREAS
          </p>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            {location.regionName} 다른 지역 안내
          </h2>

          <div className="mt-7 flex flex-wrap gap-2">
            {nearby.map((item) => (
              <Link
                key={item.slug}
                href={`/installation/${region}/${item.slug}`}
                className="border border-[#e1dacf] bg-white px-4 py-3 text-xs transition-colors hover:border-[#C4B49A] hover:bg-[#eee8de]"
              >
                {item.name} 싱크볼 설치
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-[#19262B] px-5 py-16 text-center text-white">
        <p className="text-xs tracking-[0.2em] text-[#C4B49A]">
          SINKMOA
        </p>

        <h2 className="mt-5 text-2xl font-semibold leading-relaxed sm:text-3xl">
          {location.districtName} 싱크볼 교체,
          <br />
          제품 선택부터 상담하세요.
        </h2>

        <p className="mt-5 text-sm leading-8 text-[#C4CCCA]">
          설치 가능 여부와 정확한 견적은
          <br />
          현장 정보를 확인한 후 안내합니다.
        </p>

        <Link
          href="/order"
          className="mt-8 inline-block bg-[#C4B49A] px-10 py-4 text-sm font-semibold text-[#19262B]"
        >
          주문 및 견적 문의하기 ↗
        </Link>
      </section>

      <footer className="bg-white px-5 py-8 text-center text-xs text-[#888]">
        <Link href="/" className="font-semibold text-[#19262B]">
          SINKMOA
        </Link>
        <p className="mt-3">
          싱크볼의 선택부터 설치까지, 싱크모아.
        </p>
      </footer>
    </main>
  );
}
