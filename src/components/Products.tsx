"use client";

import { useState, useRef } from "react";
import { PRODUCTS, EXTRA_PRODUCTS, Product } from "@/lib/constants";
import Reveal from "./Reveal";

const allProducts = [...PRODUCTS, ...EXTRA_PRODUCTS];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => setActive(!active)}
      className={`flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer transition-colors duration-300 select-none ${
        active ? "bg-brand-ink text-white" : "bg-brand-white"
      }`}
      style={{ borderLeft: `3px solid ${product.color}` }}
    >
      {/* Brand color block */}
      <div
        className="px-4 py-3"
        style={{ backgroundColor: product.color }}
      >
        <span className="text-white font-sans text-xs tracking-widest font-medium">
          {product.brandEn}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-serif font-bold text-base mb-1">{product.name}</h4>
        <p
          className={`text-xs mb-3 ${
            active ? "text-brand-faint" : "text-brand-muted"
          }`}
        >
          {product.spec}
        </p>

        {/* Tags */}
        {active && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag, ti) => (
              <span
                key={tag}
                className="border border-brand-gold text-brand-gold px-2 py-1 animate-tagIn"
                style={{
                  fontSize: "10px",
                  animationDelay: `${ti * 0.08}s`,
                  animationFillMode: "backwards",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="products" className="py-20 bg-brand-paper">
      <div className="px-4 md:px-8 mb-8">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-brand-gold font-georgia text-3xl font-bold">
              01
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl">
              嚴選塗料
            </h2>
          </div>
          <p className="text-brand-muted text-sm font-light max-w-md">
            精選全球六大品牌，從平價實用到頂級設計師指定，滿足各種空間需求
          </p>
        </Reveal>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex gap-[3px] overflow-x-auto hide-scrollbar px-4 md:px-8 pb-4 snap-x snap-mandatory"
      >
        {allProducts.map((product, i) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
