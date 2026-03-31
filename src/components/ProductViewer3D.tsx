"use client";

import { useState, useEffect, useRef } from "react";

const VIEWER_PRODUCTS = [
  { name: "立邦 淨味全效", brand: "NIPPON", color: 0xd42b1e, tags: ["抗甲醛", "零VOC", "防霉", "兒童安全"] },
  { name: "得利 竹炭健康居", brand: "DULUX", color: 0x1b4d8e, tags: ["竹炭淨化", "抗菌", "超低VOC", "耐擦洗"] },
  { name: "虹牌 全效乳膠漆", brand: "RAINBOW", color: 0x2e8b57, tags: ["台灣製造", "高遮蓋", "防水", "經濟實惠"] },
  { name: "Benjamin Moore", brand: "BENJAMIN MOORE", color: 0x2d1854, tags: ["色彩精準", "高耐久", "零VOC", "設計師首選"] },
];

const TAG_POSITIONS = ["top-4 left-4", "top-4 right-4", "bottom-14 left-4", "bottom-14 right-4"];
const TAG_COLORS = ["#4CAF50", "#C6A45C", "#5B9BD5", "#B83A2E"];

export default function ProductViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState("載入中...");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    // Cleanup previous
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    container.innerHTML = "";
    setLoaded(false);
    setStatus("載入中...");

    const initScene = async () => {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        const w = container.clientWidth;
        const h = Math.max(380, container.clientHeight);
        const product = VIEWER_PRODUCTS[selected];

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
        camera.position.set(0, 1.2, 4.5);
        camera.lookAt(0, 0.3, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
        dirLight.position.set(3, 5, 4);
        scene.add(dirLight);
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
        rimLight.position.set(-3, 2, -2);
        scene.add(rimLight);

        // Paint can group
        const group = new THREE.Group();

        // Body
        const bodyGeo = new THREE.CylinderGeometry(0.85, 0.82, 2.0, 64);
        const bodyMat = new THREE.MeshStandardMaterial({ color: product.color, metalness: 0.1, roughness: 0.55 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 1.0;
        group.add(body);

        // Label band
        const labelGeo = new THREE.CylinderGeometry(0.87, 0.84, 0.8, 64);
        const labelMat = new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.8 });
        const label = new THREE.Mesh(labelGeo, labelMat);
        label.position.y = 0.8;
        group.add(label);

        // Lid
        const lidGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.14, 64);
        const lidColor = new THREE.Color(product.color).multiplyScalar(0.8);
        const lidMat = new THREE.MeshStandardMaterial({ color: lidColor, metalness: 0.25, roughness: 0.35 });
        const lid = new THREE.Mesh(lidGeo, lidMat);
        lid.position.y = 2.07;
        group.add(lid);

        // Metal rims
        const rimGeo = new THREE.TorusGeometry(0.88, 0.025, 8, 64);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.3 });
        const topRim = new THREE.Mesh(rimGeo, rimMat);
        topRim.rotation.x = Math.PI / 2;
        topRim.position.y = 2.0;
        group.add(topRim);
        const bottomRim = new THREE.Mesh(rimGeo.clone(), rimMat);
        bottomRim.rotation.x = Math.PI / 2;
        bottomRim.position.y = 0.01;
        group.add(bottomRim);

        // Handle
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.4, 2.15, 0),
          new THREE.Vector3(-0.25, 2.65, 0),
          new THREE.Vector3(0.25, 2.65, 0),
          new THREE.Vector3(0.4, 2.15, 0),
        ]);
        const handleGeo = new THREE.TubeGeometry(curve, 24, 0.03, 8, false);
        const handle = new THREE.Mesh(handleGeo, rimMat);
        group.add(handle);

        scene.add(group);

        // Drag rotation
        let isDragging = false;
        let lastX = 0;
        let rotY = 0;
        const el = renderer.domElement;
        const onDown = (e: MouseEvent | TouchEvent) => {
          isDragging = true;
          lastX = "touches" in e ? e.touches[0].clientX : e.clientX;
        };
        const onMove = (e: MouseEvent | TouchEvent) => {
          if (!isDragging) return;
          const x = "touches" in e ? e.touches[0].clientX : e.clientX;
          rotY += (x - lastX) * 0.01;
          lastX = x;
        };
        const onUp = () => { isDragging = false; };
        el.addEventListener("mousedown", onDown);
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseup", onUp);
        el.addEventListener("touchstart", onDown, { passive: true });
        el.addEventListener("touchmove", onMove, { passive: true });
        el.addEventListener("touchend", onUp);

        // Animate
        const animate = () => {
          if (cancelled) return;
          requestAnimationFrame(animate);
          if (!isDragging) rotY += 0.005;
          group.rotation.y = rotY;
          renderer.render(scene, camera);
        };
        animate();

        // Resize
        const onResize = () => {
          const nw = container.clientWidth;
          const nh = Math.max(380, container.clientHeight);
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };
        window.addEventListener("resize", onResize);

        setStatus("");
        setLoaded(true);
      } catch (err) {
        if (!cancelled) {
          setStatus("3D 初始化失敗：" + (err instanceof Error ? err.message : String(err)));
        }
      }
    };

    initScene();
    return () => {
      cancelled = true;
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, [selected]);

  const current = VIEWER_PRODUCTS[selected];

  return (
    <section id="viewer" className="py-20 relative" style={{ background: "radial-gradient(ellipse at 30% 50%, #2A2A28 0%, #1E1E1C 50%, #0D0D0D 100%)" }}>
      <div className="px-4 md:px-8 mb-8 max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="text-brand-gold font-serif text-3xl font-bold italic">02</span>
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-[#E8E3DA]">360° 產品展示</h2>
        </div>
        <p className="text-[#B5AFA3] text-sm font-light">拖曳旋轉 ・ 點擊切換產品</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 max-w-6xl mx-auto">
        {/* 3D Viewer */}
        <div className="flex-1 relative border border-[#C6A45C]/10" style={{ minHeight: 380 }}>
          {status && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-[#C6A45C] text-sm tracking-widest animate-pulse">{status}</div>
            </div>
          )}
          <div ref={containerRef} className="w-full" style={{ minHeight: 380 }} />

          {/* 4D floating tags */}
          {loaded && current.tags.slice(0, 4).map((tag, i) => (
            <div
              key={`${selected}-${i}`}
              className={`absolute ${TAG_POSITIONS[i]} px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider flex items-center gap-1.5 z-20`}
              style={{
                border: `1px solid ${TAG_COLORS[i]}55`,
                color: TAG_COLORS[i],
                animation: `tagIn 0.4s ease ${0.3 + i * 0.12}s both`,
              }}
            >
              <span className="w-1 h-1" style={{ background: TAG_COLORS[i] }} />
              {tag}
            </div>
          ))}

          {loaded && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[#B5AFA3] text-[10px] tracking-widest z-20">
              ↔ 拖曳旋轉
            </div>
          )}
        </div>

        {/* Product selector */}
        <div className="flex md:flex-col gap-[3px] overflow-x-auto md:overflow-visible hide-scrollbar">
          {VIEWER_PRODUCTS.map((product, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-shrink-0 px-4 py-3 text-left transition-colors duration-200 min-w-[160px] md:min-w-[220px] ${
                selected === i
                  ? "border-l-[3px] border-[#C6A45C]"
                  : "border-l-[3px] border-transparent hover:bg-[#3D3B37]"
              }`}
              style={{ background: selected === i ? "rgba(198,164,92,0.1)" : "#2A2A28" }}
            >
              <div className="w-8 h-8 mb-2" style={{ background: `#${product.color.toString(16).padStart(6, "0")}` }} />
              <span className="block text-xs tracking-widest font-sans mb-1" style={{ color: selected === i ? "#F7F4EF" : "#B5AFA3" }}>
                {product.brand}
              </span>
              <span className="block font-serif font-bold text-sm" style={{ color: selected === i ? "#F7F4EF" : "#C8C1B4" }}>
                {product.name}
              </span>
              <span className="block text-[#B5AFA3] text-[10px] tracking-wider mt-1">
                {product.tags.join(" ・ ")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
