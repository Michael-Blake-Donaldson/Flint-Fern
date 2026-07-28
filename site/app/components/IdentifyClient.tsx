"use client";

import { useMemo, useState } from "react";

const candidates = [
  { name: "White-tailed deer", scientific: "Odocoileus virginianus", shape: "Cloven hoof", size: "Medium", habitat: "Forest edge", mark: "⌁", confidence: "Strong match" },
  { name: "Mule deer", scientific: "Odocoileus hemionus", shape: "Cloven hoof", size: "Medium", habitat: "Open woodland", mark: "⌁", confidence: "Possible match" },
  { name: "American black bear", scientific: "Ursus americanus", shape: "Five toes", size: "Large", habitat: "Forest", mark: "●", confidence: "Possible match" },
  { name: "Coyote", scientific: "Canis latrans", shape: "Four toes", size: "Medium", habitat: "Mixed", mark: "◇", confidence: "Possible match" },
];

export function IdentifyClient() {
  const [kind, setKind] = useState("Track or sign");
  const [shape, setShape] = useState("Any");
  const [size, setSize] = useState("Any");
  const [habitat, setHabitat] = useState("Any");
  const results = useMemo(() => candidates.filter((candidate) =>
    (shape === "Any" || candidate.shape === shape)
    && (size === "Any" || candidate.size === size)
    && (habitat === "Any" || candidate.habitat.includes(habitat) || candidate.habitat === "Mixed")
  ), [habitat, shape, size]);

  return (
    <div className="identify-tool">
      <div className="identify-panel">
        <div className="identify-step">
          <span>01</span>
          <div>
            <label htmlFor="identify-kind">What are you identifying?</label>
            <select id="identify-kind" value={kind} onChange={(event) => setKind(event.target.value)}>
              <option>Track or sign</option><option>Animal</option><option>Plant</option><option>Fish</option><option>Fungi</option>
            </select>
          </div>
        </div>
        <div className="identify-step">
          <span>02</span>
          <fieldset>
            <legend>Which pattern is closest?</legend>
            <div className="trait-buttons">
              {["Any", "Cloven hoof", "Four toes", "Five toes"].map((option) => (
                <button type="button" className={shape === option ? "selected" : ""} onClick={() => setShape(option)} key={option}>
                  <i aria-hidden="true">{option === "Cloven hoof" ? "⌁" : option === "Four toes" ? "◇" : option === "Five toes" ? "●" : "○"}</i>
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="identify-step two-column">
          <span>03</span>
          <div>
            <label htmlFor="track-size">Approximate size</label>
            <select id="track-size" value={size} onChange={(event) => setSize(event.target.value)}>
              <option>Any</option><option>Small</option><option>Medium</option><option>Large</option>
            </select>
          </div>
          <div>
            <label htmlFor="track-habitat">Surrounding habitat</label>
            <select id="track-habitat" value={habitat} onChange={(event) => setHabitat(event.target.value)}>
              <option>Any</option><option>Forest</option><option>Open woodland</option><option>Wetland</option>
            </select>
          </div>
        </div>
        <div className="identify-warning">
          <span aria-hidden="true">i</span>
          <p>Identification is comparative, not a guarantee. Use several features—shape, scale, pattern, habitat, and range—before drawing a conclusion.</p>
        </div>
      </div>
      <div className="candidate-panel" aria-live="polite">
        <div className="candidate-head">
          <div><p className="kicker dark-kicker">Possible matches</p><h2>{results.length} candidates</h2></div>
          <button type="button" onClick={() => { setShape("Any"); setSize("Any"); setHabitat("Any"); }}>Reset</button>
        </div>
        <div className="candidate-list">
          {results.length ? results.map((candidate, index) => (
            <article key={candidate.name}>
              <span className="candidate-mark" aria-hidden="true">{candidate.mark}</span>
              <div>
                <small>{index === 0 && shape !== "Any" ? "Strongest feature match" : candidate.confidence}</small>
                <h3>{candidate.name}</h3>
                <p><em>{candidate.scientific}</em></p>
                <dl><span>{candidate.shape}</span><span>{candidate.size}</span><span>{candidate.habitat}</span></dl>
              </div>
              <a href={`/explore?q=${encodeURIComponent(candidate.name)}`} aria-label={`Compare ${candidate.name}`}>→</a>
            </article>
          )) : (
            <div className="empty-state compact"><h3>No close candidates</h3><p>Broaden one or more traits and compare again.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

