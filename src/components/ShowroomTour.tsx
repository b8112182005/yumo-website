"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const ROOMS = [
  {
    id: "entry",
    num: "01",
    label: "展示廳",
    title: "嚴選品牌",
    subtitle: "BRAND SHOWROOM",
    desc: "親臨感受六大國際品牌的色彩世界，專業顧問一對一為您解說塗料特性與適用場景。",
    wallColor: "#120f08",
    accentColor: "#C6A45C",
    glowColor: "rgba(198,164,92,0.10)",
    tags: [
      { text: "六大品牌實品展示", x: 15, y: 32 },
      { text: "免費色卡索取", x: 63, y: 26 },
      { text: "專業顧問諮詢", x: 68, y: 63 },
    ],
    swatches: ["#E60012", "#003DA5", "#B8860B", "#1B3A5C", "#5B2C6F", "#00A651"],
  },
  {
    id: "colors",
    num: "02",
    label: "色彩牆",
    title: "千色萬彩",
    subtitle: "COLOR LIBRARY",
    desc: "超過 2,000 種色號，從 Pantone 對色到品牌專屬調色，找到專屬您空間的完美色彩。",
    wallColor: "#060c14",
    accentColor: "#7EB5D4",
    glowColor: "rgba(126,181,212,0.10)",
    tags: [
      { text: "2,000+ 色號", x: 13, y: 30 },
      { text: "Pantone 精準對色", x: 60, y: 24 },
      { text: "電腦自動調色", x: 64, y: 65 },
    ],
    swatches: ["#F5F5F0", "#E8D5C4", "#B0C4DE", "#ACB7AE", "#D4A5A5", "#C0B9AC"],
  },
  {
    id: "consult",
    num: "03",
    label: "諮詢室",
    title: "專業建議",
    subtitle: "CONSULTATION ZONE",
    desc: "設計師與業主的最佳夥伴，配色規劃、工程評估、大宗採購報價，一次搞定。",
    wallColor: "#070c08",
    accentColor: "#8DC48A",
    glowColor: "rgba(141,196,138,0.10)",
    tags: [
      { text: "配色規劃服務", x: 14, y: 33 },
      { text: "批量採購報價", x: 62, y: 27 },
      { text: "設計師合作方案", x: 61, y: 65 },
    ],
    swatches: ["#D4E8C4", "#A8C4A0", "#7B9E87", "#5A7A64", "#3D5C45", "#C6A45C"],
  },
];

export default function ShowroomTour() {
  const [roomIdx, setRoomIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // Mouse motion values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Three parallax layers — slow / mid / fast
  const slowX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const slowY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const midX  = useSpring(rawX, { stiffness: 40, damping: 18 });
  const midY  = useSpring(rawY, { stiffness: 40, damping: 18 });
  const fastX = useSpring(rawX, { stiffness: 25, damping: 15 });
  const fastY = useSpring(rawY, { stiffness: 25, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 30);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 20);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const goTo = (idx: number) => {
    setDirection(idx > roomIdx ? 1 : -1);
    setRoomIdx(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 48) {
      goTo((roomIdx + (delta > 0 ? 1 : -1) + ROOMS.length) % ROOMS.length);
    }
  };

  const room = ROOMS[roomIdx];

  return (
    <section id="showroom" className="py-20 bg-brand-ink overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
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
        </motion.div>
      </div>

      {/* Room viewer */}
      <div
        ref={containerRef}
        className="relative mx-4 md:mx-8 overflow-hidden"
        style={{ height: "clamp(340px, 52vh, 560px)" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={room.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 80 }),
              center: { opacity: 1, x: 0 },
              exit:  (d: number) => ({ opacity: 0, x: d * -80 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            style={{ background: room.wallColor }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 35%, ${room.glowColor} 0%, transparent 65%)` }}
            />

            {/* Layer 1 — background / slowest parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: slowX, y: slowY }}
            >
              {/* Perspective floor */}
              <svg
                className="absolute bottom-0 left-0 w-full"
                style={{ height: "42%" }}
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <line
                    key={`r${i}`}
                    x1={i * 100} y1="200"
                    x2="500" y2="0"
                    stroke={room.accentColor}
                    strokeOpacity="0.10"
                    strokeWidth="0.6"
                  />
                ))}
                {[30, 80, 130, 180].map((y, i) => (
                  <line
                    key={`h${i}`}
                    x1={500 - 500 * (200 - y) / 200}
                    y1={y}
                    x2={500 + 500 * (200 - y) / 200}
                    y2={y}
                    stroke={room.accentColor}
                    strokeOpacity="0.07"
                    strokeWidth="0.5"
                  />
                ))}
              </svg>
              {/* Wall frame lines */}
              <div className="absolute top-[28%] left-[8%] right-[8%] h-[1px] opacity-15"
                style={{ background: room.accentColor }} />
              <div className="absolute top-[28%] bottom-[25%] left-[8%] w-[1px] opacity-10"
                style={{ background: room.accentColor }} />
              <div className="absolute top-[28%] bottom-[25%] right-[8%] w-[1px] opacity-10"
                style={{ background: room.accentColor }} />
            </motion.div>

            {/* Layer 2 — mid / colour swatches + title */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ x: midX, y: midY }}
            >
              <div className="flex gap-[3px] mb-7 opacity-55">
                {room.swatches.map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-5 md:w-7 h-16 md:h-24"
                    style={{ backgroundColor: color }}
                    initial={{ scaleY: 0, originY: 1 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.06 + 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
              <p className="font-sans tracking-[0.4em] font-light mb-2 opacity-80"
                style={{ fontSize: "9px", color: room.accentColor }}>
                {room.subtitle}
              </p>
              <h3 className="font-serif font-black text-brand-white text-3xl md:text-5xl tracking-wider opacity-85">
                {room.title}
              </h3>
            </motion.div>

            {/* Layer 3 — foreground tags / fastest parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ x: fastX, y: fastY }}
            >
              <AnimatePresence>
                {room.tags.map((tag, i) => (
                  <motion.div
                    key={`${room.id}-tag-${i}`}
                    className="absolute pointer-events-none"
                    style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.12 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5">
                      <div className="w-1 h-1 flex-shrink-0" style={{ background: room.accentColor }} />
                      <span className="text-white/80 font-sans text-[10px] tracking-[0.18em] whitespace-nowrap">
                        {tag.text}
                      </span>
                    </div>
                    <div className="w-[1px] h-5 mx-auto opacity-20" style={{ background: room.accentColor }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Room number watermark */}
            <div className="absolute top-3 left-4 md:top-5 md:left-6 pointer-events-none select-none">
              <span className="font-serif font-black opacity-[0.06]"
                style={{ fontSize: "clamp(56px,10vw,110px)", color: room.accentColor, lineHeight: 1 }}>
                {room.num}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {[{ dir: -1, label: "←", side: "left-3" }, { dir: 1, label: "→", side: "right-3" }].map(({ dir, label, side }) => (
          <button
            key={dir}
            onClick={() => goTo((roomIdx + dir + ROOMS.length) % ROOMS.length)}
            className={`absolute ${side} top-1/2 -translate-y-1/2 z-10 w-9 h-9 border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:border-brand-gold hover:text-brand-gold transition-all text-sm`}
          >
            {label}
          </button>
        ))}

        {/* Dot nav */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {ROOMS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => goTo(i)}
              className="transition-all duration-300 h-[2px]"
              style={{
                width: i === roomIdx ? 22 : 6,
                background: i === roomIdx ? room.accentColor : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Info strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={room.id + "-info"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 md:px-8 mt-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-sans text-[9px] tracking-[0.3em]" style={{ color: room.accentColor }}>
                {room.num}
              </span>
              <h4 className="font-serif font-bold text-brand-white text-lg tracking-wider">{room.label}</h4>
            </div>
            <p className="text-brand-muted text-xs font-light max-w-sm leading-relaxed">{room.desc}</p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 border text-[10px] tracking-[0.3em] px-5 py-2.5 font-sans transition-colors hover:bg-white/5"
            style={{ borderColor: room.accentColor + "55", color: room.accentColor }}
          >
            預約參觀 →
          </a>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
