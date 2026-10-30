import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import FilterBar from "./components/FilterBar";

import { fetchDiscoverMovies } from "./services/tmdb";
import type { Movie, SortOption } from "./types/movie";

const sortLabels: Record<SortOption, string> = {
  rating: "Sorted by audience rating",
  title: "Sorted alphabetically",
  newest: "Sorted by newest release",
  oldest: "Sorted by oldest release",
};

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

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

  const filteredMovies = useMemo(() => {
    const sortComparators: Record<SortOption, (a: Movie, b: Movie) => number> =
      {
        rating: (a, b) => b.vote_average - a.vote_average,
        title: (a, b) => a.title.localeCompare(b.title),
        newest: (a, b) => b.release_date.localeCompare(a.release_date),
        oldest: (a, b) => a.release_date.localeCompare(b.release_date),
      };

    const query = searchQuery.trim().toLowerCase();

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query),
    );

    return [...filtered].sort(sortComparators[sortBy]);
  }, [movies, searchQuery, sortBy]);

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
              {sortLabels[sortBy]}
            </span>
          </div>

          {!loading && !error && (
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          )}

          {loading && (
            <p className="py-20 text-center text-sm text-[#77736B]">
              Developing the collection...
            </p>
          )}

          {error && (
            <p className="py-20 text-center text-sm text-[#B83E2E]">{error}</p>
          )}

          {!loading && !error && (
            <>
              <div className="mb-4 text-[10px] uppercase tracking-widest text-[#77736B]">
                Showing {filteredMovies.length} of {movies.length} movies
              </div>

              <MovieGrid movies={filteredMovies} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
