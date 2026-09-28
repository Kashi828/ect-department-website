import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { faculty as fallbackFaculty } from "@/content/sample-data";

export const metadata = { title: "About · ECT" };

const VISION_MISSION = [
  {
    title: "Vision",
    body: "To be a centre of excellence that empowers students with strong foundations in electronics and computing — producing technically sound, socially committed graduates ready for industry, higher education and innovation.",
  },
  {
    title: "Mission",
    body: "To deliver quality education through a balanced curriculum, hands-on laboratory work, industry exposure and a culture of curiosity — where every student learns to build, test and iterate real systems.",
  },
];

const FACILITIES = [
  { code: "FAC / 01", name: "Electronics Lab", detail: "Analog and digital circuit workbenches, CROs, function generators, regulated supplies and component inventory for core experiment work." },
  { code: "FAC / 02", name: "Computer Lab", detail: "Programming, simulation and IoT development — C, Python, embedded toolchains and microcontroller platforms." },
  { code: "FAC / 03", name: "Seminar Hall", detail: "The department's stage for workshops, seminars, club activities and project showcases through the year." },
];

export default function AboutPage() {
  const hod = fallbackFaculty.find((f) => f.role === "Head of Department");

  return (
    <>
      <section className="page-section">
        <div className="wrap page-intro">
          <SectionTitle kicker="01 / About" number="01">We work between <em>worlds.</em></SectionTitle>
          <Reveal><div className="page-intro__copy">The Department of Electronics with Computer Technology brings electronics and computing together in one programme — from the first circuit diagram to software, automation, connected devices and intelligent systems.</div></Reveal>
        </div>
        <div className="wrap statement">
          <Reveal><div className="statement__quote">Think with the hand. Build with the mind.</div></Reveal>
          <Reveal delay={.07}><div className="statement__text"><p>At NSS College Rajakumari, the department is built around making. Students encounter electronics not as isolated theory, but as a system that connects to programming, data, communication and modern computing.</p><p>The programme is affiliated to Mahatma Gandhi University, Kottayam. Academic learning is supported by technical workshops, seminars, project work and hands-on exploration.</p><Link href="/syllabus" className="panel-link">EXPLORE THE SYLLABUS ↗</Link></div></Reveal>
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="wrap">
          <SectionTitle kicker="02 / Vision & Mission" number="02">Where we are <em>headed.</em></SectionTitle>
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            {VISION_MISSION.map((item, i) => (
              <Reveal key={item.title} delay={i * .06} className="border border-white/10 p-6 bg-white/[.03] min-h-60">
                <span className="font-mono text-[9px] text-[#a7b09f]">0{i + 1}</span>
                <h3 className="font-display text-3xl leading-none mt-12 tracking-tight">{item.title}</h3>
                <p className="text-sm leading-7 text-white/50 mt-5">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap hod-band">
          <Reveal className="hod-band__photo">
            {hod?.photo && (
              <Image src={hod.photo} alt={hod.name} width={640} height={760} className="object-cover object-top" />
            )}
          </Reveal>
          <Reveal delay={.08}>
            <div className="hod-band__body">
              <span className="syllabus-panel__kicker">FROM THE HOD'S DESK</span>
              <h3>Building a lab culture,<br />one batch at a time.</h3>
              <p>
                Our department runs on a simple idea: a concept is only understood once a student has held it. Every course in the programme ends in something measurable — a working circuit, a running program, a connected device. Between semesters, workshops, seminars and the Photons Electronics Club keep that momentum alive.
              </p>
              <p>
                What we ask of every student is consistency. Show up, wire it up, break it, and understand why it broke. That habit outlasts any syllabus.
              </p>
              <div className="hod-band__meta">
                <strong>{hod?.name || "Head of Department"}</strong>
                <span>Head of Department · Electronics with Computer Technology</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-section page-section--paper">
        <div className="wrap">
          <SectionTitle kicker="03 / Facilities" number="03">Rooms built <em>for making.</em></SectionTitle>
          <div className="home-panels" style={{ marginTop: 48 }}>
            {FACILITIES.map((f, i) => (
              <Reveal key={f.code} delay={i * .06} className={`home-panel ${i === 0 ? "home-panel--large" : "home-panel--small"}`}>
                <div>
                  <div className="home-panel__code">{f.code}</div>
                  <h3>{f.name}</h3>
                  <p>{f.detail}</p>
                </div>
                <Link href="/contact" className="panel-link">SEE THEM ON YOUR VISIT ↗</Link>
                <span className="home-panel__corner" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
