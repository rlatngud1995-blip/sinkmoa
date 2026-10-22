
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    description: "디자인과 실용성을 모두 담은 프리미엄 싱크볼.",
  },
  {
    image: "/hero-3.jpg",
    eyebrow: "SINKMOA INSTALLATION SERVICE",
    title: "완성도 높은 주방의 시작.",
    description: "제품 선택부터 전문 설치 상담까지.",
  },
];

const brands = [
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
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav className="desktop-nav">
            <Link href="/#brands">BRANDS</Link>
            <Link href="/#service">INSTALLATION</Link>
            <Link href="/#about">ABOUT</Link>
            <Link href="/order">CONTACT</Link>
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            <Link href="/#brands" onClick={() => setMenuOpen(false)}>
              브랜드 컬렉션
            </Link>
            <Link href="/#service" onClick={() => setMenuOpen(false)}>
              설치 서비스
            </Link>
            <Link href="/#about" onClick={() => setMenuOpen(false)}>
              싱크모아 소개
            </Link>
            <Link href="/order" onClick={() => setMenuOpen(false)}>
              주문 문의
            </Link>
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
                rgba(10,18,22,.35),
                rgba(10,18,22,.65)
              ), url("${slide.image}")`,
            }}
          />
        ))}

        <div className="hero-content">
          <p className="eyebrow">{slides[current].eyebrow}</p>
          <h1>{slides[current].title}</h1>
          <p className="hero-description">
            {slides[current].description}
          </p>
          <Link href="/#brands" className="gold-button">
            EXPLORE COLLECTION
            <span>↗</span>
          </Link>
        </div>

        <div className="slide-controls">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              onClick={() => setCurrent(index)}
              className={current === index ? "selected" : ""}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="intro-section" id="about">
        <div className="intro-content">
          <p className="section-label">THE SINKMOA STORY</p>
          <h2>
            공간의 가치를 높이는
            <br />
            특별한 선택
          </h2>
          <div className="gold-line" />
          <p>
            주방은 단순히 요리하는 공간을 넘어
            일상의 아름다움을 완성하는 공간입니다.
            <br />
            싱크모아는 다양한 프리미엄 싱크볼을
            소개하고 고객님의 주방에 어울리는
            제품 선택과 설치 상담을 제공합니다.
          </p>
        </div>
      </section>

      <section className="brands-section" id="brands">
        <div className="section-heading">
          <p className="section-label">OUR COLLECTION</p>
          <h2>Premium Sink Brands</h2>
          <p>
            취향과 공간에 어울리는 싱크볼을 만나보세요.
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
                <img src={brand.image} alt={`${brand.korean} 싱크볼`} />
              </div>
              <div className="brand-info">
                <div>
                  <p>{brand.korean}</p>
                  <h3>{brand.name}</h3>
                </div>
                <span className="brand-arrow">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-section" id="service">
        <div className="service-image">
          <img
            src="/installation.jpg"
            alt="싱크볼 설치 서비스"
          />
        </div>

        <div className="service-content">
          <p className="section-label">INSTALLATION SERVICE</p>
          <h2>
            좋은 제품의 선택,
            <br />
            그 이상의 완성.
          </h2>
          <div className="gold-line" />
          <p>
            싱크모아는 제품만 구매하거나
            설치 서비스를 함께 상담할 수 있습니다.
            기존 싱크볼의 규격과 설치 환경을 확인하여
            적합한 시공 방법을 안내합니다.
          </p>

          <div className="service-price">
            <span>기본 설치비</span>
            <strong>170,000원</strong>
          </div>

          <p className="service-note">
            기본 수전 연결 및 배수구 연결 시공 포함
            <br />
            추가 타공 및 현장 상황에 따라 비용이
            달라질 수 있습니다.
          </p>

          <Link href="/order" className="gold-button">
            설치 문의하기 <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="order-section">
        <p className="section-label">YOUR KITCHEN, OUR PRIORITY</p>
        <h2>당신의 주방을 위한 새로운 선택</h2>
        <p>
          제품 구매부터 설치 상담까지
          싱크모아에서 편리하게 문의하세요.
        </p>
        <Link href="/order" className="gold-button">
          주문 및 견적 문의 <span>↗</span>
        </Link>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <h2>SINKMOA</h2>
          <p>프리미엄 싱크볼 판매 및 설치 전문몰</p>
          <div className="footer-links">
            <Link href="/#brands">BRANDS</Link>
            <Link href="/#service">SERVICE</Link>
            <Link href="/order">CONTACT</Link>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} SINKMOA.
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
