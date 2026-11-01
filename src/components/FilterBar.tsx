import { useEffect, useRef, useState } from "react";

import CustomDropdown from "./CustomDropdown";

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
  const [openDropdown, setOpenDropdown] = useState<"genre" | "sort" | null>(
    null,
  );

  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterBarRef.current &&
        !filterBarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const labelClass =
    "mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736B]";

  const toggleDropdown = (dropdown: "genre" | "sort") => {
    setOpenDropdown((current) => (current === dropdown ? null : dropdown));
  };

  return (
    <div ref={filterBarRef} className="mb-8">
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
            className="w-full border-b border-[#191916]/30 bg-transparent px-1 py-3 text-sm text-[#191916] outline-none transition-colors placeholder:text-[#77736B] focus:border-[#B83E2E]"
          />
        </div>

        <div className="min-w-0">
          <label className={labelClass}>Genre</label>

          <CustomDropdown
            value={selectedGenre === null ? "" : String(selectedGenre)}
            onChange={(value) =>
              onGenreChange(value === "" ? null : Number(value))
            }
            options={[
              { value: "", label: "All genres" },
              ...genres.map((genre) => ({
                value: String(genre.id),
                label: genre.name,
              })),
            ]}
            isOpen={openDropdown === "genre"}
            onToggle={() => toggleDropdown("genre")}
          />
        </div>

        <div className="min-w-0">
          <label className={labelClass}>Sort by</label>

          <CustomDropdown
            value={sortBy}
            onChange={(value) => onSortChange(value as SortOption)}
            options={[
              { value: "rating", label: "Highest rated" },
              { value: "title", label: "Title (A–Z)" },
              { value: "newest", label: "Newest" },
              { value: "oldest", label: "Oldest" },
            ]}
            isOpen={openDropdown === "sort"}
            onToggle={() => toggleDropdown("sort")}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
