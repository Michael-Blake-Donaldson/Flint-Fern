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
  for (const path of ["/explore", "/learn", "/identify", "/field-guide", "/entry/building-a-basic-campfire"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
  }
});
