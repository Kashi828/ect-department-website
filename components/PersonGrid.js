"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

function initials(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function FacultyCard({ person, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className="faculty-card"
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={reduce ? undefined : { duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -8 }}
    >
      <div className="faculty-card__image">
        {person.photoUrl ? (
          <Image src={person.photoUrl} alt={person.name} fill sizes="(max-width: 900px) 100vw, 25vw" className="object-cover object-top" />
        ) : (
          <div className="faculty-card__placeholder">{initials(person.name)}</div>
        )}
        <span className="faculty-card__index">0{index + 1}</span>
        <span className="faculty-card__scan">PORTRAIT / FACULTY</span>
      </div>
      <div className="faculty-card__body">
        <div>
          <span className="faculty-card__role">{person.role}</span>
          <h3>{person.name}</h3>
        </div>
        <span className="faculty-card__arrow">↗</span>
      </div>
    </motion.article>
  );
}

function TopperCard({ person, index }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`topper-card ${person.photoUrl ? "has-photo" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 25 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? undefined : { duration: 0.55, delay: index * 0.06 }}
    >
      <div className="topper-card__number">{String(index + 1).padStart(2, "0")}</div>
      {person.photoUrl && (
        <div className="topper-card__photo">
          <Image src={person.photoUrl} alt={person.name} fill sizes="64px" className="object-cover object-top" />
        </div>
      )}
      <div className="topper-card__main">
        <h3>{person.name}</h3>
        <span>{person.yearLabel}</span>
      </div>
      <div className="topper-card__score"><small>SGPA</small>{person.sgpa}</div>
    </motion.article>
  );
}

export default function PersonGrid({ people, kind }) {
  if (kind === "faculty") {
    return <div className="faculty-grid">{people.map((p, i) => <FacultyCard key={p._id} person={p} index={i} />)}</div>;
  }
  return <div className="topper-list">{people.map((p, i) => <TopperCard key={p._id} person={p} index={i} />)}</div>;
}
