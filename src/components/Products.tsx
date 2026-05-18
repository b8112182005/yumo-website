"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { PRODUCTS, EXTRA_PRODUCTS, Product } from "@/lib/constants";
import TextReveal from "./TextReveal";

const allProducts = [...PRODUCTS, ...EXTRA_PRODUCTS];

function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onClick={() => setActive(!active)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer select-none transition-colors duration-300 ${
        active ? "bg-brand-ink text-white" : "bg-brand-white"
      }`}
      style={{ borderLeft: `3px solid ${product.color}` }}
    >
      <div className="px-4 py-3" style={{ backgroundColor: product.color }}>
        <span className="text-white font-sans text-xs tracking-widest font-medium">
          {product.brandEn}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-serif font-bold text-base leading-tight">{product.name}</h4>
          <span
            className="flex-shrink-0 w-4 h-4 mt-0.5 border"
            style={{ backgroundColor: product.color, borderColor: product.color + "88" }}
          />
        </div>
        <p className={`text-xs mb-3 ${active ? "text-brand-faint" : "text-brand-muted"}`}>
          {product.spec}
        </p>
        {active && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, ti) => (
              <span
                key={tag}
                className="border border-brand-gold text-brand-gold px-2 py-1 animate-tagIn"
                style={{ fontSize: "10px", animationDelay: `${ti * 0.08}s`, animationFillMode: "backwards" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {!active && (
          <div className="flex items-center gap-1 text-brand-muted" style={{ fontSize: "10px", letterSpacing: "0.15em" }}>
            <span>點擊查看規格</span>
            <span className="text-brand-gold">→</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Products() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => setDragWidth(el.scrollWidth - el.offsetWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="products" className="py-20 bg-brand-paper overflow-hidden">
      <div className="px-4 md:px-8 mb-8">
        <TextReveal delay={0}>
          <p className="text-brand-gold tracking-[0.35em] text-[10px] font-sans font-light mb-2">
            SELECTED BRANDS
          </p>
        </TextReveal>
        <TextReveal delay={0.08}>
          <div className="flex items-baseline gap-4 mb-2">
            <h2 className="font-serif font-black text-2xl md:text-3xl tracking-wide text-brand-ink">
              嚴選塗料
            </h2>
          </div>
        </TextReveal>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-brand-muted text-sm font-light max-w-md"
        >
          精選全球六大品牌，從平價實用到頂級設計師指定，滿足各種空間需求
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-brand-muted/60 text-[10px] font-sans tracking-[0.2em] mt-4 hidden md:block"
        >
          ← 拖曳探索 DRAG TO EXPLORE →
        </motion.p>
      </div>

      {/* Framer Motion drag carousel */}
      <div className="overflow-hidden px-4 md:px-8 pb-4 cursor-grab active:cursor-grabbing">
        <motion.div
          ref={carouselRef}
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          dragElastic={0.08}
          className="flex gap-[3px] w-max"
        >
          {allProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
