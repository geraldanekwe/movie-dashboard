import { useEffect, useState } from "react";

import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";

import { fetchDiscoverMovies } from "./services/tmdb";
import type { Movie } from "./types/movie";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDiscoverMovies();

        setMovies(data.results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);

        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2EFE7]">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
              Featured selection
            </h2>

            <span className="text-[10px] uppercase tracking-widest text-[#77736B]">
              Sorted by audience rating
            </span>
          </div>

          {loading && (
            <p className="py-20 text-center text-sm text-[#77736B]">
              Developing the collection...
            </p>
          )}

          {error && (
            <p className="py-20 text-center text-sm text-[#B83E2E]">{error}</p>
          )}

          {!loading && !error && <MovieGrid movies={movies} />}
        </section>
      </main>
    </div>
  );
}

export default App;
