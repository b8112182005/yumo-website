"use client";

import { BRAND } from "@/lib/constants";
import Reveal from "./Reveal";

const cards = [
  {
    label: "展間地址",
    info: BRAND.address,
    cta: "Google Maps",
    href: "https://maps.google.com",
    dark: false,
  },
  {
    label: "服務電話",
    info: BRAND.phone,
    cta: "撥打電話",
    href: `tel:${BRAND.phone.replace(/-/g, "")}`,
    dark: true,
  },
  {
    label: "LINE 官方",
    info: BRAND.line,
    cta: "加入好友",
    href: BRAND.lineUrl,
    dark: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-8">
          <span className="text-brand-gold font-georgia text-3xl font-bold">
            05
          </span>
          <h2 className="font-serif font-bold text-2xl md:text-3xl">
            聯絡我們
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[3px]">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-8 transition-colors duration-300 ${
                card.dark
                  ? "bg-brand-ink text-brand-white hover:bg-brand-bone hover:text-brand-ink"
                  : "bg-brand-bone text-brand-ink hover:bg-brand-ink hover:text-brand-white"
              }`}
            >
              <span
                className={`block text-xs tracking-widest font-sans mb-4 ${
                  card.dark
                    ? "text-brand-gold group-hover:text-brand-goldDark"
                    : "text-brand-muted group-hover:text-brand-gold"
                } transition-colors`}
              >
                {card.label}
              </span>
              <p className="font-serif font-bold text-lg mb-6">{card.info}</p>
              <span
                className={`text-sm font-sans ${
                  card.dark
                    ? "text-brand-gold group-hover:text-brand-goldDark"
                    : "text-brand-gold"
                } transition-colors`}
              >
                {card.cta} &#8594;
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
