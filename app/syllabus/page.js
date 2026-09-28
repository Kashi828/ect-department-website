import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import SyllabusBoard from "@/components/SyllabusBoard";
import Reveal from "@/components/Reveal";
import { getSyllabus } from "@/lib/site-data";

export const metadata = {
  title: "Syllabus · ECT",
  description: "Semester-by-semester curriculum of B.Sc. (Honours) Electronics with Computer Technology, MGU-UGP (FYUGP), 2024 admission onwards.",
};

export const dynamic = "force-dynamic";

export default async function SyllabusPage() {
  const syllabus = await getSyllabus();

  return (
    <>
      <section className="page-section">
        <div className="wrap page-intro">
          <SectionTitle kicker="01 / Curriculum" number="SYL">
            What we pursue, <em>semester by semester.</em>
          </SectionTitle>
          <Reveal>
            <div className="page-intro__copy">
              The B.Sc. (Honours) Electronics with Computer Technology programme under MGU-UGP (FYUGP), 2024 admission onwards, moves from emerging electronics, robotics and PC hardware through digital logic, mobile development, analog circuits and C, into Python, AI/ML, IoT and single-board computers. Below is the path the department has pursued so far, listed by university exam session.
            </div>
          </Reveal>
        </div>
        <div className="wrap">
          <SyllabusBoard semesters={syllabus} />
        </div>
      </section>

      <section className="page-section page-section--dark">
        <div className="wrap syllabus-foot">
          <Reveal>
            <div className="syllabus-foot__block">
              <span className="syllabus-panel__kicker">PROGRAMME / STRUCTURE</span>
              <h3>Four years, eight semesters, one continuum.</h3>
              <p>
                The FYUGP Honours programme spans eight semesters. Disciplinary Specific Cores (DSC) build the electronics + computing spine, Disciplinary Specific Electives (DSE) allow specialisation, and skill enhancement courses (SEC) round out the profile. Semesters 6–8 will be added here as the batch progresses through the programme.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="syllabus-foot__links">
              <Link href="/about" className="panel-link">THE DEPARTMENT STORY ↗</Link>
              <Link href="/faculty" className="panel-link">WHO TEACHES IT ↗</Link>
              <Link href="/events" className="panel-link">SEE IT IN PRACTICE ↗</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
