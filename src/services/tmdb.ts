import type { Genre, MovieResponse, SortOption } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SORT_PARAMS: Record<SortOption, string> = {
  rating: "vote_average.desc",
  title: "title.asc",
  newest: "primary_release_date.desc",
  oldest: "primary_release_date.asc",
};

export async function fetchDiscoverMovies(
  page: number = 1,
  sortBy: SortOption = "rating",
  genreId: number | null = null,
  signal?: AbortSignal,
): Promise<MovieResponse> {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
    sort_by: SORT_PARAMS[sortBy],
    "vote_count.gte": "100",
    page: String(page),
  });

  if (genreId !== null) {
    params.set("with_genres", String(genreId));
  }

  const response = await fetch(`${BASE_URL}/discover/movie?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchMovieGenres(signal?: AbortSignal): Promise<Genre[]> {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing");
  }

  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  const response = await fetch(`${BASE_URL}/genre/movie/list?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB genre API error: ${response.status}`);
  }

  const data: { genres: Genre[] } = await response.json();

  return data.genres;
}
