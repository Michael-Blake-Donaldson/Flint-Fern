"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/explore?q=${encodeURIComponent(value)}` : "/explore");
    setOpen(false);
  }

  return (
    <header className={`site-header ${dark ? "site-header--dark" : ""}`}>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="WildAtlas home">
          <span className="brand-mark" aria-hidden="true">W</span>
          <span>WildAtlas</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/explore">Explore</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/identify">Identify</Link>
          <Link href="/field-guide">Field Guide</Link>
        </nav>
        <form className="header-search" role="search" onSubmit={submit}>
          <label className="sr-only" htmlFor="header-search">Search WildAtlas</label>
          <input
            id="header-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
          />
          <button aria-label="Submit search" type="submit">⌕</button>
        </form>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden="true">{open ? "×" : "≡"}</span>
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open && (
        <div className="mobile-panel" id="mobile-navigation">
          <form className="mobile-search" role="search" onSubmit={submit}>
            <label className="sr-only" htmlFor="mobile-search">Search WildAtlas</label>
            <input
              id="mobile-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to understand?"
            />
            <button type="submit">Search</button>
          </form>
          <nav aria-label="Mobile navigation">
            <Link href="/explore" onClick={() => setOpen(false)}>Explore <span>Encyclopedia</span></Link>
            <Link href="/learn" onClick={() => setOpen(false)}>Learn <span>Guided paths</span></Link>
            <Link href="/identify" onClick={() => setOpen(false)}>Identify <span>Species & sign</span></Link>
            <Link href="/field-guide" onClick={() => setOpen(false)}>Field Guide <span>Offline access</span></Link>
          </nav>
        </div>
      )}
    </header>
  );
}

