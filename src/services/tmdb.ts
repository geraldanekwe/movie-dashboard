import type { Genre, MovieResponse, SortOption } from "../types/movie";

const SORT_PARAMS: Record<SortOption, string> = {
  rating: "vote_average.desc",
  title: "title.asc",
  newest: "primary_release_date.desc",
  oldest: "primary_release_date.asc",
};

// Perform a GET request to the TMDB API through our own /api/tmdb endpoint.
async function tmdbGet<T>(
  path: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<T> {
  const query = new URLSearchParams({ path, ...params });
  const response = await fetch(`/api/tmdb?${query}`, { signal });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export function fetchDiscoverMovies(
  page: number = 1,
  sortBy: SortOption = "rating",
  genreId: number | null = null,
  signal?: AbortSignal,
): Promise<MovieResponse> {
  const params: Record<string, string> = {
    sort_by: SORT_PARAMS[sortBy],
    "vote_count.gte": "100",
    page: String(page),
  };

  if (genreId !== null) {
    params.with_genres = String(genreId);
  }

  return tmdbGet<MovieResponse>("discover/movie", params, signal);
}

export async function fetchMovieGenres(signal?: AbortSignal): Promise<Genre[]> {
  const data = await tmdbGet<{ genres: Genre[] }>(
    "genre/movie/list",
    {},
    signal,
  );

  return data.genres;
}
