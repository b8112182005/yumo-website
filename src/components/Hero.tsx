"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

function GoldDots() {
  const [dots, setDots] = useState<{ x: number; y: number; size: number; opacity: number }[]>([]);
  useEffect(() => {
    setDots(
      Array.from({ length: 22 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.2 + 0.04,
      }))
    );
  }, []);
  return (
    <>
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute bg-brand-gold"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: d.opacity }}
        />
      ))}
    </>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-ink">
      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Diagonal gold accent line */}
      <div
        className="absolute top-0 right-0 w-[1px] h-full bg-brand-gold opacity-10"
        style={{ right: "18%" }}
      />
      <div
        className="absolute top-0 right-0 w-[1px] h-full bg-brand-gold opacity-5"
        style={{ right: "9%" }}
      />

      <GoldDots />

      {/* Ghost watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-serif font-black text-brand-white"
          style={{
            fontSize: "clamp(160px, 24vw, 320px)",
            opacity: 0.03,
            lineHeight: 1,
            letterSpacing: "0.05em",
          }}
        >
          YUMO
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.15em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.0, delay: 0.1, ease }}
          className="text-brand-gold font-sans font-light text-[10px] tracking-[0.45em] mb-6 uppercase"
        >
          Premium Coating Distribution
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="font-serif font-black text-brand-white mb-2"
          style={{ fontSize: "clamp(52px, 10vw, 96px)", lineHeight: 1.05, letterSpacing: "0.1em" }}
        >
          瑀墨塗料
        </motion.h1>

        {/* English */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-brand-muted tracking-[0.4em] font-sans font-light text-xs mb-6"
        >
          YUMO PAINT CO., LTD.
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
          className="mx-auto w-20 h-[1px] bg-brand-gold mb-6 origin-center"
        />

        {/* Seal stamp */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: -2 }}
          transition={{ duration: 0.55, delay: 1.0, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-6 w-12 h-12 border border-brand-gold flex items-center justify-center opacity-80"
        >
          <span className="text-brand-gold font-serif font-bold text-lg leading-none">墨</span>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.15 }}
          className="font-serif italic text-brand-faint text-sm mb-4"
        >
          {BRAND.slogan}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-brand-muted text-sm leading-relaxed mb-10 max-w-md mx-auto font-light"
        >
          {BRAND.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5, ease }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="bg-brand-gold text-brand-ink px-7 py-3 text-xs font-sans font-medium tracking-widest hover:bg-brand-goldDark transition-colors"
          >
            探索塗料
          </a>
          <a
            href="#contact"
            className="border border-brand-white/30 text-brand-white px-7 py-3 text-xs font-sans font-medium tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            聯絡我們
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-brand-muted tracking-[0.35em] font-sans" style={{ fontSize: "9px" }}>
          SCROLL
        </span>
        <div className="w-[1px] h-8 bg-brand-gold animate-bounce-line opacity-60" />
      </motion.div>
    </section>
  );
}
