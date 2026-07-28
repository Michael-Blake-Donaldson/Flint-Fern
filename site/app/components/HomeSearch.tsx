"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { entries } from "../content";

export function HomeSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const suggestions = useMemo(() => {
    if (query.trim().length < 2) return [];
    const needle = query.toLowerCase();
    return entries
      .filter((entry) => `${entry.title} ${entry.summary} ${entry.domain} ${entry.type}`.toLowerCase().includes(needle))
      .slice(0, 4);
  }, [query]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/explore?q=${encodeURIComponent(value)}`);
  }

  return (
    <div className="hero-search-wrap">
      <form className="hero-search" role="search" onSubmit={submit}>
        <span aria-hidden="true">⌕</span>
        <label className="sr-only" htmlFor="hero-search">Search outdoor knowledge</label>
        <input
          id="hero-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search skills, species, gear, hazards…"
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <div className="search-suggestions" aria-label="Search suggestions">
          {suggestions.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              onClick={() => router.push(entry.slug === "building-a-basic-campfire" ? `/entry/${entry.slug}` : `/explore?q=${encodeURIComponent(entry.title)}`)}
            >
              <span>{entry.title}</span>
              <small>{entry.type} · {entry.domain}</small>
            </button>
          ))}
        </div>
      )}
      <p>Try <a href="/explore?q=campfire">campfire</a>, <a href="/explore?q=black+bear">black bear</a>, or <a href="/explore?q=compass">compass</a></p>
    </div>
  );
}

