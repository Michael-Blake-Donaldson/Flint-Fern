import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ExploreClient } from "../components/ExploreClient";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; domain?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Header />
      <main className="subpage">
        <section className="subhero">
          <div className="shell">
            <p className="kicker dark-kicker">The encyclopedia</p>
            <h1>Explore outdoor knowledge</h1>
            <p>Search, filter, compare, and follow the connections between skills, species, equipment, hazards, and places.</p>
          </div>
        </section>
        <section className="shell explore-section">
          <ExploreClient initialQuery={params.q ?? ""} initialDomain={params.domain ?? "All"} />
        </section>
      </main>
      <Footer />
    </>
  );
}

