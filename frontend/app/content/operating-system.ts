export const operatingSteps = [
  {
    number: "01",
    title: "Sense",
    copy: "Collect the customer, pipeline, delivery, and cash signals that deserve attention.",
    system: "Dashboards + intake",
  },
  {
    number: "02",
    title: "Decide",
    copy: "Choose the constraint, trade-offs, and standard before asking AI to execute.",
    system: "Rules + scorecards",
  },
  {
    number: "03",
    title: "Ship",
    copy: "Turn owner decisions into campaigns, follow-up, deliverables, and operating assets.",
    system: "Agents + workflows",
  },
  {
    number: "04",
    title: "Verify",
    copy: "Check the real outcome, not the model's claim that the task is complete.",
    system: "Proof + approvals",
  },
  {
    number: "05",
    title: "Compound",
    copy: "Keep what works as a reusable skill, prompt, template, or automation.",
    system: "Library + cadence",
  },
] as const

export const favoriteSkills = [
  {
    category: "Design",
    name: "design-taste-frontend",
    description: "Turns product intent into a distinctive, legible interface without default AI aesthetics.",
    useWhen: "A page works, but does not yet feel considered or conversion-ready.",
  },
  {
    category: "Build",
    name: "frontend-app-builder",
    description: "Keeps production web work grounded in the current codebase, design system, and real states.",
    useWhen: "A design needs to become responsive, accessible, tested product code.",
  },
  {
    category: "Prompting",
    name: "prompt-engineer",
    description: "Provides a starting structure for turning vague requests into explicit task contracts.",
    useWhen: "Outputs are inconsistent because goals, context, or acceptance criteria are missing.",
  },
  {
    category: "Agents",
    name: "multi-agent-patterns",
    description: "Separates work by context and ownership, then brings evidence back to one supervisor.",
    useWhen: "Independent research or production lanes can run in parallel without shared-state risk.",
  },
  {
    category: "Growth",
    name: "lead-gen-crm",
    description: "Connects discovery, qualification, source attribution, CRM routing, and follow-up as one funnel.",
    useWhen: "Interest exists, but lead context is lost between the website and the sales process.",
  },
  {
    category: "Truth",
    name: "attribution-truth-audit",
    description: "Keeps observed activity, inferred influence, and proven business impact in separate lanes.",
    useWhen: "A dashboard or AI summary is at risk of overstating what actually caused the result.",
  },
] as const

export const promptingPrinciples = [
  {
    number: "01",
    title: "Name the outcome",
    copy: "Describe the decision or artifact you need and what makes it useful. Do not begin with a bag of tactics.",
  },
  {
    number: "02",
    title: "Curate the context",
    copy: "Provide the smallest high-signal source set, its freshness, and what the model must not treat as truth.",
  },
  {
    number: "03",
    title: "Set the boundaries",
    copy: "State permissions, exclusions, budget, audience, tone, and the conditions that require a question or stop.",
  },
  {
    number: "04",
    title: "Define the contract",
    copy: "Specify the format, required fields, level of detail, and an explicit definition of done.",
  },
  {
    number: "05",
    title: "Show examples when needed",
    copy: "Use a few varied input/output examples when shape or classification matters more than explanation.",
  },
  {
    number: "06",
    title: "Evaluate and version",
    copy: "Test representative cases, inspect failures, and change prompts through the same review path as code.",
  },
] as const

export const promptContract = `# ROLE
You are the operating partner for a solo owner.

# OUTCOME
Create: {artifact or decision}
Success means: {observable criteria}

# CONTEXT
Use: {trusted sources + freshness}
Treat as unverified: {assumptions or open web}

# BOUNDARIES
May do: {allowed actions}
Must not: {excluded or approval-gated actions}

# OUTPUT
Format: {sections, table, schema}
Include: evidence, risks, recommended next move

# CHECK
Verify the final state against the success criteria.`

export const agentLoop = [
  ["Plan", "Define the objective, inputs, owner, limits, and proof of done."],
  ["Act", "Use the narrowest capable tool or specialist for the current step."],
  ["Observe", "Read the returned state, errors, cost, and new evidence."],
  ["Verify", "Test the outcome against a real artifact, system, or acceptance check."],
  ["Escalate", "Stop for the owner when risk, ambiguity, or authority exceeds the brief."],
] as const

export const smbOperatingSystem = [
  {
    function: "Growth",
    focus: "Positioning + demand",
    outputs: "ICP, offer, content, channel experiments",
    rhythm: "Weekly",
  },
  {
    function: "Sales",
    focus: "Pipeline + conversion",
    outputs: "Qualification, follow-up, proposals, forecast",
    rhythm: "Weekly",
  },
  {
    function: "Delivery",
    focus: "Outcomes + customer success",
    outputs: "Project plans, SOPs, QA, client updates",
    rhythm: "Weekly",
  },
  {
    function: "Finance",
    focus: "Cash + unit economics",
    outputs: "Receivables, cash view, margin, cost decisions",
    rhythm: "Weekly",
  },
  {
    function: "Risk",
    focus: "Permissions + resilience",
    outputs: "Approval gates, access review, backups, compliance",
    rhythm: "Monthly",
  },
] as const

export const briefRows = [
  ["Constraint map", "The operating bottleneck to address first"],
  ["90-day sequence", "A small set of moves in the right order"],
  ["Agent loop", "Where AI acts, verifies, and asks for approval"],
  ["Weekly scorecard", "The signals that decide what happens next"],
] as const

export const sourceNotes = [
  {
    label: "OpenAI prompt engineering",
    href: "https://developers.openai.com/api/docs/guides/prompt-engineering",
  },
  {
    label: "OpenAI evaluation guidance",
    href: "https://developers.openai.com/api/docs/guides/evaluation-best-practices",
  },
  {
    label: "Anthropic: building effective agents",
    href: "https://www.anthropic.com/engineering/building-effective-agents",
  },
  {
    label: "SBA small-business operations",
    href: "https://www.sba.gov/business-guide/manage-your-business",
  },
] as const
