import { useEffect, useState } from "react";

import { fetchMovieGenres } from "../services/tmdb";
import { FALLBACK_GENRES } from "../data/genres";
import type { Genre } from "../types/movie";

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>(FALLBACK_GENRES);

  useEffect(() => {
    const controller = new AbortController();

    const loadGenres = async () => {
      try {
        const data = await fetchMovieGenres(controller.signal);
        setGenres(data);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Failed to fetch genres:", err);
        setGenres(FALLBACK_GENRES);
      }
    };

    loadGenres();

    return () => controller.abort();
  }, []);

  return { genres };
}
