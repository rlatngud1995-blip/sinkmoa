import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  INSTALLATION_REGIONS,
  getAllInstallationPaths,
} from "../../../data/installation-regions";
import {
  getDistrictContent,
  getDistrictShortName,
} from "../../../data/installation-content";
import {
  BRAND,
  BUSINESS_ID,
  BUSINESS_SCHEMA,
  CONTENT_UPDATED,
  PHONE,
  SITE_URL,
} from "../../../data/site";

const SITE = SITE_URL;

type Props = {
  params: Promise<{
    region: string;
    district: string;
  }>;
};

const PRODUCTS = [
  ["백조", "고니 8630", "390,000원", "780×400mm", "/IMG_1642.jpeg", "/products/baekjo"],
  ["리젠스", "8603 엠보", "420,000원", "780×400mm", "/IMG_1772.jpeg", "/products/regens"],
  ["벨라고", "BLE-858", "440,000원", "794×404mm", "/IMG_1757.jpeg", "/products/bellago"],
  ["아티잔", "DU858BLR", "420,000원", "794×400mm", "/IMG_1771.jpeg", "/products/artisan"],
];

const WORK_STEPS = [
  ["01", "기존 싱크볼 철거", "실리콘과 고정 클립을 제거하고 기존 볼을 분리합니다."],
  ["02", "상판 타공 확인", "새 사각싱크볼 타공 사이즈와 상판 구멍을 맞춰봅니다."],
  ["03", "상판 타공·확장", "크기가 다를 때만 타공 작업을 진행합니다(+50,000원)."],
  ["04", "사각싱크볼 설치", "인셋 방식으로 볼을 안착시키고 고정합니다."],
  ["05", "수전·배수구 연결", "기존 수전과 배수구를 다시 연결합니다."],
  ["06", "마감 및 누수 점검", "실리콘 마감 후 물을 받아 누수를 확인합니다."],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInstallationPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, district } = await params;
  const c = getDistrictContent(region, district);

  if (!c) return {};

  const url = `${SITE}/installation/${region}/${district}`;

  return {
    title: c.title,
    description: c.description,
    keywords: c.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      siteName: BRAND,
      title: `${c.title} | ${BRAND}`,
      description: c.description,
      images: [
        {
          url: "/IMG_0395.jpeg",
          alt: `${c.short} 사각싱크볼 교체 시공 사진`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "geo.region": `KR`,
      "geo.placename": c.full,
    },
  };
}

export default async function InstallationPage({ params }: Props) {
  const { region, district } = await params;
  const c = getDistrictContent(region, district);

  if (!c) notFound();

  const regionData = INSTALLATION_REGIONS[region];
  const url = `${SITE}/installation/${region}/${district}`;
  const heading = `${c.short} 싱크볼 교체`;
  const nearHrefs = new Set(c.near.map((x) => x.href));

  const products = [
    ...PRODUCTS.slice(c.productOrder),
    ...PRODUCTS.slice(0, c.productOrder),
  ];

  const summary: [string, string][] = [
    ["서비스 지역", `${c.full} 전역 (${c.towns.join(", ")})`],
    ["기본 설치비", "170,000원 — 기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전·배수구 연결 포함"],
    ["추가 옵션", "상판 타공 50,000원 · 올스텐 배수구 20,000원 · 6WAY 수전 70,000원"],
    ["취급 제품", "백조·리젠스·벨라고·아티잔 인셋 사각싱크볼 (390,000~440,000원)"],
    ["상담 방법", `싱크볼 사진·타공 치수·주소를 문자(${PHONE}) 또는 견적문의로 전송`],
  ];
  if (c.near.length) {
    summary.push(["인접 시공 지역", c.near.map((x) => x.label).join(", ")]);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { ...BUSINESS_SCHEMA },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${c.title} | ${BRAND}`,
        description: c.description,
        inLanguage: "ko-KR",
        dateModified: CONTENT_UPDATED,
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${c.short} 싱크볼 교체 및 사각싱크볼 설치`,
        serviceType: "싱크볼 교체",
        description: c.answer,
        provider: { "@id": BUSINESS_ID },
        areaServed: {
          "@type": "AdministrativeArea",
          name: c.full,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: c.regionName,
          },
          containsPlace: c.towns.map((t) => ({
            "@type": "Place",
            name: `${c.full} ${t}`,
          })),
        },
        offers: [
          {
            "@type": "Offer",
            name: "기본 싱크볼 설치",
            price: 170000,
            priceCurrency: "KRW",
            description: "기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전·배수구 연결 포함",
          },
          { "@type": "Offer", name: "상판 타공", price: 50000, priceCurrency: "KRW" },
          { "@type": "Offer", name: "올스텐 배수구", price: 20000, priceCurrency: "KRW" },
          { "@type": "Offer", name: "6WAY 수전", price: 70000, priceCurrency: "KRW" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND, item: SITE },
          { "@type": "ListItem", position: 2, name: `${c.regionName} 싱크볼 설치`, item: `${SITE}/#regions` },
          { "@type": "ListItem", position: 3, name: heading, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: c.faq.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: x.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
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

      <nav className="crumbs container" aria-label="현재 위치">
        <Link href="/">홈</Link>
        <span>›</span>
        <Link href="/#regions">{c.regionName} 설치지역</Link>
        <span>›</span>
        <strong>{heading}</strong>
      </nav>

      <section className="hero">
        <Image
          src="/IMG_0395.jpeg"
          alt={`${c.short} ${c.towns[0]} 사각싱크볼 교체 완료 주방`}
          fill
          priority
          sizes="100vw"
        />

        <div className="shade" />

        <div className="heroText">
          <p className="label">SINKMOA INSTALLATION · {c.full}</p>

          <h1>
            {heading}
            <br />
            {c.h1Sub}
          </h1>

          <p className="pre">{c.heroCopy}</p>

          <Link href="/order">설치 견적 문의 ↗</Link>
        </div>
      </section>

      <section className="summary section" aria-labelledby="summary-title">
        <div className="container">
          <p className="label">QUICK ANSWER</p>

          <h2 id="summary-title">{c.short} 싱크볼 교체 핵심 정보</h2>

          <p className="answer">{c.answer}</p>

          <dl className="facts">
            {summary.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <p className="updated">
            최종 업데이트 <time dateTime={CONTENT_UPDATED}>{CONTENT_UPDATED}</time>
          </p>
        </div>
      </section>

      <section className="intro section">
        <div className="container">
          <p className="label">LOCAL INSTALLATION</p>

          <h2>
            {c.full}
            <br />
            싱크볼 교체 설치 안내
          </h2>

          {c.intro.map((p) => (
            <p className="copy" key={p}>
              {p}
            </p>
          ))}

          <h3>{c.short} 주요 시공 지역</h3>

          <div className="towns">
            {c.towns.map((town, i) => (
              <div key={town}>
                <strong>{town}</strong>
                <span>{c.townTags[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="work section">
        <div className="container">
          <p className="label">INSTALLATION PROCESS</p>

          <h2>{c.short} 싱크볼 교체 작업 순서</h2>

          <ol className="workGrid">
            {WORK_STEPS.map(([num, text, detail]) => (
              <li key={num}>
                <span>{num}</span>
                <strong>{text}</strong>
                <small>{detail}</small>
              </li>
            ))}
          </ol>
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
                alt={`${c.short} 싱크볼 교체 전 기존 싱크볼`}
                fill
                sizes="50vw"
              />
              <span>BEFORE</span>
            </div>

            <div>
              <Image
                src="/IMG_0395.jpeg"
                alt={`${c.short} 사각싱크볼 교체 후`}
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

          <h2>{c.short}에 설치하는 사각싱크볼</h2>

          <div className="productsGrid">
            {products.map(([brand, name, price, cutout, image, href]) => (
              <Link href={href} key={name} className="product">
                <div className="productImage">
                  <Image
                    src={image}
                    alt={`${brand} ${name} 사각싱크볼`}
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

          <h2>{c.short} 싱크볼 설치 비용</h2>

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

          <h2>{c.short} 싱크볼 교체 자주 묻는 질문</h2>

          <div className="faq">
            {c.faq.map((item) => (
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
          {c.near.length > 0 && (
            <>
              <p className="label">NEARBY</p>

              <h2>{c.short} 인근 시공 지역</h2>

              <div className="areaGrid nearGrid">
                {c.near.map((x) => (
                  <Link key={x.href} href={x.href}>
                    {x.label} 싱크볼 교체 ↗
                  </Link>
                ))}
              </div>
            </>
          )}

          <p className="label spaced">OTHER AREAS</p>

          <h2>{c.regionName} 다른 설치 지역</h2>

          <div className="areaGrid">
            {regionData.districts
              .filter((x) => x.slug !== district)
              .filter((x) => !nearHrefs.has(`/installation/${region}/${x.slug}`))
              .map((x) => (
                <Link
                  key={x.slug}
                  href={`/installation/${region}/${x.slug}`}
                >
                  {getDistrictShortName(region, x.slug)} 싱크볼 ↗
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

        <p className="pre">{c.ctaCopy}</p>

        <Link href="/order">설치 견적 문의하기 ↗</Link>
      </section>

      <footer>
        <div className="container">
          <strong>SINKMOA 싱크모아</strong>
          <p>사각싱크볼 판매 및 싱크볼 교체·설치 · 문의 {PHONE}</p>
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
        .copy+.copy{margin-top:12px}
        .pre{white-space:pre-line}
        .crumbs{display:flex;gap:8px;align-items:center;padding:12px 0;font-size:10px;color:#888}
        .crumbs a{color:#888}
        .crumbs strong{color:#19262b;font-weight:600}
        .summary{padding-bottom:20px}
        .answer{max-width:820px;margin:22px 0 0;padding:18px 20px;border-left:3px solid #a88f6c;background:#faf9f6;font-size:14px;line-height:1.9}
        .facts{margin:22px 0 0;border-top:1px solid #e4ddd2}
        .facts div{display:grid;grid-template-columns:140px 1fr;gap:12px;padding:13px 0;border-bottom:1px solid #e4ddd2}
        .facts dt{font-size:11px;font-weight:700;color:#a88f6c}
        .facts dd{margin:0;font-size:12px;line-height:1.7;color:#444}
        .updated{margin:14px 0 0;color:#999;font-size:9px}
        .spaced{margin-top:46px}
        .nearGrid a{border-color:#c4b49a;font-weight:700}
        .intro h3{margin:40px 0 15px}
        .towns{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
        .towns div{padding:17px;border:1px solid #e4ddd2;background:#faf9f6}
        .towns strong,.towns span{display:block}
        .towns strong{font-size:13px}
        .towns span{margin-top:5px;color:#888;font-size:9px}
        .work,.products,.areas{background:#f7f5f0}
        .workGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:30px;padding:0;list-style:none}
        .workGrid li{min-height:130px;padding:19px;background:#fff;border:1px solid #e5dfd5}
        .workGrid small{display:block;margin-top:8px;color:#777;font-size:10px;line-height:1.7}
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
          .workGrid li{min-height:115px;padding:14px}
          .workGrid span{margin-bottom:25px}
          .productText{padding:11px}
          .productText h3{font-size:12px}
          .areaGrid a{padding:10px 8px}
          .facts div{grid-template-columns:1fr;gap:4px}
        }
      `}</style>
    </main>
  );
}
