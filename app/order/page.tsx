
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

    if (!name.trim() || !address.trim()) {
      alert("성함과 배송/설치 지역을 입력해주세요.");
      return;
    }

    if (availableProducts.length > 0 && !product) {
      alert("주문할 제품을 선택해주세요.");
      return;
    }

    const brandName =
      BRANDS[brand as BrandSlug]?.name ?? brand;

    const lines = [
      "[싱크모아 주문 및 견적 문의]",
      "",
      "■ 상품 정보",
      `브랜드: ${brandName}`,
      `모델: ${product?.name ?? "모델 상담 요청"}`,
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
      `성함: ${name}`,
      `배송/설치 지역: ${address}`,
      `요청사항: ${request || "없음"}`,
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
    <main className="order-page">
      <style jsx>{`
        .order-page {
          min-height: 100vh;
          background: #f7f5f0;
          color: #19262b;
          font-family: Arial, sans-serif;
        }
        .order-page * { box-sizing: border-box; }
        .top {
          background: #19262b;
          padding: 25px;
          text-align: center;
        }
        .logo {
          color: #e5d2ad;
          letter-spacing: 4px;
          font-size: 26px;
          font-weight: 700;
          text-decoration: none;
        }
        .hero {
          background: #19262b;
          color: white;
          padding: 60px 20px 85px;
          text-align: center;
        }
        .hero h1 {
          font-size: clamp(30px, 5vw, 45px);
          font-weight: 500;
        }
        .hero p {
          color: #ccc;
          line-height: 1.9;
          font-size: 14px;
        }
        .wrap {
          max-width: 760px;
          width: calc(100% - 28px);
          margin: -35px auto 0;
          position: relative;
          padding-bottom: 75px;
        }
        .card {
          background: white;
          padding: 35px;
          border: 1px solid #e8e3da;
          margin-bottom: 20px;
        }
        .eyebrow {
          color: #a89576;
          letter-spacing: 2px;
          font-size: 11px;
        }
        .card h2 {
          font-size: 23px;
          margin: 12px 0 28px;
        }
        .field { margin-bottom: 23px; }
        .field label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 10px;
        }
        .field select,
        .field input,
        .field textarea {
          display: block;
          width: 100%;
          padding: 15px;
          border: 1px solid #dedbd4;
          border-radius: 0;
          background: white;
          color: #19262b;
          font-size: 14px;
        }
        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          border: 1px solid #e5e1da;
          padding: 19px 14px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .option.active {
          background: #faf8f4;
          border-color: #b8a17b;
        }
        .option.disabled {
          opacity: .45;
          cursor: not-allowed;
        }
        .option-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .option input {
          accent-color: #b8a17b;
          width: 18px;
          height: 18px;
        }
        .option strong { font-size: 13px; }
        .option-price {
          color: #8e7857;
          font-size: 13px;
          white-space: nowrap;
        }
        .helper {
          color: #777;
          font-size: 12px;
          line-height: 1.9;
        }
        .summary {
          background: #19262b;
          color: white;
          padding: 30px;
        }
        .summary h2 {
          color: #e5d2ad;
          font-size: 21px;
          margin-top: 0;
        }
        .summary-row,
        .summary-total {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 0;
          font-size: 13px;
        }
        .summary-row { color: #d1d4d4; }
        .summary-total {
          margin-top: 15px;
          border-top: 1px solid #4d585c;
          align-items: center;
        }
        .summary-total strong {
          color: #e5d2ad;
          font-size: 25px;
        }
        .sms {
          width: 100%;
          background: #c4b49a;
          color: #19262b;
          padding: 19px;
          border: 0;
          margin-top: 20px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
        }
        .notice {
          font-size: 12px;
          color: #bbc2c2;
          line-height: 1.9;
        }
        .back {
          display: block;
          text-align: center;
          margin-top: 30px;
          color: #777;
          text-decoration: none;
          font-size: 13px;
        }
        @media (max-width: 600px) {
          .card { padding: 25px 19px; }
          .summary { padding: 25px 20px; }
          .option strong,
          .option-price { font-size: 12px; }
          .summary-total strong { font-size: 21px; }
        }
      `}</style>

      <header className="top">
        <Link href="/" className="logo">
          SINKMOA
        </Link>
      </header>

      <section className="hero">
        <p className="eyebrow">
          PREMIUM KITCHEN COLLECTION
        </p>
        <h1>주문 및 설치 문의</h1>
        <p>
          원하는 싱크볼과 추가 옵션을
          선택해주세요.
        </p>
      </section>

      <div className="wrap">
        <section className="card">
          <span className="eyebrow">
            01 / PRODUCT
          </span>
          <h2>제품 선택</h2>

          <div className="field">
            <label htmlFor="brand">브랜드 *</label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setProductId("");
              }}
            >
              <option value="">브랜드 선택</option>
              {Object.entries(BRANDS).map(
                ([slug, item]) => (
                  <option key={slug} value={slug}>
                    {item.name}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="field">
            <label htmlFor="product">제품 모델</label>
            <select
              id="product"
              value={productId}
              disabled={!brand || availableProducts.length === 0}
              onChange={(e) =>
                setProductId(e.target.value)
              }
            >
              <option value="">
                {availableProducts.length
                  ? "모델을 선택하세요"
                  : "등록된 상품이 없습니다"}
              </option>

              {availableProducts.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} -{" "}
                  {formatPrice(item.price)}
                </option>
              ))}
            </select>
          </div>

          <p className="helper">
            판매 모델과 가격은 싱크모아에서
            등록한 정보만 표시됩니다.
            등록 전인 모델은 문자 상담으로
            문의할 수 있습니다.
          </p>
        </section>

        <section className="card">
          <span className="eyebrow">
            02 / OPTIONS
          </span>
          <h2>구매 및 설치 옵션</h2>

          <label
            className={`option ${
              !installation ? "active" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="radio"
                name="installation"
                checked={!installation}
                onChange={() =>
                  changeInstallation(false)
                }
              />
              <strong>싱크볼 제품만 구매</strong>
            </span>
            <span className="option-price">
              설치비 없음
            </span>
          </label>

          <label
            className={`option ${
              installation ? "active" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="radio"
                name="installation"
                checked={installation}
                onChange={() =>
                  changeInstallation(true)
                }
              />
              <strong>싱크볼 제품 + 설치</strong>
            </span>
            <span className="option-price">
              +170,000원
            </span>
          </label>

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
              <strong>올스텐 배수구</strong>
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
              <strong>상판 타공</strong>
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
              <strong>
                6WAY 수전 + 무료 교체 설치
              </strong>
            </span>
            <span className="option-price">
              +70,000원
            </span>
          </label>

          <p className="helper">
            기본 배수구는 싱크볼 가격에 포함됩니다.
            6WAY 수전은 싱크볼 설치 주문 시에만
            추가할 수 있으며 교체 시공비는
            별도로 받지 않습니다.
          </p>
        </section>

        <section className="card">
          <span className="eyebrow">
            03 / CUSTOMER
          </span>
          <h2>고객 정보</h2>

          <div className="field">
            <label htmlFor="name">성함 *</label>
            <input
              id="name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="성함을 입력해주세요"
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
              rows={4}
              value={request}
              onChange={(e) =>
                setRequest(e.target.value)
              }
              placeholder="희망 모델, 설치 일정, 타공 규격 등"
            />
          </div>
        </section>

        <section className="summary">
          <h2>ORDER SUMMARY</h2>

          <div className="summary-row">
            <span>싱크볼 제품</span>
            <span>
              {product
                ? formatPrice(productPrice)
                : "모델 상담 필요"}
            </span>
          </div>

          <div className="summary-row">
            <span>기본 설치</span>
            <span>{formatPrice(installPrice)}</span>
          </div>

          <div className="summary-row">
            <span>올스텐 배수구</span>
            <span>{formatPrice(drainPrice)}</span>
          </div>

          <div className="summary-row">
            <span>상판 타공</span>
            <span>{formatPrice(cuttingPrice)}</span>
          </div>

          <div className="summary-row">
            <span>6WAY 수전 제품</span>
            <span>{formatPrice(faucetPrice)}</span>
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
            문자로 주문 문의하기 ↗
          </button>

          <p className="notice">
            문자 앱이 실행되면 고객이 직접
            전송해야 문의가 접수됩니다.
            <br />
            현장 상태와 추가 작업에 따라
            최종 금액은 달라질 수 있습니다.
          </p>
        </section>

        <Link href="/" className="back">
          ← 메인 홈페이지로 돌아가기
        </Link>
      </div>
    </main>
  );
}
