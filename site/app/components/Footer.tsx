import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <img className="brand-logo" src="/bakbone-logo-256.png" alt="" width="44" height="44" />
            <span>Bakbone</span>
          </Link>
          <p>The outdoors deserves to be understood—not merely consumed.</p>
        </div>
        <div>
          <h2>Discover</h2>
          <Link href="/explore">Explore knowledge</Link>
          <Link href="/learn">Learning guides</Link>
          <Link href="/identify">Identify species & sign</Link>
          <Link href="/field-guide">Field Guide</Link>
        </div>
        <div>
          <h2>Our standard</h2>
          <a href="/#trust">Methodology</a>
          <a href="/#trust">Sources & review</a>
          <a href="mailto:corrections@bakbone.example">Report a correction</a>
          <a href="/#mission">Mission</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Bakbone · North American foundation</span>
        <span>Knowledge first. Always.</span>
      </div>
    </footer>
  );
}
