"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DEFAULT_QUOTE = {
  slide2Title: "From transistor to full-stack.",
  slide2Subtitle:
    "A hybrid discipline where circuits, computation, intelligence and interfaces belong in the same room.",
  highlight1: "Embedded systems",
  highlight2: "AI / Machine Learning",
  highlight3: "IoT / Robotics",
  highlight4: "Software engineering",
  signalCommand: "who-we-are",
  signalTitleLine1: "electronics",
  signalTitleLine2: "meets computation",
  signalMeta: "MG UNIVERSITY · NSS COLLEGE RAJAKUMARI · KERALA",
};

// Render "From X to Y." with the connecting "to" in accent colour, like the
// original design; plain text without " to " renders untouched.
function renderTitle(text) {
  const parts = String(text || "").split(/ to /);
  if (parts.length < 2) return text;
  return (
    <>
      {parts.slice(0, -1).join(" to ")} <em>to</em> {parts[parts.length - 1]}
    </>
  );
}

export default function HeroCarousel({ line1, line2, subtitle, facts, quote }) {
  const q = { ...DEFAULT_QUOTE, ...(quote || {}) };
  const highlights = [
    ["01", q.highlight1],
    ["02", q.highlight2],
    ["03", q.highlight3],
    ["04", q.highlight4],
  ].filter(([, label]) => label);

  const [slide, setSlide] = useState(0);
  const reduce = useReducedMotion();
  const total = 2;

  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % total), 6200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--one" aria-hidden="true" />
      <div className="hero__orb hero__orb--two" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__left">
          <div className="hero__eyebrow"><span>ECT / DEPARTMENT</span><i /> <span>01—02</span></div>
          {/* Both slides share one grid cell, so the column height never
              changes and the DEPT_SIGNAL.log terminal stays in place. */}
          <div className="hero__slides">
            <AnimatePresence initial={false}>
              {slide === 0 ? (
                <motion.div key="intro" style={{ gridArea: "1 / 1" }} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.55 }}>
                  <h1 className="hero__title">{line1}<br /><em>{line2}</em></h1>
                  <p className="hero__lede">{subtitle}</p>
                  <div className="hero__actions">
                    <Link href="/faculty" className="button button--light">Meet the faculty <span>↗</span></Link>
                    <Link href="/events" className="button button--ghost">See the activity <span>↗</span></Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="teach" style={{ gridArea: "1 / 1" }} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.55 }}>
                  <h2 className="hero__title hero__title--small">{renderTitle(q.slide2Title)}</h2>
                  <p className="hero__lede">{q.slide2Subtitle}</p>
                  <div className="hero__skill-grid">
                    {highlights.map(([n, label]) => <div className="hero__skill" key={label}><span>{n}</span><strong>{label}</strong></div>)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__terminal">
            <div className="hero__terminal-top"><span>DEPT_SIGNAL.log</span><span>RUNNING</span></div>
            <div className="hero__terminal-line"><span>$</span> {q.signalCommand}</div>
            <div className="hero__terminal-title">{q.signalTitleLine1}<br />meets <em>{q.signalTitleLine2.replace(/^meets\s+/i, "")}</em></div>
            <div className="hero__terminal-meta">{q.signalMeta}</div>
          </div>
          <div className="hero__facts">
            {(facts || []).map((f) => (
              <div key={f.label} className="hero__fact">
                <span>{f.label}</span>
                <strong>{f.heading}</strong>
                {f.detail && <small>{f.detail}</small>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap hero__footer">
        <div className="hero__controls">
          <button onClick={() => setSlide((slide + total - 1) % total)} aria-label="Previous slide">←</button>
          <div>{[0, 1].map((i) => <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} className={slide === i ? "is-current" : ""} />)}</div>
          <button onClick={() => setSlide((slide + 1) % total)} aria-label="Next slide">→</button>
        </div>
        <div className="hero__footer-copy">DESIGNING / BUILDING / TESTING / RELEASING</div>
      </div>
    </section>
  );
}
