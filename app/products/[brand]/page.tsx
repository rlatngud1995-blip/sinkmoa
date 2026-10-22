
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
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
    title: "설치 환경 확인",
    text: "기존 싱크볼의 상판 타공 사이즈, 상판 재질 및 배관 상태를 확인합니다.",
  },
  {
    number: "02",
    title: "기존 싱크볼 철거",
    text: "기존 수전과 배수구 연결을 분리한 후 싱크볼을 철거합니다.",
  },
  {
    number: "03",
    title: "상판 및 설치 준비",
    text: "새 싱크볼의 타공 사이즈와 기존 상판을 비교합니다. 추가 타공이 필요한 경우 작업 가능 여부를 확인합니다.",
  },
  {
    number: "04",
    title: "새 싱크볼 설치",
    text: "제품의 설치 방식에 맞춰 싱크볼을 고정하고 연결 부위를 마감합니다.",
  },
  {
    number: "05",
    title: "연결 및 최종 점검",
    text: "수전과 배수구를 연결하고 통수 및 누수 여부를 점검합니다.",
  },
];

const OPTIONS = [
  {
    number: "01",
    title: "기본 싱크볼 설치",
    price: "+170,000원",
    description:
      "기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전 및 배수구 연결 시공 포함",
    note: "싱크볼 제품 구매 시 선택",
  },
  {
    number: "02",
    title: "올스텐 배수구",
    price: "+20,000원",
    description:
      "기본 배수구 대신 올스텐 배수구로 변경",
    note: "제품 단독 구매 시에도 선택 가능",
  },
  {
    number: "03",
    title: "상판 타공",
    price: "+50,000원",
    description:
      "기존 상판의 타공 사이즈 변경이 필요한 경우",
    note: "설치 서비스 이용 시 선택 가능",
  },
  {
    number: "04",
    title: "6WAY 수전 제품",
    price: "+70,000원",
    description:
      "싱크볼 설치와 함께 구매하는 6WAY 수전 제품",
    note: "함께 교체 시 수전 설치비 무료",
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

  if (!Object.prototype.hasOwnProperty.call(BRANDS, brand)) {
    return {
      title: "상품을 찾을 수 없습니다 | 싱크모아",
    };
  }

  const item = BRANDS[brand as BrandSlug];

  return {
    title: `${item.name} 싱크볼 | 싱크모아`,
    description: `${item.name} 싱크볼 모델별 가격과 상판 타공 사이즈, 설치 서비스를 확인하세요.`,
  };
}

export default async function BrandPage({
  params,
}: Props) {
  const { brand } = await params;

  if (!Object.prototype.hasOwnProperty.call(BRANDS, brand)) {
    notFound();
  }

  const brandSlug = brand as BrandSlug;
  const item = BRANDS[brandSlug];

  const products = PRODUCTS.filter(
    (product) => product.brand === brandSlug
  );

  return (
    <main className="luxury-brand-page">
      <style>{`
        .luxury-brand-page {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          --muted: #777b7a;
          background: var(--ivory);
          color: var(--ink);
          min-height: 100vh;
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
          word-break: keep-all;
          overflow-x: hidden;
        }

        .luxury-brand-page *,
        .luxury-brand-page *::before,
        .luxury-brand-page *::after {
          box-sizing: border-box;
        }

        .luxury-brand-page a {
          text-decoration: none;
        }

        .luxury-brand-page .brand-hero {
          background: #19262b;
          color: #fff;
          text-align: center;
          padding: 110px 24px 125px;
          position: relative;
        }

        .luxury-brand-page .eyebrow {
          display: block;
          color: #bda986;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .26em;
        }

        .luxury-brand-page .brand-hero h1 {
          font-size: clamp(55px, 9vw, 115px);
          font-weight: 400;
          letter-spacing: .1em;
          margin: 25px 0 18px;
          line-height: 1.2;
        }

        .luxury-brand-page .brand-hero p {
          font-size: 14px;
          color: #c4cccb;
          line-height: 2.1;
          margin: 0;
        }

        .luxury-brand-page .hero-line {
          width: 45px;
          height: 1px;
          background: #c4b49a;
          margin: 35px auto 0;
        }

        .luxury-brand-page .container {
          width: calc(100% - 48px);
          max-width: 1200px;
          margin: auto;
        }

        .luxury-brand-page .section {
          padding: 115px 0;
        }

        .luxury-brand-page .section-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 60px;
        }

        .luxury-brand-page .section-heading h2 {
          font-size: clamp(33px, 5vw, 52px);
          font-weight: 400;
          letter-spacing: -.045em;
          margin: 20px 0;
          line-height: 1.35;
        }

        .luxury-brand-page .section-heading p {
          color: #777;
          font-size: 14px;
          line-height: 2;
          margin: 0;
        }

        .luxury-brand-page .products {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .luxury-brand-page .product-card {
          background: #fff;
          border: 1px solid #e4ddd3;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .luxury-brand-page .product-placeholder {
          aspect-ratio: 1.55 / 1;
          background: linear-gradient(
            135deg,
            #dcd5c9,
            #efebe4
          );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #968267;
        }

        .luxury-brand-page .product-placeholder strong {
          font-size: clamp(24px, 4vw, 40px);
          font-weight: 400;
          letter-spacing: .16em;
        }

        .luxury-brand-page .product-placeholder span {
          font-size: 10px;
          letter-spacing: .3em;
        }

        .luxury-brand-page .product-body {
          padding: 42px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .luxury-brand-page .product-index {
          color: #a18b69;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .2em;
        }

        .luxury-brand-page .product-body h3 {
          font-size: clamp(23px, 3vw, 30px);
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -.035em;
          margin: 18px 0;
        }

        .luxury-brand-page .product-description {
          font-size: 13px;
          color: #777;
          line-height: 2;
          margin: 0 0 25px;
        }

        .luxury-brand-page .product-spec {
          border-top: 1px solid #e7e1d7;
          border-bottom: 1px solid #e7e1d7;
          padding: 23px 0;
          margin: 5px 0 25px;
        }

        .luxury-brand-page .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          padding: 10px 0;
        }

        .luxury-brand-page .spec-row span {
          color: #777;
          font-size: 12px;
          line-height: 1.7;
        }

        .luxury-brand-page .spec-row strong {
          font-size: 14px;
          font-weight: 600;
          text-align: right;
          line-height: 1.7;
        }

        .luxury-brand-page .spec-note {
          color: #999;
          font-size: 11px;
          line-height: 1.8;
          margin: 8px 0 0;
        }

        .luxury-brand-page .price-label {
          color: #8c7a62;
          font-size: 12px;
          letter-spacing: .06em;
        }

        .luxury-brand-page .product-price {
          font-size: 34px;
          font-weight: 500;
          letter-spacing: -.035em;
          margin: 12px 0 8px;
        }

        .luxury-brand-page .price-caption {
          font-size: 12px;
          color: #888;
          margin: 0;
        }

        .luxury-brand-page .product-actions {
          margin-top: auto;
          padding-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .luxury-brand-page .dark-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #19262b;
          color: #fff;
          padding: 20px 24px;
          font-size: 13px;
          font-weight: 600;
          transition: background .25s;
        }

        .luxury-brand-page .dark-button:hover {
          background: #34464b;
        }

        .luxury-brand-page .text-button {
          display: inline-flex;
          justify-content: center;
          color: #8b7759;
          padding: 10px;
          font-size: 12px;
        }

        .luxury-brand-page .empty {
          background: white;
          border: 1px solid #e4ddd3;
          text-align: center;
          padding: 70px 25px;
        }

        .luxury-brand-page .empty h3 {
          font-size: 24px;
          font-weight: 400;
        }

        .luxury-brand-page .empty p {
          color: #777;
          line-height: 2;
          font-size: 14px;
        }

        .luxury-brand-page .components-section {
          background: #eeeae3;
          padding: 115px 0;
        }

        .luxury-brand-page .info-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .luxury-brand-page .info-card {
          background: #f7f5f0;
          border: 1px solid #e1dacf;
          padding: 32px 25px;
        }

        .luxury-brand-page .info-number {
          color: #a18b69;
          font-size: 11px;
          letter-spacing: .15em;
        }

        .luxury-brand-page .info-card h3 {
          font-size: 19px;
          font-weight: 500;
          margin: 22px 0 13px;
        }

        .luxury-brand-page .info-card p {
          font-size: 13px;
          color: #777;
          line-height: 2;
          margin: 0;
        }

        .luxury-brand-page .installation-section {
          padding: 115px 0;
          background: #f7f5f0;
        }

        .luxury-brand-page .steps {
          max-width: 900px;
          margin: auto;
          border-top: 1px solid #dcd4c8;
        }

        .luxury-brand-page .step {
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 20px;
          padding: 34px 0;
          border-bottom: 1px solid #dcd4c8;
        }

        .luxury-brand-page .step-number {
          color: #a18b69;
          font-size: 30px;
          font-weight: 400;
        }

        .luxury-brand-page .step h3 {
          font-size: 19px;
          font-weight: 500;
          margin: 0 0 12px;
        }

        .luxury-brand-page .step p {
          color: #777;
          font-size: 14px;
          line-height: 2;
          margin: 0;
        }

        .luxury-brand-page .pricing-section {
          background: #eeeae3;
          padding: 115px 0;
        }

        .luxury-brand-page .option-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .luxury-brand-page .option-card {
          background: #fff;
          border: 1px solid #e4ddd3;
          padding: 35px;
        }

        .luxury-brand-page .option-top {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
        }

        .luxury-brand-page .option-top span {
          color: #a18b69;
          font-size: 11px;
        }

        .luxury-brand-page .option-card h3 {
          font-size: 20px;
          font-weight: 500;
          margin: 18px 0 12px;
        }

        .luxury-brand-page .option-price {
          font-size: 27px;
          color: #927a55;
          font-weight: 500;
          margin: 0 0 18px;
        }

        .luxury-brand-page .option-card p {
          font-size: 13px;
          color: #777;
          line-height: 1.9;
          margin: 0 0 10px;
        }

        .luxury-brand-page .option-note {
          color: #9b8767 !important;
          font-size: 12px !important;
        }

        .luxury-brand-page .notice {
          max-width: 850px;
          margin: 30px auto 0;
          color: #777;
          font-size: 12px;
          line-height: 2;
          text-align: center;
        }

        .luxury-brand-page .contact-section {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 115px 24px;
        }

        .luxury-brand-page .contact-section h2 {
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 400;
          line-height: 1.4;
          letter-spacing: -.045em;
          margin: 22px 0;
        }

        .luxury-brand-page .contact-section p {
          color: #c6cdcb;
          font-size: 14px;
          line-height: 2.1;
          margin: 0 0 30px;
        }

        .luxury-brand-page .gold-button {
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          gap: 35px;
          background: #c4b49a;
          color: #19262b;
          padding: 19px 26px;
          font-size: 13px;
          font-weight: 700;
        }

        .luxury-brand-page .footer {
          background: #10191d;
          color: #aeb7b5;
          text-align: center;
          padding: 40px 20px 100px;
          font-size: 11px;
          letter-spacing: .12em;
        }

        .luxury-brand-page .mobile-order {
          display: none;
        }

        @media (max-width: 1000px) {
          .luxury-brand-page .info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .luxury-brand-page .brand-hero {
            padding: 80px 20px 95px;
          }

          .luxury-brand-page .brand-hero h1 {
            font-size: clamp(40px, 10vw, 65px);
          }

          .luxury-brand-page .section,
          .luxury-brand-page .components-section,
          .luxury-brand-page .installation-section,
          .luxury-brand-page .pricing-section {
            padding: 75px 0;
          }

          .luxury-brand-page .products,
          .luxury-brand-page .option-grid {
            grid-template-columns: 1fr;
          }

          .luxury-brand-page .product-body {
            padding: 28px;
          }

          .luxury-brand-page .step {
            grid-template-columns: 55px 1fr;
            gap: 15px;
          }

          .luxury-brand-page .mobile-order {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
            background: #19262b;
            box-shadow: 0 -8px 30px rgba(0,0,0,.15);
          }

          .luxury-brand-page .mobile-order a {
            display: block;
            background: #c4b49a;
            color: #19262b;
            text-align: center;
            padding: 17px;
            font-size: 14px;
            font-weight: 700;
          }
        }

        @media (max-width: 520px) {
          .luxury-brand-page .container {
            width: calc(100% - 32px);
          }

          .luxury-brand-page .info-grid {
            grid-template-columns: 1fr;
          }

          .luxury-brand-page .section-heading {
            margin-bottom: 40px;
          }

          .luxury-brand-page .product-price {
            font-size: 30px;
          }

          .luxury-brand-page .option-card {
            padding: 28px;
          }

          .luxury-brand-page .contact-section {
            padding: 90px 20px;
          }
        }
      `}</style>

      <SiteHeader />

      <section className="brand-hero">
        <span className="eyebrow">
          THE SINKMOA COLLECTION
        </span>

        <h1>{item.english}</h1>

        <p>
          {item.name} 싱크볼 컬렉션
          <br />
          제품 선택부터 설치 상담까지
        </p>

        <div className="hero-line" />
      </section>

      <section className="section" id="products">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              SELECT YOUR SINK
            </span>

            <h2>{item.name} 컬렉션</h2>

            <p>
              모델별 가격과 상판 타공 사이즈를 확인하고
              <br />
              원하는 제품을 선택해보세요.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="empty">
              <h3>상품 등록 준비 중</h3>
              <p>
                현재 판매 모델을 준비하고 있습니다.
                <br />
                제품 상담은 주문 문의에서 가능합니다.
              </p>

              <Link
                href={`/order?brand=${brandSlug}`}
                className="gold-button"
              >
                제품 상담 문의 ↗
              </Link>
            </div>
          ) : (
            <div className="products">
              {products.map((product, index) => (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-placeholder">
                    <strong>{item.english}</strong>
                    <span>
                      PREMIUM KITCHEN COLLECTION
                    </span>
                  </div>

                  <div className="product-body">
                    <span className="product-index">
                      COLLECTION{" "}
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{product.name}</h3>

                    <p className="product-description">
                      {product.description ??
                        `${item.name} 싱크볼 제품입니다.`}
                    </p>

                    <div className="product-spec">
                      <div className="spec-row">
                        <span>브랜드</span>
                        <strong>{item.name}</strong>
                      </div>

                      <div className="spec-row">
                        <span>설치 방식</span>
                        <strong>
                          {product.installationType ??
                            "상담 시 확인"}
                        </strong>
                      </div>

                      <div className="spec-row">
                        <span>
                          상판 타공 사이즈
                          <br />
                          (가로 × 세로)
                        </span>

                        <strong>
                          {product.width && product.depth
                            ? `${product.width} × ${product.depth}mm`
                            : "상담 시 확인"}
                        </strong>
                      </div>

                      <p className="spec-note">
                        ※ 표시된 치수는 싱크볼 외경이 아닌
                        상판 타공 사이즈입니다.
                      </p>
                    </div>

                    <span className="price-label">
                      제품 판매가격
                    </span>

                    <div className="product-price">
                      {formatPrice(product.price)}
                    </div>

                    <p className="price-caption">
                      싱크볼 제품 단독 판매가격 ·
                      기본 배수구 포함
                    </p>

                    <div className="product-actions">
                      <Link
                        href={`/order?product=${encodeURIComponent(
                          product.id
                        )}`}
                        className="dark-button"
                      >
                        제품 구매 및 설치 문의
                        <span>↗</span>
                      </Link>

                      <Link
                        href="#service-pricing"
                        className="text-button"
                      >
                        설치 및 추가 옵션 확인 ↓
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="components-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              PRODUCT INFORMATION
            </span>

            <h2>제품 구성 및 선택 안내</h2>

            <p>
              필요한 구성과 옵션을 확인하고
              고객님의 주방에 맞게 선택하세요.
            </p>
          </div>

          <div className="info-grid">
            {[
              {
                title: "싱크볼 본체",
                text: "선택한 모델의 싱크볼 본체입니다. 모델별 타공 사이즈와 설치 방식을 확인하세요.",
              },
              {
                title: "기본 배수구 포함",
                text: "기본 배수구는 제품 판매가격에 포함됩니다. 세부 구성은 주문 전 확인합니다.",
              },
              {
                title: "올스텐 배수구",
                text: "기본 배수구를 올스텐 배수구로 변경할 수 있습니다. 추가 금액은 20,000원입니다.",
              },
              {
                title: "6WAY 수전",
                text: "싱크볼 설치 주문 시 70,000원에 추가할 수 있으며 함께 교체하는 수전 설치비는 무료입니다.",
              },
            ].map((info, index) => (
              <article
                className="info-card"
                key={info.title}
              >
                <span className="info-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{info.title}</h3>
                <p>{info.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="installation-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              OUR INSTALLATION PROCESS
            </span>

            <h2>설치 진행 안내</h2>

            <p>
              현장 확인부터 최종 점검까지
              단계별로 진행합니다.
            </p>
          </div>

          <div className="steps">
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
        </div>
      </section>

      <section
        className="pricing-section"
        id="service-pricing"
      >
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              INSTALLATION & OPTIONS
            </span>

            <h2>설치 및 추가 옵션</h2>

            <p>
              필요한 서비스만 선택하여
              주문 상담을 진행할 수 있습니다.
            </p>
          </div>

          <div className="option-grid">
            {OPTIONS.map((option) => (
              <article
                className="option-card"
                key={option.number}
              >
                <div className="option-top">
                  <span>
                    OPTION {option.number}
                  </span>
                </div>

                <h3>{option.title}</h3>

                <div className="option-price">
                  {option.price}
                </div>

                <p>{option.description}</p>

                <p className="option-note">
                  {option.note}
                </p>
              </article>
            ))}
          </div>

          <p className="notice">
            기본 배수구는 제품 가격에 포함됩니다.
            올스텐 배수구는 제품 단독 구매 시에도
            선택할 수 있습니다. 상판 타공과 6WAY 수전은
            싱크볼 설치 주문 시에만 선택 가능합니다.
            상판 재질 및 현장 상태에 따라
            최종 견적이 달라질 수 있습니다.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <span className="eyebrow">
          SINKMOA CONSULTATION
        </span>

        <h2>
          당신의 주방을 위한
          <br />
          새로운 선택
        </h2>

        <p>
          {item.name} 싱크볼 제품을 선택하고
          <br />
          설치 옵션까지 편리하게 문의하세요.
        </p>

        <Link
          href={`/order?brand=${brandSlug}`}
          className="gold-button"
        >
          주문 및 견적 문의
          <span>↗</span>
        </Link>
      </section>

      <footer className="footer">
        SINKMOA · PREMIUM KITCHEN COLLECTION
      </footer>

      <div className="mobile-order">
        <Link href={`/order?brand=${brandSlug}`}>
          제품 구매 및 설치 문의하기 ↗
        </Link>
      </div>
    </main>
  );
}
