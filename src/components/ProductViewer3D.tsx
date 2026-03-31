"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, useGLTF, Html } from "@react-three/drei";
import { PRODUCTS } from "@/lib/constants";
import Reveal from "./Reveal";

const viewerProducts = PRODUCTS.filter((p) => p.model);

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Preload all models
viewerProducts.forEach((p) => {
  if (p.model) useGLTF.preload(p.model);
});

function FloatingTags({ tags }: { tags: string[] }) {
  const positions: [number, number, number][] = [
    [-2, 1.5, 0],
    [2, 1.5, 0],
    [-2, -1, 0],
    [2, -1, 0],
  ];

  return (
    <>
      {tags.slice(0, 4).map((tag, i) => (
        <Html key={tag} position={positions[i]} center>
          <span
            className="border border-brand-gold text-brand-gold px-2 py-1 bg-brand-ink/80 whitespace-nowrap animate-tagIn"
            style={{
              fontSize: "10px",
              animationDelay: `${i * 0.12}s`,
              animationFillMode: "backwards",
            }}
          >
            {tag}
          </span>
        </Html>
      ))}
    </>
  );
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
            <span className="text-brand-gold font-georgia text-3xl font-bold">
              02
            </span>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-brand-white">
              3D 產品展示
            </h2>
          </div>
          <p className="text-brand-faint text-sm font-light max-w-md">
            360 度旋轉檢視，感受塗料質感
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8">
        {/* 3D Canvas */}
        <div className="flex-1 relative" style={{ minHeight: "400px" }}>
          <Suspense fallback={<LoadingFallback />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <Stage environment="city" intensity={0.6}>
                <Model url={active.model!} />
                <FloatingTags tags={active.tags} />
              </Stage>
              <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
                enablePan={false}
              />
            </Canvas>
          </Suspense>
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-brand-muted text-xs font-sans">
            拖曳旋轉模型
          </p>
        </div>

        {/* Product selector */}
        <div className="flex md:flex-col gap-[3px] overflow-x-auto md:overflow-visible hide-scrollbar">
          {viewerProducts.map((product, i) => (
            <button
              key={product.id}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 px-4 py-3 text-left transition-colors duration-200 min-w-[140px] md:min-w-[200px] ${
                activeIdx === i
                  ? "bg-brand-gold text-brand-ink"
                  : "bg-brand-steel text-brand-faint hover:bg-brand-raw"
              }`}
            >
              <span className="block text-xs tracking-widest font-sans mb-1">
                {product.brandEn}
              </span>
              <span className="block font-serif font-bold text-sm">
                {product.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
