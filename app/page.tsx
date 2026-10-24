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
   - 30,000원 할인 쿠폰
   - 모바일 전체 비율 최적화
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
  const [current, setCurrent] =
    useState(0);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    selectedRegion,
    setSelectedRegion,
  ] = useState<string>("seoul");

  const [
    couponOpen,
    setCouponOpen,
  ] = useState(false);

  /* =========================================
     메인 슬라이드
  ========================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent(
        (prev) =>
          (prev + 1) % slides.length
      );
    }, 4500);

    return () =>
      window.clearInterval(timer);
  }, []);

  /* =========================================
     쿠폰
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
    INSTALLATION_REGIONS[
      selectedRegion
    ];

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
          3만원 할인 쿠폰
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
                <strong>
                  30,000
                </strong>
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
                ※ 현장 추가 작업비 및
                일부 출장 관련 비용에는
                할인이 적용되지 않을 수 있습니다.
              </p>

              <div className="coupon-actions">

                <button
                  type="button"
                  onClick={
                    hideCouponToday
                  }
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
          HEADER
      ===================================== */}

      <header className="site-header">

        <div className="header-inner">

          <Link
            href="/"
            className="logo"
          >
            SINKMOA
          </Link>

          <nav className="desktop-nav">

            {navigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              )
            )}

          </nav>

          <button
            type="button"
            className="menu-button"
            aria-label="메뉴 열기"
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
          <nav className="mobile-nav">

            {navigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {item.label}
                </Link>
              )
            )}

          </nav>
        )}

      </header>

      {/* =====================================
          BEFORE / AFTER
      ===================================== */}

      <section className="hero">

        {slides.map(
          (slide, index) => (
            <div
              key={slide.label}
              className={`hero-slide ${
                current === index
                  ? "active"
                  : ""
              }`}
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
          )
        )}

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
              REAL KITCHEN
              TRANSFORMATION
            </p>

            <h1>
              {
                slides[current]
                  .description
              }
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
          소개
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

          {brands.map(
            (brand) => (
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
            )
          )}

        </div>

      </section>

      {/* =====================================
          설치 서비스
      ===================================== */}

      <section
        className="service-section"
        id="service"
      >

        <div className="service-visual">

          <div className="service-image-frame">

            <Image
              src="/E7583A13-ED40-4C57-A2F1-3E16709A382D.jpeg"
              alt="싱크모아 싱크볼 기본 구성품"
              fill
              sizes="(max-width: 900px) 90vw, 50vw"
              className="service-photo"
            />

          </div>

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
            싱크볼 제품 선택부터
            설치 상담까지.
            <br />
            기존 상판 타공 사이즈와
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
            기존 수전 및 배수구 연결 포함
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
          지역
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
              우리 지역
              <br className="mobile-only" />
              {" "}
              싱크볼 설치 안내
            </h2>

            <p>
              서울·경기·인천·충남·충북
              <br />
              지역을 선택해 설치 안내를
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
                {totalDistricts}개 지역
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

          <div className="region-tabs">

            {REGION_ORDER.map(
              (slug) => {
                const regionData =
                  INSTALLATION_REGIONS[
                    slug
                  ];

                const active =
                  selectedRegion === slug;

                return (
                  <button
                    key={slug}
                    type="button"
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
                      개
                    </small>
                  </button>
                );
              }
            )}

          </div>

          <div className="region-panel">

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
                  원하는 지역을 선택하세요.
                </span>

              </div>

              <strong className="region-count">
                {
                  activeRegion
                    .districts.length
                }
              </strong>

            </div>

            <div className="district-grid">

              {activeRegion.districts.map(
                (district) => (
                  <Link
                    key={
                      district.slug
                    }
                    href={`/installation/${selectedRegion}/${district.slug}`}
                    className="district-link"
                  >
                    <span>
                      {district.name}
                    </span>

                    <span>
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
              실제 방문 가능 여부와 일정,
              출장 관련 추가 비용은
              주소 및 현장 조건 확인 후
              안내드립니다.
            </p>

            <Link href="/order">
              견적 문의 ↗
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================
          주문
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
          프리미엄 싱크볼부터
          설치 상담까지,
          <br />
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

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer className="footer">

        <div className="footer-inner">

          <h2>
            SINKMOA
          </h2>

          <p>
            프리미엄 싱크볼
            판매 및 설치 전문몰
          </p>

          <nav className="footer-links">

            {navigation.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              )
            )}

          </nav>

          <p className="footer-regions">
            설치 상담 지역:
            서울 · 경기 · 인천 · 충남 · 충북
          </p>

          <p className="copyright">
            ©{" "}
            {new Date().getFullYear()}
            {" "}SINKMOA.
            All Rights Reserved.
          </p>

        </div>

      </footer>

      {/* =====================================
          STYLE
      ===================================== */}

      <style jsx global>{`

        body {
          margin: 0;
        }

        .sinkmoa-home {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;

          background: var(--ivory);
          color: var(--ink);

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

        /* ===============================
           COUPON
        =============================== */

        .sinkmoa-home
        .coupon-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 18px;

          background:
            rgba(8,15,18,.65);

          backdrop-filter:
            blur(4px);
        }

        .sinkmoa-home
        .coupon-popup {
          position: relative;

          width: min(100%,450px);

          overflow: hidden;

          border-radius: 20px;

          background: white;

          box-shadow:
            0 24px 80px
            rgba(0,0,0,.3);
        }

        .sinkmoa-home
        .coupon-close {
          position: absolute;
          z-index: 2;

          top: 14px;
          right: 14px;

          width: 38px;
          height: 38px;

          border: 0;
          border-radius: 50%;

          background:
            rgba(0,0,0,.30);

          color: white;

          font-size: 25px;

          cursor: pointer;
        }

        .sinkmoa-home
        .coupon-top {
          padding:
            44px 28px 33px;

          background:
            linear-gradient(
              145deg,
              #111a1e,
              #19262b
            );

          color: white;

          text-align: center;
        }

        .sinkmoa-home
        .coupon-brand {
          margin: 0 0 15px;

          font-size: 14px;
          font-weight: 700;

          letter-spacing: .22em;
        }

        .sinkmoa-home
        .coupon-badge {
          display: inline-block;

          padding: 7px 11px;

          border:
            1px solid
            rgba(196,180,154,.55);

          color: #c4b49a;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .16em;
        }

        .sinkmoa-home
        .coupon-small-title {
          margin:
            22px 0 8px;

          color: #d5dad8;

          font-size: 12px;
        }

        .sinkmoa-home
        .coupon-top h2 {
          margin: 0;

          display: flex;
          justify-content: center;
          align-items: baseline;

          gap: 6px;
        }

        .sinkmoa-home
        .coupon-top h2 strong {
          color: #d8bd93;

          font-size: 52px;

          letter-spacing: -.05em;
        }

        .sinkmoa-home
        .coupon-top h2 span {
          font-size: 22px;
        }

        .sinkmoa-home
        .coupon-line {
          width: 34px;
          height: 1px;

          margin:
            22px auto 18px;

          background: #c4b49a;
        }

        .sinkmoa-home
        .coupon-description {
          margin: 0;

          color: #cdd3d1;

          font-size: 11px;
          line-height: 1.8;
        }

        .sinkmoa-home
        .coupon-bottom {
          padding:
            22px 22px 0;
        }

        .sinkmoa-home
        .coupon-button {
          padding: 16px 17px;

          display: flex;
          justify-content: space-between;

          background: #c4b49a;

          color: #19262b;

          font-size: 13px;
          font-weight: 700;
        }

        .sinkmoa-home
        .coupon-notice {
          margin:
            12px 3px 16px;

          color: #999;

          font-size: 9px;
          line-height: 1.7;

          text-align: center;
        }

        .sinkmoa-home
        .coupon-actions {
          margin:
            0 -22px;

          display: grid;

          grid-template-columns:
            1fr 1fr;

          border-top:
            1px solid #eee8df;
        }

        .sinkmoa-home
        .coupon-actions button {
          padding: 15px 8px;

          border: 0;

          background: white;

          color: #666;

          font-size: 11px;
        }

        .sinkmoa-home
        .coupon-actions
        button + button {
          border-left:
            1px solid #eee8df;
        }

        /* ===============================
           HEADER
        =============================== */

        .sinkmoa-home
        .site-header {
          position: relative;
          z-index: 30;

          background: #111a1e;

          border-bottom:
            1px solid
            rgba(255,255,255,.12);
        }

        .sinkmoa-home
        .header-inner {
          width:
            calc(100% - 72px);

          max-width: 1360px;
          height: 86px;

          margin: auto;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sinkmoa-home
        .logo {
          color: white;

          font-size: 23px;
          font-weight: 700;

          letter-spacing: .20em;
        }

        .sinkmoa-home
        .desktop-nav {
          display: flex;
          gap: 30px;
        }

        .sinkmoa-home
        .desktop-nav a {
          color: #eee;
          font-size: 12px;
        }

        .sinkmoa-home
        .menu-button {
          display: none;

          padding: 8px;

          border: 0;

          background: none;
        }

        .sinkmoa-home
        .menu-button span {
          display: block;

          width: 23px;
          height: 1px;

          margin: 5px 0;

          background: white;
        }

        .sinkmoa-home
        .mobile-nav {
          display: none;
        }

        /* ===============================
           HERO
        =============================== */

        .sinkmoa-home
        .hero {
          position: relative;

          height:
            min(700px,74svh);

          min-height: 500px;

          overflow: hidden;

          background: #111a1e;
        }

        .sinkmoa-home
        .hero-slide {
          position: absolute;
          inset: 0;

          opacity: 0;

          transition:
            opacity 1s ease;
        }

        .sinkmoa-home
        .hero-slide.active {
          opacity: 1;
        }

        .sinkmoa-home
        .hero-photo {
          object-fit: cover;
        }

        .sinkmoa-home
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;

          background:
            linear-gradient(
              180deg,
              rgba(8,15,18,.25),
              rgba(8,15,18,.05) 55%,
              rgba(8,15,18,.5)
            );
        }

        .sinkmoa-home
        .hero-photo-top {
          position: absolute;
          z-index: 2;

          top: 30px;

          left: 0;
          right: 0;

          text-align: center;

          color: white;
        }

        .sinkmoa-home
        .hero-photo-top > p {
          margin: 0 0 15px;

          font-size: 10px;

          letter-spacing: .2em;
        }

        .sinkmoa-home
        .hero-photo-badge {
          padding: 10px 17px;

          display: inline-flex;
          align-items: center;

          gap: 10px;

          border:
            1px solid
            rgba(255,255,255,.7);

          background:
            rgba(10,18,22,.4);

          font-size: 11px;
        }

        .sinkmoa-home
        .badge-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #c4b49a;
        }

        .sinkmoa-home
        .badge-divider {
          width: 1px;
          height: 12px;

          background:
            rgba(255,255,255,.5);
        }

        .sinkmoa-home
        .hero-photo-bottom {
          position: absolute;
          z-index: 2;

          left: 0;
          right: 0;
          bottom: 26px;

          width:
            calc(100% - 72px);

          max-width: 1360px;

          margin: auto;

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          color: white;
        }

        .sinkmoa-home
        .photo-caption p {
          margin: 0 0 8px;

          color: #e8d4b5;

          font-size: 9px;

          letter-spacing: .2em;
        }

        .sinkmoa-home
        .photo-caption h1 {
          margin: 0;

          font-size:
            clamp(23px,3vw,37px);

          font-weight: 400;
        }

        .sinkmoa-home
        .slide-controls {
          display: flex;
          gap: 12px;
        }

        .sinkmoa-home
        .slide-controls button {
          padding: 0;

          border: 0;

          background: none;

          color: white;
        }

        .sinkmoa-home
        .control-line {
          display: block;

          width: 80px;
          height: 2px;

          margin-bottom: 7px;

          background:
            rgba(255,255,255,.5);
        }

        .sinkmoa-home
        .selected
        .control-line {
          background: #d9bd92;
        }

        .sinkmoa-home
        .control-label {
          font-size: 9px;
        }

        /* ===============================
           공통
        =============================== */

        .sinkmoa-home
        .section-label {
          margin: 0 0 18px;

          color: #b9a17d;

          font-size: 10px;
          font-weight: 700;

          letter-spacing: .2em;
        }

        .sinkmoa-home
        .gold-line {
          width: 36px;
          height: 1px;

          margin: 25px auto;

          background: #b6a080;
        }

        .sinkmoa-home
        .hero-intro {
          padding:
            85px 22px 90px;

          background: #19262b;

          color: white;

          text-align: center;
        }

        .sinkmoa-home
        .hero-intro h2 {
          margin: 0;

          font-size:
            clamp(34px,4.5vw,57px);

          line-height: 1.4;

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .sinkmoa-home
        .hero-intro-description {
          margin: 0 0 28px;

          color: #d0d2d1;

          font-size: 14px;
          line-height: 1.9;
        }

        .sinkmoa-home
        .hero-intro-actions {
          display: flex;
          justify-content: center;

          gap: 10px;
        }

        .sinkmoa-home
        .hero-primary,
        .sinkmoa-home
        .hero-secondary {
          min-width: 215px;

          padding: 17px 20px;

          display: flex;
          justify-content: space-between;

          font-size: 12px;
          font-weight: 700;
        }

        .sinkmoa-home
        .hero-primary {
          background: #c4b49a;
          color: #19262b;
        }

        .sinkmoa-home
        .hero-secondary {
          border:
            1px solid
            rgba(255,255,255,.6);

          color: white;
        }

        /* ===============================
           INTRO
        =============================== */

        .sinkmoa-home
        .intro-section {
          padding: 100px 22px;

          text-align: center;
        }

        .sinkmoa-home
        .intro-section h2 {
          margin: 0;

          font-size:
            clamp(31px,4vw,49px);

          line-height: 1.45;

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .sinkmoa-home
        .intro-description {
          margin: 0;

          color: #777;

          font-size: 14px;
          line-height: 2;
        }

        /* ===============================
           BRAND
        =============================== */

        .sinkmoa-home
        .brands-section {
          padding:
            90px 22px 100px;

          background: #eeeae3;
        }

        .sinkmoa-home
        .section-heading {
          margin-bottom: 45px;

          text-align: center;
        }

        .sinkmoa-home
        .section-heading h2 {
          margin: 0 0 12px;

          font-size:
            clamp(32px,4.5vw,50px);

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .sinkmoa-home
        .section-heading
        > p:last-child {
          color: #777;

          font-size: 13px;
          line-height: 1.8;
        }

        .sinkmoa-home
        .brand-grid {
          max-width: 1240px;

          margin: auto;

          display: grid;
          grid-template-columns:
            repeat(2,1fr);

          gap: 18px;
        }

        .sinkmoa-home
        .brand-card {
          overflow: hidden;

          background: #f7f5f0;

          color: #19262b;
        }

        .sinkmoa-home
        .brand-image {
          position: relative;

          aspect-ratio: 1.5;

          background: white;
        }

        .sinkmoa-home
        .brand-photo {
          object-fit: contain;

          padding: 10px;
        }

        .sinkmoa-home
        .brand-info {
          padding: 20px 24px;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sinkmoa-home
        .brand-info p {
          margin: 0 0 6px;

          color: #9a8567;

          font-size: 9px;
        }

        .sinkmoa-home
        .brand-info h3 {
          margin: 0;

          font-size: 22px;
          font-weight: 400;

          letter-spacing: .06em;
        }

        .sinkmoa-home
        .brand-arrow {
          color: #9a8567;
          font-size: 20px;
        }

        /* ===============================
           SERVICE
        =============================== */

        .sinkmoa-home
        .service-section {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          background: white;
        }

        .sinkmoa-home
        .service-visual {
          min-height: 500px;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 45px;

          background: #f8f7f3;
        }

        .sinkmoa-home
        .service-image-frame {
          position: relative;

          width: min(100%,520px);

          aspect-ratio: 1.25;

          overflow: hidden;

          background: white;
        }

        .sinkmoa-home
        .service-photo {
          object-fit: contain;

          padding: 35px;
        }

        .sinkmoa-home
        .service-content {
          padding:
            75px max(35px,7vw);

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .sinkmoa-home
        .service-content h2 {
          margin: 0;

          font-size:
            clamp(31px,3.5vw,47px);

          line-height: 1.4;

          font-weight: 400;

          letter-spacing: -.05em;
        }

        .sinkmoa-home
        .service-content
        .gold-line {
          margin: 25px 0;
        }

        .sinkmoa-home
        .service-description {
          margin: 0 0 25px;

          color: #777;

          font-size: 14px;
          line-height: 1.9;
        }

        .sinkmoa-home
        .service-price {
          width: min(100%,370px);

          padding: 17px 20px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          border:
            1px solid #ded6c8;
        }

        .sinkmoa-home
        .service-price span {
          font-size: 13px;
        }

        .sinkmoa-home
        .service-price strong {
          color: #a18b69;

          font-size: 21px;
        }

        .sinkmoa-home
        .service-note {
          margin: 17px 0 25px;

          color: #777;

          font-size: 11px;
          line-height: 1.8;
        }

        .sinkmoa-home
        .gold-button {
          padding: 16px 21px;

          display: inline-flex;
          justify-content: space-between;

          gap: 32px;

          background: #c4b49a;

          color: #19262b;

          font-size: 12px;
          font-weight: 700;
        }

        /* ===============================
           REGIONS
        =============================== */

        .sinkmoa-home
        .regions-section {
          padding:
            90px 22px 100px;
        }

        .sinkmoa-home
        .regions-container {
          max-width: 1100px;
          margin: auto;
        }

        .sinkmoa-home
        .regions-summary {
          display: grid;
          grid-template-columns:
            repeat(3,1fr);

          gap: 1px;

          margin-bottom: 25px;

          background: #ded6cb;
        }

        .sinkmoa-home
        .regions-summary div {
          padding: 21px 12px;

          display: flex;
          flex-direction: column;

          gap: 7px;

          background: white;

          text-align: center;
        }

        .sinkmoa-home
        .regions-summary span {
          color: #a18b69;
          font-size: 8px;
        }

        .sinkmoa-home
        .regions-summary strong {
          font-size: 15px;
        }

        .sinkmoa-home
        .region-tabs {
          display: grid;
          grid-template-columns:
            repeat(5,1fr);

          gap: 6px;

          margin-bottom: 11px;
        }

        .sinkmoa-home
        .region-tab {
          min-height: 72px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 5px;

          border:
            1px solid #ddd5c9;

          background: white;

          color: #19262b;
        }

        .sinkmoa-home
        .region-tab.active {
          background: #19262b;
          color: white;
        }

        .sinkmoa-home
        .region-tab span {
          font-size: 14px;
          font-weight: 600;
        }

        .sinkmoa-home
        .region-tab small {
          color: #888;
          font-size: 9px;
        }

        .sinkmoa-home
        .region-tab.active small {
          color: #c4b49a;
        }

        .sinkmoa-home
        .region-panel {
          padding: 27px;

          background: white;

          border:
            1px solid #e2dacf;
        }

        .sinkmoa-home
        .region-panel-heading {
          padding-bottom: 20px;
          margin-bottom: 20px;

          display: flex;
          justify-content: space-between;

          border-bottom:
            1px solid #e9e3d9;
        }

        .sinkmoa-home
        .region-panel-heading p {
          margin: 0 0 7px;

          color: #a18b69;

          font-size: 8px;
        }

        .sinkmoa-home
        .region-panel-heading h3 {
          margin: 0 0 8px;

          font-size: 20px;
        }

        .sinkmoa-home
        .region-panel-heading span {
          color: #888;
          font-size: 10px;
        }

        .sinkmoa-home
        .region-count {
          color: #b9a17d;

          font-size: 27px;
        }

        .sinkmoa-home
        .district-grid {
          display: grid;

          grid-template-columns:
            repeat(4,1fr);

          gap: 7px;
        }

        .sinkmoa-home
        .district-link {
          padding: 13px;

          display: flex;
          justify-content: space-between;

          border:
            1px solid #e9e3d9;

          background: #faf9f6;

          color: #19262b;

          font-size: 11px;
          font-weight: 600;
        }

        .sinkmoa-home
        .district-link
        span:last-child {
          color: #a18b69;
        }

        .sinkmoa-home
        .regions-notice {
          margin-top: 14px;

          padding: 18px 20px;

          display: flex;
          align-items: center;

          gap: 13px;

          background: #eae4d9;
        }

        .sinkmoa-home
        .regions-notice-icon {
          width: 26px;
          height: 26px;

          display: flex;
          justify-content: center;
          align-items: center;

          flex-shrink: 0;

          border:
            1px solid #a18b69;

          border-radius: 50%;

          color: #927b5a;

          font-size: 11px;
        }

        .sinkmoa-home
        .regions-notice p {
          flex: 1;

          margin: 0;

          color: #625e57;

          font-size: 10px;
          line-height: 1.7;
        }

        .sinkmoa-home
        .regions-notice a {
          padding: 12px 15px;

          background: #19262b;

          color: white;

          font-size: 10px;
        }

        .sinkmoa-home
        .mobile-only {
          display: none;
        }

        /* ===============================
           ORDER
        =============================== */

        .sinkmoa-home
        .order-section {
          padding:
            90px 22px;

          background: #19262b;

          color: white;

          text-align: center;
        }

        .sinkmoa-home
        .order-section h2 {
          margin: 0;

          font-size:
            clamp(32px,4.5vw,52px);

          line-height: 1.4;

          font-weight: 400;
        }

        .sinkmoa-home
        .order-section
        > p:not(.section-label) {
          margin: 20px 0 27px;

          color: #c4cbca;

          font-size: 13px;
          line-height: 1.9;
        }

        /* ===============================
           FOOTER
        =============================== */

        .sinkmoa-home
        .footer {
          padding: 50px 22px;

          background: #111a1e;

          color: white;
        }

        .sinkmoa-home
        .footer-inner {
          max-width: 1240px;
          margin: auto;
        }

        .sinkmoa-home
        .footer h2 {
          margin: 0 0 11px;

          font-size: 21px;

          letter-spacing: .2em;
        }

        .sinkmoa-home
        .footer p {
          color: #b3b7b7;
          font-size: 11px;
        }

        .sinkmoa-home
        .footer-links {
          margin: 24px 0;

          display: flex;
          flex-wrap: wrap;

          gap: 17px;
        }

        .sinkmoa-home
        .footer-links a {
          color: #e4e4e4;
          font-size: 11px;
        }

        /* ===============================
           TABLET
        =============================== */

        @media (max-width: 900px) {

          .sinkmoa-home
          .desktop-nav {
            display: none;
          }

          .sinkmoa-home
          .menu-button {
            display: block;
          }

          .sinkmoa-home
          .mobile-nav {
            display: flex;

            flex-direction: column;

            padding:
              8px 24px 16px;

            background: #111a1e;
          }

          .sinkmoa-home
          .mobile-nav a {
            padding: 13px 0;

            color: white;

            font-size: 12px;

            border-bottom:
              1px solid
              rgba(255,255,255,.12);
          }

          .sinkmoa-home
          .service-section {
            grid-template-columns: 1fr;
          }

          .sinkmoa-home
          .service-visual {
            min-height: 380px;
          }

          .sinkmoa-home
          .district-grid {
            grid-template-columns:
              repeat(3,1fr);
          }

        }

        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 600px) {

          /* 헤더 */

          .sinkmoa-home
          .header-inner {
            width:
              calc(100% - 34px);

            height: 68px;
          }

          .sinkmoa-home
          .logo {
            font-size: 18px;
          }

          /* 메인 BEFORE AFTER */

          .sinkmoa-home
          .hero {
            height: 61svh;

            min-height: 420px;
            max-height: 570px;
          }

          .sinkmoa-home
          .hero-photo {
            object-fit: contain;

            background: #111a1e;
          }

          .sinkmoa-home
          .hero-photo-top {
            top: 15px;
          }

          .sinkmoa-home
          .hero-photo-top > p {
            margin-bottom: 9px;

            font-size: 8px;
          }

          .sinkmoa-home
          .hero-photo-badge {
            padding: 8px 12px;

            font-size: 10px;
          }

          .sinkmoa-home
          .hero-photo-bottom {
            width:
              calc(100% - 28px);

            bottom: 14px;

            flex-direction: column;
            align-items: flex-start;

            gap: 12px;
          }

          .sinkmoa-home
          .photo-caption p {
            font-size: 8px;
          }

          .sinkmoa-home
          .photo-caption h1 {
            font-size: 21px;
          }

          .sinkmoa-home
          .control-line {
            width: 68px;
          }

          /* 공통 여백 축소 */

          .sinkmoa-home
          .hero-intro {
            padding:
              62px 18px 66px;
          }

          .sinkmoa-home
          .hero-intro h2 {
            font-size: 32px;
          }

          .sinkmoa-home
          .hero-intro-description {
            font-size: 12px;
          }

          .sinkmoa-home
          .hero-intro-actions {
            flex-direction: column;

            max-width: 330px;

            margin: auto;
          }

          .sinkmoa-home
          .hero-primary,
          .sinkmoa-home
          .hero-secondary {
            width: 100%;

            min-width: 0;

            padding: 15px 17px;
          }

          .sinkmoa-home
          .intro-section {
            padding:
              67px 18px;
          }

          .sinkmoa-home
          .intro-section h2 {
            font-size: 30px;
          }

          .sinkmoa-home
          .intro-description {
            font-size: 12px;
            line-height: 1.9;
          }

          /* 브랜드 */

          .sinkmoa-home
          .brands-section {
            padding:
              65px 14px 70px;
          }

          .sinkmoa-home
          .section-heading {
            margin-bottom: 30px;
          }

          .sinkmoa-home
          .section-heading h2 {
            font-size: 31px;
          }

          .sinkmoa-home
          .section-heading
          > p:last-child {
            font-size: 11px;
          }

          .sinkmoa-home
          .brand-grid {
            grid-template-columns: 1fr;

            gap: 13px;
          }

          .sinkmoa-home
          .brand-image {
            aspect-ratio: 1.7;
          }

          .sinkmoa-home
          .brand-photo {
            padding: 16px;
          }

          .sinkmoa-home
          .brand-info {
            padding: 15px 18px;
          }

          .sinkmoa-home
          .brand-info h3 {
            font-size: 19px;
          }

          /* 핵심 수정:
             설치 구성품 사진 축소 */

          .sinkmoa-home
          .service-visual {
            min-height: 0;

            padding:
              30px 18px;

            background: #f8f7f3;
          }

          .sinkmoa-home
          .service-image-frame {
            width: min(100%,300px);

            aspect-ratio: 1.25;

            margin: auto;

            background: white;
          }

          .sinkmoa-home
          .service-photo {
            object-fit: contain;

            padding: 32px;
          }

          .sinkmoa-home
          .service-content {
            padding:
              55px 20px 60px;
          }

          .sinkmoa-home
          .service-content h2 {
            font-size: 30px;
          }

          .sinkmoa-home
          .service-description {
            font-size: 12px;
          }

          .sinkmoa-home
          .service-price {
            padding: 15px 16px;
          }

          .sinkmoa-home
          .service-price strong {
            font-size: 18px;
          }

          /* 지역 */

          .sinkmoa-home
          .regions-section {
            padding:
              65px 13px 70px;
          }

          .sinkmoa-home
          .mobile-only {
            display: block;
          }

          .sinkmoa-home
          .regions-summary {
            grid-template-columns:
              1fr 1fr;

            margin-bottom: 18px;
          }

          .sinkmoa-home
          .regions-summary
          > div {
            padding: 16px 8px;
          }

          .sinkmoa-home
          .regions-summary
          > div:last-child {
            grid-column:
              1 / -1;
          }

          .sinkmoa-home
          .regions-summary strong {
            font-size: 13px;
          }

          .sinkmoa-home
          .region-tabs {
            gap: 3px;
          }

          .sinkmoa-home
          .region-tab {
            min-height: 58px;
          }

          .sinkmoa-home
          .region-tab span {
            font-size: 11px;
          }

          .sinkmoa-home
          .region-tab small {
            font-size: 7px;
          }

          .sinkmoa-home
          .region-panel {
            padding: 17px 12px;
          }

          .sinkmoa-home
          .region-panel-heading {
            margin-bottom: 15px;
            padding-bottom: 15px;
          }

          .sinkmoa-home
          .region-panel-heading h3 {
            font-size: 16px;
          }

          .sinkmoa-home
          .region-panel-heading
          span {
            font-size: 9px;
          }

          .sinkmoa-home
          .region-count {
            font-size: 21px;
          }

          .sinkmoa-home
          .district-grid {
            grid-template-columns:
              repeat(2,1fr);

            gap: 5px;
          }

          .sinkmoa-home
          .district-link {
            padding: 11px 9px;

            font-size: 10px;
          }

          .sinkmoa-home
          .regions-notice {
            padding: 15px 12px;

            align-items: flex-start;

            flex-wrap: wrap;
          }

          .sinkmoa-home
          .regions-notice p {
            font-size: 9px;
          }

          .sinkmoa-home
          .regions-notice a {
            margin-left: 39px;

            padding: 10px 13px;
          }

          /* 주문 */

          .sinkmoa-home
          .order-section {
            padding:
              65px 18px;
          }

          .sinkmoa-home
          .order-section h2 {
            font-size: 31px;
          }

          .sinkmoa-home
          .order-section
          > p:not(.section-label) {
            font-size: 12px;
          }

          /* 쿠폰도 조금 축소 */

          .sinkmoa-home
          .coupon-overlay {
            padding: 14px;
          }

          .sinkmoa-home
          .coupon-popup {
            max-width: 370px;
          }

          .sinkmoa-home
          .coupon-top {
            padding:
              37px 20px 28px;
          }

          .sinkmoa-home
          .coupon-top h2 strong {
            font-size: 45px;
          }

          .sinkmoa-home
          .coupon-top h2 span {
            font-size: 19px;
          }

          .sinkmoa-home
          .coupon-small-title {
            margin-top: 18px;
          }

          /* 푸터 */

          .sinkmoa-home
          .footer {
            padding:
              42px 18px;
          }

        }

      `}</style>

    </main>
  );
}
