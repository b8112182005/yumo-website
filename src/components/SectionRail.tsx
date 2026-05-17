"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "products",   num: "01", label: "嚴選塗料" },
  { id: "showroom",   num: "02", label: "展間導覽" },
  { id: "colors",     num: "03", label: "色彩系統" },
  { id: "selection",  num: "04", label: "選品服務" },
  { id: "portfolio",  num: "05", label: "合作案例" },
  { id: "contact",    num: "06", label: "聯絡我們" },
];

export default function SectionRail() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.25, rootMargin: "-15% 0px -55% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col gap-5">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex items-center gap-2.5 group"
            aria-label={s.label}
          >
            {/* Line indicator */}
            <div
              className="h-[1px] transition-all duration-500 ease-out"
              style={{
                width: isActive ? 28 : 10,
                background: isActive ? "#C6A45C" : "#3D3B37",
              }}
            />
            {/* Label */}
            <span
              className="font-sans transition-all duration-300 whitespace-nowrap"
              style={{
                fontSize: "9px",
                letterSpacing: "0.22em",
                color: isActive ? "#C6A45C" : "#8A847A",
                opacity: isActive ? 1 : 0,
              }}
            >
              {s.num} · {s.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
