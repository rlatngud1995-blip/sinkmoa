/* =========================================
   지역별 설치 페이지 고유 정보

   - towns: 해당 지역 주요 동·읍·면 (페이지마다 다른 본문 구성용)
   - near:  인접 지역 ("region/slug") — 내부 링크 및 GEO 신호
   - short: 검색용 지역명 (없으면 자동 생성)
========================================= */

export type DistrictProfile = {
  towns: string[];
  near: string[];
  short?: string;
};

export const DISTRICT_PROFILES: Record<string, DistrictProfile> = {
  /* ---------- 서울 ---------- */
  "seoul/gangnam": { towns: ["역삼동", "논현동", "대치동", "도곡동", "청담동", "삼성동", "개포동"], near: ["seoul/seocho", "seoul/songpa", "seoul/seongdong", "gyeonggi/seongnam"] },
  "seoul/gangdong": { towns: ["천호동", "길동", "둔촌동", "명일동", "고덕동", "암사동", "상일동"], near: ["seoul/songpa", "seoul/gwangjin", "gyeonggi/hanam", "gyeonggi/guri"] },
  "seoul/gangbuk": { towns: ["미아동", "번동", "수유동", "우이동", "삼양동"], near: ["seoul/seongbuk", "seoul/dobong", "seoul/nowon"] },
  "seoul/gangseo": { towns: ["마곡동", "화곡동", "등촌동", "가양동", "발산동", "방화동"], near: ["seoul/yangcheon", "seoul/yeongdeungpo", "gyeonggi/gimpo", "gyeonggi/bucheon", "incheon/gyeyang"] },
  "seoul/gwanak": { towns: ["봉천동", "신림동", "남현동", "서원동", "낙성대동"], near: ["seoul/dongjak", "seoul/geumcheon", "seoul/guro", "seoul/seocho", "gyeonggi/anyang"] },
  "seoul/gwangjin": { towns: ["자양동", "구의동", "광장동", "화양동", "군자동", "중곡동"], near: ["seoul/seongdong", "seoul/dongdaemun", "seoul/jungnang", "seoul/gangdong", "seoul/songpa"] },
  "seoul/guro": { towns: ["구로동", "신도림동", "개봉동", "고척동", "천왕동", "오류동"], near: ["seoul/yangcheon", "seoul/yeongdeungpo", "seoul/geumcheon", "gyeonggi/gwangmyeong", "gyeonggi/bucheon"] },
  "seoul/geumcheon": { towns: ["가산동", "독산동", "시흥동"], near: ["seoul/guro", "seoul/gwanak", "gyeonggi/gwangmyeong", "gyeonggi/anyang"] },
  "seoul/nowon": { towns: ["상계동", "중계동", "하계동", "공릉동", "월계동"], near: ["seoul/dobong", "seoul/gangbuk", "seoul/jungnang", "gyeonggi/uijeongbu", "gyeonggi/namyangju"] },
  "seoul/dobong": { towns: ["창동", "쌍문동", "방학동", "도봉동"], near: ["seoul/nowon", "seoul/gangbuk", "gyeonggi/uijeongbu", "gyeonggi/yangju"] },
  "seoul/dongdaemun": { towns: ["전농동", "답십리동", "장안동", "청량리동", "회기동", "이문동", "휘경동"], near: ["seoul/seongbuk", "seoul/jungnang", "seoul/gwangjin", "seoul/seongdong", "seoul/jongno"] },
  "seoul/dongjak": { towns: ["사당동", "상도동", "흑석동", "노량진동", "대방동", "신대방동"], near: ["seoul/gwanak", "seoul/seocho", "seoul/yeongdeungpo", "seoul/yongsan"] },
  "seoul/mapo": { towns: ["공덕동", "아현동", "망원동", "서교동", "상암동", "합정동"], near: ["seoul/seodaemun", "seoul/eunpyeong", "seoul/yongsan", "seoul/yeongdeungpo", "seoul/jung"] },
  "seoul/seodaemun": { towns: ["신촌동", "연희동", "홍제동", "북가좌동", "남가좌동", "북아현동"], near: ["seoul/mapo", "seoul/eunpyeong", "seoul/jongno", "seoul/jung"] },
  "seoul/seocho": { towns: ["반포동", "잠원동", "서초동", "양재동", "방배동", "우면동"], near: ["seoul/gangnam", "seoul/dongjak", "seoul/gwanak", "seoul/yongsan", "gyeonggi/gwacheon"] },
  "seoul/seongdong": { towns: ["성수동", "왕십리", "금호동", "옥수동", "행당동", "응봉동"], near: ["seoul/gwangjin", "seoul/dongdaemun", "seoul/jung", "seoul/yongsan", "seoul/gangnam"] },
  "seoul/seongbuk": { towns: ["길음동", "돈암동", "정릉동", "석관동", "장위동", "안암동"], near: ["seoul/gangbuk", "seoul/jongno", "seoul/dongdaemun", "seoul/nowon", "seoul/jungnang"] },
  "seoul/songpa": { towns: ["잠실동", "문정동", "가락동", "방이동", "석촌동", "오금동", "위례동"], near: ["seoul/gangnam", "seoul/gangdong", "seoul/gwangjin", "gyeonggi/seongnam", "gyeonggi/hanam"] },
  "seoul/yangcheon": { towns: ["목동", "신정동", "신월동"], near: ["seoul/gangseo", "seoul/guro", "seoul/yeongdeungpo"] },
  "seoul/yeongdeungpo": { towns: ["여의도동", "당산동", "문래동", "신길동", "영등포동", "양평동"], near: ["seoul/mapo", "seoul/yangcheon", "seoul/guro", "seoul/dongjak", "seoul/gangseo"] },
  "seoul/yongsan": { towns: ["한남동", "이촌동", "후암동", "원효로", "이태원동", "효창동"], near: ["seoul/jung", "seoul/mapo", "seoul/seongdong", "seoul/seocho", "seoul/dongjak"] },
  "seoul/eunpyeong": { towns: ["불광동", "응암동", "녹번동", "진관동", "수색동", "역촌동"], near: ["seoul/seodaemun", "seoul/mapo", "seoul/jongno", "gyeonggi/goyang"] },
  "seoul/jongno": { towns: ["평창동", "부암동", "혜화동", "창신동", "숭인동", "무악동"], near: ["seoul/jung", "seoul/seodaemun", "seoul/seongbuk", "seoul/eunpyeong", "seoul/dongdaemun"] },
  "seoul/jung": { towns: ["신당동", "황학동", "중림동", "만리동", "회현동", "필동"], near: ["seoul/jongno", "seoul/yongsan", "seoul/seongdong", "seoul/seodaemun", "seoul/mapo"], short: "서울 중구" },
  "seoul/jungnang": { towns: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"], near: ["seoul/dongdaemun", "seoul/gwangjin", "seoul/nowon", "seoul/seongbuk", "gyeonggi/guri"] },

  /* ---------- 경기 ---------- */
  "gyeonggi/suwon": { towns: ["영통동", "광교동", "권선동", "정자동", "매탄동", "호매실동"], near: ["gyeonggi/yongin", "gyeonggi/hwaseong", "gyeonggi/uiwang", "gyeonggi/osan"] },
  "gyeonggi/seongnam": { towns: ["분당동", "정자동", "서현동", "판교동", "수진동", "위례동"], near: ["seoul/songpa", "seoul/gangnam", "gyeonggi/yongin", "gyeonggi/gwangju", "gyeonggi/hanam"] },
  "gyeonggi/goyang": { towns: ["일산동", "주엽동", "탄현동", "화정동", "행신동", "삼송동"], near: ["gyeonggi/paju", "gyeonggi/gimpo", "seoul/eunpyeong", "gyeonggi/yangju"] },
  "gyeonggi/yongin": { towns: ["풍덕천동", "죽전동", "보정동", "동백동", "구갈동", "역북동"], near: ["gyeonggi/suwon", "gyeonggi/seongnam", "gyeonggi/hwaseong", "gyeonggi/gwangju", "gyeonggi/icheon"] },
  "gyeonggi/bucheon": { towns: ["중동", "상동", "심곡동", "소사동", "역곡동", "오정동"], near: ["incheon/bupyeong", "incheon/gyeyang", "seoul/guro", "gyeonggi/gwangmyeong", "gyeonggi/siheung"] },
  "gyeonggi/ansan": { towns: ["고잔동", "초지동", "선부동", "사동", "본오동", "와동"], near: ["gyeonggi/siheung", "gyeonggi/hwaseong", "gyeonggi/gunpo"] },
  "gyeonggi/anyang": { towns: ["평촌동", "비산동", "호계동", "석수동", "관양동", "안양동"], near: ["gyeonggi/gunpo", "gyeonggi/uiwang", "gyeonggi/gwacheon", "gyeonggi/gwangmyeong", "seoul/geumcheon"] },
  "gyeonggi/namyangju": { towns: ["다산동", "별내동", "와부읍", "진접읍", "화도읍", "호평동"], near: ["gyeonggi/guri", "seoul/nowon", "gyeonggi/gapyeong", "gyeonggi/yangpyeong", "gyeonggi/pocheon"] },
  "gyeonggi/hwaseong": { towns: ["동탄동", "봉담읍", "향남읍", "병점동", "남양읍", "반월동"], near: ["gyeonggi/suwon", "gyeonggi/osan", "gyeonggi/yongin", "gyeonggi/ansan", "gyeonggi/pyeongtaek"] },
  "gyeonggi/pyeongtaek": { towns: ["고덕동", "비전동", "안중읍", "서정동", "평택동", "포승읍"], near: ["gyeonggi/osan", "gyeonggi/anseong", "gyeonggi/hwaseong", "chungnam/asan", "chungnam/dangjin"] },
  "gyeonggi/uijeongbu": { towns: ["민락동", "신곡동", "장암동", "호원동", "가능동", "의정부동"], near: ["gyeonggi/yangju", "seoul/dobong", "gyeonggi/namyangju", "gyeonggi/pocheon"] },
  "gyeonggi/siheung": { towns: ["정왕동", "배곧동", "은행동", "목감동", "장곡동", "대야동"], near: ["gyeonggi/ansan", "gyeonggi/bucheon", "incheon/namdong", "gyeonggi/gwangmyeong"] },
  "gyeonggi/paju": { towns: ["운정동", "금촌동", "교하동", "문산읍", "조리읍"], near: ["gyeonggi/goyang", "gyeonggi/yangju", "gyeonggi/yeoncheon"] },
  "gyeonggi/gimpo": { towns: ["장기동", "구래동", "운양동", "풍무동", "사우동", "고촌읍"], near: ["gyeonggi/goyang", "seoul/gangseo", "incheon/seo", "incheon/gyeyang", "incheon/ganghwa"] },
  "gyeonggi/gwangmyeong": { towns: ["철산동", "하안동", "소하동", "광명동", "일직동"], near: ["seoul/guro", "seoul/geumcheon", "gyeonggi/anyang", "gyeonggi/bucheon", "gyeonggi/siheung"] },
  "gyeonggi/gwangju": { towns: ["오포읍", "태전동", "경안동", "송정동", "곤지암읍", "초월읍"], near: ["gyeonggi/seongnam", "gyeonggi/yongin", "gyeonggi/hanam", "gyeonggi/icheon", "gyeonggi/yangpyeong"], short: "경기 광주" },
  "gyeonggi/gunpo": { towns: ["산본동", "금정동", "당동", "대야미동", "부곡동"], near: ["gyeonggi/anyang", "gyeonggi/uiwang", "gyeonggi/ansan"] },
  "gyeonggi/osan": { towns: ["원동", "세교동", "부산동", "궐동", "수청동"], near: ["gyeonggi/hwaseong", "gyeonggi/pyeongtaek", "gyeonggi/yongin"] },
  "gyeonggi/icheon": { towns: ["중리동", "증포동", "부발읍", "장호원읍", "마장면"], near: ["gyeonggi/yongin", "gyeonggi/gwangju", "gyeonggi/yeoju", "gyeonggi/anseong", "chungbuk/eumseong"] },
  "gyeonggi/anseong": { towns: ["공도읍", "당왕동", "석정동", "대덕면"], near: ["gyeonggi/pyeongtaek", "gyeonggi/yongin", "gyeonggi/icheon", "chungbuk/jincheon", "chungnam/cheonan"] },
  "gyeonggi/uiwang": { towns: ["내손동", "포일동", "오전동", "청계동", "고천동"], near: ["gyeonggi/anyang", "gyeonggi/gunpo", "gyeonggi/suwon", "gyeonggi/gwacheon"] },
  "gyeonggi/hanam": { towns: ["미사동", "감일동", "덕풍동", "신장동", "위례동"], near: ["seoul/gangdong", "seoul/songpa", "gyeonggi/gwangju", "gyeonggi/seongnam", "gyeonggi/namyangju"] },
  "gyeonggi/yangju": { towns: ["옥정동", "회천동", "덕계동", "고읍동", "백석읍"], near: ["gyeonggi/uijeongbu", "gyeonggi/dongducheon", "gyeonggi/pocheon", "gyeonggi/paju"] },
  "gyeonggi/pocheon": { towns: ["소흘읍", "포천동", "선단동", "가산면", "신북면"], near: ["gyeonggi/uijeongbu", "gyeonggi/yangju", "gyeonggi/namyangju", "gyeonggi/gapyeong", "gyeonggi/yeoncheon"] },
  "gyeonggi/dongducheon": { towns: ["지행동", "생연동", "송내동", "보산동"], near: ["gyeonggi/yangju", "gyeonggi/yeoncheon", "gyeonggi/pocheon"] },
  "gyeonggi/gwacheon": { towns: ["중앙동", "별양동", "부림동", "원문동", "갈현동"], near: ["gyeonggi/anyang", "gyeonggi/uiwang", "seoul/seocho"] },
  "gyeonggi/guri": { towns: ["인창동", "교문동", "수택동", "갈매동", "토평동"], near: ["seoul/jungnang", "gyeonggi/namyangju", "seoul/gwangjin", "seoul/gangdong"] },
  "gyeonggi/yeoju": { towns: ["여흥동", "중앙동", "오학동", "가남읍", "대신면"], near: ["gyeonggi/icheon", "gyeonggi/yangpyeong"] },
  "gyeonggi/yangpyeong": { towns: ["양평읍", "양서면", "옥천면", "용문면", "서종면"], near: ["gyeonggi/namyangju", "gyeonggi/gapyeong", "gyeonggi/gwangju", "gyeonggi/yeoju"] },
  "gyeonggi/gapyeong": { towns: ["가평읍", "청평면", "설악면", "상면"], near: ["gyeonggi/namyangju", "gyeonggi/pocheon", "gyeonggi/yangpyeong"] },
  "gyeonggi/yeoncheon": { towns: ["전곡읍", "연천읍", "청산면", "백학면"], near: ["gyeonggi/dongducheon", "gyeonggi/pocheon", "gyeonggi/paju"] },

  /* ---------- 인천 ---------- */
  "incheon/jung": { towns: ["운서동", "중산동", "운남동", "신포동", "연안동"], near: ["incheon/dong", "incheon/michuhol", "incheon/ongjin"], short: "인천 중구" },
  "incheon/dong": { towns: ["송림동", "송현동", "화수동", "만석동"], near: ["incheon/jung", "incheon/michuhol", "incheon/seo"], short: "인천 동구" },
  "incheon/michuhol": { towns: ["주안동", "용현동", "학익동", "숭의동", "도화동", "관교동"], near: ["incheon/namdong", "incheon/yeonsu", "incheon/jung", "incheon/dong", "incheon/bupyeong"], short: "인천 미추홀구" },
  "incheon/yeonsu": { towns: ["송도동", "연수동", "동춘동", "옥련동", "청학동", "선학동"], near: ["incheon/michuhol", "incheon/namdong", "gyeonggi/siheung"], short: "인천 연수구" },
  "incheon/namdong": { towns: ["구월동", "논현동", "만수동", "간석동", "서창동", "고잔동"], near: ["incheon/yeonsu", "incheon/michuhol", "incheon/bupyeong", "gyeonggi/siheung"], short: "인천 남동구" },
  "incheon/bupyeong": { towns: ["부평동", "산곡동", "삼산동", "갈산동", "청천동", "십정동"], near: ["incheon/gyeyang", "incheon/namdong", "incheon/seo", "gyeonggi/bucheon"], short: "인천 부평구" },
  "incheon/gyeyang": { towns: ["계산동", "작전동", "효성동", "서운동", "박촌동"], near: ["incheon/bupyeong", "incheon/seo", "gyeonggi/bucheon", "gyeonggi/gimpo", "seoul/gangseo"], short: "인천 계양구" },
  "incheon/seo": { towns: ["청라동", "가정동", "석남동", "당하동", "원당동", "마전동"], near: ["incheon/gyeyang", "incheon/bupyeong", "incheon/dong", "gyeonggi/gimpo"], short: "인천 서구" },
  "incheon/ganghwa": { towns: ["강화읍", "선원면", "길상면", "화도면", "불은면"], near: ["gyeonggi/gimpo", "incheon/seo"], short: "인천 강화군" },
  "incheon/ongjin": { towns: ["영흥면", "북도면", "덕적면", "백령면"], near: ["incheon/jung", "gyeonggi/ansan"], short: "인천 옹진군" },

  /* ---------- 충남 ---------- */
  "chungnam/cheonan": { towns: ["불당동", "신부동", "두정동", "쌍용동", "백석동", "성정동", "청당동"], near: ["chungnam/asan", "chungnam/gongju", "gyeonggi/pyeongtaek", "gyeonggi/anseong", "chungbuk/cheongju"] },
  "chungnam/asan": { towns: ["배방읍", "탕정면", "온천동", "용화동", "풍기동", "모종동"], near: ["chungnam/cheonan", "chungnam/dangjin", "chungnam/yesan", "chungnam/gongju", "gyeonggi/pyeongtaek"] },
  "chungnam/gongju": { towns: ["신관동", "월송동", "웅진동", "옥룡동", "유구읍"], near: ["chungnam/cheonan", "chungnam/asan", "chungnam/nonsan", "chungnam/gyeryong", "chungnam/buyeo"] },
  "chungnam/boryeong": { towns: ["대천동", "명천동", "웅천읍", "주포면", "주교면"], near: ["chungnam/hongseong", "chungnam/cheongyang", "chungnam/buyeo", "chungnam/seocheon"] },
  "chungnam/seosan": { towns: ["동문동", "예천동", "석남동", "대산읍", "해미면", "음암면"], near: ["chungnam/dangjin", "chungnam/taean", "chungnam/hongseong", "chungnam/yesan"] },
  "chungnam/nonsan": { towns: ["취암동", "부창동", "내동", "강경읍", "연무읍"], near: ["chungnam/gyeryong", "chungnam/gongju", "chungnam/buyeo", "chungnam/geumsan"] },
  "chungnam/gyeryong": { towns: ["엄사면", "금암동", "두마면", "신도안면"], near: ["chungnam/nonsan", "chungnam/gongju"] },
  "chungnam/dangjin": { towns: ["읍내동", "수청동", "송악읍", "합덕읍", "신평면", "석문면"], near: ["chungnam/seosan", "chungnam/asan", "chungnam/yesan", "gyeonggi/pyeongtaek"] },
  "chungnam/geumsan": { towns: ["금산읍", "추부면", "복수면", "진산면"], near: ["chungnam/nonsan", "chungbuk/okcheon", "chungbuk/yeongdong"] },
  "chungnam/buyeo": { towns: ["부여읍", "규암면", "홍산면", "임천면"], near: ["chungnam/gongju", "chungnam/nonsan", "chungnam/seocheon", "chungnam/boryeong", "chungnam/cheongyang"] },
  "chungnam/seocheon": { towns: ["서천읍", "장항읍", "한산면", "비인면"], near: ["chungnam/buyeo", "chungnam/boryeong"] },
  "chungnam/cheongyang": { towns: ["청양읍", "정산면", "비봉면", "화성면"], near: ["chungnam/gongju", "chungnam/boryeong", "chungnam/hongseong", "chungnam/yesan", "chungnam/buyeo"] },
  "chungnam/hongseong": { towns: ["홍성읍", "홍북읍", "광천읍", "갈산면"], near: ["chungnam/yesan", "chungnam/seosan", "chungnam/boryeong", "chungnam/cheongyang"] },
  "chungnam/yesan": { towns: ["예산읍", "삽교읍", "덕산면", "신암면", "고덕면"], near: ["chungnam/hongseong", "chungnam/asan", "chungnam/dangjin", "chungnam/seosan", "chungnam/gongju"] },
  "chungnam/taean": { towns: ["태안읍", "안면읍", "남면", "소원면", "근흥면"], near: ["chungnam/seosan"] },

  /* ---------- 충북 ---------- */
  "chungbuk/cheongju": { towns: ["복대동", "가경동", "오창읍", "오송읍", "용암동", "율량동"], near: ["chungbuk/jeungpyeong", "chungbuk/jincheon", "chungbuk/boeun", "chungbuk/goesan", "chungnam/cheonan"] },
  "chungbuk/chungju": { towns: ["연수동", "칠금동", "호암동", "용산동", "주덕읍", "대소원면"], near: ["chungbuk/jecheon", "chungbuk/eumseong", "chungbuk/goesan"] },
  "chungbuk/jecheon": { towns: ["청전동", "신백동", "의림동", "장락동", "봉양읍"], near: ["chungbuk/danyang", "chungbuk/chungju"] },
  "chungbuk/boeun": { towns: ["보은읍", "속리산면", "마로면", "탄부면"], near: ["chungbuk/cheongju", "chungbuk/okcheon", "chungbuk/goesan"] },
  "chungbuk/okcheon": { towns: ["옥천읍", "이원면", "청산면", "군서면"], near: ["chungbuk/boeun", "chungbuk/yeongdong", "chungnam/geumsan"] },
  "chungbuk/yeongdong": { towns: ["영동읍", "황간면", "용산면", "양강면"], near: ["chungbuk/okcheon", "chungnam/geumsan"] },
  "chungbuk/jeungpyeong": { towns: ["증평읍", "도안면"], near: ["chungbuk/cheongju", "chungbuk/goesan", "chungbuk/eumseong", "chungbuk/jincheon"] },
  "chungbuk/jincheon": { towns: ["진천읍", "덕산읍", "광혜원면", "이월면"], near: ["chungbuk/cheongju", "chungbuk/eumseong", "chungbuk/jeungpyeong", "chungnam/cheonan", "gyeonggi/anseong"] },
  "chungbuk/goesan": { towns: ["괴산읍", "불정면", "연풍면", "칠성면", "청천면"], near: ["chungbuk/chungju", "chungbuk/jeungpyeong", "chungbuk/cheongju", "chungbuk/eumseong"] },
  "chungbuk/eumseong": { towns: ["음성읍", "금왕읍", "맹동면", "대소면", "감곡면"], near: ["chungbuk/jincheon", "chungbuk/chungju", "chungbuk/goesan", "chungbuk/jeungpyeong", "gyeonggi/icheon"] },
  "chungbuk/danyang": { towns: ["단양읍", "매포읍", "가곡면", "영춘면"], near: ["chungbuk/jecheon"] },
};
