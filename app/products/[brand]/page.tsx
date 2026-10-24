
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import SiteHeader from "../../components/SiteHeader";

import {
  BRANDS,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
} from "../../data/products";

/* =========================================
   싱크모아 브랜드별 상품 페이지

   적용 사항
   - 4개 브랜드 실제 상품 사진
   - 메인 홈페이지 브랜드 사진과 동일
   - 상품명 / 판매가격 / 타공 사이즈
   - 실제 시공사례 4장
   - 상판 타공 작업 사진
   - 설치 진행 순서
   - 설치 및 추가 옵션
   - 주문 페이지 연결
   - 모바일 하단 주문 버튼
========================================= */

type Props = {
  params: Promise<{ brand: string }>;
};

/* =========================================
   브랜드별 상품 이미지

   public 폴더에 업로드된 파일
========================================= */

const PRODUCT_IMAGES: Partial<
  Record<BrandSlug, string>
> = {
  regens: "/IMG_1772.jpeg",
  bellago: "/IMG_1757.jpeg",
  artisan: "/IMG_1771.jpeg",
  baekjo: "/IMG_1642.jpeg",
};

/* =========================================
   실제 시공사례 이미지
========================================= */

const INSTALLATION_IMAGES = [
  {
    src: "/IMG_1528.jpeg",
    title: "사각 싱크볼 설치 사례",
    description:
      "주방 상판에 사각 싱크볼을 설치한 현장입니다.",
  },
  {
    src: "/IMG_0403.jpeg",
    title: "스테인리스 싱크볼 시공",
    description:
      "사각 싱크볼과 수전이 설치된 주방 현장입니다.",
  },
  {
    src: "/IMG_0080.jpeg",
    title: "싱크볼 및 수전 시공",
    description:
      "설치된 싱크볼과 수전의 사용 모습입니다.",
  },
  {
    src:
      "/53EE260C-F4EF-4593-8354-F5E29F65BDDD.png",
    title: "사각 싱크볼 설치 완료",
    description:
      "사각 싱크볼과 수전 설치 완료 사례입니다.",
  },
];

const CUTTING_IMAGE = "/IMG_0394.jpeg";

/* =========================================
   설치 진행 순서
========================================= */

const INSTALL_STEPS = [
  {
    number: "01",
    title: "설치 환경 확인",
    text:
      "기존 싱크볼의 상판 타공 사이즈, 상판 재질 및 배관 상태를 확인합니다.",
  },
  {
    number: "02",
    title: "기존 싱크볼 철거",
    text:
      "기존 수전과 배수구 연결을 분리한 후 싱크볼을 철거합니다.",
  },
  {
    number: "03",
    title: "상판 및 설치 준비",
    text:
      "새 싱크볼의 타공 사이즈와 기존 상판을 비교합니다. 추가 타공이 필요한 경우 작업 가능 여부를 확인합니다.",
  },
  {
    number: "04",
    title: "새 싱크볼 설치",
    text:
      "제품의 설치 방식에 맞춰 싱크볼을 고정하고 연결 부위를 마감합니다.",
  },
  {
    number: "05",
    title: "연결 및 최종 점검",
    text:
      "수전과 배수구를 연결하고 통수 및 누수 여부를 점검합니다.",
  },
];

/* =========================================
   설치 및 추가 옵션
========================================= */

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

/* =========================================
   정적 페이지 생성
========================================= */

export function generateStaticParams() {
  return Object.keys(BRANDS).map((brand) => ({
    brand,
  }));
}

/* =========================================
   SEO 메타데이터
========================================= */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { brand } = await params;

  if (
    !Object.prototype.hasOwnProperty.call(
      BRANDS,
      brand
    )
  ) {
    return {
      title:
        "상품을 찾을 수 없습니다 | 싱크모아",
    };
  }

  const item = BRANDS[brand as BrandSlug];

  return {
    title: `${item.name} 싱크볼 | 싱크모아`,
    description:
      `${item.name} 사각 싱크볼 제품 가격, 상판 타공 사이즈, 설치 서비스 및 시공사례를 확인하세요.`,
  };
}

/* =========================================
   브랜드별 상품 페이지
========================================= */

export default async function BrandPage({
  params,
}: Props) {
  const { brand } = await params;

  if (
    !Object.prototype.hasOwnProperty.call(
      BRANDS,
      brand
    )
  ) {
    notFound();
  }

  const brandSlug = brand as BrandSlug;
  const item = BRANDS[brandSlug];

  const products = PRODUCTS.filter(
    (product) => product.brand === brandSlug
  );

  const productImage =
    PRODUCT_IMAGES[brandSlug];

  return (
    <main className="luxury-brand-page">
      <SiteHeader />

      {/* 브랜드 메인 */}

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

      {/* 브랜드별 상품 */}

      <section
        className="section"
        id="products"
      >
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              SELECT YOUR SINK
            </span>

            <h2>{item.name} 컬렉션</h2>

            <p>
              모델별 가격과 상판 타공 사이즈를
              확인하고
              <br />
              원하는 제품을 선택해보세요.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="empty">
              <h3>상품 등록 준비 중</h3>

              <p>
                현재 판매 모델을 준비하고
                있습니다.
                <br />
                제품 상담은 주문 문의에서
                가능합니다.
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
              {products.map(
                (product, index) => (
                  <article
                    className="product-card"
                    key={product.id}
                  >
                    {/* 실제 상품 사진 */}

                    <div className="product-visual">
                      {productImage ? (
                        <Image
                          src={productImage}
                          alt={`${product.name} 제품 이미지`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="product-photo"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="product-placeholder">
                          <strong>
                            {item.english}
                          </strong>

                          <span>
                            PREMIUM KITCHEN
                            COLLECTION
                          </span>

                          <small>
                            제품 사진 준비 중
                          </small>
                        </div>
                      )}
                    </div>

                    <div className="product-body">
                      <span className="product-index">
                        COLLECTION{" "}
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <h3>{product.name}</h3>

                      <p className="product-description">
                        {product.description ??
                          `${item.name} 싱크볼 제품입니다.`}
                      </p>

                      <div className="product-spec">
                        <div className="spec-row">
                          <span>브랜드</span>
                          <strong>
                            {item.name}
                          </strong>
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
                            {product.width &&
                            product.depth
                              ? `${product.width} × ${product.depth}mm`
                              : "상담 시 확인"}
                          </strong>
                        </div>

                        <p className="spec-note">
                          ※ 표시된 치수는 싱크볼
                          외경이 아닌 상판 타공
                          사이즈입니다.
                        </p>
                      </div>

                      <span className="price-label">
                        제품 판매가격
                      </span>

                      <div className="product-price">
                        {formatPrice(
                          product.price
                        )}
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
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* 실제 시공사례 */}

      <section className="gallery-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">
              INSTALLATION GALLERY
            </span>

            <h2>싱크모아 시공사례</h2>

            <p>
              실제 싱크볼 설치 현장을
              사진으로 확인해보세요.
              <br />
              시공사례는 특정 상품 모델과
              다를 수 있습니다.
            </p>
          </div>

          <div className="gallery-grid">
            {INSTALLATION_IMAGES.map(
              (photo) => (
                <article
                  className="gallery-card"
                  key={photo.src}
                >
                  <div className="gallery-image">
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="gallery-photo"
                    />
                  </div>

                  <div className="gallery-content">
                    <h3>{photo.title}</h3>
                    <p>
                      {photo.description}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* 제품 구성 */}

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
                text:
                  "선택한 모델의 싱크볼 본체입니다. 모델별 타공 사이즈와 설치 방식을 확인하세요.",
              },
              {
                title: "기본 배수구 포함",
                text:
                  "기본 배수구는 제품 판매가격에 포함됩니다. 세부 구성은 주문 전 확인합니다.",
              },
              {
                title: "올스텐 배수구",
                text:
                  "기본 배수구를 올스텐 배수구로 변경할 수 있습니다. 추가 금액은 20,000원입니다.",
              },
              {
                title: "6WAY 수전",
                text:
                  "싱크볼 설치 주문 시 70,000원에 추가할 수 있으며 함께 교체하는 수전 설치비는 무료입니다.",
              },
            ].map((info, index) => (
              <article
                className="info-card"
                key={info.title}
              >
                <span className="info-number">
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </span>

                <h3>{info.title}</h3>
                <p>{info.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 설치 순서 */}

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
            {INSTALL_STEPS.map(
              (step) => (
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
              )
            )}
          </div>
        </div>
      </section>

      {/* 상판 타공 작업 */}

      <section className="cutting-section">
        <div className="container">
          <div className="cutting-layout">
            <div className="cutting-image">
              <Image
                src={CUTTING_IMAGE}
                alt="싱크볼 설치를 위한 상판 타공 작업"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="gallery-photo"
              />
            </div>

            <div className="cutting-content">
              <span className="eyebrow">
                COUNTERTOP CUTTING
              </span>

              <h2>
                상판 타공 및
                <br />
                설치 준비
              </h2>

              <p>
                기존 상판의 타공 사이즈가
                새 싱크볼과 맞지 않는 경우
                현장 조건을 확인한 뒤
                타공 작업을 진행합니다.
              </p>

              <strong>
                설치 주문 시 타공 옵션
                +50,000원
              </strong>

              <small>
                ※ 상판 재질과 현장 상태에 따라
                작업 가능 여부 및 최종 견적이
                달라질 수 있습니다.
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* 설치 및 추가 옵션 */}

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
            {OPTIONS.map(
              (option) => (
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

                  <p>
                    {option.description}
                  </p>

                  <p className="option-note">
                    {option.note}
                  </p>
                </article>
              )
            )}
          </div>

          <p className="notice">
            기본 배수구는 제품 가격에 포함됩니다.
            올스텐 배수구는 제품 단독 구매 시에도
            선택할 수 있습니다. 상판 타공과
            6WAY 수전은 싱크볼 설치 주문 시에만
            선택 가능합니다. 상판 재질 및
            현장 상태에 따라 최종 견적이
            달라질 수 있습니다.
          </p>
        </div>
      </section>

      {/* 주문 상담 */}

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

      {/* 모바일 주문 버튼 */}

      <div className="mobile-order">
        <Link
          href={`/order?brand=${brandSlug}`}
        >
          제품 구매 및 설치 문의하기 ↗
        </Link>
      </div>

      <style>{`
        .luxury-brand-page {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          background: var(--ivory);
          color: var(--ink);
          min-height: 100vh;
          font-family: Arial,
            "Apple SD Gothic Neo",
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
          color: white;
          text-align: center;
          padding: 110px 24px 125px;
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

        .luxury-brand-page .section,
        .luxury-brand-page .gallery-section {
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
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 28px;
        }

        .luxury-brand-page .product-card {
          background: white;
          border: 1px solid #e4ddd3;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .luxury-brand-page .product-visual {
          position: relative;
          width: 100%;
          aspect-ratio: 1.35 / 1;
          background: #fff;
          overflow: hidden;
        }

        .luxury-brand-page .product-photo {
          object-fit: contain;
          padding: 12px;
        }

        .luxury-brand-page .product-placeholder {
          height: 100%;
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
          padding: 20px;
          text-align: center;
        }

        .luxury-brand-page .product-placeholder strong {
          font-size: clamp(24px, 4vw, 40px);
          font-weight: 400;
          letter-spacing: .12em;
        }

        .luxury-brand-page .product-placeholder span {
          font-size: 10px;
          letter-spacing: .2em;
        }

        .luxury-brand-page .product-placeholder small {
          font-size: 11px;
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
          color: white;
          padding: 20px 24px;
          font-size: 13px;
          font-weight: 600;
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

        .luxury-brand-page .empty p {
          color: #777;
          line-height: 2;
        }

        .luxury-brand-page .gallery-section {
          background: #eeeae3;
        }

        .luxury-brand-page .gallery-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .luxury-brand-page .gallery-card {
          background: white;
          overflow: hidden;
          border: 1px solid #e4ddd3;
        }

        .luxury-brand-page .gallery-image {
          position: relative;
          aspect-ratio: 1.4 / 1;
          background: #e9e6e0;
          overflow: hidden;
        }

        .luxury-brand-page .gallery-photo {
          object-fit: cover;
        }

        .luxury-brand-page .gallery-content {
          padding: 25px;
        }

        .luxury-brand-page .gallery-content h3 {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 10px;
        }

        .luxury-brand-page .gallery-content p {
          color: #777;
          font-size: 13px;
          line-height: 1.8;
          margin: 0;
        }

        .luxury-brand-page .components-section {
          background: #f7f5f0;
          padding: 115px 0;
        }

        .luxury-brand-page .info-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .luxury-brand-page .info-card {
          background: white;
          border: 1px solid #e1dacf;
          padding: 32px 25px;
        }

        .luxury-brand-page .info-number {
          color: #a18b69;
          font-size: 11px;
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
          background: #eeeae3;
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

        .luxury-brand-page .cutting-section {
          background: #19262b;
          padding: 90px 0;
          color: white;
        }

        .luxury-brand-page .cutting-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .luxury-brand-page .cutting-image {
          position: relative;
          aspect-ratio: 1.3 / 1;
          overflow: hidden;
          background: #334045;
        }

        .luxury-brand-page .cutting-content h2 {
          font-size: clamp(30px, 4vw, 50px);
          font-weight: 400;
          line-height: 1.4;
          margin: 22px 0;
        }

        .luxury-brand-page .cutting-content p {
          color: #c6cdcb;
          font-size: 14px;
          line-height: 2;
        }

        .luxury-brand-page .cutting-content strong {
          display: block;
          color: #c4b49a;
          font-size: 18px;
          margin: 25px 0 15px;
        }

        .luxury-brand-page .cutting-content small {
          display: block;
          color: #aeb7b5;
          line-height: 1.9;
        }

        .luxury-brand-page .pricing-section {
          background: #eeeae3;
          padding: 115px 0;
        }

        .luxury-brand-page .option-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .luxury-brand-page .option-card {
          background: white;
          border: 1px solid #e4ddd3;
          padding: 35px;
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
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
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
          .luxury-brand-page .gallery-section,
          .luxury-brand-page .components-section,
          .luxury-brand-page .installation-section,
          .luxury-brand-page .pricing-section {
            padding: 75px 0;
          }

          .luxury-brand-page .products,
          .luxury-brand-page .gallery-grid,
          .luxury-brand-page .option-grid,
          .luxury-brand-page .cutting-layout {
            grid-template-columns: 1fr;
          }

          .luxury-brand-page .cutting-layout {
            gap: 30px;
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
            padding:
              12px 16px
              calc(12px + env(safe-area-inset-bottom));
            background: #19262b;
            box-shadow:
              0 -8px 30px rgba(0,0,0,.15);
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
    </main>
  );
}
