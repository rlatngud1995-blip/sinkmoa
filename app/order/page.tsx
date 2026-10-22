
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PHONE = "01094134686";

const PRICES = {
  installation: 170000,
  stainlessDrain: 20000,
  cutting: 50000,
  faucet6way: 70000,
};

const BRANDS = [
  { value: "regens", name: "리젠스" },
  { value: "bellago", name: "벨라고" },
  { value: "artisan", name: "아티잔" },
  { value: "baekjo", name: "백조" },
];

function formatPrice(value: number) {
  return value.toLocaleString("ko-KR") + "원";
}

export default function OrderPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [installation, setInstallation] =
    useState(false);

  const [stainlessDrain, setStainlessDrain] =
    useState(false);

  const [cutting, setCutting] = useState(false);

  const [faucet6way, setFaucet6way] =
    useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const selectedBrand = params.get("brand");

    if (
      selectedBrand &&
      BRANDS.some(
        (item) => item.value === selectedBrand
      )
    ) {
      setBrand(selectedBrand);
    }
  }, []);

  const productAmount =
    Number(productPrice) > 0
      ? Number(productPrice)
      : 0;

  const installationAmount = installation
    ? PRICES.installation
    : 0;

  const drainAmount = stainlessDrain
    ? PRICES.stainlessDrain
    : 0;

  const cuttingAmount =
    installation && cutting
      ? PRICES.cutting
      : 0;

  const faucetAmount =
    installation && faucet6way
      ? PRICES.faucet6way
      : 0;

  const total =
    productAmount +
    installationAmount +
    drainAmount +
    cuttingAmount +
    faucetAmount;

  const selectedBrand = BRANDS.find(
    (item) => item.value === brand
  );

  function changeInstallation(value: boolean) {
    setInstallation(value);

    if (!value) {
      setCutting(false);
      setFaucet6way(false);
    }
  }

  function handleSMS() {
    if (!brand) {
      alert("브랜드를 선택해주세요.");
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
      "■ 제품 정보",
      `브랜드: ${selectedBrand?.name}`,
      `모델명: ${model}`,
      `구매 방식: ${
        installation
          ? "싱크볼 제품 + 설치"
          : "싱크볼 제품만 구매"
      }`,
      "",
      "■ 선택 옵션",
      `올스텐 배수구: ${
        stainlessDrain ? "선택" : "미선택"
      }`,
      `상판 타공: ${
        cuttingAmount > 0 ? "선택" : "미선택"
      }`,
      `6WAY 수전: ${
        faucetAmount > 0
          ? "제품 구매 + 무료 교체 설치"
          : "미선택"
      }`,
      "",
      "■ 예상 금액",
      `싱크볼 제품: ${
        productAmount > 0
          ? formatPrice(productAmount)
          : "상담 후 안내"
      }`,
      `싱크볼 설치비: ${
        formatPrice(installationAmount)
      }`,
      `올스텐 배수구: ${
        formatPrice(drainAmount)
      }`,
      `상판 타공: ${
        formatPrice(cuttingAmount)
      }`,
      `6WAY 수전 제품: ${
        formatPrice(faucetAmount)
      }`,
      "6WAY 수전 교체 설치비: 무료",
      `예상 총금액: ${
        productAmount > 0
          ? formatPrice(total)
          : "제품 가격 확인 후 안내"
      }`,
      "",
      "■ 고객 정보",
      `성함: ${customerName}`,
      `배송/설치 지역: ${address}`,
      `요청사항: ${request || "없음"}`,
      "",
      "구매 및 설치 상담 부탁드립니다.",
    ].join("\n");

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

        .header {
          background: #19262b;
          text-align: center;
          padding: 25px 20px;
        }

        .logo {
          color: #e5d2ad;
          font-size: 26px;
          letter-spacing: 4px;
          font-weight: 700;
          text-decoration: none;
        }

        .hero {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 65px 20px 85px;
        }

        .eyebrow {
          color: #c4b49a;
          font-size: 11px;
          letter-spacing: 3px;
        }

        .hero h1 {
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 500;
          margin: 20px 0;
        }

        .hero p:last-child {
          color: #d1d1d1;
          line-height: 1.9;
          font-size: 14px;
        }

        .container {
          width: min(760px, calc(100% - 28px));
          margin: -35px auto 0;
          position: relative;
          padding-bottom: 90px;
        }

        .card {
          background: white;
          border: 1px solid #e8e3da;
          padding: 36px;
          margin-bottom: 20px;
        }

        .section-label {
          font-size: 11px;
          color: #a89576;
          letter-spacing: 2px;
        }

        .card h2 {
          font-size: 23px;
          margin: 12px 0 28px;
          font-weight: 600;
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
          width: 100%;
          padding: 15px;
          border: 1px solid #dedbd4;
          background: white;
          color: #19262b;
          font-size: 14px;
          border-radius: 0;
          box-sizing: border-box;
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

        .option.disabled {
          opacity: 0.45;
          cursor: not-allowed;
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

        .helper {
          font-size: 12px;
          color: #777;
          line-height: 1.9;
          margin-top: 18px;
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
          font-size: 26px;
        }

        .sms-button {
          width: 100%;
          padding: 20px;
          margin-top: 22px;
          background: #c4b49a;
          color: #19262b;
          border: none;
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
          .card {
            padding: 25px 19px;
          }

          .summary {
            padding: 25px 20px;
          }

          .summary-total strong {
            font-size: 22px;
          }

          .option strong {
            font-size: 12px;
          }

          .option-price {
            font-size: 12px;
          }
        }
      `}</style>

      <header className="header">
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
          싱크볼 제품 선택부터 설치까지
          <br />
          편리하게 상담받으세요.
        </p>
      </section>

      <div className="container">
        <section className="card">
          <p className="section-label">
            01 / PRODUCT
          </p>
          <h2>제품 선택</h2>

          <div className="field">
            <label>제품 브랜드 *</label>
            <select
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
            >
              <option value="">
                브랜드 선택
              </option>
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
            <label>제품 모델명 *</label>
            <input
              value={model}
              onChange={(e) =>
                setModel(e.target.value)
              }
              placeholder="제품 모델명 입력"
            />
          </div>

          <div className="field">
            <label>싱크볼 제품 가격 (원)</label>
            <input
              type="number"
              min="0"
              value={productPrice}
              onChange={(e) =>
                setProductPrice(e.target.value)
              }
              placeholder="모르면 비워두세요"
            />
          </div>
        </section>

        <section className="card">
          <p className="section-label">
            02 / OPTIONS
          </p>
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
              faucet6way ? "active" : ""
            } ${
              !installation ? "disabled" : ""
            }`}
          >
            <span className="option-left">
              <input
                type="checkbox"
                disabled={!installation}
                checked={faucet6way}
                onChange={(e) =>
                  setFaucet6way(e.target.checked)
                }
              />
              <strong>
                6WAY 수전 제품 + 무료 교체 설치
              </strong>
            </span>
            <span className="option-price">
              +70,000원
            </span>
          </label>

          <p className="helper">
            기본 배수구는 싱크볼 제품 가격에
            포함됩니다.
            <br />
            기본 설치비에는 수전 연결 및 배수구
            연결 작업이 포함됩니다.
            <br />
            6WAY 수전은 싱크볼 설치 주문 시에만
            추가할 수 있으며 교체 설치비는
            무료입니다.
          </p>
        </section>

        <section className="card">
          <p className="section-label">
            03 / CUSTOMER
          </p>
          <h2>고객 정보</h2>

          <div className="field">
            <label>고객 성함 *</label>
            <input
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              placeholder="성함 입력"
            />
          </div>

          <div className="field">
            <label>배송 또는 설치 지역 *</label>
            <input
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="예: 경기도 안산시 단원구"
            />
          </div>

          <div className="field">
            <label>추가 요청사항</label>
            <textarea
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
            <span>싱크볼 제품</span>
            <span>
              {productAmount > 0
                ? formatPrice(productAmount)
                : "상담 후 안내"}
            </span>
          </div>

          <div className="summary-row">
            <span>싱크볼 설치비</span>
            <span>
              {formatPrice(installationAmount)}
            </span>
          </div>

          <div className="summary-row">
            <span>올스텐 배수구</span>
            <span>
              {formatPrice(drainAmount)}
            </span>
          </div>

          <div className="summary-row">
            <span>상판 타공</span>
            <span>
              {formatPrice(cuttingAmount)}
            </span>
          </div>

          <div className="summary-row">
            <span>6WAY 수전 제품</span>
            <span>
              {formatPrice(faucetAmount)}
            </span>
          </div>

          {faucet6way && installation && (
            <div className="summary-row">
              <span>6WAY 수전 교체 설치비</span>
              <span>무료</span>
            </div>
          )}

          <div className="summary-total">
            <span>예상 총금액</span>
            <strong>
              {productAmount > 0
                ? formatPrice(total)
                : "견적 문의"}
            </strong>
          </div>

          <button
            type="button"
            className="sms-button"
            onClick={handleSMS}
          >
            문자로 주문 문의하기 ↗
          </button>

          <p className="notice">
            문자 버튼을 누르면 휴대폰 문자 앱이
            실행됩니다. 고객이 직접 전송해야
            문의가 접수됩니다.
            <br />
            현장 상태에 따라 최종 견적은
            달라질 수 있습니다.
          </p>
        </section>

        <Link href="/" className="back-link">
          ← 메인 홈페이지로 돌아가기
        </Link>
      </div>
    </main>
  );
}
