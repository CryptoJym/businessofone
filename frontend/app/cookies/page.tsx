export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
      
      <p className="text-sm text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Business of One ("we," "our," or "us") uses cookies and similar tracking technologies on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
        </p>
        <p className="mb-4">
          This policy should be read in conjunction with our Privacy Policy, which provides additional information about how we collect and process personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small text files that are placed on your device when you visit a website. They help websites remember information about your visit, making your next visit easier and more useful.
        </p>
        <p className="mb-4">
          We also use similar technologies such as web beacons, pixels, and local storage, which function similarly to cookies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Categories of Cookies We Use</h2>
        
        <div className="mb-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-medium mb-2">Strictly Necessary Cookies</h3>
          <p className="mb-2">These cookies are essential for the website to function properly.</p>
          <ul className="list-disc pl-6">
            <li>Session management</li>
            <li>Security and authentication</li>
            <li>Load balancing</li>
            <li>Cookie consent preferences</li>
          </ul>
          <p className="mt-2 text-sm font-medium">Legal Basis: Legitimate interests (website functionality)</p>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-medium mb-2">Functional Cookies</h3>
          <p className="mb-2">These cookies enable enhanced functionality and personalization.</p>
          <ul className="list-disc pl-6">
            <li>Language preferences</li>
            <li>Time zone settings</li>
            <li>Enhanced user interface features</li>
            <li>Appointment booking preferences</li>
          </ul>
          <p className="mt-2 text-sm font-medium">Legal Basis: Consent</p>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-medium mb-2">Analytics Cookies</h3>
          <p className="mb-2">These cookies help us understand how visitors interact with our website.</p>
          <ul className="list-disc pl-6">
            <li>Google Analytics (anonymized IP)</li>
            <li>Page view tracking</li>
            <li>User journey analysis</li>
            <li>Performance monitoring</li>
          </ul>
          <p className="mt-2 text-sm font-medium">Legal Basis: Consent</p>
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded">
          <h3 className="text-xl font-medium mb-2">Marketing Cookies</h3>
          <p className="mb-2">These cookies track your online activity to help deliver more relevant advertising.</p>
          <ul className="list-disc pl-6">
            <li>LinkedIn Insight Tag</li>
            <li>Facebook Pixel</li>
            <li>Google Ads remarketing</li>
            <li>Conversion tracking</li>
          </ul>
          <p className="mt-2 text-sm font-medium">Legal Basis: Consent</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Specific Cookies We Use</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Cookie Name</th>
                <th className="px-4 py-2 text-left">Provider</th>
                <th className="px-4 py-2 text-left">Purpose</th>
                <th className="px-4 py-2 text-left">Expiry</th>
                <th className="px-4 py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">_ga</td>
                <td className="px-4 py-2">Google Analytics</td>
                <td className="px-4 py-2">Distinguishes users</td>
                <td className="px-4 py-2">2 years</td>
                <td className="px-4 py-2">Analytics</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">_gid</td>
                <td className="px-4 py-2">Google Analytics</td>
                <td className="px-4 py-2">Distinguishes users</td>
                <td className="px-4 py-2">24 hours</td>
                <td className="px-4 py-2">Analytics</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">cookie_consent</td>
                <td className="px-4 py-2">Business of One</td>
                <td className="px-4 py-2">Stores cookie preferences</td>
                <td className="px-4 py-2">1 year</td>
                <td className="px-4 py-2">Necessary</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">session_id</td>
                <td className="px-4 py-2">Business of One</td>
                <td className="px-4 py-2">Session management</td>
                <td className="px-4 py-2">Session</td>
                <td className="px-4 py-2">Necessary</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Your Cookie Choices</h2>
        
        <h3 className="text-xl font-medium mb-2">5.1 Cookie Consent</h3>
        <p className="mb-4">
          When you first visit our website, you will see a cookie banner asking for your consent to use non-essential cookies. You can accept or reject these cookies.
        </p>

        <h3 className="text-xl font-medium mb-2">5.2 Browser Settings</h3>
        <p className="mb-4">
          Most browsers allow you to control cookies through their settings:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Chrome: Settings → Privacy and security → Cookies</li>
          <li>Firefox: Settings → Privacy & Security → Cookies</li>
          <li>Safari: Preferences → Privacy → Cookies</li>
          <li>Edge: Settings → Privacy, search, and services → Cookies</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">5.3 Opt-Out Links</h3>
        <p className="mb-4">You can opt out of specific third-party cookies:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline">Google Analytics Opt-out</a></li>
          <li>Facebook: <a href="https://www.facebook.com/help/568137493302217" className="text-blue-600 hover:underline">Facebook Ads Settings</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" className="text-blue-600 hover:underline">LinkedIn Opt-out</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Cookie Management for Mobile Apps</h2>
        <p className="mb-4">
          If we provide mobile applications, they may use similar technologies like SDKs. You can control these through your device settings:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>iOS: Settings → Privacy → Tracking</li>
          <li>Android: Settings → Google → Ads</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Impact of Rejecting Cookies</h2>
        <p className="mb-4">
          If you choose to reject cookies, please note that:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Some features of our website may not function properly</li>
          <li>You may need to log in more frequently</li>
          <li>Your preferences may not be saved between visits</li>
          <li>You may still see ads, but they won't be personalized</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. GDPR and CCPA Compliance</h2>
        
        <h3 className="text-xl font-medium mb-2">For European Users (GDPR)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>We obtain consent before setting non-essential cookies</li>
          <li>You can withdraw consent at any time</li>
          <li>We provide clear information about each cookie's purpose</li>
          <li>We minimize data collection to what's necessary</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">For California Residents (CCPA)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>We disclose what personal information cookies collect</li>
          <li>You have the right to opt-out of the "sale" of personal information</li>
          <li>We don't discriminate against users who exercise their privacy rights</li>
          <li>You can request deletion of data collected via cookies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Do Not Track Signals</h2>
        <p className="mb-4">
          Some browsers have a "Do Not Track" feature that sends a signal to websites you visit. Currently, there is no industry standard for responding to these signals, and we do not modify our data collection based on Do Not Track signals.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this Cookie Policy from time to time. We will notify you of any material changes by updating the "Last updated" date and, where appropriate, notifying you through our website or via email.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
        <p className="mb-4">
          If you have questions about our use of cookies, please contact us:
        </p>
        <div className="bg-gray-50 p-4 rounded">
          <p><strong>Business of One</strong></p>
          <p>Email: privacy@businessofone.com</p>
          <p>Phone: [Your Phone Number]</p>
          <p>Address: [Your Business Address]</p>
        </div>
        <p className="mt-4">
          For GDPR-related inquiries, you may also contact your local data protection authority.
        </p>
      </section>
    </div>
  );
}