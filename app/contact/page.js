import Link from "next/link";
import { getSettings, getGallery } from "@/lib/site-data";
import SectionTitle from "@/components/SectionTitle";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Visit · ECT" };

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSettings();
  const galleryImages = await getGallery();
  return (
    <>
      <section className="page-section page-section--dark">
        <div className="wrap contact-grid">
          <SectionTitle kicker="01 / Visit" number="GO">Come see <em>the lab.</em></SectionTitle>
          <Reveal><div className="contact-card bg-white/[.03] border-white/10 text-white">
            <span className="contact-card__label">DEPARTMENT / CONTACT NODE</span>
            <h3>NSS College<br />Rajakumari</h3>
            <p>Department of Electronics with Computer Technology · Kerala · Affiliated to Mahatma Gandhi University</p>
            <div className="contact-links">
              <a href={`mailto:${settings.email}`}>EMAIL <span>{settings.email}</span></a>
              <a href={`tel:${settings.phone}`}>PHONE <span>{settings.phone}</span></a>
              {settings.youtube && settings.youtube !== "#" ? (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer">YOUTUBE <span>{settings.youtube.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span></a>
              ) : null}
              <Link href="/events">ACTIVITY <span>OPEN LOG ↗</span></Link>
            </div>
          </div></Reveal>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap"><SectionTitle kicker="02 / Gallery" number="VIS">A few frames from <em>the room.</em></SectionTitle><Gallery images={galleryImages} /></div>
      </section>
    </>
  );
}
