"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { formatEventDate } from "@/lib/dates";
import Lightbox from "./Lightbox";

function EventCard({ e, index }) {
  const [open, setOpen] = useState(false);
  const d = e.date ? new Date(e.date) : null;
  const day = d ? d.toLocaleDateString("en-IN", { day: "2-digit" }) : "--";
  const month = d ? d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase() : "---";

  return (
    <motion.article
      className="event-item"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .45, delay: index * .04 }}
      whileHover={{ x: 5 }}
    >
      <div className="event-item__date">
        <strong>{day}</strong>
        <span>{month}</span>
      </div>
      <div className="event-item__body">
        <span>{e.time || formatEventDate(e.date)} {e.venue ? `· ${e.venue}` : ""}</span>
        <h3>{e.title}</h3>
        {e.subtitle && <p>{e.subtitle}</p>}
        {e.resourcePerson && <p>{e.resourcePerson}</p>}
      </div>
      {e.poster ? (
        <button
          type="button"
          className="event-item__poster"
          onClick={() => setOpen(true)}
          aria-label={`Open poster for ${e.title}`}
        >
          <Image
            src={e.poster}
            alt={`Poster for ${e.title}`}
            fill
            sizes="(max-width: 900px) 22vw, 150px"
            className="event-item__poster-image"
          />
          <span className="event-item__poster-badge">POSTER ↗</span>
        </button>
      ) : (
        <div className="event-item__poster event-item__poster--empty" aria-hidden="true">
          <span>ECT<br />EVENT</span>
        </div>
      )}
      {e.poster ? (
        <button className="event-item__arrow" onClick={() => setOpen(true)} aria-label={`Open poster for ${e.title}`}>↗</button>
      ) : <span className="event-item__arrow" aria-hidden="true">→</span>}
      {open && <Lightbox src={e.poster} alt={`Poster for ${e.title}`} caption={e.title} onClose={() => setOpen(false)} />}
    </motion.article>
  );
}

export default function EventsBoard({ upcoming, past }) {
  const [tab, setTab] = useState(upcoming.length ? "upcoming" : "past");
  const list = tab === "upcoming" ? upcoming : past;
  return (
    <div>
      <div className="tabs">
        <button className={tab === "upcoming" ? "is-active" : ""} onClick={() => setTab("upcoming")}>NEXT / {upcoming.length}</button>
        <button className={tab === "past" ? "is-active" : ""} onClick={() => setTab("past")}>ARCHIVE / {past.length}</button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} className="event-board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {list.map((e, index) => <EventCard key={e._id} e={e} index={index} />)}
          {!list.length && <p className="text-muted">No entries in this section yet.</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
