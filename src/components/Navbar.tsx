"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BRAND, NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-[22px] left-0 right-0 z-[100] h-14 flex items-center justify-between px-4 md:px-8 transition-all duration-500 ${
          scrolled
            ? "bg-brand-ink/85 backdrop-blur-md border-b border-brand-raw/30"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/yumo_um_icon_white.svg"
              alt="瑀墨 icon"
              width={28}
              height={28}
              className="opacity-90"
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-serif font-bold text-sm text-brand-white leading-tight tracking-wider">
              {BRAND.name}
            </div>
            <div className="text-brand-gold tracking-widest" style={{ fontSize: "8px" }}>
              {BRAND.nameEn}
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-2 text-xs font-sans text-brand-faint hover:text-brand-gold transition-colors tracking-wider"
            >
              <span className="text-brand-gold/50 font-sans group-hover:text-brand-gold transition-colors" style={{ fontSize: "9px" }}>
                {item.num}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block border border-brand-gold/50 text-brand-gold text-[10px] tracking-[0.3em] px-4 py-2 hover:bg-brand-gold hover:text-brand-ink transition-colors font-sans"
        >
          詢價
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold text-base"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-brand-ink flex flex-col items-center justify-center"
            style={{ top: "22px" }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-4 text-brand-white text-2xl font-serif font-bold hover:text-brand-gold transition-colors"
                >
                  <span className="text-brand-gold font-sans text-xs tracking-widest">{item.num}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-brand-muted font-serif italic text-xs"
            >
              {BRAND.slogan}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
