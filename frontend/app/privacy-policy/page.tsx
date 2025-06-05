export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie Policy</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h3>
          
          <h4 className="font-semibold mt-4 mb-2">Necessary Cookies</h4>
          <p className="mb-4">
            These cookies are essential for the website to function properly. They enable basic functions like page navigation 
            and access to secure areas of the website. The website cannot function properly without these cookies.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Analytics Cookies</h4>
          <p className="mb-4">
            These cookies help us understand how visitors interact with our website by collecting and reporting information 
            anonymously. This helps us improve our website and services.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Marketing Cookies</h4>
          <p className="mb-4">
            These cookies are used to track visitors across websites. The intention is to display ads that are relevant 
            and engaging for the individual user.
          </p>

          <h4 className="font-semibold mt-4 mb-2">Preference Cookies</h4>
          <p className="mb-4">
            These cookies enable a website to remember information that changes the way the website behaves or looks, 
            like your preferred language or the region that you are in.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How to Control Cookies</h2>
          <p className="mb-4">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your 
            computer and you can set most browsers to prevent them from being placed. If you do this, however, you 
            may have to manually adjust some preferences every time you visit a site and some services and functionalities 
            may not work.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our use of cookies or other technologies, please email us at 
            privacy@businessofone.com.
          </p>
        </div>
      </div>
    </main>
  );
}