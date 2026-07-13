import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LeadFunnel } from "./components/LeadFunnel"

const leverageMoves = [
  {
    number: "01",
    title: "Diagnose",
    copy: "See where time, leads, and follow-up are leaking.",
  },
  {
    number: "02",
    title: "Prioritize",
    copy: "Choose the highest-leverage 90-day moves.",
  },
  {
    number: "03",
    title: "Automate",
    copy: "Turn repeatable work into reliable systems.",
  },
  {
    number: "04",
    title: "Compound",
    copy: "Review the signal and improve what is working.",
  },
]

const briefRows = [
  ["Constraint map", "Where growth is getting stuck"],
  ["Weekly priorities", "The few moves that matter now"],
  ["Automation shortlist", "What to systemize first"],
  ["Measurement plan", "What to review every Friday"],
]

const faqs = [
  {
    question: "Is the first working session really free?",
    answer:
      "Yes. The first conversation is a focused diagnosis of the constraint and the next questions worth answering. There is no obligation to continue.",
  },
  {
    question: "Do I need to be using AI already?",
    answer:
      "No. We start with the business problem, then decide whether process, automation, software, or a simpler operating habit is the right tool.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "Utlyze stores the request, reviews the context you shared, and follows up to schedule a working session. We do not show confirmation until the request is accepted by that system.",
  },
]

function OperatingNetwork() {
  return (
    <svg
      aria-hidden="true"
      className="hero-network"
      viewBox="0 0 720 620"
      fill="none"
    >
      <path d="M25 155H166V95H292V214H422V132H676" />
      <path d="M85 505H216V396H350V466H496V350H690" />
      <path d="M454 20V104H564V252H646V316" />
      <path d="M8 284H126V340H258V278H370" />
      <circle cx="166" cy="155" r="5" />
      <circle cx="292" cy="214" r="5" />
      <circle cx="422" cy="132" r="5" />
      <circle cx="216" cy="396" r="5" />
      <circle cx="350" cy="466" r="5" />
      <circle className="network-mint" cx="496" cy="350" r="7" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <section className="hero-section">
        <OperatingNetwork />

        <header className="site-header page-width">
          <Link className="wordmark" href="/" aria-label="Business of One home">
            Business of One
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#your-plan">Your plan</a>
            <a href="#faq">FAQ</a>
          </nav>

          <a className="button button-small header-cta" href="#lead-funnel">
            Get your free plan
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <span />
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              <a href="#how-it-works">How it works</a>
              <a href="#your-plan">Your plan</a>
              <a href="#faq">FAQ</a>
              <a href="#lead-funnel">Get your free plan</a>
            </nav>
          </details>
        </header>

        <div className="hero-grid page-width">
          <div className="hero-copy">
            <h1>Build a business that runs bigger than it is.</h1>
            <p>
              A focused operating system for solo owners who need more pipeline,
              fewer manual tasks, and a clear 90-day plan—without adding payroll.
            </p>
            <div className="hero-actions">
              <a className="button" href="#lead-funnel">
                Build my 90-day plan
              </a>
              <a className="text-link" href="#how-it-works">
                See how it works <ArrowRight aria-hidden="true" size={19} />
              </a>
            </div>
          </div>

          <LeadFunnel idPrefix="hero" />
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="page-width">
          <div className="section-intro split-intro">
            <h2>Four leverage moves. One focused plan.</h2>
            <p>
              We find the constraint, choose the few moves that matter, and
              install the systems that keep working after the call.
            </p>
          </div>

          <ol className="process-rail">
            {leverageMoves.map((move) => (
              <li key={move.number}>
                <span className="process-node" />
                <span className="process-number">{move.number}</span>
                <h3>{move.title}</h3>
                <p>{move.copy}</p>
              </li>
            ))}
          </ol>

          <div className="capability-split">
            <div>
              <h2>Built for the decisions only an owner can make.</h2>
              <p>Keep your judgment. Remove the drag around it.</p>
            </div>
            <div className="capability-list">
              {[
                "Pipeline clarity",
                "Delivery systems",
                "Weekly operating rhythm",
              ].map((capability) => (
                <div className="capability-row" key={capability}>
                  <span>{capability}</span>
                  <ArrowRight aria-hidden="true" size={25} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="brief-section" id="your-plan">
        <div className="brief-grid page-width">
          <div className="brief-copy">
            <h2>Your 90-day operating brief.</h2>
            <p>Leave with a practical sequence, not another pile of ideas.</p>
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

      <section className="faq-section" id="faq">
        <div className="faq-grid page-width">
          <div>
            <h2>Questions before we get to work.</h2>
            <p>Clear expectations make the first conversation useful.</p>
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
            <h2>A useful first conversation, not a pitch.</h2>
            <p>
              Tell us what is stuck. We will route the details through Utlyze
              and come prepared with the first questions worth answering.
            </p>
            <ol className="assurance-list">
              <li><span>01</span>One working session</li>
              <li><span>02</span>Your 90-day priorities</li>
              <li><span>03</span>No obligation</li>
            </ol>
          </div>

          <LeadFunnel idPrefix="closing" initialStep="details" />
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
