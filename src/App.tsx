import { useMemo, useState } from "react";

import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";

import { useGenres } from "./hooks/useGenres";
import { useMovies } from "./hooks/useMovies";
import type { SortOption } from "./types/movie";

function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const { genres } = useGenres();

  const { movies, totalPages, loading, error, resultsKey, retry } = useMovies(
    page,
    sortBy,
    selectedGenre,
  );

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

  const handleGenreChange = (genreId: number | null) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F2EFE7]">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <section>
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
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
                onClick={retry}
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
