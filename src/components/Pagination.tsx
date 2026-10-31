interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClass =
  "border border-[#191916]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-[#191916] hover:text-[#F2EFE7] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#191916]";

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center gap-4">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
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

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
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
