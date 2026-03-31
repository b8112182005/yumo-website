"use client";

import { BRAND } from "@/lib/constants";

export default function InfoBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[101] h-[22px] bg-brand-ink flex items-center justify-between px-4 md:px-8">
      <span
        className="text-brand-gold font-sans"
        style={{ fontSize: "9px", letterSpacing: "2px" }}
      >
        {BRAND.address}
      </span>
      <span
        className="text-brand-gold font-sans"
        style={{ fontSize: "9px", letterSpacing: "2px" }}
      >
        {BRAND.phone}
      </span>
    </div>
  );
}
