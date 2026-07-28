import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { FireModel } from "../../components/FireModel";
import { KnowledgeModel } from "../../components/KnowledgeModel";
import { FieldChecklist } from "../../components/FieldChecklist";
import { CorrectionForm } from "../../components/CorrectionForm";
import { EntryCard } from "../../components/EntryCard";
import { entries } from "../../content";
import { entryDetails } from "../../entryDetails";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.summary,
    openGraph: { title: `${entry.title} · Bakbone`, description: entry.summary },
  };
}

export default async function EntryPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);
  const detail = entryDetails[slug];
  if (!entry || !detail) notFound();

  const related = detail.related
    .map((relatedSlug) => entries.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <Header />
      <main className="entry-page">
        <div className="shell breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span>
          <Link href={`/explore?domain=${encodeURIComponent(entry.domain)}`}>{entry.domain}</Link><span>›</span>
          <span>{entry.title}</span>
        </div>

        <section className={`entry-hero entry-hero--${entry.tone}`}>
          <div className="shell entry-hero-grid">
            <div>
              <div className="entry-labels"><span>{entry.type}</span><span>{entry.level}</span><span>{entry.region}</span><span>{detail.risk}</span></div>
              <h1>{entry.title}</h1>
              {detail.scientificName && <p className="scientific-name"><i>{detail.scientificName}</i></p>}
              <p>{entry.summary}</p>
              <div className="review-line">
                <span aria-hidden="true">✓</span>
                <div><strong>{entry.badge}</strong><small>Last checked July 27, 2026 · {detail.risk}</small></div>
              </div>
            </div>
            {slug === "building-a-basic-campfire"
              ? <FireModel variant="entry" />
              : <KnowledgeModel slug={slug} model={detail.model} tone={entry.tone} />}
          </div>
        </section>

        <div className="shell entry-layout">
          <aside className="entry-toc">
            <p>On this page</p>
            <a href="#overview">Overview</a>
            <a href="#safety">Safety & limits</a>
            {detail.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}
            <a href="#method">Field method</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#checklist">Field-ready check</a>
            <a href="#sources">Sources & review</a>
          </aside>

          <article className="entry-article">
            <section id="overview">
              <p className="kicker dark-kicker">Practical meaning</p>
              <h2>{detail.overviewHeading}</h2>
              <p className="lead">{detail.overviewLead}</p>
              <p>{detail.overviewBody}</p>
              <p className="practical-line"><strong>In the field:</strong> {detail.practicalMeaning}</p>
              <div className="concept-grid" aria-label={`${entry.title} key facts`}>
                {detail.facts.map((fact, index) => (
                  <div key={fact.label}><span>0{index + 1} · {fact.label}</span><strong>{fact.value}</strong><p>{fact.detail}</p></div>
                ))}
              </div>
            </section>

            <section id="safety">
              <div className="safety-callout">
                <span className="safety-icon" aria-hidden="true">!</span>
                <div>
                  <p className="kicker">{detail.safety.label}</p>
                  <h2>{detail.safety.title}</h2>
                  <p>{detail.safety.body}</p>
                  <a href={detail.safety.link} rel="noreferrer">{detail.safety.linkLabel} →</a>
                </div>
              </div>
            </section>

            {detail.sections.map((section) => (
              <section id={section.id} key={section.id} className="knowledge-section">
                <p className="kicker dark-kicker">{section.kicker}</p>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </section>
            ))}

            <section id="method">
              <p className="kicker dark-kicker">Field method</p>
              <h2>{detail.methodTitle}</h2>
              <ol className="method-steps">
                {detail.steps.map((step, index) => (
                  <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>
                ))}
              </ol>
            </section>

            <section id="mistakes">
              <p className="kicker dark-kicker">Troubleshooting</p>
              <h2>Common mistakes</h2>
              <div className="mistake-grid">
                {detail.mistakes.map((mistake) => (
                  <article key={mistake.title}><h3>{mistake.title}</h3><p>{mistake.body}</p><strong>{mistake.correction}</strong></article>
                ))}
              </div>
            </section>

            <section id="checklist"><FieldChecklist title={`Before using this ${entry.type.toLowerCase()} entry`} checks={detail.checklist} /></section>

            <section id="sources" className="sources-section">
              <p className="kicker dark-kicker">Sources & review record</p>
              <h2>Evidence behind this entry</h2>
              <ol>
                {detail.sources.map((source) => (
                  <li key={source.url}><a href={source.url} rel="noreferrer">{source.organization} · {source.title}</a><span>{source.note} · Accessed July 27, 2026</span></li>
                ))}
              </ol>
              <div className="review-record"><span aria-hidden="true">✓</span><div><strong>Official and authoritative sources checked</strong><p>Next review: {detail.nextReview}.</p></div></div>
              <CorrectionForm slug={slug} title={entry.title} />
            </section>
          </article>
        </div>

        <section className="section related-section">
          <div className="shell">
            <div className="section-heading split"><div><p className="kicker dark-kicker">Connected knowledge</p><h2>Keep following the evidence</h2></div><Link className="text-link" href={`/explore?domain=${encodeURIComponent(entry.domain)}`}>Explore {entry.domain} →</Link></div>
            <div className="entry-grid">{related.map((item) => <EntryCard key={item.slug} entry={item} />)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
