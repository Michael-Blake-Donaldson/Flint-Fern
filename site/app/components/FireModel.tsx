"use client";

import { useState } from "react";

export function FireModel() {
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);

  function rotate(delta: number) {
    setAngle((current) => current + delta);
  }

  return (
    <div className="fire-exhibit">
      <div
        className={`fire-stage ${paused ? "is-paused" : ""}`}
        role="img"
        aria-label="Interactive model of a small controlled campfire: a stone ring, crossed fuel wood, kindling, and a stable flame."
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") rotate(-12);
          if (event.key === "ArrowRight") rotate(12);
          if (event.key === " ") {
            event.preventDefault();
            setPaused((value) => !value);
          }
        }}
      >
        <div className="scene-orbit" style={{ transform: `rotateY(${angle}deg)` }}>
          <div className="stone-ring">
            {Array.from({ length: 10 }).map((_, index) => (
              <i key={index} style={{ "--stone": index } as React.CSSProperties} />
            ))}
          </div>
          <div className="log log-one" />
          <div className="log log-two" />
          <div className="ember-bed" />
          <div className="flame flame-back" />
          <div className="flame flame-main" />
          <div className="flame flame-core" />
          <div className="sparks">
            {Array.from({ length: 7 }).map((_, index) => <i key={index} />)}
          </div>
        </div>
        <div className="fire-shadow" aria-hidden="true" />
      </div>
      <div className="model-controls" aria-label="Campfire model controls">
        <button type="button" onClick={() => rotate(-18)} aria-label="Rotate model left">←</button>
        <button type="button" onClick={() => setPaused(!paused)}>
          {paused ? "Play" : "Pause"}
        </button>
        <button type="button" onClick={() => rotate(18)} aria-label="Rotate model right">→</button>
      </div>
      <p className="model-note">Use arrow keys to rotate · Space to pause</p>
    </div>
  );
}

