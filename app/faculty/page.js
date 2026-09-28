import SectionTitle from "@/components/SectionTitle";
import PersonGrid from "@/components/PersonGrid";
import Reveal from "@/components/Reveal";
import { getFaculty } from "@/lib/site-data";

export const metadata = { title: "Faculty · ECT" };

export const dynamic = "force-dynamic";

export default async function FacultyPage() {
  const faculty = await getFaculty();
  return (
    <section className="page-section">
      <div className="wrap page-intro">
        <SectionTitle kicker="01 / Faculty" number="08">The people <em>behind the systems.</em></SectionTitle>
        <Reveal><div className="page-intro__copy">Academic guidance, technical curiosity and day-to-day mentoring make the department more than a timetable. These are the faculty members who keep the lab moving.</div></Reveal>
      </div>
      <div className="wrap"><PersonGrid people={faculty} kind="faculty" /></div>
    </section>
  );
}
