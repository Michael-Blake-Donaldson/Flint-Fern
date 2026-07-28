"use client";

import { useMemo, useState } from "react";
import { entries } from "../content";
import { EntryCard } from "./EntryCard";

const domainOptions = ["All", ...Array.from(new Set(entries.map((entry) => entry.domain)))];
const levelOptions = ["All", "Foundation", "Field Ready", "Advanced"];

export function ExploreClient({ initialQuery = "", initialDomain = "All" }: { initialQuery?: string; initialDomain?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [domain, setDomain] = useState(domainOptions.includes(initialDomain) ? initialDomain : "All");
  const [level, setLevel] = useState("All");
  const [reviewedOnly, setReviewedOnly] = useState(false);
  const [offlineOnly, setOfflineOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesText = !needle || `${entry.title} ${entry.summary} ${entry.type} ${entry.domain} ${entry.region}`.toLowerCase().includes(needle);
      return matchesText
        && (domain === "All" || entry.domain === domain)
        && (level === "All" || entry.level === level)
        && (!reviewedOnly || entry.badge.toLowerCase().includes("reviewed"))
        && (!offlineOnly || entry.offline);
    });
  }, [domain, level, offlineOnly, query, reviewedOnly]);

  const activeCount = [domain !== "All", level !== "All", reviewedOnly, offlineOnly].filter(Boolean).length;
  function clear() {
    setQuery("");
    setDomain("All");
    setLevel("All");
    setReviewedOnly(false);
    setOfflineOnly(false);
  }

  return (
    <div className="explore-layout">
      <aside className={`filter-panel ${filtersOpen ? "filter-panel--open" : ""}`} aria-label="Explore filters">
        <div className="filter-panel-head">
          <h2>Filter knowledge</h2>
          <button type="button" onClick={clear}>Clear all</button>
        </div>
        <fieldset>
          <legend>Domain</legend>
          <div className="radio-stack">
            {domainOptions.map((option) => (
              <label key={option}>
                <input type="radio" name="domain" checked={domain === option} onChange={() => setDomain(option)} />
                <span>{option}</span>
                <small>{option === "All" ? entries.length : entries.filter((entry) => entry.domain === option).length}</small>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Knowledge level</legend>
          <select value={level} onChange={(event) => setLevel(event.target.value)}>
            {levelOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </fieldset>
        <fieldset className="check-stack">
          <legend>Availability & review</legend>
          <label><input type="checkbox" checked={reviewedOnly} onChange={(event) => setReviewedOnly(event.target.checked)} /> Reviewed entries</label>
          <label><input type="checkbox" checked={offlineOnly} onChange={(event) => setOfflineOnly(event.target.checked)} /> Offline ready</label>
        </fieldset>
        <button className="button button--pine mobile-apply" type="button" onClick={() => setFiltersOpen(false)}>
          Show {filtered.length} results
        </button>
      </aside>
      <div className="explore-results">
        <div className="explore-search">
          <span aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="explore-query">Search the encyclopedia</label>
          <input id="explore-query" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search entries, species, skills, gear…" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
        </div>
        <div className="results-toolbar">
          <p><strong>{filtered.length}</strong> entries</p>
          <button className="filter-toggle" type="button" onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>
            Filters {activeCount > 0 && <span>{activeCount}</span>}
          </button>
          <span className="result-context">{query ? `Matching “${query}”` : "North American launch collection"}</span>
        </div>
        {filtered.length > 0 ? (
          <div className="entry-grid explore-grid">
            {filtered.map((entry) => <EntryCard key={entry.slug} entry={entry} />)}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h2>No exact entry yet</h2>
            <p>Try a broader term, remove a filter, or tell us what knowledge is missing.</p>
            <button className="button button--pine" type="button" onClick={clear}>Reset the search</button>
          </div>
        )}
      </div>
    </div>
  );
}

