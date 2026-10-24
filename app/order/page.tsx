
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";

import {
  BRANDS,
  PRODUCTS,
  formatPrice,
  type BrandSlug,
} from "../data/products";

/* =========================================
   싱크모아 주문 페이지
   제품 사진 + 주문 기능 통합
========================================= */

const PHONE = "01094134686";

const PRICE = {
  installation: 170000,
  drain: 20000,
  cutting: 50000,
  faucet: 70000,
};

/* =========================================
   브랜드별 실제 제품 사진

   public 폴더 기준
========================================= */

const PRODUCT_IMAGES: Record<string, string> = {
  baekjo: "/IMG_1642.jpeg",
  regens: "/IMG_1772.jpeg",
  bellago: "/IMG_1757.jpeg",
  artisan: "/IMG_1771.jpeg",
};

function getProductImage(brand: string) {
  return PRODUCT_IMAGES[brand] ?? "";
}

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

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
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

  const [cutoutWidth, setCutoutWidth] =
    useState("");

  const [cutoutDepth, setCutoutDepth] =
    useState("");

  const [preferredDate, setPreferredDate] =
    useState("");

  const [request, setRequest] = useState("");

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  /* URL에서 브랜드/제품 자동 선택 */

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

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [confirmOpen]);

  /* =========================================
     상품 및 가격 계산
  ========================================= */

  const availableProducts = PRODUCTS.filter(
    (item) => item.brand === brand
  );

  const product = PRODUCTS.find(
    (item) => item.id === productId
  );

  const productImage = product
    ? getProductImage(product.brand)
    : "";

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

  /* =========================================
     주문 입력 검사
  ========================================= */

  function validateOrder() {
    if (!brand) {
      alert("브랜드를 선택해주세요.");
      return false;
    }

    if (!product) {
      alert("제품 모델을 선택해주세요.");
      return false;
    }

    if (!name.trim()) {
      alert("성함을 입력해주세요.");
      return false;
    }

    if (!validPhone(phone)) {
      alert(
        "휴대폰 번호를 정확히 입력해주세요."
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
        "상판 타공 치수를 올바르게 입력해주세요."
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

  /* =========================================
     문자 문의 내용
  ========================================= */

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
      /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? "&"
        : "?";

    const smsUrl = `sms:${PHONE}${separator}body=${encodeURIComponent(
      message
    )}`;

    setConfirmOpen(false);
    window.location.href = smsUrl;
  }

  return (
    <main className="order-page">
      <SiteHeader />

      {/* 상단 히어로 */}

      <section className="order-hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">
            SINKMOA · PRIVATE ORDER
          </span>

          <h1>
            나에게 맞는 싱크볼,
            <br />
            간편하게 선택하세요.
          </h1>

          <p>
            제품 선택부터 설치 상담까지
            <br />
            싱크모아가 함께합니다.
          </p>

          <div className="steps">
            <span>
              <b>01</b> 제품 선택
            </span>

            <i />

            <span>
              <b>02</b> 옵션 선택
            </span>

            <i />

            <span>
              <b>03</b> 문의 접수
            </span>
          </div>
        </div>
      </section>

      <div className="order-container">
        <div className="form-column">
          {/* STEP 01 */}

          <section className="panel">
            <div className="section-heading">
              <div>
                <span className="section-number">
                  STEP 01 / PRODUCT
                </span>

                <h2>싱크볼 제품 선택</h2>
              </div>

              <span className="section-icon">
                01
              </span>
            </div>

            <div className="two-cols">
              <div className="field">
                <label htmlFor="brand">
                  브랜드 <em>*</em>
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
                      <option
                        key={slug}
                        value={slug}
                      >
                        {item.name} · {item.english}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="field">
                <label htmlFor="product">
                  제품 모델 <em>*</em>
                </label>

                <select
                  id="product"
                  value={productId}
                  disabled={
                    !brand ||
                    availableProducts.length === 0
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

                  {availableProducts.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name} ·{" "}
                        {formatPrice(item.price)}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* 선택 제품 이미지 및 정보 */}

            {product ? (
              <div className="selected-product">
                {productImage && (
                  <div className="product-photo">
                    <Image
                      src={productImage}
                      alt={`${brandName} ${product.name} 싱크볼 제품 사진`}
                      fill
                      sizes="(max-width: 600px) 100vw, 320px"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                <div className="selected-info">
                  <span className="selected-label">
                    SELECTED PRODUCT
                  </span>

                  <h3>{product.name}</h3>

                  <p>
                    {brandName} · 프리미엄 사각 싱크볼
                  </p>

                  <strong className="selected-price">
                    {formatPrice(product.price)}
                  </strong>
                </div>

                <div className="product-spec">
                  <span>
                    설치 방식
                    <strong>
                      {product.installationType ??
                        "상담 시 확인"}
                    </strong>
                  </span>

                  <span>
                    상판 타공 치수
                    <strong>
                      {cutoutSize}
                    </strong>
                  </span>
                </div>

                <Link
                  href={`/products/${product.brand}`}
                  className="product-link"
                >
                  해당 브랜드 상품 더 보기
                  <span>↗</span>
                </Link>
              </div>
            ) : (
              <div className="empty-product">
                <span className="empty-symbol">
                  ◇
                </span>

                <div>
                  <strong>
                    원하는 제품을 선택해주세요.
                  </strong>

                  <p>
                    모델 선택 시 실제 제품 사진,
                    가격과 타공 치수가 표시됩니다.
                  </p>
                </div>
              </div>
            )}

            <p className="section-note">
              ※ 표시된 타공 치수는 싱크볼
              외경이 아닌 상판 타공 기준입니다.
              실제 설치 가능 여부는 현장
              확인 후 안내됩니다.
            </p>
          </section>

          {/* STEP 02 */}

          <section className="panel">
            <div className="section-heading">
              <div>
                <span className="section-number">
                  STEP 02 / OPTIONS
                </span>

                <h2>구매 방식 및 옵션</h2>
              </div>

              <span className="section-icon">
                02
              </span>
            </div>

            <h3 className="subheading">
              구매 방식
            </h3>

            <div className="choice-grid">
              <label
                className={`choice ${
                  !installation ? "active" : ""
                }`}
              >
                <div className="choice-top">
                  <input
                    type="radio"
                    name="purchase"
                    checked={!installation}
                    onChange={() =>
                      changeInstallation(false)
                    }
                  />

                  <strong>제품만 구매</strong>
                </div>

                <span className="choice-price">
                  추가 설치비 없음
                </span>

                <small>
                  싱크볼 제품을 택배로
                  받아보세요.
                </small>
              </label>

              <label
                className={`choice ${
                  installation ? "active" : ""
                }`}
              >
                <div className="choice-top">
                  <input
                    type="radio"
                    name="purchase"
                    checked={installation}
                    onChange={() =>
                      changeInstallation(true)
                    }
                  />

                  <strong>제품 + 설치</strong>
                </div>

                <span className="choice-price">
                  +170,000원
                </span>

                <small>
                  기존 철거 및 수전·배수구
                  연결 포함
                </small>
              </label>
            </div>

            <div className="option-title-row">
              <h3 className="subheading">
                추가 옵션
              </h3>

              <span>필요한 옵션만 선택</span>
            </div>

            <label
              className={`option-line ${
                drain ? "checked" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={drain}
                onChange={(e) =>
                  setDrain(e.target.checked)
                }
              />

              <span className="option-copy">
                <strong>
                  올스텐 배수구
                </strong>

                <small>
                  기본 배수구에서 올스텐으로 변경
                </small>
              </span>

              <b>+20,000원</b>
            </label>

            <label
              className={`option-line ${
                cutting ? "checked" : ""
              } ${
                !installation ? "disabled" : ""
              }`}
            >
              <input
                type="checkbox"
                disabled={!installation}
                checked={cutting}
                onChange={(e) =>
                  setCutting(e.target.checked)
                }
              />

              <span className="option-copy">
                <strong>상판 타공</strong>

                <small>
                  기존 상판 타공 사이즈 변경
                </small>
              </span>

              <b>+50,000원</b>
            </label>

            <label
              className={`option-line ${
                faucet ? "checked" : ""
              } ${
                !installation ? "disabled" : ""
              }`}
            >
              <input
                type="checkbox"
                disabled={!installation}
                checked={faucet}
                onChange={(e) =>
                  setFaucet(e.target.checked)
                }
              />

              <span className="option-copy">
                <strong>
                  6WAY 수전 제품
                </strong>

                <small>
                  설치 주문 시 수전 교체
                  시공비 무료
                </small>
              </span>

              <b>+70,000원</b>
            </label>

            <p className="section-note">
              기본 배수구는 제품 가격에
              포함됩니다. 올스텐 배수구는
              제품만 구매할 때도 선택할 수
              있습니다. 상판 타공과 6WAY
              수전은 설치 주문 시에만
              선택 가능합니다.
            </p>
          </section>

          {/* STEP 03 */}

          <section className="panel">
            <div className="section-heading">
              <div>
                <span className="section-number">
                  STEP 03 / CUSTOMER
                </span>

                <h2>고객 정보 입력</h2>
              </div>

              <span className="section-icon">
                03
              </span>
            </div>

            <div className="two-cols">
              <div className="field">
                <label htmlFor="name">
                  성함 <em>*</em>
                </label>

                <input
                  id="name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="성함 입력"
                  autoComplete="name"
                  maxLength={40}
                />
              </div>

              <div className="field">
                <label htmlFor="phone">
                  휴대폰 번호 <em>*</em>
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      formatPhone(e.target.value)
                    )
                  }
                  placeholder="010-1234-5678"
                  autoComplete="tel"
                  maxLength={13}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="address">
                {addressLabel} <em>*</em>
              </label>

              <input
                id="address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder={
                  installation
                    ? "설치 방문 주소를 입력해주세요"
                    : "제품 배송 주소를 입력해주세요"
                }
                autoComplete="street-address"
                maxLength={200}
              />
            </div>

            {installation && (
              <div className="install-extra">
                <div className="subheading">
                  설치 환경 및 희망 일정
                  <span>선택 입력</span>
                </div>

                <p>
                  기존 상판 타공 치수를
                  모르셔도 상담 신청이
                  가능합니다.
                </p>

                <div className="two-cols">
                  <div className="field">
                    <label htmlFor="cutoutWidth">
                      기존 타공 가로 (mm)
                    </label>

                    <input
                      id="cutoutWidth"
                      type="number"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={cutoutWidth}
                      onChange={(e) =>
                        setCutoutWidth(
                          e.target.value
                        )
                      }
                      placeholder="예: 780"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="cutoutDepth">
                      기존 타공 세로 (mm)
                    </label>

                    <input
                      id="cutoutDepth"
                      type="number"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      value={cutoutDepth}
                      onChange={(e) =>
                        setCutoutDepth(
                          e.target.value
                        )
                      }
                      placeholder="예: 400"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="preferredDate">
                    희망 설치 날짜
                  </label>

                  <input
                    id="preferredDate"
                    type="date"
                    min={todayLocal()}
                    value={preferredDate}
                    onChange={(e) =>
                      setPreferredDate(
                        e.target.value
                      )
                    }
                  />

                  <p className="field-help">
                    실제 설치 일정은 상담 후
                    확정됩니다.
                  </p>
                </div>
              </div>
            )}

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
                placeholder="상판 재질, 기존 싱크볼 상태, 배송 및 설치 관련 요청사항 등을 입력해주세요."
                maxLength={1000}
              />
            </div>
          </section>
        </div>

        {/* 예상 주문 금액 */}

        <aside className="summary-column">
          <section className="summary-box">
            <span className="summary-eyebrow">
              YOUR ORDER SUMMARY
            </span>

            <h2>예상 주문 금액</h2>

            <div className="summary-rows">
              <div>
                <span>싱크볼 제품</span>

                <strong>
                  {product
                    ? formatPrice(productPrice)
                    : "제품 선택 필요"}
                </strong>
              </div>

              <div>
                <span>기본 설치</span>

                <strong>
                  {formatPrice(installPrice)}
                </strong>
              </div>

              <div>
                <span>올스텐 배수구</span>

                <strong>
                  {formatPrice(drainPrice)}
                </strong>
              </div>

              <div>
                <span>상판 타공</span>

                <strong>
                  {formatPrice(cuttingPrice)}
                </strong>
              </div>

              <div>
                <span>6WAY 수전 제품</span>

                <strong>
                  {formatPrice(faucetPrice)}
                </strong>
              </div>
            </div>

            <div className="total-row">
              <span>예상 총금액</span>

              <strong>
                {product
                  ? formatPrice(total)
                  : "견적 문의"}
              </strong>
            </div>

            <button
              type="button"
              className="submit-order"
              onClick={openConfirmation}
            >
              주문 내용 확인하기
              <span>↗</span>
            </button>

            <p className="summary-notice">
              주문 내용 확인 후 문자 앱으로
              이동합니다. 문자를 직접 전송해야
              문의가 접수됩니다.
              <br />
              <br />
              배송비, 현장 상태, 타공 가능
              여부에 따라 최종 금액이
              달라질 수 있습니다.
            </p>
          </section>

          <div className="service-note">
            <strong>
              SINKMOA INSTALLATION SERVICE
            </strong>

            <p>
              제품 선택부터 설치 상담까지,
              <br />
              싱크모아가 꼼꼼하게 안내합니다.
            </p>
          </div>
        </aside>
      </div>

      <Link
        href="/"
        className="return-link"
      >
        ← 싱크모아 메인으로 돌아가기
      </Link>

      {/* 최종 확인창 */}

      {confirmOpen && (
        <div
          className="confirm-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget
            ) {
              setConfirmOpen(false);
            }
          }}
        >
          <div
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
          >
            <button
              type="button"
              className="dialog-close"
              aria-label="닫기"
              onClick={() =>
                setConfirmOpen(false)
              }
            >
              ×
            </button>

            <span className="section-number">
              FINAL ORDER REVIEW
            </span>

            <h2 id="confirm-title">
              주문 내용 최종 확인
            </h2>

            <p className="dialog-intro">
              아래 내용을 확인해주세요.
              문자 앱에서 직접 전송해야
              상담이 접수됩니다.
            </p>

            {[
              ["브랜드", brandName],
              ["제품", product?.name ?? ""],
              [
                "구매 방식",
                installation
                  ? "제품 + 설치"
                  : "제품만 구매",
              ],
              [
                "올스텐 배수구",
                drain ? "선택" : "미선택",
              ],
              ...(installation
                ? [
                    [
                      "상판 타공",
                      cutting
                        ? "선택"
                        : "미선택",
                    ],
                    [
                      "6WAY 수전",
                      faucet
                        ? "선택"
                        : "미선택",
                    ],
                  ]
                : []),
              ["성함", name.trim()],
              [
                "연락처",
                formatPhone(phone),
              ],
              [
                addressLabel,
                address.trim(),
              ],
              ...(installation
                ? [
                    [
                      "기존 상판 타공",
                      existingCutout,
                    ],
                    [
                      "희망 설치 날짜",
                      preferredDate ||
                        "일정 상담 희망",
                    ],
                  ]
                : []),
              [
                "요청사항",
                request.trim() || "없음",
              ],
            ].map(([label, value]) => (
              <div
                className="review-row"
                key={label}
              >
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}

            <div className="review-total">
              <span>예상 총금액</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                className="edit-button"
                onClick={() =>
                  setConfirmOpen(false)
                }
              >
                다시 수정하기
              </button>

              <button
                type="button"
                className="send-button"
                onClick={sendSMS}
              >
                문자 앱 열기 ↗
              </button>
            </div>

            <p className="dialog-foot">
              문자 수신 번호:
              010-9413-4686
              <br />
              실제 결제나 주문 확정이 아닌
              상담 요청 단계입니다.
            </p>
          </div>
        </div>
      )}

      {/* 디자인 */}

      <style jsx>{`
        .order-page {
          --ink: #19262b;
          --gold: #c4b49a;
          --ivory: #f7f5f0;
          min-height: 100vh;
          background: var(--ivory);
          color: var(--ink);
          font-family: Arial,
            "Apple SD Gothic Neo",
            "Malgun Gothic",
            sans-serif;
          word-break: keep-all;
        }

        .order-page *,
        .order-page *::before,
        .order-page *::after {
          box-sizing: border-box;
        }

        .order-page a {
          text-decoration: none;
        }

        .order-page input,
        .order-page select,
        .order-page textarea,
        .order-page button {
          font-family: inherit;
        }

        .order-hero {
          background: #19262b;
          color: white;
          padding: 80px 20px 115px;
          text-align: center;
        }

        .hero-inner {
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-eyebrow,
        .section-number,
        .summary-eyebrow {
          display: block;
          color: #a99577;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }

        .order-hero h1 {
          font-size: clamp(
            35px,
            5vw,
            54px
          );
          line-height: 1.35;
          letter-spacing: -0.055em;
          font-weight: 400;
          margin: 22px 0;
        }

        .order-hero p {
          color: #cbd1cf;
          font-size: 14px;
          line-height: 1.9;
          margin: 0;
        }

        .steps {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 35px;
          font-size: 12px;
          color: #d6d9d6;
        }

        .steps span {
          white-space: nowrap;
        }

        .steps b {
          color: #c4b49a;
          margin-right: 5px;
        }

        .steps i {
          width: 25px;
          height: 1px;
          background: #6b7473;
        }

        .order-container {
          max-width: 1200px;
          padding: 0 20px;
          margin: -45px auto 0;
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns:
            minmax(0, 1fr) 350px;
          gap: 22px;
          align-items: start;
        }

        .form-column {
          min-width: 0;
        }

        .panel {
          background: white;
          border: 1px solid #e7e1d8;
          padding: 38px;
          margin-bottom: 18px;
        }

        .section-heading {
          display: flex;
          justify-content:
            space-between;
          align-items: flex-start;
          margin-bottom: 30px;
        }

        .section-heading h2 {
          font-size: 27px;
          font-weight: 600;
          letter-spacing: -0.045em;
          margin: 13px 0 0;
        }

        .section-icon {
          color: #e3d9c8;
          font-size: 35px;
          font-weight: 300;
        }

        .two-cols {
          display: grid;
          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );
          gap: 15px;
        }

        .field {
          margin-bottom: 20px;
          min-width: 0;
        }

        .field label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .field em {
          color: #aa9270;
          font-style: normal;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          min-width: 0;
          padding: 15px;
          border: 1px solid #ddd8cf;
          border-radius: 4px;
          background: #fff;
          color: #19262b;
          font-size: 13px;
          outline: none;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #a99577;
        }

        .field select:disabled {
          background: #f5f4f1;
          color: #999;
        }

        .field textarea {
          resize: vertical;
          line-height: 1.8;
        }

        .field-help {
          color: #858580;
          font-size: 11px;
          line-height: 1.8;
          margin: 8px 0 0;
        }

        /* 제품 사진 영역 */

        .selected-product {
          display: grid;
          grid-template-columns:
            180px minmax(0, 1fr);
          gap: 20px;
          background: #f8f6f2;
          border: 1px solid #e8e1d5;
          padding: 20px;
          margin-top: 5px;
        }

        .product-photo {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: #fff;
          border: 1px solid #e9e5df;
          overflow: hidden;
        }

        .selected-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .selected-label {
          color: #9b8667;
          font-size: 10px;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        .selected-info h3 {
          font-size: 18px;
          line-height: 1.5;
          margin: 12px 0 6px;
        }

        .selected-info p {
          color: #888;
          font-size: 11px;
          line-height: 1.7;
          margin: 0;
        }

        .selected-price {
          color: #19262b;
          font-size: 23px;
          margin-top: 16px;
        }

        .product-spec {
          grid-column: 1 / -1;
          border-top: 1px solid #e4ded4;
          padding-top: 16px;
          display: flex;
          gap: 30px;
        }

        .product-spec span {
          color: #888;
          font-size: 11px;
        }

        .product-spec strong {
          display: block;
          color: #19262b;
          font-size: 12px;
          margin-top: 7px;
        }

        .product-link {
          grid-column: 1 / -1;
          display: flex;
          justify-content:
            space-between;
          align-items: center;
          padding: 13px 15px;
          background: #fff;
          border: 1px solid #e5ded2;
          color: #19262b;
          font-size: 12px;
          font-weight: 600;
        }

        .product-link span {
          font-size: 17px;
          color: #a99577;
        }

        .empty-product {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #faf9f6;
          border: 1px dashed #dcd5ca;
          padding: 22px;
        }

        .empty-symbol {
          font-size: 25px;
          color: #b9a585;
        }

        .empty-product strong {
          font-size: 13px;
        }

        .empty-product p {
          font-size: 11px;
          color: #888;
          line-height: 1.7;
          margin: 7px 0 0;
        }

        .section-note {
          font-size: 11px;
          color: #898985;
          line-height: 1.9;
          margin: 20px 0 0;
        }

        .subheading {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 15px;
        }

        .choice-grid {
          display: grid;
          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );
          gap: 12px;
          margin-bottom: 32px;
        }

        .choice {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 150px;
          border: 1px solid #e2ddd4;
          padding: 20px;
          cursor: pointer;
        }

        .choice.active {
          border-color: #a99577;
          background: #faf8f4;
        }

        .choice-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .choice-top input,
        .option-line input {
          accent-color: #a99577;
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          margin: 0;
        }

        .choice-top strong {
          font-size: 14px;
        }

        .choice-price {
          color: #967f5c;
          font-size: 18px;
          font-weight: 700;
        }

        .choice small {
          color: #858580;
          font-size: 11px;
          line-height: 1.7;
        }

        .option-title-row {
          display: flex;
          align-items: center;
          justify-content:
            space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .option-title-row .subheading {
          margin: 0;
        }

        .option-title-row > span {
          color: #999;
          font-size: 11px;
        }

        .option-line {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 17px 13px;
          border-bottom: 1px solid #eae6df;
          cursor: pointer;
        }

        .option-line.checked {
          background: #faf8f4;
        }

        .option-line.disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .option-copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .option-copy strong {
          font-size: 13px;
        }

        .option-copy small {
          color: #888;
          font-size: 11px;
          line-height: 1.5;
        }

        .option-line > b {
          color: #927b5a;
          font-size: 13px;
          white-space: nowrap;
        }

        .install-extra {
          padding: 23px;
          background: #faf8f4;
          border: 1px solid #e7e1d8;
          margin: 10px 0 23px;
        }

        .install-extra .subheading {
          display: flex;
          justify-content:
            space-between;
          align-items: center;
        }

        .install-extra .subheading span {
          color: #a18e72;
          font-size: 11px;
          font-weight: 400;
        }

        .install-extra > p {
          color: #888;
          font-size: 11px;
          line-height: 1.8;
          margin: 0 0 22px;
        }

        .summary-column {
          position: sticky;
          top: 20px;
        }

        .summary-box {
          background: #19262b;
          color: white;
          padding: 30px;
        }

        .summary-eyebrow {
          color: #c4b49a;
        }

        .summary-box h2 {
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.04em;
          margin: 13px 0 25px;
        }

        .summary-rows > div {
          display: flex;
          justify-content:
            space-between;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid
            rgba(
              255,
              255,
              255,
              0.1
            );
          font-size: 12px;
        }

        .summary-rows span {
          color: #b9c1c0;
        }

        .summary-rows strong {
          color: #fff;
          text-align: right;
          font-weight: 500;
        }

        .total-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          padding: 25px 0;
        }

        .total-row span {
          color: #d1d7d5;
          font-size: 13px;
        }

        .total-row strong {
          color: #e5d2ad;
          font-size: 30px;
          letter-spacing: -0.04em;
        }

        .submit-order {
          width: 100%;
          border: 0;
          background: #c4b49a;
          color: #19262b;
          padding: 18px;
          display: flex;
          justify-content:
            space-between;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .submit-order:hover {
          background: #d7c8b0;
        }

        .submit-order span {
          font-size: 20px;
        }

        .summary-notice {
          color: #b7c0be;
          font-size: 11px;
          line-height: 1.9;
          margin: 18px 0 0;
        }

        .service-note {
          padding: 25px 10px;
          text-align: center;
        }

        .service-note strong {
          color: #a18e72;
          font-size: 10px;
          letter-spacing: 0.15em;
        }

        .service-note p {
          color: #858580;
          font-size: 12px;
          line-height: 1.9;
        }

        .return-link {
          display: block;
          text-align: center;
          padding: 35px 20px 80px;
          color: #777;
          font-size: 12px;
        }

        .confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(
            8,
            16,
            20,
            0.78
          );
        }

        .confirm-dialog {
          position: relative;
          width: 100%;
          max-width: 520px;
          max-height: calc(
            100dvh - 36px
          );
          overflow-y: auto;
          background: #fff;
          padding: 35px;
          color: #19262b;
        }

        .dialog-close {
          position: absolute;
          top: 13px;
          right: 18px;
          border: 0;
          background: transparent;
          color: #687170;
          font-size: 28px;
          cursor: pointer;
        }

        .confirm-dialog h2 {
          font-size: 25px;
          letter-spacing: -0.04em;
          margin: 12px 0;
        }

        .dialog-intro {
          font-size: 12px;
          line-height: 1.8;
          color: #777;
          margin: 0 0 20px;
        }

        .review-row {
          display: flex;
          justify-content:
            space-between;
          gap: 15px;
          border-bottom: 1px solid #eae5dd;
          padding: 11px 0;
          font-size: 12px;
          line-height: 1.6;
        }

        .review-row span {
          flex-shrink: 0;
          color: #858580;
        }

        .review-row strong {
          text-align: right;
          overflow-wrap: anywhere;
          font-weight: 600;
        }

        .review-total {
          display: flex;
          justify-content:
            space-between;
          align-items: center;
          gap: 12px;
          padding: 23px 0;
        }

        .review-total span {
          font-size: 13px;
        }

        .review-total strong {
          font-size: 25px;
          color: #927b5a;
        }

        .dialog-actions {
          display: grid;
          grid-template-columns:
            1fr 1fr;
          gap: 9px;
        }

        .dialog-actions button {
          padding: 15px 8px;
          border: 1px solid #19262b;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .edit-button {
          background: white;
          color: #19262b;
        }

        .send-button {
          background: #19262b;
          color: white;
        }

        .dialog-foot {
          font-size: 11px;
          line-height: 1.9;
          color: #898b88;
          margin: 15px 0 0;
        }

        @media (max-width: 950px) {
          .order-container {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .summary-column {
            position: static;
          }

          .service-note {
            display: none;
          }

          .summary-box {
            padding: 30px;
          }

          .total-row {
            flex-direction: row;
            align-items: center;
            justify-content:
              space-between;
          }

          .total-row strong {
            font-size: 29px;
          }
        }

        @media (max-width: 600px) {
          .order-hero {
            padding: 61px 20px 88px;
          }

          .order-hero h1 {
            font-size: 36px;
          }

          .order-hero p {
            font-size: 13px;
          }

          .steps {
            gap: 8px;
            margin-top: 27px;
            font-size: 10px;
          }

          .steps i {
            width: 11px;
          }

          .steps b {
            font-size: 10px;
          }

          .order-container {
            margin-top: -35px;
            padding: 0 12px;
            gap: 0;
          }

          .panel {
            padding: 25px 19px;
            margin-bottom: 12px;
          }

          .section-heading {
            margin-bottom: 23px;
          }

          .section-heading h2 {
            font-size: 23px;
          }

          .two-cols {
            grid-template-columns:
              1fr;
            gap: 0;
          }

          .field {
            margin-bottom: 17px;
          }

          /* 모바일 제품 사진 */

          .selected-product {
            grid-template-columns: 1fr;
            gap: 15px;
            padding: 15px;
          }

          .product-photo {
            aspect-ratio: 4 / 3;
          }

          .selected-info {
            padding: 2px;
          }

          .selected-info h3 {
            font-size: 17px;
          }

          .selected-price {
            font-size: 22px;
          }

          .product-spec {
            grid-column: 1;
            gap: 22px;
          }

          .product-link {
            grid-column: 1;
          }

          .choice-grid {
            gap: 8px;
          }

          .choice {
            padding: 15px 12px;
            min-height: 151px;
          }

          .choice-top strong {
            font-size: 12px;
          }

          .choice-price {
            font-size: 15px;
          }

          .choice small {
            font-size: 10px;
          }

          .option-line {
            gap: 9px;
          }

          .option-copy strong,
          .option-line > b {
            font-size: 12px;
          }

          .option-copy small {
            font-size: 10px;
          }

          .install-extra {
            padding: 16px 13px;
          }

          .install-extra .subheading {
            display: block;
          }

          .install-extra .subheading span {
            display: block;
            text-align: left;
            margin-top: 7px;
          }

          .summary-box {
            padding: 27px 22px;
          }

          .total-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .return-link {
            padding-bottom: 60px;
          }

          .confirm-dialog {
            padding: 25px 19px;
          }

          .review-total strong {
            font-size: 23px;
          }
        }
      `}</style>
    </main>
  );
}
