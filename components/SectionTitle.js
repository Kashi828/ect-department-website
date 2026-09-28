"use client";

import { motion } from "motion/react";

export default function SectionTitle({ kicker, children, number }) {
  return (
    <div className="section-heading">
      <div className="section-heading__kicker">
        <span className="section-heading__line" />
        <span>{kicker || "DEPARTMENT /"}</span>
        {number && <span className="section-heading__number">{number}</span>}
      </div>
      <motion.h2
        className="section-heading__title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
    </div>
  );
}
