
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE = "https://www.sinkmoa.com";

const BRANDS = {
  regens: {
    name: "리젠스",
    english: "REGENS",
    image: "/brand-regens.jpg",
  },
  bellago: {
    name: "벨라고",
    english: "BELLAGO",
    image: "/brand-bellago.jpg",
  },
  artisan: {
    name: "아티잔",
    english: "ARTISAN",
    image: "/brand-artisan.jpg",
  },
  baekjo: {
    name: "백조",
    english: "BAEKJO",
    image: "/brand-baekjo.jpg",
  },
} as const;

type BrandSlug = keyof typeof BRANDS;

type Props = {
  params: Promise<{ brand: string }>;
};

const COMPONENTS = [
  {
    number: "01",
    title: "싱크볼 본체",
    text: "선택한 브랜드 및 모델의 싱크볼 본체입니다. 실제 규격과 설치 방식은 모델별로 확인합니다.",
  },
  {
    number: "02",
    title: "기본 배수구",
    text: "싱크볼 제품 가격에 기본 배수구가 포함됩니다. 모델별 실제 제공 구성은 주문 전 확인합니다.",
  },
  {
    number: "03",
    title: "올스텐 배수구 업그레이드",
    text: "기본 배수구 대신 올스텐 배수구를 선택할 수 있습니다. 추가 금액은 20,000원입니다.",
  },
  {
    number: "04",
    title: "6WAY 멀티 수전",
    text: "싱크볼 설치 주문 시 추가할 수 있는 선택 제품입니다. 제품 가격 70,000원이며 함께 교체할 때 별도 수전 설치비는 없습니다.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "설치 환경 확인",
    text: "기존 싱크볼 크기와 상판 재질, 타공 규격, 급수 및 배수 연결 상태를 확인합니다.",
  },
  {
    number: "02",
    title: "기존 싱크볼 철거",
    text: "기존 수전과 배수 연결을 분리한 뒤 싱크볼을 철거합니다. 현장 조건에 따라 추가 작업이 필요할 수 있습니다.",
  },
  {
    number: "03",
    title: "상판 규격 확인 및 타공",
    text: "새 싱크볼 설치에 맞는 규격인지 확인합니다. 추가 타공이 필요한 경우 작업 가능 여부를 확인하고 진행합니다.",
  },
  {
    number: "04",
    title: "새 싱크볼 설치",
    text: "제품별 설치 방식에 맞춰 싱크볼을 고정하고 연결 부위를 마감합니다.",
  },
  {
    number: "05",
    title: "수전·배수구 연결 및 점검",
    text: "수전과 배수구를 연결한 뒤 통수 및 누수 여부를 확인합니다. 6WAY 수전 선택 시 함께 교체합니다.",
  },
];

const PRICES = [
  ["싱크볼 제품", "모델별 판매가격"],
  ["기본 배수구", "제품 가격 포함"],
  ["싱크볼 기본 설치", "+170,000원"],
  ["올스텐 배수구 업그레이드", "+20,000원"],
  ["상판 타공", "+50,000원"],
  ["6WAY 수전 제품", "+70,000원"],
  ["6WAY 수전 교체 설치비", "무료"],
];

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
    title: `${item.name} 싱크볼 제품 및 설치 안내 | 싱크모아`,
    description:
      `${item.name} 싱크볼 구성품, 설치 순서, 설치비와 6WAY 수전 추가 옵션을 확인하세요. 싱크모아 제품 구매 및 설치 상담.`,
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
  const orderUrl = `/order?brand=${brand}`;

  return (
    <main className="brand-page">
      <style>{`
        .brand-page {
          background: #f7f5f0;
          color: #19262b;
          min-height: 100vh;
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
          word-break: keep-all;
        }

        .brand-page * {
          box-sizing: border-box;
        }

        .brand-page a {
          text-decoration: none;
          color: inherit;
        }

        .brand-header {
          background: #19262b;
          padding: 22px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-logo {
          color: #e5d2ad !important;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .header-link {
          color: #e5d2ad !important;
          font-size: 12px;
        }

        .brand-hero {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 85px 20px 100px;
        }

        .eyebrow {
          color: #c4b49a;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .brand-hero h1 {
          font-size: clamp(44px, 8vw, 85px);
          font-weight: 400;
          letter-spacing: 4px;
          margin: 20px 0;
        }

        .brand-hero p:last-child {
          color: #d7d7d7;
          font-size: 14px;
          line-height: 2;
        }

        .container {
          width: min(1100px, calc(100% - 36px));
          margin: auto;
        }

        .intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          padding: 95px 0;
        }

        .intro-image {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          background: #e9e5de;
        }

        .intro-content h2,
        .section-heading h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 500;
          line-height: 1.5;
          margin: 16px 0 20px;
        }

        .intro-content p,
        .section-heading p {
          font-size: 14px;
          line-height: 2;
          color: #777;
        }

        .gold-line {
          width: 45px;
          height: 2px;
          background: #c4b49a;
          margin: 25px 0;
        }

        .gold-button {
          display: inline-block;
          padding: 19px 30px;
          background: #c4b49a;
          color: #19262b !important;
          font-size: 13px;
          font-weight: 700;
          margin-top: 22px;
          text-align: center;
        }

        .section {
          padding: 90px 0;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 48px;
        }

        .component-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .component-card {
          background: white;
          border: 1px solid #e9e4dc;
          padding: 32px;
          min-height: 205px;
        }

        .component-number {
          color: #b8a17b;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .component-card h3 {
          font-size: 19px;
          margin: 18px 0 12px;
          font-weight: 600;
        }

        .component-card p {
          font-size: 13px;
          line-height: 1.9;
          color: #777;
        }

        .installation-section {
          background: #ebe7df;
          padding: 90px 0;
        }

        .step {
          display: grid;
          grid-template-columns: 85px 1fr;
          gap: 25px;
          padding: 28px 0;
          border-bottom: 1px solid #d8d1c5;
        }

        .step-number {
          color: #aa9676;
          font-size: 29px;
          font-weight: 400;
        }

        .step h3 {
          font-size: 19px;
          margin: 0 0 12px;
        }

        .step p {
          color: #6f6f6f;
          font-size: 14px;
          line-height: 1.9;
          margin: 0;
        }

        .price-box {
          background: white;
          border: 1px solid #e9e4dc;
          padding: 40px;
          max-width: 820px;
          margin: auto;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 19px 0;
          border-bottom: 1px solid #eee9e1;
          font-size: 14px;
        }

        .price-row strong {
          color: #987e57;
          white-space: nowrap;
        }

        .price-notice {
          color: #777;
          font-size: 12px;
          line-height: 1.9;
          margin-top: 24px;
        }

        .faq-item {
          border-bottom: 1px solid #e0d9ce;
          padding: 24px 0;
        }

        .faq-item h3 {
          font-size: 16px;
          margin: 0 0 10px;
        }

        .faq-item p {
          font-size: 13px;
          color: #777;
          line-height: 1.9;
          margin: 0;
        }

        .contact-section {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 95px 20px;
        }

        .contact-section h2 {
          font-size: clamp(28px, 5vw, 43px);
          font-weight: 400;
          margin: 20px 0;
        }

        .contact-section p {
          color: #cdd1d1;
          font-size: 14px;
          line-height: 2;
        }

        .footer {
          background: #111a1e;
          color: #b9ae9c;
          text-align: center;
          padding: 35px 20px 95px;
          font-size: 12px;
        }

        .mobile-order {
          display: none;
        }

        @media (max-width: 768px) {
          .intro {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 55px 0;
          }

          .section,
          .installation-section {
            padding: 65px 0;
          }

          .component-grid {
            grid-template-columns: 1fr;
          }

          .component-card {
            min-height: auto;
            padding: 25px;
          }

          .step {
            grid-template-columns: 55px 1fr;
            gap: 15px;
          }

          .price-box {
            padding: 25px 18px;
          }

          .price-row {
            font-size: 12px;
          }

          .mobile-order {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: #19262b;
            padding: 12px 16px;
            box-shadow: 0 -4px 20px rgba(0,0,0,.12);
          }

          .mobile-order a {
            display: block;
            background: #c4b49a;
            color: #19262b;
            text-align: center;
            padding: 17px;
            font-size: 14px;
            font-weight: 700;
          }
        }
      `}</style>

      <header className="brand-header">
        <Link href="/" className="brand-logo">
          SINKMOA
        </Link>

        <Link href={orderUrl} className="header-link">
          주문 문의 ↗
        </Link>
      </header>

      <section className="brand-hero">
        <span className="eyebrow">
          PREMIUM SINK COLLECTION
        </span>

        <h1>{item.english}</h1>

        <p>
          {item.name} 싱크볼
          <br />
          제품 구매 및 설치 서비스
        </p>
      </section>

      <div className="container">
        <section className="intro">
          <img
            src={item.image}
            alt={`${item.name} 싱크볼`}
            className="intro-image"
          />

          <div className="intro-content">
            <span className="eyebrow">
              SINKMOA COLLECTION
            </span>

            <h2>
              아름다운 주방을 위한
              <br />
              새로운 선택
            </h2>

            <div className="gold-line" />

            <p>
              싱크모아에서 {item.name} 싱크볼의
              제품 구매 및 설치 상담을
              진행합니다.
            </p>

            <p>
              제품만 구매하거나 설치까지
              함께 신청할 수 있습니다.
              설치를 선택하면 올스텐 배수구,
              상판 타공, 6WAY 수전도
              추가로 선택할 수 있습니다.
            </p>

            <Link href={orderUrl} className="gold-button">
              제품 구매 및 설치 문의 ↗
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="eyebrow">
              PRODUCT COMPONENTS
            </span>

            <h2>제품 구성 및 선택 옵션</h2>

            <p>
              기본 구성품과 추가로 선택할 수 있는
              옵션을 안내합니다.
            </p>
          </div>

          <div className="component-grid">
            {COMPONENTS.map((item) => (
              <article
                className="component-card"
                key={item.number}
              >
                <span className="component-number">
                  COMPONENT {item.number}
                </span>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="installation-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              INSTALLATION PROCESS
            </span>

            <h2>싱크볼 설치 진행 순서</h2>

            <p>
              기존 싱크볼 철거부터
              마무리 점검까지
            </p>
          </div>

          {STEPS.map((step) => (
            <article className="step" key={step.number}>
              <span className="step-number">
                {step.number}
              </span>

              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="container">
        <section className="section">
          <div className="section-heading">
            <span className="eyebrow">
              SERVICE PRICING
            </span>

            <h2>제품 및 설치 비용</h2>

            <p>
              필요한 옵션만 선택하여
              상담받으세요.
            </p>
          </div>

          <div className="price-box">
            {PRICES.map(([name, price]) => (
              <div className="price-row" key={name}>
                <span>{name}</span>
                <strong>{price}</strong>
              </div>
            ))}

            <p className="price-notice">
              기본 설치비에는 기존 수전 연결과
              배수구 연결 시공이 포함됩니다.
              6WAY 수전은 싱크볼 설치 주문 시
              추가할 수 있으며 제품 가격은
              70,000원, 교체 설치비는 무료입니다.
              상판 재질과 현장 조건에 따라
              추가 비용이 발생할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="eyebrow">
              FREQUENTLY ASKED QUESTIONS
            </span>

            <h2>자주 묻는 질문</h2>
          </div>

          <div className="faq-item">
            <h3>Q. 싱크볼 제품만 구매할 수 있나요?</h3>
            <p>
              네. 제품만 구매하거나 설치 포함으로
              문의하실 수 있습니다.
            </p>
          </div>

          <div className="faq-item">
            <h3>Q. 설치비에는 어떤 작업이 포함되나요?</h3>
            <p>
              기본 설치비 170,000원에는
              싱크볼 설치와 기존 수전 및
              배수구 연결 시공이 포함됩니다.
              추가 작업은 현장 조건에 따라
              별도 안내합니다.
            </p>
          </div>

          <div className="faq-item">
            <h3>Q. 6WAY 수전은 얼마인가요?</h3>
            <p>
              싱크볼 설치와 함께 신청하는
              6WAY 수전 제품 가격은
              70,000원입니다.
              교체 설치비는 추가되지 않습니다.
            </p>
          </div>

          <div className="faq-item">
            <h3>Q. 상판 타공이 필요한 경우는요?</h3>
            <p>
              기존 타공 규격이 새 싱크볼과
              맞지 않는 경우 작업 가능 여부를
              확인합니다. 기본 추가 타공 비용은
              50,000원이며 상판 재질이나
              작업 범위에 따라 달라질 수 있습니다.
            </p>
          </div>
        </section>
      </div>

      <section className="contact-section">
        <span className="eyebrow">
          SINKMOA CONSULTATION
        </span>

        <h2>싱크볼 구매부터 설치까지</h2>

        <p>
          {item.name} 제품 구매 및
          설치 상담을 받아보세요.
          <br />
          선택한 옵션과 고객 정보를
          문자로 간편하게 전달할 수 있습니다.
        </p>

        <Link href={orderUrl} className="gold-button">
          문자 주문 문의하기 ↗
        </Link>
      </section>

      <footer className="footer">
        SINKMOA
        <p>PREMIUM KITCHEN COLLECTION</p>
      </footer>

      <div className="mobile-order">
        <Link href={orderUrl}>
          제품 구매 및 설치 문의하기 ↗
        </Link>
      </div>
    </main>
  );
}
