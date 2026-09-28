"use client";

import { motion } from "motion/react";

export default function AlumniTable({ alumni }) {
  return (
    <div className="alumni-table-wrap">
      <table className="alumni-table">
        <thead>
          <tr><th>ALUMNI</th><th>BATCH</th><th>NOW</th></tr>
        </thead>
        <tbody>
          {alumni.map((a, i) => (
            <motion.tr key={a._id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: i * .04 }}>
              <td>{a.name}</td><td>{a.batch}</td><td>{a.position}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
