"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INSTALLATION_REGIONS,
} from "./data/installation-regions";

/* =========================================
   SINKMOA 메인 홈페이지

   - BEFORE / AFTER 자동 슬라이드
   - 브랜드별 상품
   - 설치 서비스
   - 지역별 설치 안내
   - 주문 및 견적 문의
   - 모바일 메뉴
   - 30,000원 할인 쿠폰 팝업
========================================= */

const slides = [
  {
    image: "/IMG_0305.jpeg",
    label: "BEFORE",
    korean: "교체 전",
    description: "기존 싱크볼",
    position: "center center",
  },
  {
    image: "/IMG_0395.jpeg",
    label: "AFTER",
    korean: "교체 완료",
    description: "프리미엄 사각 싱크볼",
    position: "center center",
  },
];

const brands = [
  {
    name: "REGENS",
    korean: "리젠스",
    image: "/IMG_1772.jpeg",
    slug: "regens",
    number: "01",
  },
  {
    name: "BELLAGO",
    korean: "벨라고",
    image: "/IMG_1757.jpeg",
    slug: "bellago",
    number: "02",
  },
  {
    name: "ARTISAN",
    korean: "아티잔",
    image: "/IMG_1771.jpeg",
    slug: "artisan",
    number: "03",
  },
  {
    name: "BAEKJO",
    korean: "백조",
    image: "/IMG_1642.jpeg",
    slug: "baekjo",
    number: "04",
  },
];

const navigation = [
  {
    label: "브랜드별 상품",
    href: "/#brands",
  },
  {
    label: "설치 서비스",
    href: "/#service",
  },
  {
    label: "설치 가능 지역",
    href: "/#regions",
  },
  {
    label: "주문·견적 문의",
    href: "/order",
  },
];

const REGION_ORDER = [
  "seoul",
  "gyeonggi",
  "incheon",
  "chungnam",
  "chungbuk",
] as const;

const COUPON_STORAGE_KEY =
  "sinkmoa-coupon-hide-until";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] =
    useState<string>("seoul");

  const [couponOpen, setCouponOpen] =
    useState(false);

  /* =========================================
     메인 슬라이드
  ========================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  /* =========================================
     쿠폰 팝업
  ========================================= */

  useEffect(() => {
    const hiddenUntil =
      window.localStorage.getItem(
        COUPON_STORAGE_KEY
      );

    if (hiddenUntil) {
      const hiddenTime =
        Number(hiddenUntil);

      if (
        Number.isFinite(hiddenTime) &&
        Date.now() < hiddenTime
      ) {
        return;
      }

      window.localStorage.removeItem(
        COUPON_STORAGE_KEY
      );
    }

    const timer =
      window.setTimeout(() => {
        setCouponOpen(true);
      }, 500);

    return () =>
      window.clearTimeout(timer);
  }, []);

  function closeCoupon() {
    setCouponOpen(false);
  }

  function hideCouponToday() {
    const now = new Date();

    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
      0
    );

    window.localStorage.setItem(
      COUPON_STORAGE_KEY,
      String(tomorrow.getTime())
    );

    setCouponOpen(false);
  }

  const activeRegion =
    INSTALLATION_REGIONS[selectedRegion];

  const totalDistricts =
    REGION_ORDER.reduce(
      (sum, slug) =>
        sum +
        INSTALLATION_REGIONS[slug]
          .districts.length,
      0
    );

  return (
    <main className="sinkmoa-home">

      {/* =====================================
          쿠폰 팝업
      ===================================== */}

      {couponOpen && (
        <div
          className="coupon-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coupon-title"
        >
          <div className="coupon-popup">

            <button
              type="button"
              className="coupon-close"
              onClick={closeCoupon}
              aria-label="쿠폰 팝업 닫기"
            >
              ×
            </button>

            <div className="coupon-top">

              <p className="coupon-brand">
                SINKMOA
              </p>

              <span className="coupon-badge">
                INSTALLATION COUPON
              </span>

              <p className="coupon-small-title">
                싱크볼 설치 고객 전용
              </p>

              <h2 id="coupon-title">
                <strong>30,000</strong>
                <span>원 할인</span>
              </h2>

              <div className="coupon-line" />

              <p className="coupon-description">
                싱크볼 제품과 설치를 함께
                문의하시는 고객님께
                <br />
                설치 상담 시 사용할 수 있는
                할인 혜택을 드립니다.
              </p>

            </div>

            <div className="coupon-bottom">

              <Link
                href="/order"
                className="coupon-button"
                onClick={closeCoupon}
              >
                <span>
                  3만원 할인 받고 문의하기
                </span>

                <span>↗</span>
              </Link>

              <p className="coupon-notice">
                ※ 현장 추가 작업비 및 일부
                출장 관련 비용에는 할인이
                적용되지 않을 수 있습니다.
              </p>

              <div className="coupon-actions">

                <button
                  type="button"
                  onClick={hideCouponToday}
                >
                  오늘 하루 보지 않기
                </button>

                <button
                  type="button"
                  onClick={closeCoupon}
                >
                  닫기
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* =====================================
          헤더
      ===================================== */}

      <header className="site-header">
        <div className="header-inner">

          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav
            className="desktop-nav"
            aria-label="메인 메뉴"
          >
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="menu-button"
            aria-label={
              menuOpen
                ? "메뉴 닫기"
                : "메뉴 열기"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen(
                (prev) => !prev
              )
            }
          >
            <span />
            <span />
            <span />
          </button>

        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="모바일 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

      </header>

      {/* =====================================
          BEFORE / AFTER 메인 사진
      ===================================== */}

      <section className="hero">

        {slides.map((slide, index) => (
          <div
            key={slide.label}
            className={`hero-slide ${
              current === index
                ? "active"
                : ""
            }`}
            aria-hidden={
              current !== index
            }
          >
            <Image
              src={slide.image}
              alt={`${slide.label} 싱크볼 시공 사진`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-photo"
              style={{
                objectPosition:
                  slide.position,
              }}
            />
          </div>
        ))}

        <div className="hero-overlay" />

        <div className="hero-photo-top">

          <p>
            SINKMOA REAL INSTALLATION
          </p>

          <div className="hero-photo-badge">

            <span className="badge-dot" />

            <strong>
              {slides[current].label}
            </strong>

            <span className="badge-divider" />

            <span>
              {slides[current].korean}
            </span>

          </div>

        </div>

        <div className="hero-photo-bottom">

          <div className="photo-caption">

            <p>
              REAL KITCHEN TRANSFORMATION
            </p>

            <h1>
              {slides[current].description}
            </h1>

          </div>

          <div className="slide-controls">

            {slides.map(
              (slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  className={
                    current === index
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setCurrent(index)
                  }
                  aria-label={`${slide.label} 사진 보기`}
                  aria-pressed={
                    current === index
                  }
                >
                  <span className="control-line" />

                  <span className="control-label">
                    {slide.label}
                  </span>
                </button>
              )
            )}

          </div>

        </div>

      </section>

      {/* =====================================
          메인 소개
      ===================================== */}

      <section className="hero-intro">

        <p className="section-label">
          SINKMOA PREMIUM INSTALLATION
        </p>

        <h2>
          싱크볼 하나로,
          <br />
          달라지는 주방.
        </h2>

        <div className="gold-line" />

        <p className="hero-intro-description">
          오래된 싱크볼의 새로운 변화.
          <br />
          제품 선택부터 설치 상담까지,
          <br />
          싱크모아가 함께합니다.
        </p>

        <div className="hero-intro-actions">

          <Link
            href="/#brands"
            className="hero-primary"
          >
            브랜드별 상품 보기
            <span>↗</span>
          </Link>

          <Link
            href="/order"
            className="hero-secondary"
          >
            설치 문의하기
            <span>↗</span>
          </Link>

        </div>

      </section>

      {/* =====================================
          싱크모아 소개
      ===================================== */}

      <section className="intro-section">

        <p className="section-label">
          THE SINKMOA STORY
        </p>

        <h2>
          주방이라는 공간에
          <br />
          새로운 가치를 더하다.
        </h2>

        <div className="gold-line" />

        <p className="intro-description">
          일상의 작은 순간이 머무는 주방.
          <br />
          싱크모아는 디자인과 실용성을
          함께 고려한 싱크볼을 소개합니다.
          <br />
          제품 선택부터 설치 상담까지,
          더 나은 주방을 위한 과정을
          함께합니다.
        </p>

      </section>

      {/* =====================================
          브랜드
      ===================================== */}

      <section
        className="brands-section"
        id="brands"
      >

        <div className="section-heading">

          <p className="section-label">
            CURATED COLLECTION
          </p>

          <h2>
            브랜드별 상품
          </h2>

          <p>
            당신의 주방에 어울리는
            브랜드를 선택하세요.
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

                <Image
                  src={brand.image}
                  alt={`${brand.korean} 싱크볼`}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  className="brand-photo"
                />

              </div>

              <div className="brand-info">

                <div>

                  <p>
                    COLLECTION{" "}
                    {brand.number}
                    {" · "}
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

      {/* =====================================
          설치 서비스
      ===================================== */}

      <section
        className="service-section"
        id="service"
      >

        <div className="service-image">

          <Image
            src="/E7583A13-ED40-4C57-A2F1-3E16709A382D.jpeg"
            alt="싱크모아 싱크볼 기본 구성품"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="service-photo"
          />

        </div>

        <div className="service-content">

          <p className="section-label">
            SINKMOA INSTALLATION
          </p>

          <h2>
            좋은 제품의 선택,
            <br />
            그 이상의 완성.
          </h2>

          <div className="gold-line" />

          <p className="service-description">
            싱크볼 제품 선택부터 설치 상담까지.
            <br />
            기존 싱크볼의 상판 타공 사이즈와
            현장 환경을 확인하여
            적합한 시공 방법을 안내합니다.
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
            기존 싱크볼 철거,
            기존 수전 및 배수구 연결 시공 포함
            <br />
            상판 타공 및 현장 상황에 따라
            추가 비용이 발생할 수 있습니다.
          </p>

          <Link
            href="/order"
            className="gold-button"
          >
            설치 상담하기
            <span>↗</span>
          </Link>

        </div>

      </section>

      {/* =====================================
          지역별 설치 안내
      ===================================== */}

      <section
        className="regions-section"
        id="regions"
      >

        <div className="regions-container">

          <div className="section-heading">

            <p className="section-label">
              SINKMOA SERVICE AREAS
            </p>

            <h2>
              우리 지역 싱크볼
              <br className="mobile-only" />
              {" "}
              설치 안내
            </h2>

            <p>
              서울·경기·인천·충남·충북
              <br />
              지역을 선택해 싱크볼
              교체 및 설치 안내를
              확인하세요.
            </p>

          </div>

          <div className="regions-summary">

            <div>
              <span>
                INSTALLATION AREAS
              </span>
              <strong>
                5개 광역 지역
              </strong>
            </div>

            <div>
              <span>
                DISTRICT GUIDES
              </span>
              <strong>
                {totalDistricts}개 시·군·구
              </strong>
            </div>

            <div>
              <span>
                INSTALLATION FEE
              </span>
              <strong>
                기본 170,000원
              </strong>
            </div>

          </div>

          <div
            className="region-tabs"
            role="tablist"
            aria-label="설치 안내 지역 선택"
          >

            {REGION_ORDER.map(
              (slug) => {

                const regionData =
                  INSTALLATION_REGIONS[slug];

                const active =
                  selectedRegion === slug;

                return (
                  <button
                    key={slug}
                    id={`region-tab-${slug}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="region-district-panel"
                    className={`region-tab ${
                      active
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedRegion(
                        slug
                      )
                    }
                  >

                    <span>
                      {regionData.name}
                    </span>

                    <small>
                      {
                        regionData
                          .districts
                          .length
                      }
                      개 지역
                    </small>

                  </button>
                );
              }
            )}

          </div>

          <div
            className="region-panel"
            id="region-district-panel"
            role="tabpanel"
            aria-labelledby={`region-tab-${selectedRegion}`}
          >

            <div className="region-panel-heading">

              <div>

                <p>
                  SELECT YOUR DISTRICT
                </p>

                <h3>
                  {activeRegion.name}
                  {" "}
                  싱크볼 교체·설치
                </h3>

                <span>
                  원하는 지역을 선택하면
                  해당 지역의 설치 안내
                  페이지로 이동합니다.
                </span>

              </div>

              <span className="region-count">
                {
                  activeRegion
                    .districts
                    .length
                }

                <small>
                  {" "}AREAS
                </small>
              </span>

            </div>

            <div className="district-grid">

              {activeRegion.districts.map(
                (district) => (

                  <Link
                    key={`${selectedRegion}-${district.slug}`}
                    href={`/installation/${selectedRegion}/${district.slug}`}
                    className="district-link"
                  >

                    <span>
                      {district.name}
                    </span>

                    <span className="district-arrow">
                      ↗
                    </span>

                  </Link>

                )
              )}

            </div>

          </div>

          <div className="regions-notice">

            <div className="regions-notice-icon">
              i
            </div>

            <p>
              서울·경기·인천·충남·충북
              지역의 싱크볼 설치 상담을
              접수하고 있습니다.
              실제 방문 가능 여부와 일정,
              출장 관련 추가 비용은
              주소 및 현장 조건 확인 후
              안내해드립니다.
            </p>

            <Link href="/order">
              설치 견적 문의 ↗
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================
          주문 문의
      ===================================== */}

      <section className="order-section">

        <p className="section-label">
          YOUR KITCHEN, OUR PRIORITY
        </p>

        <h2>
          당신의 주방을 위한
          <br />
          새로운 선택
        </h2>

        <p>
          프리미엄 싱크볼부터 설치 상담까지,
          <br />
          싱크모아에서 편리하게 문의하세요.
        </p>

        <Link
          href="/order"
          className="gold-button"
        >
          주문 및 견적 문의
          <span>↗</span>
        </Link>

      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="footer-inner">

          <h2>
            SINKMOA
          </h2>

          <p>
            프리미엄 싱크볼 판매 및
            설치 전문몰
          </p>

          <nav className="footer-links">

            {navigation.map((item) => (

              <Link
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>

            ))}

          </nav>

          <p className="footer-regions">
            설치 상담 지역:
            서울 · 경기 · 인천 · 충남 · 충북
          </p>

          <p className="copyright">
            © {new Date().getFullYear()}{" "}
            SINKMOA. All Rights Reserved.
          </p>

        </div>

      </footer>

      {/* =====================================
          STYLE
      ===================================== */}

      <style jsx global>{`

        .sinkmoa-home {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;

          color: var(--ink);
          background: var(--ivory);

          font-family:
            Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic",
            sans-serif;

          word-break: keep-all;
          overflow-x: hidden;
        }

        .sinkmoa-home *,
        .sinkmoa-home *::before,
        .sinkmoa-home *::after {
          box-sizing: border-box;
        }

        .sinkmoa-home a {
          text-decoration: none;
        }

        .sinkmoa-home button {
          font-family: inherit;
        }

        /* =====================================
           쿠폰 팝업
        ===================================== */

        .coupon-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(8, 15, 18, .68);

          backdrop-filter:
            blur(5px);
        }

        .coupon-popup {
          position: relative;

          width: min(
            100%,
            480px
          );

          overflow: hidden;

          background: #fff;

          border-radius: 22px;

          box-shadow:
            0 24px 80px
            rgba(0,0,0,.28);
        }

        .coupon-close {
          position: absolute;
          z-index: 3;

          top: 17px;
          right: 17px;

          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border: 1px solid
            rgba(255,255,255,.25);

          border-radius: 50%;

          background:
            rgba(0,0,0,.28);

          color: white;

          font-size: 29px;
          font-weight: 300;

          line-height: 1;

          cursor: pointer;
        }

        .coupon-top {
          padding:
            55px 35px
            43px;

          background:
            linear-gradient(
              145deg,
              #111a1e,
              #19262b
            );

          color: white;

          text-align: center;
        }

        .coupon-brand {
          margin: 0 0 18px;

          color: #fff;

          font-size: 16px;
          font-weight: 700;

          letter-spacing: .22em;
        }

        .coupon-badge {
          display: inline-block;

          padding: 9px 13px;

          border:
            1px solid
            rgba(196,180,154,.6);

          color: #c4b49a;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .17em;
        }

        .coupon-small-title {
          margin:
            28px 0 9px;

          color: #d9dddb;

          font-size: 14px;
          font-weight: 600;
        }

        .coupon-top h2 {
          margin: 0;

          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 7px;

          line-height: 1;
        }

        .coupon-top h2 strong {
          color: #d8bd93;

          font-size: 62px;
          font-weight: 700;

          letter-spacing: -.05em;
        }

        .coupon-top h2 span {
          color: white;

          font-size: 27px;
          font-weight: 600;

          letter-spacing: -.04em;
        }

        .coupon-line {
          width: 36px;
          height: 1px;

          margin:
            27px auto 23px;

          background:
            #c4b49a;
        }

        .coupon-description {
          margin: 0;

          color: #cdd3d1;

          font-size: 12px;
          line-height: 1.9;
        }

        .coupon-bottom {
          padding:
            26px 27px 0;

          background: white;
        }

        .coupon-button {
          width: 100%;

          padding: 18px 20px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          background: #c4b49a;

          color: #19262b;

          font-size: 14px;
          font-weight: 700;
        }

        .coupon-notice {
          margin:
            14px 5px 20px;

          color: #999;

          font-size: 10px;
          line-height: 1.7;

          text-align: center;
        }

        .coupon-actions {
          margin:
            0 -27px;

          display: grid;
          grid-template-columns:
            1fr 1fr;

          border-top:
            1px solid #e8e4dd;
        }

        .coupon-actions button {
          padding: 18px 10px;

          border: 0;

          background: white;

          color: #626866;

          font-size: 12px;

          cursor: pointer;
        }

        .coupon-actions button +
        button {
          border-left:
            1px solid #e8e4dd;
        }

        /* =====================================
           HEADER
        ===================================== */

        .site-header {
          position: relative;
          z-index: 30;

          background: #111a1e;

          border-bottom:
            1px solid
            rgba(255,255,255,.15);
        }

        .header-inner {
          max-width: 1360px;
          width: calc(100% - 80px);
          height: 94px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          color: #fff;

          font-size: 26px;
          font-weight: 700;

          letter-spacing: .22em;
        }

        .desktop-nav {
          display: flex;
          gap: 34px;
          align-items: center;
        }

        .desktop-nav a {
          color:
            rgba(255,255,255,.9);

          font-size: 13px;
        }

        .menu-button {
          display: none;

          padding: 10px;

          border: 0;

          background: transparent;

          cursor: pointer;
        }

        .menu-button span {
          display: block;

          width: 25px;
          height: 1px;

          margin: 6px 0;

          background: white;
        }

        .mobile-nav {
          display: none;
        }

        /* =====================================
           HERO
        ===================================== */

        .hero {
          position: relative;

          height:
            min(780px,80svh);

          min-height: 530px;

          overflow: hidden;

          background: #111a1e;
        }

        .hero-slide {
          position: absolute;
          inset: 0;

          opacity: 0;

          transition:
            opacity 1s ease;

          pointer-events: none;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-photo {
          object-fit: cover;

          transition:
            transform 5s linear;
        }

        .hero-slide.active
        .hero-photo {
          transform:
            scale(1.025);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;

          z-index: 1;

          background:
            linear-gradient(
              180deg,
              rgba(7,15,19,.30) 0%,
              rgba(7,15,19,.04) 35%,
              rgba(7,15,19,.06) 65%,
              rgba(7,15,19,.48) 100%
            );
        }

        .hero-photo-top {
          position: absolute;
          z-index: 2;

          top: 35px;
          left: 0;
          right: 0;

          text-align: center;

          color: white;
        }

        .hero-photo-top > p {
          margin:
            0 0 18px;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: .24em;
        }

        .hero-photo-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;

          padding: 12px 20px;

          border:
            1px solid
            rgba(255,255,255,.75);

          background:
            rgba(10,18,22,.48);

          backdrop-filter:
            blur(5px);

          font-size: 13px;
        }

        .hero-photo-badge strong {
          letter-spacing: .2em;
        }

        .badge-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #c4b49a;
        }

        .badge-divider {
          width: 1px;
          height: 14px;

          background:
            rgba(255,255,255,.5);
        }

        .hero-photo-bottom {
          position: absolute;
          z-index: 2;

          left: 0;
          right: 0;
          bottom: 30px;

          max-width: 1360px;
          width:
            calc(100% - 80px);

          margin: auto;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          gap: 25px;
        }

        .photo-caption {
          color: white;
        }

        .photo-caption p {
          margin: 0 0 10px;

          color: #e8d4b5;

          font-size: 10px;

          letter-spacing: .22em;
        }

        .photo-caption h1 {
          margin: 0;

          font-size:
            clamp(24px,3vw,40px);

          font-weight: 400;
        }

        .slide-controls {
          display: flex;
          gap: 16px;
        }

        .slide-controls button {
          border: 0;
          padding: 0;

          background: transparent;

          color:
            rgba(255,255,255,.7);

          cursor: pointer;
        }

        .control-line {
          display: block;

          width: 95px;
          height: 3px;

          margin-bottom: 9px;

          background:
            rgba(255,255,255,.55);
        }

        .selected
        .control-line {
          background: #d9bd92;
        }

        .control-label {
          font-size: 10px;

          letter-spacing: .17em;
        }

        /* =====================================
           COMMON
        ===================================== */

        .section-label {
          margin: 0 0 22px;

          color: #b9a17d;

          font-size: 11px;
          font-weight: 700;

          letter-spacing: .23em;
        }

        .gold-line {
          width: 40px;
          height: 1px;

          margin: 30px auto;

          background: #b6a080;
        }

        .hero-intro {
          padding:
            105px 24px 115px;

          background: #19262b;

          color: white;

          text-align: center;
        }

        .hero-intro h2,
        .intro-section h2,
        .section-heading h2,
        .order-section h2 {
          font-weight: 400;
          letter-spacing: -.05em;
        }

        .hero-intro h2 {
          margin: 0;

          font-size:
            clamp(38px,5vw,65px);

          line-height: 1.4;
        }

        .hero-intro-description {
          margin: 0 0 34px;

          color: #d0d2d1;

          font-size: 15px;
          line-height: 2;
        }

        .hero-intro-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          gap: 12px;
        }

        .hero-primary,
        .hero-secondary {
          min-width: 240px;

          padding: 20px 24px;

          display: inline-flex;
          justify-content: space-between;

          font-size: 13px;
          font-weight: 700;
        }

        .hero-primary {
          background: #c4b49a;
          color: #19262b;
        }

        .hero-secondary {
          border:
            1px solid
            rgba(255,255,255,.65);

          color: white;
        }

        .intro-section {
          padding: 130px 24px;

          background: #f7f5f0;

          text-align: center;
        }

        .intro-section h2 {
          margin: 0;

          font-size:
            clamp(34px,4vw,55px);

          line-height: 1.5;
        }

        .intro-description {
          margin: 0;

          color: #777;

          font-size: 15px;
          line-height: 2.2;
        }

        /* =====================================
           BRANDS
        ===================================== */

        .brands-section {
          padding:
            110px 24px 130px;

          background: #eeeae3;
        }

        .section-heading {
          margin-bottom: 60px;

          text-align: center;
        }

        .section-heading h2 {
          margin:
            0 0 16px;

          font-size:
            clamp(36px,5vw,58px);
        }

        .section-heading > p:last-child {
          color: #777;

          font-size: 14px;
          line-height: 1.9;
        }

        .brand-grid {
          max-width: 1360px;

          margin: auto;

          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0,1fr)
            );

          gap: 24px;
        }

        .brand-card {
          display: block;

          overflow: hidden;

          background: #f7f5f0;

          color: #19262b;
        }

        .brand-image {
          position: relative;

          aspect-ratio: 1.35;

          overflow: hidden;

          background: #e4e4e4;
        }

        .brand-photo {
          object-fit: contain;

          transition:
            transform .4s;
        }

        .brand-card:hover
        .brand-photo {
          transform:
            scale(1.04);
        }

        .brand-info {
          padding: 26px 30px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand-info p {
          margin: 0 0 8px;

          color: #9a8567;

          font-size: 10px;

          letter-spacing: .14em;
        }

        .brand-info h3 {
          margin: 0;

          font-size: 26px;
          font-weight: 400;

          letter-spacing: .07em;
        }

        .brand-arrow {
          color: #9a8567;

          font-size: 24px;
        }

        /* =====================================
           SERVICE
        ===================================== */

        .service-section {
          min-height: 600px;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          background: white;
        }

        .service-image {
          position: relative;

          min-height: 550px;

          background: #e4e4e4;
        }

        .service-photo {
          object-fit: contain;
        }

        .service-content {
          padding:
            90px max(40px,8vw);

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .service-content h2 {
          margin: 0;

          font-size:
            clamp(34px,3.8vw,53px);

          font-weight: 400;
          line-height: 1.45;

          letter-spacing: -.05em;
        }

        .service-content
        .gold-line {
          margin: 30px 0;
        }

        .service-description {
          margin: 0 0 30px;

          color: #777;

          font-size: 15px;
          line-height: 2;
        }

        .service-price {
          width:
            min(100%,400px);

          padding: 19px 23px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          border:
            1px solid #ded6c8;
        }

        .service-price strong {
          color: #a18b69;

          font-size: 25px;
        }

        .service-note {
          margin: 20px 0 30px;

          color: #777;

          font-size: 12px;
          line-height: 1.9;
        }

        .gold-button {
          padding: 18px 24px;

          display: inline-flex;
          justify-content: space-between;

          gap: 40px;

          background: #c4b49a;

          color: #19262b;

          font-size: 13px;
          font-weight: 700;
        }

        /* =====================================
           REGIONS
        ===================================== */

        .regions-section {
          padding:
            115px 24px 125px;

          background: #f7f5f0;
        }

        .regions-container {
          max-width: 1200px;
          margin: auto;
        }

        .regions-summary {
          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 1px;

          margin-bottom: 35px;

          background: #ddd5c9;
        }

        .regions-summary > div {
          padding: 27px 20px;

          display: flex;
          flex-direction: column;

          gap: 12px;

          background: white;

          text-align: center;
        }

        .regions-summary span {
          color: #a18b69;

          font-size: 10px;
          font-weight: 700;
        }

        .region-tabs {
          display: grid;

          grid-template-columns:
            repeat(5,1fr);

          gap: 8px;

          margin-bottom: 15px;
        }

        .region-tab {
          min-height: 86px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          gap: 8px;

          border:
            1px solid #ddd5c9;

          background: white;

          cursor: pointer;
        }

        .region-tab.active {
          background: #19262b;
          color: white;
        }

        .region-tab small {
          color: #888;
        }

        .region-tab.active small {
          color: #c4b49a;
        }

        .region-panel {
          padding: 35px;

          background: white;

          border:
            1px solid #e2dacf;
        }

        .region-panel-heading {
          margin-bottom: 25px;
          padding-bottom: 25px;

          display: flex;
          justify-content: space-between;

          border-bottom:
            1px solid #e9e3d9;
        }

        .region-panel-heading p {
          color: #a18b69;

          font-size: 10px;
        }

        .region-panel-heading h3 {
          margin:
            0 0 11px;

          font-size: 25px;
        }

        .region-panel-heading
        div > span {
          color: #888;

          font-size: 12px;
        }

        .region-count {
          color: #b9a17d;

          font-size: 34px;
        }

        .district-grid {
          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 10px;
        }

        .district-link {
          padding: 16px;

          display: flex;
          justify-content: space-between;

          background: #faf9f6;

          border:
            1px solid #e9e3d9;

          color: #19262b;

          font-size: 13px;
          font-weight: 600;
        }

        .district-arrow {
          color: #a18b69;
        }

        .regions-notice {
          margin-top: 19px;
          padding: 24px 28px;

          display: flex;
          align-items: center;

          gap: 17px;

          background: #eae4d9;
        }

        .regions-notice-icon {
          width: 30px;
          height: 30px;

          display: flex;
          justify-content: center;
          align-items: center;

          border:
            1px solid #a18b69;

          border-radius: 50%;

          color: #927b5a;
        }

        .regions-notice p {
          flex: 1;

          color: #625e57;

          font-size: 12px;
          line-height: 1.9;
        }

        .regions-notice a {
          padding: 15px 19px;

          background: #19262b;

          color: white;

          font-size: 12px;
          font-weight: 700;
        }

        .mobile-only {
          display: none;
        }

        /* =====================================
           ORDER
        ===================================== */

        .order-section {
          padding: 120px 24px;

          background: #19262b;

          color: white;

          text-align: center;
        }

        .order-section h2 {
          margin: 0;

          font-size:
            clamp(36px,5vw,60px);

          line-height: 1.45;
        }

        .order-section
        > p:not(.section-label) {
          margin: 25px 0 35px;

          color: #c4cbca;

          line-height: 2;
        }

        /* =====================================
           FOOTER
        ===================================== */

        .footer {
          padding: 65px 24px;

          background: #111a1e;

          color: white;
        }

        .footer-inner {
          max-width: 1360px;
          margin: auto;
        }

        .footer h2 {
          margin: 0 0 14px;

          font-size: 25px;

          letter-spacing: .22em;
        }

        .footer p {
          color: #b3b7b7;

          font-size: 13px;
        }

        .footer-links {
          margin: 30px 0;

          display: flex;
          flex-wrap: wrap;

          gap: 20px;
        }

        .footer-links a {
          color: #e4e4e4;

          font-size: 12px;
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 900px) {

          .desktop-nav {
            display: none;
          }

          .menu-button {
            display: block;
          }

          .mobile-nav {
            display: flex;
            flex-direction: column;

            padding:
              12px 30px 22px;

            background: #111a1e;
          }

          .mobile-nav a {
            padding: 16px 0;

            color: white;

            border-bottom:
              1px solid
              rgba(255,255,255,.12);
          }

          .service-section {
            grid-template-columns: 1fr;
          }

          .district-grid {
            grid-template-columns:
              repeat(3,1fr);
          }

        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 600px) {

          .coupon-overlay {
            padding: 15px;
          }

          .coupon-popup {
            width: 100%;

            border-radius: 20px;
          }

          .coupon-top {
            padding:
              45px 22px
              34px;
          }

          .coupon-brand {
            font-size: 14px;
          }

          .coupon-small-title {
            margin-top: 24px;

            font-size: 12px;
          }

          .coupon-top h2 strong {
            font-size: 52px;
          }

          .coupon-top h2 span {
            font-size: 22px;
          }

          .coupon-description {
            font-size: 11px;
          }

          .coupon-bottom {
            padding:
              22px 20px 0;
          }

          .coupon-actions {
            margin:
              0 -20px;
          }

          .coupon-button {
            font-size: 13px;
          }

          .header-inner {
            width:
              calc(100% - 44px);

            height: 82px;
          }

          .logo {
            font-size: 22px;
          }

          .hero {
            height: 72svh;

            min-height: 480px;
          }

          .hero-photo {
            object-fit: contain;
          }

          .hero-photo-top {
            top: 20px;
          }

          .hero-photo-bottom {
            width:
              calc(100% - 36px);

            bottom: 20px;

            flex-direction: column;
            align-items: flex-start;
          }

          .hero-intro {
            padding:
              80px 22px 90px;
          }

          .hero-intro-actions {
            flex-direction: column;
          }

          .hero-primary,
          .hero-secondary {
            width: 100%;
          }

          .intro-section {
            padding:
              95px 22px;
          }

          .brands-section {
            padding:
              85px 18px 100px;
          }

          .brand-grid {
            grid-template-columns: 1fr;
          }

          .service-image {
            min-height: 330px;
          }

          .service-content {
            padding:
              65px 24px;
          }

          .regions-section {
            padding:
              85px 16px 95px;
          }

          .regions-summary {
            grid-template-columns:
              1fr 1fr;
          }

          .regions-summary
          > div:last-child {
            grid-column:
              1 / -1;
          }

          .region-tabs {
            grid-template-columns:
              repeat(5,1fr);

            gap: 4px;
          }

          .region-tab {
            min-height: 70px;
          }

          .region-tab span {
            font-size: 13px;
          }

          .region-tab small {
            font-size: 9px;
          }

          .region-panel {
            padding: 22px 15px;
          }

          .district-grid {
            grid-template-columns:
              repeat(2,1fr);

            gap: 8px;
          }

          .district-link {
            padding: 15px 12px;

            font-size: 12px;
          }

          .regions-notice {
            flex-wrap: wrap;

            padding: 20px 16px;
          }

          .regions-notice a {
            margin-left: 42px;
          }

          .order-section {
            padding:
              95px 22px;
          }

        }

      `}</style>

    </main>
  );
}
