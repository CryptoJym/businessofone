import { NextResponse } from "next/server"
import { z } from "zod"

const leadSchema = z.object({
  bottleneck: z.enum([
    "finding_clients",
    "delivering_work",
    "admin_follow_up",
    "clear_plan",
  ]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  businessName: z.string().trim().min(1).max(160),
  businessWebsite: z.union([z.string().trim().url().max(500), z.literal("")]),
  timeline: z.enum(["this_week", "this_month", "next_90_days", "exploring"]),
  desiredOutcome: z.string().trim().min(10).max(2_000),
  officeFax: z.string().max(200).optional().default(""),
  startedAt: z.number().int().positive(),
  sourcePage: z.string().trim().max(1_000),
  referrer: z.string().trim().max(1_000),
  utm: z
    .object({
      source: z.string().trim().max(160),
      medium: z.string().trim().max(160),
      campaign: z.string().trim().max(160),
    })
    .default({ source: "", medium: "", campaign: "" }),
})

type LeadInput = z.infer<typeof leadSchema>

const bottleneckLabels: Record<LeadInput["bottleneck"], string> = {
  finding_clients: "Finding clients",
  delivering_work: "Delivering the work",
  admin_follow_up: "Admin and follow-up",
  clear_plan: "Needs a clear plan",
}

const timelineMap: Record<LeadInput["timeline"], "asap" | "2_4_weeks" | "1_3_months" | "flexible"> = {
  this_week: "asap",
  this_month: "2_4_weeks",
  next_90_days: "1_3_months",
  exploring: "flexible",
}

const engagementMap: Record<
  LeadInput["bottleneck"],
  "build_sprint" | "systems_integration" | "not_sure"
> = {
  finding_clients: "build_sprint",
  delivering_work: "systems_integration",
  admin_follow_up: "systems_integration",
  clear_plan: "not_sure",
}

function cleanBaseUrl(value: string | undefined) {
  return (value?.trim() || "https://api.utlyze.ai").replace(/\/$/, "")
}

function buildUtlyzeLead(input: LeadInput) {
  const context = [
    "Source: Business of One (businessofone.ai)",
    `Primary bottleneck: ${bottleneckLabels[input.bottleneck]}`,
    `Desired 90-day outcome: ${input.desiredOutcome}`,
    input.businessWebsite ? `Business website: ${input.businessWebsite}` : "Business website: not provided",
    `Source page: ${input.sourcePage || "not reported"}`,
    input.referrer ? `Referrer: ${input.referrer}` : "Referrer: direct or not reported",
    input.utm.source || input.utm.medium || input.utm.campaign
      ? `UTM: source=${input.utm.source || "-"}; medium=${input.utm.medium || "-"}; campaign=${input.utm.campaign || "-"}`
      : "UTM: not reported",
  ]

  return {
    name: input.name,
    email: input.email,
    company: input.businessName,
    role: "Solo owner via Business of One",
    message: context.join("\n"),
    engagementType: engagementMap[input.bottleneck],
    timeline: timelineMap[input.timeline],
    budgetRange: "prefer_not_to_say" as const,
  }
}

function isTrpcError(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload.some((item) => Boolean(item && typeof item === "object" && "error" in item))
  }
  return Boolean(payload && typeof payload === "object" && "error" in payload)
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Check the required fields and try again." },
      { status: 400 },
    )
  }

  // Quietly accept bot-filled submissions without forwarding their payload.
  if (parsed.data.officeFax) {
    return NextResponse.json({ ok: true })
  }

  const lead = buildUtlyzeLead(parsed.data)
  const gatewayUrl = `${cleanBaseUrl(process.env.UTLYZE_API_URL)}/api/trpc/leads.create`

  try {
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "businessofone.ai/lead-funnel",
      },
      // Utlyze's current tRPC gateway uses SuperJSON for request input.
      body: JSON.stringify({ json: lead }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    })

    const responseBody = await response.json().catch(() => null)
    if (!response.ok || isTrpcError(responseBody)) {
      return NextResponse.json(
        { ok: false, error: "We could not route your request. Try again or contact Utlyze." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true, status: "stored" })
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not route your request. Try again or contact Utlyze." },
      { status: 502 },
    )
  }
}
