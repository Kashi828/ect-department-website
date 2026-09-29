"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Lightbox from "./Lightbox";

export default function Gallery({ images }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="gallery-grid">
        {images.map((g, i) => (
          <motion.button
            key={g.src}
            className="gallery-card"
            onClick={() => setOpen(g)}
            initial={{ opacity: 0, scale: .98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: .1 }}
            transition={{ duration: .5, delay: i * .04 }}
            aria-label={`Open ${g.label}`}
            style={g.aspect ? ({ "--card-aspect": g.aspect }) : undefined}
          >
            <Image src={g.src} alt={g.label} fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover object-top" />
            <span className="gallery-card__caption">{g.label}</span>
          </motion.button>
        ))}
      </div>
      {open && <Lightbox src={open.src} alt={open.label} caption={open.label} onClose={() => setOpen(null)} />}
    </>
  );
}
