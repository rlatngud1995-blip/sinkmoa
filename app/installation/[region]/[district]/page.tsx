import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INSTALLATION_REGIONS,
  getAllInstallationPaths,
  getInstallationLocation,
} from "../../../data/installation-regions";

const SITE = "https://www.sinkmoa.com";

type Props = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

type SEO = {
  name: string;
  title: string;
  desc: string;
  towns: string[];
};

const SEO_REGIONS: Record<string, SEO> = {
  gangnam: {
    name: "강남",
    title: "강남 싱크볼 교체 | 사각싱크볼 설치·상판 타공 | 싱크모아",
    desc: "강남 싱크볼 교체 및 사각싱크볼 설치 상담. 역삼·논현·대치·도곡·청담·삼성동 싱크볼 교체, 상판 타공, 철거, 수전·배수구 연결 안내.",
    towns: ["역삼동", "논현동", "대치동", "도곡동", "청담동", "삼성동"],
  },
  songpa: {
    name: "송파",
    title: "송파 싱크볼 교체 | 잠실·문정 사각싱크볼 설치 | 싱크모아",
    desc: "송파 싱크볼 교체 및 사각싱크볼 설치 상담. 잠실·문정·가락·방이·석촌 지역 싱크볼 교체와 상판 타공 안내.",
    towns: ["잠실동", "문정동", "가락동", "방이동", "석촌동", "오금동"],
  },
  seocho: {
    name: "서초",
    title: "서초 싱크볼 교체 | 반포·방배 사각싱크볼 설치 | 싱크모아",
    desc: "서초 싱크볼 교체 및 사각싱크볼 설치. 반포·잠원·서초·양재·방배 지역 싱크볼 철거, 상판 타공 및 설치 상담.",
    towns: ["반포동", "잠원동", "서초동", "양재동", "방배동", "우면동"],
  },
  gangseo: {
    name: "강서구",
    title: "강서구 싱크볼 교체 | 마곡·화곡 사각싱크볼 설치 | 싱크모아",
    desc: "강서구 싱크볼 교체 및 사각싱크볼 설치. 마곡·화곡·등촌·가양·발산 지역 상판 타공과 싱크볼 설치 상담.",
    towns: ["마곡동", "화곡동", "등촌동", "가양동", "발산동", "방화동"],
  },
  yeongdeungpo: {
    name: "영등포",
    title: "영등포 싱크볼 교체 | 여의도·당산 사각싱크볼 설치 | 싱크모아",
    desc: "영등포 싱크볼 교체 및 사각싱크볼 설치. 여의도·당산·문래·신길 지역 기존 싱크볼 철거와 상판 타공 상담.",
    towns: ["여의도동", "당산동", "문래동", "신길동", "영등포동", "양평동"],
  },
  mapo: {
    name: "마포",
    title: "마포 싱크볼 교체 | 공덕·망원 사각싱크볼 설치 | 싱크모아",
    desc: "마포 싱크볼 교체 및 사각싱크볼 설치. 공덕·아현·망원·서교·상암 지역 싱크볼 철거와 상판 타공 상담.",
    towns: ["공덕동", "아현동", "망원동", "서교동", "상암동", "합정동"],
  },
  yongsan: {
    name: "용산",
    title: "용산 싱크볼 교체 | 한남·이촌 사각싱크볼 설치 | 싱크모아",
    desc: "용산 싱크볼 교체 및 사각싱크볼 설치. 한남·이촌·후암·이태원 지역 싱크볼 교체와 상판 타공 상담.",
    towns: ["한남동", "이촌동", "후암동", "원효로", "이태원동", "효창동"],
  },
  seongdong: {
    name: "성동구",
    title: "성동구 싱크볼 교체 | 성수·왕십리 사각싱크볼 설치 | 싱크모아",
    desc: "성동구 싱크볼 교체 및 사각싱크볼 설치. 성수·왕십리·금호·옥수·행당 지역 싱크볼 설치 상담.",
    towns: ["성수동", "왕십리", "금호동", "옥수동", "행당동", "응봉동"],
  },
  yangcheon: {
    name: "양천구",
    title: "양천구 싱크볼 교체 | 목동 사각싱크볼 설치 | 싱크모아",
    desc: "양천구 싱크볼 교체 및 사각싱크볼 설치. 목동·신정·신월 지역 기존 싱크볼 철거와 상판 타공 상담.",
    towns: ["목동", "신정동", "신월동"],
  },
  guro: {
    name: "구로",
    title: "구로 싱크볼 교체 | 신도림·고척 사각싱크볼 설치 | 싱크모아",
    desc: "구로 싱크볼 교체 및 사각싱크볼 설치. 구로·신도림·개봉·고척·천왕 지역 상판 타공과 설치 상담.",
    towns: ["구로동", "신도림동", "개봉동", "고척동", "천왕동", "오류동"],
  },
};

const PRODUCTS = [
  ["백조", "고니 8630", "390,000원", "780×400mm", "/IMG_1642.jpeg", "/products/baekjo"],
  ["리젠스", "8603 엠보", "420,000원", "780×400mm", "/IMG_1772.jpeg", "/products/regens"],
  ["벨라고", "BLE-858", "440,000원", "794×404mm", "/IMG_1757.jpeg", "/products/bellago"],
  ["아티잔", "DU858BLR", "420,000원", "794×400mm", "/IMG_1771.jpeg", "/products/artisan"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInstallationPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, district } = await params;
  const location = getInstallationLocation(region, district);

  if (!location) return {};

  const seo = region === "seoul" ? SEO_REGIONS[district] : undefined;
  const title =
    seo?.title ??
    `${location.fullName} 싱크볼 교체·사각싱크볼 설치 | 싱크모아`;

  const description =
    seo?.desc ??
    `${location.fullName} 싱크볼 교체 및 사각싱크볼 설치 상담. 기존 싱크볼 철거, 상판 타공, 수전 및 배수구 연결을 안내합니다.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/installation/${region}/${district}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function InstallationPage({ params }: Props) {
  const { region, district } = await params;
  const location = getInstallationLocation(region, district);

  if (!location) notFound();

  const seo = region === "seoul" ? SEO_REGIONS[district] : undefined;
  const regionData = INSTALLATION_REGIONS[region];

  const searchName = seo?.name ?? location.districtName;
  const heading = `${searchName} 싱크볼 교체`;

  const faq = [
    {
      q: `${searchName} 싱크볼 교체 비용은 얼마인가요?`,
      a: "기본 설치비는 170,000원이며 기존 싱크볼 철거와 기존 수전·배수구 연결이 포함됩니다. 제품 가격과 추가 작업비는 별도입니다.",
    },
    {
      q: "사각싱크볼로 교체할 수 있나요?",
      a: "기존 상판 타공 크기와 상판 재질을 확인한 뒤 설치 가능한 사각싱크볼을 안내합니다.",
    },
    {
      q: "상판 타공도 가능한가요?",
      a: "현장 상태와 상판 재질을 확인한 뒤 가능한 경우 상판 타공 또는 확장 작업을 진행합니다.",
    },
    {
      q: "수전과 배수구도 연결해주나요?",
      a: "기존 수전과 기존 배수구 연결은 기본 설치비에 포함됩니다.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: x.a,
      },
    })),
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <header>
        <div className="headerInner">
          <Link href="/" className="logo">
            SINKMOA
          </Link>

          <nav>
            <Link href="/#brands">상품</Link>
            <Link href="/#regions">설치지역</Link>
            <Link href="/order">견적문의</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <Image
          src="/IMG_0395.jpeg"
          alt={`${heading} 사각싱크볼 설치`}
          fill
          priority
          sizes="100vw"
        />

        <div className="shade" />

        <div className="heroText">
          <p className="label">SINKMOA INSTALLATION</p>

          <h1>
            {heading}
            <br />
            사각싱크볼 설치
          </h1>

          <p>
            기존 싱크볼 철거부터 상판 타공,
            <br />
            수전·배수구 연결까지 상담합니다.
          </p>

          <Link href="/order">설치 견적 문의 ↗</Link>
        </div>
      </section>

      <section className="intro section">
        <div className="container">
          <p className="label">LOCAL INSTALLATION</p>

          <h2>
            {heading}
            <br />
            설치 안내
          </h2>

          <p className="copy">
            {location.fullName} 지역에서 기존 싱크볼 교체와
            사각싱크볼 설치 상담을 진행합니다. 현재 싱크볼 사진과
            상판 타공 사이즈를 확인하여 설치 가능한 제품과 필요한
            작업을 안내합니다.
          </p>

          {seo && (
            <>
              <h3>{seo.name} 주요 상담 지역</h3>

              <div className="towns">
                {seo.towns.map((town) => (
                  <div key={town}>
                    <strong>{town}</strong>
                    <span>싱크볼 교체·설치</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="work section">
        <div className="container">
          <p className="label">INSTALLATION SERVICE</p>

          <h2>싱크볼 교체 작업</h2>

          <div className="workGrid">
            {[
              ["01", "기존 싱크볼 철거"],
              ["02", "사각싱크볼 설치"],
              ["03", "상판 타공·확장"],
              ["04", "수전 연결"],
              ["05", "배수구 연결"],
              ["06", "마감 및 누수 점검"],
            ].map(([num, text]) => (
              <div key={num}>
                <span>{num}</span>
                <strong>{text}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="label">BEFORE & AFTER</p>

          <h2>싱크볼 교체 전·후</h2>

          <div className="beforeAfter">
            <div>
              <Image
                src="/IMG_0305.jpeg"
                alt={`${searchName} 싱크볼 교체 전`}
                fill
                sizes="50vw"
              />
              <span>BEFORE</span>
            </div>

            <div>
              <Image
                src="/IMG_0395.jpeg"
                alt={`${searchName} 싱크볼 교체 후`}
                fill
                sizes="50vw"
              />
              <span>AFTER</span>
            </div>
          </div>
        </div>
      </section>

      <section className="products section">
        <div className="container">
          <p className="label">SINK COLLECTION</p>

          <h2>사각싱크볼 제품</h2>

          <div className="productsGrid">
            {PRODUCTS.map(([brand, name, price, cutout, image, href]) => (
              <Link href={href} key={name} className="product">
                <div className="productImage">
                  <Image
                    src={image}
                    alt={`${brand} ${name}`}
                    fill
                    sizes="25vw"
                  />
                </div>

                <div className="productText">
                  <span>{brand}</span>
                  <h3>{name}</h3>
                  <p>{price}</p>
                  <small>타공 {cutout}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="price section">
        <div className="container">
          <p className="label">INSTALLATION PRICE</p>

          <h2>설치 비용 안내</h2>

          <div className="priceGrid">
            <div className="mainPrice">
              <span>기본 설치비</span>
              <strong>170,000원</strong>
              <p>
                기존 싱크볼 철거
                <br />
                기존 수전·배수구 연결 포함
              </p>
            </div>

            <div className="options">
              <p>
                <span>올스텐 배수구</span>
                <strong>+20,000원</strong>
              </p>
              <p>
                <span>상판 타공</span>
                <strong>+50,000원</strong>
              </p>
              <p>
                <span>6WAY 수전</span>
                <strong>+70,000원</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="label">FAQ</p>

          <h2>{searchName} 싱크볼 교체 FAQ</h2>

          <div className="faq">
            {faq.map((item) => (
              <article key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="areas section">
        <div className="container">
          <p className="label">OTHER AREAS</p>

          <h2>{location.regionName} 다른 설치 지역</h2>

          <div className="areaGrid">
            {regionData.districts
              .filter((x) => x.slug !== district)
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/installation/${region}/${x.slug}`}
                >
                  {x.name} 싱크볼 교체 ↗
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <p className="label">SINKMOA</p>

        <h2>
          {heading}
          <br />
          설치 상담
        </h2>

        <p>
          현재 싱크볼 사진과 사이즈를 보내주시면
          <br />
          설치 가능 제품과 시공 방법을 안내합니다.
        </p>

        <Link href="/order">설치 견적 문의하기 ↗</Link>
      </section>

      <footer>
        <div className="container">
          <strong>SINKMOA</strong>
          <p>사각싱크볼 판매 및 설치</p>
          <p>서울 · 경기 · 인천 · 충남 · 충북</p>
        </div>
      </footer>

      <style>{`
        *{box-sizing:border-box}
        body{margin:0}
        .page{color:#19262b;background:#fff;font-family:Arial,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;word-break:keep-all}
        .page a{text-decoration:none}
        .container{width:min(calc(100% - 40px),1150px);margin:auto}
        .label{margin:0 0 16px;color:#a88f6c;font-size:10px;font-weight:700;letter-spacing:.18em}
        header{background:#111a1e}
        .headerInner{width:min(calc(100% - 40px),1250px);height:68px;margin:auto;display:flex;align-items:center;justify-content:space-between}
        .logo{color:#fff;font-size:18px;font-weight:700;letter-spacing:.2em}
        nav{display:flex;gap:22px}
        nav a{color:#ddd;font-size:11px}
        .hero{position:relative;min-height:540px;display:flex;align-items:center;overflow:hidden}
        .hero>img{object-fit:cover}
        .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,15,18,.88),rgba(8,15,18,.45),rgba(8,15,18,.12))}
        .heroText{position:relative;z-index:2;width:min(calc(100% - 40px),1150px);margin:auto;color:#fff}
        .heroText h1{margin:0;font-size:clamp(38px,5vw,64px);line-height:1.25;font-weight:400;letter-spacing:-.05em}
        .heroText>p:not(.label){color:#ddd;font-size:13px;line-height:1.9;margin:22px 0 27px}
        .heroText>a,.cta>a{display:inline-block;padding:15px 19px;background:#c4b49a;color:#19262b;font-size:12px;font-weight:700}
        .section{padding:80px 0}
        h2{margin:0;font-size:clamp(29px,4vw,45px);font-weight:400;line-height:1.4;letter-spacing:-.04em}
        .copy{max-width:800px;margin:25px 0 0;color:#666;font-size:13px;line-height:2}
        .intro h3{margin:40px 0 15px}
        .towns{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
        .towns div{padding:17px;border:1px solid #e4ddd2;background:#faf9f6}
        .towns strong,.towns span{display:block}
        .towns strong{font-size:13px}
        .towns span{margin-top:5px;color:#888;font-size:9px}
        .work,.products,.areas{background:#f7f5f0}
        .workGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:30px}
        .workGrid div{min-height:130px;padding:19px;background:#fff;border:1px solid #e5dfd5}
        .workGrid span{display:block;color:#a88f6c;font-size:9px;margin-bottom:35px}
        .workGrid strong{font-size:14px}
        .beforeAfter{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:30px}
        .beforeAfter>div{position:relative;aspect-ratio:1.5;overflow:hidden}
        .beforeAfter img{object-fit:cover}
        .beforeAfter span{position:absolute;top:12px;left:12px;padding:6px 9px;background:#19262bd9;color:#fff;font-size:8px}
        .productsGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:30px}
        .product{background:#fff;color:#19262b}
        .productImage{position:relative;aspect-ratio:1.25}
        .productImage img{object-fit:contain;padding:10px}
        .productText{padding:15px}
        .productText span{color:#a88f6c;font-size:9px}
        .productText h3{margin:6px 0 10px;font-size:15px}
        .productText p{margin:0;font-size:12px;font-weight:700}
        .productText small{color:#777;font-size:9px}
        .priceGrid{display:grid;grid-template-columns:1fr 1.3fr;gap:8px;margin-top:30px}
        .mainPrice{padding:27px;background:#19262b;color:#fff}
        .mainPrice span{color:#dbc39f;font-size:10px}
        .mainPrice strong{display:block;margin:14px 0 18px;font-size:31px}
        .mainPrice p{color:#c5ccca;font-size:10px;line-height:1.8}
        .options{border:1px solid #e4ddd2}
        .options p{margin:0;padding:19px;display:flex;justify-content:space-between}
        .options p+p{border-top:1px solid #e4ddd2}
        .options span{font-size:12px}
        .options strong{color:#9d8562}
        .faq{margin-top:30px;border-top:1px solid #ddd}
        .faq article{padding:21px 0;border-bottom:1px solid #ddd}
        .faq h3{margin:0 0 8px;font-size:14px}
        .faq p{margin:0;max-width:800px;color:#777;font-size:10px;line-height:1.9}
        .areaGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:30px}
        .areaGrid a{padding:12px;background:#fff;border:1px solid #e4ddd2;color:#19262b;font-size:9px}
        .cta{padding:75px 20px;background:#19262b;color:#fff;text-align:center}
        .cta h2{color:#fff}
        .cta>p:not(.label){color:#c5ccca;font-size:11px;line-height:1.9;margin:18px 0 24px}
        footer{padding:40px 0;background:#10181c;color:#fff}
        footer strong{letter-spacing:.18em}
        footer p{color:#aaa;font-size:9px}
        @media(max-width:700px){
          nav a:not(:last-child){display:none}
          .hero{min-height:490px}
          .heroText h1{font-size:34px}
          .section{padding:58px 0}
          h2{font-size:27px}
          .copy{font-size:11px}
          .towns,.workGrid,.productsGrid,.areaGrid{grid-template-columns:1fr 1fr}
          .beforeAfter,.priceGrid{grid-template-columns:1fr}
          .workGrid div{min-height:115px;padding:14px}
          .workGrid span{margin-bottom:25px}
          .productText{padding:11px}
          .productText h3{font-size:12px}
          .areaGrid a{padding:10px 8px}
        }
      `}</style>
    </main>
  );
}
