import { expect, test } from "@playwright/test"
import path from "node:path"

const artifactRoot =
  process.env.QA_ARTIFACT_DIR || path.resolve(process.cwd(), "test-results")

test("homepage preserves the conversion hierarchy without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", { name: "Build a business that runs bigger than it is." }),
  ).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Where is the business getting stuck?" }),
  ).toBeVisible()

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow).toBeLessThanOrEqual(1)

  await page.screenshot({
    path: path.join(artifactRoot, `${testInfo.project.name}-first-viewport.png`),
  })
  await page.screenshot({
    path: path.join(artifactRoot, `${testInfo.project.name}-homepage.png`),
    fullPage: true,
  })
})

test("funnel advances, submits through the local gateway, and confirms only on acceptance", async ({
  page,
}) => {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, status: "stored" }),
    })
  })
  await page.goto("/")

  const heroFunnel = page.locator("#lead-funnel")
  await heroFunnel.getByRole("radio", { name: "Admin and follow-up" }).click()
  await heroFunnel.getByRole("button", { name: "Continue" }).click()

  await expect(
    heroFunnel.getByRole("heading", { name: "Where should we send your plan?" }),
  ).toBeVisible()
  await heroFunnel.getByLabel("Name", { exact: true }).fill("Ada Owner")
  await heroFunnel.getByLabel("Work email").fill("ada@example.com")
  await heroFunnel.getByLabel("Business name").fill("Ada Studio")
  await heroFunnel
    .getByLabel("What would make the next 90 days a win?")
    .fill("Recover ten hours each week and follow up on every lead.")
  await heroFunnel.getByRole("button", { name: "Request my working session" }).click()

  await expect(
    page.getByRole("heading", { name: "Your details are with Utlyze." }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Choose a time with Utlyze" }).first(),
  ).toHaveAttribute("href", "https://www.utlyze.com/booking")
})

test("provider rejection stays an error instead of becoming a false success", async ({
  page,
}) => {
  await page.route("**/api/leads", async (route) => {
    await route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        ok: false,
        error: "We could not route your request. Try again or contact Utlyze.",
      }),
    })
  })
  await page.goto("/#closing-funnel")

  const closingFunnel = page.locator("#closing-funnel")
  await closingFunnel.getByLabel("Name", { exact: true }).fill("Ada Owner")
  await closingFunnel.getByLabel("Work email").fill("ada@example.com")
  await closingFunnel.getByLabel("Business name").fill("Ada Studio")
  await closingFunnel
    .getByLabel("What would make the next 90 days a win?")
    .fill("Recover ten hours each week and follow up on every lead.")
  await closingFunnel.getByRole("button", { name: "Request my working session" }).click()

  await expect(closingFunnel.getByRole("alert")).toContainText(
    "We could not route your request",
  )
  await expect(
    page.getByRole("heading", { name: "Your details are with Utlyze." }),
  ).toHaveCount(0)
})
