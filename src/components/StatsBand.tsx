"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 6,    suffix: "",  label: "大國際品牌", sub: "Global Brands" },
  { value: 109,  suffix: "",  label: "精選色號",   sub: "Curated Colors" },
  { value: 1000, suffix: "+", label: "供應工程",   sub: "Projects Served" },
  { value: 15,   suffix: "",  label: "年代理經驗", sub: "Years Expertise" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * value));
      if (frame === totalFrames) {
        setCount(value);
        clearInterval(timer);
      }
    }, frameRate);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-serif font-black text-brand-white tabular-nums"
      style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsBand() {
  return (
    <div className="bg-brand-char border-t border-b border-brand-raw/25 py-12 md:py-16 overflow-hidden">
      {/* Decorative background number */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block">
        <span className="font-serif font-black opacity-[0.03] text-brand-white"
          style={{ fontSize: "180px", lineHeight: 1 }}>
          YUMO
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center py-8 px-4 relative"
            >
              {/* Divider between items */}
              {i > 0 && (
                <div className="absolute left-0 top-8 bottom-8 w-[1px] bg-brand-raw/30 hidden md:block" />
              )}
              <CountUp value={s.value} suffix={s.suffix} />
              <div className="w-5 h-[1px] bg-brand-gold my-3 opacity-60" />
              <p className="text-brand-faint font-sans text-[10px] tracking-[0.3em] uppercase mb-0.5">
                {s.label}
              </p>
              <p className="text-brand-raw font-sans text-[9px] tracking-[0.2em] uppercase">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
