/**
 * Minimal smoke checks for admin-related API endpoints.
 * Usage:
 *   1) Start the dev server: npm run dev
 *   2) In another terminal:  node scripts/smoke-admin.mjs http://localhost:3000
 */

const base = process.argv[2] || "http://localhost:3000";

async function check(name, path) {
  const url = `${base}${path}`;
  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${name} failed (${res.status}): ${json.error || "unknown error"} @ ${url}`);
  }
  return json;
}

async function main() {
  console.log(`Running smoke checks against ${base}`);

  const blog = await check("GET /api/blogposts", "/api/blogposts?limit=1&offset=0");
  if (!blog.success) throw new Error("Expected blogposts success=true");
  console.log("✓ blogposts");

  const opps = await check("GET /api/opportunities", "/api/opportunities?limit=1&offset=0");
  if (!opps.success) throw new Error("Expected opportunities success=true");
  console.log("✓ opportunities");

  const settings = await check("GET /api/settings", "/api/settings");
  if (!settings.success) throw new Error("Expected settings success=true");
  console.log("✓ settings");

  const testimonials = await check("GET /api/testimonials", "/api/testimonials");
  if (!testimonials.success) throw new Error("Expected testimonials success=true");
  console.log("✓ testimonials");

  const homepage = await check("GET /api/homepage", "/api/homepage");
  if (!homepage.success) throw new Error("Expected homepage success=true");
  console.log("✓ homepage");

  console.log("All smoke checks passed.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

