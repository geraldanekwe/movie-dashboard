import { useCallback, useEffect, useState } from "react";

import { fetchDiscoverMovies } from "../services/tmdb";
import type { Movie, SortOption } from "../types/movie";

export function useMovies(page: number, sortBy: SortOption) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);
  const [resultsKey, setResultsKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDiscoverMovies(page, sortBy, controller.signal);

        setMovies(data.results);
        setTotalPages(data.total_pages);
        setResultsKey((key) => key + 1);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Failed to fetch movies:", err);
        setError("Unable to load movies. Please try again.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    loadMovies();

    return () => controller.abort();
  }, [page, sortBy, reloadKey]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);

  return { movies, totalPages, loading, error, resultsKey, retry };
}
