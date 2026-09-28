"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useState } from "react";

const LINKS = [
  ["/", "Home"],
  ["/about", "About"],
  ["/syllabus", "Syllabus"],
  ["/faculty", "Faculty"],
  ["/events", "Activity"],
  ["/toppers", "Toppers"],
  ["/achievements", "Wins"],
  ["/alumni", "Alumni"],
  ["/contact", "Visit"],
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="wrap nav-bar__inner">
        <div className="nav-index">ECT / 001</div>
        <button
          className="nav-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span>{open ? "CLOSE" : "MENU"}</span>
          <i className={open ? "nav-menu-toggle__icon is-open" : "nav-menu-toggle__icon"} />
        </button>
        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {LINKS.map(([href, label], index) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`nav-link ${active ? "is-active" : ""}`}>
                <span className="nav-link__num">{String(index + 1).padStart(2, "0")}</span>
                <span>{label}</span>
                {active && <motion.span layoutId="nav-dot" className="nav-link__dot" />}
              </Link>
            );
          })}
        </div>
        <div className="nav-status"><span /> LAB ONLINE</div>
      </div>
    </nav>
  );
}
