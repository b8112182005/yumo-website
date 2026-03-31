"use client";

import { motion } from "framer-motion";
import { PORTFOLIO } from "@/lib/constants";
import Reveal from "./Reveal";

const bgColors = ["#3D3B37", "#2A2A28"];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      {/* Header */}
      <div className="bg-brand-bone px-4 md:px-8 py-10 mb-0">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-brand-gold font-georgia text-3xl font-bold">
              04
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl">
              施工實績
            </h2>
          </div>
          <p className="text-brand-muted text-sm font-light max-w-md">
            每一面牆，都是我們用心交付的作品
          </p>
        </Reveal>
      </div>

      {/* Portfolio list */}
      <div>
        {PORTFOLIO.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <motion.a
              href="#"
              whileHover={{ paddingLeft: "3rem" }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between px-4 md:px-8 py-6 md:py-8 transition-all"
              style={{ backgroundColor: bgColors[i % 2] }}
            >
              <div className="flex items-center gap-4">
                <span className="text-brand-gold text-xs font-sans tracking-widest border border-brand-gold px-2 py-1">
                  {item.category}
                </span>
                <h3 className="text-brand-white font-serif font-bold text-base md:text-lg">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-brand-faint text-sm font-sans hidden sm:inline">
                  {item.year}
                </span>
                <span className="text-brand-gold text-lg">&#8594;</span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
