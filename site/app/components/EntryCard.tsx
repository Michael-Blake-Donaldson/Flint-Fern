import Link from "next/link";
import type { Entry } from "../content";

export function EntryCard({ entry, compact = false }: { entry: Entry; compact?: boolean }) {
  const href = entry.slug === "building-a-basic-campfire"
    ? `/entry/${entry.slug}`
    : `/explore?q=${encodeURIComponent(entry.title)}`;

  return (
    <article className={`entry-card entry-card--${entry.tone} ${compact ? "entry-card--compact" : ""}`}>
      <div className="card-art" aria-hidden="true">
        <span>{entry.mark}</span>
        {entry.interactive && <small>Interactive</small>}
      </div>
      <div className="card-content">
        <div className="eyebrow-row">
          <span>{entry.type}</span>
          <span>{entry.level}</span>
        </div>
        <h3><Link href={href}>{entry.title}</Link></h3>
        <p>{entry.summary}</p>
        <div className="card-meta">
          <span className="review-dot" aria-hidden="true">✓</span>
          <span>{entry.badge}</span>
          {entry.offline && <span className="offline-mark">↓ Offline</span>}
        </div>
      </div>
    </article>
  );
}

