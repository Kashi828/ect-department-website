import SectionTitle from "@/components/SectionTitle";

export const metadata = { title: "Privacy Policy · ECT" };

export default function PrivacyPage() {
  return (
    <section className="page-section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <SectionTitle kicker="LEGAL / 02" number="PRV">Privacy <em>Policy.</em></SectionTitle>
        <div className="legal-body">
          <p>Last updated: September 2026</p>

          <h3>1. Scope</h3>
          <p>
            This policy describes how the Department of Electronics with Computer Technology (ECT),
            NSS College Rajakumari, handles information collected through this website. The site is
            maintained by the department for informational and educational purposes.
          </p>

          <h3>2. What we collect</h3>
          <p>
            This website does not use advertising trackers or sell data. Like most websites, our
            hosting provider may record standard technical information (pages requested, browser
            type, approximate region and timestamps) in server logs for security and performance
            monitoring. No attempt is made to identify individual visitors from these logs.
          </p>

          <h3>3. Photographs and personal details</h3>
          <p>
            Names, photographs, batches and positions of faculty, toppers and alumni are published
            to recognise achievement and document departmental activities. These are provided by
            the college community or collected from public college records. Any individual who
            wants their details amended or removed may write to the department email on the{" "}
            <a href="/contact">contact page</a>; we will respond promptly.
          </p>

          <h3>4. Communication</h3>
          <p>
            If you contact the department by email or phone, the details you share are used only to
            respond to your enquiry. They are not added to mailing lists or shared with third
            parties outside the college administration.
          </p>

          <h3>5. Cookies</h3>
          <p>
            The website does not set marketing or analytics cookies. A single strictly-necessary
            cookie is used by the administration login to keep authorised staff signed in; it is
            deleted on logout and contains no personal data beyond an anonymous session token.
          </p>

          <h3>6. Third-party services</h3>
          <p>
            The site is hosted on Vercel, which serves pages and stores uploaded images on the
            department's behalf under their own privacy and security terms. Embedded external
            content, if any, is limited to official college or university links.
          </p>

          <h3>7. Data security</h3>
          <p>
            Content administration is restricted to authorised staff through password protection,
            and access is limited to the department's website team. Uploaded media and records are
            stored securely with the hosting provider.
          </p>

          <h3>8. Changes to this policy</h3>
          <p>
            This policy may be updated from time to time; the "last updated" date above reflects
            the current version. Continued use of the website after changes constitutes acceptance
            of the revised policy.
          </p>

          <h3>9. Contact</h3>
          <p>
            For any privacy question or removal request, use the department email or phone number
            listed on the <a href="/contact">contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
