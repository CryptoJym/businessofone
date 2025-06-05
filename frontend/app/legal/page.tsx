export default function LegalIndex() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal Documents</h1>
      
      <p className="text-lg mb-8">
        Business of One is committed to transparency and compliance with data protection regulations. 
        Please review our legal documents below:
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA.
          </p>
          <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
            Read Privacy Policy →
          </a>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Terms of Service</h2>
          <p className="text-gray-600 mb-4">
            Understand the terms and conditions governing your use of our consulting services.
          </p>
          <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
            Read Terms of Service →
          </a>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Cookie Policy</h2>
          <p className="text-gray-600 mb-4">
            Find out how we use cookies and similar technologies on our website.
          </p>
          <a href="/cookies" className="text-blue-600 hover:text-blue-800 font-medium">
            Read Cookie Policy →
          </a>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-3">Data Processing</h2>
          <p className="text-gray-600 mb-4">
            Review our data processing practices and your rights under GDPR and CCPA.
          </p>
          <a href="/privacy#your-rights" className="text-blue-600 hover:text-blue-800 font-medium">
            Learn About Your Rights →
          </a>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
        <p className="text-gray-700 mb-4">
          If you have questions about our legal policies or need to exercise your privacy rights, please contact us:
        </p>
        <div className="space-y-2">
          <p><strong>Email:</strong> legal@businessofone.com</p>
          <p><strong>Privacy Inquiries:</strong> privacy@businessofone.com</p>
          <p><strong>Phone:</strong> [Your Phone Number]</p>
        </div>
      </div>
    </div>
  );
}