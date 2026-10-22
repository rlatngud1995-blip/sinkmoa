
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  {
    label: "브랜드별 상품",
    href: "/#brands",
    type: "brands",
  },
  {
    label: "설치 서비스",
    href: "/installation",
    type: "installation",
  },
  {
    label: "구매·배송 안내",
    href: "/guide",
    type: "guide",
  },
  {
    label: "주문·견적 문의",
    href: "/order",
    type: "order",
  },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [menuOpen]);

  function isActive(type: string) {
    if (type === "brands") {
      return pathname.startsWith("/products");
    }

    if (type === "installation") {
      return pathname === "/installation";
    }

    if (type === "guide") {
      return pathname === "/guide";
    }

    if (type === "order") {
      return pathname === "/order";
    }

    return false;
  }

  return (
    <header className="sm-header">
      <div className="sm-header-inner">
        <Link
          href="/"
          className="sm-logo"
          onClick={() => setMenuOpen(false)}
          aria-label="싱크모아 메인으로 이동"
        >
          SINKMOA
        </Link>

        <nav
          className="sm-desktop-nav"
          aria-label="주 메뉴"
        >
          {menuItems.map((item) => (
            <Link
              key={item.type}
              href={item.href}
              className={
                isActive(item.type) ? "active" : ""
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className={`sm-menu-button ${
            menuOpen ? "open" : ""
          }`}
          aria-label={
            menuOpen ? "메뉴 닫기" : "메뉴 열기"
          }
          aria-expanded={menuOpen}
          aria-controls="sm-mobile-menu"
          onClick={() =>
            setMenuOpen((prev) => !prev)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="sm-mobile-menu"
        className={`sm-mobile-nav ${
          menuOpen ? "show" : ""
        }`}
        aria-label="모바일 메뉴"
        inert={!menuOpen}
      >
        {menuItems.map((item) => (
          <Link
            key={item.type}
            href={item.href}
            className={
              isActive(item.type) ? "active" : ""
            }
            onClick={() => setMenuOpen(false)}
          >
            <span>{item.label}</span>
            <span className="sm-nav-arrow">↗</span>
          </Link>
        ))}
      </nav>

      <style jsx global>{`
        .sm-header {
          position: relative;
          z-index: 100;
          width: 100%;
          background: #19262b;
          border-bottom: 1px solid rgba(255,255,255,.13);
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
        }

        .sm-header *,
        .sm-header *::before,
        .sm-header *::after {
          box-sizing: border-box;
        }

        .sm-header a {
          text-decoration: none;
        }

        .sm-header-inner {
          width: min(1360px, calc(100% - 80px));
          height: 88px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
        }

        .sm-logo {
          color: #fff;
          font-size: 25px;
          font-weight: 700;
          letter-spacing: .22em;
          white-space: nowrap;
        }

        .sm-desktop-nav {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        .sm-desktop-nav a {
          position: relative;
          padding: 12px 0;
          color: rgba(255,255,255,.83);
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          transition: color .2s;
        }

        .sm-desktop-nav a:hover,
        .sm-desktop-nav a.active {
          color: #d7c4a5;
        }

        .sm-desktop-nav a.active::after {
          content: "";
          position: absolute;
          bottom: 3px;
          left: 0;
          right: 0;
          height: 1px;
          background: #c4b49a;
        }

        .sm-menu-button {
          display: none;
          width: 42px;
          height: 42px;
          padding: 9px;
          background: transparent;
          border: 0;
          cursor: pointer;
        }

        .sm-menu-button span {
          display: block;
          width: 24px;
          height: 1px;
          margin: 6px auto;
          background: #fff;
          transition: transform .25s, opacity .25s;
        }

        .sm-menu-button.open span:first-child {
          transform: translateY(7px) rotate(45deg);
        }

        .sm-menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .sm-menu-button.open span:last-child {
          transform: translateY(-7px) rotate(-45deg);
        }

        .sm-mobile-nav {
          display: none;
        }

        @media (max-width: 900px) {
          .sm-header-inner {
            width: calc(100% - 36px);
            height: 74px;
          }

          .sm-logo {
            font-size: 21px;
          }

          .sm-desktop-nav {
            display: none;
          }

          .sm-menu-button {
            display: block;
          }

          .sm-mobile-nav.show {
            display: flex;
            flex-direction: column;
            padding: 12px 23px 25px;
            background: #19262b;
            border-top: 1px solid rgba(255,255,255,.1);
          }

          .sm-mobile-nav a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 19px 4px;
            color: rgba(255,255,255,.9);
            font-size: 14px;
            border-bottom: 1px solid rgba(255,255,255,.12);
          }

          .sm-mobile-nav a.active {
            color: #d7c4a5;
          }

          .sm-nav-arrow {
            color: #c4b49a;
            font-size: 18px;
          }
        }
      `}</style>
    </header>
  );
}
