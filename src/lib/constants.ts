export const BRAND = {
  name: "瑀墨塗料",
  nameEn: "YUMO PAINT",
  slogan: "The beauty of restraint, the power of paint.",
  sloganZh: "漆之美，墨之韻",
  subtitle: "嚴選全球塗料，專業施工團隊",
  description:
    "瑀墨塗料精選全球頂級品牌塗料，從居家空間到商業工程，提供最專業的塗料選品與施工服務。我們相信，每一面牆都值得被認真對待。",
  address: "台中市北屯區環中路一段519號",
  phone: "0930-691-134",
  line: "@yumopaint",
  lineUrl: "https://lin.ee/yumopaint",
  taxId: "60309610",
  hours: "07:30-18:00（週一至週六）",
  copyright: "© 2026 瑀墨塗料 YUMO PAINT CO. All rights reserved.",
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
    tags: ["丹麥皇室", "木器專用", "環保認證", "高硬度"],
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
  { id: "p1", category: "住宅", title: "桃園中路特區 — 全室重新塗裝", year: "2024" },
  { id: "p2", category: "商空", title: "台北大安區咖啡廳 — 藝術塗料施工", year: "2024" },
  { id: "p3", category: "住宅", title: "新竹竹北 — 透天別墅外牆翻新", year: "2023" },
  { id: "p4", category: "公設", title: "桃園社區大樓 — 公共空間粉刷", year: "2023" },
  { id: "p5", category: "商空", title: "中壢工業區 — 廠房地坪 EPOXY", year: "2023" },
  { id: "p6", category: "住宅", title: "林口新市鎮 — 新成屋全室塗裝", year: "2022" },
];

export const ENGINEERING = {
  title: "專業工程施作",
  description:
    "瑀墨塗料擁有經驗豐富的施工團隊，從色彩規劃到完工交付，每一個環節都嚴格把關。無論是住家翻新、商業空間或大型工程，我們都能提供最完善的解決方案。",
  services: [
    { label: "室內粉刷", desc: "居家、辦公、商業空間全室塗裝" },
    { label: "外牆翻新", desc: "防水塗料施工、外牆拉皮" },
    { label: "特殊塗裝", desc: "藝術塗料、仿石漆、EPOXY 地坪" },
    { label: "色彩諮詢", desc: "專業配色建議、現場打樣" },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  num: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "嚴選塗料", href: "#products", num: "01" },
  { label: "3D 展示", href: "#viewer", num: "02" },
  { label: "工程服務", href: "#engineering", num: "03" },
  { label: "施工實績", href: "#portfolio", num: "04" },
  { label: "聯絡我們", href: "#contact", num: "05" },
];
