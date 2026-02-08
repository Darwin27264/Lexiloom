import { SEO } from './SEO';
import { PageLayout } from './PageLayout';

export function Terms() {
  return (
    <>
      <SEO
        title="Terms of Use | Lexiloom"
        description="Terms of use for Lexiloom. Use our free minimal word wallpaper generator responsibly. Read our terms regarding acceptable use, intellectual property, and disclaimers."
        canonical="https://lexiloom.com/terms"
      />
      <PageLayout title="Terms of Use" showBack backTo="/" backLabel="Home">
        <article className="prose prose-neutral dark:prose-invert max-w-none text-secondary space-y-6 animate-fade-in">
          <p className="text-primary font-medium">Last updated: February 2025</p>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Acceptance of Terms</h2>
            <p>
              By accessing or using Lexiloom (&quot;the service&quot;), you agree to be bound by these Terms of Use.
              If you do not agree, please do not use the service. We may update these terms at any time; your continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Description of Service</h2>
            <p>
              Lexiloom provides a free, browser-based tool to create wallpapers from words and definitions, including support for English, Japanese, and Chinese with pronunciation guides.
              The service is provided &quot;as is&quot; for personal, non-commercial use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Acceptable Use</h2>
            <p>
              You agree to use Lexiloom only for lawful purposes. You may not use the service to create, store, or distribute content that is illegal, harmful, defamatory, infringing, or that violates the rights of others.
              You may not attempt to disrupt, overload, or compromise the service or its infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Intellectual Property</h2>
            <p>
              Lexiloom&apos;s name, branding, and the design of the service are owned by us. Definitions and lexical data are sourced from third-party providers (e.g., Wiktionary via Free Dictionary API, Datamuse) and are subject to their respective licenses.
              Wallpapers you generate using the tool are yours to use for personal purposes. We claim no ownership over user-generated output.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Disclaimers</h2>
            <p>
              The service is provided without warranties of any kind, express or implied. We do not guarantee that definitions or translations are accurate, complete, or up to date.
              Lexiloom is not liable for any decisions you make based on content displayed in the tool. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Lexiloom and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service,
              including loss of data or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Termination</h2>
            <p>
              We may suspend or discontinue the service or your access at any time, with or without notice. These terms survive termination where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Governing Law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which Lexiloom operates. Any disputes shall be resolved in the applicable courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-primary mt-8 mb-3">Contact</h2>
            <p>
              For questions about these Terms of Use, please refer to the Lexiloom website or contact information provided there.
            </p>
          </section>
        </article>
      </PageLayout>
    </>
  );
}
