import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <div className="footer-code">ECT / RAJAKUMARI / 2026</div>
          <h2 className="footer-title">Build something<br /><em>that matters.</em></h2>
        </div>
        <div className="footer-links">
          <span>NSS College Rajakumari</span>
          <span>Department of Electronics with Computer Technology</span>
          <span>Affiliated to Mahatma Gandhi University</span>
        </div>
        <div className="footer-nav">
          <Link href="/syllabus">Syllabus</Link>
          <Link href="/faculty">Faculty</Link>
          <Link href="/events">Activities</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} ECT Department</span>
        <span>Learn → Build → Deploy</span>
      </div>
    </footer>
  );
}
