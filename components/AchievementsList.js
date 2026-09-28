"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function AchievementsList({ achievements }) {
  return (
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
            {a.poster && <Image src={a.poster} width={280} height={160} alt={a.title} className="mt-4 max-h-40 w-auto object-contain border border-line" />}
          </div>
        </motion.details>
      ))}
    </div>
  );
}
