import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Bakbone homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Bakbone — The outdoors, understood\.<\/title>/i);
  assert.match(html, /The outdoors,/);
  assert.match(html, /Three ways into the wild/);
  assert.match(html, /Trust is not a badge/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders core product routes", async () => {
  for (const path of ["/explore", "/learn", "/identify", "/field-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});

const entrySlugs = [
  "building-a-basic-campfire",
  "black-bear",
  "baseplate-compass",
  "hypothermia",
  "white-tailed-deer-track",
  "water-purification",
  "lightning-safety",
  "fixed-blade-knife",
  "brook-trout",
  "contour-lines",
  "food-storage",
  "poison-ivy",
];

test("every published card has a complete entry route", async () => {
  for (const slug of entrySlugs) {
    const response = await render(`/entry/${slug}`);
    assert.equal(response.status, 200, slug);
    const html = await response.text();
    assert.match(html, /Practical meaning/i, slug);
    assert.match(html, /Safety &amp; limits/i, slug);
    assert.match(html, /Field-ready check/i, slug);
    assert.match(html, /Sources &amp; review record/i, slug);
    assert.match(html, /Next review:/i, slug);
    assert.match(html, /Report a correction/i, slug);
    assert.match(html, /Interactive three-dimensional model/i, slug);
  }
});

test("explore cards and home suggestions link directly to entries", async () => {
  for (const path of ["/", "/explore"]) {
    const response = await render(path);
    const html = await response.text();
    assert.doesNotMatch(html, /\/explore\?q=American%20Black%20Bear/i);
    assert.match(html, /\/entry\/black-bear/i);
  }
});
