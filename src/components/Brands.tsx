"use client";

import { BRAND_PARTNERS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function Brands() {
  const doubled = [...BRAND_PARTNERS, ...BRAND_PARTNERS];

  return (
    <section className="py-20 bg-brand-ink overflow-hidden">
      <div className="px-4 md:px-8 mb-10">
        <Reveal>
          <p className="text-brand-gold tracking-[0.35em] text-[10px] font-sans font-light mb-2">
            AUTHORIZED DISTRIBUTION
          </p>
          <h2 className="font-serif font-black text-brand-white text-2xl md:text-3xl tracking-wide">
            代理品牌
          </h2>
        </Reveal>
      </div>

      {/* Marquee row */}
      <div className="flex overflow-hidden select-none">
        <div className="flex gap-0 animate-marquee flex-shrink-0 min-w-full">
          {doubled.map((b, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-start justify-center border-l border-brand-raw px-10 py-8 min-w-[220px]"
            >
              <span className="text-brand-white font-serif font-black text-lg md:text-xl tracking-wider leading-tight">
                {b.name}
              </span>
              <span className="text-brand-muted text-[10px] tracking-[0.25em] mt-1 font-sans">
                {b.zh} · {b.country}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Second row reversed */}
      <div className="flex overflow-hidden select-none mt-[2px]">
        <div className="flex gap-0 animate-marquee-reverse flex-shrink-0 min-w-full">
          {[...doubled].reverse().map((b, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-start justify-center border-l border-brand-raw px-10 py-6 min-w-[220px]"
            >
              <span className="text-brand-raw font-serif font-black text-base tracking-wider leading-tight">
                {b.name}
              </span>
              <span className="text-brand-steel text-[10px] tracking-[0.25em] mt-1 font-sans">
                {b.country}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
