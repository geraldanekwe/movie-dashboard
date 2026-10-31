import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-[#77736B]">
        No movies on this page match your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
