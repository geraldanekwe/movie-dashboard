import type { MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchDiscoverMovies(
  page: number = 1,
): Promise<MovieResponse> {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: "16",
    sort_by: "vote_average.desc",
    "vote_count.gte": "100",
    page: String(page),
  });

  const response = await fetch(`${BASE_URL}/discover/movie?${params}`);

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data: MovieResponse = await response.json();

  return data;
}
