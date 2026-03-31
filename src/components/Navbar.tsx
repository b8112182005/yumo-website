"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        className={`fixed top-[22px] left-0 right-0 z-[100] h-14 flex items-center justify-between px-4 md:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-brand-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-ink flex items-center justify-center">
            <span className="text-brand-gold font-serif font-bold text-lg leading-none">
              瑀
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="font-serif font-bold text-sm leading-tight">
              {BRAND.name}
            </div>
            <div
              className="text-brand-muted tracking-widest"
              style={{ fontSize: "9px" }}
            >
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
              className="group flex items-center gap-2 text-sm font-sans hover:text-brand-gold transition-colors"
            >
              <span
                className="text-brand-gold font-georgia"
                style={{ fontSize: "10px" }}
              >
                {item.num}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 bg-brand-ink flex items-center justify-center text-brand-gold text-lg"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "目"}
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
                  <span className="text-brand-gold font-georgia text-sm">
                    {item.num}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-brand-muted font-georgia italic text-sm"
            >
              {BRAND.slogan}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
