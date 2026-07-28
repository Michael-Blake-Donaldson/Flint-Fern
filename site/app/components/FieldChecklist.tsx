"use client";

import { useState } from "react";

const checks = [
  "Current fire rules and site restrictions checked",
  "Water and extinguishing tools are within reach",
  "The fire area is clear above and around the ring",
  "Fuel is gathered before ignition",
  "A responsible adult will remain present",
];

export function FieldChecklist() {
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="readiness-check">
      <div className="readiness-head">
        <div><p className="kicker dark-kicker">Field-ready check</p><h2>Before any flame</h2></div>
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

