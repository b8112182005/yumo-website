"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const smoothProgress = useSpring(progress, { stiffness: 120, damping: 30, mass: 0.5 });

  useEffect(() => {
    const update = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9995] h-[2px] bg-brand-gold origin-left pointer-events-none"
      style={{ scaleX: smoothProgress, width: "100%" }}
    />
  );
}
