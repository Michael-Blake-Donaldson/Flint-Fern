"use client";

import { useState } from "react";

export function FieldChecklist({ title, checks }: { title: string; checks: string[] }) {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="readiness-check">
      <div className="readiness-head">
        <div><p className="kicker dark-kicker">Field-ready check</p><h2>{title}</h2></div>
        <strong>{done.length}/{checks.length}</strong>
      </div>
      {checks.map((item) => (
        <label key={item}>
          <input
            type="checkbox"
            checked={done.includes(item)}
            onChange={() => setDone((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}
          />
          <span>{item}</span>
        </label>
      ))}
      <p aria-live="polite">{done.length === checks.length ? "Checklist complete. Conditions still require continuous judgment." : "A checklist supports judgment; it does not replace it."}</p>
    </div>
  );
}
