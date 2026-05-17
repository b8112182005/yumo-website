"use client";

import { useState } from "react";

const BRANDS = [
  "NIPPON", "DULUX", "RAINBOW", "BENJAMIN MOORE", "JOTUN", "FLÜGGER",
  "NIPPON", "DULUX", "RAINBOW", "BENJAMIN MOORE", "JOTUN", "FLÜGGER",
];

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div
      className="bg-brand-ink overflow-hidden py-3 cursor-default"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="animate-marquee whitespace-nowrap flex"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((brand, i) => (
          <span
            key={i}
            className="text-brand-gold font-sans inline-block mx-8 transition-opacity duration-300"
            style={{ fontSize: "10px", letterSpacing: "4px", opacity: paused ? 1 : 0.85 }}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
