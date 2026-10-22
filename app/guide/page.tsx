
import Link from "next/link";
import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "구매·배송·설치 안내 | 싱크모아",
  description:
    "싱크모아 싱크볼 제품 구매, 택배 배송, 전문 설치 서비스 및 추가 옵션 안내",
};

const steps = [
  {
    number: "01",
    title: "제품 선택",
    description:
      "브랜드별 컬렉션에서 원하는 싱크볼 모델과 상판 타공 사이즈를 확인합니다.",
  },
  {
    number: "02",
    title: "구매 방식 선택",
    description:
      "제품만 구매하거나 설치 서비스를 함께 선택합니다.",
  },
  {
    number: "03",
    title: "주문 상담",
    description:
      "제품과 추가 옵션을 선택한 뒤 문자로 상담을 요청합니다.",
  },
  {
    number: "04",
    title: "금액 및 일정 확인",
    description:
      "재고, 배송 가능 여부, 설치 환경과 최종 금액을 상담으로 확인합니다.",
  },
];

const prices = [
  {
    name: "기본 싱크볼 설치",
    price: "170,000원",
    description:
      "기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전 및 배수구 연결 시공 포함",
  },
  {
    name: "올스텐 배수구",
    price: "20,000원",
    description:
      "기본 배수구에서 올스텐 배수구로 변경. 제품 단독 구매 시에도 선택 가능",
  },
  {
    name: "상판 타공",
    price: "50,000원",
    description:
      "싱크볼 설치 시 기존 상판 타공 사이즈 변경 작업",
  },
  {
    name: "6WAY 수전 제품",
    price: "70,000원",
    description:
      "싱크볼 설치와 함께 구매 시 수전 교체 설치비 무료",
  },
];

const checks = [
  "기존 상판 타공 가로·세로 치수를 확인해주세요.",
  "싱크볼 제품 외경과 상판 타공 사이즈는 서로 다를 수 있습니다.",
  "상판 재질과 기존 배관 상태에 따라 설치 가능 여부가 달라질 수 있습니다.",
  "상판 타공은 현장 상태 확인 후 작업 가능 여부를 안내합니다.",
  "설치 일정과 배송 일정은 주문 상담 시 확인합니다.",
];

export default function GuidePage() {
  return (
    <main className="guide-page">
      <style>{`
        .guide-page {
          background: #f7f5f0;
          color: #19262b;
          min-height: 100vh;
          font-family: Arial, "Apple SD Gothic Neo",
            "Malgun Gothic", sans-serif;
          word-break: keep-all;
        }

        .guide-page *,
        .guide-page *::before,
        .guide-page *::after {
          box-sizing: border-box;
        }

        .guide-page a {
          text-decoration: none;
        }

        .guide-hero {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 100px 20px 115px;
        }

        .guide-eyebrow {
          color: #c4b49a;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .25em;
        }

        .guide-hero h1 {
          font-size: clamp(37px, 5vw, 58px);
          font-weight: 400;
          margin: 25px 0;
          letter-spacing: -.04em;
        }

        .guide-hero p {
          color: #cbd0ce;
          font-size: 14px;
          line-height: 2.1;
        }

        .guide-line {
          width: 45px;
          height: 1px;
          background: #c4b49a;
          margin: 30px auto 0;
        }

        .guide-container {
          max-width: 1120px;
          width: calc(100% - 40px);
          margin: auto;
        }

        .guide-section {
          padding: 100px 0;
        }

        .guide-section-title {
          text-align: center;
          margin-bottom: 50px;
        }

        .guide-section-title h2 {
          font-size: clamp(29px, 4vw, 43px);
          font-weight: 400;
          margin: 17px 0;
        }

        .guide-section-title p {
          font-size: 14px;
          color: #777;
          line-height: 2;
        }

        .guide-methods {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 24px;
        }

        .guide-method {
          background: white;
          border: 1px solid #e3dcd1;
          padding: 43px;
        }

        .guide-method-number {
          font-size: 12px;
          letter-spacing: .2em;
          color: #a58e6d;
        }

        .guide-method h3 {
          font-size: 27px;
          font-weight: 500;
          margin: 25px 0 20px;
        }

        .guide-method p {
          font-size: 14px;
          color: #777;
          line-height: 2;
        }

        .guide-method strong {
          display: block;
          color: #907754;
          font-size: 15px;
          margin-top: 25px;
        }

        .guide-alt {
          background: #ebe7df;
        }

        .guide-steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0,1fr));
          gap: 16px;
        }

        .guide-step {
          padding: 30px 24px;
          background: #f7f5f0;
          border: 1px solid #ded7cc;
        }

        .guide-step-number {
          color: #a38b68;
          font-size: 29px;
          font-weight: 400;
        }

        .guide-step h3 {
          font-size: 18px;
          font-weight: 500;
          margin: 22px 0 12px;
        }

        .guide-step p {
          font-size: 13px;
          color: #777;
          line-height: 2;
        }

        .guide-prices {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 18px;
        }

        .guide-price-card {
          background: white;
          border: 1px solid #e3dcd1;
          padding: 32px;
        }

        .guide-price-card h3 {
          font-size: 19px;
          font-weight: 500;
          margin: 0 0 18px;
        }

        .guide-price {
          color: #907754;
          font-size: 27px;
          margin-bottom: 16px;
        }

        .guide-price-card p {
          font-size: 13px;
          color: #777;
          line-height: 2;
        }

        .guide-checks {
          max-width: 850px;
          margin: auto;
          border-top: 1px solid #d9d1c5;
        }

        .guide-check {
          display: flex;
          gap: 18px;
          padding: 22px 0;
          border-bottom: 1px solid #d9d1c5;
          font-size: 14px;
          line-height: 1.9;
        }

        .guide-check span {
          color: #a58e6d;
          font-weight: 700;
        }

        .guide-notice {
          max-width: 850px;
          margin: 28px auto 0;
          font-size: 12px;
          color: #777;
          line-height: 2;
        }

        .guide-contact {
          background: #19262b;
          color: white;
          text-align: center;
          padding: 100px 20px;
        }

        .guide-contact h2 {
          font-size: clamp(31px, 5vw, 49px);
          font-weight: 400;
          margin: 20px 0;
        }

        .guide-contact p {
          font-size: 14px;
          color: #cbd0ce;
          line-height: 2;
          margin-bottom: 30px;
        }

        .guide-button {
          display: inline-flex;
          gap: 45px;
          align-items: center;
          justify-content: space-between;
          background: #c4b49a;
          color: #19262b;
          padding: 20px 28px;
          font-size: 13px;
          font-weight: 700;
        }

        .guide-footer {
          background: #10191d;
          color: #aeb7b5;
          text-align: center;
          padding: 35px 20px;
          font-size: 11px;
          letter-spacing: .1em;
        }

        @media (max-width: 850px) {
          .guide-steps {
            grid-template-columns: repeat(2, minmax(0,1fr));
          }
        }

        @media (max-width: 650px) {
          .guide-hero {
            padding: 75px 20px 90px;
          }

          .guide-section {
            padding: 70px 0;
          }

          .guide-methods,
          .guide-prices {
            grid-template-columns: 1fr;
          }

          .guide-method {
            padding: 30px 25px;
          }

          .guide-steps {
            grid-template-columns: 1fr;
          }

          .guide-step {
            padding: 26px;
          }

          .guide-price-card {
            padding: 27px;
          }
        }
      `}</style>

      <SiteHeader />

      <section className="guide-hero">
        <span className="guide-eyebrow">
          SINKMOA SHOPPING GUIDE
        </span>

        <h1>구매 · 배송 · 설치 안내</h1>

        <p>
          싱크볼을 선택하는 순간부터
          <br />
          제품 수령과 설치까지 안내해드립니다.
        </p>

        <div className="guide-line" />
      </section>

      <section className="guide-section">
        <div className="guide-container">
          <div className="guide-section-title">
            <span className="guide-eyebrow">
              PURCHASE METHODS
            </span>

            <h2>두 가지 구매 방식</h2>

            <p>
              고객님의 상황에 맞는 방법을 선택하세요.
            </p>
          </div>

          <div className="guide-methods">
            <article className="guide-method">
              <span className="guide-method-number">
                METHOD 01
              </span>

              <h3>싱크볼 제품만 구매</h3>

              <p>
                원하는 싱크볼 모델을 선택하고
                제품만 구매하는 방식입니다.
                주문 확인 후 공급처에서
                고객님께 택배로 발송합니다.
              </p>

              <strong>제품가격 + 선택 옵션</strong>
            </article>

            <article className="guide-method">
              <span className="guide-method-number">
                METHOD 02
              </span>

              <h3>싱크볼 제품 + 설치</h3>

              <p>
                제품 구매와 설치 서비스를
                함께 신청하는 방식입니다.
                싱크모아에서 제품을 준비해
                현장으로 가져가 설치합니다.
              </p>

              <strong>
                제품가격 + 기본 설치비 170,000원
              </strong>
            </article>
          </div>
        </div>
      </section>

      <section className="guide-section guide-alt">
        <div className="guide-container">
          <div className="guide-section-title">
            <span className="guide-eyebrow">
              ORDER PROCESS
            </span>

            <h2>주문 진행 절차</h2>
          </div>

          <div className="guide-steps">
            {steps.map((step) => (
              <article
                className="guide-step"
                key={step.number}
              >
                <span className="guide-step-number">
                  {step.number}
                </span>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-section">
        <div className="guide-container">
          <div className="guide-section-title">
            <span className="guide-eyebrow">
              SERVICE & OPTION PRICING
            </span>

            <h2>설치 및 추가 옵션</h2>

            <p>
              제품 가격 외에 선택할 수 있는
              서비스와 옵션입니다.
            </p>
          </div>

          <div className="guide-prices">
            {prices.map((item) => (
              <article
                className="guide-price-card"
                key={item.name}
              >
                <h3>{item.name}</h3>

                <div className="guide-price">
                  +{item.price}
                </div>

                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-section guide-alt">
        <div className="guide-container">
          <div className="guide-section-title">
            <span className="guide-eyebrow">
              BEFORE YOU ORDER
            </span>

            <h2>구매 전 확인사항</h2>

            <p>
              보다 정확한 제품 선택과
              설치 상담을 위해 확인해주세요.
            </p>
          </div>

          <div className="guide-checks">
            {checks.map((check, index) => (
              <div className="guide-check" key={check}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>{check}</div>
              </div>
            ))}
          </div>

          <p className="guide-notice">
            ※ 기본 배수구는 싱크볼 제품 가격에 포함됩니다.
            올스텐 배수구는 제품 단독 구매 시에도
            선택할 수 있습니다. 상판 타공 및
            6WAY 수전은 설치 주문 시에만
            선택 가능합니다. 배송비, 배송 가능 지역,
            설치 가능 여부 및 최종 견적은
            상담 후 확인됩니다.
          </p>
        </div>
      </section>

      <section className="guide-contact">
        <span className="guide-eyebrow">
          YOUR KITCHEN, OUR PRIORITY
        </span>

        <h2>싱크모아와 함께하세요</h2>

        <p>
          원하는 싱크볼을 선택하고
          <br />
          구매부터 설치까지 간편하게 문의하세요.
        </p>

        <Link href="/order" className="guide-button">
          주문 및 견적 문의
          <span>↗</span>
        </Link>
      </section>

      <footer className="guide-footer">
        SINKMOA · PREMIUM KITCHEN COLLECTION
      </footer>
    </main>
  );
}
