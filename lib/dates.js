// Event dates are plain calendar days ("YYYY-MM-DD") for a department in
// Kerala. Everything below pins them to UTC midnight so the result is the
// same no matter which timezone the server (or visitor) is in — parsing with
// new Date("2026-09-30") alone then formatting locally can show the previous
// day for visitors west of Greenwich.

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// "2026-09-30" → that calendar date at UTC midnight. Returns null for
// empty/invalid values.
function parseYMD(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(s || ""));
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return isNaN(d.getTime()) ? null : d;
}

function fmt(d, withYear) {
  if (!d) return "";
  const base = `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}`;
  return withYear ? `${base} ${d.getUTCFullYear()}` : base;
}

// Midnight (IST) of today in India, as a UTC-midnight calendar date. Events
// flip to "past" at the end of the Indian day, not at the server's midnight —
// on a UTC host (Vercel) a plain midnight comparison kept "today's" events
// upcoming until 5:30 AM IST the next morning.
function istTodayStart() {
  const ist = new Date(Date.now() + 330 * 60000); // IST = UTC+5:30
  return new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate()));
}

// Buckets events into upcoming/past. An event with an end date stays upcoming
// until the END of its last day, so two-day events don't vanish mid-way.
export function splitEventsByDate(events) {
  const today = istTodayStart();
  const upcoming = [];
  const past = [];
  for (const e of events) {
    const start = parseYMD(e.date);
    const end = parseYMD(e.endDate);
    const last = !end || (start && end < start) ? start : end || start;
    if (last && last >= today) upcoming.push(e);
    else past.push(e);
  }
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first
  past.sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent first
  return { upcoming, past };
}

export function formatEventDate(d) {
  return fmt(parseYMD(d), true);
}

// Day/month parts for the events-board badge, computed on the UTC calendar
// so the badge never shows the previous day on servers west of IST.
export function eventBadgeParts(d) {
  const date = parseYMD(d);
  return date
    ? { day: String(date.getUTCDate()).padStart(2, "0"), month: MONTHS[date.getUTCMonth()] }
    : { day: "--", month: "---" };
}

// "30 SEPT – 01 OCT 2026" for multi-day events; a plain formatted date when
// there is no (valid) end date.
export function formatEventRange(date, endDate) {
  const s = parseYMD(date);
  const e = parseYMD(endDate);
  if (!s) return "";
  if (!e || e <= s) return fmt(s, true);
  const sameMonth = s.getUTCMonth() === e.getUTCMonth() && s.getUTCFullYear() === e.getUTCFullYear();
  return `${fmt(s, !sameMonth)} – ${fmt(e, true)}`;
}
