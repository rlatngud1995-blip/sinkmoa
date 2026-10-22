
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  BRANDS,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
} from "../../data/products";

type Props = {
  params: Promise<{ brand: string }>;
};

const INSTALL_STEPS = [
  {
    number: "01",
    title: "기존 상판 및 타공 사이즈 확인",
    text: "기존 싱크볼의 상판 타공 가로·세로 치수와 상판 재질, 배관 상태를 확인합니다.",
  },
  {
    number: "02",
    title: "기존 싱크볼 철거",
    text: "기존 수전과 배수구 연결을 분리하고 싱크볼을 철거합니다.",
  },
  {
    number: "03",
    title: "상판 타공 및 설치 준비",
    text: "새 제품의 타공 사이즈에 맞는지 확인합니다. 추가 타공이 필요한 경우 작업 가능 여부를 확인한 뒤 진행합니다.",
  },
  {
    number: "04",
    title: "새 싱크볼 설치",
    text: "제품의 설치 방식에 맞춰 싱크볼을 고정하고 연결 부위를 마감합니다.",
  },
  {
    number: "05",
    title: "수전 및 배수구 연결",
    text: "수전과 배수구를 연결한 후 통수 및 누수 여부를 점검합니다.",
  },
];

const OPTIONS = [
  {
    title: "기본 싱크볼 설치",
    price: "+170,000원",
    description:
      "기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전 및 배수구 연결 시공을 포함합니다.",
  },
  {
    title: "올스텐 배수구",
    price: "+20,000원",
    description:
      "기본 배수구 대신 올스텐 배수구를 선택할 수 있습니다.",
  },
  {
    title: "상판 타공",
    price: "+50,000원",
    description:
      "상판 타공이 필요한 경우 선택합니다. 작업 가능 여부와 추가 비용은 현장 상태에 따라 확인합니다.",
  },
  {
    title: "6WAY 수전 제품",
    price: "+70,000원",
    description:
      "싱크볼 설치와 함께 구매할 수 있습니다. 수전 교체 설치비는 추가되지 않습니다.",
  },
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
    return {
      title: "상품을 찾을 수 없습니다 | 싱크모아",
    };
  }

  const item = BRANDS[brand as BrandSlug];

  return {
    title: `${item.name} 싱크볼 판매·설치 및 상판 타공 사이즈 | 싱크모아`,
    description: `${item.name} 사각 싱크볼의 상판 타공 사이즈, 제품 가격, 설치비와 추가 옵션을 확인하세요. 싱크모아 제품 구매 및 설치 상담.`,
    alternates: {
      canonical:
        `https://www.sinkmoa.com/products/${brand}`,
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

  const products = PRODUCTS.filter(
    (product) => product.brand === brand
  );

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
        }

        .brand-header {
          background: #19262b;
          padding: 22px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-logo {
          color: #e5d2ad;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        .header-link {
          color: #e5d2ad;
          font-size: 12px;
        }

        .brand-hero {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 80px 20px 95px;
        }

        .eyebrow {
          color: #b8a17b;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
        }

        .brand-hero h1 {
          font-size: clamp(43px, 8vw, 80px);
          font-weight: 400;
          letter-spacing: 3px;
          margin: 20px 0;
        }

        .brand-hero p {
          color: #d7d7d7;
          font-size: 14px;
          line-height: 2;
        }

        .container {
          max-width: 1100px;
          width: calc(100% - 36px);
          margin: auto;
        }

        .section {
          padding: 85px 0;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 42px;
        }

        .section-heading h2 {
          font-size: clamp(27px, 4vw, 40px);
          font-weight: 500;
          margin: 15px 0;
        }

        .section-heading p {
          font-size: 14px;
          color: #777;
          line-height: 1.9;
        }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .product-card {
          background: white;
          border: 1px solid #e7e1d7;
          overflow: hidden;
        }

        .product-placeholder {
          aspect-ratio: 4 / 3;
          background: #e9e5de;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #9b896d;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .product-body {
          padding: 25px;
        }

        .product-body h3 {
          font-size: 20px;
          line-height: 1.5;
          margin: 13px 0;
        }

        .product-description {
          color: #777;
          font-size: 13px;
          line-height: 1.9;
        }

        .cutout-box {
          background: #f7f5f0;
          border: 1px solid #e5dfd5;
          padding: 17px;
          margin: 20px 0;
        }

        .cutout-label {
          color: #927b58;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .cutout-value {
          color: #19262b;
          font-size: 23px;
          font-weight: 700;
        }

        .cutout-note {
          font-size: 11px;
          color: #777;
          line-height: 1.8;
          margin-top: 8px;
        }

        .product-type {
          color: #777;
          font-size: 13px;
        }

        .product-price {
          margin-top: 22px;
          font-size: 25px;
          font-weight: 700;
        }

        .price-caption {
          color: #888;
          font-size: 12px;
          margin-top: 6px;
        }

        .gold-button {
          display: inline-block;
          background: #c4b49a;
          color: #19262b;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
          padding: 18px 25px;
          margin-top: 20px;
        }

        .product-button {
          display: block;
        }

        .empty {
          background: white;
          text-align: center;
          padding: 65px 20px;
          border: 1px solid #e7e1d7;
        }

        .empty h3 {
          font-size: 23px;
          font-weight: 500;
        }

        .empty p {
          color: #777;
          font-size: 14px;
          line-height: 1.9;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .info-card {
          background: white;
          border: 1px solid #e7e1d7;
          padding: 30px;
        }

        .info-card h3 {
          font-size: 18px;
          margin: 0 0 13px;
        }

        .info-card p {
          font-size: 13px;
          color: #777;
          line-height: 1.9;
        }

        .installation-section {
          background: #ebe7df;
          padding: 85px 0;
        }

        .step {
          display: grid;
          grid-template-columns: 70px 1fr;
          gap: 20px;
          padding: 26px 0;
          border-bottom: 1px solid #d8d1c5;
        }

        .step-number {
          font-size: 29px;
          color: #a18c6b;
        }

        .step h3 {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .step p {
          margin: 0;
          color: #777;
          font-size: 14px;
          line-height: 1.9;
        }

        .option-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .option-card {
          background: white;
          border: 1px solid #e7e1d7;
          padding: 30px;
        }

        .option-card h3 {
          font-size: 17px;
          margin: 0 0 12px;
        }

        .option-price {
          color: #957b54;
          font-size: 22px;
          font-weight: 700;
        }

        .option-card p {
          color: #777;
          font-size: 13px;
          line-height: 1.9;
        }

        .notice {
          margin-top: 25px;
          font-size: 12px;
          color: #777;
          line-height: 1.9;
        }

        .contact-section {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 90px 20px;
        }

        .contact-section h2 {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 400;
          margin: 20px 0;
        }

        .contact-section p {
          color: #d0d0d0;
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
          .products {
            grid-template-columns: 1fr;
          }

          .info-grid,
          .option-grid {
            grid-template-columns: 1fr;
          }

          .section,
          .installation-section {
            padding: 60px 0;
          }

          .step {
            grid-template-columns: 55px 1fr;
            gap: 15px;
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

        <Link
          href={`/order?brand=${brand}`}
          className="header-link"
        >
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
          제품 판매 및 설치 서비스
        </p>
      </section>

      <div className="container">
        <section className="section" id="products">
          <div className="section-heading">
            <span className="eyebrow">
              PRODUCT COLLECTION
            </span>

            <h2>{item.name} 싱크볼 상품</h2>

            <p>
              제품 가격과 상판 타공 사이즈를
              확인하고 주문 문의를 진행하세요.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="empty">
              <h3>상품 등록 준비 중</h3>

              <p>
                판매 모델과 가격을 준비하고 있습니다.
                <br />
                제품 상담은 문자로 문의해주세요.
              </p>

              <Link
                href={`/order?brand=${brand}`}
                className="gold-button"
              >
                제품 상담 문의하기 ↗
              </Link>
            </div>
          ) : (
            <div className="products">
              {products.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-placeholder">
                    <span>{item.english}</span>
                    <span>SINKMOA COLLECTION</span>
                  </div>

                  <div className="product-body">
                    <span className="eyebrow">
                      {item.english}
                    </span>

                    <h3>{product.name}</h3>

                    <p className="product-description">
                      {product.description}
                    </p>

                    {product.width &&
                      product.depth && (
                        <div className="cutout-box">
                          <div className="cutout-label">
                            상판 타공 사이즈
                            (가로 × 세로)
                          </div>

                          <div className="cutout-value">
                            {product.width} ×{" "}
                            {product.depth}mm
                          </div>

                          <div className="cutout-note">
                            싱크볼 외경이 아닌
                            상판 타공 치수입니다.
                          </div>
                        </div>
                      )}

                    {product.installationType && (
                      <p className="product-type">
                        설치 방식:{" "}
                        {product.installationType}
                      </p>
                    )}

                    <div className="product-price">
                      {formatPrice(product.price)}
                    </div>

                    <p className="price-caption">
                      싱크볼 제품 단독 판매가격
                    </p>

                    <Link
                      className="gold-button product-button"
                      href={`/order?product=${encodeURIComponent(
                        product.id
                      )}`}
                    >
                      이 제품 구매 및 설치 문의 ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="eyebrow">
              PRODUCT COMPONENTS
            </span>

            <h2>제품 구성 및 선택 옵션</h2>
          </div>

          <div className="info-grid">
            <article className="info-card">
              <h3>싱크볼 본체</h3>
              <p>
                선택한 모델의 싱크볼 본체입니다.
                상판 타공 사이즈와 설치 방식은
                상품별로 확인할 수 있습니다.
              </p>
            </article>

            <article className="info-card">
              <h3>기본 배수구</h3>
              <p>
                기본 배수구는 싱크볼 가격에
                포함됩니다. 모델별 제공 구성품은
                주문 전 확인합니다.
              </p>
            </article>

            <article className="info-card">
              <h3>올스텐 배수구</h3>
              <p>
                기본 배수구에서 올스텐 배수구로
                업그레이드할 수 있습니다.
                추가 금액은 20,000원입니다.
              </p>
            </article>

            <article className="info-card">
              <h3>6WAY 수전</h3>
              <p>
                싱크볼 설치 주문 시 추가할 수 있는
                수전입니다. 제품 가격은 70,000원이며
                함께 교체할 경우 설치비는 무료입니다.
              </p>
            </article>
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
              상판 타공 확인부터
              설치 및 마무리 점검까지
            </p>
          </div>

          {INSTALL_STEPS.map((step) => (
            <article
              className="step"
              key={step.number}
            >
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

            <h2>설치 및 추가 옵션 가격</h2>
          </div>

          <div className="option-grid">
            {OPTIONS.map((option) => (
              <article
                className="option-card"
                key={option.title}
              >
                <h3>{option.title}</h3>

                <div className="option-price">
                  {option.price}
                </div>

                <p>{option.description}</p>
              </article>
            ))}
          </div>

          <p className="notice">
            기본 배수구는 싱크볼 제품 가격에
            포함됩니다. 상판 타공 및 6WAY 수전은
            싱크볼 설치 주문 시에만 선택할 수
            있습니다. 상판 재질, 타공 가능 여부,
            기존 배관 상태에 따라 최종 견적이
            달라질 수 있습니다.
          </p>
        </section>
      </div>

      <section className="contact-section">
        <span className="eyebrow">
          SINKMOA CONSULTATION
        </span>

        <h2>싱크볼 구매부터 설치까지</h2>

        <p>
          {item.name} 싱크볼 제품과
          설치 옵션을 선택하고
          <br />
          문자로 간편하게 상담받으세요.
        </p>

        <Link
          href={`/order?brand=${brand}`}
          className="gold-button"
        >
          문자 주문 문의하기 ↗
        </Link>
      </section>

      <footer className="footer">
        SINKMOA · PREMIUM KITCHEN COLLECTION
      </footer>

      <div className="mobile-order">
        <Link href={`/order?brand=${brand}`}>
          제품 구매 및 설치 문의하기 ↗
        </Link>
      </div>
    </main>
  );
}
