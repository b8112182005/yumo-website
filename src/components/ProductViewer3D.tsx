"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { PRODUCTS } from "@/lib/constants";
import Reveal from "./Reveal";

const viewerProducts = PRODUCTS.filter((p) => p.model);

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-brand-muted text-sm font-sans">載入 3D 模型中...</div>
    </div>
  );
}

export default function ProductViewer3D() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = viewerProducts[activeIdx];

  // Preload models on client only
  useEffect(() => {
    viewerProducts.forEach((p) => {
      if (p.model) useGLTF.preload(p.model);
    });
  }, []);

  if (!active) return null;

  const tagPositions = ["top-4 left-4", "top-4 right-4", "bottom-14 left-4", "bottom-14 right-4"];
  const tagColors = ["#4CAF50", "#C6A45C", "#5B9BD5", "#B83A2E"];

  return (
    <section
      id="viewer"
      className="py-20 relative"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, #2A2A28 0%, #1E1E1C 50%, #0D0D0D 100%)",
      }}
    >
      <div className="px-4 md:px-8 mb-8">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-brand-gold font-serif text-3xl font-bold italic">02</span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-white">
              360° 產品展示
            </h2>
          </div>
          <p className="text-brand-faint text-sm font-light max-w-md">
            拖曳旋轉 ・ 點擊切換產品
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 max-w-6xl mx-auto">
        {/* 3D Canvas + HTML overlay tags */}
        <div className="flex-1 relative border border-brand-gold/10" style={{ minHeight: "380px" }}>
          <Suspense fallback={<LoadingFallback />}>
            <Canvas camera={{ position: [0, 1.5, 4.5], fov: 35 }} shadows>
              <Stage environment="city" intensity={0.5} adjustCamera={false}>
                <Model url={active.model!} />
              </Stage>
              <OrbitControls
                autoRotate
                autoRotateSpeed={2}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.8}
              />
            </Canvas>
          </Suspense>

          {/* 4D floating tags (HTML overlay, outside Canvas) */}
          {active.tags.slice(0, 4).map((tag, i) => (
            <div
              key={`${activeIdx}-${i}`}
              className={`absolute ${tagPositions[i]} px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider flex items-center gap-1.5`}
              style={{
                border: `1px solid ${tagColors[i % 4]}55`,
                color: tagColors[i % 4],
                animation: `tagIn 0.4s ease ${0.3 + i * 0.12}s both`,
              }}
            >
              <span
                className="w-1 h-1"
                style={{ background: tagColors[i % 4] }}
              />
              {tag}
            </div>
          ))}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-brand-faint text-[10px] tracking-widest">
            ↔ 拖曳旋轉
          </div>
        </div>

        {/* Product selector */}
        <div className="flex md:flex-col gap-[3px] overflow-x-auto md:overflow-visible hide-scrollbar">
          {viewerProducts.map((product, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 px-4 py-3 text-left transition-colors duration-200 min-w-[140px] md:min-w-[200px] ${
                activeIdx === i
                  ? "bg-brand-gold/10 border-l-[3px] border-brand-gold"
                  : "bg-brand-steel border-l-[3px] border-transparent hover:bg-brand-raw"
              }`}
            >
              <div
                className="w-8 h-8 mb-2"
                style={{ background: product.color }}
              />
              <span className="block text-xs tracking-widest font-sans mb-1"
                style={{ color: activeIdx === i ? "#F7F4EF" : "#B5AFA3" }}>
                {product.brandEn}
              </span>
              <span className="block font-serif font-bold text-sm"
                style={{ color: activeIdx === i ? "#F7F4EF" : "#C8C1B4" }}>
                {product.brand} {product.name}
              </span>
              <span className="block text-brand-faint text-[10px] tracking-wider mt-1">
                {product.tags.join(" ・ ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
