
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
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

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(
      3,
      6
    )}-${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(
    3,
    7
  )}-${digits.slice(7)}`;
}

function validPhone(value: string) {
  return /^01[016789]\d{7,8}$/.test(
    onlyDigits(value)
  );
}

function todayLocal() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(date.getDate()).padStart(
    2,
    "0"
  );

  return `${year}-${month}-${day}`;
}

export default function OrderPage() {
  const [brand, setBrand] = useState("");
  const [productId, setProductId] = useState("");

  const [installation, setInstallation] =
    useState(false);
  const [drain, setDrain] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [faucet, setFaucet] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cutoutWidth, setCutoutWidth] = useState("");
  const [cutoutDepth, setCutoutDepth] = useState("");
  const [preferredDate, setPreferredDate] =
    useState("");
  const [request, setRequest] = useState("");

  const [confirmOpen, setConfirmOpen] =
    useState(false);

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

  useEffect(() => {
    if (!confirmOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setConfirmOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [confirmOpen]);

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

  const brandName = brand
    ? BRANDS[brand as BrandSlug]?.name ?? brand
    : "";

  const cutoutSize =
    product?.width && product?.depth
      ? `${product.width} × ${product.depth}mm`
      : "상담 시 확인";

  const existingCutout =
    cutoutWidth && cutoutDepth
      ? `${cutoutWidth} × ${cutoutDepth}mm`
      : cutoutWidth || cutoutDepth
      ? `가로 ${cutoutWidth || "미입력"}mm / 세로 ${
          cutoutDepth || "미입력"
        }mm`
      : "미측정";

  const addressLabel = installation
    ? "설치 주소"
    : "배송지 주소";

  function changeInstallation(value: boolean) {
    setInstallation(value);
    setConfirmOpen(false);

    if (!value) {
      setCutting(false);
      setFaucet(false);
      setCutoutWidth("");
      setCutoutDepth("");
      setPreferredDate("");
    }
  }

  function validateOrder() {
    if (!brand) {
      alert("브랜드를 선택해주세요.");
      return false;
    }

    if (!product) {
      alert("주문할 제품 모델을 선택해주세요.");
      return false;
    }

    if (!name.trim()) {
      alert("고객 성함을 입력해주세요.");
      return false;
    }

    if (!validPhone(phone)) {
      alert(
        "연락 가능한 휴대폰 번호를 정확히 입력해주세요."
      );
      return false;
    }

    if (!address.trim()) {
      alert(`${addressLabel}를 입력해주세요.`);
      return false;
    }

    if (
      installation &&
      ((cutoutWidth &&
        (!Number.isFinite(Number(cutoutWidth)) ||
          Number(cutoutWidth) <= 0)) ||
        (cutoutDepth &&
          (!Number.isFinite(Number(cutoutDepth)) ||
            Number(cutoutDepth) <= 0)))
    ) {
      alert(
        "기존 상판 타공 치수를 올바르게 입력해주세요."
      );
      return false;
    }

    if (
      installation &&
      preferredDate &&
      preferredDate < todayLocal()
    ) {
      alert(
        "희망 설치 날짜는 오늘 이후로 선택해주세요."
      );
      return false;
    }

    return true;
  }

  function openConfirmation() {
    if (!validateOrder()) return;
    setConfirmOpen(true);
  }

  function buildMessage() {
    const lines = [
      "[싱크모아 주문 및 견적 문의]",
      "",
      "■ 상품 정보",
      `브랜드: ${brandName}`,
      `모델: ${product?.name ?? "모델 상담 요청"}`,
      `선택 모델 상판 타공 사이즈: ${cutoutSize}`,
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
      `6WAY 수전 제품: ${
        faucetPrice
          ? "추가 (+70,000원), 교체 설치비 무료"
          : "미선택"
      }`,
      "",
      "■ 예상 금액",
      `싱크볼: ${formatPrice(productPrice)}`,
      `설치비: ${formatPrice(installPrice)}`,
      `올스텐 배수구: ${formatPrice(drainPrice)}`,
      `상판 타공: ${formatPrice(cuttingPrice)}`,
      `6WAY 수전 제품: ${formatPrice(faucetPrice)}`,
      `예상 총금액: ${formatPrice(total)}`,
      "",
      "■ 고객 정보",
      `성함: ${name.trim()}`,
      `연락처: ${formatPhone(phone)}`,
      `${addressLabel}: ${address.trim()}`,
    ];

    if (installation) {
      lines.push(
        `기존 상판 타공 사이즈: ${existingCutout}`,
        `희망 설치 날짜: ${
          preferredDate || "일정 상담 희망"
        }`
      );
    }

    lines.push(
      `요청사항: ${request.trim() || "없음"}`,
      "",
      "※ 최종 금액과 일정은 상담 후 확정됩니다.",
      "상담 부탁드립니다."
    );

    return lines.join("\n");
  }

  function sendSMS() {
    if (!validateOrder()) {
      setConfirmOpen(false);
      return;
    }

    const message = buildMessage();

    const separator =
      /iPhone|iPad|iPod/i.test(
        navigator.userAgent
      )
        ? "&"
        : "?";

    const smsUrl = `sms:${PHONE}${separator}body=${encodeURIComponent(
      message
    )}`;

    setConfirmOpen(false);
    window.location.href = smsUrl;
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

        .field-hint {
          color: #888;
          font-size: 12px;
          line-height: 1.8;
          margin: 9px 0 0;
        }

        .field-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 16px;
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

        .installation-fields {
          margin-top: 28px;
          padding: 28px;
          background: #faf8f4;
          border: 1px solid #e5dfd5;
        }

        .installation-fields h3 {
          font-size: 19px;
          font-weight: 600;
          margin: 0 0 12px;
        }

        .installation-fields > p {
          color: #777;
          font-size: 12px;
          line-height: 1.9;
          margin: 0 0 25px;
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
          text-align: right;
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
          gap: 15px;
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

        .confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(8,16,20,.78);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .confirm-dialog {
          width: 100%;
          max-width: 560px;
          max-height: calc(100dvh - 36px);
          overflow-y: auto;
          background: #f7f5f0;
          padding: 35px;
          color: #19262b;
          box-shadow: 0 20px 80px rgba(0,0,0,.25);
        }

        .confirm-dialog h2 {
          font-size: 28px;
          font-weight: 500;
          margin: 14px 0 12px;
        }

        .confirm-intro {
          color: #777;
          font-size: 13px;
          line-height: 1.9;
          margin-bottom: 25px;
        }

        .confirm-row {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          border-bottom: 1px solid #ded8ce;
          padding: 13px 0;
          font-size: 13px;
          line-height: 1.7;
        }

        .confirm-row span {
          color: #777;
          flex-shrink: 0;
        }

        .confirm-row strong {
          text-align: right;
          overflow-wrap: anywhere;
        }

        .confirm-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 25px 0;
        }

        .confirm-total strong {
          color: #927a55;
          font-size: 27px;
        }

        .confirm-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .confirm-actions button {
          padding: 18px 10px;
          border: 1px solid #19262b;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .confirm-cancel {
          background: transparent;
          color: #19262b;
        }

        .confirm-send {
          background: #19262b;
          color: white;
        }

        .confirm-notice {
          color: #777;
          font-size: 12px;
          line-height: 1.8;
          margin: 18px 0 0;
        }

        @media (max-width: 700px) {
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

          .field-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .installation-fields {
            padding: 22px 17px;
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

          .confirm-dialog {
            padding: 25px 20px;
          }

          .confirm-dialog h2 {
            font-size: 24px;
          }

          .confirm-total strong {
            font-size: 23px;
          }
        }
      `}</style>

      <SiteHeader />

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
                setConfirmOpen(false);
              }}
            >
              <option value="">
                브랜드를 선택해주세요
              </option>

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
              onChange={(e) => {
                setProductId(e.target.value);
                setConfirmOpen(false);
              }}
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
              maxLength={40}
            />
          </div>

          <div className="field">
            <label htmlFor="phone">
              휴대폰 번호 *
            </label>

            <input
              id="phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) =>
                setPhone(formatPhone(e.target.value))
              }
              placeholder="010-1234-5678"
              autoComplete="tel"
              maxLength={13}
            />

            <p className="field-hint">
              상담 연락을 받을 휴대폰 번호를
              입력해주세요.
            </p>
          </div>

          <div className="field">
            <label htmlFor="address">
              {addressLabel} *
            </label>

            <input
              id="address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder={
                installation
                  ? "예: 경기도 안산시 단원구 ○○로 00, 101동 101호"
                  : "예: 서울시 강남구 ○○로 00, 101동 101호"
              }
              autoComplete="street-address"
              maxLength={200}
            />

            <p className="field-hint">
              {installation
                ? "설치 방문이 필요한 주소를 입력해주세요."
                : "제품을 택배로 받을 주소를 입력해주세요."}
            </p>
          </div>

          {installation && (
            <div className="installation-fields">
              <h3>설치 환경 및 희망 일정</h3>

              <p>
                기존 상판 타공 사이즈를 알고
                계시면 입력해주세요.
                치수를 모르셔도 상담 신청은 가능합니다.
              </p>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="cutoutWidth">
                    기존 상판 타공 가로 (mm)
                  </label>

                  <input
                    id="cutoutWidth"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={cutoutWidth}
                    onChange={(e) =>
                      setCutoutWidth(e.target.value)
                    }
                    placeholder="예: 780"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cutoutDepth">
                    기존 상판 타공 세로 (mm)
                  </label>

                  <input
                    id="cutoutDepth"
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={cutoutDepth}
                    onChange={(e) =>
                      setCutoutDepth(e.target.value)
                    }
                    placeholder="예: 400"
                  />
                </div>
              </div>

              <p className="field-hint">
                제품에 표시된 타공 사이즈와
                현재 주방 상판의 실제 타공 치수를
                구분해서 입력해주세요.
              </p>

              <div
                className="field"
                style={{ marginTop: 25 }}
              >
                <label htmlFor="preferredDate">
                  희망 설치 날짜
                </label>

                <input
                  id="preferredDate"
                  type="date"
                  min={todayLocal()}
                  value={preferredDate}
                  onChange={(e) =>
                    setPreferredDate(e.target.value)
                  }
                />

                <p className="field-hint">
                  희망 날짜이며, 실제 설치 일정은
                  상담 후 확정됩니다.
                </p>
              </div>
            </div>
          )}

          <div
            className="field"
            style={{ marginTop: 28 }}
          >
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
              placeholder="상판 재질, 배송 관련 요청, 기존 싱크볼 상태 등 추가로 알려주실 내용을 입력해주세요."
              maxLength={1000}
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
            onClick={openConfirmation}
          >
            주문 내용 확인 후 문자 문의
            <span>↗</span>
          </button>

          <p className="notice">
            주문 내용을 확인한 뒤 문자 앱으로
            이동합니다. 문자 앱에서 고객이
            직접 전송해야 문의가 접수됩니다.
            <br />
            표시된 금액은 예상금액이며,
            배송비, 상판 재질, 타공 가능 여부 및
            현장 상태에 따라 최종 견적이
            달라질 수 있습니다.
          </p>
        </section>

        <Link href="/" className="back">
          ← 싱크모아 메인으로 돌아가기
        </Link>
      </div>

      {confirmOpen && (
        <div className="confirm-overlay">
          <div
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <span className="eyebrow">
              FINAL ORDER REVIEW
            </span>

            <h2 id="confirm-title">
              주문 내용 최종 확인
            </h2>

            <p className="confirm-intro">
              아래 내용을 확인해주세요.
              확인 후 문자 앱으로 이동하며,
              문자를 직접 전송해야 상담이 접수됩니다.
            </p>

            <div className="confirm-row">
              <span>브랜드</span>
              <strong>{brandName}</strong>
            </div>

            <div className="confirm-row">
              <span>제품</span>
              <strong>{product?.name}</strong>
            </div>

            <div className="confirm-row">
              <span>구매 방식</span>
              <strong>
                {installation
                  ? "제품 + 설치"
                  : "제품만 구매"}
              </strong>
            </div>

            <div className="confirm-row">
              <span>올스텐 배수구</span>
              <strong>
                {drain ? "선택" : "미선택"}
              </strong>
            </div>

            {installation && (
              <>
                <div className="confirm-row">
                  <span>상판 타공</span>
                  <strong>
                    {cutting ? "선택" : "미선택"}
                  </strong>
                </div>

                <div className="confirm-row">
                  <span>6WAY 수전 제품</span>
                  <strong>
                    {faucet ? "선택" : "미선택"}
                  </strong>
                </div>
              </>
            )}

            <div className="confirm-row">
              <span>성함</span>
              <strong>{name.trim()}</strong>
            </div>

            <div className="confirm-row">
              <span>연락처</span>
              <strong>{formatPhone(phone)}</strong>
            </div>

            <div className="confirm-row">
              <span>{addressLabel}</span>
              <strong>{address.trim()}</strong>
            </div>

            {installation && (
              <>
                <div className="confirm-row">
                  <span>기존 상판 타공</span>
                  <strong>{existingCutout}</strong>
                </div>

                <div className="confirm-row">
                  <span>희망 설치 날짜</span>
                  <strong>
                    {preferredDate ||
                      "일정 상담 희망"}
                  </strong>
                </div>
              </>
            )}

            <div className="confirm-row">
              <span>추가 요청사항</span>
              <strong>
                {request.trim() || "없음"}
              </strong>
            </div>

            <div className="confirm-total">
              <span>예상 총금액</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={() =>
                  setConfirmOpen(false)
                }
              >
                다시 수정하기
              </button>

              <button
                type="button"
                className="confirm-send"
                onClick={sendSMS}
              >
                문자 앱 열기 ↗
              </button>
            </div>

            <p className="confirm-notice">
              상담 문자 수신 번호: 010-9413-4686
              <br />
              실제 결제나 주문 확정이 아닌
              상담 요청 단계입니다.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
