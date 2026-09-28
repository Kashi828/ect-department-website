"use client";

import { motion, useReducedMotion } from "motion/react";

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={reduce ? undefined : { duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
