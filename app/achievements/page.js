import SectionTitle from "@/components/SectionTitle";
import AchievementsList from "@/components/AchievementsList";
import Reveal from "@/components/Reveal";
import { getAchievements } from "@/lib/site-data";

export const metadata = { title: "Wins · ECT" };

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const achievements = await getAchievements();
  return (
    <section className="page-section">
      <div className="wrap page-intro"><SectionTitle kicker="01 / Achievements" number={String(achievements.length).padStart(2, "0")}>Small wins. <em>Big signals.</em></SectionTitle><Reveal><div className="page-intro__copy">Projects, competitions, academic ranks and presentations become markers of a culture that rewards students for trying things beyond the obvious.</div></Reveal></div>
      <div className="wrap"><AchievementsList achievements={achievements} /></div>
    </section>
  );
}
