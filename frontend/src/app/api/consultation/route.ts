import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate the data
    if (!data.name || !data.email || !data.businessType || !data.revenueRange || !data.biggestChallenge || !data.preferredContactTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send confirmation email to user
    // 3. Send notification to sales team
    // 4. Add to CRM
    // 5. Trigger any automations

    console.log("Consultation form submission:", data)

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Consultation request received. We'll contact you within 24 hours.",
      data: {
        id: `CONSULT-${Date.now()}`,
        ...data,
        submittedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Error processing consultation form:", error)
    return NextResponse.json(
      { error: "Failed to process form submission" },
      { status: 500 }
    )
  }
}