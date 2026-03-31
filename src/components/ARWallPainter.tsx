"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const WALL_COLORS = [
  { name: "經典白", hex: "#F5F5F0" },
  { name: "象牙白", hex: "#FFFFF0" },
  { name: "奶茶色", hex: "#D2B48C" },
  { name: "淺灰藍", hex: "#B0C4DE" },
  { name: "莫蘭迪綠", hex: "#ACB7AE" },
  { name: "莫蘭迪粉", hex: "#D4A5A5" },
  { name: "暖灰", hex: "#C0B9AC" },
  { name: "淺薰衣草", hex: "#C5B9D4" },
  { name: "鵝黃", hex: "#F0E68C" },
  { name: "薄荷綠", hex: "#B5EAD7" },
];

export default function ARWallPainter() {
  const [selectedColor, setSelectedColor] = useState(WALL_COLORS[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const colorRef = useRef(selectedColor);

  // Keep colorRef in sync
  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  const processFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) {
      animRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const hex = colorRef.current.hex;
    const cr = parseInt(hex.slice(1, 3), 16);
    const cg = parseInt(hex.slice(3, 5), 16);
    const cb = parseInt(hex.slice(5, 7), 16);

    for (let i = 0; i < data.length; i += 4) {
      const pr = data[i], pg = data[i + 1], pb = data[i + 2];
      const brightness = (pr + pg + pb) / 3;
      const maxC = Math.max(pr, pg, pb);
      const minC = Math.min(pr, pg, pb);
      const saturation = maxC === 0 ? 0 : (maxC - minC) / maxC;

      if (brightness > 130 && saturation < 0.3) {
        data[i] = pr * 0.6 + cr * 0.4;
        data[i + 1] = pg * 0.6 + cg * 0.4;
        data[i + 2] = pb * 0.6 + cb * 0.4;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    animRef.current = requestAnimationFrame(processFrame);
  }, []);

  async function startCamera() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        animRef.current = requestAnimationFrame(processFrame);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      const name = err instanceof Error ? err.name : "";
      console.error("Camera error:", err);
      if (name === "NotAllowedError") {
        setError("相機權限被拒絕，請在瀏覽器設定中允許");
      } else if (name === "NotFoundError") {
        setError("找不到相機裝置");
      } else if (name === "NotReadableError") {
        setError("相機被其他 App 佔用中");
      } else {
        setError("相機開啟失敗：" + msg);
      }
    }
  }

  function stopCamera() {
    cancelAnimationFrame(animRef.current);
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
    setCameraActive(false);
  }

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section className="bg-brand-cream py-20 px-5 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-brand-gold text-[10px] tracking-[4px] font-bold">
          AR PREVIEW
        </div>
        <h2 className="font-serif text-[28px] md:text-[38px] font-black tracking-[4px] mt-2">
          AR 牆壁色彩預覽
        </h2>
        <p className="text-brand-muted text-[12px] tracking-[2px] mt-2 mb-8">
          選擇顏色 → 開啟相機 → 對準牆壁即時預覽上漆效果
        </p>

        {/* Color picker */}
        <div className="flex gap-3 flex-wrap mb-6">
          {WALL_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setSelectedColor(color)}
              className="flex flex-col items-center gap-1"
            >
              <div
                className="w-10 h-10 border-2 transition-all"
                style={{
                  background: color.hex,
                  borderColor:
                    selectedColor.hex === color.hex ? "#C6A45C" : "transparent",
                  transform:
                    selectedColor.hex === color.hex ? "scale(1.15)" : "scale(1)",
                }}
              />
              <span className="text-[9px] text-brand-muted tracking-wider">
                {color.name}
              </span>
            </button>
          ))}
        </div>

        {/* Camera / AR display */}
        <div className="relative aspect-video bg-brand-ink overflow-hidden">
          {!cameraActive ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-6xl">📸</div>
              <button
                onClick={startCamera}
                className="px-8 py-3 bg-brand-gold text-brand-ink font-bold text-sm tracking-widest"
              >
                開啟相機預覽
              </button>
              <p className="text-brand-faint text-[11px] tracking-wider">
                將相機對準牆壁，即時預覽 {selectedColor.name} 上漆效果
              </p>
              {error && (
                <p className="text-red-400 text-[12px] mt-3 px-4 text-center">{error}</p>
              )}
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="hidden" />
              <canvas ref={canvasRef} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm">
                <span className="text-[11px] text-brand-gold tracking-wider">
                  目前顏色：{selectedColor.name}
                </span>
              </div>
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-[11px] tracking-wider"
              >
                關閉相機
              </button>
            </>
          )}
        </div>

        <p className="text-brand-faint text-[10px] tracking-wider mt-4">
          ※ 此功能需要相機權限，僅供預覽參考，實際顏色以實體色卡為準
        </p>
      </div>
    </section>
  );
}
