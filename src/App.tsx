import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";

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

  const filteredMovies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().includes(query));
  }, [movies, searchQuery]);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (nextSort: SortOption) => {
    setSortBy(nextSort);
    setSearchQuery("");
    setPage(1);
  };

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

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          {loading && movies.length === 0 && (
            <p className="py-20 text-center text-sm text-[#77736B]">
              Developing the collection...
            </p>
          )}

          {error && (
            <div className="py-20 text-center">
              <p className="mb-4 text-sm text-[#B83E2E]">{error}</p>
              <button
                onClick={() => setReloadKey((key) => key + 1)}
                className="border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7]"
              >
                Retry
              </button>
            </div>
          )}

          {!error && movies.length > 0 && (
            <div
              className={`transition-opacity duration-300 ${
                loading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-widest text-[#77736B]">
                  Showing {filteredMovies.length} of {movies.length} movies
                </span>

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>

              <div
                key={resultsKey}
                className="animate-fade-in motion-reduce:animate-none"
              >
                <MovieGrid movies={filteredMovies} />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
