
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INSTALLATION_REGIONS,
} from "./data/installation-regions";

/* =========================================
   SINKMOA 메인 홈페이지

   기존 기능 유지:
   - BEFORE / AFTER 자동 슬라이드
   - 브랜드별 상품
   - 설치 서비스
   - 주문 및 견적 문의
   - 모바일 메뉴

   추가 기능:
   - 서울·경기·인천·충남·충북 지역 탭
   - 지역별 시·군·구 페이지 연결
   - 헤더/푸터 지역 메뉴
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

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedRegion, setSelectedRegion] =
    useState<string>("seoul");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const activeRegion =
    INSTALLATION_REGIONS[selectedRegion];

  const totalDistricts = REGION_ORDER.reduce(
    (sum, slug) =>
      sum +
      INSTALLATION_REGIONS[slug].districts.length,
    0
  );

  return (
    <main className="sinkmoa-home">
      {/* ==============================
          헤더
      ============================== */}

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
              menuOpen ? "메뉴 닫기" : "메뉴 열기"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuOpen((prev) => !prev)
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
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* ==============================
          BEFORE / AFTER 메인 사진
      ============================== */}

      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.label}
            className={`hero-slide ${
              current === index ? "active" : ""
            }`}
            aria-hidden={current !== index}
          >
            <Image
              src={slide.image}
              alt={`${slide.label} 싱크볼 시공 사진`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-photo"
              style={{
                objectPosition: slide.position,
              }}
            />
          </div>
        ))}

        <div className="hero-overlay" />

        <div className="hero-photo-top">
          <p>SINKMOA REAL INSTALLATION</p>

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
            <p>REAL KITCHEN TRANSFORMATION</p>

            <h1>
              {slides[current].description}
            </h1>
          </div>

          <div className="slide-controls">
            {slides.map((slide, index) => (
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
                aria-pressed={current === index}
              >
                <span className="control-line" />
                <span className="control-label">
                  {slide.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================
          메인 소개 및 버튼
      ============================== */}

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

      {/* ==============================
          싱크모아 소개
      ============================== */}

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
          더 나은 주방을 위한 과정을 함께합니다.
        </p>
      </section>

      {/* ==============================
          브랜드별 상품
      ============================== */}

      <section
        className="brands-section"
        id="brands"
      >
        <div className="section-heading">
          <p className="section-label">
            CURATED COLLECTION
          </p>

          <h2>브랜드별 상품</h2>

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
                    COLLECTION {brand.number}
                    {" · "}
                    {brand.korean}
                  </p>

                  <h3>{brand.name}</h3>
                </div>

                <span className="brand-arrow">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==============================
          설치 서비스
      ============================== */}

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
            <span>기본 설치비</span>
            <strong>170,000원</strong>
          </div>

          <p className="service-note">
            기존 싱크볼 철거, 기존 수전 및
            배수구 연결 시공 포함
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

      {/* ==============================
          신규: 지역별 설치 안내
      ============================== */}

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
              {" "}설치 안내
            </h2>

            <p>
              서울·경기·인천·충남·충북
              <br />
              지역을 선택해 싱크볼 교체 및
              설치 안내를 확인하세요.
            </p>
          </div>

          <div className="regions-summary">
            <div>
              <span>INSTALLATION AREAS</span>
              <strong>5개 광역 지역</strong>
            </div>

            <div>
              <span>DISTRICT GUIDES</span>
              <strong>
                {totalDistricts}개 시·군·구
              </strong>
            </div>

            <div>
              <span>INSTALLATION FEE</span>
              <strong>기본 170,000원</strong>
            </div>
          </div>

          <div
            className="region-tabs"
            role="tablist"
            aria-label="설치 안내 지역 선택"
          >
            {REGION_ORDER.map((slug) => {
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
                    active ? "active" : ""
                  }`}
                  onClick={() =>
                    setSelectedRegion(slug)
                  }
                >
                  <span>{regionData.name}</span>

                  <small>
                    {
                      regionData.districts
                        .length
                    }개 지역
                  </small>
                </button>
              );
            })}
          </div>

          <div
            className="region-panel"
            id="region-district-panel"
            role="tabpanel"
            aria-labelledby={`region-tab-${selectedRegion}`}
          >
            <div className="region-panel-heading">
              <div>
                <p>SELECT YOUR DISTRICT</p>

                <h3>
                  {activeRegion.name} 싱크볼
                  교체·설치
                </h3>

                <span>
                  원하는 지역을 선택하면
                  해당 지역의 설치 안내
                  페이지로 이동합니다.
                </span>
              </div>

              <span className="region-count">
                {
                  activeRegion.districts
                    .length
                }
                <small> AREAS</small>
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

                    <span
                      className="district-arrow"
                      aria-hidden="true"
                    >
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

      {/* ==============================
          주문 문의
      ============================== */}

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

      {/* ==============================
          푸터
      ============================== */}

      <footer className="footer">
        <div className="footer-inner">
          <h2>SINKMOA</h2>

          <p>
            프리미엄 싱크볼 판매 및 설치 전문몰
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
            설치 상담 지역: 서울 · 경기 · 인천 ·
            충남 · 충북
          </p>

          <p className="copyright">
            © {new Date().getFullYear()} SINKMOA.
            All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ==============================
          전체 스타일
      ============================== */}

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

        .sinkmoa-home #brands,
        .sinkmoa-home #service,
        .sinkmoa-home #regions {
          scroll-margin-top: 20px;
        }

        /* 헤더 */

        .sinkmoa-home .site-header {
          position: relative;
          z-index: 30;
          background: #111a1e;
          border-bottom: 1px solid
            rgba(255,255,255,.15);
        }

        .sinkmoa-home .header-inner {
          max-width: 1360px;
          width: calc(100% - 80px);
          height: 94px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sinkmoa-home .logo {
          color: #fff;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: .22em;
        }

        .sinkmoa-home .desktop-nav {
          display: flex;
          gap: 34px;
          align-items: center;
        }

        .sinkmoa-home .desktop-nav a {
          color: rgba(255,255,255,.9);
          font-size: 13px;
          transition: color .2s;
        }

        .sinkmoa-home .desktop-nav a:hover {
          color: #c4b49a;
        }

        .sinkmoa-home .menu-button {
          display: none;
          padding: 10px;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .sinkmoa-home .menu-button span {
          display: block;
          width: 25px;
          height: 1px;
          margin: 6px 0;
          background: white;
        }

        .sinkmoa-home .mobile-nav {
          display: none;
        }

        /* 메인 사진 */

        .sinkmoa-home .hero {
          position: relative;
          height: min(780px, 80svh);
          min-height: 530px;
          overflow: hidden;
          background: #111a1e;
        }

        .sinkmoa-home .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1s ease;
          pointer-events: none;
        }

        .sinkmoa-home .hero-slide.active {
          opacity: 1;
        }

        .sinkmoa-home .hero-photo {
          object-fit: cover;
          filter: brightness(1);
          transform: scale(1);
          transition: transform 5s linear;
        }

        .sinkmoa-home .hero-slide.active .hero-photo {
          transform: scale(1.025);
        }

        .sinkmoa-home .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(7,15,19,.30) 0%,
            rgba(7,15,19,.04) 35%,
            rgba(7,15,19,.06) 65%,
            rgba(7,15,19,.48) 100%
          );
          pointer-events: none;
        }

        .sinkmoa-home .hero-photo-top {
          position: absolute;
          z-index: 2;
          top: 35px;
          left: 0;
          right: 0;
          text-align: center;
          color: white;
        }

        .sinkmoa-home .hero-photo-top > p {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .24em;
          margin: 0 0 18px;
          text-shadow: 0 2px 12px
            rgba(0,0,0,.55);
        }

        .sinkmoa-home .hero-photo-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 20px;
          border: 1px solid
            rgba(255,255,255,.75);
          background: rgba(10,18,22,.48);
          backdrop-filter: blur(5px);
          color: white;
          font-size: 13px;
        }

        .sinkmoa-home .hero-photo-badge strong {
          letter-spacing: .2em;
        }

        .sinkmoa-home .badge-dot {
          width: 7px;
          height: 7px;
          background: #c4b49a;
          border-radius: 50%;
        }

        .sinkmoa-home .badge-divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,.5);
        }

        .sinkmoa-home .hero-photo-bottom {
          position: absolute;
          z-index: 2;
          left: 0;
          right: 0;
          bottom: 30px;
          max-width: 1360px;
          width: calc(100% - 80px);
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 25px;
        }

        .sinkmoa-home .photo-caption {
          color: white;
          text-shadow: 0 2px 15px
            rgba(0,0,0,.7);
        }

        .sinkmoa-home .photo-caption p {
          font-size: 10px;
          letter-spacing: .22em;
          color: #e8d4b5;
          margin: 0 0 10px;
        }

        .sinkmoa-home .photo-caption h1 {
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 400;
          margin: 0;
        }

        .sinkmoa-home .slide-controls {
          display: flex;
          gap: 16px;
          flex-shrink: 0;
        }

        .sinkmoa-home .slide-controls button {
          border: 0;
          padding: 0;
          background: transparent;
          cursor: pointer;
          color: rgba(255,255,255,.7);
          text-align: left;
        }

        .sinkmoa-home .control-line {
          display: block;
          width: 95px;
          height: 3px;
          background: rgba(255,255,255,.55);
          margin-bottom: 9px;
        }

        .sinkmoa-home .selected .control-line {
          background: #d9bd92;
        }

        .sinkmoa-home .selected .control-label {
          color: #e4c99f;
        }

        .sinkmoa-home .control-label {
          font-size: 10px;
          letter-spacing: .17em;
        }

        /* 메인 소개 */

        .sinkmoa-home .hero-intro {
          padding: 105px 24px 115px;
          background: #19262b;
          text-align: center;
          color: white;
        }

        .sinkmoa-home .section-label {
          color: #b9a17d;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .23em;
          margin: 0 0 22px;
        }

        .sinkmoa-home .hero-intro h2 {
          font-size: clamp(38px, 5vw, 65px);
          line-height: 1.4;
          font-weight: 400;
          letter-spacing: -.05em;
          margin: 0;
        }

        .sinkmoa-home .gold-line {
          width: 40px;
          height: 1px;
          background: #b6a080;
          margin: 30px auto;
        }

        .sinkmoa-home .hero-intro-description {
          color: #d0d2d1;
          font-size: 15px;
          line-height: 2;
          margin: 0 0 34px;
        }

        .sinkmoa-home .hero-intro-actions {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .sinkmoa-home .hero-primary,
        .sinkmoa-home .hero-secondary {
          min-width: 240px;
          padding: 20px 24px;
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          font-size: 13px;
          font-weight: 700;
          transition: transform .25s;
        }

        .sinkmoa-home .hero-primary {
          background: #c4b49a;
          color: #19262b;
        }

        .sinkmoa-home .hero-secondary {
          background: transparent;
          color: white;
          border: 1px solid
            rgba(255,255,255,.65);
        }

        .sinkmoa-home .hero-primary:hover,
        .sinkmoa-home .hero-secondary:hover {
          transform: translateY(-2px);
        }

        /* 싱크모아 소개 */

        .sinkmoa-home .intro-section {
          padding: 130px 24px;
          text-align: center;
          background: #f7f5f0;
        }

        .sinkmoa-home .intro-section h2 {
          font-size: clamp(34px, 4vw, 55px);
          line-height: 1.5;
          font-weight: 400;
          letter-spacing: -.05em;
          margin: 0;
        }

        .sinkmoa-home .intro-description {
          font-size: 15px;
          line-height: 2.2;
          color: #777;
          margin: 0;
        }

        /* 브랜드 */

        .sinkmoa-home .brands-section {
          padding: 110px 24px 130px;
          background: #eeeae3;
        }

        .sinkmoa-home .section-heading {
          text-align: center;
          margin-bottom: 60px;
        }

        .sinkmoa-home .section-heading h2 {
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 400;
          letter-spacing: -.05em;
          margin: 0 0 16px;
        }

        .sinkmoa-home .section-heading > p:last-child {
          color: #777;
          font-size: 14px;
          line-height: 1.9;
        }

        .sinkmoa-home .brand-grid {
          max-width: 1360px;
          margin: auto;
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0,1fr));
          gap: 24px;
        }

        .sinkmoa-home .brand-card {
          display: block;
          background: #f7f5f0;
          color: #19262b;
          overflow: hidden;
        }

        .sinkmoa-home .brand-image {
          position: relative;
          aspect-ratio: 1.35;
          background: #e4e4e4;
          overflow: hidden;
        }

        .sinkmoa-home .brand-photo {
          object-fit: contain;
          transition: transform .4s;
        }

        .sinkmoa-home .brand-card:hover .brand-photo {
          transform: scale(1.04);
        }

        .sinkmoa-home .brand-info {
          padding: 26px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sinkmoa-home .brand-info p {
          font-size: 10px;
          letter-spacing: .14em;
          color: #9a8567;
          margin: 0 0 8px;
        }

        .sinkmoa-home .brand-info h3 {
          font-size: 26px;
          font-weight: 400;
          letter-spacing: .07em;
          margin: 0;
        }

        .sinkmoa-home .brand-arrow {
          font-size: 24px;
          color: #9a8567;
        }

        /* 설치 서비스 */

        .sinkmoa-home .service-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 600px;
          background: white;
        }

        .sinkmoa-home .service-image {
          position: relative;
          min-height: 550px;
          background: #e4e4e4;
        }

        .sinkmoa-home .service-photo {
          object-fit: contain;
        }

        .sinkmoa-home .service-content {
          padding: 90px max(40px, 8vw);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }

        .sinkmoa-home .service-content h2 {
          font-size: clamp(34px, 3.8vw, 53px);
          font-weight: 400;
          line-height: 1.45;
          letter-spacing: -.05em;
          margin: 0;
        }

        .sinkmoa-home .service-content .gold-line {
          margin: 30px 0;
        }

        .sinkmoa-home .service-description {
          color: #777;
          font-size: 15px;
          line-height: 2;
          margin: 0 0 30px;
        }

        .sinkmoa-home .service-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 35px;
          border: 1px solid #ded6c8;
          padding: 19px 23px;
          width: min(100%, 400px);
        }

        .sinkmoa-home .service-price span {
          font-size: 14px;
        }

        .sinkmoa-home .service-price strong {
          color: #a18b69;
          font-size: 25px;
        }

        .sinkmoa-home .service-note {
          color: #777;
          font-size: 12px;
          line-height: 1.9;
          margin: 20px 0 30px;
        }

        .sinkmoa-home .gold-button {
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          padding: 18px 24px;
          background: #c4b49a;
          color: #19262b;
          font-size: 13px;
          font-weight: 700;
        }

        /* 지역별 설치 안내 */

        .sinkmoa-home .regions-section {
          padding: 115px 24px 125px;
          background: #f7f5f0;
        }

        .sinkmoa-home .regions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sinkmoa-home .regions-section
        .section-heading {
          margin-bottom: 43px;
        }

        .sinkmoa-home .regions-summary {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0,1fr));
          gap: 1px;
          background: #ddd5c9;
          border: 1px solid #ddd5c9;
          margin-bottom: 35px;
        }

        .sinkmoa-home .regions-summary > div {
          background: #fff;
          padding: 27px 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sinkmoa-home .regions-summary span {
          color: #a18b69;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .13em;
        }

        .sinkmoa-home .regions-summary strong {
          color: #19262b;
          font-size: 19px;
          font-weight: 600;
        }

        .sinkmoa-home .region-tabs {
          display: grid;
          grid-template-columns:
            repeat(5, minmax(0,1fr));
          gap: 8px;
          margin-bottom: 15px;
        }

        .sinkmoa-home .region-tab {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          min-height: 86px;
          border: 1px solid #ddd5c9;
          background: #fff;
          color: #19262b;
          cursor: pointer;
          transition:
            background .2s,
            border-color .2s,
            color .2s;
        }

        .sinkmoa-home .region-tab span {
          font-size: 18px;
          font-weight: 600;
        }

        .sinkmoa-home .region-tab small {
          color: #888;
          font-size: 11px;
        }

        .sinkmoa-home .region-tab.active {
          background: #19262b;
          border-color: #19262b;
          color: #fff;
        }

        .sinkmoa-home .region-tab.active small {
          color: #c4b49a;
        }

        .sinkmoa-home .region-tab:hover:not(.active) {
          border-color: #b9a17d;
          background: #f1ede6;
        }

        .sinkmoa-home .region-panel {
          background: white;
          border: 1px solid #e2dacf;
          padding: 35px;
        }

        .sinkmoa-home .region-panel-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 25px;
          margin-bottom: 25px;
          border-bottom: 1px solid #e9e3d9;
        }

        .sinkmoa-home .region-panel-heading p {
          margin: 0 0 10px;
          color: #a18b69;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
        }

        .sinkmoa-home .region-panel-heading h3 {
          margin: 0 0 11px;
          font-size: 25px;
          font-weight: 600;
          letter-spacing: -.04em;
        }

        .sinkmoa-home .region-panel-heading
        div > span {
          color: #888;
          font-size: 12px;
          line-height: 1.8;
        }

        .sinkmoa-home .region-count {
          color: #b9a17d;
          font-size: 34px;
          font-weight: 400;
          white-space: nowrap;
        }

        .sinkmoa-home .region-count small {
          font-size: 10px;
          letter-spacing: .1em;
        }

        .sinkmoa-home .district-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0,1fr));
          gap: 10px;
        }

        .sinkmoa-home .district-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
          padding: 16px;
          border: 1px solid #e9e3d9;
          background: #faf9f6;
          color: #19262b;
          font-size: 13px;
          font-weight: 600;
          transition:
            border-color .2s,
            background .2s,
            transform .2s;
        }

        .sinkmoa-home .district-link:hover {
          border-color: #b9a17d;
          background: #f2ede5;
          transform: translateY(-2px);
        }

        .sinkmoa-home .district-arrow {
          color: #a18b69;
          font-size: 17px;
          flex-shrink: 0;
        }

        .sinkmoa-home .regions-notice {
          display: flex;
          align-items: center;
          gap: 17px;
          margin-top: 19px;
          padding: 24px 28px;
          background: #eae4d9;
        }

        .sinkmoa-home .regions-notice-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          border: 1px solid #a18b69;
          border-radius: 50%;
          color: #927b5a;
          font-size: 14px;
          font-weight: 700;
        }

        .sinkmoa-home .regions-notice p {
          flex: 1;
          margin: 0;
          color: #625e57;
          font-size: 12px;
          line-height: 1.9;
        }

        .sinkmoa-home .regions-notice a {
          flex-shrink: 0;
          background: #19262b;
          color: white;
          padding: 15px 19px;
          font-size: 12px;
          font-weight: 700;
        }

        .sinkmoa-home .mobile-only {
          display: none;
        }

        /* 주문 문의 */

        .sinkmoa-home .order-section {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 120px 24px;
        }

        .sinkmoa-home .order-section h2 {
          font-size: clamp(36px, 5vw, 60px);
          line-height: 1.45;
          font-weight: 400;
          margin: 0;
        }

        .sinkmoa-home .order-section
        > p:not(.section-label) {
          color: #c4cbca;
          line-height: 2;
          margin: 25px 0 35px;
        }

        /* 푸터 */

        .sinkmoa-home .footer {
          background: #111a1e;
          color: white;
          padding: 65px 24px;
        }

        .sinkmoa-home .footer-inner {
          max-width: 1360px;
          margin: auto;
        }

        .sinkmoa-home .footer h2 {
          letter-spacing: .22em;
          font-size: 25px;
          margin: 0 0 14px;
        }

        .sinkmoa-home .footer p {
          color: #b3b7b7;
          font-size: 13px;
        }

        .sinkmoa-home .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 30px 0;
        }

        .sinkmoa-home .footer-links a {
          color: #e4e4e4;
          font-size: 12px;
        }

        .sinkmoa-home .footer-regions {
          margin-bottom: 24px;
          font-size: 12px;
        }

        .sinkmoa-home .copyright {
          padding-top: 22px;
          border-top: 1px solid
            rgba(255,255,255,.12);
        }

        /* 태블릿 */

        @media (max-width: 900px) {
          .sinkmoa-home .desktop-nav {
            display: none;
          }

          .sinkmoa-home .menu-button {
            display: block;
          }

          .sinkmoa-home .mobile-nav {
            display: flex;
            flex-direction: column;
            padding: 12px 30px 22px;
            background: #111a1e;
          }

          .sinkmoa-home .mobile-nav a {
            color: white;
            font-size: 14px;
            padding: 16px 0;
            border-bottom: 1px solid
              rgba(255,255,255,.12);
          }

          .sinkmoa-home .service-section {
            grid-template-columns: 1fr;
          }

          .sinkmoa-home .service-image {
            min-height: 400px;
          }

          .sinkmoa-home .service-content {
            padding: 65px 30px;
          }

          .sinkmoa-home .district-grid {
            grid-template-columns:
              repeat(3, minmax(0,1fr));
          }

          .sinkmoa-home .regions-notice {
            flex-wrap: wrap;
          }

          .sinkmoa-home .regions-notice a {
            margin-left: 47px;
          }
        }

        /* 모바일 */

        @media (max-width: 600px) {
          .sinkmoa-home .header-inner {
            width: calc(100% - 44px);
            height: 82px;
          }

          .sinkmoa-home .logo {
            font-size: 22px;
          }

          .sinkmoa-home .hero {
            height: 72svh;
            min-height: 480px;
            max-height: 720px;
          }

          .sinkmoa-home .hero-photo {
            object-fit: contain;
            object-position: center;
          }

          .sinkmoa-home .hero-overlay {
            background: linear-gradient(
              180deg,
              rgba(7,15,19,.30) 0%,
              transparent 27%,
              transparent 68%,
              rgba(7,15,19,.58) 100%
            );
          }

          .sinkmoa-home .hero-photo-top {
            top: 20px;
          }

          .sinkmoa-home .hero-photo-top > p {
            font-size: 9px;
            margin-bottom: 12px;
          }

          .sinkmoa-home .hero-photo-badge {
            padding: 10px 15px;
            font-size: 12px;
          }

          .sinkmoa-home .hero-photo-bottom {
            width: calc(100% - 36px);
            bottom: 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 18px;
          }

          .sinkmoa-home .photo-caption h1 {
            font-size: 25px;
          }

          .sinkmoa-home .slide-controls {
            gap: 14px;
          }

          .sinkmoa-home .control-line {
            width: 90px;
          }

          .sinkmoa-home .hero-intro {
            padding: 80px 22px 90px;
          }

          .sinkmoa-home .hero-intro h2 {
            font-size: 39px;
          }

          .sinkmoa-home .hero-intro-description {
            font-size: 13px;
          }

          .sinkmoa-home .hero-intro-actions {
            flex-direction: column;
          }

          .sinkmoa-home .hero-primary,
          .sinkmoa-home .hero-secondary {
            width: 100%;
          }

          .sinkmoa-home .intro-section {
            padding: 95px 22px;
          }

          .sinkmoa-home .intro-description {
            font-size: 13px;
          }

          .sinkmoa-home .brands-section {
            padding: 85px 18px 100px;
          }

          .sinkmoa-home .brand-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .sinkmoa-home .brand-image {
            aspect-ratio: 1.45;
          }

          .sinkmoa-home .brand-info {
            padding: 20px 22px;
          }

          .sinkmoa-home .brand-info h3 {
            font-size: 23px;
          }

          .sinkmoa-home .service-image {
            min-height: 330px;
          }

          .sinkmoa-home .service-content {
            padding: 65px 24px;
          }

          .sinkmoa-home .service-price strong {
            font-size: 22px;
          }

          /* 모바일 지역별 안내 */

          .sinkmoa-home .regions-section {
            padding: 85px 16px 95px;
          }

          .sinkmoa-home .regions-section
          .section-heading {
            margin-bottom: 30px;
          }

          .sinkmoa-home .mobile-only {
            display: block;
          }

          .sinkmoa-home .regions-summary {
            grid-template-columns: 1fr 1fr;
            margin-bottom: 24px;
          }

          .sinkmoa-home .regions-summary > div {
            padding: 21px 9px;
            gap: 10px;
          }

          .sinkmoa-home .regions-summary
          > div:last-child {
            grid-column: 1 / -1;
          }

          .sinkmoa-home .regions-summary span {
            font-size: 9px;
          }

          .sinkmoa-home .regions-summary strong {
            font-size: 15px;
          }

          .sinkmoa-home .region-tabs {
            grid-template-columns:
              repeat(5, minmax(0,1fr));
            gap: 4px;
          }

          .sinkmoa-home .region-tab {
            min-height: 70px;
            gap: 7px;
          }

          .sinkmoa-home .region-tab span {
            font-size: 13px;
          }

          .sinkmoa-home .region-tab small {
            font-size: 9px;
          }

          .sinkmoa-home .region-panel {
            padding: 22px 15px;
          }

          .sinkmoa-home .region-panel-heading {
            gap: 10px;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }

          .sinkmoa-home .region-panel-heading h3 {
            font-size: 19px;
          }

          .sinkmoa-home .region-panel-heading
          div > span {
            font-size: 11px;
          }

          .sinkmoa-home .region-count {
            font-size: 25px;
          }

          .sinkmoa-home .district-grid {
            grid-template-columns:
              repeat(2, minmax(0,1fr));
            gap: 8px;
          }

          .sinkmoa-home .district-link {
            padding: 15px 12px;
            font-size: 12px;
          }

          .sinkmoa-home .regions-notice {
            align-items: flex-start;
            padding: 20px 16px;
            gap: 12px;
          }

          .sinkmoa-home .regions-notice p {
            flex-basis: calc(100% - 50px);
            font-size: 11px;
          }

          .sinkmoa-home .regions-notice a {
            margin-left: 42px;
            padding: 14px 18px;
          }

          .sinkmoa-home .order-section {
            padding: 95px 22px;
          }
        }

        @media (max-width: 360px) {
          .sinkmoa-home .region-tab span {
            font-size: 12px;
          }

          .sinkmoa-home .region-tab small {
            font-size: 8px;
          }

          .sinkmoa-home .district-link {
            padding: 13px 9px;
            font-size: 11px;
          }
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .sinkmoa-home .hero-photo {
            transition: none;
            transform: none !important;
          }

          .sinkmoa-home .hero-slide {
            transition: none;
          }

          .sinkmoa-home .district-link,
          .sinkmoa-home .region-tab {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
