"use client";

import { FormEvent, useState } from "react";

export function CorrectionForm({ slug, title }: { slug: string; title: string }) {
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const record = {
      slug,
      title,
      issue: String(form.get("issue") ?? ""),
      source: String(form.get("source") ?? ""),
      createdAt: new Date().toISOString(),
    };
    const key = "bakbone-corrections";
    const current = JSON.parse(window.localStorage.getItem(key) ?? "[]") as unknown[];
    window.localStorage.setItem(key, JSON.stringify([...current, record]));
    event.currentTarget.reset();
    setSaved(true);
  }

  return (
    <details className="correction-form">
      <summary>Report a correction</summary>
      <form onSubmit={submit}>
        <label>
          What should be corrected?
          <textarea name="issue" required minLength={10} rows={4} />
        </label>
        <label>
          Supporting source or note <span>(optional)</span>
          <input name="source" type="url" inputMode="url" placeholder="https://…" />
        </label>
        <button className="button button--pine" type="submit">Save correction</button>
        <p aria-live="polite">{saved ? "Saved on this device for the local review queue." : "Local build: reports stay on this device until a production review service is connected."}</p>
      </form>
    </details>
  );
}
