"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

function GoldDots() {
  const [dots, setDots] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 18 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setDots(arr);
  }, []);
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute bg-brand-gold"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
        />
      ))}
    </>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-cream">
      {/* Marble texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(200,193,180,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(200,193,180,0.3) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(200,193,180,0.2) 0%, transparent 50%)",
        }}
      />

      <GoldDots />

      {/* Ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-serif font-black text-brand-ink"
          style={{
            fontSize: "clamp(140px, 20vw, 260px)",
            opacity: 0.025,
            lineHeight: 1,
          }}
        >
          瑀墨
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-serif font-black text-5xl md:text-7xl tracking-wider mb-4"
        >
          瑀墨
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mx-auto w-16 h-[2px] bg-brand-gold mb-4 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-brand-gold tracking-[0.3em] text-sm mb-3 font-sans font-light"
        >
          YUMO
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="font-georgia italic text-brand-muted text-sm mb-6"
        >
          {BRAND.slogan}
        </motion.p>

        {/* Seal stamp */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200, damping: 12 }}
          className="mx-auto mb-6 w-14 h-14 border-2 border-brand-seal flex items-center justify-center"
        >
          <span className="text-brand-seal font-serif font-bold text-xl">墨</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
          className="font-serif font-bold text-xl md:text-2xl mb-3"
        >
          嚴選全球<span className="text-brand-gold">頂級</span>塗料
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-brand-muted text-sm leading-relaxed mb-8 max-w-md mx-auto font-light"
        >
          {BRAND.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="bg-brand-ink text-brand-white px-6 py-3 text-sm font-sans font-medium hover:bg-brand-char transition-colors"
          >
            探索塗料
          </a>
          <a
            href="#contact"
            className="border border-brand-ink text-brand-ink px-6 py-3 text-sm font-sans font-medium hover:bg-brand-ink hover:text-brand-white transition-colors"
          >
            聯絡我們
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-brand-muted tracking-[0.3em] font-sans"
          style={{ fontSize: "9px" }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-8 bg-brand-gold animate-bounce-line" />
      </motion.div>
    </section>
  );
}
