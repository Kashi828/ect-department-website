"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

export default function Lightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return createPortal(
    <motion.div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 border border-white/20 text-white" aria-label="Close">×</button>
      <motion.figure initial={{ scale: .96, y: 12 }} animate={{ scale: 1, y: 0 }} transition={{ duration: .3 }} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="max-w-full max-h-[84vh] object-contain" />
        {caption && <figcaption className="text-white/70 font-mono text-[10px] mt-3 tracking-widest uppercase">{caption}</figcaption>}
      </motion.figure>
    </motion.div>,
    document.body
  );
}
