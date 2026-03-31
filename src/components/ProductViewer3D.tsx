"use client";

import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

const products = [
  { name: "立邦 淨味全效乳膠漆", brand: "NIPPON", color: 0xe60012, image: "/images/nippon.png", tags: ["抗甲醛", "零VOC", "防霉", "兒童安全"] },
  { name: "得利 竹炭健康居乳膠漆", brand: "DULUX", color: 0x1b4d8e, image: "/images/dulux.jpg", tags: ["竹炭淨化", "抗菌", "超低VOC", "耐擦洗"] },
  { name: "虹牌 全效乳膠漆", brand: "RAINBOW", color: 0xc41e1e, image: "/images/rainbow.jpg", tags: ["台灣製造", "高遮蓋", "防水", "經濟實惠"] },
  { name: "Benjamin Moore SCUFF-X", brand: "BENJAMIN MOORE", color: 0x2d1854, image: "/images/benjamin.jpg", tags: ["色彩精準", "高耐久", "零VOC", "設計師首選"] },
];

export default function ProductViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: any;
    let isDragging = false;
    let lastX = 0;
    let rotY = 0;

    import("three")
      .then((THREE) => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
        camera.position.set(0, 1.2, 4.5);
        camera.lookAt(0, 0.3, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.innerHTML = "";
        container.appendChild(renderer.domElement);

        // Lights
        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const dir = new THREE.DirectionalLight(0xffffff, 1.0);
        dir.position.set(3, 5, 4);
        scene.add(dir);
        const rim = new THREE.DirectionalLight(0xffffff, 0.3);
        rim.position.set(-3, 2, -2);
        scene.add(rim);

        // Paint can
        const group = new THREE.Group();
        const product = products[selected];

        const bodyGeo = new THREE.CylinderGeometry(0.85, 0.82, 2.0, 64);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: product.color,
          metalness: 0.1,
          roughness: 0.55,
        });

        const loader = new THREE.TextureLoader();
        loader.load(
          product.image,
          (tex: any) => {
            bodyMat.map = tex;
            bodyMat.color.set(0xffffff);
            bodyMat.needsUpdate = true;
          },
          undefined,
          () => {}
        );

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
        const lidMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(product.color).multiplyScalar(0.8),
          metalness: 0.25,
          roughness: 0.35,
        });
        const lid = new THREE.Mesh(lidGeo, lidMat);
        lid.position.y = 2.07;
        group.add(lid);

        // Top rim
        const rimGeo = new THREE.TorusGeometry(0.88, 0.025, 8, 64);
        const rimMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.5, roughness: 0.3 });
        const topRim = new THREE.Mesh(rimGeo, rimMat);
        topRim.rotation.x = Math.PI / 2;
        topRim.position.y = 2.0;
        group.add(topRim);

        // Bottom rim
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
        const el = renderer.domElement;
        const onDown = (e: any) => { isDragging = true; lastX = e.clientX || e.touches?.[0]?.clientX || 0; };
        const onMove = (e: any) => {
          if (!isDragging) return;
          const x = e.clientX || e.touches?.[0]?.clientX || 0;
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

        function animate() {
          animId = requestAnimationFrame(animate);
          if (!isDragging) rotY += 0.005;
          group.rotation.y = rotY;
          renderer.render(scene, camera);
        }
        animate();
        setLoaded(true);

        const onResize = () => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);
      })
      .catch((err) => {
        console.error("Three.js init failed:", err);
        setError(true);
      });

    return () => {
      cancelAnimationFrame(animId);
      if (renderer) {
        renderer.dispose();
        try { container.removeChild(renderer.domElement); } catch {}
      }
    };
  }, [selected]);

  const current = products[selected];
  const tagPositions = ["top-4 left-4", "top-4 right-4", "bottom-14 left-4", "bottom-14 right-4"];
  const tagColors = ["#4CAF50", "#C6A45C", "#5B9BD5", "#B83A2E"];

  return (
    <section
      id="viewer"
      className="py-20 relative"
      style={{
        background: "radial-gradient(ellipse at 30% 50%, #2A2A28 0%, #1E1E1C 50%, #0D0D0D 100%)",
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
        <div
          ref={containerRef}
          className="flex-1 relative border border-brand-gold/10"
          style={{ minHeight: "380px" }}
        >
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-brand-muted text-sm tracking-widest animate-pulse">
                載入 3D 模型中...
              </div>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <img src={current.image} alt={current.name} className="w-32 h-32 object-contain opacity-60" />
              <div className="text-brand-faint text-sm">3D 載入失敗</div>
              <button
                onClick={() => { setError(false); setLoaded(false); }}
                className="text-brand-gold text-xs border border-brand-gold/30 px-3 py-1"
              >
                重新載入
              </button>
            </div>
          )}

          {loaded && current.tags.slice(0, 4).map((tag, i) => (
            <div
              key={`${selected}-${i}`}
              className={`absolute ${tagPositions[i]} px-2.5 py-1 bg-black/60 backdrop-blur-sm text-[10px] font-semibold tracking-wider flex items-center gap-1.5`}
              style={{
                border: `1px solid ${tagColors[i % 4]}55`,
                color: tagColors[i % 4],
                animation: `tagIn 0.4s ease ${0.3 + i * 0.12}s both`,
              }}
            >
              <span className="w-1 h-1" style={{ background: tagColors[i % 4] }} />
              {tag}
            </div>
          ))}

          {loaded && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-brand-faint text-[10px] tracking-widest">
              ↔ 拖曳旋轉
            </div>
          )}
        </div>

        <div className="flex md:flex-col gap-[3px] overflow-x-auto md:overflow-visible hide-scrollbar">
          {products.map((product, i) => (
            <button
              key={i}
              onClick={() => { setSelected(i); setLoaded(false); setError(false); }}
              className={`flex-shrink-0 px-4 py-3 text-left transition-colors duration-200 min-w-[140px] md:min-w-[200px] ${
                selected === i
                  ? "bg-brand-gold/10 border-l-[3px] border-brand-gold"
                  : "bg-brand-steel border-l-[3px] border-transparent hover:bg-brand-raw"
              }`}
            >
              <span
                className="block text-xs tracking-widest font-sans mb-1"
                style={{ color: selected === i ? "#F7F4EF" : "#B5AFA3" }}
              >
                {product.brand}
              </span>
              <span
                className="block font-serif font-bold text-sm"
                style={{ color: selected === i ? "#F7F4EF" : "#C8C1B4" }}
              >
                {product.name}
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
