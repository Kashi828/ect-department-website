// Buckets events into upcoming/past by comparing each event's date to right now —
// so nobody has to remember to flip a "status" flag as time passes.
export function splitEventsByDate(events) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];
  for (const e of events) {
    const d = e.date ? new Date(e.date) : null;
    if (d && d >= startOfToday) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first
  past.sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first
  return { upcoming, past };
}

export function formatEventDate(d) {
  if (!d) return "";
  return new Date(d)
    .toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();
}
