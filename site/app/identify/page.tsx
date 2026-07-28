import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { IdentifyClient } from "../components/IdentifyClient";

export default function IdentifyPage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subhero identify-hero">
          <div className="shell">
            <p className="kicker dark-kicker">Trait-based identification</p>
            <h1>Observe first.<br />Compare carefully.</h1>
            <p>Narrow possible species and signs by visible characteristics. WildAtlas explains why a result matches—and where uncertainty remains.</p>
          </div>
        </section>
        <section className="shell identify-section">
          <IdentifyClient />
        </section>
      </main>
      <Footer />
    </>
  );
}

