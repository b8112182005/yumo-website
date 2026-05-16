export const BRAND = {
  name: "瑀墨塗料",
  nameEn: "YUMO PAINT",
  slogan: "The beauty of restraint, the power of paint.",
  sloganZh: "漆之美，墨之韻",
  subtitle: "嚴選代理 · 全球品牌",
  description:
    "瑀墨塗料嚴選全球頂級品牌，代理立邦、得利、班傑明摩爾等六大國際品牌，為工程商、設計師與建設公司提供最完善的塗料採購方案。每一次選擇，都是品質的承諾。",
  address: "台中市北屯區平和里旅順路一段152號2樓",
  phone: "0930-691-134",
  line: "@yumo_paint",
  lineUrl: "https://lin.ee/yumo_paint",
  taxId: "60309610",
  hours: "09:00 – 18:00（週一至週六）",
  copyright: "© 2026 瑀墨塗料有限公司 YUMO PAINT CO., LTD. All rights reserved.",
};

export interface Product {
  id: string;
  brand: string;
  brandEn: string;
  name: string;
  spec: string;
  color: string;
  tags: string[];
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "nippon",
    brand: "立邦",
    brandEn: "NIPPON",
    name: "淨味全效乳膠漆",
    spec: "5L / 啞光",
    color: "#E60012",
    tags: ["抗甲醛", "零 VOC", "防霉", "兒童安全"],
    image: "/images/nippon.png",
  },
  {
    id: "dulux",
    brand: "得利",
    brandEn: "DULUX",
    name: "竹炭健康居抗甲醛乳膠漆",
    spec: "5L / 柔光",
    color: "#003DA5",
    tags: ["竹炭淨化", "抗菌", "超低 VOC", "耐擦洗"],
    image: "/images/dulux.jpg",
  },
  {
    id: "rainbow",
    brand: "虹牌",
    brandEn: "RAINBOW",
    name: "全效乳膠漆",
    spec: "5GL / 平光",
    color: "#00A651",
    tags: ["台灣製造", "高遮蓋", "防水", "經濟實惠"],
    image: "/images/rainbow.jpg",
  },
  {
    id: "benjamin",
    brand: "班傑明摩爾",
    brandEn: "BENJAMIN MOORE",
    name: "Regal Select 皇室精選",
    spec: "1GL / 蛋殼光",
    color: "#B8860B",
    tags: ["色彩精準", "高耐久", "零 VOC", "設計師首選"],
    image: "/images/benjamin.jpg",
  },
];

export const EXTRA_PRODUCTS: Product[] = [
  {
    id: "jotun",
    brand: "佐敦",
    brandEn: "JOTUN",
    name: "Majestic True Beauty",
    spec: "5L / 絲光",
    color: "#1B3A5C",
    tags: ["挪威品牌", "防霉", "持色", "環保"],
    image: "/images/nippon.png",
  },
  {
    id: "flugger",
    brand: "福樂閣",
    brandEn: "FLÜGGER",
    name: "Forest 雅緻木器漆",
    spec: "0.75L / 亮光",
    color: "#5B2C6F",
    tags: ["丹麥皇室御用", "木器專用", "環保認證", "高硬度"],
    image: "/images/dulux.jpg",
  },
];

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  year: string;
}

export const PORTFOLIO: PortfolioItem[] = [
  { id: "p1", category: "住宅", title: "桃園中路特區豪宅建案 — 班傑明摩爾全室塗料供應", year: "2024" },
  { id: "p2", category: "商空", title: "台北大安區咖啡廳 — 得利藝術塗料批量採購", year: "2024" },
  { id: "p3", category: "住宅", title: "新竹竹北透天別墅 — 佐敦進口塗料全系列供應", year: "2023" },
  { id: "p4", category: "公設", title: "桃園社區大樓 — 立邦公共空間塗料大宗供應", year: "2023" },
  { id: "p5", category: "工業", title: "中壢工業區廠房 — EPOXY 地坪材料供應", year: "2023" },
  { id: "p6", category: "住宅", title: "林口新市鎮建案 — 虹牌新成屋全室塗料供應", year: "2022" },
];

export const SELECTION = {
  title: "選品服務",
  description:
    "瑀墨塗料以代理商視角嚴格把關每一個品牌，從品牌認證到倉儲配送，為您提供最省心的採購體驗。無論是小批量試樣或大宗工程用量，我們都能快速回應。",
  services: [
    { label: "品牌代理", desc: "全球六大品牌嚴選，保證原廠授權正品" },
    { label: "大宗採購", desc: "工程批量採購，提供專屬優惠報價" },
    { label: "色彩諮詢", desc: "專業配色顧問，協助設計師與業主選色" },
    { label: "快速配送", desc: "台中倉儲備貨，全台快速到貨服務" },
  ],
};

export const BRAND_PARTNERS = [
  { name: "NIPPON", zh: "立邦", country: "Japan" },
  { name: "DULUX", zh: "得利", country: "Netherlands" },
  { name: "RAINBOW", zh: "虹牌", country: "Taiwan" },
  { name: "BENJAMIN MOORE", zh: "班傑明摩爾", country: "U.S.A." },
  { name: "JOTUN", zh: "佐敦", country: "Norway" },
  { name: "FLÜGGER", zh: "福樂閣", country: "Denmark" },
];

export interface NavItem {
  label: string;
  href: string;
  num: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "嚴選塗料", href: "#products", num: "01" },
  { label: "3D 展示", href: "#viewer", num: "02" },
  { label: "選品服務", href: "#selection", num: "03" },
  { label: "合作案例", href: "#portfolio", num: "04" },
  { label: "聯絡我們", href: "#contact", num: "05" },
];
