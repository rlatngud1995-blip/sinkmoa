
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE = "https://www.sinkmoa.com";

const BRANDS = {
  regens: {
    name: "리젠스",
    english: "REGENS",
    image: "/brand-regens.jpg",
    description:
      "리젠스 싱크볼 제품을 살펴보고 제품 구매 및 설치 견적을 문의하세요.",
  },
  bellago: {
    name: "벨라고",
    english: "BELLAGO",
    image: "/brand-bellago.jpg",
    description:
      "벨라고 싱크볼 제품을 살펴보고 제품 구매 및 설치 견적을 문의하세요.",
  },
  artisan: {
    name: "아티잔",
    english: "ARTISAN",
    image: "/brand-artisan.jpg",
    description:
      "아티잔 싱크볼 제품을 살펴보고 제품 구매 및 설치 견적을 문의하세요.",
  },
  baekjo: {
    name: "백조",
    english: "BAEKJO",
    image: "/brand-baekjo.jpg",
    description:
      "백조 싱크볼 제품을 살펴보고 제품 구매 및 설치 견적을 문의하세요.",
  },
} as const;

type BrandSlug = keyof typeof BRANDS;

type Props = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return Object.keys(BRANDS).map((brand) => ({
    brand,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { brand } = await params;

  if (!(brand in BRANDS)) {
    return { title: "페이지를 찾을 수 없습니다" };
  }

  const item = BRANDS[brand as BrandSlug];

  return {
    title: `${item.name} 싱크볼 판매 및 설치`,
    description: item.description,
    alternates: {
      canonical: `${SITE}/products/${brand}`,
    },
  };
}

export default async function BrandPage({
  params,
}: Props) {
  const { brand } = await params;

  if (!(brand in BRANDS)) {
    notFound();
  }

  const item = BRANDS[brand as BrandSlug];

  const orderUrl =
    `/order?brand=${encodeURIComponent(brand)}`;

  return (
    <main className="brand-page">
      <style>{`
        .brand-page {
          background: #f7f5f0;
          color: #19262b;
          min-height: 100vh;
          font-family: Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
        }

        .brand-header {
          background: #19262b;
          padding: 24px;
          text-align: center;
        }

        .brand-logo {
          color: #e5d2ad;
          font-size: 25px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .brand-hero {
          background: #19262b;
          text-align: center;
          color: white;
          padding: 85px 20px 100px;
        }

        .brand-label {
          color: #c4b49a;
          font-size: 11px;
          letter-spacing: 3px;
        }

        .brand-hero h1 {
          font-size: clamp(43px, 7vw, 76px);
          font-weight: 500;
          letter-spacing: 3px;
          margin: 20px 0;
        }

        .brand-hero p:last-child {
          color: #d5d2cc;
          font-size: 14px;
          line-height: 1.9;
        }

        .brand-container {
          width: min(1100px, calc(100% - 36px));
          margin: auto;
          padding: 90px 0;
        }

        .brand-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 65px;
          align-items: center;
        }

        .brand-photo {
          width: 100%;
          aspect-ratio: 4 / 4;
          object-fit: cover;
          background: #e9e5de;
        }

        .brand-content h2 {
          font-size: clamp(29px, 4vw, 43px);
          font-weight: 500;
          line-height: 1.5;
          margin: 20px 0;
        }

        .brand-content p {
          color: #777;
          line-height: 2;
          font-size: 15px;
          word-break: keep-all;
        }

        .gold-divider {
          width: 45px;
          height: 2px;
          background: #c4b49a;
          margin: 28px 0;
        }

        .brand-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #c4b49a;
          color: #19262b;
          padding: 18px 30px;
          font-size: 13px;
          font-weight: 700;
          margin-top: 28px;
        }

        .brand-notice {
          background: white;
          padding: 55px 30px;
          text-align: center;
          margin-top: 90px;
          border: 1px solid #e7e1d8;
        }

        .brand-notice h3 {
          font-size: 24px;
          font-weight: 500;
        }

        .brand-notice p {
          color: #777;
          line-height: 1.9;
          font-size: 14px;
        }

        .brand-footer {
          background: #111a1e;
          color: #e5d2ad;
          text-align: center;
          padding: 45px 20px;
          font-size: 13px;
        }

        @media (max-width: 768px) {
          .brand-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .brand-container {
            padding: 55px 0;
          }

          .brand-hero {
            padding: 65px 20px 75px;
          }

          .brand-notice {
            margin-top: 55px;
          }
        }
      `}</style>

      <header className="brand-header">
        <Link href="/" className="brand-logo">
          SINKMOA
        </Link>
      </header>

      <section className="brand-hero">
        <p className="brand-label">
          PREMIUM SINK COLLECTION
        </p>
        <h1>{item.english}</h1>
        <p>
          {item.name} 싱크볼 컬렉션
          <br />
          제품 구매 및 설치 상담
        </p>
      </section>

      <div className="brand-container">
        <div className="brand-layout">
          <img
            src={item.image}
            alt={`${item.name} 싱크볼`}
            className="brand-photo"
          />

          <div className="brand-content">
            <span className="brand-label">
              THE COLLECTION
            </span>

            <h2>
              주방을 위한
              <br />
              새로운 선택
            </h2>

            <div className="gold-divider" />

            <p>{item.description}</p>

            <p>
              제품 단독 구매와 설치 포함 상담이
              가능합니다. 제품 모델명과 설치 지역을
              알려주시면 구매 및 시공 방법을
              안내해드립니다.
            </p>

            <Link
              href={orderUrl}
              className="brand-button"
            >
              {item.name} 제품 문의하기 ↗
            </Link>
          </div>
        </div>

        <section className="brand-notice">
          <span className="brand-label">
            PRODUCT INFORMATION
          </span>

          <h3>제품별 상세 안내</h3>

          <p>
            실제 판매 모델과 가격은
            순차적으로 등록할 예정입니다.
            <br />
            현재는 문자 상담을 통해
            제품 구매 및 설치 견적을
            문의하실 수 있습니다.
          </p>

          <Link
            href={orderUrl}
            className="brand-button"
          >
            문자 견적 문의하기 ↗
          </Link>
        </section>
      </div>

      <footer className="brand-footer">
        <Link href="/">SINKMOA</Link>
        <p>
          PREMIUM KITCHEN COLLECTION
        </p>
      </footer>
    </main>
  );
}
