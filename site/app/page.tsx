import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FireModel } from "./components/FireModel";
import { HomeSearch } from "./components/HomeSearch";
import { EntryCard } from "./components/EntryCard";
import { domains, entries, guides } from "./content";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <Header dark />
          <div className="hero-landscape" aria-hidden="true">
            <div className="moon" />
            <div className="ridge ridge-far" />
            <div className="ridge ridge-near" />
            <div className="trees trees-back" />
            <div className="trees trees-front" />
          </div>
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="kicker">North American field knowledge · Built to grow worldwide</p>
              <h1>The outdoors,<br /><em>understood.</em></h1>
              <p className="hero-deck">
                A trusted, interconnected encyclopedia for the skills, species, tools,
                and systems that shape the wild.
              </p>
              <HomeSearch />
            </div>
            <FireModel variant="hero" />
          </div>
          <div className="shell hero-status">
            <span><b>1,240</b> connected entries</span>
            <span><b>100%</b> sourced & reviewed</span>
            <span><b>64</b> field-ready offline</span>
          </div>
        </section>

        <section className="path-section section" aria-labelledby="choose-path">
          <div className="shell">
            <div className="section-heading center">
              <p className="kicker dark-kicker">Begin where you are</p>
              <h2 id="choose-path">Three ways into the wild</h2>
              <p>Browse freely, follow a dependable learning path, or narrow a possible match by what you can observe.</p>
            </div>
            <div className="path-grid">
              <Link className="path-card" href="/explore">
                <span className="path-number">01</span>
                <span className="path-icon" aria-hidden="true">⌕</span>
                <h3>Explore</h3>
                <p>Search, filter, compare, and follow meaningful connections across the encyclopedia.</p>
                <strong>Open the encyclopedia <span>→</span></strong>
              </Link>
              <Link className="path-card featured" href="/learn">
                <span className="path-number">02</span>
                <span className="path-icon" aria-hidden="true">↗</span>
                <h3>Learn</h3>
                <p>Build competence through ordered guides with visible prerequisites and no pressure.</p>
                <strong>Choose a learning path <span>→</span></strong>
              </Link>
              <Link className="path-card" href="/identify">
                <span className="path-number">03</span>
                <span className="path-icon" aria-hidden="true">◎</span>
                <h3>Identify</h3>
                <p>Compare species, tracks, signs, plants, fish, and fungi without false certainty.</p>
                <strong>Start identifying <span>→</span></strong>
              </Link>
            </div>
          </div>
        </section>

        <section className="discipline-section section">
          <div className="shell">
            <div className="section-heading split">
              <div>
                <p className="kicker dark-kicker">The knowledge atlas</p>
                <h2>Explore by discipline</h2>
              </div>
              <Link className="text-link" href="/explore">View all 18 domains <span>→</span></Link>
            </div>
            <div className="discipline-grid">
              {domains.map(([name, description, mark, tone]) => (
                <Link className={`discipline-card discipline-card--${tone}`} href={`/explore?domain=${encodeURIComponent(name)}`} key={name}>
                  <span className="discipline-mark" aria-hidden="true">{mark}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <span className="mini-link">Explore discipline →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="feature-section section">
          <div className="shell feature-grid">
            <div className="feature-copy">
              <p className="kicker">Signature interactive · Firecraft</p>
              <h2>Understand the system,<br />not just the steps.</h2>
              <p>
                Explore a controlled fire as a living relationship between heat, fuel,
                oxygen, weather, and judgment. The model is optional; the knowledge never is.
              </p>
              <ul className="feature-list">
                <li><span>01</span> Read the fire triangle in context</li>
                <li><span>02</span> Compare tinder, kindling, and fuel</li>
                <li><span>03</span> Adapt structure to real conditions</li>
                <li><span>04</span> Extinguish until cold to the touch</li>
              </ul>
              <Link className="button button--canvas" href="/entry/building-a-basic-campfire">Open Firecraft entry <span>→</span></Link>
            </div>
            <div className="feature-model">
              <FireModel variant="exhibit" />
              <div className="model-label">
                <span>01</span>
                <div><strong>Stable flame</strong><small>Balanced heat, fuel & oxygen</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section latest-section">
          <div className="shell">
            <div className="section-heading split">
              <div>
                <p className="kicker dark-kicker">Recently reviewed</p>
                <h2>Knowledge worth returning to</h2>
              </div>
              <Link className="text-link" href="/explore">Browse all entries <span>→</span></Link>
            </div>
            <div className="entry-grid">
              {entries.slice(0, 6).map((entry) => <EntryCard entry={entry} key={entry.slug} />)}
            </div>
          </div>
        </section>

        <section className="section learn-preview">
          <div className="shell learn-grid">
            <div className="learn-intro">
              <p className="kicker dark-kicker">Learning without pressure</p>
              <h2>Start with your first night outside.</h2>
              <p>A complete beginner path through planning, shelter, sleep, water, food, weather, wildlife, and breaking camp.</p>
              <Link className="button button--pine" href="/learn">Explore learning guides <span>→</span></Link>
            </div>
            <div className="guide-stack">
              {guides.map((guide, index) => (
                <article className="guide-row" key={guide.title}>
                  <span className="guide-number">0{index + 1}</span>
                  <div>
                    <small>{guide.level} · {guide.entries} entries · {guide.time}</small>
                    <h3>{guide.title}</h3>
                    <p>{guide.summary}</p>
                    <div className="guide-progress"><i style={{ width: `${guide.progress * 10}%` }} /></div>
                  </div>
                  <Link href="/learn" aria-label={`Open ${guide.title}`}>→</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-section section" id="trust">
          <div className="shell trust-grid">
            <div className="trust-statement" id="mission">
              <p className="kicker">Why trust Bakbone?</p>
              <h2>Trust is not a badge.<br />It is a visible process.</h2>
            </div>
            <div className="trust-points">
              <article><span>✓</span><div><h3>Sources you can inspect</h3><p>Every public entry shows its evidence and further reading.</p></div></article>
              <article><span>↻</span><div><h3>Review dates that mean something</h3><p>Higher-risk guidance receives a shorter, stricter review cycle.</p></div></article>
              <article><span>≠</span><div><h3>Uncertainty stays visible</h3><p>Regional variation, disagreement, and possible matches are not flattened into certainty.</p></div></article>
              <article><span>!</span><div><h3>Safety before engagement</h3><p>Essential knowledge is never buried behind decoration, an account, or a paywall.</p></div></article>
            </div>
          </div>
        </section>

        <section className="field-preview section">
          <div className="shell field-card">
            <div className="field-map" aria-hidden="true">
              <i /><i /><i /><i />
              <span>46.82° N<br />121.73° W</span>
            </div>
            <div className="field-copy">
              <p className="kicker dark-kicker">Field Guide · Offline ready</p>
              <h2>Knowledge that goes beyond the signal.</h2>
              <p>Collect the essential entries for a place or trip. See package size, freshness, and time-sensitive notices before downloading.</p>
              <div className="field-stats">
                <span><b>12</b> entries</span><span><b>18.4 MB</b> estimated</span><span><b>4</b> safety essentials</span>
              </div>
              <Link className="button button--pine" href="/field-guide">Build a field guide <span>→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
