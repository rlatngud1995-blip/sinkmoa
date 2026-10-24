
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/hero-1.jpg",
    eyebrow: "THE ART OF KITCHEN LIVING",
    title: "주방의 품격을\n완성하다.",
    description:
      "공간의 아름다움과 일상의 편리함을 위한 선택.",
  },
  {
    image: "/hero-2.jpg",
    eyebrow: "TIMELESS KITCHEN COLLECTION",
    title: "일상의 공간을\n특별하게.",
    description:
      "오래도록 만족할 수 있는 프리미엄 싱크볼 컬렉션.",
  },
  {
    image: "/hero-3.jpg",
    eyebrow: "SINKMOA INSTALLATION",
    title: "좋은 선택에서\n완벽한 마무리까지.",
    description:
      "제품 선택부터 설치 상담까지, 싱크모아.",
  },
];

const brands = [
  {
    name: "REGENS",
    korean: "리젠스",
    image: "/brand-regens.jpg",
    slug: "regens",
    number: "01",
  },
  {
    name: "BELLAGO",
    korean: "벨라고",
    image: "/brand-bellago.jpg",
    slug: "bellago",
    number: "02",
  },
  {
    name: "ARTISAN",
    korean: "아티잔",
    image: "/brand-artisan.jpg",
    slug: "artisan",
    number: "03",
  },
  {
    name: "BAEKJO",
    korean: "백조",
    image: "/brand-baekjo.jpg",
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
    label: "구매·배송 안내",
    href: "/guide",
  },
  {
    label: "주문·견적 문의",
    href: "/order",
  },
];

const installationImage =
  "/E7583A13-ED40-4C57-A2F1-3E16709A382D.jpeg";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="sinkmoa-home">
      <style jsx global>{`
        .sinkmoa-home {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          --muted: #777b7a;
          background: var(--ivory);
          color: var(--ink);
          overflow-x: hidden;
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
          word-break: keep-all;
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

        .sinkmoa-home .site-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 30;
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,.22);
        }

        .sinkmoa-home .header-inner {
          width: min(1360px, calc(100% - 80px));
          margin: auto;
          height: 94px;
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
          align-items: center;
          gap: 34px;
        }

        .sinkmoa-home .desktop-nav a {
          color: rgba(255,255,255,.9);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -.02em;
          transition: color .25s;
        }

        .sinkmoa-home .desktop-nav a:hover {
          color: #e9d4b1;
        }

        .sinkmoa-home .menu-button {
          display: none;
          border: 0;
          background: none;
          cursor: pointer;
          padding: 12px;
        }

        .sinkmoa-home .menu-button span {
          display: block;
          width: 25px;
          height: 1px;
          background: white;
          margin: 6px 0;
          transition: transform .2s, opacity .2s;
        }

        .sinkmoa-home .menu-button.open span:first-child {
          transform: translateY(7px) rotate(45deg);
        }

        .sinkmoa-home .menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .sinkmoa-home .menu-button.open span:last-child {
          transform: translateY(-7px) rotate(-45deg);
        }

        .sinkmoa-home .mobile-nav {
          display: none;
        }

        .sinkmoa-home .hero {
          height: min(850px, 100svh);
          min-height: 640px;
          position: relative;
          display: flex;
          align-items: center;
          background: #172328;
          overflow: hidden;
        }

        .sinkmoa-home .hero-slide {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          opacity: 0;
          transform: scale(1.045);
          transition: opacity 1.1s ease,
            transform 6s ease;
        }

        .sinkmoa-home .hero-slide.active {
          opacity: 1;
          transform: scale(1);
        }

        .sinkmoa-home .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(10,18,22,.42),
            rgba(10,18,22,.06)
          );
          pointer-events: none;
        }

        .sinkmoa-home .hero-content {
          width: min(1360px, calc(100% - 80px));
          margin: auto;
          position: relative;
          z-index: 2;
          padding-top: 80px;
          color: #fff;
        }

        .sinkmoa-home .eyebrow {
          color: #d6c4a8;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .32em;
          margin: 0 0 29px;
        }

        .sinkmoa-home .hero h1 {
          font-size: clamp(48px, 6.5vw, 96px);
          font-weight: 400;
          line-height: 1.18;
          letter-spacing: -.055em;
          white-space: pre-line;
          margin: 0;
        }

        .sinkmoa-home .hero-description {
          font-size: 15px;
          line-height: 2;
          color: rgba(255,255,255,.82);
          margin: 28px 0 36px;
        }

        .sinkmoa-home .outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 44px;
          min-width: 240px;
          padding: 18px 22px;
          color: #fff;
          border: 1px solid rgba(255,255,255,.7);
          font-size: 13px;
          font-weight: 600;
          transition: background .25s, color .25s;
        }

        .sinkmoa-home .outline-button:hover {
          background: #fff;
          color: var(--ink);
        }

        .sinkmoa-home .slide-controls {
          position: absolute;
          bottom: 54px;
          left: max(40px, calc((100% - 1360px) / 2));
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 3;
        }

        .sinkmoa-home .slide-controls button {
          width: 30px;
          height: 2px;
          padding: 0;
          border: 0;
          background: rgba(255,255,255,.4);
          cursor: pointer;
          transition: all .25s;
        }

        .sinkmoa-home .slide-controls button.selected {
          width: 65px;
          background: #e8d3b0;
        }

        .sinkmoa-home .hero-side-label {
          position: absolute;
          z-index: 3;
          bottom: 53px;
          right: 40px;
          font-size: 10px;
          letter-spacing: .2em;
          color: rgba(255,255,255,.75);
        }

        .sinkmoa-home .intro-section {
          padding: 150px 24px;
          background: #f7f5f0;
          text-align: center;
        }

        .sinkmoa-home .intro-content {
          max-width: 780px;
          margin: auto;
        }

        .sinkmoa-home .section-label {
          color: #a18b69;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .27em;
          margin: 0 0 22px;
        }

        .sinkmoa-home .intro-content h2 {
          font-size: clamp(35px, 4.3vw, 56px);
          line-height: 1.48;
          letter-spacing: -.05em;
          font-weight: 400;
          margin: 0;
        }

        .sinkmoa-home .gold-line {
          width: 40px;
          height: 1px;
          background: #b6a080;
          margin: 33px auto;
        }

        .sinkmoa-home .intro-content > p:last-child {
          font-size: 15px;
          color: #777;
          line-height: 2.2;
          margin: 0;
        }

        .sinkmoa-home .brands-section {
          padding: 110px 24px 140px;
          background: #eeeae3;
        }

        .sinkmoa-home .section-heading {
          text-align: center;
          margin-bottom: 65px;
        }

        .sinkmoa-home .section-heading h2 {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 400;
          letter-spacing: -.045em;
          margin: 0 0 18px;
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 25px;
        }

        .sinkmoa-home .brand-card {
          display: block;
          color: var(--ink);
          background: #f7f5f0;
          overflow: hidden;
          transition: transform .35s;
        }

        .sinkmoa-home .brand-card:hover {
          transform: translateY(-5px);
        }

        .sinkmoa-home .brand-image {
          aspect-ratio: 1.5 / 1;
          background: linear-gradient(
            135deg,
            #d8d1c6,
            #ece6dc
          );
          position: relative;
          overflow: hidden;
        }

        .sinkmoa-home .brand-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .6s;
        }

        .sinkmoa-home .brand-card:hover .brand-image img {
          transform: scale(1.035);
        }

        .sinkmoa-home .brand-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15,25,28,.12),
            transparent 55%
          );
          pointer-events: none;
        }

        .sinkmoa-home .brand-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 32px 35px;
          border-bottom: 1px solid #d9d2c7;
        }

        .sinkmoa-home .brand-info p {
          color: #a18b69;
          font-size: 12px;
          margin: 0 0 9px;
        }

        .sinkmoa-home .brand-info h3 {
          font-size: 28px;
          font-weight: 500;
          letter-spacing: .11em;
          margin: 0;
        }

        .sinkmoa-home .brand-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 45px;
          border: 1px solid #c5b7a2;
          border-radius: 50%;
          font-size: 21px;
          transition: background .25s;
        }

        .sinkmoa-home .brand-card:hover .brand-arrow {
          background: #c4b49a;
        }

        .sinkmoa-home .service-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 680px;
          background: #f7f5f0;
        }

        .sinkmoa-home .service-image {
          background: #ffffff;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .sinkmoa-home .service-image img {
          width: 100%;
          height: auto;
          max-height: 560px;
          display: block;
          object-fit: contain;
        }

        .sinkmoa-home .service-content {
          padding: 90px clamp(35px, 7vw, 120px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .sinkmoa-home .service-content h2 {
          font-size: clamp(35px, 4vw, 56px);
          line-height: 1.4;
          font-weight: 400;
          letter-spacing: -.055em;
          margin: 0;
        }

        .sinkmoa-home .service-content .gold-line {
          margin: 30px 0;
        }

        .sinkmoa-home .service-content > p:not(.section-label):not(.service-note) {
          font-size: 14px;
          line-height: 2.15;
          color: #777;
          margin: 0 0 26px;
        }

        .sinkmoa-home .service-price {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          width: 100%;
          border-top: 1px solid #d9d2c7;
          border-bottom: 1px solid #d9d2c7;
          padding: 21px 0;
        }

        .sinkmoa-home .service-price span {
          font-size: 13px;
          color: #555;
        }

        .sinkmoa-home .service-price strong {
          font-size: 24px;
          font-weight: 500;
        }

        .sinkmoa-home .service-note {
          font-size: 12px;
          color: #888;
          line-height: 2;
          margin: 16px 0 30px;
        }

        .sinkmoa-home .gold-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
          min-width: 220px;
          background: #c4b49a;
          color: #19262b;
          padding: 19px 24px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .04em;
          transition: background .25s;
        }

        .sinkmoa-home .gold-button:hover {
          background: #d7c7ab;
        }

        .sinkmoa-home .order-section {
          text-align: center;
          background: #19262b;
          color: #fff;
          padding: 130px 24px;
        }

        .sinkmoa-home .order-section h2 {
          font-size: clamp(34px, 5vw, 58px);
          font-weight: 400;
          letter-spacing: -.055em;
          line-height: 1.4;
          margin: 0 0 22px;
        }

        .sinkmoa-home .order-section > p:not(.section-label) {
          font-size: 14px;
          color: #c2c9c8;
          line-height: 2;
          margin: 0 0 36px;
        }

        .sinkmoa-home .footer {
          background: #10191d;
          color: #fff;
          padding: 75px 24px 45px;
        }

        .sinkmoa-home .footer-inner {
          max-width: 1360px;
          margin: auto;
        }

        .sinkmoa-home .footer-inner h2 {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: .22em;
          margin: 0 0 15px;
        }

        .sinkmoa-home .footer-inner > p {
          color: #a9b0af;
          font-size: 13px;
          line-height: 1.9;
        }

        .sinkmoa-home .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin: 35px 0 55px;
        }

        .sinkmoa-home .footer-links a {
          color: #d4d8d7;
          font-size: 12px;
        }

        .sinkmoa-home .copyright {
          padding-top: 24px;
          border-top: 1px solid #354044;
          font-size: 11px !important;
        }

        @media (max-width: 900px) {
          .sinkmoa-home .header-inner {
            width: calc(100% - 36px);
            height: 76px;
          }

          .sinkmoa-home .logo {
            font-size: 21px;
          }

          .sinkmoa-home .desktop-nav {
            display: none;
          }

          .sinkmoa-home .menu-button {
            display: block;
          }

          .sinkmoa-home .mobile-nav {
            display: flex;
            flex-direction: column;
            background: #19262b;
            padding: 12px 25px 25px;
          }

          .sinkmoa-home .mobile-nav a {
            color: #fff;
            font-size: 14px;
            padding: 17px 4px;
            border-bottom: 1px solid rgba(255,255,255,.13);
          }

          .sinkmoa-home .hero {
            min-height: 650px;
            height: 90svh;
          }

          .sinkmoa-home .hero-content {
            width: calc(100% - 44px);
            padding-top: 65px;
          }

          .sinkmoa-home .hero h1 {
            font-size: clamp(44px, 9vw, 70px);
          }

          .sinkmoa-home .hero-description {
            font-size: 13px;
          }

          .sinkmoa-home .slide-controls {
            left: 22px;
            bottom: 35px;
          }

          .sinkmoa-home .hero-side-label {
            right: 22px;
            bottom: 33px;
          }

          .sinkmoa-home .intro-section {
            padding: 95px 22px;
          }

          .sinkmoa-home .brands-section {
            padding: 80px 16px 100px;
          }

          .sinkmoa-home .brand-grid {
            gap: 16px;
          }

          .sinkmoa-home .brand-info {
            padding: 24px;
          }

          .sinkmoa-home .service-section {
            grid-template-columns: 1fr;
          }

          .sinkmoa-home .service-image {
            min-height: 300px;
            padding: 30px 20px;
          }

          .sinkmoa-home .service-image img {
            max-height: 400px;
          }

          .sinkmoa-home .service-content {
            padding: 70px 30px;
          }
        }

        @media (max-width: 600px) {
          .sinkmoa-home .hero h1 {
            font-size: 47px;
          }

          .sinkmoa-home .hero-side-label {
            display: none;
          }

          .sinkmoa-home .eyebrow {
            font-size: 9px;
            letter-spacing: .2em;
          }

          .sinkmoa-home .intro-content h2 {
            font-size: 35px;
          }

          .sinkmoa-home .intro-content > p:last-child {
            font-size: 13px;
          }

          .sinkmoa-home .brand-grid {
            grid-template-columns: 1fr;
          }

          .sinkmoa-home .brand-info h3 {
            font-size: 24px;
          }

          .sinkmoa-home .brand-image {
            aspect-ratio: 1.45 / 1;
          }

          .sinkmoa-home .section-heading {
            margin-bottom: 40px;
          }

          .sinkmoa-home .section-heading h2 {
            font-size: 37px;
          }

          .sinkmoa-home .service-image {
            min-height: 250px;
            padding: 20px 15px;
          }

          .sinkmoa-home .service-image img {
            max-height: 320px;
          }

          .sinkmoa-home .service-content {
            padding: 65px 23px;
          }

          .sinkmoa-home .order-section {
            padding: 95px 20px;
          }

          .sinkmoa-home .footer {
            padding: 60px 22px 30px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sinkmoa-home *,
          .sinkmoa-home *::before,
          .sinkmoa-home *::after {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
      `}</style>

      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav
            className="desktop-nav"
            aria-label="주 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`menu-button ${
              menuOpen ? "open" : ""
            }`}
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label={
              menuOpen ? "메뉴 닫기" : "메뉴 열기"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
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

      <section className="hero">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`hero-slide ${
              current === index ? "active" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(
                rgba(10,18,22,.3),
                rgba(10,18,22,.6)
              ), url("${slide.image}")`,
            }}
          />
        ))}

        <div className="hero-content">
          <p className="eyebrow">
            {slides[current].eyebrow}
          </p>

          <h1>{slides[current].title}</h1>

          <p className="hero-description">
            {slides[current].description}
          </p>

          <Link
            href="/#brands"
            className="outline-button"
          >
            브랜드별 상품 보기
            <span>↗</span>
          </Link>
        </div>

        <div className="slide-controls">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.image}
              onClick={() => setCurrent(index)}
              className={
                current === index ? "selected" : ""
              }
              aria-label={`슬라이드 ${index + 1}`}
              aria-pressed={current === index}
            />
          ))}
        </div>

        <span className="hero-side-label">
          SINKMOA — PREMIUM KITCHEN
        </span>
      </section>

      <section className="intro-section" id="about">
        <div className="intro-content">
          <p className="section-label">
            THE SINKMOA STORY
          </p>

          <h2>
            주방이라는 공간에
            <br />
            새로운 가치를 더하다.
          </h2>

          <div className="gold-line" />

          <p>
            일상의 작은 순간이 머무는 주방.
            <br />
            싱크모아는 공간의 분위기와 사용성을
            함께 고려한 싱크볼을 소개합니다.
            <br />
            제품 선택부터 설치 상담까지,
            더 나은 주방을 위한 과정을 함께합니다.
          </p>
        </div>
      </section>

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
                <img
                  src={brand.image}
                  alt={`${brand.korean} 싱크볼`}
                  loading="lazy"
                />
              </div>

              <div className="brand-info">
                <div>
                  <p>
                    COLLECTION {brand.number} ·{" "}
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

      <section
        className="service-section"
        id="service"
      >
        <div className="service-image">
          <img
            src={installationImage}
            alt="싱크모아 싱크볼 구성품 및 설치 서비스 안내"
            loading="lazy"
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

          <p>
            제품만 구매하거나 설치 서비스를
            함께 신청할 수 있습니다.
            기존 싱크볼의 상판 타공 사이즈와
            설치 환경을 확인하고
            적합한 시공 방법을 안내합니다.
          </p>

          <div className="service-price">
            <span>기본 설치비</span>
            <strong>170,000원</strong>
          </div>

          <p className="service-note">
            기존 싱크볼 철거 및 새 싱크볼 설치,
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
          제품 구매부터 설치 상담까지,
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

      <footer className="footer">
        <div className="footer-inner">
          <h2>SINKMOA</h2>

          <p>
            프리미엄 싱크볼 판매 및 설치 전문몰
          </p>

          <nav
            className="footer-links"
            aria-label="하단 메뉴"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
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
    </main>
  );
}
