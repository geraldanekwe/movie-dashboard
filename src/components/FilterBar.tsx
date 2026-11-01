import type { Genre, SortOption } from "../types/movie";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  genres: Genre[];
  selectedGenre: number | null;
  onGenreChange: (genreId: number | null) => void;
}

const sortLabels: Record<SortOption, string> = {
  rating: "Sorted by audience rating",
  title: "Sorted alphabetically",
  newest: "Sorted by newest release",
  oldest: "Sorted by oldest release",
};

function FilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  genres,
  selectedGenre,
  onGenreChange,
}: FilterBarProps) {
  const labelClass =
    "mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736B]";

  const selectClass =
    "w-full border-b border-[#191916]/30 bg-transparent px-2 py-3 text-sm text-[#191916] outline-none transition-colors focus:border-[#B83E2E]";

  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
          Featured selection
        </h2>

        <span className="text-[10px] uppercase tracking-widest text-[#77736B]">
          {sortLabels[sortBy]}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        <div className="min-w-0">
          <label htmlFor="movie-search" className={labelClass}>
            Search movies
          </label>

          <input
            id="movie-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Filter this page by title..."
            className={`${selectClass} px-1 placeholder:text-[#77736B]`}
          />
        </div>

        <div className="min-w-0">
          <label htmlFor="filter-genre" className={labelClass}>
            Genre
          </label>

          <select
            id="filter-genre"
            value={selectedGenre ?? ""}
            onChange={(event) =>
              onGenreChange(
                event.target.value === "" ? null : Number(event.target.value),
              )
            }
            className={selectClass}
          >
            <option value="">All genres</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor="sort-movies" className={labelClass}>
            Sort by
          </label>

          <select
            id="sort-movies"
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className={selectClass}
          >
            <option value="rating">Highest rated</option>
            <option value="title">Title (A–Z)</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
