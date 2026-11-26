/* =========================================
   지역 설치 페이지 콘텐츠 생성기

   92개 지역 페이지의 제목·설명·본문·FAQ가
   서로 비슷해지지 않도록 지역 고유 정보(동·읍·면,
   인접 지역)와 지역별로 다른 문장 패턴을 조합합니다.
   같은 지역은 항상 같은 결과가 나옵니다(빌드 간 고정).
========================================= */

import {
  INSTALLATION_REGIONS,
  getInstallationLocation,
} from "./installation-regions";
import { DISTRICT_PROFILES } from "./district-profiles";
import { PHONE, PRICE } from "./site";

/* ---------- 한국어 조사 ---------- */

function hasBatchim(word: string) {
  const ch = word.charCodeAt(word.length - 1);
  if (ch < 0xac00 || ch > 0xd7a3) return false;
  return (ch - 0xac00) % 28 !== 0;
}

function hasRieulBatchim(word: string) {
  const ch = word.charCodeAt(word.length - 1);
  if (ch < 0xac00 || ch > 0xd7a3) return false;
  return (ch - 0xac00) % 28 === 8;
}

/** 과/와, 은/는, 이/가, 을/를, 으로/로 */
export function josa(
  word: string,
  type: "과" | "은" | "이" | "을" | "으로"
) {
  const b = hasBatchim(word);
  switch (type) {
    case "과":
      return word + (b ? "과" : "와");
    case "은":
      return word + (b ? "은" : "는");
    case "이":
      return word + (b ? "이" : "가");
    case "을":
      return word + (b ? "을" : "를");
    case "으로":
      return word + (b && !hasRieulBatchim(word) ? "으로" : "로");
  }
}

/* ---------- 고정 해시 ---------- */

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(list: T[], seed: number) {
  return list[seed % list.length];
}


/* ---------- 지역 간 문장 조합 분산 배정 ----------
   각 지역 페이지가 다른 지역과 같은 문장 패턴을
   최대한 덜 공유하도록, 고정 시드로 조합을 배정합니다. */

const DIMS = {
  title: 8,
  desc: 6,
  p1: 6,
  p2: 4,
  p3: 3,
  answer: 3,
  cost: 3,
  local: 3,
  faq: 8,
} as const;

type DimKey = keyof typeof DIMS;
const DIM_KEYS = Object.keys(DIMS) as DimKey[];

let assignmentCache: Map<string, Record<DimKey, number>> | null = null;

function getAssignment(key: string): Record<DimKey, number> {
  if (!assignmentCache) {
    assignmentCache = new Map();
    const keys = Object.entries(INSTALLATION_REGIONS).flatMap(
      ([r, v]) => v.districts.map((d) => `${r}/${d.slug}`)
    );
    const chosen: number[][] = [];
    let rng = 123456789;
    const rand = () => {
      rng ^= rng << 13;
      rng ^= rng >>> 17;
      rng ^= rng << 5;
      return (rng >>> 0) / 4294967296;
    };

    for (const k of keys) {
      let best: number[] = [];
      let bestScore = Infinity;
      for (let t = 0; t < 400; t++) {
        const cand = DIM_KEYS.map((d) => Math.floor(rand() * DIMS[d]));
        let worst = 0;
        let total = 0;
        for (const prev of chosen) {
          let same = 0;
          for (let i = 0; i < cand.length; i++) {
            if (cand[i] === prev[i]) same++;
          }
          worst = Math.max(worst, same);
          total += same * same;
        }
        const score = worst * 100000 + total;
        if (score < bestScore) {
          bestScore = score;
          best = cand;
        }
      }
      chosen.push(best);
      assignmentCache.set(
        k,
        Object.fromEntries(
          DIM_KEYS.map((d, i) => [d, best[i]])
        ) as Record<DimKey, number>
      );
    }
  }

  return (
    assignmentCache.get(key) ??
    (Object.fromEntries(
      DIM_KEYS.map((d) => [d, hash(key + d) % DIMS[d]])
    ) as Record<DimKey, number>)
  );
}

const won = (n: number) => n.toLocaleString("ko-KR") + "원";

/* ---------- 지역명 ---------- */

function shortName(regionSlug: string, districtName: string) {
  if (regionSlug === "seoul") {
    const base = districtName.replace(/구$/, "");
    return base.length >= 2 ? base : `서울 ${districtName}`;
  }
  return districtName.replace(/(시|군)$/, "");
}

export type NearLink = {
  href: string;
  label: string;
};

export type FaqItem = { q: string; a: string };

export type DistrictContent = {
  short: string;
  full: string;
  regionName: string;
  towns: string[];
  near: NearLink[];
  title: string;
  description: string;
  keywords: string[];
  h1Sub: string;
  heroCopy: string;
  intro: string[];
  answer: string;
  townTags: string[];
  faq: FaqItem[];
  productOrder: number;
  ctaCopy: string;
};

export function getNearLinks(near: string[]): NearLink[] {
  return near.flatMap((key) => {
    const [r, d] = key.split("/");
    const loc = getInstallationLocation(r, d);
    if (!loc) return [];
    const p = DISTRICT_PROFILES[key];
    return [
      {
        href: `/installation/${r}/${d}`,
        label: p?.short ?? shortName(r, loc.districtName),
      },
    ];
  });
}

/* =========================================
   메인 생성 함수
========================================= */

export function getDistrictContent(
  regionSlug: string,
  districtSlug: string
): DistrictContent | null {
  const loc = getInstallationLocation(regionSlug, districtSlug);
  if (!loc) return null;

  const key = `${regionSlug}/${districtSlug}`;
  const profile = DISTRICT_PROFILES[key] ?? { towns: [], near: [] };
  const n = profile.short ?? shortName(regionSlug, loc.districtName);
  const full = loc.fullName;
  const towns = profile.towns.length
    ? profile.towns
    : [loc.districtName];
  const near = getNearLinks(profile.near);
  const nearNames = near.map((x) => x.label);

  // 항목마다 독립적인 고정 시드
  const seed = (salt: number) => hash(`${key}#${salt}`);
  const a = getAssignment(key);

  const t0 = towns[0];
  const t1 = towns[1] ?? towns[0];
  const t2 = towns[2] ?? towns[1] ?? towns[0];
  const T2 = towns.slice(0, 2).join("·");
  const T3 = towns.slice(0, 3).join("·");
  const Tall = towns.join(", ");

  const strip = (t: string) => t.replace(/(동|읍|면)$/, "");
  // 제목용 동네 이름 (지역명과 같거나 중복되는 이름 제외)
  const sNames = Array.from(
    new Set(towns.map(strip).filter((x) => x && x !== n))
  );
  const S2 = sNames.slice(0, 2).join("·") || n;
  const S3 = sNames.slice(0, 3).join("·") || n;
  const s0 = sNames[0] ?? n;

  /* ----- 제목 (레이아웃에서 " | 싱크모아"가 자동으로 붙음) ----- */

  const titles = [
    `${n} 싱크볼 교체 · ${S2} 사각싱크볼 설치`,
    `${S2} 싱크볼 교체 | ${n} 사각싱크볼 시공 비용`,
    `${n} 싱크볼 교체 17만원부터 · ${S3} 방문 설치`,
    `${n} 사각싱크볼 설치 · 싱크볼 교체와 상판 타공 (${S2})`,
    `${n} 싱크대 싱크볼만 교체 · ${S2} 인셋 싱크볼 시공`,
    `${n} 싱크볼 교체 상담 · 철거부터 수전 연결까지 (${S2})`,
    `${n} 싱크볼 교체 비용과 설치 안내 | ${S3}`,
    `${s0} 사각싱크볼 교체 · ${n} 싱크볼 철거·설치 17만원`,
  ];
  const title = titles[a.title % titles.length];

  /* ----- 메타 설명 ----- */

  const descriptions = [
    `${full} ${T3} 싱크볼 교체·사각싱크볼 설치. 기본 설치비 17만원(기존 볼 철거, 수전·배수구 연결 포함), 상판 타공 +5만원. 사진으로 설치 가능 여부부터 확인해 드립니다.`,
    `${n}에서 싱크대는 그대로 두고 싱크볼만 바꾸고 싶다면 싱크모아. ${T3} 방문 시공, 백조·리젠스·벨라고·아티잔 사각싱크볼과 설치비 17만원을 안내합니다.`,
    `${T3} 등 ${full} 전 지역 싱크볼 교체. 오래된 싱크볼을 사각 인셋 싱크볼로 바꾸고 상판 타공, 6WAY 수전, 올스텐 배수구까지 한 번에 상담하세요.`,
    `${full} 사각싱크볼 설치 비용: 설치비 170,000원, 상판 타공 50,000원, 올스텐 배수구 20,000원. ${T2} 등 ${n} 지역 견적은 문자 상담으로 빠르게 받아보세요.`,
    `${josa(n, "은")} 물론 ${T3}까지 — 기존 싱크볼 철거, 상판 타공 확인, 사각싱크볼 설치, 누수 점검 순서로 시공합니다. 제품 39만원대부터, 설치비 17만원.`,
    `현재 싱크볼 사진만 보내주시면 ${n}(${T3}) 설치 가능 모델과 총 비용을 안내합니다. 사각싱크볼 39만~44만원, 기본 설치비 17만원.`,
  ];
  const description = descriptions[a.desc % descriptions.length];

  /* ----- 히어로 ----- */

  const h1Sub = pick(
    [
      "사각싱크볼 설치",
      "상판은 그대로, 볼만 새로",
      "사각 인셋 싱크볼 시공",
      "철거부터 누수 점검까지",
      "넓은 사각싱크볼로",
    ],
    seed(8)
  );

  const heroCopy = pick(
    [
      `${T2} 등 ${full} 전 지역,\n기존 싱크볼 철거부터 수전·배수구 연결까지 상담합니다.`,
      `싱크볼 사진 한 장이면 충분합니다.\n${n} 어디든 설치 가능 여부를 먼저 확인해 드립니다.`,
      `${t0}부터 ${t1}까지,\n${n} 주방 싱크볼 교체를 한 번에 진행합니다.`,
      `설치비 17만원, 상판 타공 5만원.\n${n} 싱크볼 교체 비용을 투명하게 안내합니다.`,
    ],
    seed(11)
  );

  /* ----- 본문 소개 (지역마다 다른 조합) ----- */

  const p1 = pick(
    [
      `${full} ${T3} 일대에서 기존 싱크볼을 사각싱크볼로 바꾸려는 분들의 상담을 받고 있습니다. 현재 싱크볼 사진과 상판 타공 치수를 보내주시면 그대로 들어가는 모델이 있는지 먼저 확인해 드립니다.`,
      `${n} 싱크볼 교체 상담은 사진 한 장으로 시작합니다. ${t0}, ${t1}, ${t2} 등 ${full} 어느 동네든 기존 싱크볼 치수와 상판 재질만 알면 철거 후 재타공이 필요한지 미리 판단할 수 있습니다.`,
      `싱크볼 교체를 고민할 때 가장 먼저 확인할 것은 지금 상판에 새 제품이 그대로 들어가는지입니다. ${n}(${T3}) 고객님께는 사진과 치수를 받아 맞는 사각싱크볼 모델과 필요한 작업을 정리해 드립니다.`,
      `${n}에서 싱크대 전체를 바꾸지 않고 싱크볼만 교체하고 싶다면, 기존 상판을 살린 채 볼만 바꾸는 방식이 가장 경제적입니다. 싱크모아는 ${T3} 등 ${full} 전 지역에서 이 방식으로 시공합니다.`,
      `${full} 싱크볼 교체는 기존 볼 철거, 상판 타공 확인, 새 사각싱크볼 설치, 수전·배수구 연결, 누수 점검 순서로 진행됩니다. ${t0}·${t1}·${t2} 어느 현장이든 같은 기준으로 작업합니다.`,
      `좁고 깊이가 얕은 예전 싱크볼은 큰 냄비나 프라이팬을 씻기 불편합니다. ${n} ${T3} 지역에서 넓은 사각 인셋 싱크볼로 교체를 원하시면 제품 선택부터 설치까지 한 번에 안내해 드립니다.`,
    ],
    a.p1
  );

  const p2 = pick(
    [
      `기본 설치비는 ${won(PRICE.installation)}이며 기존 싱크볼 철거와 기존 수전·배수구 연결이 포함됩니다. 상판 타공이 필요하면 ${won(PRICE.cutting)}, 올스텐 배수구로 바꾸면 ${won(PRICE.drain)}이 추가됩니다.`,
      `제품은 백조 고니 8630, 리젠스 8603 엠보, 벨라고 BLE-858, 아티잔 DU858BLR 중에서 상판 타공 크기에 맞춰 고르면 됩니다. 설치비 ${won(PRICE.installation)}에 철거와 기본 연결 작업이 들어 있습니다.`,
      `상판 타공 사이즈가 780×400mm 전후라면 대부분 추가 가공 없이 교체할 수 있고, 크기가 다르면 상판 타공(${won(PRICE.cutting)})으로 맞춥니다. 정확한 판단은 현장 사진으로 해 드립니다.`,
      `수전까지 함께 바꾸고 싶다면 6WAY 수전(${won(PRICE.faucet)})을, 배수구 위생이 신경 쓰인다면 올스텐 배수구(${won(PRICE.drain)})를 함께 선택할 수 있습니다.`,
    ],
    a.p2
  );

  const p3 = nearNames.length
    ? pick(
        [
          `${josa(n, "과")} 맞닿은 ${nearNames.join(", ")} 지역도 같은 조건으로 설치 상담이 가능합니다.`,
          `인근 ${nearNames.join("·")} 지역에서도 동일한 설치비와 옵션 가격으로 시공합니다.`,
          `${n} 외에 ${nearNames.join(", ")}에서 문의하셔도 같은 기준으로 견적을 안내합니다.`,
        ],
        a.p3
      )
    : "";

  const intro = [p1, p2, p3].filter(Boolean);

  /* ----- AI 검색용 핵심 답변 (지역별 문장) ----- */

  const answer = pick(
    [
      `${full}에서 싱크볼을 교체하면 기본 설치비 ${won(PRICE.installation)}에 제품 가격(390,000~440,000원)이 더해지고, 상판 타공이 필요하면 ${won(PRICE.cutting)}이 추가됩니다.`,
      `${n} 싱크볼 교체 총비용은 제품가 39만~44만원 + 설치비 17만원이 기본이며, 기존 상판 크기가 맞지 않을 때만 타공비 5만원이 붙습니다.`,
      `${T2} 등 ${n} 지역 싱크볼 교체는 설치비 ${won(PRICE.installation)}(철거·수전·배수구 연결 포함)부터 시작하고, 사각싱크볼 제품은 390,000원부터 선택할 수 있습니다.`,
    ],
    a.answer
  );

  /* ----- 동별 태그 ----- */

  const tagPool = [
    "싱크볼 교체",
    "사각싱크볼 설치",
    "상판 타공",
    "싱크볼 철거·설치",
    "수전·배수구 연결",
    "인셋 싱크볼 시공",
  ];
  const townTags = towns.map(
    (_, i) => tagPool[(i + seed(26)) % tagPool.length]
  );

  /* ----- FAQ ----- */

  const costFaq = pick<FaqItem>(
    [
      {
        q: `${n} 싱크볼 교체 비용은 얼마인가요?`,
        a: `기본 설치비는 ${won(PRICE.installation)}이며 기존 싱크볼 철거와 기존 수전·배수구 연결이 포함됩니다. 제품 가격(390,000~440,000원)과 상판 타공 등 추가 작업비는 별도입니다.`,
      },
      {
        q: `${n}에서 사각싱크볼로 바꾸면 총 얼마 정도 드나요?`,
        a: `제품가에 설치비 ${won(PRICE.installation)}을 더한 금액이 기본입니다. 예를 들어 백조 고니 8630(390,000원)으로 교체하면 560,000원이고, 상판 타공이 필요하면 ${won(PRICE.cutting)}이 추가됩니다.`,
      },
      {
        q: `${full} 싱크볼 설치비에는 무엇이 포함되나요?`,
        a: `설치비 ${won(PRICE.installation)}에는 기존 싱크볼 철거, 새 싱크볼 설치, 기존 수전과 배수구 재연결이 포함됩니다. 상판 타공(${won(PRICE.cutting)}), 올스텐 배수구(${won(PRICE.drain)}), 6WAY 수전(${won(PRICE.faucet)})은 선택 사항입니다.`,
      },
    ],
    a.cost
  );

  const localFaq: FaqItem = {
    q: pick(
      [
        `${T2} 쪽도 방문 설치가 되나요?`,
        `${t2} 아파트도 싱크볼 교체가 가능한가요?`,
        `${n} 외곽 지역도 출장 시공하나요?`,
      ],
      a.local
    ),
    a: `네. ${Tall} 등 ${full} 전 지역에서 방문 시공합니다. 설치 일정은 주소와 현장 사진을 확인한 뒤 상담으로 조율합니다.`,
  };

  const pool: FaqItem[] = [
    {
      q: "싱크대 전체를 바꾸지 않고 싱크볼만 교체할 수 있나요?",
      a: "네. 기존 상판과 하부장은 그대로 두고 싱크볼만 철거한 뒤 새 사각싱크볼을 설치합니다. 상판 상태가 양호하면 가장 경제적인 방법입니다.",
    },
    {
      q: "지금 쓰는 원형 싱크볼을 사각싱크볼로 바꿀 수 있나요?",
      a: "기존 상판 타공 크기와 상판 재질을 확인한 뒤 설치 가능한 사각싱크볼을 안내합니다. 크기가 맞지 않으면 상판 타공·확장 작업으로 맞춥니다.",
    },
    {
      q: "상판 타공 작업도 해주나요?",
      a: `현장 상태와 상판 재질을 사진으로 확인한 뒤 가능한 경우 타공 또는 확장 작업을 진행합니다. 비용은 ${won(PRICE.cutting)}입니다.`,
    },
    {
      q: "기존 수전과 배수구는 다시 연결해 주나요?",
      a: "기존 수전과 배수구 재연결은 기본 설치비에 포함되어 있습니다. 설치 후 누수 여부까지 점검합니다.",
    },
    {
      q: "견적은 어떻게 받나요?",
      a: `현재 싱크볼 사진, 상판 타공 치수(가로×세로), 설치 주소를 문자(${PHONE})나 견적문의 페이지로 보내주시면 설치 가능 모델과 총 비용을 안내합니다.`,
    },
    {
      q: "설치 없이 제품만 구매할 수도 있나요?",
      a: "네. 사각싱크볼 제품만 단독으로 구매해 택배로 받으실 수 있고, 올스텐 배수구 옵션도 함께 선택할 수 있습니다.",
    },
    {
      q: "어떤 브랜드의 사각싱크볼을 설치하나요?",
      a: "백조 고니 8630(390,000원), 리젠스 8603 엠보(420,000원), 아티잔 DU858BLR(420,000원), 벨라고 BLE-858(440,000원) 인셋 사각싱크볼을 취급합니다.",
    },
    {
      q: "수전도 같이 바꿀 수 있나요?",
      a: `싱크볼 교체와 함께 6WAY 수전(${won(PRICE.faucet)})으로 변경할 수 있습니다. 기존 수전을 계속 쓰는 경우 재연결은 무료입니다.`,
    },
  ];

  const start = a.faq % pool.length;
  const chosen = [0, 3, 6, 1].map(
    (step) => pool[(start + step) % pool.length]
  );

  const faq = [costFaq, localFaq, ...chosen];

  /* ----- 기타 ----- */

  const ctaCopy = pick(
    [
      "현재 싱크볼 사진과 사이즈를 보내주시면\n설치 가능 제품과 시공 방법을 안내합니다.",
      `${n} 주소와 싱크볼 사진만 보내주세요.\n맞는 모델과 총 비용을 정리해 드립니다.`,
      "상판 타공 치수를 모르셔도 괜찮습니다.\n사진으로 먼저 확인해 드립니다.",
    ],
    seed(3)
  );

  const keywords = [
    `${n} 싱크볼 교체`,
    `${n} 사각싱크볼`,
    `${n} 싱크볼 설치`,
    ...towns.slice(0, 3).map((t) => `${strip(t)} 싱크볼 교체`),
  ];

  return {
    short: n,
    full,
    regionName: loc.regionName,
    towns,
    near,
    title,
    description,
    keywords,
    h1Sub,
    heroCopy,
    intro,
    answer,
    townTags,
    faq,
    productOrder: seed(7) % 4,
    ctaCopy,
  };
}

/** 지역 이름만 빠르게 필요할 때 (목록 링크 등) */
export function getDistrictShortName(
  regionSlug: string,
  districtSlug: string
) {
  const p = DISTRICT_PROFILES[`${regionSlug}/${districtSlug}`];
  const d = INSTALLATION_REGIONS[regionSlug]?.districts.find(
    (x) => x.slug === districtSlug
  );
  if (!d) return "";
  return p?.short ?? shortName(regionSlug, d.name);
}
