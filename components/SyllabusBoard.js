"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const TYPE_COLORS = {
  "DSC · ECT": "#6f8800",
  "DSC · IAM": "#3d6b8f",
  "DSC · MAT": "#8a5a00",
  "Electronics Minor": "#0e7490",
  "Minor (MOS)": "#7c3aed",
  "MDC": "#5b4a8a",
  "DSE": "#0f766e",
  "SEC": "#b45309",
};

function CourseRow({ course, index }) {
  const reduce = useReducedMotion();
  const color = TYPE_COLORS[course.type];
  return (
    <motion.li
      className="syllabus-course"
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={reduce ? undefined : { duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="syllabus-course__num">{String(index + 1).padStart(2, "0")}</span>
      <div className="syllabus-course__main">
        <h3>{course.name}</h3>
        {course.code && <span className="syllabus-course__code">{course.code}</span>}
      </div>
      <span
        className="syllabus-course__type"
        style={color ? { borderColor: color, color } : undefined}
      >
        {course.type}
      </span>
      {course.credits != null && (
        <span className="syllabus-course__credits" title="Credits">
          {course.credits}
          <small>CR</small>
        </span>
      )}
    </motion.li>
  );
}

export default function SyllabusBoard({ semesters }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = semesters[active];

  if (!current) return null;

  return (
    <div className="syllabus-board">
      <div className="syllabus-board__tabs" role="tablist" aria-label="Semesters">
        {semesters.map((s, i) => (
          <button
            key={s.semester}
            role="tab"
            aria-selected={i === active}
            className={`syllabus-tab ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <b>S{i < 9 ? `0${i + 1}` : i + 1}{s.session ? ` · ${s.session}` : ""}</b>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={current.semester}
        className="syllabus-panel"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={reduce ? undefined : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="syllabus-panel__side">
          <span className="syllabus-panel__kicker">
            SEMESTER / {String(current.semester).padStart(2, "0")}{current.session ? ` — ${current.session.toUpperCase()}` : ""}
          </span>
          <h3>{current.title}</h3>
          <p>{current.blurb}</p>
          <div className="syllabus-panel__meta">
            <div><strong>{current.courses.length}</strong><small>COURSES</small></div>
          </div>
          {current.note && <div className="syllabus-panel__note">{current.note}</div>}
        </div>
        <ul className="syllabus-panel__list">
          {current.courses.map((course, i) => (
            <CourseRow key={course.code || course.name} course={course} index={i} />
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
