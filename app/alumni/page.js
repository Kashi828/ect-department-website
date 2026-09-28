import SectionTitle from "@/components/SectionTitle";
import AlumniTable from "@/components/AlumniTable";
import Reveal from "@/components/Reveal";
import { getAlumni } from "@/lib/site-data";

export const metadata = { title: "Alumni · ECT" };

export const dynamic = "force-dynamic";

export default async function AlumniPage() {
  const alumni = await getAlumni();
  return (
    <section className="page-section">
      <div className="wrap page-intro"><SectionTitle kicker="01 / Alumni network" number={String(alumni.length).padStart(2, "0")}>The network <em>after campus.</em></SectionTitle><Reveal><div className="page-intro__copy">Alumni carry the department into software teams, engineering roles, operations, research and new directions. This table is a growing snapshot of that network.</div></Reveal></div>
      <div className="wrap"><AlumniTable alumni={alumni} /></div>
    </section>
  );
}
