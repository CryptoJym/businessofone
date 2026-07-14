"use client"

import { FormEvent, useEffect, useId, useRef, useState } from "react"
import { ArrowLeft, Check, Loader2 } from "lucide-react"

type Bottleneck =
  | "finding_clients"
  | "delivering_work"
  | "admin_follow_up"
  | "finance_visibility"
  | "clear_plan"

type LeadFunnelProps = {
  idPrefix: "hero" | "closing"
}

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "success" }

const bottlenecks: Array<{ value: Bottleneck; label: string }> = [
  { value: "finding_clients", label: "Growth and demand" },
  { value: "delivering_work", label: "Delivery capacity" },
  { value: "admin_follow_up", label: "Sales follow-up and admin" },
  { value: "finance_visibility", label: "Cash and financial visibility" },
  { value: "clear_plan", label: "Strategy and operating rhythm" },
]

const starterBriefs: Record<
  Bottleneck,
  { firstMove: string; system: string; weeklySignal: string }
> = {
  finding_clients: {
    firstMove: "Define one ideal customer, one urgent problem, and one offer worth a conversation.",
    system: "Create a repeatable demand-to-follow-up loop with source attribution.",
    weeklySignal: "Qualified conversations created",
  },
  delivering_work: {
    firstMove: "Map the delivery step that consumes owner time without improving the outcome.",
    system: "Turn the repeatable path into a brief, workflow, quality check, and exception lane.",
    weeklySignal: "Owner hours per completed outcome",
  },
  admin_follow_up: {
    firstMove: "List every handoff where a lead, task, or promise can quietly disappear.",
    system: "Install one intake, owner, next-action rule, and overdue review.",
    weeklySignal: "Open items without a next action",
  },
  finance_visibility: {
    firstMove: "Create a weekly view of cash, receivables, recurring cost, and delivery margin.",
    system: "Connect the source records to one review-ready operating scorecard.",
    weeklySignal: "Cash and receivables reviewed on schedule",
  },
  clear_plan: {
    firstMove: "Choose the single constraint that limits the next 90 days of progress.",
    system: "Build a weekly decide, ship, verify, and compound rhythm around it.",
    weeklySignal: "Priority outcomes verified",
  },
}

function readField(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value.trim() : ""
}

export function LeadFunnel({ idPrefix }: LeadFunnelProps) {
  const reactId = useId().replace(/:/g, "")
  const fieldId = (name: string) => `${idPrefix}-${reactId}-${name}`
  const startedAt = useRef(Date.now())
  const stateHeadingRef = useRef<HTMLHeadingElement>(null)
  const [step, setStep] = useState<"bottleneck" | "details">("bottleneck")
  const [bottleneck, setBottleneck] = useState<Bottleneck | null>(null)
  const [stepError, setStepError] = useState("")
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" })

  useEffect(() => {
    if (step === "details" || submission.status === "success") {
      stateHeadingRef.current?.focus()
    }
  }, [step, submission.status])

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
    if (!bottleneck) {
      setStep("bottleneck")
      setStepError("Choose the area where leverage matters first.")
      return
    }

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
          aiMaturity: readField(formData, "aiMaturity"),
          officeFax: readField(formData, "officeFax"),
          funnelLocation: idPrefix,
          startedAt: startedAt.current,
          sourcePage: window.location.href,
          referrer: document.referrer,
          utm: {
            source: params.get("utm_source") || "",
            medium: params.get("utm_medium") || "",
            campaign: params.get("utm_campaign") || "",
            content: params.get("utm_content") || "",
            term: params.get("utm_term") || "",
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

  if (submission.status === "success" && bottleneck) {
    const starterBrief = starterBriefs[bottleneck]

    return (
      <section className="funnel-panel funnel-success" id={`${idPrefix}-funnel`}>
        <span className="success-mark" aria-hidden="true">
          <Check size={24} />
        </span>
        <p className="step-label">Request accepted</p>
        <h2 ref={stateHeadingRef} tabIndex={-1}>Your request is with Utlyze.</h2>
        <p>
          The request has been stored. Here is the starting point tied to the
          constraint you selected.
        </p>
        <dl className="starter-brief">
          <div>
            <dt>First move</dt>
            <dd>{starterBrief.firstMove}</dd>
          </div>
          <div>
            <dt>System to build</dt>
            <dd>{starterBrief.system}</dd>
          </div>
          <div>
            <dt>Weekly signal</dt>
            <dd>{starterBrief.weeklySignal}</dd>
          </div>
        </dl>
        <a className="button" href="https://www.utlyze.com/booking">
          Continue with Utlyze
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
          <h2>Where could leverage change the business fastest?</h2>
            <p className="step-label">Step 1 of 2</p>
          </div>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span />
        </div>
        <fieldset className="choice-list">
          <legend className="sr-only">Choose the primary operating constraint</legend>
          {bottlenecks.map((option) => (
            <label
              className={`choice ${bottleneck === option.value ? "selected" : ""}`}
              key={option.value}
            >
              <input
                checked={bottleneck === option.value}
                className="choice-input"
                name={`${idPrefix}-bottleneck`}
                onChange={() => {
                  setBottleneck(option.value)
                  setStepError("")
                }}
                type="radio"
                value={option.value}
              />
              <span className="choice-control" aria-hidden="true" />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
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
          <h2 ref={stateHeadingRef} tabIndex={-1}>
            Where should Utlyze follow up?
          </h2>
          <p className="step-label">Step 2 of 2</p>
        </div>
        <button
          className="back-button"
          onClick={() => setStep("bottleneck")}
          type="button"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </button>
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
        <label htmlFor={fieldId("aiMaturity")}>
          Current AI operating level
          <select id={fieldId("aiMaturity")} name="aiMaturity" defaultValue="ad_hoc">
            <option value="not_yet">Not using AI yet</option>
            <option value="ad_hoc">Ad hoc chats and tools</option>
            <option value="repeatable">Repeatable prompts or workflows</option>
            <option value="agentic">Managed agent loops</option>
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
        aria-busy={submission.status === "submitting"}
        className="button funnel-submit"
        disabled={submission.status === "submitting"}
        type="submit"
      >
        {submission.status === "submitting" ? (
          <><Loader2 className="spinner" size={20} aria-hidden="true" /> Routing your request</>
        ) : (
          "Create my starter brief"
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
