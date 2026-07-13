import { afterEach, describe, expect, it, vi } from "vitest"
import { POST } from "./route"

const validLead = {
  bottleneck: "admin_follow_up",
  name: "Ada Owner",
  email: "ada@example.com",
  businessName: "Ada Studio",
  businessWebsite: "https://example.com",
  timeline: "this_month",
  desiredOutcome: "Recover ten hours each week and follow up on every lead.",
  officeFax: "",
  startedAt: Date.now() - 5_000,
  sourcePage: "https://businessofone.ai/?utm_source=linkedin",
  referrer: "https://www.linkedin.com/",
  utm: { source: "linkedin", medium: "social", campaign: "solo-operators" },
}

function requestFor(body: unknown) {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

afterEach(() => {
  vi.unstubAllGlobals()
  delete process.env.UTLYZE_API_URL
})

describe("POST /api/leads", () => {
  it("rejects incomplete requests without contacting Utlyze", async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal("fetch", fetchSpy)

    const response = await POST(requestFor({ name: "Ada" }))

    expect(response.status).toBe(400)
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("drops honeypot submissions without forwarding PII", async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal("fetch", fetchSpy)

    const response = await POST(requestFor({ ...validLead, officeFax: "spam" }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("maps Business of One context into the Utlyze lead gateway", async () => {
    process.env.UTLYZE_API_URL = "https://utlyze.example/"
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ result: { data: { json: { success: true } } } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    )
    vi.stubGlobal("fetch", fetchSpy)

    const response = await POST(requestFor(validLead))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true, status: "stored" })
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe("https://utlyze.example/api/trpc/leads.create")
    const providerBody = JSON.parse(String(init.body))
    expect(providerBody.json).toMatchObject({
      name: "Ada Owner",
      email: "ada@example.com",
      company: "Ada Studio",
      role: "Solo owner via Business of One",
      engagementType: "systems_integration",
      timeline: "2_4_weeks",
      budgetRange: "prefer_not_to_say",
    })
    expect(providerBody.json.message).toContain("Source: Business of One")
    expect(providerBody.json.message).toContain("UTM: source=linkedin")
  })

  it("does not expose provider failures or show a false success", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: { message: "secret provider detail" } }), {
        status: 500,
        headers: { "content-type": "application/json" },
      }),
    )
    vi.stubGlobal("fetch", fetchSpy)

    const response = await POST(requestFor(validLead))
    const body = await response.json()

    expect(response.status).toBe(502)
    expect(body.ok).toBe(false)
    expect(body.error).not.toContain("secret provider detail")
  })
})
