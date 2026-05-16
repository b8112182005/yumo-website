"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2600);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] bg-brand-ink flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Seal */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: -2 }}
            transition={{ duration: 0.65, delay: 0.15, type: "spring", stiffness: 160, damping: 14 }}
            className="w-16 h-16 border-2 border-brand-gold flex items-center justify-center mb-6"
          >
            <span className="text-brand-gold font-serif font-bold text-3xl leading-none">瑀</span>
          </motion.div>

          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif font-black text-brand-white tracking-[0.2em] text-xl mb-1">
              瑀墨塗料
            </p>
            <p className="text-brand-gold tracking-[0.45em] font-sans font-light text-[10px]">
              YUMO PAINT
            </p>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="mt-10 h-[1px] bg-brand-gold origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: 80 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
