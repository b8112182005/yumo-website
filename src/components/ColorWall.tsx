"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Color {
  name: string;
  hex: string;
  family: string;
}

const COLORS: Color[] = [
  // 白瓷 (16)
  { name: "純白", hex: "#FAFAF8", family: "白瓷" },
  { name: "鮮白", hex: "#F8F8F5", family: "白瓷" },
  { name: "象牙白", hex: "#FFFFF0", family: "白瓷" },
  { name: "奶白", hex: "#FFF8F0", family: "白瓷" },
  { name: "雲白", hex: "#F5F5F0", family: "白瓷" },
  { name: "珍珠白", hex: "#F0EDE8", family: "白瓷" },
  { name: "米白", hex: "#EEE8D5", family: "白瓷" },
  { name: "沙白", hex: "#E8E0D0", family: "白瓷" },
  { name: "奶油", hex: "#FDE8C0", family: "白瓷" },
  { name: "香草", hex: "#F3E5AB", family: "白瓷" },
  { name: "燕麥", hex: "#DDD5C0", family: "白瓷" },
  { name: "杏仁", hex: "#E8D5B5", family: "白瓷" },
  { name: "芝士", hex: "#E0C890", family: "白瓷" },
  { name: "蜂蜜", hex: "#D4B880", family: "白瓷" },
  { name: "麥桿", hex: "#C8B080", family: "白瓷" },
  { name: "奶茶", hex: "#D2B48C", family: "白瓷" },
  // 礦物 (16)
  { name: "暖白灰", hex: "#D8D4CC", family: "礦物" },
  { name: "燧石", hex: "#C8C4BA", family: "礦物" },
  { name: "灰泥", hex: "#B8B4A8", family: "礦物" },
  { name: "淺暖灰", hex: "#A8A49A", family: "礦物" },
  { name: "暖灰", hex: "#989490", family: "礦物" },
  { name: "中暖灰", hex: "#888480", family: "礦物" },
  { name: "深暖灰", hex: "#706C68", family: "礦物" },
  { name: "鵝卵石", hex: "#C0BCBA", family: "礦物" },
  { name: "薄霧", hex: "#D0D0D0", family: "礦物" },
  { name: "銀灰", hex: "#B8B8BC", family: "礦物" },
  { name: "鈦灰", hex: "#A0A0A8", family: "礦物" },
  { name: "石墨", hex: "#707080", family: "礦物" },
  { name: "炭灰", hex: "#505060", family: "礦物" },
  { name: "鋼鐵", hex: "#404050", family: "礦物" },
  { name: "鉛灰", hex: "#606065", family: "礦物" },
  { name: "礦石", hex: "#585855", family: "礦物" },
  // 大地 (17)
  { name: "沙漠", hex: "#C8A882", family: "大地" },
  { name: "土陶", hex: "#B8906A", family: "大地" },
  { name: "燒陶", hex: "#A07850", family: "大地" },
  { name: "棕褐", hex: "#8B6040", family: "大地" },
  { name: "巧克力", hex: "#6B4530", family: "大地" },
  { name: "摩卡", hex: "#7B5840", family: "大地" },
  { name: "焦糖", hex: "#C87840", family: "大地" },
  { name: "木薑", hex: "#D4904A", family: "大地" },
  { name: "琥珀", hex: "#CC8020", family: "大地" },
  { name: "赭石", hex: "#A05018", family: "大地" },
  { name: "磚紅", hex: "#B04030", family: "大地" },
  { name: "陶土", hex: "#C06050", family: "大地" },
  { name: "珊瑚磚", hex: "#C87060", family: "大地" },
  { name: "玫瑰木", hex: "#905060", family: "大地" },
  { name: "煙草", hex: "#907860", family: "大地" },
  { name: "棗紅", hex: "#8B3030", family: "大地" },
  { name: "深磚", hex: "#7A3020", family: "大地" },
  // 綠藍 (24)
  { name: "薄荷", hex: "#D4E8D8", family: "綠藍" },
  { name: "冰玉", hex: "#C4D8C4", family: "綠藍" },
  { name: "雨林", hex: "#A8C4A0", family: "綠藍" },
  { name: "鼠尾草", hex: "#90A888", family: "綠藍" },
  { name: "橄欖", hex: "#788870", family: "綠藍" },
  { name: "深森", hex: "#506058", family: "綠藍" },
  { name: "竹葉", hex: "#88A870", family: "綠藍" },
  { name: "苔蘚", hex: "#70885A", family: "綠藍" },
  { name: "冬青", hex: "#3D6050", family: "綠藍" },
  { name: "水鴨", hex: "#386870", family: "綠藍" },
  { name: "薄霧藍", hex: "#C4D4E0", family: "綠藍" },
  { name: "冰川", hex: "#B0C8D8", family: "綠藍" },
  { name: "北海", hex: "#88AAC0", family: "綠藍" },
  { name: "淺牛仔", hex: "#7898B0", family: "綠藍" },
  { name: "天藍", hex: "#6888A0", family: "綠藍" },
  { name: "礦物藍", hex: "#507090", family: "綠藍" },
  { name: "深海", hex: "#305070", family: "綠藍" },
  { name: "靛藍", hex: "#204060", family: "綠藍" },
  { name: "普魯士", hex: "#103050", family: "綠藍" },
  { name: "夜空", hex: "#0A1830", family: "綠藍" },
  { name: "湖綠", hex: "#48A090", family: "綠藍" },
  { name: "孔雀", hex: "#308080", family: "綠藍" },
  { name: "翡翠", hex: "#50A878", family: "綠藍" },
  { name: "玉石", hex: "#70A890", family: "綠藍" },
  // 深色 (16)
  { name: "墨黑", hex: "#1A1A20", family: "深色" },
  { name: "濃墨", hex: "#141420", family: "深色" },
  { name: "炭黑", hex: "#202028", family: "深色" },
  { name: "暖黑", hex: "#1C1810", family: "深色" },
  { name: "深棕黑", hex: "#201410", family: "深色" },
  { name: "深軍綠", hex: "#182818", family: "深色" },
  { name: "深藏青", hex: "#101830", family: "深色" },
  { name: "深酒紅", hex: "#301018", family: "深色" },
  { name: "茄紫黑", hex: "#302040", family: "深色" },
  { name: "孔雀黑", hex: "#102028", family: "深色" },
  { name: "深橄欖", hex: "#202015", family: "深色" },
  { name: "深赭", hex: "#301810", family: "深色" },
  { name: "深玫瑰", hex: "#301520", family: "深色" },
  { name: "近黑灰", hex: "#282828", family: "深色" },
  { name: "墨綠黑", hex: "#0F1F18", family: "深色" },
  { name: "深錳", hex: "#1E1E28", family: "深色" },
  // 特殊 (20)
  { name: "珊瑚", hex: "#E88070", family: "特殊" },
  { name: "玫瑰", hex: "#D47080", family: "特殊" },
  { name: "胭脂", hex: "#C04060", family: "特殊" },
  { name: "薰衣草", hex: "#C0A0C8", family: "特殊" },
  { name: "丁香", hex: "#A088C0", family: "特殊" },
  { name: "紫霧", hex: "#9878A8", family: "特殊" },
  { name: "磁磚藍", hex: "#5888A8", family: "特殊" },
  { name: "水鴨綠", hex: "#388888", family: "特殊" },
  { name: "軍綠", hex: "#586848", family: "特殊" },
  { name: "橄欖綠", hex: "#788040", family: "特殊" },
  { name: "芥末", hex: "#A89828", family: "特殊" },
  { name: "金沙", hex: "#C8A840", family: "特殊" },
  { name: "夕陽橙", hex: "#D07840", family: "特殊" },
  { name: "火焰橙", hex: "#D06030", family: "特殊" },
  { name: "杜鵑", hex: "#C04870", family: "特殊" },
  { name: "暮紫", hex: "#806090", family: "特殊" },
  { name: "鈷藍", hex: "#3860A0", family: "特殊" },
  { name: "藏青", hex: "#284878", family: "特殊" },
  { name: "松石", hex: "#50A898", family: "特殊" },
  { name: "祖母綠", hex: "#287848", family: "特殊" },
];

const FAMILIES = ["全部", "白瓷", "礦物", "大地", "綠藍", "深色", "特殊"];

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function ColorWall() {
  const [activeFamily, setActiveFamily] = useState("全部");
  const [tooltip, setTooltip] = useState<Color | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 50, damping: 22 });
  const springY = useSpring(tiltY, { stiffness: 50, damping: 22 });

  const filtered = useMemo(
    () => (activeFamily === "全部" ? COLORS : COLORS.filter((c) => c.family === activeFamily)),
    [activeFamily]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(y * -5);
    tiltY.set(x * 9);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setTooltip(null);
  };

  return (
    <section id="colors" className="py-20 bg-brand-ink overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-8 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-brand-gold tracking-[0.35em] text-[10px] font-sans font-light mb-2">
            COLOR SYSTEM
          </p>
          <div className="flex items-end gap-4 mb-1">
            <h2 className="font-serif font-black text-brand-white text-2xl md:text-3xl tracking-wide">
              色彩系統
            </h2>
            <span className="text-brand-gold font-sans text-[10px] tracking-[0.25em] mb-1 opacity-60">
              {COLORS.length} COLORS
            </span>
          </div>
          <p className="text-brand-muted text-xs font-light tracking-wider">
            精選 {COLORS.length} 種牆色，涵蓋六大色系 · 點擊任意色塊查看色號
          </p>
        </motion.div>
      </div>

      {/* Filter chips */}
      <div className="px-4 md:px-8 mb-5 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 pb-1 min-w-max">
          {FAMILIES.map((fam) => (
            <button
              key={fam}
              onClick={() => { setActiveFamily(fam); setTooltip(null); }}
              className="flex-shrink-0 px-4 py-1.5 text-[10px] tracking-[0.2em] font-sans transition-all duration-200"
              style={{
                border: `1px solid ${activeFamily === fam ? "#C6A45C" : "#3D3B37"}`,
                color: activeFamily === fam ? "#C6A45C" : "#8A847A",
                background: activeFamily === fam ? "rgba(198,164,92,0.08)" : "transparent",
              }}
            >
              {fam}
            </button>
          ))}
        </div>
      </div>

      {/* Tooltip strip */}
      <div className="px-4 md:px-8 mb-3 h-8 flex items-center">
        {tooltip ? (
          <motion.div
            key={tooltip.hex}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div style={{ width: 20, height: 20, backgroundColor: tooltip.hex, flexShrink: 0 }} />
            <span className="text-brand-white font-sans text-xs tracking-wider">{tooltip.name}</span>
            <span className="text-brand-gold font-mono text-[10px]">{tooltip.hex.toUpperCase()}</span>
            <span
              className="font-sans text-[9px] tracking-[0.2em] px-2 py-0.5"
              style={{ border: "1px solid #3D3B37", color: "#8A847A" }}
            >
              {tooltip.family}
            </span>
          </motion.div>
        ) : (
          <p className="text-brand-faint text-[10px] tracking-wider font-sans">
            Hover / 點擊色塊查看色號
          </p>
        )}
      </div>

      {/* 3D tilt grid (desktop) / flat grid (mobile) */}
      <div
        ref={containerRef}
        className="px-4 md:px-8"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
              gap: "3px",
            }}
          >
            {filtered.map((color, i) => (
              <motion.div
                key={color.hex + activeFamily}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.006, duration: 0.28, ease: "easeOut" }}
                className="cursor-pointer transition-transform duration-100 hover:scale-110 hover:z-10 relative"
                style={{ aspectRatio: "1" }}
                onMouseEnter={() => setTooltip(color)}
                onClick={() => setTooltip(tooltip?.hex === color.hex ? null : color)}
              >
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: color.hex }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-4 md:px-8 mt-6">
        <p className="text-brand-faint text-[10px] tracking-wider font-sans">
          ※ 以上色彩僅供參考，實際上色請以實體色卡為準 · 可聯絡我們索取指定色號色卡
        </p>
      </div>
    </section>
  );
}
