"use client";

import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="bg-brand-gold py-10 px-4 md:px-8">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-ink mb-1">
              讓我們為您的空間上色
            </h3>
            <p className="text-brand-ink/70 text-sm font-light">
              免費到府丈量估價，專業配色建議
            </p>
          </div>
          <a
            href="#contact"
            className="bg-brand-ink text-brand-white px-8 py-3 text-sm font-sans font-medium hover:bg-brand-char transition-colors"
          >
            立即諮詢
          </a>
        </div>
      </Reveal>
    </section>
  );
}
