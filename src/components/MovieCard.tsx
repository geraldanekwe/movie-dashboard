import { useState } from "react";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w342";

function MovieCard({ movie }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  const posterUrl =
    movie.poster_path && !imageFailed
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null;

  const releaseYear = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  return (
    <article className="group flex h-full min-w-0 flex-col">
      <button
        type="button"
        onClick={() => setShowOverview((open) => !open)}
        onMouseLeave={() => setShowOverview(false)}
        onBlur={() => setShowOverview(false)}
        aria-expanded={showOverview}
        aria-label={`${movie.title}, ${showOverview ? "hide" : "show"} synopsis`}
        className={`relative block aspect-[2/3] w-full overflow-hidden bg-[#DED9CE] p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B83E2E] ${
          posterUrl && !imageLoaded ? "animate-pulse" : ""
        }`}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.04] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <span className="flex h-full items-center justify-center p-4 text-center text-sm text-[#77736B]">
            Poster unavailable
          </span>
        )}

        <span
          className={`absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 ${
            showOverview ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="line-clamp-4 block text-xs leading-relaxed text-white">
            {movie.overview || "No description available."}
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col border-b border-[#191916]/20 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#77736B]">
            {releaseYear}
          </span>

          <span className="text-xs font-semibold text-[#B83E2E]">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-5 text-[#191916] transition-colors group-hover:text-[#B83E2E]">
          {movie.title}
        </h3>

        <p className="mt-auto pt-2 text-[10px] uppercase tracking-wider text-[#77736B]">
          {movie.vote_count.toLocaleString()} audience ratings
        </p>
      </div>
    </article>
  );
}

export default MovieCard;
