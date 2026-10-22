
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BRANDS,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
} from "../data/products";

const PHONE = "01094134686";

const PRICE = {
  installation: 170000,
  drain: 20000,
  cutting: 50000,
  faucet: 70000,
};

export default function OrderPage() {
  const [brand, setBrand] = useState("");
  const [productId, setProductId] = useState("");

  const [installation, setInstallation] =
    useState(false);
  const [drain, setDrain] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [faucet, setFaucet] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const id = params.get("product");
    const selectedProduct = PRODUCTS.find(
      (item) => item.id === id
    );

    if (selectedProduct) {
      setBrand(selectedProduct.brand);
      setProductId(selectedProduct.id);
      return;
    }

    const selectedBrand = params.get("brand");

    if (
      selectedBrand &&
      Object.prototype.hasOwnProperty.call(
        BRANDS,
        selectedBrand
      )
    ) {
      setBrand(selectedBrand);
    }
  }, []);

  const availableProducts = PRODUCTS.filter(
    (item) => item.brand === brand
  );

  const product = PRODUCTS.find(
    (item) => item.id === productId
  );

  const productPrice = product?.price ?? 0;
  const installPrice = installation
    ? PRICE.installation
    : 0;
  const drainPrice = drain ? PRICE.drain : 0;
  const cuttingPrice =
    installation && cutting ? PRICE.cutting : 0;
  const faucetPrice =
    installation && faucet ? PRICE.faucet : 0;

  const total =
    productPrice +
    installPrice +
    drainPrice +
    cuttingPrice +
    faucetPrice;

  function changeInstallation(value: boolean) {
    setInstallation(value);

    if (!value) {
      setCutting(false);
      setFaucet(false);
    }
  }

  function sendSMS() {
    if (!brand) {
      alert("브랜드를 선택해주세요.");
      return;
    }

    if (availableProducts.length > 0 && !product) {
      alert("주문할 제품을 선택해주세요.");
      return;
    }

    if (!name.trim() || !address.trim()) {
      alert("성함과 배송/설치 지역을 입력해주세요.");
      return;
    }

    const brandName =
      BRANDS[brand as BrandSlug]?.name ?? brand;

    const cutoutSize =
      product?.width && product?.depth
        ? `${product.width} × ${product.depth}mm`
        : "상담 시 확인";

    const lines = [
      "[싱크모아 주문 및 견적 문의]",
      "",
      "■ 상품 정보",
      `브랜드: ${brandName}`,
      `모델: ${product?.name ?? "모델 상담 요청"}`,
      `상판 타공 사이즈: ${cutoutSize}`,
      `구매 방식: ${
        installation
          ? "싱크볼 제품 + 설치"
          : "싱크볼 제품만 구매"
      }`,
      "",
      "■ 선택 옵션",
      `올스텐 배수구: ${
        drain ? "선택 (+20,000원)" : "미선택"
      }`,
      `상판 타공: ${
        cuttingPrice
          ? "선택 (+50,000원)"
          : "미선택"
      }`,
      `6WAY 수전: ${
        faucetPrice
          ? "제품 추가 (+70,000원), 교체 설치비 무료"
          : "미선택"
      }`,
      "",
      "■ 예상 금액",
      `싱크볼: ${
        product
          ? formatPrice(productPrice)
          : "상담 후 안내"
      }`,
      `설치비: ${formatPrice(installPrice)}`,
      `올스텐 배수구: ${formatPrice(drainPrice)}`,
      `상판 타공: ${formatPrice(cuttingPrice)}`,
      `6WAY 수전: ${formatPrice(faucetPrice)}`,
      `예상 총금액: ${
        product
          ? formatPrice(total)
          : "모델 및 제품 가격 확인 후 안내"
      }`,
      "",
      "■ 고객 정보",
      `성함: ${name.trim()}`,
      `배송/설치 지역: ${address.trim()}`,
      `요청사항: ${request.trim() || "없음"}`,
      "",
      "상담 부탁드립니다.",
    ];

    const message = lines.join("\n");

    const separator =
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? "&"
        : "?";

    window.location.href =
      `sms:${PHONE}${separator}body=${encodeURIComponent(
        message
      )}`;
  }

  return (
    <main className="premium-order-page">
      <style jsx>{`
        .premium-order-page {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          min-height: 100vh;
          background: var(--ivory);
          color: var(--ink);
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
          word-break: keep-all;
        }

        .premium-order-page *,
        .premium-order-page *::before,
        .premium-order-page *::after {
          box-sizing: border-box;
        }

        .premium-order-page a {
          text-decoration: none;
        }

        .premium-order-page button,
        .premium-order-page input,
        .premium-order-page select,
        .premium-order-page textarea {
          font-family: inherit;
        }

        .top {
          background: #19262b;
          border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .top-inner {
          max-width: 1360px;
          width: calc(100% - 80px);
          height: 90px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          color: #fff;
          letter-spacing: .22em;
          font-size: 25px;
          font-weight: 700;
        }

        .top-link {
          color: #e5d2ad;
          font-size: 11px;
          letter-spacing: .1em;
        }

        .hero {
          background: #19262b;
          color: white;
          padding: 95px 20px 125px;
          text-align: center;
        }

        .eyebrow {
          display: block;
          color: #a89576;
          letter-spacing: .25em;
          font-size: 11px;
          font-weight: 700;
        }

        .hero h1 {
          font-size: clamp(37px, 5vw, 58px);
          font-weight: 400;
          letter-spacing: -.045em;
          margin: 22px 0;
        }

        .hero p {
          color: #c4cccb;
          line-height: 2;
          font-size: 14px;
          margin: 0;
        }

        .hero-line {
          width: 42px;
          height: 1px;
          background: #c4b49a;
          margin: 35px auto 0;
        }

        .wrap {
          max-width: 1000px;
          width: calc(100% - 40px);
          margin: -48px auto 0;
          position: relative;
          z-index: 2;
          padding-bottom: 95px;
        }

        .card {
          background: white;
          padding: 48px;
          border: 1px solid #e5dfd5;
          margin-bottom: 22px;
        }

        .card h2 {
          font-size: clamp(24px, 3vw, 30px);
          font-weight: 500;
          letter-spacing: -.035em;
          margin: 14px 0 32px;
        }

        .field {
          margin-bottom: 25px;
        }

        .field label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .field select,
        .field input,
        .field textarea {
          display: block;
          width: 100%;
          padding: 17px 18px;
          border: 1px solid #ddd7cd;
          border-radius: 0;
          background: #fff;
          color: #19262b;
          font-size: 14px;
          outline: none;
          transition: border-color .2s;
        }

        .field select:focus,
        .field input:focus,
        .field textarea:focus {
          border-color: #a89576;
        }

        .field select:disabled {
          background: #f5f3ef;
          color: #999;
        }

        .field textarea {
          resize: vertical;
          line-height: 1.8;
        }

        .product-detail {
          background: #f7f5f0;
          border: 1px solid #e5dfd5;
          padding: 25px;
          margin-top: 10px;
        }

        .detail-top {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          padding-bottom: 17px;
          border-bottom: 1px solid #ddd6cb;
        }

        .detail-top span {
          font-size: 12px;
          color: #777;
        }

        .detail-top strong {
          font-size: 22px;
          font-weight: 600;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 15px;
          padding-top: 18px;
        }

        .detail-row span {
          color: #777;
          font-size: 12px;
          line-height: 1.7;
        }

        .detail-row strong {
          font-size: 14px;
          text-align: right;
          line-height: 1.7;
        }

        .detail-note {
          font-size: 11px;
          color: #888;
          line-height: 1.8;
          margin: 15px 0 0;
        }

        .purchase-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 30px;
        }

        .purchase-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid #ded8ce;
          padding: 26px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
        }

        .purchase-card.active {
          background: #faf8f4;
          border-color: #aa9270;
        }

        .purchase-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .purchase-card input {
          accent-color: #a89576;
          width: 19px;
          height: 19px;
          margin: 0;
          flex-shrink: 0;
        }

        .purchase-card strong {
          font-size: 15px;
        }

        .purchase-card-price {
          color: #927a55;
          font-size: 17px;
          font-weight: 600;
        }

        .purchase-card-note {
          color: #888;
          font-size: 12px;
          line-height: 1.8;
        }

        .option-heading {
          font-size: 17px;
          font-weight: 600;
          margin: 35px 0 18px;
        }

        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border: 1px solid #e5e1da;
          padding: 22px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
        }

        .option.active {
          background: #faf8f4;
          border-color: #b8a17b;
        }

        .option.disabled {
          opacity: .48;
          cursor: not-allowed;
          background: #f7f7f5;
        }

        .option-left {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .option input {
          accent-color: #b8a17b;
          width: 19px;
          height: 19px;
          margin-top: 1px;
          flex-shrink: 0;
        }

        .option-title {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .option-description {
          display: block;
          color: #888;
          font-size: 12px;
          line-height: 1.7;
        }

        .option-price {
          color: #8e7857;
          font-size: 15px;
          font-weight: 600;
          white-space: nowrap;
        }

        .helper {
          color: #888;
          font-size: 12px;
          line-height: 2;
          margin: 18px 0 0;
        }

        .summary {
          background: #19262b;
          color: white;
          padding: 45px;
        }

        .summary-eyebrow {
          color: #c4b49a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .25em;
        }

        .summary h2 {
          color: #fff;
          font-size: 30px;
          font-weight: 400;
          margin: 15px 0 28px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 0;
          font-size: 13px;
          color: #cbd2d0;
          border-bottom: 1px solid rgba(255,255,255,.09);
        }

        .summary-row strong {
          color: #fff;
          font-weight: 500;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-top: 30px;
          margin-top: 12px;
        }

        .summary-total span {
          font-size: 15px;
        }

        .summary-total strong {
          color: #e5d2ad;
          font-size: clamp(27px, 4vw, 39px);
          font-weight: 500;
          letter-spacing: -.04em;
        }

        .sms {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #c4b49a;
          color: #19262b;
          padding: 23px 27px;
          border: 0;
          margin-top: 32px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: background .2s;
        }

        .sms:hover {
          background: #d8c8ac;
        }

        .notice {
          font-size: 12px;
          color: #aeb9b7;
          line-height: 2;
          margin: 20px 0 0;
        }

        .back {
          display: block;
          text-align: center;
          margin-top: 35px;
          color: #777;
          font-size: 13px;
        }

        @media (max-width: 700px) {
          .top-inner {
            width: calc(100% - 36px);
            height: 74px;
          }

          .logo {
            font-size: 21px;
          }

          .hero {
            padding: 75px 20px 100px;
          }

          .wrap {
            width: calc(100% - 24px);
            margin-top: -35px;
            padding-bottom: 70px;
          }

          .card {
            padding: 28px 22px;
            margin-bottom: 14px;
          }

          .purchase-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .purchase-card {
            padding: 22px;
          }

          .option {
            padding: 18px 15px;
            gap: 10px;
          }

          .option-price {
            font-size: 12px;
          }

          .option-title {
            font-size: 13px;
          }

          .option-description {
            font-size: 11px;
          }

          .product-detail {
            padding: 20px;
          }

          .detail-top strong {
            font-size: 18px;
          }

          .summary {
            padding: 30px 23px;
          }

          .summary-total {
            align-items: flex-start;
            flex-direction: column;
          }

          .sms {
            padding: 20px;
          }
        }
      `}</style>

      <header className="top">
        <div className="top-inner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <Link href="/#brands" className="top-link">
            VIEW COLLECTION ↗
          </Link>
        </div>
      </header>

      <section className="hero">
        <span className="eyebrow">
          SINKMOA PRIVATE CONSULTATION
        </span>

        <h1>주문 및 설치 상담</h1>

        <p>
          원하는 싱크볼과 옵션을 선택하고
          <br />
          예상 금액을 확인해보세요.
        </p>

        <div className="hero-line" />
      </section>

      <div className="wrap">
        <section className="card">
          <span className="eyebrow">
            STEP 01 — SELECT PRODUCT
          </span>

          <h2>싱크볼 제품 선택</h2>

          <div className="field">
            <label htmlFor="brand">
              브랜드 선택 *
            </label>

            <select
              id="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setProductId("");
              }}
            >
              <option value="">브랜드를 선택해주세요</option>

              {Object.entries(BRANDS).map(
                ([slug, item]) => (
                  <option key={slug} value={slug}>
                    {item.name} · {item.english}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="product">
              제품 모델 선택 *
            </label>

            <select
              id="product"
              value={productId}
              disabled={
                !brand || availableProducts.length === 0
              }
              onChange={(e) =>
                setProductId(e.target.value)
              }
            >
              <option value="">
                {!brand
                  ? "브랜드를 먼저 선택해주세요"
                  : availableProducts.length
                  ? "모델을 선택해주세요"
                  : "등록된 모델이 없습니다"}
              </option>

              {availableProducts.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} · {formatPrice(item.price)}
                </option>
              ))}
            </select>
          </div>

          {product && (
            <div className="product-detail">
              <div className="detail-top">
                <span>제품 단독 판매가격</span>
                <strong>
                  {formatPrice(product.price)}
                </strong>
              </div>

              <div className="detail-row">
                <span>선택한 모델</span>
                <strong>{product.name}</strong>
              </div>

              <div className="detail-row">
                <span>설치 방식</span>
                <strong>
                  {product.installationType ??
                    "상담 시 확인"}
                </strong>
              </div>

              <div className="detail-row">
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

              <p className="detail-note">
                ※ 표시된 치수는 싱크볼 외경이 아닌
                상판 타공 사이즈입니다.
              </p>
            </div>
          )}

          <p className="helper">
            상품 가격과 상판 타공 사이즈는
            등록된 모델 정보를 기준으로 표시됩니다.
            실제 설치 가능 여부는 기존 상판과
            현장 상태 확인 후 안내합니다.
          </p>
        </section>

        <section className="card">
          <span className="eyebrow">
            STEP 02 — SELECT OPTIONS
          </span>

          <h2>구매 방식 및 추가 옵션</h2>

          <div className="purchase-grid">
            <label
              className={`purchase-card ${
                !installation ? "active" : ""
              }`}
            >
              <div className="purchase-card-top">
                <input
                  type="radio"
                  name="installation"
                  checked={!installation}
                  onChange={() =>
                    changeInstallation(false)
                  }
                />
                <strong>제품만 구매</strong>
              </div>

              <span className="purchase-card-price">
                설치비 없음
              </span>

              <span className="purchase-card-note">
                싱크볼 제품을 택배로 받아보는 방식
              </span>
            </label>

            <label
              className={`purchase-card ${
                installation ? "active" : ""
              }`}
            >
              <div className="purchase-card-top">
                <input
                  type="radio"
                  name="installation"
                  checked={installation}
                  onChange={() =>
                    changeInstallation(true)
                  }
                />
                <strong>제품 + 설치</strong>
              </div>

              <span className="purchase-card-price">
                +170,000원
              </span>

              <span className="purchase-card-note">
                기존 싱크볼 철거 및
                기존 수전·배수구 연결 포함
              </span>
            </label>
          </div>

          <h3 className="option-heading">
            추가 옵션 선택
          </h3>

          <label
            className={`option ${
              drain ? "active" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="checkbox"
                checked={drain}
                onChange={(e) =>
                  setDrain(e.target.checked)
                }
              />

              <span>
                <span className="option-title">
                  올스텐 배수구
                </span>
                <span className="option-description">
                  기본 배수구에서 올스텐 배수구로 변경
                </span>
              </span>
            </span>

            <span className="option-price">
              +20,000원
            </span>
          </label>

          <label
            className={`option ${
              cutting ? "active" : ""
            } ${
              !installation ? "disabled" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="checkbox"
                disabled={!installation}
                checked={cutting}
                onChange={(e) =>
                  setCutting(e.target.checked)
                }
              />

              <span>
                <span className="option-title">
                  상판 타공
                </span>
                <span className="option-description">
                  기존 상판 타공 사이즈 변경
                  · 설치 주문 시 선택 가능
                </span>
              </span>
            </span>

            <span className="option-price">
              +50,000원
            </span>
          </label>

          <label
            className={`option ${
              faucet ? "active" : ""
            } ${
              !installation ? "disabled" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="checkbox"
                disabled={!installation}
                checked={faucet}
                onChange={(e) =>
                  setFaucet(e.target.checked)
                }
              />

              <span>
                <span className="option-title">
                  6WAY 수전 제품
                </span>
                <span className="option-description">
                  싱크볼 설치 시 수전 교체 시공비 무료
                </span>
              </span>
            </span>

            <span className="option-price">
              +70,000원
            </span>
          </label>

          <p className="helper">
            기본 배수구는 제품 가격에 포함됩니다.
            올스텐 배수구는 제품만 구매해도
            선택할 수 있습니다. 상판 타공과
            6WAY 수전은 설치 주문 시에만
            선택 가능합니다.
          </p>
        </section>

        <section className="card">
          <span className="eyebrow">
            STEP 03 — CUSTOMER INFORMATION
          </span>

          <h2>고객 정보 입력</h2>

          <div className="field">
            <label htmlFor="name">
              성함 *
            </label>

            <input
              id="name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="성함을 입력해주세요"
              autoComplete="name"
            />
          </div>

          <div className="field">
            <label htmlFor="address">
              배송 또는 설치 지역 *
            </label>

            <input
              id="address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="예: 경기도 안산시 단원구"
            />
          </div>

          <div className="field">
            <label htmlFor="request">
              추가 요청사항
            </label>

            <textarea
              id="request"
              rows={5}
              value={request}
              onChange={(e) =>
                setRequest(e.target.value)
              }
              placeholder="희망 설치 일정, 기존 상판 타공 사이즈, 문의사항 등을 입력해주세요."
            />
          </div>
        </section>

        <section className="summary">
          <span className="summary-eyebrow">
            YOUR ORDER SUMMARY
          </span>

          <h2>예상 주문 금액</h2>

          <div className="summary-row">
            <span>싱크볼 제품</span>
            <strong>
              {product
                ? formatPrice(productPrice)
                : "모델 선택 필요"}
            </strong>
          </div>

          <div className="summary-row">
            <span>기본 설치</span>
            <strong>
              {formatPrice(installPrice)}
            </strong>
          </div>

          <div className="summary-row">
            <span>올스텐 배수구</span>
            <strong>
              {formatPrice(drainPrice)}
            </strong>
          </div>

          <div className="summary-row">
            <span>상판 타공</span>
            <strong>
              {formatPrice(cuttingPrice)}
            </strong>
          </div>

          <div className="summary-row">
            <span>6WAY 수전 제품</span>
            <strong>
              {formatPrice(faucetPrice)}
            </strong>
          </div>

          <div className="summary-total">
            <span>예상 총금액</span>

            <strong>
              {product
                ? formatPrice(total)
                : "견적 문의"}
            </strong>
          </div>

          <button
            type="button"
            className="sms"
            onClick={sendSMS}
          >
            문자로 주문 및 견적 문의
            <span>↗</span>
          </button>

          <p className="notice">
            문자 앱이 실행되면 고객이 직접
            전송해야 문의가 접수됩니다.
            <br />
            표시된 금액은 예상금액이며
            상판 재질, 타공 가능 여부 및
            현장 상태에 따라 최종 견적이
            달라질 수 있습니다.
          </p>
        </section>

        <Link href="/" className="back">
          ← 싱크모아 메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
