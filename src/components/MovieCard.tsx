import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#DED9CE]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-[#77736B]">
            Poster unavailable
          </div>
        )}

        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-4 text-xs leading-relaxed text-white">
            {movie.overview || "No description available."}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-b border-[#191916]/20 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736B]">
            {releaseYear}
          </span>

          <span className="text-xs font-semibold text-[#B83E2E]">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <h2 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-[#191916] transition-colors group-hover:text-[#B83E2E]">
          {movie.title}
        </h2>

        <p className="mt-auto pt-1 text-[10px] uppercase tracking-wider text-[#77736B]">
          {movie.vote_count.toLocaleString()} audience ratings
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
