
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* =========================================
   SINKMOA 메인 홈페이지

   BEFORE / AFTER 시공 사진
   실제 GitHub 업로드 파일

   BEFORE: /IMG_0305.jpeg
   AFTER : /IMG_0395.jpeg

   설치 서비스 구성품 사진 복구
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
  { label: "브랜드별 상품", href: "/#brands" },
  { label: "설치 서비스", href: "/#service" },
  { label: "주문·견적 문의", href: "/order" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

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

          <nav className="desktop-nav">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="menu-button"
            aria-label="메뉴 열기 또는 닫기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
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
          메인 BEFORE / AFTER
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
            <strong>{slides[current].label}</strong>
            <span className="badge-divider" />
            <span>{slides[current].korean}</span>
          </div>
        </div>

        <div className="hero-photo-bottom">
          <div className="photo-caption">
            <p>REAL KITCHEN TRANSFORMATION</p>
            <h1>{slides[current].description}</h1>
          </div>

          <div className="slide-controls">
            {slides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                className={
                  current === index ? "selected" : ""
                }
                onClick={() => setCurrent(index)}
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
          <Link href="/#brands" className="hero-primary">
            브랜드별 상품 보기
            <span>↗</span>
          </Link>

          <Link href="/order" className="hero-secondary">
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

      <section className="brands-section" id="brands">
        <div className="section-heading">
          <p className="section-label">
            CURATED COLLECTION
          </p>

          <h2>브랜드별 상품</h2>

          <p>
            당신의 주방에 어울리는 브랜드를 선택하세요.
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
                    COLLECTION {brand.number} · {brand.korean}
                  </p>
                  <h3>{brand.name}</h3>
                </div>

                <span className="brand-arrow">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==============================
          설치 서비스 - 구성품 사진 복구
      ============================== */}

      <section className="service-section" id="service">
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

          <Link href="/order" className="gold-button">
            설치 상담하기
            <span>↗</span>
          </Link>
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

        <Link href="/order" className="gold-button">
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

          <p>프리미엄 싱크볼 판매 및 설치 전문몰</p>

          <nav className="footer-links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

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

        /* 헤더 */

        .sinkmoa-home .site-header {
          position: relative;
          z-index: 30;
          background: #111a1e;
          border-bottom: 1px solid rgba(255,255,255,.15);
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
          text-shadow: 0 2px 12px rgba(0,0,0,.55);
        }

        .sinkmoa-home .hero-photo-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 20px;
          border: 1px solid rgba(255,255,255,.75);
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
          text-shadow: 0 2px 15px rgba(0,0,0,.7);
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
          border: 1px solid rgba(255,255,255,.65);
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
        }

        .sinkmoa-home .brand-grid {
          max-width: 1360px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
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

        .sinkmoa-home .order-section > p:not(.section-label) {
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

        .sinkmoa-home .copyright {
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.12);
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
            border-bottom: 1px solid rgba(255,255,255,.12);
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

          .sinkmoa-home .order-section {
            padding: 95px 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sinkmoa-home .hero-photo {
            transition: none;
            transform: none !important;
          }

          .sinkmoa-home .hero-slide {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
