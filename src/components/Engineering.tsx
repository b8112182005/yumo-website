"use client";

import { SELECTION, BRAND } from "@/lib/constants";
import Reveal from "./Reveal";

const gridItems = SELECTION.services.map((s, i) => ({ ...s, dark: i % 2 === 0 }));

export default function Selection() {
  return (
    <section id="selection" className="py-20 bg-brand-paper">
      <div className="px-4 md:px-8">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-brand-gold font-sans text-3xl font-bold">03</span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl">{SELECTION.title}</h2>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          {/* Left */}
          <div className="md:w-1/3">
            <Reveal>
              <p className="text-brand-muted text-sm font-light leading-relaxed mb-8">
                {SELECTION.description}
              </p>

              <ul className="space-y-4 mb-8">
                {SELECTION.services.map((s) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="text-brand-gold mt-1 text-xs">◆</span>
                    <div>
                      <span className="font-serif font-bold text-sm">{s.label}</span>
                      <p className="text-brand-muted text-xs mt-0.5">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="inline-block bg-brand-ink text-brand-white px-6 py-3 text-xs font-sans font-medium hover:bg-brand-char transition-colors tracking-widest mb-3"
              >
                立即詢價
              </a>
              <p className="text-brand-gold text-sm font-sans">{BRAND.phone}</p>
            </Reveal>
          </div>

          {/* Right 2x2 grid */}
          <div className="md:w-2/3">
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-[2px]">
                {gridItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={`p-6 md:p-8 transition-colors duration-300 group cursor-default ${
                      item.dark
                        ? "bg-brand-ink text-brand-white hover:bg-brand-gold hover:text-brand-ink"
                        : "bg-brand-bone text-brand-ink hover:bg-brand-gold"
                    }`}
                  >
                    <span className="text-brand-gold font-sans text-xs mb-3 block group-hover:text-brand-ink transition-colors">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif font-bold text-lg md:text-xl mb-2">{item.label}</h3>
                    <p className={`text-xs font-light transition-colors ${
                      item.dark
                        ? "text-brand-faint group-hover:text-brand-ink"
                        : "text-brand-muted group-hover:text-brand-ink"
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
