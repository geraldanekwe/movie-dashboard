import type { SortOption } from "../types/movie";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function FilterBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search movies..."
        aria-label="Search movies by title"
        className="w-full border-b border-[#191916]/30 bg-transparent px-1 py-3 text-sm text-[#191916] placeholder:text-[#77736B] outline-none transition-colors focus:border-[#B83E2E] sm:max-w-sm"
      />

      <div className="flex items-center gap-3">
        <label
          htmlFor="sort-movies"
          className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736B]"
        >
          Sort by
        </label>

        <select
          id="sort-movies"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          className="border-b border-[#191916]/30 bg-transparent px-2 py-3 text-sm text-[#191916] outline-none transition-colors focus:border-[#B83E2E]"
        >
          <option value="rating">Highest rated</option>
          <option value="title">Title (A–Z)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
