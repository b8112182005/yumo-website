"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Room {
  id: string;
  num: string;
  label: string;
  subtitle: string;
  desc: string;
  tags: string[];
  accentColor: string;
  hotspot: { x: number; y: number };
  fillPath: string;
}

const ROOMS: Room[] = [
  {
    id: "showroom",
    num: "01",
    label: "品牌展示廳",
    subtitle: "BRAND SHOWROOM",
    desc: "六大國際品牌實品展示，專業顧問一對一為您解說塗料特性與適用場景，免費索取色卡。",
    tags: ["實品陳列", "免費色卡", "專業解說"],
    accentColor: "#C6A45C",
    hotspot: { x: 228, y: 145 },
    fillPath: "M22,22 H438 V258 H22 Z",
  },
  {
    id: "colorwall",
    num: "02",
    label: "色彩牆",
    subtitle: "COLOR LIBRARY",
    desc: "超過 2,000 種色號，Pantone 精準對色，電腦自動調色，找到您空間的完美色彩。",
    tags: ["2000+ 色號", "Pantone 對色", "電腦調色"],
    accentColor: "#7EB5D4",
    hotspot: { x: 590, y: 145 },
    fillPath: "M442,22 H738 V258 H442 Z",
  },
  {
    id: "consult",
    num: "03",
    label: "諮詢室",
    subtitle: "CONSULTATION",
    desc: "設計師與業主的最佳夥伴，配色規劃、工程評估、大宗採購報價，一次搞定。",
    tags: ["配色規劃", "工程估價", "批量報價"],
    accentColor: "#8DC48A",
    hotspot: { x: 119, y: 352 },
    fillPath: "M22,262 H218 V438 H22 Z",
  },
  {
    id: "mixing",
    num: "04",
    label: "電腦調色室",
    subtitle: "COLOR MIXING",
    desc: "精密電腦調色機，依客戶需求精準配出任意色號，現場即時完成，無需等待。",
    tags: ["精準配色", "即時完成", "任意色號"],
    accentColor: "#C4A882",
    hotspot: { x: 329, y: 352 },
    fillPath: "M222,262 H438 V438 H222 Z",
  },
  {
    id: "storage",
    num: "05",
    label: "倉儲配送",
    subtitle: "WAREHOUSE",
    desc: "大型倉儲備貨充足，大宗採購即時出貨，台中倉庫全台快速配送，當天出庫。",
    tags: ["大型倉儲", "即時出貨", "全台配送"],
    accentColor: "#A0A8C4",
    hotspot: { x: 590, y: 352 },
    fillPath: "M442,262 H738 V438 H442 Z",
  },
];

const W = "#3D3B37";   // wall stroke
const WL = "#52504C";  // door / light detail

export default function ShowroomTour() {
  const [activeId, setActiveId] = useState<string | null>("showroom");
  const active = ROOMS.find((r) => r.id === activeId) ?? null;

  return (
    <section id="showroom" className="py-20 bg-brand-ink overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-brand-gold tracking-[0.35em] text-[10px] font-sans font-light mb-2">
            VIRTUAL SHOWROOM
          </p>
          <h2 className="font-serif font-black text-brand-white text-2xl md:text-3xl tracking-wide">
            展間導覽
          </h2>
          <p className="text-brand-muted text-xs font-light tracking-wider mt-1">
            點擊區域查看各展間功能 · 台中北屯展間開放參觀
          </p>
        </motion.div>
      </div>

      {/* Floor plan */}
      <div className="px-4 md:px-8 overflow-x-auto">
        <motion.div
          style={{ minWidth: "380px" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            viewBox="0 0 760 510"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Room highlight fills */}
            {ROOMS.map((room) => (
              <path
                key={room.id + "-fill"}
                d={room.fillPath}
                fill={activeId === room.id ? room.accentColor : "transparent"}
                fillOpacity={activeId === room.id ? 0.07 : 0}
                style={{ transition: "fill-opacity 0.3s" }}
              />
            ))}

            {/* Outer wall with entrance notch */}
            <path
              d="M20,20 L740,20 L740,440 L430,440 L430,480 L330,480 L330,440 L20,440 Z"
              fill="none"
              stroke={W}
              strokeWidth={1.5}
            />

            {/* Interior walls */}
            <line x1={440} y1={20}  x2={440} y2={440} stroke={W} strokeWidth={1} />
            <line x1={20}  y1={260} x2={740} y2={260} stroke={W} strokeWidth={1} />
            <line x1={220} y1={260} x2={220} y2={440} stroke={W} strokeWidth={1} />

            {/* Door swings */}
            {/* Entrance door swing (main entry) */}
            <path d="M330,440 A55,55 0 0 1 385,440" fill="none" stroke={WL} strokeWidth={0.7} opacity={0.7} />
            <line x1={330} y1={440} x2={330} y2={430} stroke={WL} strokeWidth={0.5} opacity={0.5} />
            {/* Consult room door */}
            <path d="M68,260 A22,22 0 0 1 90,238" fill="none" stroke={WL} strokeWidth={0.7} opacity={0.6} />
            <line x1={68} y1={260} x2={68} y2={249} stroke={WL} strokeWidth={0.5} opacity={0.5} />
            {/* Mixing room door */}
            <path d="M268,260 A22,22 0 0 0 290,238" fill="none" stroke={WL} strokeWidth={0.7} opacity={0.6} />
            <line x1={290} y1={260} x2={290} y2={249} stroke={WL} strokeWidth={0.5} opacity={0.5} />
            {/* Storage door */}
            <path d="M490,260 A22,22 0 0 0 512,238" fill="none" stroke={WL} strokeWidth={0.7} opacity={0.6} />
            <line x1={490} y1={260} x2={490} y2={249} stroke={WL} strokeWidth={0.5} opacity={0.5} />
            {/* Display hall to color wall internal opening */}
            <path d="M440,80 A30,30 0 0 0 470,110" fill="none" stroke={WL} strokeWidth={0.7} opacity={0.6} />
            <line x1={440} y1={80} x2={451} y2={80} stroke={WL} strokeWidth={0.5} opacity={0.5} />

            {/* Entrance vestibule interior lines */}
            <line x1={330} y1={440} x2={330} y2={480} stroke={W} strokeWidth={0.5} strokeDasharray="0" opacity={0} />
            <text x={380} y={463} textAnchor="middle" dominantBaseline="middle"
              fill="#C6A45C" fontSize={13} letterSpacing={4} opacity={0.65} fontFamily="sans-serif">
              入口
            </text>
            {/* Entrance arrow */}
            <line x1={380} y1={473} x2={380} y2={488} stroke="#C6A45C" strokeWidth={0.8} opacity={0.45} />
            <path d="M375,484 L380,490 L385,484" fill="none" stroke="#C6A45C" strokeWidth={0.8} opacity={0.45} />

            {/* North indicator */}
            <g transform="translate(720,34)">
              <circle cx={0} cy={0} r={12} fill="none" stroke={W} strokeWidth={0.8} />
              <line x1={0} y1={-8} x2={0} y2={8} stroke="#C6A45C" strokeWidth={1} opacity={0.55} />
              <text x={0} y={-14} textAnchor="middle" fill="#C6A45C" fontSize={10} opacity={0.55} fontFamily="sans-serif">N</text>
            </g>

            {/* Corner dots */}
            {([[20,20],[740,20],[20,440],[740,440]] as [number,number][]).map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r={2.5} fill={W} opacity={0.6} />
            ))}

            {/* Room hotspots + labels */}
            {ROOMS.map((room) => {
              const isActive = activeId === room.id;
              return (
                <g
                  key={room.id}
                  className="cursor-pointer"
                  onClick={() => setActiveId(prev => prev === room.id ? null : room.id)}
                >
                  {/* Click area */}
                  <path d={room.fillPath} fill="transparent" />
                  {/* Circle */}
                  <circle
                    cx={room.hotspot.x}
                    cy={room.hotspot.y}
                    r={17}
                    fill={isActive ? room.accentColor : "#0D0D0D"}
                    stroke={room.accentColor}
                    strokeWidth={isActive ? 0 : 0.8}
                    opacity={isActive ? 1 : 0.75}
                    style={{ transition: "all 0.25s" }}
                  />
                  {/* Number */}
                  <text
                    x={room.hotspot.x}
                    y={room.hotspot.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isActive ? "#0D0D0D" : room.accentColor}
                    fontSize={11}
                    fontFamily="Georgia, serif"
                    fontWeight="bold"
                  >
                    {room.num}
                  </text>
                  {/* Label below */}
                  <text
                    x={room.hotspot.x}
                    y={room.hotspot.y + 27}
                    textAnchor="middle"
                    fill={isActive ? room.accentColor : "#706C68"}
                    fontSize={9}
                    letterSpacing={1.5}
                    fontFamily="sans-serif"
                    style={{ transition: "fill 0.25s" }}
                  >
                    {room.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>
      </div>

      {/* Info strip */}
      <div className="px-4 md:px-8 mt-5">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t pt-5"
              style={{ borderColor: active.accentColor + "35" }}
            >
              <div>
                <p className="font-sans text-[9px] tracking-[0.35em] mb-1" style={{ color: active.accentColor }}>
                  {active.num} · {active.subtitle}
                </p>
                <h4 className="font-serif font-bold text-brand-white text-lg tracking-wider mb-1">
                  {active.label}
                </h4>
                <p className="text-brand-muted text-xs font-light max-w-sm leading-relaxed mb-3">
                  {active.desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.18em] px-2 py-1 font-sans"
                      style={{ border: `1px solid ${active.accentColor}40`, color: active.accentColor + "BB" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                className="flex-shrink-0 text-[10px] tracking-[0.3em] px-5 py-2.5 font-sans hover:bg-white/5 transition-colors"
                style={{ border: `1px solid ${active.accentColor}55`, color: active.accentColor }}
              >
                預約參觀 →
              </a>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-brand-faint text-[10px] tracking-[0.25em] font-sans border-t border-brand-raw/20 pt-5"
            >
              點擊平面圖各區域了解詳情 · CLICK TO EXPLORE
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
