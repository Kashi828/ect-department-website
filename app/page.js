import HeroCarousel from "@/components/HeroCarousel";
import SectionTitle from "@/components/SectionTitle";
import PersonGrid from "@/components/PersonGrid";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getSettings, getFaculty, getEvents, getSyllabus } from "@/lib/site-data";
import { splitEventsByDate } from "@/lib/dates";

// Render at request time like the other content pages: admin edits show up
// instantly and builds never depend on the content store at compile time.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();
  const rawFaculty = await getFaculty();
  const rawEvents = await getEvents();
  const syllabus = await getSyllabus();
  const faculty = rawFaculty.slice(0, 4);
  const { upcoming } = splitEventsByDate(rawEvents);
  const nextEvent = upcoming[0] || rawEvents[0];

  return (
    <div>
      <HeroCarousel line1={settings.heroLine1} line2={settings.heroLine2} subtitle={settings.heroSubtitle} facts={settings.heroFacts} />

      <div className="signal-row">
        <div className="signal-track" aria-hidden="true">
          {Array.from({ length: 2 }).flatMap((_, j) => [
            <span key={`${j}-1`}><b>01</b> SIGNAL / CIRCUITS</span>,
            <span key={`${j}-2`}><b>02</b> CODE / COMPUTATION</span>,
            <span key={`${j}-3`}><b>03</b> INTELLIGENCE / AI</span>,
            <span key={`${j}-4`}><b>04</b> CONNECTED / IOT</span>,
          ])}
        </div>
      </div>

      <section className="page-section">
        <div className="wrap statement">
          <Reveal>
            <SectionTitle kicker="01 / The department" number="01">
              A lab for <em>curious minds.</em>
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="statement__text">
              <p>Electronics with Computer Technology lives in the overlap: the physical world of sensors and circuits, and the digital world of code, networks and intelligence.</p>
              <p>Our students learn by moving between both — designing hardware, writing software, testing ideas and turning prototypes into working systems.</p>
              <Link className="panel-link" href="/about">01 ↗ READ THE DEPARTMENT STORY</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="wrap">
          <Reveal><SectionTitle kicker="02 / Snapshot" number="02">The signal behind <em>the syllabus.</em></SectionTitle></Reveal>
          <div className="home-panels" style={{ marginTop: 48 }}>
            <Reveal className="home-panel home-panel--large">
              <div><div className="home-panel__code">LAB / 01</div><h3>Hardware is where ideas become tangible.</h3><p>Digital electronics, embedded systems, microcontrollers, sensors and automation become a playground for making.</p></div>
              <Link href="/faculty" className="panel-link">MEET THE PEOPLE ↗</Link><span className="home-panel__corner" />
            </Reveal>
            <Reveal delay={0.06} className="home-panel home-panel--small">
              <div><div className="home-panel__code">LAB / 02</div><h3>Software gives the circuit a brain.</h3><p>Programming, data, AI/ML and interfaces expand what a student can build with the same hardware.</p></div>
              <Link href="/events" className="panel-link">SEE ACTIVITY ↗</Link><span className="home-panel__corner" />
            </Reveal>
            <Reveal delay={0.1} className="home-panel home-panel--small">
              <div><div className="home-panel__code">LAB / 03</div><h3>{nextEvent?.title || "New ideas in motion."}</h3><p>{nextEvent?.date ? `Next activity · ${nextEvent.date}` : "Workshops, seminars and technical showcases throughout the year."}</p></div>
              <Link href="/events" className="panel-link">OPEN ACTIVITY LOG ↗</Link><span className="home-panel__corner" />
            </Reveal>
            <Reveal delay={0.14} className="home-panel home-panel--large">
              <div><div className="home-panel__code">LAB / 04</div><h3>People make the department.</h3><p>Faculty, students and alumni form a network that stretches from Rajakumari into research, software, electronics and industry.</p></div>
              <Link href="/alumni" className="panel-link">EXPLORE THE NETWORK ↗</Link><span className="home-panel__corner" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="flex items-end justify-between gap-8 mb-10">
            <SectionTitle kicker="03 / Faculty preview" number="03">The people <em>in the room.</em></SectionTitle>
            <Link href="/faculty" className="button border border-black/20">View all faculty ↗</Link>
          </div>
          <PersonGrid people={faculty} kind="faculty" />
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="wrap">
          <div className="flex items-end justify-between gap-8 mb-10">
            <SectionTitle kicker="04 / Curriculum" number="04">The road <em>through the course.</em></SectionTitle>
            <Link href="/syllabus" className="button border border-black/20">Full syllabus ↗</Link>
          </div>
          <div className="home-panels">
            {syllabus.map((sem, i) => (
              <Reveal key={sem.semester} delay={i * 0.05} className={`home-panel ${i % 2 === 0 ? "home-panel--large" : "home-panel--small"}`}>
                <div>
                  <div className="home-panel__code">SEMESTER / 0{sem.semester}{sem.session ? ` — ${sem.session.toUpperCase()}` : ""}</div>
                  <h3>{sem.title}</h3>
                  <p>{sem.courses.map((c) => c.name).join(" · ")}</p>
                </div>
                <Link href="/syllabus" className="panel-link">OPEN SEMESTER 0{sem.semester} ↗</Link>
                <span className="home-panel__corner" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
