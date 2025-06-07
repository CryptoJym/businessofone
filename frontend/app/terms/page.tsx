export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <p className="text-sm text-gray-600 mb-6">Effective Date: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
        <p className="mb-4">
          By accessing or using Business of One's consulting services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
        <p className="mb-4">
          Business of One provides professional consulting services for solo entrepreneurs and small businesses, including but not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Business strategy and planning</li>
          <li>Operations optimization</li>
          <li>Marketing and growth consulting</li>
          <li>One-on-one coaching sessions</li>
          <li>Custom business solutions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Appointment Terms</h2>
        <h3 className="text-xl font-medium mb-2">3.1 Scheduling</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Appointments must be scheduled at least 48 hours in advance</li>
          <li>All appointments are subject to consultant availability</li>
          <li>You will receive a confirmation email upon successful booking</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">3.2 Cancellation Policy</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Cancellations made 24+ hours before appointment: Full refund</li>
          <li>Cancellations made 12-24 hours before appointment: 50% refund</li>
          <li>Cancellations made less than 12 hours before appointment: No refund</li>
          <li>No-shows will be charged the full consultation fee</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">3.3 Rescheduling</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>First rescheduling request: Free of charge if made 24+ hours in advance</li>
          <li>Subsequent rescheduling: Subject to a $25 administrative fee</li>
          <li>Rescheduling requests must be made through our official channels</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">3.4 Session Conduct</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Sessions will start and end at scheduled times</li>
          <li>Late arrivals will not extend the session duration</li>
          <li>Professional behavior is expected from all parties</li>
          <li>Sessions may be terminated early for inappropriate conduct without refund</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
        <h3 className="text-xl font-medium mb-2">4.1 Fees and Payment</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>All fees are payable in advance unless otherwise agreed</li>
          <li>Prices are in USD unless otherwise specified</li>
          <li>We accept major credit cards and bank transfers</li>
          <li>All sales are final except as outlined in our cancellation policy</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">4.2 Late Payments</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Invoices are due upon receipt unless otherwise specified</li>
          <li>Late payments may incur a 1.5% monthly interest charge</li>
          <li>We reserve the right to suspend services for overdue accounts</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
        <h3 className="text-xl font-medium mb-2">5.1 Our Intellectual Property</h3>
        <p className="mb-4">
          All materials, methodologies, and content provided during our consulting services remain the intellectual property of Business of One unless otherwise agreed in writing.
        </p>

        <h3 className="text-xl font-medium mb-2">5.2 Client Intellectual Property</h3>
        <p className="mb-4">
          You retain all rights to your pre-existing intellectual property. Any work product created specifically for you during our engagement becomes your property upon full payment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Confidentiality</h2>
        <p className="mb-4">
          Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the consulting relationship. This obligation survives the termination of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Professional Services Disclaimer</h2>
        <p className="mb-4">
          Our consulting services are provided on an advisory basis only. We do not guarantee specific results or outcomes. Implementation of our recommendations is at your sole discretion and risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, Business of One shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
        </p>
        <p className="mb-4">
          Our total liability for any claim arising out of or relating to these Terms or our Services shall not exceed the amount paid by you for the Services in the three (3) months preceding the claim.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless Business of One, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of our Services or violation of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Dispute Resolution</h2>
        <h3 className="text-xl font-medium mb-2">10.1 Informal Resolution</h3>
        <p className="mb-4">
          We encourage you to contact us first to resolve any disputes informally.
        </p>

        <h3 className="text-xl font-medium mb-2">10.2 Arbitration</h3>
        <p className="mb-4">
          Any disputes that cannot be resolved informally shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of our Services after such modifications constitutes acceptance of the updated Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Severability</h2>
        <p className="mb-4">
          If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">14. Entire Agreement</h2>
        <p className="mb-4">
          These Terms constitute the entire agreement between you and Business of One regarding our Services and supersede all prior agreements and understandings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">15. Contact Information</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p><strong>Business of One</strong></p>
          <p>Email: legal@businessofone.com</p>
          <p>Phone: [Your Phone Number]</p>
          <p>Address: [Your Business Address]</p>
        </div>
      </section>
    </div>
  );
}