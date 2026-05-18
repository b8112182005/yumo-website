"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function Statement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale     = useTransform(scrollYProgress, [0, 0.5], [0.88, 1.02]);
  const opacity   = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-brand-ink overflow-hidden"
      style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Fine grain horizontal rules */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-brand-raw/30" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-raw/30" />

      {/* Background large character — parallax scroll */}
      <motion.div
        style={{ y: translateY, scale }}
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
      >
        <span
          className="font-serif font-black text-brand-white"
          style={{ fontSize: "clamp(120px, 22vw, 280px)", opacity: 0.025, lineHeight: 1, letterSpacing: "0.08em" }}
        >
          漆
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Gold top divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-16 h-[1px] bg-brand-gold mb-10 origin-left"
        />

        {/* Main statement */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black text-brand-white"
            style={{ fontSize: "clamp(36px, 7vw, 80px)", lineHeight: 1.1, letterSpacing: "0.08em" }}
          >
            {BRAND.sloganZh}
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-brand-muted tracking-[0.1em]"
            style={{ fontSize: "clamp(13px, 1.8vw, 18px)" }}
          >
            {BRAND.slogan}
          </motion.p>
        </div>

        {/* Sub text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-6 text-brand-muted font-sans"
          style={{ fontSize: "10px", letterSpacing: "0.3em" }}
        >
          <span>嚴選代理</span>
          <span className="text-brand-gold opacity-40">·</span>
          <span>品質承諾</span>
          <span className="text-brand-gold opacity-40">·</span>
          <span>全台配送</span>
        </motion.div>

        {/* Gold bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-16 h-[1px] bg-brand-gold mt-10 origin-right"
        />
      </motion.div>
    </div>
  );
}
