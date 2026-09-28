import SectionTitle from "@/components/SectionTitle";
import PersonGrid from "@/components/PersonGrid";
import Reveal from "@/components/Reveal";
import { getToppers } from "@/lib/site-data";

export const metadata = { title: "Toppers · ECT" };

export const dynamic = "force-dynamic";

export default async function ToppersPage() {
  const toppers = await getToppers();
  return (
    <section className="page-section">
      <div className="wrap page-intro"><SectionTitle kicker="01 / Academic signal" number="TOP">Proof of <em>the work.</em></SectionTitle><Reveal><div className="page-intro__copy">A small record of academic performance from students who have translated consistent work into strong results.</div></Reveal></div>
      <div className="wrap"><PersonGrid people={toppers} kind="topper" /></div>
    </section>
  );
}
