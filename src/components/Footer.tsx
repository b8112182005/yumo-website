"use client";

import Image from "next/image";
import { BRAND, NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-white py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between gap-12 mb-10">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/yumo_um_icon_white.svg"
              alt="瑀墨"
              width={32}
              height={32}
              className="opacity-80"
            />
            <div>
              <div className="font-serif font-bold text-base text-brand-white tracking-wider">
                {BRAND.name}
              </div>
              <div className="text-brand-gold tracking-widest" style={{ fontSize: "8px" }}>
                {BRAND.nameEn}
              </div>
            </div>
          </div>
          <p className="font-serif italic text-brand-faint text-xs mb-4 leading-relaxed">
            {BRAND.slogan}
          </p>
          <p className="text-brand-muted text-[10px] leading-loose">
            {BRAND.address}<br />
            {BRAND.phone}<br />
            統編：{BRAND.taxId}<br />
            {BRAND.hours}
          </p>
        </div>

        {/* Nav links */}
        <div>
          <p className="text-brand-gold tracking-[0.3em] text-[9px] font-sans mb-4">NAVIGATION</p>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-brand-muted text-xs hover:text-brand-gold transition-colors font-sans tracking-wider flex items-center gap-2"
                >
                  <span className="text-brand-raw text-[9px]">{item.num}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-brand-gold tracking-[0.3em] text-[9px] font-sans mb-4">CONTACT</p>
          <div className="space-y-3">
            <a
              href={`tel:${BRAND.phone.replace(/-/g, "")}`}
              className="block text-brand-muted text-xs hover:text-brand-gold transition-colors font-sans tracking-wider"
            >
              {BRAND.phone}
            </a>
            <a
              href={BRAND.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-brand-muted text-xs hover:text-brand-gold transition-colors font-sans tracking-wider"
            >
              LINE {BRAND.line}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-raw/40 pt-6 flex flex-col md:flex-row justify-between items-start gap-2">
        <p className="text-brand-raw text-[9px] tracking-widest font-sans">
          {BRAND.copyright}
        </p>
        <p className="text-brand-raw text-[9px] tracking-widest font-sans">
          台灣製造 · MADE IN TAIWAN
        </p>
      </div>
    </footer>
  );
}
