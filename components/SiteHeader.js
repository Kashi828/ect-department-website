import Link from "next/link";
import Image from "next/image";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="brand-lockup" aria-label="ECT Department home">
          <span className="brand-mark brand-mark--logo">
            <Image src="/nss-college-logo.jpg" alt="NSS College Rajakumari emblem" width={56} height={56} priority />
          </span>
          <span className="brand-copy">
            <span className="brand-copy__eyebrow">NSS COLLEGE RAJAKUMARI · KERALA</span>
            <span className="brand-copy__title">Electronics × Computer Technology</span>
            <span className="brand-copy__sub">Learn the signal. Build the system.</span>
          </span>
        </Link>

        <div className="header-aside" aria-label="Department meta">
          <span>MG UNIVERSITY</span>
          <span className="header-aside__dot" />
          <span>EST. 2024</span>
        </div>
      </div>
    </header>
  );
}
