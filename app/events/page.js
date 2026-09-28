import SectionTitle from "@/components/SectionTitle";
import EventsBoard from "@/components/EventsBoard";
import Reveal from "@/components/Reveal";
import { getEvents } from "@/lib/site-data";
import { splitEventsByDate } from "@/lib/dates";

export const metadata = { title: "Activity · ECT" };

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();
  const { upcoming, past } = splitEventsByDate(events);
  return (
    <section className="page-section">
      <div className="wrap page-intro">
        <SectionTitle kicker="01 / Activity log" number={String(events.length).padStart(2, "0")}>Things we <em>put in motion.</em></SectionTitle>
        <Reveal><div className="page-intro__copy">Workshops, seminars, exhibitions, farewell events and technical sessions. The activity log keeps the department calendar visible and gives each event a permanent place in the story.</div></Reveal>
      </div>
      <div className="wrap event-layout">
        <div className="events-rail"><div className="events-rail__title">ACTIVITY / LIVE COUNT</div><div className="events-rail__big">{events.length}</div><div className="events-rail__meta">Total events in the current archive.<br />{upcoming.length} upcoming · {past.length} held.</div></div>
        <EventsBoard upcoming={upcoming} past={past} />
      </div>
    </section>
  );
}
