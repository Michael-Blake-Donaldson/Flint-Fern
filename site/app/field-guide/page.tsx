import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FieldGuideClient } from "../components/FieldGuideClient";

export default function FieldGuidePage() {
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subhero field-hero">
          <div className="shell">
            <p className="kicker dark-kicker">Field Guide</p>
            <h1>Carry the knowledge.<br />Leave the signal behind.</h1>
            <p>Build a transparent, focused offline package for a trip or place. You stay in control of storage, freshness, and removal.</p>
          </div>
        </section>
        <section className="shell field-builder-section">
          <FieldGuideClient />
        </section>
      </main>
      <Footer />
    </>
  );
}

