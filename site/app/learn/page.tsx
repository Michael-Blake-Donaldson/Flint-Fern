import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { guides } from "../content";

export default function LearnPage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subhero learn-hero">
          <div className="shell subhero-grid">
            <div>
              <p className="kicker dark-kicker">Curated learning paths</p>
              <h1>Competence grows one connection at a time.</h1>
              <p>Guides organize the encyclopedia around a real goal. Open any entry, skip what you know, and move at your own pace—no account required.</p>
            </div>
            <div className="learning-orbit" aria-hidden="true">
              <i>Map</i><i>Water</i><i>Weather</i><i>Safety</i><strong>YOU</strong>
            </div>
          </div>
        </section>
        <section className="shell section">
          <div className="section-heading split">
            <div><p className="kicker dark-kicker">Foundation guides</p><h2>Choose your next field goal</h2></div>
            <p className="section-note">Progress is stored only on this device.</p>
          </div>
          <div className="learning-grid">
            {guides.map((guide, index) => (
              <article className="learning-card" key={guide.title}>
                <div className="learning-card-top">
                  <span>0{index + 1}</span>
                  <small>{guide.level}</small>
                </div>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
                <dl>
                  <div><dt>Entries</dt><dd>{guide.entries}</dd></div>
                  <div><dt>Estimated</dt><dd>{guide.time}</dd></div>
                  <div><dt>Prerequisite</dt><dd>{index === 0 ? "None" : "Basic safety"}</dd></div>
                </dl>
                <div className="guide-progress"><i style={{ width: `${guide.progress * 10}%` }} /></div>
                <Link className="button button--pine" href={index === 1 ? "/entry/building-a-basic-campfire" : "/explore"}>Open guide <span>→</span></Link>
              </article>
            ))}
          </div>
        </section>
        <section className="learning-principle">
          <div className="shell principle-grid">
            <h2>No points.<br />No streaks.<br /><em>Just readiness.</em></h2>
            <div>
              <p>Bakbone learning guides are built to prepare you for responsible practice, not to manufacture engagement.</p>
              <ul>
                <li>Visible prerequisites and safety context</li>
                <li>Field-ready checklists, not abstract completion</li>
                <li>Direct links back into the full encyclopedia</li>
                <li>Every core entry remains freely accessible</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
