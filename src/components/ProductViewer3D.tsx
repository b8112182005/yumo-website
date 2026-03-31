"use client";

import { useState, useEffect, useRef } from "react";

export default function ProductViewer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("載入中...");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const THREE = await import("three");
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;

        const w = container.clientWidth;
        const h = 400;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
        camera.position.set(0, 1.2, 4.5);
        camera.lookAt(0, 0.3, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        container.innerHTML = "";
        container.appendChild(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xffffff, 0.7));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(3, 5, 4);
        scene.add(light);

        const geo = new THREE.CylinderGeometry(0.85, 0.82, 2, 48);
        const mat = new THREE.MeshStandardMaterial({ color: 0xd42b1e });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.y = 1;
        scene.add(mesh);

        let rot = 0;
        const animate = () => {
          if (cancelled) return;
          requestAnimationFrame(animate);
          rot += 0.005;
          mesh.rotation.y = rot;
          renderer.render(scene, camera);
        };
        animate();
        setStatus("");
      } catch (err) {
        if (!cancelled) {
          setStatus(
            "3D 初始化失敗：" +
              (err instanceof Error ? err.message : String(err))
          );
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      style={{ background: "#0D0D0D", padding: "80px 20px", color: "#E8E3DA" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Noto Serif TC, serif",
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 4,
            marginBottom: 24,
          }}
        >
          360° 產品展示
        </h2>
        {status && (
          <div style={{ color: "#C6A45C", marginBottom: 16 }}>{status}</div>
        )}
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: 400,
            border: "1px solid rgba(198,164,92,0.12)",
          }}
        />
      </div>
    </section>
  );
}
