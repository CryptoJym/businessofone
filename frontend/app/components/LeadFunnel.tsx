"use client"

import { FormEvent, useId, useRef, useState } from "react"
import { ArrowLeft, Check, Loader2 } from "lucide-react"

type Bottleneck =
  | "finding_clients"
  | "delivering_work"
  | "admin_follow_up"
  | "clear_plan"

type LeadFunnelProps = {
  idPrefix: string
  initialStep?: "bottleneck" | "details"
}

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success" }

const bottlenecks: Array<{ value: Bottleneck; label: string }> = [
  { value: "finding_clients", label: "Finding clients" },
  { value: "delivering_work", label: "Delivering the work" },
  { value: "admin_follow_up", label: "Admin and follow-up" },
  { value: "clear_plan", label: "I need a clear plan" },
]

function readField(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

export function LeadFunnel({
  idPrefix,
  initialStep = "bottleneck",
}: LeadFunnelProps) {
  const reactId = useId().replace(/:/g, "")
  const fieldId = (name: string) => `${idPrefix}-${reactId}-${name}`
  const startedAt = useRef(Date.now())
  const [step, setStep] = useState<"bottleneck" | "details">(initialStep)
  const [bottleneck, setBottleneck] = useState<Bottleneck>(
    initialStep === "details" ? "clear_plan" : "finding_clients",
  )
  const [stepError, setStepError] = useState("")
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" })

  function continueToDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!bottleneck) {
      setStepError("Choose the area that needs attention first.")
      return
    }
    setStepError("")
    setStep("details")
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setSubmission({ status: "submitting" })

    try {
      const params = new URLSearchParams(window.location.search)
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          bottleneck,
          name: readField(formData, "name"),
          email: readField(formData, "email"),
          businessName: readField(formData, "businessName"),
          businessWebsite: readField(formData, "businessWebsite"),
          timeline: readField(formData, "timeline"),
          desiredOutcome: readField(formData, "desiredOutcome"),
          officeFax: readField(formData, "officeFax"),
          startedAt: startedAt.current,
          sourcePage: window.location.href,
          referrer: document.referrer,
          utm: {
            source: params.get("utm_source") || "",
            medium: params.get("utm_medium") || "",
            campaign: params.get("utm_campaign") || "",
          },
        }),
      })

      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      if (!response.ok || !body.ok) {
        throw new Error(body.error || "We could not route your request.")
      }

      form.reset()
      setSubmission({ status: "success" })
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not route your request. Try again or contact Utlyze.",
      })
    }
  }

  if (submission.status === "success") {
    return (
      <section className="funnel-panel funnel-success" id={`${idPrefix}-funnel`}>
        <span className="success-mark" aria-hidden="true">
          <Check size={24} />
        </span>
        <p className="step-label">Request accepted</p>
        <h2>Your details are with Utlyze.</h2>
        <p>
          The request has been stored. The team will review your constraint and
          follow up with the next useful questions.
        </p>
        <a className="button" href="https://www.utlyze.com/booking">
          Choose a time with Utlyze
        </a>
      </section>
    )
  }

  if (step === "bottleneck") {
    return (
      <form
        className="funnel-panel"
        id={idPrefix === "hero" ? "lead-funnel" : `${idPrefix}-funnel`}
        onSubmit={continueToDetails}
      >
        <div className="funnel-heading">
          <div>
            <h2>Where is the business getting stuck?</h2>
            <p className="step-label">Step 1 of 2</p>
          </div>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span />
        </div>
        <div className="choice-list" role="radiogroup" aria-label="Primary bottleneck">
          {bottlenecks.map((option) => (
            <button
              aria-checked={bottleneck === option.value}
              className={`choice ${bottleneck === option.value ? "selected" : ""}`}
              key={option.value}
              onClick={() => setBottleneck(option.value)}
              role="radio"
              type="button"
            >
              <span className="choice-control" aria-hidden="true" />
              {option.label}
            </button>
          ))}
        </div>
        {stepError ? <p className="form-error" role="alert">{stepError}</p> : null}
        <button className="button funnel-submit" type="submit">
          Continue
        </button>
      </form>
    )
  }

  return (
    <form
      className="funnel-panel details-panel"
      id={idPrefix === "hero" ? "lead-funnel" : `${idPrefix}-funnel`}
      onSubmit={submitLead}
    >
      <div className="funnel-heading details-heading">
        <div>
          <h2>Where should we send your plan?</h2>
          <p className="step-label">Step 2 of 2</p>
        </div>
        {initialStep !== "details" ? (
          <button
            className="back-button"
            onClick={() => setStep("bottleneck")}
            type="button"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back
          </button>
        ) : null}
      </div>
      <div className="progress-track complete" aria-hidden="true">
        <span />
      </div>

      <div className="field-grid">
        <label htmlFor={fieldId("name")}>
          Name
          <input id={fieldId("name")} name="name" autoComplete="name" required minLength={2} />
        </label>
        <label htmlFor={fieldId("email")}>
          Work email
          <input id={fieldId("email")} name="email" type="email" autoComplete="email" required />
        </label>
        <label htmlFor={fieldId("businessName")}>
          Business name
          <input
            id={fieldId("businessName")}
            name="businessName"
            autoComplete="organization"
            required
          />
        </label>
        <label htmlFor={fieldId("businessWebsite")}>
          Website <span>(optional)</span>
          <input
            id={fieldId("businessWebsite")}
            name="businessWebsite"
            type="url"
            autoComplete="url"
            placeholder="https://"
          />
        </label>
        <label htmlFor={fieldId("timeline")}>
          Timeline
          <select id={fieldId("timeline")} name="timeline" defaultValue="this_month">
            <option value="this_week">This week</option>
            <option value="this_month">This month</option>
            <option value="next_90_days">Next 90 days</option>
            <option value="exploring">Still exploring</option>
          </select>
        </label>
        <label className="full-field" htmlFor={fieldId("desiredOutcome")}>
          What would make the next 90 days a win?
          <textarea
            id={fieldId("desiredOutcome")}
            name="desiredOutcome"
            rows={3}
            required
            minLength={10}
          />
        </label>
        <label className="honeypot" htmlFor={fieldId("officeFax")} aria-hidden="true">
          Office fax
          <input
            id={fieldId("officeFax")}
            name="officeFax"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <button
        className="button funnel-submit"
        disabled={submission.status === "submitting"}
        type="submit"
      >
        {submission.status === "submitting" ? (
          <><Loader2 className="spinner" size={20} aria-hidden="true" /> Routing your request</>
        ) : (
          "Request my working session"
        )}
      </button>
      <p className="form-helper">
        Your request is stored by Utlyze before we show confirmation.
      </p>
      {submission.status === "error" ? (
        <div className="form-error" role="alert">
          <p>{submission.message}</p>
          <a href="https://www.utlyze.com/contact">Contact Utlyze</a>
        </div>
      ) : null}
    </form>
  )
}
