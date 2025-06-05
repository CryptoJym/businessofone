import { ConsultationForm } from "@/components/forms/consultation-form"
import { ResourceDownloadForm } from "@/components/forms/resource-download-form"
import { NewsletterForm } from "@/components/forms/newsletter-form"

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business of One - Lead Capture Forms
          </h1>
          <p className="text-xl text-gray-600">
            Stream 6: Forms & Lead Capture Implementation
          </p>
        </div>

        {/* Consultation Form Section */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Book Your Free Strategy Session
              </h2>
              <p className="text-gray-600 mb-6">
                Get personalized advice to transform your solo business
              </p>
              <ConsultationForm />
            </div>
          </div>
        </section>

        {/* Resource Download Forms Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Free Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <ResourceDownloadForm
                resourceId="growth-checklist"
                resourceTitle="Solo Business Growth Checklist"
                resourceDescription="A comprehensive 50-point checklist to audit and optimize your business"
              />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ResourceDownloadForm
                resourceId="automation-assessment"
                resourceTitle="Automation Readiness Assessment"
                resourceDescription="Discover which parts of your business you can automate today"
              />
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <ResourceDownloadForm
                resourceId="business-audit"
                resourceTitle="Business Audit Template"
                resourceDescription="Professional template to evaluate your business performance"
              />
            </div>
          </div>
        </section>

        {/* Newsletter Forms Section */}
        <section className="mb-16">
          <div className="bg-[#4169E1] text-white rounded-lg p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Weekly insights to help you run your business like a pro
              </p>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <NewsletterForm 
                  showName={true}
                  showBusinessStage={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inline Newsletter Example */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Newsletter Signup (Inline Version)
              </h3>
              <NewsletterForm variant="inline" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}