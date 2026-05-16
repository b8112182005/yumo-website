"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const ringX = useSpring(mx, { damping: 22, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(my, { damping: 22, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovered(!!t.closest("a, button, [data-cursor-hover]"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [mx, my]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="bg-brand-gold transition-transform duration-150"
          style={{
            width: hovered ? 6 : 4,
            height: hovered ? 6 : 4,
          }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] border border-brand-gold transition-all duration-200"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          opacity: hovered ? 0.6 : 0.35,
        }}
      />
    </>
  );
}
