export async function GET() {
  // Use docker internal name when inside containers
  const backendUrl =
    process.env.ANALYTICS_URL ?? "http://localhost:8001";

  const r = await fetch(`${backendUrl}/geo/sample`, {
    headers: { "accept": "application/json" },
    cache: "no-store"
  });

  if (!r.ok) {
    return new Response(
      JSON.stringify({ error: "Backend request failed" }),
      { status: r.status, headers: { "content-type": "application/json" } }
    );
  }

  const data = await r.json();
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" }
  });
}
