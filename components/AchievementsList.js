"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Lightbox from "./Lightbox";

export default function AchievementsList({ achievements }) {
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="achievement-list">
      {achievements.map((a, i) => (
        <motion.details key={a._id} className="achievement-row" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: i * .03 }}>
          <summary>
            <span className="achievement-row__num">{String(i + 1).padStart(2, "0")}</span>
            <span className="achievement-row__title">{a.title}</span>
            <span className="achievement-row__plus">+</span>
          </summary>
          <div className="achievement-row__detail">
            <p>{a.detail}</p>
            {a.poster && (
              <button
                type="button"
                onClick={() => setOpen(a)}
                aria-label={`Open poster: ${a.title}`}
                className="block mt-4 cursor-zoom-in transition-opacity hover:opacity-80"
              >
                <Image src={a.poster} width={280} height={160} alt={a.title} className="max-h-40 w-auto object-contain border border-line" />
              </button>
            )}
          </div>
        </motion.details>
      ))}
      </div>
      {open && <Lightbox src={open.poster} alt={open.title} caption={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}
