import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LeadFunnel } from "./components/LeadFunnel"
import {
  agentLoop,
  briefRows,
  favoriteSkills,
  operatingSteps,
  promptContract,
  promptingPrinciples,
  smbOperatingSystem,
  sourceNotes,
} from "./content/operating-system"

const faqs = [
  {
    question: "Does 100× mean a guaranteed performance result?",
    answer:
      "No. It is the design direction: use systems and AI to remove repeatable drag and increase one owner's effective reach. The operating brief defines real baseline measures so improvement can be observed instead of advertised.",
  },
  {
    question: "Do I need a team or an existing AI stack?",
    answer:
      "No. Business of One starts with the owner, the business constraint, and the tools already in place. A simple workflow is often more useful than a complicated agent system.",
  },
  {
    question: "How much control does the AI get?",
    answer:
      "Only what the owner deliberately delegates. The operating model uses bounded tools, explicit stop conditions, verification, and human approval before consequential external actions.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "Utlyze stores the request, returns a starter brief based on the constraint you selected, and reviews your context before following up. The page does not show acceptance unless the Utlyze gateway acknowledges the request.",
  },
]

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Business of One",
      url: "https://businessofone.ai/",
      description:
        "A supervised AI operating system for solo owners across growth, sales, delivery, finance, and operations.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="hero-section">
        <header className="site-header page-width">
          <Link className="wordmark" href="/" aria-label="Business of One home">
            Business of One
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#system">The system</a>
            <a href="#skills">Skills</a>
            <a href="#prompting">Prompting</a>
            <a href="#agent-loops">Agent loops</a>
          </nav>

          <a className="button button-small header-cta" href="#lead-funnel">
            Start my brief
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="#system">The system</a>
              <a href="#skills">Favorite skills</a>
              <a href="#prompting">Prompting</a>
              <a href="#agent-loops">Agent loops</a>
              <a href="#smb-ops">SMB operations</a>
              <a href="#lead-funnel">Start my brief</a>
            </nav>
          </details>
        </header>

        <div className="hero-grid page-width">
          <div className="hero-copy">
            <p className="eyebrow">The one-person AI operating system</p>
            <h1>Run one business with the leverage of a whole team.</h1>
            <p>
              Business of One helps solo owners use supervised AI across growth,
              sales, delivery, and operations—while keeping judgment and final say.
            </p>
            <div className="hero-actions">
              <a className="button" href="#lead-funnel">
                Start my 90-day brief
              </a>
              <a className="text-link" href="#system">
                Explore the system <ArrowRight aria-hidden="true" size={19} />
              </a>
            </div>
            <p className="claim-note">
              100× is the ambition, not a guarantee. Baseline the work, automate
              what is repeatable, and measure the gain.
            </p>
          </div>

          <LeadFunnel idPrefix="hero" />
        </div>
      </section>

      <section className="process-section" id="system">
        <div className="page-width">
          <div className="section-intro split-intro">
            <div>
              <p className="section-kicker">01 / Operating system</p>
              <h2>One owner sets intent. The system carries it.</h2>
            </div>
            <p>
              AI creates leverage when it is connected to business signals,
              bounded by owner decisions, and judged by verified outcomes.
            </p>
          </div>

          <ol className="process-rail five-step-rail">
            {operatingSteps.map((step) => (
              <li key={step.number}>
                <span className="process-node" />
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <span className="system-label">{step.system}</span>
              </li>
            ))}
          </ol>

          <div className="owner-control-band">
            <div>
              <p className="section-kicker">The control plane</p>
              <h3>You supervise. Agents execute. Outcomes decide.</h3>
            </div>
            <dl>
              <div>
                <dt>Owner keeps</dt>
                <dd>Direction, trade-offs, standards, approvals</dd>
              </div>
              <div>
                <dt>Systems carry</dt>
                <dd>Research, drafts, routing, follow-up, reporting</dd>
              </div>
              <div>
                <dt>Evidence settles</dt>
                <dd>What shipped, changed, converted, or still failed</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="skills-section" id="skills">
        <div className="page-width">
          <div className="library-heading">
            <div>
              <p className="section-kicker">02 / Skill library</p>
              <h2>Favorite skills, with a job to do.</h2>
            </div>
            <p>
              A starter curation from the reviewed working library. Each skill
              earns its place by improving a real operating outcome.
            </p>
          </div>

          <div className="skill-index" role="table" aria-label="Favorite AI skills">
            <div className="skill-index-header" role="row">
              <span role="columnheader">Category</span>
              <span role="columnheader">Skill</span>
              <span role="columnheader">What it adds</span>
              <span role="columnheader">Use it when</span>
            </div>
            {favoriteSkills.map((skill, index) => (
              <div className="skill-row" role="row" key={skill.name}>
                <span className="skill-category" role="cell">
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  {skill.category}
                </span>
                <strong role="cell">{skill.name}</strong>
                <p role="cell">{skill.description}</p>
                <p role="cell">{skill.useWhen}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="prompt-section" id="prompting">
        <div className="page-width">
          <div className="prompt-heading">
            <div>
              <p className="section-kicker">03 / Prompting</p>
              <h2>Prompting that survives model changes.</h2>
            </div>
            <p>
              The durable advantage is not a clever phrase. It is a clear task
              contract, a trusted context set, and a repeatable way to evaluate
              the result.
            </p>
          </div>

          <div className="prompt-grid">
            <ol className="principle-list">
              {promptingPrinciples.map((principle) => (
                <li key={principle.number}>
                  <span>{principle.number}</span>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="prompt-specimen">
              <div className="specimen-heading">
                <span>Prompt contract / reusable specimen</span>
                <span>v1</span>
              </div>
              <pre>{promptContract}</pre>
            </div>
          </div>

          <p className="research-note">
            Research basis: clear role boundaries, relevant context, varied
            examples where useful, versioned prompts, and task-specific evals.
          </p>
        </div>
      </section>

      <section className="operations-section" id="agent-loops">
        <div className="page-width">
          <div className="operations-heading">
            <div>
              <p className="section-kicker">04 / Agent management</p>
              <h2>Run agents in loops. Run the business in rhythms.</h2>
            </div>
            <p>
              Use the simplest reliable pattern. A fixed workflow wins when the
              path is known; an agent earns autonomy only where judgment and
              adaptation are worth the added cost and risk.
            </p>
          </div>

          <div className="agent-operations-grid">
            <div className="agent-loop-panel">
              <div className="loop-owner">
                <span>You</span>
                <p>Set intent, permissions, quality, and the stop condition.</p>
              </div>
              <ol className="agent-loop-list">
                {agentLoop.map(([title, copy], index) => (
                  <li key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ops-matrix" id="smb-ops">
              <div className="matrix-heading">
                <p className="section-kicker">SMB operating matrix</p>
                <h3>Five systems to review—not five departments to hire.</h3>
              </div>
              <div className="matrix-table" role="table" aria-label="SMB operating system">
                <div className="matrix-header" role="row">
                  <span role="columnheader">Function</span>
                  <span role="columnheader">Focus</span>
                  <span role="columnheader">Key outputs</span>
                  <span role="columnheader">Rhythm</span>
                </div>
                {smbOperatingSystem.map((row) => (
                  <div className="matrix-row" role="row" key={row.function}>
                    <strong role="cell">{row.function}</strong>
                    <span role="cell">{row.focus}</span>
                    <span role="cell">{row.outputs}</span>
                    <span role="cell">{row.rhythm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lead-magnet-band">
            <div>
              <p className="section-kicker">Put the system to work</p>
              <h3>Build your 90-day AI operating brief.</h3>
            </div>
            <p>
              Clarify the constraint, map the first agent loop, and choose the
              weekly signal that tells you whether it is working.
            </p>
            <a className="button button-light" href="#lead-funnel">
              Start the brief <ArrowRight aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
      </section>

      <section className="brief-section" id="your-plan">
        <div className="brief-grid page-width">
          <div className="brief-copy">
            <p className="section-kicker">05 / The deliverable</p>
            <h2>Your 90-day operating brief.</h2>
            <p>Leave with a practical sequence, not another pile of AI ideas.</p>
            <blockquote>
              You keep ownership of the decisions. Utlyze helps install the
              operating system around them.
            </blockquote>
          </div>

          <div className="blueprint" aria-label="Example 90-day operating brief">
            <div className="blueprint-line" aria-hidden="true" />
            {briefRows.map(([title, copy], index) => (
              <div className="blueprint-row" key={title}>
                <span
                  aria-hidden="true"
                  className={`blueprint-node ${index === briefRows.length - 1 ? "complete" : ""}`}
                >
                  {index === briefRows.length - 1 ? "✓" : ""}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
            <p className="blueprint-footer">
              Prepared for your Business of One working session
            </p>
          </div>
        </div>
      </section>

      <section className="source-section" aria-labelledby="source-heading">
        <div className="source-grid page-width">
          <div>
            <p className="section-kicker">Source discipline</p>
            <h2 id="source-heading">Built to age better than an AI hot take.</h2>
          </div>
          <div>
            <p>
              The field guide combines reviewed operating playbooks with
              primary guidance on prompting, evaluations, agent patterns, and
              small-business management.
            </p>
            <ul className="source-list">
              {sourceNotes.map((source) => (
                <li key={source.href}>
                  <a href={source.href}>{source.label}</a>
                  <ArrowRight aria-hidden="true" size={17} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-grid page-width">
          <div>
            <p className="section-kicker">Before we get to work</p>
            <h2>Clear claims. Clear control.</h2>
            <p>Useful AI operations begin with honest expectations.</p>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-grid page-width">
          <div className="closing-copy">
            <p className="section-kicker">Your first operating loop</p>
            <h2>A useful first conversation, not a pitch.</h2>
            <p>
              Tell us where leverage matters most. Utlyze will review the
              operating context and come prepared with the first questions worth
              answering.
            </p>
            <ol className="assurance-list">
              <li><span>01</span>A constraint-led working session</li>
              <li><span>02</span>Your starter operating brief</li>
              <li><span>03</span>No performance theater</li>
            </ol>
          </div>

          <LeadFunnel idPrefix="closing" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner page-width">
          <div>
            <p className="wordmark">Business of One</p>
            <p>Part of the Utlyze ecosystem</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="https://www.utlyze.com/policy">Privacy</a>
            <a href="https://www.utlyze.com/terms">Terms</a>
            <a href="https://www.utlyze.com">Utlyze</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
