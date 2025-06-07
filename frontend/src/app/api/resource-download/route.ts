import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate the data
    if (!data.name || !data.email || !data.businessType || !data.resourceId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save lead to database
    // 2. Send download link via email
    // 3. Add to email marketing list
    // 4. Track download analytics
    // 5. Start nurture sequence

    console.log("Resource download request:", data)

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Resource sent to your email",
      downloadUrl: `/resources/download/${data.resourceId}`,
      data: {
        id: `DOWNLOAD-${Date.now()}`,
        ...data,
        submittedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Error processing resource download:", error)
    return NextResponse.json(
      { error: "Failed to process download request" },
      { status: 500 }
    )
  }
}