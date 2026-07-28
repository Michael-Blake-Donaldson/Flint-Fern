import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FireModel } from "../../components/FireModel";
import { FieldChecklist } from "../../components/FieldChecklist";
import { EntryCard } from "../../components/EntryCard";
import { entries } from "../../content";

const steps = [
  ["Check the place", "Confirm fires are permitted now. Use an established ring when required, clear the surrounding area, and look above for branches or dry material."],
  ["Build the material sequence", "Prepare dry tinder, pencil-thin kindling, finger-thick pieces, and larger fuel before ignition. A flame should never have to wait for preparation."],
  ["Start small", "Ignite the tinder from a sheltered side and add fine kindling gradually. Leave open paths for oxygen instead of compressing the bundle."],
  ["Grow with restraint", "Add fuel only when the existing flame can support it. Keep the fire smaller than the task requires and within the prepared boundary."],
  ["Extinguish completely", "Drown with water, stir every coal and ash pocket, then repeat until the entire area is cold to the touch. If it is too hot to touch, it is too hot to leave."],
];

export default function CampfireEntryPage() {
  return (
    <>
      <Header />
      <main className="entry-page">
        <div className="shell breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/explore?domain=Firecraft">Firecraft</Link><span>›</span><span>Building a Basic Campfire</span>
        </div>
        <section className="entry-hero">
          <div className="shell entry-hero-grid">
            <div>
              <div className="entry-labels"><span>Skill</span><span>Foundation</span><span>North America</span></div>
              <h1>Building a Basic Campfire</h1>
              <p>Learn the principles, materials, steps, and safety practices required to build and extinguish a small, controlled campfire.</p>
              <div className="review-line">
                <span>✓</span>
                <div><strong>Expert reviewed</strong><small>Last reviewed July 24, 2026 · Caution</small></div>
              </div>
            </div>
            <FireModel variant="entry" />
          </div>
        </section>
        <div className="shell entry-layout">
          <aside className="entry-toc">
            <p>On this page</p>
            <a href="#overview">Overview</a>
            <a href="#safety">Safety first</a>
            <a href="#materials">Materials</a>
            <a href="#method">Step-by-step</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#checklist">Field-ready check</a>
            <a href="#sources">Sources & review</a>
          </aside>
          <article className="entry-article">
            <section id="overview">
              <p className="kicker dark-kicker">Overview</p>
              <h2>A fire is a managed relationship.</h2>
              <p className="lead">A dependable campfire is not a pile of wood with flame added. It is a controlled balance of heat, fuel, and oxygen, shaped by material size, moisture, wind, site choice, and attention.</p>
              <p>This entry explains the general educational principles behind a small recreational fire. It does not override closures, restrictions, local law, land-manager rules, or professional instruction.</p>
              <div className="concept-grid" aria-label="Fire triangle">
                <div><span>01</span><strong>Heat</strong><p>Enough energy to sustain combustion</p></div>
                <div><span>02</span><strong>Fuel</strong><p>Dry material in a usable sequence</p></div>
                <div><span>03</span><strong>Oxygen</strong><p>Open paths for air to reach the flame</p></div>
              </div>
            </section>
            <section id="safety">
              <div className="safety-callout">
                <span className="safety-icon" aria-hidden="true">!</span>
                <div>
                  <p className="kicker">Safety before method</p>
                  <h2>Do not build a fire because you can. Build one only when you should.</h2>
                  <p>Verify current restrictions with the responsible land agency. Avoid fire in high wind, drought, inadequate clear space, or whenever full extinguishment is uncertain.</p>
                  <a href="https://www.nifc.gov/fire-information/fire-prevention-education-mitigation/wildfire-prevention" rel="noreferrer">Review official wildfire prevention guidance →</a>
                </div>
              </div>
            </section>
            <section id="materials">
              <p className="kicker dark-kicker">Material sequence</p>
              <h2>Increase size as the flame gains strength.</h2>
              <div className="material-scale">
                <article><span>1</span><div><h3>Tinder</h3><p>Fine, dry material that accepts the first spark or flame.</p></div><b>Matchstick & finer</b></article>
                <article><span>2</span><div><h3>Kindling</h3><p>Small, dry pieces that bridge tinder to sustainable fuel.</p></div><b>Pencil to finger</b></article>
                <article><span>3</span><div><h3>Fuel wood</h3><p>Larger pieces that extend heat after the structure is stable.</p></div><b>Thumb & larger</b></article>
              </div>
            </section>
            <section id="method">
              <p className="kicker dark-kicker">Method</p>
              <h2>Five deliberate stages</h2>
              <ol className="method-steps">
                {steps.map(([title, body], index) => (
                  <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>
                ))}
              </ol>
            </section>
            <section id="mistakes">
              <p className="kicker dark-kicker">Troubleshooting</p>
              <h2>Common mistakes</h2>
              <div className="mistake-grid">
                <article><h3>Adding large fuel too early</h3><p>Heavy pieces absorb heat and can smother the flame before the kindling is established.</p><strong>Return to a smaller, drier material sequence.</strong></article>
                <article><h3>Packing the lay too tightly</h3><p>Combustion weakens when air cannot move through the structure.</p><strong>Rebuild with visible air gaps and stable support.</strong></article>
                <article><h3>Trusting a quiet ash bed</h3><p>Buried coals can remain hot and reignite after surface flame disappears.</p><strong>Water, stir, and physically confirm coldness.</strong></article>
              </div>
            </section>
            <section id="checklist"><FieldChecklist /></section>
            <section id="sources" className="sources-section">
              <p className="kicker dark-kicker">Sources & review record</p>
              <h2>Evidence behind this entry</h2>
              <ol>
                <li><a href="https://www.nps.gov/articles/000/idkt_firewood.htm" rel="noreferrer">National Park Service · Campfire and firewood guidance</a><span>Official source · Accessed July 2026</span></li>
                <li><a href="https://www.fs.usda.gov/visit/know-before-you-go/fire" rel="noreferrer">U.S. Forest Service · Fire safety</a><span>Official source · Accessed July 2026</span></li>
                <li><a href="https://lnt.org/why/7-principles/minimize-campfire-impacts/" rel="noreferrer">Leave No Trace · Minimize campfire impacts</a><span>Authoritative secondary · Accessed July 2026</span></li>
              </ol>
              <div className="review-record"><span>✓</span><div><strong>Reviewed for structure, safety, and source quality</strong><p>Next scheduled review: July 2027, or earlier upon authoritative change.</p></div><a href="mailto:corrections@bakbone.example?subject=Correction%3A%20Building%20a%20Basic%20Campfire">Report a correction</a></div>
            </section>
          </article>
        </div>
        <section className="section related-section">
          <div className="shell">
            <div className="section-heading split"><div><p className="kicker dark-kicker">Connected knowledge</p><h2>Continue through Firecraft</h2></div><Link className="text-link" href="/explore?domain=Firecraft">Explore Firecraft →</Link></div>
            <div className="entry-grid">{entries.slice(5, 8).map((entry) => <EntryCard key={entry.slug} entry={entry} />)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
