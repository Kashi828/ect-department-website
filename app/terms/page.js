import SectionTitle from "@/components/SectionTitle";

export const metadata = { title: "Terms & Conditions · ECT" };

export default function TermsPage() {
  return (
    <section className="page-section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <SectionTitle kicker="LEGAL / 01" number="T&C">Terms &amp; <em>Conditions.</em></SectionTitle>
        <div className="legal-body">
          <p>Last updated: September 2026</p>

          <h3>1. About these terms</h3>
          <p>
            These terms govern the use of the website of the Department of Electronics with Computer
            Technology (ECT), NSS College Rajakumari, affiliated to Mahatma Gandhi University, Kerala.
            By browsing this website you agree to use the information published here for personal,
            academic and informational purposes.
          </p>

          <h3>2. Informational purpose</h3>
          <p>
            Course structures, syllabi, event notices, achievement records and other content are
            published in good faith for students, parents and visitors. The department may revise,
            suspend or withdraw any content on this website at any time without notice. Only official
            notifications issued by the college or the university carry administrative authority.
          </p>

          <h3>3. Academic content and syllabus</h3>
          <p>
            Syllabus details are summarised from the Mahatma Gandhi University UG programmes and are
            subject to change by the university. Students must always rely on the official
            regulations and notifications issued by Mahatma Gandhi University and the college for
            examinations, credit requirements and grading.
          </p>

          <h3>4. Photographs and media</h3>
          <p>
            Photographs of students, faculty, alumni and campus events are published to document
            departmental life. Where possible, consent of the individuals featured is obtained. Any
            person who wishes a photograph or reference removed may request this by writing to the
            department email address listed on the contact page, and the request will be honoured
            promptly.
          </p>

          <h3>5. Intellectual property</h3>
          <p>
            Text, design, posters and photographs on this website belong to the department or their
            respective owners. You may share content for non-commercial, educational purposes with
            attribution. Reproduction for commercial use requires prior written permission.
          </p>

          <h3>6. External links</h3>
          <p>
            Links to external websites are provided for convenience. The department is not
            responsible for the content or availability of third-party sites.
          </p>

          <h3>7. Limitation of liability</h3>
          <p>
            The department does not warrant that the website will be uninterrupted, error-free, or
            that the information is complete or current at all times. Use of this website is at your
            own discretion, and the department shall not be liable for any loss arising from its use.
          </p>

          <h3>8. Acceptable use</h3>
          <p>
            You agree not to attempt unauthorised access to any part of this website, including the
            administration area, and not to interfere with its operation or security.
          </p>

          <h3>9. Contact</h3>
          <p>
            Questions about these terms may be sent to the department email listed on the{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
