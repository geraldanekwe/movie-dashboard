import type { MovieResponse, SortOption } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SORT_PARAMS: Record<SortOption, string> = {
  rating: "vote_average.desc",
  title: "original_title.asc",
  newest: "primary_release_date.desc",
  oldest: "primary_release_date.asc",
};

export async function fetchDiscoverMovies(
  page: number = 1,
  sortBy: SortOption = "rating",
  signal?: AbortSignal,
): Promise<MovieResponse> {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    with_genres: "16",
    sort_by: SORT_PARAMS[sortBy],
    "vote_count.gte": "100",
    page: String(page),
  });

  const response = await fetch(`${BASE_URL}/discover/movie?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}
