"use client";

import { useState, useRef, useEffect } from "react";

const COLORS = [
  { name: "純白", hex: "#FAFAF8", family: "白瓷" },
  { name: "象牙白", hex: "#FFF8E8", family: "白瓷" },
  { name: "奶油", hex: "#F5EDD8", family: "白瓷" },
  { name: "燕麥", hex: "#DDD5C0", family: "白瓷" },
  { name: "奶茶", hex: "#D2B48C", family: "白瓷" },
  { name: "薄霧灰", hex: "#D8D4CC", family: "礦物" },
  { name: "暖灰", hex: "#B0A898", family: "礦物" },
  { name: "石板", hex: "#888480", family: "礦物" },
  { name: "炭灰", hex: "#585855", family: "礦物" },
  { name: "薄荷", hex: "#B5EAD7", family: "綠藍" },
  { name: "鼠尾草", hex: "#90A888", family: "綠藍" },
  { name: "冬青", hex: "#3D6050", family: "綠藍" },
  { name: "冰川藍", hex: "#B0C8D8", family: "綠藍" },
  { name: "礦物藍", hex: "#507090", family: "綠藍" },
  { name: "深海", hex: "#305070", family: "綠藍" },
  { name: "沙漠", hex: "#C8A882", family: "大地" },
  { name: "赭石", hex: "#A05018", family: "大地" },
  { name: "磚紅", hex: "#B04030", family: "大地" },
  { name: "薰衣草", hex: "#B8A0C8", family: "特殊" },
  { name: "茄紫", hex: "#605078", family: "特殊" },
  { name: "墨黑", hex: "#1A1A20", family: "深色" },
];

export default function ARWallPainter() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState("");
  const [intensity, setIntensity] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function startCamera() {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      const video = videoRef.current;
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream;
      video.onloadedmetadata = async () => {
        try {
          await video.play();
          setCameraActive(true);
        } catch (e: unknown) {
          setError("影片播放失敗：" + (e instanceof Error ? e.message : String(e)));
        }
      };
    } catch (err: unknown) {
      const name = err instanceof Error ? (err as any).name : "";
      if (name === "NotAllowedError") setError("請允許相機權限後重試");
      else if (name === "NotFoundError") setError("找不到相機裝置");
      else if (name === "NotReadableError") setError("相機被其他 App 佔用中");
      else setError("相機開啟失敗：" + (err instanceof Error ? err.message : String(err)));
    }
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }

  useEffect(() => () => stopCamera(), []);

  return (
    <section id="ar-preview" className="bg-brand-ink py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-brand-gold font-sans text-[10px] tracking-[0.35em] mb-2 font-light">
            AR PREVIEW
          </p>
          <h2 className="font-serif font-black text-brand-white text-2xl md:text-3xl tracking-wide">
            牆色即時預覽
          </h2>
          <p className="text-brand-muted text-xs mt-2 font-light tracking-wider">
            開啟相機對準牆壁，即時預覽任意色彩上牆效果
          </p>
        </div>

        {/* Viewport */}
        <div
          className="relative w-full overflow-hidden mb-5"
          style={{ aspectRatio: "16/9", isolation: "isolate", background: "#111" }}
        >
          {/* Camera feed — visible, no pixel loop */}
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: cameraActive ? "block" : "none" }}
          />

          {/* GPU color tint via mix-blend-mode multiply */}
          {cameraActive && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: selectedColor.hex,
                mixBlendMode: "multiply",
                opacity: intensity / 100,
              }}
            />
          )}

          {/* Inactive placeholder */}
          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4">
              {/* Room preview sketch */}
              <div className="relative w-44 h-28 border border-white/10 select-none">
                <div className="absolute inset-0" style={{ backgroundColor: "#1A1612" }} />
                <div
                  className="absolute left-[8%] right-[8%] top-[4%] bottom-[28%] transition-colors duration-300"
                  style={{ backgroundColor: selectedColor.hex, opacity: 0.9 }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[28%]" style={{ backgroundColor: "#2A2018" }} />
                <div className="absolute top-[14%] left-[18%] w-[22%] h-[36%] border border-white/15" />
                <div className="absolute top-[14%] right-[18%] w-[14%] h-[60%] border border-white/10" />
              </div>
              <button
                onClick={startCamera}
                className="px-8 py-3 bg-brand-gold text-brand-ink text-xs font-sans font-medium tracking-widest hover:bg-brand-goldDark transition-colors"
              >
                開啟相機預覽
              </button>
              {error && <p className="text-red-400 text-[11px] text-center px-4">{error}</p>}
              <p className="text-brand-faint text-[10px] tracking-wider text-center">
                對準牆壁，即時預覽 {selectedColor.name} 上牆效果
              </p>
            </div>
          )}

          {cameraActive && (
            <>
              <div className="absolute top-3 left-3 bg-black/60 px-3 py-1">
                <span className="text-brand-gold text-[10px] tracking-wider font-sans">
                  {selectedColor.name} · {selectedColor.hex.toUpperCase()}
                </span>
              </div>
              <button
                onClick={stopCamera}
                className="absolute top-3 right-3 bg-black/60 px-3 py-1.5 text-white/70 text-[10px] tracking-wider hover:text-white transition-colors"
              >
                關閉相機
              </button>
            </>
          )}
        </div>

        {/* Intensity slider — shown when camera is active */}
        {cameraActive && (
          <div className="flex items-center gap-4 mb-5">
            <span className="text-brand-muted text-[10px] tracking-wider whitespace-nowrap font-sans">
              顯色強度
            </span>
            <input
              type="range"
              min={15}
              max={80}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="flex-1 h-[2px]"
              style={{ accentColor: "#C6A45C" }}
            />
            <span className="text-brand-gold text-[10px] font-sans w-8">{intensity}%</span>
          </div>
        )}

        {/* Color swatches — horizontal scroll on mobile */}
        <div className="overflow-x-auto hide-scrollbar -mx-1 px-1">
          <div className="flex gap-2 pb-1 min-w-max">
            {COLORS.map((color) => {
              const isActive = selectedColor.hex === color.hex;
              return (
                <button
                  key={color.hex}
                  onClick={() => setSelectedColor(color)}
                  className="flex flex-col items-center gap-1 flex-shrink-0"
                  title={color.name}
                >
                  <div
                    className="w-9 h-9 md:w-10 md:h-10 transition-all duration-200"
                    style={{
                      backgroundColor: color.hex,
                      outline: isActive ? "2px solid #C6A45C" : "2px solid transparent",
                      outlineOffset: "2px",
                      transform: isActive ? "scale(1.12)" : "scale(1)",
                    }}
                  />
                  <span className="text-[8px] md:text-[9px] text-brand-muted tracking-wide whitespace-nowrap font-sans">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-brand-faint text-[10px] tracking-wider mt-4 font-sans">
          ※ 此功能需要相機權限，實際顏色以實體色卡為準
        </p>
      </div>
    </section>
  );
}
