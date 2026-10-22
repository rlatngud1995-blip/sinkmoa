
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BRANDS,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
} from "./data/products";

const slides = [
  {
    image: "/hero-1.jpg",
    eyebrow: "PREMIUM KITCHEN COLLECTION",
    title: "주방의 품격을 완성하다.",
    description: "싱크볼의 선택부터 설치까지, 싱크모아.",
  },
  {
    image: "/hero-2.jpg",
    eyebrow: "DESIGNED FOR YOUR KITCHEN",
    title: "일상의 공간을 특별하게.",
    description:
      "디자인과 실용성을 모두 담은 프리미엄 싱크볼.",
  },
  {
    image: "/hero-3.jpg",
    eyebrow: "SINKMOA INSTALLATION SERVICE",
    title: "완성도 높은 주방의 시작.",
    description:
      "제품 선택부터 전문 설치 상담까지.",
  },
];

const brands: {
  name: string;
  korean: string;
  image: string;
  slug: BrandSlug;
}[] = [
  {
    name: "REGENS",
    korean: "리젠스",
    image: "/brand-regens.jpg",
    slug: "regens",
  },
  {
    name: "BELLAGO",
    korean: "벨라고",
    image: "/brand-bellago.jpg",
    slug: "bellago",
  },
  {
    name: "ARTISAN",
    korean: "아티잔",
    image: "/brand-artisan.jpg",
    slug: "artisan",
  },
  {
    name: "BAEKJO",
    korean: "백조",
    image: "/brand-baekjo.jpg",
    slug: "baekjo",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <style jsx>{`
        .featured-section {
          background: #f7f5f0;
          padding: 100px 24px;
          color: #19262b;
        }

        .featured-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .featured-heading {
          text-align: center;
          margin-bottom: 48px;
        }

        .featured-heading h2 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 500;
          margin: 15px 0;
          letter-spacing: -1px;
        }

        .featured-heading > p:last-child {
          font-size: 14px;
          color: #777;
          line-height: 1.9;
        }

        .featured-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 20px;
        }

        .featured-card {
          background: #fff;
          border: 1px solid #e8e2d8;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .featured-placeholder {
          aspect-ratio: 4 / 3;
          background: linear-gradient(
            135deg,
            #e8e2d8,
            #f2eee7
          );
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
          color: #9a8667;
        }

        .featured-placeholder span:first-child {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: 3px;
        }

        .featured-placeholder span:last-child {
          font-size: 10px;
          letter-spacing: 2px;
        }

        .featured-body {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .featured-brand {
          font-size: 11px;
          color: #a18b69;
          letter-spacing: 2px;
          font-weight: 700;
        }

        .featured-name {
          font-size: 17px;
          font-weight: 600;
          line-height: 1.6;
          margin: 12px 0;
          min-height: 55px;
        }

        .featured-cutout {
          background: #f7f5f0;
          border: 1px solid #e7e0d5;
          padding: 15px;
          margin: 10px 0 18px;
        }

        .featured-cutout-label {
          font-size: 11px;
          color: #907958;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .featured-cutout-value {
          font-size: 20px;
          font-weight: 700;
          color: #19262b;
          margin: 0;
        }

        .featured-cutout-note {
          font-size: 10px;
          color: #888;
          margin: 8px 0 0;
          line-height: 1.6;
        }

        .featured-type {
          font-size: 12px;
          color: #777;
          margin: 0 0 12px;
        }

        .featured-price {
          font-size: 23px;
          font-weight: 700;
          margin: auto 0 0;
        }

        .featured-price-note {
          color: #888;
          font-size: 11px;
          margin: 7px 0 0;
        }

        .featured-order {
          display: block;
          background: #19262b;
          color: #fff;
          text-align: center;
          padding: 15px 10px;
          margin-top: 20px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background .2s;
        }

        .featured-order:hover {
          background: #3a4b50;
        }

        .featured-more {
          text-align: center;
          margin-top: 35px;
        }

        .featured-more a {
          display: inline-block;
          border: 1px solid #c4b49a;
          color: #19262b;
          padding: 15px 28px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        .featured-notice {
          max-width: 850px;
          margin: 28px auto 0;
          color: #777;
          font-size: 12px;
          line-height: 1.9;
          text-align: center;
        }

        @media (max-width: 1050px) {
          .featured-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .featured-section {
            padding: 65px 16px;
          }

          .featured-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .featured-name {
            min-height: auto;
          }

          .featured-body {
            padding: 24px;
          }

          .featured-cutout-value {
            font-size: 23px;
          }
        }
      `}</style>

      {/* ===============================
          HEADER
      =============================== */}

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav className="desktop-nav">
            <Link href="/#brands">
              BRANDS
            </Link>

            <Link href="/#products">
              PRODUCTS
            </Link>

            <Link href="/#service">
              INSTALLATION
            </Link>

            <Link href="/#about">
              ABOUT
            </Link>

            <Link href="/order">
              CONTACT
            </Link>
          </nav>

          <button
            type="button"
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label={
              menuOpen ? "메뉴 닫기" : "메뉴 열기"
            }
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            <Link
              href="/#brands"
              onClick={() => setMenuOpen(false)}
            >
              브랜드 컬렉션
            </Link>

            <Link
              href="/#products"
              onClick={() => setMenuOpen(false)}
            >
              싱크볼 상품
            </Link>

            <Link
              href="/#service"
              onClick={() => setMenuOpen(false)}
            >
              설치 서비스
            </Link>

            <Link
              href="/#about"
              onClick={() => setMenuOpen(false)}
            >
              싱크모아 소개
            </Link>

            <Link
              href="/order"
              onClick={() => setMenuOpen(false)}
            >
              주문 문의
            </Link>
          </nav>
        )}
      </header>

      {/* ===============================
          HERO SLIDER
      =============================== */}

      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              current === index
                ? "active"
                : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(
                rgba(10,18,22,.35),
                rgba(10,18,22,.65)
              ), url("${slide.image}")`,
            }}
          />
        ))}

        <div className="hero-content">
          <p className="eyebrow">
            {slides[current].eyebrow}
          </p>

          <h1>
            {slides[current].title}
          </h1>

          <p className="hero-description">
            {slides[current].description}
          </p>

          <Link
            href="/#brands"
            className="gold-button"
          >
            EXPLORE COLLECTION
            <span>↗</span>
          </Link>
        </div>

        <div className="slide-controls">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.image}
              onClick={() =>
                setCurrent(index)
              }
              className={
                current === index
                  ? "selected"
                  : ""
              }
              aria-label={`슬라이드 ${
                index + 1
              }`}
            />
          ))}
        </div>
      </section>

      {/* ===============================
          ABOUT
      =============================== */}

      <section
        className="intro-section"
        id="about"
      >
        <div className="intro-content">
          <p className="section-label">
            THE SINKMOA STORY
          </p>

          <h2>
            공간의 가치를 높이는
            <br />
            특별한 선택
          </h2>

          <div className="gold-line" />

          <p>
            주방은 단순히 요리하는 공간을
            넘어 일상의 아름다움을
            완성하는 공간입니다.
            <br />
            싱크모아는 다양한 프리미엄
            싱크볼을 소개하고 고객님의
            주방에 어울리는 제품 선택과
            설치 상담을 제공합니다.
          </p>
        </div>
      </section>

      {/* ===============================
          BRAND COLLECTION
      =============================== */}

      <section
        className="brands-section"
        id="brands"
      >
        <div className="section-heading">
          <p className="section-label">
            OUR COLLECTION
          </p>

          <h2>
            Premium Sink Brands
          </h2>

          <p>
            취향과 공간에 어울리는
            싱크볼을 만나보세요.
          </p>
        </div>

        <div className="brand-grid">
          {brands.map((brand) => (
            <Link
              href={`/products/${brand.slug}`}
              className="brand-card"
              key={brand.slug}
            >
              <div className="brand-image">
                <img
                  src={brand.image}
                  alt={`${brand.korean} 싱크볼`}
                />
              </div>

              <div className="brand-info">
                <div>
                  <p>
                    {brand.korean}
                  </p>

                  <h3>
                    {brand.name}
                  </h3>
                </div>

                <span className="brand-arrow">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===============================
          FEATURED PRODUCTS
      =============================== */}

      <section
        className="featured-section"
        id="products"
      >
        <div className="featured-inner">
          <div className="featured-heading">
            <p className="section-label">
              SINKMOA PRODUCT COLLECTION
            </p>

            <h2>
              싱크모아 추천 싱크볼
            </h2>

            <p>
              브랜드별 제품 가격과
              상판 타공 사이즈를
              한눈에 비교해보세요.
            </p>
          </div>

          <div className="featured-grid">
            {PRODUCTS.map((product) => {
              const brandInfo =
                BRANDS[product.brand];

              return (
                <article
                  className="featured-card"
                  key={product.id}
                >
                  <div className="featured-placeholder">
                    <span>
                      {brandInfo.english}
                    </span>

                    <span>
                      PREMIUM SINK
                    </span>
                  </div>

                  <div className="featured-body">
                    <span className="featured-brand">
                      {brandInfo.english}
                    </span>

                    <h3 className="featured-name">
                      {product.name}
                    </h3>

                    {product.width &&
                      product.depth && (
                        <div className="featured-cutout">
                          <p className="featured-cutout-label">
                            상판 타공 사이즈
                            (가로 × 세로)
                          </p>

                          <p className="featured-cutout-value">
                            {product.width}
                            {" × "}
                            {product.depth}mm
                          </p>

                          <p className="featured-cutout-note">
                            싱크볼 외경이 아닌
                            상판 타공 치수
                          </p>
                        </div>
                      )}

                    <p className="featured-type">
                      설치 방식:{" "}
                      {product.installationType ??
                        "상담 시 확인"}
                    </p>

                    <p className="featured-price">
                      {formatPrice(
                        product.price
                      )}
                    </p>

                    <p className="featured-price-note">
                      제품 단독 구매가격
                    </p>

                    <Link
                      href={`/order?product=${encodeURIComponent(
                        product.id
                      )}`}
                      className="featured-order"
                    >
                      이 제품 구매 및 설치 문의 ↗
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="featured-notice">
            기본 배수구는 제품 가격에
            포함됩니다. 설치비는 별도이며,
            상판 타공 및 기존 배관 상태에
            따라 최종 견적이 달라질 수
            있습니다.
          </p>

          <div className="featured-more">
            <Link href="/order">
              전체 상품 주문 문의 ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ===============================
          INSTALLATION SERVICE
      =============================== */}

      <section
        className="service-section"
        id="service"
      >
        <div className="service-image">
          <img
            src="/installation.jpg"
            alt="싱크볼 설치 서비스"
          />
        </div>

        <div className="service-content">
          <p className="section-label">
            INSTALLATION SERVICE
          </p>

          <h2>
            좋은 제품의 선택,
            <br />
            그 이상의 완성.
          </h2>

          <div className="gold-line" />

          <p>
            싱크모아는 제품만 구매하거나
            설치 서비스를 함께 상담할 수
            있습니다. 기존 싱크볼의 상판
            타공 사이즈와 설치 환경을
            확인하여 적합한 시공 방법을
            안내합니다.
          </p>

          <div className="service-price">
            <span>
              기본 설치비
            </span>

            <strong>
              170,000원
            </strong>
          </div>

          <p className="service-note">
            기본 수전 연결 및 배수구 연결
            시공 포함
            <br />
            추가 타공 및 현장 상황에 따라
            비용이 달라질 수 있습니다.
          </p>

          <Link
            href="/order"
            className="gold-button"
          >
            설치 문의하기
            <span>↗</span>
          </Link>
        </div>
      </section>

      {/* ===============================
          ORDER CTA
      =============================== */}

      <section className="order-section">
        <p className="section-label">
          YOUR KITCHEN, OUR PRIORITY
        </p>

        <h2>
          당신의 주방을 위한 새로운 선택
        </h2>

        <p>
          제품 구매부터 설치 상담까지
          싱크모아에서 편리하게
          문의하세요.
        </p>

        <Link
          href="/order"
          className="gold-button"
        >
          주문 및 견적 문의
          <span>↗</span>
        </Link>
      </section>

      {/* ===============================
          FOOTER
      =============================== */}

      <footer className="footer">
        <div className="footer-inner">
          <h2>
            SINKMOA
          </h2>

          <p>
            프리미엄 싱크볼 판매 및
            설치 전문몰
          </p>

          <div className="footer-links">
            <Link href="/#brands">
              BRANDS
            </Link>

            <Link href="/#products">
              PRODUCTS
            </Link>

            <Link href="/#service">
              SERVICE
            </Link>

            <Link href="/order">
              CONTACT
            </Link>
          </div>

          <p className="copyright">
            © {new Date().getFullYear()}{" "}
            SINKMOA. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
