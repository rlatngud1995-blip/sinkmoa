
"use client";

import Link from "next/link";
import { useState } from "react";

const PHONE = "01094134686";
const INSTALL_PRICE = 170000;
const DRAIN_PRICE = 20000;
const CUTTING_PRICE = 50000;

const BRANDS = [
  { value: "regens", name: "리젠스" },
  { value: "bellago", name: "벨라고" },
  { value: "artisan", name: "아티잔" },
  { value: "baekjo", name: "백조" },
];

const money = (value: number) =>
  value.toLocaleString("ko-KR") + "원";

export default function OrderPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [installation, setInstallation] =
    useState("product");

  const [stainlessDrain, setStainlessDrain] =
    useState(false);

  const [cutting, setCutting] = useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");

  const priceNumber =
    Number(productPrice) > 0
      ? Number(productPrice)
      : 0;

  const installFee =
    installation === "install"
      ? INSTALL_PRICE
      : 0;

  const drainFee =
    stainlessDrain ? DRAIN_PRICE : 0;

  const cuttingFee =
    installation === "install" && cutting
      ? CUTTING_PRICE
      : 0;

  const total =
    priceNumber +
    installFee +
    drainFee +
    cuttingFee;

  const selectedBrand =
    BRANDS.find((item) => item.value === brand);

  const handleSMS = () => {
    if (!brand) {
      alert("제품 브랜드를 선택해주세요.");
      return;
    }

    if (!model.trim()) {
      alert("제품 모델명을 입력해주세요.");
      return;
    }

    if (!customerName.trim()) {
      alert("고객 성함을 입력해주세요.");
      return;
    }

    if (!address.trim()) {
      alert("배송 또는 설치 지역을 입력해주세요.");
      return;
    }

    const message = [
      "[싱크모아 주문 문의]",
      "",
      `브랜드: ${selectedBrand?.name}`,
      `제품 모델명: ${model}`,
      `구매 방식: ${
        installation === "install"
          ? "제품 + 설치"
          : "제품만 구매"
      }`,
      "",
      "[추가 옵션]",
      `올스텐 배수구: ${
        stainlessDrain
          ? "추가 (+20,000원)"
          : "선택 안 함"
      }`,
      `상판 타공: ${
        installation === "install" && cutting
          ? "추가 (+50,000원)"
          : "선택 안 함"
      }`,
      "",
      "[예상 금액]",
      `제품 가격: ${
        priceNumber > 0
          ? money(priceNumber)
          : "상담 후 안내"
      }`,
      `설치비: ${money(installFee)}`,
      `올스텐 배수구: ${money(drainFee)}`,
      `상판 타공: ${money(cuttingFee)}`,
      `예상 총금액: ${
        priceNumber > 0
          ? money(total)
          : "제품 가격 확인 후 안내"
      }`,
      "",
      "[고객 정보]",
      `성함: ${customerName}`,
      `배송/설치 지역: ${address}`,
      `요청사항: ${request || "없음"}`,
      "",
      "제품 구매 및 설치 상담 부탁드립니다.",
    ].join("\n");

    const separator =
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? "&"
        : "?";

    window.location.href =
      `sms:${PHONE}${separator}body=${
        encodeURIComponent(message)
      }`;
  };

  return (
    <main className="order-page">
      <style jsx>{`
        .order-page {
          min-height: 100vh;
          background: #f7f5f0;
          color: #19262b;
          font-family: Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
        }

        .order-header {
          background: #19262b;
          padding: 24px 20px;
          text-align: center;
        }

        .order-logo {
          color: #e5d2ad;
          font-size: 26px;
          letter-spacing: 4px;
          font-weight: 700;
          text-decoration: none;
        }

        .order-hero {
          background: #19262b;
          color: white;
          padding: 65px 20px 85px;
          text-align: center;
        }

        .eyebrow {
          color: #c4b49a;
          font-size: 11px;
          letter-spacing: 3px;
        }

        .order-hero h1 {
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 500;
          margin: 20px 0;
        }

        .order-hero p:last-child {
          color: #c9c9c9;
          line-height: 1.8;
          font-size: 14px;
        }

        .order-container {
          width: min(760px, calc(100% - 28px));
          margin: -35px auto 0;
          position: relative;
          padding-bottom: 90px;
        }

        .order-card {
          background: white;
          border: 1px solid #e8e3da;
          padding: 36px;
          margin-bottom: 20px;
          box-shadow: 0 12px 35px
            rgba(0, 0, 0, 0.035);
        }

        .card-label {
          font-size: 11px;
          color: #a89576;
          letter-spacing: 2px;
        }

        .order-card h2 {
          font-size: 23px;
          font-weight: 600;
          margin: 12px 0 28px;
        }

        .field {
          margin-bottom: 24px;
        }

        .field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .field input,
        .field select,
        .field textarea {
          display: block;
          width: 100%;
          padding: 15px;
          background: white;
          border: 1px solid #dedbd4;
          border-radius: 0;
          color: #19262b;
          font-size: 14px;
          outline: none;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #c4b49a;
        }

        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 19px 15px;
          border: 1px solid #e5e1da;
          margin-bottom: 10px;
          cursor: pointer;
        }

        .option.active {
          border-color: #b8a17b;
          background: #faf8f4;
        }

        .option-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .option input {
          accent-color: #b8a17b;
          width: 18px;
          height: 18px;
        }

        .option strong {
          font-size: 13px;
        }

        .option-price {
          font-size: 13px;
          color: #8e7857;
          white-space: nowrap;
        }

        .summary {
          background: #19262b;
          color: white;
          padding: 30px;
        }

        .summary h2 {
          color: #e5d2ad;
          font-size: 20px;
          margin: 0 0 25px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          font-size: 13px;
          color: #d1d4d4;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #4d585c;
          margin-top: 22px;
          padding-top: 25px;
        }

        .summary-total strong {
          color: #e5d2ad;
          font-size: 27px;
        }

        .sms-button {
          display: block;
          width: 100%;
          padding: 20px;
          margin-top: 22px;
          background: #c4b49a;
          color: #19262b;
          border: 0;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .notice {
          color: #aeb6b6;
          font-size: 12px;
          line-height: 1.9;
          margin-top: 18px;
        }

        .back-link {
          display: block;
          text-align: center;
          margin-top: 35px;
          font-size: 13px;
          color: #777;
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .order-card {
            padding: 25px 19px;
          }

          .summary {
            padding: 25px 20px;
          }

          .summary-total strong {
            font-size: 23px;
          }
        }
      `}</style>

      <header className="order-header">
        <Link href="/" className="order-logo">
          SINKMOA
        </Link>
      </header>

      <section className="order-hero">
        <p className="eyebrow">
          PREMIUM KITCHEN COLLECTION
        </p>
        <h1>주문 및 설치 문의</h1>
        <p>
          제품 선택부터 설치까지
          <br />
          싱크모아에서 편리하게 상담받으세요.
        </p>
      </section>

      <div className="order-container">
        <section className="order-card">
          <p className="card-label">01 / PRODUCT</p>
          <h2>제품 선택</h2>

          <div className="field">
            <label htmlFor="brand">제품 브랜드 *</label>
            <select
              id="brand"
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
            >
              <option value="">브랜드 선택</option>
              {BRANDS.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="model">제품 모델명 *</label>
            <input
              id="model"
              value={model}
              onChange={(e) =>
                setModel(e.target.value)
              }
              placeholder="구매 희망 모델명"
            />
          </div>

          <div className="field">
            <label htmlFor="price">
              제품 가격 (원)
            </label>
            <input
              id="price"
              type="number"
              min="0"
              value={productPrice}
              onChange={(e) =>
                setProductPrice(e.target.value)
              }
              placeholder="가격을 모르면 비워두세요"
            />
          </div>
        </section>

        <section className="order-card">
          <p className="card-label">02 / OPTIONS</p>
          <h2>구매 및 설치 옵션</h2>

          <label
            className={`option ${
              installation === "product"
                ? "active"
                : ""
            }`}
          >
            <span className="option-left">
              <input
                type="radio"
                name="installation"
                checked={installation === "product"}
                onChange={() => {
                  setInstallation("product");
                  setCutting(false);
                }}
              />
              <strong>제품만 구매</strong>
            </span>
            <span className="option-price">
              설치비 없음
            </span>
          </label>

          <label
            className={`option ${
              installation === "install"
                ? "active"
                : ""
            }`}
          >
            <span className="option-left">
              <input
                type="radio"
                name="installation"
                checked={installation === "install"}
                onChange={() =>
                  setInstallation("install")
                }
              />
              <strong>제품 + 설치</strong>
            </span>
            <span className="option-price">
              +170,000원
            </span>
          </label>

          <div style={{ height: 20 }} />

          <label
            className={`option ${
              stainlessDrain ? "active" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="checkbox"
                checked={stainlessDrain}
                onChange={(e) =>
                  setStainlessDrain(e.target.checked)
                }
              />
              <strong>올스텐 배수구 추가</strong>
            </span>
            <span className="option-price">
              +20,000원
            </span>
          </label>

          <label
            className={`option ${
              cutting ? "active" : ""
            }`}
            style={{
              opacity:
                installation === "install"
                  ? 1
                  : 0.45,
            }}
          >
            <span className="option-left">
              <input
                type="checkbox"
                disabled={installation !== "install"}
                checked={cutting}
                onChange={(e) =>
                  setCutting(e.target.checked)
                }
              />
              <strong>상판 타공 추가</strong>
            </span>
            <span className="option-price">
              +50,000원
            </span>
          </label>

          <p style={{
            fontSize: 12,
            color: "#777",
            lineHeight: 1.8,
            marginTop: 20,
          }}>
            기본 배수구는 제품 가격에 포함됩니다.
            설치비에는 기본 수전 연결 및
            배수구 연결 시공이 포함됩니다.
            상판 타공은 설치 포함 주문 시 선택할 수
            있습니다.
          </p>
        </section>

        <section className="order-card">
          <p className="card-label">03 / CUSTOMER</p>
          <h2>고객 정보</h2>

          <div className="field">
            <label htmlFor="name">고객 성함 *</label>
            <input
              id="name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              placeholder="성함 입력"
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
              placeholder="싱크볼 규격, 설치 희망일 등"
            />
          </div>
        </section>

        <section className="summary">
          <h2>ORDER SUMMARY</h2>

          <div className="summary-row">
            <span>제품 가격</span>
            <span>
              {priceNumber > 0
                ? money(priceNumber)
                : "상담 후 안내"}
            </span>
          </div>

          <div className="summary-row">
            <span>기본 설치비</span>
            <span>{money(installFee)}</span>
          </div>

          <div className="summary-row">
            <span>올스텐 배수구</span>
            <span>{money(drainFee)}</span>
          </div>

          <div className="summary-row">
            <span>상판 타공</span>
            <span>{money(cuttingFee)}</span>
          </div>

          <div className="summary-total">
            <span>예상 총금액</span>
            <strong>
              {priceNumber > 0
                ? money(total)
                : "견적 문의"}
            </strong>
          </div>

          <button
            className="sms-button"
            onClick={handleSMS}
          >
            문자로 주문 문의하기 ↗
          </button>

          <p className="notice">
            문자 버튼을 누르면 휴대폰 문자 앱이
            실행됩니다. 작성된 내용을 확인한 후
            직접 전송해주세요.
            <br />
            현장 상황 및 추가 작업 여부에 따라
            최종 견적이 달라질 수 있습니다.
          </p>
        </section>

        <Link href="/" className="back-link">
          ← 메인 홈페이지로 돌아가기
        </Link>
      </div>
    </main>
  );
}
