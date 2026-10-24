
export type District = {
  slug: string;
  name: string;
};

export type InstallationRegion = {
  name: string;
  districts: District[];
};

export const INSTALLATION_REGIONS: Record<
  string,
  InstallationRegion
> = {
  seoul: {
    name: "서울",
    districts: [
      { slug: "gangnam", name: "강남구" },
      { slug: "gangdong", name: "강동구" },
      { slug: "gangbuk", name: "강북구" },
      { slug: "gangseo", name: "강서구" },
      { slug: "gwanak", name: "관악구" },
      { slug: "gwangjin", name: "광진구" },
      { slug: "guro", name: "구로구" },
      { slug: "geumcheon", name: "금천구" },
      { slug: "nowon", name: "노원구" },
      { slug: "dobong", name: "도봉구" },
      { slug: "dongdaemun", name: "동대문구" },
      { slug: "dongjak", name: "동작구" },
      { slug: "mapo", name: "마포구" },
      { slug: "seodaemun", name: "서대문구" },
      { slug: "seocho", name: "서초구" },
      { slug: "seongdong", name: "성동구" },
      { slug: "seongbuk", name: "성북구" },
      { slug: "songpa", name: "송파구" },
      { slug: "yangcheon", name: "양천구" },
      { slug: "yeongdeungpo", name: "영등포구" },
      { slug: "yongsan", name: "용산구" },
      { slug: "eunpyeong", name: "은평구" },
      { slug: "jongno", name: "종로구" },
      { slug: "jung", name: "중구" },
      { slug: "jungnang", name: "중랑구" },
    ],
  },

  gyeonggi: {
    name: "경기",
    districts: [
      { slug: "suwon", name: "수원시" },
      { slug: "seongnam", name: "성남시" },
      { slug: "goyang", name: "고양시" },
      { slug: "yongin", name: "용인시" },
      { slug: "bucheon", name: "부천시" },
      { slug: "ansan", name: "안산시" },
      { slug: "anyang", name: "안양시" },
      { slug: "namyangju", name: "남양주시" },
      { slug: "hwaseong", name: "화성시" },
      { slug: "pyeongtaek", name: "평택시" },
      { slug: "uijeongbu", name: "의정부시" },
      { slug: "siheung", name: "시흥시" },
      { slug: "paju", name: "파주시" },
      { slug: "gimpo", name: "김포시" },
      { slug: "gwangmyeong", name: "광명시" },
      { slug: "gwangju", name: "광주시" },
      { slug: "gunpo", name: "군포시" },
      { slug: "osan", name: "오산시" },
      { slug: "icheon", name: "이천시" },
      { slug: "anseong", name: "안성시" },
      { slug: "uiwang", name: "의왕시" },
      { slug: "hanam", name: "하남시" },
      { slug: "yangju", name: "양주시" },
      { slug: "pocheon", name: "포천시" },
      { slug: "dongducheon", name: "동두천시" },
      { slug: "gwacheon", name: "과천시" },
      { slug: "guri", name: "구리시" },
      { slug: "yeoju", name: "여주시" },
      { slug: "yangpyeong", name: "양평군" },
      { slug: "gapyeong", name: "가평군" },
      { slug: "yeoncheon", name: "연천군" },
    ],
  },

  incheon: {
    name: "인천",
    districts: [
      { slug: "jung", name: "중구" },
      { slug: "dong", name: "동구" },
      { slug: "michuhol", name: "미추홀구" },
      { slug: "yeonsu", name: "연수구" },
      { slug: "namdong", name: "남동구" },
      { slug: "bupyeong", name: "부평구" },
      { slug: "gyeyang", name: "계양구" },
      { slug: "seo", name: "서구" },
      { slug: "ganghwa", name: "강화군" },
      { slug: "ongjin", name: "옹진군" },
    ],
  },

  chungnam: {
    name: "충남",
    districts: [
      { slug: "cheonan", name: "천안시" },
      { slug: "asan", name: "아산시" },
      { slug: "gongju", name: "공주시" },
      { slug: "boryeong", name: "보령시" },
      { slug: "seosan", name: "서산시" },
      { slug: "nonsan", name: "논산시" },
      { slug: "gyeryong", name: "계룡시" },
      { slug: "dangjin", name: "당진시" },
      { slug: "geumsan", name: "금산군" },
      { slug: "buyeo", name: "부여군" },
      { slug: "seocheon", name: "서천군" },
      { slug: "cheongyang", name: "청양군" },
      { slug: "hongseong", name: "홍성군" },
      { slug: "yesan", name: "예산군" },
      { slug: "taean", name: "태안군" },
    ],
  },

  chungbuk: {
    name: "충북",
    districts: [
      { slug: "cheongju", name: "청주시" },
      { slug: "chungju", name: "충주시" },
      { slug: "jecheon", name: "제천시" },
      { slug: "boeun", name: "보은군" },
      { slug: "okcheon", name: "옥천군" },
      { slug: "yeongdong", name: "영동군" },
      { slug: "jeungpyeong", name: "증평군" },
      { slug: "jincheon", name: "진천군" },
      { slug: "goesan", name: "괴산군" },
      { slug: "eumseong", name: "음성군" },
      { slug: "danyang", name: "단양군" },
    ],
  },
};

export function getInstallationLocation(
  regionSlug: string,
  districtSlug: string
) {
  const region = INSTALLATION_REGIONS[regionSlug];

  if (!region) return null;

  const district = region.districts.find(
    (item) => item.slug === districtSlug
  );

  if (!district) return null;

  return {
    regionSlug,
    districtSlug,
    regionName: region.name,
    districtName: district.name,
    fullName: `${region.name} ${district.name}`,
  };
}

export function getAllInstallationPaths() {
  return Object.entries(INSTALLATION_REGIONS).flatMap(
    ([region, value]) =>
      value.districts.map((district) => ({
        region,
        district: district.slug,
      }))
  );
}
