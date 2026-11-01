// Vercel Function that forwards a small set of read-only requests to TMDB.
interface ApiRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  status(code: number): ApiResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Only these endpoints and query parameters can be reached through the proxy.
const ALLOWED_PATHS = new Set(["discover/movie", "genre/movie/list"]);
const ALLOWED_PARAMS = ["page", "sort_by", "vote_count.gte", "with_genres"];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "TMDB_API_KEY is not configured" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const path = first(req.query.path);

  if (!path || !ALLOWED_PATHS.has(path)) {
    res.status(400).json({ error: "Unsupported TMDB path" });
    return;
  }

  const params = new URLSearchParams({ api_key: apiKey });

  for (const name of ALLOWED_PARAMS) {
    const value = first(req.query[name]);
    if (value !== undefined) params.set(name, value);
  }

  try {
    const upstream = await fetch(`${TMDB_BASE_URL}/${path}?${params}`);
    const data: unknown = await upstream.json();

    if (upstream.ok) {
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, stale-while-revalidate=86400",
      );
    }

    res.status(upstream.status).json(data);
  } catch {
    res.status(502).json({ error: "Failed to reach TMDB" });
  }
}
