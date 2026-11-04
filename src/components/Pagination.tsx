import { useState } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClass =
  "border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]";

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const [inputPage, setInputPage] = useState(String(page));

  const handlePageSubmit = () => {
    const nextPage = Number(inputPage);

    if (!Number.isInteger(nextPage) || nextPage < 1 || nextPage > 500) {
      setInputPage(String(page));
      return;
    }

    onPageChange(nextPage);
  };

  return (
    <nav aria-label="Pagination" className="flex items-center gap-4">
      <button
        onClick={() => {
          setInputPage(String(Math.max(1, page - 1)));
          onPageChange(Math.max(1, page - 1));
        }}
        disabled={page === 1}
        aria-label="Previous page"
        className={buttonClass}
      >
        Previous
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="whitespace-nowrap text-xs uppercase tracking-widest text-[#77736B]"
      >
        Page {page} of {totalPages}
      </span>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          handlePageSubmit();
        }}
      >
        <input
          type="number"
          min={1}
          max={500}
          value={inputPage}
          onChange={(event) => setInputPage(event.target.value)}
          aria-label="Go to page"
          className="w-14 border border-[#191916]/30 bg-transparent px-2 py-2 text-center text-xs"
        />
      </form>

      <button
        onClick={() => {
          setInputPage(String(Math.min(totalPages, page + 1)));
          onPageChange(Math.min(totalPages, page + 1));
        }}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={buttonClass}
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
