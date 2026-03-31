"use client";

import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-white py-12 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
        {/* Left */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-gold flex items-center justify-center">
              <span className="text-brand-ink font-serif font-bold text-xl leading-none">
                瑀
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-base">{BRAND.name}</div>
              <div
                className="text-brand-muted tracking-widest"
                style={{ fontSize: "9px" }}
              >
                {BRAND.nameEn}
              </div>
            </div>
          </div>
          <p className="text-brand-muted text-xs mb-1">{BRAND.address}</p>
          <p className="text-brand-muted text-xs mb-1">{BRAND.phone}</p>
          <p className="text-brand-muted text-xs mb-3">
            統一編號：{BRAND.taxId}
          </p>
          <p className="font-georgia italic text-brand-faint text-sm">
            {BRAND.slogan}
          </p>
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="text-brand-muted text-xs">{BRAND.copyright}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-brand-steel" />
    </footer>
  );
}
