"use client";

import { useEffect, useMemo, useState } from "react";
import { entries } from "../content";

const starterSlugs = ["building-a-basic-campfire", "hypothermia", "water-purification", "lightning-safety", "food-storage"];

export function FieldGuideClient() {
  const [selected, setSelected] = useState<string[]>(starterSlugs);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("wildatlas-field-guide");
    if (stored) {
      try { setSelected(JSON.parse(stored)); } catch { /* Keep safe defaults. */ }
    }
  }, []);

  const selectedEntries = useMemo(() => entries.filter((entry) => selected.includes(entry.slug)), [selected]);
  const estimatedSize = (selectedEntries.length * 1.7 + selectedEntries.filter((entry) => entry.interactive).length * 3.4).toFixed(1);

  function toggle(slug: string) {
    setSaved(false);
    setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }

  function save() {
    window.localStorage.setItem("wildatlas-field-guide", JSON.stringify(selected));
    setSaved(true);
    setMessage(`Field guide saved on this device: ${selected.length} entries, approximately ${estimatedSize} MB.`);
  }

  return (
    <div className="field-builder">
      <div className="field-options">
        <div className="builder-heading">
          <div><p className="kicker dark-kicker">Trip collection</p><h2>Pacific Northwest weekend</h2></div>
          <span>Local device</span>
        </div>
        <p className="builder-intro">Choose a focused set of evergreen entries. Time-sensitive regulations remain linked to the responsible authority and require a current check.</p>
        <div className="entry-selector">
          {entries.filter((entry) => entry.offline).map((entry) => (
            <label key={entry.slug}>
              <input type="checkbox" checked={selected.includes(entry.slug)} onChange={() => toggle(entry.slug)} />
              <span className={`selector-mark selector-mark--${entry.tone}`} aria-hidden="true">{entry.mark}</span>
              <span><strong>{entry.title}</strong><small>{entry.type} · {entry.domain} · Reviewed {entry.reviewed}</small></span>
              <b>{selected.includes(entry.slug) ? "Added" : "Add"}</b>
            </label>
          ))}
        </div>
      </div>
      <aside className="download-card">
        <p className="kicker">Offline package</p>
        <h2>Your field guide</h2>
        <div className="download-ring"><strong>{selected.length}</strong><span>entries</span></div>
        <dl>
          <div><dt>Estimated size</dt><dd>{estimatedSize} MB</dd></div>
          <div><dt>Safety essentials</dt><dd>{selectedEntries.filter((entry) => entry.type === "Hazard" || entry.domain === "Safety").length}</dd></div>
          <div><dt>Interactive fallbacks</dt><dd>Included</dd></div>
          <div><dt>Account required</dt><dd>No</dd></div>
        </dl>
        <div className="freshness-note"><span>✓</span><p><strong>Evergreen content checked</strong><br />Current as of July 27, 2026</p></div>
        <button className="button button--canvas" type="button" disabled={!selected.length} onClick={save}>
          {saved ? "Saved to this device" : "Save offline guide"} <span>↓</span>
        </button>
        <p className="download-disclaimer">Local demo storage only. Always verify closures, fire restrictions, licenses, and other current rules with official agencies.</p>
        <span className="sr-only" aria-live="polite">{message}</span>
      </aside>
    </div>
  );
}

