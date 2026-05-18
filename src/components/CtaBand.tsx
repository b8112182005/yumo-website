"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";

export default function CtaBand() {
  return (
    <section className="relative bg-brand-ink overflow-hidden py-20 px-4 md:px-8 border-t border-brand-raw/25">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <span className="font-serif font-black text-brand-white opacity-[0.025] whitespace-nowrap"
          style={{ fontSize: "clamp(60px, 14vw, 180px)", letterSpacing: "0.1em" }}>
          ORDER
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <TextReveal>
          <p className="text-brand-gold font-sans text-[10px] tracking-[0.45em] mb-6">
            START YOUR PROJECT
          </p>
        </TextReveal>
        <TextReveal delay={0.1}>
          <h3 className="font-serif font-black text-brand-white mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.1, letterSpacing: "0.05em" }}>
            大宗採購，歡迎詢價
          </h3>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-brand-muted text-sm font-light tracking-wider mb-10 max-w-md mx-auto"
        >
          工程商、設計師、建設公司專屬報價<br />快速回覆，全台配送
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <MagneticButton
            href="#contact"
            className="bg-brand-gold text-brand-ink px-10 py-4 text-xs font-sans font-medium tracking-widest hover:bg-brand-goldDark transition-colors block"
          >
            立即諮詢
          </MagneticButton>
          <MagneticButton
            href="tel:0930691134"
            className="border border-brand-raw text-brand-muted px-10 py-4 text-xs font-sans font-medium tracking-widest hover:border-brand-gold hover:text-brand-gold transition-colors block"
          >
            0930-691-134
          </MagneticButton>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-24 h-[1px] bg-brand-gold mt-12 opacity-30 origin-center"
        />
      </div>
    </section>
  );
}
