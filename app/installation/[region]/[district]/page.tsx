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

type SeoRegion = {
  searchName: string;
  title: string;
  description: string;
  heading: string;
  subheading: string;
  neighborhoods: string[];
  intro: string[];
};

const SEO_REGIONS: Record<string, SeoRegion> = {
  gangnam: {
    searchName: "강남",
    title:
      "강남 싱크볼 교체 | 사각싱크볼 설치·상판 타공 | 싱크모아",
    description:
      "강남 싱크볼 교체 및 사각싱크볼 설치 상담. 역삼·논현·대치·도곡·청담·삼성동 등 강남구 싱크볼 시공, 기존 싱크볼 철거, 상판 타공, 수전·배수구 연결까지 안내합니다.",
    heading: "강남 싱크볼 교체",
    subheading:
      "사각싱크볼 설치부터 상판 타공까지",
    neighborhoods: [
      "역삼동",
      "논현동",
      "대치동",
      "도곡동",
      "청담동",
      "삼성동",
    ],
    intro: [
      "강남구에서 오래된 싱크볼을 교체하거나 기존 싱크볼을 새로운 사각싱크볼로 변경할 때는 제품 크기뿐 아니라 기존 상판의 타공 크기와 재질을 함께 확인해야 합니다.",
      "싱크모아는 강남 싱크볼 교체 상담 시 현재 싱크볼 사진과 타공 사이즈를 먼저 확인하고 백조·리젠스·벨라고·아티잔 제품 가운데 설치 가능한 제품과 필요한 추가 작업을 안내합니다.",
    ],
  },

  songpa: {
    searchName: "송파",
    title:
      "송파 싱크볼 교체 | 잠실·문정 사각싱크볼 설치 | 싱크모아",
    description:
      "송파 싱크볼 교체 및 사각싱크볼 설치 상담. 잠실·문정·가락·방이·석촌 등 송파구 싱크볼 교체, 상판 타공, 기존 싱크볼 철거 및 배수구·수전 연결 안내.",
    heading: "송파 싱크볼 교체",
    subheading:
      "잠실·문정 사각싱크볼 설치 상담",
    neighborhoods: [
      "잠실동",
      "문정동",
      "가락동",
      "방이동",
      "석촌동",
      "오금동",
    ],
    intro: [
      "송파구 아파트와 주택에서 싱크볼을 교체할 때 기존 상판 타공 규격과 신규 싱크볼 규격이 맞는지 먼저 확인하는 것이 중요합니다.",
      "잠실·문정·가락·방이·석촌 등 송파구 싱크볼 교체 상담 시 현장 사진과 현재 싱크볼 크기를 확인하여 사각싱크볼 설치와 상판 타공 필요 여부를 안내합니다.",
    ],
  },

  seocho: {
    searchName: "서초",
    title:
      "서초 싱크볼 교체 | 반포·방배 사각싱크볼 설치 | 싱크모아",
    description:
      "서초 싱크볼 교체 및 사각싱크볼 설치. 반포·잠원·서초·양재·방배 지역 싱크볼 교체, 상판 타공·확장, 기존 싱크볼 철거, 수전 및 배수구 연결 상담.",
    heading: "서초 싱크볼 교체",
    subheading:
      "반포·방배 사각싱크볼 설치",
    neighborhoods: [
      "반포동",
      "잠원동",
      "서초동",
      "양재동",
      "방배동",
      "우면동",
    ],
    intro: [
      "서초구 싱크볼 교체는 기존 주방 상판 재질과 싱크볼 타공 치수를 확인한 뒤 제품을 선택하는 것이 좋습니다.",
      "반포·잠원·서초·양재·방배 지역에서 사각싱크볼 교체를 계획하고 있다면 기존 싱크볼 사진과 사이즈를 보내주시면 설치 가능 제품과 필요한 시공 작업을 안내합니다.",
    ],
  },

  gangseo: {
    searchName: "강서",
    title:
      "강서구 싱크볼 교체 | 마곡·화곡 사각싱크볼 설치 | 싱크모아",
    description:
      "강서구 싱크볼 교체 및 사각싱크볼 설치. 마곡·화곡·등촌·가양·발산 지역 싱크볼 교체, 상판 타공, 기존 싱크볼 철거와 수전·배수구 연결 상담.",
    heading: "강서구 싱크볼 교체",
    subheading:
      "마곡·화곡 사각싱크볼 설치 상담",
    neighborhoods: [
      "마곡동",
      "화곡동",
      "등촌동",
      "가양동",
      "발산동",
      "방화동",
    ],
    intro: [
      "강서구에서 싱크볼을 교체할 때 신규 사각싱크볼의 타공 사이즈가 기존 타공보다 큰 경우 상판 타공 또는 확장 작업이 필요할 수 있습니다.",
      "마곡·화곡·등촌·가양·발산을 포함한 강서구 싱크볼 교체 상담 시 현재 주방 사진과 싱크볼 크기를 확인하여 적합한 설치 방법을 안내합니다.",
    ],
  },

  yeongdeungpo: {
    searchName: "영등포",
    title:
      "영등포 싱크볼 교체 | 여의도·당산 사각싱크볼 설치 | 싱크모아",
    description:
      "영등포 싱크볼 교체 및 사각싱크볼 설치 상담. 여의도·당산·문래·신길 등 영등포구 싱크볼 교체, 상판 타공, 철거, 수전·배수구 연결 안내.",
    heading: "영등포 싱크볼 교체",
    subheading:
      "여의도·당산 사각싱크볼 설치",
    neighborhoods: [
      "여의도동",
      "당산동",
      "문래동",
      "신길동",
      "영등포동",
      "양평동",
    ],
    intro: [
      "영등포구 싱크볼 교체 시 기존 상판 타공 치수와 신규 제품의 규격을 비교해야 안정적인 설치가 가능합니다.",
      "여의도·당산·문래·신길 등 영등포구에서 사각싱크볼 교체를 계획한다면 기존 싱크볼 철거부터 신규 설치, 수전 및 배수구 연결까지 상담할 수 있습니다.",
    ],
  },

  mapo: {
    searchName: "마포",
    title:
      "마포 싱크볼 교체 | 공덕·망원 사각싱크볼 설치 | 싱크모아",
    description:
      "마포 싱크볼 교체 및 사각싱크볼 설치. 공덕·아현·망원·서교·상암 지역 기존 싱크볼 철거, 상판 타공 및 사각싱크볼 교체 상담.",
    heading: "마포 싱크볼 교체",
    subheading:
      "공덕·망원 사각싱크볼 설치",
    neighborhoods: [
      "공덕동",
      "아현동",
      "망원동",
      "서교동",
      "상암동",
      "합정동",
    ],
    intro: [
      "마포구 싱크볼 교체는 기존 싱크볼의 외경보다 실제 상판 타공 사이즈를 확인하는 것이 중요합니다.",
      "공덕·아현·망원·서교·상암 등 마포 지역에서 싱크볼 교체를 진행할 경우 현장 사진과 기존 규격을 기준으로 설치 가능한 사각싱크볼을 안내합니다.",
    ],
  },

  yongsan: {
    searchName: "용산",
    title:
      "용산 싱크볼 교체 | 한남·이촌 사각싱크볼 설치 | 싱크모아",
    description:
      "용산 싱크볼 교체 및 사각싱크볼 설치. 한남·이촌·후암·원효로·이태원 등 용산구 싱크볼 교체, 상판 타공 및 배수구·수전 연결 상담.",
    heading: "용산 싱크볼 교체",
    subheading:
      "한남·이촌 사각싱크볼 설치",
    neighborhoods: [
      "한남동",
      "이촌동",
      "후암동",
      "원효로",
      "이태원동",
      "효창동",
    ],
    intro: [
      "용산구 주방 싱크볼을 교체할 경우 기존 싱크대 구조와 상판 재질에 따라 설치 방식이 달라질 수 있습니다.",
      "한남·이촌·후암·이태원 등 용산구 싱크볼 교체 상담 시 기존 타공 사이즈를 확인하여 제품 설치와 상판 가공 필요 여부를 안내합니다.",
    ],
  },

  seongdong: {
    searchName: "성동",
    title:
      "성동구 싱크볼 교체 | 성수·왕십리 사각싱크볼 설치 | 싱크모아",
    description:
      "성동구 싱크볼 교체 및 사각싱크볼 설치. 성수·왕십리·금호·옥수·행당 지역 싱크볼 철거, 상판 타공, 수전·배수구 연결 상담.",
    heading: "성동구 싱크볼 교체",
    subheading:
      "성수·왕십리 사각싱크볼 설치",
    neighborhoods: [
      "성수동",
      "왕십리",
      "금호동",
      "옥수동",
      "행당동",
      "응봉동",
    ],
    intro: [
      "성동구에서 기존 싱크볼을 사각싱크볼로 교체할 때는 제품 규격과 현재 상판 타공 크기를 비교해야 합니다.",
      "성수·왕십리·금호·옥수·행당 지역의 싱크볼 교체 상담을 진행하며 현장 상황에 따라 상판 타공과 수전·배수구 연결까지 함께 안내합니다.",
    ],
  },

  yangcheon: {
    searchName: "양천",
    title:
      "양천구 싱크볼 교체 | 목동 사각싱크볼 설치 | 싱크모아",
    description:
      "양천구 싱크볼 교체 및 사각싱크볼 설치. 목동·신정·신월 지역 싱크볼 교체, 기존 싱크볼 철거, 상판 타공, 수전 및 배수구 연결 상담.",
    heading: "양천구 싱크볼 교체",
    subheading:
      "목동 사각싱크볼 설치 상담",
    neighborhoods: [
      "목동",
      "신정동",
      "신월동",
    ],
    intro: [
      "양천구 싱크볼 교체를 계획할 때 기존 상판 타공 사이즈를 정확하게 확인하면 제품 선택이 훨씬 수월합니다.",
      "목동·신정·신월 지역의 사각싱크볼 설치 상담을 진행하며 기존 싱크볼 철거부터 신규 제품 설치 및 연결 작업까지 안내합니다.",
    ],
  },

  guro: {
    searchName: "구로",
    title:
      "구로 싱크볼 교체 | 신도림·고척 사각싱크볼 설치 | 싱크모아",
    description:
      "구로 싱크볼 교체 및 사각싱크볼 설치. 구로·신도림·개봉·고척·천왕 지역 싱크볼 교체, 상판 타공 및 기존 수전·배수구 연결 상담.",
    heading: "구로 싱크볼 교체",
    subheading:
      "신도림·고척 사각싱크볼 설치",
    neighborhoods: [
      "구로동",
      "신도림동",
      "개봉동",
      "고척동",
      "천왕동",
      "오류동",
    ],
    intro: [
      "구로구 싱크볼 교체 시 현재 상판 타공 규격과 신규 사각싱크볼 규격이 맞지 않으면 추가 타공 작업이 필요할 수 있습니다.",
      "구로·신도림·개봉·고척·천왕 등 구로구 싱크볼 교체 상담 시 제품 선택부터 철거와 설치 방법까지 함께 안내합니다.",
    ],
  },
};

const PRODUCTS = [
  {
    brand: "백조",
    name: "고니 8630",
    price: "390,000원",
    cutout: "780 × 400mm",
    image: "/IMG_1642.jpeg",
    href: "/products/baekjo",
  },
  {
    brand: "리젠스",
    name: "8603 엠보",
    price: "420,000원",
    cutout: "780 × 400mm",
    image: "/IMG_1772.jpeg",
    href: "/products/regens",
  },
  {
    brand: "벨라고",
    name: "BLE-858 벨리타",
    price: "440,000원",
    cutout: "794 × 404mm",
    image: "/IMG_1757.jpeg",
    href: "/products/bellago",
  },
  {
    brand: "아티잔",
    name: "DU858BLR",
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, district } = await params;

  const location =
    getInstallationLocation(
      region,
      district
    );

  if (!location) {
    return {};
  }

  const seo =
    region === "seoul"
      ? SEO_REGIONS[district]
      : undefined;

  const title =
    seo?.title ??
    `${location.fullName} 싱크볼 교체·사각싱크볼 설치 | 싱크모아`;

  const description =
    seo?.description ??
    `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치 상담. 백조·리젠스·벨라고·아티잔 제품 설치, 기존 싱크볼 철거, 상판 타공, 수전 및 배수구 연결을 안내합니다.`;

  const canonical =
    `${SITE_URL}/installation/${region}/${district}`;

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    robots: {
      index: true,
      follow: true,
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
          url:
            `${SITE_URL}/IMG_0395.jpeg`,
          width: 1200,
          height: 630,
          alt:
            `${location.fullName} 싱크볼 교체`,
        },
      ],
    },
  };
}

export default async function InstallationPage({
  params,
}: PageProps) {
  const { region, district } =
    await params;

  const location =
    getInstallationLocation(
      region,
      district
    );

  if (!location) {
    notFound();
  }

  const regionData =
    INSTALLATION_REGIONS[region];

  const seo =
    region === "seoul"
      ? SEO_REGIONS[district]
      : undefined;

  const heading =
    seo?.heading ??
    `${location.fullName} 싱크볼 교체`;

  const subheading =
    seo?.subheading ??
    "사각싱크볼 설치 및 상판 타공 상담";

  const canonical =
    `${SITE_URL}/installation/${region}/${district}`;

  const faq = [
    {
      q: `${seo?.searchName ?? location.districtName} 싱크볼 교체 비용은 얼마인가요?`,
      a: "싱크모아 기본 설치비는 170,000원입니다. 기존 싱크볼 철거와 기존 수전 및 배수구 연결이 포함되며 제품 가격, 상판 타공, 현장 추가 작업 및 출장 관련 비용은 별도로 안내될 수 있습니다.",
    },
    {
      q: "사각싱크볼로 교체할 수 있나요?",
      a: "기존 싱크대 상판의 타공 사이즈와 상판 재질을 확인한 뒤 설치 가능한 제품을 안내합니다. 신규 제품의 타공 사이즈가 더 큰 경우 상판 확장 작업이 필요할 수 있습니다.",
    },
    {
      q: "상판 타공도 같이 가능한가요?",
      a: "현장 조건과 상판 재질을 확인한 뒤 가능한 경우 상판 타공 또는 확장 작업을 진행할 수 있습니다. 상판 타공은 기본 설치비와 별도입니다.",
    },
    {
      q: "수전과 배수구도 연결해주나요?",
      a: "기존 수전과 기존 배수구 연결은 기본 설치비에 포함됩니다. 올스텐 배수구와 6WAY 수전 제품 추가 상담도 가능합니다.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      `${heading} 및 사각싱크볼 설치`,
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
    url: canonical,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(
      (item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })
    ),
  };

  return (
    <main className="page">

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

      <header className="header">
        <div className="headerInner">

          <Link
            href="/"
            className="logo"
          >
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
              설치 지역
            </Link>

            <Link
              href="/order"
              className="orderNav"
            >
              견적 문의
