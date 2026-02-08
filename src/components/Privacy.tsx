import { SEO } from './SEO';
import { PageLayout } from './PageLayout';

export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Lexiloom"
        description="Lexiloom privacy policy. We do not collect personal data. Our minimal word wallpaper generator runs in your browser; learn how we handle data and cookies."
        canonical="https://lexiloom.com/privacy"
      />
      <PageLayout title="Privacy Policy" showBack backTo="/" backLabel="Home">
        <article className="prose prose-neutral dark:prose-invert max-w-none text-secondary space-y-6 animate-fade-in">
          <p className="text-primary font-medium">Last updated: February 2025</p>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Overview</h2>
            <p>
              Lexiloom (&quot;we,&quot; &quot;our,&quot; or &quot;the service&quot;) is a free, browser-based tool for creating minimal word and definition wallpapers.
              We are committed to protecting your privacy. This policy explains what information we do or do not collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Information We Do Not Collect</h2>
            <p>
              Lexiloom does not require an account or login. We do not collect your name, email address, or any personally identifiable information.
              Wallpaper creation happens entirely in your browser. Words, definitions, and generated images are not sent to our servers for storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Information That May Be Collected</h2>
            <p>
              As with most websites, our hosting or analytics providers may collect anonymous usage data such as general traffic, device type, or referring site.
              If we use cookies or local storage, they are used only for preferences (e.g., theme choice) and are stored locally on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Third-Party Services</h2>
            <p>
              Lexiloom may use third-party services for definitions (e.g., Free Dictionary API) and word search (e.g., Datamuse). When you use the tool,
              your browser may send requests to these services. Their privacy policies apply to those requests. We do not control data collected by third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Data Security</h2>
            <p>
              Because we do not store your personal data or wallpaper content on our servers, the risk of your data being exposed in a breach is minimal.
              We still encourage you to use a secure connection (HTTPS) when visiting Lexiloom.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Children&apos;s Privacy</h2>
            <p>
              Our service is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top will reflect the latest version.
              Continued use of Lexiloom after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Contact</h2>
            <p>
              For questions about this privacy policy or our practices, you may contact us through the channels listed on our website (if any) or by visiting the Lexiloom homepage.
            </p>
          </section>
        </article>
      </PageLayout>
    </>
  );
}
