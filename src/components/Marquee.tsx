"use client";

const BRANDS = [
  "NIPPON",
  "DULUX",
  "RAINBOW",
  "BENJAMIN MOORE",
  "JOTUN",
  "FLUGGER",
  "NIPPON",
  "DULUX",
  "RAINBOW",
  "BENJAMIN MOORE",
  "JOTUN",
  "FLUGGER",
];

export default function Marquee() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="bg-brand-ink overflow-hidden py-3">
      <div className="animate-marquee whitespace-nowrap flex">
        {items.map((brand, i) => (
          <span
            key={i}
            className="text-brand-gold font-sans inline-block mx-8"
            style={{ fontSize: "10px", letterSpacing: "4px" }}
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
