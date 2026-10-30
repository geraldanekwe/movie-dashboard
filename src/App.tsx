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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDiscoverMovies(page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Unable to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [page]);

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
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#77736B]">
                  Showing {filteredMovies.length} of {movies.length} movies
                </span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    disabled={page === 1}
                    className="border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]"
                  >
                    Previous
                  </button>

                  <span className="whitespace-nowrap text-xs uppercase tracking-widest text-[#77736B]">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={page >= totalPages}
                    className="border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]"
                  >
                    Next
                  </button>
                </div>
              </div>

              <MovieGrid movies={filteredMovies} />

              <div className="mt-10 flex items-center justify-center gap-6">
                <button
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]"
                >
                  Previous
                </button>

                <span className="text-xs uppercase tracking-widest text-[#77736B]">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page >= totalPages}
                  className="border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
